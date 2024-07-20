// import { noteDelete } from "../controllers/note.controllers";
import Note from "../models/note.model"



// getting all the notes
export const getAllNote = async (id) => {
    const data = await Note.find({
        createdBy: id
    });
    // console.log("data from service ========>", data)
    if (data != null) {
        return data
    } else {
        throw new Error("No Noted been Created till date")
    }
};


//  creating new Note

export const addNote = async (body) => {
    const data = await Note.create(body);
    console.log(data)
    return data;
};


// get the note only by using id

export const noteFind = async (creId, id) => {
    console.log(creId)
    const data = await Note.findOne({
        createdBy: creId,
        _id: id
    });

    if (data != null) {
        return data;
    } else {
        throw new Error("Id is Not Correct or Note not exist")
    }
};




// update the note by id

export const noteUpdate = async (id, body) => {
    const data = await Note.findOneAndUpdate({ createdBy: body.createdBy, _id: id }, body, {
        new: true
    });
    return data
};



//  delete the note by id


export const deleteNote = async (creId, id) => {
    const data = await Note.findOneAndDelete({ createdBy: creId, _id: id })
    return " ";
};

