import React from "react";

export default function PriglasitelnoeLogo({
  className = "",
  color = "currentColor",
  goldColor = "#d8b05b",
  coralColor = "#f67d73",
  width = "100%",
  height,
  title = "priglasitelnoe.com",
}) {
  return (
    <svg
      viewBox="0 0 2048 495"
      width={width}
      height={height}
      role="img"
      aria-label={title}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="26"
        y="363"
        fill={color}
        fontFamily='"Nunito", "Avenir Next", "Trebuchet MS", sans-serif'
        fontSize="224"
        fontWeight="700"
        letterSpacing="-10"
      >
        priglasitelnoe.com
      </text>

      <rect x="1758" y="99" width="24" height="114" transform="rotate(-46 1770 156)" rx="1" fill={goldColor} />
      <rect x="1821" y="67" width="24" height="103" transform="rotate(-2 1833 118.5)" rx="1" fill={goldColor} />
      <rect x="1897" y="85" width="24" height="109" transform="rotate(34 1909 139.5)" rx="1" fill={coralColor} />
      <rect x="1950" y="153" width="24" height="106" transform="rotate(78 1962 206)" rx="1" fill={coralColor} />
      <rect x="1718" y="186" width="24" height="104" transform="rotate(-84 1730 238)" rx="1" fill={goldColor} />

      <path
        d="M1871 198L2025 274L1955 294L1996 345L1967 362L1927 308L1890 357L1871 198Z"
        fill={color}
      />
    </svg>
  );
}
