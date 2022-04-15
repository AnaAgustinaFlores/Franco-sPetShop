

Vue.createApp({
  
  data() {
    return {
        productos: [],
        juguetes: [],
        medicamentos:[],
        mostrarSaludo: false,
        carrito: [],
        checkBoxesMascotas: [],
        valor: 1,
        count: 0

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
    aniadirACarrito(producto){
      if(!this.carrito.includes(producto) && producto.stock > 0){
        producto.stock -= 1
        //se agrega una propiedad al objeto que ayudara a dibujar el botn - +
        producto.unidadesAComprar = 1
        this.carrito.push(producto)
      }
    },
    finalizarCompra(){
      this.carrito.forEach(producto =>{
        producto.stock = producto.stock - (producto.unidadesAComprar -1)
        delete producto.unidadesAComprar
      })
      this.carrito = []
    },
    aumentarUnidadesAComprar(producto){
      if((producto.stock - producto.unidadesAComprar)>-1){
        producto.unidadesAComprar++
      }
    },
    disminuirUnidadesAComprar(producto){
      if(producto.unidadesAComprar > 0){
        producto.unidadesAComprar--
      }
    },
    calcularSubtotal(producto){
      return producto.precio * producto.unidadesAComprar
    },
    obtenerPrecioTotal(){
      let precioTotal = 0
      this.carrito.forEach(producto => precioTotal += this.calcularSubtotal(producto))
      return precioTotal
    }

  },
  computed:{

  },   
}).mount('#app')

  