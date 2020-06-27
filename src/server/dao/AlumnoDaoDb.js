import AlumnoDao from './AlumnoDao.js'
import Alumno from '../modelos/AlumnoModelo.js'
import CustomError from '../errores/CustomErrores.js'
import DbClientFactory from '../db/DbClientFactory.js'

class AlumnoDaoDb extends AlumnoDao {

    constructor() {
        super()
        this.client = DbClientFactory.getDbClient()
    }

    async add(alumnoNuevo) {
        let resultado
        try {
            const db = await this.client.getDb()
            const alumnos = await db.collection('alumnos')
        }
        catch (err) {
            throw new CustomError(500, 'Error al crear un nuevo Alumo', error)
        }
    }

}