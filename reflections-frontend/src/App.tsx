import { Route, Routes } from "react-router-dom";
import NotesPage from "./components/NotesPage";
import Reader from "./components/Reader";
import ResetPassword from "./components/ResetPassword";
import UserLoginPage from "./components/UserLoginPage";
import UserSignupPage from "./components/UserSignupPage";
import HandleRouteNotFound from "./utility/HandleRouteNotFound";
import UpdatePassword from "./components/UpdatePassword";
import Message from "./components/Message";

function App() {
	return (
		<Routes>
			<Route path="/" element={<NotesPage />} />
			<Route path="/:id/reader" element={<Reader />} />
			<Route path="/login" element={<UserLoginPage />} />
			<Route path="/signup" element={<UserSignupPage />} />
			<Route path="/updatePassword" element={<UpdatePassword />} />
			<Route path="/resetPassword" element={<ResetPassword />} />
			<Route path="message" element={<Message />} />
			<Route path="*" element={<HandleRouteNotFound />} />
		</Routes>
	);
}

export default App;
