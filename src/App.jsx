import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageSingIn from '../pages/singIn.jsx';
import PageSingUp from '../pages/singUp.jsx';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/singUp" element={<PageSingUp  />}/>
      <Route path='/singIn' element={<PageSingIn/>}/>
     


      <Route path="/" element={<h1>Página de Inicio</h1>} />
      </Routes>
    </Router>
  );
}
export default App;