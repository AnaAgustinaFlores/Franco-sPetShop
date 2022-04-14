Vue.createApp({
  data(){
    return{
      productos: [],
      mostrarSaludo: false,
      juguetes: [],
      carrito: [],
      checkBoxesMascotas: [],
      mostrarCarrito: false
    }
  },
  created(){
    let urlApi = "https://apipetshop.herokuapp.com/api/articulos"
    fetch(urlApi)
      .then(response => response.json())
      .then(data => {
        this.productos = data.response
        this.juguetes = this.productos.filter(producto => producto.tipo == "Juguete")
        //this.productos.forEach(elemento => console.log(elemento.tipo == "Juguete" ? elemento.nombre : ""))
        
      })
  },
  methods: {
    mostrarCartelito(){
      this.mostrarSaludo = true
    },
    mostrarFormulario(){
      this.mostrarSaludo = false
    },
    mostrarCarritoDeCompras(){
      this.mostrarCarrito = true
    },
    seguirComprando(){
      this.mostrarCarrito = false
    },
    aniadirACarrito(producto){
      
      if(!this.carrito.includes(producto)){
        this.carrito.push(producto)
      }
    }
  }
}).mount('#app')

