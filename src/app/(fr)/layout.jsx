import PropTypes from "prop-types";

import RootShell from "@/app/_shared/RootShell";
import { baseMetadata } from "@/app/_shared/metadata";

export { viewport } from "@/app/_shared/metadata";
export const metadata = baseMetadata("fr");

// Mise en page racine du site en français (adresses sans préfixe)
export default function FrenchLayout({ children }) {
  return <RootShell locale="fr">{children}</RootShell>;
}

FrenchLayout.propTypes = {
  children: PropTypes.node,
};
