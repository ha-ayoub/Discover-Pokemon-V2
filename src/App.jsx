import { Route, Routes } from "react-router-dom";
import DetailPokemon from "./pages/DetailPokemon";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Home />}/>
        <Route path={"/:pokemon"} element={<DetailPokemon/>}/>
      </Routes>
    </div>
  )
}