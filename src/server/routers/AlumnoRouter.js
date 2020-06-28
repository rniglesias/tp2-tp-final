import express from 'express'
import AlumnoApi from '../api/AlumnoApi.js'
import CustomError from '../errores/CustomError.js'

function getAlumnoRouter() {

    const router = express.Router()

    const alumnoApi = new AlumnoApi()

    router.get('/', async(req, res) => {
        try {
            const alumnos = await alumnoApi.listarAlumnos()
            res.json(alumnos)
        }
        catch (err) {
            let error = new CustomError(400, 'Error al traer el alumno', err)
            res.send(error)
        }
    })

    router.get('/:dni', async (req, res) => {
        try {
            const dni = req.params.dni
            const alumnos = await alumnoApi.buscarAlumno(dni)
            res.json(alumnos)
        }
        catch (err) {
            let error = new CustomError(400, 'Error al traer los alumnos', err)
            res.send(error)
        }
    })

    router.get('/datoscurso/:dni', async (req, res) => {
        try {
            const dni = req.params.dni
            const datosCurso = await alumnoApi.buscarDatosCurso(dni)
            res.json(datosCurso)
        }
        catch (err) {
            let error = new CustomError(400, 'Error buscar los datos del curso', err)
            res.send(error)
        }
    })

    router.post('/', async (req, res) => {
        const alumnoParaAgregar = req.body
        try {
            const alumnoAgregado = await alumnoApi.agregarAlumno(alumnoParaAgregar)
            res.status(201).json(alumnoAgregado)
        }
        catch (err) {
            let error = new CustomError(400, 'Error al agregar el alumno', err)
            res.send(error)
        }
    })

    router.delete('/:dni', async (req, res) => {
        try {
            const dni = req.params.dni
            const alumnoBorrado = await alumnoApi.borrarAlumno(dni)
            res.send(alumnoBorrado)
        }
        catch (err) {
            res.send(err)
        }
    })

    router.put('/:dni', async (req, res) => {
        const alumnoParaReemplazar = req.body
        try {
            const alumnoReemplazado = await alumnoApi.reemplazarAlumno(req.params.dni, alumnoParaReemplazar)
            res.json(alumnoReemplazado)
        }
        catch (err) {
            res.status(err.estado).json(err)
        }

    })

    return router

}

export { getAlumnoRouter }