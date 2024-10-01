describe('BurgerConstructor Functionality', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'mockIngredients.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'mockOrder.json' }).as(
      'submitOrder'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'mockUser.json' }).as(
      'fetchUserInfo'
    );
    cy.viewport(3840, 2160);
    cy.visit('/');
    cy.setCookie('accessToken', 'testToken');
    localStorage.setItem('refreshToken', 'testRefreshToken');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  describe('Adding Ingredients into Burger Constructor', () => {
    it('should allow selecting a bun and placing it in the constructor', () => {
      cy.contains('Выберите булки').should('be.visible');
      cy.get('[data-testid=category-bun]').contains('Добавить').click();
      cy.get('.constructor-element_pos_top')
        .contains('Краторная булка N-200i')
        .should('be.visible');
    });

    it('should allow adding a main ingredient to the burger', () => {
      cy.contains('Выберите начинку').should('be.visible');
      cy.get('[data-testid=category-main]').contains('Добавить').click();
      cy.get('.constructor-element')
        .contains('Биокотлета из марсианской Магнолии')
        .should('exist');
    });

    it('should allow adding a sauce ingredient to the constructor', () => {
      cy.contains('Выберите начинку').should('be.visible');
      cy.get('[data-testid=category-sauce]').contains('Добавить').click();
      cy.get('.constructor-element').contains('Соус Spicy-X').should('exist');
    });
  });

  describe('Handling Ingredient Detail Modal', () => {
    it('should open and close the ingredient detail modal correctly', () => {
      cy.get('[data-testid=category-bun] li').first().click();
      cy.get('[id=modals]')
        .contains('Краторная булка N-200i')
        .should('be.visible');
      cy.get('[id=modals]').find('button').click();
      cy.get('[id=modals]').should('not.exist');
    });
  });

  describe('Order Creation Process', () => {
    it('should display user information in the header', () => {
      cy.get('header').contains('user').should('be.visible');
    });

    it('should process an order and show the confirmation modal', () => {
      cy.get('[data-testid=category-bun]').contains('Добавить').click();
      cy.get('[data-testid=category-main]').contains('Добавить').click();
      cy.get('[data-testid=category-sauce]').contains('Добавить').click();
      cy.get('[type=button]').contains('Оформить заказ').click();

      cy.wait('@submitOrder', { timeout: 4000 })
        .its('response.statusCode')
        .should('equal', 200);

      cy.get('[id=modals]').contains('111111').should('be.visible');
      cy.get('[id=modals]').find('button').click();
      cy.get('[id=modals]').should('not.exist');

      cy.get('[id=root]')
        .should('contain', 'Выберите булки')
        .and('contain', 'Выберите начинку');
    });
  });
});
