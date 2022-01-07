import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AlertNotification from './components/AlertNotification';
import { AlertProvider } from './context/AlertContext';
import AdminLayout from './layouts/AdminLayout';
import AddAdminPage from './pages/AddAdminPage';
import ClassManagePage from './pages/ClassManagePage';
import LoginPage from './pages/LoginPage';
import UserManagePage from './pages/UserManagePage';
import ViewAdminPage from './pages/ViewAdminsPage';

function App() {
	return (
		<div className="min-h-screen bg-gray-100">
			<AlertProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/login" element={<LoginPage />} />
						<Route path="/" element={<AdminLayout />}>
							<Route path="/admin">
								<Route path="/admin/viewAdmins" element={<ViewAdminPage />} />
								<Route path="/admin/addAdmin" element={<AddAdminPage />} />
							</Route>
							<Route path="/user" element={<UserManagePage />} />
							<Route path="/class" element={<ClassManagePage />} />
						</Route>
					</Routes>
				</BrowserRouter>
				<AlertNotification />
			</AlertProvider>
		</div>
	);
}

export default App;
