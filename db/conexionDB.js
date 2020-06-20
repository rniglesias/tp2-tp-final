import knexLib from 'knex'

const knex = knexLib({
    client: 'mysql',
    connection: {
        host:'127.0.0.1',
        user:'root',
        password: '',
        database: 'instituto'
/*         database: 'pruebapanecillo' */
    }
})

//------------------------ABM ALUMNO--------------------------//

async function insertarAlumno(datoscontacto) {
    let resultado
    let resultado2
    try {
        resultado = await knex.insert(datoscontacto).into('datoscontacto')//.and.insert({'dni':datoscontacto.dni}).into('estudiante')
        //console.log('INSERTANDO DATO CONTACTO')
        //console.log(datoscontacto)
        //console.log({'dni':datoscontacto.dni})
        resultado2 = await knex.insert({'dni':datoscontacto.dni}).into('estudiante')
        
    }
    catch(error) {
        console.log(error)
    }
    return resultado
}

async function leerTodosAlumno() {  
    let listaEstu = []  
    try {  
        listaEstu = await knex.select().from('datoscontacto').innerJoin('estudiante', 'datoscontacto.dni', 'estudiante.dni') 
    }
    catch(error) {
        console.log(error)
    }
    return listaEstu
}   

async function buscarPorDniAlumno(nroDni) { 
    
    let resultado = null
    try {
        resultado = await knex.select().from('datoscontacto').innerJoin('estudiante', 'datoscontacto.dni', 'estudiante.dni').where('datoscontacto.dni', '=' , nroDni)
        if(resultado.length == 0){
            resultado = {
                "error": 400,
                "msg": "DNI no encontrado"
            }
        }
    }
    catch(error) {
        console.log(error)
    }
    return resultado
}   

async function eliminarAlumno(dni){
    
    let resultado
    let resultado2
    try{
        resultado2 = await knex.delete().from('estudiante').where('estudiante.dni','=',dni)
        resultado = await knex.delete().from('datoscontacto').where('datoscontacto.dni','=',dni) 
    }catch(error){
        
        console.log(error)
    }
    return resultado2
}

async function modificarAlumno(dni,DatoscontactoNuevo){
    let resultado
    //let resultado2
    try{
        resultado = await knex.update(DatoscontactoNuevo).where('dni','=',dni).from('Datoscontacto')
        //resultado2 = await knex.update(DatoscontactoNuevo).where('dni','=',dni).from('Estudiante')
    }catch(error){
        console.log(error)
    }
    return resultado
}



//------------------------ABM PROFESORES--------------------------//

async function insertarProfesor(datoscontacto) {
    let resultadoCargaDatos
    let resultadoCargaEmpleado
    let resultadoCargaLegajo

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
        resultadoCargaDatos = await knex.insert(datosProfe).into('datoscontacto')
        resultadoCargaEmpleado = await knex.insert({'dni':datoscontacto.dni, 'legajo':datoscontacto.legajo,'tipoempleado':'Profesor'}).into('empleados')
        resultadoCargaLegajo = await knex.insert({'dni':datoscontacto.dni, 'legajo':datoscontacto.legajo}).into('empleadoslegajos')
    }
    catch(error) {
        console.log("Error cargando el profesor: ", error)
    }
    return resultadoCargaDatos
}

async function leerTodosProfesor() {  
    let listaProfes = []  
    try {  
        /*
        listaProfes = await knex.select().from('empleados')
        .where('tipoempleado','=','Profesor')
        */

        listaProfes = await knex.select().from('empleados')
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
        console.log("Error listando profesores: ", error)
    }
    return listaProfes
}   

async function buscarPorDniProfesor(nroDni) { 

    // Cambiarlo a por legajo
    
    let resultado = null
    try {
        resultado = await knex.select().from('datoscontacto')
        .innerJoin('empleados', 'datoscontacto.dni', 'empleados.dni')
        .where('datoscontacto.dni', '=' , nroDni)
        .andWhere('empleados.tipoempleado','=','Profesor')
        if(resultado.length == 0){
            resultado = {
                "error": 400,
                "msg": "DNI no encontrado"
            }
        }
    }
    catch(error) {
        console.log(error)
    }
    return resultado
}   

async function eliminarProfesor(legajo){

    let resultadoDatosPersonales
    let resultadoEmpleadosLegajos
    let resultadoEmpleados
    let resultadoProfesoresCursos
    let dni = 0
    
    
    try{

        // Voy a necesitar saber el dni del profesor para mas adelante....
        
        //console.log("voy a buscar primero a ver si esta este legajo: (",legajo,"), asi le asocio el dni")
        
        await knex.select()
        .from('empleadoslegajos')
        .where('empleadoslegajos.legajo', '=', legajo)
        .asCallback((err,rows) => {
            if (err) console.log("Ese legajo no esta en la lista de empleados")
            //console.log(rows)
            //console.log("Encontre el DNI: ", (JSON.parse(JSON.stringify(rows)))[0].dni )
            dni = (JSON.parse(JSON.stringify(rows)))[0].dni
            //console.log("Confirmo dni: " , dni)
        })

        
        
        resultadoEmpleadosLegajos = await knex.delete()
        .from('empleadoslegajos')
        .where('empleadoslegajos.legajo', '=', legajo)

        resultadoProfesoresCursos = await knex.delete()
        .from('profesorescursos')
        .where('profesorescursos.legajo','=',legajo)

        resultadoEmpleados = await knex.delete()
        .from('empleados')
        .where('empleados.legajo', '=', legajo)

        resultadoDatosPersonales = await knex.delete()
        .from('datoscontacto')
        .where('datoscontacto.dni', '=', dni)


        
        
    }catch(error){
        
        console.log(error)
    }
    return resultadoDatosPersonales
}

async function modificarProfesor(DatoscontactoNuevo) {
    
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
        resultado = await knex.update(datosProfe)
        .where('dni','=',DatoscontactoNuevo.dni)
        .from('Datoscontacto')
    }catch(error){
        console.log(error)
    }
    return resultado
}

//------------------------PROFESOR--------------------------//

async function buscarCursosDeProfesor(nroLegajo) { 
    
    let resultado = null
    try {
        resultado = await knex.select('NombreCurso').from('Empleados').innerJoin('ProfesoresCursos', 'ProfesoresCursos.legajo', 'Empleados.legajo' )
        .innerJoin('Curso', 'Curso.idCurso', 'ProfesoresCursos.idCurso').where('ProfesoresCursos.legajo', nroLegajo)

        if(resultado.length == 0){
            resultado = {
                "error": 400,
                "msg": "El profesor no tiene cursos activos"
            }
        }
    }
    catch(error) {
        console.log(error)
    }

    return resultado
}   

//------------------------ESTUDIANTE--------------------------//

async function obtenerDatosCursoPorAlumno(dni) { 
    
    let resultado = null
    try {
        resultado = await knex.select().from('Curso').innerJoin('Estudiante', 'Curso.idCurso', 'EStudiante.idCurso' ).where('Estudiante.dni', dni)

        if(resultado.length == 0){
            resultado = {
                "error": 400,
                "msg": "El estudiante no está inscripto en ningún curso"
            }
        }
    }
    catch(error) {
        console.log(error)
    }

    return resultado
}   

export default{
    insertarAlumno,
    leerTodosAlumno,
    buscarPorDniAlumno,
    eliminarAlumno,
    modificarAlumno,
    insertarProfesor,
    leerTodosProfesor,
    buscarPorDniProfesor,
    eliminarProfesor,
    modificarProfesor,
    buscarCursosDeProfesor,
    obtenerDatosCursoPorAlumno,
}



 



