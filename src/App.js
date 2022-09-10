
import RoutesApp from './routes';

import UserProvider from './contexts/user';

import {ToastContainer} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <UserProvider>
    <div>
      <ToastContainer autoClose={3000}/>
      <RoutesApp/>
    </div>
    </UserProvider>
  );
}

export default App;
