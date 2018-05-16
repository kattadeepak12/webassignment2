const Batch = require('../../database').Batch
const route = require('express').Router()
route.get('/', (req, res) => {
    Batch.findAll()
        .then((batches) => {
            res.status(200).send(batches)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrive batches"
            })
        })
})
route.post('/', (req, res) => {
    Batch.create(
        {
            batchname: req.body.name,
            courseId: req.body.courseId
        }
    )
        .then((batches) => {
            res.status(200).send(batches)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not add batches"
            })
        })
})

module.exports = route