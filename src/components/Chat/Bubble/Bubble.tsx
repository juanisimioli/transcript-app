import { useAudioContext } from "@/Contexts/AudioContext/useAudioPlayer";
import { useAutoScrollContext } from "@/Contexts/AutoScrollContext/useAutoScrollContext";
import Content from "./Content/Content";
import Role from "./Role/Role";
import { Bubble as BubbleType } from "@/types/types";

const Bubble = ({ bubble }: { bubble: BubbleType }) => {
  const { currentTime } = useAudioContext();
  const { activeBubbleRef } = useAutoScrollContext();

  const currentNumber = parseFloat(currentTime.toFixed(3));

  const isActive = currentNumber >= bubble.start && currentNumber <= bubble.end;

  return (
    <div
      ref={isActive ? activeBubbleRef : null}
      className={`flex flex-col p-8 max-w-xs break-words ${
        bubble.role === "agent" ? "ml-auto" : "mr-auto"
      } ${isActive ? "opacity-100" : "opacity-50"}`}
    >
      <Content bubble={bubble} />
      <Role role={bubble.role} />
    </div>
  );
};

export default Bubble;
