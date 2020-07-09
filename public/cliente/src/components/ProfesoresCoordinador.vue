<template>

  <section class="src-components-profesores-coordinador">
       <div class="jumbotron mt-3" :style="cssChequearEstadoButton()">
      <NavbarCoordinador 
            :dni="this.dni" 
            :legajo="this.legajo"
            @estadoButtonNav="mostrarCont($event)"
            :buttonCoordinador= 0
            :buttonCursosCoordinador= 0
            :buttonAlumnosCoordinador= 0
            :buttonProfesoresCoordinador= 1
            :buttonOpcionesCoordinador= 0
          />
          

      
          <img src="../../public/logoInstituto.png" width="300" height="100">
          <img src="../../public/images1.jpg" width="300" height="100" align="right">
          
          <hr />
          <h4> Profesores del Instituto </h4>
          <hr>
          <br>
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Listar Profesores</a>
            </li> 
            <li class="nav-item">
              <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Alta de Profesor</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Consultas de Profesores</a>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
              <div v-if="this.getArrayProfesores.length">
            <table class="table">
              <tr class="titulo">
                <th>DNI</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Legajo</th>
                <th>Email</th>

              </tr>
              <tr v-for="(profesor,index) in this.getArrayProfesores" :key="index" :class="cssEvento(index)">
                <td>{{ profesor.dni }}</td>
                <td>{{ profesor.nombre }}</td>
                <td>{{ profesor.apellido }}</td>
                <td>{{ profesor.legajo }}</td>
                <td>{{ profesor.email }}</td>
              </tr>
            </table>
          </div>
          <div v-else class="alert alert-danger">
                
          </div>
            </div>
            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
              
            

            <FormAgregarProfesor />

            </div>
            <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
              
          

            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
              <div v-if="this.arrayConsultas.length">
            <table class="table">
              <tr class="titulo">
                <th>Id Consulta</th>
                <th>Fecha</th>
                <th>Apellido</th>
                <th>Nombre</th>
                <th>Consulta</th>
                <th>Legajo</th>
                <th>DNI</th>
                <th>Leida</th>
                
               

              </tr>
              <tr v-for="(consulta,index) in this.arrayConsultas" :key="index" :class="cssEvento(index)">
                <td>{{ consulta.idConsulta }}</td>
                <td>{{ consulta.fecha }}</td>
                <td>{{ consulta.apellido}}</td>
                <td>{{ consulta.nombre }}</td>
                <td>{{ consulta.consulta }}</td>
                <td>{{ consulta.legajo }}</td>
                <td>{{ consulta.dni }}</td>
                <td>{{ consulta.leida }}</td>

               

              </tr>
            </table>
          </div>
            </div>
          


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

  </section>

</template>

<script lang="js">

  import NavbarCoordinador from "./NavbarCoordinador.vue"
  import FormAgregarProfesor from "./FormAgregarProfesor.vue"

  export default  {
    name: 'src-components-profesores-coordinador',
    components: {
      NavbarCoordinador,
      FormAgregarProfesor
    },
    props: ['dni','legajo'],
    mounted () {
      this.$store.dispatch('actionCargarArrayProfesores')

      let stringConsulta = '/api/profesor/consultas' 
       this.axios(this.$store.state.urlBackend + stringConsulta)
          .then(rta => {
              console.log(rta.data)
              this.arrayConsultas = rta.data
          })
          .catch(console.log)
    
    },
    data () {
      return {
        estadoButton: true,
        arrayConsultas : [],
        misDatos: {}
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

        cssChequearEstadoButton() {
          if (this.estadoButton)
            return "margin-left: 16.5%;"
          else
            return "transition-delay: 0.3s;"
        },

        mostrarCont(estado) {
        console.log("estado de mostar: ",estado)
        this.estadoButton= estado
      }
    },
    computed: {
      getArrayProfesores(){
        return this.$store.state.arrayProfesores
      },

      getMyLegajo(){
        // Para saber el legajo lo busco en el array de profesores que cargue en vuex
        
        let resultado = -1
        
        this.$store.state.arrayProfesores.forEach(profesor => {
          //console.log("Valor: ", profesor)
          if ( profesor.dni == this.dni )
          {
            resultado = profesor.legajo
          }
        });
        return resultado
      },

      getMyData() {
        let resultado

        this.$store.state.arrayProfesores.forEach(profesor => {
          if ( profesor.dni == this.dni )
          {
            resultado = profesor
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
