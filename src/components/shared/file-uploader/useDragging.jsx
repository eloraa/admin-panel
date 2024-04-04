import { useState, useEffect, useCallback } from 'react';

let draggingCount = 0;

/**
 *
 * @param data - labelRef, inputRef, handleChanges, onDrop
 * @returns boolean - the state.
 *
 * @internal
 */
export default function useDragging({ labelRef, inputRef, multiple, allFiles, handleChanges, onDrop }) {
  const [dragging, setDragging] = useState(false);
  const handleClick = useCallback(() => {
    inputRef.current.click();
  }, [inputRef]);

  const handleDragIn = useCallback(ev => {
    ev.preventDefault();
    ev.stopPropagation();
    draggingCount++;
    if (ev.dataTransfer.items && ev.dataTransfer.items.length !== 0) {
      setDragging(true);
    }
  }, []);
  const handleDragOut = useCallback(ev => {
    ev.preventDefault();
    ev.stopPropagation();
    draggingCount--;
    if (draggingCount > 0) return;
    setDragging(false);
  }, []);
  const handleDrag = useCallback(ev => {
    ev.preventDefault();
    ev.stopPropagation();
  }, []);
  const handleDrop = useCallback(
    ev => {
      ev.preventDefault();
      ev.stopPropagation();
      setDragging(false);
      draggingCount = 0;
      const eventFiles = ev.dataTransfer.files;
      if (eventFiles && eventFiles.length > 0) {
        let filesToAdd = eventFiles;
        if (multiple) {
          filesToAdd = Array.from(eventFiles).concat(allFiles ? Array.from(allFiles) : []);
        }
        const success = handleChanges(filesToAdd);
        if (onDrop && success) {
          onDrop(filesToAdd);
        }
      }
    },
    [handleChanges, multiple, onDrop, allFiles]
  );

  useEffect(() => {
    const ele = labelRef.current;
    ele.addEventListener('click', handleClick);
    ele.addEventListener('dragenter', handleDragIn);
    ele.addEventListener('dragleave', handleDragOut);
    ele.addEventListener('dragover', handleDrag);
    ele.addEventListener('drop', handleDrop);
    return () => {
      ele.removeEventListener('click', handleClick);
      ele.removeEventListener('dragenter', handleDragIn);
      ele.removeEventListener('dragleave', handleDragOut);
      ele.removeEventListener('dragover', handleDrag);
      ele.removeEventListener('drop', handleDrop);
    };
  }, [handleClick, handleDragIn, handleDragOut, handleDrag, handleDrop, labelRef]);

  return dragging;
}
