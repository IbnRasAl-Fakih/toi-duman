import React from "react";
import AdminShell from "../../components/admin-shell.jsx";
import { useNotification } from "../../context/notification-context.jsx";

const emptyForm = {
  title: "",
  author: "",
  url: "",
  is_published: true
};

function filenameToTitle(filename) {
  return (filename || "Music").replace(/\.[^/.]+$/, "").trim() || "Music";
}

function MusicForm({ value, uploadFile, isSaving, onChange, onUploadFileChange, onSubmit, onCancel }) {
  function handleUploadChange(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) {
      return;
    }

    onUploadFileChange(file);
    onChange({
      ...value,
      title: value.title.trim() ? value.title : filenameToTitle(file.name),
      url: ""
    });
  }

  return (
    <form
      className="space-y-4 rounded-[22px] border border-black/10 bg-[#fffaf5] p-5"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex h-[46px] cursor-pointer items-center justify-center rounded-full border border-[#d8c5a1] px-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8b6a34] transition hover:bg-[#fff8ec]">
          Жүктеу
          <input type="file" accept="audio/*" onChange={handleUploadChange} className="hidden" />
        </label>
        <span className={uploadFile ? "max-w-full truncate text-sm text-[#413830]" : "text-sm text-black/35"}>
          {uploadFile?.name || "Файл не выбран"}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-[minmax(160px,0.8fr)_minmax(160px,0.8fr)_minmax(220px,1.3fr)_auto_auto]">
        <input
          value={value.title}
          onChange={(event) => onChange({ ...value, title: event.target.value })}
          placeholder="Название"
          className="rounded-[14px] border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#7f1118]/35"
        />
        <input
          value={value.author}
          onChange={(event) => onChange({ ...value, author: event.target.value })}
          placeholder="Автор"
          className="rounded-[14px] border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#7f1118]/35"
        />
        <input
          value={value.url}
          onChange={(event) => {
            onUploadFileChange(null);
            onChange({ ...value, url: event.target.value });
          }}
          placeholder={uploadFile ? "URL будет заполнен после загрузки" : "Cloudflare URL"}
          disabled={Boolean(uploadFile)}
          className="rounded-[14px] border border-black/10 bg-white px-4 py-3 text-sm outline-none transition disabled:bg-black/[0.03] disabled:text-black/35 focus:border-[#7f1118]/35"
        />
        <label className="flex items-center gap-3 rounded-[14px] border border-black/10 bg-white px-4 py-3 text-sm text-black/65">
          <input
            type="checkbox"
            checked={value.is_published}
            onChange={(event) => onChange({ ...value, is_published: event.target.checked })}
            className="h-4 w-4 accent-[#7f1118]"
          />
          Published
        </label>
        <div className="flex items-center gap-2">
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-full bg-[#7f1118] px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white disabled:opacity-50"
          >
            {isSaving ? "Saving" : "Save"}
          </button>
          {onCancel ? (
            <button type="button" onClick={onCancel} className="rounded-full border border-black/10 px-5 py-3 text-xs uppercase tracking-[0.16em] text-black/55">
              Cancel
            </button>
          ) : null}
        </div>
      </div>
    </form>
  );
}

export default function AdminMusicsPage() {
  const [musics, setMusics] = React.useState([]);
  const [form, setForm] = React.useState(emptyForm);
  const [uploadFile, setUploadFile] = React.useState(null);
  const [editingId, setEditingId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);
  const [error, setError] = React.useState("");
  const notification = useNotification();

  async function loadMusics() {
    try {
      setIsLoading(true);
      setError("");
      const response = await fetch("/api/v1/musics");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Music list could not be loaded");
      }
      setMusics(data);
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : "Music list could not be loaded";
      setError(message);
      notification.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    loadMusics();
  }, []);

  function resetForm() {
    setForm(emptyForm);
    setUploadFile(null);
    setEditingId(null);
  }

  async function saveMusic() {
    try {
      setIsSaving(true);
      setError("");

      let payload = form;
      if (uploadFile) {
        const uploadPayload = new FormData();
        uploadPayload.append("file", uploadFile);

        const uploadResponse = await fetch("/api/v1/uploads/audio", {
          method: "POST",
          body: uploadPayload
        });
        const uploadData = await uploadResponse.json();
        if (!uploadResponse.ok) {
          throw new Error(uploadData.detail || "Audio could not be uploaded");
        }

        payload = {
          ...form,
          title: form.title.trim() || filenameToTitle(uploadFile.name),
          author: form.author.trim(),
          url: uploadData.url
        };
      }

      const response = await fetch(editingId ? `/api/v1/musics/${editingId}` : "/api/v1/musics", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Music could not be saved");
      }

      setMusics((current) => (editingId ? current.map((item) => (item.id === editingId ? data : item)) : [data, ...current]));
      resetForm();
      notification.success("Music saved");
    } catch (saveError) {
      const message = saveError instanceof Error ? saveError.message : "Music could not be saved";
      setError(message);
      notification.error(message);
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteMusic(music) {
    try {
      const response = await fetch(`/api/v1/musics/${music.id}`, { method: "DELETE" });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Music could not be deleted");
      }
      setMusics((current) => current.filter((item) => item.id !== music.id));
      if (editingId === music.id) {
        resetForm();
      }
      notification.success("Music deleted");
    } catch (deleteError) {
      const message = deleteError instanceof Error ? deleteError.message : "Music could not be deleted";
      setError(message);
      notification.error(message);
    }
  }

  function startEdit(music) {
    setEditingId(music.id);
    setUploadFile(null);
    setForm({
      title: music.title,
      author: music.author || "",
      url: music.url,
      is_published: music.is_published
    });
  }

  return (
    <AdminShell title="Music" description="Cloudflare audio tracks for invitation forms. Published tracks appear in customer dropdowns.">
      <div className="space-y-6">
        <MusicForm
          value={form}
          uploadFile={uploadFile}
          isSaving={isSaving}
          onChange={setForm}
          onUploadFileChange={setUploadFile}
          onSubmit={saveMusic}
          onCancel={editingId ? resetForm : null}
        />

        {error ? <div className="rounded-[16px] bg-[#fff1ee] px-4 py-3 text-sm text-[#a03f35]">{error}</div> : null}

        <div className="overflow-hidden rounded-[22px] border border-black/10">
          <div className="grid grid-cols-[1fr_1fr_1.4fr_120px_150px] gap-4 bg-[#7f1118]/7 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-black/50">
            <span>Title</span>
            <span>Author</span>
            <span>URL</span>
            <span>Published</span>
            <span>Actions</span>
          </div>
          {isLoading ? (
            <div className="px-5 py-8 text-sm text-black/45">Loading music...</div>
          ) : musics.length === 0 ? (
            <div className="px-5 py-8 text-sm text-black/45">No music yet.</div>
          ) : (
            <div className="divide-y divide-black/8">
              {musics.map((music) => (
                <div key={music.id} className="grid grid-cols-[1fr_1fr_1.4fr_120px_150px] items-center gap-4 px-5 py-4 text-sm">
                  <span className="font-medium text-black/75">{music.title}</span>
                  <span className="text-black/55">{music.author || "-"}</span>
                  <a href={music.url} target="_blank" rel="noreferrer" className="truncate font-mono text-xs text-[#7f1118]">
                    {music.url}
                  </a>
                  <span className={music.is_published ? "text-[#2f7a48]" : "text-black/35"}>{music.is_published ? "true" : "false"}</span>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => startEdit(music)} className="rounded-full border border-black/10 px-3 py-2 text-xs text-black/55">
                      Edit
                    </button>
                    <button type="button" onClick={() => deleteMusic(music)} className="rounded-full border border-[#a03f35]/20 px-3 py-2 text-xs text-[#a03f35]">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
