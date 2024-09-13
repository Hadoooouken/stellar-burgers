import styles from './constructor-page.module.css';
import { useSelector } from '../../services/store';

import { BurgerIngredients, IngredientDetails, Modal } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const ConstructorPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isIngredientsLoading = useSelector(
    (state) => state.ingredients.loading
  );

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}

      {id && (
        <Modal title='Детали ингредиента' onClose={() => navigate('/')}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
};
