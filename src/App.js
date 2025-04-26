import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { Main } from './pages/main';
import  {Login } from './pages/login';
import { NavBar } from './components/navBar';
import { CreatePost } from "./pages/createPost";


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Main />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/createP' element={<CreatePost />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
