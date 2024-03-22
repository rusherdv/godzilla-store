import React, {useState} from 'react'
import { useDisclosure } from '@nextui-org/react';
import { RadioGroup, Radio, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useTranslation } from 'react-i18next';
import { useCartContext } from '../context/cartContext'

const ModalPayment = () => {
    const [accessMethod, setAccessMethod] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [accountData, setAccountData] = useState('')
    const [botAdded, setBotAdded] = useState('')

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const { getMethod } = useCartContext()
    const { i18n, t } = useTranslation();

    const handleMethod = async () => {
        const access = await getMethod()
        if(access){
            setAccessMethod('full')
            return
        }
        setAccessMethod('gift')
    }

    return (
        <>
            <Button onClick={handleMethod} onPress={onOpen} color="primary" variant="shadow" className='mt-2 w-full max-xl:w-2/12 max-xl:h-12 max-xl:ml-2 max-md:w-3/12 max-sm:w-full max-sm:ml-0' radius='sm'>{t('makeorder')}</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                <>
                    <ModalHeader className="flex flex-col gap-1">{t('confirmorder')}</ModalHeader>
                        <ModalBody>
                            {
                                accessMethod === 'full' ? 
                                <>
                                    <h2>Atencion</h2>
                                    <p>El pedido que acabas de hacer requiere acceso a tu cuenta</p>
                                    <div>
                                        <div className="mb-2">
                                            <label className="block text-sm font-semibold text-black inter600">Email</label>
                                            <input onChange={(e) => setEmail(e.target.value)} placeholder='Email' type="email" className="block w-full px-4 py-2 mt-2 text-black inter400 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                                        </div>
                                        <div className="mb-2">
                                            <label className="block text-sm font-semibold text-black inter600">Password</label>
                                            <input onChange={(e) => setPassword(e.target.value)} placeholder='Password' type="text" className="block w-full px-4 py-2 mt-2 text-black inter400 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                                        </div>
                                        <div className="mb-2">
                                            <div className='flex items-center'>
                                                <label className="block text-sm font-semibold text-black inter600">Discord</label>
                                                <label className="block text-xs text-red-500 inter400 ml-1">Opcional</label>
                                            </div>
                                            <input onChange={(e) => setDiscord(e.target.value)} placeholder='Discord' type="text" className="block w-full px-4 py-2 mt-2 text-black inter400 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-black inter600 mb-2">Tienes 2FA?</label>
                                        <RadioGroup className='inter400'>
                                          <Radio value="2fa">Si</Radio>
                                          <Radio value="no2fa">No</Radio>
                                        </RadioGroup>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-black inter600 mb-2">Tienes una cuenta Microsoft vinculada?</label>
                                        <RadioGroup className='inter400'>
                                          <Radio value="microsoftsync">Si</Radio>
                                          <Radio value="microsoftnosync">No</Radio>
                                        </RadioGroup>
                                    </div>
                                </>
                                :
                                <>
                                    <h2>Atencion</h2>
                                    <p>El pedido que acabas de hacer requiere que tengas agregado un bot</p>
                                    <div>
                                        <div className="mb-2">
                                            <label className="block text-sm font-semibold text-black inter600">Username</label>
                                            <input onChange={(e) => setUsername(e.target.value)} placeholder='Username' type="email" className="block w-full px-4 py-2 mt-2 text-black inter400 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                                        </div>
                                        <div className="mb-2">
                                            <div className='flex items-center'>
                                                <label className="block text-sm font-semibold text-black inter600">Discord</label>
                                                <label className="block text-xs text-red-500 inter400 ml-1">Opcional</label>
                                            </div>
                                            <input onChange={(e) => setDiscord(e.target.value)} placeholder='Discord' type="text" className="block w-full px-4 py-2 mt-2 text-black inter400 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-black inter600 mb-2">Tienes algun bot agregado?</label>
                                        <RadioGroup className='inter400'>
                                          <Radio onChange={(e) => setBotAdded(e.target.value)} value="botadded">Si</Radio>
                                          <Radio onChange={(e) => setBotAdded(e.target.value)} value="botnotadded">No</Radio>
                                        </RadioGroup>
                                    </div>
                                    {
                                        botAdded === 'botnotadded' ? 
                                        <>
                                        <ol type="A">
                                          <li>Julio</li>
                                          <li>Carmen</li>
                                          <li>Ignacio</li>
                                          <li>Elena</li>
                                        </ol>
                                        </>
                                        :
                                        botAdded === 'botadded' ? 
                                        <div>
                                        <label className="block text-sm font-semibold text-black inter600 mb-2">Pasaron 48 horas?</label>
                                        <RadioGroup className='inter400'>
                                          <Radio onChange={(e) => setBotAdded(e.target.value)} value="botadded">Si</Radio>
                                          <Radio onChange={(e) => setBotAdded(e.target.value)} value="botnotadded">No</Radio>
                                        </RadioGroup>
                                        </div>
                                        :""
                                    }
                                </>
                            }
                        </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>{t('cancel')}</Button>
                        <Button color="primary" onPress={onClose}>{t('sendorder')}</Button>
                    </ModalFooter>
                </>
                )}
            </ModalContent>
          </Modal>
        </>
    )
}

export default ModalPayment