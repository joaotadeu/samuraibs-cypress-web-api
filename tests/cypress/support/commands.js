import moment from 'moment'

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
    }).then((response) => {
        expect(response.status).to.eq(200)

        const token = response.body.token;
        Cypress.env('apiToken', token);

        if (!token) {
            throw new Error('Token não está disponível. Certifique-se de que apiLogin foi executado.');
        }
    })
})

Cypress.Commands.add('setProviderId', function (barbeiroEmail) {
    const token = Cypress.env('apiToken');

    if (!token) {
        throw new Error('Token não está disponível. Certifique-se de que apiLogin foi executado.');
    }
    
    cy.request({
        method: 'GET',
        url: 'http://localhost:3333/providers',
        headers: {
            authorization: 'Bearer ' + token
        }
    }).then(function (response) {
        expect(response.status).to.eq(200)
        console.log(response.body)
        
        const providerList = response.body
        providerList.forEach(function (provider) {
            if (provider.email == barbeiroEmail) {
                Cypress.env('providerId', provider.id)
            }
        })
    })
})

Cypress.Commands.add('createAppointment', function () {
    let now = new Date()
    now.setDate(now.getDate() + 1)
    const date = moment(now).format('YYYY-MM-DD 14:00:00')

    const token = Cypress.env('apiToken');
    const providerId = Cypress.env('providerId');

    const payload = {
        provider_id: providerId,
        date: date
    }

    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/appointments',
        body: payload,
        headers: {
            authorization: 'Bearer ' + token
        }
    }).then(function (response) {
        expect(response.status).to.eq(200)
        cy.log('Agendamento criado com sucesso para ' + date)
    })
})