// BurgerConstructor.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from '@zlden/react-developer-burger-ui-components';
import { BurgerConstructorUI } from './burger-constructor-ui'; // Убедитесь, что путь правильный
import { createOrder } from '../../services/orderSlice'; // Импортируйте Thunk для создания заказа
import { RootState } from '../../services/store'; // Путь к вашему RootState

export const BurgerConstructor: React.FC = () => {
  const dispatch = useDispatch();
  const { constructorItems, price } = useSelector((state: RootState) => state.constructorData);
  const { orderRequest, order, orderFailed } = useSelector((state: RootState) => state.order);

  const handleOrderClick = () => {
    if (constructorItems.bun && constructorItems.ingredients.length > 0) {
      const ingredientIds = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map(item => item._id),
        constructorItems.bun._id // Добавляем булку в конце для завершения заказа
      ];
      dispatch(createOrder(ingredientIds));
    } else {
      // Отображение сообщения о необходимости выбора ингредиентов
      alert('Выберите булки и начинки для оформления заказа');
    }
  };

  return (
    <BurgerConstructorUI
      constructorItems={constructorItems}
      orderRequest={orderRequest}
      price={price}
      orderModalData={order}
      onOrderClick={handleOrderClick}
      closeOrderModal={() => {
        // Закрытие модального окна
        // Например, через изменение состояния или dispatch
        dispatch({ type: 'order/closeModal' });
      }}
    />
  );
};
