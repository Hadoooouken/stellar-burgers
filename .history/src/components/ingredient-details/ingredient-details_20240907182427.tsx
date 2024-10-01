import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from 'src/services/store';
import { useRoutes } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  useRoutes()
  const ingredientData = useSelector(state => state.root.ingredients.find(item => item._id === ));

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
