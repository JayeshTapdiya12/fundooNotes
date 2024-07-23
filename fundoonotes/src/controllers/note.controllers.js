import HttpStatus from 'http-status-codes';
import * as NoteService from "../services/note.service";


// get all the notes

export const getAllNote = async (req, res, next) => {

    try {
        const data = await NoteService.getAllNote(req.body.createdBy);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: "All the Data Fetch Successfully!!!"
        })
        // console.log("data form controlerr===========>", data)
    } catch (error) {
        // console.log("error in controller================>", error)
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: ` ${error}`
        });
    }
};



//  creating new note

export const addNote = async (req, res, next) => {
    try {
        console.log(req.body)

        const data = await NoteService.addNote(req.body);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: "The note successfully created "
        })
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: ` ${error}`
        });
    }
};

//making note archive

export const noteArchive = async (req, res, next) => {
    try {
        // console.log(req.body)
        const data = await NoteService.noteArchive(req.body, req.params._id)
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: "Successfully Archived!"
        })
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: ` ${error}`
        });
    }
}

//  making note unarchived




// get the note only by using id

export const noteFind = async (req, res, next) => {
    try {
        const data = await NoteService.noteFind(req.body.createdBy, req.params._id);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: `The Note Of id :${req.params._id} is fetched`
        });

    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: ` ${error}`
        });
    }
}

// update the note by id

export const noteUpdate = async (req, res, next) => {
    try {
        const data = await NoteService.noteUpdate(req.params._id, req.body);
        res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data: data,
            message: "Updated the note"
        })
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: ` ${error}`
        });
    }
};


// delete the note by id


export const deleteNote = async (req, res, next) => {
    try {
        const data = await NoteService.deleteNote(req.body.createdBy, req.params._id);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: [],
            message: "Successfully deleted the Note!!"
        })
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: ` ${error}`
        });
    }
}


//  trash
export const trash = async (req, res, next) => {
    try {
        // console.log(req.body)
        const data = await NoteService.trash(req.body, req.params._id)
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: "Successfully Archived!"
        })
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: ` ${error}`
        });
    }
}




//  update color

export const noteColor = async (req, res, next) => {
    try {
        const data = await NoteService.noteColor(req.body, req.params._id)
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: "Successfully changed color!"
        })
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: ` ${error}`
        });
    }
}