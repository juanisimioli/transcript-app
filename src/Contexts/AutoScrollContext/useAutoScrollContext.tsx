import { createContext, useContext, useState, useRef, useEffect } from "react";
import { useAudioContext } from "../AudioContext/useAudioPlayer";

type AutoScrollContextType = {
  scrollEnabled: boolean;
  setScrollEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  chatContainerRef: React.RefObject<HTMLDivElement>;
  activeBubbleRef: React.RefObject<HTMLDivElement>;
};

const AutoScrollContext = createContext<AutoScrollContextType | null>(null);

export const useAutoScroll = (): AutoScrollContextType => {
  const { currentTime } = useAudioContext();
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const activeBubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollEnabled || !activeBubbleRef.current || !chatContainerRef.current)
      return;

    const bubbleRect = activeBubbleRef.current.getBoundingClientRect();
    const containerRect = chatContainerRef.current.getBoundingClientRect();
    chatContainerRef.current.scrollTop += bubbleRect.top - containerRect.top;
  }, [currentTime, scrollEnabled]);

  return {
    scrollEnabled,
    setScrollEnabled,
    chatContainerRef,
    activeBubbleRef,
  };
};

export const AutoScrollProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const autoScroll = useAutoScroll();

  return (
    <AutoScrollContext.Provider value={autoScroll}>
      {children}
    </AutoScrollContext.Provider>
  );
};

export const useAutoScrollContext = (): AutoScrollContextType => {
  const context = useContext(AutoScrollContext);
  if (!context) {
    throw new Error(
      "useAutoScrollContext must be used within an AutoScrollProvider"
    );
  }
  return context;
};
