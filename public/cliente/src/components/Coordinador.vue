<template>

  <section class="src-components-coordinador">
    <div>
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
          

        

    <div v-if="estadoButton == true " class="jumbotron mt-3" style=" margin-left: 16.5%;">
    
          <img src="../../public/logoInstituto.png" width="300" height="100">
          <img src="../../public/images1.jpg" width="300" height="100" align="right">
          <hr>
          <br>

          <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" src="../../public/cimg1.jpg" alt="First slide" width="1000" height="400">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="../../public/cimg2.jpg" alt="Second slide" width="1000" height="400">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="../../public/cimg3.jpg" alt="Third slide" width="1000" height="400">
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
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

          <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" src="../../public/cimg1.jpg" alt="First slide" width="1000" height="400">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="../../public/cimg2.jpg" alt="Second slide" width="1000" height="400">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="../../public/cimg3.jpg" alt="Third slide" width="1000" height="400">
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
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
</style>
