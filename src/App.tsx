import { Route, Routes ,Navigate,Router } from "react-router"
import EditNote from "./Pages/EditNote"
import Home from "./Pages/Home"
import New from "./Pages/New"
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

function App() {
  return (
     <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/new" element={<New/>}/>     
        <Route path="/:id" >
           <Route index element={<ShowNote/>}/>
           <Route path="edit" element={<EditNote/>}/>
        </Route>
        <Route path="*" element={<Navigate to="/"/>}/>
     </Routes>
  )
}

export default App

