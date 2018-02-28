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
var addListCloseBtn = document.querySelector('.addList .close-btn');
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

//
elemBoardName.addEventListener('click', function() {
    var modal = document.querySelector('.modal');
    var modalCloseBtn = document.querySelector('.modal-btn-close');
    var renameBtn = document.querySelector('#btnRenameBoard');
    inputBoardName.value = elemBoardName.innerText;
    if (modal.classList.contains('hide')) {
        modal.classList.remove('hide');
    };
    modalCloseBtn.addEventListener('click', function() {
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
        newList();
    }
});

function newList () {
    var divList = document.createElement('div');
    var divListHeader = document.createElement('div');
    var h4 = document.createElement('h4');
    var renameField = document.createElement('input');
    var listMenu = document.createElement('div');
    var cards = document.createElement('div');
    var divListFooter = document.createElement('div');
    var divAddCard = document.createElement('div');
    var divNewCardForm = document.createElement('div');
    var newCardTextarea = document.createElement('textarea');
    var addCardBtn = document.createElement('div');
    var addCardCloseBtn = document.createElement('div');
    var actionListForm = actionList();
    addCardCloseBtn.className = 'close-btn close';
    addCardBtn.className = 'btn';
    addCardBtn.innerText = 'Add';
    newCardTextarea.setAttribute('cols', '33');
    newCardTextarea.setAttribute('rows', '5');
    divNewCardForm.className = 'addCardForm';
    divAddCard.className = 'addCard';
    divAddCard.innerText = 'Add a card ...';
    divListFooter.className = 'list-footer';
    cards.className = 'cards';
    listMenu.className = 'list-menu';
    listMenu.innerText = '...';
    renameField.className = 'listRenameField hide';
    divList.className = 'list';
    divListHeader.className = 'list-header';
    h4.className = 'listName';
    divList.id = uuid();
    h4.innerHTML = addListInput.value;
    ArrayOfLists.push(divList.id);
    h4.addEventListener('click', function (event) {
        renameList (event);
    });
    listMenu.appendChild(actionListForm);
    divNewCardForm.appendChild(newCardTextarea);
    divNewCardForm.appendChild(addCardBtn);
    divNewCardForm.appendChild(addCardCloseBtn);
    divListFooter.appendChild(divNewCardForm);
    divListFooter.appendChild(divAddCard);
    divListHeader.appendChild(h4);
    divListHeader.appendChild(renameField);
    divListHeader.appendChild(listMenu);
    divList.appendChild(divListHeader);
    divList.appendChild(divListFooter);
    lists.insertBefore(divList,addListForm);
    addListInput.value = '';
    listMenu.addEventListener('click', function () {
        showHide(actionListForm);
    }, true);
}

function actionList () {
    var actionListForm1 = document.createElement('div');
    var actionListFormName = document.createElement('h4');
    var actionListCloseBtn = document.createElement('div');
    var actionListFormLine = document.createElement('hr');
    var actionListCopyList = document.createElement('div');
    var actionListMoveList = document.createElement('div');
    var actionListDeleteList = document.createElement('div');
    actionListForm1.className = 'modalListMenu hide';
    actionListCloseBtn.className = 'modal-btn-close';
    actionListCloseBtn.innerText = 'X';
    actionListCopyList.className = 'action copyList';
    actionListMoveList.className = 'action moveList';
    actionListDeleteList.className = 'action deleteList';
    actionListFormName.innerText = 'Action List';
    actionListCopyList.innerText = 'Copy List...';
    actionListMoveList.innerText = 'Move List...';
    actionListDeleteList.innerText = 'Delete This List';
    actionListFormName.appendChild(actionListCloseBtn);
    actionListForm1.appendChild(actionListFormName);
    actionListForm1.appendChild(actionListFormLine);
    actionListForm1.appendChild(actionListCopyList);
    actionListForm1.appendChild(actionListMoveList);
    actionListForm1.appendChild(actionListDeleteList);
    actionListForm1.addEventListener('click', function (event) {
        if (event.target === actionListCloseBtn) {
            showHide(event.currentTarget);
        } else if (event.target === actionListCopyList) {
            console.log('Show Copy List Form');
        } else if (event.target === actionListMoveList) {
            console.log('Show Move List Form');
        } else if (event.target === actionListDeleteList) {
            console.log('Delete List');
        }
        event.stopPropagation();
    }, true);
    
    console.log(this);
    return actionListForm1;
}

function showHide (el) {
    el.classList.toggle('hide');
}

function renameList (event) {
    var inp = event.currentTarget.nextSibling;
    showHide(inp);
    inp.value = event.currentTarget.innerText;
    inp.focus();
    inp.addEventListener('keydown', function (event) {
        if (event.keyCode === 13 && inp.value !== "") {
            var parent = event.currentTarget.parentNode;
            var child = event.currentTarget;
            var currentListName = parent.firstChild;
            console.log(parent, currentListName);
            currentListName.innerText = inp.value;
            showHide(inp);
        }
    });
}

addListCloseBtn.addEventListener('click', function (event) {
    addListInput.value = '';
    event.currentTarget.parentNode.classList.add('hide');
});


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

// lists.addEventListener('click', function (event) {
//     // console.log(event.target);
// })

addListForm.addEventListener('click', function(event) {
    if (event.target === addListSave) {
        console.log(1);
    }
});