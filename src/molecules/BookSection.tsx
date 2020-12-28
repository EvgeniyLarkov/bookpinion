import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { uniqueId } from 'lodash';
import { Card } from '../atoms';
import ChangePageBlock from '../organisms/ChangePageBlock';
import { AppDispatch } from '../redux/store';
import { getBookById } from '../redux/ducks/books';
import { ExtendedBookInterface, ExtendedArticleInterface } from '../redux/ducks/types';

const Grid = styled.section`
    padding: 32px 128px;
    width: 1400px;
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-auto-rows: repeat(3, auto);
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

const BookImg = styled.img.attrs((props) => ({ src: props.src }))`
    box-shadow: ${(props) => props.theme.shadow.light};
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
) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookById('Rc0MzgEACAAJ'));
  }, []);

  return (
    <>
      <Grid>
        {articles.map((article, index) => (
          <Card
            className={`grid-area: a${index}`}
            label={article.author}
            username={article.username}
            article={article.article}
            reaction={article.rating}
            key={uniqueId('article')}
          />
        ))}
        {books.map((book, index) => (
          <BookImg
            className={`grid-area: b${index}`}
            src={book.imageLinks.normal}
            key={uniqueId('book')}
          />
        ))}
      </Grid>
      <ChangePageBlock />
    </>
  );
};

export default BookSection;
