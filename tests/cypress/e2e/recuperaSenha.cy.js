/// <reference types="cypress" />

import esqueciSenhaPage from '../support/pages/esqueciSenha'

describe('Dado que efetuo recuperação de senha', function() {
    before(function(){
        cy.fixture('recovery').then(function(recovery) {
            this.dados = recovery 
        })
    })

    context('Quando o usuario esquece a senha', function(){

        before(function(){
            cy.postUser(this.dados)
        })

        it('então deve ter sucesso na recuperação da senha', function(){
                esqueciSenhaPage.homeEsqueciSenha()
                esqueciSenhaPage.formularioEsqueciSenha(this.dados.email)
                esqueciSenhaPage.recuperarSenha()
                esqueciSenhaPage.toast.deveExibirToast('Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.')

        })
    })
})