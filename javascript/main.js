


Vue.createApp({
  
  data() {
    return {
        productos: [],
        juguetes: [],
        medicamentos:[],
        mostrarSaludo: false,
        carrito: [],
        idDeProductosDeCarrito: [],
        checkBoxesMascotas: [],//creo q no se usa
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
            this.carrito = JSON.parse(localStorage.getItem("carritoDeCompras"))!=null ? JSON.parse(localStorage.getItem("carritoDeCompras")) : []
            
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
      
      this.idDeProductosDeCarrito = this.carrito.map(producto => producto._id)
      if(!this.idDeProductosDeCarrito.includes(producto._id) && producto.stock > 0){
        producto.stock -= 1
        //se agrega una propiedad al objeto que ayudara a dibujar el botn - +
        producto.unidadesAComprar = 1
        this.carrito.push(producto)
        localStorage.setItem("carritoDeCompras", JSON.stringify(this.carrito))
      }
    },
    finalizarCompra(){
      this.carrito.forEach(producto =>{
        producto.stock = producto.stock - (producto.unidadesAComprar -1)
        delete producto.unidadesAComprar
      })
      this.carrito = []
      localStorage.clear()
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

  
  