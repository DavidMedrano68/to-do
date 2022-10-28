import { UI } from "./UI.js"
export default class Project{
    constructor(name){
        this.name = name
        this.tasks = []
    }
setUp(){
    UI.setUpContent(this)
}
setTasks(arr){
    this.tasks = arr
}

getName(){
    return this.name
}
getTasks(){
    return this.tasks
}
getTask(tasksName){
    return this.tasks.find(task=> task.name == tasksName)
}
contains(taskName) {
    return this.tasks.some((task) => task.getName() === taskName)
}
addTask(newTask) {
    this.tasks.push(newTask)
}

deleteTask(taskName) {
    this.tasks = this.tasks.filter((task) => task.name !== taskName)
}
storeTasks(){
    localStorage.setItem(`${this.getName()}`,JSON.stringify(this.getTasks()))
}
}


