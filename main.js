const form = document.querySelector('.input_space')
const input = document.querySelector('.task_value')
const list = document.querySelector('.tasks_list')

let todos = []

const generateId = (function () {
  let id = 0

  return function () {
    id++
    return String(id)
  }
})()

function createCheckbox(isCompleted) {
  let checkbox = document.createElement('input')
  checkbox.setAttribute('type', 'checkbox')

  if (isCompleted) {
    checkbox.setAttribute('checked', true)
  }

  checkbox.classList.add('checkbox')
  return checkbox
}

function createText(value) {
  let text = document.createElement('p')
  text.textContent = value
  return text
}

function createDeleteButton() {
  let deleteButton = document.createElement('button')
  deleteButton.setAttribute('type', 'button')
  deleteButton.classList.add('delete_button')
  return deleteButton
}

function createTask({ value, isComleted, id }) {
  let checkbox = createCheckbox(isComleted)
  let text = createText(value)
  let deleteButton = createDeleteButton()
  let newTask = document.createElement('li')

  newTask.classList.add('task')

  newTask.appendChild(checkbox)
  newTask.appendChild(text)
  newTask.appendChild(deleteButton)

  deleteButton.addEventListener('click', function () {
    //list.removeChild(newTask);

    todos = todos.filter(function (todo) {
      return id !== todo.id
    })
    renderList()
  })

  checkbox.addEventListener('click', function () {
    let currentTodo = todos.find(function (todo) {
      return id === todo.id
    })
    currentTodo.isComleted = !currentTodo.isComleted
    renderList()
  })

  return newTask
}

function renderList() {
  list.innerHTML = ''
  todos.forEach(function (todo) {
    let task = createTask(todo)
    list.appendChild(task)
  })
}

form.addEventListener('submit', function (event) {
  event.preventDefault()

  const todo = {
    value: input.value,
    isComleted: false,
    id: generateId()
  }

  todos.push(todo)

  // let task = createTask(input.value);

  input.value = ''
  // list.appendChild(task);
  renderList()
  console.log(todos)
})
