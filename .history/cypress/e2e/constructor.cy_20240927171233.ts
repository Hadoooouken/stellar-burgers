// describe('BurgerConstructor', () => {
//   beforeEach(() => {
//     cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
//     cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
//       'makeOrder'
//     );
//     cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
//       'getUser'
//     );
//     cy.setCookie('accessToken', 'testToken');
//     localStorage.setItem('refreshToken', 'testRefreshToken');
//     cy.visit('/');
//     cy.viewport(1920, 1080);
//   });

//   afterEach(() => {
//     cy.clearLocalStorage();
//     cy.clearCookies();
//   });

//   describe('Add ingredients to constructor', () => {
//     it('add buns to constructor', () => {
//       cy.contains('Выберите булки').should('exist');
//       cy.get('[data-testid=category-bun]').contains('Добавить').click();
//       cy.get('.constructor-element_pos_top')
//         .contains('Краторная булка N-200i')
//         .should('exist');
//     });

//     it('add main ingredients to constructor', () => {
//       cy.contains('Выберите начинку').should('exist');
//       cy.get('[data-testid=category-main]').contains('Добавить').click();
//       cy.get('.constructor-element')
//         .contains('Биокотлета из марсианской Магнолии')
//         .should('exist');
//     });

//     it('add sauce ingredients to constructor', () => {
//       cy.contains('Выберите начинку').should('exist');
//       cy.get('[data-testid=category-sauce]').contains('Добавить').click();
//       cy.get('.constructor-element').contains('Соус Spicy-X').should('exist');
//     });
//   });

//   describe('ingredients modal', () => {
//     it('open and close ingredients modal', () => {
//       cy.get('[data-testid=category-bun] li').first().click();
//       cy.get('[id=modals]')
//         .contains('Краторная булка N-200i')
//         .should('be.visible');
//       cy.get('[id=modals]').find('button').click().should('not.exist');
//     });

//     it('close by overlay', () => {
//       cy.get('[data-testid=category-bun] li').first().click();
//       cy.get('[id=modals]')
//         .find('div')
//         .click({ multiple: true, force: true })
//         .should('not.exist');
//     });
//   });

//   describe('create order', () => {
//     it('user data', () => {
//       cy.get('header').contains('user').should('exist');
//     });

//     it('should be successfully creation', () => {
//       cy.get('[data-testid=category-bun]').contains('Добавить').click();
//       cy.get('[data-testid=category-main]').contains('Добавить').click();
//       cy.get('[data-testid=category-sauce]').contains('Добавить').click();
//       cy.get('[type=button]').contains('Оформить заказ').click();

//       cy.wait('@makeOrder', { timeout: 1000 })
//         .its('response.statusCode')
//         .should('eq', 200);

//       // Проверка номера заказа, который возвращается в JSON
//       cy.get('[id=modals]').contains('1').should('be.visible');
//       cy.get('[id=modals]').find('button').click().should('not.exist');

//       cy.get('[id=root]')
//         .should('contain', 'Выберите булки')
//         .and('contain', 'Выберите начинку');
//     });
//   });
// });
describe('BurgerConstructor', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('makeOrder');
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.setCookie('accessToken', 'testToken');
    localStorage.setItem('refreshToken', 'testRefreshToken');
    cy.visit('/'); // Переход на главную страницу
    cy.viewport(1920, 1080); // Установка размера окна
  });

  afterEach(() => {
    cy.clearLocalStorage(); // Очистка localStorage
    cy.clearCookies(); // Очистка cookies
  });

  describe('Adding Ingredients to Constructor', () => {
    it('should allow adding buns to the constructor', () => {
      cy.contains('Выберите булки').should('exist');
      cy.get('[data-testid=category-bun]').contains('Добавить').click();
      cy.get('.constructor-element_pos_top').contains('Краторная булка N-200i').should('exist');
    });

    it('should allow adding main ingredients to the constructor', () => {
      cy.contains('Выберите начинку').should('exist');
      cy.get('[data-testid=category-main]').contains('Добавить').click();
      cy.get('.constructor-element').contains('Биокотлета из марсианской Магнолии').should('exist');
    });

    it('should allow adding sauce ingredients to the constructor', () => {
      cy.contains('Выберите начинку').should('exist');
      cy.get('[data-testid=category-sauce]').contains('Добавить').click();
      cy.get('.constructor-element').contains('Соус Spicy-X').should('exist');
    });
  });

  describe('Ingredient Modal', () => {
    it('should open and close the ingredient modal', () => {
      cy.get('[data-testid=category-bun] li').first().click();
      cy.get('[id=modals]').contains('Краторная булка N-200i').should('be.visible');
      cy.get('[id=modals]').find('button').click().should('not.exist');
    });

    it('should close the modal by overlay click', () => {
      cy.get('[data-testid=category-bun] li').first().click();
      cy.get('[id=modals]').find('div').click({ multiple: true, force: true }).should('not.exist');
    });
  });

  describe('Order Creation', () => {
    it('should display user data in the header', () => {
      cy.get('header').contains('user').should('exist');
    });

    it('should create an order successfully', () => {
      cy.get('[data-testid=category-bun]').contains('Добавить').click();
      cy.get('[data-testid=category-main]').contains('Добавить').click();
      cy.get('[data-testid=category-sauce]').contains('Добавить').click();
      cy.get('[type=button]').contains('Оформить заказ').click();

      cy.wait('@makeOrder', { timeout: 1000 })
        .its('response.statusCode')
        .should('eq', 200);

      // Проверка отображения номера заказа
      cy.get('[id=modals]').contains('1').should('be.visible');
      cy.get('[id=modals]').find('button').click().should('not.exist');

      // Проверка сброса конструктора
      cy.get('[id=root]')
        .should('contain', 'Выберите булки')
        .and('contain', 'Выберите начинку');
    });
  });
});
