import Vue from 'vue'


Vue.filter('pasarAmayuscula', function(value) {
    return value.toUpperCase()
})
