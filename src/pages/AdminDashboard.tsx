import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useAdminData, User, Job } from "@/hooks/useAdminData";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Activity, Database, AlertCircle, ShieldAlert } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { users, jobs, loading } = useAdminData();

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-display font-bold text-red-500 mb-1 flex items-center gap-2">
              <ShieldAlert className="w-8 h-8" />
              Commander Admin
            </h1>
            <p className="text-text-secondary text-sm italic opacity-80">Elevated Session — {user?.email}</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-bg-secondary border-red-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-text-muted uppercase">Total Users</CardTitle>
              <Users className="w-4 h-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-text-primary">{users.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-bg-secondary border-red-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-text-muted uppercase">Failed Jobs</CardTitle>
              <AlertCircle className="w-4 h-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-text-primary">{jobs.filter(j => j.status === 'failed').length}</div>
            </CardContent>
          </Card>
          <Card className="bg-bg-secondary border-red-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-text-muted uppercase">Total Requests</CardTitle>
              <Activity className="w-4 h-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-text-primary">{jobs.length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-8">
          <TabsList className="bg-red-500/10 border border-red-500/20">
            <TabsTrigger value="users" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              Users & Tiers
            </TabsTrigger>
            <TabsTrigger value="observability" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              System Observability
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card className="bg-bg-secondary border-border-soft">
              <CardHeader>
                <CardTitle className="text-text-primary">Active Users</CardTitle>
                <CardDescription>Manage user tiers and access limits.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-border-default overflow-hidden">
                  <Table>
                    <TableHeader className="bg-bg-primary">
                      <TableRow className="border-border-default hover:bg-transparent">
                        <TableHead className="text-text-muted text-xs uppercase">Email</TableHead>
                        <TableHead className="text-text-muted text-xs uppercase">Tier</TableHead>
                        <TableHead className="text-text-muted text-xs uppercase">Joined</TableHead>
                        <TableHead className="text-text-muted text-xs uppercase text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((u) => (
                        <TableRow key={u.id} className="border-border-default hover:bg-white/[0.02]">
                          <TableCell className="font-medium text-text-primary text-sm">{u.email}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                              u.tier === 'Premium' ? 'bg-gold/20 text-gold' : 'bg-blue-400/20 text-blue-400'
                            }`}>
                              {u.tier || 'Free'}
                            </span>
                          </TableCell>
                          <TableCell className="text-text-muted text-sm">{format(new Date(u.created_at), 'MMM dd, yyyy')}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="text-xs text-red-500 hover:text-red-400 hover:bg-red-500/10 transition-colors">Manage</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="observability">
             <Card className="bg-bg-secondary border-border-soft">
              <CardHeader>
                <CardTitle className="text-text-primary">Recent Activity</CardTitle>
                <CardDescription>Live monitoring of document generation jobs.</CardDescription>
              </CardHeader>
              <CardContent>
                {jobs.length > 0 ? (
                  <div className="rounded-md border border-border-default overflow-hidden">
                    <Table>
                      <TableHeader className="bg-bg-primary">
                        <TableRow className="border-border-default hover:bg-transparent">
                          <TableHead className="text-text-muted text-xs uppercase">Job ID</TableHead>
                          <TableHead className="text-text-muted text-xs uppercase">Type</TableHead>
                          <TableHead className="text-text-muted text-xs uppercase">Status</TableHead>
                          <TableHead className="text-text-muted text-xs uppercase">Timestamp</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {jobs.map((j) => (
                          <TableRow key={j.id} className="border-border-default hover:bg-white/[0.02]">
                            <TableCell className="font-mono text-xs text-text-muted">{j.id.slice(0, 8)}...</TableCell>
                            <TableCell className="text-text-primary text-sm">{j.module_type}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                                j.status === 'completed' ? 'bg-green-500/20 text-green-500' : 
                                j.status === 'failed' ? 'bg-red-500/20 text-red-500' : 'bg-gold/20 text-gold'
                              }`}>
                                {j.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-text-muted text-sm">{format(new Date(j.created_at), 'HH:mm:ss')}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-sm text-text-muted py-12 text-center border border-dashed border-border-default rounded-lg">
                    No activity recorded in the last 24 hours.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
