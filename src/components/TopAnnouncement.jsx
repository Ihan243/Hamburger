import React from 'react';
import { businessInfo } from '../data/businessInfo';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function TopAnnouncement() {
  const { t } = useLanguage();
  return (
    <div className="reference-announcement" role="note">
      <div className="reference-announcement-content">
        <span>📍 {t(businessInfo.address)} · {t(businessInfo.locationNote)}</span>
        <span>🍟 {t(businessInfo.schedule)}</span>
        <span>🛵 {t(businessInfo.deliveryPromise)}</span>
      </div>
    </div>
  );
}
