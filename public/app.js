document.addEventListener('alpine:init', () => {
    Alpine.data('garmentData', () => ({

        garments : [],
        length:'',
        
        gender:'',
        season:'',
        price:'',
        
        description:'',
        img: '',
        seasonField:'',
        genderField:'',
        priceField:'',

        deleteItem:'',
        info_message : '',
        error : false,


        data(){
            axios
                .get('/api/garments')
                .then(r => 
                    {this.garments = r.data.data })

        },

        totalGarments(){
            axios
                .get('/api/garments/count')
                .then(r => 
                    {this.length = r.data.data.count })
                    console.log(this.length);
                    
        },

        filter(){
            axios
                .get(`/api/garments?gender=${this.gender}&season=${this.season}`)
                .then(r =>
                    {
                        this.garments = r.data.data 
                    });

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

            if(this.description && this.img && this.seasonField && this.genderField && this.priceField != ''){
                axios
                    .post('/api/garment/', fields)
                    .then(r =>
                        { axios
                            .get('/api/garments')
                            .then(r => 
                                {this.garments = r.data.data }) 
                                this.totalGarments()
                        });
                this.info_message = 'Garment Added!'
                this.error = false;

                this.description = ''
                this.img = ''
                this.seasonField = ''
                this.genderField = ''
                this.priceField = ''

                // this.$refs.snack.innerHTML = 'Garment Added'
                console.log('Garment Added');

            }
            else if(this.description || this.img || this.seasonField || this.genderField || this.priceField == ''){
                // this.$refs.snack.innerHTML = this.errorMessage
                this.info_message = 'Required data not supplied!!'
                this.error = true;
                // this.snackError.className = "show";

                console.log('Required data not supplied!');

                this.description = ''
                this.img = ''
                this.seasonField = ''
                this.genderField = ''
                this.priceField = ''
            }

            setTimeout(() =>  { 
                this.info_message = '';
                this.error = false;
              }, 3000);

        },
        
        deleteGarment(id){
            console.log(id);
            axios
                .delete(`/api/garments/${id}`)
                .then(r =>
                     {axios
                        .get('/api/garments')
                        .then(r => 
                            {this.garments = r.data.data})
                            this.totalGarments() 
                        }); 
            // this.$refs.snack.innerHTML = 'Garment Deleted'
            this.info_message = 'Garment deleted!'
            this.error = true;
            // console.log('Garment Deleted');

            setTimeout(() =>  { 
                this.info_message = '';
                this.error = false;
              }, 3000);

        },

    }))

})