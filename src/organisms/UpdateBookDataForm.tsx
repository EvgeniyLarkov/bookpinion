/* eslint-disable react/no-array-index-key */
import React, { useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import FieldWithLabel from './FieldWithLabel';
import { RootState } from '../redux/ducks';
import { booksDataSelector } from '../utils/selectors';
import ButtonBase from '../atoms/ButtonBase';
import useAdminFunctions, { PartialBookInterface } from './BookPictureExtended/hooks/useAdminFunctions';
import { TextBase } from '../atoms';

/* interface FormFromObjectInterface {
  obj: Record<string, unknown>,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const FormFromObject = ({
  obj,
  onChange,
}: FormFromObjectInterface): React.ReactElement<FormFromObjectInterface> => {
  const inner = (object: typeof obj, parent = '', recursion = 0): React.ReactElement => {
    const data = Object.entries(obj);
    console.log(data, parent);
    if (recursion > 1) {
      return <></>;
    }
    return (
      <>
        {data.map(([key, value]) => (
          <div>
            <TextBase>
              {key}
            </TextBase>

            {typeof value === 'object' && (isArrayOfStrings(value))
              ? value.map((item, index) => {onChange(`${parent}${key}[${index}]`)} />)
              : inner(value as Record<string, unknown>, `${key}.`, recursion + 1)}

            {typeof value === 'string'
            && <InputBase value={value} onChange={onChange(`${parent}${key}`)} />}
          </div>
        ))}
      </>
    );
  };
  return inner(obj);
}; */
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 12px;
  margin: 12px 24px;
`;

const arrayFieldReducer: React.Reducer<string[], { index: number,
  value: string}> = (state, { index, value }) => {
  const mirror = [...state];
  mirror[index] = value;
  return mirror;
};

const objectFieldReducer: React.Reducer<Record<string, string>, { key: string,
  value: string }> = (state, { key, value }) => ({ ...state, [key]: value });

const UpdateBookDataForm: React.FC = () => {
  const { updateData } = useAdminFunctions();

  const data = useSelector((state: RootState) => state.modal.data);
  const books = useSelector(booksDataSelector);
  const book = (data?.id) ? books[data.id] : null;

  const [title, setTitle] = useState(book?.title || '');
  const [id, setId] = useState(book?.id || '');
  const [authors, setAuthors] = useReducer(arrayFieldReducer, book?.authors || ['']);
  const [category, setCategory] = useReducer(arrayFieldReducer, book?.category || ['']);
  const [description, setDescription] = useState(book?.description || '');
  const [link, setLink] = useState(book?.link || '');
  const [imageLinks, setImageLinks] = useReducer(objectFieldReducer,
    book?.imageLinks as Record<string, string> || { big: '', small: '', normal: '' });

  const handleFieldChange = (setter: typeof setTitle) => (
    ev: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setter(ev.target.value);
  };

  const handleArrayFieldChange = (setter: typeof setAuthors, index: number) => (
    ev: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setter({ value: ev.target.value, index });
  };

  const handleObjectFieldChange = (setter: typeof setImageLinks, key: string) => (
    ev: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setter({ value: ev.target.value, key });
  };

  const handleSubmitClick = (updatedData: PartialBookInterface) => () => {
    updateData(updatedData);
  };

  return (
    <Wrapper>
      <FieldWithLabel
        value={title}
        label="Title"
        onChange={handleFieldChange(setTitle)}
      />
      <FieldWithLabel
        value={id}
        label="Id"
        onChange={handleFieldChange(setId)}
      />
      {authors.map((author, index) => (
        <FieldWithLabel
          key={`author_${index}`}
          value={author}
          label={`Author ${index}`}
          onChange={handleArrayFieldChange(setAuthors, index)}
        />
      ))}
      {category.map((item, index) => (
        <FieldWithLabel
          key={`category_${index}`}
          value={item}
          label={`Category ${index}`}
          onChange={handleArrayFieldChange(setCategory, index)}
        />
      ))}
      <FieldWithLabel
        value={description}
        label="Description"
        onChange={handleFieldChange(setDescription)}
      />
      <FieldWithLabel
        value={link}
        label="Link"
        onChange={handleFieldChange(setLink)}
      />
      {Object.entries(imageLinks).map(([key, value]) => (
        <FieldWithLabel
          key={`imageLinks${key}`}
          value={value}
          label={`ImageLinks ${key}`}
          onChange={handleObjectFieldChange(setImageLinks, key)}
        />
      ))}
      <ButtonBase
        onClick={handleSubmitClick({
          title, id, authors, category, description, link, imageLinks,
        } as PartialBookInterface)}
      >
        <TextBase p="12px">Submit</TextBase>
      </ButtonBase>
    </Wrapper>
  );
};

export default UpdateBookDataForm;
