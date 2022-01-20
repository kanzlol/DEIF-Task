import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainView } from './pages/main';
import { DetailedView } from './pages/detailed';
import { Login } from './pages/login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/main" element={<MainView/>} />
        <Route path="/detailed/:string" element={<DetailedView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
