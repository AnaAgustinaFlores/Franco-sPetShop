Vue.createApp({
    data() {
      return {
        articulos:[],

      }
    },
    created(){
        fetch("https://apipetshop.herokuapp.com/api/articulos")
        .then(respuesta => respuesta.json())
        .then(data=> {

            this.articulos = data.response

        })
    },
  }).mount('#app')