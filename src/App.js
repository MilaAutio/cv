import './App.scss';
import {Header} from './components/header';
import {Content} from './components/page-content';

function App() {
  return (
    <div className="App">
      {Header()}
      {Content()}
    </div>
  );
}

export default App;
