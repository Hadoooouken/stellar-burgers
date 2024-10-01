// import { FC, useMemo } from 'react';
// import { BurgerConstructorUI } from '@ui';
// import { createOrder, closeModal } from '../../services/slices/OrderSlice';
// import { RootState, useDispatch, useSelector } from '../../services/store';
// import { useNavigate } from 'react-router-dom';

// export const BurgerConstructor: FC = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const constructorItems = useSelector(
//     (state: RootState) => state.constructorData
//   );
//   const { orderRequest, order } = useSelector(
//     (state: RootState) => state.order
//   );
//   const isAuthorized = useSelector(
//     (state: RootState) => state.user.isAuthorized
//   );

//   const price = useMemo(() => {
//     const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
//     const ingredientsPrice = constructorItems.ingredients.reduce(
//       (sum, ingredient) => sum + ingredient.price,
//       0
//     );
//     return bunPrice + ingredientsPrice;
//   }, [constructorItems]);

//   const onOrderClick = () => {
//     if (!isAuthorized) {
//       navigate('/login');
//     }

//     if (
//       constructorItems.bun &&
//       constructorItems.ingredients.length > 0 &&
//       !orderRequest
//     ) {
//       const ingredientIds = [
//         constructorItems.bun._id,
//         ...constructorItems.ingredients.map((item) => item._id),
//         constructorItems.bun._id
//       ];
//       dispatch(createOrder(ingredientIds))
//         .unwrap()
//         .catch((error) => {
//           console.error('Order creation failed: ', error);
//         });
//     } else {
//       alert('Выберите булки и начинки для оформления заказа');
//     }
//   };

//   const closeOrderModal = () => {
//     dispatch(closeModal());
//   };

//   return (
//     <BurgerConstructorUI
//       price={price}
//       orderRequest={orderRequest}
//       constructorItems={constructorItems}
//       orderModalData={order}
//       onOrderClick={onOrderClick}
//       closeOrderModal={closeOrderModal}
//     />
//   );
// };

import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { createOrder, closeModal } from '../../services/slices/OrderSlice';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown
} from '../../services/slices/ConstructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(
    (state: RootState) => state.constructorData
  );
  const { orderRequest, order } = useSelector(
    (state: RootState) => state.order
  );
  const isAuthorized = useSelector(
    (state: RootState) => state.user.isAuthorized
  );

  const price = useMemo(() => {
    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
    const ingredientsPrice = constructorItems.ingredients.reduce(
      (sum, ingredient) => sum + ingredient.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [constructorItems]);

  const onOrderClick = () => {
    if (!isAuthorized) {
      navigate('/login');
    }

    if (
      constructorItems.bun &&
      constructorItems.ingredients.length > 0 &&
      !orderRequest
    ) {
      const ingredientIds = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((item) => item._id),
        constructorItems.bun._id
      ];
      dispatch(createOrder(ingredientIds))
        .unwrap()
        .catch((error) => {
          console.error('Order creation failed: ', error);
        });
    } else {
      alert('Выберите булки и начинки для оформления заказа');
    }
  };

  const closeOrderModal = () => {
    dispatch(closeModal());
  };

  const handleAddBun = (bun) => {
    dispatch(addBun(bun));
  };

  const handleAddIngredient = (ingredient) => {
    dispatch(addIngredient(ingredient));
  };

  const handleRemoveIngredient = (ingredient) => {
    dispatch(removeIngredient(ingredient));
  };

  const handleMoveIngredientUp = (ingredient) => {
    dispatch(moveIngredientUp(ingredient));
  };

  const handleMoveIngredientDown = (ingredient) => {
    dispatch(moveIngredientDown(ingredient));
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={order}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      addBun={handleAddBun}
      addIngredient={handleAddIngredient}
      removeIngredient={handleRemoveIngredient}
      moveIngredientUp={handleMoveIngredientUp}
      moveIngredientDown={handleMov
