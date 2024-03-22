import React, { useEffect, useState } from 'react'
import NavegationBar from '../components/navegationBar'
import { Input, Button, Select, SelectSection, SelectItem } from "@nextui-org/react";
import { useTranslation } from 'react-i18next';
import { useCartContext } from '../context/cartContext'
import { showNotification } from '../helpers/showNotification';
import makeOrderApi from '../helpers/makeOrder';
import ModalPayment from '../components/modal';

const Cartpage = () => {

  const [subtotal, setSubtotal] = useState(0)
  const [paymentMethods, setPaymentMethos] = useState(['Mercado Pago', 'Transferencia Bancaria', 'Bitcoin', 'USDT', 'Etherum', 'Binance'])
  const [paymentMethod, setPaymentMethod] = useState('')
  const [network, setNetwork] = useState('')
  const [wallet, setWallet] = useState('')
  const [total, setTotal] = useState(0)
  const [promoCode, setPromoCode] = useState('')
  const { cart, cleanCart, removeProduct, addProduct, addProductCart, getTotalPay } = useCartContext();
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const getTotal = async () => {
      if(i18n.language === 'es'){
        const totalPay = await getTotalPay('priceARS')
        setSubtotal(totalPay.toFixed(2))
      }else if (i18n.language === 'en'){
        const totalPay = await getTotalPay('priceUSD')
        setSubtotal(totalPay.toFixed(2))
      }
    }
    getTotal()
  },[cart])

  const handlePromo = async () => {
    console.log(promoCode)
  }

  return (
    <div className="h-screen w-full flex flex-col">
      <NavegationBar/>
      <div className='w-9/12 shadow-2xl rounded-lg flex m-auto mt-5 max-xl:flex-col max-xl:w-11/12 h-[80%]'>
        <div className='w-8/12 h-full max-xl:w-full overflow-y-auto'>
          <h1 className='w-11/12 m-auto mt-5 mb-5 text-5xl inter600'>{t('cart')}</h1>
          <div className='w-11/12 m-auto h-[51%] pt-4 pb-4 border-2 overflow-y-auto rounded-lg'>
            {cart.map((item,index) => {
              return(
                <div key={index} className='flex ml-5 mt-2 mr-5 justify-between'>
                  <div className='flex w-6/12'>
                    <img src={item.img} className='w-20 object-cover' alt="" />
                    <div className='flex flex-col ml-5 h-full justify-evenly'>
                      <div>
                        <p className='inter600'>{item.type === 'v-bucks' ? `${item.amount} ${t('v-bucks')}` : item.type === 'battlepass' ? t('battlepass') : `${t(item.name)}`}</p>
                        <p className='inter400 text-xs'>${i18n.language === "es" ? `${item.priceARS} ARS` : `${item.priceUSD} USD`}</p>
                      </div>
                      {
                        item.type === "v-bucks" ? 
                        <Input
                          type="number"
                          min={1}
                          max={100}
                          value={item.quantity}
                          onChange={(e) => {
                            addProductCart(item, (parseInt(e.target.value) - item.quantity));
                          }}
                          label={t('quantity')}
                          placeholder="1"
                          size='sm'
                          className='w-32 rounded-sm'
                        />
                        :
                        <Input
                        disabled
                        type="number"
                        defaultValue={item.quantity}
                        label={t('quantity')}
                        placeholder="1"
                        size='sm'
                        className='w-32 rounded-sm'
                        />
                      }
                    </div>
                  </div>
                  <div className='flex items-center justify-between w-6/12'>
                    <p className='inter400'>${i18n.language === "es" ? `${item.priceARS * item.quantity} ARS` : `${item.priceUSD * item.quantity} USD`}</p>
                    <div onClick={() => {removeProduct(item.id)}} className='bg-red-400 p-4 mr-4 rounded-full hover:bg-red-500 hover:cursor-pointer transition-colors'>
                      <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 448 512">
                        <path fill="#ffffff" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className='w-11/12 m-auto mt-5 mb-5'>
            <h1 className='text-3xl inter600 max-xl:text-4xl'>{t('paymethod')}</h1>
            <div className='mb-3 flex justify-start items-center max-xl:flex-col max-xl:mt-2'>
              <Select 
                label={t('selectmethod')} 
                className="w-4/12 max-xl:w-full"
                size='sm'
                variant='underlined'
                onChange={(e) => {
                  setPaymentMethod(e.target.value)
                  if(e.target.value === 'Mercado Pago'){
                    setWallet('fedecabanas.MP')
                  }else if(e.target.value === 'Transferencia Bancaria'){
                    setWallet('0000003100108476722463')
                  }
                }}
                >
                {paymentMethods.map((payment) => (
                  <SelectItem key={payment} value={payment}>
                    {payment}
                  </SelectItem>
                ))}
              </Select>
              {
                paymentMethod === "Bitcoin" ? 
                <Select 
                label={t('selectnetwork')}
                className="w-4/12 ml-4 max-xl:w-full max-xl:ml-0 max-xl:mt-2"
                variant='underlined'
                onChange={(e) => {
                  setNetwork(e.target.value)
                  if(e.target.value === 'Bitcoin'){
                    setWallet('17xKkEsi1SgreztMBiK9U8uoMZXfehknQu')
                  }else{
                    setWallet('0x0ab15996b6cd6f7d2fe358f8c25ac06e412a67b9')
                  }
                }}
                size='sm'
                >
                  <SelectItem key='Bitcoin' value='Bitcoin'>Bitcoin (BTC)</SelectItem>
                  <SelectItem key='Binance' value='Binance'>Binance (BEP20)</SelectItem>
                </Select>  
                : 
                paymentMethod === 'USDT' ? 
                <Select 
                label={t('selectnetwork')}
                className="w-4/12 ml-4 max-xl:w-full max-xl:ml-0 max-xl:mt-2"
                variant='underlined'
                onChange={(e) => {setWallet('0x0ab15996b6cd6f7d2fe358f8c25ac06e412a67b9');setNetwork(e.target.value)}}
                size='sm'
                >
                  <SelectItem key='Etherum' value='Etherum'>Etherum (ERC20)</SelectItem>
                  <SelectItem key='Binance' value='Binance'>Binance (BEP20)</SelectItem>
                </Select> 
                :
                paymentMethod === 'Etherum' ?
                <Select 
                label={t('selectnetwork')}
                className="w-4/12 ml-4 max-xl:w-full max-xl:ml-0 max-xl:mt-2"
                variant='underlined'
                onChange={(e) => {setWallet('0x0ab15996b6cd6f7d2fe358f8c25ac06e412a67b9');setNetwork(e.target.value)}}
                size='sm'
                >
                  <SelectItem key='Etherum' value='Etherum'>Etherum (ERC20)</SelectItem>
                  <SelectItem key='Binance' value='Binance'>Binance (BEP20)</SelectItem>
                </Select>
                :
                paymentMethod === 'Binance' ?
                <Select 
                label={t('selectnetwork')}
                className="w-4/12 ml-4 max-xl:w-full max-xl:ml-0 max-xl:mt-2"
                variant='underlined'
                onChange={(e) => {setWallet('Binance Wallet');setNetwork(e.target.value)}}
                size='sm'
                >
                  <SelectItem key='Binance' value='Binance'>Binance (BEP20)</SelectItem>
                </Select>
                :
                "" 
              }
            </div>
            <h1 className='text-3xl inter600 max-xl:mt-5'>{t('payinfo')}</h1>
            {
              network === "Binance" ? 
              <div className='inter400 mt-2'>
                <p className='text-md'>{t('whenorder')}</p>
                <div className='flex'>
                  <p className='text-md'>{t('wallet')}:</p><p className='ml-1 inter600'>{wallet}</p>
                </div>
                <Button variant='ghost' className='w-4/12 mt-2 inter400' color='primary' onClick={() => {showNotification(t('copied'), 'success');navigator.clipboard.writeText(wallet)}}>{t('copy')}</Button>
              </div>
              : 
              network === "Bitcoin" ? 
              <div className='inter400 mt-2'>
                <p className='text-md'>{t('whenorder')}</p>
                <div className='flex'>
                  <p className='text-md'>{t('wallet')}:</p><p className='ml-1 inter600'>{wallet}</p>
                </div>
                <Button variant='ghost' className='w-4/12 mt-2 inter400' color='primary' onClick={() => {showNotification(t('copied'), 'success');navigator.clipboard.writeText(wallet)}}>{t('copy')}</Button>
              </div>
              :
              network === 'Etherum' ?
              <div className='inter400 mt-2'>
                <p className='text-md'>{t('whenorder')}</p>
                <div className='flex'>
                  <p className='text-md'>{t('wallet')}:</p><p className='ml-1 inter600'>{wallet}</p>
                </div>
                <Button variant='ghost' className='w-4/12 mt-2 inter400' color='primary' onClick={() => {showNotification(t('copied'), 'success');navigator.clipboard.writeText(wallet)}}>{t('copy')}</Button>
              </div>
              :
              paymentMethod === "Mercado Pago" ? 
              <div className='inter400 mt-2'>
                <p className='text-md'>{t('whenorder')}</p>
                <div className='flex'>
                  <p className='text-md'>{t('wallet')}:</p><p className='ml-1 inter600'>{wallet}</p>
                </div>
                <Button variant='ghost' className='w-4/12 mt-2 inter400' color='primary' onClick={() => {showNotification(t('copied'), 'success');navigator.clipboard.writeText(wallet)}}>{t('copy')}</Button>
              </div>
              :
              paymentMethod === "Transferencia Bancaria" ? 
              <div className='inter400 mt-2'>
                <p className='text-md'>{t('whenorderCBU')}</p>
                <div className='flex'>
                  <p className='text-md'>{t('cbu')}:</p><p className='ml-1 inter600'>{wallet}</p>
                </div>
                <Button variant='ghost' className='w-4/12 mt-2 inter400' color='primary' onClick={() => {showNotification(t('copied'), 'success');navigator.clipboard.writeText(wallet)}}>{t('copy')}</Button>
              </div>
              :
              ""
            }
          </div>
        </div>
        <div className='w-4/12 h-full border-l-4 border-gray-200 max-xl:w-full max-xl:border-none max-xl:mb-10'>
          <h1 className='w-10/12 m-auto mt-5 text-5xl inter600'>{t('buy')}</h1>
          <div className='w-10/12 m-auto mt-5'>
            {
              cart.map((item,index) => {
                return(
                  <div key={index} className='flex justify-between items-center'>
                    <p className='inter400'>{item.type === 'v-bucks' ? `x${item.quantity} ${item.amount} ${t('v-bucks')}` : item.type === 'battlepass' ? t('battlepass') : `${t(item.name)}`}</p>
                    <p className='inter600'>${i18n.language === "es" ? `${item.priceARS * item.quantity} ARS` : `${item.priceUSD * item.quantity} USD`}</p>
                  </div>
                )
              })
            }
            <div className='flex justify-between items-center border-t-2 pt-2 pb-2'>
              <p className='inter400'>Subtotal</p>
              <p className='inter600'>${i18n.language === "es" ? `${subtotal} ARS` : `${subtotal} USD`}</p>
            </div>
            <div className='flex justify-between items-center'>
              <p className='inter400'>Total</p>
              <p className='inter600'>${i18n.language === "es" ? `${subtotal} ARS` : `${subtotal} USD`}</p>
            </div>
            <div className='max-xl:flex max-xl:justify-between max-sm:block'>
              <div className='mt-2 max-xl:flex max-xl:items-center max-sm:block'>
                <Input onChange={(e) => setPromoCode(e.target.value)} label="Discount" placeholder={t('promocode')} size='sm' variant='bordered' className='h-12 max-xl:w-8/12 max-sm:w-full'/>
                <Button onClick={handlePromo} color="primary" variant="ghost" className='mt-2 w-full max-xl:w-5/12 max-xl:mt-0 max-xl:h-12 max-xl:ml-2 max-sm:ml-0 max-sm:w-full max-sm:mt-2' radius='sm'>{t('applycoupon')}</Button>
              </div>
              <ModalPayment/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cartpage