/// <reference types="cypress" />

import loginPage from '../support/pages/login'
import areaLogada from '../support/pages/dash'
import {cliente, barbeiro} from '../support/factories/dash'

describe('Dado que o cliente está na area logada', function () {

    context('Quando o cliente faz um agendamento no App com sucesso', function () {

        before(function () {
            cy.postUser(barbeiro)
            cy.postUser(cliente)

            cy.apiLogin(cliente)
            cy.setProviderId(barbeiro.email)

            cy.log('ID do barbeiro é ' + Cypress.env('providerId'))
            cy.log('o Token é: ' + Cypress.env('apiToken'))
            cy.createAppointment()
        })

        it('Então o mesmo deve ser exibido no dashboard', function () {
            loginPage.homePageLogin()
            loginPage.formularioLogin(barbeiro)
            loginPage.logar()

            areaLogada.calendarioVisivel()
            
            const dia = Cypress.env('appointmentDay') 
            areaLogada.diaSelecionado(dia)

            areaLogada.apontamentoVisivel(cliente.name)
        })
    })
    
})