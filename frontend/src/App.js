import './App.css';
import CustomerTable from './CustomerComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <CustomerTable />
      <ToastContainer />
    </div>
    
  );
}

export default App;
