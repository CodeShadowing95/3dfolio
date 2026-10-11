import { Suspense, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

// Monte ses enfants (et télécharge leur code / leurs assets) seulement
// quand le bloc approche de l'écran.
const LazyOnView = ({ children, className = "", rootMargin = "300px 0px" }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!ref.current) return;

        if (!("IntersectionObserver" in window)) {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin }
        );

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [rootMargin]);

    return (
        <div ref={ref} className={className}>
            {isVisible && <Suspense fallback={null}>{children}</Suspense>}
        </div>
    );
};

LazyOnView.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    rootMargin: PropTypes.string,
};

export default LazyOnView;
