'use client'
import React, { useEffect, useState } from 'react';
import { useHeaderContext } from '@/context/HeaderContext';
import { HomeIcon, BotIcon, BoxIcon, SettingsIcon, MessageCircleQuestionIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import LogoSection from './_components/LogoSection';
import UserAvatar from './_components/UserAvatar';
import LogoutButton from './_components/LogoutButton';
import NavItem from './_components/NavItem';

const Sidebar = () => {
  const router = useRouter();
  const [userName, setUserName] = useState(''); 
  const { selectedItem, setSelectedItem, setSelectedMenu } = useHeaderContext();

  useEffect(() => {
      const storedUserEmail = localStorage.getItem('user_email');
      setUserName(storedUserEmail || 'user_name');  
  }, []);  

  const handleNavigation = (item: string, route: string, menu: string) => {
    setSelectedItem(item);
    setSelectedMenu(menu);
    router.push(route);
  };

  return (
    <div className="min-w-[16rem] h-full --secondary  --secondary-foreground p-4">
      <div className="p-2 flex flex-col justify-between h-full">
        <LogoSection />

        <div className="flex-grow flex flex-col gap-2 my-4">
          <NavItem label="Dashbored" icon={HomeIcon} selectedItem={selectedItem} onClick={() => handleNavigation('Dashbored', '/overview', 'Bots')} />
          <NavItem label="ChatBots" icon={BotIcon} selectedItem={selectedItem} onClick={() => handleNavigation('ChatBots', '/overview/dashbored/bots', 'Bots')} />
          <NavItem label="Api" icon={BoxIcon} selectedItem={selectedItem} onClick={() => handleNavigation('Api', '/overview/dashbored/api', '')} />
          <NavItem label="Settings" icon={SettingsIcon} selectedItem={selectedItem} onClick={() => handleNavigation('Settings', '/overview/dashbored/settings', '')} />
          <NavItem label="Help & Support" icon={MessageCircleQuestionIcon} selectedItem={selectedItem} onClick={() => handleNavigation('Help & Support', '/overview/help', '')} />
        </div>
        <hr className="border-secondary-foreground border my-4" />

        <div className="flex items-center justify-between gap-2">
          <UserAvatar userName={userName} avatarSrc="https://github.com/shadcn.png" />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

// 'use client'
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { useHeaderContext } from '@/context/HeaderContext';
// import { BotIcon, BoxIcon, CircleDotDashedIcon, HomeIcon, LogOut, MessageCircleQuestionIcon, SettingsIcon } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import React, { useState } from 'react';

// const Sidebar = () => {
//     const router = useRouter();
//     const { selectedItem, setSelectedItem, setSelectedMenu } = useHeaderContext();

//     const handleLogout = () => {
//         localStorage.removeItem("access_token");
//         localStorage.removeItem("login_id");
//         router.push("/auth/sign-in");
//     };

//     const handleNavigation = (item: string, route: string, menu: string) => {
//         setSelectedItem(item);
//         setSelectedMenu(menu);
//         router.push(route);
//     };

//     return (
//         <div className="min-w-[16rem] h-full bg-primary text-primary-foreground p-4">
//             <div className="p-2 flex flex-col justify-between h-full">

//                 {/* Logo Section */}
//                 <div className="mb-4 h-24">
//                     <div className="h-full flex flex-col justify-between">
//                         <div className="flex flex-col gap-1">
//                             <CircleDotDashedIcon size={34} className="text-primary-foreground" />
//                             <h1 className="text-xl font-semibold text-primary-foreground">Sentinal</h1>
//                         </div>
//                         <div className="w-full my-2">
//                             <hr className="border-primary-foreground border" />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Navigation Section */}
//                 <div className="flex-grow flex flex-col gap-2 my-4">
//                     <div 
//                         className={`flex items-center gap-2 p-2 rounded-full cursor-pointer hover:bg-secondary/80 hover:text-secondary-foreground ${selectedItem === 'Dashbored' ? 'bg-secondary text-secondary-foreground' : ''}`} 
//                         onClick={() => handleNavigation('Dashbored', '/overview/dashbored', 'Bots')}
//                     >
//                         <HomeIcon className={`${selectedItem === 'Dashbored' ? 'text-secondary-foreground' : ''}`} />
//                         <p className={`${selectedItem === 'Dashbored' ? 'text-secondary-foreground' : ''}`}>Dashbored</p>
//                     </div>
//                     <div 
//                         className={`flex items-center gap-2 p-2 rounded-full cursor-pointer hover:bg-secondary/80 hover:text-secondary-foreground ${selectedItem === 'ChatBots' ? 'bg-secondary text-secondary-foreground' : ''}`} 
//                         onClick={() => handleNavigation('ChatBots', '/overview/dashbored/bots', 'Bots')}
//                     >
//                         <BotIcon className={`${selectedItem === 'ChatBots' ? 'text-secondary-foreground' : ''}`} />
//                         <p className={`${selectedItem === 'ChatBots' ? 'text-secondary-foreground' : ''}`}>ChatBots</p>
//                     </div>
//                     <div 
//                         className={`flex items-center gap-2 p-2 rounded-full cursor-pointer hover:bg-secondary/80 hover:text-secondary-foreground ${selectedItem === 'Api' ? 'bg-secondary text-secondary-foreground' : ''}`} 
//                         onClick={() => handleNavigation('Api', '/overview/api', '')}
//                     >
//                         <BoxIcon className={`${selectedItem === 'Api' ? 'text-secondary-foreground' : ''}`} />
//                         <p className={`${selectedItem === 'Api' ? 'text-secondary-foreground' : ''}`}>Api</p>
//                     </div>
//                     <div 
//                         className={`flex items-center gap-2 p-2 rounded-full cursor-pointer hover:bg-secondary/80 hover:text-secondary-foreground ${selectedItem === 'Settings' ? 'bg-secondary text-secondary-foreground' : ''}`} 
//                         onClick={() => handleNavigation('Settings', '/overview/settings', '')}
//                     >
//                         <SettingsIcon className={`${selectedItem === 'Settings' ? 'text-secondary-foreground' : ''}`} />
//                         <p className={`${selectedItem === 'Settings' ? 'text-secondary-foreground' : ''}`}>Settings</p>
//                     </div>
//                     <div 
//                         className={`flex items-center gap-2 p-2 rounded-full cursor-pointer hover:bg-secondary/80 hover:text-secondary-foreground ${selectedItem === 'Help & Support' ? 'bg-secondary text-secondary-foreground' : ''}`} 
//                         onClick={() => handleNavigation('Help & Support', '/overview/help', '')}
//                     >
//                         <MessageCircleQuestionIcon className={`${selectedItem === 'Help & Support' ? 'text-secondary-foreground' : ''}`} />
//                         <p className={`${selectedItem === 'Help & Support' ? 'text-secondary-foreground' : ''}`}>Help & Support</p>
//                     </div>
//                 </div>

//                 <div className="w-full my-4">
//                     <hr className="border-primary-foreground border" />
//                 </div>

//                 {/* User Info and Logout Section */}
//                 <div className="flex items-center justify-between gap-2">
//                     <div className="flex items-center gap-2">
//                         <Avatar>
//                             <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
//                             <AvatarFallback>CN</AvatarFallback>
//                         </Avatar>
//                         <div>
//                             <h1 className="text-xs font-semibold text-primary-foreground">User_name</h1>
//                             <p className="text-xs text-muted">Welcome back!</p>
//                         </div>
//                     </div>
//                     <div
//                         className="cursor-pointer flex gap-1 items-center"
//                         onClick={handleLogout}
//                     >
//                         <LogOut className="text-primary-foreground" />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Sidebar;