/// <reference types="cypress" />

describe('Dado que o cliente está na area logada', function () {

    context('Quando o cliente faz um agendamento no appMobile', function () {
        const massaDados = {
            cliente: {
                name: 'Joao tadeu',
                email: 'joaozinho@outlook.com',
                password: '123qwe',
                is_provider: false
            },
            barbeiro: {
                name: 'Ramon Valdes',
                email: 'ramon@televisa.com',
                password: '123qwe',
                is_provider: true
            }
        }

        before(function () {
            cy.postUser(massaDados.barbeiro)
            cy.postUser(massaDados.cliente)

            cy.apiLogin(massaDados.cliente)
            
            cy.apiLogin(massaDados.cliente).then((token) => {
                cy.log('Token recuperado: ' + token);
            });
        })

        it('Então o mesmo deve ser exibido no dashboard', function () {
            cy.log('Massa de Dados')
        })
    })
})