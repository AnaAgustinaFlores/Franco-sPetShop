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
              console.log(this.productos)

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
      
      if(!this.carrito.includes(producto)){
        this.carrito.push(producto)
      }
    }
  },
    computed:{

    },
    
}).mount('#app')

  
