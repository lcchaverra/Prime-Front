
import { useState } from 'react';
import DashboardHeader from "../components/ui/Header/DashboardHeader"
import DashboardSidebar from "../components/ui/Sidebar/DashboardSidebar";
import { Button } from 'primereact/button';

const DashboardLayout = ({ children }:any) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-column surface-ground">
      <DashboardHeader onMenuToggle={() => setSidebarVisible(!sidebarVisible)} />
      
      <div className="flex flex-1 relative">
        <DashboardSidebar visible={sidebarVisible} onHide={() => setSidebarVisible(false)} />
        
        <div className={`flex-1 p-4 transition-all ${sidebarVisible ? 'lg:ml-280' : ''}`}>
          <div className="surface-card border-round shadow-2 p-4 border-round-xl">
            {children}
          </div>
        </div>

        {/* Mobile menu toggle */}
        <Button
          icon={sidebarVisible ? "pi pi-times" : "pi pi-bars"}
          onClick={() => setSidebarVisible(!sidebarVisible)}
          className="lg:hidden fixed bottom-4 right-4 p-button-rounded p-button-primary"
        />
      </div>
    </div>
  );
};

export default DashboardLayout;