import express from 'express'
import _ from 'underscore'
import db from './db/conexionDB.js'
import Joi from '@hapi/joi'

function crearServidor(){

    
    const app = express()
    app.use(express.json())


    // Add headers
    app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    });



/*-----------------------------Abm alumno -----------------------------------*/

app.get("/api/alumno", (req, res) => {
    let resultado = null
    if(_.isEmpty(req.query)){
        const listaAlumno = db.leerTodosAlumno()
        listaAlumno.then(lista =>{
            resultado = lista
            res.send(resultado)  
        })                         

    }else if(req.query.dni){   
        const Alumno = db.buscarPorDniAlumno(req.query.dni) 
        Alumno.then(estu => {
            resultado = estu
            res.send(resultado)  
        })        
    }else{
        resultado = {
            "error": 400,
            "msg": "Parámetros inválidos."
        }
        res.send(resultado)  

    }   
        
})


app.post("/api/alumno", (req, res) => {
    let resultado = null

    if(validarAlumno(req.body)){
        const DatoAlumno = db.buscarPorDniAlumno(req.body.dni)        
        DatoAlumno.then(estu =>{            
            if(estu.error){
                db.insertarAlumno(req.body)
                resultado = req.body
                res.send(resultado)   
            }else{
                resultado = {
                    "error": 400,
                    "msg": "Numero de Dni Ya existe."
                }
                res.send(resultado)   
            }
        })  
            
    }else{
        resultado = {
            "error": 400,
            "msg": "Body incorrecto."
        }
        res.send(resultado)     
    }
})

app.put("/api/alumno/:dni", (req, res) => {
    if(validarAlumno(req.body)){
        const AlumnoNuevo = db.modificarAlumno(req.params.dni,req.body)
        AlumnoNuevo.then(est =>{
                if(est == 1){
                    res.send(req.body)
                }else{
                    let resultado = {
                        "error": 400,
                        "msg": "DNI no encontrado."
                    }
                    res.send(resultado)
                }
                
            })   
    
    }else{  
        let resultado = {
            "error": 400,
            "msg": "Body incorrecto."
        }
        res.send(resultado) 
    }
})

app.delete("/api/alumno/:dni", (req, res) => {
    
    
    if(req.params.dni){
    
        const AlumnoBorrado = db.eliminarAlumno(req.params.dni)
        AlumnoBorrado.then(est =>{
            if(est == 1){
                let resultado = {
                    "Status": "200 OK",
                    "msg": "Alumno eliminado."
                }
                res.send(resultado)
            }else{
                let resultado = {
                    "error": 400,
                    "msg": "DNI no encontrado."
                }
                res.send(resultado)
            }

        })               
    }else{
        let resultado = {
            "error": 400,
            "msg": "Parámetros Incorrectos."
        }
        res.send(resultado) 
    }    
})

function validarAlumno(Alumno) {

    
    const AlumnoSchema = {        
        dni: Joi.number().min(1).max(99999999).required(),
        direccion: Joi.string().min(1).required(),
        telefono: Joi.string().min(1).required(),
        email: Joi.string().min(1).required(),
        nombre: Joi.string().min(1).required(),
        apellido: Joi.string().min(1).required(),
        
    }

    const { error } = Joi.validate(Alumno, AlumnoSchema)
    if (error) {
        return false        
    }
    return true
}

/*--------------------------------------fin api--------------------------------------------*/

/*----------------------------- api profesor -----------------------------------*/

app.get("/api/profesor", (req, res) => {
    let resultado = null
    if(_.isEmpty(req.query)){
        const listaProfe = db.leerTodosProfesor()
        listaProfe.then(lista =>{
            resultado = lista
            res.send(resultado)  
        })                         

    }else if(req.query.dni){   
        const profe = db.buscarPorDniProfesor(req.query.dni) 
        profe.then(estu => {
            resultado = estu
            res.send(resultado)  
        })        


        // Agregar la busqueda por legajo

    }else{
        resultado = {
            "error": 400,
            "msg": "Parámetros inválidos."
        }
        res.send(resultado)  

    }   
        
})


app.post("/api/profesor", (req, res) => {
    let resultado = null

    if(validarProfesor(req.body)){
        const DatoProfe = db.buscarPorDniProfesor(req.body.dni)        
        DatoProfe.then(profe =>{            
            if(profe.error){
                db.insertarProfesor(req.body)
                resultado = req.body
                res.send(resultado)   
            }else{
                resultado = {
                    "error": 400,
                    "msg": "Numero de Dni Ya existe."
                }
                res.send(resultado)   
            }
        })  
            
    }else{
        resultado = {
            "error": 400,
            "msg": "Body incorrecto."
        }
        res.send(resultado)     
    }
})

app.put("/api/profesor/:dni", (req, res) => {
    if(validarProfesor(req.body)){
        //const ProfesorNuevo = db.modificarProfesor(req.params.dni,req.body)
        const ProfesorNuevo = db.modificarProfesor(req.body)
        ProfesorNuevo.then(prof =>{
                if(prof == 1){
                    res.send(req.body)
                }else{
                    let resultado = {
                        "error": 400,
                        "msg": "DNI no encontrado."
                    }
                    res.send(resultado)
                }
                
            })   
    
    }else{  
        let resultado = {
            "error": 400,
            "msg": "Body incorrecto."
        }
        res.send(resultado) 
    }
})

app.delete("/api/profesor/:dni", (req, res) => {
    
    
    if(req.params.dni){
    
        const ProfesorBorrado = db.eliminarProfesor(req.params.dni)
        ProfesorBorrado.then(est =>{
            if(est == 1){
                let resultado = {
                    "Status": "200 OK",
                    "msg": "Profesor eliminado."
                }
                res.send(resultado)
            }else{
                let resultado = {
                    "error": 400,
                    "msg": "DNI no encontrado."
                }
                res.send(resultado)
            }

        })               
    }else{
        let resultado = {
            "error": 400,
            "msg": "Parámetros Incorrectos."
        }
        res.send(resultado) 
    }    
})

function validarProfesor(Profesor) {

    
    const ProfesorSchema = {        
        dni: Joi.number().min(1).max(99999999).required(),
        direccion: Joi.string().min(1).required(),
        telefono: Joi.string().min(1).required(),
        email: Joi.string().min(1).required(),
        nombre: Joi.string().min(1).required(),
        apellido: Joi.string().min(1).required(),
        legajo: Joi.number().min(1).max(99999999).required(),
        
    }

    const { error } = Joi.validate(Profesor, ProfesorSchema)
    if (error) {
        return false        
    }
    return true
}


// Acá tuvimos problemas para separa las consultas en dos get (no funciona lo que está comentado abajo porque toma el de arriba)
// si se les ocurres como separarlo lo vemos
/*----------------------------- PROFESOR-----------------------------------*/

app.get("/api/curso", (req, res) => {
    let resultado = null
    if(req.query.nroLegajo){   
        const listaCursos = db.buscarCursosDeProfesor(req.query.nroLegajo)
        listaCursos.then(lista => {
            resultado = lista
            res.send(resultado)  
        })   
    }
    else if(req.query.dni) { 
        const listaCursos = db.obtenerDatosCursoPorAlumno(req.query.dni)
        listaCursos.then(lista => {
            resultado = lista
            res.send(resultado)  
        })         
    }else{
        resultado = {
            "error": 400,
            "msg": "Parámetros inválidos."
        }
        res.send(resultado)
    }  

})


/*----------------------------- ALUMNO-----------------------------------*/

/* app.get("/api/curso/", (req, res) => {
    let resultado = null
    console.log("hola")
    if(req.query.dni){   
        const listaCursos = db.obtenerDatosCursoPorAlumno(req.query.dni)
        listaCursos.then(lista => {
            resultado = lista
            res.send(resultado)  
        })        
    }else{
        resultado = {
            "error": 400,
            "msg": "Parámetros inválidos."
        }
        res.send(resultado)
    }  

})
 */

/*--------------------------------------fin api--------------------------------------------*/

/*--------------------------------------fin api--------------------------------------------*/



    return app

}

export default crearServidor



