import express from 'express';
import * as NoteController from "../controllers/note.controllers"
import { noteValidator } from '../validators/note.validator'
import { userAuth } from '../middlewares/auth.middleware'

const router = express.Router();

// getting all note

router.get('', userAuth, NoteController.getAllNote);


//adding note

router.post('', noteValidator, userAuth, NoteController.addNote);

//making for archived note

router.post('/:_id/archived', userAuth, NoteController.noteArchive)

// making for trash
router.post('/:_id/trash', userAuth, NoteController.trash)




//get note by id

router.get('/:_id', userAuth, NoteController.noteFind);


//update data

router.put('/:_id', noteValidator, userAuth, NoteController.noteUpdate);



// updateding color

router.put('/:_id/color', noteValidator, userAuth, NoteController.noteColor)

//delete data

router.delete('/:_id', userAuth, NoteController.deleteNote);




export default router;