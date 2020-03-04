const inputField = document.querySelector('#todo-name-input');
const itemList = document.querySelector('#todo-list');
const addButton = document.querySelector('#add-todo');
const completeButton = document.querySelector('#complete-all');
const clearButton = document.querySelector('#clear-all');

let items = JSON.parse(localStorage.getItem('items')) || [];

function saveItems(items) {
    localStorage.setItem('items', JSON.stringify(items));
}

function addItem(e) {
    e.preventDefault();
    items.push({ text: inputField.value, completed: false });
    inputField.value = '';
    saveItems(items);
    updateList(items, itemList);
}

function toggleItemComplete(e) {
    let itemIndex = e.target.getAttribute('data-index');
    items[itemIndex].completed = !items[itemIndex].completed;
    saveItems(items);
    updateList(items, itemList);
}

function removeCompleted(e) {
    e.preventDefault();
    items = items.filter(item => !item.completed);
    saveItems(items);
    updateList(items, itemList);
}

function completeAll(e) {
    e.preventDefault();
    items.forEach(item => item.completed = true);
    saveItems(items);
    updateList(items, itemList);
}

function updateList(items = [], itemList) {
    itemList.innerHTML = '';
    items.forEach((item, index) => {
        let newListNode = document.createElement('li');
        newListNode.className = `todo${item.completed ? ' done' : ''}`;
        newListNode.id = `item-${index}`;
        newListNode.setAttribute('data-index', index);
        newListNode.addEventListener('click', toggleItemComplete);

        let listNodeText = document.createElement('span');
        listNodeText.innerText = item.text;
        listNodeText.className = 'todo-text';

        newListNode.appendChild(listNodeText);
        itemList.appendChild(newListNode);
    });
}

addButton.addEventListener('click', addItem);
completeButton.addEventListener('click', completeAll);
clearButton.addEventListener('click', removeCompleted);

if (items.length === 0) {
    let initialItems = [
        { text: 'Clean room', completed: true },
        { text: 'Play with dog', completed: false },
        { text: 'Call mom', completed: false },
        { text: 'Start new project', completed: false }
    ];
    items = [...initialItems, ...items];
}

updateList(items, itemList);
