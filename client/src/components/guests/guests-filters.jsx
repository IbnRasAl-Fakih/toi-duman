import CreateEventSelectField from "../admin/create-event/create-event-select-field.jsx";

const statusOptions = [
  { value: "all", label: "Барлығы" },
  { value: "yes", label: "Келеді" },
  { value: "no", label: "Келмейді" }
];

const sortOptions = [
  { value: "latest", label: "Алдымен жаңалары" },
  { value: "name_asc", label: "Аты A-Z" },
  { value: "name_desc", label: "Аты Z-A" },
  { value: "status", label: "Күйі бойынша" }
];

export default function GuestsFilters({
  searchValue,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortKey,
  onSortKeyChange
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px_220px]">
      <label className="block">
        <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-black/50">Іздеу</span>
        <input
          type="text"
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Қонақтың аты"
          className="w-full rounded-[18px] border border-black/10 bg-[#fcfaf7] px-4 py-3 text-sm outline-none transition placeholder:text-black/30 focus:border-[#7f1118]/40 focus:bg-white"
        />
      </label>

      <CreateEventSelectField
        label="Күйі"
        value={statusFilter}
        onChange={onStatusFilterChange}
        options={statusOptions}
      />

      <CreateEventSelectField
        label="Сұрыптау"
        value={sortKey}
        onChange={onSortKeyChange}
        options={sortOptions}
      />
    </div>
  );
}
