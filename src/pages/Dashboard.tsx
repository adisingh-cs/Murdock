import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useDashboardData, Document } from '@/hooks/useDashboardData';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Shield, AlertTriangle, FileCheck, Briefcase, Home, CreditCard, Download, Eye, MoreHorizontal } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import DashboardGreeting from '@/components/dashboard/DashboardGreeting';
import ModuleTile from '@/components/dashboard/ModuleTile';
import UsageRing from '@/components/dashboard/UsageRing';
import EmptyState from '@/components/dashboard/EmptyState';

const modules = [
  { title: 'Consumer Complaint', icon: Shield, desc: 'Consumer forum & product disputes' },
  { title: 'RTI Application', icon: FileText, desc: 'Right to Information requests' },
  { title: 'Legal Notice', icon: AlertTriangle, desc: 'Demand letters & legal warnings' },
  { title: 'Police Complaint / FIR', icon: Shield, desc: 'Criminal & safety reporting' },
  { title: 'Employment Grievance', icon: Briefcase, desc: 'Workplace & labor law issues' },
  { title: 'Rental Dispute', icon: Home, desc: 'Landlord-tenant agreements' },
  { title: 'Banking / UPI Fraud', icon: CreditCard, desc: 'Cybercrime & financial theft' },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { documents, usage, loading } = useDashboardData();

  const firstName =
    user?.user_metadata?.full_name?.split(' ')[0] ||
    user?.email?.split('@')[0] ||
    'there';

  // Next month reset
  const next = new Date();
  next.setMonth(next.getMonth() + 1);
  next.setDate(1);
  const resetLabel = format(next, 'MMM d');

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gold border-t-transparent" />
        </div>
      </DashboardLayout>
    );
  }

  const remaining = Math.max(0, usage.total - usage.used);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <DashboardGreeting name={firstName} tier="Free" resetDate={resetLabel} />

        <Tabs defaultValue="modules" className="space-y-6">
          <TabsList className="bg-transparent border-b border-border-default w-full justify-start rounded-none h-auto p-0 gap-6">
            <TabsTrigger
              value="modules"
              className="relative bg-transparent border-0 rounded-none px-0 pb-3 pt-1 text-sm font-medium text-text-muted data-[state=active]:text-text-primary data-[state=active]:shadow-none data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:-bottom-px data-[state=active]:after:h-[2px] data-[state=active]:after:bg-gold"
            >
              Legal Modules
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="relative bg-transparent border-0 rounded-none px-0 pb-3 pt-1 text-sm font-medium text-text-muted data-[state=active]:text-text-primary data-[state=active]:shadow-none data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:-bottom-px data-[state=active]:after:h-[2px] data-[state=active]:after:bg-gold"
            >
              Recent Documents
            </TabsTrigger>
            <TabsTrigger
              value="byok"
              className="relative bg-transparent border-0 rounded-none px-0 pb-3 pt-1 text-sm font-medium text-text-muted data-[state=active]:text-text-primary data-[state=active]:shadow-none data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:-bottom-px data-[state=active]:after:h-[2px] data-[state=active]:after:bg-gold"
            >
              API Keys (BYOK)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="modules" className="space-y-6 mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {modules.map((m, i) => (
                    <ModuleTile
                      key={i}
                      title={m.title}
                      description={m.desc}
                      icon={m.icon}
                      accent={i % 4 === 1 ? 'sage' : 'gold'}
                    />
                  ))}
                </div>
              </div>

              <Card className="surface-card border-0 bg-bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-text-primary text-base font-display">Monthly Usage</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center pt-2 pb-6">
                  <UsageRing used={usage.used} total={usage.total} label="docs" />
                  <p className="text-sm text-text-secondary mt-5 text-center">
                    <span className="font-semibold text-text-primary">{remaining}</span>{' '}
                    {remaining === 1 ? 'document' : 'documents'} remaining this month
                  </p>
                  <p className="text-[11px] text-text-muted mt-1.5 text-center">
                    Resets on {resetLabel}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-5 w-full border-gold/30 text-gold hover:bg-gold/5 hover:border-gold/50"
                  >
                    Upgrade plan
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-0">
            <Card className="surface-card border-0 bg-bg-card">
              <CardHeader>
                <CardTitle className="text-text-primary text-base font-display">Recent Documents</CardTitle>
              </CardHeader>
              <CardContent>
                {documents.length > 0 ? (
                  <div className="space-y-2">
                    {documents.map((doc: Document) => (
                      <div
                        key={doc.id}
                        className="group flex items-center justify-between gap-3 p-3 rounded-lg border border-transparent hover:border-border-default hover:bg-bg-tertiary/50 transition-all"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                            <FileCheck className="w-5 h-5 text-gold" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-medium text-text-primary text-sm truncate">{doc.title}</h4>
                            <p className="text-[11px] text-text-muted">
                              {format(new Date(doc.created_at), 'PPP')} · {doc.module_type || 'Document'}
                            </p>
                          </div>
                        </div>
                        <div className="hidden sm:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-text-muted hover:text-gold" aria-label="View">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-text-muted hover:text-gold" aria-label="Download">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-text-muted hover:text-gold" aria-label="More">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={FileText}
                    title="No documents yet"
                    description="Generate your first legal document by picking a module above."
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="byok" className="mt-0">
            <Card className="surface-card border-0 bg-bg-card">
              <CardHeader>
                <CardTitle className="text-text-primary text-base font-display">Bring Your Own Key</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <label className="text-[11px] text-text-muted mb-2 block uppercase tracking-wider font-bold">
                    OpenAI API Key
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      placeholder="sk-proj-..."
                      className="flex-1 bg-bg-primary border border-border-default rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:border-gold/50 outline-none transition-colors"
                    />
                    <Button className="bg-gold hover:bg-gold-light text-background font-semibold">
                      Save
                    </Button>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-sage/10 border border-sage/20">
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Keys are encrypted with AES-256 and stored locally in your browser. We never see your keys.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
