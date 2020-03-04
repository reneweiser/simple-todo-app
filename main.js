const inputField = document.querySelector('#todo-name-input');
const itemList = document.querySelector('#todo-list');
const addButton = document.querySelector('#add-todo');
const completeButton = document.querySelector('#complete-all');
const clearButton = document.querySelector('#clear-all');

let items = JSON.parse(window.localStorage.getItem('items')) || [];

function addItem(e) {
    e.preventDefault();
    items.push({ text: inputField.value, completed: false });
    saveList(items);
    populateList(items, itemList);
    inputField.value = '';
}

function toggleItemComplete(e) {
    let itemIndex = e.target.getAttribute('data-index');
    items[itemIndex].completed = !(items[itemIndex].completed);
    populateList(items, itemList);
    saveList(items);
}

function removeCompleted(e) {
    e.preventDefault();
    items = items.filter(item => !item.completed);
    saveList(items);
    populateList(items, itemList);
}

function populateList(items = [], itemList) {
    itemList.innerHTML = '';
    items.forEach((item, index) => {
        let newItemNode = document.createElement('li');
        newItemNode.className = `todo${item.completed ? ' done' : ''}`;
        newItemNode.id = `item-${index}`;
        newItemNode.setAttribute('data-index', index);
        newItemNode.addEventListener('click', toggleItemComplete);

        let text = document.createElement('span');
        text.innerText = item.text;
        text.className = 'todo-text';

        newItemNode.appendChild(text);
        itemList.appendChild(newItemNode);
    });
}

function completeAll(e) {
    e.preventDefault();
    items.forEach(item => item.completed = true);
    saveList(items);
    populateList(items, itemList);
}

function saveList(items) {
    window.localStorage.setItem('items', JSON.stringify(items));
}

addButton.addEventListener('click', addItem);

completeButton.addEventListener('click', completeAll);

clearButton.addEventListener('click', removeCompleted);

populateList(items, itemList);
