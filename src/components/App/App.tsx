import { AudioProvider } from "../../Contexts/AudioContext/useAudioPlayer";
import { AutoScrollProvider } from "../../Contexts/AutoScrollContext/useAutoScrollContext";
import Chat from "../Chat/Chat";
import Player from "../Player/Player";

const App = () => {
  return (
    <AudioProvider>
      <AutoScrollProvider>
        <div className="h-[100vh]">
          <div className="h-[100svh] flex flex-col justify-between text-white mx-auto bg-purple">
            <Chat />
            <Player />
          </div>
        </div>
      </AutoScrollProvider>
    </AudioProvider>
  );
};

export default App;
