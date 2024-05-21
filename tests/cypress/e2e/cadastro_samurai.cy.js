/// <reference types="cypress" />

describe('cadastro de cliente', () => {

      const user = {
            name: ' João Tadeu S. Pereira',
            email: 'joaotadeu@gmail.com',
            password: '1234qwe'
      }

    it('deve cadastrar cliente com sucesso', () => {
      cy.task('removeUser', user.email)
            .then(function(result){
                  console.log(result)
            })

      cy.visit('http://localhost:3000/signup')
      cy.title()
            .should('eq', 'Samurai Barbershop by QAninja')

      cy.get('input[placeholder="Nome"]').type(user.name)
      cy.get('input[placeholder="E-mail"]').type(user.email)
      cy.get('input[placeholder="Senha"]').type(user.password)

      cy.contains('button[type="submit"]', 'Cadastrar').click()

      cy.get('.toast')
          .should('be.visible')
          .find('p')
          .should('have.text', 'Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
    })

    it('deve cadastrar cliente sem sucesso', () => {
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