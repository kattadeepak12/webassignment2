const Course = require('../../database').Course
const Batch = require('../../database').Batch
const Student = require('../../database').Student
const Teacher = require('../../database').Teacher
const Lecture = require('../../database').Lecture
const BatchStudent = require('../../database').BatchStudent
const BatchTeacher = require('../../database').BatchTeacher

const route = require('express').Router()

route.get('/', (req, res) => {
    Teacher.findAll()
        .then((teachers) => {
            res.status(200).send(teachers)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrive teachers"
            })
        })
})

route.post('/', (req, res) => {
    Teacher.create({
        teachername: req.body.teachername,
        subjectId: req.body.subjectId,
        courseId: req.body.courseId
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

route.get('/:id', (req, res) => {
    let teacherId = parseInt(req.params.id);
    Teacher.findOne({
        where: { id: teacherId }
    })
        .then((teacher) => {
            res.status(200).send(teacher)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrive teacher"
            })
        })
})

// delete the teacher
route.delete('/:id', (req, res) => {
    let teacherId = parseInt(req.params.id);
    Teacher.destroy({
        where: { id: teacherId }
    })
        .then((teacher) => {
            res.status(200).send(teacher)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not delete teacher"
            })
        })
})

// get batches
route.get('/:id/batches', (req, res) => {
    let teacherid = parseInt(req.params.id);
    BatchTeacher.findAll({
        where: { teacherId: teacherid },
        include: [{
            model: Batch
        }]

    }).then((teachers) => {
        res.status(200).send(teachers)
    })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrive teachers"
            })
        })
})

module.exports = route