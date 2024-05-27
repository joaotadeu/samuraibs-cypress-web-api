import header from '../../components/header'
import { el } from './mapa_elementos'

class areaLogada {

    constructor() {
        this.header = header
    }

    calendarioVisivel() {
        cy.get('.DayPicker', {timeout: 9000})
                .should('be.visible')
    }

    diaSelecionado(dia){
        const target = new RegExp('^' + dia + '$', 'g')
        cy.contains('.DayPicker-Day--available', target)
            .click()
    }

    apontamentoVisivel(cliente) {
        cy.log('sucesso')
    }

}

export default new areaLogada()