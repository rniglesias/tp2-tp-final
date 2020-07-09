import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state : {
        urlBackend : process.env.NODE_ENV === 'production'? '': 'http://localhost:8090',
        arrayAlumnos: [],
        arrayTareas: [],
        arrayProfesores: [],
        arrayCoordinadores: [],
    },
    actions : {
        actionCargarArrayProfesores()
        {
            axios(this.state.urlBackend+'/api/profesor/')
            .then(rta => {
                this.state.arrayProfesores = rta.data
            })
            .catch(error => console.log("Fallo: ", error))
        },
        actionCargarArrayCoordinadores()
        {
            axios(this.state.urlBackend+'/api/coordinador/')
            .then(rta => {
                this.state.arrayCoordinadores = rta.data
            })
            .catch(error => console.log("Fallo: ", error))
        },
        actionGetProfesor(dni) {
            let resultado

            this.state.arrayProfesores.forEach(profesor => {
                    if ( profesor.dni == dni )
                    {
                        resultado = profesor
                    }
            });
            return resultado
        }

    },
    mutations : {

      // Corregido y ya no se usa esta porque tiene promises
      mutationCargarArrayProfesores(state)
        {
            axios(state.urlBackend+'/api/profesor/')
            .then(rta => {
                console.log(rta.data)
                state.arrayProfesores = rta.data
                console.log(state.arrayProfesores)
            })
            .catch(error => console.log("Fallo: ", error))
        },

        // Corregido y ya no se usa esta porque tiene promises
        mutationCargarArrayCoordinadores(state)
        {
            axios(state.urlBackend+'/api/coordinador/')
            .then(rta => {
                console.log(rta.data)
                state.arrayCoordinadores = rta.data
                console.log(state.arrayCoordinadores)
            })
            .catch(error => console.log("Fallo: ", error))
        },


    }
})
