import { SVGProps } from "react";

export default function EyeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3.5981 11.7663C4.89784 8.39171 8.17084 6 12 6C15.8291 6 19.1021 8.39172 20.4018 11.7663C20.4597 11.9165 20.4597 12.0835 20.4018 12.2337C19.1021 15.6083 15.8291 18 12 18C8.17084 18 4.89784 15.6083 3.5981 12.2337C3.54022 12.0835 3.54022 11.9165 3.5981 11.7663Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
