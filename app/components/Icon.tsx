import Link from "next/link";

export function EmailIcon() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        className="h-4 w-4 opacity-70"
      >
        <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
        <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
      </svg>
    </>
  );
}

export function UserIcon() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        className="h-4 w-4 opacity-70"
      >
        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
      </svg>
    </>
  );
}

export function PasswordIcon() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        className="h-4 w-4 opacity-70"
      >
        <path
          fillRule="evenodd"
          d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
          clipRule="evenodd"
        />
      </svg>
    </>
  );
}

export function InfoIcon() {
  return (
    <>
      <svg
        className="flex-shrink-0 w-4 h-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
    </>
  );
}

export function Chat({ width, height }: { width?: string; height?: string }) {
  return (
    <Link href={"/"}>
      <svg
        className="dark:fill-white w-40"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width={width}
        height={height}
      >
        <path d="M 24 5 C 11.938759 5 2 13.42848 2 24 C 2 27.816747 3.3193921 31.369043 5.5488281 34.333984 C 4.9869207 36.756046 3.7959954 39.098472 2.9375 40.291016 L 2.9394531 40.291016 C 2.4512957 40.968852 2.4734674 41.853394 2.8476562 42.478516 C 3.2218452 43.103637 3.9888765 43.543224 4.8164062 43.4375 C 7.0972371 43.146609 10.756642 42.635664 14.384766 40.902344 A 1.0001 1.0001 0 1 0 13.523438 39.097656 C 10.233088 40.669606 6.8176125 41.165956 4.5664062 41.453125 C 5.6447727 39.953605 6.9372647 37.394913 7.5488281 34.570312 A 1.0001 1.0001 0 0 0 7.5605469 33.736328 A 1.0001 1.0001 0 0 0 7.3359375 33.390625 A 1.0001 1.0001 0 0 0 7.3300781 33.386719 C 5.2181907 30.683804 4 27.466822 4 24 C 4 14.68952 12.865241 7 24 7 C 35.134759 7 44 14.68952 44 24 C 44 33.31048 35.134759 41 24 41 C 22.001253 41 20.072542 40.749669 18.253906 40.287109 A 1.0004656 1.0004656 0 1 0 17.761719 42.226562 C 19.741083 42.730004 21.834747 43 24 43 C 36.061241 43 46 34.57152 46 24 C 46 13.42848 36.061241 5 24 5 z"></path>
      </svg>
    </Link>
  );
}

export function BackIcon({
  width,
  height,
}: {
  width?: string;
  height?: string;
}) {
  return (
    <svg
      data-slot="icon"
      fill="none"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className="stroke-black dark:stroke-white"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
      ></path>
    </svg>
  );
}

export function LogoutIcon({
  width,
  height,
}: {
  width?: string;
  height?: string;
}) {
  return (
    <svg
      data-slot="icon"
      fill="none"
      stroke-width="1.5"
      // stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="stroke-black dark:stroke-white"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
      ></path>
    </svg>
  );
}
