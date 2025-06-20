// src/components/UI/AdSense.js
import React, { useEffect, useRef, useState } from 'react';

const AdSense = ({ 
  adSlot = "3408792159", 
  adFormat = "auto",
  style = {},
  className = ""
}) => {
  const adRef = useRef(null);
  const [adStatus, setAdStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    console.log('🚀 AdSense Component Started:', { adSlot, adFormat });

    // Jika masih placeholder, jangan load iklan
    if (adSlot === "PLACEHOLDER" || adSlot.includes("TEST") || adSlot.includes("YOUR_AD")) {
      setAdStatus('placeholder');
      return;
    }

    // Delay untuk memastikan DOM dan CSS ready
    const timer = setTimeout(() => {
      try {
        // 1. Cek apakah script AdSense sudah load
        if (typeof window.adsbygoogle === 'undefined') {
          console.error('❌ Script AdSense belum load');
          setAdStatus('error');
          setErrorMessage('Script AdSense belum load. Cek di public/index.html');
          return;
        }

        // 2. Cek ukuran container
        if (adRef.current) {
          const rect = adRef.current.getBoundingClientRect();
          console.log('📏 Container size:', { width: rect.width, height: rect.height });

          if (rect.width === 0) {
            console.error('❌ Container width = 0');
            setAdStatus('error');
            setErrorMessage('Container tidak memiliki lebar. Ada masalah CSS.');
            return;
          }
        }

        // 3. Push iklan ke AdSense
        console.log('📢 Pushing ad to AdSense...');
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        
        setAdStatus('loaded');
        console.log('✅ Ad berhasil di-push ke AdSense');

      } catch (error) {
        console.error('❌ AdSense Error:', error);
        setAdStatus('error');
        setErrorMessage(`Error: ${error.message}`);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [adFormat, adSlot]);

  // Jika masih placeholder
  if (adStatus === 'placeholder') {
    return (
      <div className={`bg-yellow-50 border-2 border-dashed border-yellow-300 rounded-lg p-6 text-center ${className}`}>
        <div className="max-w-md mx-auto">
          <div className="text-4xl mb-3">📢</div>
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            AdSense Placeholder
          </h3>
          <p className="text-sm text-yellow-700 mb-3">
            Ganti <code className="bg-yellow-200 px-2 py-1 rounded text-xs">adSlot="PLACEHOLDER"</code> dengan ID iklan asli dari Google AdSense Dashboard.
          </p>
          <div className="bg-yellow-100 p-3 rounded text-xs text-left">
            <strong>Langkah-langkah:</strong><br/>
            1. Login ke Google AdSense<br/>
            2. Buat unit iklan baru<br/>
            3. Copy ad slot ID (contoh: "1234567890")<br/>
            4. Ganti PLACEHOLDER dengan ID tersebut
          </div>
        </div>
      </div>
    );
  }

  // Jika ada error
  if (adStatus === 'error') {
    return (
      <div className={`bg-red-50 border-2 border-red-300 rounded-lg p-6 text-center ${className}`}>
        <div className="max-w-md mx-auto">
          <div className="text-4xl mb-3">❌</div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            AdSense Error
          </h3>
          <p className="text-sm text-red-700 mb-3">
            {errorMessage}
          </p>
          <div className="bg-red-100 p-3 rounded text-xs text-left">
            <strong>Troubleshooting:</strong><br/>
            • Cek console browser (F12)<br/>
            • Pastikan script AdSense di index.html<br/>
            • Verifikasi ad slot ID valid<br/>
            • Test tanpa ad blocker
          </div>
        </div>
      </div>
    );
  }

  // Container iklan asli
  return (
    <div 
      ref={adRef}
      className={`adsense-wrapper ${className}`}
      style={{
        width: '100%',
        maxWidth: '728px',
        margin: '0 auto',
        minHeight: '90px',
        display: 'block',
        ...style
      }}
    >
      {/* Status loading */}
      {adStatus === 'loading' && (
        <div className="bg-blue-50 border border-blue-200 rounded p-4 text-center text-blue-600">
          <div className="animate-pulse">⏳ Loading iklan...</div>
        </div>
      )}

      {/* AdSense ins tag */}
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
          height: 'auto'
        }}
        data-ad-client="ca-pub-9668296972373669"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />

      {/* Debug info (hanya di development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-2 text-xs text-gray-500 bg-gray-100 p-2 rounded">
          <strong>Debug:</strong> AdSlot: {adSlot} | Format: {adFormat} | Status: {adStatus}
        </div>
      )}
    </div>
  );
};

export default AdSense;