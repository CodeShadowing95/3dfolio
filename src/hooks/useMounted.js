import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// false pendant le rendu serveur et l'hydratation, true ensuite :
// sert à n'afficher qu'au navigateur ce qui dépend de WebGL.
const useMounted = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

export default useMounted;
