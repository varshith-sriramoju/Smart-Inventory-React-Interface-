import * as React from 'react';
import { useState, useEffect } from 'react';
import { BarChart3, Upload, Bell, TrendingUp, Users, Package, AlertTriangle, CheckCircle } from 'lucide-react';

// Types
export type User = {
  username: string;
  role: string; // 'manager' | 'admin' | 'analyst' | string
};

export type Stats = {
  totalStores: number;
  totalProducts: number;
  totalUploads: number;
  activeAlerts: number;
  totalSales: number;
  avgPrice: number;
  potentialStockouts: number;
  qualityScore: number;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      setIsAuthenticated(true);
      loadDashboardData();
    } else {
      setLoading(false);
    }
  }, []);

  const loadDashboardData = async () => {
    try {
      setTimeout(() => {
        setStats({
          totalStores: 12,
          totalProducts: 450,
          totalUploads: 23,
          activeAlerts: 5,
          totalSales: 125000,
          avgPrice: 45.99,
          potentialStockouts: 8,
          qualityScore: 94.2
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setLoading(false);
    }
  };

  const handleLogin = (credentials: { username: string; password: string }) => {
    setIsAuthenticated(true);
    setUser({ username: credentials.username, role: 'manager' });
    localStorage.setItem('auth_token', 'demo-token');
    loadDashboardData();
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setStats(null);
    localStorage.removeItem('auth_token');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading SmartInventory...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <Dashboard stats={stats} user={user} onLogout={handleLogout} />;
}

function LoginPage({ onLogin }: { onLogin: (credentials: { username: string; password: string }) => void }) {
  const [credentials, setCredentials] = useState<{ username: string; password: string }>({ username: '', password: '' });
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
      onLogin(credentials);
    } else {
      setError('Please enter both username and password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Smart</span>
                  <span className="block text-blue-600 xl:inline">Inventory</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Intelligent retail forecasting platform powered by machine learning.
                  Optimize your inventory, predict demand, and never run out of stock again.
                </p>

                {/* Features Grid */}
                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <BarChart3 className="h-8 w-8 text-blue-600 mb-2" />
                    <h3 className="font-semibold text-gray-900">Demand Forecasting</h3>
                    <p className="text-sm text-gray-600">ML-powered predictions</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <Upload className="h-8 w-8 text-green-600 mb-2" />
                    <h3 className="font-semibold text-gray-900">Easy Data Import</h3>
                    <p className="text-sm text-gray-600">CSV upload & validation</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <Bell className="h-8 w-8 text-yellow-600 mb-2" />
                    <h3 className="font-semibold text-gray-900">Smart Alerts</h3>
                    <p className="text-sm text-gray-600">Stockout notifications</p>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>

        {/* Login Form */}
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center p-8">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
                <p className="text-gray-600">Sign in to your account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your username"
                    value={credentials.username}
                    onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  />
                </div>

                {error && (
                  <div className="text-red-600 text-sm">{error}</div>
                )}

                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Sign In
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  Demo: Use any username/password to login
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ stats, user, onLogout }: { stats: Stats | null; user: User | null; onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'upload' | 'alerts'>('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-gray-900">
                  <BarChart3 className="inline h-6 w-6 text-blue-600 mr-2" />
                  SmartInventory
                </h1>
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'overview'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <TrendingUp className="inline h-4 w-4 mr-1" />
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'upload'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Upload className="inline h-4 w-4 mr-1" />
                  Data Upload
                </button>
                <button
                  onClick={() => setActiveTab('alerts')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'alerts'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Bell className="inline h-4 w-4 mr-1" />
                  Alerts
                      {stats?.activeAlerts && stats.activeAlerts > 0 ? (
                    <span className="ml-1 bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">
                          {stats?.activeAlerts ?? 0}
                    </span>
                      ) : null}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-700">
                <Users className="inline h-4 w-4 mr-1" />
                {user?.username} ({user?.role})
              </div>
              <button
                onClick={onLogout}
                className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium text-gray-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {activeTab === 'overview' && <OverviewTab stats={stats} />}
        {activeTab === 'upload' && <UploadTab />}
           {activeTab === 'alerts' && <AlertsTab />}
      </main>
    </div>
  );
}

 function OverviewTab({ stats }: { stats: Stats | null }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-600">Monitor your inventory performance and forecasts</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Stores</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats?.totalStores}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Products</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats?.totalProducts}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Potential Stockouts</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats?.potentialStockouts}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Data Quality</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats?.qualityScore}%</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Sales Trends</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            <p className="text-gray-500">Chart.js visualization would appear here</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Forecast Accuracy</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            <p className="text-gray-500">Accuracy metrics visualization</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function UploadTab() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type !== 'text/csv') {
      alert('Please upload a CSV file');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          alert('File uploaded successfully!');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Data Upload</h2>
        <p className="text-gray-600">Upload your historical sales data in CSV format</p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">CSV Format Requirements</h3>
          <p className="text-sm text-gray-600 mb-4">
            Your CSV file should contain the following columns:
          </p>
          <div className="bg-gray-50 p-4 rounded-md">
            <code className="text-sm">
              date, store_id, sku_id, sales, price, on_hand, promotions_flag
            </code>
          </div>
        </div>

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-blue-400 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-900 mb-2">
            Drop your CSV file here
          </p>
          <p className="text-sm text-gray-600 mb-4">
            or click to browse files
          </p>
          <input
            type="file"
            accept=".csv"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => e.target.files && e.target.files[0] && handleFile(e.target.files[0])}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer transition-colors"
          >
            Choose File
          </label>
        </div>

        {uploading && (
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AlertsTab() {
  const alerts = [
    {
      id: 1,
      type: 'stockout_risk',
      priority: 'high',
      store: 'STORE001',
      product: 'SKU001',
      message: 'Potential stockout in 3 days',
      date: '2024-01-15'
    },
    {
      id: 2,
      type: 'overstock_risk',
      priority: 'medium',
      store: 'STORE002',
      product: 'SKU002',
      message: 'Excess inventory detected',
      date: '2024-01-14'
    }
  ];

  const getPriorityColor = (priority: 'high' | 'medium' | 'low' | string) => {
    switch (priority) {
      case 'high': return 'text-red-800 bg-red-100';
      case 'medium': return 'text-yellow-800 bg-yellow-100';
      case 'low': return 'text-green-800 bg-green-100';
      default: return 'text-gray-800 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Inventory Alerts</h2>
        <p className="text-gray-600">Monitor potential stockouts and inventory issues</p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Active Alerts</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {alerts.map((alert) => (
            <div key={alert.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {alert.store} - {alert.product}
                    </p>
                    <p className="text-sm text-gray-600">{alert.message}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(alert.priority)}`}>
                    {alert.priority}
                  </span>
                  <span className="text-sm text-gray-500">{alert.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
