var todo = [];
window.onload = init();

function init () {
    if (localStorage.length) {
        var len = localStorage.length;
        for(var i=0; i<len; i++) {
            console.log(localStorage.key(i));
        }
    }
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

function draw () {
    var task = new Task(inp.value);
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
    inp.value = '';
    var itemCheck = document.createElement('input');
    var close = document.createElement('svg');
    close.className = 'close-btn';
    itemCheck.type = 'checkbox';
    item.appendChild(itemCheck);
    item.appendChild(text);
    item.appendChild(close);
    close.addEventListener('click', function () {
        var len = todo.length;
        var id = this.parentElement.id;
        localStorage.removeItem(id);
        for (var i=0; i<len; i++) {
            var arrid = todo[i];
            // console.log('arrid=' + arrid.id, 'id.parent = '+ id);
            if (arrid.id === id) {
                todo.splice(i,1);
            }
            len = todo.length;
            if (!len) {
                foot.style.visibility = 'hidden';
            }
        }
        this.parentElement.remove();
    });
}

var inp = document.querySelector('#inp');
inp.addEventListener("keydown", function () {
    if (event.keyCode === 13 && inp.value !== "") {
        draw();
    }
}, false);
allComplete.addEventListener('change', function () {
    console.log(this.checked);

    todo.forEach(function (el) {
        console.log(el.id);
    })
}, true);