import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/screens/Home'
import EmployeeList from './components/screens/Employee'

function App() {

  return (
    <div>
      <div className="app-container">
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/employee-list' Component={EmployeeList} />
        </Routes>
      </div>
    </div>
  )
}

export default App
