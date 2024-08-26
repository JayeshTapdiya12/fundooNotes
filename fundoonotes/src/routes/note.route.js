import express from 'express';
import * as NoteController from "../controllers/note.controllers"
import { noteValidator } from '../validators/note.validator'
import { userAuth } from '../middlewares/auth.middleware'
import { redisMiddleware } from '../middlewares/redis.middleware';

const router = express.Router();

// getting all note
router.get('', userAuth(process.env.hidden_key), redisMiddleware, NoteController.getAllNote);

//adding note
router.post('', noteValidator, userAuth(process.env.hidden_key), NoteController.addNote);

//making for archived note
router.post('/:_id/archived', userAuth(process.env.hidden_key), NoteController.noteArchive)

// making for trash
router.post('/:_id/trash', userAuth(process.env.hidden_key), NoteController.trash)


//get note by id
router.get('/:_id', userAuth(process.env.hidden_key), NoteController.noteFind);

//update data
router.put('/:_id', noteValidator, userAuth(process.env.hidden_key), NoteController.noteUpdate);

// updateding color
router.patch('/:_id/color', noteValidator, userAuth(process.env.hidden_key), NoteController.noteColor)

//delete data
router.delete('/:_id', userAuth(process.env.hidden_key), NoteController.deleteNote);




export default router;