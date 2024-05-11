import { useAudioContext } from "../../Contexts/AudioContext/useAudioPlayer";

import Controls from "./Controls/Controls";
import ProgressBar from "./ProgressBar/ProgressBar";

const Player = () => {
  const { audioRef, handleAudioTimeUpdate } = useAudioContext();

  return (
    <div className="flex items-center px-6 py-2 flex-col mb-2 bg-purple">
      <audio
        ref={audioRef}
        src={"transcription_01.wav"}
        onTimeUpdate={handleAudioTimeUpdate}
      />

      <ProgressBar />

      <Controls />
    </div>
  );
};

export default Player;
