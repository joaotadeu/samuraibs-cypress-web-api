/// <reference types="cypress" />

import loginPage from '../support/pages/login'

describe('Dado que o cliente está na area logada', function () {

    context('Quando o cliente faz um agendamento no App com sucesso', function () {
        const massaDados = {
            cliente: {
                name: 'Joao Tadeu S. Pereira',
                email: 'joaozinho@outlook.com',
                password: '123qwe',
                is_provider: false
            },
            barbeiro: {
                name: 'Seu madruga',
                email: 'ramon@televisa.com',
                password: '123qwe',
                is_provider: true
            }
        }

        before(function () {
            cy.postUser(massaDados.barbeiro)
            cy.postUser(massaDados.cliente)

            cy.apiLogin(massaDados.cliente)
            cy.setProviderId(massaDados.barbeiro.email)

            cy.log('ID do barbeiro é ' + Cypress.env('providerId'))
            cy.log('o Token é: ' + Cypress.env('apiToken'))
            cy.createAppointment()
        })

        it('Então o mesmo deve ser exibido no dashboard', function () {
            loginPage.homePageLogin()
            loginPage.formularioLogin(massaDados.barbeiro)
            loginPage.logar()
        })
    })
})