import React from "react";
import { SoundOffIcon } from "../../../assets/theatre-of-love-template/sound-off.jsx";
import { SoundOnIcon } from "../../../assets/theatre-of-love-template/sound-on.jsx";

export default function Template5AudioToggle({ isPlaying, onToggleAudio, previewMode = false }) {
  return (
    <button
      type="button"
      onClick={onToggleAudio}
      className={`${previewMode ? "inline-flex h-12 w-12" : "fixed bottom-6 right-5 inline-flex h-12 w-12"} z-50 items-center justify-center rounded-full border transition ${
        isPlaying
          ? "border-[#8b3d30] bg-[#8c352b] text-white"
          : "border-[#e7c5b8] bg-[rgba(255,249,245,0.96)] text-[#7f3a31]"
      }`}
      aria-label={isPlaying ? "Музыканы өшіру" : "Музыканы қосу"}
    >
      {isPlaying ? <SoundOnIcon className="h-5 w-5" /> : <SoundOffIcon className="h-5 w-5" />}
    </button>
  );
}
