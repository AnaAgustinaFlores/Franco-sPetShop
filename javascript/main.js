Vue.createApp({
  data() {
    return {
        productos: [],
        juguetes: [],
        medicamentos:[],
        mostrarSaludo: false,
        carrito: [],
        checkBoxesMascotas: [],
        mostrarCarrito: false
    }
  },

  created(){
      fetch("https://apipetshop.herokuapp.com/api/articulos")
          .then(response => response.json())
          .then(data => {
            this.productos = data.response
            this.juguetes = this.productos.filter(producto => producto.tipo.includes("Juguete"))
            this.medicamentos = this.productos.filter(producto => producto.tipo.includes("Medicamento"))
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
      if(!this.carrito.includes(producto) && producto.stock > 0){
        console.log(producto.stock)
        producto.stock -= 1
        this.carrito.push(producto)
        console.log(producto.stock)
        console.log("--------")
      }
    },
    finalizarCompra(){
      
      this.carrito = []
      //mover esto al boton de cerrar del modal
      this.mostrarCarrito = false

    }
  },
  computed:{

  },   
}).mount('#app')

  