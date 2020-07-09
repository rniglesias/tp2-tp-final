<template>

  <section class="src-components-cursos-coordinador">
    
    <div class="jumbotron mt-3" :style="cssChequearEstadoButton()">
        
        <NavbarCoordinador
          :dni="this.dni" 
          :legajo="this.legajo"
          @estadoButtonNav="mostrarCont($event)"
          :buttonCoordinador= 0
          :buttonCursosCoordinador= 1
          :buttonAlumnosCoordinador= 0
          :buttonProfesoresCoordinador= 0
          :buttonOpcionesCoordinador= 0
        />

        <img src="../../public/logoInstituto.png" width="300" height="100">
        <img src="../../public/images1.jpg" width="300" height="100" align="right">



        <hr />
 
        <h4> Cursos del Instituto </h4>

        <hr>
        <br>
        
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
              <div v-if="this.arrayCursos.length">
            <table class="table">
              <tr class="titulo">
                <th>Nombre Curso</th>
                <th>Id Curso</th>
                <th> </th>
               

              </tr>
              <tr v-for="(curso,index) in this.arrayCursos" :key="index" :class="cssEvento(index)">
                <td>{{ curso.nombrecurso }}</td>
                <td>{{ curso.idcurso }}</td>
                <td>
                  <router-link :to="`/CursosDetallesCoordinador/${curso.idcurso}/${curso.nombrecurso}`">
                    <a class="navbar-brand" href="#">Detalles</a>
                  </router-link>
                </td>
               
              </tr>
            </table>
          </div>
          <div v-else class="alert alert-danger">
                No se encontraron cursos asignados
          </div>
            </div>
            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
              
            <h1>Folmulario Vue</h1>
          
            </div>
          </div>




        <br>
        <hr>




        


        <hr>

        <footer id="sticky-footer" class="py-4 bg-dark text-white-50">
            <div class="container text-center">
              <a class="btn btn-block btn-social btn-twitter">
                <img src="../../public/Twitter.png" width="40" height="40" border="2" hspace="4" />
                <img src="../../public/Gmail.png" width="40" height="40" border="2" hspace="4" />
                <img src="../../public/Facebook.png" width="40" height="40" border="2" hspace="4" />
              </a>
              <small>Copyright &copy; Your Website</small>
            </div>
        </footer>


    </div>

  </section>

</template>

<script lang="js">

  import NavbarCoordinador from "./NavbarCoordinador.vue"

  export default  {
    name: 'src-components-cursos-coordinador',
    components: {
      NavbarCoordinador
    },
    props: ['dni','legajo'],
    mounted () {
       
       let stringConsulta = '/api/curso/' 
       this.axios(this.$store.state.urlBackend + stringConsulta)
          .then(rta => {
              console.log(rta.data)
              this.arrayCursos = rta.data
          })
          .catch(console.log)
    },
    data () {
      return {
        arrayCursos : [],
        estadoButton : true
      }
    },
    methods: {
      cssEvento(index) {
          // Este return de un objeto es prque vue asi lo requiere, 
          // pero ponerlo acá queda mucho mas entendible en el codigo HTML.
          return {
              'fila-impar': (index % 2) == 0,
              'fila-par': (index % 2) != 0
          }
      },

      cssChequearEstadoButton() {
          if (this.estadoButton)
            return "margin-left: 16.5%;"
          else
            return "transition-delay: 0.3s;"
      },

      mostrarCont(estado) {
          this.estadoButton = estado
      }
    },
    computed: {

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
</style>
