const newTaskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTaskHolder = document.getElementById('incompleteTasks');
const completedTasksHolder = document.getElementById('completed-tasks');

const createTaskElement = function (text) {
  const listItem = document.createElement('li');
  listItem.append(
    createCheckbox(),
    createLabel(text),
    createTextInput(),
    createEditButton(),
    createDeleteButton()
  );
  return listItem;
};

const createCheckbox = function () {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  return checkbox;
};

const createLabel = function (text) {
  const label = document.createElement('label');
  label.className = 'task';
  label.innerText = text;
  return label;
};

const createTextInput = function () {
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'task';
  return input;
};

const createEditButton = function () {
  const button = document.createElement('button');
  button.className = 'edit';
  button.innerText = 'Edit';
  return button;
};

const createDeleteButton = function () {
  const button = document.createElement('button');
  button.className = 'delete';
  const img = document.createElement('img');
  img.src = './remove.svg';
  button.appendChild(img);
  return button;
};

const addTask = function () {
  if (!newTaskInput.value) return;
  const listItem = createTaskElement(newTaskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem);

  newTaskInput.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editBtn = listItem.querySelector('.edit');
  const isEditMode = listItem.classList.contains('editMode');
  if (isEditMode) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  listItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

const toggleTask = function () {
  const item = this.parentNode;
  const targetList =
    item.parentNode === incompleteTaskHolder ? completedTasksHolder : incompleteTaskHolder;
  targetList.appendChild(item);
};

addButton.addEventListener('click', addTask);

const bindTaskEvents = function (item) {
  item.querySelector('input[type=checkbox]').onchange = toggleTask;
  item.querySelector('button.edit').onclick = editTask;
  item.querySelector('button.delete').onclick = deleteTask;
};

const bindAllTasks = function (list) {
  for (const item of list.children) bindTaskEvents(item);
};

bindAllTasks(incompleteTaskHolder);
bindAllTasks(completedTasksHolder);
