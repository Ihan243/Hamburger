import React from 'react';
import { businessInfo } from '../data/businessInfo';

export default function TopAnnouncement() {
  return (
    <div className="reference-announcement" role="note">
      <div className="reference-announcement-content">
        <span>📍 {businessInfo.address} · {businessInfo.locationNote}</span>
        <span>🍟 {businessInfo.schedule}</span>
        <span>🛵 {businessInfo.deliveryPromise}</span>
      </div>
    </div>
  );
}
