import { Component } from 'react';
import CardList from './component/card-list/card-list.component';
import SearchBox from './component/search-box/search-box-component';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchFiled: '',
    };
  }
  async componentDidMount() {
    try {
      let usersSavedInCache = localStorage.getItem('users');
      if (usersSavedInCache) {
        usersSavedInCache = JSON.parse(usersSavedInCache);
        this.setState(
          () => {
            return { monsters: usersSavedInCache };
          },
          () => {
            console.log(this.state);
          },
        );
        return;
      }
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!res.ok) {
        throw new Error('NOT found ');
      }
      const users = await res.json();
      localStorage.setItem('users', JSON.stringify(users));
      this.setState(
        () => {
          return { monsters: users };
        },
        () => {
          console.log(this.state);
        },
      );
    } catch (err) {
      console.error(err);
    }
  }

  onSearchChange = (e) => {
    const searchFiled = e.target.value.toLowerCase();
    this.setState(() => {
      return {
        searchFiled,
      };
    });
  };

  render() {
    const { monsters, searchFiled } = this.state;
    const { onSearchChange } = this;
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchFiled);
    });
    return (
      <div className="App">
        <h1 className="app-title">Monsters Rolodex</h1>
        <SearchBox
          className="search-box-monster"
          onSearchChangeHandeler={onSearchChange}
          placeholder="Search Monsters"
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
