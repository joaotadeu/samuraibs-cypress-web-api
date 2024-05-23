import { el } from './mapa_elements'

class loginPage {
    homePageLogin() {
        cy.visit('http://localhost:3000/')
        cy.title()
            .should('eq', 'Samurai Barbershop by QAninja')
    }

    formularioLogin(user) {
        cy.get(el.email).type(user.email)
        cy.get(el.password).type(user.password)
    }

    logar() {
        cy.contains(el.submitButton)
            .click()
    }

}

export default new loginPage()