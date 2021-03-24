import React from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash';
import SendIcon from '@material-ui/icons/Send';
import {
  IconButton, Option, SelectBase, SelectExtended, TextAreaBase,
} from '../../../atoms';
import {
  Inner, Outer, Title, Description, Wrapper, PostitveIcon, NeutralIcon, NegativeIcon,
} from './styled';
import { Tooltip } from '../../../molecules';
import { ArticleFields } from '../../../redux/ducks/types';
import { OptionsType } from '../../../atoms/SelectExtended';
import { UseRatingInterface } from '../hooks/useRating';

export interface InputBlockInterface extends UseRatingInterface {
  article: string;
  previewData: OptionsType[];
  normalizedErrors: { [x: string]: string[] };
  handleSetBook: (value: string) => void;
  handleSendArticle: () => void;
  handleSetArticleText: (ev: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const InputBlockView: React.FC<InputBlockInterface> = (
  {
    rating,
    article,
    maxRating,
    minRating,
    deltaRating,
    handleSetRating,
    handleSendArticle,
    handleSetArticleText,
    handleSetBook,
    normalizedErrors,
    previewData,
  }: InputBlockInterface,
) => {
  const { t } = useTranslation();
  return (
    <Outer>
      <Inner>
        <Title>{t('inputBlock.title')}</Title>
        <div>
          <Description>{t('inputBlock.description')}</Description>
          <SelectExtended
            options={previewData}
            placeholder={t('inputBlock.bookAdvice')}
            handler={handleSetBook}
            withAutocomplete
          />
        </div>
        <Wrapper>
          <TextAreaBase
            onChange={handleSetArticleText}
            value={article}
          />
          <div className="container">
            <SelectBase title={(
              <IconButton fontSize={50}>
                {(rating >= deltaRating * 0.7 && <PostitveIcon />)
                || (rating <= deltaRating * 0.3 && <NeutralIcon />)
                || <NegativeIcon />}
              </IconButton>
            )}
            >
              <Option handler={handleSetRating(maxRating)}>
                <PostitveIcon />
              </Option>
              <Option handler={handleSetRating(deltaRating / 2)}>
                <NeutralIcon />
              </Option>
              <Option handler={handleSetRating(minRating)}>
                <NegativeIcon />
              </Option>
            </SelectBase>
          </div>
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

export default InputBlockView;
