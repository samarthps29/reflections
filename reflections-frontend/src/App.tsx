import { Route, Routes } from "react-router-dom";
import NewNote from "./components/NotesPage";
import NewTodo from "./components/TodoPage";
import NewUserLogin from "./components/UserLoginPage";
import NewUserSignup from "./components/UserSignupPage";
import HandleRouteNotFound from "./utility/HandleRouteNotFound";

function App() {
	return (
		<Routes>
			<Route path="/login" element={<NewUserLogin />} />
			<Route path="/signup" element={<NewUserSignup />} />
			<Route path="/notes" element={<NewNote />} />
			<Route path="/todo" element={<NewTodo />} />
			<Route path="*" element={<HandleRouteNotFound />} />
		</Routes>
	);
}

export default App;
