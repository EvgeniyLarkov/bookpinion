import React from 'react';
import { Chip } from '../atoms';

export interface FilterInterface {
  categories: string[] | null;
  activeCategory: string | null;
  setActiveCategory: (value: string | null) => void;
}

const Filter: React.FC<FilterInterface> = ({
  categories,
  activeCategory,
  setActiveCategory,
}: FilterInterface) => {
  const changeCategory = (value: string | null) => () => setActiveCategory(value);

  return (
    <>
      <Chip
        onClick={changeCategory(null)}
        selected={activeCategory === null}
      >
        All
      </Chip>
      {categories ? categories.map((item) => (
        <Chip
          key={`cat_${item}`}
          onClick={changeCategory(item)}
          selected={item === activeCategory}
        >
          {item}
        </Chip>
      ))
        : ''}
    </>
  );
};

export default Filter;
