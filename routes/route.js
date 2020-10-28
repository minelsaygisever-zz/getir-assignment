const express = require('express')
const router = express.Router()
const Record = require('../models/record')

router.post('/', async (req, res) => {
    try {
        const records = []; // output
        const allRecords = await Record.find({}) // get all records
        allRecords.forEach(element => {
            
            totalCount = 0 // add every counts element value to this variable
            
            // variable declaration for comparison and output
            key = element.key
            createdAt = element.createdAt
            startDate = new Date(req.body.startDate)
            endDate = new Date(req.body.endDate)
            
            // add every counts element to totalCount
            element.counts.forEach(element => {
                totalCount += element
            })
            
            // comparisons
            if(totalCount <= req.body.maxCount && totalCount >= req.body.minCount 
            && createdAt >= startDate && createdAt <= endDate) {
                records.push({key, createdAt, totalCount})
            }
        });
        res.json({code: 0, msg: 'Success', records })
    } catch (err) {
        res.status(500).json({ code:'1', message: err.message })
    }
})

module.exports = router