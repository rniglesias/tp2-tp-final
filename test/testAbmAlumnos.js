/* import crearServidor from '../src/server/app.js'
import crearCliente from './client.js' */
import Cliente from './clientAlumnos.js'
import Servidor from '../src/server/app.js'
import DbClientFactory from "../src/server/db/DbClientFactory.js"

async function testAgregarAlumno(cli){

    let dato =   {   
        dni: 30000001,    
        direccion: 'Rivadavia 1234', 
        telefono: '1152523434',
        email: 'carlos@mail.com',
        nombre: 'Carlos',
        apellido: 'Gomez',
        
    }
    let rta = await cli.agregarAlumno(dato)
    console.log("\nAgregar Alumno: ")
    console.log(rta)

/*     let dato2 =   {   
        dni: 31000002,    
        direccion: 'Diaz Velez 1234', 
        telefono: '1152223434',
        email: 'carlos@mail.com',
        nombre: 'Juan',
        apellido: 'Castro',
        
    }
    let rta2 = await cli.agregarAlumno(dato2)
    console.log("\nAgregar Alumno: ")
    console.log(rta2)

    let dato3 =   {   
        dni: 31000003,    
        direccion: 'Carabobo 1234', 
        telefono: '1151113434',
        email: 'carlos@mail.com',
        nombre: 'Raul',
        apellido: 'Garcia',
        
    }
    let rta3 = await cli.agregarAlumno(dato3)
    console.log("\nAgregar Alumno: ")
    console.log(rta3)

    let dato4 =   {   
        dni: 31000125,    
        direccion: 'Caracas 1234', 
        telefono: '1151444434',
        email: 'jlian@mail.com',
        nombre: 'Julian',
        apellido: 'Garcia',
        
    }
    let rta4 = await cli.agregarAlumno(dato4)
    console.log("\nAgregar Alumno: ")
    console.log(rta4) */



}

async function testObtenerTodosAlumno(cli){
    let rta = await cli.obtenerTodosAlumno()
    console.log("\nObtener todos los estudiantes: ")
    console.log(rta)
}

async function testObtenerPorDniAlumno(cli){
    let rta = await cli.obtenerPorDniAlumno(30307686)
    console.log("\nBusqueda por DNI: ")
    console.log(rta)
}


async function testEliminarAlumno(cli){ 
    console.log("\nEmpezar a eliminar")    
    let rta6 = await cli.eliminarAlumno(30000001)
    console.log("\nEliminar un estudiante:")    
    console.log(rta6)
}

async function testObtenerDatosCursoPorAlumno(cli){
    let dni = 29004601
    console.log(`\nBuscando datos del curso de estudiante con dni ${dni}`)
    let rta = await cli.obtenerDatosCursoPorAlumno(dni)
    console.log(rta)
}

async function main(){  

    const tests = [
        testAgregarAlumno,
        testObtenerTodosAlumno,
        testObtenerPorDniAlumno,
        testEliminarAlumno,
        testObtenerDatosCursoPorAlumno,
    ]
    

/*     const app = new crearServidor()
    const url = 'http://localhost'
    const PORT = 8080
    const server = app.listen(PORT, async () => {       
         console.log(`Servidor express escuchando en el puerto ${PORT}`)
         const actualPort = server.address().port
         const cli = crearCliente(url,actualPort)

         for (const test of tests) {
            await test(cli)       
             
         }           

    }) */

    const ipServidor = 'http://127.0.0.1'
    
    const app = new Servidor()
    
    
    app.setOnReady(async (actualPort) => {
        const cli = new Cliente(ipServidor, actualPort)
        let done = 0
        let passed = 0
        let errors = 0
        let error = false

        console.log('running tests...\n')
//-------------------------------------cambie aca------------------------------//
        for (const test of tests) {
            error = await test(cli)       
            if (error) {
                errors ++
            } else {
                passed ++
            }
            done ++
         }
//-------------------------------------------------------------------//         
        console.log(`\ndone: ${done}`)
        console.log(`passed: ${passed}`)
        console.log(`errors: ${errors}`)

        await app.disconnect()
        process.exit(0)
    })

    app.start(8080)
    
}

main()