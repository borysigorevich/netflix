import type {NextPage, GetServerSideProps} from 'next'
import Head from "next/head";
import {useRouter} from 'next/router'
import {Banner, Header, Modal, Row} from "@components";

import {requests} from '@utils'
import {HomeResponseType} from "@types";
import {useAuth} from "@hooks";
import {useRecoilState} from "recoil";
import {modalState} from "@atoms";

export const getServerSideProps: GetServerSideProps = async () => {
    const [
        netflixOriginals,
        trending,
        topRated,
        actionMovies,
        comedyMovies,
        horrorMovies,
        romanceMovies,
        documentaries
    ] = await Promise.all([
            fetch(requests.fetchNetflixOriginals).then(response => response.json()),
            fetch(requests.fetchTrending).then(response => response.json()),
            fetch(requests.fetchTopRated).then(response => response.json()),
            fetch(requests.fetchActionMovies).then(response => response.json()),
            fetch(requests.fetchComedyMovies).then(response => response.json()),
            fetch(requests.fetchHorrorMovies).then(response => response.json()),
            fetch(requests.fetchRomanceMovies).then(response => response.json()),
            fetch(requests.fetchDocumentaries).then(response => response.json()),
        ]
    )

    return {
        props: {
            netflixOriginals: netflixOriginals.results,
            trending: trending.results,
            topRated: topRated.results,
            actionMovies: actionMovies.results,
            comedyMovies: comedyMovies.results,
            horrorMovies: horrorMovies.results,
            romanceMovies: romanceMovies.results,
            documentaries: documentaries.results
        }
    }
}

const Home: NextPage<HomeResponseType> = (
    {
        netflixOriginals,
        trending,
        topRated,
        actionMovies,
        comedyMovies,
        horrorMovies,
        romanceMovies,
        documentaries
    }) => {

    const {user} = useAuth()
    const [open, setOpen] = useRecoilState(modalState)

    if (!user) return <div></div>

    return (
        <div className={'relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]'}>
            <Head>
                <title>Home - Netflix</title>
            </Head>
            <Header/>
            <main className={'relative pl-4 pb-16 transition-all lg:space-y lg:pl-16'}>
                <Banner
                    netflixOriginals={netflixOriginals}
                />
                <section className={'md:space-y-16'}>

                    <Row title={'Trending now'} movies={trending}/>
                    <Row title={'Top Rated'} movies={topRated}/>
                    <Row title={'Action Movies'} movies={actionMovies}/>
                    <Row title={'Comedies'} movies={comedyMovies}/>

                    {/*MyList*/}

                    <Row title={'Horrors Movies'} movies={horrorMovies}/>
                    <Row title={'Romance Movies'} movies={romanceMovies}/>
                    <Row title={'Documentaries'} movies={documentaries}/>

                </section>
            </main>

            {open && <Modal/>}
        </div>
    )
}

export default Home
