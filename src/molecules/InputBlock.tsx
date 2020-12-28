import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import SendIcon from '@material-ui/icons/Send';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import {
  IconButton, InputBase, TextAreaBase, TextBase, TitleBase,
} from '../atoms';
import validate from '../validations';
import { ArticleFields } from '../redux/ducks/types';
import { AppDispatch } from '../redux/store';
import { publishArticle, setArticleError } from '../redux/ducks/articles';
import { Tooltip } from '../organisms';
import { RootState } from '../redux/ducks';

const Outer = styled.div`
    width: 828px;
    margin-top: 64px;
    padding: 12px 0;
    background-color: ${(props) => props.theme.palette.secondary};
    box-shadow: ${(props) => props.theme.shadow.standart};
`;

const Inner = styled.div`
    padding-left: 128px;
`;

const Title = styled(TitleBase)`
    color: ${(props) => props.theme.palette.main};
    padding: 0;
`;

const Description = styled(TextBase)`
    color: ${(props) => props.theme.palette.main};
    font-weight: 400;
    padding-bottom: 12px;
`;

const Wrapper = styled.div`
    display: inline-flex;
    position: relative;
    align-items: center;
    background-color: ${(props) => props.theme.palette.main};
    height: 100%;
    margin-bottom: 16px;
`;

const InputBlock: React.FC = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();

  const [article, setArticle] = useState('');
  // const [rating, setRating] = useState(0);
  const [selectedBook, setSelectedBook] = useState('');

  const { error } = useSelector(({ articles }: RootState) => articles);

  const normalizedErrors = error.reduce((acc: { [index: string]: string[] }, { msg, param }) => {
    if (acc[param] === undefined) {
      return { ...acc, [param]: [msg] };
    }
    return { ...acc, [param]: [...acc[param], msg] };
  },
  {});

  const handleSetArticleText = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    setArticle(ev.target.value);
  };

  const handleSetBook = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedBook(ev.target.value);
  };

  const handleSendArticle = () => {
    const articleTextErrors = validate(ArticleFields.article, article);
    const allErrors = [...articleTextErrors];
    if (!isEmpty(allErrors)) {
      dispatch(setArticleError(allErrors));
    } else {
      dispatch(publishArticle({ article, bookId: selectedBook, rating: 10 }));
    }
  };

  return (
    <Outer>
      <Inner>
        <Title>{t('inputBlock.title')}</Title>
        <div>
          <Description>{t('inputBlock.description')}</Description>
          <InputBase
            bgColor="main"
            m="0 12px"
            placeholder={t('inputBlock.bookAdvice')}
            onChange={handleSetBook}
            value={selectedBook}
          />
        </div>
        <Wrapper>
          <TextAreaBase
            onChange={handleSetArticleText}
            value={article}
          />
          <IconButton fontSize={50}>
            <InsertEmoticonIcon />
          </IconButton>
          <IconButton
            fontSize={50}
            color="#1C9CE3"
            onClick={handleSendArticle}
          >
            <SendIcon />
          </IconButton>
          {normalizedErrors[ArticleFields.article] !== undefined
          && (
          <Tooltip visible={!isEmpty(normalizedErrors[ArticleFields.article])}>
            {normalizedErrors[ArticleFields.article]}
          </Tooltip>
          )}
        </Wrapper>
      </Inner>
    </Outer>
  );
};

export default InputBlock;
