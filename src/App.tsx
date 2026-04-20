import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { Toaster as ThaiToaster } from "@/components/ui/toaster";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Community from "./pages/Community";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

// Custom route protector for logged-in users
const RouteProtect = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useAuth();
  if (!isLoaded) return <div className="min-h-screen bg-background flex items-center justify-center text-text-muted">Loading...</div>;
  if (!user) return <Navigate to="/" />;
  return <>{children}</>;
};

// Custom route protector for admin only
const AdminProtect = ({ children, fallback }: { children: React.ReactNode, fallback: React.ReactNode }) => {
  const { user, isLoaded } = useAuth();
  if (!isLoaded) return <div className="min-h-screen bg-background flex items-center justify-center text-text-muted">Loading...</div>;
  if (!user || user.isAdmin !== true) {
    return <>{fallback}</>;
  }
  return <>{children}</>;
};

import ScrollManager from "./components/ScrollManager";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <TooltipProvider>
          <BrowserRouter>
            <ScrollManager />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/community" element={<Community />} />
              <Route 
                path="/dashboard/settings" 
                element={
                  <RouteProtect>
                    <Settings />
                  </RouteProtect>
                } 
              />
              <Route 
                path="/dashboard/*" 
                element={
                  <RouteProtect>
                    <Dashboard />
                  </RouteProtect>
                } 
              />
              <Route 
                path="/admin/*" 
                element={
                  <AdminProtect
                    fallback={
                      <div className="min-h-screen bg-background text-white flex flex-col gap-4 items-center justify-center font-body">
                        <h1 className="text-3xl font-display font-bold">403 - Forbidden</h1>
                        <p className="text-text-secondary">You do not have the 'admin' role assigned to view this page.</p>
                        <a href="/dashboard" className="text-gold underline hover:no-underline">Return to Dashboard</a>
                      </div>
                    }
                  >
                    <AdminDashboard />
                  </AdminProtect>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
          <ThaiToaster />
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
