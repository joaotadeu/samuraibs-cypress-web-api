import { el } from './mapa_elements'
import toast from '../../components/toast'
import alert from '../../components/alert'

class cadastroPage {

    constructor() {
        this.toast = toast
        this.alert = alert
    }

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

    errorCiclo() {
        cy.get('.sc-AxiKw')
            .should('be.visible')
    }
}

export default new cadastroPage()