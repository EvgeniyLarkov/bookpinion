import React from 'react';
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
  gridArea: string;
}

const Wrapper = styled.article<WrapperInterface>`
    padding: 12px;
    height: 140px;
    grid-area: ${(props) => props.gridArea};
    box-shadow: ${(props) => props.theme.shadow.light};
    border-bottom: 8px solid ${(props) => props.theme.palette[props.reaction]};
`;

// eslint-disable-next-line no-nested-ternary
const getReactionFromRating = (rating: number): Reactions => ((rating >= C.MAX_BOOK_RATING * 0.6)
  ? Reactions.positive : (rating <= C.MAX_BOOK_RATING * 0.3)
    ? Reactions.negative : Reactions.neutral);

export interface CardProps {
  label: string | string[],
  username: string,
  article: string;
  reaction?: number;
  gridArea?: string,
}

const Card: React.FC<CardProps> = ({
  label, username, article, gridArea = '', reaction = C.MAX_BOOK_RATING / 2,
}
: CardProps) => (
  <Wrapper gridArea={gridArea} reaction={getReactionFromRating(reaction)}>
    <TextBase fontWeight={500}>
      {username}
      {' about'}
    </TextBase>
    <TextBase p="0 4px" fontStyle="italic">
      {(Array.isArray(label)) ? label.toString() : label}
    </TextBase>
    <div>
      <TextBase p="4px 0">
        {article}
      </TextBase>
    </div>
  </Wrapper>
);

export default Card;
