import { el } from './mapa_elements'

class Toast {
    deveExibirToast(expectText) {
        cy.get(el.toast, {timeout: 50000})
            .should('be.visible')
            .find('p')
            .should('have.text', expectText)
    }

}
export default new Toast()