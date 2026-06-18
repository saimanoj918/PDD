package com.corescheduler.app

import android.annotation.SuppressLint
import android.os.Bundle
import android.webkit.CookieManager
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        webView = findViewById(R.id.webview)

        // Enable Javascript and DOM Storage for Next.js to work properly
        val webSettings: WebSettings = webView.settings
        webSettings.javaScriptEnabled = true
        webSettings.domStorageEnabled = true

        // Enable cookies and third party cookies inside WebView
        val cookieManager = CookieManager.getInstance()
        cookieManager.setAcceptCookie(true)
        cookieManager.setAcceptThirdPartyCookies(webView, true)
        
        // Force links and redirects to open in the WebView instead of the device browser
        webView.webViewClient = WebViewClient()
        webView.webChromeClient = WebChromeClient()

        // The live Render URL for your deployed web application
        val appUrl = "https://pdd-main-oyhb.onrender.com"
        
        webView.loadUrl(appUrl)
    }

    // Handle back button press to navigate back within the WebView
    @Deprecated("Deprecated in Java")
    override fun onBackPressed() {
        val currentUrl = webView.url ?: ""
        val appUrl = "https://pdd-main-oyhb.onrender.com"
        
        val isDashboardHome = currentUrl.endsWith("/dashboard") || currentUrl.endsWith("/dashboard/")
        val isOnboardingOrLogin = currentUrl == appUrl || 
                                  currentUrl.endsWith("/login") || 
                                  currentUrl.endsWith("/register") || 
                                  currentUrl.endsWith("/")

        if (webView.canGoBack() && !isDashboardHome && !isOnboardingOrLogin) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
    }

    override fun onPause() {
        super.onPause()
        CookieManager.getInstance().flush()
    }

    override fun onDestroy() {
        CookieManager.getInstance().flush()
        super.onDestroy()
    }
}
