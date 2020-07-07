import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state : {
        url: 'https://5eb42f9d2b81f70016308293.mockapi.io/alumnos',
        urlTareas: 'https://5eb42f9d2b81f70016308293.mockapi.io/tareas',
        urlBackend : process.env.NODE_ENV === 'production'? '': 'http://localhost:8090',
        arrayAlumnos: [],
        arrayTareas: [],
        arrayProfesores: [],
        arrayCoordinadores: [],
    },
    actions : {
        actionCargarArrayDeAlumnos({commit})
        {
            commit('mutationCargarArrayDeAlumnos')
        },
        actionCargarArrayTareas({commit})
        {
            commit('mutationCargarArrayTareas')
        },
        actionPostearAlumnoAxios({commit}, post)
        {
            commit('mutationPostearAlumnoAxios', post)
        },
        actionPostearTareaAxios({commit}, post)
        {
            commit('mutationPostearTareaAxios', post)            
        },
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
        incrementar(state, cant) {
            state.contador += cant
        },

        decrementar(state, cant) {
            state.contador -= cant
        },

        mutationCargarArrayDeAlumnos(state) {
            console.log("intento cargar array")
            console.log("desde: ", state.url)
            console.log("cargando...")
            axios.get(state.url)
                .then ( res => {
                    console.log("Obtuve estos datos:")
                    console.log(res.data)
                    state.arrayAlumnos = res.data
            })
        },

        mutationCargarArrayTareas(state) {
            console.log("intento cargar array")
            console.log("desde: ", state.urlTareas)
            console.log("cargando...")
            axios.get(state.urlTareas)
                .then ( res => {
                    console.log("Obtuve estos datos:")
                    console.log(res.data)
                    state.arrayTareas = res.data
            })
        },

        mutationPostearAlumnoAxios(state, post){
            
                axios.post(state.url, post, { 
                  'content-type' : 'application/json'
                  })
                  .then( res => {
                    console.log("Se cargo esta info: ")
                    console.log(res.data)
                  })
              
        },

        mutationPostearTareaAxios(state, post){
            
            axios.post(state.urlTareas, post, { 
              'content-type' : 'application/json'
              })
              .then( res => {
                console.log("Se cargo esta info: ")
                console.log(res.data)
              })
          
        },

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
