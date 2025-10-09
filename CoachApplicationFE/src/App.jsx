import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import Header from './components/common/Header'
import Home from './pages/Home'
import Contact from './pages/Contact'
import AboutUs from './pages/AboutUs'
import Register from './pages/Register'
import Login from './pages/Login'
import UserProfile from './pages/userPages/UserProfile'
import { useAuth } from './context/AuthContext'
import AddClientForm from './components/clients/AddClientForm'
import ClientPage from './components/clients/ClientPage'
import AddNote from './components/AddNote'
import NotePage from './components/clients/NotePage'
import UNotePage from './pages/userPages/UNotePage'
import WeightChart from './components/clients/WeightChart'
import EditClientPage from './components/clients/EditClientPage'
import UserEditPage from './pages/userPages/UserEditPage'
import AddTrainingForm from './components/trainings/AddTrainingForm'
import TrainingPlanForm from './components/trainings/TrainingPlanForm'
import TrainingPage from './components/trainings/TrainingPage'
import TrainingPlanPage from './components/trainings/TrainingPlanPage'
import ClientTrainingsPage from './components/trainings/ClientTrainingsPage'
import UserTrainingsPage from './components/trainings/UserTrainingsPage'
import ForbiddenPage from './pages/error/ForbiddenPage'




function App() {

  const { user } = useAuth();
  

  return (
    <>
      <Header />
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/profile/:userId" element={<UserProfile />} />
        <Route path="/add-client/:userId" element={<AddClientForm />} />
        <Route path="/add-note/:userId" element={<AddNote />} />
        <Route path="/clients/:clientId" element={<ClientPage />} />
        <Route path="/clients/add-note/:userId/:clientId" element={<AddNote />} />
        <Route path="/all-notes/:userId" element={<UNotePage />} />
        <Route path="/all-notes/:userId/:clientId" element={<NotePage />} />
        <Route path="/clients/edit/:userId/:clientId" element={<EditClientPage/>} />
        <Route path="/edit-user/:userId" element={<UserEditPage/>} />
        <Route path="/trainings/:userId/new" element={<AddTrainingForm/>} />
        <Route path="/trainings/:userId/plans/new" element={<TrainingPlanForm/>} />
        <Route path="/training/:userId/:trainingId" element={<TrainingPage/>} />
        <Route path="/plan/:userId/:planId" element={<TrainingPlanPage/>} />
        <Route path="/trainings/all/:userId/:clientId" element={<ClientTrainingsPage/>} />
        <Route path="/trainings/:userId/all" element={<UserTrainingsPage/>}/>
        <Route path="/forbidden" element={<ForbiddenPage />} />
        
        

        
      </Routes>
    </>
  )
}

export default App
