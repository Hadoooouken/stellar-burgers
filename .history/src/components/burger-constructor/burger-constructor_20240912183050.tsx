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

//   console.log(constructorItems);

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
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { nanoid } from 'nanoid';

export interface IConstructorState {
  bun: TIngredient | null;
  ingredients: Array<TIngredient & { id: string }>; // Добавляем поле id
}

const initialState: IConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructorData',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<TIngredient & { id: string }>) => {
        state.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (state, action: PayloadAction<{ id: string }>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0) {
        const ingredient = state.ingredients[index];
        state.ingredients.splice(index, 1);
        state.ingredients.splice(index - 1, 0, ingredient);
      }
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < state.ingredients.length - 1) {
        const ingredient = state.ingredients[index];
        state.ingredients.splice(index, 1);
        state.ingredients.splice(index + 1, 0, ingredient);
      }
    },
    resetConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  resetConstructor
} = constructorSlice.actions;

export default constructorSlice.reducer;
