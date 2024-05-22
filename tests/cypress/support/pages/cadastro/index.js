import { el } from './mapa_elements'

class cadastroPage {

    homePage() {
        cy.visit('http://localhost:3000/signup')
        cy.title()
            .should('eq', 'Samurai Barbershop by QAninja')
    }

    formularioCadastro(user) {
        cy.get(el.name).type(user.name)
        cy.get(el.email).type(user.email)
        cy.get(el.password).type(user.password)
    }

    cadastrar() {
        cy.contains(el.cadastrar).click()
    }

    toastText(expectText) {
        cy.get(el.toast)
            .should('be.visible')
            .find('p')
            .should('have.text', expectText)
    }

    errorCiclo() {
        cy.get('.sc-AxiKw')
            .should('be.visible')
    }
}

export default new cadastroPage()