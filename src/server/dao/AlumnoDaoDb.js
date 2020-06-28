import AlumnoDao from './AlumnoDao.js'
/* import AlumnoModelo from '../modelo/AlumnoModelo.js' */
import CustomError from '../errores/CustomError.js'
import DbClientFactory from '../db/DbClientFactory.js'

class AlumnoDaoDb extends AlumnoDao {

    constructor() {
        super()
        this.db = DbClientFactory.getDbClient()
    }

    async agregarAlumno(alumnoNuevo) {
        let resultadoCargaDatos
        let resultadoCargaAlumno

        try {
            console.log(alumnoNuevo.datosContacto.dni)
            console.log(alumnoNuevo.idCurso)
            resultadoCargaDatos = await this.db.client.insert(alumnoNuevo.datosContacto).into('datoscontacto')
            resultadoCargaAlumno = await this.db.client.insert({'dni':alumnoNuevo.datosContacto.dni}).into('estudiante')
        }
        catch (err) {
            throw new CustomError(500, 'Error al crear un nuevo Alumno', err)
        }
        return alumnoNuevo
    }


    async buscarAlumnoPorDni(dni) {
        let resultado
        try {
            const db = await this.client.getDb()
            const alumno = await db.select().from('alumnos').where('alumnos.dni', '=', dni)
        }
        catch (err) {
            throw new CustomError(500, 'Error al buscar el Alumo', error)
        }
    }

}

export default AlumnoDaoDb