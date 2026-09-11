import React, { useRef, useEffect } from 'react';

interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div' | 'li';
  style?: React.CSSProperties;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
}

/**
 * EditableText component enables direct inline typing and deletion on the Live A4 Preview layer.
 * Changes automatically sync with the resume store on blur or Enter.
 */
export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onSave,
  as: Component = 'span',
  style,
  className = '',
  multiline = false,
  placeholder,
}) => {
  const ref = useRef<HTMLElement>(null);

  // Sync internal text when prop changes externally (and user is not currently focusing/editing it)
  useEffect(() => {
    if (ref.current && document.activeElement !== ref.current) {
      ref.current.innerText = value || '';
    }
  }, [value]);

  const handleBlur = () => {
    if (!ref.current) return;
    const currentText = ref.current.innerText.trim();
    if (currentText !== value) {
      onSave(currentText);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    e.stopPropagation();
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
      ref.current?.blur();
    }
  };

  return (
    <Component
      ref={ref as any}
      contentEditable
      suppressContentEditableWarning
      className={`cv-editable ${className}`}
      style={{
        outline: 'none',
        ...style,
      }}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      title="Klik untuk mengedit atau menghapus teks langsung"
      data-placeholder={placeholder}
    >
      {value}
    </Component>
  );
};
