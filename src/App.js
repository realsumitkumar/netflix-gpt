import { Provider } from "react-redux";
import Body from "./components/Body";
import appStore from "./utils/appstore";

function App() {
  return (
    <div className="App">
      <Provider store={appStore}>
        <Body />
      </Provider>
    </div>
  );
}

export default App;
