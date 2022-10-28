import { createElement,addAttribute,reformatDate,deletePastTodos, highlightCurrent} from "./DOM.js"
import Project from "./projects.js"
import ToDo from "./Todo.js"
import { storage } from "./storage.js"
export let UI = {
    setUpContent(project){
        let Pname = project.getName()
        createElement('div','class','project-name','content')
        createElement('div','class','addTodo','content')
        createElement('div','class','toDoList','content')
        const projectName = document.querySelector('.project-name')
        projectName.textContent = Pname
        const content = document.querySelector('.content')
        const addToDo = document.querySelector('.addTodo')
        const ToDoList = document.querySelector('.toDoList')
        addToDo.textContent = 'Add To Do'
        content.insertBefore(addToDo,ToDoList)
        addToDo.addEventListener('click',(e)=>{
            if(document.querySelector('.ToDoContainer')){
                return
            }
            e.target.innerHTML = ''
            createElement('div','class','ToDoContainer','addTodo')
            createElement('form','class','toDoForm','ToDoContainer')
            createElement('input','class','text','toDoForm')
            addAttribute('.text','type','text')
            addAttribute('.text','required','true')
            addAttribute('.text','placeholder','Enter To Do Name')
            createElement('input','class','date','toDoForm')
            addAttribute('.date','type','date')
            addAttribute('.date','required','true')
            createElement('button','class','add','toDoForm','Add')
            addAttribute('.add','type','submit')
            const addTodoForm = document.querySelector('.toDoForm')
            addTodoForm.addEventListener('submit',(e)=>{
                e.preventDefault()
                const formText =document.querySelector('.text')
                const formDate = document.querySelector('.date')
                let date =reformatDate(formDate.value)
            let cell = new ToDo(formText.value,date)
            project.addTask(cell.val)
            project.storeTasks()
            let projectTasks = project.getTasks()
            console.log(projectTasks)
            addTodoForm.reset()
            deletePastTodos()
            this.removeForm()
            projectTasks.forEach(task=>{
                UI.createToDoCell(task.name,task.date)
                UI.checkForChange(project)
                
            })
    
        })
    }
)
    const addProject = document.querySelector('.addProj')
    addProject.addEventListener('click',e=>{
        if(document.querySelector('.project-form')){
            return
        }
        e.target.innerHTML='<form class="project-form" ><input placeholder ="Enter Project Name"required type="text" class="projName"></form>'
        const projectForm = document.querySelector('.project-form')
        projectForm.addEventListener('submit',e=>{
            e.preventDefault()
            if(storage.contains(document.querySelector('.projName').value) || document.querySelector('.projName').value == 'main'){
                alert('Project Name already exist')
            }else{
                storage.addProject(document.querySelector('.projName').value)
                UI.createProject(document.querySelector('.projName').value)
            addProject.innerHTML = ''
            addProject.textContent = 'Add Project'
            };

            
            

        })
    })
    if(localStorage.getItem(project.getName())){
        let stored = localStorage.getItem(project.getName())
        let storedTasks = JSON.parse(stored)
        project.setTasks(storedTasks)
        storedTasks.forEach(task=>{
            UI.createToDoCell(task.name,task.date)
            UI.checkForChange(project)
        })
    }
    },
    createProject(projectName){
        const content = document.querySelector('.content')
        const list = document.querySelector('.list')
        const projectLi = document.createElement('li')
        projectLi.classList = 'project'
        const projName = document.createElement('span')
        projName.textContent = projectName
        projName.classList = 'projectName'
        const removeBtn = document.createElement('button')
        removeBtn.textContent = 'x'
        removeBtn.classList = 'removeProject'
        removeBtn.addEventListener('click',e=>{
            if(e.target.parentElement.querySelector('.projectName').textContent == document.querySelector('.project-name').textContent){
                content.innerHTML = ''
            }
            if(localStorage.getItem(e.target.parentElement.querySelector('.projectName').textContent)){
                localStorage.removeItem(e.target.parentElement.querySelector('.projectName').textContent)
            }
            
            storage.removeProject(projectName)
            e.target.parentElement.remove()
            

        })
        projectLi.append(projName,removeBtn)
        list.appendChild(projectLi)
        const projects = document.querySelectorAll('.projectName')
        projects.forEach(project=>{
            project.addEventListener('click',(e)=>{
            highlightCurrent(e.target)
            content.innerHTML = ''
            let Name = new Project(project.parentElement.querySelector('.projectName').textContent)
            Name.setUp()
        })
        })    
    },
    createToDoCell(name,date){
        const ToDoCell = document.createElement('div')
        ToDoCell.classList = 'cell'
        const Todolist = document.querySelector('.toDoList')
        Todolist.appendChild(ToDoCell);
       const nameInput =document.createElement('input')
       nameInput.classList = 'name'
       nameInput.readOnly = true
       nameInput.value = name
       ToDoCell.appendChild(nameInput)
       const dateDiv = document.createElement('div')
       dateDiv.classList = 'date'
       dateDiv.textContent = date
       ToDoCell.appendChild(dateDiv)
       const editBtn = document.createElement('button')
       editBtn.classList = 'editBtn'
       editBtn.textContent = 'Edit'
       const deleteBtn = document.createElement('button')
       deleteBtn.classList = 'deleteBtn'
       deleteBtn.textContent = 'Delete'
       ToDoCell.append(editBtn,deleteBtn)  
    },
    checkForChange(project){
        const editButtons = document.querySelectorAll('.editBtn')
        const deleteBtns = document.querySelectorAll('.deleteBtn')
        deleteBtns.forEach(button=>{
            button.addEventListener('click',(e)=>{
                const taskName = e.target.parentElement.querySelector('.name').value
                project.deleteTask(taskName)
                project.storeTasks()
                e.target.parentElement.remove()
            })
        })
        editButtons.forEach(button=>{
            button.addEventListener('click',(e)=>{
                let oldName = e.target.parentElement.querySelector('.name').value
                e.target.disabled = true
                e.target.parentElement.querySelector('.name').readOnly = false
                e.target.parentElement.querySelector('.date').remove()
                const newDateInput = document.createElement('input')
                newDateInput.type = 'date'
                newDateInput.required = true
                newDateInput.classList = 'newDate'
                e.target.parentElement.insertBefore(newDateInput,e.target.parentElement.querySelector('.editBtn'))
                e.target.parentElement.querySelector('.deleteBtn').remove()
                const saveBtn = document.createElement('button')
                saveBtn.classList = 'saveBtn'
                saveBtn.textContent = 'Save'
                e.target.parentElement.appendChild(saveBtn)
                const saveBtns = document.querySelectorAll('.saveBtn')
                saveBtns.forEach(button=>{
                    button.addEventListener('click',(e)=>{
                        if(e.target.parentElement.querySelector('.newDate').value == ''){
                            alert('put in a valid date')
                        }else{
                        const NewName = e.target.parentElement.querySelector('.name').value
                        const Date = reformatDate(e.target.parentElement.querySelector('.newDate').value)
                        e.target.parentElement.remove()
                        let oldTask = project.getTask(oldName)
                        project.deleteTask(oldTask.name)
                        const newTask = new ToDo(NewName,Date)
                        project.addTask(newTask.val)
                        project.storeTasks()
                        UI.createToDoCell(NewName,Date)
                        UI.checkForChange(project)}
                        
                })
                })
                
            })
        })
    },
    removeForm(){
        const title = document.querySelector('.text')
        title.value = ''
        const date = document.querySelector('.date')
        date.value = ''
        const form = document.querySelector('.ToDoContainer')
        form.remove()
        const addTodo = document.querySelector('.addTodo')
        addTodo.textContent = 'Add To Do'
    }

}