// describe('Burger Constructor Page', () => {
//   beforeEach(() => {
//     // Перехват запросов и предоставление моковых данных
//     cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
//       'getIngredients'
//     );
//     cy.intercept('POST', '**/auth/login', { fixture: 'login.json' }).as(
//       'loginUser'
//     );
//     cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
//     cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
//       'createOrder'
//     );

//     // Переход на страницу конструктора
//     cy.visit('/constructor');
//     cy.wait('@getIngredients');
//   });

//   it('should display ingredients and add them to constructor', () => {
//     // Проверка, что ингредиенты загрузились
//     cy.get('[data-testid="category-bun"] [data-testid="ingredient"]').should(
//       'have.length.greaterThan',
//       0
//     );

//     // Добавляем булку в конструктор через кнопку "Добавить"
//     cy.get('[data-testid="category-bun"] [data-testid="ingredient"]')
//       .first()
//       .within(() => {
//         cy.contains('Добавить').click();
//       });
//     cy.get('[data-testid="constructor-bun"]').should('contain', 'верх');

//     // Добавляем начинку через кнопку "Добавить"
//     cy.get('[data-testid="category-main"] [data-testid="ingredient"]')
//       .first()
//       .within(() => {
//         cy.contains('Добавить').click();
//       });
//     cy.get('[data-testid="constructor-ingredient"]').should('have.length', 1);
//   });

//   it('should open and close ingredient modal', () => {
//     // Открываем модалку ингредиента
//     cy.get('[data-testid="category-bun"] [data-testid="ingredient"]')
//       .first()
//       .click();
//     cy.get('[data-testid="ingredient-modal"]').should('be.visible');

//     // Закрываем модалку
//     cy.get('[data-testid="modal-close"]').click();
//     cy.get('[data-testid="ingredient-modal"]').should('not.exist');
//   });

//   it('should place an order and clear constructor', () => {
//     // Добавляем ингредиенты через кнопки "Добавить"
//     cy.get('[data-testid="category-bun"] [data-testid="ingredient"]')
//       .first()
//       .within(() => {
//         cy.contains('Добавить').click();
//       });
//     cy.get('[data-testid="category-main"] [data-testid="ingredient"]')
//       .first()
//       .within(() => {
//         cy.contains('Добавить').click();
//       });

//     // Оформляем заказ через кнопку с текстом "Оформить заказ"
//     cy.contains('button', 'Оформить заказ').click();
//     cy.wait('@createOrder');

//     // Проверяем, что модалка заказа открыта и содержит номер заказа
//     cy.get('[data-testid="order-number"]').should('contain', '12345');

//     // Закрываем модалку
//     cy.get('[data-testid="modal-close"]').click();

//     // Проверяем, что конструктор очищен
//     cy.get('[data-testid="constructor-bun"]').should('not.exist');
//     cy.get('[data-testid="constructor-ingredient"]').should('not.exist');
//   });
// });
describe('Burger Constructor Page', () => {
  beforeEach(() => {
    // Перехватываем запросы и предоставляем mock-данные
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    // Переходим на страницу конструктора
    cy.visit('/');

    // Ожидаем завершения запроса на получение ингредиентов
    cy.wait('@getIngredients', { timeout: 10000 });
  });

  it('should display ingredients and add them to constructor', () => {
    // Проверяем, что ингредиенты загрузились
    cy.get('[data-testid="category-bun"] [data-testid="ingredient"]').should(
      'have.length.greaterThan',
      0
    );

    // Добавляем булку в конструктор через кнопку "Добавить"
    cy.get('[data-testid="category-bun"] [data-testid="ingredient"]')
      .first()
      .within(() => {
        cy.contains('Добавить').click();
      });
    cy.get('[data-testid="constructor-bun"]').should('contain', 'верх');

    // Добавляем начинку через кнопку "Добавить"
    cy.get('[data-testid="category-main"] [data-testid="ingredient"]')
      .first()
      .within(() => {
        cy.contains('Добавить').click();
      });
    cy.get('[data-testid="constructor-ingredient"]').should('have.length', 1);
  });

  it('should open and close ingredient modal', () => {
    // Открываем модальное окно ингредиента
    cy.get('[data-testid="category-main"] [data-testid="ingredient"]')
      .first()
      .click();

    // Проверяем, что модальное окно открылось и содержит название ингредиента
    cy.get('[data-testid="modal"]')
      .should('be.visible')
      .and('contain', 'Биокотлета из марсианской Магнолии');

    // Закрываем модальное окно через крестик
    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('should create an order and clear constructor', () => {
    // Добавляем булку в конструктор
    cy.get('[data-testid="category-bun"] [data-testid="ingredient"]')
      .first()
      .within(() => {
        cy.contains('Добавить').click();
      });

    // Добавляем начинку
    cy.get('[data-testid="category-main"] [data-testid="ingredient"]')
      .first()
      .within(() => {
        cy.contains('Добавить').click();
      });

    // Клик на кнопку "Оформить заказ"
    cy.get('[data-testid="order-button"]').click();

    // Проверяем, что модальное окно с заказом открылось и содержит номер заказа
    cy.wait('@createOrder');
    cy.get('[data-testid="modal"]')
      .should('be.visible')
      .and('contain', 'Ваш заказ успешно принят!');
    cy.get('[data-testid="order-number"]').should('contain', '12345');

    // Закрываем модальное окно
    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');

    // Проверяем, что конструктор пуст
    cy.get('[data-testid="constructor-bun"]').should('not.exist');
    cy.get('[data-testid="constructor-ingredient"]').should('have.length', 0);
  });
});
