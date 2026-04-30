import React from "react";
import CeremonialPalaceArrowRight from "../../../assets/ceremonial-palace-template/arrow-right.jsx";

const CEREMONIAL_TORN_EDGE_SRC = "/images/templates/ceremonial-palace/Mask_group_2_1_Trace.svg";
const CEREMONIAL_SCRIPT_FONT = '"Bickham Script Pro", "Bickham Script Display", "Snell Roundhand", "Apple Chancery", "Brush Script MT", cursive';

const GALLERY_IMAGES = [
  {
    src: "/images/photo_example_1.jpg",
    alt: "Той суреті"
  },
  {
    src: "/images/photo_example_2.jpg",
    alt: "Той сәті"
  },
  {
    src: "/images/photo_example_3.jpg",
    alt: "Жас жұбайлар"
  }
];

export default function InvitationDressCodeCeremonialPalace({ template }) {
  const configuredGalleryImages = Array.isArray(template.dressCode.galleryImages) ? template.dressCode.galleryImages : [];
  const galleryImageKey = configuredGalleryImages.join("\n");
  const galleryImages = React.useMemo(() => {
    const imageSources = galleryImageKey ? galleryImageKey.split("\n") : [];
    if (imageSources.length) {
      return imageSources.map((src, index) => ({
        src,
        alt: `Той суреті ${index + 1}`
      }));
    }

    return GALLERY_IMAGES;
  }, [galleryImageKey]);
  const [slideIndex, setSlideIndex] = React.useState(1);
  const [isTransitionEnabled, setIsTransitionEnabled] = React.useState(true);
  const isAnimatingRef = React.useRef(false);
  const slideCount = galleryImages.length;
  const carouselSlides = [galleryImages[slideCount - 1], ...galleryImages, galleryImages[0]];
  const activeIndex = (slideIndex - 1 + slideCount) % slideCount;

  React.useEffect(() => {
    galleryImages.forEach((image) => {
      const preloadedImage = new Image();
      preloadedImage.src = image.src;
    });
  }, [galleryImages]);

  React.useEffect(() => {
    setSlideIndex(1);
    setIsTransitionEnabled(false);
    isAnimatingRef.current = false;
  }, [galleryImages]);

  const moveSlide = React.useCallback((step) => {
    if (isAnimatingRef.current) {
      return;
    }

    isAnimatingRef.current = true;
    setIsTransitionEnabled(true);
    setSlideIndex((currentIndex) => currentIndex + step);
  }, []);

  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      moveSlide(1);
    }, 3500);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [moveSlide]);

  React.useEffect(() => {
    if (isTransitionEnabled) {
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      setIsTransitionEnabled(true);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [isTransitionEnabled]);

  function showPreviousSlide() {
    moveSlide(-1);
  }

  function showNextSlide() {
    moveSlide(1);
  }

  function handleSlideTransitionEnd() {
    if (slideIndex === 0) {
      setIsTransitionEnabled(false);
      setSlideIndex(slideCount);
      isAnimatingRef.current = false;
      return;
    }

    if (slideIndex === slideCount + 1) {
      setIsTransitionEnabled(false);
      setSlideIndex(1);
      isAnimatingRef.current = false;
      return;
    }

    isAnimatingRef.current = false;
  }

  return (
    <section className="relative bg-[#66021F] text-white">
      <div className="pointer-events-none absolute inset-x-0 -top-[24px] z-20 h-[48px] overflow-hidden">
        <img
          src={CEREMONIAL_TORN_EDGE_SRC}
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 top-0 block h-[120px] max-w-none -translate-x-1/2 rotate-180 object-contain"
        />
      </div>

      <div className="px-6 pb-16 pt-12 text-center">
        <h2 className="text-[2.65rem] font-normal leading-none" style={{ fontFamily: CEREMONIAL_SCRIPT_FONT }}>
          Галерея
        </h2>

        <div className="relative mx-auto mt-8 max-w-[330px]">
          <div className="overflow-hidden rounded-[2px] border border-white/18 bg-[#4e061a] shadow-[0_16px_36px_rgba(0,0,0,0.18)]">
            <div
              className={`flex ${isTransitionEnabled ? "transition-transform duration-700 ease-out" : ""}`}
              style={{ transform: `translateX(-${slideIndex * 100}%)` }}
              onTransitionEnd={handleSlideTransitionEnd}
            >
              {carouselSlides.map((image, index) => (
                <div key={`${image.src}-${index}`} className="relative h-[410px] min-w-full overflow-hidden bg-[#2a3e4a]">
                  {image.src.endsWith(".MP4") ? (
                    <video src={image.src} autoPlay muted loop playsInline className="h-full w-full object-cover" />
                  ) : (
                    <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={showPreviousSlide}
            className="absolute left-[-18px] top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/45 bg-[#66021F]/85 p-0 text-white shadow-[0_8px_18px_rgba(0,0,0,0.18)] backdrop-blur-sm"
            aria-label="Алдыңғы сурет"
          >
            <CeremonialPalaceArrowRight className="block h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={showNextSlide}
            className="absolute right-[-18px] top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/45 bg-[#66021F]/85 p-0 text-white shadow-[0_8px_18px_rgba(0,0,0,0.18)] backdrop-blur-sm"
            aria-label="Келесі сурет"
          >
            <CeremonialPalaceArrowRight className="block h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2">
          {galleryImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => {
                if (isAnimatingRef.current || index === activeIndex) {
                  return;
                }

                isAnimatingRef.current = true;
                setIsTransitionEnabled(true);
                setSlideIndex(index + 1);
              }}
              className={`h-2.5 w-2.5 rounded-full border border-white/80 transition ${index === activeIndex ? "bg-white" : "bg-white/20"}`}
              aria-label={`${index + 1}-суретті көрсету`}
            />
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 -bottom-[24px] z-20 h-[48px] overflow-hidden">
        <img
          src={CEREMONIAL_TORN_EDGE_SRC}
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 block h-[130px] max-w-none -translate-x-1/2 object-contain"
        />
      </div>
    </section>
  );
}





