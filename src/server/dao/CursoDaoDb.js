import CursoDao from './ProfesorDao.js'
import DbClientFactory from '../db/DbClientFactory.js'




class CursoDaoDb extends CursoDao {

    constructor(){
        super()
        this.client = DbClientFactory.getDbClient()
        
    }

    async leerTodosCursos() {
        let listaCursos

        try {  
            const db = await this.client.getDb()
            listaCursos = await db.select().from('curso')
            if(listaCursos.length == 0){
                resultado = {
                    "error": 400,
                    "msg": "No hay cursos cargados"
                }
            }
        }
        catch(error) {
            resultado = {
                "error": 400,
                "msg": error
            }
            return resultado
        }
        return listaCursos
    }

    async buscarProfesoresCurso(idCurso) {
        let listaProfesores

        try {
            const db = await this.client.getDb()
            listaProfesores = await db.select().from('datoscontacto')
            .innerJoin('empleados', 'empleados.dni', 'datoscontacto.dni')
            .innerJoin('profesorescursos','profesorescursos.legajo', 'empleados.legajo')
            .innerJoin('curso', 'curso.idcurso', 'profesorescursos.idcurso')
            .where('curso.idcurso', '=', idCurso)

            if(listaProfesores.length == 0){
                resultado = {
                    "error": 400,
                    "msg": "No hay profesores cargados en el curso"
                }
                return resultado
            }

        } catch (error) {
            resultado = {
                "error": 400,
                "msg": error
            }
            return resultado
        }
        return listaProfesores
    }

    async buscarAlumnosCurso(idCurso) {
        let listaAlumnos

        try {
            const db = await this.client.getDb()
            listaAlumnos = await db.select().from('datoscontacto')
            .innerJoin('estudiante', 'estudiante.dni', 'datoscontacto.dni')
            .innerJoin('estudiantenotas', 'estudiantenotas.dni', 'estudiante.dni')
            .innerJoin('curso', 'curso.idcurso', 'estudiante.idcurso')
            .where('curso.idcurso', '=', idCurso)

            if(listaAlumnos.length == 0){
                resultado = {
                    "error": 400,
                    "msg": "No hay alumnos cargados en el curso"
                }
                return resultado
            }

        } catch (error) {
            resultado = {
                "error": 400,
                "msg": error
            }
            return resultado
        }
        return listaAlumnos
    }

    async buscarClasesCurso(idCurso) {
        let listaClases
        
        try {
            const db = await this.client.getDb()
            listaClases = await db.select().from('horarioscurso')
            .where('horarioscurso.idcurso', '=', idCurso )

            if(listaClases.length == 0){
                resultado = {
                    "error": 400,
                    "msg": "No hay clases cargadas para este curso"
                }
                return resultado
            }
        } catch (error) {
            resultado = {
                "error": 400,
                "msg": error
            }
            return resultado
        }
        return listaClases        
    }

    async buscarTemarioCurso(idCurso) {
        let listaTemas
        
        try {
            const db = await this.client.getDb()
            listaTemas = await db.select().from('temascurso')
            .where('temascurso.idcurso', '=', idCurso )

            if(listaTemas.length == 0){
                resultado = {
                    "error": 400,
                    "msg": "No hay temas cargados para este curso"
                }
                return resultado
            }
        } catch (error) {
            resultado = {
                "error": 400,
                "msg": error
            }
            return resultado
        }
        return listaTemas        
        
    }
}




export default CursoDaoDb