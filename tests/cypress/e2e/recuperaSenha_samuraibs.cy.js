/// <reference types="cypress" />

import esqueciSenhaPage from '../support/pages/esqueciSenha'
import resetPassword from '../support/pages/resetSenha'

describe('Dado que efetuo recuperação de senha', function () {

    before(function () {
        cy.fixture('recuperarSenha').then(function (recuperarSenha) {
            this.solicitar_recuperacao = recuperarSenha.solicitar_recuperacao
        })
    })

    context('Quando o usuario esquece a senha', function () {

        before(function () {
            cy.postUser(this.solicitar_recuperacao)
        })

        it('então deve ter sucesso na recuperação da senha', function () {
            esqueciSenhaPage.homeEsqueciSenha()
            esqueciSenhaPage.formularioEsqueciSenha(this.solicitar_recuperacao)
            esqueciSenhaPage.recuperarSenha()
            esqueciSenhaPage.toast.deveExibirToast('Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.')

        })
    })

    context.only('Quando cliente solicita o resgate', function () {

        before(function () {
            cy.postUser(this.solicitar_recuperacao)
            cy.recuperaSenha(this.solicitar_recuperacao.email)
        })

        it('Então deve porder cadastrar uma nova senha', function () {
            const token = (Cypress.env('recuperaToken'))
            
            resetPassword.homeResetPassword(token)
            resetPassword.formularioNovaSenha('123qwe','123qwe')
            resetPassword.recuperarSenhaBotao()

            resetPassword.toast.deveExibirToast('Agora você já pode logar com a sua nova senha secreta.')
          
        })
    })
})