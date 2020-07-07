<template>

  <section class="src-components-horarios-profesor">
    
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
        

        <h4> Horarios Por Curso para el Profesor {{dni}} (legajo {{legajo}}) </h4>
        
        <hr>
        <br>

        <div v-if="this.arrayHorarios.length">
            <table class="table">
              <tr class="titulo">
                <th>Id Curso</th>
                <th>Nombre Curso</th>
                <th>Fecha de Clase</th>
               

              </tr>
              <tr v-for="(horario,index) in this.arrayHorarios" :key="index" :class="cssEvento(index)">
                <td>{{ horario.idcurso }}</td>
                <td>{{ horario.nombrecurso }}</td>
                <td>{{ horario.fechaclase }}</td>
               
              </tr>
            </table>
        </div>
        <div v-else class="alert alert-danger">
                No se encontraron horarios en los cursos asignados
        </div>

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
        

        <h4> Horarios Por Curso para el Profesor {{dni}} (legajo {{legajo}}) </h4>
        
        <hr>
        <br>

        <div v-if="this.arrayHorarios.length">
            <table class="table">
              <tr class="titulo">
                <th>Id Curso</th>
                <th>Nombre Curso</th>
                <th>Fecha de Clase</th>
               

              </tr>
              <tr v-for="(horario,index) in this.arrayHorarios" :key="index" :class="cssEvento(index)">
                <td>{{ horario.idcurso }}</td>
                <td>{{ horario.nombrecurso }}</td>
                <td>{{ horario.fechaclase }}</td>
               
              </tr>
            </table>
        </div>
        <div v-else class="alert alert-danger">
                No se encontraron horarios en los cursos asignados
        </div>

        <hr>

        Backend en:
        {{this.$store.state.urlBackend}}

    </div>
  
  </section>

</template>

<script lang="js">

  import NavbarProfesor from "./NavbarProfesor.vue"

  export default  {
    name: 'src-components-horarios-profesor',
    components: {
      NavbarProfesor
    },
    props: ['dni','legajo'],
    mounted () {
      let stringConsulta = '/api/profesor/gethorariosporlegajo/' + this.legajo
      this.axios(this.$store.state.urlBackend + stringConsulta)
          .then(rta => {
              console.log(rta.data)
              this.arrayHorarios = rta.data
          })
          .catch(console.log)
    },
    data () {
      return {
        arrayHorarios : [],
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

        mostrarCont(estado) {
          this.estadoButton = estado
        }

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-horarios-profesor {

  }

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
