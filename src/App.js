import React,{useEffect, useState} from 'react';
import './App.css';
import Recipe from './Recipe';

const App = () => {
  const APP_ID = "793e6961";
  const APP_KEY = "db9a41e884e6e98366784c27c10aff99";


  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

    useEffect(() => {
      getRecipies();
    }, [query]);
    
    const getRecipies = async () => {
      const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      const data = await response.json();
      setRecipes(data.hits);

    };
      const updateSearch = e => {
        setSearch(e.target.value);
      }
      const getSearch = e => {
        e.preventDefault();
        setQuery(search);
        setSearch('');
      }

      return(
        <div className="App">
          <form onSubmit={getSearch} className="search-form">
            <input type="text" placeholder="Type desired food" className="search-bar" value={search} onChange={updateSearch} />
            <button  
              type="submit" 
              className="search-button">
              Search
            </button>
          </form>
          <div className="recipes">
          {recipes.map(recipe => (
            <Recipe 
              key={recipe.recipe.label}
              title={recipe.recipe.label} 
              calories={recipe.recipe.calories} 
              image={recipe.recipe.image} 
              ingredients={recipe.recipe.ingredients}
            />
          ))}
          </div>
        </div>
      );
    };



export default App;
