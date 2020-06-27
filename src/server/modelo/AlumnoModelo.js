import Joi from '@hapi/joi'
import DatosContacto from './DatosContactoModelo'

class Alumno {

    constructor(dni, direccion, telefono, email, nombre, apellido, cursoId) {

        let _datosContacto = _crearDatosContacto(dni, direccion, telefono, email, nombre, apellido)

        let _cursoId = cursoId

        this.getCursoId = () => _cursoId
        this.setCursoId = (cursoId) => _cursoId = cursoId

        this.getDatosContacto = () => _datosContacto
        this.setDatosContacto = (datosContacto) => _datosContacto = datosContacto

    }

    static validar(alumno) {
        const alumnoSchema = {
            _dni: Joi.number().min(1).max(99999999).required(),
            _direccion: Joi.string().alphanum().min(1).required(),
            _telefono: Joi.string().alphanum().min(1).required(),
            _email: Joi.number().integer().min(0).max(120).required(),
            _nombre: Joi.string().alphanum().min(1).required(),
            _apellido: Joi.string().alphanum().min(1).required(),
            _cursoId: Joi.number().integer().min(0),
        }

        const { error } = Joi.validate(alumno, alumnoSchema)
        if (error) {
            throw error
        }
    }

    _crearDatosContacto(dni, direccion, telefono, email, nombre, apellido) {
        datosContacto = new DatosContacto(dni, direccion, telefono, email, nombre, apellido)
        return datosContacto
    }

}

export default Alumno