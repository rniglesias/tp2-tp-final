import express from 'express'
import CursoApi from '../api/CursoApi.js'


function getCursoRouter() {

    const router = express.Router()

    const cursoApi = new CursoApi()

    router.get('/', async (req, res) => {
        try {
            const cursos = await cursoApi.leerTodos()
            res.json(cursos)
        } catch (err) {
            res.send(err)
        }
    })

    router.get('/:idCurso', async (req, res) => {
        try {
            const alumnos = await cursoApi.buscarAlumnos(req.params.idCurso)
            res.json(alumnos)
        } catch (err) {
            res.send(err)
        }
    })
    
    router.get('/:idCurso/profesores', async (req, res) => {
        try {
            const profesores = await cursoApi.buscarProfesores(req.params.idCurso)
            res.json(profesores)
        } catch (err) {
            res.send(err)
        }
    })

    router.get('/:idCurso/horarios', async (req, res) => {
        try {
            const clases = await cursoApi.buscarClases(req.params.idCurso)
            res.json(clases)
        } catch (err) {
            res.send(err)
        }
    })

    router.get('/:idCurso/temario', async (req, res) => {
        try {
            const temas = await cursoApi.buscarTemas(req.params.idCurso)
            res.json(temas)
        } catch (err) {
            res.send(err)
        }
    })

    
    return router
}
export { getCursoRouter }
