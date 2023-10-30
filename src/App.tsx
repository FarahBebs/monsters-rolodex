import { useState, useEffect, ChangeEvent } from 'react';
import CardList from './component/card-list/card-list.component';
import SearchBox from './component/search-box/search-box-component';
import './App.css';
import { getData } from './utils/data.utils';

export type Monster = {
  name: string;
  id: string;
  email: string;
};

const App = () => {
  const saveToLocalStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const getFromLocalStorage = (key: string) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };

  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let usersSavedInCache = getFromLocalStorage('users');
        if (usersSavedInCache) {
          setMonsters(usersSavedInCache);
          return;
        }

        const users = await getData<Monster[]>(
          'https://jsonplaceholder.typicode.com/users',
        );
        saveToLocalStorage('users', users); // Save to localStorage
        setMonsters(users);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const searchFieldString = e.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox
        className="search-box-monster"
        onSearchChangeHandler={onSearchChange}
        placeholder="Search Monsters"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

export default App;
