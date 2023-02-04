let allCells = document.querySelectorAll('.cell');//эта переменная в которую попали все ячейки
let audio = document.createElement('audio');//audio
let span = document.querySelector('span');//span в котором отображается кто ходит следующий
let botMove = true;//переменная которая показывает походил бот или ещё нет
let moveAmount = 0;
let winnerIs = false;
let combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [6, 4, 2],
    [0, 4, 8]
]
for (let i = 0; i < 9; i++) {//цикл который работает 9 раз, i каждый раз увеличивается на 1
    allCells[i].onclick = function () {//при нажатии на любую ячейку запускается функция
        console.log('ok');
        if (allCells[i].innerHTML == '' && botMove == true && winnerIs == false) {//если ячейка на которую нажали, пустая и бот уже походил
            allCells[i].innerHTML = 'X';//вписываем в эту ячейку Х
            span.innerHTML = '0';
            moveAmount = moveAmount + 1;
            win('X');
            botMove = false;//делаем так чтобы бот мог походить
            if (moveAmount < 9 && winnerIs == false) {
                setTimeout(() => {//ждём пол секунды
                    for (let i = 0; i < 8; i++) {//цикл который повторяется 8 раз
                        if (botMove == false) {//если ходит бот
                            let [a, b, c] = combinations[i];//создаём переменную для всех комбинаций
                            if (allCells[a].innerHTML == '0' && allCells[b].innerHTML == '0' && allCells[c].innerHTML == '') {//если третья клетка пустая 
                                botMoving(allCells[c])//
                            } else if (allCells[a].innerHTML == '0' && allCells[b].innerHTML == '' && allCells[c].innerHTML == '0') {//если вторая клетка пустая
                                botMoving(allCells[b])
                            } else if (allCells[a].innerHTML == '' && allCells[b].innerHTML == '0' && allCells[c].innerHTML == '0') {//если первая клетка пустая
                                botMoving(allCells[a])
                            }
                        }
                    }
                    for (let i = 0; i < 8; i++) {//цикл который повторяется 8 раз
                        if (botMove == false) {//если ходит бот
                            let [a, b, c] = combinations[i];//создаём переменную для всех комбинаций
                            if (allCells[a].innerHTML == 'X' && allCells[b].innerHTML == 'X' && allCells[c].innerHTML == '') {//если третья клетка пустая 
                                botMoving(allCells[c])
                            } else if (allCells[a].innerHTML == 'X' && allCells[b].innerHTML == '' && allCells[c].innerHTML == 'X') {//если вторая клетка пустая
                                botMoving(allCells[b])
                            } else if (allCells[a].innerHTML == '' && allCells[b].innerHTML == 'X' && allCells[c].innerHTML == 'X') {//если первая клетка пустая
                                botMoving(allCells[a])
                            }
                        }
                    }

                    while (botMove == false) {//повторять пока бот не походит
                        let randomNumber = Math.floor(Math.random() * (8 - 0 + 1) + 0);//переменная в которую попадает рандомное число от 0 до 8 
                        if (allCells[randomNumber].innerHTML == '') {//если ячейка которую выбрал бот пустая
                            botMoving(allCells[randomNumber])
                        }

                    }
                }, 1000);
            }
        } else {//иначе, если ячейка занята
            allCells[i].classList.add('error');//добавляем для этой ячейки класс
            audio.src = './audio/wide-design-z_uk-oshibki-windows.mp3';
            audio.play();
            setTimeout(() => {//ждём пол секунды
                allCells[i].classList.remove('error');//убираем у этой ячейки класс error
            }, 500);
        }
    }
}
function botMoving(chosenCell) {
    chosenCell.innerHTML = '0';
    span.innerHTML = 'X';
    botMove = true;//бот походил поэтому останавливаем поиск новой ячейки
    moveAmount = moveAmount + 1;
    win('0');
}
function win(symbol) {
    if (moveAmount > 4) {
        for (i = 0; i < 8; i++) {
            let [a, b, c] = combinations[i];
            if (allCells[a].innerHTML == symbol && allCells[b].innerHTML == symbol && allCells[c].innerHTML == symbol) {
                winnerIs = true;
                setTimeout(() => {
                    alert('Победил ' + symbol);
                    reset();
                }, 1200);
            }
        }
        if (moveAmount == 9 && winnerIs == false) {
            setTimeout(() => {
                alert('Ничья!');
                reset();
            }, 1200);
        }
    }
}
function reset() {
    for (i = 0; i < 9; i++){
        allCells[i].innerHTML = '';
    }
    moveAmount = 0;
    span.innerHTML = 'X';
    winnerIs = false;
    botMove = true;
}