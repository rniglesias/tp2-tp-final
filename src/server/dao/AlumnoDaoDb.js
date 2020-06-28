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
            throw new CustomError(500, 'Error al buscar el alumno', err)
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

    async buscarDatosCurso(dni){
        try{
            const db = await this.client.getDb()
            const datosCurso = await db.select().from('curso')
            .join('estudiante', 'estudiante.idcurso', 'curso.idcurso')
            .join('nivel', 'nivel.idcurso', 'curso.idcurso')
            .join('profesorescursos', 'profesorescursos.idcurso', 'curso.idcurso')
/*             .join('empleadoslegajos', 'empleadoslegajos.legajo', 'profesorescursos.legajo' ) */
            .where('estudiante.dni', '=', dni)
/*             const datosCursoCompleto = {
                idCurso: datosCurso.idcurso,
                NombreCurso: datosCurso.nombrecurso,
                Dificultad: datosCurso.dificutlad
            }
            console.log(datosCursoCompleto) */
            return datosCurso
        }
        catch(err){
            throw new CustomError(400, 'Error al buscar los datos del curso', err)
        }
    }

}

export default AlumnoDaoDb