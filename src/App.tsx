import './App.css';
import AlertNotification from './components/AlertNotification';
import { AlertProvider } from './context/AlertContext';
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
