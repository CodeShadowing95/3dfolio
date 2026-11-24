import PropTypes from "prop-types";

import RootShell from "@/app/_shared/RootShell";
import { baseMetadata } from "@/app/_shared/metadata";

export { viewport } from "@/app/_shared/metadata";
export const metadata = baseMetadata("en");

// Mise en page racine du site en anglais (adresses sous /en/)
export default function EnglishLayout({ children }) {
  return <RootShell locale="en">{children}</RootShell>;
}

EnglishLayout.propTypes = {
  children: PropTypes.node,
};
