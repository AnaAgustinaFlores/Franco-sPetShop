Vue.createApp({
  data(){
    return{
      elementos: []
    }
  },
  created(){
    let urlApi = "https://apipetshop.herokuapp.com/api/articulos"
    fetch(urlApi)
      .then(response => response.json())
      .then(data => {
        this.elementos = data.response
        this.elementos.forEach(elemento => console.log(elemento.tipo == "Juguete" ? elemento.nombre : ""))
        
      })
  },
  methods: {
    
  }
}).mount('#app')