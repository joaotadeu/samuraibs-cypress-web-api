import { el } from './mapa_elements'
import toast from '../../components/toast'
import alert from '../../components/alert'


class loginPage {

    constructor() {
        this.toast = toast
        this.alert = alert
    }
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

    alertText(expectText) {
        cy.contains(el.alertError, expectText)
            .should('be.visible')
    }

}

export default new loginPage()