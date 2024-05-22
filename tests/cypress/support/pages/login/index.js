class loginPage {
    login(){
        cy.visit('http://localhost:3000/')
        cy.title()
            .should('eq', 'Samurai Barbershop by QAninja')
    }

    formLogin(user) {
        cy.get("input[placeholder$='mail']").type(user.email)
        cy.get(" input[placeholder$='Senha']").type(user.password)  
    }

    logar(){
        cy.contains('button[type=submit]', 'Entrar')
            .click()
    }

}

export default new loginPage()