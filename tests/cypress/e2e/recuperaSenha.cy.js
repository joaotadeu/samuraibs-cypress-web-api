/// <reference types="cypress" />

import esqueciSenhaPage from '../support/pages/esqueciSenha'

describe('Dado que efetuo recuperação de senha', function() {

    before(function(){
        cy.fixture('recuperarSenha').then(function(recuperarSenha) {
            this.solicitar_recuperacao = recuperarSenha.solicitar_recuperacao 
        })
    })

    context.only('Quando o usuario esquece a senha', function(){

        before(function(){
            cy.postUser(this.solicitar_recuperacao)
        })

        it('então deve ter sucesso na recuperação da senha', function(){
                esqueciSenhaPage.homeEsqueciSenha()
                esqueciSenhaPage.formularioEsqueciSenha(this.solicitar_recuperacao)
                esqueciSenhaPage.recuperarSenha()
                esqueciSenhaPage.toast.deveExibirToast('Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.')

        })
    })

    context('Quando cliente solicita o resgate', function() {

        before(function(){
            cy.postUser(this.data)
        })

        it('Então deve porder cadastrar uma nova senha', function(){

        })
    })
})