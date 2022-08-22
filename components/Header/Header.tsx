import React, {useState, useEffect} from 'react';

import {Image, Link} from '@common'
import {BellIcon, SearchIcon} from "@heroicons/react/solid";
import {loader} from "@utils";
import { useAuth } from '@hooks';

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const {logout} = useAuth()

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 0)

        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className={`${isScrolled && 'bg-[#141414]'}`}>
            <div className={'flex items-center gap-2 md:gap-10'}>
                <Image
                    loader={loader}
                    src={'https://rb.gy/ulxxee'}
                    width={100}
                    height={50}
                    objectFit={'contain'}
                />
                <div className={'gap-3 hidden md:flex'}>
                    <Link href={'/'}>
                        <a className={'headerLink'}>
                            Home
                        </a>
                    </Link>
                    <Link href={'/'}>
                        <a className={'headerLink'}>
                            TV shows
                        </a>
                    </Link>
                    <Link href={'/'}>
                        <a className={'headerLink'}>
                            Movies
                        </a>
                    </Link>
                    <Link href={'/'}>
                        <a className={'headerLink'}>
                            New & Popular
                        </a>
                    </Link>
                    <Link href={'/'}>
                        <a className={'headerLink'}>
                            My List
                        </a>
                    </Link>
                </div>
            </div>

            <div className={'flex items-center gap-4 text-sm font-light'}>
                <SearchIcon className={'hidden sm:inline w-6 h-6'}/>
                <p className={'hidden lg:inline'}>Kids</p>

                <BellIcon className={'hidden sm:inline w-6 h-6'}/>
                <Link href={'/account'}>
                    <a className={'relative w-6 h-6'}>
                        <Image
                            onClick={logout}
                            loader={loader}
                            src={'https://rb.gy/g1pwyx'}
                            layout={'fill'}
                            objectFit={'contain'}
                            className={'rounded'}
                        />
                    </a>
                </Link>
            </div>
        </header>
    );
};