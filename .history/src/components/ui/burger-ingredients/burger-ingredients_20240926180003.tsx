import React, { FC, memo } from 'react';
import { Tab } from '@zlden/react-developer-burger-ui-components';

import styles from './burger-ingredients.module.css';
import { BurgerIngredientsUIProps } from './type';
import { IngredientsCategory } from '@components';

export const BurgerIngredientsUI: FC<BurgerIngredientsUIProps> =
  memo<BurgerIngredientsUIProps>(
    ({
      currentTab,
      buns,
      mains,
      sauces,
      titleBunRef,
      titleMainRef,
      titleSaucesRef,
      bunsRef,
      mainsRef,
      saucesRef,
      onTabClick,
    }) => (
      <>
        <section className={styles.burger_ingredients} {}>
          <nav>
            <ul className={styles.menu}>
              <Tab
                value='bun'
                active={currentTab === 'bun'}
                onClick={onTabClick}
                data-cy='tab-bun' // добавляем data-testid
              >
                Булки
              </Tab>
              <Tab
                value='main'
                active={currentTab === 'main'}
                onClick={onTabClick}
                data-cy='tab-main' // добавляем data-testid
              >
                Начинки
              </Tab>
              <Tab
                value='sauce'
                active={currentTab === 'sauce'}
                onClick={onTabClick}
                data-cy='tab-sauce' // добавляем data-testid
              >
                Соусы
              </Tab>
            </ul>
          </nav>
          <div className={styles.content}>
            <IngredientsCategory
              title='Булки'
              titleRef={titleBunRef}
              ingredients={buns}
              ref={bunsRef}
              data-cy='category-bun' // добавляем data-testid
            />
            <IngredientsCategory
              title='Начинки'
              titleRef={titleMainRef}
              ingredients={mains}
              ref={mainsRef}
              data-cy='category-main' // добавляем data-testid
            />
            <IngredientsCategory
              title='Соусы'
              titleRef={titleSaucesRef}
              ingredients={sauces}
              ref={saucesRef}
              data-cy='category-sauce' // добавляем data-testid
            />
          </div>
        </section>
      </>
    )
  );
