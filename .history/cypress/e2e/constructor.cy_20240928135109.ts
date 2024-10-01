describe('Constructor', () => {
  before(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'mockIngredients.json'
    }).as('loadIngredients');
  });

  beforeEach(() => {
    cy.viewport(1300, 800);
    cy.intercept('GET', 'api/auth/user', { fixture: 'mockUser.json' }).as(
      'loadUser'
    );

    cy.setCookie('accessToken', 'mockAccessToken');
    window.localStorage.setItem('refreshToken', 'mockRefreshToken');

    cy.visit('/');
  });

  afterEach(() => {
    cy.clearCookies();
    window.localStorage.removeItem('refreshToken');
  });

  describe('Ingredient Addition', () => {
    it('should add a bun to the burger constructor', () => {
      cy.get('h3').contains('Булки').next('ul').contains('Добавить').click();
      cy.get('.constructor-element_pos_top')
        .contains('Краторная булка N-200i')
        .should('exist');
    });

    it('should add a main ingredient to the burger', () => {
      cy.get('h3').contains('Начинки').next('ul').contains('Добавить').click();
      cy.get('.constructor-element')
        .contains('Биокотлета из марсианской Магнолии')
        .should('exist');
    });

    it('should add a sauce to the burger', () => {
      cy.get('h3').contains('Соусы').next('ul').contains('Добавить').click();
      cy.get('.constructor-element').contains('Соус Spicy-X').should('exist');
    });
  });

  describe('Ingredient Modal Functionality', () => {
    beforeEach(() => {
      cy.get('[data-testid=category-bun] li').first().click();
    });

    it('should open the ingredient modal', () => {
      cy.get('[id=modals]')
        .contains('Краторная булка N-200i')
        .should('be.visible');
    });

    it('should close the modal with the close button', () => {
      cy.get('[id=modals]').find('button').click();
      cy.get('[id=modals]').should('not.exist');
    });

    it('should close the modal by clicking on the overlay', () => {
      cy.get('[id=modals]').contains('Краторная булка N-200i').should('exist');
      cy.get('body').type('{esc}');
      cy.get('[id=modals]').should('not.exist');
    });
  });

  describe('Order Creation', () => {
    beforeEach(() => {
      cy.intercept('POST', 'api/orders', { fixture: 'mockOrder.json' }).as(
        'createOrder'
      );
    });

    it('should show the logged-in user in the header', () => {
      cy.get('header').contains('user').should('exist');
    });

    it('should create an order successfully', () => {
      cy.get('[data-testid=category-bun]').contains('Добавить').click();
      cy.get('[data-testid=category-main]').contains('Добавить').click();
      cy.get('[data-testid=category-sauce]').contains('Добавить').click();
      cy.get('[type=button]').contains('Оформить заказ').click();

      cy.wait('@createOrder', { timeout: 4000 })
        .its('response.statusCode')
        .should('equal', 200);

      cy.get('[id=modals]').contains('111111').should('be.visible');
      cy.get('[id=modals]').find('button').click().should('not.exist');

      cy.get('[id=root]')
        .should('contain', 'Выберите булки')
        .and('contain', 'Выберите начинку');
    });
  });
});

// describe('Constructor', () => {
//   beforeEach(() => {
//     cy.intercept('GET', 'api/ingredients', { fixture: 'mockIngredients.json' });
//     cy.intercept('POST', 'api/orders', { fixture: 'mockOrder.json' }).as(
//       'createOrder'
//     );
//     cy.intercept('GET', 'api/auth/user', { fixture: 'mockUser.json' }).as(
//       'fetchUser'
//     );
//     cy.viewport(3840, 2160);
//     cy.visit('/');
//     cy.setCookie('accessToken', 'mockAccessToken');
//     localStorage.setItem('refreshToken', 'mockAccessToken');
//   });

//   afterEach(() => {
//     cy.clearLocalStorage();
//     cy.clearCookies();
//   });

//   describe('Adding Ingredients to the burger constructor', () => {
//     it('should add buns to the burger constructor', () => {
//       cy.contains('Выберите булки').should('exist');
//       cy.get('[data-testid=category-bun]').contains('Добавить').click();
//       cy.get('.constructor-element_pos_top')
//         .contains('Краторная булка N-200i')
//         .should('exist');
//     });

//     it('should add ingredients to the burger construtcor', () => {
//       cy.contains('Выберите начинку').should('exist');
//       cy.get('[data-testid=category-main]').contains('Добавить').click();
//       cy.get('.constructor-element')
//         .contains('Биокотлета из марсианской Магнолии')
//         .should('exist');
//     });

//     it('should add sauces to the burger constructor', () => {
//       cy.contains('Выберите начинку').should('exist');
//       cy.get('[data-testid=category-sauce]').contains('Добавить').click();
//       cy.get('.constructor-element').contains('Соус Spicy-X').should('exist');
//     });
//   });

//   describe('Ingredient Modal Window', () => {
//     it('should display and close ingredient details', () => {
//       cy.get('[data-testid=category-bun] li').first().click();
//       cy.get('[id=modals]')
//         .contains('Краторная булка N-200i')
//         .should('be.visible');
//       cy.get('[id=modals]').find('button').click().should('not.exist');
//     });
//   });

//   describe('Order Processing', () => {
//     it('should display logged-in user in the header', () => {
//       cy.get('header').contains('user').should('exist');
//     });

//     it('should successfully create an order', () => {
//       cy.get('[data-testid=category-bun]').contains('Добавить').click();
//       cy.get('[data-testid=category-main]').contains('Добавить').click();
//       cy.get('[data-testid=category-sauce]').contains('Добавить').click();
//       cy.get('[type=button]').contains('Оформить заказ').click();

//       cy.wait('@createOrder', { timeout: 4000 })
//         .its('response.statusCode')
//         .should('eq', 200);

//       cy.get('[id=modals]').contains('111111').should('be.visible');
//       cy.get('[id=modals]').find('button').click().should('not.exist');

//       cy.get('[id=root]')
//         .should('contain', 'Выберите булки')
//         .and('contain', 'Выберите начинку');
//     });
//   });
// });
