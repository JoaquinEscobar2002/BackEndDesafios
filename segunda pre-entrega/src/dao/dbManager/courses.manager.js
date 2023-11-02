import { coursesModel } from "./models/courses.model.js";

//Clase
export default class Courses {
    //Constructor
    constructor() {
        console.log('Working courses whit DB');
    }

    //Metodos
    getAll = async () => {
        //MongoDB el formato de nuetro registro son BSON
        const courses = await coursesModel.find();

        //BSON -> POJO (plain Old JavaScript Object)
        return courses.map(courses => courses.toObject());
    }

    save = async (course) => {
        const result = await coursesModel.create(course);
        return result;
    }

    update = async (id, update) => {
        const result = await coursesModel.updateOne({ _id: id}, update);
        return result;
    }
}