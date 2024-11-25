import { FormMovies } from "./components/FormMovies";
import { Header } from "./components/Header";
import { ListMovies } from "./components/ListMovies";


function App() {
  
  return(
    <div>
      <Header />
      <ListMovies/>
      <FormMovies/>
    </div>
  );
}

export default App
