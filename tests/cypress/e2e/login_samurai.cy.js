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
            email: 'mariaanjos@gmail.com',
            password: '123qwe',
            is_provider: true
        }

        before(() => {
            cy.postUser(user).then(() => {
                user.password = 'abc123'
            })
        })

        it('então não devo logar e devo retornar erro no campo senha', () => {
            loginPage.homePageLogin()
            loginPage.formularioLogin(user)
            loginPage.logar()
            loginPage.toast.deveExibirToast('Ocorreu um erro ao fazer login, verifique suas credenciais.')
        })
    })

    context('quando efetuo login com email invalido ', () => {


        const emails = [
            'joao.com.br',
            '@gmail.com',
            '@',
            'joao@',
            '1111',
            '#&&#¨@(&(!',
            'xpto123'
        ]

        emails.forEach((email) => {
            it('então não devo logar deve retornar erro no campo email: ' + email, () => {
                const user = { email: email, password: '123qwe' }

                loginPage.homePageLogin()
                loginPage.formularioLogin(user)
                loginPage.logar()
                loginPage.alertText('Informe um email válido')
            })
        })
    })
})