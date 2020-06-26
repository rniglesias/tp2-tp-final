import crearServidor from '../src/server/app.js'
import crearCliente from './client.js'


async function testAgregarProfesor(cli){

    console.log("arranca el test")

    let dato =   {   
        dni: 9700001,    
        direccion: 'UNACALLE', 
        telefono: '666666',
        email: 'UN@MAIL',
        nombre: 'UNNOMBRE',
        apellido: 'UNAPELLIDO',
        legajo: 878787,
    }
    
    //console.log("dato preparado:", dato)

    //console.log("lanzo el cli.agregarprofesor")
    let rta = await cli.agregarProfesor(dato)
    console.log("\nAgregar Dato Contacto: ")
    console.log(rta)
}

async function testObtenerTodosProfesores(cli){
    let rta = await cli.obtenerTodosProfesores()
    console.log("\nObtener todos los todos los profesores: ")
    console.log(rta)
}

async function testObtenerPorDniProfesor(cli){
    let rta = await cli.obtenerPorDniProfesor(9700001)
    console.log("\nBusqueda por DNI: ")
    console.log(rta)
}

async function testModificarDatosPorDniProfesor(cli){

    let datoNuevo =   {   
        dni: 9700001,    
        direccion: 'UNACALLENUEVA', 
        telefono: '666666',
        email: 'UN@MAILNUEVO',
        nombre: 'UNNOMBRENUEVO',
        apellido: 'UNAPELLIDONUEVO',
        legajo: 878787,
    }

    let rta = await cli.modificarProfesor(datoNuevo, 9700001)
    console.log("\nBusqueda por DNI: ")
    console.log(rta)
}


async function testEliminarProfesor(cli){ 
    console.log("\nEmpezar a eliminar")    
    let rta6 = await cli.eliminarProfesor(878787)
    console.log("\nEliminar un profesor:")    
    console.log(rta6)
}

async function testObtenerCursosDeProfesorPorLegajo(cli){
    let nroLegajo = 1700
    console.log(`\nBuscando cursos del profesor con legajo ${nroLegajo}`)
    let rta = await cli.buscarCursosDeProfesor(nroLegajo)
    console.log(rta)
}


async function main(){  

    const tests = [
        testAgregarProfesor,
        testObtenerTodosProfesores,
        testObtenerPorDniProfesor,
        testModificarDatosPorDniProfesor,
        testObtenerPorDniProfesor,
        testEliminarProfesor,
        testObtenerTodosProfesores,
        testObtenerCursosDeProfesorPorLegajo,
    ]
    

    const app = new crearServidor()
    const url = 'http://localhost'
    const port = 8080
    const server = app.listen(port, async () => {       
         console.log(`Servidor express escuchando en el puerto ${port}`)
         const actualPort = server.address().port
         const cli = crearCliente(url,actualPort)

         for (const test of tests) {
            await test(cli)       
             
         }           

    })
    
}

main()