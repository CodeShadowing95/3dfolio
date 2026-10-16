// Événements Umami envoyés depuis le code (les liens utilisent plutôt l'attribut data-umami-event).
// Sans effet si le script n'est pas chargé : développement local, bloqueur de publicité.
export const track = (event, data) => {
  try {
    window.umami?.track(event, data);
  } catch {
    // Le suivi ne doit jamais casser le site
  }
};
