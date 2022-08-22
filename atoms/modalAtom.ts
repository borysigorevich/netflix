import {DocumentData} from 'firebase/firestore'
import {atom} from 'recoil'
import {MovieType} from '@types'

export const modalState = atom({
    key: 'modalState',
    default: false
})

export const movieState = atom<MovieType | DocumentData | null>({
    key: 'movieState',
    default: null
})