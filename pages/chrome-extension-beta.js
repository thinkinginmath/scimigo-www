import Layout from '../components/Layout'
import { useState } from 'react'

export default function ChromeExtensionBeta() {
  const [downloadCount, setDownloadCount] = useState(0)

  const handleDownload = () => {
    setDownloadCount(count => count + 1)
    // Track download for analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'download', {
        event_category: 'Chrome Extension',
        event_label: 'Beta Testing'
      })
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              🧪 Beta Testing
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              SciMigo Chrome Extension
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get instant AI tutoring on any webpage! Turn math equations and code snippets into step-by-step learning opportunities.
            </p>
          </div>

          {/* Beta Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-amber-800">Beta Testing Version</h3>
                <p className="mt-1 text-sm text-amber-700">
                  This is a pre-release version for testing purposes. Please report any bugs or issues you encounter.
                </p>
              </div>
            </div>
          </div>

          {/* Download Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Download & Install</h2>
              <p className="text-gray-600 mb-6">
                Help us test the future of AI-powered learning!
              </p>
              
              <a
                href="/downloads/scimigo-extension-beta.zip"
                onClick={handleDownload}
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                download
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-4-4m4 4l4-4m5-4V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-4"></path>
                </svg>
                Download Beta Extension
              </a>
              
              {downloadCount > 0 && (
                <p className="mt-3 text-sm text-gray-500">
                  Downloaded {downloadCount} times
                </p>
              )}
            </div>
          </div>

          {/* Installation Instructions */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Installation Instructions</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">Download & Extract</h3>
                  <p className="text-gray-600">Download the ZIP file and extract it to a folder on your computer.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">Open Chrome Extensions</h3>
                  <p className="text-gray-600">
                    Go to <code className="bg-gray-100 px-2 py-1 rounded text-sm">chrome://extensions/</code> in your Chrome browser.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">Enable Developer Mode</h3>
                  <p className="text-gray-600">Turn on "Developer mode" using the toggle in the top-right corner.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                  4
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">Load Extension</h3>
                  <p className="text-gray-600">Click "Load unpacked" and select the extracted folder.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                  5
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">Pin to Toolbar</h3>
                  <p className="text-gray-600">Pin the SciMigo extension to your toolbar for easy access.</p>
                </div>
              </div>
            </div>
          </div>

          {/* How to Test */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Test</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">📚 Math Websites</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Khan Academy</li>
                  <li>• Stack Overflow</li>
                  <li>• Wikipedia math articles</li>
                  <li>• Your homework assignments</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-3">💻 CS Websites</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• LeetCode problems</li>
                  <li>• GitHub code repositories</li>
                  <li>• Algorithm tutorials</li>
                  <li>• Programming documentation</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 text-sm">
                <strong>💡 Pro tip:</strong> Highlight any math equation, code snippet, or question, then click the SciMigo button that appears!
              </p>
            </div>
          </div>

          {/* Feedback Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Share Your Feedback</h2>
            <p className="text-gray-600 mb-6">
              Your feedback is crucial for improving SciMigo. Please let us know about:
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  ✓
                </div>
                <h3 className="font-medium text-gray-900">What Works</h3>
                <p className="text-sm text-gray-600">Features you love and find useful</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  ⚠
                </div>
                <h3 className="font-medium text-gray-900">Bugs & Issues</h3>
                <p className="text-sm text-gray-600">Errors, crashes, or unexpected behavior</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  💡
                </div>
                <h3 className="font-medium text-gray-900">Ideas</h3>
                <p className="text-sm text-gray-600">Suggestions for new features</p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-gray-600 mb-4">Send feedback directly to:</p>
              <a
                href="mailto:support@scimigo.com?subject=Chrome Extension Beta Feedback"
                className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                support@scimigo.com
              </a>
            </div>
          </div>

          {/* Version Info */}
          <div className="mt-12 text-center text-gray-500 text-sm">
            <p>Beta Version 0.9.0 • Last Updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
