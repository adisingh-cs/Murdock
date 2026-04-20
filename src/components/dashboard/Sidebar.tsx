import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  Users, 
  Database, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  UserCircle,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import Logo from '@/components/Logo';

const Sidebar = ({ isCollapsed, toggleSidebar }: { isCollapsed?: boolean, toggleSidebar?: () => void }) => {
  const { user } = useAuth();
  const isAdmin = user?.isAdmin;

  const userLinks = [
    { title: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
    { title: 'My Documents', icon: FileText, href: '/dashboard/documents' },
    { title: 'Settings', icon: Settings, href: '/dashboard/settings' },
  ];

  const adminLinks = [
    { title: 'User Management', icon: Users, href: '/admin' },
    { title: 'System Data', icon: Database, href: '/admin/data' },
    { title: 'Security Logs', icon: ShieldCheck, href: '/admin/security' },
  ];

  return (
    <aside className={cn(
      "fixed left-0 top-0 h-screen bg-bg-secondary border-r border-border-default flex flex-col z-50 transition-all duration-300 ease-in-out",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div 
        className="p-6 border-b border-border-default flex items-center justify-between relative group/logo overflow-hidden whitespace-nowrap"
      >
        <a href="/" className={cn("flex items-center gap-2 outline-none transition-all duration-300", isCollapsed ? "opacity-100 group-hover/logo:opacity-0" : "opacity-100")}>
          <Logo variant={isCollapsed ? "mark" : "full"} height={28} />
        </a>
        
        {isCollapsed && (
          <button 
            onClick={toggleSidebar}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300"
            title="Expand Sidebar"
          >
            <PanelLeftOpen className="w-5 h-5 text-text-muted hover:text-gold transition-colors" />
          </button>
        )}
        
        {!isCollapsed && toggleSidebar && (
          <button 
            onClick={toggleSidebar}
            className="text-text-muted hover:text-gold transition-colors shrink-0 outline-none focus:outline-none bg-bg-tertiary p-1.5 rounded-md hover:bg-gold/10"
            title="Collapse Sidebar"
          >
            <PanelLeftClose className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-8 overflow-y-auto">
        <div>
          <div className={cn("overflow-hidden transition-all duration-300 ease-in-out", isCollapsed ? "max-h-0 opacity-0 mb-0" : "max-h-10 opacity-100 mb-2")}>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted px-3 whitespace-nowrap">
              General
            </p>
          </div>
          <div className="space-y-1">
            {userLinks.map((link) => (
              <NavLink
                key={link.title}
                title={link.title}
                to={link.href}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 py-2 px-3 rounded-lg text-[14px] transition-all group overflow-hidden whitespace-nowrap",
                  isActive 
                    ? "bg-gold/10 text-gold font-bold shadow-[inset_0_0_0_1px_rgba(201,147,58,0.2)]" 
                    : "text-text-secondary hover:bg-bg-tertiary hover:text-text-primary"
                )}
              >
                {({ isActive }) => (
                  <>
                    <link.icon className={cn("w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3", isActive ? "text-gold" : "text-text-muted group-hover:text-text-primary")} />
                    <div className={cn("flex flex-1 items-center justify-between transition-all duration-300 overflow-hidden", isCollapsed ? "opacity-0 max-w-0" : "opacity-100 max-w-[200px]")}>
                      <span className="truncate">{link.title}</span>
                      {link.title === 'Overview' && (
                        <ChevronRight className="w-3 h-3 opacity-40 shrink-0" />
                      )}
                    </div>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        {isAdmin && (
          <div>
            <div className={cn("overflow-hidden transition-all duration-300 ease-in-out", isCollapsed ? "max-h-0 opacity-0 mb-0 mt-0" : "max-h-10 opacity-100 mb-2 mt-4")}>
               <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted px-3 whitespace-nowrap">
                 Administrator
               </p>
            </div>
            <div className="space-y-1">
              {adminLinks.map((link) => (
                <NavLink
                  key={link.title}
                  title={link.title}
                  to={link.href}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 py-2 px-3 rounded-lg text-[14px] transition-all group overflow-hidden whitespace-nowrap",
                    isActive 
                      ? "bg-gold/10 text-gold font-bold shadow-[inset_0_0_0_1px_rgba(201,147,58,0.2)]" 
                      : "text-text-secondary hover:bg-bg-tertiary hover:text-text-primary"
                  )}
                >
                  {({ isActive }) => (
                    <>
                      <link.icon className={cn("w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3", isActive ? "text-gold" : "text-text-muted group-hover:text-text-primary")} />
                      <div className={cn("flex flex-1 items-center justify-between transition-all duration-300 overflow-hidden", isCollapsed ? "opacity-0 max-w-0" : "opacity-100 max-w-[200px]")}>
                        <span className="truncate">{link.title}</span>
                      </div>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        )}

        <div>
          <div className={cn("overflow-hidden transition-all duration-300 ease-in-out", isCollapsed ? "max-h-0 opacity-0 mb-0 mt-0" : "max-h-10 opacity-100 mb-2 mt-4")}>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted px-3 whitespace-nowrap">
              Resources
            </p>
          </div>
          <div className="space-y-1">
            <a href="/community" title="Community" className="flex items-center gap-3 py-2 px-3 rounded-lg text-[14px] text-text-secondary hover:bg-bg-tertiary hover:text-text-primary transition-all group overflow-hidden whitespace-nowrap">
              <ExternalLink className="w-5 h-5 shrink-0 text-text-muted transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 group-hover:text-text-primary" />
              <div className={cn("flex flex-1 items-center transition-all duration-300 overflow-hidden", isCollapsed ? "opacity-0 max-w-0" : "opacity-100 max-w-[200px]")}>
                <span className="truncate">Community</span>
              </div>
            </a>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
