
import React from 'react';

interface PricingNotesProps {
  notes: string;
}

const PricingNotes: React.FC<PricingNotesProps> = ({ notes }) => {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-medium mb-2">ملاحظات</h3>
      <p className="text-sm whitespace-pre-line">{notes}</p>
    </div>
  );
};

export default PricingNotes;
