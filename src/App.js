import "./App.scss";
import RouterCom from './Routers/Router'
import { BrowserRouter as Router } from 'react-router-dom';
function App() {
  return (
    <Router>
      <RouterCom/>
    </Router>
  );
}

export default App;
