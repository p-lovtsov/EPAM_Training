var brdName = '';
var actions = [];
var ArrayOfLists = [];
var board;
var overlay = document.querySelector('.overlay');
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

/* проверка есть ли данные прошлого использования и если нет то 
заводятся 3 листа и имя доски */
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

//контроллер переименования доски
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

// контроллер появления кнопок при добавлении листа
addListInput.addEventListener('focus', function (event) {
    event.target.nextSibling.nextSibling.classList.remove('hide');
    event.target.value = 'New list';
});

// контроллер добавления листа
addListSave.addEventListener('click', function (event) {
    if(addListInput.value !== '') {
        newList();
    }
});

// новый лист
function newList (nameOfList) {
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
    divNewCardForm.className = 'addCardForm hide';
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
    if(nameOfList) {
        h4.innerHTML = nameOfList;
    } else {
        h4.innerHTML = addListInput.value;
    }
    ArrayOfLists.push(divList.id);
    //контроллер переименования листа
    h4.addEventListener('click', function (event) {
        renameList(event);
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
    divList.appendChild(cards);
    divList.appendChild(divListFooter);
    lists.insertBefore(divList,addListForm);
    addListInput.value = '';
    listMenu.addEventListener('click', function () {
        if (event.target === event.currentTarget) {
            showHide(actionListForm);
        }
    });
    // появление формы добавления карты
    divAddCard.addEventListener('click', function () {
        showHide(event.currentTarget);
        showHide(divNewCardForm);
    });
    // закрытие формы добавления карты
    addCardCloseBtn.addEventListener('click', function () {
        showHide(divNewCardForm);
        showHide(divAddCard);
    });

    // добавление новой карты
    addCardBtn.addEventListener('click', function () {
        if (newCardTextarea.value !== '') {
            var divCard = document.createElement('div');
            divCard.className = 'card';
            divCard.id = uuid();
            divCard.innerText = newCardTextarea.value;
            cards.appendChild(divCard);
            newCardTextarea.value = '';
            divCard.addEventListener ('click', function () {
                var listNameToModalTaskForm = divCard.id;
                showHide(overlay);
            })
        }
    });
}

// меню листа
function actionList () {
    var actionListForm1 = document.createElement('div');
    var actionListBack = document.createElement('div');
    var actionListFormName = document.createElement('h4');
    var actionListFormSpan = document.createElement('span');
    var actionListCloseBtn = document.createElement('div');
    var actionListFormLine = document.createElement('hr');

    //action buttons
    var actionsButtons = document.createElement('div');
    var actionListCopyList = document.createElement('div');
    var actionListMoveList = document.createElement('div');
    var actionListDeleteList = document.createElement('div');
    
    //copy List
    var copyList = document.createElement('div');
    var copyListLabel = document.createElement('label');
    var copyListTextarea = document.createElement('textarea');
    var copyListBtn = document.createElement('div');

    //move List
    var moveList = document.createElement('div');
    var moveListBoardName = document.createElement('span');
    var moveListSelect = document.createElement('select');
    var moveListSpanPosition = document.createElement('span');
    var moveListPosition = document.createElement('select');
    var moveListMoveBtn = document.createElement('div');

    moveList.className = 'moveList hide';
    moveListBoardName.innerText = 'Board';
    moveListSpanPosition.innerText = 'Position';
    moveListMoveBtn.className = 'btn';
    moveListMoveBtn.innerText = 'Move';
    actionListBack.innerHTML = '&#8592;';
    actionListBack.className = 'modal-btn-back hide';
    copyListBtn.innerText = 'Create List';
    copyListBtn.className = 'btn';
    copyListLabel.innerText = 'Name';
    copyList.className = 'copyList hide';
    copyListTextarea.cols = '30';
    copyListTextarea.rows = '5';
    actionsButtons.className = 'actions';
    actionListForm1.className = 'modalListMenu hide';
    actionListCloseBtn.className = 'modal-btn-close';
    actionListCloseBtn.innerHTML = '&#10060;';
    actionListCopyList.className = 'action copyList';
    actionListMoveList.className = 'action moveList';
    actionListDeleteList.className = 'action deleteList';
    actionListFormSpan.innerText = 'Action List';
    actionListCopyList.innerText = 'Copy List...';
    actionListMoveList.innerText = 'Move List...';
    actionListDeleteList.innerText = 'Delete This List';
    actionListFormName.appendChild(actionListBack);
    actionListFormName.appendChild(actionListFormSpan);
    actionListFormName.appendChild(actionListCloseBtn);
    moveList.appendChild(moveListBoardName);
    moveList.appendChild(moveListSelect);
    moveList.appendChild(moveListSpanPosition);
    moveList.appendChild(moveListPosition);
    moveList.appendChild(moveListMoveBtn);
    actionListForm1.appendChild(actionListFormName);
    actionListForm1.appendChild(actionListFormLine);
    actionListForm1.appendChild(actionsButtons);
    actionListForm1.appendChild(copyList);
    actionListForm1.appendChild(moveList);
    copyList.appendChild(copyListLabel);
    copyList.appendChild(copyListTextarea);
    copyList.appendChild(copyListBtn);
    actionsButtons.appendChild(actionListCopyList);
    actionsButtons.appendChild(actionListMoveList);
    actionsButtons.appendChild(actionListDeleteList);
    actionListBack.addEventListener('click', function () {
        showHide(actionsButtons);
        copyList.classList.add('hide');
        moveList.classList.add('hide');
        actionListBack.classList.add('hide');
        actionListFormSpan.innerText = 'Action List';
    });
    actionListCloseBtn.addEventListener('click', function () {
        showHide(actionListForm1);
        console.log('клац');
    });
    actionsButtons.addEventListener('click', function (event) {
        var list = event.currentTarget.closest('.list');
        var listId = list.id;
        var parentList = document.querySelector('.lists');
        
        if (event.target === actionListCloseBtn) {
            console.log('щёлк');
        } else if (event.target === actionListCopyList) {
            console.log('Show Copy List Form');
            actionListFormSpan.innerText = 'Copy List';
            showHide(actionsButtons);
            actionListBack.classList.remove('hide');
            showHide(copyList);
            console.log(this);
            var curListHeader = this.closest('.list-header');
            var listN = curListHeader.firstChild;
            console.log(curListHeader, listN);
            copyListTextarea.value = listN.innerText;
        } else if (event.target === actionListMoveList) {
            console.log('Show Move List Form');
            actionListFormSpan.innerText = 'Move List';
            showHide(actionsButtons);
            actionListBack.classList.remove('hide');
            showHide(moveList);
        } else if (event.target === actionListDeleteList) {
            console.log('Delete List');
            parentList.removeChild(list);
            console.log('удалили лист с id ' + listId);
        }
        
    });

    copyListBtn.addEventListener('click', function () {
        console.log('Копируется лист');
        newList(copyListTextarea.value + ' Copied');
    })
    return actionListForm1;
}

function showHide (el) {
    el.classList.toggle('hide');
}

function renameList (event1) {
    var inp = event1.currentTarget.nextSibling;
    var parent = event.currentTarget.parentNode;
    var child = event.currentTarget;
    var currentListName = parent.firstChild;
    var oldName = parent.innerText;
    console.log(oldName);
    showHide(inp);
    inp.value = event1.currentTarget.innerText;
    inp.focus();
    inp.addEventListener('keydown', rename);

    function rename () {
        if (event.keyCode === 13 && inp.value !== "") {
            currentListName.innerText = inp.value;
            showHide(inp);
            console.log(event.key);
            inp.removeEventListener('keydown', rename);
        } else if (event.keyCode === 27) {
            console.log(event.key);
            showHide(inp);
            inp.removeEventListener('keydown', rename);
        }
        console.log('щёлк');
    }
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

addListForm.addEventListener('click', function(event) {
    if (event.target === addListSave) {
        console.log(1);
    }
});

// тень войны
overlay.addEventListener('click', function() {
    if (event.target === event.currentTarget) {
        overlay.classList.add('hide');
    }
});