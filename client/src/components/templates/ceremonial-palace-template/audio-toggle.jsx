import React from "react";

function SoundOnIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M11 5.2a.7.7 0 0 0-1.2-.5L6.2 8.3a1.3 1.3 0 0 1-.9.4H3a1 1 0 0 0-1 1v4.6a1 1 0 0 0 1 1h2.3a1.3 1.3 0 0 1 .9.4l3.6 3.6a.7.7 0 0 0 1.2-.5z" />
      <path d="M15.5 9.1a4.8 4.8 0 0 1 0 5.8" />
      <path d="M18.8 6.4a8.8 8.8 0 0 1 0 11.2" />
    </svg>
  );
}

function SoundOffIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M11 5.2a.7.7 0 0 0-1.2-.5L6.2 8.3a1.3 1.3 0 0 1-.9.4H3a1 1 0 0 0-1 1v4.6a1 1 0 0 0 1 1h2.3a1.3 1.3 0 0 1 .9.4l3.6 3.6a.7.7 0 0 0 1.2-.5z" />
      <path d="m16 9 5 5" />
      <path d="m21 9-5 5" />
    </svg>
  );
}

export default function CeremonialPalaceAudioToggle({ isPlaying, onToggleAudio, previewMode = false }) {
  return (
    <button
      type="button"
      onClick={onToggleAudio}
      className={`${previewMode ? "inline-flex h-12 w-12" : "fixed bottom-5 right-5 inline-flex h-12 w-12"} z-50 items-center justify-center rounded-full border border-white/20 bg-[rgba(122,6,38,0.92)] text-[#fff5ee] shadow-[0_14px_32px_rgba(55,6,21,0.28)] backdrop-blur-md transition duration-300 hover:scale-[1.03]`}
      aria-label={isPlaying ? "Pause music" : "Play music"}
    >
      {isPlaying ? <SoundOnIcon /> : <SoundOffIcon />}
    </button>
  );
}



