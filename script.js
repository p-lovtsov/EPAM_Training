var brdName = '';
var actions = [];
var ArrayOfLists = [];
var board;
var elemBoardName = document.querySelector('#boardName');
var elemRenameBoard = document.querySelector('#renameBoard');
var listName = document.querySelectorAll('.listName');
var addListForm = document.querySelector('.addList');
var addListInput = document.querySelector('#addList-input');
var addListSave = document.querySelector('#addList-save');
var addListCloseBtn = document.querySelector('.close-btn');
var page = document.querySelector('.container');
var lists = document.querySelector('.lists');

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
        var renameField = document.createElement('input');
        var listMenu = document.createElement('div');
        var cards = document.createElement('div');
        cards.className = 'cards';
        listMenu.className = 'list-menu';
        listMenu.innerText = '...';
        renameField.className = 'hide';
        divList.className = 'list';
        divListHeader.className = 'list-header';
        h4.className = 'listName';
        h4.id = uuid();
        h4.innerHTML = addListInput.value;
        ArrayOfLists.push(h4.id);
        h4.addEventListener('click', function (event) {
            renameList (event);
        });
        divListHeader.appendChild(h4);
        divListHeader.appendChild(renameField);
        divListHeader.appendChild(listMenu);
        divList.appendChild(divListHeader);
        lists.insertBefore(divList,addListForm);
        addListInput.value = '';
    }
});

function renameList (event) {
    var inp = document.createElement('input');
    inp.classList.add('renameList');
    var name = event.target;
    inp.value = name.innerText;
    name.appendChild(inp);
    inp.focus();
    // inp.addEventListener('focusout', function (event) {
    //     var parent = event.currentTarget.parentNode;
    //     parent.removeChild(event.currentTarget);
    // });
    inp.addEventListener('keydown', function (event) {
        if (event.keyCode === 13 && inp.value !== "") {
            var parent = event.currentTarget.parentNode;
            parent.innerText = inp.value;
            parent.removeChild(inp);
        }
    });
}

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

// addListInput.addEventListener('focusout', function (event) {
//     console.log(event.currentTarget, event.target);
//     var addListFooter = document.querySelector('.addList-footer');
//     addListFooter.classList.add('hide');
// });

lists.addEventListener('click', function (event) {
    // console.log(event.target);
})

addListForm.addEventListener('click', function(event) {
    if (event.target === addListSave) {
        console.log(1);
    }
});