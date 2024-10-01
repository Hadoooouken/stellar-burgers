describe('Burger Constructor Integration Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'mockIngredients.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'mockOrder.json' }).as('createOrder');
    cy.intercept('GET', 'api/auth/user', { fixture: 'mockUser.json' }).as('fetchUser');
    cy.viewport(3840, 2160);
    cy.visit('/');
    cy.setCookie('accessToken', 'mockAccessToken');
    localStorage.setItem('refreshToken', 'mockAccessToken');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  describe('Modal Window Functionality', () => {
    it('should display and close ingredient details', () => {
      // Открытие модального окна с деталями ингредиента
      cy.get('[data-testid=bun-category] li').first().click();
      cy.get('[id=modals]')
        .contains('Краторная булка N-200i')
        .should('be.visible');
      
      // Закрытие модального окна
      cy.get('[id=modals]').find('button').click().should('not.exist');
    });

    it('should close the modal when clicking on the overlay', () => {
      cy.get('[data-testid=bun-category] li').first().click();
      cy.get('[id=modals]')
        .find('div')
        .click({ multiple: true, force: true })
        .should('not.exist');
    });
  });

  describe('Adding Ingredients to the Burger Constructor', () => {
    it('should successfully add buns', () => {
      cy.contains('Выберите булки').should('exist');
      cy.get('[data-testid=bun-ingredients]').contains('Добавить').click();
      cy.get('.constructor-element_pos_top')
        .contains('Краторная булка N-200i')
        .should('exist');
    });

    it('should successfully add main ingredients', () => {
      cy.contains('Выберите начинку').should('exist');
      cy.get('[data-testid=main-ingredients]').contains('Добавить').click();
      cy.get('.constructor-element')
        .contains('Биокотлета из марсианской Магнолии')
        .should('exist');
    });

    it('should successfully add sauces', () => {
      cy.contains('Выберите начинку').should('exist');
      cy.get('[data-testid=sauce-ingredients]').contains('Добавить').click();
      cy.get('.constructor-element').contains('Соус Spicy-X').should('exist');
    });
  });

  describe('Order Processing', () => {
    it('should display the logged-in user in the header', () => {
      cy.get('header').contains('user').should('exist');
    });

    it('should successfully create an order and display the order number', () => {
      cy.get('[data-testid=bun-ingredients]').contains('Добавить').click();
      cy.get('[data-testid=main-ingredients]').contains('Добавить').click();
      cy.get('[data-testid=sauce-ingredients]').contains('Добавить').click();
      cy.get('[type=button]').contains('Оформить заказ').click();

      cy.wait('@createOrder', { timeout: 4000 })
        .its('response.statusCode')
        .should('eq', 200);

      cy.get('[id=modals]').contains('111111').should('be.visible');
      cy.get('[id=modals]').find('button').click().should('not.exist');

      // Проверка, что конструктор пуст после заказа
      cy.get('[id=root]')
        .should('contain', 'Выберите булки')
        .and('contain', 'Выберите начинку');
    });
  });
});
