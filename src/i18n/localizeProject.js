import projectsEn from "../constants/projects.en";

// Projet dans la langue voulue : les textes anglais remplacent les textes français,
// tout le reste (images, liens, technos) est commun
export const localizeProject = (project, locale) => {
  const en = locale === "en" ? projectsEn[project.id] : null;
  if (!en) return project;
  const { captions, details, ...fields } = en;
  return {
    ...project,
    ...fields,
    gallery: project.gallery?.map((image, i) => ({ ...image, caption: captions?.[i] ?? image.caption })),
    details: { ...project.details, ...details },
  };
};
