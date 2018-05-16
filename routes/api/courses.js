const Course = require('../../database').Course
const Batch = require('../../database').Batch
const Student = require('../../database').Student
const Teacher = require('../../database').Teacher
const Lecture = require('../../database').Lecture
const BatchStudent = require('../../database').BatchStudent
const BatchTeacher = require('../../database').BatchTeacher

const route = require('express').Router()

route.get('/', (req, res) => {
    Course.findAll()
        .then((courses) => {
            res.status(200).send(courses)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrive courses"
            })
        })
})


route.post('/', (req, res) => {
    console.log("-------------" + req.body.name)
    Course.create({
        coursename: req.body.name
    }).then((courses) => {
        res.status(201).send(courses)
    }).catch((err) => {
        res.status(501).send({
            error: "Could not add new course"
        })
    })
})
route.get('/:id', (req, res) => {
    let courseId = parseInt(req.params.id);
    Course.findOne({
        where: { id: courseId }
    })
        .then((course) => {
            res.status(200).send(course)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrive course"
            })
        })
})

// did not check
route.delete('/:id', (req, res) => {
    let courseId = parseInt(req.params.id);
    Course.destroy({
        where: { id: courseId }
    })
        .then((course) => {
            res.status(200).send(course)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not delete course"
            })
        })
})

route.get('/:id/batches', (req, res) => {
    let courseid = parseInt(req.params.id);
    Batch.findAll({
        where: { courseId: courseid }
    })
        .then((batches) => {
            res.status(200).send(batches)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrive batches"
            })
        })
})

route.post('/:id/batches', (req, res) => {
    let courseid = parseInt(req.params.id);
    Batch.create({
        courseId: courseid,
        batchname: req.body.name
    })
        .then((batches) => {
            res.status(201).send(batches)
        })
        .catch((err) => {
            res.status(501).send({
                error: "Could not create Batches"
            })
        })
})

route.get('/:id/batches/:batchid', (req, res) => {
    let courseid = parseInt(req.params.id);
    let batchId = parseInt(req.params.batchid)
    Batch.findOne({
        where: {
            courseId: courseid,
            id: batchId,
        }
    })
        .then((batch) => {
            res.status(200).send(batch)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrive batch"
            })
        })
})

// delete the batch
route.delete('/:id/batches/:batchid', (req, res) => {
    let courseid = parseInt(req.params.id);
    let batchId = parseInt(req.params.batchid)
    Batch.destroy({
        where: {
            courseId: courseid,
            id: batchId,
        }
    })
        .then((batch) => {
            res.status(200).send(batch)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not delete batch"
            })
        })
})
route.get('/:id/batches/:batchid/lectures', (req, res) => {
    let courseid = parseInt(req.params.id);
    let batchid = parseInt(req.params.batchid)
    Lecture.findAll({
        where: {
            courseId: courseid,
            batchId: batchid,
        }
    })
        .then((lectures) => {
            res.status(200).send(lectures)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrive lectures"
            })
        })
})

route.post('/:id/batches/:batchid/lectures', (req, res) => {
    console.log("hello")
    let courseid = parseInt(req.params.id);
    let batchid = parseInt(req.params.batchid)
    console.log("hello" + courseid + batchid)
    Lecture.create({
        lecturename: req.body.name,
        courseId: courseid,
        batchId: batchid,

    })
        .then((lecture) => {
            res.status(200).send(lecture)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not add lectures"
            })
        })
})


route.get('/:id/batches/:batchid/lectures/:lectureid', (req, res) => {
    let courseid = parseInt(req.params.id);
    let batchid = parseInt(req.params.batchid)
    let lectureId = parseInt(req.params.lectureid)
    Lecture.findOne({
        where: {
            courseId: courseid,
            batchId: batchid,
            id: lectureId
        }
    })
        .then((lecture) => {
            res.status(200).send(lecture)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrive lecture"
            })
        })
})

// delete the lectures
route.delete('/:id/batches/:batchid/lectures/:lectureid', (req, res) => {
    let courseid = parseInt(req.params.id);
    let batchid = parseInt(req.params.batchid)
    let lectureId = parseInt(req.params.lectureid)
    Lecture.destroy({
        where: {
            courseId: courseid,
            batchId: batchid,
            id: lectureId
        }
    })
        .then((lecture) => {
            res.status(200).send(lecture)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not delete lecture"
            })
        })
})

// get students
route.get('/:id/batches/:batchid/students', (req, res) => {
    BatchStudent.findAll({
        include: [{ model: Student, }],
        where: {
            batchId: parseInt(req.params.batchid),
            courseId: parseInt(req.params.id)
        }
    }).
        then((students) => {
            res.status(200).send(students)
        }).
        catch((err) => {
            res.status(500).send('Cant find any student')
        })
})

// post students
route.post('/:id/batches/:batchid/students', (req, res) => {
    Student.create({
        studentname: req.body.name,
        courseId: parseInt(req.params.id)
    }).then((student) => {
        BatchStudent.create({
            studentId: student.id,
            batchId: parseInt(req.params.batchid),
        }).then((students) => {
            res.status(200).send(students)
        })
    }).catch((err) => {
        res.status(500).send('Cant find any student')
    })
})

// get teachers
route.get('/:id/batches/:batchid/teachers', (req, res) => {
    BatchTeacher.findAll({
        where: {
            courseId: parseInt(req.params.id),
            batchId: parseInt(req.params.batchid)
        },
        include: [Teacher]
    }).
        then((teachers) => {
            res.status(200).send(teachers)
        }).
        catch((err) => {
            res.status(500).send('Cant find any teacher')
        })
})

// post teachers
route.post('/:id/batches/:batchid/teachers', (req, res) => {
    Teacher.create({
        teachername: req.body.name,
        courseId: parseInt(req.params.id)
    }).then((teacher) => {
        BatchStudent.create({
            teacherId: teacher.id,
            batchId: parseInt(req.params.batchid),
        }).then((teachers) => {
            res.status(200).send(teachers)
        })
    }).catch((err) => {
        res.status(500).send('Cant add teacher')
    })
})


exports = module.exports = route