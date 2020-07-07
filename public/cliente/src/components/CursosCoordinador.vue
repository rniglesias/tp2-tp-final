<template>

  <section class="src-components-cursos-coordinador">
    <div>
      <NavbarCoordinador 
            :dni="this.dni" 
            :legajo="this.getMyLegajo"
            @estadoButtonNav="mostrarCont($event)"
            :buttonCoordinador= 0
            :buttonCursosCoordinador= 1
            :buttonAlumnosCoordinador= 0
            :buttonProfesoresCoordinador= 0
            :buttonOpcionesCoordinador= 0
          />
          

        

    <div v-if="estadoButton == true " class="jumbotron mt-3" style=" margin-left: 16.5%;">
    
          <img src="../../public/logoInstituto.png" width="300" height="100">
          <img src="../../public/images1.jpg" width="300" height="100" align="right">
          <hr>
          <br>
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Listar Cursos</a>
            </li> 
            <li class="nav-item">
              <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Alta de Curso</a>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
              <div v-if="this.getArrayCoordinadores.length">
            <table class="table">
              <tr class="titulo">
                <th>DNI</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Legajo</th>
                <th>Email</th>

              </tr>
              <tr v-for="(coordinador,index) in this.getArrayCoordinadores" :key="index" :class="cssEvento(index)">
                <td>{{ coordinador.dni }}</td>
                <td>{{ coordinador.nombre }}</td>
                <td>{{ coordinador.apellido }}</td>
                <td>{{ coordinador.legajo }}</td>
                <td>{{ coordinador.email }}</td>
              </tr>
            </table>
          </div>
          <div v-else class="alert alert-danger">
                
          </div>
            </div>
            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
              
            <h1>Folmulario Vue</h1>
          
            </div>
          </div>
          <br>
          <br>
          <br>

          
           <footer id="sticky-footer" class="py-4 bg-dark text-white-50">
    <div class="container text-center">
      <a class="btn btn-block btn-social btn-twitter">
    <img src="../../public/Twitter.png" width="40" height="40" border="2" hspace="4" >
    <img src="../../public/Gmail.png" width="40" height="40" border="2" hspace="4" >
    <img src="../../public/Facebook.png" width="40" height="40" border="2" hspace="4" >
  </a>
      <small>Copyright &copy; Your Website</small>
    </div>
  </footer>
            
   
    </div>
    <div v-else  class="jumbotron mt-3" style=" transition-delay: 0.3s;">
                <img src="../../public/logoInstituto.png" width="300" height="100">
          <img src="../../public/images1.jpg" width="300" height="100" align="right">
          <hr>
          <br>
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Listar Cursos</a>
            </li> 
            <li class="nav-item">
              <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Alta de Curso</a>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
              <div v-if="this.getArrayCoordinadores.length">
            <table class="table">
              <tr class="titulo">
                <th>DNI</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Legajo</th>
                <th>Email</th>

              </tr>
              <tr v-for="(coordinador,index) in this.getArrayCoordinadores" :key="index" :class="cssEvento(index)">
                <td>{{ coordinador.dni }}</td>
                <td>{{ coordinador.nombre }}</td>
                <td>{{ coordinador.apellido }}</td>
                <td>{{ coordinador.legajo }}</td>
                <td>{{ coordinador.email }}</td>
              </tr>
            </table>
          </div>
          <div v-else class="alert alert-danger">
                
          </div>
            </div>
            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
              
            <h1>Folmulario Vue</h1>
          
            </div>
          </div>
          <br>
          <br>
          <br>

          
           <footer id="sticky-footer" class="py-4 bg-dark text-white-50">
    <div class="container text-center">
      <a class="btn btn-block btn-social btn-twitter">
    <img src="../../public/Twitter.png" width="40" height="40" border="2" hspace="4" >
    <img src="../../public/Gmail.png" width="40" height="40" border="2" hspace="4" >
    <img src="../../public/Facebook.png" width="40" height="40" border="2" hspace="4" >
  </a>
      <small>Copyright &copy; Your Website</small>
    </div>
  </footer>
            
   
    </div>

    </div>
  </section>

</template>

<script lang="js">

  import NavbarCoordinador from "./NavbarCoordinador.vue"

  export default  {
    name: 'src-components-coordinador',
    components: {
      NavbarCoordinador
    },
    props: ['dni'],
    mounted () {
      this.$store.dispatch('actionCargarArrayCoordinadores')
      console.log(this.$store.state.arrayCoordinadores)
    },
    data () {
      return {
        estadoButton: true,
      }
    },
    methods: {
      cssEvento(index) {
          //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
          return {
              'fila-impar': (index % 2) == 0,
              'fila-par': (index % 2) != 0
          }
        },
        mostrarCont(estado) {
        console.log("estado de mostar: ",estado)
        this.estadoButton= estado
      }
    },
    computed: {
      getArrayCoordinadores(){
        return this.$store.state.arrayCoordinadores
      },

      getMyLegajo(){
        // Para saber el legajo lo busco en el array de coordinadores que cargue en vuex
        
        let resultado = -1
        
        this.$store.state.arrayCoordinadores.forEach(coordinador => {

          if ( coordinador.dni == this.dni )
          {
            resultado = coordinador.legajo
          }
        });
        return resultado
      }

      
    }
}

</script>

<style scoped lang="css">

  .fila-impar {
      color: darkslategrey;
      background-color:rgb(184, 184, 184);
  }

  .fila-par {
      color: darkslategrey;
      background-color:rgb(212, 211, 211);
  }

  .titulo {
    color: white;
    background-color: rgb(96, 97, 97);
  }

  body {
  height: 100%;
}

#page-content {
  flex: 1 0 auto;
}

#sticky-footer {
  flex-shrink: none;
}

/* Other Classes for Page Styling */

body {
  background: #007bff;
  background: linear-gradient(to right, #0062E6, #33AEFF);
}
</style>
