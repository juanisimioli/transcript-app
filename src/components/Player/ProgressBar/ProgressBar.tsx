import { useAudioContext } from "@/Contexts/AudioContext/useAudioPlayer";
import useTooltipTime from "../useTooltipTime/useTooltipTime";
import Time from "../Time/Time";

const ProgressBar = () => {
  const { currentTime, duration, inputRef, handleSeek } = useAudioContext();

  const { handleHover, handleSeekStart, handleSeekEnd, Tooltip } =
    useTooltipTime();

  return (
    <div className="flex items-center w-full gap-2 mt-4">
      <Time time={currentTime} />
      <input
        className="w-full cursor-pointer "
        ref={inputRef}
        type="range"
        min="0"
        max={duration}
        step="0.001"
        value={currentTime}
        onChange={handleSeek}
        onMouseDown={handleSeekStart}
        onMouseUp={handleSeekEnd}
        onMouseMove={handleHover}
        onTouchStart={handleSeekStart}
        onTouchEnd={handleSeekEnd}
        onTouchMove={handleHover}
      />
      <Time time={duration} />
      <Tooltip />
    </div>
  );
};

export default ProgressBar;
