/// <reference types="cypress" />

describe('Webapp Status', () => {
  it('deve estar online', () => {
    cy.visit('http://localhost:3000/')
    cy.title()
      .should('eq', 'Samurai Barbershop by QAninja')
  })
})