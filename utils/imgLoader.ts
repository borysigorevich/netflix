import {ImageLoaderProps} from 'next/image'

export const loader = ({src, width, quality}: ImageLoaderProps) => src + `?w=${width}&q=${quality || '75'}`