import React from 'react';
import { Sun, Moon, Bell, ChevronRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation, Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';

const labelFor = (segment: string) => {
  const map: Record<string, string> = {
    dashboard: 'Dashboard',
    settings: 'Settings',
    documents: 'Documents',
    admin: 'Admin',
    data: 'System Data',
    security: 'Security',
  };
  return map[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
};

const DashboardHeader: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const location = useLocation();

  const segments = location.pathname.split('/').filter(Boolean);
  const crumbs = segments.map((seg, i) => ({
    label: labelFor(seg),
    href: '/' + segments.slice(0, i + 1).join('/'),
  }));

  return (
    <header className="h-16 border-b border-border-default bg-bg-primary/85 backdrop-blur-md sticky top-0 z-40 px-3 sm:px-6 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
        <SidebarTrigger className="text-text-secondary hover:text-text-primary -ml-1" />
        <div className="hidden sm:flex items-center gap-1.5 text-sm min-w-0 overflow-hidden">
          {crumbs.map((c, i) => (
            <React.Fragment key={c.href}>
              {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-text-muted shrink-0" />}
              {i === crumbs.length - 1 ? (
                <span className="text-text-primary font-medium truncate">{c.label}</span>
              ) : (
                <Link to={c.href} className="text-text-muted hover:text-text-primary transition-colors truncate">
                  {c.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {user?.isAdmin && (
          <span className="hidden sm:inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-gold border border-gold/30 bg-gold/5 rounded-full px-2.5 py-1">
            Admin
          </span>
        )}

        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          className="w-10 h-10 rounded-full border border-border-default bg-bg-secondary flex items-center justify-center text-text-muted hover:text-gold hover:border-gold/40 transition-colors"
        >
          {theme === 'light' ? <Moon className="w-[18px] h-[18px]" /> : <Sun className="w-[18px] h-[18px]" />}
        </button>

        <button
          aria-label="Notifications"
          className="relative w-10 h-10 rounded-full border border-border-default bg-bg-secondary flex items-center justify-center text-text-muted hover:text-gold hover:border-gold/40 transition-colors"
        >
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-gold rounded-full ring-2 ring-bg-secondary" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 flex items-center gap-2 rounded-full pl-0 pr-3 py-0 border border-border-default hover:bg-bg-tertiary transition-colors"
            >
              <div className="w-10 h-10 shrink-0 aspect-square rounded-full overflow-hidden border border-border-default">
                {user?.user_metadata?.avatar_url ? (
                  <img src={user.user_metadata.avatar_url} className="w-full h-full object-cover" alt="Avatar" />
                ) : (
                  <div className="bg-gold/10 text-gold font-bold w-full h-full flex items-center justify-center">
                    {(user?.user_metadata?.full_name || user?.email)?.[0]?.toUpperCase() || 'U'}
                  </div>
                )}
              </div>
              <span className="text-sm font-medium text-text-primary hidden md:block max-w-[120px] truncate">
                {user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0]}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none truncate">
                  {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
                </p>
                <p className="text-xs leading-none text-text-muted truncate">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => (window.location.href = '/dashboard/settings')}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={signOut} className="text-crimson focus:text-crimson">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
