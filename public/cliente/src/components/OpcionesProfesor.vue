<template lang>

  <section class="src-components-opciones-profesor">
    <div v-if="estadoButton == true " class="jumbotron mt-3" style=" margin-left: 16.5%;">
        
        <NavbarProfesor 
                  :dni="this.dni" 
                  :legajo="this.legajo"
                  @estadoButtonNav="mostrarCont($event)"
        />

        <img src="../../public/logoInstituto.png" width="300" height="100" />
        <img src="../../public/images1.jpg" width="300" height="100" align="right" />
        <hr />
        <br />
        
        <h1>Profesor:  {{dni}}</h1>
        <h2>Legajo:  {{legajo}}</h2>
        <hr>

        <h4> Mis Datos Personales </h4>
        <hr>

        <br>
        <br>
        Poner acá el formulario de modificación de datos personales
        <br>
        <br>

        <hr>
        <h4> Contactar al Coordinador </h4>
        <hr>

        <br>
        <br>
        Poner acá el cuadro de contacto con el Coordinador
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

    <div v-else  class="jumbotron mt-3" style=" transition-delay: 0.3s;">
      <NavbarProfesor 
                  :dni="this.dni" 
                  :legajo="this.legajo"
                  @estadoButtonNav="mostrarCont($event)"
        />

        <img src="../../public/logoInstituto.png" width="300" height="100" />
        <img src="../../public/images1.jpg" width="300" height="100" align="right" />
        <hr />
        <br />
        
        <h1>Profesor:  {{dni}}</h1>
        <h2>Legajo:  {{legajo}}</h2>
        <hr>

        <h4> Mis Datos Personales </h4>
        <hr>

        <br>
        <br>
        Poner acá el formulario de modificación de datos personales
        <br>
        <br>

        <hr>
        <h4> Contactar al Coordinador </h4>
        <hr>

        <br>
        <br>
        Poner acá el cuadro de contacto con el Coordinador
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

  import NavbarProfesor from "./NavbarProfesor.vue"

  export default  {
    name: 'src-components-opciones-profesor',
    components: {
      NavbarProfesor
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

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-opciones-profesor {

  }
</style>
