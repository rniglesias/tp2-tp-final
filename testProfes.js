/* eslint-disable no-console */
import Cliente from './client.js'
//import Servidor from './servidor.js'
import Servidor from './app.js'
import DbClientFactory from "./db/DbClientFactory.js"

import { validarProfesor, validarProfesores,  } from './validaciones/profesores.js'


async function testObtenerTodosProfesores(cli){
    let rta = await cli.obtenerTodosProfesores()
    console.log("\nObtener todos los todos los profesores: ")
    console.log(rta)
}


async function testGetAll(cli) {
    
    await cli.obtenerTodosProfesores()

}



async function main() {

    const tests = [
        testGetAll,
    ]

    const ipServidor = 'http://127.0.0.1'
    
    const app = new Servidor()
    
    
    app.setOnReady(async (actualPort) => {
        const cli = new Cliente(ipServidor, actualPort)
        
        let done = 0
        let passed = 0
        let errors = 0

        console.log('running tests...\n')

        for (const test of tests) {
            const { testFailed, msg } = await test(cli, actualPort)
            if (testFailed) {
                errors++
                console.log(msg)
            } else {
                passed++
            }
            done++
        }
        console.log(`\ndone: ${done}`)
        console.log(`passed: ${passed}`)
        console.log(`errors: ${errors}`)

        await app.disconnect()
        process.exit(0)
    })

    app.start(8080)
}

//////////////////////////////////////////////////////////////

process.stdin.resume();//so the program will not close instantly

//do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));

async function exitHandler(options, exitCode) {

    if (options.cleanup) {
        await DbClientFactory.getDbClient().disconnect()
        console.log('\nprograma finalizado normalmente')
    }
    if (exitCode || exitCode === 0) {
        console.log(`\nprograma finalizado con codigo: ${exitCode}`)
    }
    if (options.exit) {
        process.exit()
    }
}

/////////////////////////////////////////////////////////////////

main()