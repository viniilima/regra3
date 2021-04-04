const submitBtn = document.getElementById('submit');
const clearBtn = document.getElementById('clear');
const swapDiv = document.getElementById('swap');
const inputs = document.querySelectorAll('.calc-data');
const resultInput = document.getElementById('result');
const keys = {
    Enter() {
        calc();
    },

    c() {
        clear();
    },

    s() {
        swap();
    }
};

document.onload = clear();

// Functions

function calc() {
    for(let input of inputs) {
        if(input.value == null || input.value == '') {
            error('Preencha todos os campos');
            return;
        }
    }
    const a = document.getElementById('a').value;
    const b = document.getElementById('b').value;
    const c = document.getElementById('c').value;

    resultInput.value = (b / a) * c;
}

function clear() {
    inputs.forEach((input) => {
        input.value = null;
    });
    resultInput.value = null;
    inputs[0].focus();
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


// Event listeners

submitBtn.addEventListener('click', calc);

for(let input of inputs) {
    input.addEventListener('keyup', function(e) {
        try {
            const pressedKey = keys[e.key];
            pressedKey();
        } catch(e) {
            return;
        }
    });
}

clearBtn.addEventListener('click', clear);

swapDiv.addEventListener('click', swap);
