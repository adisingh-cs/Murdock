import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Settings as SettingsIcon,
  Users,
  Database,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import Logo from '@/components/Logo';
import {
  Sidebar as ShadSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const userLinks = [
  { title: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
  { title: 'My Documents', icon: FileText, href: '/dashboard/documents' },
  { title: 'Settings', icon: SettingsIcon, href: '/dashboard/settings' },
];

const adminLinks = [
  { title: 'User Management', icon: Users, href: '/admin' },
  { title: 'System Data', icon: Database, href: '/admin/data' },
  { title: 'Security Logs', icon: ShieldCheck, href: '/admin/security' },
];

const AppSidebar: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.isAdmin;
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();

  const isActive = (href: string) =>
    href === '/dashboard'
      ? location.pathname === '/dashboard'
      : location.pathname === href || location.pathname.startsWith(href + '/');

  const renderItem = (link: { title: string; icon: any; href: string }) => {
    const active = isActive(link.href);
    const Icon = link.icon;
    return (
      <SidebarMenuItem key={link.title}>
        <SidebarMenuButton
          asChild
          tooltip={link.title}
          className={cn(
            'relative h-11 rounded-lg transition-all',
            active
              ? 'bg-gold/10 text-gold font-semibold'
              : 'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary',
          )}
        >
          <NavLink to={link.href} end={link.href === '/dashboard' || link.href === '/admin'}>
            {active && (
              <span
                aria-hidden
                className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full bg-gold"
              />
            )}
            <Icon className={cn('h-[18px] w-[18px] shrink-0', active ? 'text-gold' : '')} />
            <span className="truncate text-[14px]">{link.title}</span>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <ShadSidebar collapsible="icon" className="border-r border-border-default bg-bg-secondary">
      <SidebarHeader className="border-b border-border-default px-4 py-4 bg-bg-secondary">
        <a href="/" className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-gold rounded">
          <Logo variant={collapsed ? 'mark' : 'full'} height={28} />
        </a>
      </SidebarHeader>

      <SidebarContent className="bg-bg-secondary">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
            General
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">{userLinks.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
              Administrator
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">{adminLinks.map(renderItem)}</SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
            Resources
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="Community"
                  className="h-11 rounded-lg text-text-secondary hover:bg-bg-tertiary hover:text-text-primary"
                >
                  <a href="/community">
                    <ExternalLink className="h-[18px] w-[18px] shrink-0" />
                    <span className="truncate text-[14px]">Community</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </ShadSidebar>
  );
};

export default AppSidebar;
