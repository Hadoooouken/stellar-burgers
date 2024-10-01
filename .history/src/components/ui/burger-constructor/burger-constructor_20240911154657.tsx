import React, { FC } from 'react';
import { Modal } from '@components';
import { Preloader, OrderDetailsUI } from '@ui';

export const BurgerConstructorUI: FC<BurgerConstructorUIProps> = ({
  constructorItems,
  orderRequest,
  price,
  orderModalData,
  onOrderClick,
  closeOrderModal
}) => {
  const handleClose = () => {
    console.log('Close button clicked');
    closeOrderModal();
  };

  return (
    <section className={styles.burger_constructor}>
      {/* ... ваш код для отображения конструктора ... */}

      {orderRequest && (
        <Modal onClose={handleClose} title={'Оформляем заказ...'}>
          <Preloader />
        </Modal>
      )}

      {orderModalData && (
        <Modal
          onClose={handleClose}
          title={orderRequest ? 'Оформляем заказ...' : ''}
        >
          <OrderDetailsUI orderNumber={orderModalData.number} />
        </Modal>
      )}
    </section>
  );
};
