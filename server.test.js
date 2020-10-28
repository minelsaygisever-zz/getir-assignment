require('dotenv').config()

const express = require("express")
const app = express()
app.use(express.json())
const routeFor = require('./routes/route')
app.use('/', routeFor)

const { expect } = require('chai')

const mongoose = require("mongoose")
const supertest = require('supertest')

jest.setTimeout(30000);

let server = null
mongoose
.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true})
.then(() => {
	server = app.listen(5000)
})

// check totalCount filter works correctly
test("check totalCount filter works correctly", async () => {
	// request body
	const data = {
        startDate: "2016-11-10",
        endDate: "2016-11-29",
        minCount: 3000,
        maxCount: 4000
	}

	await supertest(app)
		.post("/")
		.send(data)
		.expect(200)
		.then(async (response) => {
		    response.body['records'].forEach(element => {
		        expect(element['totalCount']).not.to.be.greaterThan(data['maxCount']) // less than or equeal
		        expect(element['totalCount']).not.to.be.lessThan(data['minCount']) // greater than or equal
            });
		   
        })
		
})

// check createdAt filter works correctly
test("check createdAt filter works correctly", async () => {
	// request body
	const data = {
        startDate: "2016-11-10",
        endDate: "2016-11-29",
        minCount: 3000,
        maxCount: 4000
	}
	
	var startDate = new Date(data['startDate'])
	var endDate = new Date(data['endDate'])

	await supertest(app)
		.post("/")
		.send(data)
		.expect(200)
		.then(async (response) => {
		    response.body['records'].forEach(element => {
		        var createdAt = new Date(element['createdAt']) 
		        expect(createdAt).not.to.be.greaterThan(endDate) // less than or equal
		        expect(createdAt).not.to.be.lessThan(startDate) // greater than or equal
		        
            });
		   
        })
       
        
})



