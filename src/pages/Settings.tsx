import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, KeyRound, Link2, ShieldAlert, Download, Trash2, Linkedin, Twitter, Instagram, Save } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

type Section = 'profile' | 'security' | 'connections' | 'data';

const NAV: { id: Section; label: string; icon: any }[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: KeyRound },
  { id: 'connections', label: 'Connections', icon: Link2 },
  { id: 'data', label: 'Data & Account', icon: ShieldAlert },
];

export default function Settings() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [section, setSection] = useState<Section>('profile');
  const [dirty, setDirty] = useState(false);

  const [profile, setProfile] = useState({
    full_name: '',
    age: '',
    gender: '',
    backup_email: '',
    phone_number: '',
    instagram_url: '',
    linkedin_url: '',
    twitter_url: '',
  });
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const authFullName = user.user_metadata?.full_name || '';
      const { data } = await supabase.from('users').select('*').eq('user_id', user.id).single();
      if (data) {
        setProfile({
          full_name: authFullName,
          age: data.age?.toString() || '',
          gender: data.gender || '',
          backup_email: data.backup_email || '',
          phone_number: data.phone_number || '',
          instagram_url: data.instagram_url || '',
          linkedin_url: data.linkedin_url || '',
          twitter_url: data.twitter_url || '',
        });
      } else {
        setProfile((p) => ({ ...p, full_name: authFullName }));
      }
      setProfileLoading(false);
    };
    fetchProfile();
  }, [user]);

  const update = (key: keyof typeof profile, value: string) => {
    setProfile((p) => ({ ...p, [key]: value }));
    setDirty(true);
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    setLoading(true);
    try {
      if (profile.full_name !== user.user_metadata?.full_name) {
        await supabase.auth.updateUser({ data: { full_name: profile.full_name } });
      }
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
      toast.success('Profile updated successfully');
      setDirty(false);
    } catch (err: any) {
      toast.error(err.message || 'Failed to update profile.');
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
      toast.success('Password updated successfully');
      setPassword('');
    } catch (err: any) {
      toast.error(err.message || 'Failed to update password.');
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = async () => {
    if (!user) return;
    toast.info('Preparing your data export…');
    const { data: documents, error } = await supabase.from('documents').select('*').eq('user_id', user.id);
    if (error) {
      toast.error('Failed to fetch data.');
      return;
    }
    const blob = new Blob([JSON.stringify(documents, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `murdock_export_${user.id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearData = async () => {
    const confirmation = window.prompt("Type 'DELETE' to confirm clearing all your generated documents.");
    if (confirmation !== 'DELETE') {
      toast.error("Action cancelled. You must type 'DELETE' exactly.");
      return;
    }
    if (!user) return;
    setLoading(true);
    try {
      const { error } = await supabase.from('documents').delete().eq('user_id', user.id);
      if (error) throw error;
      toast.success('All operational data cleared successfully.');
    } catch (err: any) {
      toast.error(err.message || 'Failed to clear data.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivateAccount = async () => {
    const confirmation = window.prompt("Type 'DEACTIVATE' to confirm deactivating your account.");
    if (confirmation !== 'DEACTIVATE') {
      toast.error('Action cancelled.');
      return;
    }
    if (!user) return;
    setLoading(true);
    try {
      const { error } = await supabase.from('users').update({ is_active: false }).eq('user_id', user.id);
      if (error) throw error;
      toast.success('Account deactivated. Logging out.');
      await signOut();
      navigate('/');
    } catch (err: any) {
      toast.error(err.message || 'Failed to deactivate account.');
    } finally {
      setLoading(false);
    }
  };

  if (profileLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gold border-t-transparent" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-24">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold mb-1 text-text-primary">Settings</h1>
          <p className="text-text-secondary text-sm">Manage your profile, security, and personal data.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">
          {/* Sub-nav */}
          <nav className="lg:sticky lg:top-20 lg:self-start">
            {/* Mobile pill scroller */}
            <div className="flex lg:hidden gap-2 overflow-x-auto pb-2 -mx-1 px-1">
              {NAV.map((n) => (
                <button
                  key={n.id}
                  onClick={() => setSection(n.id)}
                  className={cn(
                    'shrink-0 px-3.5 py-2 text-[13px] rounded-full border transition-colors min-h-[40px]',
                    section === n.id
                      ? 'border-gold/40 bg-gold/10 text-gold font-semibold'
                      : 'border-border-default text-text-secondary hover:text-text-primary',
                  )}
                >
                  {n.label}
                </button>
              ))}
            </div>
            {/* Desktop list */}
            <ul className="hidden lg:flex flex-col gap-1">
              {NAV.map((n) => {
                const Icon = n.icon;
                const active = section === n.id;
                return (
                  <li key={n.id}>
                    <button
                      onClick={() => setSection(n.id)}
                      className={cn(
                        'relative w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors',
                        active
                          ? 'bg-gold/10 text-gold font-semibold'
                          : 'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary',
                      )}
                    >
                      {active && <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-gold" />}
                      <Icon className="w-4 h-4" />
                      {n.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Content */}
          <div className="space-y-6">
            {section === 'profile' && (
              <Card className="surface-card border-0 bg-bg-card">
                <CardHeader>
                  <CardTitle className="text-text-primary text-base font-display">Basic Profile</CardTitle>
                  <CardDescription>Personal information associated with your account.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-text-secondary">Full Name</Label>
                      <Input value={profile.full_name} onChange={(e) => update('full_name', e.target.value)} placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-text-secondary">Primary Email</Label>
                      <Input readOnly value={user?.email || ''} className="opacity-60 cursor-not-allowed" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-text-secondary">Backup Email</Label>
                      <Input value={profile.backup_email} onChange={(e) => update('backup_email', e.target.value)} placeholder="backup@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-text-secondary">Phone Number</Label>
                      <Input value={profile.phone_number} onChange={(e) => update('phone_number', e.target.value)} placeholder="+91 …" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-text-secondary">Age</Label>
                      <Input type="number" value={profile.age} onChange={(e) => update('age', e.target.value)} placeholder="25" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-text-secondary">Gender</Label>
                      <Select
                        value={profile.gender}
                        onValueChange={(val) => {
                          setProfile({ ...profile, gender: val });
                          setDirty(true);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Non-binary">Non-binary</SelectItem>
                          <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {section === 'security' && (
              <Card className="surface-card border-0 bg-bg-card">
                <CardHeader>
                  <CardTitle className="text-text-primary text-base font-display">Password</CardTitle>
                  <CardDescription>Update the password used to sign in.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 max-w-md">
                  <div className="space-y-2">
                    <Label className="text-text-secondary">New Password</Label>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
                  </div>
                  <Button disabled={loading || !password} onClick={handleUpdatePassword} className="bg-gold hover:bg-gold-light text-background font-semibold">
                    Update password
                  </Button>
                </CardContent>
              </Card>
            )}

            {section === 'connections' && (
              <Card className="surface-card border-0 bg-bg-card">
                <CardHeader>
                  <CardTitle className="text-text-primary text-base font-display">Social Connections</CardTitle>
                  <CardDescription>Optional public links shown on your profile.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { key: 'linkedin_url', label: 'LinkedIn', Icon: Linkedin, ph: 'https://linkedin.com/in/...' },
                    { key: 'twitter_url', label: 'X / Twitter', Icon: Twitter, ph: 'https://x.com/...' },
                    { key: 'instagram_url', label: 'Instagram', Icon: Instagram, ph: 'https://instagram.com/...' },
                  ].map(({ key, label, Icon, ph }) => (
                    <div className="space-y-2" key={key}>
                      <Label className="text-text-secondary flex items-center gap-2">
                        <Icon className="w-4 h-4 text-text-muted" />
                        {label}
                      </Label>
                      <Input
                        value={(profile as any)[key]}
                        onChange={(e) => update(key as any, e.target.value)}
                        placeholder={ph}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {section === 'data' && (
              <Card className="surface-card border-0 bg-bg-card border-l-2 border-l-crimson/40">
                <CardHeader>
                  <CardTitle className="text-text-primary text-base font-display flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-crimson" />
                    Danger Zone
                  </CardTitle>
                  <CardDescription>Destructive actions. These cannot be undone.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <DangerRow
                    title="Export My Data"
                    desc="Download a JSON snapshot of all your documents."
                    cta={
                      <Button onClick={handleExportData} variant="outline" className="border-border-strong">
                        <Download className="w-4 h-4 mr-2" /> Export
                      </Button>
                    }
                  />
                  <DangerRow
                    title="Clear Operational Data"
                    desc="Permanently delete all generated documents."
                    cta={
                      <Button
                        onClick={handleClearData}
                        variant="outline"
                        className="border-crimson/30 text-crimson hover:bg-crimson/10"
                      >
                        <Trash2 className="w-4 h-4 mr-2" /> Clear
                      </Button>
                    }
                  />
                  <DangerRow
                    title="Deactivate Account"
                    desc="Soft-delete your account so it cannot be accessed."
                    cta={
                      <Button
                        onClick={handleDeactivateAccount}
                        className="bg-crimson/10 text-crimson border border-crimson/20 hover:bg-crimson hover:text-white"
                      >
                        Deactivate
                      </Button>
                    }
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Sticky save bar (Profile + Connections) */}
      {dirty && (section === 'profile' || section === 'connections') && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border-default bg-bg-secondary/95 backdrop-blur-md animate-fade-in">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
            <span className="text-sm text-text-secondary hidden sm:inline">You have unsaved changes</span>
            <span className="text-sm text-text-secondary sm:hidden">Unsaved changes</span>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => setDirty(false)} className="text-text-secondary">
                Discard
              </Button>
              <Button onClick={handleSaveProfile} disabled={loading} className="bg-gold hover:bg-gold-light text-background font-semibold">
                <Save className="w-4 h-4 mr-2" /> {loading ? 'Saving…' : 'Save changes'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

const DangerRow: React.FC<{ title: string; desc: string; cta: React.ReactNode }> = ({ title, desc, cta }) => (
  <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between py-3 border-b border-border-default last:border-0">
    <div className="min-w-0">
      <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
      <p className="text-xs text-text-muted mt-1 max-w-md">{desc}</p>
    </div>
    <div className="shrink-0">{cta}</div>
  </div>
);
