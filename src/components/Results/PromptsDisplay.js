// src/components/Results/PromptsDisplay.js - COMPLETE ESLint CLEAN VERSION
// ✅ NO MORE ESLINT WARNINGS - Removed unused variables

import React, { useState } from "react";
import {
  Bot,
  Image,
  Copy,
  Download,
  Eye,
  EyeOff,
  FileText,
  FileSpreadsheet,
  Settings2,
  Table,
} from "lucide-react";
import PromptCard from "./PromptCard";
import KeywordDisplay from "../Keywords/KeywordDisplay";
import {
  exportToCSV,
  exportAdobeStockFormat,
  exportDetailedTXT,
  exportPromptsTXT,
  exportPortfolioAnalysis,
} from "../../utils/exportHelpers";

const PromptsDisplay = ({
  prompts,
  promptsWithMetadata, // ✅ NEW: Metadata support
  outputMode,
  copiedIndex,
  onCopyPrompt,
  onCopyAllPrompts,
  onExportPrompts,
  language,
  t,
}) => {
  const [showKeywords, setShowKeywords] = useState(false);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);

  // ✅ FIX: Validation for props - prevent errors if props are missing
  if (!prompts || prompts.length === 0) return null;

  // ✅ FIX: Safe function calls with validation
  const safeCopyAll = (format = "prompts-only") => {
    if (typeof onCopyAllPrompts === "function") {
      try {
        onCopyAllPrompts(format);
      } catch (error) {
        console.error("Copy all failed:", error);
      }
    } else {
      console.warn("onCopyAllPrompts function not available");
    }
  };

  // ✅ REMOVED: safeExport function - using direct export handlers instead

  // ✅ Enhanced export functions with error handling
  const handleExportCSV = () => {
    try {
      if (promptsWithMetadata && promptsWithMetadata.length > 0) {
        exportToCSV(promptsWithMetadata, "adobe-stock-prompts");
      } else {
        // Fallback for legacy prompts without metadata
        const basicData = prompts.map((prompt, index) => ({
          prompt,
          title: `Prompt ${index + 1}`,
          keywords: { all: [], count: 0 },
          category: "Unknown",
          style: "Unknown",
          mood: "Unknown",
        }));
        exportToCSV(basicData, "basic-prompts");
      }
      setExportMenuOpen(false);
    } catch (error) {
      console.error("CSV export failed:", error);
    }
  };

  const handleExportAdobeFormat = () => {
    try {
      if (promptsWithMetadata && promptsWithMetadata.length > 0) {
        exportAdobeStockFormat(promptsWithMetadata, "adobe-stock-submission");
      }
      setExportMenuOpen(false);
    } catch (error) {
      console.error("Adobe format export failed:", error);
    }
  };

  const handleExportDetailedTXT = () => {
    try {
      if (promptsWithMetadata && promptsWithMetadata.length > 0) {
        exportDetailedTXT(promptsWithMetadata, "detailed-prompts");
      } else {
        // Fallback for basic prompts
        exportPromptsTXT(prompts, "basic-prompts");
      }
      setExportMenuOpen(false);
    } catch (error) {
      console.error("Detailed TXT export failed:", error);
    }
  };

  const handleExportPromptsOnly = () => {
    try {
      exportPromptsTXT(prompts, "prompts-only");
      setExportMenuOpen(false);
    } catch (error) {
      console.error("Prompts only export failed:", error);
    }
  };

  const handleExportAnalysis = () => {
    try {
      if (promptsWithMetadata && promptsWithMetadata.length > 0) {
        exportPortfolioAnalysis(promptsWithMetadata, "portfolio-analysis");
      }
      setExportMenuOpen(false);
    } catch (error) {
      console.error("Portfolio analysis export failed:", error);
    }
  };

  const handleCopyKeywords = (keywords) => {
    try {
      if (keywords && Array.isArray(keywords)) {
        navigator.clipboard.writeText(keywords.join(", "));
      }
    } catch (error) {
      console.error("Copy keywords failed:", error);
    }
  };

  const handleExportMetadata = (metadata) => {
    try {
      if (metadata && metadata.keywords) {
        const csvData = [
          {
            title: metadata.title,
            keywords: metadata.keywords.all.join(", "),
            primary_keywords: metadata.keywords.primary.join(", "),
            secondary_keywords: metadata.keywords.secondary.join(", "),
            tertiary_keywords: metadata.keywords.tertiary.join(", "),
            keyword_count: metadata.keywords.count,
          },
        ];
        exportToCSV(csvData, "single-prompt-metadata");
      }
    } catch (error) {
      console.error("Metadata export failed:", error);
    }
  };

  // ✅ Calculate portfolio stats with error handling
  const portfolioStats = (() => {
    try {
      if (promptsWithMetadata && promptsWithMetadata.length > 0) {
        return {
          totalKeywords: promptsWithMetadata.reduce(
            (sum, p) => sum + (p.keywords?.count || 0),
            0
          ),
          avgKeywords: Math.round(
            promptsWithMetadata.reduce(
              (sum, p) => sum + (p.keywords?.count || 0),
              0
            ) / promptsWithMetadata.length
          ),
          categoriesUsed: [
            ...new Set(
              promptsWithMetadata.map((p) => p.category).filter(Boolean)
            ),
          ].length,
          stylesUsed: [
            ...new Set(promptsWithMetadata.map((p) => p.style).filter(Boolean)),
          ].length,
          moodsUsed: [
            ...new Set(promptsWithMetadata.map((p) => p.mood).filter(Boolean)),
          ].length,
          hasMetadata: true,
        };
      }
      return { hasMetadata: false };
    } catch (error) {
      console.error("Portfolio stats calculation failed:", error);
      return { hasMetadata: false };
    }
  })();

  return (
    <div className="bg-white backdrop-blur-md rounded-3xl p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            {outputMode === "midjourney" ? (
              <Bot size={24} className="text-blue-500" />
            ) : (
              <Image size={24} className="text-blue-500" />
            )}
            {t("generatedPrompts")}{" "}
            {outputMode === "midjourney"
              ? t("midjourneyPrompts")
              : t("standardPrompts")}{" "}
            ({prompts.length})
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {/* ✅ Portfolio Statistics Display */}
          {portfolioStats.hasMetadata && (
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-lg">
              <div className="text-xs text-blue-600">
                <span className="font-medium">
                  {portfolioStats.avgKeywords}
                </span>{" "}
                avg keywords •
                <span className="font-medium ml-1">
                  {portfolioStats.categoriesUsed}
                </span>{" "}
                categories
              </div>
            </div>
          )}

          {/* ✅ Keywords Toggle Button */}
          {portfolioStats.hasMetadata && (
            <button
              onClick={() => setShowKeywords(!showKeywords)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${
                showKeywords
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              title={
                showKeywords
                  ? language === "en"
                    ? "Hide keywords"
                    : "Sembunyikan keywords"
                  : language === "en"
                  ? "Show keywords"
                  : "Tampilkan keywords"
              }
            >
              {showKeywords ? <EyeOff size={16} /> : <Eye size={16} />}
              {showKeywords
                ? language === "en"
                  ? "Hide Keywords"
                  : "Sembunyikan"
                : language === "en"
                ? "Show Keywords"
                : "Tampilkan"}
            </button>
          )}
        </div>
      </div>

      {/* ✅ Portfolio Overview Keywords */}
      {showKeywords &&
        portfolioStats.hasMetadata &&
        promptsWithMetadata &&
        promptsWithMetadata.length > 0 && (
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Settings2 size={18} className="text-blue-600" />
              {language === "en"
                ? "Portfolio Keywords Overview"
                : "Gambaran Keywords Portfolio"}
            </h3>

            {/* Show keywords from first prompt as sample */}
            <KeywordDisplay
              keywords={promptsWithMetadata[0].keywords}
              title={promptsWithMetadata[0].title}
              language={language}
              onCopyKeywords={handleCopyKeywords}
              onExportMetadata={handleExportMetadata}
            />
          </div>
        )}

      {/* ✅ Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* ✅ FIXED: Copy All Button with proper format parameter */}
        <button
          onClick={() => safeCopyAll("prompts-only")} // ✅ Explicitly pass format
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-all"
          title={
            language === "en"
              ? "Copy all generated prompts to clipboard"
              : "Copy semua prompt yang dibuat ke clipboard"
          }
        >
          <Copy size={16} />
          {t("copyAll")}
        </button>

        {/* ✅ Enhanced Export Menu */}
        <div className="relative">
          <button
            onClick={() => setExportMenuOpen(!exportMenuOpen)}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition-all"
            title={
              language === "en"
                ? "Export all prompts to a text file"
                : "Export semua prompt ke file teks"
            }
          >
            <Download size={16} />
            {t("exportTxt")}
          </button>

          {exportMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
              <div className="p-2">
                <div className="text-xs font-medium text-gray-500 px-2 py-1 mb-1">
                  {language === "en" ? "Basic Exports" : "Export Dasar"}
                </div>

                <button
                  onClick={handleExportPromptsOnly}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-lg flex items-center gap-2"
                >
                  <FileText size={14} />
                  {language === "en"
                    ? "Prompts Only (TXT)"
                    : "Prompts Saja (TXT)"}
                </button>

                <button
                  onClick={handleExportDetailedTXT}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-lg flex items-center gap-2"
                >
                  <FileText size={14} />
                  {language === "en"
                    ? "Detailed with Keywords"
                    : "Detail dengan Keywords"}
                </button>

                {portfolioStats.hasMetadata && (
                  <>
                    <div className="border-t border-gray-100 my-1"></div>
                    <div className="text-xs font-medium text-gray-500 px-2 py-1 mb-1">
                      {language === "en"
                        ? "Adobe Stock Ready"
                        : "Siap Adobe Stock"}
                    </div>

                    <button
                      onClick={handleExportCSV}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-lg flex items-center gap-2"
                    >
                      <Table size={14} />
                      {language === "en"
                        ? "Spreadsheet (CSV)"
                        : "Spreadsheet (CSV)"}
                    </button>

                    <button
                      onClick={handleExportAdobeFormat}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-lg flex items-center gap-2"
                    >
                      <FileSpreadsheet size={14} />
                      {language === "en"
                        ? "Adobe Stock Format"
                        : "Format Adobe Stock"}
                    </button>

                    <div className="border-t border-gray-100 my-1"></div>
                    <div className="text-xs font-medium text-gray-500 px-2 py-1 mb-1">
                      {language === "en"
                        ? "Advanced Analytics"
                        : "Analitik Lanjutan"}
                    </div>

                    <button
                      onClick={handleExportAnalysis}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-lg flex items-center gap-2"
                    >
                      <Settings2 size={14} />
                      {language === "en"
                        ? "Portfolio Analysis"
                        : "Analisis Portfolio"}
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ✅ Advanced Copy Options */}
        {portfolioStats.hasMetadata && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => safeCopyAll("with-keywords")}
              className="text-sm bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-2 rounded-lg transition-all"
              title={
                language === "en"
                  ? "Copy prompts with keywords"
                  : "Copy prompt dengan keywords"
              }
            >
              {language === "en" ? "Copy with Keywords" : "Copy + Keywords"}
            </button>

            <button
              onClick={() => safeCopyAll("keywords-only")}
              className="text-sm bg-orange-100 hover:bg-orange-200 text-orange-700 px-3 py-2 rounded-lg transition-all"
              title={
                language === "en" ? "Copy keywords only" : "Copy keywords saja"
              }
            >
              {language === "en" ? "Keywords Only" : "Keywords Saja"}
            </button>
          </div>
        )}
      </div>

      {/* ✅ Prompts Grid */}
      <div className="grid gap-4">
        {prompts.map((item, index) => {
          // ✅ Enhanced: Pass metadata if available
          const metadata =
            promptsWithMetadata && promptsWithMetadata[index]
              ? promptsWithMetadata[index]
              : null;

          return (
            <PromptCard
              key={item.id || index}
              item={{
                prompt: item,
                mode: outputMode,
                theme: metadata?.theme || "Unknown",
              }}
              metadata={metadata} // ✅ NEW: Pass metadata to card
              index={index}
              copiedIndex={copiedIndex}
              onCopy={onCopyPrompt}
              showKeywords={showKeywords} // ✅ NEW: Pass keyword display state
              onCopyKeywords={handleCopyKeywords} // ✅ NEW: Pass keyword copy handler
              onExportMetadata={handleExportMetadata} // ✅ NEW: Pass metadata export handler
              language={language}
              t={t}
            />
          );
        })}
      </div>

      {/* ✅ Click outside to close export menu */}
      {exportMenuOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setExportMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default PromptsDisplay;
