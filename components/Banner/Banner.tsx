import React, {useEffect, useState} from 'react';

import {Image} from '@common'
import {MovieType} from '@types'
import {baseUrl} from '@constants'

import {FaPlay} from 'react-icons/fa'
import {InformationCircleIcon} from "@heroicons/react/solid";

type BannerProps = {
    netflixOriginals: MovieType[]
}

export const Banner = ({netflixOriginals}: BannerProps) => {
    const [movie, setMovie] = useState<MovieType | null>(null)

    useEffect(() => {
        setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)])
    }, [netflixOriginals])


    return (
        <div className={'flex flex-col gap-2 py-16 md:gap-4 lg:h-[65vh] lg:pb-12 lg:justify-end'}>

            <div className={'absolute -z-10 top-0 left-0 h-[95vh] w-screen'}>
                <Image
                    src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
                    layout={'fill'}
                    objectFit={'cover'}
                />
            </div>

            <h1 className={'text-2xl md:text-4xl lg:text-7xl'}>
                {movie?.title || movie?.name || movie?.original_name}
            </h1>
            <p className={'max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl'}>
                {movie?.overview}
            </p>

            <div className={'flex gap-3'}>
                <button className={'bannerButton bg-white text-black'}><FaPlay
                    className={'h-4 w-4 text-black md:h-7 md:w-7'}/>Play
                </button>
                <button className={'bannerButton bg-[gray]/70'}>More Info <InformationCircleIcon className={'w-5 h-5 md:w-8 md:h-8'}/></button>
            </div>
        </div>
    );
};