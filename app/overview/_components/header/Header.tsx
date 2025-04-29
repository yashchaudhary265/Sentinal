'use client';
import React, { useEffect } from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { useRouter } from 'next/navigation';
import { useThreadContext } from '@/context/ThreadContext';
import { Link, Settings } from 'lucide-react';

type DashboredProps = {
  selectedItem: string;
  selectedMenu: string;
};

const Header = ({ selectedItem, selectedMenu }: DashboredProps) => {
  const router = useRouter();
  const { selectedThread, threadName } = useThreadContext();

  const activeClass = (menu: string) => selectedMenu === menu ? 'text-primary font-bold' : 'text-muted-foreground';

  const renderNavigationMenu = () => {
    switch (selectedItem) {
      case 'ChatBots':
        return (
          <NavigationMenuList className="flex space-x-24">
            <NavigationMenuItem className="cursor-pointer">
              <NavigationMenuLink href="/overview/dashbored/bots" className={activeClass('Bots')}>
                Bots
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="cursor-pointer">
              <NavigationMenuLink href="/overview/dashbored/createBot" className={activeClass('create_bot')}>
                Create New Bot
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        );

      case 'ChatBot':
        return (
          <NavigationMenuList className="flex space-x-24">
            <NavigationMenuItem className="cursor-pointer">
              <NavigationMenuLink href={`/overview/dashbored/monitors/${selectedThread}`} className={activeClass('Monitor')}>
                Monitors
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="cursor-pointer">
              <NavigationMenuLink href={`/overview/dashbored/monitors/${selectedThread}`} className={activeClass('API')}>
                API
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="cursor-pointer">
              <NavigationMenuLink href={`/overview/dashbored/chats/${selectedThread}/${threadName}`} className={activeClass('History')}>
                History
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        );

      case 'Settings':
        return (
          <NavigationMenuList className="flex space-x-24">
            <NavigationMenuItem className="cursor-pointer">
              <NavigationMenuLink href="/overview/dashbored/bots" className={activeClass('General')}>
                <div className="flex gap-1 items-center">
                  <Settings className='h-4 w-4' /> General Settings
                </div>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        );

      case 'Api':
        return (
          <NavigationMenuList className="flex space-x-24">
            <NavigationMenuItem className="cursor-pointer">
              <NavigationMenuLink href="/overview/dashbored/api" className={activeClass('Api')}>
                <div className="flex gap-1 items-center">
                  <Link className='h-4 w-4' /> Api Connections
                </div>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        );

      case 'Dashboard':
        return (
          <NavigationMenuList className="flex space-x-24">
            <NavigationMenuItem className="cursor-pointer">
              <NavigationMenuLink href="/overview" className={activeClass('Dashboard')}>
                Dashboard
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        );

      default:
        return (
          <NavigationMenuList className="flex space-x-24">
            <NavigationMenuItem className="cursor-pointer">
              <NavigationMenuLink href="/overview/general" className={activeClass('General Overview')}>
                General Overview
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="cursor-pointer">
              <NavigationMenuLink href="/docs" className={activeClass('Documentation')}>
                Documentation
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        );
    }
  };

  return (
    <div className="p-2 w-full h-full mb-4">
      <div className="h-full flex flex-col justify-between">
        <div className="mb-4">
          <h1 className="text-3xl font-semibold">{selectedItem}</h1>
        </div>
        <div className="text-muted-foreground">
          <NavigationMenu>{renderNavigationMenu()}</NavigationMenu>
          <div className="w-full mb-2">
            <hr className="border-secondary-foreground border" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;