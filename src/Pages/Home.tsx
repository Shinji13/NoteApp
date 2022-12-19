import React, { useEffect, useRef, useState } from 'react'
import style from "./Home.module.css"
import SelectComponent from './SelectComponent'
import { useSelectedTag } from './zustandStore'
import { RawNote,Note,NoteV2 } from '../App';
import { GetDefaultNotes } from './GetFromlocal';
import { Link, useNavigate } from 'react-router-dom';
import EditTags from './editTags';



export default function Home() {
  const [edit,SetEdit]=useState<boolean>(false)
  const tagfil=useSelectedTag<string[]>((state)=>state.Current)
  const [namefil,filterByName]=useState<string>("")
  const [notes,filterNote]=useState<NoteV2[]>(()=> GetDefaultNotes(JSON.parse(localStorage.getItem("notes")!).ArrNotes as Note[],false))
  const allInfo=useRef<Note[]|null>(null)
  const nav =useNavigate()

  useEffect(()=>{
    let currentNotes=JSON.parse(localStorage.getItem("notes")!).ArrNotes as Note[]
    allInfo.current=currentNotes;
  },[])

  useEffect(()=>{
      
       if(tagfil.length!==0||namefil.length!==0){
        let notes =[...allInfo.current!];
        notes=notes?.filter((el)=>{
            const contains = el.noteInfo.relatedTags.some(element => {
            return tagfil.includes(element);
           });
            return (el.noteInfo.title.startsWith(namefil)&&contains) ? true:false;
        })
        filterNote(GetDefaultNotes(notes,false))
       }
       else{
        filterNote(GetDefaultNotes(allInfo.current!,false))
       }
       
  },[namefil,tagfil])
  return (
    <div className={style.home}>
      {(edit)? <EditTags SetAppearence={SetEdit}/> :null}
       <div className={style.firstLayer}>
          <span>My Notes</span>
          <div>
            <button onClick={()=>{
               return nav("/new")
            }}> NOTE</button>
            <button onClick={()=>{SetEdit(true)}}>EDIT TAGS</button>
          </div>
       </div>
       <div className={style.SecondLayer}>
        <div className={style.nameFilter}>
            <span>Filter By title name</span>
            <input  type="text"  value={namefil} onChange={(e)=>{filterByName(e.target.value)}}/>
        </div>
        <div className={style.tagFilter}>
            <span>Filter By tags</span>
            <SelectComponent isPersisted={false}/>
        </div>     
        </div>
       <div className={style.ThirdLayer}> 
          {notes.map((note)=>{return <div> <div className={style.note} data-id={note.id} key={note.id} onClick={(e)=>{nav(`/note/${e.currentTarget.dataset.id}`)}}><span className={style.title}>{note.noteInfo.title}</span><div className={style.tags}>{note.noteInfo.relatedTags.map((element)=><span>{element}</span>)}</div>  </div> </div>})}
       </div>
    </div>
  )
}
