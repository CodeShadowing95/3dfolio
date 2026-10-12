import { useEffect, useState } from "react";

// Indique si l'élément est actuellement visible à l'écran : sert à mettre
// en pause le rendu 3D quand la scène n'est plus visible.
const useInViewport = (ref, rootMargin = "0px") => {
    const [isInViewport, setIsInViewport] = useState(false);

    useEffect(() => {
        if (!ref.current) return;

        if (!("IntersectionObserver" in window)) {
            setIsInViewport(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => setIsInViewport(entry.isIntersecting),
            { rootMargin }
        );

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [ref, rootMargin]);

    return isInViewport;
};

export default useInViewport;
