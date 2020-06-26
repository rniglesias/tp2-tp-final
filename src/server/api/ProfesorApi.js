import Profesor from '../modelo/Profesor.js'
import ProfesorDaoFactory from '../dao/ProfesorDaoFactory.js'
import CustomError from '../errores/CustomError.js'


class ProfesorApi {

    constructor() {
        this.profesorDao = ProfesorDaoFactory.getDao()
    }


    async agregar(datos) {
        ProfesorApi.asegurarProfesorValido(datos)
        let respuesta = await this.profesorDao.insertarProfesor(datos)
        
        if (respuesta.error) {
            throw new CustomError(400, 'no puedo agregar al profesor', datos)
        }
    }

    async buscar(queryParams) {
        let profesores
        if (queryParams.size == 0) {
            profesores = await this.profesorDao.leerTodosProfesor()
        } else if (queryParams.has('dni')) {
            profesores = await this.profesorDao.buscarPorDniProfesor(queryParams.get('dni'))
        } else {
            throw new CustomError(400, 'parametros de consulta invalidos', queryParams)
        }
        return profesores
    }

    async borrar(legajo) {
        let respuesta = await this.profesorDao.eliminarProfesor(legajo)
        return respuesta
    }

    async modificar(datosnuevos) {
        ProfesorApi.asegurarProfesorValido(datosnuevos)
        await this.profesorDao.modificarProfesor(datosnuevos)
    }

    static asegurarProfesorValido(profesor) {
        try {
            Profesor.validar(profesor)
        } catch (error) {
            throw new CustomError(400, 'el profesor posee un formato json invalido o faltan datos', error)
        }
    }

}

export default ProfesorApi