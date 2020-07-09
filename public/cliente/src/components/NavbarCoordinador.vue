<template>

  <section class="src-components-navbar-coordinador">

    <div class="pos-f-t">
       
  <div class="collapse show" id="navbarToggleExternalContent">
    
    
      <div class="bg-secondary col-sm-3 col-md-2 sidebar">
      
    <div class="d-inline-block mr-3" id="navbarNav">
      <nav class="navbar navbar-secondary">
        <div class="list-group">

        <ul class="navbar-nav">
          <li class="nav-item">
          <router-link :to="`/Coordinador/${dni}`">
          <div v-if="buttonCoordinador==true">
            <button type="button" class="btn btn-secondary btn-lg btn-block active"><a class="text-light" href="#">Inicio</a></button>
          </div>
          <div v-else>
            <button type="button" class="btn btn-dark btn-lg btn-block"><a class="text-light" href="#">Inicio</a></button>
          </div>
      </router-link>
      </li>
          <li class="nav-item">
            <router-link :to="`/CursosCoordinador/${dni}/${legajo}`">
              <div v-if="buttonCursosCoordinador==true">
            <button type="button" class="btn btn-secondary btn-lg btn-block active"><a class="text-light" href="#">Cursos</a></button>
          </div>
          <div v-else>
            <button type="button" class="btn btn-dark btn-lg btn-block"><a class="text-light" href="#">Cursos</a></button>
          </div>
            </router-link>
          </li>
      
          <li class="nav-item">
            <router-link :to="`/AlumnosCoordinador/${dni}/${legajo}`">
              <div v-if="buttonAlumnosCoordinador==true">
            <button type="button" class="btn btn-secondary btn-lg btn-block active"><a class="text-light" href="#">Alumnos</a></button>
          </div>
          <div v-else>
            <button type="button" class="btn btn-dark btn-lg btn-block"><a class="text-light" href="#">Alumnos</a></button>
          </div>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="`/ProfesoresCoordinador/${dni}/${legajo}`">
              <div v-if="buttonProfesoresCoordinador==true">
            <button type="button" class="btn btn-secondary btn-lg btn-block active"><a class="text-light" href="#">Profesores</a></button>
          </div>
          <div v-else>
            <button type="button" class="btn btn-dark btn-lg btn-block"><a class="text-light" href="#">Profesores</a></button>
          </div>
            </router-link>
          </li>
       
          <li class="nav-item">
            <router-link :to="`/OpcionesCoordinador/${dni}/${legajo}`">
              <div v-if="buttonOpcionesCoordinador==true">
            <button type="button" class="btn btn-secondary btn-lg btn-block active"><a class="text-light" href="#">Opciones</a></button>
          </div>
          <div v-else>
            <button type="button" class="btn btn-dark btn-lg btn-block"><a class="text-light" href="#">Opciones</a></button>
          </div>
            </router-link>
          </li>
      
          <li class="nav-item">
            <router-link to="/" tag="li"> 
              <button type="button" class="btn btn-dark btn-lg btn-block"><a class="text-light" href="#">Cerrar sesión</a></button>
            </router-link>
          </li>
       
        </ul>
        </div>
      </nav>
      </div>
      
      
    </div>
    
  </div>
  
 <nav class="fixed-top navbar navbar-dark bg-dark">
    <button class="navbar-toggler" type="button" data-toggle="collapse"
     data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" 
     aria-expanded="true" aria-label="Toggle navigation"
     @click="incrementar()"
     ><span class="navbar-toggler-icon"></span>
    </button>
    <a style="color:white">Coordinador: {{dni}} Legajo: {{legajo}}</a>
  </nav>
</div>



  </section>

</template>

<script lang="js">

  export default  {
    name: 'src-components-navbar-coordinador',
    props: ['dni','legajo','buttonCoordinador','buttonCursosCoordinador','buttonAlumnosCoordinador','buttonProfesoresCoordinador','buttonOpcionesCoordinador'],
    mounted () {
      console.log('mounted Hijo')
    },
    updated () {
      console.log('updated Hijo')
    },
    data () {
      return {
        estadoButtonNav: true
      }
    },
    methods:{
      incrementar() {
        if(this.estadoButtonNav){
        this.estadoButtonNav = false
        }else{
          this.estadoButtonNav = true
        }
        console.log('incrementar hijo',this.estadoButtonNav)
        this.$emit('estadoButtonNav',this.estadoButtonNav)
      }
    },
    computed: {

    }
}


</script>


<style scoped lang="css">

.bg-dark {
   background-color: #2a68af!important;
}
.bg-secondary {
   background-color: #3070b8b6!important;
}
.btn-dark {
    color: #fff;
    background-color: #2a68af!important;
    border-color: #172c58;
}
.btn-secondary {
    color: #fff;
    background-color: #172c58!important;
    border-color: #172c58;
}
.navbar-dark .navbar-toggler {
    color: #172c58;
    border-color:  #172c58;
    background-color: #4193f0b6!important;
}
body {
padding-top: 50px;
}
.sub-header {
padding-bottom: 10px;
border-bottom: 1px solid #eee;
}
.sidebar {
display: none;
}
@media (min-width : 980px) {
.sidebar {
position: fixed;
top: 51px;
bottom: 0;
left: 0;
z-index: 1000;
display: block;
padding: 20px;
overflow-x: hidden;
overflow-y: auto;
/* Scrollable contents if viewport is shorter than content. */
background-color: #f5f5f5;
border-right: 1px solid #eee;
}
}
/* Sidebar navigation */
.nav-sidebar {
margin-right: -21px;
/* 20px padding + 1px border */
margin-bottom: 20px;
margin-left: -20px;
}
.nav-sidebar>li>a {
padding-right: 20px;
padding-left: 20px;
}
.nav-sidebar>.active>a {
color: #fff;
background-color: #428bca;
}
/*
* Main content
*/
.main {
padding: 20px;
}
@media (min-width : 980px) {
.main {
padding-right: 40px;
padding-left: 40px;
}
}
.main .page-header {
margin-top: 0;
}
/*
* Placeholder dashboard ideas
*/
.placeholders {
margin-bottom: 30px;
text-align: center;
}
.placeholders h4 {
margin-bottom: 0;
}
.placeholder {
margin-bottom: 20px;
}
.placeholder img {
display: inline-block;
border-radius: 50%;
}
.controls {
margin-top: 16px;
border: 1px solid transparent;
border-radius: 2px 0 0 2px;
box-sizing: border-box;
-moz-box-sizing: border-box;
height: 32px;
outline: none;
box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}
</style>
