/// <reference types="cypress" />

describe('AddPostModal Component Tests', () => {
  beforeEach(() => {
    localStorage.setItem('loginInfo', JSON.stringify({ email: 'email', password: 'password' }))
    cy.visit('/main');
  });

  it('should open the modal to add a post', () => {
    cy.get('.add-btn').click(); // Знайдіть і натисніть кнопку для відкриття модального вікна
    cy.get('#add_post_item_modal_label').should('contain', 'Add post');
  });

  it('should add a new post', () => {
    cy.get('.add-btn').click();
    cy.get('#add_title_post').type('Test Post Title');
    cy.get('#post-text-input').type('Test Post Description');
    cy.get('.btn-primary.btn-dark').click(); // Знайдіть і натисніть кнопку для збереження посту

    // Перевірте, чи пост був доданий на сторінку
    cy.get('.card-header').should('contain', 'Test Post Title');
    cy.get('.card-text').should('contain', 'Test Post Description');
  });

  it('should open the modal to edit an existing post', () => {
    // Спочатку додайте пост для редагування
    cy.get('.add-btn').click();
    cy.get('#add_title_post').type('Test Post Title');
    cy.get('#post-text-input').type('Test Post Description');
    cy.get('.btn-primary.btn-dark').click();

    // Натисніть кнопку для редагування посту (використовуйте правильний селектор для кнопки редагування)
    cy.get('.edit-btn').first().click();
    cy.get('#add_post_item_modal_label').should('contain', 'Edit post');
  });

  it('should edit an existing post', () => {
    // Спочатку додайте пост для редагування
    cy.get('.add-btn').click();
    cy.get('#add_title_post').type('Test Post Title');
    cy.get('#post-text-input').type('Test Post Description');
    cy.get('.btn-primary.btn-dark').click();

    // Редагуйте пост
    cy.get('.edit-btn').first().click();
    cy.get('#add_title_post').clear().type('Updated Post Title');
    cy.get('.btn-primary.btn-dark').click();

    // Перевірте, чи пост був оновлений
    cy.get('.card-header').should('contain', 'Updated Post Title');
  });

  it('should delete a post', () => {
    // Спочатку додайте пост для видалення
    cy.get('.add-btn').click();
    cy.get('#add_title_post').type('Test Post Title');
    cy.get('#post-text-input').type('Test Post Description');
    cy.get('.btn-primary.btn-dark').click();

    // Натисніть кнопку для видалення посту (використовуйте правильний селектор для кнопки видалення)
    cy.get('.remove-btn').first().click();

    // Перевірте, чи пост був видалений
    cy.get('.card-header').should('not.exist');
  });
});
