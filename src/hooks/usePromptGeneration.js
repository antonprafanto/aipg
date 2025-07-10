// src/hooks/usePromptGeneration.js - COMPLETE FIXED VERSION with Midjourney Formatting
// ✅ FIXED: Added Midjourney parameter formatting when outputMode is 'midjourney'

import { useState, useCallback } from "react";
import notificationManager from "../utils/notificationManager";
import { categories } from "../data/categories";
import {
  styles,
  moods,
  styleVariations,
  moodVariations,
  lightingConditions,
  compositions,
  colorPalettes,
  cameraSettings,
  qualityTerms,
  qualityEndings,
} from "../data/styles";

// ✅ NEW: Import keyword optimization system
import {
  generateOptimizedKeywords,
  generateSEOTitle,
} from "../data/keywordOptimization";

// UTILITY FUNCTIONS FOR TRUE RANDOMIZATION (Outside hook to avoid dependencies)
const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const generateUniqueId = () => {
  return Date.now() + Math.random().toString(36).substr(2, 9);
};

// Helper functions for consistent settings (moved outside hook)
const getLightingFromSettings = (preference) => {
  const lightingMap = {
    golden: "golden hour lighting",
    natural: "soft natural light",
    studio: "studio lighting",
    mixed: "mixed natural and artificial lighting",
  };
  return lightingMap[preference] || "natural lighting";
};

const getCompositionFromSettings = (style) => {
  const compositionMap = {
    thirds: "rule of thirds",
    centered: "centered composition",
    dynamic: "diagonal composition",
    minimalist: "negative space, minimalist layout",
  };
  return compositionMap[style] || "balanced composition";
};

const getColorsFromSettings = (enhancement) => {
  const colorMap = {
    vibrant: "vibrant colors, high saturation",
    natural: "natural color palette, authentic tones",
    muted: "muted colors, subtle tones",
  };
  return colorMap[enhancement] || "natural colors";
};

const getCameraFromSettings = (focus) => {
  const cameraMap = {
    shallow: "shallow depth of field, wide aperture f/1.8",
    deep: "deep focus, sharp throughout, f/8",
    selective: "selective focus, subject isolation",
    macro: "macro detail, extreme close-up",
  };
  return cameraMap[focus] || "professional camera settings";
};

// ✅ NEW: Midjourney parameter formatting function
const formatMidjourneyPrompt = (basePrompt, settings) => {
  // Start with /imagine command
  let mjPrompt = `/imagine ${basePrompt}`;

  // Build parameters array
  const params = [];

  // Aspect Ratio
  if (settings.mjAspectRatio && settings.mjAspectRatio !== "1:1") {
    params.push(`--ar ${settings.mjAspectRatio}`);
  }

  // Version
  if (settings.mjVersion && settings.mjVersion !== "6.1") {
    params.push(`--v ${settings.mjVersion}`);
  }

  // Quality
  if (settings.mjQuality && settings.mjQuality !== "1") {
    params.push(`--q ${settings.mjQuality}`);
  }

  // Chaos
  if (settings.mjChaos && settings.mjChaos > 0) {
    params.push(`--c ${settings.mjChaos}`);
  }

  // Stylize
  if (settings.mjStylize && settings.mjStylize !== 100) {
    params.push(`--s ${settings.mjStylize}`);
  }

  // Weird
  if (settings.mjWeird && settings.mjWeird > 0) {
    params.push(`--weird ${settings.mjWeird}`);
  }

  // No Elements (exclude)
  if (settings.mjNoElements && settings.mjNoElements.trim()) {
    // Split by comma and clean up
    const noElements = settings.mjNoElements
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
      .join(" ");

    if (noElements) {
      params.push(`--no ${noElements}`);
    }
  }

  // Auto-exclude living creatures for Adobe Stock compliance
  const autoExclude = [
    "people",
    "person",
    "human",
    "face",
    "animal",
    "pet",
    "plant",
    "tree",
    "flower",
    "text",
    "logo",
    "watermark",
  ];
  params.push(`--no ${autoExclude.join(" ")}`);

  // Raw mode
  if (settings.mjRaw) {
    params.push("--raw");
  }

  // Tile pattern
  if (settings.mjTile) {
    params.push("--tile");
  }

  // Niji anime mode
  if (settings.mjNiji) {
    params.push("--niji 6");
  }

  // Add all parameters to the prompt
  if (params.length > 0) {
    mjPrompt += " " + params.join(" ");
  }

  return mjPrompt;
};

const usePromptGeneration = (settings, t) => {
  const [prompts, setPrompts] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // ✅ NEW: Enhanced prompts with metadata
  const [promptsWithMetadata, setPromptsWithMetadata] = useState([]);

  // ✅ ENHANCED GENERATION LOGIC WITH KEYWORD OPTIMIZATION
  const generatePrompts = useCallback(
    (isFullRandom = false) => {
      setIsGenerating(true);

      const generateSmartPrompt = (
        category,
        isRandomMode,
        promptSettings,
        selectedTheme,
        manualKeyword,
        isManualMode
      ) => {
        const categoryData = categories[category];

        // Theme selection logic
        let selectedThemeText;
        if (isManualMode && manualKeyword && manualKeyword.trim()) {
          selectedThemeText = manualKeyword.trim();
        } else if (
          selectedTheme &&
          selectedTheme !== "auto" &&
          selectedTheme !== "manual"
        ) {
          selectedThemeText = selectedTheme;
        } else if (categoryData) {
          selectedThemeText = getRandomElement(categoryData.themes);
        } else {
          selectedThemeText = "professional product photography";
        }

        // Style and mood variations
        const styleOptions = styleVariations[promptSettings.selectedStyle];
        const styleDesc = styleOptions
          ? getRandomElement(styleOptions)
          : styles[promptSettings.selectedStyle];

        const moodOptions = moodVariations[promptSettings.selectedMood];
        const moodDesc = moodOptions
          ? getRandomElement(moodOptions)
          : moods[promptSettings.selectedMood];

        const lighting = isRandomMode
          ? getRandomElement(lightingConditions)
          : getLightingFromSettings(promptSettings.lightingPreference);

        const composition = isRandomMode
          ? getRandomElement(compositions)
          : getCompositionFromSettings(promptSettings.compositionStyle);

        const colors = isRandomMode
          ? getRandomElement(colorPalettes)
          : getColorsFromSettings(promptSettings.colorEnhancement);

        const camera = isRandomMode
          ? getRandomElement(cameraSettings)
          : getCameraFromSettings(promptSettings.focusStyle);

        const quality = getRandomElement(qualityTerms);
        const ending = getRandomElement(qualityEndings);

        // ✅ ENHANCED: Build prompt based on output mode
        let basePrompt;

        if (settings.outputMode === "midjourney") {
          // For Midjourney: Cleaner, more focused prompt without "isolated on white background"
          basePrompt = `${selectedThemeText}, ${styleDesc}, ${moodDesc}, ${lighting}, ${composition}, ${colors}, ${camera}, ${quality}`;
        } else {
          // For Adobe Stock: Include "isolated on white background" and full descriptive ending
          basePrompt = `${selectedThemeText}, ${styleDesc}, ${moodDesc}, ${lighting}, ${composition}, ${colors}, ${camera}, ${quality}, ${ending}`;
        }

        // ✅ NEW: Apply Midjourney formatting if in Midjourney mode
        let finalPrompt;
        if (settings.outputMode === "midjourney") {
          finalPrompt = formatMidjourneyPrompt(basePrompt, settings);
        } else {
          finalPrompt = basePrompt;
        }

        // ✅ NEW: Generate optimized keywords and SEO title
        const keywords = generateOptimizedKeywords(
          category,
          promptSettings.selectedStyle,
          promptSettings.selectedMood,
          selectedThemeText,
          [lighting, composition, colors, camera, quality]
        );

        const title = generateSEOTitle(
          category,
          selectedThemeText,
          promptSettings.selectedStyle,
          promptSettings.selectedMood
        );

        return {
          prompt: finalPrompt,
          basePrompt, // Store base prompt without MJ formatting
          title,
          keywords,
          category,
          style: promptSettings.selectedStyle,
          mood: promptSettings.selectedMood,
          theme: selectedThemeText,
          id: generateUniqueId(),
          timestamp: new Date().toISOString(),
          outputMode: settings.outputMode, // ✅ Store output mode
          mjParams:
            settings.outputMode === "midjourney"
              ? {
                  version: settings.mjVersion,
                  aspectRatio: settings.mjAspectRatio,
                  quality: settings.mjQuality,
                  chaos: settings.mjChaos,
                  stylize: settings.mjStylize,
                  weird: settings.mjWeird,
                  noElements: settings.mjNoElements,
                  raw: settings.mjRaw,
                  tile: settings.mjTile,
                  niji: settings.mjNiji,
                }
              : null,
          settings: {
            lighting: promptSettings.lightingPreference,
            composition: promptSettings.compositionStyle,
            colors: promptSettings.colorEnhancement,
            focus: promptSettings.focusStyle,
            isRandomMode,
          },
        };
      };

      try {
        const newPrompts = [];
        const newMetadata = [];

        for (let i = 0; i < settings.promptCount; i++) {
          let currentCategory, currentStyle, currentMood;

          if (isFullRandom) {
            const categoryKeys = [
              "business",
              "transportation",
              "food",
              "abstract",
              "nature",
              "architecture",
            ];
            currentCategory = getRandomElement(categoryKeys);

            const styleKeys = Object.keys(styles);
            currentStyle = getRandomElement(styleKeys);

            const moodKeys = Object.keys(moods);
            currentMood = getRandomElement(moodKeys);
          } else {
            currentCategory = settings.selectedCategory;
            currentStyle = settings.selectedStyle;
            currentMood = settings.selectedMood;
          }

          const promptSettings = {
            selectedStyle: currentStyle,
            selectedMood: currentMood,
            contentType: settings.contentType,
            lightingPreference: settings.lightingPreference,
            compositionStyle: settings.compositionStyle,
            colorEnhancement: settings.colorEnhancement,
            focusStyle: settings.focusStyle,
          };

          const promptData = generateSmartPrompt(
            currentCategory,
            isFullRandom,
            promptSettings,
            settings.selectedTheme,
            settings.manualKeyword,
            settings.isManualMode
          );

          newPrompts.push(promptData.prompt);
          newMetadata.push(promptData);
        }

        setPrompts(newPrompts);
        setPromptsWithMetadata(newMetadata);

        // ✅ ENHANCED: Show different notifications based on output mode
        const avgKeywords = Math.round(
          newMetadata.reduce((sum, p) => sum + (p.keywords?.count || 0), 0) /
            newMetadata.length
        );

        if (settings.outputMode === "midjourney") {
          notificationManager.success(
            `✨ Generated ${newPrompts.length} Midjourney prompts with parameters ready for Discord!`
          );
        } else {
          notificationManager.success(
            `✨ Generated ${newPrompts.length} Adobe Stock prompts with ${avgKeywords} avg keywords`
          );
        }
      } catch (error) {
        console.error("Error generating prompts:", error);
        notificationManager.error(
          t("notifications.generationError") || "Error generating prompts"
        );
      } finally {
        setIsGenerating(false);
      }
    },
    [settings, t]
  );

  // ✅ ENHANCED: Copy functionality with keyword support
  const copyToClipboard = useCallback(
    async (text, index = null, type = "prompt") => {
      try {
        let contentToCopy = text;

        // Enhanced copy formats
        if (
          type === "with-keywords" &&
          index !== null &&
          promptsWithMetadata[index]
        ) {
          const metadata = promptsWithMetadata[index];
          contentToCopy = `${text}\n\nKeywords: ${
            metadata.keywords?.all?.join(", ") || ""
          }\nTitle: ${metadata.title || ""}`;
        } else if (
          type === "metadata-only" &&
          index !== null &&
          promptsWithMetadata[index]
        ) {
          const metadata = promptsWithMetadata[index];
          contentToCopy = `Title: ${metadata.title}\nKeywords: ${
            metadata.keywords?.all?.join(", ") || ""
          }`;
        }

        await navigator.clipboard.writeText(contentToCopy);
        setCopiedIndex(index);

        setTimeout(() => setCopiedIndex(null), 2000);

        const successMessage =
          type === "with-keywords"
            ? "Prompt with keywords copied!"
            : type === "metadata-only"
            ? "Metadata copied!"
            : "Prompt copied!";

        notificationManager.success(successMessage);
      } catch (err) {
        console.error("Failed to copy to clipboard:", err);
        notificationManager.error("Failed to copy to clipboard");
      }
    },
    [promptsWithMetadata]
  );

  // ✅ FIXED: Copy all prompts with enhanced formats and error handling
  const copyAllPrompts = useCallback(
    async (format = "prompts-only") => {
      try {
        let content = "";

        // ✅ FIX: Ensure format is always a string and validate
        const safeFormat = typeof format === "string" ? format : "prompts-only";
        const validFormats = [
          "prompts-only",
          "with-keywords",
          "keywords-only",
          "titles-only",
          "metadata-complete",
        ];
        const finalFormat = validFormats.includes(safeFormat)
          ? safeFormat
          : "prompts-only";

        switch (finalFormat) {
          case "prompts-only":
            content = prompts.join("\n\n");
            break;
          case "with-keywords":
            if (promptsWithMetadata && promptsWithMetadata.length > 0) {
              content = promptsWithMetadata
                .map(
                  (item, index) =>
                    `=== PROMPT ${index + 1} ===\n${item.prompt}\n\nKeywords: ${
                      item.keywords?.all?.join(", ") || ""
                    }\nTitle: ${item.title || ""}\n`
                )
                .join("\n");
            } else {
              content = prompts.join("\n\n");
            }
            break;
          case "keywords-only":
            if (promptsWithMetadata && promptsWithMetadata.length > 0) {
              content = promptsWithMetadata
                .map((item) => item.keywords?.all?.join(", ") || "")
                .join("\n\n");
            } else {
              content = "No keywords available (legacy prompts)";
            }
            break;
          case "titles-only":
            if (promptsWithMetadata && promptsWithMetadata.length > 0) {
              content = promptsWithMetadata
                .map((item) => item.title || "")
                .join("\n");
            } else {
              content = prompts
                .map((_, index) => `Prompt ${index + 1}`)
                .join("\n");
            }
            break;
          case "metadata-complete":
            if (promptsWithMetadata && promptsWithMetadata.length > 0) {
              content = promptsWithMetadata
                .map(
                  (item, index) =>
                    `=== PROMPT ${index + 1} ===\n` +
                    `Title: ${item.title || "Untitled"}\n` +
                    `Category: ${item.category || "Unknown"}\n` +
                    `Style: ${item.style || "Unknown"}\n` +
                    `Mood: ${item.mood || "Unknown"}\n` +
                    `Output Mode: ${item.outputMode || "Unknown"}\n` +
                    `Prompt: ${item.prompt}\n` +
                    (item.mjParams
                      ? `\nMidjourney Parameters:\n${JSON.stringify(
                          item.mjParams,
                          null,
                          2
                        )}\n`
                      : "") +
                    `\nKeywords (${item.keywords?.count || 0}):\n` +
                    `Primary: ${item.keywords?.primary?.join(", ") || ""}\n` +
                    `Secondary: ${
                      item.keywords?.secondary?.join(", ") || ""
                    }\n` +
                    `Tertiary: ${item.keywords?.tertiary?.join(", ") || ""}\n`
                )
                .join("\n---\n\n");
            } else {
              content = prompts.join("\n\n");
            }
            break;
          default:
            content = prompts.join("\n\n");
            break;
        }

        // ✅ FIX: Validate content before copying
        if (!content || content.trim() === "") {
          notificationManager.error("No content to copy");
          return;
        }

        await navigator.clipboard.writeText(content);

        // ✅ FIX: Safe format display with proper string handling
        const formatDisplay = finalFormat
          .replace(/-/g, " ")
          .replace(/([A-Z])/g, " $1")
          .trim();
        notificationManager.success(
          `All ${formatDisplay} copied to clipboard!`
        );
      } catch (err) {
        console.error("Failed to copy all prompts:", err);
        notificationManager.error("Failed to copy all prompts");
      }
    },
    [prompts, promptsWithMetadata]
  );

  // ✅ NEW: Export functionality
  const exportPrompts = useCallback(
    (format = "txt") => {
      try {
        const timestamp = new Date().toISOString().split("T")[0];

        // ✅ FIX: Validate format parameter
        const safeFormat = typeof format === "string" ? format : "txt";

        switch (safeFormat) {
          case "csv":
            // Will be handled by enhanced export component
            return promptsWithMetadata;
          case "json":
            const jsonData = {
              metadata: {
                generated: new Date().toISOString(),
                count: promptsWithMetadata.length,
                outputMode: settings.outputMode,
                settings: settings,
              },
              prompts: promptsWithMetadata,
            };
            const jsonBlob = new Blob([JSON.stringify(jsonData, null, 2)], {
              type: "application/json",
            });
            const jsonUrl = URL.createObjectURL(jsonBlob);
            const jsonLink = document.createElement("a");
            jsonLink.href = jsonUrl;
            jsonLink.download = `${settings.outputMode}-prompts-${timestamp}.json`;
            jsonLink.click();
            URL.revokeObjectURL(jsonUrl);
            break;
          case "txt":
          default:
            const txtContent =
              promptsWithMetadata && promptsWithMetadata.length > 0
                ? promptsWithMetadata
                    .map(
                      (item, index) =>
                        `=== ${item.outputMode?.toUpperCase() || "PROMPT"} ${
                          index + 1
                        } ===\n` +
                        `Title: ${item.title}\n` +
                        `Prompt: ${item.prompt}\n` +
                        (item.mjParams
                          ? `MJ Parameters: ${JSON.stringify(item.mjParams)}\n`
                          : "") +
                        `Keywords: ${item.keywords?.all?.join(", ") || ""}\n`
                    )
                    .join("\n")
                : prompts
                    .map(
                      (prompt, index) =>
                        `=== PROMPT ${index + 1} ===\n${prompt}\n`
                    )
                    .join("\n");

            const txtBlob = new Blob([txtContent], { type: "text/plain" });
            const txtUrl = URL.createObjectURL(txtBlob);
            const txtLink = document.createElement("a");
            txtLink.href = txtUrl;
            txtLink.download = `${settings.outputMode}-prompts-${timestamp}.txt`;
            txtLink.click();
            URL.revokeObjectURL(txtUrl);
            break;
        }

        notificationManager.success(
          `Prompts exported as ${safeFormat.toUpperCase()}`
        );
      } catch (error) {
        console.error("Export failed:", error);
        notificationManager.error("Failed to export prompts");
      }
    },
    [promptsWithMetadata, prompts, settings]
  );

  return {
    prompts,
    promptsWithMetadata, // ✅ NEW: Include metadata
    isGenerating,
    copiedIndex,
    generatePrompts,
    copyToClipboard,
    copyAllPrompts, // ✅ FIXED
    exportPrompts, // ✅ NEW
  };
};

export default usePromptGeneration;
