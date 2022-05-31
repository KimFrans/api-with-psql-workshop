const { query } = require("express");

module.exports = function (app, db) {

	app.get('/api/test', async function (req, res) {
		let name = req.body
		res.json({
			name: 'joe'
		});
	});

	app.get('/api/garments', async function (req, res) {

		const { gender, season } = req.query;
		let garments =  await db.many('select * from garment');
		// add some sql queries that filter on gender & season
		if(season && gender){
			garments = await db.many('select * from garment where (season, gender) = ($1,$2)', [season, gender]);
		}
		else if(season){
			garments = await db.many('select * from garment where season = $1', [season])
		}
		else if(gender){
			garments = await db.many('select * from garment where gender = $1', [gender])
		}
	// console.log(garments.length);
		res.json({
			data: garments
		})
	});

	app.put('/api/garment/:id', async function (req, res) {

		try {

			// use an update query...

			const { id } = req.params;
			const garment = await db.one(`select * from garment where id = $1`, [id]);

			// you could use code like this if you want to update on any column in the table
			// and allow users to only specify the fields to update

			let params = { ...garment, ...req.body };
			const { description, price, img, season, gender } = params;

			await db.oneOrNone('update garment set gender = $1 where id = $2', ["Unisex", id])


			res.json({
				status: 'success'
			})
		} catch (err) {
			console.log(err);
			res.json({
				status: 'error',
				error: err.message
			})
		}
	});

	app.get('/api/garment/:id', async function (req, res) {

		try {
			const { id } = req.params;
			//id = 4507
			// get the garment from the database
			// let garment = null;
			let garment = [];
			garment = await db.one(`select * from garment where id = $1`, [id]);

			res.json({
				status: 'success',
				data: garment
			});

		} catch (err) {
			console.log(err);
			res.json({
				status: 'error',
				error: err.message
			})
		}
	});


	app.post('/api/garment/', async function (req, res) {

		try {

			const { description, price, img, season, gender } = req.body;

			// insert a new garment in the database
			// await db.none(`insert into garment (description, img, season, gender, price) values ('Tank top', 'tank-128x128-455134.png', 'Winter', 'Female', '49.99')`);
			await db.none(`insert into garment (description, img, season, gender, price) values ($1, $2, $3, $4, $5)`, [description, img, season, gender, price]);


			res.json({
				status: 'success',
			});

		} catch (err) {
			console.log(err);
			res.json({
				status: 'error',
				error: err.message
			})
		}
	});

	app.get('/api/garments/grouped', async function (req, res) {
		let result = []		
		// use group by query with order by asc on count(*)
		result = await db.many('select count(*), gender from garment group by gender order by count(*) asc');
		
		res.json({
			data: result
		})
	});

	app.delete('/api/garments/', async function (req, res) {

		try {
			const { gender } = req.query;
			// console.log(req.params);
			// delete the garments with the specified gender
			db.many('delete from garment where gender = $1', [gender])

			res.json({
				status: 'success'
			})
		} catch (err) {
			// console.log(err);
			res.json({
				status: 'success',
				error : err.stack
			})
		}
	});


	app.delete('/api/garments/:id', async function (req, res) {

		try {
			const { id } = req.params;
			// console.log(req.params);
			// delete the garments with the specified gender
			db.oneOrNone('delete from garment where id = $1', [id])

			res.json({
				status: 'success'
			})
		} catch (err) {
			// console.log(err);
			res.json({
				status: 'success',
				error : err.stack
			})
		}
	});

	app.get('/api/garments/price/:price', async function (req, res) {
		const price = Number(req.params.price);

		let result	

		if (price > 0) {
			result = await db.many('select * from garment where price <= ($1)', [price]);
		}
	
		res.json({
			data: result
		});
	});



}