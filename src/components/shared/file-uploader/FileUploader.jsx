import { acceptedExt, checkType, getFileSizeMB } from './utils';
import React, { useEffect, useRef, useState } from 'react';

import DrawTypes from './DrawTypes';
import useDragging from './useDragging';
import { FolderKanban } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FolderDown } from 'lucide-react';
import { FolderIcon } from 'lucide-react';

const drawDescription = (currFile, uploaded, typeError, disabled, label) => {
  return typeError ? (
    <div className="text-red-600">File type/size error, Hovered on types!</div>
  ) : (
    <div>
      {disabled ? (
        <span>Upload disabled</span>
      ) : !currFile && !uploaded ? (
        <>
          {label ? (
            <>
              <span>{label.split(' ')[0]}</span> {label.substr(label.indexOf(' ') + 1)}
            </>
          ) : (
            <>
              <span>Upload</span> or drop a attachment right here
            </>
          )}
        </>
      ) : (
        <>
          <span>Uploaded Successfully!</span> Upload another?
        </>
      )}
    </div>
  );
};

const FileUploader = props => {
  const {
    name,
    hoverTitle,
    currFiles,
    setFile,
    types,
    handleChange,
    classes,
    className,
    children,
    maxSize,
    minSize,
    fileOrFiles,
    onSizeError,
    onTypeError,
    onSelect,
    onDrop,
    disabled,
    label,
    multiple,
    required,
    onDraggingStateChange,
    dropMessageStyle,
  } = props;
  const labelRef = useRef(null);
  const inputRef = useRef(null);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState(false);

  const validateFile = file => {
    if (types && !checkType(file, types)) {
      // types included and type not in them
      setError(true);
      if (onTypeError) onTypeError('File type is not supported');
      return false;
    }
    if (maxSize && getFileSizeMB(file.size) > maxSize) {
      setError(true);
      if (onSizeError) onSizeError('File size is too big');
      return false;
    }
    if (minSize && getFileSizeMB(file.size) < minSize) {
      setError(true);
      if (onSizeError) onSizeError('File size is too small');
      return false;
    }
    return true;
  };

  const handleChanges = files => {
    let checkError = false;
    if (files) {
      if (files instanceof File) {
        checkError = !validateFile(files);
      } else {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          checkError = !validateFile(file) || checkError;
        }
      }
      if (checkError) return false;
      if (handleChange) handleChange(files);
      setFile(files);

      setUploaded(true);
      setError(false);
      return true;
    }
    return false;
  };

  const blockEvent = ev => {
    ev.preventDefault();
    ev.stopPropagation();
  };
  const handleClick = ev => {
    ev.stopPropagation();
    // eslint-disable-next-line no-param-reassign
    if (inputRef && inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.click();
    }
  };

  const handleInputChange = ev => {
    const allFilesArray = Array.from(ev.target.files);
    let filesToAdd = allFilesArray;
    if (multiple && currFiles) {
      filesToAdd = allFilesArray.concat(Array.from(currFiles));
    }
    const files = multiple ? filesToAdd : filesToAdd[0];
    const success = handleChanges(files);
    if (onSelect && success) onSelect(files);
  };
  const dragging = useDragging({
    labelRef,
    inputRef,
    multiple,
    allFiles: currFiles,
    handleChanges,
    onDrop,
  });

  useEffect(() => {
    onDraggingStateChange?.(dragging);
  }, [dragging, onDraggingStateChange]);

  useEffect(() => {
    if (fileOrFiles) {
      setUploaded(true);
      setFile(fileOrFiles);
    } else {
      if (inputRef.current) inputRef.current.value = '';
      setUploaded(false);
      setFile(null);
    }
  }, [fileOrFiles, setFile]);

  return (
    <div
      className={cn(
        `${classes || ''} ${disabled ? 'is-disabled' : ''}`,
        'flex flex-col items-center justify-center py-10 px-6 border border-indigo-200 text-center border-dashed relative rounded',
        className
      )}
      ref={labelRef}
      htmlFor={name}
      onClick={blockEvent}
    >
      <input
        className="opacity-0 pointer-events-none absolute block w-full"
        onClick={handleClick}
        onChange={handleInputChange}
        accept={acceptedExt(types)}
        ref={inputRef}
        type="file"
        name={name}
        disabled={disabled}
        multiple={multiple}
        required={required}
      />
      {dragging && (
        <div style={dropMessageStyle} className="absolute inset-0 inset-y-0 inset-x-0 flex items-center justify-center bg-white/10 backdrop-blur-md text-primary flex-col gap-2 text-sm">
          <FolderDown className="w-10 h-10 p-2 rounded bg-indigo-50/20 backdrop-blur-md border border-indigo-200" />
          <span>{hoverTitle || 'Drop Here'}</span>
        </div>
      )}
      {!children && (
        <>
          <div className="p-2 bg-muted rounded text-primary">
            <FolderIcon className="w-6 h-6" />
          </div>
          <div error={error || ''}>
            {drawDescription(currFiles, uploaded, error, disabled, label)}
            <DrawTypes types={types} minSize={minSize} maxSize={maxSize} />
          </div>
        </>
      )}
      {children}
    </div>
  );
};
export default FileUploader;
