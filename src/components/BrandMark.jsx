import { useId } from "react";
import PropTypes from "prop-types";

// Logo PN, concept « Bloc » : un cube isométrique, le P sur la face gauche, le N sur la face droite,
// le dégradé de la charte (#22d3ee → #804dee) sur le dessus. Front et back, deux faces d'un même volume.
// Sous 28 px les lettres deviennent illisibles : on n'affiche alors que le cube (variante « simple »).
const BrandMark = ({ size = 40, simple = false, className = "" }) => {
  const gradientId = `pn-top-${useId().replace(/:/g, "")}`;

  if (simple || size < 28) {
    return (
      <svg width={size} height={size} viewBox="18 13 84 94" aria-hidden="true" className={className}>
        <polygon points="60,16 98,38 60,60 22,38" fill="#22d3ee" />
        <polygon points="22,38 60,60 60,104 22,82" fill="#7c4dff" />
        <polygon points="60,60 98,38 98,82 60,104" fill="#3b1f8f" />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="10 10 100 100" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#804dee" />
        </linearGradient>
      </defs>
      <polygon points="60,16 98,38 60,60 22,38" fill={`url(#${gradientId})`} />
      <polygon points="22,38 60,60 60,104 22,82" fill="#1a1440" />
      <polygon points="60,60 98,38 98,82 60,104" fill="#0f0c2a" />
      <path d="M22 38 L60 60 L98 38 M60 60 V104" fill="none" stroke="rgba(255,255,255,.22)" strokeWidth=".8" />
      <path
        d="M33.4 82 V53.4 L48.6 62.2 V75.4 L33.4 66.6"
        fill="none"
        stroke="#b79cff"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M70.6 91.2 V62.6 L87.4 81.6 V53"
        fill="none"
        stroke="#22d3ee"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

BrandMark.propTypes = {
  size: PropTypes.number,
  simple: PropTypes.bool,
  className: PropTypes.string,
};

export default BrandMark;
