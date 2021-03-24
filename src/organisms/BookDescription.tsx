import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { TextBase, TitleBase } from '../atoms';
import { BookPictureExtended } from '../molecules';
import { RootState } from '../redux/ducks';
import { getBookById } from '../redux/ducks/books';
import { AppDispatch } from '../redux/store';

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    margin: 128px 0;

    .bookimage {
      flex-basis: 30%;
    }

    .bookinfo {
      margin-left: 36px;
      flex-basis: 70%;
    }

    .bookinfo__title {
      display: flex;
      flex-direction: column;
      float: right;
    }

    .bookinfo__author {
      align-self: flex-end;
      padding-right: 1em;
    }

    .bookinfo__description {
      margin-top: 64px;
    }
`;

const BookDescription: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams() as { id: string };

  const { data } = useSelector(({ books }: RootState) => books);

  useEffect(() => {
    dispatch(getBookById({ id }));
  }, [id]);

  const book = data[id];

  return (
    <Wrapper>
      {(book) ? (
        <>
          <BookPictureExtended
            book={book}
            className="bookimage"
          />
          <div className="bookinfo">
            <div className="bookinfo__title">
              <TitleBase p="0" fontWeight={500}>
                {book.title}
              </TitleBase>
              <div className="bookinfo__author">
                <TextBase p="0 4pt 0 0" fontSize="24px">
                  by
                </TextBase>
                <TextBase fontStyle="italic" fontSize="24px">
                  {book.authors}
                </TextBase>
              </div>
            </div>

            <TextBase className="bookinfo__description">
              {book.description}
            </TextBase>
          </div>
        </>
      )
        : 'No data'}
    </Wrapper>
  );
};

export default BookDescription;
