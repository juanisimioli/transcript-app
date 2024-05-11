import { useState } from "react";
import { useAudioContext } from "@/Contexts/AudioContext/useAudioPlayer";
import { formatTime } from "@/utils/utils";

const useTooltipTime = () => {
  const { duration, inputRef } = useAudioContext();

  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
  const [tooltipLeftPosition, setTooltipLeftPosition] = useState<number | null>(
    null
  );

  const handleHover = (
    e: React.TouchEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>
  ) => {
    if (tooltipVisible) {
      const hoverTime = parseFloat(e.currentTarget.value);
      setHoverTime(hoverTime);
      if (inputRef.current) {
        const inputRect = inputRef.current.getBoundingClientRect();
        const position = (hoverTime / duration) * inputRef.current.offsetWidth;
        setTooltipLeftPosition(inputRect.left + position);
      }
    }
  };

  const handleSeekStart = (
    e: React.TouchEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>
  ) => {
    setTooltipVisible(true);
    handleHover(e);
  };

  const handleSeekEnd = () => {
    setTooltipVisible(false);
  };

  const Tooltip = () => {
    return (
      <>
        {tooltipVisible && hoverTime !== null && (
          <span
            className="absolute bg-gray-800 text-white px-1 py-0.5 rounded bottom-[70px]"
            style={{
              left: tooltipLeftPosition ? tooltipLeftPosition - 20 : 0,
            }}
          >
            {hoverTime !== null && formatTime(hoverTime)}
          </span>
        )}
      </>
    );
  };

  return { handleHover, handleSeekStart, handleSeekEnd, Tooltip };
};

export default useTooltipTime;
