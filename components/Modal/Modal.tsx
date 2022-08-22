import React, {useEffect, useState} from 'react';
import {useRecoilState} from "recoil";
import ReactPlayer from 'react-player/lazy'

import {PlusIcon, ThumbUpIcon, VolumeOffIcon, VolumeUpIcon, XIcon} from "@heroicons/react/solid";
import {FaPlay} from "react-icons/fa";

import {modalState, movieState} from '@atoms'
import {MuiModal} from '@common'
import {Element, GenreType} from "@types";


export const Modal = () => {
    const [open, setOpen] = useRecoilState(modalState)
    const [movie, setMovie] = useRecoilState(movieState)
    const [trailer, setTrailer] = useState('')
    const [genres, setGenres] = useState<GenreType[]>([])

    const [muted, setMuted] = useState(false)
    const [playing, setPlaying] = useState(true)


    const handleClose = () => setOpen(false)

    const handlePlaying = () => setPlaying(state => !state)

    useEffect(() => {
        if (!movie) return

        const fetchMovie = async () => {
            const data = await fetch(
                `https://api.themoviedb.org/3/${
                    movie?.media_type === 'tv' ? 'tv' : 'movie'
                }/${movie?.id}?api_key=${
                    process.env.NEXT_PUBLIC_API_KEY
                }&language=en-US&append_to_response=videos`
            ).then((response) => response.json())

            console.log(data)
            if (data?.videos.results.length > 0) {
                const index = data.videos.results.findIndex((element: Element) => element.type === 'Trailer')
                setTrailer(data.videos.results[index].key)
            }

            if (data?.genres) {
                setGenres(data.genres)
            }
        }

        fetchMovie()

    }, [])

    return (
        <MuiModal
            open={open}
            onClose={handleClose}
            className={'fixed !top-7 left-0 z-50 mx-auto w-full max-w-5xl overflow-y-scroll rounded-md scrollbar-hide'}>
            <>
                <button
                    onClick={handleClose}
                    className={'modalButton absolute right-5 top-5 !z-40 border-none bg-[#181818] hover:bg-[#181818]'}>
                    <XIcon className={'w-6 h-6'}/>
                </button>

                <div className={'relative pt-[56.25%]'}>
                    <ReactPlayer
                        url={ trailer ? `https://www.youtube.com/watch?v=${trailer}` : 'https://www.youtube.com/watch?v=2DjM0lY4pbE'}
                        width="100%"
                        height="100%"
                        className={'absolute top-0 left-0'}
                        playing={playing}
                        muted={muted}
                    />

                    <div className={'absolute bottom-10 flex w-full items-center justify-between px-10'}>
                        <div className={'flex gap-2'}>

                            <button
                                onClick={handlePlaying}
                                className={'flex items-center gap-2 rounded bg-white txt-xl px-8 text-black font-bold transition hover:bg-[#e6e6e6]'}>
                                <FaPlay className={'w-7 h-7 text-black'}/>
                                Play
                            </button>

                            <button className={'modalButton'}>
                                <PlusIcon className={'w-7 h-7'}/>
                            </button>

                            <button className={'modalButton'}>
                                <ThumbUpIcon className={'w-7 h-7'}/>
                            </button>
                        </div>

                        <button className={'modalButton'} onClick={() => setMuted(state => !state)}>
                            {muted
                                ? <VolumeOffIcon className={'w-6 h-6'}/>
                                : <VolumeUpIcon className={'w-6 h-6'}/>
                            }
                        </button>
                    </div>
                </div>


                <div className={'flex gap-16 rounded-b-md bg-[#181818] px-10 py-8'}>
                    <div className={'space-y-6 text-lg'}>
                        <div className={'flex items-center gap-2 text-sm'}>
                            <p className={'font-semibold text-green-400'}>{movie?.vote_average * 10}% Match</p>
                            <p className={'font-light'}>{movie?.release_date || movie?.first_air_date}</p>
                            <div
                                className={'flex h-4 items-center justify-center border border-white/40 rounded px-1.5 text-xs'}>
                                HD
                            </div>
                        </div>

                        <div className={'flex flex-col gap-y-4 gap-x-10 font-light md:flex-row'}>
                            <p className={'w-5/6'}>{movie?.overview}</p>
                            <div className={'flex flex-col text-sm gap-3'}>
                                <div>
                                    <span className={'text-[gray]'}>Genres: </span>
                                    {genres.map(genre => genre.name).join(', ')}
                                </div>

                                <div>
                                    <span className={'text-[gray]'}>Original Language: </span>
                                    {movie?.original_language}
                                </div>

                                <div>
                                    <span className={'text-[gray]'}>Total votes: </span>
                                    {movie?.vote_count}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </>
        </MuiModal>
    );
};