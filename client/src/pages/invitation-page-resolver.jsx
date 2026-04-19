import React from "react";
import { useParams } from "react-router-dom";
import InvitationTemplate1Page, { TEMPLATE_1_PATH } from "./templates/invitation-page_template_1.jsx";
import InvitationTemplate2Page, { TEMPLATE_2_PATH } from "./templates/invitation-page_template_2.jsx";
import InvitationTemplate3Page, { TEMPLATE_3_PATH } from "./templates/invitation-page_template_3.jsx";
import InvitationTemplate4Page, {
  TEMPLATE_4_PATH,
  TEMPLATE_4_TYPE
} from "./templates/invitation-page_template_4.jsx";
import InvitationTemplate5Page, {
  TEMPLATE_5_PATH,
  TEMPLATE_5_TYPE
} from "./templates/invitation-page_template_5.jsx";
import InvitationTemplate6Page, {
  TEMPLATE_6_PATH,
  TEMPLATE_6_TYPE
} from "./templates/invitation-page_template_6.jsx";
import NotFoundPage from "../pages/not-found-page.jsx";

const templateRegistry = {
  [TEMPLATE_1_PATH]: InvitationTemplate1Page,
  [TEMPLATE_2_PATH]: InvitationTemplate2Page,
  [TEMPLATE_3_PATH]: InvitationTemplate3Page,
  [TEMPLATE_4_TYPE]: InvitationTemplate4Page,
  [TEMPLATE_4_PATH]: InvitationTemplate4Page,
  [TEMPLATE_5_TYPE]: InvitationTemplate5Page,
  [TEMPLATE_5_PATH]: InvitationTemplate5Page,
  [TEMPLATE_6_TYPE]: InvitationTemplate6Page,
  [TEMPLATE_6_PATH]: InvitationTemplate6Page
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
          throw new Error(data.detail || "Failed to load invitation");
        }

        if (isMounted) {
          setEventData(data);
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError instanceof Error ? requestError.message : "Unknown error");
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
    return <TemplateState title="Loading Invitation" description="Fetching event data." />;
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
        <p className="text-xs uppercase tracking-[0.38em] text-white/40">Invitation</p>
        <h1 className="mt-6 font-['Georgia','Times_New_Roman',serif] text-5xl leading-none md:text-7xl">{title}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/70 md:text-lg">{description}</p>
      </div>
    </main>
  );
}
