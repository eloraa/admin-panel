import React from 'react';

export default function DrawTypes({ types, minSize, maxSize }) {
  if (types) {
    const stringTypes = types.toString();
    let size = '';
    if (maxSize) size += `size >= ${maxSize}, `;
    if (minSize) size += `size <= ${minSize}, `;
    return (
      <span title={`${size}types: ${stringTypes}`} className="text-xs mt-2 font-semibold px-2 py-1 rounded bg-muted dark:bg-background">
        {stringTypes}
      </span>
    );
  }
  return null;
}
