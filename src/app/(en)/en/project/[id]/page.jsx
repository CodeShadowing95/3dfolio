import { ProjectPage, projectMetadata, projectStaticParams } from "@/app/_shared/project";

// Une page HTML générée par projet au moment du build
export const dynamicParams = false;
export const generateStaticParams = projectStaticParams;
export const generateMetadata = projectMetadata("en");
export default ProjectPage;
