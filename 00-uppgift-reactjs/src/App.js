import { BrowserRouter} from 'react-router-dom';
import AppRouter from './routes/approuter';

import './App.css';
import './bootstrap/navbars-offcanvas.css';
import './bootstrap/bootstrap.min.css';
import './bootstrap/features.css';
import './bootstrap/grid.css';
import './bootstrap/modals.css';
import './bootstrap/darkmode.css';

import Header from './components/header';
import Footer from './components/footer';


function App() {

  return (
    <BrowserRouter>

    <Header/>  
    <AppRouter/>
    <Footer/>

    </BrowserRouter>
 
  );
}

export default App;
