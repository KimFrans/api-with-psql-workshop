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

        username:'',
        token:'',
        decoded:'',
        usermessage:'',
        show:false,
        hide:true,
        unauthorised : false,
        heading: true,

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
            if(this.price > 0){
                axios
                    .get(`/api/garments/price/${this.price}`)
                    .then(r =>
                        {this.garments = r.data.data })
                this.heading = true

            }else{
                this.info_message = `no garments found that are less than R${this.price}`
                this.garments = []
                this.heading = false

                setTimeout(() =>  { 
                    this.info_message = '';
                    
                }, 2000);
                
            }
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
        
        createToken(){
            if (this.username != '') {
                axios
                    .post('/api/token/', {username : this.username})
                    .then(r => {
                        this.token = r.data.token;
                        // console.log(r.data.token);
                        // update Axios's latest token
                        localStorage.setItem('token', this.token);
                        // localStorage.setItem('token', JSON.stringify(this.token))
                        this.usermessage = 'Your token has been created'
                        this.unauthorised = false
                        setTimeout(() => {
                            this.usermessage = ''
                            // this.unauthorised = false
                        }, 3000);
                        
                        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
                    });
            }
            else{
                this.usermessage = 'Please enter a username!'
                this.unauthorised = true
                setTimeout(() => {
                    this.usermessage = ''
                    // this.unauthorised = true
                }, 3000);
            }

        },

        login(){
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

            const url = `/api/garments`;
            axios
                .get(url)
                .then(r => 
                    {this.garments = r.data.data
                        this.show = true
                        this.hide = false
                    }
                )
                

        },

    }))

})