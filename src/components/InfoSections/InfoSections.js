// src/components/InfoSections/InfoSections.js - FIXED VERSION
import React from 'react';
import { Info, HelpCircle, Bot, Star, ChevronDown, ChevronUp } from 'lucide-react';

const InfoSections = ({ expandedSections, toggleSection, t }) => {
  // Debug log - remove this after fixing
  console.log('InfoSections rendered with:', { expandedSections, toggleSection });

  // Fallback for missing props
  const safeExpandedSections = expandedSections || {
    about: false,
    howToUse: false, 
    mjParams: false,
    tips: false
  };

  const safeToggleSection = toggleSection || (() => {});
  const safeT = t || ((key) => key);

  // Internal CollapsibleSection component to avoid import issues
  const CollapsibleSection = ({ icon: Icon, title, children, isExpanded, onToggle }) => {
    return (
      <div className="bg-white dark:bg-gray-800 backdrop-blur-md rounded-2xl p-4 border border-gray-200 dark:border-gray-600 shadow-sm transition-colors duration-300">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between text-gray-800 dark:text-gray-200 font-medium transition-colors duration-300 hover:text-gray-900 dark:hover:text-white"
        >
          <div className="flex items-center gap-2">
            <Icon size={16} className="text-gray-600 dark:text-gray-400" />
            {title}
          </div>
          {isExpanded ? 
            <ChevronUp size={16} className="text-gray-500 dark:text-gray-400" /> : 
            <ChevronDown size={16} className="text-gray-500 dark:text-gray-400" />
          }
        </button>
        {isExpanded && (
          <div className="mt-3 text-gray-600 dark:text-gray-300 text-sm space-y-2 transition-colors duration-300">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* About App */}
      <CollapsibleSection
        icon={Info}
        title={safeT('aboutApp') || 'About App'}
        isExpanded={safeExpandedSections.about}
        onToggle={() => safeToggleSection('about')}
      >
        <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
          {safeT('aboutContent.line1') || '🎯 Generator Adobe Stock: Membuat prompt yang dioptimalkan untuk fotografi stok berdasarkan kategori trending Juli 2025'}
        </p>
        <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
          {safeT('aboutContent.line2') || '🤖 Integrasi Midjourney: Dukungan penuh V7 dengan parameter terbaru dan format Discord'}
        </p>
        <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
          {safeT('aboutContent.line3') || '🎲 Randomisasi Cerdas: Setiap generasi membuat prompt unik yang tidak pernah berulang'}
        </p>
        <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
          {safeT('aboutContent.line4') || '📊 Berbasis Riset: Dibangun berdasarkan tren pasar Juli 2025 dan data desain dimensional'}
        </p>
      </CollapsibleSection>

      {/* How to Use */}
      <CollapsibleSection
        icon={HelpCircle}
        title={safeT('howToUse') || 'How to Use'}
        isExpanded={safeExpandedSections.howToUse}
        onToggle={() => safeToggleSection('howToUse')}
      >
        <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
          <strong>1.</strong> {safeT('howToContent.step1') || 'Pilih mode output (Standard/Midjourney)'}
        </p>
        <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
          <strong>2.</strong> {safeT('howToContent.step2') || 'Pilih kategori, gaya, dan mood'}
        </p>
        <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
          <strong>3.</strong> {safeT('howToContent.step3') || 'Atur pengaturan lanjutan jika diperlukan'}
        </p>
        <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
          <strong>4a.</strong> <span className="text-blue-600 dark:text-blue-400">{safeT('howToContent.step4a') || 'Buat Prompt - Menggunakan pengaturan ANDA dengan variasi unik'}</span>
        </p>
        <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
          <strong>4b.</strong> <span className="text-indigo-600 dark:text-indigo-400">{safeT('howToContent.step4b') || 'Random Semua Kategori - Randomize semuanya untuk variasi maksimal'}</span>
        </p>
        <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
          <strong>5.</strong> {safeT('howToContent.step5') || 'Copy individual atau export semua'}
        </p>
        <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
          <strong>6.</strong> {safeT('howToContent.step6') || 'Gunakan di tools AI Anda!'}
        </p>
      </CollapsibleSection>

      {/* Midjourney Parameters */}
      <CollapsibleSection
        icon={Bot}
        title={safeT('mjParams') || 'MJ Parameters'}
        isExpanded={safeExpandedSections.mjParams}
        onToggle={() => safeToggleSection('mjParams')}
      >
        <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
          <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">--ar</code> {safeT('mjParamsContent.ar') || 'Rasio aspek (16:9, 1:1, dll.)'}
        </p>
        <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
          <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">--v</code> {safeT('mjParamsContent.v') || 'Versi (7 terbaru, 6.1 default)'}
        </p>
        <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
          <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">--chaos</code> {safeT('mjParamsContent.chaos') || 'Keacakan (0-100)'}
        </p>
        <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
          <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">--s</code> {safeT('mjParamsContent.s') || 'Level stylize (0-1000)'}
        </p>
        <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
          <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">--q</code> {safeT('mjParamsContent.q') || 'Kualitas (.25, .5, 1, 2, 4)'}
        </p>
        <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
          <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">--weird</code> {safeT('mjParamsContent.weird') || 'Estetika tidak biasa (0-3000)'}
        </p>
        <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
          <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">--raw</code> {safeT('mjParamsContent.raw') || 'Output kurang stylized'}
        </p>
        <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
          <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">--tile</code> {safeT('mjParamsContent.tile') || 'Pola seamless'}
        </p>
        <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
          <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">--niji</code> {safeT('mjParamsContent.niji') || 'Model gaya anime'}
        </p>
      </CollapsibleSection>

      {/* Tips */}
      <CollapsibleSection
        icon={Star}
        title={safeT('proTips') || 'Pro Tips'}
        isExpanded={safeExpandedSections.tips}
        onToggle={() => safeToggleSection('tips')}
      >
        <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
          {safeT('tipsContent.line1') || '💡 Update: Diperkaya dengan objek bisnis trending Juli 2025 & background isolated'}
        </p>
        <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
          {safeT('tipsContent.line2') || '🎨 Midjourney: V7 butuh unlock personalisasi, V6.1 adalah default'}
        </p>
        <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
          {safeT('tipsContent.line3') || '📐 Rasio Aspek: 16:9 untuk landscape, 9:16 untuk mobile, 1:1 untuk sosial'}
        </p>
        <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
          {safeT('tipsContent.line4') || '🎲 Setiap generasi unik - tidak ada lagi prompt berulang!'}
        </p>
        <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
          {safeT('tipsContent.line5') || '🎯 Tips: Kombinasikan multiple styles untuk hasil yang lebih kreatif'}
        </p>
        <p className="text-green-600 dark:text-green-400 font-medium transition-colors duration-300">
          {safeT('tipsContent.line6') || '💡 Gunakan Manual Keyword untuk kontrol penuh atas konten yang diinginkan'}
        </p>
        <p className="text-blue-600 dark:text-blue-400 font-medium transition-colors duration-300">
          {safeT('tipsContent.line7') || '🚀 Export semua prompt untuk batch processing di tools AI favorit Anda'}
        </p>
      </CollapsibleSection>
    </div>
  );
};

export default InfoSections;