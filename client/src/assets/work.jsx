import React from "react";

export default function WorkIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" className={className} aria-hidden="true">
      <path d="M42.667 197.76c54.584 21.236 112.186 33.692 170.666 36.907v42.666H298.667v-42.666c58.34-3.653 115.834-15.799 170.666-36.053v164.053H42.667V197.76ZM320 0l21.333 21.333V64h128v111.147c-65.412 24.422-134.556 37.342-204.373 38.186H249.6c-70.754-.765-140.814-14.054-206.933-39.253V64h128V21.333L192 0h128Zm-21.333 42.667h-85.334V64h85.334V42.667Z" transform="translate(0 64)" />
    </svg>
  );
}
