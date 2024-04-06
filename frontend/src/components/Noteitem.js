import React from 'react'
import { useContext } from 'react';
import NoteContext from './context/notes/noteContext';
export default function Noteitem(props) {
  const context=useContext(NoteContext)
  const {deleteNote}=context;
  const {note,updateNote,showAlert}=props
  const handleDelete=()=>{
    deleteNote(note._id);
    showAlert("Delete Note Successfuly",('danger').charAt(0).toUpperCase()+('danger').slice(1).toLowerCase()
    );
 
  }

const editNote=()=>{
updateNote(note);

}
    return (
        
<div className="col-md-4 my-4">
<div className="card" >
  <div className="card-body  ">
  <div className="d-flex mx-3">
    <h5 className="card-title text-danger" style={{cursor:"pointer"}}><i>{note.title}</i></h5>
    <lord-icon
    src="https://cdn.lordicon.com/skkahier.json"
    trigger="hover"
    style={{width:"30px",height:"30px",cursor:"pointer" }} onClick={handleDelete}>
</lord-icon>
<lord-icon
    src="https://cdn.lordicon.com/wuvorxbv.json"
    trigger="hover"
    style={{width:"30px",height:"30px",cursor:"pointer",marginLeft:"2px"}}
    onClick={editNote}
    >
</lord-icon>
   
    
    </div>
    
    <p className="card-text text-black mx-3"><i>{note.description}</i></p>
  
  </div>
</div>
</div>
  
  )
}
