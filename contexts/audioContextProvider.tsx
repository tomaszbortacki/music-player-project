import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { SongModel } from "@helpers/song-model";
import { errorHandler } from "@helpers/error-handler";

interface Props {
  children: ReactNode | Array<ReactNode>;
}

type PlayPause = (song: SongModel) => void;

interface Context {
  currentAudio: SongModel | undefined;
  isPlaying: boolean;
  playPause: PlayPause;
  duration: number;
  progress: number;
  progressStyle: string;
  changeProgress: (value: number) => void;
  startTimer: () => void;
}

const AudioContext = createContext<Context>({} as Context);

const AudioContextProvider = ({ children }: Props) => {
  const [currentAudio, setCurrentAudio] = useState<SongModel>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>();
  const intervalRef = useRef<NodeJS.Timer>();
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [progressStyle, setProgressStyle] = useState("");

  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current?.ended) {
        clearInterval(intervalRef.current);
        clearPlay();
      }

      if (audioRef.current?.currentTime) {
        setProgress(audioRef.current.currentTime);
      }
    }, 1000);
  };

  const startPlay = () => {
    audioRef.current
      ?.play()
      .then(() => {
        if (audioRef.current?.volume) {
          audioRef.current.volume = 0.1;
        }
        setIsPlaying(true);
        setDuration(audioRef.current?.duration || 0);
        startTimer();
      })
      .catch(errorHandler);
  };

  const stopPlay = () => {
    audioRef.current?.pause();
    clearInterval(intervalRef.current);
    setIsPlaying(false);
  };

  const changeProgress = (value: number) => {
    clearInterval(intervalRef.current);
    if (audioRef.current?.currentTime) {
      audioRef.current.currentTime = value;
      setProgress(value);
    }
  };

  const clearPlay = () => {
    if (!currentAudio) return;

    stopPlay();
    setDuration(0);
    setProgress(0);
    setProgressPercentage(0);
    setIsPlaying(false);
    audioRef.current = new Audio(currentAudio.path);
  };

  const playPause: PlayPause = (song) => {
    if (currentAudio?.id_song === song.id_song) {
      if (audioRef.current?.paused) {
        startPlay();
      } else {
        stopPlay();
      }
      return;
    }

    setCurrentAudio(song);
  };

  useEffect(() => {
    clearPlay();
    startPlay();
  }, [currentAudio]);

  useEffect(() => {
    setProgressPercentage(() => (progress / duration) * 100);
  }, [progress, duration]);

  useEffect(() => {
    setProgressStyle(
      `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${progressPercentage}%, #474747), color-stop(${progressPercentage}%, rgba(71, 71, 71, 0.1)))`
    );
  }, [progressPercentage]);

  return (
    <AudioContext.Provider
      value={{
        currentAudio,
        isPlaying,
        playPause,
        duration,
        progress,
        progressStyle,
        changeProgress,
        startTimer,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => useContext(AudioContext);

export default AudioContextProvider;
