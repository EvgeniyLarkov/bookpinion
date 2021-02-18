import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { isNull, uniqueId } from 'lodash';
import { Card } from '../atoms';
import ChangePageBlock from '../organisms/ChangePageBlock';
import { ExtendedBookInterface, ExtendedArticleInterface } from '../redux/ducks/types';

const Grid = styled.section`
    padding-top: 32px;
    display: block;

    @media screen and (min-width: 60em) {
      display: grid;
      grid-gap: 12px;
      grid-template-columns: repeat(3, auto);
      grid-template-areas: 
      "a1 b2 a3"
      "b1 b2 b3"
      "b1 a2 b3"
      "a4 b5 a6"
      "b4 b5 b6"
      "b4 a5 b6"
      ;
    }
`;

const LoadingEffect = keyframes`
  0% {
      background-position: 0;
    }
  100% {
      background-position: 1000px;
  }
`;

const CardLoading = styled.div<{ gridArea?: string, h?: number }>`
  background-image: ${(props) => `linear-gradient(to right, #eff1f3 4%, ${props.theme.palette.mainDark} 25%, #eff1f3 36%)`};
  grid-area: ${(props) => props.gridArea || ''};
  width: 100%;
  animation: ${LoadingEffect} 2s linear infinite; 
  height: ${(props) => `${props.h || 200}px`};
  position: relative;
  overflow: hidden;
`;

interface BookImgInterface {
  readonly gridArea: string;
}

const BookImg = styled.img.attrs((props) => ({ src: props.src }))<BookImgInterface>`
    box-shadow: ${(props) => props.theme.shadow.light};
    grid-area: ${(props) => props.gridArea};
    object-fit: cover;
    width: 100%;
    height: 100%;
`;

export interface BookSectionInterface {
  books: (ExtendedBookInterface<string> | null)[]
  articles: (ExtendedArticleInterface<string> | null)[]
  pageNumber: number
  setPage: (arg: number) => void
}

const BookSection: React.FC<BookSectionInterface> = (
  {
    books,
    articles,
    pageNumber,
    setPage,
  }: BookSectionInterface,
) => {
  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    if (books.some(isNull) || articles.some(isNull)) {
      setLoadingState(true);
    } else {
      setLoadingState(false);
    }
  }, [books, articles]);

  const setNextPage = () => { setPage(pageNumber + 1); };
  const setPreviousPage = () => {
    if (pageNumber === 0) setPage(pageNumber - 1);
    else setPage(pageNumber);
  };
  const setFirstPage = () => { setPage(1); };
  const setLastPage = () => { setPage(1); };

  return (
    <>
      <Grid>
        {articles.map((article, index) => ((loadingState || !article)
          ? (
            <>
              <CardLoading gridArea={`a${index + 1}`} h={200} />
              <CardLoading gridArea={`b${index + 1}`} h={600} />
            </>
          )
          : (
            <>
              <Card
                gridArea={`a${index + 1}`}
                label={article.title}
                username={article.username}
                article={article.article}
                reaction={article.rating}
                key={uniqueId('article')}
              />
              {(books[index])
                && (
                  <BookImg
                    gridArea={`b${index + 1}`}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore: Object is possibly 'null'.
                    src={books[index].imageLinks.normal || books[index].imageLinks.small || ''}
                    key={uniqueId('book')}
                  />
                )}
            </>
          )
        ))}
      </Grid>
      <ChangePageBlock
        pageNumber={pageNumber}
        setPageNumber={setPage}
        setNextPage={setNextPage}
        setPreviousPage={setPreviousPage}
        setFirstPage={setFirstPage}
        setLastPage={setLastPage}
      />
    </>
  );
};

export default BookSection;
