export default function Remocon() {
  return (
    <div className="relative">
      <svg
        data-slot="icon"
        fill="none"
        stroke-width="1.5"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        width={40}
        height={40}
        className="absolute -top-40 right-20 stroke-black dark:stroke-white"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
        ></path>
      </svg>
    </div>
  );
}
