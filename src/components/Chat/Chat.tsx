import { transcription01 } from "@/data/transcription_01";
import { useAutoScrollContext } from "../../Contexts/AutoScrollContext/useAutoScrollContext";
import Bubble from "./Bubble/Bubble";

const Chat = () => {
  const { chatContainerRef, scrollEnabled } = useAutoScrollContext();

  return (
    <div
      ref={chatContainerRef}
      className="overflow-auto bg-lavender rounded-bl-2xl rounded-br-2xl"
      style={{
        scrollBehavior: scrollEnabled ? "smooth" : "auto",
        overscrollBehaviorY: "contain",
        scrollbarWidth: "thin",
        flex: "1",
      }}
    >
      {transcription01.map((bubble, index) => (
        <Bubble key={index} bubble={bubble} />
      ))}
    </div>
  );
};

export default Chat;
