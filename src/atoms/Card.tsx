import React from 'react';
import styled from 'styled-components';
import TextBase from './TextBase';

const Wrapper = styled.article.attrs((props: CardProps) => ({
  reaction: props.reaction || 'neutral',
}))`
    padding: 12px;
    height: 140px;
    box-shadow: ${(props) => props.theme.shadow.light};
    border-bottom: 8px solid ${(props) => props.theme.palette[props.reaction]};
`;
export interface CardProps {
  bookName: string,
  userName: string,
  text: string;
  reaction?: 'negative' | 'neutral' | 'positive';
  className?: string,
}

const Card: React.FC<CardProps> = ({
  bookName, userName, text, className, reaction,
}
: CardProps) => (
  <Wrapper className={className} reaction={reaction}>
    <TextBase fontWeight={500}>
      {userName}
      {' about'}
    </TextBase>
    <TextBase p="0 4px" fontStyle="italic">
      {bookName}
    </TextBase>
    <div>
      <TextBase p="4px 0">
        {text}
      </TextBase>
    </div>
  </Wrapper>
);

export default Card;
