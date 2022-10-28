


export let storage = {
    listOfProjects:[],

    removeProject(projectName){
        let index  = this.listOfProjects.indexOf(projectName)
        this.listOfProjects.splice(index,1)
        this.checkChange()
    },

    addProject(projectName){
        this.listOfProjects.push(projectName)
        this.checkChange()
    },
    contains(projectName){
        return this.listOfProjects.includes(projectName)
    },
    checkChange(){
        localStorage.setItem('__projects',JSON.stringify(this.listOfProjects))
    }
}