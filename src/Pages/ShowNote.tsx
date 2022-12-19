import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { NoteV2, Note } from '../App'
import { GetDefaultNotes } from './GetFromlocal'
import style from "./showNote.module.css"

export default function ShowNote() {
  let {id}=useParams();
  const nav=useNavigate()
  const [note,filterNote]=useState<NoteV2>(()=> {
     let Notes=JSON.parse(localStorage.getItem("notes")!).ArrNotes as Note[];
     let myNote:NoteV2;
     for(let i=0;i<Notes.length;i++){
        if(Notes[i].id===id){
            myNote=GetDefaultNotes([Notes[i]],true)[0];
        }
     }
     return myNote!;

  })
  const deleteNote=()=>{
    let Notes=JSON.parse(localStorage.getItem("notes")!).ArrNotes as Note[];
    for(let i=0;i<Notes.length;i++){
        if(Notes[i].id===id){
          Notes.splice(i,1);
        }
    }
    localStorage.setItem("notes",JSON.stringify({ArrNotes:Notes}))
    nav("/")
  }
  return (
    <div className={style.note}>
        <div className={style.firstLayer}>
          <div>
          <span >{note.noteInfo.title}</span>
          <div>{note.noteInfo.relatedTags.map((el)=><span>{el}</span>)}</div>
          </div>
          <div>
            <button>Edit</button>
            <button onClick={deleteNote}>Delete</button>
          </div>
        </div>
        <div className={style.secondLayer}>{note.noteInfo.noteText}</div>
    </div>
  )
}
