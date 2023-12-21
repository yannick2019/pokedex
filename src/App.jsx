import './App.css'
import  Home from './Pages/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pokemon from './Pages/pokemon_details';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/pokemon/:id' element={<Pokemon />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
