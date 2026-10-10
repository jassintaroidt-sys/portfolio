import React, { useRef, useEffect } from 'react';
import { mediaUrl } from '../../lib/media';

// Global video queue manager to ensure max 6 active videos concurrently (§8.4)
class VideoQueueManager {
  private activeVideos: HTMLVideoElement[] = [];
  private maxActive: number = 6;

  public requestPlay(video: HTMLVideoElement) {
    if (this.activeVideos.includes(video)) {
      video.play().catch(() => {});
      return;
    }

    if (this.activeVideos.length >= this.maxActive) {
      // Pause oldest video
      const oldest = this.activeVideos.shift();
      if (oldest) {
        oldest.pause();
      }
    }

    this.activeVideos.push(video);
    video.play().catch(() => {});
  }

  public notifyPause(video: HTMLVideoElement) {
    this.activeVideos = this.activeVideos.filter((v) => v !== video);
    video.pause();
  }

  public pauseAll() {
    this.activeVideos.forEach((v) => v.pause());
  }

  public resumeVisible() {
    this.activeVideos.forEach((v) => v.play().catch(() => {}));
  }
}

const videoManager = new VideoQueueManager();

// Tab visibility listener (§5)
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      videoManager.pauseAll();
    } else {
      videoManager.resumeVisible();
    }
  });
}

export interface SafeVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  filePath: string;
  posterFile?: string;
  width?: number;
  height?: number;
  className?: string;
}

export function SafeVideo({
  filePath,
  posterFile,
  width,
  height,
  className = '',
  ...props
}: SafeVideoProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoUrl = mediaUrl(`video/${filePath}`);
  const computedPoster = posterFile
    ? mediaUrl(`posters/${posterFile}`)
    : mediaUrl(`posters/${filePath.replace(/\.mp4$/i, '.jpg')}`);

  const aspectRatio = width && height ? `${width} / ${height}` : undefined;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          videoManager.requestPlay(video);
        } else {
          videoManager.notifyPause(video);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      videoManager.notifyPause(video);
    };
  }, []);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        poster={computedPoster}
        muted
        playsInline
        loop
        preload="none"
        aria-hidden="true"
        className="w-full h-full object-contain block"
        {...props}
      />
    </div>
  );
}

export default SafeVideo;
