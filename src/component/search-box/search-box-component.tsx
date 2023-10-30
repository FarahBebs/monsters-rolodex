import { ChangeEventHandler } from 'react';

import './search-box.style.css';

type SearchBoxProps = {
  className: string;
  placeholder?: string;
  onSearchChangeHandler: ChangeEventHandler<HTMLInputElement>;
};
const SearchBox = ({
  onSearchChangeHandler,
  placeholder,
  className,
}: SearchBoxProps) => {
  return (
    <input
      className={`search-box ${className}`}
      type="search"
      placeholder={placeholder}
      onChange={onSearchChangeHandler}
    />
  );
};

export default SearchBox;
