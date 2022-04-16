

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
        count: 0,
        ordenarProductosPorMenorStock: [],
        productosMenosStock: [],
        productoBuscador:"",
        medicamentosFiltrados: [],
        juguetesFiltrados:[]
    }
  },

  created(){
      fetch("https://apipetshop.herokuapp.com/api/articulos")
          .then(response => response.json())
          .then(data => {
            this.productos = data.response
            this.productos.forEach(producto => producto.estadoAgregado = false)
            this.preservarDatosAlRecargar()
            this.juguetes = this.productos.filter(producto => producto.tipo.includes("Juguete"))
            this.medicamentos = this.productos.filter(producto => producto.tipo.includes("Medicamento"))
            this.carrito = JSON.parse(localStorage.getItem("carritoDeCompras"))!=null ? JSON.parse(localStorage.getItem("carritoDeCompras")) : []
            this.ordenarProductosPorMenorStock = this.productos.sort(function(a,b){return a.stock - b.stock})
            for(let i = 0; i < 4; i++){
              this.productosMenosStock[i] = this.ordenarProductosPorMenorStock[i]
            } 
            this.medicamentosFiltrados = this.medicamentos 
            this.juguetesFiltrados = this.juguetes
      })
  },

  methods: {
    preservarDatosAlRecargar(){

      if(JSON.parse(localStorage.getItem("carritoDeCompras")) !=null){
        console.log("entro")
        JSON.parse(localStorage.getItem("carritoDeCompras")).forEach(productoCarrito =>{
          let cont = 0
          while(cont < this.productos.length){
            if(this.productos[cont]._id == productoCarrito._id){
              this.productos[cont].stock = this.productos[cont].stock -1
              this.productos[cont].estadoAgregado = true
              cont = this.productos.length
            }
            cont++
          }
        })
      }
    },
    mostrarCartelito(){
      this.mostrarSaludo = true
    },
    mostrarFormulario(){
      this.mostrarSaludo = false
    },
    aniadirACarrito(producto){
      producto.estadoAgregado = true
      this.idDeProductosDeCarrito = this.carrito.map(producto => producto._id)
      if(!this.idDeProductosDeCarrito.includes(producto._id) && producto.stock > 0){
        producto.stock -= 1
        producto.unidadesAComprar = 1
        this.carrito.push(producto)
        localStorage.setItem("carritoDeCompras", JSON.stringify(this.carrito))
      }
    },
    finalizarCompra(){
      this.carrito.forEach(producto =>{
        let indice = this.obtenerIndiceDeObjetoEnArray(this.productos, producto)
        if(indice != -1){
          this.productos[indice].stock = this.productos[indice].stock - (producto.unidadesAComprar - 1)
          delete this.productos[indice].unidadesAComprar
          //mejor nombre pendiente(la idea es q si el stock del producto es > 0, muestre el boton agregar a carrito)
          this.evaluarEstadoDeAgregarACarrito(this.productos[indice])
        }  
      })
      this.carrito = []
      localStorage.clear()

    },
    evaluarEstadoDeAgregarACarrito(producto){
      if(producto.stock > 0){
        producto.estadoAgregado = false
      }
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
    },
    eliminarDeCarrito(producto){
      let indiceDeProductoEnCarrito = this.obtenerIndiceDeObjetoEnArray(this.carrito, producto)
      let indiceDeProductoEnProductos = this.obtenerIndiceDeObjetoEnArray(this.productos, producto)
      if(indiceDeProductoEnCarrito != -1){
        this.carrito.splice(indiceDeProductoEnCarrito, 1)
        localStorage.setItem("carritoDeCompras", JSON.stringify(this.carrito))
        this.productos[indiceDeProductoEnProductos].stock++
        this.productos[indiceDeProductoEnProductos].estadoAgregado = false
      }
    },
    //retorna -1 si no encontro el objeto dentro del array(lo busca por id), o el indice del objeto dentro del array
    obtenerIndiceDeObjetoEnArray(array, objeto){
      let cont = 0
      let indice = -1
      while(cont < array.length){
        if(array[cont]._id == objeto._id){
          indice = cont
          cont = array.length
        }else{ cont ++ }
      }
      return indice
    },

    buscadorMedicamentos(){
      if (!this.productoBuscador == ""){
        this.medicamentosFiltrados = this.medicamentos.filter(medicamento => medicamento.nombre.toUpperCase().includes(this.productoBuscador.toUpperCase()))
      }else{
        this.medicamentosFiltrados = this.medicamentos       
    }
    },

    buscadorJuguetes(){
      if (!this.productoBuscador == ""){
        this.juguetesFiltrados = this.juguetes.filter(juguete => juguete.nombre.toUpperCase().includes(this.productoBuscador.toUpperCase()))
      }else{
        this.juguetesFiltrados = this.juguetes       
    }
    }
    
  },
  computed:{
    
  },   
}).mount('#app')

  
  
