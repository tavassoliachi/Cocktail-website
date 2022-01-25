import './App.css';
import Header from './components/Header';
import Routes from './routes/Routes';
function App() {
  return (
    <div className="App" style={{paddingBottom:"50px"}}>
        <Header/>
        <Routes/>
    </div>
  );
}

export default App;
