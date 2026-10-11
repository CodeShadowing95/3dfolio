import { useEffect } from "react";
import { useProgress } from "@react-three/drei";
import PropTypes from "prop-types";

// Chargé à part pour que le préchargeur n'embarque pas three.js dans le fichier principal.
const ProgressBridge = ({ onProgress }) => {
  const { progress } = useProgress();

  useEffect(() => {
    onProgress(progress);
  }, [progress, onProgress]);

  return null;
};

ProgressBridge.propTypes = {
  onProgress: PropTypes.func.isRequired,
};

export default ProgressBridge;
