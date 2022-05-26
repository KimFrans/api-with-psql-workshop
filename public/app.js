document.addEventListener('alpine:init', () => {
    Alpine.data('garmentData', () => ({

        garments : [],

        gender:'',
        season:'',
        price:'',
        priceField:'',
        description:'', 
        img:'',
        genderField:'',
        seasonField:'',

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
            axios
                .get(`/api/garments/price/${this.price}`)
                .then(r =>
                    {this.garments = r.data.data})
        },

        addGarment(){
            // this.description,
            // this.img
            // this.seasonField
            // this.genderField
            // this.priceField
            axios
                .post('/api/garment/')
                .then(r =>
                    {this.garments = r.data.data });
        },

    }))

})