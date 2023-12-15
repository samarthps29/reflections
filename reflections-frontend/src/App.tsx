import { Route, Routes } from "react-router-dom";
import NotesPage from "./pages/NotesPage";
import Reader from "./pages/ReaderPage";
import ResetPassword from "./pages/auth/ResetPasswordPage";
import UserLoginPage from "./pages/auth/UserLoginPage";
import UserSignupPage from "./pages/auth/UserSignupPage";
import HandleRouteNotFound from "./utility/HandleRouteNotFound";
import UpdatePassword from "./pages/auth/UpdatePasswordPage";
import MessagePage from "./pages/MessagePage";

function App() {
	return (
		<Routes>
			<Route path="/" element={<NotesPage />} />
			<Route path="/:id/reader" element={<Reader />} />
			<Route path="/login" element={<UserLoginPage />} />
			<Route path="/signup" element={<UserSignupPage />} />
			<Route path="/updatePassword" element={<UpdatePassword />} />
			<Route path="/resetPassword" element={<ResetPassword />} />
			<Route path="/message" element={<MessagePage />} />

			<Route path="*" element={<HandleRouteNotFound />} />
		</Routes>
	);
}

export default App;
