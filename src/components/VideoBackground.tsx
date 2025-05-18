"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface VideoBackgroundProps {
  videoUrl?: string | null; // Make videoUrl optional and allow null
  imageUrl?: string; // Image is optional
  alt: string;
}

export default function VideoBackground({
  videoUrl,
  imageUrl,
  alt,
}: VideoBackgroundProps) {
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Start playing video as soon as possible
  useEffect(() => {
    if (videoRef.current && videoUrl) {
      console.log("Attempting to play video:", videoUrl);
      const playVideo = async () => {
        try {
          await videoRef.current?.play();
        } catch (error) {
          console.error("Video playback failed:", error);
          setVideoError(true);
        }
      };

      playVideo();
    }
  }, [videoUrl]);

  const handleVideoError = () => {
    console.log("Video error occurred");
    setVideoError(true);
  };

  const handleVideoLoad = () => {
    console.log("Video loaded successfully");
    setVideoLoaded(true);
  };

  // No video available or video errored - show image fallback
  if (!videoUrl || videoError) {
    if (imageUrl) {
      return (
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className='object-cover'
          priority
        />
      );
    } else {
      // No image fallback either - show dark background
      return <div className='w-full h-full bg-gray-900'></div>;
    }
  }

  // Video is available - prioritize it
  return (
    <div className='w-full h-full relative'>
      {/* Base image that shows until video loads (if provided) */}
      {!videoLoaded && imageUrl && (
        <div className='absolute inset-0 z-5'>
          <Image
            src={imageUrl}
            alt={alt}
            fill
            className='object-cover'
            priority
          />
        </div>
      )}

      {/* Video as primary content - higher z-index */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className='absolute inset-0 object-cover w-full h-full z-10'
        poster={imageUrl}
        onError={handleVideoError}
        onLoadedData={handleVideoLoad}
      >
        <source src={videoUrl} type='video/mp4' />
      </video>

      {/* Fallback if video is loading and no image */}
      {!videoLoaded && !imageUrl && (
        <div className='absolute inset-0 bg-gray-900 z-5'></div>
      )}
    </div>
  );
}
