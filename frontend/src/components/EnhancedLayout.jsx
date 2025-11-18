import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
	Menu, X, Home, BarChart3, Target, Wallet, 
	LogOut, User, Settings, TrendingUp, PieChart,
	Shield, HelpCircle, Mail, Github, Linkedin,
	ChevronDown, Bell, Search, Zap
} from 'lucide-react';

const EnhancedLayout = ({ children }) => {
	const { user, logout } = useAuth();
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [userMenuOpen, setUserMenuOpen] = useState(false);
	const [notificationsOpen, setNotificationsOpen] = useState(false);

	const navigation = [
		{ name: 'Dashboard', href: '/dashboard', icon: Home, description: 'Overview of your finances' },
		{ name: 'Accounts', href: '/accounts', icon: Wallet, description: 'Manage your accounts' },
		{ name: 'Transactions', href: '/transactions', icon: PieChart, description: 'View and add transactions' },
		{ name: 'Analytics', href: '/analytics', icon: BarChart3, description: 'Advanced insights' },
		{ name: 'Goals', href: '/goals', icon: Target, description: 'Track financial goals' },
		{ name: 'Market Trends', href: '/market-trends', icon: TrendingUp, description: 'Economic insights' },
	];

	const notifications = [
		{
			id: 1,
			title: 'Welcome to Nexus Finance AI!',
			message: 'Your account has been successfully created.',
			time: '2 hours ago',
			type: 'success'
		},
		{
			id: 2,
			title: 'Financial Health Score',
			message: 'Your financial health score is 72. Great job!',
			time: '1 day ago',
			type: 'info'
		},
		{
			id: 3,
			title: 'Spending Alert',
			message: 'Your grocery spending is 15% higher than last month.',
			time: '2 days ago',
			type: 'warning'
		}
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
			{/* Mobile sidebar backdrop */}
			{sidebarOpen && (
				<div className="fixed inset-0 flex z-40 lg:hidden">
					<div 
						className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"
						onClick={() => setSidebarOpen(false)}
					></div>
				</div>
			)}

			{/* Enhanced Sidebar */}
			<div className={`fixed inset-y-0 left-0 flex flex-col z-50 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
				sidebarOpen ? 'translate-x-0 w-80' : '-translate-x-full w-80 lg:translate-x-0 lg:w-80'
			}`}>
				{/* Sidebar Header */}
				<div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
					<div className="flex items-center space-x-3">
						<div className="h-10 w-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
							<Zap className="h-6 w-6" />
						</div>
						<div>
							<h1 className="text-xl font-bold">Nexus Finance AI</h1>
							<p className="text-blue-100 text-sm">Smart Financial Management</p>
						</div>
					</div>
					<button
						onClick={() => setSidebarOpen(false)}
						className="lg:hidden text-white hover:text-blue-200 transition-colors"
						aria-label="Close sidebar"
						title="Close sidebar"
					>
						<X className="h-6 w-6" />
					</button>
				</div>

				{/* Navigation */}
				<nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
					{navigation.map((item) => {
						const Icon = item.icon;
						const isActive = window.location.pathname === item.href;
            
						return (
							<a
								key={item.name}
								href={item.href}
								className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
									isActive
										? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700 shadow-sm'
										: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
								}`}
							>
								<Icon className={`mr-3 h-5 w-5 flex-shrink-0 ${
									isActive ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-500'
								}`} />
								<div className="flex-1">
									<div>{item.name}</div>
									<div className="text-xs text-gray-500 mt-1">{item.description}</div>
								</div>
								{isActive && (
									<div className="h-2 w-2 bg-blue-700 rounded-full"></div>
								)}
							</a>
						);
					})}
				</nav>

				{/* Sidebar Footer */}
				<div className="p-4 border-t border-gray-200 bg-gray-50">
					<div className="space-y-3">
						<div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
							<div className="h-10 w-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
								<User className="h-5 w-5 text-white" />
							</div>
							<div className="flex-1 min-w-0">
								<p className="text-sm font-medium text-gray-900 truncate">{user?.full_name}</p>
								<p className="text-sm text-gray-500 truncate">{user?.email}</p>
							</div>
						</div>
            
						<div className="grid grid-cols-2 gap-2">
							<button 
								className="flex items-center justify-center p-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg transition-colors"
								aria-label="Settings"
								title="Open settings"
							>
								<Settings className="h-4 w-4" />
							</button>
							<button 
								onClick={logout}
								className="flex items-center justify-center p-2 text-gray-600 hover:text-red-600 hover:bg-white rounded-lg transition-colors"
								aria-label="Logout"
								title="Sign out"
							>
								<LogOut className="h-4 w-4" />
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content Area */}
			<div className="lg:ml-80 flex flex-col flex-1">
				{/* Enhanced Top Header */}
				<header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
					<div className="flex items-center justify-between px-6 py-4">
						{/* Left side - Mobile menu and search */}
						<div className="flex items-center space-x-4">
							<button
								onClick={() => setSidebarOpen(true)}
								className="lg:hidden text-gray-500 hover:text-gray-700 transition-colors"
								aria-label="Open menu"
								title="Open sidebar menu"
							>
								<Menu className="h-6 w-6" />
							</button>
              
							<div className="relative flex-1 lg:flex-none lg:w-80">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
								<input
									type="text"
									id="search"
									name="search"
									placeholder="Search transactions, accounts..."
									className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
									aria-label="Search transactions and accounts"
								/>
							</div>
						</div>

						{/* Right side - Notifications and user menu */}
						<div className="flex items-center space-x-4">
							{/* Notifications */}
							<div className="relative">
								<button
									onClick={() => setNotificationsOpen(!notificationsOpen)}
									className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg transition-colors"
									aria-label="Notifications"
									title="View notifications"
								>
									<Bell className="h-5 w-5" />
									<span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
										3
									</span>
								</button>

								{notificationsOpen && (
									<div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
										<div className="px-4 py-2 border-b border-gray-200">
											<h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
										</div>
										<div className="max-h-96 overflow-y-auto">
											{notifications.map((notification) => (
												<div
													key={notification.id}
													className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
												>
													<div className="flex items-start space-x-3">
														<div className={`h-2 w-2 mt-2 rounded-full ${
															notification.type === 'success' ? 'bg-green-500' :
															notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
														}`}></div>
														<div className="flex-1">
															<p className="text-sm font-medium text-gray-900">
																{notification.title}
															</p>
															<p className="text-sm text-gray-600 mt-1">
																{notification.message}
															</p>
															<p className="text-xs text-gray-400 mt-1">
																{notification.time}
															</p>
														</div>
													</div>
												</div>
											))}
										</div>
										<div className="px-4 py-2 border-t border-gray-200">
											<button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
											aria-label="View all notifications"
											title="View all notifications"
											>
												View all notifications
											</button>
										</div>
									</div>
								)}
							</div>

							{/* User menu */}
							<div className="relative">
								<button
									onClick={() => setUserMenuOpen(!userMenuOpen)}
									className="flex items-center space-x-3 p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
									aria-label="User menu"
									title="Open user menu"
								>
									<div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
										{user?.full_name?.charAt(0) || 'U'}
									</div>
									<div className="hidden md:block text-left">
										<p className="text-sm font-medium text-gray-900">{user?.full_name}</p>
										<p className="text-xs text-gray-500">Premium Member</p>
									</div>
									<ChevronDown className="h-4 w-4 text-gray-400" />
								</button>

								{userMenuOpen && (
									<div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50">
										<div className="px-4 py-2 border-b border-gray-200">
											<p className="text-sm font-medium text-gray-900">{user?.full_name}</p>
											<p className="text-xs text-gray-500 truncate">{user?.email}</p>
										</div>
										<a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
											<User className="h-4 w-4 mr-3" />
											Profile
										</a>
										<a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
											<Settings className="h-4 w-4 mr-3" />
											Settings
										</a>
										<div className="border-t border-gray-200"></div>
										<button
											onClick={logout}
											className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
										>
											<LogOut className="h-4 w-4 mr-3" />
											Sign out
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</header>

				{/* Main Content */}
				<main className="flex-1 pb-8">
					<div className="px-6 py-8">
						{children}
					</div>
				</main>

				{/* Enhanced Footer */}
				<footer className="bg-gradient-to-r from-gray-900 to-blue-900 text-white">
					<div className="px-6 py-12">
						<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
							{/* Company Info */}
							<div className="col-span-1 md:col-span-2">
								<div className="flex items-center space-x-3 mb-4">
									<div className="h-10 w-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
										<Zap className="h-6 w-6 text-white" />
									</div>
									<div>
										<h3 className="text-xl font-bold">Nexus Finance AI</h3>
										<p className="text-blue-200">Smart Financial Management for Zimbabwe</p>
									</div>
								</div>
								<p className="text-gray-300 mb-6 max-w-md">
									Empowering individuals and businesses in Zimbabwe with AI-driven financial insights, 
									multi-currency management, and hyperinflation-resilient tools.
								</p>
								<div className="flex space-x-4">
									<a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Visit our GitHub" title="GitHub">
										<Github className="h-5 w-5" />
									</a>
									<a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Connect on LinkedIn" title="LinkedIn">
										<Linkedin className="h-5 w-5" />
									</a>
									<a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Contact us via email" title="Email">
										<Mail className="h-5 w-5" />
									</a>
								</div>
							</div>

							{/* Product Links */}
							<div>
								<h4 className="text-lg font-semibold mb-4">Product</h4>
								<ul className="space-y-2">
									<li><a href="#" className="text-gray-300 hover:text-white transition-colors">Features</a></li>
									<li><a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a></li>
									<li><a href="#" className="text-gray-300 hover:text-white transition-colors">API</a></li>
									<li><a href="#" className="text-gray-300 hover:text-white transition-colors">Integrations</a></li>
								</ul>
							</div>

							{/* Support Links */}
							<div>
								<h4 className="text-lg font-semibold mb-4">Support</h4>
								<ul className="space-y-2">
									<li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
									<li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
									<li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
									<li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
								</ul>
							</div>
						</div>

						{/* Bottom Bar */}
						<div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
							<p className="text-gray-400 text-sm">
								© 2024 Nexus Finance AI. All rights reserved.
							</p>
							<div className="flex items-center space-x-6 mt-4 md:mt-0">
								<span className="flex items-center text-sm text-gray-400">
									<Shield className="h-4 w-4 mr-2" />
									Bank-level security
								</span>
								<span className="flex items-center text-sm text-gray-400">
									<Zap className="h-4 w-4 mr-2" />
									Powered by AI
								</span>
							</div>
						</div>
					</div>
				</footer>
			</div>
		</div>
	);
};

export default EnhancedLayout;
