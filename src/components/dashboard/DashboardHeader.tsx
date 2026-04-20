import React from 'react';
import { Sun, Moon, Search, Bell } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const DashboardHeader = ({ toggleSidebar }: { toggleSidebar?: () => void }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();

  return (
    <header className="h-16 border-b border-border-default bg-bg-primary/80 backdrop-blur-md sticky top-0 z-40 px-8 flex items-center justify-between">
      <div className="flex items-center gap-4 w-1/3">
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className="w-10 h-10 rounded-full bg-bg-secondary border border-border-default flex items-center justify-center text-text-muted hover:text-gold hover:border-gold/30 hover:bg-gold/5 transition-all"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>

        <button className="relative w-10 h-10 rounded-full bg-bg-secondary border border-border-default flex items-center justify-center text-text-muted hover:text-gold transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-gold rounded-full border-2 border-bg-secondary" />
        </button>



        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 flex items-center gap-2 rounded-full pl-0 pr-3 py-0 border border-border-default hover:bg-bg-tertiary transition-colors">
              <div className="w-10 h-10 shrink-0 aspect-square rounded-full overflow-hidden border border-border-default">
                {user?.user_metadata?.avatar_url ? (
                  <img src={user.user_metadata.avatar_url} className="w-full h-full object-cover" alt="Avatar" />
                ) : (
                  <div className="bg-gold/10 text-gold font-bold w-full h-full flex items-center justify-center">
                    {(user?.user_metadata?.full_name || user?.email)?.[0]?.toUpperCase() || 'U'}
                  </div>
                )}
              </div>
              <span className="text-sm font-medium text-text-primary hidden sm:block">
                {user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0]}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted hidden sm:block"><path d="m6 9 6 6 6-6"/></svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
                </p>
                <p className="text-xs leading-none text-text-muted">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => window.location.href = '/dashboard/settings'}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={signOut} className="text-red-500 focus:text-red-500">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
