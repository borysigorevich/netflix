import React, {useRef, useState} from 'react';
import {MovieType} from "@types";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/outline";
import {Thumbnail} from "@components/Thumbnail";

type RowProps = {
    movies: MovieType[]
    title: string
}

export const Row = ({movies, title}: RowProps) => {

    const rowRef = useRef<HTMLDivElement>(null)
    const [isMoved, setIsMoved] = useState(false)

    const handleClick = (direction: string) => {
        setIsMoved(true)

        if (rowRef.current) {
            const {scrollLeft, clientWidth} = rowRef.current


            const scrollTo = direction === 'left'
                ? scrollLeft - clientWidth
                : scrollLeft + clientWidth

            rowRef.current.scrollTo({left: scrollTo, behavior: 'smooth'})
        }
    }

    return (
        <div className={'h-40 md:h-48 space-y-0.5 mid:space-y-2'}>
            <h2 className={'w-max cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl'}>{title}</h2>
            <div className={'group relative md:-ml-2'}>
                <ChevronLeftIcon
                    onClick={() => handleClick('left')}
                    className={`absolute top-0 bottom-0 left-2 z-40 m-auto w-9 h-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-${isMoved ? '100' : '0'}`}/>

                <div ref={rowRef}
                     className={'flex items-center gap-2.5 overflow-x-scroll md:p-2 scrollbar-hide'}>
                    {movies.map(movie => (
                        <Thumbnail
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
                </div>

                <ChevronRightIcon
                    onClick={() => handleClick('right')}
                    className={'absolute top-0 bottom-0 right-2 z-40 m-auto w-9 h-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100'}/>
            </div>
        </div>
    );
};