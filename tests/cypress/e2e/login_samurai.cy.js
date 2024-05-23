/// <reference types="cypress" />

import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('Login', () => {
    context('quando efetuo login com sucesso', () => {
        const user = {
            name: 'Maria José',
            email: 'mariajose@gmail.com',
            password: '123qwe'
        }

        it('então devo logar com sucesso', () => {
            loginPage.homePageLogin();
            loginPage.formularioLogin(user);
            loginPage.logar();

            dashPage.header.userLoggedIn(user.name)
        })

    })
})