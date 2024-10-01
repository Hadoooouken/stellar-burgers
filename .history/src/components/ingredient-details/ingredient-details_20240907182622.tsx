import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useRoutes, useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const { id } = useParams();

  console.log(params);
  const ingredientData = useSelector((state) =>
    state.root.ingredients.find((item) => item._id === null)
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
