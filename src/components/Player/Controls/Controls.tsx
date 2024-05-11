import {
  Play,
  Pause,
  ChatBubble,
  ArrowsUpDown,
} from "@/components/Icons/Icons";
import { useAudioContext } from "../../../Contexts/AudioContext/useAudioPlayer";
import { useAutoScrollContext } from "../../../Contexts/AutoScrollContext/useAutoScrollContext";

const Controls = () => {
  const { isPlaying, togglePlay } = useAudioContext();
  const { scrollEnabled, setScrollEnabled } = useAutoScrollContext();

  return (
    <div className="flex items-center">
      <button
        className="text-purple bg-lightGray hover:text-fuchsia font-bold py-2 px-4 rounded select-none"
        onClick={togglePlay}
      >
        {isPlaying ? <Pause /> : <Play />}
      </button>

      <button
        className={`${isPlaying && scrollEnabled ? "animate-pulse" : ""}
        ${
          scrollEnabled ? "text-white" : "text-gray-400"
        } flex text-gray-400 font-bold py-2 px-4 ml-2 rounded transition duration-300 ease-in-out hover:text-lavender select-none`}
        onClick={() => setScrollEnabled(!scrollEnabled)}
      >
        <ChatBubble />
        {scrollEnabled ? <ArrowsUpDown /> : null}
      </button>
    </div>
  );
};

export default Controls;
