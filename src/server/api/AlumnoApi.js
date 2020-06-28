import AlumnoModelo from '../modelo/AlumnoModelo.js'
import CustomError from '../errores/CustomError.js'
import AlumnoDaoFactory from '../dao/AlumnoDaoFactory.js'

class AlumnoApi {

    constructor() {
        this.alumnosDao = AlumnoDaoFactory.getDao()
    }

    async agregarAlumno(al) {
        let alumnoFormateado = new AlumnoModelo(al.dni,al.direccion,al.telefono,al.email,al.nombre,al.apellido)
        try{
            AlumnoApi.asegurarAlumnoValido(alumnoFormateado)
        }
        catch (err){
            throw err
        }
        try{
           const alumnoAgregado = await this.alumnosDao.agregarAlumno(alumnoFormateado)
        }
        catch (err){
            throw err
        }
        return alumnoFormateado
    }

    async buscarAlumno(dni) {
        const alumno = await this.alumnosDao.buscarAlumnoPorDni(dni)
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