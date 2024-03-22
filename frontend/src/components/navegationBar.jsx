import React,{ useState, useEffect } from 'react'
import { Badge, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { showNotification } from '../helpers/showNotification';
import { useCartContext } from '../context/cartContext';
import supabase from '../data/supabase';
import logo from '../assets/logo.jpg'

const NavegationBar = () => {
  const { getTotalCart, cart } = useCartContext()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('')
  const [userAvatar, setUserAvatar] = useState('https://fortniteskins.net/wp-content/cache/thumb/de/d172f7ffd0c88de_666x630.webp')
  const [notifications, setNotifications] = useState(0)
  const { t } = useTranslation();

  const navigate = useNavigate();

  const menuItems = [
    "V-Bucks",
    "Packs",
    "Battle Pass",
    "Gifts",
    "Instagram",
    "Discord",
    "Telegram"
  ];

  useEffect(()=>{
    const {data:authListener} = supabase.auth.onAuthStateChange(async (event,session) => {
      if(session){
        setEmail(session.user.email)
        if(session.user.identities){
          session.user.identities.find( e => {
            setUserAvatar(e.identity_data.avatar_url)
          })
        }
      }
    })
  },[])

  useEffect(() => {
    const getTotal = async () => {
      const total = await getTotalCart()
      setNotifications(total)
    }
    getTotal()
  },[cart])

  const logout = async () => {
    try {
      await supabase.auth.signOut()
      showNotification('Logging out', 'success')
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <a href="/">
          <NavbarBrand className='flex items-center'>
            <img src={logo} className='rounded-full w-12' alt="" />
            <p className="text-inherit inter900 ml-2">GODZILLA STORE</p>
          </NavbarBrand>
        </a>
      </NavbarContent>

      {
        email != '' ? 
        <>
          <NavbarContent as="div" justify="end" className='flex items-center'>
            {
              notifications === 0 ? 
              <>
                <a href="/cart">
                  <div className='mr-5'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512">
                        <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                    </svg>
                  </div>  
                </a>
              </>
              :
              <>
                <a href="/cart">
                  <div className='mr-5'>
                    <Badge content={notifications} color="danger">
                      <Button
                        radius="full"
                        isIconOnly
                        variant="light"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512">
                          <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                        </svg>
                      </Button>
                    </Badge>
                  </div>
                </a>
              </>
            }
            <Dropdown placement="bottom-end">
              <DropdownTrigger className='max-sm:hidden'>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="primary"
                  size="sm"
                  src={userAvatar}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="inter600">Signed in as</p>
                  <p className="inter600">{email}</p>
                </DropdownItem>
                <DropdownItem key="logout" className='inter400' color="danger" onClick={logout}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        </>
        :
        <>
          <NavbarContent justify="end">
            {
              notifications === 0 ? 
              <>
                <a href="/cart">
                  <div className='mr-5'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512">
                        <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                    </svg>
                  </div>  
                </a>
              </>
              :
              <>
                <a href="/cart">
                  <div className='mr-5'>
                  <Badge content={notifications} color="danger">
                    <Button
                      radius="full"
                      isIconOnly
                      variant="light"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512">
                        <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                      </svg>
                    </Button>
                  </Badge>
                  </div>
                </a>
              </>
            }
            <Button as={Link} className='inter400' color="primary" href="/login" variant="ghost">
              {t('login')}
            </Button>
          </NavbarContent>
        </>
      }

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`} className='mt-10'>
            <Link className="w-full text-xl pb-1 text-black inter400 border-b-[1px] border-black" href="#" size="lg">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
        {
          email != '' ? 
          <NavbarMenuItem className='mt-10'>
          <Link className="w-full text-xl text-black inter600 border-b-[1px] border-black" onClick={logout} size="lg">
            Logout
          </Link>
          </NavbarMenuItem>
          :
          <NavbarMenuItem className='mt-10'>
          <Link className="w-full text-xl text-black pb-1 inter400 border-b-[1px] border-black" href="/login" size="lg">
            Login
          </Link>
          </NavbarMenuItem>
        }
      </NavbarMenu>
    </Navbar>
  );
}

export default NavegationBar