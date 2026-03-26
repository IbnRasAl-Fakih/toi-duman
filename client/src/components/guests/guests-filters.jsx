import CreateEventSelectField from "../admin/create-event/create-event-select-field.jsx";

const statusOptions = [
  { value: "all", label: "Все" },
  { value: "yes", label: "Придут" },
  { value: "no", label: "Не придут" }
];

const sortOptions = [
  { value: "latest", label: "Сначала новые" },
  { value: "name_asc", label: "Имя A-Z" },
  { value: "name_desc", label: "Имя Z-A" },
  { value: "status", label: "По статусу" }
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
        <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-black/50">Поиск</span>
        <input
          type="text"
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Имя гостя"
          className="w-full rounded-[18px] border border-black/10 bg-[#fcfaf7] px-4 py-3 text-sm outline-none transition placeholder:text-black/30 focus:border-[#7f1118]/40 focus:bg-white"
        />
      </label>

      <CreateEventSelectField
        label="Статус"
        value={statusFilter}
        onChange={onStatusFilterChange}
        options={statusOptions}
      />

      <CreateEventSelectField
        label="Сортировка"
        value={sortKey}
        onChange={onSortKeyChange}
        options={sortOptions}
      />
    </div>
  );
}
