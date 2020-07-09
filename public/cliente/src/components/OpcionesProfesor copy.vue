<template lang>

  <section class="src-components-opciones-profesor">
    
    <div class="jumbotron mt-3" :style="cssChequearEstadoButton()">
        
        <NavbarProfesor 
                  :dni="this.dni" 
                  :legajo="this.legajo"
                  @estadoButtonNav="mostrarCont($event)"
        />

        <img src="../../public/logoInstituto.png" width="300" height="100" />
        <img src="../../public/images1.jpg" width="300" height="100" align="right" />
        <hr />
        


        <div class="container">
            <div class="row">
                <div class="class col-xs-6">
                    
                    <h4> Mis Datos Personales</h4>
                    <hr>

                    <FormCambioDatosProfesor :dni="this.dni" :legajo="this.legajo"/>
                    
                    <br>
                    <br>

                </div>

                <div class="class col-xs-6">

                  <hr>
                  <h4> Contactar al Coordinador </h4>
                  <hr>

                  <br>
                  <br>
                  <FormConsultasParaCoordinador :dni="this.dni" :legajo="this.legajo"/>
                  <br>
                  <br>

                </div>
            </div>
        </div>
        
        
  
        

        

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

  import NavbarProfesor from "./NavbarProfesor.vue"
  import FormConsultasParaCoordinador from "./FormConsultasParaCoordinador.vue"
  import FormCambioDatosProfesor from "./FormCambioDatosProfesor.vue"

  export default  {
    name: 'src-components-opciones-profesor',
    components: {
      NavbarProfesor,
      FormConsultasParaCoordinador,
      FormCambioDatosProfesor
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
  .src-components-opciones-profesor {

  }
</style>
