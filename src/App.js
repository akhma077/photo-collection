import React from 'react';
import './index.scss';
import {Collection} from './Collection';

function App() {

  const [collections, setCollections] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [activeCategori, setActiveCategories] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);

  const url = 'https://jsonplaceholder.typicode.com/todos/1'
  fetch(url)
  .then(res => res.json())
  .then((json) => {
    console.log(json)
  })

  const categorry = activeCategori ? `category=${activeCategori}` : '';

  const cats = [
    { "name": "Все" },
    { "name": "Море" },
    { "name": "Горы" },
    { "name": "Архитектура" },
    { "name": "Города" },
    { "name": "Другое" }
  ]
  console.log(cats)
  React.useEffect(() => {
    setIsLoading(true)
    fetch(`https://63030cc49eb72a839d77f1d2.mockapi.io/photos?page=${page}&limit=3&${categorry}`,
  )
    .then((res) => res.json())

    .then((json) => {
      setCollections(json);
    })
    .catch(() => {
      alert('Возникла ошибка при получении данных');
    })
    .finally(() => {
      setIsLoading(false);
    })
  }, [activeCategori, page])

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj, index) => (
            <li 
            key={index}
            className={activeCategori === index ? 'active' : ''}
            onClick = {() => setActiveCategories(index)}
            >
              {obj.name}
            </li>
          ))}
        </ul>
        <input value={searchValue} onChange = {(e) => setSearchValue(e.target.value)} className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {isLoading ? <h2>Идет загрузка...</h2>
         : collections.filter((obj) => {
         return obj.name.toLowerCase().includes(searchValue.toLowerCase())
        })
        .map((obj, index) => (
          <Collection
            key={index}
            name={obj.name}
            images={obj.photos} />
        ))}
      </div>
      <ul className="pagination">
       {[...Array(3)].map((_, i) => (
        <li 
        key={i}
        className={page === i + 1 ? 'active' : ''}
        onClick = {() => setPage(i + 1)}
        >
          {i + 1}</li>
       ))}
      </ul>
    </div>
  );
}

export default App;
