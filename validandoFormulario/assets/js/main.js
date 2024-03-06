class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario');
        this.eventos();
    }

    eventos() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        const camposValidos = this.isValid();
        const senhasValidas = this.passwordValid();

        if (camposValidos && senhasValidas) {
            alert('Formulária Enviado');
            this.formulario.submit();
        } else {

        }
    }

    passwordValid() {
        let valido = true;

        const senha = this.formulario.querySelector('.senha');
        const repetirSenha = this.formulario.querySelector('.repetir-senha');

        if (senha.value !== repetirSenha.value) {
            valido = false;
            this.criaErro(senha, 'Senha e Repetir Senha precisam ser iguais');
            this.criaErro(repetirSenha, 'Senha e Repetir Senha precisam ser iguais');
        }

        if (senha.length < 6 || senha.length > 12) {
            valido = false;
            this.criaErro(senha, 'Senha deve conter entre 6 e 12 caracteres');
        }

        return valido;
    }
    
    isValid() {
        let valido = true;

        for (let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove();
        }
        
        for (let campo of this.formulario.querySelectorAll('.validar')) {
            let label = campo.previousElementSibling.innerText;
            
            if (campo.value === '') {
                this.criaErro(campo, `Campo ${label} não pode estar vazio!`);
                valido = false;
            }

            if (campo.classList.contains('cpf')) {
                if (!this.validaCPF(campo)) valido = false;
            }

            if (campo.classList.contains('usuario')) {
                if (!this.validaUsuario(campo)) valido = false;

            }


        }

        return valido;
    }

    validaUsuario(campo) {
        const usuario = campo.value;
        let valido = true;

        if (usuario.length > 12 || usuario.length < 3) {
            this.criaErro(campo, 'Usuario deve conter entre 3 e 12 caracteres');
            valido = false;
        }

        if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
            this.criaErro(campo, 'Deve conter apenas letras e numeros');
            valido = false;
        }

        return valido;
    }

    validaCPF(campo) {
        const cpf = new ValidaCPF(campo.value);

        if (!cpf.valida()) {
            this.criaErro(campo, 'CPF Invalido');
            return false;
        }
        return true;
    }

    criaErro(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);

    }
}

const valida = new ValidaFormulario();