import React, { useRef, useState } from 'react'
import SelectComponent from './SelectComponent';
import { v4 as uuidv4 } from 'uuid';
import { RawNote,Note } from '../App';
import { useNavigate } from 'react-router';
import { useSelectedTag } from './zustandStore';
import style from "./New.module.css"


export default function New() {
  const current=useSelectedTag((state)=>state.Current)
  const titleRef=useRef<HTMLInputElement>(null);
  const noteTextRef=useRef<HTMLTextAreaElement>(null);
  const navToHome=useNavigate()
  const onAdd=(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
      let noteId=uuidv4();
      let currentTags=JSON.parse(localStorage.getItem("notes")!) 
      currentTags.ArrNotes.push({id:noteId,noteInfo:{title:titleRef.current?.value,noteText:noteTextRef.current?.value,relatedTags:current}} as Note)
      localStorage.setItem("notes",JSON.stringify(currentTags))
      return navToHome("/")
  }
  return (
    <form onSubmit={onAdd} className={style.Form}>
        <span className={style.header}>New Note</span>
        <div className={style.fields}>
        <div className={style.title}>
          <span>Note Title</span>
          <input required type="text" ref={titleRef}/>
        </div>
        <div className={style.tags}>
          <span>Select Reference Tags </span>
          <SelectComponent  isPersisted={true} />
        </div>
        </div>
        <textarea required placeholder='Write your note' ref={noteTextRef} />
        <div className={style.ActionBtns}>
           <input type='submit' value="ADD"/>
           <button onClick={()=>{return navToHome("/")}}>CANCEL</button>
        </div>    
    </form>
  )
}
