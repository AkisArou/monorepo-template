import "./App.css";
import { fromA } from "@packages/a";
import { MyButton } from "@packages/ui";

function App() {
  fromA("aaa");

  return (
    <div className="bg-red-500">
      <MyButton />
    </div>
  );
}

export default App;
