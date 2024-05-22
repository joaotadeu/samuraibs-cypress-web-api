/// <reference types="cypress" />

describe('Dado que cadastro de cliente', () => {

      context('Quando o usuario é novo', () => {
            const user = {
                  name: ' João Tadeu S. Pereira',
                  email: 'joaotadeu@samurai.com',
                  password: '1234qwe',
            }

            before(() => {
                  cy.task('removeUser', user.email)
                        .then(function (result) {
                              console.log(result)
                        })
            })

            it('então deve cadastrar cliente com sucesso', () => {

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

      })

      context('Quando o usuario já existe', () => {
            const user = {
                  name: 'Diana Anjos',
                  email: 'diana@samurai1.com',
                  password: '123qwe',
                  is_provider: true
            }

            before(() => {
                  cy.task('removeUser', user.email)
                        .then(function (result) {
                              console.log(result)
                        })

                  cy.request(
                        'POST',
                        'http://localhost:3333/users',
                        user
                  ).then(function (response) {
                        expect(response.status).to.eq(200)
                  })
            })

            it('deve cadastrar cliente sem sucesso', () => {

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
                        .should('have.text', 'Email já cadastrado para outro usuário.')
            })

      })

})