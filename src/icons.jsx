const line = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

export function Icon({ name }) {
  switch (name) {
    case "dumbbell":
      return (
        <svg {...line}>
          <path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11" />
        </svg>
      );
    case "pulse":
      return (
        <svg {...line}>
          <path d="M3 12h4l2-6 4 12 2-6h6" />
        </svg>
      );
    case "kettlebell":
      return (
        <svg {...line}>
          <circle cx="12" cy="14.5" r="6" />
          <path d="M8.6 10C8.2 4.5 15.8 4.5 15.4 10" />
        </svg>
      );
    case "group":
      return (
        <svg {...line}>
          <circle cx="8" cy="8" r="3" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M2.5 19c0-3.5 2.5-5.5 5.5-5.5s5.5 2 5.5 5.5M14.8 14.2c3.4-.3 6.7 1.2 6.7 4.8" />
        </svg>
      );
    default:
      return null;
  }
}

export const WaIcon = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <path d="M16.04 3C9.4 3 4 8.4 4 15.04c0 2.12.55 4.18 1.6 6L4 28l7.1-1.86a12 12 0 0 0 4.94 1.06C22.68 27.2 28 21.8 28 15.16 28 8.5 22.68 3 16.04 3Zm0 21.9c-1.6 0-3.17-.43-4.54-1.24l-.33-.19-4.2 1.1 1.12-4.1-.21-.34a9.83 9.83 0 0 1-1.5-5.2c0-5.44 4.43-9.87 9.9-9.87 5.45 0 9.88 4.43 9.88 9.87 0 5.45-4.43 9.97-10.12 9.97Zm5.4-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
  </svg>
);

// Pirámide escalonada: el motivo de la marca
export const Logo = () => (
  <svg viewBox="0 0 44 22" aria-hidden="true">
    <path d="M0 22V16H6V11H12V6H17V1H27V6H32V11H38V16H44V22Z" fill="currentColor" />
  </svg>
);
