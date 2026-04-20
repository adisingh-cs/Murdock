import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { User, Phone, Mail, Instagram, Linkedin, Twitter, KeyRound, Download, Trash2, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  const [profile, setProfile] = useState({
    full_name: "",
    age: "",
    gender: "",
    backup_email: "",
    phone_number: "",
    instagram_url: "",
    linkedin_url: "",
    twitter_url: "",
  });

  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      // Load Full Name from Auth metadata primarily
      const authFullName = user.user_metadata?.full_name || "";
      
      // Fetch the rest from public.users
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data) {
        setProfile({
          full_name: authFullName,
          age: data.age?.toString() || "",
          gender: data.gender || "",
          backup_email: data.backup_email || "",
          phone_number: data.phone_number || "",
          instagram_url: data.instagram_url || "",
          linkedin_url: data.linkedin_url || "",
          twitter_url: data.twitter_url || "",
        });
      }
      setProfileLoading(false);
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    setLoading(true);
    try {
      // Update Auth metadata if name changed
      if (profile.full_name !== user.user_metadata?.full_name) {
        await supabase.auth.updateUser({
          data: { full_name: profile.full_name }
        });
      }

      // Update public.users schema
      const { error } = await supabase
        .from('users')
        .update({
          age: profile.age ? parseInt(profile.age) : null,
          gender: profile.gender,
          backup_email: profile.backup_email,
          phone_number: profile.phone_number,
          instagram_url: profile.instagram_url,
          linkedin_url: profile.linkedin_url,
          twitter_url: profile.twitter_url,
        })
        .eq('user_id', user.id);

      if (error) throw error;
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!password) return;
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success("Password updated successfully!");
      setPassword("");
    } catch (err: any) {
      toast.error(err.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = async () => {
    if (!user) return;
    toast.info("Preparing your data export...");
    const { data: documents, error } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      toast.error("Failed to fetch data.");
      return;
    }

    const blob = new Blob([JSON.stringify(documents, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `murdock_export_${user.id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearData = async () => {
    const confirmation = window.prompt("Type 'DELETE' to confirm clearing all your generated documents.");
    if (confirmation !== "DELETE") {
      toast.error("Action cancelled. You must type 'DELETE' exactly.");
      return;
    }

    if (!user) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
      toast.success("All operational data cleared successfully.");
    } catch (err: any) {
      toast.error(err.message || "Failed to clear data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivateAccount = async () => {
     const confirmation = window.prompt("Type 'DEACTIVATE' to confirm deactivating your account.");
     if (confirmation !== "DEACTIVATE") {
       toast.error("Action cancelled.");
       return;
     }
 
     if (!user) return;
     setLoading(true);
     try {
       const { error } = await supabase
         .from('users')
         .update({ is_active: false })
         .eq('user_id', user.id);
 
       if (error) throw error;
       toast.success("Account deactivated. Logging out.");
       await signOut();
       navigate('/');
     } catch (err: any) {
       toast.error(err.message || "Failed to deactivate account.");
     } finally {
       setLoading(false);
     }
  };

  if (profileLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        <div>
          <h1 className="text-3xl font-display font-bold mb-1 text-text-primary">Account Settings</h1>
          <p className="text-text-secondary text-sm">Manage your profile, preferences, and account security.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Profile Section */}
          <Card className="bg-bg-secondary border-border-soft col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-text-primary flex items-center gap-2">
                <User className="w-5 h-5 text-gold" />
                Basic Profile
              </CardTitle>
              <CardDescription>Personal information associated with your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-text-muted font-bold uppercase tracking-wider">Full Name</label>
                  <input name="full_name" value={profile.full_name} onChange={handleChange} className="w-full bg-transparent border border-border-default rounded-md px-3 py-2 text-sm text-text-primary focus:border-gold/50 outline-none" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-text-muted font-bold uppercase tracking-wider">Primary Email (Read Only)</label>
                  <input readOnly value={user?.email || ""} className="w-full bg-bg-tertiary border border-border-default rounded-md px-3 py-2 text-sm text-text-muted cursor-not-allowed outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-text-muted font-bold uppercase tracking-wider">Backup Email</label>
                  <input name="backup_email" value={profile.backup_email} onChange={handleChange} className="w-full bg-transparent border border-border-default rounded-md px-3 py-2 text-sm text-text-primary focus:border-gold/50 outline-none" placeholder="backup@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-text-muted font-bold uppercase tracking-wider">Phone Number</label>
                  <input name="phone_number" value={profile.phone_number} onChange={handleChange} className="w-full bg-transparent border border-border-default rounded-md px-3 py-2 text-sm text-text-primary focus:border-gold/50 outline-none" placeholder="+1 (555) 000-0000" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-text-muted font-bold uppercase tracking-wider">Age</label>
                  <input type="number" name="age" value={profile.age} onChange={handleChange} className="w-full bg-transparent border border-border-default rounded-md px-3 py-2 text-sm text-text-primary focus:border-gold/50 outline-none" placeholder="25" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-text-muted font-bold uppercase tracking-wider">Gender</label>
                  <Select 
                    value={profile.gender} 
                    onValueChange={(val) => setProfile({ ...profile, gender: val })}
                  >
                    <SelectTrigger className="w-full bg-transparent border-border-default text-text-primary focus:ring-gold/50 shadow-none">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border-default text-text-primary shadow-lg z-50">
                      <SelectItem value="Male" className="focus:bg-bg-tertiary focus:text-text-primary cursor-pointer">Male</SelectItem>
                      <SelectItem value="Female" className="focus:bg-bg-tertiary focus:text-text-primary cursor-pointer">Female</SelectItem>
                      <SelectItem value="Non-binary" className="focus:bg-bg-tertiary focus:text-text-primary cursor-pointer">Non-binary</SelectItem>
                      <SelectItem value="Prefer not to say" className="focus:bg-bg-tertiary focus:text-text-primary cursor-pointer">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Links Form */}
          <Card className="bg-bg-secondary border-border-soft">
            <CardHeader>
              <CardTitle className="text-text-primary flex items-center gap-2">
                <Linkedin className="w-5 h-5 text-gold" />
                Social Connections
              </CardTitle>
              <CardDescription>Links to your professional presence.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-4">
                  <div className="space-y-2 relative">
                    <label className="text-xs text-text-muted font-bold uppercase tracking-wider">LinkedIn</label>
                    <div className="flex">
                      <div className="bg-bg-primary border border-r-0 border-border-default rounded-l-md px-3 py-2 flex items-center text-text-muted"><Linkedin className="w-4 h-4"/></div>
                      <input name="linkedin_url" value={profile.linkedin_url} onChange={handleChange} className="w-full bg-transparent border border-border-default rounded-r-md px-3 py-2 text-sm text-text-primary focus:border-gold/50 outline-none" placeholder="https://linkedin.com/in/..." />
                    </div>
                  </div>
                  <div className="space-y-2 relative">
                    <label className="text-xs text-text-muted font-bold uppercase tracking-wider">Twitter</label>
                    <div className="flex">
                      <div className="bg-bg-primary border border-r-0 border-border-default rounded-l-md px-3 py-2 flex items-center text-text-muted"><Twitter className="w-4 h-4"/></div>
                      <input name="twitter_url" value={profile.twitter_url} onChange={handleChange} className="w-full bg-transparent border border-border-default rounded-r-md px-3 py-2 text-sm text-text-primary focus:border-gold/50 outline-none" placeholder="https://twitter.com/..." />
                    </div>
                  </div>
                  <div className="space-y-2 relative">
                    <label className="text-xs text-text-muted font-bold uppercase tracking-wider">Instagram</label>
                    <div className="flex">
                      <div className="bg-bg-primary border border-r-0 border-border-default rounded-l-md px-3 py-2 flex items-center text-text-muted"><Instagram className="w-4 h-4"/></div>
                      <input name="instagram_url" value={profile.instagram_url} onChange={handleChange} className="w-full bg-transparent border border-border-default rounded-r-md px-3 py-2 text-sm text-text-primary focus:border-gold/50 outline-none" placeholder="https://instagram.com/..." />
                    </div>
                  </div>
               </div>
            </CardContent>
          </Card>

          {/* Authentication Tab Side */}
          <div className="space-y-8">
            <Card className="bg-bg-secondary border-border-soft">
              <CardHeader>
                <CardTitle className="text-text-primary flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-gold" />
                  Security
                </CardTitle>
                <CardDescription>Update your password.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="space-y-2">
                    <label className="text-xs text-text-muted font-bold uppercase tracking-wider">New Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-transparent border border-border-default rounded-md px-3 py-2 text-sm text-text-primary focus:border-gold/50 outline-none" placeholder="••••••••" />
                  </div>
                  <Button disabled={loading || !password} onClick={handleUpdatePassword} className="w-full bg-transparent border border-border-default text-text-primary hover:text-gold hover:border-gold/50 shadow-sm transition-all">
                    Update Password
                  </Button>
              </CardContent>
            </Card>

            <Button disabled={loading} onClick={handleSaveProfile} className="w-full bg-gold hover:bg-gold-light text-background font-bold py-6 text-lg transition-colors shadow-[0_0_20px_rgba(201,147,58,0.2)]">
              {loading ? "Saving Changes..." : "Save Profile Changes"}
            </Button>
          </div>

          {/* Data Management Section */}
          <Card className="bg-bg-secondary border-red-500/20 col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5" />
                Data & Account Management
              </CardTitle>
              <CardDescription className="text-text-muted">Take control over your personal data. Actions here are highly destructive.</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="flex flex-col sm:flex-row gap-4 justify-between border-b border-border-default pb-6 mb-6">
                 <div>
                   <h3 className="text-sm font-bold text-text-primary">Export My Data</h3>
                   <p className="text-xs text-text-muted mt-1 max-w-sm">Download a JSON snapshot of all legal documents and modules associated with your account.</p>
                 </div>
                 <Button onClick={handleExportData} variant="outline" className="border-border-default text-text-secondary hover:text-white shrink-0 group">
                   <Download className="w-4 h-4 mr-2 group-hover:text-white text-text-muted" /> Export Data
                 </Button>
               </div>

               <div className="flex flex-col sm:flex-row gap-4 justify-between border-b border-border-default pb-6 mb-6">
                 <div>
                   <h3 className="text-sm font-bold text-text-primary">Clear Operational Data</h3>
                   <p className="text-xs text-text-muted mt-1 max-w-sm">Permanently delete all generated legal documents from Murdock. This cannot be undone.</p>
                 </div>
                 <Button onClick={handleClearData} variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 shrink-0">
                   <Trash2 className="w-4 h-4 mr-2" /> Clear All Data
                 </Button>
               </div>

               <div className="flex flex-col sm:flex-row gap-4 justify-between">
                 <div>
                   <h3 className="text-sm font-bold text-text-primary">Deactivate Account</h3>
                   <p className="text-xs text-text-muted mt-1 max-w-sm">Soft-delete your account so it cannot be accessed. For full erasure, contact administration.</p>
                 </div>
                 <Button onClick={handleDeactivateAccount} variant="destructive" className="bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white shrink-0">
                   Deactivate Account
                 </Button>
               </div>

            </CardContent>
          </Card>

        </div>
      </div>
    </DashboardLayout>
  );
}
