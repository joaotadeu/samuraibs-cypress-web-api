import { el } from './mapa_elements'

class Header {
    userLoggedIn(userName) {
        cy.get('.sc-fzqBZW > div:nth-child(2) > a:nth-child(2) > strong:nth-child(1)', { timeout: 7000 })
            .should('have.text', userName)
    }
}

export default new Header()