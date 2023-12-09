import { Route, Routes } from "react-router-dom";
import NotesPage from "./components/NotesPage";
import UserLoginPage from "./components/UserLoginPage";
import UserSignupPage from "./components/UserSignupPage";
import HandleRouteNotFound from "./utility/HandleRouteNotFound";
import Reader from "./components/Reader";
import UpdatePassword from "./components/ForgotPassword";

function App() {
	return (
		<Routes>
			<Route path="/" element={<NotesPage />} />
			<Route path="/:id/reader" element={<Reader />} />
			<Route path="/login" element={<UserLoginPage />} />
			<Route path="/signup" element={<UserSignupPage />} />
			<Route path="/updatePassword" element={<UpdatePassword />} />
			<Route path="*" element={<HandleRouteNotFound />} />
		</Routes>
	);
}

export default App;
