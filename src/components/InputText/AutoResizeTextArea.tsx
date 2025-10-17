import React, { useEffect, useRef } from "react";

interface AutoResizeTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  label?: string;
}

const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({
  label,
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
    <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
      {label && (
        <label
          style={{
            // display: "block",
            // fontWeight: 600,
            // marginBottom: "4px",
            // color: "#333",
            width: "7.5rem",
            fontSize: "15px",
            paddingRight: "10px",
            fontWeight: "600",
          }}
        >
          {label}
        </label>
      )}
      <textarea
        ref={textareaRef}
        rows={1}
        className={className}
        style={{
          width: "100%",
          resize: "none",
          overflowY: "hidden",
          lineHeight: "1.5",
          padding: "8px 12px",
        }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default AutoResizeTextarea;
