import React,{useEffect, useState} from 'react'
import NavegationBar from "../components/navegationBar"
import trailer from '../assets/trailer.mp4'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Button } from "@nextui-org/react";
import { showNotification } from '../helpers/showNotification';
import { useCartContext } from '../context/cartContext';
import { useTranslation } from 'react-i18next';
import shop from '../data/shop.json'
import Footer from '../components/footer';
import ForniteShop from '../components/fortniteShop';
import supabase from '../data/supabase';

const Mainpage = () => {

  const [data, setData] = useState(shop)
  const [pack, setPack] = useState([])
  const {addProduct, showCart} = useCartContext();

  const { t, i18n } = useTranslation();

  useEffect(()=>{
    const {data:authListener} = supabase.auth.onAuthStateChange(async (event,session) => {
      console.log(session)
    })
  },[])

  const handleAddCart = (item, quantity) => {
    addProduct(item, quantity);
  };

  const responsiveBucks = {
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 4,
      slidesToSlide: 3
    },
    tablet: {
      breakpoint: { max: 1200, min: 560 },
      items: 2,
      slidesToSlide: 2
    },
    mobile: {
      breakpoint: { max: 560, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  const responsivePacks = {
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 2,
      slidesToSlide: 3
    },
    tablet: {
      breakpoint: { max: 1200, min: 560 },
      items: 2,
      slidesToSlide: 2
    },
    mobile: {
      breakpoint: { max: 560, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };
  
  return (
    <div className="min-h-screen">
      <NavegationBar/>
      <video className="h-[94vh] w-full object-cover" autoPlay={false} muted={true}>
        <source src={trailer} type="video/mp4" />
      </video>
      <div className="w-7/12 m-auto max-xl:w-full max-md:w-full flex flex-col justify-center mb-10">
        <div className="flex justify-center items-start mt-10 w-full m-auto max-xl:w-7/12">
          <img className="w-60 h-[450px] object-cover max-md:hidden" src="https://media.fortniteapi.io/images/cosmetics/a4ae8f546570a63acd3d87f50d37bdfc/v2/background.png" alt="" />
          <div className="ml-5 w-full max-md:ml-0">
            <h1 className="inter600 text-3xl ml-5">{t('v-bucks')}</h1>
            <Carousel swipeable={false} responsive={responsiveBucks} infinite arrows>
              {
                data.vbucks.map((item,index) => {
                  return (
                    <div key={index} className="flex flex-col items-center mt-8">
                      <img className="h-[225px]" src={item.img} alt="" />
                      <p className="text-lg inter400 mt-2" onClick={showCart}>{item.amount} {t(item.type)}</p>
                      <p className="inter600 text-indigo-500">${i18n.language === "es" ? `${item.priceARS} ARS` : `${item.priceUSD} USD`}</p>
                      <Button onClick={() => {handleAddCart(item, 1)}} color="primary" className="w-10/12 rounded-sm mt-2 inter400" variant="ghost">{t('addcart')}</Button>
                      <Button color="primary" className="w-10/12 rounded-sm mt-2 inter600" variant="solid">{t('buy')}</Button>
                    </div>
                  )})
              }
            </Carousel>
          </div>
        </div>
        <div className="flex justify-center items-start mt-10 w-full m-auto max-xl:w-7/12">
          <img className="w-60 h-[480px] object-cover max-md:hidden" src="https://image.jeuxvideo.com/medias-md/155664/1556640059-7837-card.png" alt="" />
          <div className="ml-5 w-full max-md:ml-0">
            <h1 className="inter600 text-3xl ml-5">Packs</h1>
            <Carousel swipeable={false} responsive={responsivePacks} infinite={true}>
              {
                data.packs.map((item,index) => {
                  return (
                    <div key={index} className="flex flex-col items-center mt-8 h-[410px] justify-between">
                      <img className="h-[225px] w-[150px] object-cover" src={item.img} alt="" />
                      <p className="text-lg inter400 mt-2">{item.name}</p>
                      <p className="inter600 text-indigo-500">${i18n.language === "es" ? `${item.priceARS} ARS` : `${item.priceUSD} USD`}</p>
                      <div className="w-10/12">
                        <Button onClick={() => {handleAddCart(item, 1)}} color="primary" className="w-full rounded-sm mt-2 inter400" variant="ghost">{t('addcart')}</Button>
                        <Button color="primary" className="w-full rounded-sm mt-2 inter600" variant="solid">{t('buy')}</Button>
                      </div>
                    </div>
                  )
                })
              }
            </Carousel>
          </div>
        </div>
        <div className="flex mt-10 w-full m-auto h-[458px] max-xl:w-9/12 max-md:flex-col max-md:w-7/12 max-md:h-auto">
          <img className="w-9/12 object-cover max-lg:w-7/12 max-md:w-full" src="https://www.ggrecon.com/media/jv1bxy2o/fortnite-how-to-get-stars.jpg" alt="" />
          <div className="w-3/12 ml-5 flex flex-col justify-between h-full max-lg:w-5/12 max-md:w-full max-md:ml-0 max-md:mt-4">
            <div>
              <h1 className="inter600 text-3xl max-sm:text-2xl">{t('battlepass')}</h1>
              <p className="inter400 text-xl max-sm:text-lg">{t('chapter')} 5</p>
            </div>
            <div className="w-full">
              <p className="inter600 text-indigo-500 text-xl">${i18n.language === "es" ? `${data.battlepass.priceARS} ARS` : `${data.battlepass.priceUSD} USD`}</p>
              <Button color="primary" onClick={() => {handleAddCart(data.battlepass, 1)}} className="w-full rounded-sm mt-2 inter400" variant="ghost">{t('addcart')}</Button>
              <Button color="primary" className="w-full rounded-sm mt-2 inter600" variant="solid">{t('buy')}</Button>
            </div>
          </div>
        </div>
        <div className="mt-12 max-xl:w-9/12 max-xl:m-auto max-xl:mt-12 max-sm:w-full max-sm:flex max-sm:justify-center max-sm:flex-col max-sm:items-center">
          <h1 className="inter600 text-3xl">{t('gift')}</h1>
          <ForniteShop/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Mainpage