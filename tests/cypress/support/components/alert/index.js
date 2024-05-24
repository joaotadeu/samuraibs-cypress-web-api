import { el } from './mapa_elements'

class Alert {
    deveTerTexto(expectedText) {
        cy.contains(el.error, expectedText, { timeout: 10000 })
            .should('be.visible')
            
    }
}

export default new Alert()