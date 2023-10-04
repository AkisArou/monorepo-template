import { MyComponent } from "@my-nodejs-test/c";
import "./App.css";
import { fromA } from "@my-nodejs-test/a";

function App() {
  return (
    <div className="bg-red-500">
      <MyComponent />
      {fromA("vite!!!")}
    </div>
  );
}

export default App;
