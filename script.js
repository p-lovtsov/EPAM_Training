var brdName = '';
var actions = [];
var board;
var elemBoardName = document.querySelector('#boardName');
var elemRenameBoard = document.querySelector('#renameBoard');
var addListForm = document.querySelector('.addList');
var addListInput = document.querySelector('#addList-input');
var addListSave = document.querySelector('#addList-save');
var addListCloseBtn = document.querySelector('.close-btn');
var page = document.querySelector('.container');
var lists = document.querySelector('.wrap');

window.onload = init();

function init () {
    if (localStorage.length === 0) {
        board = {
            name: 'Board 1',
            list1: 'Backlog',
            list2: 'In progress',
            list3: 'Done'
        }
        localStorage.setItem('boardName', board.name);
    }
    brdName = localStorage.getItem('boardName');
    elemBoardName.innerText = brdName;

}

elemBoardName.addEventListener('click', function() {
    var modal = document.querySelector('.modal');
    var closeBtn = document.querySelector('.modal-btn-close');
    var renameBtn = document.querySelector('#btnRenameBoard');
    inputBoardName.value = elemBoardName.innerText;
    console.dir(inputBoardName);
    if (modal.classList.contains('hide')) {
        modal.classList.remove('hide');
    };
    closeBtn.addEventListener('click', function() {
        modal.classList.add('hide');
    });
    renameBtn.addEventListener('click', function () {
        let name = inputBoardName.value;
        if (name !== '') {
            elemBoardName.innerText = name;
            localStorage.setItem('boardName', name);
            modal.classList.add('hide');
        }
        
    });
});

addListInput.addEventListener('focus', addListInputFocus);

function addListInputFocus (event) {
    event.target.nextSibling.nextSibling.classList.remove('hide');
}

addListSave.addEventListener('click', function (event) {
    if(addListInput.value !== '') {
        var divList = document.createElement('div');
        var divListHeader = document.createElement('div');
        var h4 = document.createElement('h4');
        divList.className = 'list';
        divListHeader.className = 'list-header';

        h4.className = 'listName';
        h4.innerText = addListInput.value + ' ' + uuid();
        divListHeader.appendChild(h4);
        divList.appendChild(divListHeader);
        lists.insertBefore(divList,addListForm);
        addListInput.value = '';
    }
    console.log('save', event.target.parentNode.parentNode);

});

addListCloseBtn.addEventListener('click', function (event) {
    addListInput.value = '';
    event.currentTarget.parentNode.classList.add('hide');
})


function uuid() {
    var uuid = "", rand = Math.random, i, v;
    for (i = 0; i < 7; i++) {
        v = rand() * 16 | 0;
        uuid += (i === 16 ? (v & 3 | 8) : v).toString(16);
    }
    return uuid;
}

addListInput.addEventListener('blur', function (event) {
    console.log('blur', event.currentTarget, event.target);
    event.currentTarget.classList.add('hide');
});

// addListForm.addEventListener('click', function(event) {
//     console.log(event.currentTarget);
// });