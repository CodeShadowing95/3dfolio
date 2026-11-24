import { useEffect, useState } from "react";
import { getVisitorCompany } from "../utils/visitor";

// Entreprise passée dans le lien (?pour=…), lue après le montage : la page
// générée à l'avance est la même pour tout le monde, le message s'ajoute ensuite.
const useVisitorCompany = () => {
  const [company, setCompany] = useState(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lecture côté navigateur après le montage (page générée en statique)
    setCompany(getVisitorCompany());
  }, []);
  return company;
};

export default useVisitorCompany;
