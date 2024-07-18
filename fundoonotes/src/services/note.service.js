import { noteDelete } from "../controllers/note.controllers";
import Note from "../models/note.model"



// getting all the notes
export const getAllNote = async () => {
    const data = await Note.find();
    return data
};


//  creating new Note

export const addNote = async (body) => {
    const data = await Note.create(body);
    console.log(data)
    return data;
};


// get the note only by using id

export const noteFind = async (id) => {
    const data = await Note.findById(id);
    if (data != null) {
        return data;
    } else {
        throw new Error("Id is Not Correct or Note not exist")
    }
};




// update the note by id

export const noteUpdate = async (id, body) => {
    const data = await Note.findByIdAndUpdate({ _id: id }, body, {
        new: true
    });
    return data
};



//  delete the note by id


export const deleteNote = async (id) => {
    const data = await Note.findByIdAndDelete({ _id: id })
    return " ";
};

