const express = require('express')
const { mongo } = require('mongoose')
const router = express.Router()
const Record = require('../models/record')
var assert = require('assert')
var url = 'mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getircase-study?retryWrites=true'
/*
router.get('/', function (req, res, next){
    mongo.connect(url, function(err, db) {
        assert.equal(null, err)
        var cursor = db.collection('records').find()
        cursor.forEach(function(doc, err) {
            assert.equal(null, err)
            resultArray.push(doc)
        }, function(){
            db.close
            res.json({code: '0', msg: 'Success', cursor })
        });
    })
})*/


router.post('/', async (req, res) => {
    try {
        const records = await Record.find({
            $and: [
                {createdAt: { $gte: req.body.startDate}},
                {createdAt: { $lte: req.body.endDate}},
                {totalCount: { $gte: req.body.minCount}},
                {totalCount: { $lte: req.body.maxCount}}
            ]
        })
        res.json({code: '0', msg: 'Success', records })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


router.post('/new', async (req, res) => {
    const record = new Record({
        totalCount: req.body.totalCount,
        createdAt: req.body.createdAt
    })
    
    try {
        const newRecord = await record.save()
        res.status(201).json({ code: '0', msg: 'Success', newRecord})
    } catch (err) {
        res.status(400).json({ message: err.json})
    }
})

module.exports = router