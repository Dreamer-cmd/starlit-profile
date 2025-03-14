
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SocialLink } from "@/components/SocialLinks";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Plus, Trash2, Save, X, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

const THEMES = [
  { id: "cosmic", name: "Cosmic", description: "Dark space theme with purple accents" },
  { id: "neon", name: "Neon", description: "Vibrant blue gradient with neon accents" },
  { id: "aurora", name: "Aurora", description: "Teal and blue Northern Lights inspired" },
  { id: "galaxy", name: "Galaxy", description: "Deep purple with stellar accents" },
  { id: "retrowave", name: "Retrowave", description: "80s inspired with pink gradients" }
];

type ProfileEditorProps = {
  userData: {
    name: string;
    username: string;
    avatar: string;
    status: string;
    bio: string;
    featured: string;
    socialLinks: SocialLink[];
    theme: string;
  };
  onSave: (updatedData: ProfileEditorProps["userData"]) => void;
  onCancel: () => void;
};

const ProfileEditor: React.FC<ProfileEditorProps> = ({
  userData,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState({ ...userData });
  const [socialLinks, setSocialLinks] = useState([...userData.socialLinks]);
  const [newSocialPlatform, setNewSocialPlatform] = useState("");
  const [newSocialUrl, setNewSocialUrl] = useState("");
  const [activeTab, setActiveTab] = useState("profile");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleThemeChange = (theme: string) => {
    setFormData((prev) => ({ ...prev, theme }));
  };

  const handleAddSocialLink = () => {
    if (newSocialPlatform && newSocialUrl) {
      setSocialLinks([
        ...socialLinks,
        { platform: newSocialPlatform, url: newSocialUrl },
      ]);
      setNewSocialPlatform("");
      setNewSocialUrl("");
      
      toast({
        title: "Social link added",
        description: `Added ${newSocialPlatform} to your profile`,
      });
    }
  };

  const handleRemoveSocialLink = (index: number) => {
    const removed = socialLinks[index];
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
    
    toast({
      title: "Social link removed",
      description: `Removed ${removed.platform} from your profile`,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, socialLinks });
  };

  return (
    <div className="text-cosmic-foreground">
      <DialogHeader className="pb-4">
        <DialogTitle className="text-2xl text-gradient">Edit Your Profile</DialogTitle>
        <DialogDescription>
          Update your profile information and social links to personalize your cosmic identity.
        </DialogDescription>
      </DialogHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full bg-cosmic-dark/30 backdrop-blur-sm border border-white/5 rounded-xl p-1">
          <TabsTrigger value="profile" className="flex-1 data-[state=active]:bg-accent data-[state=active]:text-white">
            Profile
          </TabsTrigger>
          <TabsTrigger value="theme" className="flex-1 data-[state=active]:bg-accent data-[state=active]:text-white">
            Theme
          </TabsTrigger>
          <TabsTrigger value="social" className="flex-1 data-[state=active]:bg-accent data-[state=active]:text-white">
            Social
          </TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit} className="space-y-6 pt-6">
          <TabsContent value="profile" className="space-y-4 mt-0">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="name" className="text-cosmic-foreground/90">Display Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-cosmic-dark/30 border-white/10"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="username" className="text-cosmic-foreground/90">Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="bg-cosmic-dark/30 border-white/10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="avatar" className="text-cosmic-foreground/90">Avatar URL</Label>
              <Input
                id="avatar"
                name="avatar"
                value={formData.avatar}
                onChange={handleInputChange}
                placeholder="https://example.com/avatar.jpg"
                className="bg-cosmic-dark/30 border-white/10"
              />
            </div>

            <div>
              <Label htmlFor="status" className="text-cosmic-foreground/90">Status</Label>
              <Input
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="bg-cosmic-dark/30 border-white/10"
              />
            </div>

            <div>
              <Label htmlFor="bio" className="text-cosmic-foreground/90">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={3}
                className="bg-cosmic-dark/30 border-white/10 resize-none"
              />
            </div>

            <div>
              <Label htmlFor="featured" className="text-cosmic-foreground/90">Featured</Label>
              <Textarea
                id="featured"
                name="featured"
                value={formData.featured}
                onChange={handleInputChange}
                rows={3}
                className="bg-cosmic-dark/30 border-white/10 resize-none"
              />
            </div>
          </TabsContent>

          <TabsContent value="theme" className="space-y-4 mt-0">
            <div>
              <Label className="text-cosmic-foreground/90 mb-3 block">Select Theme</Label>
              <RadioGroup 
                value={formData.theme} 
                onValueChange={handleThemeChange}
                className="grid grid-cols-1 gap-4"
              >
                {THEMES.map((theme) => (
                  <div key={theme.id} className="relative">
                    <RadioGroupItem
                      value={theme.id}
                      id={`theme-${theme.id}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`theme-${theme.id}`}
                      className={`flex flex-col gap-2 rounded-xl border-2 border-white/10 p-4 hover:border-accent/50 peer-data-[state=checked]:border-accent 
                      theme-${theme.id} cursor-pointer transition-all duration-200`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{theme.name}</span>
                        <div className="h-5 w-5 rounded-full border border-white/20 flex items-center justify-center peer-data-[state=checked]:bg-accent invisible peer-data-[state=checked]:visible">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      </div>
                      <span className="text-sm opacity-80">{theme.description}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </TabsContent>

          <TabsContent value="social" className="space-y-4 mt-0">
            <Label className="text-cosmic-foreground/90 mb-2 block">Social Links</Label>
            <div className="space-y-3">
              {socialLinks.map((link, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={link.platform}
                    onChange={(e) => {
                      const newLinks = [...socialLinks];
                      newLinks[index].platform = e.target.value;
                      setSocialLinks(newLinks);
                    }}
                    placeholder="Platform"
                    className="bg-cosmic-dark/30 border-white/10 flex-1"
                  />
                  <Input
                    value={link.url}
                    onChange={(e) => {
                      const newLinks = [...socialLinks];
                      newLinks[index].url = e.target.value;
                      setSocialLinks(newLinks);
                    }}
                    placeholder="URL"
                    className="bg-cosmic-dark/30 border-white/10 flex-2"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => handleRemoveSocialLink(index)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}

              <div className="flex gap-2">
                <Input
                  value={newSocialPlatform}
                  onChange={(e) => setNewSocialPlatform(e.target.value)}
                  placeholder="Platform (e.g., Twitter)"
                  className="bg-cosmic-dark/30 border-white/10 flex-1"
                />
                <Input
                  value={newSocialUrl}
                  onChange={(e) => setNewSocialUrl(e.target.value)}
                  placeholder="URL (e.g., https://twitter.com/username)"
                  className="bg-cosmic-dark/30 border-white/10 flex-2"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={handleAddSocialLink}
                  disabled={!newSocialPlatform || !newSocialUrl}
                  className="bg-cosmic-dark/30"
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
          </TabsContent>

          <Separator className="my-4 bg-white/10" />
          
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
            >
              <X size={16} className="mr-1" /> Cancel
            </Button>
            <Button
              type="submit"
              className="bg-accent hover:bg-accent/90"
            >
              <Save size={16} className="mr-1" /> Save Changes
            </Button>
          </div>
        </form>
      </Tabs>
    </div>
  );
};

export default ProfileEditor;
