import { Route, Routes } from "react-router-dom";
import NotesPage from "./components/NotesPage";
import Redirect from "./components/Redirect";
import TodoPage from "./components/TodoPage";
import UserLoginPage from "./components/UserLoginPage";
import UserSignupPage from "./components/UserSignupPage";
import HandleRouteNotFound from "./utility/HandleRouteNotFound";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Redirect />} />
			<Route path="/login" element={<UserLoginPage />} />
			<Route path="/signup" element={<UserSignupPage />} />
			<Route path="/notes" element={<NotesPage />} />
			<Route path="/todo" element={<TodoPage />} />
			<Route path="*" element={<HandleRouteNotFound />} />
		</Routes>
	);
}

export default App;
