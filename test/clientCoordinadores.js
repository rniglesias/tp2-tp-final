import request from 'request-promise-native'

class Cliente {

    constructor(ipServidor, puerto) {
        this.puerto = puerto
        this.serverUrl = `${ipServidor}:${puerto}/api/coordinador`
    }

    async crearCoordinador(coordinador) {
        const postOpt = {
            method: 'POST',
            uri: this.serverUrl,
            json: true
        }
        if (coordinador) {
            postOpt.body = coordinador
        }

        const cliDTO = await request(postOpt)
        return cliDTO
    }

    async borrarCoordinador(dni) {
        await request({
            method: 'DELETE',
            uri: this.serverUrl + '/' + dni,
            json: true
        })
    }

    async eliminarCoordinador(legajo){

        const options = {
            method: 'DELETE',
            uri: this.serverUrl + '/' + legajo,
            json: true
        }

        return await request(options)
    }

    async buscarTodos() {
        const cliDTOs = await request({
            method: 'GET',
            uri: this.serverUrl,
            json: true
        })
        return cliDTOs
    }

    async buscarPorParametros(params) {
        const cliDTOs = await request({
            method: 'GET',
            uri: this.serverUrl,
            qs: params,
            json: true
        })
        return cliDTOs
    }

    async buscarProfesorPorLegajo(legajo) {
        const cliDTOs = await request({
            method: 'GET',
            uri: this.serverUrl + '/getprofesorporlegajo/' + legajo,
            json: true
        })
        return cliDTOs
    }
//nuevo
    async buscarTodosLosProfes() {
        const cliDTOs = await request({
            method: 'GET',
            uri: this.serverUrl,
            json: true
        })
        return cliDTOs
    }

    async reemplazar(nuevocoordi) {
        const cliDTO = await request({
            method: 'PUT',
            uri: this.serverUrl,
            body: nuevocoordi,
            json: true
        })
        return cliDTO
    }


    async asignarCursoAlumnoComoCoordinador(curso, dni) {
        const cliDTO = await request({
            method: 'PUT',
            uri: this.serverUrl + '/cursoalumnocomocoordinador/',
            body: {curso, dni},
            json: true
        })
        return cliDTO
    }
      
    async crearCursoNuevo(idcurso,nombrecurso,fechaclase) {
        const cliDTO = await request({
            method: 'POST',
            uri: this.serverUrl + '/cursonuevo/',
            body: {idcurso, nombrecurso, fechaclase},
            json: true
        })
        
        return cliDTO
    }

/*
    async eliminarCursoDeCoordinador(curso, legajo){

        const options = {
            method: 'DELETE',
            uri: this.serverUrl + '/' + curso + '/' + legajo,
            json: true
        }
        return await request(options)
    }

    
    */    

}

export default Cliente
