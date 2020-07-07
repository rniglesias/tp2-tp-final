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
        Backend en:
        {{this.$store.state.urlBackend}}
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
        Backend en:
        {{this.$store.state.urlBackend}}
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
