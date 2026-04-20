import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { useDashboardData, Document } from "@/hooks/useDashboardData";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileText, Clock, Shield, AlertTriangle, FileCheck, Briefcase, Home, CreditCard } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { documents, usage, loading } = useDashboardData();

  const modules = [
    { title: "Consumer Complaint", icon: Shield, desc: "Consumer forum & product disputes" },
    { title: "RTI Application", icon: FileText, desc: "Right to Information requests" },
    { title: "Legal Notice", icon: AlertTriangle, desc: "Demand letters & legal warnings" },
    { title: "Police Complaint / FIR", icon: Shield, desc: "Criminal & safety reporting" },
    { title: "Employment Grievance", icon: Briefcase, desc: "Workplace & labor law issues" },
    { title: "Rental Dispute", icon: Home, desc: "Landlord-tenant agreements" },
    { title: "Banking / UPI Fraud", icon: CreditCard, desc: "Cybercrime & financial theft" }
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold mb-1 text-text-primary">User Dashboard</h1>
          <p className="text-text-secondary text-sm">Welcome back, {user?.user_metadata?.full_name || user?.email || "User"}.</p>
        </div>

        <Tabs defaultValue="modules" className="space-y-8">
          <TabsList className="bg-bg-secondary border border-border-default">
            <TabsTrigger value="modules" className="data-[state=active]:bg-gold data-[state=active]:text-white">
              Legal Modules
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-gold data-[state=active]:text-white">
              Document History
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-gold data-[state=active]:text-white">
              API Keys (BYOK)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="modules" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -5, scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer"
                >
                  <Card className="bg-bg-secondary border-border-soft hover:border-gold/50 transition-all duration-300 h-full group">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                        <module.icon className="w-6 h-6 text-gold" />
                      </div>
                      <CardTitle className="text-lg text-text-primary">{module.title}</CardTitle>
                      <CardDescription className="text-xs text-text-muted">{module.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="bg-bg-secondary border-border-soft lg:max-w-md">
              <CardHeader>
                <CardTitle className="text-text-primary text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gold" />
                  Free Tier Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm mb-2 text-text-secondary">
                  <span>Documents Generated This Month</span>
                  <span>{usage.used} / {usage.total}</span>
                </div>
                <Progress value={(usage.used / usage.total) * 100} className="h-2 bg-bg-primary" indicatorClassName="bg-gold" />
                <p className="text-[10px] text-text-muted mt-4 uppercase tracking-widest">Upgrade for unlimited & private local hosting</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card className="bg-bg-secondary border-border-soft">
              <CardHeader>
                <CardTitle className="text-text-primary">Recent Documents</CardTitle>
                <CardDescription>Your generated drafts and saved templates.</CardDescription>
              </CardHeader>
              <CardContent>
                {documents.length > 0 ? (
                  <div className="space-y-4">
                    {documents.map((doc: Document) => (
                      <div key={doc.id} className="flex items-center justify-between p-4 bg-bg-primary rounded-lg border border-border-default hover:border-gold/30 transition-colors">
                        <div className="flex items-center gap-4">
                          <FileCheck className="w-8 h-8 text-gold" />
                          <div>
                            <h4 className="font-medium text-text-primary">{doc.title}</h4>
                            <p className="text-xs text-text-muted">{format(new Date(doc.created_at), 'PPP')}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="border-gold/20 text-gold hover:bg-gold/10">View Draft</Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-text-muted py-12 text-center border border-dashed border-border-default rounded-lg">
                    No documents generated yet. Start with a module!
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-bg-secondary border-border-soft">
              <CardHeader>
                <CardTitle className="text-text-primary">Bring Your Own Key (BYOK)</CardTitle>
                <CardDescription>Configure local computation and LLM providers.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-xs text-text-muted mb-2 block uppercase tracking-wider font-semibold">OpenAI API Key</label>
                  <div className="flex gap-4">
                    <input type="password" placeholder="sk-proj-..." className="flex-1 bg-bg-primary border border-border-default rounded-md px-4 py-2 text-sm text-text-primary focus:border-gold/50 outline-none" />
                    <Button className="bg-gold hover:bg-gold-hover text-background font-bold">Save Key</Button>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-gold/5 border border-gold/10">
                  <p className="text-xs text-gold/80 leading-relaxed italic">
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
