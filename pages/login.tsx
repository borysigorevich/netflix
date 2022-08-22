import React, {useState} from 'react';

import Head from 'next/head'
import {useForm, SubmitHandler} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

import {Image} from '@common'
import {loader} from "@utils";
import {useAuth} from "@hooks";

const yupSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(3).required()
})

type FormValues = {
    email: string
    password: string
}

const Login = () => {
    const [login, setLogin] = useState(false)
    const {signIn, signUp} = useAuth()

    const {register, handleSubmit, formState: {errors}} = useForm<FormValues>({
        resolver: yupResolver(yupSchema)
    })

    const onSubmit: SubmitHandler<FormValues> = async ({email, password}) => {
        if (login) {
            await signIn(email, password)
        } else {
            await signUp(email, password)
        }
    }
    console.log('Login render')
    return (
        <div
            className={'relative flex flex-col items-center justify-center bg-black md:bg-transparent h-screen w-screen'}>
            <Head>
                <title>Netflix</title>
            </Head>

            <Image
                className={'-z-10 opacity-60 !hidden sm:!inline'}
                src={'https://rb.gy/p2hphi'}
                layout={'fill'}
                objectFit={'cover'}
            />

            <div className={'absolute left-4 top-4 cursor-pointer md:left-10 md:top-6'}>
                <Image
                    loader={loader}
                    src={'https://rb.gy/ulxxee'}
                    width={150}
                    height={50}
                    objectFit={'contain'}
                />
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={'relative bg-black/75 px-10 py-6 md:px-14 space-y-8 rounded max-w-md'}
            >
                <h1 className={'text-4xl font-semibold'}>Sign in</h1>
                <div className={'flex flex-col gap-4'}>
                    <div>
                        <div
                            className={`relative before:w-${errors.email ? 'full' : '0'} before:absolute before:bottom-0 before:left-0 before:h-[2px] before:bg-[#e50914] before:transition-all`}>
                            <label>
                                <input autoComplete={'off'} type="email" placeholder={'Email'}
                                       className={'input'} {...register('email')}/>
                            </label>
                        </div>
                        {errors.email && <p className={'text-[13px] p-1 text-orange-500 font-light'}>
                            {errors.email.message}
                        </p>}</div>

                    <div>
                        <div
                            className={`relative before:w-${errors.password ? 'full' : '0'} before:absolute before:bottom-0 before:left-0 before:h-[2px] before:bg-[#e50914] before:transition-all`}>
                            <label>
                                <input autoComplete={'off'} type="password" placeholder={'Password'}
                                       className={'input'} {...register('password')}/>
                            </label>
                        </div>
                        {errors.password && <p className={'text-[13px] p-1 text-orange-500 font-light'}>
                            {errors.password.message}
                        </p>}
                    </div>
                </div>

                <button className={'w-full bg-[#e50914] py-3 rounded font-semibold '}
                        onClick={() => setLogin(true)}>Sign in
                </button>

                <div className={'text-[gray]'}>
                    New to Netflix?
                    <button className={'text-white hover:underline ml-1'} onClick={() => setLogin(false)}>Sign
                        up</button>
                </div>
            </form>

        </div>
    );
};

export default Login;