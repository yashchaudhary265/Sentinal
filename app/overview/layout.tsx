'use client'
import Header from "./_components/header/Header";
import Sidebar from "./_components/sidebar/Sidebar";
import { useHeaderContext } from "@/context/HeaderContext";

const Layout = ({ children }: { children: React.ReactNode }) => {

    const { selectedItem, selectedMenu } = useHeaderContext();
    
    return (
        <div className='w-full h-full flex'>
            <Sidebar />
            <div className="p-4 bg-muted flex flex-col w-full">
                <div className="h-28">
                    <Header selectedItem={selectedItem} selectedMenu={selectedMenu} />
                </div>
                <div className="bg-muted h-[calc(100%-112px)] overflow-scroll">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;