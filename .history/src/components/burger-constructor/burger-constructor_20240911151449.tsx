import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BurgerConstructorUI } from '@ui';
import { createOrder } from '../../services/slices/orderSlice'
import { RootState } from '../../services/store'; // Импортируйте RootState

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const constructorItems = useSelector(
    (state: RootState) => state.constructorData
  );
  const { orderRequest, order, orderFailed } = useSelector(
    (state: RootState) => state.order
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
    if (
      constructorItems.bun &&
      constructorItems.ingredients.length > 0 &&
      !orderRequest
    ) {
      const ingredientIds = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((item) => item._id),
        constructorItems.bun._id // Добавляем булку в конце для завершения заказа
      ];
      dispatch(createOrder(ingredientIds));
    } else {
      // Отображение сообщения о необходимости выбора ингредиентов
      alert('Выберите булки и начинки для оформления заказа');
    }
  };

  const closeOrderModal = () => {
    // Закрытие модального окна
    dispatch({ type: 'order/closeModal' }); // Вы можете настроить это действие в соответствии с вашим Redux-стором
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={order}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
