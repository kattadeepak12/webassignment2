const Subject = require('../../database').Subject
const Teacher = require('../../database').Teacher

const route = require('express').Router()

route.get('/', (req, res) => {
    Subject.findAll()
        .then((subjects) => {
            res.status(200).send(subjects)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrive subjects"
            })
        })
})
route.get('/:id', (req, res) => {
    let subjectId = parseInt(req.params.id);
    Subject.findOne({
        where: { id: subjectId }
    })
        .then((subject) => {
            res.status(200).send(subject)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrive subject"
            })
        })
})

// delete the subject
route.delete('/:id', (req, res) => {
    let subjectId = parseInt(req.params.id);
    Subject.destroy({
        where: { id: subjectId }
    })
        .then((subject) => {
            res.status(200).send(subject)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not delete subject"
            })
        })
})

route.post('/', (req, res) => {
    Subject.create({
        subjectname: req.body.subjectname,
        batchId:req.body.batchId
    })
        .then((subject) => {
            res.status(200).send(subject)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not add subject"
            })
        })
})

route.get('/:id/teachers', (req, res) => {
    let subjectid = parseInt(req.params.id);
    Teacher.findAll({
        where: { subjectId: subjectid }
    })
        .then((teachers) => {
            res.status(200).send(teachers)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrive teachers"
            })
        })
})

module.exports = route
