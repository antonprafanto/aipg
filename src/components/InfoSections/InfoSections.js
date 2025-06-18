import React from 'react';
import { Info, HelpCircle, Bot, Star } from 'lucide-react';
import CollapsibleSection from './CollapsibleSection';

const InfoSections = ({ expandedSections, toggleSection, t }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* About App */}
      <CollapsibleSection
        icon={Info}
        title={t('aboutApp')}
        isExpanded={expandedSections.about}
        onToggle={() => toggleSection('about')}
      >
        <p>{t('aboutContent.line1')}</p>
        <p>{t('aboutContent.line2')}</p>
        <p>{t('aboutContent.line3')}</p>
        <p>{t('aboutContent.line4')}</p>
      </CollapsibleSection>

      {/* How to Use */}
      <CollapsibleSection
        icon={HelpCircle}
        title={t('howToUse')}
        isExpanded={expandedSections.howToUse}
        onToggle={() => toggleSection('howToUse')}
      >
        <p><strong>1.</strong> {t('howToContent.step1')}</p>
        <p><strong>2.</strong> {t('howToContent.step2')}</p>
        <p><strong>3.</strong> {t('howToContent.step3')}</p>
        <p><strong>4a.</strong> <span className="text-blue-600">{t('howToContent.step4a')}</span></p>
        <p><strong>4b.</strong> <span className="text-indigo-600">{t('howToContent.step4b')}</span></p>
        <p><strong>5.</strong> {t('howToContent.step5')}</p>
        <p><strong>6.</strong> {t('howToContent.step6')}</p>
      </CollapsibleSection>

      {/* Midjourney Parameters */}
      <CollapsibleSection
        icon={Bot}
        title={t('mjParams')}
        isExpanded={expandedSections.mjParams}
        onToggle={() => toggleSection('mjParams')}
      >
        <p><code>--ar</code> {t('mjParamsContent.ar')}</p>
        <p><code>--v</code> {t('mjParamsContent.v')}</p>
        <p><code>--chaos</code> {t('mjParamsContent.chaos')}</p>
        <p><code>--s</code> {t('mjParamsContent.s')}</p>
        <p><code>--q</code> {t('mjParamsContent.q')}</p>
        <p><code>--weird</code> {t('mjParamsContent.weird')}</p>
        <p><code>--raw</code> {t('mjParamsContent.raw')}</p>
        <p><code>--tile</code> {t('mjParamsContent.tile')}</p>
        <p><code>--niji</code> {t('mjParamsContent.niji')}</p>
      </CollapsibleSection>

      {/* Tips */}
      <CollapsibleSection
        icon={Star}
        title={t('proTips')}
        isExpanded={expandedSections.tips}
        onToggle={() => toggleSection('tips')}
      >
        <p>{t('tipsContent.line1')}</p>
        <p>{t('tipsContent.line2')}</p>
        <p>{t('tipsContent.line3')}</p>
        <p>{t('tipsContent.line4')}</p>
        <p>{t('tipsContent.line5')}</p>
        <p className="text-green-600 font-medium">{t('tipsContent.line6')}</p>
        <p className="text-blue-600 font-medium">{t('tipsContent.line7')}</p>
      </CollapsibleSection>
    </div>
  );
};

export default InfoSections;