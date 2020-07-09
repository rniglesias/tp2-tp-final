<template>

  <section class="src-components-opciones-coordinador">
    <div class="jumbotron mt-3" :style="cssChequearEstadoButton()">
      <NavbarCoordinador 
            :dni="this.dni" 
            :legajo="this.legajo"
            @estadoButtonNav="mostrarCont($event)"
            :buttonCoordinador= 0
            :buttonCursosCoordinador= 0
            :buttonAlumnosCoordinador= 0
            :buttonProfesoresCoordinador= 0
            :buttonOpcionesCoordinador= 1
          />
          
    <img src="../../public/logoInstituto.png" width="300" height="100" />
        <img src="../../public/images1.jpg" width="300" height="100" align="right" />
        <hr />
        
  
        <h4> Mis Datos Personales </h4>
        <hr>

     
        <FormCambioDatosCoordinador :dni="this.dni" :legajo="this.legajo"/>
        <br>
        <br>

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
  import FormCambioDatosCoordinador from "./FormCambioDatosCoordinador.vue"

  export default  {
    name: 'src-components-opciones-coordinador',
    components: {
      NavbarCoordinador,
      FormCambioDatosCoordinador
    },
    props: ['dni', 'legajo'],
    mounted () {

    },
    data () {
      return {
        estadoButton : true
      }
    },
    methods: {
      mostrarCont(estado) {
          this.estadoButton = estado
        },
        
      cssChequearEstadoButton() {
          if (this.estadoButton)
            return "margin-left: 16.5%;"
          else
            return "transition-delay: 0.3s;"
        },

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  
</style>
