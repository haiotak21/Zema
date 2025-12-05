import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  FileText,
  Music,
  CheckCircle,
  Clock,
  Image as ImageIcon,
  X,
  User,
  BadgeCheck,
  PlayCircle,
  PauseCircle,
  Trash2,
  Plus,
  Save,
  ArrowLeft,
  RefreshCw,
  SkipBack,
  SkipForward,
  Mic2,
  AlertCircle,
  BarChart3,
  Globe,
  DollarSign,
  Calendar,
  MapPin,
  Wand2,
  Youtube,
  Instagram,
  Twitter,
  ExternalLink,
  HelpCircle,
  MessageSquare,
  ShoppingBag,
  CreditCard,
  Users,
  Share2,
  Megaphone,
  Video,
  Send,
  Download,
  Copy,
  Percent,
  Wallet,
  MousePointer2,
  Bell,
  Scale,
  FileCheck,
  ShieldAlert,
  Gavel,
  Check,
  UserPlus,
  Briefcase,
  Lock,
  Shield,
  FileQuestion,
  AlertTriangle,
  ChevronRight,
  Disc,
  Info,
  ListMusic,
} from "lucide-react";
import { Button } from "../components/Button";
import { User as UserType, Song } from "../types";
import { Community } from "./Community"; // Import Community Component

interface ArtistDashboardProps {
  user?: UserType;
}

// Mock Analytics Data
const MOCK_ANALYTICS = {
  dailyStreams: [450, 520, 480, 600, 750, 890, 920], // Last 7 days
  locations: [
    { city: "Addis Ababa", percent: 65 },
    { city: "Washington DC", percent: 12 },
    { city: "London", percent: 8 },
    { city: "Nairobi", percent: 5 },
    { city: "Dubai", percent: 4 },
  ],
  payoutHistory: [
    {
      id: "tx-101",
      date: "Oct 25, 2023",
      amount: "12,450 ETB",
      method: "CBE",
      status: "Processing",
    },
    {
      id: "tx-099",
      date: "Sep 28, 2023",
      amount: "10,200 ETB",
      method: "Dashen",
      status: "Paid",
    },
    {
      id: "tx-082",
      date: "Aug 30, 2023",
      amount: "8,500 ETB",
      method: "Telebirr",
      status: "Paid",
    },
  ],
};

export const ArtistDashboard: React.FC<ArtistDashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<
    | "stats"
    | "upload"
    | "lyrics"
    | "community"
    | "money"
    | "collab"
    | "marketing"
    | "rights"
    | "team"
    | "support"
    | "alerts"
    | "profile"
  >("stats");
  const [isUploading, setIsUploading] = useState(false);

  // Local state for recent uploads simulation
  const [recentUploads, setRecentUploads] = useState([
    {
      id: "u1",
      title: "Gue",
      status: "Live",
      date: "2 days ago",
      type: "Single",
      streams: "124K",
    },
    {
      id: "u2",
      title: "Addis Night",
      status: "Pending",
      date: "5 hours ago",
      type: "Single",
      streams: "-",
    },
    {
      id: "u3",
      title: "Untitled Demo",
      status: "Rejected",
      date: "1 week ago",
      type: "EP",
      streams: "-",
    },
  ]);

  // --- UPLOAD WIZARD STATE ---
  const [uploadStep, setUploadStep] = useState(1); // 1: Metadata, 2: Media, 3: Review
  const [releaseType, setReleaseType] = useState<"Single" | "EP" | "Album">(
    "Single"
  );
  const [formData, setFormData] = useState({
    title: "",
    genre: "Traditional",
    description: "",
    isExplicit: false,
    releaseDate: "",
  });
  const [files, setFiles] = useState<{
    audio: File | null;
    cover: File | null;
  }>({ audio: null, cover: null });
  const [previews, setPreviews] = useState<{
    audio: string | null;
    cover: string | null;
  }>({ audio: null, cover: null });

  // --- PROFILE STATE ---
  const [profileForm, setProfileForm] = useState({
    stageName: user?.stageName || user?.name || "",
    bio: user?.bio || "",
    instagram: user?.socialLinks?.instagram || "",
    twitter: user?.socialLinks?.twitter || "",
    youtube: user?.socialLinks?.youtube || "",
    website: user?.socialLinks?.website || "",
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // --- LYRICS EDITOR STATE ---
  const [editingSong, setEditingSong] = useState<any | null>(null);
  const [lyricLines, setLyricLines] = useState<
    { id: string; time: number; text: string }[]
  >([]);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [isPlaybackActive, setIsPlaybackActive] = useState(false);
  const [showSongSelector, setShowSongSelector] = useState(false);
  const editorScrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // For lyrics import

  // --- EARNINGS STATE ---
  const [isRequestingPayout, setIsRequestingPayout] = useState(false);

  // --- UPLOAD HANDLERS ---
  const handleFileChange = (
    type: "audio" | "cover",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFiles((prev) => ({ ...prev, [type]: file }));
      setPreviews((prev) => ({ ...prev, [type]: URL.createObjectURL(file) }));

      if (type === "audio" && !formData.title) {
        setFormData((prev) => ({
          ...prev,
          title: file.name.replace(/\.[^/.]+$/, ""),
        }));
      }
    }
  };

  const handleRemoveFile = (type: "audio" | "cover") => {
    setFiles((prev) => ({ ...prev, [type]: null }));
    setPreviews((prev) => ({ ...prev, [type]: null }));
  };

  const handlePublish = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setRecentUploads([
        {
          id: `u-${Date.now()}`,
          title: formData.title,
          status: "Pending",
          date: "Just now",
          type: releaseType,
          streams: "-",
        },
        ...recentUploads,
      ]);
      setUploadStep(1);
      setFormData({
        title: "",
        genre: "Traditional",
        description: "",
        isExplicit: false,
        releaseDate: "",
      });
      setFiles({ audio: null, cover: null });
      setPreviews({ audio: null, cover: null });
      setActiveTab("stats");
      alert(
        "Release submitted successfully! It will be live after moderation."
      );
    }, 2000);
  };

  // --- PROFILE HANDLERS ---
  const handleSaveProfile = () => {
    setIsSavingProfile(true);
    setSaveSuccess(false);

    // Simulate API save delay
    setTimeout(() => {
      setIsSavingProfile(false);
      setSaveSuccess(true);

      // Auto hide success message
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  // --- LYRICS HANDLERS ---
  const handleSelectSongForLyrics = (song: any) => {
    setEditingSong(song);
    setShowSongSelector(false);
    // Mock loading lyrics if they exist or start fresh
    setLyricLines([]);
  };

  const handleImportLyrics = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (!content) return;

      const lines = content
        .split("\n")
        .map((line, idx) => {
          // Basic LRC parsing [mm:ss.xx] text
          const match = line.match(/\[(\d{2}):(\d{2}\.\d{2})\](.*)/);
          if (match) {
            const min = parseInt(match[1]);
            const sec = parseFloat(match[2]);
            return {
              id: `l-${idx}`,
              time: min * 60 + sec,
              text: match[3].trim(),
            };
          }
          return { id: `l-${idx}`, time: idx * 5, text: line.trim() };
        })
        .filter((l) => l.text);
      setLyricLines(lines);
    };
    reader.readAsText(file);
  };

  // --- EARNINGS HANDLERS ---
  const handleRequestPayout = () => {
    setIsRequestingPayout(true);
    setTimeout(() => {
      setIsRequestingPayout(false);
      alert("Payout request submitted! It will be processed within 24 hours.");
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-black overflow-hidden">
      {/* Pending Artist Banner */}
      {(user as any)?.pendingArtist ||
      (user as any)?.requestedRole === "ARTIST" ? (
        <div className="fixed top-16 left-72 right-8 z-50">
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg shadow">
            <strong className="font-semibold mr-2">Application Pending:</strong>
            Your artist application is under review. You currently have a
            listener account — you'll be upgraded once approved.
          </div>
        </div>
      ) : null}
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-900">
          <h1 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Music className="text-rose-600" /> Artist Studio
          </h1>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {[
            { id: "stats", label: "Overview", icon: BarChart3 },
            { id: "upload", label: "Upload Music", icon: Upload },
            { id: "lyrics", label: "Lyrics Editor", icon: Mic2 },
            { id: "money", label: "Earnings", icon: DollarSign },
            { id: "profile", label: "Profile", icon: User },
            { id: "community", label: "Community", icon: Users },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? "bg-rose-50 dark:bg-rose-900/10 text-rose-600 dark:text-rose-500"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3 px-4 py-3">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 font-bold">
                {user?.name?.[0]}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">
                {user?.name}
              </p>
              <p className="text-xs text-zinc-500 truncate">Artist Account</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-zinc-50 dark:bg-black p-8">
        {/* STATS VIEW */}
        {activeTab === "stats" && (
          <div className="space-y-8 animate-in fade-in">
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">
                Good morning, {user?.name?.split(" ")[0]}
              </h2>
              <p className="text-zinc-500">
                Here's what's happening with your music today.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: "Total Streams",
                  value: "1.2M",
                  change: "+12%",
                  icon: PlayCircle,
                  color: "text-blue-500",
                },
                {
                  label: "Listeners",
                  value: "45.2K",
                  change: "+5%",
                  icon: Users,
                  color: "text-purple-500",
                },
                {
                  label: "Followers",
                  value: "12.8K",
                  change: "+2%",
                  icon: UserPlus,
                  color: "text-rose-500",
                },
                {
                  label: "Revenue",
                  value: "450K ETB",
                  change: "+8%",
                  icon: Wallet,
                  color: "text-emerald-500",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 ${stat.color}`}
                    >
                      <stat.icon size={20} />
                    </div>
                    <span className="text-emerald-500 text-xs font-bold bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded">
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6">
                  Recent Uploads
                </h3>
                <div className="space-y-4">
                  {recentUploads.map((upload, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-950/50 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-950 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-zinc-200 dark:bg-zinc-800 rounded flex items-center justify-center text-zinc-400">
                          <Music size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-zinc-900 dark:text-white">
                            {upload.title}
                          </p>
                          <p className="text-xs text-zinc-500">
                            {upload.type} • {upload.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                            upload.status === "Live"
                              ? "bg-emerald-100 text-emerald-600"
                              : upload.status === "Pending"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {upload.status}
                        </span>
                        {upload.status === "Live" && (
                          <p className="text-xs text-zinc-500 mt-1">
                            {upload.streams} streams
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6">
                  Audience Location
                </h3>
                <div className="space-y-4">
                  {MOCK_ANALYTICS.locations.map((loc, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-zinc-700 dark:text-zinc-300">
                          {loc.city}
                        </span>
                        <span className="font-bold text-zinc-900 dark:text-white">
                          {loc.percent}%
                        </span>
                      </div>
                      <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-rose-500 rounded-full"
                          style={{ width: `${loc.percent}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* UPLOAD VIEW */}
        {activeTab === "upload" && (
          <div className="max-w-3xl mx-auto animate-in fade-in">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                Upload New Music
              </h2>
              <div className="flex items-center gap-2 text-sm text-zinc-500 mt-2">
                <span
                  className={uploadStep >= 1 ? "text-rose-600 font-bold" : ""}
                >
                  1. Details
                </span>
                <ChevronRight size={14} />
                <span
                  className={uploadStep >= 2 ? "text-rose-600 font-bold" : ""}
                >
                  2. Assets
                </span>
                <ChevronRight size={14} />
                <span
                  className={uploadStep >= 3 ? "text-rose-600 font-bold" : ""}
                >
                  3. Review
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
              {uploadStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Release Type
                    </label>
                    <div className="flex gap-4">
                      {["Single", "EP", "Album"].map((type) => (
                        <button
                          key={type}
                          onClick={() => setReleaseType(type as any)}
                          className={`flex-1 py-3 rounded-lg border text-sm font-medium transition-colors ${
                            releaseType === type
                              ? "border-rose-600 bg-rose-50 dark:bg-rose-900/10 text-rose-600 dark:text-rose-500"
                              : "border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-zinc-400"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-rose-500"
                        placeholder="Track Title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        Primary Genre
                      </label>
                      <select
                        value={formData.genre}
                        onChange={(e) =>
                          setFormData({ ...formData, genre: e.target.value })
                        }
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-rose-500"
                      >
                        <option>Traditional</option>
                        <option>Ethio-Jazz</option>
                        <option>Afrobeats</option>
                        <option>Hip Hop</option>
                        <option>Gospel</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="w-full h-24 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-rose-500 resize-none"
                      placeholder="Tell listeners about this release..."
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={() => setUploadStep(2)}
                      disabled={!formData.title}
                    >
                      Next Step
                    </Button>
                  </div>
                </div>
              )}

              {uploadStep === 2 && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        Cover Art
                      </label>
                      <div className="aspect-square bg-zinc-100 dark:bg-zinc-950 border-2 border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl flex flex-col items-center justify-center relative overflow-hidden group">
                        {previews.cover ? (
                          <>
                            <img
                              src={previews.cover}
                              className="w-full h-full object-cover"
                            />
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleRemoveFile("cover");
                              }}
                              className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white shadow-lg hover:bg-red-600 transition-colors z-20"
                              title="Remove cover"
                            >
                              <X size={16} />
                            </button>
                          </>
                        ) : (
                          <div className="text-center p-4">
                            <ImageIcon
                              className="mx-auto text-zinc-400 mb-2"
                              size={32}
                            />
                            <p className="text-xs text-zinc-500">
                              Click to upload (3000x3000px)
                            </p>
                          </div>
                        )}
                        {!previews.cover && (
                          <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={(e) => handleFileChange("cover", e)}
                          />
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        Audio File
                      </label>
                      <div className="h-full bg-zinc-100 dark:bg-zinc-950 border-2 border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl flex flex-col items-center justify-center relative p-6 group">
                        {files.audio ? (
                          <div className="text-center w-full">
                            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-2">
                              <Music size={24} />
                            </div>
                            <p className="text-sm font-bold text-zinc-900 dark:text-white truncate max-w-[200px] mx-auto">
                              {files.audio.name}
                            </p>
                            <p className="text-xs text-zinc-500">
                              {(files.audio.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleRemoveFile("audio");
                              }}
                              className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white shadow-lg hover:bg-red-600 transition-colors z-20"
                              title="Remove audio"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Upload
                              className="mx-auto text-zinc-400 mb-2"
                              size={32}
                            />
                            <p className="text-xs text-zinc-500">
                              WAV or FLAC preferred
                            </p>
                          </div>
                        )}
                        {!files.audio && (
                          <input
                            type="file"
                            accept="audio/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={(e) => handleFileChange("audio", e)}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="secondary"
                      onClick={() => setUploadStep(1)}
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => setUploadStep(3)}
                      disabled={!files.audio || !files.cover}
                    >
                      Next Step
                    </Button>
                  </div>
                </div>
              )}

              {uploadStep === 3 && (
                <div className="space-y-6 text-center">
                  <div className="w-20 h-20 bg-rose-100 dark:bg-rose-900/20 text-rose-600 dark:text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Upload size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                    Ready to Publish?
                  </h3>
                  <p className="text-zinc-500 max-w-md mx-auto">
                    Your release "{formData.title}" will be submitted for
                    review. This usually takes 24-48 hours.
                  </p>

                  <div className="bg-zinc-50 dark:bg-zinc-950 rounded-lg p-4 text-left max-w-sm mx-auto border border-zinc-100 dark:border-zinc-800">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-zinc-500">Title:</span>
                      <span className="font-medium text-zinc-900 dark:text-white">
                        {formData.title}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-zinc-500">Type:</span>
                      <span className="font-medium text-zinc-900 dark:text-white">
                        {releaseType}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-500">Genre:</span>
                      <span className="font-medium text-zinc-900 dark:text-white">
                        {formData.genre}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-center gap-4 pt-4">
                    <Button
                      variant="secondary"
                      onClick={() => setUploadStep(2)}
                      disabled={isUploading}
                    >
                      Back
                    </Button>
                    <Button onClick={handlePublish} disabled={isUploading}>
                      {isUploading ? "Uploading..." : "Submit Release"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* LYRICS VIEW */}
        {activeTab === "lyrics" && (
          <div className="space-y-6 animate-in fade-in relative">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  Lyrics Editor
                </h2>
                <p className="text-zinc-500 text-sm">
                  Sync lyrics for your tracks.
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload size={14} className="mr-2" /> Import LRC
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept=".lrc,.txt"
                  onChange={handleImportLyrics}
                />
                <Button size="sm" onClick={() => alert("Saved successfully!")}>
                  <Save size={14} className="mr-2" /> Save
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
              {/* Editor */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl flex flex-col overflow-hidden">
                <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-zinc-500">
                    Time-Synced Lyrics
                  </span>
                  <span className="text-xs text-zinc-400">
                    {lyricLines.length} lines
                  </span>
                </div>
                <div
                  className="flex-1 overflow-y-auto p-4 space-y-2 bg-zinc-50 dark:bg-black"
                  ref={editorScrollRef}
                >
                  {lyricLines.length > 0 ? (
                    lyricLines.map((line, idx) => (
                      <div
                        key={line.id}
                        className="flex gap-2 items-center group"
                      >
                        <input
                          type="text"
                          className="w-16 bg-zinc-200 dark:bg-zinc-800 border-none rounded px-2 py-1 text-xs font-mono text-center focus:ring-1 focus:ring-rose-500"
                          value={(line.time / 60).toFixed(2).replace(".", ":")}
                          readOnly
                        />
                        <input
                          type="text"
                          className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-zinc-900 dark:text-white font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded px-2 py-1 transition-colors"
                          value={line.text}
                          onChange={(e) => {
                            const newLines = [...lyricLines];
                            newLines[idx].text = e.target.value;
                            setLyricLines(newLines);
                          }}
                        />
                        <button
                          className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-red-500 transition-opacity"
                          onClick={() =>
                            setLyricLines(
                              lyricLines.filter((l) => l.id !== line.id)
                            )
                          }
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-zinc-400">
                      <Mic2 size={32} className="mb-2 opacity-50" />
                      <p className="text-sm">No lyrics loaded.</p>
                      <p className="text-xs">Import a file or start typing.</p>
                    </div>
                  )}
                </div>
                <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex justify-center">
                  <button
                    className="flex items-center gap-2 text-sm text-rose-600 font-medium hover:text-rose-700"
                    onClick={() =>
                      setLyricLines([
                        ...lyricLines,
                        {
                          id: Date.now().toString(),
                          time: 0,
                          text: "New line",
                        },
                      ])
                    }
                  >
                    <Plus size={14} /> Add Line
                  </button>
                </div>
              </div>

              {/* Preview / Player */}
              <div className="bg-zinc-900 rounded-xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 pointer-events-none"></div>

                <div className="relative z-10 space-y-6">
                  {editingSong ? (
                    <div className="space-y-4 w-full">
                      <div className="flex items-center gap-4 bg-black/30 p-4 rounded-xl text-left border border-white/10">
                        <div className="w-12 h-12 bg-zinc-800 rounded flex items-center justify-center text-zinc-500">
                          <Music size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-white">
                            {editingSong.title}
                          </h4>
                          <p className="text-sm text-zinc-400">
                            {editingSong.type || "Single"}
                          </p>
                        </div>
                        <button
                          onClick={() => setEditingSong(null)}
                          className="ml-auto text-zinc-400 hover:text-white"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      <div className="flex justify-center gap-4">
                        <button className="p-3 bg-white text-black rounded-full hover:scale-105 transition-transform">
                          <PlayCircle size={24} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-48 h-48 bg-zinc-800 rounded-lg shadow-2xl mx-auto flex items-center justify-center border border-white/10">
                        <Music size={48} className="text-zinc-600" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-xl">
                          Select a track to sync
                        </h3>
                        <p className="text-zinc-400 text-sm mt-1">
                          Preview mode
                        </p>
                      </div>
                      <div className="flex justify-center gap-4">
                        <Button onClick={() => setShowSongSelector(true)}>
                          Select Track
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Track Selector Modal */}
            {showSongSelector && (
              <div className="absolute inset-0 bg-white dark:bg-zinc-950 z-20 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 flex flex-col animate-in fade-in zoom-in-95">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-xl text-zinc-900 dark:text-white">
                    Select a Track
                  </h3>
                  <button
                    onClick={() => setShowSongSelector(false)}
                    className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-500"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto space-y-2">
                  {recentUploads.length > 0 ? (
                    recentUploads.map((song) => (
                      <div
                        key={song.id}
                        onClick={() => handleSelectSongForLyrics(song)}
                        className="flex items-center gap-4 p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg cursor-pointer border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 transition-all"
                      >
                        <div className="w-10 h-10 bg-rose-100 dark:bg-rose-900/20 text-rose-600 dark:text-rose-500 rounded flex items-center justify-center">
                          <Music size={20} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-zinc-900 dark:text-white">
                            {song.title}
                          </h4>
                          <p className="text-xs text-zinc-500">
                            {song.type} • {song.date}
                          </p>
                        </div>
                        <ChevronRight size={16} className="text-zinc-400" />
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 text-zinc-500">
                      <p>No tracks found. Upload music first.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* PROFILE VIEW */}
        {activeTab === "profile" && (
          <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                Artist Profile
              </h2>
              <div className="flex items-center gap-3">
                {saveSuccess && (
                  <span className="text-emerald-500 text-sm font-medium animate-in fade-in slide-in-from-right-2 flex items-center gap-1">
                    <CheckCircle size={16} /> Saved Successfully
                  </span>
                )}
                <Button onClick={handleSaveProfile} disabled={isSavingProfile}>
                  {isSavingProfile ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Stage Name
                </label>
                <input
                  type="text"
                  value={profileForm.stageName}
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      stageName: e.target.value,
                    })
                  }
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Bio
                </label>
                <textarea
                  value={profileForm.bio}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, bio: e.target.value })
                  }
                  className="w-full h-32 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-rose-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
                  Social Links
                </label>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Instagram size={18} className="text-zinc-400" />
                    <input
                      type="text"
                      placeholder="Instagram URL"
                      value={profileForm.instagram}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          instagram: e.target.value,
                        })
                      }
                      className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-white"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Twitter size={18} className="text-zinc-400" />
                    <input
                      type="text"
                      placeholder="Twitter URL"
                      value={profileForm.twitter}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          twitter: e.target.value,
                        })
                      }
                      className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-white"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Youtube size={18} className="text-zinc-400" />
                    <input
                      type="text"
                      placeholder="YouTube URL"
                      value={profileForm.youtube}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          youtube: e.target.value,
                        })
                      }
                      className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* EARNINGS / MONEY */}
        {activeTab === "money" && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Earnings & Payouts
            </h2>

            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-lg">
              <p className="text-emerald-100 font-medium mb-1">
                Available Balance
              </p>
              <div className="flex items-end justify-between">
                <h3 className="text-5xl font-bold">45,250 ETB</h3>
                <Button
                  onClick={handleRequestPayout}
                  disabled={isRequestingPayout}
                  className="bg-white text-emerald-700 hover:bg-emerald-50 border-none shadow-none disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isRequestingPayout ? "Processing..." : "Request Payout"}
                </Button>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
                <h4 className="font-bold text-zinc-900 dark:text-white">
                  Payout History
                </h4>
              </div>
              <table className="w-full text-sm text-left">
                <thead className="bg-zinc-50 dark:bg-zinc-950 text-zinc-500 font-medium">
                  <tr>
                    <th className="p-4">Date</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Method</th>
                    <th className="p-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {MOCK_ANALYTICS.payoutHistory.map((tx) => (
                    <tr key={tx.id}>
                      <td className="p-4 text-zinc-900 dark:text-white">
                        {tx.date}
                      </td>
                      <td className="p-4 font-mono text-zinc-600 dark:text-zinc-300">
                        {tx.amount}
                      </td>
                      <td className="p-4 text-zinc-500">{tx.method}</td>
                      <td className="p-4 text-right">
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold ${
                            tx.status === "Paid"
                              ? "bg-emerald-100 text-emerald-600"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* COMMUNITY TAB */}
        {activeTab === "community" && (
          <div className="animate-in fade-in h-full">
            <Community />
          </div>
        )}
      </div>
    </div>
  );
};
