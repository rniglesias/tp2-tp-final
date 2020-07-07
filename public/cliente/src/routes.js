import Vue from  'vue'
import VueRouter from 'vue-router'

import Login from "./components/Login.vue";
import Alumno from "./components/Alumno.vue";
import Profesor from "./components/Profesor.vue";
import CursosProfesor from "./components/CursosProfesor.vue";
import CursoDetalles from "./components/CursoDetalles.vue";
import OpcionesProfesor from "./components/OpcionesProfesor.vue";
import HorariosProfesor from "./components/HorariosProfesor.vue";
import CalificarAlumno from "./components/CalificarAlumno.vue";

// Lo de Facu
import Coordinador from "./components/Coordinador.vue";
import CursosCoordinador from "./components/CursosCoordinador.vue";
import AlumnosCoordinador from "./components/AlumnosCoordinador.vue";
import ProfesoresCoordinador from "./components/ProfesoresCoordinador.vue";
import OpcionesCoordinador from "./components/OpcionesCoordinador.vue";

Vue.use(VueRouter)

//export const router = new VueRouter({
export default new VueRouter({
    mode: 'history',
    routes: [
	{path: '/', redirect: '/Login'},
      {path: '/Alumno', component: Alumno},
      {path: '/Login', component: Login},
      {path: '/Profesor/:dni/', component: Profesor, props:true},
      {path: '/CursosProfesor/:dni/:legajo', component: CursosProfesor, props:true},
      {path: '/CursoDetalles/:idCurso/:nombreCurso/:dniProfesor/:legajo', component: CursoDetalles, props:true},
      {path: '/OpcionesProfesor/:dni/:legajo', component: OpcionesProfesor, props:true},
      {path: '/HorariosProfesor/:dni/:legajo', component: HorariosProfesor, props:true},
      {path: '/CalificarAlumno/:dniProfesor/:legajo/:dniAlumno', component: CalificarAlumno, props:true},
      {path: '/Coordinador/:dni/', component: Coordinador, props:true},
      {path: '/CursosCoordinador', component: CursosCoordinador, props:true},
      {path: '/AlumnosCoordinador', component: AlumnosCoordinador, props:true},
      {path: '/ProfesoresCoordinador', component: ProfesoresCoordinador, props:true},
      {path: '/OpcionesCoordinador/:dni/:legajo', component: OpcionesCoordinador, props:true}
    ]
})

