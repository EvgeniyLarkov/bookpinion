import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  Link,
} from 'react-router-dom';
import { isNull, uniqueId } from 'lodash';
import { Card } from '../atoms';
import { ExtendedBookInterface, ExtendedArticleInterface } from '../redux/ducks/types';

// TO-DO
// Set Page перенести в дочерний блок

const Grid = styled.section`
    padding-top: 32px;
    display: block;

    @media screen and (min-width: 60em) {
      display: grid;
      grid-gap: 12px;
      grid-template-columns: repeat(3, 1fr);
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

const LinkInGrid = styled(Link)<{ gridArea: string }>`
  grid-area: ${(props) => props.gridArea};
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

const BookImg = styled.img.attrs((props) => ({ src: props.src }))`
    box-shadow: ${(props) => props.theme.shadow.light};
    object-fit: cover;
    width: 100%;
    height: 100%;
`;

export interface BookSectionInterface {
  books: (ExtendedBookInterface<string> | null)[]
  articles: (ExtendedArticleInterface<string> | null)[]
}

const BookSection: React.FC<BookSectionInterface> = (
  {
    books,
    articles,
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
                  <LinkInGrid to={`books/${books[index]?.id}`} gridArea={`b${index + 1}`}>
                    <BookImg
                      src={books[index]?.imageLinks.normal || books[index]?.imageLinks.small || ''}
                      key={uniqueId('book')}
                    />
                  </LinkInGrid>
                )}
            </>
          )
        ))}
      </Grid>
    </>
  );
};

export default BookSection;
