import './App.css';
import AlertNotification from './components/AlertNotification';
import { AlertProvider } from './context/AlertContext';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes';

function App() {
	return (
		<div className="min-h-screen bg-gray-100">
			<AuthProvider>
				<AlertProvider>
					<AppRoutes />
					<AlertNotification />
				</AlertProvider>
			</AuthProvider>
		</div>
	);
}

export default App;
