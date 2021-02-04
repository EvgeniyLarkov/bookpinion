import React from 'react';
import styled from 'styled-components';
import { uniqueId } from 'lodash';
import { Card } from '../atoms';
import ChangePageBlock from '../organisms/ChangePageBlock';
import { ExtendedBookInterface, ExtendedArticleInterface } from '../redux/ducks/types';

const Grid = styled.section`
    padding: 32px 128px;
    width: 1400px;
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-auto-rows: repeat(6, auto);
    grid-template-areas: 
      "a1 b2 a3"
      "b1 b2 b3"
      "b1 a2 b3"
      "a4 b5 a6"
      "b4 b5 b6"
      "b4 a5 b6"
      ;
    grid-gap: 12px;
`;

interface BookImgInterface {
  readonly gridArea: string;
}

const BookImg = styled.img.attrs((props) => ({ src: props.src }))<BookImgInterface>`
    box-shadow: ${(props) => props.theme.shadow.light};
    grid-area: ${(props) => props.gridArea};
    object-fit: contain;
    width: 100%;
    height: 100%;
`;

export interface BookSectionInterface {
  books: ExtendedBookInterface<string>[]
  articles: ExtendedArticleInterface<string>[]
}

const BookSection: React.FC<BookSectionInterface> = (
  {
    books,
    articles,
  }: BookSectionInterface,
) => (
  <>
    <Grid>
      {articles.map((article, index) => (
        <Card
          gridArea={`a${index + 1}`}
          label={article.title}
          username={article.username}
          article={article.article}
          reaction={article.rating}
          key={uniqueId('article')}
        />
      ))}
      {books.map((book, index) => (
        <BookImg
          gridArea={`b${index + 1}`}
          src={book.imageLinks.normal || book.imageLinks.small || ''}
          key={uniqueId('book')}
        />
      ))}
    </Grid>
    <ChangePageBlock />
  </>
);

export default BookSection;
