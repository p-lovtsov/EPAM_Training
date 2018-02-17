var brdName = '';
var actions = [];
var board;
var elemBoardName = document.querySelector('#boardName');
var elemRenameBoard = document.querySelector('#renameBoard');
var addListInput = document.querySelector('#addList-input');
var addListSave = document.querySelector('#addList-save');

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
    })
    renameBtn.addEventListener('click', function () {
        let name = inputBoardName.value;
        if (name !== '') {
            elemBoardName.innerText = name;
            localStorage.setItem('boardName', name);
            modal.classList.add('hide');
        }
        
    });
});

addListInput.addEventListener('focus', function (event) {
    event.target.nextSibling.nextSibling.classList.remove('hide');
});

addListInput.addEventListener('blur', function (event) {
    console.log(event.target);
});

addListSave.addEventListener('click', function (event) {
    console.log(3);
})