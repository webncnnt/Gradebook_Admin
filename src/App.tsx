import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AlertNotification from './components/AlertNotification';
import { AlertProvider } from './context/AlertContext';
import AdminLayout from './layouts/AdminLayout';
import AddAdminPage from './pages/AddAdminPage';
import ClassManagePage from './pages/ClassManagePage';
import LoginPage from './pages/LoginPage';
import UserManagePage from './pages/UserManagePage';
import ViewAdminPage from './pages/ViewAdminsPage';
import AppRoutes from './routes';

function App() {
	return (
		<div className="min-h-screen bg-gray-100">
			<AlertProvider>
				<AppRoutes />
				<AlertNotification />
			</AlertProvider>
		</div>
	);
}

export default App;
