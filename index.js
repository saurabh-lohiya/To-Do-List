const taskForm = document.querySelector('[data-task-form]')
const taskInput = document.querySelector('[data-task-input]')
const taskTemplate = document.getElementById('task-template')
const taskContainer = document.getElementById('task-container')
const Local_Storage_List_Key = 'list.tasks'
let tasks = JSON.parse(localStorage.getItem(Local_Storage_List_Key)) || []
const deleteList = document.getElementById('delete-list')
const deleteCompletedTasks = document.getElementById('delete-completed-tasks')
const taskCount = document.querySelector('[data-task-count]')

deleteList.addEventListener('click', e => {
  tasks = []
  saveAndRender()
})

deleteCompletedTasks.addEventListener('click', e => {
  tasks = tasks.filter(task => task.complete === false)
  saveAndRender()
})

taskContainer.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'input') {
    const selectedTask = tasks.find(task => task.id === e.target.id)
    selectedTask.complete = e.target.checked
    console.log('hello')
    save()
    renderTaskCount()
  }
})

taskForm.addEventListener('submit', e => {
  e.preventDefault()
  const taskInputValue = taskInput.value
  if (taskInputValue == null || taskInputValue === '') return
  const newTask = createTask(taskInputValue)
  taskInput.value = ''
  tasks.push(newTask)
  saveAndRender()
})

function saveAndRender () {
  save()
  render()
}

function save () {
  localStorage.setItem(Local_Storage_List_Key, JSON.stringify(tasks))
}

function render () {
  clearElement(taskContainer)
  renderTaskCount()
  renderTasks()
}

function clearElement (element) {
  while (element.firstChild) {
    console.log('HELLO')
    element.removeChild(element.firstChild)
  }
}

function createTask (taskName) {
  return { id: Date.now().toString(), name: taskName, complete: false }
}

function renderTaskCount () {
  const incompleteTasksCount = tasks.filter(task => task.complete === false).length
  const taskString = incompleteTasksCount !== 1 ? 'tasks' : 'task'
  taskCount.innerText = `${incompleteTasksCount} ${taskString} remaining`
}

function renderTasks () {
  tasks.forEach(task => {
    const taskElement = document.importNode(taskTemplate.content, true)
    const checkbox = taskElement.querySelector('input')
    const label = taskElement.querySelector('label')
    checkbox.id = task.id
    checkbox.checked = task.complete
    label.htmlFor = checkbox.id
    label.append(task.name)
    taskContainer.appendChild(taskElement)
  })
}
render()
