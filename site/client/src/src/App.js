import './App.css'
import { Header } from './components/Header/Header'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage/Home'
import { RulePage } from './pages/RulePage/Rule'
import { FAQ } from './pages/FAQPage/FAQ'
import Footer from './components/Footer/Footer'
import { PluginPage } from './pages/PluginsPage/PluginPage'
import { ToastContainer } from 'react-toastify'

function App() {
	return (
		<>
			<Routes>
				{/* Домашняя */}
				<Route
					path='/'
					element={
						<>
							<Header />
							<HomePage />
							<Footer />
						</>
					}
				/>
				{/* Правила */}
				<Route
					path='/rules'
					element={
						<>
							<Header />
							<RulePage />
							<Footer />
						</>
					}
				/>
				{/* Плагины */}
				<Route
					path='/plugins'
					element={
						<>
							<Header />
							<PluginPage />
							<Footer />
						</>
					}
				/>
				{/* Ответы на вопросы */}
				<Route
					path='/faq'
					element={
						<>
							<Header />
							<FAQ />
							<Footer />
						</>
					}
				/>
			</Routes>

			{/* Уведомления Toast */}
			<ToastContainer
				position='top-right'
				autoClose={2500}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='dark'
			/>
		</>
	)
}

export default App
