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
            <p>{calories}</p>

            
        </div>
    );
}

export default Recipe;