import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Card } from '../atoms';
import ChangePageBlock from '../organisms/ChangePageBlock';
import { RootState } from '../redux/ducks';
import { AppDispatch } from '../redux/store';
import { fetchBooks } from '../redux/ducks/books';

const Grid = styled.section`
    padding: 32px 128px;
    width: 1400px;
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-auto-rows: repeat(3, auto);
    grid-template-areas: 
      "a1 b2 a3"
      "b1 b2 b3"
      "b1 a2 b3";
    grid-gap: 12px;

    .article-1 {
      grid-area: a1;
    }

    .article-2 {
      grid-area: a2;
    }

    .article-3 {
      grid-area: a3;
    }

    .book-1 {
      grid-area: b1;
    }
    .book-2 {
      grid-area: b2;
    }
    .book-3 {
      grid-area: b3;
    }
`;

const BookImg = styled.img.attrs((props) => ({ src: props.src }))`
    box-shadow: ${(props) => props.theme.shadow.light};
    object-fit: contain;
    width: 100%;
    height: 100%;
`;

const BookSection: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { state, data, allIDs } = useSelector(({ books }: RootState) => books);
  console.log(data, allIDs, state);

  useEffect(() => {
    dispatch(fetchBooks('Rc0MzgEACAAJ'));
  }, []);

  return (
    <>
      <Grid>
        <Card className="article-1" bookName="He;llo" userName="Popo" text="Great book" reaction="positive" />
        <BookImg className="book-1" src="https://img.chaconne.ru/img/2037771_849884.jpg" />
        <BookImg className="book-2" src="https://img.chaconne.ru/img/2037771_849884.jpg" />
        <Card className="article-2" bookName="He;llo" userName="Popo" text="Great book" />
        <Card className="article-3" bookName="He;llo" userName="Popo" text="Great book" reaction="negative" />
        <BookImg className="book-3" src="https://img.chaconne.ru/img/2037771_849884.jpg" />
      </Grid>
      <ChangePageBlock />
    </>
  );
};

export default BookSection;
