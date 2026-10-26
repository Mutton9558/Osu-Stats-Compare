'use client';

import { useEffect, useState, useRef } from 'react';

const MusicBox = () => {

    const playlist = [
        "[宇宙語コミュニケーションッ!!] by maimaishi",
        "[Star Trail] by FLASH BEAT",
        "[Angel Beat] by FLASH BEAT",
        "[常時・THE・トリッパー] by SAKURA BEATZ.JP"
    ]

    const [val, setVal] = useState(100);
    const [duration, setDuration] = useState(1);
    const [paused, setPaused] = useState(true);
    const [icon, setIcon] = useState("/play.svg")
    const [audioSrc, setAudioSrc] = useState(0);
    const [volIcon, setVolIcon] = useState("volume-full.svg")

    const audioRef = useRef<HTMLAudioElement>(null);

    const nextSong = () => {
        if(audioRef) {
            if(audioRef.current){
                setAudioSrc((prevIndex) => (prevIndex + 1) % playlist.length);
            }
        }
    };

    const prevSong = () => {
        if(audioRef) {
            if(audioRef.current){
                if(audioRef.current.currentTime < 3){
                    setAudioSrc((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
                } else {
                    audioRef.current.currentTime = 0;
                    audioRef.current.play();
                }
            }
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.load();
            audioRef.current.play().catch((error) => {
                console.log("Playback interrupted or blocked:", error);
            });
        }
    }, [audioSrc]);

    useEffect(() => {

        if(paused){
            setIcon("/play.svg");
            if(audioRef){
                audioRef.current?.pause();
            }
        } else {
            setIcon("/pause.svg");
            if(audioRef){
                audioRef.current?.play();
            }
        }
    }, [paused])

    useEffect(() => {
        if(audioRef){
            if(audioRef.current){
                audioRef.current.volume = val/1000;
                if(val <= 0) {
                    setVolIcon("volume-mute.svg");
                } else if (val <= 50){
                    setVolIcon("volume-low.svg");
                } else {
                    setVolIcon("volume-full.svg")
                }
            }
        }
    }, [val])

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setDuration((audioRef.current.currentTime / audioRef.current.duration) * 100)
        }
    };

    return (
        <div id="music-container" className="absolute top-4 sm:right-0 overflow-hidden w-72 h-28 p-4 rounded-xl m-8 bg-gray-200 text-black border-black dark:bg-gray-700 cursor-pointer dark:border-white border-2 dark:text-white font-mono text-sm flex items-center justify-center flex-col">
            <h1 className='text-center'>{playlist[audioSrc]}</h1>
            <div id="music-buttons" className='flex gap-4'>
                <button id="audio-back-btn" onClick={prevSong}><img src="/skip-previous.svg" alt='audio-back' className='dark:invert cursor-pointer'></img></button>
                <button id="audio-pause-btn" onClick={() => setPaused(!paused)}><img src={icon} alt='audio-play-status' className='invert cursor-pointer'></img></button>
                <button id="audio-next-btn" onClick={nextSong}><img src="/skip-next.svg" alt='audio-next' className='invert cursor-pointer'></img></button>
            </div>
            <div id="volume-slider" className='flex flex-row items-center gap-2'>
                <img src={volIcon} alt='volume-icon' className='invert'></img>
                <input type="range" min="0" max="100" value={val} className='cursor-pointer accent-white' onChange={(e) => setVal(Number(e.target.value))}></input>
            </div>
            <span style={{ width: `${duration}%` }} className="h-1 bg-pink-400 absolute bottom-0 left-0 "></span>
            <audio ref={audioRef} src={`/audio/${playlist[audioSrc]}.mp3`} onTimeUpdate={handleTimeUpdate} onEnded={nextSong}></audio>
        </div>
    ) 
}

export default MusicBox;