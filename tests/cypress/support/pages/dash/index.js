import header from '../../components/header'
import { el } from './mapa_elementos'

class areaLogada {

    constructor() {
        this.header = header
    }

    calendarioVisivel() {
        cy.get(el.calendario, { timeout: 9000 })
            .should('be.visible')
    }

    diaSelecionado(dia) {
        const target = new RegExp('^' + dia + '$', 'g')
        cy.contains(el.diaSelecionado, target)
            .click()
    }

    apontamentoVisivel(cliente) {
        cy.contains('div', cliente, { timeout: 10000 })
            .should('be.visible')
            .then($el => {
                cy.log('Elemento encontrado: ', $el);
            });
        cy.log('sucesso');
    }

}

export default new areaLogada()