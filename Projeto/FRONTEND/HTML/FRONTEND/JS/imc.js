const form = document.getElementById('form');
const weight = document.getElementById('weight');
const alto = document.getElementById('alto');
const span = document.getElementById('values');
const descricaoTexto = document.getElementById('descricao-texto');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const weightValue = Number(weight.value);
    const altoValue = Number(alto.value);
    const imc = weightValue / (altoValue * altoValue);
    span.textContent = imc.toFixed(1);

    let descricao = '';
    if (imc < 18.5) {
        descricao = 'Abaixo do peso';
    } else if (imc < 25) {
        descricao = 'Peso normal';
    } else if (imc < 30) {
        descricao = 'Sobrepeso';
    }
    else if (imc < 35) {
        descricao = 'Obesidade grau 1';
    }
    else if (imc < 40) {
        descricao = 'Obesidade grau 2';
    }
    else {
        descricao = 'Obesidade grau 3';
    }
    descricaoTexto.textContent = descricao;
});