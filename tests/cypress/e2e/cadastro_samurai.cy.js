/// <reference types="cypress" />

import cadastroPage from '../support/pages/cadastro'

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
                  cadastroPage.homePage()
                  cadastroPage.formularioCadastro(user)
                  cadastroPage.cadastrar()
                  cadastroPage.toastText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
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
                  cadastroPage.homePage()
                  cadastroPage.formularioCadastro(user)
                  cadastroPage.cadastrar()
                  cadastroPage.toastText('Email já cadastrado para outro usuário.')
            })
      })

      context('Quando o email está incorreto', () => {

            const user = {
                  name: 'Manu Anjos',
                  email: 'manu.anjos.com',
                  password: '1234qwer'
            }


            it('Então deve efetuar a tentativa de cadastro com mensagem de alerta', () => {
                  cadastroPage.homePage()
                  cadastroPage.formularioCadastro(user)
                  cadastroPage.cadastrar()
                  cadastroPage.errorCiclo()
            })

      })
})