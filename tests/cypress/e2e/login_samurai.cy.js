/// <reference types="cypress" />

import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('Login', () => {
    context('quando efetuo login com sucesso', () => {
        const user = {
            name: 'Maria José',
            email: 'mariajose@gmail.com',
            password: '123qwe',
            is_provider: true
        }

        before(() => {
            cy.postUser(user)
        })

        it('então devo logar com sucesso', () => {
            loginPage.homePageLogin();
            loginPage.formularioLogin(user);
            loginPage.logar();

            dashPage.header.userLoggedIn(user.name)
        })

    })

    context('quando efetuo login sem sucesso da senha', () => {

        let user = {
            name: 'Maria Anjos',
            email:'mariaanjos@gmail.com',
            password: '123qwe',
            is_provider: true
        }

        before(() => {
            cy.postUser(user).then(() => {
                user.password = 'abc123'
            })
        })

        it('então não devo logar', () => {
            loginPage.homePageLogin()
            loginPage.formularioLogin(user)
            loginPage.logar()
            loginPage.toast.deveExibirToast('Ocorreu um erro ao fazer login, verifique suas credenciais.')
        })
    })
})