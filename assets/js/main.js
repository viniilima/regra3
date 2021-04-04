const submit_btn = document.getElementById('submit');
const clear_btn = document.getElementById('clear');
const swap_div = document.getElementById('swap');
const inputs = document.querySelectorAll('.calc-data');
const result_input = document.getElementById('result');
const settings_btn = document.getElementById('settings-btn');
const settings_popup = document.getElementById('settings-popup');

const keys = {
    Enter() {
        calc();
    },

    c() {
        clear();
    },

    s() {
        const swapIcon = document.getElementById('swap');
        swapIcon.style.transform = 'rotateY(180deg)';
        swap();
    }
};

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
    const roundValue = document.getElementById('round').value;

    result_input.value = (b / a) * c;
    result_input.classList.add('calc');
}

function clear() {
    inputs.forEach((input) => {
        input.value = null;
    });
    result_input.value = null;
    result_input.classList.remove('calc');
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

function settings_handler() {
    if(!settings_popup.classList.toggle('hidden')) {
        localStorage.setItem('show_settings', true);
    } else {
        localStorage.setItem('show_settings', false);
    }
}

// Event listeners

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

window.addEventListener('load', function() {
    clear();
    if(JSON.parse(localStorage.getItem('show_settings')))
        settings_popup.classList.remove('hidden');
});

submit_btn.addEventListener('click', calc);

clear_btn.addEventListener('click', clear);

swap_div.addEventListener('click', swap);

settings_btn.addEventListener('click', settings_handler);
