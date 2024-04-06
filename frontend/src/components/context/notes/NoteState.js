import React,{useState} from "react";

import NoteContext from "./noteContext";
const NoteState = (props) => {
 const host="http://localhost:5000"

  
let post=[]
  const [note, setNote] = useState(post);
  //Get ALL Notes



const getNote=async()=>{

let response=await fetch(`${host}/api/notes/fatchallnotes`,{
method:'GET',
headers:{
'Content-Type':"application/json",
"AUTH_TOKEN":localStorage.getItem('AuthTOKEN')
}

})
const res=await response.json();
console.log(res)
setNote(res)

}

  const addNote=async({title,description,tag})=>{

    let response=await fetch(`${host}/api/notes/addnotes`,{
      method:'POST',
      headers:{
      'Content-Type':"application/json",
      "Auth_TOKEN":localStorage.getItem("AuthTOKEN")

      },
      body:JSON.stringify({title,description,tag})
      })
const Json=await response.json();
console.log(Json)     

let Note=Json
    
setNote(  note.concat(Note))




}

//DELETE A NOTE WITH ID 

  const deleteNote = async (id) => {
    const  response=await fetch(`${host}/api/notes/deletenote/${id}`,{
      method:'DELETE',
      headers:{
      'Content-Type':"application/json",
      "Auth_TOKEN":localStorage.getItem('AuthTOKEN')
      }
      
      })
      const res=await response.json();
      console.log(res)
      
      
      
      
    const newNote = note.filter((NewNote) => {
      return NewNote._id !== id;
    });

    setNote(newNote);
  };

  const editNote = async (id, title, description, tag) => {
    let response=await fetch(`${host}/api/notes/update/${id}`,{
      method:'POST',
      headers:{
      'Content-Type':"application/json",
     "Auth_TOKEN":localStorage.getItem('token')
      

      },
      body:JSON.stringify({title,description,tag})
      })
const Json=await response.json();
console.log(Json)     
const newNote=JSON.parse(JSON.stringify(note))
  
      //Edit Note
  
    for (let index = 0; index <newNote.length; index++) { 
      const element =newNote[index];

      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag= tag;
        break;
      }
     
    }
  setNote(newNote)
  };



  return (
    <NoteContext.Provider
      value={{ note,setNote,deleteNote,editNote,getNote,addNote}}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;

