const inputField = document.querySelector('#todo-name-input');
const addButton = document.querySelector('#add-todo');
const clearButton = document.querySelector('#clear');
const todoList = document.querySelector('#todo-list');

addButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (inputField.value === '') return;
    let newTodo = document.createElement('li');
    newTodo.innerText = `${inputField.value} - click to remove`;
    newTodo.addEventListener('click', (e) => todoList.removeChild(e.target));
    todoList.appendChild(newTodo);
    inputField.value = '';
});

clearButton.addEventListener('click', (e) => {
    e.preventDefault();
    todoList.innerHTML = '';
});