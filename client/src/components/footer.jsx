import { Link } from "react-router-dom";

const DOMAIN = process.env.REACT_APP_DOMAIN || "priglasitelnoe.com";

export default function Footer() {
  return (
    <footer className="space-y-3 text-center text-xs text-black/50">
      <div className="h-px w-full bg-black/10" />
      <p>
        Сайт создан с помощью{" "}
        <Link to="/" className="underline-offset-2 transition hover:underline">
          {DOMAIN}
        </Link>
      </p>
    </footer>
  );
}
