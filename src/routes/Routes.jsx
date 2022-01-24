import { Route } from "react-router-dom";
import { Routes as Switch} from "react-router-dom";
  import Homepage from "../pages/homepage";
  import Drink from "../pages/drink";
  import Search from "../pages/search";

  export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" element={<Homepage />} />
            <Route path="/drink" element={<Drink/>}/>
            <Route path="/search" element={<Search/>}/>
        </Switch>
          )
          
  }
  