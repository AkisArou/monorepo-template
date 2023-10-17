import { MyComponent } from "@packages/c";
import "./App.css";
import { fromA } from "@packages/a";

function App() {
  return (
    <div className="bg-red-500">
      <MyComponent />
      {fromA("vite!!!")}
    </div>
  );
}

export default App;
