describe('Constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'mockIngredients.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'mockOrder.json' }).as(
      'createOrder'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'mockUser.json' }).as(
      'fetchUser'
    );
    cy.viewport(3840, 2160);
    cy.visit('/');
    cy.setCookie('accessToken', 'mockAccessToken');
    localStorage.setItem('refreshToken', 'testRefreshToken');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  describe('Burger Ingredients Management', () => {
    // Тесты добавления ингредиентов
  });

  describe('Ingredient Modal Window', () => {
    // Тесты модального окна ингредиентов
  });

  describe('Order Processing', () => {
    it('should display logged-in user in the header', () => {
      cy.get('header').contains('user').should('exist');
    });

    it('should successfully create an order', () => {
      cy.get('[data-testid=category-bun]').contains('Добавить').click();
      cy.get('[data-testid=category-main]').contains('Добавить').click();
      cy.get('[data-testid=category-sauce]').contains('Добавить').click();
      cy.get('[type=button]').contains('Оформить заказ').click();

      cy.wait('@createOrder', { timeout: 4000 })
        .its('response.statusCode')
        .should('eq', 200);

      cy.get('[id=modals]').contains('111111').should('be.visible');
      cy.get('[id=modals]').find('button').click().should('not.exist');

      cy.get('[id=root]')
        .should('contain', 'Выберите булки')
        .and('contain', 'Выберите начинку');
    });

    it('should not allow order creation without ingredients', () => {
      // Попытка оформления заказа без добавления ингредиентов
      cy.get('[type=button]').contains('Оформить заказ').click();

      // Здесь предполагается, что ваше приложение показывает сообщение об ошибке
      cy.get('.error-message') // Замените селектор на реальный, который используется для отображения ошибок
        .should('be.visible')
        .and('contain', 'Нельзя создать заказ без ингредиентов'); // Замените текст на реальный текст ошибки
    });
  });
});
