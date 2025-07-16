// src/components/SimpleErrorBoundary.js
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 px-4"
      role="alert"
    >
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center border border-red-200">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Something went wrong
        </h1>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          We encountered an unexpected error. Please try refreshing the page.
        </p>
        
        <div className="space-y-3">
          <button
            onClick={resetErrorBoundary}
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Try Again</span>
          </button>
          
          <button
            onClick={() => window.location.href = '/adobe-stock-analysis-2025'}
            className="w-full text-gray-500 hover:text-gray-700 transition-colors focus:outline-none focus:ring-4 focus:ring-gray-200 py-2 px-4 rounded text-sm"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

const SimpleErrorBoundary = ({ children }) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        // Log error untuk debugging
        console.error('Error caught by boundary:', error, errorInfo);
        
        // Report to analytics jika ada
        if (typeof window.gtag !== 'undefined') {
          window.gtag('event', 'exception', {
            description: error.toString(),
            fatal: false
          });
        }
      }}
      onReset={() => {
        // Clear any error state jika perlu
        window.location.reload();
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default SimpleErrorBoundary;