const submitBtn = document.getElementById('submit');
const clearBtn = document.getElementById('clear');

function calc() {
    const inputs = document.querySelectorAll('.calc-data');
    inputs.forEach((input) => {
        if(input.value == null || input.value == '') {
            error('Preencha todos os campos');
            return;
        }
    });
    const a = document.getElementById('a').value;
    const b = document.getElementById('b').value;
    const c = document.getElementById('c').value;
    const resultInput = document.getElementById('result');

    resultInput.value = (b / a) * c;
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
