import{el} from './mapa_elements'
import toast from '../../components/toast'

class resetPassPage {

    constructor(){
        this.toast = toast
    }

    homeResetPassword(token) {
        cy.visit("http://localhost:3000/reset-password?token=" + token)
    }

    formularioNovaSenha(novaSenha, confirmaSenha){
        cy.get(el.senha)
            .clear()
            .type(novaSenha)

        cy.get(el.confirmaSenha)
            .clear()
            .type(confirmaSenha)
    }

    recuperarSenhaBotao(){
        cy.contains(el.mudaSenhaButton).click()
    }
}

export default new resetPassPage