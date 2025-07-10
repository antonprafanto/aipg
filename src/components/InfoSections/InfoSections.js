// src/components/InfoSections/InfoSections.js - COMPLETE FIXED VERSION
// ✅ PRIORITY 2: HIGH FIX - Performance issues and re-render loops resolved

import React, { memo, useMemo } from "react";
import {
  Info,
  HelpCircle,
  Bot,
  Star,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const InfoSections = memo(
  ({ expandedSections, toggleSection, t, language }) => {
    // ✅ REMOVED: Debug console.log that caused spam
    // console.log('InfoSections rendered with:', { expandedSections, toggleSection });

    // ✅ FIX: Memoize fallback values to prevent recreating objects
    const safeExpandedSections = useMemo(
      () =>
        expandedSections || {
          about: false,
          howToUse: false,
          mjParams: false,
          tips: false,
        },
      [expandedSections]
    );

    const safeToggleSection = useMemo(
      () => toggleSection || (() => {}),
      [toggleSection]
    );
    const safeT = useMemo(() => t || ((key) => key), [t]);

    // ✅ FIX: Memoize CollapsibleSection to prevent recreating component
    const CollapsibleSection = useMemo(
      () =>
        ({ icon: Icon, title, children, isExpanded, onToggle }) =>
          (
            <div className="bg-white dark:bg-gray-800 backdrop-blur-md rounded-2xl p-4 border border-gray-200 dark:border-gray-600 shadow-sm transition-colors duration-300">
              <button
                onClick={onToggle}
                className="w-full flex items-center justify-between text-gray-800 dark:text-gray-200 font-medium transition-colors duration-300 hover:text-gray-900 dark:hover:text-white"
              >
                <div className="flex items-center gap-2">
                  <Icon
                    size={16}
                    className="text-gray-600 dark:text-gray-400"
                  />
                  {title}
                </div>
                {isExpanded ? (
                  <ChevronUp
                    size={16}
                    className="text-gray-500 dark:text-gray-400"
                  />
                ) : (
                  <ChevronDown
                    size={16}
                    className="text-gray-500 dark:text-gray-400"
                  />
                )}
              </button>
              {isExpanded && (
                <div className="mt-3 text-gray-600 dark:text-gray-300 text-sm space-y-2 transition-colors duration-300">
                  {children}
                </div>
              )}
            </div>
          ),
      []
    );

    // ✅ FIX: Memoize translation texts to prevent recalculation
    const translations = useMemo(
      () => ({
        aboutApp: safeT("aboutApp") || "About App",
        howToUse: safeT("howToUse") || "How to Use",
        mjParams: safeT("mjParams") || "MJ Parameters",
        proTips: safeT("proTips") || "Pro Tips",

        // About content with research-based information
        aboutContent: {
          line1:
            safeT("aboutContent.line1") ||
            "🎯 Research-Based: Built on Adobe Stock market analysis showing $4.65B to $8.54B growth (2024-2033)",
          line2:
            safeT("aboutContent.line2") ||
            "🤖 AI-Optimized: 47.85% of Adobe Stock is now AI-generated - we're ahead of the curve",
          line3:
            safeT("aboutContent.line3") ||
            "💰 ROI-Focused: 6 categories selected based on proven commercial performance data",
          line4:
            safeT("aboutContent.line4") ||
            "📊 Evergreen Strategy: Focus on sustainable, non-seasonal content with consistent sales",
          line5:
            safeT("aboutContent.line5") ||
            "🚫 Zero Living Creatures: Compliant with no-people, no-animals, no-plants policy",
          line6:
            safeT("aboutContent.line6") ||
            "✨ Quality Standards: Meets Adobe's technical requirements (4-100MP, sRGB, isolated)",
          line7:
            safeT("aboutContent.line7") ||
            "🔍 SEO Optimized: High-performing keywords and metadata structures included",
          line8:
            safeT("aboutContent.line8") ||
            "💼 Commercial Grade: Ready for enhanced licensing and business applications",
        },

        // How to use content
        howToContent: {
          step1:
            safeT("howToContent.step1") ||
            "Choose output mode (Standard/Midjourney)",
          step2:
            safeT("howToContent.step2") || "Select category, style, and mood",
          step3:
            safeT("howToContent.step3") || "Adjust advanced settings if needed",
          step4a:
            safeT("howToContent.step4a") ||
            "Generate Prompts - Uses YOUR selected settings with unique variations",
          step4b:
            safeT("howToContent.step4b") ||
            "Random All Categories - Completely randomizes everything for maximum variety",
          step5: safeT("howToContent.step5") || "Copy individual or export all",
          step6: safeT("howToContent.step6") || "Use in your AI tools!",
        },

        // MJ Params content
        mjParamsContent: {
          ar: safeT("mjParamsContent.ar") || "Aspect ratio (16:9, 1:1, etc.)",
          quality:
            safeT("mjParamsContent.quality") ||
            "Render quality (.25, .5, 1, 2)",
          chaos: safeT("mjParamsContent.chaos") || "Variation level (0-100)",
          stylize:
            safeT("mjParamsContent.stylize") ||
            "Artistic style intensity (0-1000)",
          weird:
            safeT("mjParamsContent.weird") || "Creative exploration (0-3000)",
          no: safeT("mjParamsContent.no") || "Elements to exclude",
        },

        // Tips content with 2025 updates
        tipsContent: {
          line1:
            safeT("tipsContent.line1") ||
            "💡 Update: Enhanced with July 2025 trending business objects & isolated backgrounds",
          line2:
            safeT("tipsContent.line2") ||
            "🎨 Midjourney: V7 requires unlock for personalization, V6.1 is default",
          line3:
            safeT("tipsContent.line3") ||
            "📐 Aspect Ratios: 16:9 for landscape, 9:16 for mobile, 1:1 for social",
          line4:
            safeT("tipsContent.line4") ||
            "🎲 Every generation is unique - no more repeated prompts!",
          line5:
            safeT("tipsContent.line5") ||
            "🎯 Tip: Combine multiple styles for more creative results",
          line6:
            safeT("tipsContent.line6") ||
            "💡 Use Manual Keywords for full control over desired content",
          line7:
            safeT("tipsContent.line7") ||
            "🚀 Export all prompts for batch processing in your favorite AI tools",
          line8:
            safeT("tipsContent.line8") ||
            "⚠️ Important: If any living creatures appear in generated images, please remove manually",
        },
      }),
      [safeT]
    );

    // ✅ FIX: Memoize section handlers to prevent recreation
    const sectionHandlers = useMemo(
      () => ({
        aboutToggle: () => safeToggleSection("about"),
        howToUseToggle: () => safeToggleSection("howToUse"),
        mjParamsToggle: () => safeToggleSection("mjParams"),
        tipsToggle: () => safeToggleSection("tips"),
      }),
      [safeToggleSection]
    );

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* About App - Enhanced with market research data */}
        <CollapsibleSection
          icon={Info}
          title={translations.aboutApp}
          isExpanded={safeExpandedSections.about}
          onToggle={sectionHandlers.aboutToggle}
        >
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            {translations.aboutContent.line1}
          </p>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            {translations.aboutContent.line2}
          </p>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            {translations.aboutContent.line3}
          </p>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            {translations.aboutContent.line4}
          </p>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            {translations.aboutContent.line5}
          </p>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            {translations.aboutContent.line6}
          </p>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            {translations.aboutContent.line7}
          </p>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            {translations.aboutContent.line8}
          </p>
        </CollapsibleSection>

        {/* How to Use - Updated with new features */}
        <CollapsibleSection
          icon={HelpCircle}
          title={translations.howToUse}
          isExpanded={safeExpandedSections.howToUse}
          onToggle={sectionHandlers.howToUseToggle}
        >
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            <strong>1.</strong> {translations.howToContent.step1}
          </p>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            <strong>2.</strong> {translations.howToContent.step2}
          </p>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            <strong>3.</strong> {translations.howToContent.step3}
          </p>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            <strong>4a.</strong>{" "}
            <span className="text-blue-600 dark:text-blue-400">
              {translations.howToContent.step4a}
            </span>
          </p>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            <strong>4b.</strong>{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              {translations.howToContent.step4b}
            </span>
          </p>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            <strong>5.</strong> {translations.howToContent.step5}
          </p>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            <strong>6.</strong> {translations.howToContent.step6}
          </p>
        </CollapsibleSection>

        {/* Midjourney Parameters - V7 updated */}
        <CollapsibleSection
          icon={Bot}
          title={translations.mjParams}
          isExpanded={safeExpandedSections.mjParams}
          onToggle={sectionHandlers.mjParamsToggle}
        >
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">
              --ar
            </code>{" "}
            {translations.mjParamsContent.ar}
          </p>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">
              --q
            </code>{" "}
            {translations.mjParamsContent.quality}
          </p>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">
              --c
            </code>{" "}
            {translations.mjParamsContent.chaos}
          </p>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">
              --s
            </code>{" "}
            {translations.mjParamsContent.stylize}
          </p>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">
              --weird
            </code>{" "}
            {translations.mjParamsContent.weird}
          </p>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">
              --no
            </code>{" "}
            {translations.mjParamsContent.no}
          </p>
        </CollapsibleSection>

        {/* Pro Tips - Enhanced with 2025 updates */}
        <CollapsibleSection
          icon={Star}
          title={translations.proTips}
          isExpanded={safeExpandedSections.tips}
          onToggle={sectionHandlers.tipsToggle}
        >
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            {translations.tipsContent.line1}
          </p>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            {translations.tipsContent.line2}
          </p>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            {translations.tipsContent.line3}
          </p>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            {translations.tipsContent.line4}
          </p>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            {translations.tipsContent.line5}
          </p>
          <p className="text-green-600 dark:text-green-400 font-medium transition-colors duration-300">
            {translations.tipsContent.line6}
          </p>
          <p className="text-blue-600 dark:text-blue-400 font-medium transition-colors duration-300">
            {translations.tipsContent.line7}
          </p>
          <p className="text-orange-600 dark:text-orange-400 font-medium transition-colors duration-300">
            {translations.tipsContent.line8}
          </p>
        </CollapsibleSection>
      </div>
    );
  }
);

// ✅ FIX: Add display name for better debugging
InfoSections.displayName = "InfoSections";

export default InfoSections;
