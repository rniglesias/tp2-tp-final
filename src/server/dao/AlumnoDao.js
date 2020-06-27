import CustomError from '../errores/CustomErrores.js'

class AlumnoDao {

    async add(alumnoNuevo) {
        throw new CustomError(500, 'Falta Implementar Add')
    }

}

export default AlumnoDao