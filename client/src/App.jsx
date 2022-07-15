import { Route, Routes } from 'react-router-dom'
import Chat from './components/chat/Chat'
import Form from './components/form/Form'

import './App.css'

function App() {
  return (
      <Routes>
        <Route exact path="/" element={<Form/>} />
        <Route path="/chat" element={<Chat/>} />
      </Routes>
  )
}

export default App
