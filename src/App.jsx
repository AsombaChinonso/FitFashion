import { useState } from 'react'
import Home from './pages/Home'
import { MyCanvas } from './canvas/MyCanvas'
import Customizer from './pages/Customizer'


function App() {

  return (
    <main className='app transition-all ease-in'>
      <Home />
      <MyCanvas />
      <Customizer />
    </main>
  )
}

export default App
