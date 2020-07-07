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
        actionCargarArrayProfesores({commit})
        {
            commit('mutationCargarArrayProfesores')
        },
        actionCargarArrayCoordinadores({commit})
        {
            commit('mutationCargarArrayCoordinadores')
        },

    },
    mutations : {


      mutationCargarArrayProfesores(state)
        {
            //console.log("Cargando los profesores desde: ", state.urlBackend)
            //console.log(process.env.NODE_ENV)
            //axios.get(state.urlBackend + '/api/profesor/')
            axios(state.urlBackend+'/api/profesor/')
            .then(rta => {
                console.log(rta.data)
                state.arrayProfesores = rta.data
                console.log(state.arrayProfesores)
            })
            .catch(error => console.log("Fallo: ", error))
        },

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
