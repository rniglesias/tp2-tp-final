import Vue from 'vue'


Vue.filter('pasarAmayuscula', function(value) {
    return value.toUpperCase()
})

Vue.filter('formatearFecha', function(value) {
    let dia = value.slice(8, 10)
    let mes = value.slice(5, 7)
    let anio = value.slice(0, 4)
    let hh = value.slice(11, 13)
    let mm = value.slice(14, 16)
    let ss = value.slice(17, 19)

    let fecha = dia + '/' + mes + '/' + anio + ' - ' + hh + ':' + mm + ':' + ss;
    
    return fecha
})