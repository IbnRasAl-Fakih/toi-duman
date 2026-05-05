import React from "react";
import DropdownButton from "../assets/dropdown-button.jsx";

function formatSeconds(value) {
  const totalSeconds = Math.max(0, Math.floor(Number(value) || 0));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function filenameToTitle(filename) {
  return (filename || "Music").replace(/\.[^/.]+$/, "").trim() || "Music";
}

export default function MusicPicker({
  musicId = "",
  musicUrl = "",
  musicTitle = "",
  startTime = 0,
  uploadedMusic = null,
  onChange,
  onUploadChange,
  accentClassName = "bg-[#d9bf88] text-[#5a4517]"
}) {
  const [musics, setMusics] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const [duration, setDuration] = React.useState(0);
  const rootRef = React.useRef(null);
  const objectUrlRef = React.useRef("");
  const selectedMusic = React.useMemo(
    () => musics.find((item) => String(item.id) === String(musicId)) || null,
    [musicId, musics]
  );
  const resolvedUrl = uploadedMusic?.previewUrl || selectedMusic?.url || musicUrl || "";
  const resolvedTitle = uploadedMusic?.title || selectedMusic?.title || musicTitle || "";
  const resolvedAuthor = uploadedMusic ? "" : selectedMusic?.author || "";
  const resolvedLabel = resolvedTitle ? `${resolvedTitle}${resolvedAuthor ? ` - ${resolvedAuthor}` : ""}` : "";
  const maxStart = duration > 0 ? Math.floor(duration) : 240;
  const normalizedStartTime = Math.min(Math.max(0, Number(startTime) || 0), maxStart);

  React.useEffect(() => {
    let isMounted = true;

    async function loadMusics() {
      try {
        setIsLoading(true);
        setError("");
        const response = await fetch("/api/v1/musics/published");
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.detail || "Музыканы жүктеу мүмкін болмады");
        }
        if (isMounted) {
          setMusics(Array.isArray(data) ? data : []);
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError instanceof Error ? requestError.message : "Музыканы жүктеу мүмкін болмады");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadMusics();
    return () => {
      isMounted = false;
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  React.useEffect(() => {
    function handleDocumentClick(event) {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleDocumentClick);
    return () => document.removeEventListener("mousedown", handleDocumentClick);
  }, []);

  React.useEffect(() => {
    setDuration(0);
  }, [resolvedUrl]);

  function emit(nextValues) {
    if (typeof onChange === "function") {
      onChange({
        musicId,
        musicUrl,
        musicTitle,
        startTime: normalizedStartTime,
        ...nextValues
      });
    }
  }

  function clearUploadedObjectUrl() {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = "";
    }
  }

  function handleSelect(nextMusic) {
    clearUploadedObjectUrl();
    if (typeof onUploadChange === "function") {
      onUploadChange(null);
    }

    if (!nextMusic) {
      emit({ musicId: "", musicUrl: "", musicTitle: "", startTime: 0 });
      setIsOpen(false);
      return;
    }

    emit({
      musicId: String(nextMusic.id),
      musicUrl: nextMusic.url,
      musicTitle: nextMusic.title,
      startTime: 0
    });
    setIsOpen(false);
  }

  function handleUpload(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) {
      return;
    }

    clearUploadedObjectUrl();
    const previewUrl = URL.createObjectURL(file);
    objectUrlRef.current = previewUrl;
    const title = filenameToTitle(file.name);
    if (typeof onUploadChange === "function") {
      onUploadChange({ file, title, previewUrl });
    }
    emit({ musicId: "", musicUrl: previewUrl, musicTitle: title, startTime: 0 });
    setIsOpen(false);
  }

  function handleStartChange(value) {
    emit({ startTime: Math.min(Math.max(0, Number(value) || 0), maxStart) });
  }

  return (
    <div ref={rootRef} className="space-y-3">
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#776d61]">Музыка</span>
      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="flex h-[46px] w-full items-center justify-between gap-3 rounded-[14px] border border-[#eadfce] bg-white px-4 text-left text-[15px] text-[#413830] outline-none transition hover:border-[#d9c69e]"
          >
            <span className={resolvedTitle ? "min-w-0 truncate" : "min-w-0 truncate text-[#b8aea1]"}>
              {resolvedLabel || (isLoading ? "Жүктелуде..." : "Стандартты музыка")}
            </span>
            <DropdownButton className={`h-5 w-5 shrink-0 text-[#9a886d] transition ${isOpen ? "rotate-180" : ""}`} />
          </button>

          {isOpen ? (
            <div className="absolute z-30 mt-2 max-h-72 w-full overflow-auto rounded-[16px] border border-[#eadfce] bg-white py-2 shadow-[0_18px_46px_rgba(76,58,36,0.14)]">
              <button type="button" onClick={() => handleSelect(null)} className="block w-full px-4 py-2.5 text-left text-sm text-[#7d7266] hover:bg-[#fbf4ea]">
                Стандартты музыка
              </button>
              {musics.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item)}
                  className="block w-full px-4 py-2.5 text-left hover:bg-[#fbf4ea]"
                >
                  <span className="block text-sm text-[#413830]">{item.title}</span>
                  {item.author ? <span className="mt-0.5 block text-xs text-[#9a886d]">{item.author}</span> : null}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <label className="inline-flex h-[46px] cursor-pointer items-center justify-center rounded-full border border-[#d8c5a1] px-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8b6a34] transition hover:bg-[#fff8ec]">
          Жүктеу
          <input type="file" accept="audio/*" onChange={handleUpload} className="hidden" />
        </label>
      </div>

      {error ? <p className="text-sm text-[#a03f35]">{error}</p> : null}

      {resolvedUrl ? (
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-[#7d6b4f]">
            <span className="truncate font-medium">{resolvedLabel}</span>
            <span className="font-mono">
              {formatSeconds(normalizedStartTime)}
              {duration ? ` / ${formatSeconds(duration)}` : ""}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max={maxStart}
            step="1"
            value={normalizedStartTime}
            onChange={(event) => handleStartChange(event.target.value)}
            className="music-start-range h-2 w-full cursor-pointer appearance-none rounded-full bg-[#eadfce] accent-[#b89255]"
            style={{
              background: `linear-gradient(90deg, #b89255 0%, #b89255 ${(normalizedStartTime / Math.max(maxStart, 1)) * 100}%, #eadfce ${(normalizedStartTime / Math.max(maxStart, 1)) * 100}%, #eadfce 100%)`
            }}
          />
          <audio
            src={resolvedUrl}
            preload="metadata"
            onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
          />
        </div>
      ) : null}
    </div>
  );
}
