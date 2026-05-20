export function isTemplateSectionEnabled(config, sectionId, fallback = true) {
  const sections = config?.sections;

  if (!sections || typeof sections !== "object") {
    return fallback;
  }

  return sections[sectionId] !== false;
}

export function getTemplateSections(config, sectionIds) {
  return sectionIds.reduce((result, sectionId) => {
    result[sectionId] = isTemplateSectionEnabled(config, sectionId);
    return result;
  }, {});
}

export function isTemplateElementEnabled(template, elementId, fallback = true) {
  const elements = template?.elements;

  if (!elements || typeof elements !== "object") {
    return fallback;
  }

  return elements[elementId] !== false;
}
