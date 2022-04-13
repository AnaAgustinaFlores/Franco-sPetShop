Vue.createApp({
    data() {
      return {
          productos: [],
      }
    },

    created(){
        fetch("https://apipetshop.herokuapp.com/api/articulos")
            .then(response => response.json())
            .then(data => {
                this.productos = data.response
                console.log(this.productos)
            })
   


        },


    methods:{

    },

    computed:{

    },
    
})