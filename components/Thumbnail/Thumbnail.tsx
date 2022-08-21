import React from 'react';
import {MovieType} from "@types";

import {Image} from '@common'
import {baseUrl} from "@constants";

type ThumbnailProps = {
    movie: MovieType
}

export const Thumbnail = ({movie}: ThumbnailProps) => {
    return (
        <div className={'relative min-w-[180px] h-28 cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105'}>
            <Image
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
                layout={'fill'}
                className={'rounded-sm md:rounded'}
                objectFit={'cover'}
            />
        </div>
    );
};