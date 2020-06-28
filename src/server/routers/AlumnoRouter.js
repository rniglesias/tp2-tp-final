import express from 'express'
import AlumnoApi from '../api/AlumnoApi.js'
import CustomError from '../errores/CustomError.js'

function getAlumnoRouter() {

    const router = express.Router()

    const alumnoApi = new AlumnoApi()

    router.get('/', async (req, res) => {
        try {
            const queryParams = new Map(Object.entries(req.query))
            const alumnos = await alumnoApi.buscarAlumno(queryParams)
            res.json(alumnos)
        }
        catch (err) {
            res.status(err.estado).json(err)
        }

    })

    router.post('/', async (req, res) => {
        const alumnoParaAgregar = req.body
        try {
            const alumnoAgregado = await alumnoApi.agregarAlumno(alumnoParaAgregar)
            console.log("se agegó bien carajo")
            res.status(201).json(alumnoAgregado)
        }
        catch (err) {
            let error = new CustomError(400, 'Error al agregar el alumno', err)
            res.status(err.estado).json(err)
        }
    })

    router.delete('/:dni', async (req, res) => {
        try {
            await alumnoApi.borrarAlumno(req.params.dni)
            res.status(204).send()
        }
        catch (err) {
            res.status(err.estado).json(err)
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