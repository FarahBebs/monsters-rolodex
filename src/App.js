import { useState, useEffect } from 'react';
import CardList from './component/card-list/card-list.component';
import SearchBox from './component/search-box/search-box-component.tsx';
import './App.css';

const App = () => {
  const [searchFiled, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let usersSavedInCache = localStorage.getItem('users');
        if (usersSavedInCache) {
          usersSavedInCache = JSON.parse(usersSavedInCache);
          setMonsters(usersSavedInCache);
          return;
        }
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) {
          throw new Error('Not found');
        }
        const users = await res.json();
        localStorage.setItem('users', JSON.stringify(users));
        setMonsters(users);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const newfilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchFiled);
    });
    setFilteredMonsters(newfilteredMonsters);
  }, [monsters, searchFiled]);

  const onSearchChange = (e) => {
    const searchFiledString = e.target.value.toLowerCase();
    setSearchField(searchFiledString);
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
