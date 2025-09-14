import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-[#c2410c] rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;