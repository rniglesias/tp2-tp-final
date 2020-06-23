import request from 'request-promise-native'

class Cliente {

    constructor(ipServidor, puerto) {
        this.puerto = puerto
        this.serverUrl = `${ipServidor}:${puerto}/api/profesores`
    }

    async crearProfesor(profesor) {
        const postOpt = {
            method: 'POST',
            uri: this.serverUrl,
            json: true
        }
        if (profesor) {
            postOpt.body = profesor
        }

        const cliDTO = await request(postOpt)
        return cliDTO
    }

    async borrarProfesor(dni) {
        await request({
            method: 'DELETE',
            uri: this.serverUrl + '/' + dni,
            json: true
        })
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

    async reemplazar(nuevoprofe) {
        const cliDTO = await request({
            method: 'PUT',
            uri: this.serverUrl,
            body: nuevoprofe,
            json: true
        })
        return cliDTO
    }
}

export default Cliente
