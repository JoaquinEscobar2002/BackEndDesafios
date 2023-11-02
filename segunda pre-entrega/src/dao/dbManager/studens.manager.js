import { studentsModel } from "./models/studens.model.js";

//Clase
export default class Students {
    //Constructor
    constructor() {
        console.log('Working students whit DB');
    }

    //Metodos
    getAll = async () => {
        //MongoDB el formato de nuetro registro son BSON
        const students = await studentsModel.find();

        //BSON -> POJO (plain Old JavaScript Object)
        return students.map(students => students.toObject());
    }

    save = async (studen) => {
        const result = await studentsModel.create(studen);
        return result;
    }
}
