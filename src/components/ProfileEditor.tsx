
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SocialLink } from "@/components/SocialLinks";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Plus, Trash2, Save, X } from "lucide-react";

type ProfileEditorProps = {
  userData: {
    name: string;
    username: string;
    avatar: string;
    status: string;
    bio: string;
    featured: string;
    socialLinks: SocialLink[];
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSocialLink = () => {
    if (newSocialPlatform && newSocialUrl) {
      setSocialLinks([
        ...socialLinks,
        { platform: newSocialPlatform, url: newSocialUrl },
      ]);
      setNewSocialPlatform("");
      setNewSocialUrl("");
    }
  };

  const handleRemoveSocialLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
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

      <form onSubmit={handleSubmit} className="space-y-6 pt-4">
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="name" className="text-cosmic-foreground/90">Display Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="bg-cosmic border-white/10"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="username" className="text-cosmic-foreground/90">Username</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="bg-cosmic border-white/10"
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
              className="bg-cosmic border-white/10"
            />
          </div>

          <div>
            <Label htmlFor="status" className="text-cosmic-foreground/90">Status</Label>
            <Input
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="bg-cosmic border-white/10"
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
              className="bg-cosmic border-white/10 resize-none"
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
              className="bg-cosmic border-white/10 resize-none"
            />
          </div>
        </div>

        <div>
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
                  className="bg-cosmic border-white/10 flex-1"
                />
                <Input
                  value={link.url}
                  onChange={(e) => {
                    const newLinks = [...socialLinks];
                    newLinks[index].url = e.target.value;
                    setSocialLinks(newLinks);
                  }}
                  placeholder="URL"
                  className="bg-cosmic border-white/10 flex-2"
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
                className="bg-cosmic border-white/10 flex-1"
              />
              <Input
                value={newSocialUrl}
                onChange={(e) => setNewSocialUrl(e.target.value)}
                placeholder="URL (e.g., https://twitter.com/username)"
                className="bg-cosmic border-white/10 flex-2"
              />
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={handleAddSocialLink}
                disabled={!newSocialPlatform || !newSocialUrl}
                className="bg-cosmic"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
        </div>

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
    </div>
  );
};

export default ProfileEditor;
