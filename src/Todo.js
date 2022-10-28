export default class ToDo{
    get val(){
        return {name: this.name, date: this.time}
    }
    constructor(name,time){
        this.name = name
        this.time = time
    }
}