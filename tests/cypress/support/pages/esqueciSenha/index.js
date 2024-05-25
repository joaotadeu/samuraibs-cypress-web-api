import { el } from "./mapa_elements"
import toast from '../../components/toast'

class esqueciSenhaPage {

    constructor(){
        this.toast = toast
    }

    homeEsqueciSenha() {
        cy.visit('http://localhost:3000/forgot-password')
    }

    formularioEsqueciSenha(email){
        cy.get(el.email)
            .clear()
            .type(email)
    }

    recuperarSenha(){
        cy.contains('button[type=submit]', 'Recuperar')
                .click()
    }


}
export default new esqueciSenhaPage()