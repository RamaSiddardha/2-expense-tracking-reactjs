import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import LoginPage from './Components/LoginPage/LoginPage';
import HomePage from './Components/HomePage/HomePage';



function App() {  

  const Router = createBrowserRouter([
    {path : '/' , element : <LoginPage/>},
    {path : '/HomePage', element : <HomePage/>}
  ])

  return <RouterProvider router={Router}/>

}

export default App;
