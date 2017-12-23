var todo = [];
window.onload = init();

function init () {
    if (localStorage.length) {
        var len = localStorage.length;
        for(var i=0; i<len; i++) {
            var lsid = localStorage.key(i);
            var obj = JSON.parse(localStorage.getItem(lsid));
            drawTask(obj.id, obj.text, obj.complete);
        }
    }
}

function amountOfTask () {
    var amount = 0
    todo.forEach(function (el) {
        if (el.complete === false) {
            amount++;
        }
    });
    itemsLeft.innerText = amount + " items left";
}

function Task (text) {
    this.id = taskId(),
    this.text = text,
    this.complete = false
}
Task.prototype.ready = function () {
    this.complete = true;
}
Task.prototype.notComplete = function () {
    this.complete = false;
}

function taskId () {
    var tId = uuidv1();
    var arrOftId = tId.split('-');
    return arrOftId[0];
}

function drawTask (tid, ttext, tcomplete) {
    if (!arguments.length) {
        var task = new Task(inp.value);
        inp.value = '';
    } else {
        var task = {id: tid, text: ttext, complete: tcomplete}
    }
    todo.push(task);
    var foot = document.querySelector('footer');
    foot.style.visibility = 'visible';
    allComplete.style.visibility = 'visible';
    var item = document.createElement('div');
    var text = document.createElement('p');
    text.className = 'text';
    item.className = 'task';
    item.id = task.id;
    text.innerText = task.text;
    var taskToLocalStorage = JSON.stringify(task);
    localStorage.setItem(task.id, taskToLocalStorage);
    var sec = document.querySelector('section');
    sec.appendChild(item);
    var itemCheck = document.createElement('input');
    var close = document.createElement('svg');
    close.className = 'close-btn';
    itemCheck.type = 'checkbox';
    item.appendChild(itemCheck);
    item.appendChild(text);
    item.appendChild(close);
    visibilityOfClearComplete();
    amountOfTask();
    allChecked();
    itemCheck.checked = task.complete;
    close.addEventListener('click', function () {
        var len = todo.length;
        var id = this.parentElement.id;
        localStorage.removeItem(id);
        for (var i=0; i<len; i++) {
            var arrid = todo[i];
            if (arrid.id === id) {
                todo.splice(i,1);
            }
            len = todo.length;
            if (!len) {
                foot.style.visibility = 'hidden';
            }
        }
        this.parentElement.remove();
        visibilityOfClearComplete();
        amountOfTask();
        allChecked();
    });
    itemCheck.addEventListener('change', function () {
        var status = this.checked;
        var iid = this.parentElement.id;
        var len = todo.length;
        for (var i=0; i<len; i++) {
            if (todo[i].id === iid) {
                todo[i].complete = status;
                localStorage.setItem(iid, JSON.stringify(todo[i]));
            }
        }
        visibilityOfClearComplete();
        amountOfTask();
        allChecked();
    })
}

function visibilityOfClearComplete () {
    var s = todo.some(function (el) {
        return el.complete;
    });
    if (s) {
        clearComplete.style.visibility = 'visible';
    } else {
        clearComplete.style.visibility = 'hidden';
    }
}

function allChecked () {
    var s = todo.every(function (el) {
        return el.complete;
    });
    if (s) {
        allComplete.checked = true;
    } else {
        allComplete.checked = false;
    }
}

var inp = document.querySelector('#inp');
inp.addEventListener("keydown", function () {
    if (event.keyCode === 13 && inp.value !== "") {
        drawTask();
    }
}, false);

allComplete.addEventListener('change', function () {
    var status = this.checked;
    todo.forEach(function (el) {
        el.complete = status;
        localStorage.setItem(el.id, JSON.stringify(el));
        document.getElementById(el.id).children[0].checked = status;
    });
    amountOfTask();
    if (status) {
        clearComplete.style.visibility = 'visible';
    } else {
        clearComplete.style.visibility = 'hidden';
    }
}, true);