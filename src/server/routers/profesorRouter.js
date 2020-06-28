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

    router.get('/getcursosporlegajo/:legajo', async(req,res) => {
        let resultadoBuscarCursos
        try {
            resultadoBuscarCursos = await profesorApi.buscarCursos(req.params.legajo)
            res.json(resultadoBuscarCursos)
        } catch (err) {
            res.status(err.estado).json(err)
        }

    })

    router.delete('/:legajo', async (req, res) => {
        let resultadoEliminar
        try {
            resultadoEliminar = await profesorApi.borrar(req.params.legajo)
            //res.status(204).send(resultadoEliminar)
            res.json(resultadoEliminar)
        } catch (err) {
            res.status(err.estado).json(err)
        }
    })

    router.delete('/:curso/:legajo', async (req, res) => {
        let resultadoEliminar
        try {
            resultadoEliminar = await profesorApi.eliminarCursoDeProfesor(req.params.curso, req.params.legajo)
            res.json(resultadoEliminar)
        } catch (err) {
            res.status(err.estado).json(err)
        }
    })

    router.put('/cursoaprofesor/', async (req, res) => {
        //res.send("agregar el curso " + req.body.curso + " al profesor " + req.body.legajo)

        let resultadoAsignarCurso
        try {
            resultadoAsignarCurso = await profesorApi.asignarCursoAProfesor(req.body.curso, req.body.legajo)
            res.json(resultadoAsignarCurso)
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