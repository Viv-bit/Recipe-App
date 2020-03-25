import React from "react";
import style from "./recipe.module.css";


const Recipe = ({title,calories,image, ingredients}) => {
    return(
        <div className={style.recipe}>
            <h1>{title}</h1>
            <img src={image} className={style.image} />
            <ol>
                {ingredients.map(ingredients => 
                (<li>
                    {ingredients.text}
                </li>))}
            </ol>
            <h4>Calories: {calories}</h4>

            
        </div>
    );
}

export default Recipe;