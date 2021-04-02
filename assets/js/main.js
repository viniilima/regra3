const submitBtn = document.getElementById('submit');
const clearBtn = document.getElementById('clear');
const swapDiv = document.getElementById('swap');
const inputs = document.querySelectorAll('.calc-data');
const resultInput = document.getElementById('result');

function calc() {
    inputs.forEach((input) => {
        if(input.value == null || input.value == '') {
            error('Preencha todos os campos');
            return;
        }
    });
    const a = document.getElementById('a').value;
    const b = document.getElementById('b').value;
    const c = document.getElementById('c').value;

    resultInput.value = (b / a) * c;
    resultInput.classList.add('success');
}

function clear() {
    inputs.forEach((input) => {
        input.value = null;
    });
    resultInput.value = null;
}

function swap() {
    const a = document.getElementById('a');
    const b = document.getElementById('b');
    const aux = a.value;
    a.value = b.value;
    b.value = aux;
}

function error(msg) {
    const errorDiv = document.getElementById('error');
    errorDiv.classList.remove('hidden');
    errorDiv.innerHTML = msg;
    setTimeout(() => {
        errorDiv.innerHTML = '';
        errorDiv.classList.add('hidden');
    }, 2000);
}

submitBtn.addEventListener('click', calc);

clearBtn.addEventListener('click', clear);

swapDiv.addEventListener('click', swap);
