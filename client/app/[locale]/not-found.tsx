import Link from "next/link";
import { getDictionary } from "@/lib/dictionaries";
import { defaultLocale } from "@/lib/i18n";

export default function NotFound() {
  const dictionary = getDictionary(defaultLocale).notFound;

  return (
    <section className="not-found">
      <div className="container not-found__wrap">
        <p className="eyebrow">404</p>
        <h1>{dictionary.title}</h1>
        <p>{dictionary.text}</p>
        <Link className="button" href={`/${defaultLocale}`}>
          {dictionary.back}
        </Link>
      </div>
    </section>
  );
}
