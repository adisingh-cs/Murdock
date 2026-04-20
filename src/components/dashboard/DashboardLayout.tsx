import React from 'react';
import AppSidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div className={cn('min-h-screen w-full', theme === 'dark' ? 'dark bg-background' : 'bg-background')}>
      <SidebarProvider defaultOpen>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <SidebarInset className="bg-background">
            <DashboardHeader />
            <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 overflow-y-auto">
              <div className="mx-auto w-full max-w-7xl animate-fade-in">{children}</div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
