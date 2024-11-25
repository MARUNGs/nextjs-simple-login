import { InfoIcon } from "./Icon";

export default function Alert() {
  return (
    <>
      <div
        className="flex items-center p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800"
        role="alert"
      >
        <InfoIcon />
        <div className="ms-3 text-sm font-medium">Welcome back!</div>
      </div>
    </>
  );
}
