import React, { useState } from "react";
import { useContext } from "react";
import NoteContext from "./context/notes/noteContext";
// import {LordIcon} from '@lordicon/react'

export default function Addnote(props) {

  // console.log(LordIcon)

  const {showAlert}=props
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "",description: "", tag: ""  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note);
setNote({ title: "",description: "", tag: ""  })
showAlert(' Add Note Success',('success').charAt(0).toUpperCase()+('success').slice(1).toLowerCase());
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h2>ADD A NOTES </h2>

      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} minLength={3} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input type="text" className="form-control" id="description" name="description"  value={note.description} onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
        </div>

        <button disabled={note.title.length<3 || note.description.length<5} type="submit"className="btn btn-outline-primary" onClick={handleClick} >
        <lord-icon
    src="https://cdn.lordicon.com/jgnvfzqg.json"
    trigger="hover"
    style={{width:"25px",height:"25px",marginRight:"2px"}}>
</lord-icon>
          Add Note
          </button>
      </form>

      <h2>YOUR NOTES</h2>
    </div>
  );
}
