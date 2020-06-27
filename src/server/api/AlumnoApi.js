import Alumno from '../modelos/AlumnoModelo.js'
import CustomError from '../errores.CustomErrores.js'
import AlumnoDaoFactory from '../dao/AlumnoDaoFactory.js'

class AlumnoApi {

    constructor() {
        this.alumnosDao = AlumnoDaoFactory.getDao()
    }

    async agregarAlumno(alumnoParaAgregar) {
        AlumnoApi.asegurarAlumnoValido(alumnoParaAgregar)
        const alumnoAgregado = await this.alumnosDao.add(alumnoParaAgregar)
        return alumnoAgregado
    }



    static asegurarAlumnoValido(alumno) {
        try {
            AlumnoModelo.validarAlumno(alumno)
        } catch (error) {
            throw new CustomError(400, 'El Alumno posee un formato json invalido o faltan datos', error)
        }
    }

}

export default AlumnoApi