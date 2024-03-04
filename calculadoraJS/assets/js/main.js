const form = document.querySelector('.form');
const inputPeso = form.querySelector('.peso');
const inputAltura = form.querySelector('.altura');
const resultado = document.querySelector('.resultado');


function exibeIMC () {
    
    form.addEventListener('submit', function calcularIMC (evento) {
        evento.preventDefault();
        
        let peso = Number(inputPeso.value);
        let altura = Number(inputAltura.value);

        if (peso == ' ' && altura == ' ') {
            resultado.innerHTML = `<p>Insira Valores.</p>`;
            return
        }

        if (!peso) {
            resultado.innerHTML = `<p>Peso Invalido.</p>`;
            return
        }

        if (!altura) {
            resultado.innerHTML = `<p>Altura Invalida.</p>`;
            return
        }

        
        const imc = (peso / (Math.pow(altura,2))).toFixed(2);

        if (imc < 18.5) {
            resultado.innerHTML = `<p>IMC: ${imc}, Abaixo do peso.</p>`;
        } else if (imc >= 18.5 && imc <= 24.9) {
            resultado.innerHTML = `<p>IMC: ${imc}, Peso Normal.</p>`;
        } else if (imc >= 25 && imc <= 29.9) {
            resultado.innerHTML = `<p>IMC: ${imc}, Sobrepeso.</p>`;
        }

    });

}

exibeIMC();