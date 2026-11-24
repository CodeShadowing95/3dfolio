import { useEffect, useState } from "react";
import { getVisitorCompany } from "../utils/visitor";

// Entreprise passée dans le lien (?pour=…), lue après le montage : la page
// générée à l'avance est la même pour tout le monde, le message s'ajoute ensuite.
const useVisitorCompany = () => {
  const [company, setCompany] = useState(null);
  useEffect(() => {
    setCompany(getVisitorCompany());
  }, []);
  return company;
};

export default useVisitorCompany;
