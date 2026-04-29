import { Link } from "react-router-dom";

const DOMAIN = process.env.REACT_APP_DOMAIN || "priglasitelnoe.com";

export default function Footer({ className = "text-black/50", dividerClassName = "bg-black/10" }) {
  return (
    <footer className={`space-y-3 text-center text-xs ${className}`}>
      <div className={`h-px w-full ${dividerClassName}`} />
      <p>
        <Link to="/" className="underline-offset-2 transition hover:underline">
          {DOMAIN}
        </Link>
        {" "}арқылы жасалған
      </p>
    </footer>
  );
}
