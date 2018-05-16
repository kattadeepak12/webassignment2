const Sequelize = require('sequelize')

const db = new Sequelize('edudb', 'eduapp', 'edupass', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './edu.db',
})

const Course = db.define('courses', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    coursename: {
        type: Sequelize.STRING(30),
        allowNull: false,
    }
})

const Batch = db.define('batches', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    batchname: {
        type: Sequelize.STRING(30),
        unique: true,
        allowNull: false,
    }
})

const Lecture = db.define('lectures', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    lecturename: {
        type: Sequelize.STRING(30),
        unique: true,
        allowNull: false,
    }
})

const Student = db.define('students', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    studentname: {
        type: Sequelize.STRING(30),
        unique: true,
        allowNull: false,
    }
})

const Teacher = db.define('teachers', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    teachername: {
        type: Sequelize.STRING(30),
        unique: true,
        allowNull: false,
    }
})

const Subject = db.define('subjects', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    subjectname: {
        type: Sequelize.STRING(30),
        unique: true,
        allowNull: false,
    }
})

const BatchStudent = db.define('batches_students', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
})
const BatchTeacher = db.define('batches_teachers', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
})




Batch.belongsTo(Course)
Course.hasMany(Batch)
Lecture.belongsTo(Batch)
Batch.hasMany(Lecture)

Batch.belongsToMany(Student, { through: BatchStudent });
Student.belongsToMany(Batch, { through: BatchStudent });

Teacher.belongsTo(Subject)
Subject.hasMany(Teacher)

Batch.belongsToMany(Teacher, { through: BatchTeacher });
Teacher.belongsToMany(Batch, { through: BatchTeacher });

Subject.belongsTo(Batch)
Batch.hasMany(Subject)

Lecture.belongsTo(Course)
Course.hasMany(Lecture)

Student.belongsTo(Course)
Course.hasMany(Student)

Teacher.belongsTo(Course)
Course.hasMany(Teacher)
db.sync()
    .then(() => console.log("database has been created"))
    .catch((err) => console.log("Error creating database.."))

exports = module.exports = {
    Course, Batch, Lecture, Student, Teacher, Subject, BatchStudent, BatchTeacher
}
