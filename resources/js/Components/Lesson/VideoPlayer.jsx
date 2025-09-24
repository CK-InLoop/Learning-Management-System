import { useState, useRef, useEffect } from 'react';
import { 
  PlayIcon,
  PauseIcon,
  VolumeUpIcon,
  VolumeOffIcon,
  ArrowsExpandIcon,
  ArrowsCollapseIcon,
  CheckCircleIcon,
  LockClosedIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline';
import ReactPlayer from 'react-player/lazy';

const VideoPlayer = ({ 
  url, 
  title, 
  duration, 
  completed = false, 
  locked = false,
  onComplete,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious
}) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [durationInSeconds, setDurationInSeconds] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [controlsTimeout, setControlsTimeout] = useState(null);
  const playerRef = useRef(null);
  const containerRef = useRef(null);

  // Format time (seconds) to mm:ss
  const formatTime = (seconds) => {
    const date = new Date(0);
    date.setSeconds(seconds);
    return date.toISOString().substr(14, 5);
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (locked) return;
    setPlaying(!playing);
  };

  // Toggle mute
  const toggleMute = () => {
    setMuted(!muted);
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setMuted(newVolume === 0);
  };

  // Handle progress
  const handleProgress = (state) => {
    if (!seeking) {
      setProgress(state.played * 100);
      setPlayedSeconds(state.playedSeconds);
    }
  };

  // Handle seeking
  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekChange = (e) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
  };

  const handleSeekMouseUp = (e) => {
    const newProgress = parseFloat(e.target.value);
    playerRef.current.seekTo(newProgress / 100);
    setSeeking(false);
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setFullscreen(!fullscreen);
  };

  // Handle video end
  const handleEnded = () => {
    setPlaying(false);
    if (onComplete && !completed) {
      onComplete();
    }
  };

  // Show controls on mouse move
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout) clearTimeout(controlsTimeout);
    setControlsTimeout(setTimeout(() => setShowControls(false), 3000));
  };

  // Set up event listeners
  useEffect(() => {
    // Auto-hide controls after 3 seconds of inactivity
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    // Clean up
    return () => {
      if (controlsTimeout) clearTimeout(controlsTimeout);
      clearTimeout(timer);
    };
  }, [controlsTimeout]);

  // Format duration
  useEffect(() => {
    if (duration) {
      const [minutes, seconds] = duration.split(':').map(Number);
      setDurationInSeconds(minutes * 60 + seconds);
    }
  }, [duration]);

  return (
    <div 
      ref={containerRef}
      className="relative bg-black rounded-lg overflow-hidden aspect-video"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Player */}
      <div className="w-full h-full flex items-center justify-center">
        {locked ? (
          <div className="text-center p-8">
            <LockClosedIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-white">This lesson is locked</h3>
            <p className="mt-1 text-sm text-gray-300">Complete the previous lessons to unlock this content.</p>
          </div>
        ) : (
          <ReactPlayer
            ref={playerRef}
            url={url}
            width="100%"
            height="100%"
            playing={playing}
            volume={volume}
            muted={muted}
            onProgress={handleProgress}
            onDuration={setDurationInSeconds}
            onEnded={handleEnded}
            config={{
              file: {
                attributes: {
                  controls: false,
                  disablePictureInPicture: true,
                },
              },
            }}
          />
        )}
      </div>

      {/* Overlay Controls */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
          <h2 className="text-white font-medium text-lg truncate max-w-xs">{title}</h2>
          <div className="flex space-x-2">
            <button
              onClick={toggleFullscreen}
              className="p-2 text-gray-200 hover:text-white focus:outline-none"
              aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              {fullscreen ? (
                <ArrowsCollapseIcon className="h-5 w-5" />
              ) : (
                <ArrowsExpandIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Center Play Button */}
        {!playing && (
          <button
            onClick={togglePlay}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-black/50 rounded-full text-white hover:bg-black/70 focus:outline-none"
            disabled={locked}
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? (
              <PauseIcon className="h-12 w-12" />
            ) : (
              <PlayIcon className="h-12 w-12" />
            )}
          </button>
        )}

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
          {/* Progress Bar */}
          <div className="w-full bg-gray-600 rounded-full h-1.5">
            <div 
              className="bg-indigo-600 h-1.5 rounded-full transition-all duration-200" 
              style={{ width: `${progress}%` }}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeekChange}
              onMouseDown={handleSeekMouseDown}
              onMouseUp={handleSeekMouseUp}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Play/Pause Button */}
              <button
                onClick={togglePlay}
                className="text-white hover:text-gray-200 focus:outline-none"
                disabled={locked}
                aria-label={playing ? 'Pause' : 'Play'}
              >
                {playing ? (
                  <PauseIcon className="h-6 w-6" />
                ) : (
                  <PlayIcon className="h-6 w-6" />
                )}
              </button>

              {/* Volume Control */}
              <div className="flex items-center space-x-2">
                <button 
                  onClick={toggleMute}
                  className="text-white hover:text-gray-200 focus:outline-none"
                  aria-label={muted ? 'Unmute' : 'Mute'}
                >
                  {muted || volume === 0 ? (
                    <VolumeOffIcon className="h-5 w-5" />
                  ) : (
                    <VolumeUpIcon className="h-5 w-5" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Time Display */}
              <div className="text-sm text-white">
                {formatTime(playedSeconds)} / {formatTime(durationInSeconds)}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Previous/Next Buttons */}
              <button
                onClick={onPrevious}
                disabled={!hasPrevious}
                className={`p-1 rounded ${
                  hasPrevious ? 'text-white hover:bg-white/20' : 'text-gray-500 cursor-not-allowed'
                }`}
                aria-label="Previous lesson"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              
              <button
                onClick={onNext}
                disabled={!hasNext}
                className={`p-1 rounded ${
                  hasNext ? 'text-white hover:bg-white/20' : 'text-gray-500 cursor-not-allowed'
                }`}
                aria-label="Next lesson"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>

              {/* Complete Button */}
              {!completed && !locked && (
                <button
                  onClick={onComplete}
                  className="ml-2 flex items-center px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <CheckCircleIcon className="h-4 w-4 mr-1" />
                  Mark as Complete
                </button>
              )}
              
              {completed && (
                <div className="ml-2 flex items-center text-sm text-green-400">
                  <CheckCircleIcon className="h-5 w-5 mr-1" />
                  Completed
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
