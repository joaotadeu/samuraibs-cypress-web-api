Cypress.Commands.add('postUser', (user) => {
    cy.task('removeUser', user.email)
        .then(function (result) {
            console.log(result)
        })

    cy.request(
        'POST',
        'http://localhost:3333/users',
        user
    ).then(function (response) {
        expect(response.status).to.eq(200)
    })
})

Cypress.Commands.add('removeUser', (user) => {
    cy.task('removeUser', user.email)
        .then(function (result) {
            console.log(result)
        })
})