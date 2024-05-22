class cadastroPage {

    homePage() {
        cy.visit('http://localhost:3000/signup')
        cy.title()
            .should('eq', 'Samurai Barbershop by QAninja')
    }

    form(user) {
        cy.get('input[placeholder="Nome"]').type(user.name)
        cy.get('input[placeholder="E-mail"]').type(user.email)
        cy.get('input[placeholder="Senha"]').type(user.password)
    }

    cadastrar() {
        cy.contains('button[type="submit"]', 'Cadastrar').click()
    }

    toastText(expectText) {
        cy.get('.toast')
            .should('be.visible')
            .find('p')
            .should('have.text', expectText)
    }
}

export default new cadastroPage()