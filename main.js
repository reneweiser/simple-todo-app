const inputField = document.querySelector('#todo-name-input');
const itemList = document.querySelector('#todo-list');
const addButton = document.querySelector('#add-todo');
const clearButton = document.querySelector('#clear');

let items = [];

function addItem(e) {
    e.preventDefault();
    items.push({ text: inputField.value, completed: false });
    saveList(items);
    populateList(items, itemList);
    inputField.value = '';
}

function setItemComplete(e) {
    let itemIndex = e.target.getAttribute('data-index');
    items[itemIndex].completed = !(items[itemIndex].completed);
    populateList(items, itemList);
    saveList(items);
}

function populateList(items = [], itemList) {
    clearList(itemList);
    items.forEach((item, index) => {
        let newItemNode = document.createElement('li');
        newItemNode.className = `todo${item.completed ? ' done' : ''}`;
        newItemNode.id = `item-${index}`;
        newItemNode.setAttribute('data-index', index);
        newItemNode.addEventListener('click', setItemComplete);
        newItemNode.innerText = item.text;
        itemList.appendChild(newItemNode);
    });
}

function clearList(itemList) {
    itemList.innerHTML = '';
}

function saveList(items) {
    window.localStorage.setItem('items', JSON.stringify(items));
}

addButton.addEventListener('click', addItem);

clearButton.addEventListener('click', (e) => {
    e.preventDefault();
    items.splice(0, items.length);
    clearList(itemList);
    saveList(items);
});

items = JSON.parse(window.localStorage.getItem('items'));
populateList(items, itemList);