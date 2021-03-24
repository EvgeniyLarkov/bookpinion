import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import TextBase from './TextBase';
import C from '../validations/constants';

// TO-DO
// 1. Переделать getReactionFromRating, вынести в блок повыше

enum Reactions {
  negative = 'negative',
  positive = 'positive',
  neutral = 'neutral',
}

interface WrapperInterface {
  reaction: Reactions;
  className?: string;
}

const Wrapper = styled.article<WrapperInterface>`
    max-width: 100%;
    padding: 12px;
    height: 145px;
    box-shadow: ${(props) => props.theme.shadow.light};
    border-bottom: 8px solid ${(props) => props.theme.palette[props.reaction]};
`;

const Article = styled(TextBase)`
    display: -webkit-box;
    padding-top: 6px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
    overflow: hidden;
`;

const TitleContainer = styled.div`
    display: flex;
    flex-wrap: nowrap;
    align-items: baseline;

    .truncated {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
`;

// eslint-disable-next-line no-nested-ternary
const getReactionFromRating = (rating: number): Reactions => ((rating >= C.MAX_BOOK_RATING * 0.6)
  ? Reactions.positive : (rating <= C.MAX_BOOK_RATING * 0.3)
    ? Reactions.negative : Reactions.neutral);

export interface CardProps{
  label: string,
  username: string,
  article: string;
  reaction?: number;
}

const Card: React.FC<CardProps> = ({
  label, username, article, reaction = C.MAX_BOOK_RATING / 2, ...props
}
: CardProps) => {
  const { t } = useTranslation();
  return (
    <Wrapper reaction={getReactionFromRating(reaction)} {...props}>
      <TitleContainer>
        <TextBase fontWeight={500} className="truncated">
          {username}
        </TextBase>
        <TextBase fontWeight={500} p="0 8px">
          {t('bookSection.about')}
        </TextBase>
        <TextBase fontStyle="italic" className="truncated" p="0 1px">
          {label}
        </TextBase>
      </TitleContainer>
      <Article>
        {article}
      </Article>
    </Wrapper>
  );
};

export default Card;
