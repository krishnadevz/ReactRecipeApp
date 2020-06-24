import React, { useEffect, useState } from "react";
import "./App.css";
import Recipe from "./Recipe";

const App = () => {
  const APP_ID = "0001f5c7";
  const APP_KEY = "fddc972b8c7773d4f2b2c9656102f7dd";
  const [recipes,setRecipes]=useState([]);
  const [search,setSearch]=useState('');
  const [query,setQuery]=useState('banana');
  useEffect(() => {getRecipes();
   }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data=await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };
  const getSearch= e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  const updateSearch= e=>{
  setSearch(e.target.value)
}
  return (
    <div className="App">
    <h1>Recipe App</h1>
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">
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
      ))};
    </div>
    </div>
  );
};

export default App;
