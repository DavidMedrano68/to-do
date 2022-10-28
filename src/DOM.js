import { format } from 'date-fns'
import { UI } from './UI.js'
import { storage } from './storage.js'

export function createElement(type,att,value,parentNode){
    let newElem = document.createElement(`${type}`)
    newElem.setAttribute(`${att}`,`${value}`)
    const parent = document.querySelector(`.${parentNode}`)
    parent.appendChild(newElem)
    if(arguments.length == 5){
        newElem.textContent = arguments[4]
    }
}
export function addAttribute(selector,att,value){
    const Node = document.querySelector(`${selector}`)
    Node.setAttribute(att,value)
}
export function reformatDate(date){
    let dateArr =date.split('-')
    let arg2 =parseInt(dateArr[1]-1)
    let arg3 = parseInt(dateArr[2])
    let arg1 = parseInt(dateArr[0])
    return format(new Date(arg1,arg2,arg3),'MM/dd/yyyy')
}

export function deletePastTodos(){
    const TodoList = document.querySelector('.toDoList')
    TodoList.innerHTML = ''
}
export function loadUpProjects(){
    if(localStorage.getItem('__projects')){
        let projects = JSON.parse(localStorage.getItem('__projects'))
        storage.listOfProjects = projects
        projects.forEach(project=>{
            UI.createProject(project)
        })
    }
    }
export function highlightCurrent(target){
    const projectNames = document.querySelectorAll('.projectName')
        projectNames.forEach(project=>{
            project.style.background = ''
        })
        target.style.background = 'rgba(160,160,160,0.2)'
        
    }