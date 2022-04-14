Vue.createApp({
    data() {
      return {
          productos: [],
          juguetes: [],
          medicamentos:[],
      }
    },

    created(){
        fetch("https://apipetshop.herokuapp.com/api/articulos")
            .then(response => response.json())
            .then(data => {
                this.productos = data.response
                console.log(this.productos)

                this.juguetes = this.productos.filter(producto => producto.tipo.includes("Juguete"))
                console.log(this.juguetes)

                this.medicamentos = this.productos.filter(producto => producto.tipo.includes("Medicamento"))
                console.log(this.medicamentos)
            })
   


        },

    methods:{
    },

    computed:{

    },
    
}).mount('#app')