// Guess the Number


const stage1 = document.getElementById('stage1');
const stage2 = document.getElementById('stage2');
const maximumInput = document.getElementById('maximum');
const startButton = document.getElementById('start');
const guessInput = document.getElementById('guess-number');
const guessButton = document.getElementById('guess-button');
const chancesSpan = document.getElementById('chances');
const restButton = document.getElementById('reset');
let guid = document.getElementById('guid');
let l1 = document.getElementById('L1');

let maximumNumber, totalChances, targetNumber;

startButton.addEventListener('click', startGame);

function startGame() {
    maximumNumber = Number(maximumInput.value);     // حداکثر عدد ورودی برای شروع بازی که در قسمت اینپوت وارد میکنیم
    if (maximumNumber > 10) {
        targetNumber = Math.floor(Math.random() * (maximumNumber + 1));
        totalChances = Math.floor(Math.log2(maximumNumber)) + 1;    // یک الگوریتم منطقی برای حداقل تعداد شانس در این بازی
        chancesSpan.textContent = ` ${totalChances} `;
        stage1.classList.toggle('hidden');
        stage2.classList.toggle('hidden');
    } else {
        const p = document.querySelector('#stage1 p');
        p.outerHTML = `<p class="red">عدد وارد شده باید بزرگتر از 10 باشد<p/>`;
    }
}


guessButton.addEventListener('click', guess);

function guess() {
    let yourGuess = Number(guessInput.value);

    let x = /^[1-9]?[0-9]{2}$|^1000$/;
    if (x.test(`${yourGuess}`) && yourGuess <= maximumNumber) {

        if (yourGuess == targetNumber) {
            stage2.innerHTML = `<p class="green">تبریک! شما موفق شدید.</p>`;
            return;
        }else if (yourGuess > targetNumber) {
            const status = document.getElementById('status');
            guid.innerHTML = `راهنما : <span class="orange">یه عدد کوچیکتر بگو</span>`;
            status.innerHTML += ` <span class="red">${yourGuess}</span> `;
        }else {
            const status = document.getElementById('status');
            guid.innerHTML = `راهنما : <span class="magenta">یه عدد بزرگتر بگو</span>`;
            status.innerHTML += ` <span class="blue">${yourGuess}</span> `;
        }

        let remainingChances = Number(chancesSpan.textContent);
        remainingChances--;

        if (remainingChances > 0) {
            chancesSpan.textContent = ` ${remainingChances} `;
        }else {
            stage2.innerHTML = `<p class="red">متاسفانه فرصت شما به پایان رسید!</p>`;
        }
        l1.innerHTML = ` <span class="green">عدد بعدی رو وارد کن!</span> `;

    }else {
        l1.innerHTML = ` <span class="red">لطفا یه عدد معتبر وارد کن!</span> `;
    }

}




restButton.addEventListener('click', resetGame);

function resetGame() {
    window.location.reload();
}
