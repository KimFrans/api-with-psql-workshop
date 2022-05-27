document.addEventListener('alpine:init', () => {
    Alpine.data('garmentData', () => ({

        garments : [],

        gender:'',
        season:'',
        price:'',
        
        description:'',
        img: '',
        seasonField:'',
        genderField:'',
        priceField:'',

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
                    {this.garments = r.data.data })
        },

        
        addGarment(){
            const fields= {
                description: this.description,
                img: this.img,
                season: this.seasonField,
                gender: this.genderField,
                price: this.priceField,
            }

            axios
                .post('/api/garment/', fields)
                .then(r =>
                    { axios
                        .get('/api/garments')
                        .then(r => 
                            {this.garments = r.data.data }) 
                    });
        },

    }))

})