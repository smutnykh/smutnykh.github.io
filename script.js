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
        table.className = "table-hover";
        column.appendChild(table);
        let range = document.getElementById('range');
        range.style.display = 'block';
        table.addEventListener('mouseover', Hover);
        table.addEventListener('mouseout', UnHover);
        let columnSimplify = document.getElementById('col-simplify');
        columnSimplify.innerHTML = '';
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
        let column = document.getElementById('col-simplify');
        column.innerHTML = '';
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
    table2.className = "table-hover";
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
        p.innerHTML = 'Š<sub>p<sub>1</sub></sub>(' + table2.rows[0].cells[j].innerHTML + ') = ';
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
    table3.className = "table-hover";
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
    for(i = 0; i <= table.rows.length - 1; i++) {
        if(!table.rows[i].cells[j].classList.contains("red") && !table.rows[i].cells[j].classList.contains("green") &&
            !table.rows[i].cells[j].classList.contains("blue"))
            table.rows[i].cells[j].className += " hover";
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
    for(i = 0; i <= table.rows.length - 1; i++) {
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
        p.innerHTML = 'Š<sub>p<sub>2</sub></sub>(' + table3.rows[i].cells[0].innerHTML + ') = ';
        for (let j = 1; j <= cols; j++) {
            if (+table3.rows[i].cells[j].textContent === Math.max.apply(null, array)) {
                p.innerHTML += table3.rows[0].cells[j].innerHTML + ' ';
                if (+table3.rows[i].cells[j].classList.contains('red'))
                    table3.rows[i].cells[j].className = 'green';
                else
                    table3.rows[i].cells[j].className = 'blue';
            }
        }
        p.innerHTML += ' &nbsp; | &nbsp; Ǔ<sub>p<sub>2</sub></sub>(' + table3.rows[i].cells[0].innerHTML + ') = ' + Math.max.apply(null, array);
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
    let tmpTable = table.cloneNode(true);
    let flag = 0;
    step = 0;
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
                    step++;
                    let formula = document.createElement('div');
                    formula.innerHTML = 'Крок ' + step + ': u<sub>P<sub>1</sub></sub>('+ simplifyTable.rows[i].cells[0].innerHTML +'; S<sub>P<sub>2</sub></sub>) ' +
                        '> u<sub>P<sub>1</sub></sub>(' + simplifyTable.rows[j].cells[0].innerHTML + '; S<sub>P<sub>2</sub></sub>)';
                    formula.className = 'formula';
                    column.appendChild(formula);
                    flag = 1;
                    let tmp = simplifyTable.cloneNode(true);
                    tmp.removeChild(tmp.firstChild);
                    RowDomination(tmp, i, j);
                    tmp.addEventListener('mouseover', Hover);
                    tmp.addEventListener('mouseout', UnHover);
                    column.appendChild(tmp);
                    simplifyTable.deleteRow(j);
                    i = 0;
                    tmpTable = simplifyTable.cloneNode(true);
                    break;
                }
            }
        }
        for (let i = 1; i <= tmpTable.rows[0].cells.length - 1; i++) {
            for (let j = 1; j <= tmpTable.rows[0].cells.length - 1; j++) {
                count = 0;
                for (let len = 1; len <= tmpTable.rows.length - 1; len++) {
                    if (+tmpTable.rows[len].cells[i].firstChild.value < +tmpTable.rows[len].cells[j].firstChild.value) {
                        count++;
                    }
                }
                if (count === tmpTable.rows.length - 1) {
                    step++;
                    let formula = document.createElement('div');
                    formula.innerHTML = 'Крок ' + step + ': u<sub>P<sub>2</sub></sub>(' + simplifyTable.rows[0].cells[i].innerHTML + '; S<sub>P<sub>1</sub></sub>) ' +
                        '> u<sub>P<sub>2</sub></sub>(' + simplifyTable.rows[0].cells[j].innerHTML + '; S<sub>P<sub>1</sub></sub>)';
                    formula.className = 'formula';
                    column.appendChild(formula);
                    flag = 1;
                    let tmp = simplifyTable.cloneNode(true);
                    tmp.removeChild(tmp.firstChild);
                    ColumnDomination(tmp, i, j);
                    tmp.addEventListener('mouseover', Hover);
                    tmp.addEventListener('mouseout', UnHover);
                    column.appendChild(tmp);
                    for (let n = 0; n <= tmpTable.rows.length - 1; n++) {
                        simplifyTable.rows[n].deleteCell(j);
                    }
                    i = 0;
                    tmpTable = simplifyTable.cloneNode(true);
                    break;
                }
            }
        }
    } while (flag === 1);
    let graphTable;
    if(column.innerHTML === ''){
        column.innerHTML = '<h2>Неможливо спростити гру</h2>';
        graphTable = table.cloneNode(true);
    }
    else{
        let formula = document.createElement('div');
        formula.textContent = 'Спрощена матриця гри:';
        formula.className = 'formula';
        column.appendChild(formula);
        let tmp = simplifyTable.cloneNode(true);
        tmp.removeChild(tmp.firstChild);
        column.appendChild(tmp);
        graphTable = tmp.cloneNode(true);
    }
    ClearCanvases();
    if(+graphTable.rows.length === 3 && +graphTable.rows[0].cells.length === 3){
        DrawGraph('column-my-canvas1', 'my-canvas1', 'a', graphTable.rows[1].cells[0].textContent.substring(1, graphTable.rows[1].cells[0].textContent.length), graphTable.rows[2].cells[0].textContent.substring(1, graphTable.rows[1].cells[0].textContent.length), 'p');
        DrawGraph('column-my-canvas2', 'my-canvas2', 'b', graphTable.rows[1].cells[0].textContent.substring(1, graphTable.rows[0].cells[1].textContent.length), graphTable.rows[0].cells[2].textContent.substring(1, graphTable.rows[1].cells[0].textContent.length), 'q');
        MakeLine('my-canvas1', +graphTable.rows[1].cells[1].firstChild.value, +graphTable.rows[2].cells[1].firstChild.value);
        MakeLine('my-canvas1', +graphTable.rows[1].cells[2].firstChild.value, +graphTable.rows[2].cells[2].firstChild.value);
        MakeLine('my-canvas2', +graphTable.rows[1].cells[1].firstChild.value, +graphTable.rows[1].cells[2].firstChild.value);
        MakeLine('my-canvas2', +graphTable.rows[2].cells[1].firstChild.value, +graphTable.rows[2].cells[2].firstChild.value);
    }
    else{
        let info = document.getElementById('info');
        info.textContent = 'Неможливо подубувати графіки';
    }
}

function RowDomination(table, i, j) {
    for (let len = 1; len <= table.rows[0].cells.length - 1; len++) {
        table.rows[i].cells[len].className += 'blue';
        table.rows[j].cells[len].className += 'red';
    }
}

function ColumnDomination(table, i, j) {
    for (let len = 1; len <= table.rows.length - 1; len++) {
        table.rows[len].cells[i].className += 'blue';
        table.rows[len].cells[j].className += 'red';
    }
}

function Game_Price() {
    var rows = document.getElementById('rows').value;
    var cols = document.getElementById('cols').value;
    let table = document.getElementById('table');
    let rowPlayer = document.getElementById('game-price');
    rowPlayer.innerHTML = '';
    let table2 = document.createElement('table');
    table2.id = 'table_game';
    table2.className = "table-hover";
    let caption = document.createElement('caption');
    caption.id = 'caption_game';
    caption.innerHTML = 'Ціна гри';
    table2.appendChild(caption);
    let header;
    for (let i = 0; i <= rows; i++) {
        tr = table2.insertRow();
        for (let j = 0; j <= cols; j++) {
            tr.insertCell();
            if(i !== 0 && j !== 0)
                table2.rows[i].cells[j].innerHTML = table.rows[i].cells[j].firstChild.value;
            if (i === 0 && j > 0) {
                header = 'B<sub>' + j + '</sub>';
                header = header.bold();
                table2.rows[i].cells[j].innerHTML = header;
            }
            if (j === 0 && i > 0) {
                header = 'A<sub>' + i + '</sub>';
                header = header.bold();
                table2.rows[i].cells[j].innerHTML = header;
            }
        }
    }
    tr = table2.insertRow();
    let text, array = [], count = 0, alpha = [], beta = [];
    for (i = 0; i < table2.rows[0].cells.length; i++) {
        count = 0;
        if(i === 0){
            text = 'β';
            text = text.bold();
        }
        else{
            for (let j = 1; j < table2.rows.length - 1; j++){
                array[count] = +table2.rows[j].cells[i].innerText;
                count++;
            }
            text = Math.max.apply(null, array).toString();
        }
        text = text.fontcolor("#1e88e5");
        tr.insertCell().innerHTML = text;
    }
    for (i = 0; i < table2.rows.length - 1; i++) {
        count = 0;
        if(i === 0){
            text = 'α';
            text = text.bold();
        }
        else{
            for (let j = 1; j < table2.rows[0].cells.length - 1; j++){
                array[count] = +table2.rows[i].cells[j].innerText;
                count++;
            }
            text = Math.min.apply(null, array).toString();
        }
        text = text.fontcolor("#ed4c67");
        tr = table2.rows[i];
        tr.insertCell().innerHTML = text;
    }
    count = 0;
    for(let i = 1; i < table2.rows[0].cells.length - 1; i++) {
        beta[count] = table2.rows[table2.rows.length - 1].cells[i].textContent;
        count++;
    }
    let min = Math.min.apply(null, beta);
    for(let i = 1; i < table2.rows[0].cells.length - 1; i++) {
        if(+table2.rows[table2.rows.length - 1].cells[i].textContent === min){
            table2.rows[table2.rows.length - 1].cells[i].className = 'beta';
            console.log(table2.rows[table2.rows.length - 1].cells[i].textContent);
        }

    }
    count = 0;
    for(let i = 1; i < table2.rows.length - 1; i++) {
        alpha[count] = table2.rows[i].cells[table2.rows[0].cells.length - 1].textContent;
        count++;
    }
    let max = Math.max.apply(null, alpha);
    for(let i = 1; i < table2.rows.length - 1; i++) {
        if(+table2.rows[i].cells[table2.rows[0].cells.length - 1].textContent === max){
            table2.rows[i].cells[table2.rows[0].cells.length - 1].className = 'alpha';
            console.log(table2.rows[table2.rows.length - 1].cells[i].textContent);
        }

    }
    if(max === min) {
        for (let i = 1; i < table2.rows.length - 1; i++) {
            for (let j = 1; j < table2.rows[0].cells.length - 1; j++) {
                if(+table2.rows[i].cells[j].textContent === min){
                    table2.rows[i].cells[j].className = 'dot';
                }
            }
        }
    }
    rowPlayer.appendChild(table2);
    table2.addEventListener('mouseover', Hover);
    table2.addEventListener('mouseout', UnHover);
}

function DrawGraph(column_name, canvas_name, gamer, gamer_number1, gamer_number2, frequency,) {
    let info = document.getElementById('info');
    info.textContent = '';
    let canvas = document.createElement('canvas');
    canvas.id = canvas_name;
    canvas.setAttribute('width', 500);
    canvas.setAttribute('height', 550);
    let column = document.getElementById(column_name);
    column.appendChild(canvas);

    let grid_size = 25;
    let x_axis_distance_grid_lines = 11;
    let y_axis_distance_grid_lines = 1;
    let x_axis_starting_point = { number: 1, suffix: '' };
    let y_axis_starting_point = { number: 1, suffix: '' };

    let ctx = canvas.getContext("2d");

// canvas width
    let canvas_width = canvas.width;

// canvas height
    let canvas_height = canvas.height;

// no of vertical grid lines
    let num_lines_x = Math.floor(canvas_height/grid_size);

// no of horizontal grid lines
    let num_lines_y = Math.floor(canvas_width/grid_size);

// Draw grid lines along Y-axis
    for(i=0; i<=num_lines_y; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;

        // If line represents Y-axis draw in different color
        if(i == y_axis_distance_grid_lines || i == (num_lines_y - y_axis_distance_grid_lines))
            ctx.strokeStyle = "#000000";
        else
            ctx.strokeStyle = "#e9e9e9";

        if(i == num_lines_y) {
            ctx.moveTo(grid_size*i, 0);
            ctx.lineTo(grid_size*i, canvas_height);
        }
        else {
            ctx.moveTo(grid_size*i+0.5, 0);
            ctx.lineTo(grid_size*i+0.5, canvas_height);
        }
        ctx.stroke();
    }

// Draw grid lines along X-axis
    for(var i=0; i<=num_lines_x; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;

        // If line represents X-axis draw in different color
        if(i == x_axis_distance_grid_lines)
            ctx.strokeStyle = "#000000";
        else
            ctx.strokeStyle = "#e9e9e9";

        if(i == num_lines_x) {
            ctx.moveTo(0, grid_size*i);
            ctx.lineTo(canvas_width, grid_size*i);
        }
        else {
            ctx.moveTo(0, grid_size*i+0.5);
            ctx.lineTo(canvas_width, grid_size*i+0.5);
        }
        ctx.stroke();
    }

    ctx.translate(y_axis_distance_grid_lines*grid_size, x_axis_distance_grid_lines*grid_size);

// Ticks marks along the positive X-axis
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000000";

    // Draw a tick mark 6px long (-3 to 3)
    ctx.moveTo(grid_size*(num_lines_y - y_axis_distance_grid_lines - 1)+0.5, -3);
    ctx.lineTo(grid_size*(num_lines_y - y_axis_distance_grid_lines - 1)+0.5, 3);
    ctx.stroke();

    // Text value at that point
    ctx.font = '9px Arial';
    ctx.textAlign = 'end';
    ctx.fillText(1 + x_axis_starting_point.suffix, grid_size*(num_lines_y - y_axis_distance_grid_lines - 1)-2, 15);
    ctx.textAlign = 'start';
    ctx.fillText(frequency, grid_size*(num_lines_y - y_axis_distance_grid_lines - 1)+5, 15);

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000000";

    // Draw a tick mark 6px long (-3 to 3)
    ctx.moveTo(0.5, -3);
    ctx.lineTo(0.5, 3);
    ctx.stroke();

    // Text value at that point
    ctx.font = '9px Arial';
    ctx.textAlign = 'end';
    ctx.fillText(0 + x_axis_starting_point.suffix, -2, 15);

// Ticks marks along the negative X-axis
    for(i=1; i<y_axis_distance_grid_lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";

        // Draw a tick mark 6px long (-3 to 3)
        ctx.moveTo(-grid_size * i + 0.5, -3);
        ctx.lineTo(-grid_size * i + 0.5, 3);
        ctx.stroke();

        // Text value at that point
        ctx.font = '9px Arial';
        ctx.textAlign = 'end';
        ctx.fillText(-x_axis_starting_point.number * i + x_axis_starting_point.suffix, -grid_size * i + 3, 15);
    }

// Ticks marks along the positive Y-axis
// Positive Y-axis of graph is negative Y-axis of the canvas
    for(i=1; i<(num_lines_x - x_axis_distance_grid_lines); i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";

        // Draw a tick mark 6px long (-3 to 3)
        ctx.moveTo(-3, grid_size*i+0.5);
        ctx.lineTo(3, grid_size*i+0.5);
        ctx.stroke();

        // Text value at that point
        ctx.font = '9px Arial';
        ctx.textAlign = 'end';
        ctx.fillText(-y_axis_starting_point.number*i + y_axis_starting_point.suffix, -8, grid_size*i+3);
    }

    for(i=1; i<(num_lines_x - x_axis_distance_grid_lines); i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";

        // Draw a tick mark 6px long (-3 to 3)
        ctx.moveTo(canvas_width-2*grid_size-3, grid_size*i+0.5);
        ctx.lineTo(canvas_width-2*grid_size+3, grid_size*i+0.5);
        ctx.stroke();

        // Text value at that point
        ctx.font = '9px Arial';
        ctx.textAlign = 'start';
        ctx.fillText(-y_axis_starting_point.number*i + y_axis_starting_point.suffix, canvas_width-2*grid_size + 8, grid_size*i+3);
    }

// Ticks marks along the negative Y-axis
// Negative Y-axis of graph is positive Y-axis of the canvas
    for(i=1; i<x_axis_distance_grid_lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";

        // Draw a tick mark 6px long (-3 to 3)
        ctx.moveTo(-3, -grid_size*i+0.5);
        ctx.lineTo(3, -grid_size*i+0.5);
        ctx.stroke();

        // Text value at that point
        ctx.font = '9px Arial';
        ctx.textAlign = 'end';
        ctx.fillText(y_axis_starting_point.number*i + y_axis_starting_point.suffix, -8, -grid_size*i+3);
        if(i == x_axis_distance_grid_lines - 1){
            ctx.font = '9px Arial';
            ctx.textAlign = 'start';
            ctx.fillText(gamer, 8, -grid_size*i+3);
            ctx.fillText(gamer_number1, 13, -grid_size*i+7);
        }
    }
    for(i=1; i<x_axis_distance_grid_lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";

        // Draw a tick mark 6px long (-3 to 3)
        ctx.moveTo(canvas_width - 2 * grid_size - 3, -grid_size * i + 0.5);
        ctx.lineTo(canvas_width - 2 * grid_size + 3, -grid_size * i + 0.5);
        ctx.stroke();

        // Text value at that point
        ctx.font = '9px Arial';
        ctx.textAlign = 'start';
        ctx.fillText(y_axis_starting_point.number * i + y_axis_starting_point.suffix, canvas_width - 2 * grid_size + 8, -grid_size * i + 3);
        if(i == x_axis_distance_grid_lines - 1){
            ctx.font = '9px Arial';
            ctx.textAlign = 'end';
            ctx.fillText(gamer, canvas_width - 2 * grid_size - 10, -grid_size*i+3);
            ctx.fillText(gamer_number2, canvas_width - 2 * grid_size - 5, -grid_size*i+7);
        }
    }
}


function MakeLine(canvas_name, number1, number2) {
    let canvas = document.getElementById(canvas_name);
    let ctx = canvas.getContext("2d");

    let grid_size = 25;
    let y_axis_distance_grid_lines = 1;
    let num_lines_y = Math.floor(canvas.width/grid_size);

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000000";

    ctx.moveTo(0, grid_size*(-number1)+0.5);
    ctx.lineTo(grid_size*(num_lines_y - y_axis_distance_grid_lines - 1), grid_size*(-number2)+0.5);
    ctx.stroke();
}

function ClearCanvases() {
    let canvas1 = document.getElementById('column-my-canvas1');
    canvas1.innerHTML = '';
    let canvas2 = document.getElementById('column-my-canvas2');
    canvas2.innerHTML = '';

}