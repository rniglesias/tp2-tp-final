import request from 'request-promise-native'

function crearCliente(serverUrl, port){

    const apiPathAlumno = '/api/alumno'
    const apiPathProfesor = '/api/profesor'
    const apiPathCurso = '/api/curso'

    const resourceURIalumno = `${serverUrl}:${port}${apiPathAlumno}`
    const resourceURIprofesor = `${serverUrl}:${port}${apiPathProfesor}`
    const resourceURIcurso = `${serverUrl}:${port}${apiPathCurso}`


    /*--------------------------------ABM Alum------------------------------*/

    async function obtenerPorDniAlumno(dni){
        const options = {
            method: 'GET',
            uri: resourceURIalumno,
            json: true,
            qs: {dni: dni }
        }

        return await request(options)
    }

    async function obtenerTodosAlumno(){

        const options = {
            method: 'GET',
            uri: resourceURIalumno,
            json: true
        }

        return await request(options)
    }


    async function agregarAlumno(alumno){

        const options = {
            method: 'POST',
            uri: resourceURIalumno,
            body: alumno,
            json: true
        }

        return await request(options)
    }

    async function modificarAlumno(Alumno,dni){

        const options = {
            method: 'PUT',
            uri: resourceURIalumno + '/' + dni,
            body: alumno,
            json: true
        }

        return await request(options)
    }
    
    async function eliminarAlumno(dni){

        const options = {
            method: 'DELETE',
            uri: resourceURIalumno + '/' + dni,
            json: true
        }

        return await request(options)
    }


    /*--------------------------------ABM Profesores------------------------------*/

    async function obtenerPorDniProfesor(dni){
        const options = {
            method: 'GET',
            uri: resourceURIprofesor,
            json: true,
            qs: {dni: dni }
        }

        return await request(options)
    }

    async function obtenerTodosProfesores(){

        const options = {
            method: 'GET',
            uri: resourceURIprofesor,
            json: true
        }

        return await request(options)
    }


    async function agregarProfesor(datoscontactoprofesor){

        const options = {
            method: 'POST',
            uri: resourceURIprofesor,
            body: datoscontactoprofesor,
            json: true
        }
       
        //console.log("cargue options asi:")
        //console.log(options)
        //console.log("lanzo el request")
        return await request(options)
    }

    async function modificarProfesor(profesor,dni){

        const options = {
            method: 'PUT',
            uri: resourceURIprofesor + '/' + dni,
            body: profesor,
            json: true
        }

        return await request(options)
    }
    
    async function eliminarProfesor(dni){

        const options = {
            method: 'DELETE',
            uri: resourceURIprofesor + '/' + dni,
            json: true
        }

        return await request(options)
    }

    async function buscarCursosDeProfesor(nroLegajo){
        const options = {
            method: 'GET',
            uri: resourceURIcurso,
            json: true,
            qs: {nroLegajo: nroLegajo }
        }

        return await request(options)
    }

    async function obtenerDatosCursoPorAlumno(dni){
        const options = {
            method: 'GET',
            uri: resourceURIcurso,
            json: true,
            qs: {dni: dni }
        }

        return await request(options)
    }    

    return{
        obtenerTodosAlumno,
        obtenerPorDniAlumno,
        agregarAlumno,
        modificarAlumno,
        eliminarAlumno,
        obtenerTodosProfesores,
        obtenerPorDniProfesor,
        agregarProfesor,
        modificarProfesor,
        eliminarProfesor,
        buscarCursosDeProfesor,
        obtenerDatosCursoPorAlumno,
    }

}


export default crearCliente



