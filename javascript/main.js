Vue.createApp({
    data() {
      return {
          productos: [],
          juguetes: [],
          medicamentos:[],
          mostrarSaludo: false,
          carrito: [],
          checkBoxesMascotas: [],
          mostrarCarrito: false,
          producOrdenadosMenosStock: [],
          producMenosStock: [],
      }
    },

    created(){
        fetch("https://apipetshop.herokuapp.com/api/articulos")
            .then(response => response.json())
            .then(data => {
                this.productos = data.response
                console.log(this.productos)

                this.juguetes = this.productos.filter(producto => producto.tipo.includes("Juguete"))

                this.medicamentos = this.productos.filter(producto => producto.tipo.includes("Medicamento"))

                this.producOrdenadosMenosStock = this.productos.sort(function(a,b){return a.stock - b.stock})

                for(let i = 0; i < 4; i++){
                  this.producMenosStock[i] = this.producOrdenadosMenosStock[i]
                }

                console.log(this.productosCardsHome)
                
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
    },

    descontarStock(producto){
      producto.stock = producto.stock - 1
    }
  },
    computed:{

    },
    
}).mount('#app')

  