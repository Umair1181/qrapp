const Router = require("express").Router();
const TeacherController = require("../../Controllers/Auth/teacher");



Router.post( '/add', ( req, res ) => TeacherController.addTeacher() )

module.exports = Router;