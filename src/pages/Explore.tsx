
import React, { useState, useEffect } from "react";
import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import ProfileCard from "@/components/ProfileCard";
import AnimatedButton from "@/components/AnimatedButton";
import { Input } from "@/components/ui/input";
import { Search, Filter, Globe, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Skeleton } from "@/components/ui/skeleton";

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [profiles, setProfiles] = useState<any[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<any[]>([]);

  // Sample profile data for demo
  const sampleProfiles = [
    {
      id: 1,
      username: "cosmic_voyager",
      name: "Cosmic Voyager",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      status: "Digital Explorer",
      bio: "Exploring the frontiers of technology and design. Always looking for the next big challenge.",
      theme: "cosmic",
      socialLinks: [
        { platform: "Twitter", url: "https://twitter.com" },
        { platform: "GitHub", url: "https://github.com" },
      ],
    },
    {
      id: 2,
      username: "stellar_coder",
      name: "Stellar Coder",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      status: "Full-Stack Developer",
      bio: "Building the future with code. React enthusiast and open source contributor.",
      theme: "neon",
      socialLinks: [
        { platform: "GitHub", url: "https://github.com" },
        { platform: "LinkedIn", url: "https://linkedin.com" },
      ],
    },
    {
      id: 3,
      username: "lunar_designer",
      name: "Lunar Designer",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      status: "UI/UX Designer",
      bio: "Creating beautiful and intuitive interfaces. Passionate about user experience and accessibility.",
      theme: "minimal",
      socialLinks: [
        { platform: "Dribbble", url: "https://dribbble.com" },
        { platform: "Instagram", url: "https://instagram.com" },
      ],
    },
    {
      id: 4,
      username: "nebula_artist",
      name: "Nebula Artist",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      status: "Digital Artist",
      bio: "Creating immersive digital art experiences. Exploring the boundaries of creativity and technology.",
      theme: "default",
      socialLinks: [
        { platform: "Instagram", url: "https://instagram.com" },
        { platform: "ArtStation", url: "https://artstation.com" },
      ],
    },
    {
      id: 5,
      username: "galactic_writer",
      name: "Galactic Writer",
      avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      status: "Content Creator",
      bio: "Writing about tech, design, and the future. Always exploring new topics and perspectives.",
      theme: "cosmic",
      socialLinks: [
        { platform: "Medium", url: "https://medium.com" },
        { platform: "Twitter", url: "https://twitter.com" },
      ],
    },
    {
      id: 6,
      username: "astral_musician",
      name: "Astral Musician",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      status: "Music Producer",
      bio: "Creating cosmic soundscapes and electronic music. Inspired by the universe and its mysteries.",
      theme: "neon",
      socialLinks: [
        { platform: "SoundCloud", url: "https://soundcloud.com" },
        { platform: "Spotify", url: "https://spotify.com" },
      ],
    },
  ];

  useEffect(() => {
    // Set profiles directly without loading check
    setProfiles(sampleProfiles);
    setFilteredProfiles(sampleProfiles);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = profiles.filter(
        (profile) =>
          profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          profile.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          profile.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
          profile.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProfiles(filtered);
    } else {
      setFilteredProfiles(profiles);
    }
  }, [searchTerm, profiles]);

  return (
    <div className="min-h-screen bg-cosmic">
      <ParticleBackground className="opacity-40" />
      <Navbar />

      <main className="pt-24 pb-16 px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <Link 
                to="/"
                className="inline-flex items-center text-cosmic-foreground/80 hover:text-cosmic-foreground transition-colors mb-4"
              >
                <ArrowLeft size={16} />
                <span className="ml-1">Back to Home</span>
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold text-gradient">
                Explore Cosmic Profiles
              </h1>
              <p className="text-cosmic-foreground/80 mt-2 max-w-xl">
                Discover amazing creators and their cosmic digital identities. Connect with like-minded individuals from around the universe.
              </p>
            </div>

            <div className="relative w-full md:w-auto">
              <div className="flex gap-2 w-full md:w-64">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic-foreground/50" size={16} />
                  <Input
                    type="text"
                    placeholder="Search profiles..."
                    className="pl-10 bg-white/5 border-white/10 text-cosmic-foreground"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <AnimatedButton 
                  icon={<Filter size={16} />}
                  variant="outline"
                  size="sm"
                >
                  Filter
                </AnimatedButton>
              </div>
            </div>
          </div>

          {/* Atmospheric elements */}
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-accent/5 blur-3xl opacity-30 animate-pulse-glow"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-cosmic-highlight/5 blur-3xl opacity-20 animate-pulse-glow" style={{ animationDelay: "1s" }}></div>

          {/* Profiles grid - always show profiles without loading check */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {filteredProfiles.length > 0 ? (
              filteredProfiles.map((profile) => (
                <Link
                  key={profile.id}
                  to={`/${profile.username}`}
                  className="transition-transform duration-300 hover:scale-105"
                >
                  <ProfileCard
                    name={profile.name}
                    avatar={profile.avatar}
                    status={profile.status}
                    bio={profile.bio}
                    socialLinks={profile.socialLinks}
                    theme={profile.theme}
                    className="h-full"
                  />
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Globe size={48} className="text-cosmic-foreground/30 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No profiles found</h3>
                <p className="text-cosmic-foreground/60 max-w-md mx-auto">
                  We couldn't find any profiles matching your search criteria. Try adjusting your search or explore different keywords.
                </p>
              </div>
            )}
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

export default Explore;
