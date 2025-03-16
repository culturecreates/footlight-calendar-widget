import { useState, useEffect, useContext } from 'react';
import WidgetContext from '../../context/WidgetContext';
import './progressiveImage.css';

/**
 * ProgressiveImage Component
 *
 * This component progressively loads a high-resolution image while displaying a thumbnail initially.
 * It also provides a fallback error placeholder if the image fails to load.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.thumbnail - The URL of the low-resolution thumbnail image.
 * @param {string} props.highRes - The URL of the high-resolution image.
 * @param {React.ComponentType<{ width: string; height: string; style?: React.CSSProperties }>} [props.onErrorPlaceholder] - A component to display when the image fails to load.
 * @param {string} props.alt - The alternative text for the image.
 * @param {string} [props.aspectRatioType='large'] - The key to retrieve the aspect ratio from `calendarData.imageConfig`.
 * @param {string} [props.parentCalssName='.calendar-widget-details-modal'] - The parent container selector used to determine current image width.
 * @param {Object} [props.errorPlaceHolderStyle] - Custom styles for the error placeholder component.
 * @param {Object} rest - Additional props passed to the `<img>` element.
 *
 * @returns {React.Element} The progressively loaded image component.
 */

const ProgressiveImage = ({
  thumbnail,
  highRes,
  onErrorPlaceholder: ErrorPlaceholder,
  alt,
  aspectRatioType = 'large',
  parentCalssName = '.calendar-widget-details-modal',
  errorPlaceHolderStyle,
  ...rest
}) => {
  const { calendarData } = useContext(WidgetContext);
  const aspectRatio = calendarData?.imageConfig?.[aspectRatioType]?.aspectRatio;

  const [imageSrc, setImageSrc] = useState(thumbnail || highRes);
  const [hasError, setHasError] = useState(false);
  const [defaultImageHeight, setDefaultImageHeight] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = highRes;
    img.onload = () => {
      setImageSrc(highRes);
    };
    img.onerror = () => {
      setHasError(true);
    };
  }, [highRes]);

  useEffect(() => {
    const updateHeight = () => {
      const modal = document.querySelector(`#calendar-widget ${parentCalssName}`);
      if (modal && aspectRatio) {
        const [widthRatio, heightRatio] = aspectRatio.split(':').map(Number);
        if (!widthRatio || !heightRatio) return; // Ensure valid numbers

        const width = modal.offsetWidth;
        setDefaultImageHeight(`${(width * heightRatio) / widthRatio}px`);
      }
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    const modal = document.querySelector(`#calendar-widget ${parentCalssName}`);
    if (modal) observer.observe(modal);

    return () => observer.disconnect();
  }, [aspectRatio]);

  const handleError = () => {
    setHasError(true);
  };

  if (hasError && ErrorPlaceholder) {
    return (
      <div
        className="default-image"
        style={{
          width: '100%',
          height: defaultImageHeight,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#E0E0E0',
        }}
      >
        <ErrorPlaceholder width="50%" height="50%" style={errorPlaceHolderStyle} />
      </div>
    );
  }

  return (
    <div
      className="progressive-image-wrapper"
      style={{ width: '100%', height: defaultImageHeight }}
    >
      <img src={imageSrc} alt={alt} {...rest} onError={handleError} />
    </div>
  );
};

export default ProgressiveImage;
