const Course = require('../../database').Course
const Batch = require('../../database').Batch
const Student = require('../../database').Student
const Teacher = require('../../database').Teacher
const Lecture = require('../../database').Lecture
const BatchStudent = require('../../database').BatchStudent
const BatchTeacher = require('../../database').BatchTeacher

const route = require('express').Router()

route.get('/', (req, res) => {
    Student.findAll()
        .then((students) => {
            res.status(200).send(students)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrive students"
            })
        })
})

route.post('/', (req, res) => {
    Student.create({
        studentname: req.body.studentname,
        courseId: req.body.courseId
    })
        .then((students) => {
            res.status(200).send(students)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not post students"
            })
        })
})

route.get('/:id', (req, res) => {
    let studentId = parseInt(req.params.id);
    Student.findOne({
        where: { id: studentId }
    })
        .then((student) => {
            res.status(200).send(student)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrive student"
            })
        })
})

// delete the student
route.delete('/:id', (req, res) => {
    let studentId = parseInt(req.params.id);
    Student.destroy({
        where: { id: studentId }
    })
        .then((student) => {
            res.status(200).send(student)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not delete student"
            })
        })
})

// get the batches
route.get('/:id/batches', (req, res) => {
    let studentid = parseInt(req.params.id);
    BatchStudent.findAll({
        where: { studentId: studentid },
        include: [{
            model: Batch,
        }]

    }).then((batches) => {
        res.status(200).send(batches)
    })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrive batches"
            })
        })
})
module.exports = route