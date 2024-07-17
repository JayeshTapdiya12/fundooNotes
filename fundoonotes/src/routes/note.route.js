import express from 'express';
import * as NoteController from "../controllers/note.controllers"


const router = express.Router();

// getting all note

router.get('', NoteController.getAllNote);


//adding note

router.post('/addnote', NoteController.addNote);



//get note by id

router.get('/:_id', NoteController.noteFind);



//update data

router.put('/:_id', NoteController.noteUpdate);



//delete data

router.delete('/:_id', NoteController.deleteNote);

export default router;