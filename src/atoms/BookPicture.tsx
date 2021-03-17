import React from 'react';
import styled from 'styled-components';

// export type BookSectionInterface = Pick<ExtendedBookInterface<string>, 'imageLinks'>;

export interface BookSectionInterface {
  readonly src: string;
}

const BookImg = styled.img.attrs((props) => ({ src: props.src }))`
    box-shadow: ${(props) => props.theme.shadow.light};
    object-fit: cover;
    width: 100%;
    height: 100%;
`;

const BookPicture: React.FC<BookSectionInterface> = ({ src }: BookSectionInterface) => (
  <BookImg
    src={src}
  />
);

export default BookPicture;
