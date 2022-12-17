import React, { useState } from 'react'
import style from "./Home.module.css"
import SelectComponent from './SelectComponent'
import { useSelectedTag } from './zustandStore'
import { RawNote,Note } from '../App';
type NoteV2={
  id:string,
  noteInfo:{
  title:string,
  relatedTags:string[];
  },
}
const GetDefaultNotes=()=>{
  let currentExistingNotes=JSON.parse(localStorage.getItem("notes")!).ArrNotes as Note[];
  let currentExistingTags=JSON.parse(localStorage.getItem("tags")!).ArrTags as {value:string,key:string}[];
  return currentExistingNotes.map((note)=>{
       let tag:string[]=[];
       for(let j=0;j<note.noteInfo.relatedTags.length;j++){
        for(let i=0; i<currentExistingTags.length; i++){
          if(currentExistingTags[i].key===note.noteInfo.relatedTags[j]){
              tag.push(currentExistingTags[i].value)
              break;
          }
         } 
       }
       return {id:note.id,noteInfo:{title:note.noteInfo.title,relatedTags:tag}}
     
  })
}

export default function Home() {
  const tagfil=useSelectedTag((state)=>state.Current)
  const [namefil,filterByName]=useState<string>("")
  const [notes,filterNote]=useState<NoteV2[]>(GetDefaultNotes)
  return (
    <div className={style.home}>
       <div className={style.firstLayer}>
          <span>My Notes</span>
          <div>
            <button>ADD NEW NOTE</button>
            <button>EDIT TAGS</button>
          </div>
       </div>
       <div className={style.SecondLayer}>
        <div className={style.nameFilter}>
            <span>Filter By title name</span>
            <input  type="text" />
        </div>
        <div className={style.tagFilter}>
            <span>Filter By tags</span>
            <SelectComponent isPersisted={false}/>
        </div>     
        </div>
       <div className={style.ThirdLayer}> 
          {notes.map((note)=>{return <div className={style.note} data-id={note.id}><span className={style.title}>{note.noteInfo.title}</span><div className={style.tags}>{note.noteInfo.relatedTags.map((element)=>{return <span>{element}</span>})}</div>  </div> })}
       </div>
    </div>
  )
}
