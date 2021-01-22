let $todoInput;
let $alertInfo;
let $headerInfo;
let $addBtn;
let $ulList;
let $newTask; 
let $popup;
let $popupInfo; 
let $editedTodo; 
let $popupInput; 
let $addPopupBtn; 
let $closeTodoBtn; 
let $idNumber = 0; 
let $allTasks;

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
};

const prepareDOMElements = () => {
    $todoInput = document.querySelector('.todoInput');
    $alertInfo = document.querySelector('.alertInfo');
    $headerInfo = document.querySelector('.headerInfo');
    $addBtn = document.querySelector('.addBtn');
    $ulList = document.querySelector('.todoList ul');

    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popupInfo');
    $popupInput = document.querySelector('.popupInput');
    $addPopupBtn = document.querySelector('.accept');
    $closeTodoBtn = document.querySelector('.cancel');
    $allTasks = $ulList.getElementsByTagName('li');
}; 

const prepareDOMEvents = () => {
    $addBtn.addEventListener('click', addNewTask);
    $ulList.addEventListener('click', checkClick);
    $closeTodoBtn.addEventListener('click', closePopup);
    $addPopupBtn.addEventListener('click', changeTodo);
    $todoInput.addEventListener('keyup', enterCheck);
};

const addNewTask = () => {
    if ($todoInput.value !== '') {
        $idNumber++;
        $newTask = document.createElement('li');
        $newTask.innerText = $todoInput.value;
        $newTask.setAttribute('id', `zad-${$idNumber}`);
        $ulList.appendChild($newTask);

        $todoInput.value = '';
        $alertInfo.innerText = '';
        $headerInfo.innerText = '';

        createToolsArea();
    } else {
        $headerInfo.innerText = 'wpisz treść zadania';
        
    }
};

const enterCheck = () => {
    if(event.keyCode === 13)  {
        addNewTask();
    }
};

const createToolsArea = () => {

    const toolsPanel = document.createElement('div');
    toolsPanel.className = 'tools'
    $newTask.appendChild(toolsPanel);

    const completeBtn = document.createElement('button');
    completeBtn.className = 'complete'
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';
    toolsPanel.appendChild(completeBtn);

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit')
    editBtn.innerText = 'EDIT';
    toolsPanel.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete'
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
    toolsPanel.appendChild(deleteBtn);
};

const checkClick = (e) => {
    if (e.target.closest('button').classList.contains('complete')){
        e.target.closest('li').classList.toggle('completed');
        e.target.closest('button').classList.toggle('completed');
    } else if (e.target.closest('button').className === 'edit') {
        editTask(e);
    } else if (e.target.closest('button').className === 'delete') {
        deleteTask(e);
    }
};

const editTask = (e) => {
    const oldTodo = e.target.closest('li').id;
    $editedTodo = document.getElementById(oldTodo);
    $popupInput.value = $editedTodo.firstChild.textContent;
 
    $popup.style.display = 'flex';
    $popupInfo.innerText = '';
 };

const changeTodo = () => {
    if ($popupInput.value !== '') {
        $editedTodo.firstChild.textContent = $popupInput.value;
        $popup.style.display = 'none';
        $popupInfo.innerText = '';
    } else {
        $popupInfo.innerText = 'musisz podać jakąś treść';
    };
};

const closePopup = () => {
    $popup.style.display = 'none';
}


const deleteTask = (e) => {
    const deleteTodo = e.target.closest('li');
    deleteTodo.remove();

    if ($allTasks.length === 0) {
        $alertInfo.innerText = 'Brak zadań na liście';
    }
};

document.addEventListener('DOMContentLoaded', main);