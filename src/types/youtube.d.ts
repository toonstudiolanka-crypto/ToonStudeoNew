declare namespace YT {
  enum PlayerState {
    UNSTARTED = -1,
    ENDED = 0,
    PLAYING = 1,
    PAUSED = 2,
    BUFFERING = 3,
    CUED = 5,
  }

  interface PlayerOptions {
    videoId?: string;
    width?: string | number;
    height?: string | number;
    playerVars?: Record<string, string | number>;
    events?: {
      onReady?: (event: PlayerEvent) => void;
      onStateChange?: (event: OnStateChangeEvent) => void;
      onError?: (event: PlayerEvent) => void;
    };
  }

  interface PlayerEvent {
    target: Player;
    data?: number;
  }

  type OnStateChangeEvent = PlayerEvent;

  class Player {
    constructor(element: HTMLElement | string, options: PlayerOptions);
    destroy(): void;
    mute(): void;
    playVideo(): void;
    pauseVideo(): void;
    getPlayerState(): number;
  }
}

interface Window {
  YT?: { Player: typeof YT.Player };
  onYouTubeIframeAPIReady?: () => void;
}
