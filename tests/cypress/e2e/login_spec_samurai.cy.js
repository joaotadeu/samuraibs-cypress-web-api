/// <reference types="cypress" />

import loginPage from '../support/pages/login'

describe('Login', () => {
    context('quando efetuo login com sucesso', () => {
        const user = {
            email: 'teste@gmail.com',
            password: '1234qwer'
        }

        it('então devo logar com sucesso', () => {
            loginPage.login();
            loginPage.formLogin(user);
            loginPage.logar();
        })

    })
})