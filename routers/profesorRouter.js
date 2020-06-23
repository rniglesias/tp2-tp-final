import express from 'express'
import ProfesorApi from '../api/ProfesorApi.js'


function getProfesorRouter() {

    const router = express.Router()

    const profesorApi = new ProfesorApi()

    router.post('/', async (req, res) => {
        const profesorParaAgregar = req.body

        try {
            await profesorApi.agregar(profesorParaAgregar)
            res.status(201).json(profesorParaAgregar)
        } catch (err) {
            res.send(err)
        }
    })

    router.get('/', async (req, res) => {
        try {
            const queryParams = new Map(Object.entries(req.query))
            const profesores = await profesorApi.buscar(queryParams)
            res.json(profesores)
        } catch (err) {
            res.send(err)
        }
    })

    router.delete('/:legajo', async (req, res) => {
        try {
            await profesorApi.borrar(req.params.legajo)
            res.status(204).send()
        } catch (err) {
            res.status(err.estado).json(err)
        }
    })

    router.put('/', async (req, res) => {
        const profeParaReemplazar = req.body

        try {
            await profesorApi.modificar(profeParaReemplazar)
            res.json(profeParaReemplazar)
        } catch (err) {
            res.send(err)
        }
    })

    return router
}
export { getProfesorRouter }
