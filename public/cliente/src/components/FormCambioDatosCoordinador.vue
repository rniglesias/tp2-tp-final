<template>

  <section class="src-components-form-cambio-datos-coordinador">
    
    Si necesitas actualizar tus datos personales, completá el siguiente formulario y envia el pedido
    para que sea procesado.  Podes cambiar todos tus datos personales con la excepción 
    de tu DNI ({{this.dni}}) y tu número de legajo ({{this.legajo}})

    <br>
    <br>


    <vue-form :state="formState" @submit.prevent="enviar()">
        <validate tag="div" class="titulo">
          <label for="nombre" class="titulo">Nombre:</label>
          <input
            type="text"
            id="nombre"
            class="form-control"
            autocomplete="off"
            name="nombre"
            placeholder="Ingrese el Nombre"
            v-model.trim="formData.nombre"
            required
            :minlength="largoMin"
            :maxlength="largoMax"
          />
          <field-messages name="nombre" show="$dirty">
            <div slot="required" class="alert alert-info my-1">Ingrese Nombre</div>
            <div
              slot="minlength"
              class="alert alert-danger my-1"
            >El nombre debe tener por lo menos {{ largoMin }} caracteres</div>

            <div
              v-if="formData.nombre.length == largoMax"
              class="alert alert-danger my-1"
            >No debe superar los {{ largoMax }} caracteres</div>
          </field-messages>
        </validate>
        <br />


        <validate tag="div" class="titulo">
          <label for="apellido" class="titulo">Nombre:</label>
          <input
            type="text"
            id="apellido"
            class="form-control"
            autocomplete="off"
            name="apellido"
            placeholder="Ingrese el Apellido"
            v-model.trim="formData.apellido"
            required
            :minlength="largoMin"
            :maxlength="largoMax"
          />
          <field-messages name="apellido" show="$dirty">
            <div slot="required" class="alert alert-info my-1">Ingrese Apellido</div>
            <div
              slot="minlength"
              class="alert alert-danger my-1"
            >El Apellido debe tener por lo menos {{ largoMin }} caracteres</div>

            <div
              v-if="formData.apellido.length == largoMax"
              class="alert alert-danger my-1"
            >No debe superar los {{ largoMax }} caracteres</div>
          </field-messages>
        </validate>
        <br />


        <validate tag="div" class="titulo">
          <label for="direccion" class="titulo">Direccion:</label>
          <input
            type="text"
            id="direccion"
            class="form-control"
            autocomplete="off"
            name="direccion"
            placeholder="Ingrese la Dirección"
            v-model.trim="formData.direccion"
            required
            :minlength="largoMin"
            :maxlength="largoMax"
          />
          <field-messages name="direccion" show="$dirty">
            <div slot="required" class="alert alert-info my-1">Ingrese Direccion</div>
            <div
              slot="minlength"
              class="alert alert-danger my-1"
            >La dirección debe tener por lo menos {{ largoMin }} caracteres</div>

            <div
              v-if="formData.direccion.length == largoMax"
              class="alert alert-danger my-1"
            >No debe superar los {{ largoMax }} caracteres</div>
          </field-messages>
        </validate>
        <br />


        <validate tag="div" class="titulo">
          <label for="email" class="titulo">Email:</label>
          <input
            type="text"
            id="email"
            class="form-control"
            autocomplete="off"
            name="email"
            placeholder="Ingrese Email"
            v-model.trim="formData.email"
            required
            :minlength="largoMin"
            :maxlength="largoMax"
          />
          <field-messages name="email" show="$dirty">
            <div slot="required" class="alert alert-info my-1">Ingrese Email</div>
            <div
              slot="minlength"
              class="alert alert-danger my-1"
            >El mail debe tener por lo menos {{ largoMin }} caracteres</div>

            <div
              v-if="formData.email.length == largoMax"
              class="alert alert-danger my-1"
            >No debe superar los {{ largoMax }} caracteres</div>
          </field-messages>
        </validate>
        <br />

        <validate tag="div" class="titulo">
          <label for="telefono" class="titulo">Telefono:</label>
          <input
            type="number"
            id="telefono"
            class="form-control"
            autocomplete="off"
            name="telefono"
            placeholder="Ingrese Telefono"
            v-model.trim="formData.telefono"
            required
          />
          <field-messages name="telefono" show="$dirty">
            <div slot="required" class="alert alert-info my-1">Ingrese Telefono</div>
          </field-messages>
        </validate>
        <br />

        <br />


        <!-- <button class="btn btn-success my-4" :disabled="enviando" type="submit">Enviar</button> -->
        <button class="btn btn-success my-4" :disabled="formState.$invalid" type="submit">{{ this.etiquetaBoton }}</button>
      </vue-form>
      <hr>

      

  </section>

</template>

<script lang="js">

  

  export default  {
    name: 'src-components-form-cambio-datos-coordinador',
    props: ['dni','legajo'],
    mounted () {
      // Cargo en segundo plano los datos que voy a necesitar
      this.recargarFormulario()
    },
    data () {
      return {
          formState : {},
          formData : this.getInitialData(),
          enviando: false,
          enviado: false,
          etiquetaBoton: 'Enviar',
          largoMax: 50,
          largoMin: 2
      }
    },
    methods: {
      getInitialData() {
          
          return {
            nombre: '',
            apellido: '',
            legajo:  '',
            dni: '',
            direccion: '',
            telefono: '',
            email: ''

          }
      },

      recargarFormulario() {
        
          let stringConsulta = '/api/coordinador/?dni=' + this.dni
          this.axios(this.$store.state.urlBackend + stringConsulta)
              .then(rta => {
                  this.formData = 
                  {
                    dni:this.dni,
                    legajo:this.legajo,
                    nombre:rta.data[0].nombre,
                    apellido:rta.data[0].apellido,
                    direccion:rta.data[0].direccion,
                    telefono:rta.data[0].telefono,
                    email:rta.data[0].email,
                  }
                  
                  
              })
              .catch(console.log)
      },

      enviar() {
        /*this.enviando = true

        this.formDataEnvio = {
            nombre:this.formData.nombre,
            apellido:this.formData.apellido,
            direccion:this.formData.direccion,
            legajo:this.formData.legajo,
            dni:this.formData.dni,
            telefono:this.formData.telefono,
            email:this.formData.email
        }
        this.axios.put(this.$store.state.urlBackend + '/api/coordinador/')
        .then(this.formDataEnvio)
        .catch(e => {
            console.log(e)
            this.etiquetaBoton = 'Error de envío, reintentar'
            this.enviando = false
            this.recargarFormulario()
        })*/
      this.enviando = true
      let formDataEnvio = {
            nombre:this.formData.nombre,
            apellido:this.formData.apellido,
            direccion:this.formData.direccion,
            legajo:this.formData.legajo,
            dni:this.formData.dni,
            telefono:this.formData.telefono,
            email:this.formData.email
        };
  this.axios.put((this.$store.state.urlBackend + '/api/coordinador/'), formDataEnvio).then((result) => {
    console.log(result);
  });

      }

    },
    computed: {
      

    }
}


</script>

<style scoped lang="css">
  
</style>
