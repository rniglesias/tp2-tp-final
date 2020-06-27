import ProfesorDao from './ProfesorDao.js'
import DbClientFactory from '../db/DbClientFactory.js'


class ProfesorDaoDb extends ProfesorDao {

    constructor(){
        super()
        this.db = DbClientFactory.getDbClient()
        
    }

    async insertarProfesor(datoscontacto) {
        let resultadoCargaDatos
        let resultadoCargaEmpleado
        let resultadoCargaLegajo
        let resultado
    
        

        // Para que tome la estructura de datos que necesita la tabla datos de contacto, me sobra el legajo
        const datosProfe = {
            dni: datoscontacto.dni,
            nombre: datoscontacto.nombre,
            apellido: datoscontacto.apellido,
            direccion: datoscontacto.direccion,
            telefono: datoscontacto.telefono,
            email: datoscontacto.email
        }
        
    
        try {
            resultadoCargaDatos = await this.db.client.insert(datosProfe).into('Datoscontacto')
            resultadoCargaEmpleado = await this.db.client.insert({'dni':datoscontacto.dni, 'legajo':datoscontacto.legajo,'tipoempleado':'Profesor'}).into('empleados')
            resultadoCargaLegajo = await this.db.client.insert({'dni':datoscontacto.dni, 'legajo':datoscontacto.legajo}).into('empleadoslegajos')
        }
        catch(error) {
        
            resultado = {
                "error": 400,
                "msg": "Error en la carga"
            }
            return resultado
        
        }
        
        return resultadoCargaDatos
    }

    async leerTodosProfesor() {  
        let listaProfes = []  
        try {  
           listaProfes = await this.db.client.select().from('empleados')
           .innerJoin('empleadoslegajos', 'empleadoslegajos.legajo', 'empleados.legajo')
           .innerJoin('datoscontacto', 'datoscontacto.dni', 'empleadoslegajos.dni')
           .where('empleados.tipoempleado', '=' , 'Profesor')
               if(listaProfes.length == 0){
                   resultado = {
                       "error": 400,
                       "msg": "No hay profesores cargados"
                   }
           }
    
        }
        catch(error) {
            resultado = {
                "error": 400,
                "msg": error
            }
            return resultado
        }
        return listaProfes
    }   

    async buscarPorDniProfesor(nroDni) { 

        // Cambiarlo a por legajo
        
        let resultado = null
        try {
            resultado = await this.db.client.select().from('datoscontacto')
            .innerJoin('empleados', 'datoscontacto.dni', 'empleados.dni')
            .where('datoscontacto.dni', '=' , nroDni)
            .andWhere('empleados.tipoempleado','=','Profesor')
            if(resultado.length == 0){
                resultado = {
                    "error": 400,
                    "msg": "DNI no encontrado"
                }
                return resultado
            }
        }
        catch(error) {
            resultado = {
                "error": 400,
                "msg": error
            }
            return resultado
        }
        return resultado
    }  

    async eliminarProfesor(legajo){

        let resultadoDatosPersonales
        let resultadoEmpleadosLegajos
        let resultadoEmpleados
        let resultadoProfesoresCursos
        let dni = 0
        let resultado
        
        
        try{
    
            // Voy a necesitar saber el dni del profesor para mas adelante....
            // console.log("voy a buscar primero a ver si esta este legajo: (",legajo,"), asi le asocio el dni")
            
            let busquedaDNI = await this.db.client.select()
            .from('empleadoslegajos')
            .where('empleadoslegajos.legajo', '=', legajo)
            .asCallback((err,rows) => {
                if (err) console.log("Ese legajo no esta en la lista de empleados")
            })


            if (busquedaDNI.length) {
                dni = (JSON.parse(JSON.stringify(busquedaDNI)))[0].dni
                // Hago el delete de las 4 tablas
                
                resultadoEmpleadosLegajos = await this.db.client.delete()
                .from('empleadoslegajos')
                .where('empleadoslegajos.legajo', '=', legajo)

                resultadoProfesoresCursos = await this.db.client.delete()
                .from('profesorescursos')
                .where('profesorescursos.legajo','=',legajo)

                resultadoEmpleados = await this.db.client.delete()
                .from('empleados')
                .where('empleados.legajo', '=', legajo)

                resultadoDatosPersonales = await this.db.client.delete()
                .from('datoscontacto')
                .where('datoscontacto.dni', '=', dni)
            }
        
        } catch(error){
            resultado = {
                "error": 400,
                "msg": error
            }
            return resultado
        }
        if (dni != 0) 
        {
            return resultadoDatosPersonales
        } else {
            resultado = {
                "error": 400,
                "msg": "No se encuentra el empleado"
            }
            return resultado
        }
    }

    async modificarProfesor(DatoscontactoNuevo) {
    
        // Corregir y hacer por legajo mejor?  Porque así como está solo modifica los datos de contacto
    
        // Para que tome la estructura de datos que necesita la tabla datos de contacto, me sobra el legajo
        const datosProfe = {
            dni: DatoscontactoNuevo.dni,
            nombre: DatoscontactoNuevo.nombre,
            apellido: DatoscontactoNuevo.apellido,
            direccion: DatoscontactoNuevo.direccion,
            telefono: DatoscontactoNuevo.telefono,
            email: DatoscontactoNuevo.email
        }
        
        let resultado
        try{
            resultado = await this.db.client.update(datosProfe)
            .where('dni','=',DatoscontactoNuevo.dni)
            .from('Datoscontacto')
        }catch(error){
            resultado = {
                "error": 400,
                "msg": error
            }
            return resultado
        }
        return resultado
    }

    async buscarCursosDeProfesor(nroLegajo) { 
    
        let resultado = null
        try {
            resultado = await this.db.client.select('NombreCurso').from('Empleados').innerJoin('ProfesoresCursos', 'ProfesoresCursos.legajo', 'Empleados.legajo' )
            .innerJoin('Curso', 'Curso.idCurso', 'ProfesoresCursos.idCurso').where('ProfesoresCursos.legajo', nroLegajo)
    
            if(resultado.length == 0){
                resultado = {
                    "error": 400,
                    "msg": "El profesor no tiene cursos activos"
                }
            }
        }
        catch(error) {
            resultado = {
                "error": 400,
                "msg": error
            }
            return resultado
        }
    
        return resultado
    }   

    async asignarCursoAProfesor(idcurso,legajo)
    {
        // Verificar que el profesor exista
        let buscarProfe
        let resultado

        
        try {
            buscarProfe =  await this.db.client.select().from('empleados')
            .where('empleados.legajo', '=' , legajo)
                    
            if ( buscarProfe.length) {
                
                // El profesor existe, debo cargar el curso
                // Actualizo la tabla Profesores/Cursos
                try {
                    resultado = await this.db.client.insert({'legajo':legajo, 'idcurso':idcurso})
                    .into('profesorescursos')

                } catch (error) {
                    resultado = {
                        "error": 400,
                        "msg": error
                    }
                    return resultado
                }

            } else {
                // El profesor no existe, debo devolver un error
                resultado = {
                    "error": 400,
                    "msg": "El profesor no existe"
                }
                return resultado
            }

        } catch (error) {
            resultado = {
                "error": 400,
                "msg": error
            }
            return resultado
        }
    
        return resultado

    }

    async eliminarCursoDeProfesor(idcurso, legajo)
    {
        let resultado

        try {
            resultado = await this.db.client.delete()
            .from('profesorescursos')
            .where('profesorescursos.legajo', '=', legajo)
            .andWhere('profesorescursos.idcurso', '=', idcurso)
        } catch (error) {
            resultado = {
                "error": 400,
                "msg": "No puedo eliminar el profesor, recibo error: " + error
            }
            return resultado
        }

        return resultado
    }


}

export default ProfesorDaoDb