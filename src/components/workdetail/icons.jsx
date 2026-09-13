import PropTypes from "prop-types";

// Icônes SVG partagées utilisées dans la page de détail d'un projet.
// Centralisées ici pour éviter la duplication de balises <svg> dans WorkDetail.jsx

export const CheckIcon = ({ className = "w-4 h-4 text-fuchsia-300 mt-0.5 shrink-0" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24">
    <path fill="currentColor" d="M10.09 15.59L7.5 13l-1.41 1.41l4 4l8-8L16.68 9z" />
  </svg>
);
CheckIcon.propTypes = {
  className: PropTypes.string,
};

export const ArrowLeftIcon = ({ className = "w-4 h-4 text-white" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);
ArrowLeftIcon.propTypes = {
  className: PropTypes.string,
};

export const ChevronIcon = ({ className = "w-8 h-8" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24">
    <path fill="currentColor" d="m13.15 16.15l-3.625-3.625q-.125-.125-.175-.25T9.3 12t.05-.275t.175-.25L13.15 7.85q.075-.075.163-.112T13.5 7.7q.2 0 .35.138T14 8.2v7.6q0 .225-.15.363t-.35.137q-.05 0-.35-.15" />
  </svg>
);
ChevronIcon.propTypes = {
  className: PropTypes.string,
};

export const ShareIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24">
    <path fill="currentColor" d="M17 22q-1.25 0-2.125-.875T14 19q0-.15.075-.7L7.05 14.2q-.4.375-.925.588T5 15q-1.25 0-2.125-.875T2 12t.875-2.125T5 9q.6 0 1.125.213t.925.587l7.025-4.1q-.05-.175-.062-.337T14 5q0-1.25.875-2.125T17 2t2.125.875T20 5t-.875 2.125T17 8q-.6 0-1.125-.213T14.95 7.2l-7.025 4.1q.05.175.063.338T8 12t-.012.363t-.063.337l7.025 4.1q.4-.375.925-.587T17 16q1.25 0 2.125.875T20 19t-.875 2.125T17 22" />
  </svg>
);
ShareIcon.propTypes = {
  className: PropTypes.string,
};

export const DemoIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24">
    <path fill="currentColor" d="M12 2L2 7l10 5l10-5zm0 7l-10 5l10 5l10-5z" />
  </svg>
);
DemoIcon.propTypes = {
  className: PropTypes.string,
};

export const GithubIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24">
    <path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48v-1.71c-2.78.61-3.37-1.34-3.37-1.34c-.46-1.16-1.12-1.47-1.12-1.47c-.92-.63.07-.62.07-.62c1 .07 1.52 1.03 1.52 1.03c.9 1.55 2.41 1.1 3 .84c.09-.65.35-1.08.64-1.33c-2.22-.24-4.56-1.11-4.56-4.92c0-1.09.38-1.98 1-2.68c-.1-.25-.44-1.26.1-2.62c0 0 .84-.27 2.75 1.05c.8-.22 1.65-.33 2.5-.33s1.7.11 2.5.33c1.91-1.32 2.75-1.05 2.75-1.05c.54 1.36.2 2.37.1 2.62c.62.7 1 1.59 1 2.68c0 3.82-2.34 4.67-4.57 4.91c.36.31.69.92.69 1.86v2.75c0 .26.18.59.69.49A10 10 0 0 0 12 2" />
  </svg>
);
GithubIcon.propTypes = {
  className: PropTypes.string,
}
