<template>

  <section class="src-components-coordinador">
    <div class="jumbotron mt-3" :style="cssChequearEstadoButton()">
      <NavbarCoordinador 
            :dni="this.dni" 
            :legajo="this.getMyLegajo"
            @estadoButtonNav="mostrarCont($event)"
            :buttonCoordinador= 1
            :buttonCursosCoordinador= 0
            :buttonAlumnosCoordinador= 0
            :buttonProfesoresCoordinador= 0
            :buttonOpcionesCoordinador= 0
          />
          
<img src="../../public/logoInstituto.png" width="300" height="100" />
      <img src="../../public/images1.jpg" width="300" height="100" align="right" />
      <hr />
      <br />

      <div v-if="this.getMyData">
        <h1>Bienvenido, {{this.getMyData.nombre}} {{this.getMyData.apellido}}</h1>
        <hr />
      </div>

      Este es el Portal de Coordinadores, desde la barra lateral podrás gestionar los cursos, gestionar los
      estudiantes y  gestionar los profesores. También podrás realizar cambios en tu perfil desde el menú de opciones.

      <hr>

      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              class="d-block w-100"
              src="../../public/cimg1.jpg"
              alt="First slide"
              width="1000"
              height="400"
            />
          </div>
          <div class="carousel-item">
            <img
              class="d-block w-100"
              src="../../public/cimg2.jpg"
              alt="Second slide"
              width="1000"
              height="400"
            />
          </div>
          <div class="carousel-item">
            <img
              class="d-block w-100"
              src="../../public/cimg3.jpg"
              alt="Third slide"
              width="1000"
              height="400"
            />
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>

      <hr>
           
      <h4>Lista de todos los coordinadores del Instituto (estos son tus compañeros)</h4>

      <div v-if="this.getArrayCoordinadores.length">
        <table class="table">
          <tr class="titulo">
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
          </tr>
          <tr
            v-for="(coordinador,index) in this.getArrayCoordinadores"
            :key="index"
            :class="cssEvento(index)"
          >
            <td>{{ coordinador.nombre }}</td>
            <td>{{ coordinador.apellido }}</td>
            <td>{{ coordinador.email }}</td>
          </tr>
        </table>
      </div>
      <div v-else class="alert alert-danger">No se encontraron coordinadores</div>

      <br />
      <br />
      <br />
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

  //const url = process.env.NODE_ENV === 'production'? '': 'http://localhost:8090'
  import NavbarCoordinador from "./NavbarCoordinador.vue"

  export default  {
    name: 'src-components-coordinador',
    components: {
      NavbarCoordinador
    },
    props: ['dni'],
    mounted () {
      this.$store.dispatch('actionCargarArrayCoordinadores')
    },
    data () {
      return {
        estadoButton: true,
        misDatos: {}
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
        },

        


    },
    computed: {
      getArrayCoordinadores(){
        return this.$store.state.arrayCoordinadores
      },

      getMyLegajo(){
        
        let resultado = -1
        
        this.$store.state.arrayCoordinadores.forEach(coordinador => {
          
          if ( coordinador.dni == this.dni )
          {
            resultado = coordinador.legajo
          }
        });
        return resultado
      },

      getMyData() {
        let resultado

        this.$store.state.arrayCoordinadores.forEach(coordinador => {
          if ( coordinador.dni == this.dni )
          {
            resultado = coordinador
          }
        });
        return resultado
      },
      
      
      
    }
}


</script>

<style scoped lang="css">
.fila-impar {
  color: darkslategrey;
  background-color: rgb(184, 184, 184);
}

.fila-par {
  color: darkslategrey;
  background-color: rgb(212, 211, 211);
}

.titulo {
  color: white;
  background-color: rgb(96, 97, 97);
}
</style>
