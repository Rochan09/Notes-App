import './App.css';
import { Navbar } from './components/Home/Navbar';
import AllRoutes from './routes/AllRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from './redux/users/user_actions';

const INACTIVITY_TIMEOUT = 5 * 60 * 1000;
const ACTIVITY_EVENTS = ['mousedown', 'mousemove', 'keydown', 'touchstart', 'scroll'];

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.userReducer.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      return undefined;
    }

    let timeoutId;
    const resetInactivityTimer = () => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        dispatch(logoutUser());
      }, INACTIVITY_TIMEOUT);
    };

    ACTIVITY_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, resetInactivityTimer);
    });
    resetInactivityTimer();

    return () => {
      window.clearTimeout(timeoutId);
      ACTIVITY_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, resetInactivityTimer);
      });
    };
  }, [dispatch, isAuthenticated]);

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 99999 }}
      />
      <Navbar onSearch={setSearchQuery} />
      <AllRoutes searchQuery={searchQuery} />
    </div>
  );
}

export default App;
