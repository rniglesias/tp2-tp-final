import AlumnoDao from './AlumnoDao.js'
import CustomError from '../errores/CustomError.js'
import DbClientFactory from '../db/DbClientFactory.js'

class AlumnoDaoDb extends AlumnoDao {

    constructor() {
        super()
        this.client = DbClientFactory.getDbClient()
    }

    async agregarAlumno(alumnoNuevo) {
        let resultadoCargaDatos
        let resultadoCargaAlumno

        try {
            const db = await this.client.getDb()
            resultadoCargaDatos = await db.insert(alumnoNuevo.datosContacto).into('datoscontacto')
            resultadoCargaAlumno = await db.insert({'dni':alumnoNuevo.datosContacto.dni}).into('estudiante')
            return alumnoNuevo
        }
        catch (err) {
            throw new CustomError(406, 'Error al insertar el nuevo alumno en la DB', err)
        }
    }


    async buscarAlumnoPorDni(dni) {
        try {
            const db = await this.client.getDb()
            const alumno = await db.select().from('estudiante').join('datoscontacto', 'datoscontacto.dni', 'estudiante.dni').where('estudiante.dni', '=', dni)
            if(alumno.length != 0){
                return alumno
            }
            else{
                throw new CustomError(404, 'No hay ningún alumno con el dni informado')
            }
        }
        catch (err) {
            if(!(err instanceof CustomError)){
                throw new CustomError(500, 'Error al buscar el alumno', err)
            }
            throw err
            
        }
    }

    async buscarCurso(idCurso) {
        try {
            const db = await this.client.getDb()
            const curso = await db.select().from('curso').where('curso.idCurso', '=', idCurso)
            if(curso.length != 0){
                return curso
            }
            else{
                throw new CustomError(404, 'No hay ningún curso con el ID informado')
            }
        }
        catch (err) {
            if(!(err instanceof CustomError)){
                throw new CustomError(400, 'Error al buscar el curso', err)
            }
            throw err
        }
    }

    async listarAlumnos(){
        try{
            const db = await this.client.getDb()
            const alumnos = await db.select().from('estudiante').join('datoscontacto', 'datoscontacto.dni', 'estudiante.dni')
            return alumnos
        }
        catch(err){
            throw new CustomError(500, 'Error al buscar los alumnos', err)
        }
    }

    async borrarAlumno(dni){
        try{
            const db = await this.client.getDb()
            await db.delete().from('estudiante').where('estudiante.dni', '=', dni)
            await db.delete().from('datoscontacto').where('datoscontacto.dni', '=', dni)
        }
        catch(err){
            throw new CustomError(400, 'Error al eliminar el alumno', err)
        }           
    }

    async modificarCursoAlumno(datos){
        try{
            const db = await this.client.getDb()
            await db.update(datos).from('estudiante').where('estudiante.dni', '=', datos.dni)
        }
        catch(err){
            if(err.sqlMessage){
                throw new CustomError(400, 'No hay ningún curso con el Id informado', err.sqlMessage)    
            }
            else{
                throw new CustomError(400, 'No hay ningún alumno con el dni informado', '')
            }
        }       
    }

    async modificarAlumno(alumno){
        try{
            const db = await this.client.getDb()
            await db.update(alumno).from('datoscontacto').where('datoscontacto.dni', '=', alumno.dni)
        }
        catch(err){
            throw new CustomError(400, 'Error al modificar al alumno', err)
        }         
    }

    async buscarDatosCurso(dni){
        try{
            const db = await this.client.getDb()
            const datosCurso = await db.select().from('curso')
            .join('estudiante', 'estudiante.idcurso', 'curso.idcurso')
            .join('nivel', 'nivel.idcurso', 'curso.idcurso')
            .join('profesorescursos', 'profesorescursos.idcurso', 'curso.idcurso')
            .where('estudiante.dni', '=', dni)
            return datosCurso
        }
        catch(err){
            throw new CustomError(400, 'Error al buscar los datos del curso', err)
        }
    }

}

export default AlumnoDaoDb