import crearServidor from './servidor.js'
import crearCliente from './client.js'


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
    console.log("\nAgregar Dato Contacto: ")
    console.log(rta)

    let dato2 =   {   
        dni: 31000002,    
        direccion: 'Diaz Velez 1234', 
        telefono: '1152223434',
        email: 'carlos@mail.com',
        nombre: 'Juan',
        apellido: 'Castro',
        
    }
    let rta2 = await cli.agregarAlumno(dato2)
    console.log("\nAgregar Dato Contacto: ")
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
    console.log("\nAgregar Dato Contacto: ")
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
    console.log("\nAgregar Dato Contacto: ")
    console.log(rta4)



}

async function testObtenerTodosAlumno(cli){
    let rta = await cli.obtenerTodosAlumno()
    console.log("\nObtener todos los estudiantes: ")
    console.log(rta)
}

async function testObtenerPorDniAlumno(cli){
    let rta = await cli.obtenerPorDniAlumno(30000114)
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
    

    const app = crearServidor()
    const url = 'http://localhost'
    const PORT = 8080
    const server = app.listen(PORT, async () => {       
         console.log(`Servidor express escuchando en el puerto ${PORT}`)
         const actualPort = server.address().port
         const cli = crearCliente(url,actualPort)

         for (const test of tests) {
            await test(cli)       
             
         }           

    })
    
}

main()