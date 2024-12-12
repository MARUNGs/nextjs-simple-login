import clsx from "clsx";

interface SelectSearchProps {
  customValue: string[];
  customSize?: string;
  onSelectChange?: (value: string) => void;
}

export default function SelectSearch({
  customValue,
  customSize,
  onSelectChange,
}: SelectSearchProps) {
  // select option 변경 이벤트
  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    onSelectChange(e.target.value);
  }

  return (
    <>
      <label
        htmlFor="searchFilter"
        className={`${clsx(
          "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        )}`}
      />
      <select
        id="searchFilter"
        className={`${clsx(
          "bg-gray-50 text-gray-900 text-sm block p-2.5",
          "border border-gray-300 rounded-lg",
          "focus:ring-stone-500 focus:border-stone-500",
          "dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-stone-500 dark:focus:border-stone-500",
          customSize
        )}`}
        onChange={onChange}
      >
        {customValue.map((value) => (
          <option value={value}>{value}</option>
        ))}
      </select>
    </>
  );
}
