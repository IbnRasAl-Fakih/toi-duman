import React from "react";
import DatePicker from "react-datepicker";
import { kk } from "date-fns/locale";

export default function CreateEventTimeField({ label, selected, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-black/55">{label}</span>
      <DatePicker
        selected={selected}
        onChange={onChange}
        locale={kk}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Уақыт"
        dateFormat="HH:mm"
        placeholderText="Уақытты таңдаңыз"
        className="w-full rounded-[18px] border border-black/10 bg-[#fcfaf7] px-4 py-3 text-sm outline-none transition placeholder:text-black/30 focus:border-[#7f1118]/40 focus:bg-white"
        calendarClassName="!border-black/10 !rounded-[22px] !shadow-[0_24px_48px_rgba(31,26,23,0.12)]"
        wrapperClassName="block w-full"
      />
    </label>
  );
}