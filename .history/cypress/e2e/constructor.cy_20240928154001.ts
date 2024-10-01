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

  describe('Adding Ingredients to the burger constructor', () => {
    it('should add buns to the burger constructor', () => {
      cy.contains('Выберите булки').should('exist');
      cy.get('[data-testid=category-bun]').contains('Добавить').click();
      cy.get('.constructor-element_pos_top')
        .contains('Краторная булка N-200i')
        .should('exist');
    });

    it('should add ingredients to the burger constructor', () => {
      cy.contains('Выберите начинку').should('exist');
      cy.get('[data-testid=category-main]').contains('Добавить').click();
      cy.get('.constructor-element')
        .contains('Биокотлета из марсианской Магнолии')
        .should('exist');
    });

    it('should add sauces to the burger constructor', () => {
      cy.contains('Выберите начинку').should('exist');
      cy.get('[data-testid=category-sauce]').contains('Добавить').click();
      cy.get('.constructor-element').contains('Соус Spicy-X').should('exist');
    });
  });

  describe('Ingredient Modal Window', () => {
    it('should display and close ingredient details', () => {
      cy.get('[data-testid=category-bun] li').first().click();
      cy.get('[id=modals]')
        .contains('Краторная булка N-200i')
        .should('be.visible');
      cy.get('[id=modals]').find('button').click().should('not.exist');
    });
  });

  describe('Order Processing', () => {
    it('should display logged-in user in the header', () => {
      cy.get('header').contains('user').should('exist');
    });

    it('should successfully create an order', () => {
      cy.get('[data-testid=category-bun]').contains('Добавить').click();
      cy.get('[data-testid=category-main]').contains('Добавить').click();
      cy.get('button.common_button').debug().click();
cy.get('[data-testid=category-main]').contains('Филе Люминесцентного тетраодонтимформа').click(); // Второй основной ингредиент
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

    it('should show alert when trying to create order without ingredients', () => {
      cy.window().then((win) => {
        cy.stub(win, 'alert').as('alertStub');
      });

      cy.get('[type=button]').contains('Оформить заказ').click();
      cy.get('@alertStub').should('be.called');
      cy.get('@alertStub').should(
        'be.calledWith',
        'Выберите булки и начинки для оформления заказа'
      );
    });
  });
});
