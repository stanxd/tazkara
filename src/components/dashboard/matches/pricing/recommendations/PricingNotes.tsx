
import React from 'react';

interface PricingNotesProps {
  notes: string;
}

const PricingNotes: React.FC<PricingNotesProps> = ({ notes }) => {
  return (
    <div className="border rounded-lg p-2">
      <h3 className="font-medium text-sm mb-1">ملاحظات</h3>
      <p className="text-xs whitespace-pre-line">{notes}</p>
    </div>
  );
};

export default PricingNotes;
