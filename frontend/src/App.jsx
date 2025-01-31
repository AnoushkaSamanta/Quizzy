import './App.css'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import { Route, Routes } from 'react-router-dom'
import QuizPage from './components/QuizPage/QuizPage'
import About from './components/About/About'
import Account from './components/Account/Account'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  

  return (
<>
<Routes>
<Route path="/" element={<SignUp/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/home" element={<Home/>}/>
<Route path="/quizpage" element={<QuizPage/>}/>
<Route path="/about" element={<About/>}/>
<Route path="/account" element={<Account/>}/>
</Routes>

{/* for react toasts */}
<ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

</>
  )
}

export default App
