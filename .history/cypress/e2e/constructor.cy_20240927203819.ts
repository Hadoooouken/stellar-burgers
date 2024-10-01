describe('BurgerConstructor Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'mockIngredients.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'mockOrder.json' }).as(
      'placeOrder'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'mockuser.json' }).as(
      'fetchUser'
    );

    cy.setCookie('authToken', 'testAuthToken');
    localStorage.setItem('sessionToken', 'testSessionToken');
    cy.visit('/'); // Переход на главную страницу
    cy.viewport(1440, 900); // Изменен размер окна
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  describe('Burger Constructor Ingredient Adding', () => {
    it('should add buns to constructor', () => {
      cy.get('[data-cy="bun-category"]').contains('Добавить').click();
      cy.get('.constructor__element--top')
        .contains('Краторная булка N-200i')
        .should('exist');
    });

    it('should add fillings to constructor', () => {
      cy.get('[data-cy="main-category"]').contains('Добавить').click();
      cy.get('.constructor__element')
        .contains('Биокотлета из марсианской Магнолии')
        .should('exist');
    });

    it('should add sauces to constructor', () => {
      cy.get('[data-cy="sauce-category"]').contains('Добавить').click();
      cy.get('.constructor__element').contains('Соус Spicy-X').should('exist');
    });
  });

  describe('Modal Behavior', () => {
    it('should display ingredient details in modal and close it', () => {
      cy.get('[data-cy="bun-category"] li').first().click();
      cy.get('[id="modal"]')
        .contains('Краторная булка N-200i')
        .should('be.visible');
      cy.get('[id="modal"]').find('.modal__close-btn').click();
      cy.get('[id="modal"]').should('not.exist');
    });

    it('should close modal by clicking on the overlay', () => {
      cy.get('[data-cy="sauce-category"] li').first().click();
      cy.get('[id="modal"] .overlay').click({ force: true });
      cy.get('[id="modal"]').should('not.exist');
    });
  });

  describe('Order Creation Process', () => {
    it('should correctly display user name in header', () => {
      cy.get('header').contains('userMock').should('exist');
    });

    it('should successfully create an order and reset constructor', () => {
      // Добавление ингредиентов
      cy.get('[data-cy="bun-category"]').contains('Добавить').click();
      cy.get('[data-cy="main-category"]').contains('Добавить').click();
      cy.get('[data-cy="sauce-category"]').contains('Добавить').click();

      // Оформление заказа
      cy.get('button').contains('Оформить заказ').click();
      cy.wait('@placeOrder').its('response.statusCode').should('eq', 200);

      // Проверка модального окна заказа
      cy.get('[id="modal"]').contains('1').should('be.visible');
      cy.get('[id="modal"] .modal__close-btn').click();

      // Проверка сброса конструктора
      cy.get('.constructor__empty-message')
        .should('contain', 'Выберите булки')
        .and('contain', 'Выберите начинку');
    });
  });
});

// describe('BurgerConstructor', () => {
//   beforeEach(() => {
//     cy.intercept('GET', 'api/ingredients', { fixture: 'mockIngredients.json' });
//     cy.intercept('POST', 'api/orders', { fixture: 'mockOrder.json' }).as(
//       'makeOrder'
//     );
//     cy.intercept('GET', 'api/auth/user', { fixture: 'mockUser.json' }).as(
//       'getUser'
//     );
//     cy.setCookie('accessToken', 'testToken');
//     localStorage.setItem('refreshToken', 'testRefreshToken');
//     cy.visit('/'); // Переход на главную страницу
//     cy.viewport(1920, 1080); // Установка размера окна
//   });

//   afterEach(() => {
//     cy.clearLocalStorage(); // Очистка localStorage
//     cy.clearCookies(); // Очистка cookies
//   });

//   describe('Adding Ingredients to Constructor', () => {
//     it('should allow adding buns to the constructor', () => {
//       cy.contains('Выберите булки').should('exist');
//       cy.get('[data-testid=category-bun]').contains('Добавить').click();
//       cy.get('.constructor-element_pos_top')
//         .contains('Краторная булка N-200i')
//         .should('exist');
//     });

//     it('should allow adding main ingredients to the constructor', () => {
//       cy.contains('Выберите начинку').should('exist');
//       cy.get('[data-testid=category-main]').contains('Добавить').click();
//       cy.get('.constructor-element')
//         .contains('Биокотлета из марсианской Магнолии')
//         .should('exist');
//     });

//     it('should allow adding sauce ingredients to the constructor', () => {
//       cy.contains('Выберите начинку').should('exist');
//       cy.get('[data-testid=category-sauce]').contains('Добавить').click();
//       cy.get('.constructor-element').contains('Соус Spicy-X').should('exist');
//     });
//   });

//   describe('Ingredient Modal', () => {
//     it('should open and close the ingredient modal', () => {
//       cy.get('[data-testid=category-bun] li').first().click();
//       cy.get('[id=modals]')
//         .contains('Краторная булка N-200i')
//         .should('be.visible');
//       cy.get('[id=modals]').find('button').click().should('not.exist');
//     });

//     it('should close the modal by overlay click', () => {
//       cy.get('[data-testid=category-bun] li').first().click();
//       cy.get('[id=modals]')
//         .find('div')
//         .click({ multiple: true, force: true })
//         .should('not.exist');
//     });
//   });

//   describe('Order Creation', () => {
//     it('should display user data in the header', () => {
//       cy.get('header').contains('user').should('exist');
//     });

//     it('should create an order successfully', () => {
//       cy.get('[data-testid=category-bun]').contains('Добавить').click();
//       cy.get('[data-testid=category-main]').contains('Добавить').click();
//       cy.get('[data-testid=category-sauce]').contains('Добавить').click();
//       cy.get('[type=button]').contains('Оформить заказ').click();

//       cy.wait('@makeOrder', { timeout: 1000 })
//         .its('response.statusCode')
//         .should('eq', 200);

//       // Проверка отображения номера заказа
//       cy.get('[id=modals]').contains('1').should('be.visible');
//       cy.get('[id=modals]').find('button').click().should('not.exist');

//       // Проверка сброса конструктора
//       cy.get('[id=root]')
//         .should('contain', 'Выберите булки')
//         .and('contain', 'Выберите начинку');
//     });
//   });
// });
