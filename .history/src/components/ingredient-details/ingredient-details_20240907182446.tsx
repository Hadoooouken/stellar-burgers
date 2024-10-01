import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from 'src/services/store';
import { useRoutes } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const route = useRoutes()

  console.log(route) 
  const ingredientData = useSelector(state => state.root.ingredients.find(item => item._id === ));

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
