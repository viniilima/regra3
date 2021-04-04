const submit_btn = document.getElementById('submit');
const clear_btn = document.getElementById('clear');
const swap_div = document.getElementById('swap');
const inputs = document.querySelectorAll('.calc-data');
const result_input = document.getElementById('result');
const settings_btn = document.getElementById('settings-btn');
const settings_popup = document.getElementById('settings-popup');
const round_input = document.getElementById('round');
const copy_icon = document.getElementById('copy');

const keys = {
    Enter() {
        if(empty_input(true)) return;
        calc();
    },

    c() {
        clear();
    },

    s() {
        const swapIcon = document.getElementById('swap');
        swapIcon.style.transform = 'rotateY(180deg)';
        swap();
    },

    r() {
        round_input.focus();
    }
};

// Functions

function calc() {
    const a = document.getElementById('a').value;
    const b = document.getElementById('b').value;
    const c = document.getElementById('c').value;

    result_input.value = ((b / a) * c).toFixed(localStorage.getItem('round_value'));
    result_input.classList.add('calc');
    copy_icon.parentElement.classList.remove('hidden');
}

function empty_input(show_error_message) {
    for(let input of inputs) {
        if(input.value == null || input.value == '') {
            if(show_error_message) error('Preencha todos os campos');
            return true;
        }
    }
    return false;
}

function clear() {
    inputs.forEach((input) => {
        input.value = null;
    });
    result_input.value = null;
    result_input.classList.remove('calc');
    inputs[0].focus();
    copy_icon.parentElement.classList.add('hidden');
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

function round_handler() {
    if(round_input.value == '') return;
    localStorage.setItem('round_value', round_input.value);
    if(empty_input(false)) return;
    calc();
}

function copy_result() {
    const msg = document.getElementById('copied');
    msg.classList.remove('hidden');
    setTimeout(() => {
        msg.classList.add('hidden');
    }, 2000);

    const txt_area = document.createElement('textarea');
    txt_area.value = result_input.value;
    document.body.appendChild(txt_area);
    txt_area.select();
    document.execCommand('copy');
    document.body.removeChild(txt_area);
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
    const round_value = localStorage.getItem('round_value');
    if(round_value == null) {
        localStorage.setItem('round_value', 2);
        round_value = 2;
    }
    round_input.value = round_value;
});

submit_btn.addEventListener('click', function() {
    if(empty_input(true)) return;
    calc();
});

clear_btn.addEventListener('click', clear);

swap_div.addEventListener('click', swap);

settings_btn.addEventListener('click', settings_handler);

round_input.addEventListener('input', round_handler);

copy_icon.addEventListener('click', copy_result);

document.addEventListener('keydown', function(e) {
    if(e.key == 'Control') {
        document.addEventListener('keydown', function(e) {
            if(e.key == 'c') {
                if(result_input.value == null) return;
                copy_result();
            }
        });
    }
});
