import React from "react";
import { useParams } from "react-router-dom";
import { THEATRE_OF_LOVE_TYPE, THEATRE_OF_LOVE_PATH} from "./templates/theatre-of-love-page.jsx";
import { ROMANCE_GARDEN_TYPE, ROMANCE_GARDEN_PATH } from "./templates/romance-garden-page.jsx";
import NotFoundPage from "../pages/not-found-page.jsx";

const templateRegistry = {
  [THEATRE_OF_LOVE_TYPE]: THEATRE_OF_LOVE_TYPE,
  [THEATRE_OF_LOVE_PATH]: THEATRE_OF_LOVE_PATH,
  [ROMANCE_GARDEN_TYPE]: ROMANCE_GARDEN_TYPE,
  [ROMANCE_GARDEN_PATH]: ROMANCE_GARDEN_PATH
};

export default function InvitationPageResolver() {
  const { slug } = useParams();
  const [eventData, setEventData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    let isMounted = true;

    async function loadEvent() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(`/api/v1/events/slug/${slug}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || "Шақыруды жүктеу мүмкін болмады");
        }

        if (isMounted) {
          setEventData(data);
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError instanceof Error ? requestError.message : "Белгісіз қате");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    if (slug) {
      loadEvent();
    }

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (isLoading) {
    return <TemplateState title="Шақыру жүктелуде" description="Оқиға деректерін алып жатырмыз." />;
  }

  if (error || !eventData?.config) {
    return <NotFoundPage />;
  }

  const templateKey = eventData.config.template_path || eventData.config.template_type || eventData.template?.path;
  const TemplateComponent = templateRegistry[templateKey];

  if (!TemplateComponent) {
    return <NotFoundPage />;
  }

  return <TemplateComponent event={eventData} order={eventData.order || null} />;
}

function TemplateState({ title, description }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#240f11] to-[#111112] px-6 text-center text-[#f5e7dc]">
      <div className="w-full max-w-3xl">
        <p className="text-xs uppercase tracking-[0.38em] text-white/40">Шақыру</p>
        <h1 className="mt-6 font-['Georgia','Times_New_Roman',serif] text-5xl leading-none md:text-7xl">{title}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/70 md:text-lg">{description}</p>
      </div>
    </main>
  );
}
