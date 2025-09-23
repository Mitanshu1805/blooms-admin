import React, { useEffect, useRef } from "react";

interface AutoResizeTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
}

const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({
  value,
  onChange,
  placeholder,
  className = "od-text-input",
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto"; // reset height
      el.style.height = `${el.scrollHeight}px`; // set new height
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      rows={1}
      className={className}
      style={{
        width: "100%",
        resize: "none", // disable manual resize
        overflowY: "hidden", // hide scrollbar but allow growth
        lineHeight: "1.5", // make sure newlines have space
        padding: "8px 12px", // optional: spacing inside
      }}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default AutoResizeTextarea;
