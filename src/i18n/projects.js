import { useMemo } from "react";

import { projects } from "../constants";
import { localizeProject } from "./localizeProject";
import { useI18n } from "./I18nProvider";

// Liste des projets (même ordre que dans les constantes) dans la langue de la page
export const useProjects = () => {
  const { locale } = useI18n();
  return useMemo(() => projects.map((project) => localizeProject(project, locale)), [locale]);
};
