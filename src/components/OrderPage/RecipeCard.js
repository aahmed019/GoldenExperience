import React, { Component } from 'react';
import Title from './Title';
import Image from './Image';
export default class RecipeCard extends Component {
 render(){
  return(
          <div>
            {this.props.meals.map((item, index) => {
              return (
                <a 
                  key={index} 
                  href={item.strSource}>
                  <Image source={item.strMealThumb} text={item.strMeal} />
                  <Title title={item.strMeal} />
                </a> 
              )
          })}
         </div>
  )
 }
}