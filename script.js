var board = {
    name: '',
    lists: [],
    history: []
};
var user = "User";
var overlay = document.querySelector('.overlay');
var elemBoardName = document.querySelector('#boardName');
var elemRenameBoard = document.querySelector('#renameBoard');
var addListForm = document.querySelector('.addList');
var addListInput = document.querySelector('#addList-input');
var addListSave = document.querySelector('#addList-save');
var addListCloseBtn = document.querySelector('.addList .close-btn');
var page = document.querySelector('.container .lists');
var lists = document.querySelector('.lists');
var taskName = document.querySelector('.task-name');
var cardRenameField = document.querySelector('.cardRenameField');
var closeTask = document.querySelector('.modalTaskFormHeader .close-btn');
var taskMove = document.querySelector('.taskMove');
var taskCopy = document.querySelector('.taskCopy');
var taskCopyClose = document.querySelector('.taskCopy .modal-btn-close');
var taskMoveClose = document.querySelector('.taskMove .modal-btn-close');
var taskDelete = document.querySelector('.taskDelete');
var activityCloseBtn = document.querySelector('#activity .close-btn');

page.addEventListener('click', function() {
    if (event.target === event.currentTarget) {
        activityClose();
        addCardFormsClose();
        document.querySelector('.addList-footer').classList.add('hide');
        document.getElementById('addList-input').value = '';
    }
});

taskDelete.addEventListener('click', function () {
    var card = cardFromLS(taskId.innerText);
    deleteCard(card.id);
    showHide(overlay);
});

closeTask.addEventListener('click', function () {
    document.querySelector('.taskFormMove').classList.add('hide');
    document.querySelector('.taskFormCopy').classList.add('hide');
    document.querySelector('.overlay').classList.add('hide');
    taskName.removeEventListener('click', taskNameRename);
});

taskCopyClose.addEventListener('click', function () {
    taskCopy.children[1].classList.add('hide');
});

taskMoveClose.addEventListener('click', function () {
    taskMove.children[1].classList.add('hide');
});

//model 
function List (name) {
    this.id = uuid();
    this.name = name;
    this.cards = [];
}

function Card (task, list, position, description) {
    this.id = uuid();
    this.list = list;
    this.task = task;
    this.position = position;
    this.description = description;
}

function History (message) {
    this.message = message;
    this.date = new Date();
}

window.onload = init();

/* проверка есть ли данные прошлого использования и если нет то 
заводятся 3 листа и имя доски */
function init () {
    if (localStorage.length === 0) {
        board = {
            name: 'Board 1',
            lists: [],
            history: []
        }
        newList('Backlog');
        newList('In progress');
        newList('Done');
        boardToLocalStorage();
    }
    board = JSON.parse(localStorage.getItem('board'));
    var len = board.lists.length;
    for (var i=0; i<len; i++) {
        var list = JSON.parse(localStorage.getItem(board.lists[i]));
        drawList(list.name, list.id);
        if(list.cards !== undefined) {
            var cardsLen = list.cards.length;
            for (var j=0; j<cardsLen; j++) {
                var card = JSON.parse(localStorage.getItem(list.cards[j]));
                drawCard(list.id, list.cards[j], card.task);
            }
        }
    }
    elemBoardName.innerText = board.name;
}

function boardToLocalStorage () {
    var value = JSON.stringify(board);
    localStorage.setItem('board', value);
};

function cardToLS (card) {
    var value = JSON.stringify(card);
    localStorage.setItem(card.id, value);
}

function cardFromLS(id) {
    var card = JSON.parse(localStorage.getItem(id));
    return card;
}

function listFromLS (id) {
    var list = JSON.parse(localStorage.getItem(id));
    return list;
}

function listToLS (list) {
    var value = JSON.stringify(list);
    localStorage.setItem(list.id, value);
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
            board.name = name;
            boardToLocalStorage();
            elemBoardName.innerText = board.name;
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
        var message = user + ' добавил новый лист "' + addListInput.value + '"';
        inHistory(message);
        newList(addListInput.value);
    }
});

// новый лист
function newList (nameOfList) {
    var list = new List (nameOfList);
    list.id = uuid();
    board.lists.push(list.id);
    boardToLocalStorage();
    localStorage.setItem(list.id, JSON.stringify(list));
    drawList (nameOfList, list.id);
}
// отрисовка листа
function drawList (nameOfList, listId) {
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
    divList.id = listId;
    divList.setAttribute('name', nameOfList);
    if(nameOfList) {
        h4.innerHTML = nameOfList;
    } else {
        h4.innerHTML = addListInput.value;
    }
    //контроллер переименования листа
    h4.addEventListener('click', function (event) {
        showInput(event);
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

    newCardTextarea.addEventListener('keydown', function () {
        if (event.keyCode === 13 && newCardTextarea.value !== '') {
            addNewCard(newCardTextarea.value, listId);
            newCardTextarea.value = '';
        }

        if (event.keyCode === 27 && newCardTextarea.value !== '') {
            newCardTextarea.value = '';
        }
    });

    // добавление новой карты
    addCardBtn.addEventListener('click', function () {
        if (newCardTextarea.value !== '') {
            var message = user + ' добавил новую карту "' + newCardTextarea.value + '" в лист "' + nameOfList + '"';
            inHistory(message);
            addNewCard(newCardTextarea.value, listId);
            newCardTextarea.value = '';
        }
    });
}

function addNewCard (text, listId, position) {
    var card = new Card (text, listId);
    card.id = uuid();
    var list = listFromLS(listId);
    var message = user + ' added a new card "' + text + '" in list "' + list.name + '"';
    if (position <= list.cards.length) {
        list.cards.splice(position-1, 0, card.id);
    } else {
        list.cards.push(card.id);
    }
    listToLS(list);
    cardToLS(card);
    drawCard(listId, card.id, card.task, position);
}

function deleteCard (cardId) {
    var card = cardFromLS(cardId);
    var list = listFromLS(card.list);
    var arr = list.cards;
    var ind = arr.indexOf(cardId);
    var message = user + ' удалил карту "' + card.task + '"';
    inHistory(message);
    arr.splice(ind, 1);
    list.cards = arr;
    listToLS(list);
    localStorage.removeItem(cardId);
    var cardDOM = document.getElementById(cardId);
    var parent = cardDOM.parentElement;
    parent.removeChild(cardDOM);
}

function drawCard (listId, cardId, text, position) {
    var divCard = document.createElement('div');
    var listDOM = document.getElementById(listId);
    var cards = listDOM.children[1];
    var list = listFromLS (listId);
    divCard.className = 'card';
    divCard.id = cardId;
    divCard.innerText = text;
    if (position <= list.cards.length) {
        var nextCard = document.getElementById(list.cards[position]);
        cards.insertBefore(divCard, nextCard);
    } else {
        cards.appendChild(divCard);
    }
    divCard.addEventListener ('click', function () {
        var list = listFromLS(listId);
        var card = cardFromLS(cardId);
        var descDOM = document.getElementById('taskDescField');
        taskName.innerText = card.task;
        taskName.addEventListener('click', taskNameRename);
        showHide(overlay);
        if(card.description) {
            descDOM.innerHTML = card.description;
        }
        inListSpan.innerText = list.name;
        taskId.innerText = cardId;
    });
}

function hideCardInput() {
    cardRenameField.classList.add('hide');
    cardRenameField.removeEventListener('focusout', hideCardInput);
}

function renameTask () {
    var cardId = document.getElementById('taskId').innerText;
    var card = cardFromLS(cardId);
    var listId = card.list;
    if (event.keyCode === 13 && event.currentTarget.value !== "") {
        document.querySelector('.task-name').innerText = event.currentTarget.value;
        card.task = event.currentTarget.value;
        cardToLS(card);
        cardRenameField.classList.add('hide');
        document.getElementById(cardId).innerText = card.task;
        event.currentTarget.removeEventListener('keydown', renameTask);
    } else if (event.keyCode === 27) {
        showHide(event.currentTarget);
        event.currentTarget.removeEventListener('keydown', renameTask);
    }
}

function taskNameRename () {
    showHide(cardRenameField);
    cardRenameField.value = taskName.innerText;
    cardRenameField.focus();
    cardRenameField.addEventListener('keydown', renameTask);
    cardRenameField.addEventListener('focusout', hideCardInput);
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
    var moveListOption = document.createElement('option');

    moveListOption.innerText = board.name;
    moveListPosition.className = 'moveListPosition';
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
    moveListSelect.appendChild(moveListOption);
    moveList.appendChild(moveListSpanPosition);
    moveList.appendChild(moveListPosition);
    moveList.appendChild(moveListMoveBtn);
    moveListSelect.setAttribute('disabled', 'disabled');
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
        actionsButtons.classList.remove('hide');
        copyList.classList.add('hide');
        moveList.classList.add('hide');
        actionListBack.classList.add('hide');
    });

    moveListMoveBtn.addEventListener('click', function () {
        var listId = event.currentTarget.closest('.list').id;
        var list = listFromLS(listId);
        var currentPosition = board.lists.indexOf(listId) + 1;
        var toPosition = parseInt(event.currentTarget.previousSibling.value);
        if (currentPosition === toPosition) {
            alert('Перемещение не требуется');
        } else {
            var message = user + ' moved list "' + list.name + '" from "' + currentPosition + '" to "' + toPosition + '" position';
            inHistory(message);
            // DOM
            var listDOM = document.getElementById(listId);
            var listsDOM = document.querySelector('.lists');
            if (currentPosition < toPosition) {
                var ind = toPosition;
            } else {
                var ind = toPosition - 1;
            }
            var toList = document.querySelectorAll('.list')[ind];
            var deletedlist = listsDOM.removeChild(listDOM);
            if (toPosition === board.lists.length) {
                listsDOM.insertBefore(deletedlist, addListForm);
            } else {
                listsDOM.insertBefore(deletedlist, toList);
            }

            // board
            var indEl = board.lists.indexOf(listId);
            var el = board.lists.splice(indEl, 1);
            var elStr = el.join();
            board.lists.splice(toPosition - 1,0, elStr);
            boardToLocalStorage();
            showHide(actionListForm1);
            actionsButtons.classList.remove('hide');
            copyList.classList.add('hide');
            moveList.classList.add('hide');
            actionListBack.classList.add('hide');
            actionListFormSpan.innerText = 'Action List';
        }
    });

    actionsButtons.addEventListener('click', function (event) {
        var list = event.currentTarget.closest('.list');
        var listId = list.id;
        var parentList = document.querySelector('.lists');
        if (event.target === actionListCloseBtn) {
        } else if (event.target === actionListCopyList) {
            actionListFormSpan.innerText = 'Copy List';
            showHide(actionsButtons);
            actionListBack.classList.remove('hide');
            showHide(copyList);
            var curListHeader = this.closest('.list-header');
            var listN = curListHeader.firstChild;
            copyListTextarea.value = listN.innerText;
        } else if (event.target === actionListMoveList) {
            actionListFormSpan.innerText = 'Move List';
            actionsButtons.classList.add('hide');
            actionListBack.classList.remove('hide');
            moveList.classList.remove('hide');
            moveListOption.innerText = board.name;
            var select = event.currentTarget.parentElement.querySelector('.moveListPosition');
            select.length = 0;
            var amountOfLists = board.lists.length;
            for(var i=0; i<amountOfLists; i++) {
                var option = document.createElement('option');
                if (board.lists[i] === list.id) {
                    option.innerText = i+1 + ' (current)';
                    option.selected = true;
                } else {
                    option.innerText = i+1;
                }
                select.appendChild(option);
            }

        } else if (event.target === actionListDeleteList) {
            deleteList(listId);
            parentList.removeChild(list);
        }
    });

    copyListBtn.addEventListener('click', function () {
        var listDOM = copyListBtn.closest('.list');
        var oldBoardLists = [];
        for (var key in board.lists) {
            oldBoardLists.push(board.lists[key]);
        }
        var list = listFromLS(listDOM.id);
        var message = user + ' copied list "' + list.name + '"';
        inHistory(message);
        var cards = list.cards;
        newList(copyListTextarea.value + ' Copied');
        var arrBoardLists = board.lists;
        var len = oldBoardLists.length;
        var idNewList = arrBoardLists.filter(function (el) {
            return oldBoardLists.indexOf(el) === -1;
        });
        cards.forEach(function (el) {
            var card = cardFromLS(el);
            addNewCard(card.task, idNewList);
        });
    })
    return actionListForm1;
}

function deleteList (listId) {
    var arr = board.lists;
    var ind = arr.indexOf(listId);
    var list = listFromLS(listId);
    var message = user + ' deleted list "' + list.name + '"';
    inHistory(message);
    arr.splice(ind, 1);
    var arrCards = list.cards;
    var arrLen = arrCards.length;
    for (var i=0; i<arrLen; i++) {
        deleteCard(arrCards[i]);
    }
    board.lists = arr;
    boardToLocalStorage();
    localStorage.removeItem(listId);
}

function showHide (el) {
    el.classList.toggle('hide');
}

function showInput () {
    var inp = event.currentTarget.nextSibling;
    var parent = event.currentTarget.parentNode;
    var child = event.currentTarget;
    var currentListName = parent.firstChild;
    showHide(inp);
    inp.value = event.currentTarget.innerText;
    inp.focus();
    var listDOM = event.target.closest('.list');
    var list = JSON.parse(localStorage.getItem(listDOM.id));
    inp.addEventListener('keydown', renameList );

    function renameList () {
        if (event.keyCode === 13 && inp.value !== "") {
            currentListName.innerText = inp.value;
            list.name = inp.value;
            localStorage.setItem(list.id, JSON.stringify(list));
            showHide(inp);
            inp.removeEventListener('keydown', renameList);
        } else if (event.keyCode === 27) {
            showHide(inp);
            inp.removeEventListener('keydown', renameList);
        }
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

// тень войны
overlay.addEventListener('click', function() {
    if (event.target === event.currentTarget) {
        overlay.classList.add('hide');
        document.querySelector('.taskFormMove').classList.add('hide');
        document.querySelector('.taskFormCopy').classList.add('hide');
    }
});

taskMove.addEventListener('click', function () {
    if (event.target === event.currentTarget || event.target === event.currentTarget.children[0]) {
        event.currentTarget.children[1].classList.remove('hide');
        var cardId = document.getElementById('taskId').innerText;
        var card = cardFromLS(cardId);
        var list = listFromLS(card.list);
        var selectBoard = document.getElementById('taskFormMoveBoardName');
        var option = document.createElement('option');
        var selEl = document.getElementById('taskFormMoveList');
        var selElPos = document.getElementById('taskFormMovePosition');
        option.innerText = board.name;
        option.selected = true;
        selectBoard.appendChild(option);
        drawLists(list, selEl, card);
        drawPositions(list, card.id, selElPos);
    }
});

taskCopy.addEventListener('click', function () {
    if (event.target === event.currentTarget || event.target === event.currentTarget.children[0]) {
        event.currentTarget.children[1].classList.remove('hide');
        var cardId = document.getElementById('taskId').innerText;
        var card = cardFromLS(cardId);
        var list = listFromLS(card.list);
        listTitle.value = card.task;
        boardNameForCopyTask.innerText = board.name;
        var selectList = document.getElementById('taskFormCopyList');
        drawLists(list, selectList, card);
        var selectPosition = document.getElementById('taskFormCopyPosition');
        drawPositions(list, cardId, selectPosition);

    }
});

function drawLists (list, selEl, card) {
    var lists = board.lists;
    var len = lists.length;
    selEl.length = 0;
    for (var i=0; i<len; i++) {
        var lid = lists[i];
        var li = listFromLS(lid);
        var option = document.createElement('option');
        if(card.list === li.id) {
            option.innerText = li.name + ' (current)';
            option.selected = true;
        } else {
            option.innerText = li.name;
        }
        option.id = 'l_' + lists[i];
        selEl.appendChild(option);
    }
}

function drawPositions (list, cardId, selEl) {
    var card = cardFromLS(cardId);
    if (selEl === document.getElementById('taskFormMovePosition') && list.id === card.list ) {
        var positions = list.cards.length;
    } else {
        var positions = list.cards.length + 1;
    }
    var card = cardFromLS(cardId);
    
    selEl.length = 0;
    for (var i=0; i<positions; i++) {
        var option = document.createElement('option');
        if (card.id === list.cards[i]) {
            option.innerText = i+1 + ' (current)';
            option.selected = true;
        } else {
            option.innerText = i+1;
        }
        selEl.appendChild(option);
    }
}

taskFormCopyList.addEventListener('change', function () {
    var selEl = document.getElementById('taskFormCopyPosition');
    listChangePositions(selEl);
});

function listChangePositions (selEl) {
    var selectedList = event.target.selectedOptions[0];
    var listId = selectedList.id.substr(2);
    var list = listFromLS(listId);
    var cardId = document.getElementById('taskId').innerText;
    drawPositions(list, cardId, selEl);
}

taskFormMoveList.addEventListener('change', function () {
    var selEl = document.getElementById('taskFormMovePosition');
    listChangePositions(selEl);
});

createCard.addEventListener('click', function () {
    if (listTitle.value !== '') {
    var text = document.getElementById('listTitle').value;
    selectedList = document.getElementById('taskFormCopyList').selectedOptions[0];
    var listId = selectedList.id.substr(2);
    var list = listFromLS(listId);
    var toPosition = parseInt(document.getElementById('taskFormCopyPosition').value);
    var message = user + ' скопировал карту "' + text + '" в лист "' + list.name;
    inHistory(message);
    addNewCard (text, listId, toPosition);
    document.querySelector('.taskFormCopy').classList.add('hide');
    }
});

moveCard.addEventListener('click', function () {
    var cardId = document.getElementById('taskId').innerText;
    var card = cardFromLS(cardId);
    var outListId = card.list;
    var inListId = document.getElementById('taskFormMoveList').selectedOptions[0].id.substr(2);
    var toPosition = document.getElementById('taskFormMovePosition').selectedOptions[0].value;
    if (toPosition.indexOf('current') === -1) {
        card.list = inListId;
        cardToLS(card);
        var list = listFromLS(outListId);
        var oldList = list.name;
        var ind = list.cards.indexOf(cardId);
        var parentList = document.getElementById(list.id);
        var parent = parentList.querySelector('.cards');
        var cardIdFromList = list.cards.splice(ind, 1).join();
        listToLS(list);
        list = listFromLS(inListId);
        if (toPosition <= list.cards.length) {
            list.cards.splice(toPosition-1, 0, cardId);
        } else {
            list.cards.push(cardId);
        }
        listToLS(list);
        var cardDOM = document.getElementById(cardId);
        var deletedCard = parent.removeChild(cardDOM);
        var newParentList = document.getElementById(list.id);
        var newParent = newParentList.querySelector('.cards');
        var nextCardId = list.cards[toPosition];
        var nextCard = document.getElementById(nextCardId);
        if (toPosition <= list.cards.length) {
            newParent.insertBefore(deletedCard, nextCard);
        } else {
            newParent.appendChild(deletedCard);
        }
        var message = user + ' переместил карту "' + card.task + '" из листа "' + oldList + '" в лист "' + list.name + '"';
        inHistory(message);
        document.querySelector('.taskFormMove').classList.add('hide');
        document.querySelector('.overlay').classList.add('hide');
    }
});

function inHistory (message) {
    var newHistory = new History(message);
    board.history.push(newHistory);
    boardToLocalStorage();
    console.log(message);
}

showMenu.addEventListener('click', function () {
    document.getElementById('activity').classList.remove('hide');
    var hist = document.createElement('div');
    hist.id = 'history';
    document.getElementById('activity').appendChild(hist);
    var amountOfHistory = board.history.length;
    var dateNow = new Date();
    for (var i=amountOfHistory-1; i>0; i--) {
        var note = document.createElement('section');
        var mess = document.createElement('p');
        var date = document.createElement('p');
        var seconds = Math.round( (dateNow - Date.parse(board.history[i].date)) / 1000);
        if (seconds > 60) {
            var minutes = Math.round(seconds/60);
            date.innerText = minutes + ' minutes ago';
        } else {
            date.innerText = seconds + ' s ago';
        }
        if (minutes > 60) {
            var hours = Math.round(minutes/60);
            date.innerText = hours + ' hours ago';
        }
        if (hours > 24) {
            var days = Math.round(hours/24);
            date.innerText = days + ' days ago';
        }
        mess.innerText = board.history[i].message;
        note.appendChild(mess);
        note.appendChild(date);
        document.getElementById('history').appendChild(note);
    }
});

activityCloseBtn.addEventListener('click', function () {
    activityClose();
});

function activityClose () {
    document.getElementById('activity').classList.add('hide');
    var hist = document.getElementById('history');
    if(hist) {
        document.getElementById('activity').removeChild(hist);
    }
}

function addCardFormsClose () {
    var addCardForms = document.querySelectorAll('.addCardForm');
    if (addCardForms) {
        for (var i=0; i<addCardForms.length; i++) {
            addCardForms[i].classList.add('hide');
        }
    }
    var addCardBtns = document.querySelectorAll('.addCard');
    if (addCardBtns) {
        for (var i=0; i<addCardBtns.length; i++) {
            addCardBtns[i].classList.remove('hide');
        }
    }
}