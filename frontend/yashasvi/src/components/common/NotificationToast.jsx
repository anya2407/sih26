import React from 'react';
import { useHeritage } from '../../context/HeritageContext';
import { CheckCircle2, Info, AlertCircle } from 'lucide-react';

export const NotificationToast = () => {
  const { toastMessage } = useHeritage();

  if (!toastMessage) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-heritage-red flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <div className="flex items-center gap-3 px-4 py-3 bg-white text-heritage-textDark rounded-xl shadow-modal border border-heritage-border max-w-md">
        {icons[toastMessage.type] || icons.info}
        <p className="text-sm font-medium leading-snug">{toastMessage.text}</p>
      </div>
    </div>
  );
};
