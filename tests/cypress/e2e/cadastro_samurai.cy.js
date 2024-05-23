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
                  cadastroPage.toast.deveExibirToast('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
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
                  cadastroPage.toast.deveExibirToast('Email já cadastrado para outro usuário.')
            })
      })

      context('Quando o email está incorreto', () => {
            const user = {
                  name: 'Manu Anjos',
                  email: 'manu.anjos.com',
                  password: '1234qwer'
            }


            it('Então não deve cadastrar e apresentar erro no campo email', () => {
                  cadastroPage.homePage()
                  cadastroPage.formularioCadastro(user)
                  cadastroPage.cadastrar()
                  cadastroPage.errorCiclo()
            })

      })

      context('Quando a senha está incorreta', () => {
            const passwords = ['1', '2a', 'ab3', 'abc4', 'ab#c5', 'abc36']

            beforeEach(() => {
                  cadastroPage.homePage()
            })

            passwords.forEach((p) => {
                  it('Então não deve cadastrar e apresentar erro no campo senha', () => {
                        const user = {
                              name: 'Manu Anjos',
                              email: 'manu.anjos@gmail.com',
                              password: p
                        }
                        cadastroPage.formularioCadastro(user)
                        cadastroPage.cadastrar()
                  })
            })

            afterEach(() => {
                  cadastroPage.errorCiclo()
            })
      })

      context('Quando não preencho campos e tento cadastrar', () => {
            it('Então não deve cadastrar e apresentar erro', () => {
                  cadastroPage.homePage()
                  cadastroPage.cadastrar()
                  cadastroPage.errorCiclo()
            })
      })
})