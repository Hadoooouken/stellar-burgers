import { FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Modal } from '@components';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const ingredients = useSelector((state: any) => state.ingredients.items) as TIm[];
  const ingredient = ingredients.find(ingredient => ingredient._id === id);

  if (!ingredient) {
    return <p>Ингредиент не найден</p>;
  }

  return (
    <>
      {id ? (
        <Modal title={ingredient.name} onClose={() => navigate('/ingredients')}>
          <div>
            <h2>{ingredient.name}</h2>
            {/* Другие детали ингредиента */}
          </div>
        </Modal>
      ) : (
        <div>
          <h2>{ingredient.name}</h2>
          {/* Другие детали ингредиента */}
        </div>
      )}
    </>
  );
};

//оригинал
// import { FC } from 'react';
// import { Preloader } from '../ui/preloader';
// import { IngredientDetailsUI } from '../ui/ingredient-details';
// import { useSelector } from '../../services/store';
// import { useParams } from 'react-router-dom';

// export const IngredientDetails: FC = () => {
//   const { id } = useParams();

//   const ingredientData = useSelector((state) =>
//     state.ingredients.ingredients?.find((item) => item._id === id)
//   );

//   if (!ingredientData) {
//     return <Preloader />;
//   }

//   return <IngredientDetailsUI ingredientData={ingredientData} />;
// };
