describe('Burger Constructor Page', () => {
  beforeEach(() => {
    // Перехват запросов и предоставление моковых данных
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('POST', '**/auth/login', { fixture: 'login.json' }).as(
      'loginUser'
    );
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    // Переход на страницу конструктора
    cy.visit('/constructor');
    cy.wait('@getIngredients');
  });

  it('should display ingredients and add them to constructor', () => {
    // Проверка, что ингредиенты загрузились
    cy.get('[data-testid="category-bun"] [data-testid="ingredient"]').should(
      'have.length.greaterThan',
      0
    );

    // Добавляем булку в конструктор
    cy.get('[data-testid="category-bun"] [data-testid="ingredient"]')
      .first()
      .drag('[data-testid="constructor-drop-area"]');
    cy.get('[data-testid="constructor-bun"]').should('contain', 'верх');

    // Добавляем начинку
    cy.get('[data-testid="category-main"] [data-testid="ingredient"]')
      .first()
      .drag('[data-testid="constructor-drop-area"]');
    cy.get('[data-testid="constructor-ingredient"]').should('have.length', 1);
  });

  it('should open and close ingredient modal', () => {
    // Открываем модалку ингредиента
    cy.get('[data-testid="category-bun"] [data-testid="ingredient"]')
      .first()
      .click();
    cy.get('[data-testid="ingredient-modal"]').should('be.visible');

    // Закрываем модалку
    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="ingredient-modal"]').should('not.exist');
  });

  it('should place an order and clear constructor', () => {
    // Добавляем ингредиенты
    cy.get('[data-testid="category-bun"] [data-testid="ingredient"]')
      .first()
      .drag('[data-testid="constructor-drop-area"]');
    cy.get('[data-testid="category-main"] [data-testid="ingredient"]')
      .first()
      .drag('[data-testid="constructor-drop-area"]');

    // Оформляем заказ через кнопку с текстом "Оформить заказ"
    cy.contains('button', 'Оформить заказ').click();
    cy.wait('@createOrder');

    // Проверяем, что модалка заказа открыта и содержит номер заказа
    cy.get('[data-testid="order-number"]').should('contain', '12345');

    // Закрываем модалку
    cy.get('[data-testid="modal-close"]').click();

    // Проверяем, что конструктор очищен
    cy.get('[data-testid="constructor-bun"]').should('not.exist');
    cy.get('[data-testid="constructor-ingredient"]').should('not.exist');
  });
});
