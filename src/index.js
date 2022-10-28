import './styles.css'
import Project from './projects.js'
import { loadUpProjects} from './DOM.js'

function Website(){
    loadUpProjects()
    let main = new Project('main')
    main.setUp()
}
Website()
