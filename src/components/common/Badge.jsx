import React from 'react';

export const Badge = ({ children, variant = 'default', size = 'sm', className = '' }) => {
  const variants = {
    default: 'bg-heritage-beige text-heritage-textDark border-heritage-border',
    red: 'bg-red-50 text-heritage-red border-red-200 font-medium',
    gold: 'bg-[#FDF8EE] text-[#9A7328] border-[#E8D9B5] font-medium',
    emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200 font-medium',
    indigo: 'bg-indigo-50 text-indigo-900 border-indigo-200 font-medium',
    dark: 'bg-heritage-textDark text-white border-transparent'
  };

  const sizes = {
    xs: 'text-[10px] px-2 py-0.5',
    sm: 'text-xs px-2.5 py-1',
    md: 'text-sm px-3 py-1.5'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};
