import { Route, Routes ,Navigate,Router } from "react-router"
import Home from "./Pages/Home"
import Neworedit from "./Pages/Neworedit"
import ShowNote from "./Pages/ShowNote"
localStorage.setItem("tags",(localStorage.getItem("tags"))||`{
   "ArrTags":[]
}`)
localStorage.setItem("notes",(localStorage.getItem("notes"))||`{
   "ArrNotes":[]
}`)

export type Note={
   noteInfo:RawNote,
   id:string,
 }
export type RawNote={
     title:string,
     noteText:string,
     relatedTags:string[];
 }
export type NoteV2={
   id:string,
   noteInfo:{
   title:string,
   relatedTags:string[];
   noteText?:string,
   },
 }

function App() {
  return (
     <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/new" element={<Neworedit isEdit={false}/>}/>     
        <Route path="/note/:id" >
           <Route index element={<ShowNote/>}/>
           <Route path="edit" element={<Neworedit isEdit={true}/>}/>
        </Route>
        <Route path="*" element={<Navigate to="/"/>}/>
     </Routes>
  )
}

export default App

