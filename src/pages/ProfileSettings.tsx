
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { 
  ChevronLeft, 
  Save, 
  Trash2, 
  Settings, 
  PaletteIcon, 
  UserRoundCog, 
  Lock, 
  BellRing, 
  Sparkles,
  LogOut,
  Eye
} from "lucide-react";
import AnimatedButton from "@/components/AnimatedButton";
import { toast } from "@/hooks/use-toast";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

type ThemePreset = {
  id: string;
  name: string;
  description: string;
  background: string;
  accent: string;
  isPremium: boolean;
};

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState("appearance");
  const [selectedPreset, setSelectedPreset] = useState("cosmic");

  const themePresets: ThemePreset[] = [
    {
      id: "default",
      name: "Default",
      description: "A clean, professional look",
      background: "bg-cosmic",
      accent: "bg-cosmic-foreground",
      isPremium: false,
    },
    {
      id: "neon",
      name: "Neon",
      description: "Vibrant with glowing accents",
      background: "bg-cosmic-dark",
      accent: "bg-accent",
      isPremium: false,
    },
    {
      id: "cosmic",
      name: "Cosmic",
      description: "Deep space with gradient accents",
      background: "bg-gradient-to-br from-cosmic to-cosmic-dark",
      accent: "bg-accent-gradient",
      isPremium: false,
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Clean, distraction-free design",
      background: "bg-cosmic",
      accent: "bg-white",
      isPremium: false,
    },
    {
      id: "galaxy",
      name: "Galaxy",
      description: "Inspired by distant galaxies",
      background: "bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]",
      accent: "bg-gradient-to-br from-[#7b68ee] to-[#24243e]",
      isPremium: true,
    },
    {
      id: "aurora",
      name: "Aurora",
      description: "Northern lights inspired theme",
      background: "bg-gradient-to-br from-[#000428] to-[#004e92]",
      accent: "bg-gradient-to-br from-teal-300 to-teal-500",
      isPremium: true,
    },
    {
      id: "retrowave",
      name: "Retrowave",
      description: "80s retro futuristic vibes",
      background: "bg-gradient-to-br from-[#3f0d40] to-[#2b0640]",
      accent: "bg-gradient-to-br from-[#ff9ed2] to-[#ff00ff]",
      isPremium: true,
    },
  ];

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your profile settings have been updated",
    });
  };

  return (
    <div className="min-h-screen bg-cosmic">
      <ParticleBackground className="opacity-30" />
      <Navbar />

      <main className="pt-24 pb-16 px-6 relative">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <Link 
                to="/"
                className="inline-flex items-center text-cosmic-foreground/80 hover:text-cosmic-foreground transition-colors mb-4"
              >
                <ChevronLeft size={16} />
                <span className="ml-1">Back to Home</span>
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold text-gradient">
                Profile Settings
              </h1>
              <p className="text-cosmic-foreground/80 mt-2 max-w-xl">
                Customize your cosmic profile and privacy preferences
              </p>
            </div>

            <AnimatedButton 
              icon={<Save size={16} />} 
              variant="primary" 
              size="md"
              onClick={handleSaveSettings}
            >
              Save Changes
            </AnimatedButton>
          </div>

          <div className="glassmorphism rounded-xl border border-white/10">
            <Tabs defaultValue="appearance" value={activeTab} onValueChange={setActiveTab}>
              <div className="border-b border-white/10">
                <TabsList className="bg-transparent h-auto p-0">
                  <div className="flex flex-wrap">
                    <TabsTrigger 
                      value="appearance" 
                      className="data-[state=active]:bg-white/10 data-[state=active]:text-cosmic-foreground rounded-none border-b-2 border-transparent data-[state=active]:border-accent px-4 py-3"
                    >
                      <PaletteIcon size={16} className="mr-2" /> Appearance
                    </TabsTrigger>
                    <TabsTrigger 
                      value="account" 
                      className="data-[state=active]:bg-white/10 data-[state=active]:text-cosmic-foreground rounded-none border-b-2 border-transparent data-[state=active]:border-accent px-4 py-3"
                    >
                      <UserRoundCog size={16} className="mr-2" /> Account
                    </TabsTrigger>
                    <TabsTrigger 
                      value="privacy" 
                      className="data-[state=active]:bg-white/10 data-[state=active]:text-cosmic-foreground rounded-none border-b-2 border-transparent data-[state=active]:border-accent px-4 py-3"
                    >
                      <Lock size={16} className="mr-2" /> Privacy
                    </TabsTrigger>
                    <TabsTrigger 
                      value="notifications" 
                      className="data-[state=active]:bg-white/10 data-[state=active]:text-cosmic-foreground rounded-none border-b-2 border-transparent data-[state=active]:border-accent px-4 py-3"
                    >
                      <BellRing size={16} className="mr-2" /> Notifications
                    </TabsTrigger>
                  </div>
                </TabsList>
              </div>

              <div className="p-6">
                <TabsContent value="appearance" className="m-0">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <PaletteIcon size={18} /> Theme Selection
                      </h2>
                      <p className="text-cosmic-foreground/70 mb-6">
                        Choose a theme that best reflects your personality and style. Premium themes are available with enhanced visual effects.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {themePresets.map((preset) => (
                          <button
                            key={preset.id}
                            className={cn(
                              "relative rounded-lg overflow-hidden border p-1 h-32 transition-all",
                              selectedPreset === preset.id
                                ? "ring-2 ring-accent border-accent/50"
                                : "border-white/10 hover:border-white/30"
                            )}
                            onClick={() => setSelectedPreset(preset.id)}
                          >
                            <div className={cn(
                              "absolute inset-0",
                              preset.background
                            )} />
                            <div className="relative h-full rounded bg-black/40 p-3 flex flex-col justify-between">
                              <div>
                                <div className="flex justify-between items-start">
                                  <h3 className="font-medium">{preset.name}</h3>
                                  {preset.isPremium && (
                                    <span className="inline-flex items-center bg-accent/20 text-accent text-xs px-2 py-0.5 rounded-full">
                                      <Sparkles size={10} className="mr-1" /> Premium
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-cosmic-foreground/70 mt-1">{preset.description}</p>
                              </div>
                              <div className="flex space-x-1 mt-2">
                                <div className={cn("w-4 h-4 rounded-full", preset.accent)} />
                                <div className={cn("w-4 h-4 rounded-full bg-white/20")} />
                                <div className={cn("w-4 h-4 rounded-full bg-white/10")} />
                              </div>
                            </div>
                            {selectedPreset === preset.id && (
                              <div className="absolute top-2 right-2 rounded-full bg-accent w-4 h-4 flex items-center justify-center text-white text-xs">
                                ✓
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-6">
                      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Settings size={18} /> Custom Appearance
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="customBg" className="text-cosmic-foreground/90 mb-2 block">Background Color</Label>
                          <div className="flex gap-2">
                            <Input 
                              id="customBg" 
                              type="text" 
                              value="#0F172A" 
                              className="bg-cosmic border-white/10"
                            />
                            <div className="w-10 h-10 rounded bg-cosmic border border-white/10" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="customAccent" className="text-cosmic-foreground/90 mb-2 block">Accent Color</Label>
                          <div className="flex gap-2">
                            <Input 
                              id="customAccent" 
                              type="text" 
                              value="#8B5CF6" 
                              className="bg-cosmic border-white/10"
                            />
                            <div className="w-10 h-10 rounded bg-accent border border-white/10" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-6">
                      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Eye size={18} /> Visual Effects
                      </h2>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="particles" className="text-cosmic-foreground/90">Particle Background</Label>
                            <p className="text-xs text-cosmic-foreground/70">Animated particles in the background</p>
                          </div>
                          <Switch id="particles" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="parallax" className="text-cosmic-foreground/90">Parallax Effects</Label>
                            <p className="text-xs text-cosmic-foreground/70">Subtle movement on scroll</p>
                          </div>
                          <Switch id="parallax" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="glow" className="text-cosmic-foreground/90">Glow Effects</Label>
                            <p className="text-xs text-cosmic-foreground/70">Subtle glow around elements</p>
                          </div>
                          <Switch id="glow" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="account" className="m-0">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <UserRoundCog size={18} /> Account Information
                      </h2>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="username" className="text-cosmic-foreground/90 mb-2 block">Username</Label>
                          <Input 
                            id="username" 
                            value="cosmic_explorer" 
                            className="bg-cosmic border-white/10"
                          />
                          <p className="text-xs text-cosmic-foreground/70 mt-1">This will be your profile URL: x-bio.com/cosmic_explorer</p>
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-cosmic-foreground/90 mb-2 block">Email Address</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            value="user@example.com" 
                            className="bg-cosmic border-white/10"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-6">
                      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Lock size={18} /> Security
                      </h2>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="password" className="text-cosmic-foreground/90 mb-2 block">Password</Label>
                          <Input 
                            id="password" 
                            type="password" 
                            value="********" 
                            className="bg-cosmic border-white/10"
                          />
                        </div>
                        <Button variant="outline">Change Password</Button>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-6">
                      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-red-400">
                        <Trash2 size={18} /> Danger Zone
                      </h2>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button variant="outline" className="text-red-400 border-red-400/30 hover:bg-red-400/10">
                          Delete Account
                        </Button>
                        <Button variant="outline" className="text-amber-400 border-amber-400/30 hover:bg-amber-400/10">
                          <LogOut size={16} className="mr-2" /> Log Out
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="privacy" className="m-0">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Lock size={18} /> Privacy Settings
                      </h2>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-cosmic-foreground/90">Profile Visibility</Label>
                            <p className="text-xs text-cosmic-foreground/70">Who can see your profile</p>
                          </div>
                          <select className="bg-cosmic-dark border border-white/10 rounded px-3 py-2 text-sm">
                            <option>Everyone</option>
                            <option>Only authenticated users</option>
                            <option>Private (invitation only)</option>
                          </select>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-cosmic-foreground/90">Search Engine Visibility</Label>
                            <p className="text-xs text-cosmic-foreground/70">Allow your profile to appear in search results</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-cosmic-foreground/90">Activity Status</Label>
                            <p className="text-xs text-cosmic-foreground/70">Show when you're online</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-white/10 pt-6">
                      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <UserRoundCog size={18} /> Data & Personalization
                      </h2>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-cosmic-foreground/90">Usage Analytics</Label>
                            <p className="text-xs text-cosmic-foreground/70">Allow us to collect anonymous usage data to improve your experience</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-cosmic-foreground/90">Personalized Content</Label>
                            <p className="text-xs text-cosmic-foreground/70">Receive content recommendations based on your interests</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="notifications" className="m-0">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <BellRing size={18} /> Notification Preferences
                      </h2>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-cosmic-foreground/90">Email Notifications</Label>
                            <p className="text-xs text-cosmic-foreground/70">Receive notifications via email</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-cosmic-foreground/90">Profile Views</Label>
                            <p className="text-xs text-cosmic-foreground/70">Get notified when someone views your profile</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-cosmic-foreground/90">New Followers</Label>
                            <p className="text-xs text-cosmic-foreground/70">Get notified when someone follows you</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-cosmic-foreground/90">Comments</Label>
                            <p className="text-xs text-cosmic-foreground/70">Get notified when someone comments on your profile</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-cosmic-foreground/90">Platform Updates</Label>
                            <p className="text-xs text-cosmic-foreground/70">Get notified about new features and updates</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-cosmic-dark/80 border-t border-white/10 py-6 px-6">
        <div className="container mx-auto text-center text-sm text-cosmic-foreground/60">
          <div className="flex justify-center items-center gap-2">
            <span className="text-gradient font-bold">x-bio</span>
            <span>•</span>
            <span>© {new Date().getFullYear()}</span>
            <span>•</span>
            <Link to="/" className="hover:text-cosmic-foreground transition-colors">Create your own</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfileSettings;
