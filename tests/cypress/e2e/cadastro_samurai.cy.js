/// <reference types="cypress" />

import cadastroPage from '../support/pages/cadastro'

describe('Dado que cadastro de cliente', function () {

      before(function () {
            cy.fixture('cadastro').then(function (cadastro) {
                  this.cadastro_sucesso = cadastro.cadastro_sucesso
                  this.email_jaExiste = cadastro.email_jaExiste
                  this.email_incorreto = cadastro.email_incorreto
            })
      })

      context('Quando o usuario é novo', function () {

            before(function () {
                  cy.removeUser(this.cadastro_sucesso.email)
            })

            it('então deve cadastrar cliente com sucesso', function () {
                  cadastroPage.homePage()
                  cadastroPage.formularioCadastro(this.cadastro_sucesso)
                  cadastroPage.cadastrar()
                  cadastroPage.toast.deveExibirToast('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
            })
      })

      context('Quando o usuario já existe', function () {

            before(function () {
                  cy.postUser(this.email_jaExiste)
            })

            it('deve cadastrar cliente sem sucesso', function () {
                  cadastroPage.homePage()
                  cadastroPage.formularioCadastro(this.email_jaExiste)
                  cadastroPage.cadastrar()
                  cadastroPage.toast.deveExibirToast('Email já cadastrado para outro usuário.')
            })
      })

      context('Quando o email está incorreto', function () {

            it('Então não deve cadastrar e apresentar erro no campo email', function () {
                  cadastroPage.homePage()
                  cadastroPage.formularioCadastro(this.email_incorreto)
                  cadastroPage.cadastrar()
                  cadastroPage.errorCiclo()
            })

      })

      context('Quando a senha está incorreta', function () {
            const passwords = ['1', '2a', 'ab3', 'abc4', 'ab#c5', 'abc36']

            beforeEach(function () {
                  cadastroPage.homePage()
            })

            passwords.forEach((p) => {
                  it('Então não deve cadastrar e apresentar erro no campo senha', function () {
                        const user = {
                              name: 'Manu Anjos',
                              email: 'manu.anjos@gmail.com',
                              password: p
                        }
                        cadastroPage.formularioCadastro(user)
                        cadastroPage.cadastrar()
                  })
            })

            afterEach(function () {
                  cadastroPage.errorCiclo()
            })
      })

      context('Quando não preencho campos e tento cadastrar', function () {
            it('Então não deve cadastrar e apresentar erro', function () {
                  cadastroPage.homePage()
                  cadastroPage.cadastrar()
                  cadastroPage.errorCiclo()
            })
      })
})