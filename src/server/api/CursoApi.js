import CursoDaoFactory from '../dao/CursoDaoFactory.js'
//import CustomError from '../errores/CustomError.js'


class CursoApi {

    constructor() {
        this.cursoDao = CursoDaoFactory.getDao()
    }

    async leerTodos(){
        let cursos
        cursos = await this.cursoDao.leerTodosCursos()
        return cursos
    }
    
    async buscarProfesores(idCurso) {
        let profesores
        profesores = await this.cursoDao.buscarProfesoresCurso(idCurso)
        return profesores
    }

    async buscarAlumnos(idCurso) {
        let alumnos
        alumnos = await this.cursoDao.buscarAlumnosCurso(idCurso)
        return alumnos
    }

    async buscarClases(idCurso) {
        let clases 
        clases = await this.cursoDao.buscarClasesCurso(idCurso)
        return clases
    }

    async buscarTemas(idCurso) {
        let temas 
        temas = await this.cursoDao.buscarTemarioCurso(idCurso)
        return temas
    }


}

export default CursoApi