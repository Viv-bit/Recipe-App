import React,{useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Recipe from './Recipe';
import Header from './components/Header';
import Landing from './components/Landing';
import Signup from './components/Signup';
import ShowRecipes from './components/showRecipes';
import SignIn from './components/Signup';



const App = () => {
  

      return(
        <Router>
            <div className="App">
            <Header />
           
          <div className="link">
            <Link to="/">
              Landing
            </Link>

            <Link to="/recipes">
              Recipes
            </Link>

            <Link to="/signup">
              Sign Up
            </Link>
            </div>

            <Route exact path="/" component={Landing} />

            <Route path="/recipes" component={ShowRecipes} />
            
            <Route path="/signup" component={Signup} />
            
          
          </div>
        </Router>
        
      );
    };



export default App;
