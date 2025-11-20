import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Download, Upload, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { transactionsAPI, accountsAPI, mlAPI } from '../services/api';
import SharedLayout from './SharedLayout';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: '',
    account_id: '',
    currency: 'USD'
  });
  const [predictedCategory, setPredictedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [importError, setImportError] = useState('');
  const [importSuccess, setImportSuccess] = useState('');
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [transactionsRes, accountsRes] = await Promise.all([
        transactionsAPI.getAll(),
        accountsAPI.getAll()
      ]);
      setTransactions(transactionsRes.data);
      setAccounts(accountsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    try {
      await transactionsAPI.create({
        ...newTransaction,
        amount: parseFloat(newTransaction.amount)
      });
      showNotification(`Transaction "${newTransaction.description}" added successfully!`, 'success');
      setShowAddModal(false);
      setNewTransaction({
        description: '',
        amount: '',
        account_id: '',
        currency: 'USD'
      });
      setPredictedCategory(null);
      fetchData(); // Refresh the list
    } catch (error) {
      console.error('Error adding transaction:', error);
      showNotification('Failed to add transaction', 'error');
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const predictCategory = async (description) => {
    if (description.length > 3) {
      try {
        const response = await mlAPI.predictCategory(description, newTransaction.amount);
        setPredictedCategory(response.data);
      } catch (error) {
        console.error('Error predicting category:', error);
      }
    }
  };

  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter transactions based on search and category
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || transaction.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const categories = [...new Set(transactions.map(t => t.category))].filter(Boolean);

  // Export transactions to CSV
  const handleExport = () => {
    try {
      // Prepare CSV content
      const headers = ['Date', 'Description', 'Category', 'Amount', 'Currency', 'Account'];
      const csvContent = [
        headers.join(','),
        ...filteredTransactions.map(t => {
          const account = accounts.find(acc => acc.id === t.account_id);
          return [
            new Date(t.transaction_date).toISOString().split('T')[0],
            `"${t.description.replace(/"/g, '""')}"`,
            t.category || '',
            t.amount,
            t.currency,
            `"${account?.name || ''}"`
          ].join(',');
        })
      ].join('\n');

      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting transactions:', error);
      alert('Failed to export transactions. Please try again.');
    }
  };

  // Handle file selection for import
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
        setImportError('Please select a valid CSV file');
        return;
      }
      setImportFile(file);
      setImportError('');
    }
  };

  // Import transactions from CSV
  const handleImport = async () => {
    if (!importFile) {
      setImportError('Please select a file');
      return;
    }

    try {
      const text = await importFile.text();
      const lines = text.split('\n').filter(line => line.trim());
      
      if (lines.length < 2) {
        setImportError('CSV file is empty or invalid');
        return;
      }

      // Skip header row
      const dataLines = lines.slice(1);
      let imported = 0;
      let failed = 0;

      for (const line of dataLines) {
        try {
          // Parse CSV line (handle quoted fields)
          const regex = /(".*?"|[^",]+)(?=\s*,|\s*$)/g;
          const fields = [];
          let match;
          while ((match = regex.exec(line)) !== null) {
            fields.push(match[1].replace(/^"|"$/g, '').replace(/""/g, '"'));
          }

          if (fields.length < 4) continue;

          const [date, description, category, amount, currency] = fields;
          
          // Find account by currency or use first account
          const account = accounts.find(a => a.currency === (currency || 'USD')) || accounts[0];
          
          if (!account) {
            failed++;
            continue;
          }

          await transactionsAPI.create({
            description: description.trim(),
            amount: parseFloat(amount),
            account_id: account.id,
            currency: currency || 'USD',
            transaction_date: date
          });
          
          imported++;
        } catch (err) {
          failed++;
          console.error('Error importing line:', line, err);
        }
      }

      setImportSuccess(`Successfully imported ${imported} transaction(s). ${failed > 0 ? `Failed: ${failed}` : ''}`);
      setShowImportModal(false);
      setImportFile(null);
      fetchData(); // Refresh the list
      
      setTimeout(() => setImportSuccess(''), 5000);
    } catch (error) {
      console.error('Error importing transactions:', error);
      setImportError('Failed to import transactions. Please check the file format.');
    }
  };

  if (loading) {
    return (
      <SharedLayout activeNav="transactions">
        <div className="space-y-4">
        <div className="skeleton-text h-8 w-48"></div>
        <div className="skeleton-chart h-64"></div>
      </div>
      </SharedLayout>
    );
  }

  return (
    <SharedLayout activeNav="transactions">
      <div className="space-y-6">
        {/* Notification */}
        {notification.show && (
          <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 animate-fadeIn ${
            notification.type === 'success' ? 'bg-green-500 text-white' :
            notification.type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
          }`}>
            <div className="flex items-center space-x-2">
              <span className="font-medium">{notification.message}</span>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-1">Transactions</h1>
            <p className="text-blue-200 font-medium">Manage your income and expenses</p>
          </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleExport}
            className="btn btn-outline"
            title="Export transactions to CSV"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button 
            onClick={() => setShowImportModal(true)}
            className="btn btn-outline"
            title="Import transactions from CSV"
          >
            <Upload className="h-4 w-4 mr-2" />
            Import
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Transaction
          </button>
        </div>
      </div>

      {/* Success Message */}
      {importSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{importSuccess}</span>
        </div>
      )}

      {/* Filters */}
      <div className="card">
        <div className="card-body">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input pl-10"
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="form-select"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              <button className="btn btn-outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="card">
        <div className="card-body p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Account
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                          transaction.amount < 0 ? 'bg-red-100' : 'bg-green-100'
                        }`}>
                          {transaction.amount < 0 ? (
                            <ArrowDownRight className="h-4 w-4 text-red-600" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4 text-green-600" />
                          )}
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {transaction.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                        {transaction.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {accounts.find(acc => acc.id === transaction.account_id)?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(transaction.transaction_date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      <span className={`font-medium ${
                        transaction.amount < 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {formatCurrency(transaction.amount, transaction.currency)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Plus className="h-12 w-12 mx-auto" />
              </div>
              <p className="text-gray-500 mb-2">
                {transactions.length === 0 ? 'No transactions yet' : 'No transactions match your filters'}
              </p>
              {transactions.length === 0 && (
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="btn btn-primary"
                >
                  Add Your First Transaction
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Transaction</h3>
              
              <form onSubmit={handleAddTransaction} className="space-y-4">
                <div>
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    required
                    value={newTransaction.description}
                    onChange={(e) => {
                      setNewTransaction({...newTransaction, description: e.target.value});
                      predictCategory(e.target.value);
                    }}
                    className="form-input"
                    placeholder="e.g., OK Zimbabwe Groceries"
                  />
                  {predictedCategory && (
                    <div className="mt-2 text-sm text-gray-600">
                      Predicted category: <span className="font-medium capitalize">{predictedCategory.category}</span>
                      {predictedCategory.confidence && (
                        <span className="text-gray-500"> ({(predictedCategory.confidence * 100).toFixed(1)}% confidence)</span>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="form-label">Amount</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                    className="form-input"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="form-label">Account</label>
                  <select
                    required
                    value={newTransaction.account_id}
                    onChange={(e) => setNewTransaction({...newTransaction, account_id: e.target.value})}
                    className="form-select"
                  >
                    <option value="">Select an account</option>
                    {accounts.map(account => (
                      <option key={account.id} value={account.id}>
                        {account.name} ({account.currency})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label">Currency</label>
                  <select
                    required
                    value={newTransaction.currency}
                    onChange={(e) => setNewTransaction({...newTransaction, currency: e.target.value})}
                    className="form-select"
                  >
                    <option value="USD">USD</option>
                    <option value="ZIG">ZiG</option>
                    <option value="ZAR">ZAR</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Add Transaction
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Import Transactions from CSV</h3>
              
              {importError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded">
                  {importError}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="form-label">Select CSV File</label>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileSelect}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                  {importFile && (
                    <p className="mt-2 text-sm text-gray-600">
                      Selected: {importFile.name}
                    </p>
                  )}
                </div>

                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">CSV Format:</h4>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>Required columns: Date, Description, Category, Amount, Currency, Account</p>
                    <p className="font-mono bg-white p-2 rounded">
                      2024-10-26,"OK Zimbabwe",groceries,-50,USD,"Bank USD"
                    </p>
                    <p className="text-gray-500">• Date format: YYYY-MM-DD</p>
                    <p className="text-gray-500">• Negative amounts for expenses</p>
                    <p className="text-gray-500">• Wrap text fields in quotes</p>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowImportModal(false);
                      setImportFile(null);
                      setImportError('');
                    }}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleImport}
                    disabled={!importFile}
                    className={`btn btn-primary ${!importFile ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Import Transactions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </SharedLayout>
  );
};

export default Transactions;
