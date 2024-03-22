import React, {useState, useEffect} from 'react'
import { useTranslation } from 'react-i18next';
import { showNotification } from '../helpers/showNotification';
import supabase from '../data/supabase';
import { useNavigate } from 'react-router-dom';

const Loginpage = () => {

    const [email, setEmail] = useState('')
    const [tokenSent, setTokenSent] = useState('')
    const [token, setToken] = useState('');
    const { t } = useTranslation();

    const navigate = useNavigate();

    useEffect(()=>{
        const {data:authListener} = supabase.auth.onAuthStateChange(async (event,session) => {
          if(session){
            navigate('/')
          }
        })
    },[])

    const handleLogin = async () => {
        try {
          const { data, error } = await supabase.auth.signInWithOtp({
            email: email,
            options: {
              emailRedirectTo: 'https://example.com/welcome'
            }
          });
      
          if (error) {
            console.error('Error al enviar el token:', error.message);
          } else {
            setTokenSent(true)
          }
        } catch (error) {
          console.error('Error en el inicio de sesión:', error.message);
        }
    };

    const handleToken = async () => {
        if (token) {
            const { data, error } = await supabase.auth.verifyOtp({ 
                email: email, 
                token: token, 
                type: 'email'
            })
            showNotification(`Welcome ${email}`, 'success')
        } else {
          console.log('El usuario canceló la verificación.');
        }
    }

    const handleLoginGoogle = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google'
            })
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleLoginGithub = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'github'
            })
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleLoginDiscord = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'discord'
            })
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        {
            tokenSent === '' ? 
            <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
                    <h1 className="text-3xl font-semibold text-center text-indigo-600 uppercase inter900">{t('login')}</h1>
                    <div className="mt-6">
                        <div className="mb-2">
                            <label className="block text-sm font-semibold text-black inter600">Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} placeholder='Email' type="email" className="block w-full px-4 py-2 mt-2 text-black inter400 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                        </div>
                        <div className="mt-6">
                            <button onClick={handleLogin} className="w-full px-4 py-2 tracking-wide text-white inter400 transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-purple-600">{t('login')}</button>
                        </div>
                    </div>
                    <div className="relative flex items-center justify-center w-full mt-6 border border-t">
                        <div className="absolute px-5 bg-white inter400">{t('or')}</div>
                    </div>
                    <div className="flex mt-4 gap-x-2">
                        <button onClick={handleLoginGoogle} type="button" className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                            </svg>
                        </button>
                        <button onClick={handleLoginGithub} className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                                <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                            </svg>
                        </button>
                        <button onClick={handleLoginDiscord} className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512">
                                <path d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            : 
            <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
                    <h1 className="text-3xl font-semibold text-center text-indigo-600 uppercase inter900">{t('login')}</h1>
                    <div className='mt-2'>
                        <div className="mb-2">
                            <label className="block text-sm font-semibold text-black inter600">Token</label>
                            <input onChange={(e) => setToken(e.target.value)} value={token} type="token" placeholder='123456' className="block w-full px-4 py-2 mt-2 text-black inter400 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                        </div>
                        <p className='mt-2 inter600'>{t('tokensent')}</p>
                        <div className="mt-2">
                            <button onClick={handleToken} className="w-full px-4 py-2 tracking-wide text-white inter400 transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-purple-600">{t('login')}</button>
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    );
}

export default Loginpage