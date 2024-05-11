import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";

type AudioContextType = {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  audioRef: React.RefObject<HTMLAudioElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  togglePlay: () => void;
  handleSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  skipForward: () => void;
  skipBackward: () => void;
  handleAudioSeek: (time: number) => void;
  handleAudioTimeUpdate: () => void;
};

const AudioContext = createContext<AudioContextType | null>(null);

export const useAudioPlayer = (): AudioContextType => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const rafRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const togglePlay = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  }, []);

  // Skips 1 second forward
  const skipForward = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime += 1;
    }
  }, []);

  // Skips 1 second backward
  const skipBackward = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 1;
    }
  }, []);

  const handleAudioSeek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  }, []);

  const handleAudioTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      setDuration(Number(audioRef.current.duration));
    }
  }, [audioRef]);

  // Set up event listeners for "play" and "pause" events on the audio element.
  // When the audio starts playing, it continuously updates the current time of the audio playback.
  // If the audio is playing, it schedules a new animation frame to update the time.
  // When the audio is paused, it cancels the animation frame to stop updating the time.
  // Utilizing requestAnimationFrame in the useEffect ensures efficient rendering at the device's refresh rate,
  // resulting in smoother performance and a more responsive user experience.
  useEffect(() => {
    const updateTime = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);

        if (isPlaying) {
          // stores the ID returned by requestAnimationFrame in rafRef.current,
          // enabling later cancellation of the animation using cancelAnimationFrame.
          rafRef.current = requestAnimationFrame(updateTime);
        }
      }
    };

    const cancelAnimation = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };

    const handleEnded = () => {
      togglePlay();
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("play", updateTime);
      audioRef.current.addEventListener("pause", cancelAnimation);
      audioRef.current.addEventListener("ended", handleEnded);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("play", updateTime);
          audioRef.current.removeEventListener("pause", cancelAnimation);
          audioRef.current.removeEventListener("ended", handleEnded);
        }
      };
    }
  }, [isPlaying, togglePlay]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.code === "Space") {
        togglePlay();
      } else if (event.code === "ArrowRight") {
        skipForward();
      } else if (event.code === "ArrowLeft") {
        skipBackward();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [togglePlay, skipForward, skipBackward]);

  return {
    isPlaying,
    currentTime,
    duration,
    audioRef,
    inputRef,
    togglePlay,
    handleSeek,
    skipForward,
    skipBackward,
    handleAudioSeek,
    handleAudioTimeUpdate,
  };
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const audioPlayer = useAudioPlayer();

  return (
    <AudioContext.Provider value={audioPlayer}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudioContext must be used within an AudioProvider");
  }
  return context;
};
