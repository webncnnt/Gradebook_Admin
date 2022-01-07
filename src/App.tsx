import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminLayout from './layouts/AdminLayout';
import AdminManagePage from './pages/ViewAdminsPage';
import UserManagePage from './pages/UserManagePage';
import ClassManagePage from './pages/ClassManagePage';
import ViewAdminPage from './pages/ViewAdminsPage';
import AddAdminPage from './pages/AddAdminPage';
import { AlertProvider } from './context/AlertContext';
import AlertNotification from './components/AlertNotification';

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
