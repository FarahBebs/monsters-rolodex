import { Component } from 'react';
import './search-box.style.css';

class SearchBox extends Component {
  render() {
    const { onSearchChangeHandeler, placeholder, className } = this.props;

    return (
      <div>
        <input
          className={`search-box ${className}`}
          type="search"
          placeholder={placeholder}
          onChange={onSearchChangeHandeler}
        />
      </div>
    );
  }
}

export default SearchBox;
