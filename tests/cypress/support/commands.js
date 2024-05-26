Cypress.Commands.add('postUser', function (user) {
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

Cypress.Commands.add('removeUser', function (email) {
    cy.task('removeUser', email)
        .then(function (result) {
            console.log(result)
        })
})

Cypress.Commands.add('recuperaSenha', function (email) {
    cy.request(
        'POST',
        'http://localhost:3333/password/forgot',
        { email: email }
    ).then(function (response) {
        expect(response.status).to.eq(204)

        cy.task('encontrarToken', email)
            .then(function (result) {
                //console.log(result.token)
                Cypress.env('recuperaToken', result.token)
            })
    })

})

Cypress.Commands.add('apiLogin', function (user) {
    const payload = {
        email: user.email,
        password: user.password
    }

    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/sessions',
        body: payload
    }).then(function (response) {
        expect(response.status).to.eq(200);
        
        const token = response.body.token;
        Cypress.env('apiToken', token);
        return token;
    })
})