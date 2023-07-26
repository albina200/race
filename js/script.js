// localStorage.clear()
let link = document.querySelector('a');
let accountNumber;
let saveAccountNumber = localStorage.getItem('accountNumber');
if (saveAccountNumber) {
    accountNumber = parseInt(saveAccountNumber);
} else {
    accountNumber = 0;
}
if (accountNumber == 0) {
    link.classList.add('animation');
} else {
    link.classList.remove('animation');
}

let betNumber = 0;

let spanAccount = document.querySelector('.spanAccount');
spanAccount.innerHTML = accountNumber;
let spanBet = document.querySelector('.spanBet');

let buttonPlus = document.querySelector('.button__plus');
let buttonMinus = document.querySelector('.button__minus');
let buttonBidAll = document.querySelector('.button__bid-all');

let buttonOne = document.querySelector('.button__one');
let buttonTwo = document.querySelector('.button__two');

let buttonStart = document.querySelector('.button__start');

let allButton = document.querySelectorAll('.tablo__elements button');

let redCar = document.querySelector('.redCar');
let greyCar = document.querySelector('.greyCar');

let historyOl = document.querySelector('ol');
let saveHistoryOl = localStorage.getItem('historyOl');
if (saveHistoryOl) {
    historyOl.innerHTML = saveHistoryOl;
}

let debtBack = document.querySelector('.debt-back');
let debt = document.querySelector('.debt');
let debtSpan = document.querySelector('.debt span');
let debtNumber = 0;
let saveDebtNumber = localStorage.getItem('debtNumber');
if (saveDebtNumber) {
    debtNumber = parseInt(saveDebtNumber);
}

if (debtNumber == 0) {
    debt.classList.remove('debt__active');
    debtBack.classList.remove('debt-back_active');
} else {
    debt.classList.add('debt__active');
    debtBack.classList.add('debt-back_active');
    debtSpan.innerHTML = debtNumber;
}


let modulDebtBack = document.querySelector('.modul-debt-back');

let inputDebt = document.querySelector('input');
let buttonDebtBack = document.querySelector('.modul-debt-back button')

let win = false;

let selectedCarNumber = null;

buttonDebtBack.onclick = function () {
    let debtBackNumber = parseInt(inputDebt.value);

    if (debtBackNumber <= accountNumber) {
        accountNumber = accountNumber - debtBackNumber;
        debtNumber = debtNumber - debtBackNumber;
        debtSpan.innerHTML = debtNumber;
        spanAccount.innerHTML = accountNumber;
        inputDebt.value = '';
        modulDebtBack.classList.remove('modul-debt-back_active');
        localStorage.setItem('accountNumber', accountNumber);
        localStorage.setItem('debtNumber', debtNumber);

        if (debtNumber == 0) {
            debtBack.classList.remove('debt-back_active')
        }
        if (accountNumber = 0, debtBackNumber > 0) {
            link.classList.add('animation');
        }
        let li = document.createElement('li');
        li.innerHTML = 'Возврат долга на сумму: ' + debtBackNumber + '$. Текущий счёт: ' + accountNumber + '$.';
        historyOl.prepend(li);
        localStorage.setItem('historyOl', historyOl.innerHTML);/////
    }
}

link.onclick = function () {
    if (accountNumber == 0) {
        accountNumber = 40;
        spanAccount.innerHTML = accountNumber;
        link.classList.remove('animation');
        let li = document.createElement('li');
        li.innerHTML = 'Пополнение счёта. Текущий счёт = 40$';
        historyOl.prepend(li);
        localStorage.setItem('historyOl', historyOl.innerHTML);/////

        debt.classList.add('debt__active');
        debtNumber = debtNumber + 40;
        debtSpan.innerHTML = debtNumber;
        debtBack.classList.add('debt-back_active')

        localStorage.setItem('accountNumber', accountNumber);
        localStorage.setItem('debtNumber', debtNumber);
    } else {
        link.classList.remove('animation');
        debtBack.classList.add('debt-back_active')
        debt.classList.add('debt__active');
        // debtSpan.innerHTML = accountSpan;
    }
}

debtBack.onclick = function () {
    modulDebtBack.classList.add('modul-debt-back_active');
}

buttonPlus.onclick = function () {
    console.log(accountNumber)
    if (accountNumber > 0) {
        accountNumber = accountNumber - 10;
        betNumber = betNumber + 10;
        spanBet.innerHTML = betNumber;
        spanAccount.innerHTML = accountNumber;
        console.log(0);
    }
}

buttonMinus.onclick = function () {
    if (betNumber > 0) {
        betNumber = betNumber - 10;
        accountNumber = accountNumber + 10;
        spanBet.innerHTML = betNumber;
        spanAccount.innerHTML = accountNumber;
    }
}

buttonBidAll.onclick = function () {
    if (accountNumber > 0) {
        betNumber = betNumber + accountNumber;
        accountNumber = 0;

        spanBet.innerHTML = betNumber;
        spanAccount.innerHTML = accountNumber;
    }
}

buttonOne.onclick = function () {
    buttonOne.classList.add('button_active');
    buttonTwo.classList.remove('button_active');
    selectedCarNumber = 1;
}

buttonTwo.onclick = function () {
    buttonTwo.classList.add('button_active');
    buttonOne.classList.remove('button_active');
    selectedCarNumber = 2;
}

buttonStart.onclick = function () {
    if (betNumber > 0) {
        if (selectedCarNumber != null) {
            for (let i = 0; i < allButton.length; i++) {
                allButton[i].classList.add('_not-active');
            }
            win = false;

            let li = document.createElement('li');
            li.innerHTML = 'Ставка - ' + betNumber + '$ на машину под номером ' + selectedCarNumber + '.';
            historyOl.prepend(li);
            localStorage.setItem('historyOl', historyOl.innerHTML);/////

            if (Math.random > 0.5) {
                moveCar(redCar, 1, li);
                moveCar(greyCar, 2, li);
            } else {
                moveCar(greyCar, 2, li);
                moveCar(redCar, 1, li);
            }

        } else {
            alert('Выбери машину');
        }

    } else {
        alert('Сделайте ставку!')
    }

}

function moveCar(car, carNumber, li) {
    console.log(li);
    let progres = 0;
    let moveInterval = setInterval(() => {
        progres = progres + Math.random() * 0.1;
        car.style.left = progres + '%';
        if (progres > 85) {
            win = true;
            if (carNumber == selectedCarNumber) {
                accountNumber = accountNumber + (betNumber * 2);
                betNumber = 0;
                spanBet.innerHTML = betNumber;
                spanAccount.innerHTML = accountNumber;
                localStorage.setItem('accountNumber', accountNumber);

                let spanResult = document.createElement('span');
                spanResult.innerHTML = ' Победа! Текущий счёт = ' + accountNumber + '.';
                li.appendChild(spanResult);
                spanResult.classList.add('green');
                localStorage.setItem('historyOl', historyOl.innerHTML);/////

                for (let i = 0; i < allButton.length; i++) {
                    allButton[i].classList.remove('_not-active');
                }

                buttonOne.classList.remove('button_active');
                buttonTwo.classList.remove('button_active');
                selectedCarNumber = null;
            } else {
                betNumber = 0;
                spanBet.innerHTML = betNumber;
                localStorage.setItem('accountNumber', accountNumber);

                let spanResult = document.createElement('span');
                spanResult.innerHTML = ' Проигрышь! Текущий счёт = ' + accountNumber + '.';
                li.appendChild(spanResult);
                spanResult.classList.add('red');
                localStorage.setItem('historyOl', historyOl.innerHTML);/////

                for (let i = 0; i < allButton.length; i++) {
                    allButton[i].classList.remove('_not-active');
                }

                buttonOne.classList.remove('button_active');
                buttonTwo.classList.remove('button_active');
                selectedCarNumber = null;

                if (accountNumber == 0) {
                    link.classList.add('animation');
                }
            }
        }
        if (win == true) {
            clearInterval(moveInterval);
        }
    }, 5);
}


