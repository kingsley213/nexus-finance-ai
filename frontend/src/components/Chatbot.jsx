import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, Minimize2, MessageCircle } from 'lucide-react';

const Chatbot = ({ initialOpen = false, onClose = null }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [isMinimized, setIsMinimized] = useState(false);

  // Sync with external control
  useEffect(() => {
    setIsOpen(initialOpen);
  }, [initialOpen]);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Nexus Finance AI assistant. I can help you with financial advice, transaction categorization, market trends in Zimbabwe, and answer questions about your finances. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const financialKnowledge = {
    greetings: [
      "Hello! How can I assist with your finances today?",
      "Hi there! Ready to optimize your financial health?",
      "Welcome back! What financial questions can I help with?"
    ],
    transactions: {
      'how to categorize': "I use machine learning to automatically categorize your transactions based on Zimbabwean vendor patterns. You can also manually adjust categories if needed.",
      'add transaction': "Go to the Transactions page and click 'Add Transaction'. I'll automatically suggest the category based on the description.",
      'edit category': "You can edit transaction categories by clicking on the transaction and selecting a new category from the dropdown."
    },
    accounts: {
      'multi currency': "Nexus Finance supports USD, ZiG, and ZAR. You can track balances in all currencies and see your total net worth.",
      'add account': "Visit the Accounts page and click 'Add Account' to create new bank, mobile money, or cash accounts.",
      'balance tracking': "Your balances update automatically when you add transactions. You can see all account balances on your dashboard."
    },
    zimbabwe: {
      'inflation': "Zimbabwe's inflation requires careful financial planning. I adjust cash flow forecasts with configurable inflation rates to give you realistic projections.",
      'ecocash': "I recognize EcoCash transactions automatically and categorize them appropriately. You can track mobile money separately from bank accounts.",
      'exchange rates': "While I don't currently pull live exchange rates, you can manually adjust currency conversions in future versions.",
      'informal sector': "I track informal sector spending patterns and provide insights specific to Zimbabwe's economic context."
    },
    analytics: {
      'spending insights': "I analyze your spending patterns across categories and merchants, showing trends and helping identify areas for optimization.",
      'cash flow forecast': "My forecasting considers your spending history and allows you to adjust for expected inflation rates.",
      'financial health': "I calculate a comprehensive health score based on savings rate, emergency fund, spending diversity, and goal progress."
    },
    goals: {
      'set goals': "You can set financial goals with target amounts, deadlines, and priorities. I'll track your progress and suggest ways to stay on target.",
      'emergency fund': "I recommend building an emergency fund covering 3-6 months of expenses, especially important in Zimbabwe's volatile economy.",
      'savings tips': "Consider setting aside 10-20% of income, automating savings, and tracking progress toward specific goals."
    },
    market: {
      'trends': "Check the Market Trends page for current economic indicators and news relevant to Zimbabwe.",
      'investing': "In Zimbabwe's context, consider diversified approaches including formal investments and informal opportunities.",
      'currency advice': "Maintaining balances in stable currencies like USD while having some local currency for daily expenses is often wise."
    }
  };

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      let response = "I understand you're asking about financial matters. Could you be more specific? I can help with transactions, accounts, analytics, goals, or Zimbabwe-specific financial questions.";

      // Greetings
      if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        response = financialKnowledge.greetings[Math.floor(Math.random() * financialKnowledge.greetings.length)];
      }
      // Transactions
      else if (message.includes('categor') || message.includes('transaction')) {
        if (message.includes('how') || message.includes('work')) {
          response = financialKnowledge.transactions['how to categorize'];
        } else if (message.includes('add')) {
          response = financialKnowledge.transactions['add transaction'];
        } else if (message.includes('edit')) {
          response = financialKnowledge.transactions['edit category'];
        }
      }
      // Accounts
      else if (message.includes('account') || message.includes('balance')) {
        if (message.includes('currenc') || message.includes('multi')) {
          response = financialKnowledge.accounts['multi currency'];
        } else if (message.includes('add') || message.includes('create')) {
          response = financialKnowledge.accounts['add account'];
        } else {
          response = financialKnowledge.accounts['balance tracking'];
        }
      }
      // Zimbabwe specific
      else if (message.includes('zimbab') || message.includes('inflation') || message.includes('ecocash')) {
        if (message.includes('inflation')) {
          response = financialKnowledge.zimbabwe.inflation;
        } else if (message.includes('ecocash')) {
          response = financialKnowledge.zimbabwe.ecocash;
        } else if (message.includes('exchange') || message.includes('rate')) {
          response = financialKnowledge.zimbabwe['exchange rates'];
        } else if (message.includes('informal')) {
          response = financialKnowledge.zimbabwe['informal sector'];
        }
      }
      // Analytics
      else if (message.includes('analytics') || message.includes('insight') || message.includes('spending')) {
        if (message.includes('spending') || message.includes('insight')) {
          response = financialKnowledge.analytics['spending insights'];
        } else if (message.includes('forecast') || message.includes('cash flow')) {
          response = financialKnowledge.analytics['cash flow forecast'];
        } else if (message.includes('health') || message.includes('score')) {
          response = financialKnowledge.analytics['financial health'];
        }
      }
      // Goals
      else if (message.includes('goal') || message.includes('save') || message.includes('target')) {
        if (message.includes('set') || message.includes('create')) {
          response = financialKnowledge.goals['set goals'];
        } else if (message.includes('emergency') || message.includes('fund')) {
          response = financialKnowledge.goals['emergency fund'];
        } else {
          response = financialKnowledge.goals['savings tips'];
        }
      }
      // Market trends
      else if (message.includes('market') || message.includes('trend') || message.includes('invest')) {
        if (message.includes('trend')) {
          response = financialKnowledge.market.trends;
        } else if (message.includes('invest')) {
          response = financialKnowledge.market.investing;
        } else if (message.includes('currenc') || message.includes('advice')) {
          response = financialKnowledge.market['currency advice'];
        }
      }
      // Help
      else if (message.includes('help') || message.includes('what can you do')) {
        response = "I can help you with: • Transaction categorization • Account management • Spending analytics • Financial goals • Cash flow forecasting • Zimbabwe-specific financial advice • Market trends • Financial health scoring • Inflation-aware planning • Multi-currency tracking";
      }

      const botMessage = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    getBotResponse(inputMessage);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 flex items-center justify-center z-50"
        aria-label="Open chat assistant"
        title="Open chat assistant"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Open chat assistant</span>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'h-14' : 'h-96'
    }`}>
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 w-80 h-full flex flex-col">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <span className="font-semibold">Finance Assistant</span>
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:text-blue-200 transition-colors"
            >
              <Minimize2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                if (onClose) onClose();
              }}
              className="text-white hover:text-blue-200 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                      }`}
                    >
                      <div className="text-sm">{message.text}</div>
                      <div
                        className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-lg rounded-bl-none p-3">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about finances, transactions, or Zimbabwe market..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
