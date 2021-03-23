import React from 'react';
import styled from 'styled-components';

export interface BookPictureInterface extends React.ImgHTMLAttributes<HTMLImageElement> {
  readonly src: string;
}

const BookImg = styled.img.attrs((props) => ({ src: props.src }))`
    box-shadow: ${(props) => props.theme.shadow.light};
    object-fit: fill;
    width: 100%;
    height: 100%;
`;

const BookPicture: React.FC<BookPictureInterface> = ({ src, ...rest }: BookPictureInterface) => (
  <BookImg
    src={src}
    {...rest}
  />
);

export default BookPicture;
