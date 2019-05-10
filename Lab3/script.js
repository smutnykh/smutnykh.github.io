function Generate() {
    let player1 = document.getElementById('player1');
    let player2 = document.getElementById('player2');
    player1.style.display = 'none';
    player2.style.display = 'none';
    var rows = document.getElementById('rows').value;
    var cols = document.getElementById('cols').value;
    let oldTable = document.getElementById('table');
    if(oldTable != null){
        oldTable.remove();
    }
    let rowPlayer1 = document.getElementById('row-player1');
    let rowPlayer2 = document.getElementById('row-player2');
    rowPlayer1.innerHTML = '';
    rowPlayer2.innerHTML = '';
    let input = document.createElement('input');
    let column = document.getElementById('col-table');
    input.className = 'form-control table-pol nums  inputs-number';
    if(rows <= 10 && cols <= 10 && rows > 1 && cols > 1) {
        let table = document.createElement('table');
        let caption = document.createElement('caption');
        caption.id = 'caption';
        caption.innerHTML = 'Початкова таблиця';
        table.appendChild(caption);
        for (let i = 0; i <= rows; i++) {
            tr = table.insertRow();
            for (let j = 0; j <= cols; j++) {
                tr.insertCell();
                if(i !== 0 && j !== 0)
                    table.rows[i].cells[j].innerHTML = '<input type=\"number\" class=\"form-control table-pol inp inputs-number\"/>';
                if (i === 0 && j > 0) {
                    table.rows[i].cells[j].innerHTML = 'B<sub>' + j + '</sub>';
                }
                if (j === 0 && i > 0) {
                    table.rows[i].cells[j].innerHTML = 'A<sub>' + i + '</sub>';
                }
            }
        }
        let tabs = document.getElementById('myTab');
        tabs.style.setProperty('display', 'flex', 'important');
        table.id = 'table';
        table.className = "table table-hover";
        column.appendChild(table);
        let range = document.getElementById('range');
        range.style.display = 'block';
        table.addEventListener('mouseover', Hover);
        table.addEventListener('mouseout', UnHover);
    }
    else
        alert("Некоректний ввід стратегій гравців");

}

function Fill() {
    let rowPlayer1 = document.getElementById('row-player1');
    let rowPlayer2 = document.getElementById('row-player2');
    rowPlayer1.innerHTML = '';
    rowPlayer2.innerHTML = '';
    var rows = document.getElementById('rows').value;
    var cols = document.getElementById('cols').value;
    let min = +document.getElementById('min').value;
    let max = +document.getElementById('max').value;
    let table = document.getElementById('table');
    if (min < max && min > -99 && min < 99 && max > -99 && max < 99){
        for (let i = 1; i <= rows; i++){
            for(let j = 1; j <= cols; j++){
                table.rows[i].cells[j].firstChild.value = Math.floor(Math.random() * (max - min + 1)) + min;
            }
        }
        let player1 = document.getElementById('player1');
        let player2 = document.getElementById('player2');
        let simplify = document.getElementById('simplify');
        player1.style.display = 'block';
        player2.style.display = 'block';
        simplify.style.display = 'block';
    }
    else
        alert("Некоректний ввід діапазону генерації випадкових чисел");
}

function Player1() {
    var rows = document.getElementById('rows').value;
    var cols = document.getElementById('cols').value;
    let table = document.getElementById('table');
    let rowPlayer = document.getElementById('row-player1');
    rowPlayer.innerHTML = '';
    let table2 = document.createElement('table');
    table2.id = 'table2';
    table2.className = "table";
    let caption = document.createElement('caption');
    caption.id = 'caption1';
    caption.innerHTML = 'Таблиця гравця 1';
    table2.appendChild(caption);
    for (let i = 0; i <= rows; i++) {
        tr = table2.insertRow();
        for (let j = 0; j <= cols; j++) {
            tr.insertCell();
            if(i !== 0 && j !== 0)
                table2.rows[i].cells[j].innerHTML = table.rows[i].cells[j].firstChild.value;
            if (i === 0 && j > 0) {
                table2.rows[i].cells[j].innerHTML = 'B<sub>' + j + '</sub>';
            }
            if (j === 0 && i > 0) {
                table2.rows[i].cells[j].innerHTML = 'A<sub>' + i + '</sub>';
            }
        }
    }
    rowPlayer.appendChild(table2);
    table2.addEventListener('click', Clicked);
    table2.addEventListener('mouseover', Hover);
    table2.addEventListener('mouseout', UnHover);
    let button = document.createElement("button");
    button.className = "btn btn-warning btn-block";
    button.innerText = "Визначити функції реакції першого гравця";
    button.id = 'button2';
    button.addEventListener('click', Player1Function);
    rowPlayer.appendChild(button);
}

function Player1Function() {
    let rowPlayer = document.getElementById('row-player1');
    var rows = document.getElementById('rows').value;
    var cols = document.getElementById('cols').value;
    let table2 = document.getElementById('table2');
    for(let j = 1; j <= cols; j++) {
        let array = [];
        for (let i = 1; i <= rows; i++) {
            array[i - 1] = +table2.rows[i].cells[j].textContent;
        }
        let p = document.createElement('p');
        p.innerHTML = 'Š<sub>p<sub>1</sub></sub>(' + table.rows[0].cells[j].innerHTML + ') = ';
        for (let i = 1; i <= rows; i++) {
            if(+table2.rows[i].cells[j].textContent === Math.max.apply(null, array)) {
                p.innerHTML += table2.rows[i].cells[0].innerHTML + ' ';
                if(+table2.rows[i].cells[j].classList.contains('red'))
                    table2.rows[i].cells[j].className = 'green';
                else
                    table2.rows[i].cells[j].className = 'blue';
            }
        }
        p.innerHTML +=  ' &nbsp; | &nbsp; Ǔ<sub>p<sub>1</sub></sub>(' + table2.rows[0].cells[j].innerHTML + ') = ' + Math.max.apply(null, array);
        rowPlayer.appendChild(p);
    }
    table2.removeEventListener('click', Clicked);
    let button = document.getElementById('button2');
    button.removeEventListener('click', Player1Function);
}

function Player2() {
    var rows = document.getElementById('rows').value;
    var cols = document.getElementById('cols').value;
    let table = document.getElementById('table');
    let rowPlayer = document.getElementById('row-player2');
    rowPlayer.innerHTML = '';
    let table3 = document.createElement('table');
    table3.id = 'table3';
    table3.className = "table table-hover";
    let caption = document.createElement('caption');
    caption.id = 'caption2';
    caption.innerHTML = 'Таблиця гравця 2';
    table3.appendChild(caption);
    for (let i = 0; i <= rows; i++) {
        tr = table3.insertRow();
        for (let j = 0; j <= cols; j++) {
            tr.insertCell();
            if(i !== 0 && j !== 0)
                table3.rows[i].cells[j].innerHTML = -table.rows[i].cells[j].firstChild.value;
            if (i === 0 && j > 0) {
                table3.rows[i].cells[j].innerHTML = 'B<sub>' + j + '</sub>';
            }
            if (j === 0 && i > 0) {
                table3.rows[i].cells[j].innerHTML = 'A<sub>' + i + '</sub>';
            }
        }
    }
    rowPlayer.appendChild(table3);
    table3.addEventListener('click', Clicked);
    let button = document.createElement("button");
    button.className = "btn btn-warning btn-block";
    button.innerText = "Визначити функції реакції другого гравця";
    button.id = 'button3';
    button.addEventListener('click', Player2Function);
    rowPlayer.appendChild(button);
}

function Hover(event){
    var rows = document.getElementById('rows').value;
    let cell = event.target;
    while (cell !== this) {
        if (cell.tagName === 'TD') break;
        cell = cell.parentNode;
    }
    if (cell === this) return;
    let table = event.currentTarget;
    let j = cell.cellIndex;
    for(i = 0; i <= rows; i++) {
        if(!table.rows[i].cells[j].classList.contains("red") && !table.rows[i].cells[j].classList.contains("green") &&
            !table.rows[i].cells[j].classList.contains("blue"))
            table.rows[i].cells[j].className = "hover";
    }
}

function UnHover(event){
    var rows = document.getElementById('rows').value;
    let cell = event.target;
    while (cell !== this) {
        if (cell.tagName === 'TD') break;
        cell = cell.parentNode;
    }
    if (cell === this) return;
    let table = event.currentTarget;
    let j = cell.cellIndex;
    for(i = 0; i <= rows; i++) {
        table.rows[i].cells[j].classList.remove("hover");
    }
}

function Player2Function() {
    let rowPlayer = document.getElementById('row-player2');
    var rows = document.getElementById('rows').value;
    var cols = document.getElementById('cols').value;
    let table3 = document.getElementById('table3');
    for (let i = 1; i <= rows; i++) {
        let array = [];
        for (let j = 1; j <= cols; j++) {
            array[j - 1] = +table3.rows[i].cells[j].textContent;
        }
        let p = document.createElement('p');
        p.innerHTML = 'Š<sub>p<sub>2</sub></sub>(' + table.rows[i].cells[0].innerHTML + ') = ';
        for (let j = 1; j <= cols; j++) {
            if (+table3.rows[i].cells[j].textContent === Math.max.apply(null, array)) {
                p.innerHTML += table3.rows[0].cells[j].innerHTML + ' ';
                if (+table3.rows[i].cells[j].classList.contains('red'))
                    table3.rows[i].cells[j].className = 'green';
                else
                    table3.rows[i].cells[j].className = 'blue';
            }
        }
        p.innerHTML += ' &nbsp; | &nbsp; Ǔ<sub>p<sub>2</sub></sub>(' + table.rows[i].cells[0].innerHTML + ') = ' + Math.max.apply(null, array);
        rowPlayer.appendChild(p);
    }
    table3.removeEventListener('click', Clicked);
    let button = document.getElementById('button3');
    button.removeEventListener('click', Player2Function);
}

function Clicked(event) {
    let cell = event.target;
    while (cell !== this) {
        if (cell.tagName === 'TD') break;
        cell = cell.parentNode;
    }
    if (cell === this) return;
    let table = event.currentTarget;
    let i = cell.parentNode.rowIndex;
    let j = cell.cellIndex;
    if(table.rows[i].cells[j].classList.contains("red") || i === 0 || j === 0)
        table.rows[i].cells[j].classList.remove("red");
    else
        table.rows[i].cells[j].className = "red";
}

function Simplify() {
    let table = document.getElementById('table');
    let simplifyTable = table.cloneNode(true);
    simplifyTable.firstChild.textContent = '';
    console.log(simplifyTable.firstChild);
    let tmpTable = table.cloneNode(true);
    tmpTable.firstChild.textContent = '';
    let flag = 0;
    let column = document.getElementById('col-simplify');
    column.innerHTML = '';
    do {
        flag = 0;
        for (let i = 1; i <= tmpTable.rows.length - 1; i++) {
            for (let j = 1; j <= tmpTable.rows.length - 1; j++) {
                count = 0;
                for (let len = 1; len <= tmpTable.rows[0].cells.length - 1; len++) {
                    if (+tmpTable.rows[i].cells[len].firstChild.value > +tmpTable.rows[j].cells[len].firstChild.value) {
                        count++;
                    }
                }
                if (count === tmpTable.rows[0].cells.length - 1) {
                    simplifyTable.deleteRow(j);
                    flag = 1;
                    let tmp = simplifyTable.cloneNode(true);
                    column.appendChild(tmp);
                    i = 0;
                    tmpTable = simplifyTable.cloneNode(true);
                    break;
                }
            }
        }
        for (let i = 1; i <= tmpTable.rows[0].cells.length - 1; i++) {
            console.log('i = ', i);
            for (let j = 1; j <= tmpTable.rows[0].cells.length - 1; j++) {
                console.log('j = ', j);
                count = 0;
                for (let len = 1; len <= tmpTable.rows.length - 1; len++) {
                    console.log('comparison ', tmpTable.rows[len].cells[i].firstChild.value, ' and ', tmpTable.rows[len].cells[j].firstChild.value);
                    if (+tmpTable.rows[len].cells[i].firstChild.value > +tmpTable.rows[len].cells[j].firstChild.value) {
                        console.log('confirmed ', tmpTable.rows[len].cells[i].firstChild.value, ' and ', tmpTable.rows[len].cells[j].firstChild.value);
                        count++;
                    }
                }
                console.log('count = ', count, 'length = ', tmpTable.rows.length - 1);
                if (count === tmpTable.rows.length - 1) {
                    for (let n = 0; n <= tmpTable.rows.length - 1; n++) {
                        simplifyTable.rows[n].deleteCell(j);
                    }
                    flag = 1;
                    let tmp = simplifyTable.cloneNode(true);
                    column.appendChild(tmp);
                    i = 0;
                    tmpTable = simplifyTable.cloneNode(true);
                    break;
                }
            }
        }
    } while (flag === 1);
    if(column.innerHTML === ''){
        column.innerHTML = 'Неможливо спростити гру'
    }
}