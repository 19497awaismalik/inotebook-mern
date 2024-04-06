import React,{useEffect,useRef,useState} from 'react'
import { useContext } from 'react';
import NoteContext from './context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import {  useNavigate } from 'react-router-dom';
export default function Notes(props) {

const {showAlert}=props;
const Navigate=useNavigate();

const context =useContext(NoteContext);
      const {note,getNote,editNote}=context;
      const [notes, setNote] = useState({id:"", etitle: "",edescription: "", etag: ""  });

      const handleClick = (e) => {
        console.log("update the note..", notes)
        editNote(notes.id,notes.etitle,notes.edescription,notes.etag);
        refClose.current.click();
       
        showAlert("Edit Note Successfuly",('success').charAt(0).toUpperCase()+('success').slice(1).toLowerCase()
        );
     
      }
    

      
      const onChange = (e) => {
        setNote({ ...notes, [e.target.name]: e.target.value });
      };

const ref=useRef(null);
const refClose=useRef(null);

useEffect(()=>{
if(localStorage.getItem('AuthTOKEN')){
  getNote()

}
else{
Navigate("/login")


}
    //eslint-disable-next-line 
  },[])

 const updateNote=(currentNote)=>{
ref.current.click();
setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});

 }
 

  return (
    <>
<Addnote showAlert={showAlert}/>

<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
        <div className="mb-3">
          <label htmlFor="etitle" className="form-label">
            Title
          </label>
          <input type="text" className="form-control" id="etitle" name="etitle" value={notes.etitle} onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="edescription" className="form-label">
            Description
          </label>
          <input type="text" className="form-control" id="edescription" name="edescription" value={notes.edescription} onChange={onChange} minLength={3} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="etag" className="form-label">
            Tag
          </label>
          <input type="text" className="form-control" id="etag" name="etag"  value={notes.etag} onChange={onChange} />
        </div>

        
      </form>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={notes.etitle.length<3 ||notes.edescription.length<5 } type="button" className="btn btn-primary"   onClick={handleClick}     >update Note</button>
      </div>
    </div>
  </div>
</div>

   
    <div className='row'>
    <div className="container my-3">
  <h4 className='text-danger'><i> {note.length===0 && 'No Note To Display.. '}</i></h4> 
    </div>
    {note &&  note.map((note)=>{ return (<Noteitem showAlert={showAlert} key={note._id} updateNote={updateNote}  note={note}/>
         
   )})}
      
    </div>
    </>
  )
}
