<template>

  <section class="src-components-form-agregar-profesor">
    
    

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
          <label for="apellido" class="titulo">Apellido:</label>
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
          <label for="dni" class="titulo">Dni:</label>
          <input
            type="text"
            id="dni"
            class="form-control"
            autocomplete="off"
            name="dni"
            placeholder="Ingrese el DNI"
            v-model.trim="formData.dni"
            required
            :minlength="largoMin"
            :maxlength="largoMax"
          />
          <field-messages name="dni" show="$dirty">
            <div slot="required" class="alert alert-info my-1">Ingrese DNI</div>
            <div
              slot="minlength"
              class="alert alert-danger my-1"
            >La dirección debe tener por lo menos {{ largoMin }} caracteres</div>

            <div
              v-if="formData.dni.length == largoMax"
              class="alert alert-danger my-1"
            >No debe superar los {{ largoMax }} caracteres</div>
          </field-messages>
        </validate>
        <br />

        <validate tag="div" class="titulo">
          <label for="legajo" class="titulo">Legajo:</label>
          <input
            type="text"
            id="leajo"
            class="form-control"
            autocomplete="off"
            name="legajo"
            placeholder="Ingrese el Legajo"
            v-model.trim="formData.legajo"
            required
            :minlength="largoMin"
            :maxlength="largoMax"
          />
          <field-messages name="dni" show="$dirty">
            <div slot="required" class="alert alert-info my-1">Ingrese Legajo</div>
            <div
              slot="minlength"
              class="alert alert-danger my-1"
            >La dirección debe tener por lo menos {{ largoMin }} caracteres</div>

            <div
              v-if="formData.legajo.length == largoMax"
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
      

      

  </section>

</template>

<script lang="js">


  export default  {
    name: 'src-components-form-agregar-profesor',
    props: [],
    mounted () {
      
    },
    data () {
      return {
          formState : {},
          formData : this.getInitialData(),
          enviando: false,
          enviado: false,
          etiquetaBoton: 'Enviar',
          largoMax: 50,
          largoMin: 6,
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
            email: '',
          }
      },

      enviar() {
        this.enviando = true

        this.axios.post(this.$store.state.urlBackend + '/api/profesor/',{
            
            nombre:this.formData.nombre,
            apellido:this.formData.apellido,
            direccion:this.formData.direccion,
            legajo:this.formData.legajo,
            dni:this.formData.dni,
            telefono:this.formData.telefono,
            email:this.formData.email
        })
        .then((result) => {
        console.log(result)
        })
          this.enviando = false   
        
      }

    },
    computed: {
      getUltimaFechaEnvio() {
        return this.fechaUltimoEnvio
      }

    }
}


</script>

<style scoped lang="css">
 
</style>
