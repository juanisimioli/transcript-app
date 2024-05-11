import { AudioProvider } from "../../Contexts/AudioContext/useAudioPlayer";
import { AutoScrollProvider } from "../../Contexts/AutoScrollContext/useAutoScrollContext";
import Chat from "../Chat/Chat";
import Player from "../Player/Player";

const App = () => {
  return (
    <AudioProvider>
      <AutoScrollProvider>
        <div className="h-screen flex flex-col justify-between text-white max-w-screen-lg mx-auto bg-purple">
          <Chat />
          <Player />
        </div>
      </AutoScrollProvider>
    </AudioProvider>
  );
};

export default App;
