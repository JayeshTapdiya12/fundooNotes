import express from 'express';
import * as NoteController from "../controllers/note.controllers"
import { userAuth } from '../middlewares/auth.middleware'
const router = express.Router();

// getting all note

router.get('', userAuth, NoteController.getAllNote);


//adding note

router.post('', userAuth, NoteController.addNote);



//get note by id

router.get('/:_id', userAuth, NoteController.noteFind);



//update data

router.put('/:_id', userAuth, NoteController.noteUpdate);



//delete data

router.delete('/:_id', userAuth, NoteController.deleteNote);


export default router;