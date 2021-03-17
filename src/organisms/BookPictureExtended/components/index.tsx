import React from 'react';
import styled from 'styled-components';
import SettingsIcon from '@material-ui/icons/Settings';
import {
  BookPicture, IconButton, Option, SelectBase,
} from '../../../atoms';
import { ExtendedBookInterface } from '../../../redux/ducks/types';

const Wrapper = styled.div`
    position: relative;
    width: 100%;
`;

const Container = styled.div<{ visible: boolean }>`
    position: absolute;
    display: ${(props) => (props.visible ? 'block' : 'none')};
    top: 16px;
    right: 16px;
`;

export interface BookPictureBlockInterface {
  book: ExtendedBookInterface<string>
  isAdmin: boolean
  handleUpdateData: () => void
  handleRemoveData: () => void
}

const BookPictureBlock: React.FC<BookPictureBlockInterface> = ({
  book,
  isAdmin,
  handleUpdateData,
  handleRemoveData,
}: BookPictureBlockInterface) => {
  const { big, normal, small } = book.imageLinks;
  return (
    <Wrapper>
      <Container visible={isAdmin}>
        <SelectBase title={<IconButton><SettingsIcon /></IconButton>} fullWidth>
          <Option handler={handleUpdateData}>Update data</Option>
          <Option handler={handleRemoveData}>Remove data</Option>
        </SelectBase>
      </Container>
      <BookPicture src={big || normal || small || ''} />
    </Wrapper>
  );
};

export default BookPictureBlock;
