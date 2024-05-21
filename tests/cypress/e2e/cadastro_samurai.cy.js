/// <reference types="cypress" />

describe('cadastro de cliente', () => {
    it('deve cadastrar cliente com sucesso', () => {
        const name = 'João Tadeu'
        const email = 'joaotadeu@gmail.com'
        const password = '1234qwe'

      cy.task('removeUser', email)
            .then(function(result){
                  console.log(result)
            })

      cy.visit('http://localhost:3000/signup')
      cy.title()
            .should('eq', 'Samurai Barbershop by QAninja')

      cy.get('input[placeholder="Nome"]').type(name)
      cy.get('input[placeholder="E-mail"]').type(email)
      cy.get('input[placeholder="Senha"]').type(password)

      cy.contains('button[type="submit"]', 'Cadastrar').click()
      
      cy.get('.toast')
          .should('be.visible')
          .find('p')
          .should('have.text', 'Agora você pode fazer seu login no Samurai Barbershop!')
    })

    it('deve cadastrar cliente sem sucesso', () => {
      const name = 'João Tadeu'
      const email = 'joaotadeu@gmail.com'
      const password = '1234qwe'

    cy.visit('http://localhost:3000/signup')
    cy.title()
          .should('eq', 'Samurai Barbershop by QAninja')

    cy.get('input[placeholder="Nome"]').type(name)
    cy.get('input[placeholder="E-mail"]').type(email)
    cy.get('input[placeholder="Senha"]').type(password)

    cy.contains('button[type="submit"]', 'Cadastrar').click()

    cy.get('.toast')
        .should('be.visible')
        .find('p')
        .should('have.text', 'Email já cadastrado para outro usuário.')


   
  })

  })