import { useAudioContext } from "@/Contexts/AudioContext/useAudioPlayer";
import { Bubble } from "@/types/types";

const Content = ({ bubble }: { bubble: Bubble }) => {
  const { handleAudioSeek } = useAudioContext();
  const { start, role, content } = bubble;

  return (
    <div
      className={`rounded-lg px-4 py-2 ${
        role === "agent" ? "bg-purple" : "bg-fuchsia"
      } text-white mb-1 cursor-pointer`}
      onClick={() => handleAudioSeek(start)}
    >
      {content}
    </div>
  );
};

export default Content;
