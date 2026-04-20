import React, { useMemo, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useAdminData } from '@/hooks/useAdminData';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StatCard from '@/components/dashboard/StatCard';
import EmptyState from '@/components/dashboard/EmptyState';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { users, jobs, loading } = useAdminData();
  const [search, setSearch] = useState('');
  const [tier, setTier] = useState<string>('all');

  const filteredUsers = useMemo(
    () =>
      users.filter((u) => {
        const matchSearch = !search || u.email.toLowerCase().includes(search.toLowerCase());
        const matchTier = tier === 'all' || (u.tier || 'Free').toLowerCase() === tier.toLowerCase();
        return matchSearch && matchTier;
      }),
    [users, search, tier],
  );

  const failedJobs = useMemo(() => jobs.filter((j) => j.status === 'failed').length, [jobs]);
  const completedJobs = useMemo(() => jobs.filter((j) => j.status === 'completed').length, [jobs]);

  // mock 7-point trends derived from current data for sparklines
  const usersTrend = useMemo(() => buildTrend(users.length, 7), [users.length]);
  const jobsTrend = useMemo(() => buildTrend(jobs.length, 7), [jobs.length]);
  const failedTrend = useMemo(() => buildTrend(failedJobs, 7), [failedJobs]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gold border-t-transparent" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <header>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-text-primary">Administrator</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gold border border-gold/30 bg-gold/5 rounded-full px-2 py-0.5">
              Elevated
            </span>
          </div>
          <p className="text-text-secondary text-sm">Signed in as {user?.email}</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Users" value={users.length} icon={Users} trend={usersTrend} accent="gold" hint="All time" />
          <StatCard label="Total Requests" value={jobs.length} icon={Activity} trend={jobsTrend} accent="sage" hint="Last 50 jobs" />
          <StatCard label="Completed" value={completedJobs} icon={CheckCircle2} trend={buildTrend(completedJobs, 7)} accent="sage" />
          <StatCard label="Failed Jobs" value={failedJobs} icon={AlertCircle} trend={failedTrend} accent="crimson" />
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="bg-transparent border-b border-border-default w-full justify-start rounded-none h-auto p-0 gap-6">
            <TabsTrigger
              value="users"
              className="relative bg-transparent border-0 rounded-none px-0 pb-3 pt-1 text-sm font-medium text-text-muted data-[state=active]:text-text-primary data-[state=active]:shadow-none data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:-bottom-px data-[state=active]:after:h-[2px] data-[state=active]:after:bg-gold"
            >
              Users & Tiers
            </TabsTrigger>
            <TabsTrigger
              value="observability"
              className="relative bg-transparent border-0 rounded-none px-0 pb-3 pt-1 text-sm font-medium text-text-muted data-[state=active]:text-text-primary data-[state=active]:shadow-none data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:-bottom-px data-[state=active]:after:h-[2px] data-[state=active]:after:bg-gold"
            >
              System Observability
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="mt-0">
            <Card className="surface-card border-0 bg-bg-card">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-text-primary text-base font-display">Active Users</CardTitle>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Input
                    placeholder="Search by email…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="sm:w-64"
                  />
                  <Select value={tier} onValueChange={setTier}>
                    <SelectTrigger className="sm:w-40">
                      <SelectValue placeholder="All tiers" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All tiers</SelectItem>
                      <SelectItem value="Free">Free</SelectItem>
                      <SelectItem value="Premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {filteredUsers.length === 0 ? (
                  <EmptyState icon={Users} title="No users match your filters" />
                ) : (
                  <div className="rounded-lg border border-border-default overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-bg-tertiary/50">
                        <TableRow className="border-border-default hover:bg-transparent">
                          <TableHead className="text-text-muted text-[11px] uppercase tracking-wider">Email</TableHead>
                          <TableHead className="text-text-muted text-[11px] uppercase tracking-wider">Tier</TableHead>
                          <TableHead className="text-text-muted text-[11px] uppercase tracking-wider">Joined</TableHead>
                          <TableHead className="text-text-muted text-[11px] uppercase tracking-wider text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.map((u) => (
                          <TableRow key={u.id} className="border-border-default hover:bg-bg-tertiary/30">
                            <TableCell className="font-medium text-text-primary text-sm">{u.email}</TableCell>
                            <TableCell>
                              <span
                                className={
                                  'inline-flex px-2 py-0.5 rounded-full text-[10px] uppercase font-bold border ' +
                                  (u.tier === 'Premium'
                                    ? 'bg-gold/10 text-gold border-gold/20'
                                    : 'bg-sage/10 text-sage border-sage/20')
                                }
                              >
                                {u.tier || 'Free'}
                              </span>
                            </TableCell>
                            <TableCell className="text-text-muted text-sm">
                              {format(new Date(u.created_at), 'MMM dd, yyyy')}
                            </TableCell>
                            <TableCell className="text-right">
                              <button className="text-xs font-medium text-gold hover:underline underline-offset-2">
                                Manage
                              </button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="observability" className="mt-0">
            <Card className="surface-card border-0 bg-bg-card">
              <CardHeader>
                <CardTitle className="text-text-primary text-base font-display">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {jobs.length > 0 ? (
                  <div className="rounded-lg border border-border-default overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-bg-tertiary/50">
                        <TableRow className="border-border-default hover:bg-transparent">
                          <TableHead className="text-text-muted text-[11px] uppercase tracking-wider">Job ID</TableHead>
                          <TableHead className="text-text-muted text-[11px] uppercase tracking-wider">Type</TableHead>
                          <TableHead className="text-text-muted text-[11px] uppercase tracking-wider">Status</TableHead>
                          <TableHead className="text-text-muted text-[11px] uppercase tracking-wider">Timestamp</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {jobs.map((j) => (
                          <TableRow key={j.id} className="border-border-default hover:bg-bg-tertiary/30">
                            <TableCell className="font-mono text-xs text-text-muted">{j.id.slice(0, 8)}…</TableCell>
                            <TableCell className="text-text-primary text-sm">{j.module_type}</TableCell>
                            <TableCell>
                              <StatusPill status={j.status} />
                            </TableCell>
                            <TableCell className="text-text-muted text-sm">
                              {format(new Date(j.created_at), 'HH:mm:ss')}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <EmptyState icon={Activity} title="No activity recorded" description="Jobs will appear here as they run." />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

const StatusPill: React.FC<{ status: string }> = ({ status }) => {
  const map: Record<string, string> = {
    completed: 'bg-sage/10 text-sage border-sage/20',
    failed: 'bg-crimson/10 text-crimson border-crimson/20',
    running: 'bg-gold/10 text-gold border-gold/20',
    pending: 'bg-bg-tertiary text-text-muted border-border-default',
  };
  const dotMap: Record<string, string> = {
    completed: 'bg-sage',
    failed: 'bg-crimson',
    running: 'bg-gold',
    pending: 'bg-text-muted',
  };
  return (
    <span
      className={
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold border ' +
        (map[status] || map.pending)
      }
    >
      <span className={'w-1.5 h-1.5 rounded-full ' + (dotMap[status] || dotMap.pending)} />
      {status}
    </span>
  );
};

function buildTrend(seed: number, n: number): number[] {
  // deterministic playful trend so visuals are stable per render
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    const wave = Math.sin((i + seed * 0.3) * 0.9) * 0.5 + 0.5;
    out.push(Math.max(0.2, wave) * (seed || 1));
  }
  return out;
}

export default AdminDashboard;
