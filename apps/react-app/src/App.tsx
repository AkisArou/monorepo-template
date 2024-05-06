import "./App.css";
import { Button } from "@packages/ui";
import { sayHello } from "@packages/utils";

function App() {
	return (
		<div className="bg-red-500">
			<Button>{sayHello()}</Button>
		</div>
	);
}

export default App;
