/// <reference types="cypress" />

describe('Webapp Status', () => {

  context('Quando eu tentar abrir a aplicação', () => {

    it('deve estar online', () => {
      cy.visit('http://localhost:3000/')
      cy.title()
        .should('eq', 'Samurai Barbershop by QAninja')
    })
  })
})