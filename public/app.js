document.addEventListener('alpine:init', () => {
    Alpine.data('garmentData', () => ({

        garments : [],

        gender:'',
        season:'',
        price:'',

        data(){
            axios
                .get('/api/garments')
                .then(r => 
                    {this.garments = r.data.data })

        },

        filter(){
            axios
                .get(`/api/garments?gender=${this.gender}&season=${this.season}`)
                .then(r =>
                    {this.garments = r.data.data });

        },


        filterPrice(){
            if (this.price > 0) {
                return this.garment.price <= this.price;
            }
            axios.get(`/api/garments/price/${this.price}`)
            .then(r =>
                {this.garments = r.data.data})
        },

        addGarment(){
            axios
            .post('/api/garment/')
            .then( 
                {})
        },

    }))

})