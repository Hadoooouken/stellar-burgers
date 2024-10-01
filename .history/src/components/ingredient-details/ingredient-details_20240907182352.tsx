import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from 'src/services/store';

export const IngredientDetails: FC = () => {
  use
  const ingredientData = useSelector(state => state.root.ingredients.find(item => item._id === ));

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
