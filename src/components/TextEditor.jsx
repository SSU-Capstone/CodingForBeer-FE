import React from 'react';
import clsx from "clsx";

// Todo : CSS
const TextEditor = ({ children, mode }) => {
  return (
    <div className={clsx('w-1/2 h-screen overflow-y-auto', mode === 'edit' ? 'w-full' : 'w-1/2' )}>
      {children}
    </div>
  );
};

export default TextEditor;