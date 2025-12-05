import React, { useState, useRef } from "react";
import {
  Check,
  X,
  Play,
  FileText,
  AlertTriangle,
  UserCheck,
  ShieldCheck,
  BadgeCheck,
  Search,
  Filter,
  MoreHorizontal,
  Edit3,
  Trash2,
  Eye,
  Flag,
  AlertOctagon,
  Lock,
  Unlock,
  RefreshCw,
  File,
  Gavel,
  Scale,
  History,
  MessageSquare,
  CornerDownRight,
  BarChart2,
  DollarSign,
  Settings as SettingsIcon,
  TrendingUp,
  Download,
  Upload,
  Percent,
  Plus,
  Save,
  ToggleLeft,
  ToggleRight,
  Sliders,
  Users,
  Briefcase,
  Megaphone,
  FileClock,
  Mail,
  Send,
  Bell,
  Server,
  HardDrive,
  Activity,
  Star,
  ListPlus,
  Key,
  Globe,
  FileWarning,
  Smartphone,
  Zap,
  ArrowLeft,
  GripVertical,
  CheckCircle,
} from "lucide-react";
import { Button } from "../components/Button";
import { MOCK_SONGS, MOCK_ARTISTS, MOCK_PLAYLISTS } from "../constants";
import { Song, UserRole, Playlist } from "../types";

// --- MOCK DATA ---

const MOCK_REPORTS = [
  {
    id: "r1",
    targetId: "3",
    targetType: "Song",
    targetName: "Gue",
    reason: "Copyright Infringement",
    reporter: "Sony Music",
    date: "Oct 24, 2023",
    status: "OPEN",
  },
  {
    id: "r2",
    targetId: "u5",
    targetType: "User",
    targetName: "AbusiveUser99",
    reason: "Harassment",
    reporter: "Helen B.",
    date: "Oct 23, 2023",
    status: "INVESTIGATING",
  },
  {
    id: "r3",
    targetId: "1",
    targetType: "Song",
    targetName: "Tizita",
    reason: "Audio Glitch/Broken",
    reporter: "Listener #42",
    date: "Oct 20, 2023",
    status: "RESOLVED",
  },
];

const MOCK_CLAIMS = [
  {
    id: "c1",
    claimant: "Universal Music Group",
    type: "DMCA Takedown",
    target: "Untitled Demo",
    date: "Oct 22, 2023",
    status: "PENDING",
    documents: ["claim_form.pdf", "ownership_proof.png"],
  },
  {
    id: "c2",
    claimant: "Independent Rights Org",
    type: "Ownership Dispute",
    target: "Addis Night",
    date: "Oct 15, 2023",
    status: "RESOLVED",
    documents: ["split_sheet.pdf"],
  },
];

const MOCK_USERS_ADMIN = [
  ...MOCK_ARTISTS.map((a) => ({
    id: a.id,
    name: a.name,
    email: `${a.name.replace(/\s/g, "").toLowerCase()}@zema.com`,
    role: UserRole.ARTIST,
    status: "ACTIVE",
    verified: a.verified,
  })),
  {
    id: "u1",
    name: "Selaham",
    email: "selaham@gmail.com",
    role: UserRole.LISTENER,
    status: "ACTIVE",
    verified: false,
  },
  {
    id: "u2",
    name: "Banned User",
    email: "spammer@fake.com",
    role: UserRole.LISTENER,
    status: "BANNED",
    verified: false,
  },
];

const MOCK_PAYOUTS = [
  {
    id: "p1",
    artist: "Aster Aweke",
    amount: "45,200 ETB",
    method: "CBE",
    date: "Oct 25, 2023",
    status: "PENDING",
  },
  {
    id: "p2",
    artist: "Teddy Afro",
    amount: "128,500 ETB",
    method: "Dashen Bank",
    date: "Oct 24, 2023",
    status: "APPROVED",
  },
  {
    id: "p3",
    artist: "New Artist",
    amount: "1,200 ETB",
    method: "Telebirr",
    date: "Oct 20, 2023",
    status: "REJECTED",
  },
];

const MOCK_STAFF = [
  {
    id: "s1",
    name: "Admin User",
    email: "admin@zema.com",
    role: "Super Admin",
    lastActive: "Now",
  },
  {
    id: "s2",
    name: "Content Mod",
    email: "mod@zema.com",
    role: "Moderator",
    lastActive: "2 hours ago",
  },
  {
    id: "s3",
    name: "Support Agent",
    email: "support@zema.com",
    role: "Support",
    lastActive: "1 day ago",
  },
];

const MOCK_LOGS = [
  {
    id: "l1",
    admin: "Admin User",
    action: "APPROVED_SONG",
    target: "Tizita",
    date: "Oct 25, 10:30 AM",
  },
  {
    id: "l2",
    admin: "Content Mod",
    action: "REJECTED_SONG",
    target: "Untitled Demo",
    date: "Oct 25, 09:15 AM",
  },
  {
    id: "l3",
    admin: "Admin User",
    action: "BANNED_USER",
    target: "Spammer123",
    date: "Oct 24, 04:00 PM",
  },
  {
    id: "l4",
    admin: "Support Agent",
    action: "RESOLVED_TICKET",
    target: "T-1024",
    date: "Oct 24, 02:30 PM",
  },
];

const MOCK_TICKETS = [
  {
    id: "t1",
    user: "Aster Aweke",
    subject: "Payout Issue",
    status: "OPEN",
    date: "2 hours ago",
  },
  {
    id: "t2",
    user: "Selaham",
    subject: "App Crashing",
    status: "CLOSED",
    date: "1 day ago",
  },
  {
    id: "t3",
    user: "New Artist",
    subject: "Verification Request",
    status: "PENDING",
    date: "3 days ago",
  },
];

const MOCK_ENCODING_QUEUE = [
  {
    id: "e1",
    title: "New Single - Master.wav",
    size: "45MB",
    status: "Processing",
    progress: 45,
  },
  {
    id: "e2",
    title: "Album Track 4.flac",
    size: "32MB",
    status: "Queued",
    progress: 0,
  },
  {
    id: "e3",
    title: "Corrupted File.mp3",
    size: "12MB",
    status: "Failed",
    progress: 0,
    error: "Header mismatch",
  },
];

const MOCK_BANNERS = [
  {
    id: "b1",
    title: "New Rophnan Album",
    active: true,
    image: "https://picsum.photos/400/200?random=21",
  },
  {
    id: "b2",
    title: "Ethiopian New Year Special",
    active: true,
    image: "https://picsum.photos/400/200?random=99",
  },
  {
    id: "b3",
    title: "Summer Hits Playlist",
    active: false,
    image: "https://picsum.photos/400/200?random=88",
  },
];

const MOCK_SESSIONS = [
  {
    id: "ses1",
    device: "Chrome on Mac OS",
    ip: "197.156.x.x",
    location: "Addis Ababa, ET",
    lastActive: "Current",
  },
  {
    id: "ses2",
    device: "Safari on iPhone",
    ip: "197.156.x.y",
    location: "Addis Ababa, ET",
    lastActive: "2 hours ago",
  },
];

// --- UTILS ---
const downloadCSV = (data: any[], filename: string) => {
  if (!data.length) {
    alert("No data to export");
    return;
  }
  const headers = Object.keys(data[0]).join(",");
  const rows = data
    .map((obj) =>
      Object.values(obj)
        .map((v) => `"${v}"`)
        .join(",")
    )
    .join("\n");
  const csvContent = "data:text/csv;charset=utf-8," + headers + "\n" + rows;
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// --- COMPONENTS ---

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    | "analytics"
    | "content"
    | "reports"
    | "legal"
    | "finance"
    | "users"
    | "staff"
    | "comms"
    | "logs"
    | "maintenance"
    | "marketing"
    | "security"
    | "settings"
  >("analytics");

  // Settings Sub-navigation State
  const [settingsSubTab, setSettingsSubTab] = useState<
    "main" | "genres" | "featured" | "sections"
  >("main");

  // Settings Content State
  const [adminGenres, setAdminGenres] = useState([
    "Traditional",
    "Ethio-Jazz",
    "Afrobeats",
    "Hip Hop",
    "Gospel",
    "Reggae",
    "Instrumental",
    "Amharic Pop",
    "Oromo Pop",
    "Tigrinya",
    "Somali",
    "Sudanese Fusion",
  ]);
  const [newGenreInput, setNewGenreInput] = useState("");

  const [adminFeaturedPlaylists, setAdminFeaturedPlaylists] = useState<
    Playlist[]
  >(MOCK_PLAYLISTS.slice(0, 2));

  const [homeSections, setHomeSections] = useState([
    { id: "greeting", label: "Greeting & Personalization", enabled: true },
    { id: "continue", label: "Continue Listening", enabled: true },
    { id: "mixes", label: "Daily Mixes", enabled: true },
    { id: "moods", label: "Mood Mixes", enabled: true },
    { id: "trending", label: "Trending", enabled: true },
    { id: "featured", label: "Featured Playlists", enabled: true },
  ]);

  // Content State
  const [contentList, setContentList] = useState<Song[]>([
    ...MOCK_SONGS,
    {
      id: "5",
      title: "New Submission",
      artist: "Unknown Artist",
      album: "Demo",
      coverUrl: "https://picsum.photos/200/200?random=5",
      duration: 180,
      genre: "Hip Hop",
      url: "#",
      status: "PENDING",
      lyrics: [],
    },
  ]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [editingItem, setEditingItem] = useState<Song | null>(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackNote, setFeedbackNote] = useState("");
  const [contentSearch, setContentSearch] = useState("");
  const [contentFilterStatus, setContentFilterStatus] = useState("PENDING");

  // Reports State
  const [reports, setReports] = useState(MOCK_REPORTS);
  const [reportFilter, setReportFilter] = useState("ALL");

  // Legal State
  const [claims, setClaims] = useState(MOCK_CLAIMS);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Users State
  const [users, setUsers] = useState<any[]>([]);
  const [userSearch, setUserSearch] = useState("");
  const [userFilter, setUserFilter] = useState("ALL");

  // Pending artist requests
  const [artistRequests, setArtistRequests] = useState<any[]>([]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await fetch("/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        console.warn("Failed to fetch admin users", data);
        return;
      }
      setUsers(data.users || []);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  const fetchArtistRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await fetch("/api/admin/artist-requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        console.warn("Failed to fetch artist requests", data);
        return;
      }
      setArtistRequests(data.requests || []);
    } catch (err) {
      console.error("Error fetching artist requests", err);
    }
  };

  React.useEffect(() => {
    fetchUsers();
    fetchArtistRequests();
  }, []);

  // Finance State
  const [payouts, setPayouts] = useState(MOCK_PAYOUTS);

  // Staff State
  const [staff, setStaff] = useState(MOCK_STAFF);

  // Comms State
  const [tickets, setTickets] = useState(MOCK_TICKETS);
  const [announcementText, setAnnouncementText] = useState("");
  const [announcementTarget, setAnnouncementTarget] = useState("All Users");

  // Maintenance State
  const [encodingQueue, setEncodingQueue] = useState(MOCK_ENCODING_QUEUE);

  // Marketing State
  const [banners, setBanners] = useState(MOCK_BANNERS);
  const [isAddingBanner, setIsAddingBanner] = useState(false);
  const [newBannerTitle, setNewBannerTitle] = useState("");

  const [editorsPicks, setEditorsPicks] = useState(MOCK_SONGS.slice(0, 3));
  const [isManagingPicks, setIsManagingPicks] = useState(false);

  const [platformPlaylists, setPlatformPlaylists] = useState(MOCK_PLAYLISTS);

  // Security State
  const [sessions, setSessions] = useState(MOCK_SESSIONS);
  const [securityConfig, setSecurityConfig] = useState({
    twoFactor: true,
    ipWhitelist: "",
  });

  // Settings State
  const [featureToggles, setFeatureToggles] = useState({
    offlineMode: true,
    artistUploads: true,
    highQualityAudio: true,
    publicSignup: true,
  });

  // --- HANDLERS ---

  // Settings Sub-Page Handlers
  const handleAddGenre = () => {
    if (newGenreInput.trim() && !adminGenres.includes(newGenreInput.trim())) {
      setAdminGenres((prev) => [...prev, newGenreInput.trim()]);
      setNewGenreInput("");
    }
  };

  const handleDeleteGenre = (genre: string) => {
    if (confirm(`Delete "${genre}" genre?`)) {
      setAdminGenres((prev) => prev.filter((g) => g !== genre));
    }
  };

  const handleToggleSection = (id: string) => {
    setHomeSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const handleRemoveFeatured = (id: string) => {
    setAdminFeaturedPlaylists((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddFeatured = () => {
    // Mock: Pick a playlist not currently featured
    const available = MOCK_PLAYLISTS.filter(
      (p) => !adminFeaturedPlaylists.find((fp) => fp.id === p.id)
    );
    if (available.length > 0) {
      setAdminFeaturedPlaylists((prev) => [...prev, available[0]]);
    } else {
      alert("All mock playlists are already featured.");
    }
  };

  // Content Actions
  const toggleSelection = (id: string) => {
    const next = new Set(selectedItems);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedItems(next);
  };

  const handleBatchAction = (action: "approve" | "reject") => {
    if (
      confirm(`Are you sure you want to ${action} ${selectedItems.size} items?`)
    ) {
      setContentList((prev) =>
        prev.map((s) => {
          if (selectedItems.has(s.id)) {
            return {
              ...s,
              status: action === "approve" ? "APPROVED" : "REJECTED",
            };
          }
          return s;
        })
      );
      setSelectedItems(new Set());
      alert(`Successfully ${action}ed selected items.`);
    }
  };

  const handleSingleContentAction = (
    id: string,
    action: "approve" | "reject"
  ) => {
    setContentList((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: action === "approve" ? "APPROVED" : "REJECTED" }
          : s
      )
    );
    if (editingItem?.id === id) setEditingItem(null);
    alert(`Song ${action}ed.`);
  };

  const handleReportAction = (
    id: string,
    action: "dismiss" | "takedown" | "disable"
  ) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: action === "dismiss" ? "RESOLVED" : "ACTION_TAKEN" }
          : r
      )
    );
    alert(`Report ${action}ed.`);
  };

  // User Actions
  const handleUserAction = (
    id: string,
    action: "ban" | "suspend" | "verify" | "reset_pw"
  ) => {
    if (action === "reset_pw") {
      alert("Password reset link sent to user's email.");
      return;
    }
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== id) return u;
        if (action === "ban") return { ...u, status: "BANNED" };
        if (action === "suspend") return { ...u, status: "SUSPENDED" };
        if (action === "verify") return { ...u, verified: true };
        return u;
      })
    );
  };

  // Promote user via backend (admin-only)
  const promoteUser = async (
    userEmailOrId: string,
    newRole: "ARTIST" | "ADMIN"
  ) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admin/promote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: userEmailOrId, role: newRole }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to promote user");
        return;
      }
      // Update local state
      setUsers((prev) =>
        prev.map((u) =>
          u.email === data.user.email || u.id === data.user.id
            ? { ...u, role: data.user.role }
            : u
        )
      );
      alert(`User ${data.user.email} promoted to ${data.user.role}`);
    } catch (err) {
      console.error(err);
      alert("Network error promoting user");
    }
  };

  // Approve a pending artist request
  const approveArtist = async (userId: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admin/artist-requests/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: userId }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to approve artist request");
        return;
      }
      // Remove from pending list and update users
      setArtistRequests((prev) => prev.filter((r) => r.id !== userId));
      setUsers((prev) =>
        prev.map((u) =>
          u.id === data.user.id ? { ...u, role: data.user.role } : u
        )
      );
      alert(`Approved ${data.user.email} as ARTIST`);
    } catch (err) {
      console.error(err);
      alert("Network error approving artist");
    }
  };

  const rejectArtist = async (userId: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admin/artist-requests/reject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: userId }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to reject artist request");
        return;
      }
      setArtistRequests((prev) => prev.filter((r) => r.id !== userId));
      alert(`Rejected artist request`);
    } catch (err) {
      console.error(err);
      alert("Network error rejecting artist");
    }
  };

  const handlePayout = (id: string, action: "approve" | "reject") => {
    setPayouts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: action === "approve" ? "APPROVED" : "REJECTED" }
          : p
      )
    );
  };

  const toggleFeature = (feature: keyof typeof featureToggles) => {
    setFeatureToggles((prev) => ({ ...prev, [feature]: !prev[feature] }));
  };

  const handleSendAnnouncement = () => {
    if (!announcementText.trim()) return;
    alert(`Announcement sent to ${announcementTarget}!`);
    setAnnouncementText("");
  };

  const handleReprocess = (id: string) => {
    setEncodingQueue((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: "Queued", error: undefined, progress: 0 }
          : item
      )
    );
    alert("Added to retry queue.");
  };

  const handleReprocessAll = () => {
    setEncodingQueue((prev) =>
      prev.map((item) =>
        item.status === "Failed"
          ? { ...item, status: "Queued", error: undefined, progress: 0 }
          : item
      )
    );
    alert("All failed items have been re-queued for processing.");
  };

  // Marketing Handlers
  const toggleBanner = (id: string) => {
    setBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, active: !b.active } : b))
    );
  };

  const deleteBanner = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Delete this banner?")) {
      setBanners((prev) => prev.filter((b) => b.id !== id));
    }
  };

  const editBanner = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const banner = banners.find((b) => b.id === id);
    const newTitle = prompt("Edit Banner Title", banner?.title);
    if (newTitle) {
      setBanners((prev) =>
        prev.map((b) => (b.id === id ? { ...b, title: newTitle } : b))
      );
    }
  };

  const handleAddBanner = () => {
    if (!newBannerTitle) return;
    setBanners((prev) => [
      {
        id: `b-${Date.now()}`,
        title: newBannerTitle,
        active: true,
        image: `https://picsum.photos/400/200?random=${Date.now()}`,
      },
      ...prev,
    ]);
    setIsAddingBanner(false);
    setNewBannerTitle("");
  };

  const handleAddPick = () => {
    const available = MOCK_SONGS.filter(
      (s) => !editorsPicks.find((p) => p.id === s.id)
    );
    if (available.length > 0) {
      setEditorsPicks((prev) => [...prev, available[0]]);
    } else {
      alert("No more unique songs available in mock data.");
    }
  };

  const removePick = (id: string) => {
    setEditorsPicks((prev) => prev.filter((s) => s.id !== id));
  };

  const handleCreatePlaylist = () => {
    const name = prompt("Enter Playlist Name:");
    if (name) {
      const newPlaylist = {
        id: `pl-${Date.now()}`,
        title: name,
        coverUrl: "https://picsum.photos/200?random=" + Date.now(),
        songCount: 0,
      };
      setPlatformPlaylists((prev) => [...prev, newPlaylist]);
    }
  };

  // Security Handlers
  const handleRevokeSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    alert("Session revoked.");
  };

  // Legal Handlers
  const handleLegalUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      alert(`Document "${e.target.files[0].name}" uploaded successfully.`);
    }
  };

  const handleClaimAction = (
    id: string,
    action: "contact" | "resolve",
    claimantName?: string
  ) => {
    if (action === "resolve") {
      setClaims((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: "RESOLVED" } : c))
      );
    } else {
      // Open default mail client properly
      const mailtoLink = `mailto:legal@zema.com?subject=Regarding Claim ${id}&body=Dear ${
        claimantName || "Claimant"
      },`;
      window.open(mailtoLink, "_self");
    }
  };

  const handleOpenFile = (fileName: string) => {
    // Simulate opening a file in a new tab with a dummy PDF
    window.open(
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      "_blank"
    );
  };

  // Computed data for Content
  const filteredContent = contentList.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(contentSearch.toLowerCase()) ||
      s.artist.toLowerCase().includes(contentSearch.toLowerCase());
    const matchesFilter =
      contentFilterStatus === "ALL"
        ? true
        : contentFilterStatus === "PENDING"
        ? s.status === "PENDING"
        : contentFilterStatus === "LIVE"
        ? s.status === "APPROVED"
        : s.status === "REJECTED";
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-screen-2xl mx-auto pb-12 px-4 md:px-8">
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <ShieldCheck
              size={32}
              className="text-rose-600 dark:text-rose-500"
            />
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
              Admin Console
            </h1>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400">
            Platform moderation, analytics, and management.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-x-auto max-w-full md:max-w-4xl scrollbar-hide">
          {[
            { id: "analytics", label: "Stats", icon: BarChart2 },
            { id: "content", label: "Content", icon: FileText },
            { id: "users", label: "Users", icon: Users },
            { id: "marketing", label: "Marketing", icon: Megaphone },
            { id: "finance", label: "Finance", icon: DollarSign },
            { id: "reports", label: "Reports", icon: Flag },
            { id: "legal", label: "Legal", icon: Scale },
            { id: "maintenance", label: "Maint.", icon: Server },
            { id: "security", label: "Security", icon: Lock },
            { id: "staff", label: "Staff", icon: ShieldCheck },
            { id: "comms", label: "Comms", icon: MessageSquare },
            { id: "logs", label: "Logs", icon: FileClock },
            { id: "settings", label: "Settings", icon: SettingsIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800/50"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {/* === ANALYTICS DASHBOARD === */}
        {activeTab === "analytics" && (
          <div className="space-y-8 animate-in fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* ... Stats Cards ... */}
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <p className="text-zinc-500 text-xs font-bold uppercase">
                  Daily Active Users
                </p>
                <div className="flex items-end justify-between mt-2">
                  <p className="text-3xl font-black text-zinc-900 dark:text-white">
                    12.5K
                  </p>
                  <TrendingUp className="text-emerald-500" />
                </div>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <p className="text-zinc-500 text-xs font-bold uppercase">
                  Total Streams
                </p>
                <div className="flex items-end justify-between mt-2">
                  <p className="text-3xl font-black text-zinc-900 dark:text-white">
                    1.2M
                  </p>
                  <Play className="text-blue-500" />
                </div>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <p className="text-zinc-500 text-xs font-bold uppercase">
                  Revenue (30d)
                </p>
                <div className="flex items-end justify-between mt-2">
                  <p className="text-3xl font-black text-zinc-900 dark:text-white">
                    450K
                  </p>
                  <DollarSign className="text-yellow-500" />
                </div>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <p className="text-zinc-500 text-xs font-bold uppercase">
                  New Uploads
                </p>
                <div className="flex items-end justify-between mt-2">
                  <p className="text-3xl font-black text-zinc-900 dark:text-white">
                    85
                  </p>
                  <Upload className="text-rose-500" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 h-80 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-bold text-zinc-900 dark:text-white">
                      Growth (New Users)
                    </h3>
                    <p className="text-zinc-500 text-xs mt-1">Last 7 days</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-zinc-900 dark:text-white">
                      340
                    </p>
                    <span className="text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded">
                      +12%
                    </span>
                  </div>
                </div>
                <div className="flex-1 flex items-end justify-between gap-2 pb-2">
                  {[30, 45, 35, 55, 60, 75, 80].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 h-full bg-rose-100 dark:bg-rose-900/20 rounded-t-lg relative group"
                    >
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-rose-500 rounded-t-lg transition-all hover:bg-rose-600"
                        style={{ height: `${h}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                          {Math.floor(h * 3.4)} Users
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-zinc-400 font-medium uppercase tracking-wider">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 h-80 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-bold text-zinc-900 dark:text-white">
                      Platform Revenue
                    </h3>
                    <p className="text-zinc-500 text-xs mt-1">Last 7 days</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-zinc-900 dark:text-white">
                      45.2K
                    </p>
                    <span className="text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded">
                      +5%
                    </span>
                  </div>
                </div>
                <div className="flex-1 flex items-end justify-between gap-2 pb-2">
                  {[20, 25, 40, 30, 45, 50, 65].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 h-full bg-emerald-100 dark:bg-emerald-900/20 rounded-t-lg relative group"
                    >
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-emerald-500 rounded-t-lg transition-all hover:bg-emerald-600"
                        style={{ height: `${h}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                          {h * 100} ETB
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-zinc-400 font-medium uppercase tracking-wider">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTENT MODERATION */}
        {activeTab === "content" && (
          <div className="space-y-4 animate-in fade-in">
            {/* Advanced Filter Bar */}
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search Title, Artist or ISRC..."
                    value={contentSearch}
                    onChange={(e) => setContentSearch(e.target.value)}
                    className="w-full bg-zinc-100 dark:bg-zinc-950 border-none rounded-lg py-2 pl-9 pr-4 text-sm focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <select
                  value={contentFilterStatus}
                  onChange={(e) => setContentFilterStatus(e.target.value)}
                  className="bg-zinc-100 dark:bg-zinc-950 rounded-lg px-3 py-2 text-sm border-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="ALL">All Status</option>
                  <option value="PENDING">Pending</option>
                  <option value="LIVE">Live</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleBatchAction("reject")}
                  disabled={selectedItems.size === 0}
                  className="text-red-500"
                >
                  Reject ({selectedItems.size})
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleBatchAction("approve")}
                  disabled={selectedItems.size === 0}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white border-none"
                >
                  Approve ({selectedItems.size})
                </Button>
              </div>
            </div>

            {/* Pending Artist Requests */}
            {artistRequests.length > 0 && (
              <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 mb-4">
                <h3 className="font-bold text-zinc-900 dark:text-white mb-2">
                  Pending Artist Requests
                </h3>
                <div className="space-y-2">
                  {artistRequests.map((r) => (
                    <div
                      key={r.id}
                      className="flex items-center justify-between p-2 rounded hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
                    >
                      <div>
                        <div className="font-bold">
                          {r.name} {r.stageName ? `(${r.stageName})` : ""}
                        </div>
                        <div className="text-xs text-zinc-500">{r.email}</div>
                        {r.pendingArtistInfo &&
                          r.pendingArtistInfo.primaryGenre && (
                            <div className="text-xs text-zinc-500">
                              Genre: {r.pendingArtistInfo.primaryGenre}
                            </div>
                          )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => approveArtist(r.id)}
                          className="bg-emerald-50 text-emerald-600"
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => rejectArtist(r.id)}
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-zinc-50 dark:bg-zinc-950 text-zinc-500 font-medium border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="p-4 w-10"></th>
                    <th className="p-4">Track</th>
                    <th className="p-4 hidden sm:table-cell">Metadata</th>
                    <th className="p-4 hidden md:table-cell">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {filteredContent.map((song) => (
                    <tr
                      key={song.id}
                      className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                    >
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedItems.has(song.id)}
                          onChange={() => toggleSelection(song.id)}
                          className="rounded border-zinc-300 text-rose-600 focus:ring-rose-500"
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-zinc-200 dark:bg-zinc-800 rounded overflow-hidden">
                            <img
                              src={song.coverUrl}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p
                              className="font-bold text-zinc-900 dark:text-white cursor-pointer hover:underline"
                              onClick={() => setEditingItem(song)}
                            >
                              {song.title}
                            </p>
                            <p className="text-xs text-zinc-500">
                              {song.artist}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 hidden sm:table-cell">
                        <div className="flex flex-col gap-1 text-xs text-zinc-500">
                          <span>{song.genre}</span>
                          <span>
                            {song.lyrics?.length
                              ? `${song.lyrics.length} lines`
                              : "No lyrics"}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold ${
                            song.status === "APPROVED"
                              ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-500"
                              : song.status === "REJECTED"
                              ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-500"
                              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500"
                          }`}
                        >
                          {song.status === "APPROVED"
                            ? "Live"
                            : song.status === "REJECTED"
                            ? "Rejected"
                            : "Pending Review"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => setEditingItem(song)}
                        >
                          Review
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {filteredContent.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-zinc-500">
                        No songs found for this filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* USER MANAGEMENT */}
        {activeTab === "users" && (
          <div className="space-y-4 animate-in fade-in">
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search Name, Email or ID..."
                    className="w-full bg-zinc-100 dark:bg-zinc-950 border-none rounded-lg py-2 pl-9 pr-4 text-sm focus:ring-2 focus:ring-rose-500"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                  />
                </div>
                <select
                  value={userFilter}
                  onChange={(e) => setUserFilter(e.target.value)}
                  className="bg-zinc-100 dark:bg-zinc-950 rounded-lg px-3 py-2 text-sm border-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="ALL">All Roles</option>
                  <option value="ARTIST">Artists</option>
                  <option value="LISTENER">Listeners</option>
                  <option value="BANNED">Banned</option>
                </select>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => downloadCSV(users, "users_export.csv")}
              >
                <Download size={14} className="mr-2" /> Export CSV
              </Button>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-zinc-50 dark:bg-zinc-950 text-zinc-500 font-medium border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="p-4">User</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {users
                    .filter((u) => {
                      const matchesSearch =
                        u.name
                          .toLowerCase()
                          .includes(userSearch.toLowerCase()) ||
                        u.email
                          .toLowerCase()
                          .includes(userSearch.toLowerCase());
                      const matchesFilter =
                        userFilter === "ALL" ||
                        (userFilter === "BANNED"
                          ? u.status === "BANNED"
                          : u.role === userFilter);
                      return matchesSearch && matchesFilter;
                    })
                    .map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                      >
                        <td className="p-4">
                          <div className="font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                            {user.name}
                            {user.verified && (
                              <BadgeCheck size={14} className="text-blue-500" />
                            )}
                          </div>
                          <div className="text-xs text-zinc-500">
                            {user.email}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-xs font-medium uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-bold ${
                              user.status === "ACTIVE"
                                ? "bg-emerald-100 text-emerald-600"
                                : user.status === "BANNED"
                                ? "bg-red-100 text-red-600"
                                : "bg-yellow-100 text-yellow-600"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2 group relative">
                            <Button
                              size="sm"
                              variant="secondary"
                              className="h-8 w-8 p-0 flex items-center justify-center"
                            >
                              <MoreHorizontal size={16} />
                            </Button>

                            <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl z-10 hidden group-hover:block p-1">
                              <button
                                onClick={() =>
                                  handleUserAction(user.id, "reset_pw")
                                }
                                className="w-full text-left px-3 py-2 text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded flex items-center gap-2"
                              >
                                <RefreshCw size={12} /> Reset Password
                              </button>
                              {user.status !== "BANNED" && (
                                <button
                                  onClick={() =>
                                    handleUserAction(user.id, "ban")
                                  }
                                  className="w-full text-left px-3 py-2 text-xs hover:bg-red-50 text-red-600 rounded flex items-center gap-2"
                                >
                                  <AlertOctagon size={12} /> Ban User
                                </button>
                              )}
                              {user.status === "BANNED" && (
                                <button
                                  onClick={() =>
                                    handleUserAction(user.id, "suspend")
                                  }
                                  className="w-full text-left px-3 py-2 text-xs hover:bg-zinc-100 rounded flex items-center gap-2"
                                >
                                  <Unlock size={12} /> Unban
                                </button>
                              )}
                              {!user.verified &&
                                user.role === UserRole.ARTIST && (
                                  <button
                                    onClick={() =>
                                      handleUserAction(user.id, "verify")
                                    }
                                    className="w-full text-left px-3 py-2 text-xs hover:bg-blue-50 text-blue-600 rounded flex items-center gap-2"
                                  >
                                    <BadgeCheck size={12} /> Verify Artist
                                  </button>
                                )}
                              {user.role !== UserRole.ARTIST && (
                                <button
                                  onClick={() =>
                                    promoteUser(user.email, "ARTIST")
                                  }
                                  className="w-full text-left px-3 py-2 text-xs hover:bg-emerald-50 text-emerald-600 rounded flex items-center gap-2"
                                >
                                  <UserCheck size={12} /> Promote to Artist
                                </button>
                              )}
                              {user.role !== UserRole.ADMIN && (
                                <button
                                  onClick={() =>
                                    promoteUser(user.email, "ADMIN")
                                  }
                                  className="w-full text-left px-3 py-2 text-xs hover:bg-blue-50 text-blue-600 rounded flex items-center gap-2"
                                >
                                  <ShieldCheck size={12} /> Promote to Admin
                                </button>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* STAFF MANAGEMENT */}
        {activeTab === "staff" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex justify-between items-center bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                  Staff & Moderators
                </h2>
                <p className="text-zinc-500 text-sm">
                  Manage access to the admin dashboard.
                </p>
              </div>
              <Button className="gap-2">
                <Plus size={16} /> Add Staff
              </Button>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-zinc-50 dark:bg-zinc-950 text-zinc-500 font-medium border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Last Active</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {staff.map((s) => (
                    <tr
                      key={s.id}
                      className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                    >
                      <td className="p-4">
                        <div className="font-bold text-zinc-900 dark:text-white">
                          {s.name}
                        </div>
                        <div className="text-xs text-zinc-500">{s.email}</div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold ${
                            s.role === "Super Admin"
                              ? "bg-purple-100 text-purple-600"
                              : s.role === "Moderator"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-zinc-100 text-zinc-600"
                          }`}
                        >
                          {s.role}
                        </span>
                      </td>
                      <td className="p-4 text-zinc-500">{s.lastActive}</td>
                      <td className="p-4 text-right">
                        <button className="text-zinc-400 hover:text-red-500 transition-colors p-2">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MAINTENANCE */}
        {activeTab === "maintenance" && (
          <div className="space-y-8 animate-in fade-in">
            {/* Storage Usage */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <h4 className="font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
                  <HardDrive size={18} /> CDN Storage
                </h4>
                <div className="flex items-end justify-between mb-2">
                  <span className="text-2xl font-black">450 GB</span>
                  <span className="text-sm text-zinc-500">/ 1 TB</span>
                </div>
                <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: "45%" }}
                  ></div>
                </div>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <h4 className="font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
                  <Server size={18} /> Audio Files
                </h4>
                <div className="flex items-end justify-between mb-2">
                  <span className="text-2xl font-black">1.2 TB</span>
                  <span className="text-sm text-zinc-500">/ 5 TB</span>
                </div>
                <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rose-500"
                    style={{ width: "24%" }}
                  ></div>
                </div>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <h4 className="font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
                  <Activity size={18} /> API Requests
                </h4>
                <div className="flex items-end justify-between mb-2">
                  <span className="text-2xl font-black">8.5 M</span>
                  <span className="text-sm text-zinc-500">/ Month</span>
                </div>
                <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500"
                    style={{ width: "65%" }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Encoding Queue */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <h3 className="font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <RefreshCw size={18} className="text-zinc-500" /> Encoding
                  Queue
                </h3>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleReprocessAll}
                >
                  Reprocess Failed
                </Button>
              </div>
              <table className="w-full text-sm text-left">
                <thead className="bg-zinc-50 dark:bg-zinc-950 text-zinc-500 font-medium">
                  <tr>
                    <th className="p-4">File</th>
                    <th className="p-4">Size</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Progress</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {encodingQueue.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                    >
                      <td className="p-4 font-medium text-zinc-900 dark:text-white">
                        {item.title}
                        {item.error && (
                          <p className="text-xs text-red-500 mt-1">
                            {item.error}
                          </p>
                        )}
                      </td>
                      <td className="p-4 text-zinc-500 font-mono">
                        {item.size}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold ${
                            item.status === "Processing"
                              ? "bg-blue-100 text-blue-600"
                              : item.status === "Failed"
                              ? "bg-red-100 text-red-600"
                              : "bg-zinc-100 text-zinc-600"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4 w-32">
                        {item.status === "Processing" ? (
                          <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500"
                              style={{ width: `${item.progress}%` }}
                            ></div>
                          </div>
                        ) : (
                          <span className="text-zinc-400">-</span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        {item.status === "Failed" && (
                          <button
                            onClick={() => handleReprocess(item.id)}
                            className="text-blue-500 hover:underline text-xs font-bold"
                          >
                            Retry
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* === MARKETING TOOLS === */}
        {activeTab === "marketing" && (
          <div className="space-y-8 animate-in fade-in">
            {/* Banners */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Megaphone size={20} className="text-rose-500" /> Promotional
                  Banners
                </h3>
                <Button
                  size="sm"
                  className="gap-2"
                  onClick={() => setIsAddingBanner(!isAddingBanner)}
                >
                  {isAddingBanner ? <X size={16} /> : <Plus size={16} />}
                  {isAddingBanner ? "Cancel" : "Add Banner"}
                </Button>
              </div>

              {isAddingBanner && (
                <div className="mb-6 bg-zinc-100 dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex gap-4 items-center animate-in slide-in-from-top-2">
                  <input
                    type="text"
                    value={newBannerTitle}
                    onChange={(e) => setNewBannerTitle(e.target.value)}
                    placeholder="Enter banner title..."
                    className="flex-1 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-rose-500"
                  />
                  <Button size="sm" onClick={handleAddBanner}>
                    Create
                  </Button>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {banners.map((banner) => (
                  <div
                    key={banner.id}
                    className="group relative bg-zinc-100 dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800"
                  >
                    <div className="aspect-[2/1] relative">
                      <img
                        src={banner.image}
                        className={`w-full h-full object-cover transition-opacity ${
                          banner.active ? "opacity-100" : "opacity-50 grayscale"
                        }`}
                      />
                      {/* Buttons always visible for functionality, z-index ensures clickable */}
                      <div className="absolute top-2 right-2 flex gap-2 z-20">
                        <button
                          onClick={(e) => editBanner(banner.id, e)}
                          className="p-2 bg-white/90 rounded-full text-black shadow-lg hover:bg-white transition-colors"
                          title="Edit Title"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={(e) => deleteBanner(banner.id, e)}
                          className="p-2 bg-white/90 rounded-full text-red-600 shadow-lg hover:bg-red-50 transition-colors"
                          title="Delete Banner"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <span className="font-bold text-sm text-zinc-900 dark:text-white truncate pr-2">
                        {banner.title}
                      </span>
                      <button
                        onClick={() => toggleBanner(banner.id)}
                        className={`w-10 h-5 shrink-0 rounded-full p-0.5 transition-colors ${
                          banner.active
                            ? "bg-emerald-500"
                            : "bg-zinc-300 dark:bg-zinc-700"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
                            banner.active ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Curation Tools */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <Star size={18} className="text-yellow-500" /> Editor's
                    Picks
                  </h3>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setIsManagingPicks(!isManagingPicks)}
                  >
                    {isManagingPicks ? "Save" : "Manage"}
                  </Button>
                </div>
                <div className="space-y-3">
                  {editorsPicks.map((song, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-2 bg-zinc-50 dark:bg-zinc-950/50 rounded-lg"
                    >
                      <span className="text-zinc-400 font-mono text-xs w-4">
                        {i + 1}
                      </span>
                      <img src={song.coverUrl} className="w-8 h-8 rounded" />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm truncate text-zinc-900 dark:text-white">
                          {song.title}
                        </p>
                        <p className="text-xs text-zinc-500 truncate">
                          {song.artist}
                        </p>
                      </div>
                      {isManagingPicks && (
                        <button
                          onClick={() => removePick(song.id)}
                          className="text-zinc-400 hover:text-red-500 p-1"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                  {isManagingPicks && (
                    <button
                      onClick={handleAddPick}
                      className="w-full py-2 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-400 hover:border-zinc-400 hover:text-zinc-500 transition-colors text-xs font-medium"
                    >
                      + Add Pick
                    </button>
                  )}
                </div>
              </section>

              <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <ListPlus size={18} className="text-blue-500" /> Platform
                    Playlists
                  </h3>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={handleCreatePlaylist}
                  >
                    <Plus size={14} /> Create
                  </Button>
                </div>
                <div className="space-y-3">
                  {platformPlaylists.map((pl, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-2 bg-zinc-50 dark:bg-zinc-950/50 rounded-lg group cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <img src={pl.coverUrl} className="w-8 h-8 rounded" />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm truncate text-zinc-900 dark:text-white">
                          {pl.title}
                        </p>
                        <p className="text-xs text-zinc-500 truncate">
                          {pl.songCount} Songs
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="opacity-0 group-hover:opacity-100 h-6 text-xs px-2"
                      >
                        Edit
                      </Button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}

        {/* === SECURITY & COMPLIANCE === */}
        {activeTab === "security" && (
          <div className="space-y-8 animate-in fade-in">
            {/* Access Control */}
            <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
              <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                <Key size={18} className="text-emerald-500" /> Access Control
              </h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-white">
                      Two-Factor Authentication
                    </p>
                    <p className="text-xs text-zinc-500">
                      Require 2FA for all admin accounts.
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setSecurityConfig({
                        ...securityConfig,
                        twoFactor: !securityConfig.twoFactor,
                      })
                    }
                    className={`w-11 h-6 rounded-full transition-colors relative ${
                      securityConfig.twoFactor
                        ? "bg-emerald-500"
                        : "bg-zinc-300 dark:bg-zinc-700"
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow transition-transform ${
                        securityConfig.twoFactor
                          ? "translate-x-5"
                          : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <div>
                  <p className="font-medium text-zinc-900 dark:text-white mb-2">
                    IP Whitelist
                  </p>
                  <p className="text-xs text-zinc-500 mb-3">
                    Only allow admin access from these IP addresses (one per
                    line).
                  </p>
                  <textarea
                    className="w-full h-24 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-sm font-mono focus:ring-2 focus:ring-rose-500 outline-none resize-none"
                    placeholder="192.168.1.1&#10;10.0.0.1"
                    value={securityConfig.ipWhitelist}
                    onChange={(e) =>
                      setSecurityConfig({
                        ...securityConfig,
                        ipWhitelist: e.target.value,
                      })
                    }
                  />
                  <div className="flex justify-end mt-2">
                    <Button
                      size="sm"
                      onClick={() => alert("IP Whitelist Saved")}
                    >
                      Save IP Rules
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Session Management */}
            <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50">
                <h3 className="font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Globe size={18} className="text-blue-500" /> Active Sessions
                </h3>
              </div>
              <table className="w-full text-sm text-left">
                <thead className="bg-zinc-50 dark:bg-zinc-950 text-zinc-500 font-medium border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="p-4">Device</th>
                    <th className="p-4">IP Address</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Last Active</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {sessions.map((session) => (
                    <tr
                      key={session.id}
                      className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                    >
                      <td className="p-4 font-medium text-zinc-900 dark:text-white flex items-center gap-2">
                        <Smartphone size={16} className="text-zinc-400" />{" "}
                        {session.device}
                      </td>
                      <td className="p-4 text-zinc-500 font-mono">
                        {session.ip}
                      </td>
                      <td className="p-4 text-zinc-500">{session.location}</td>
                      <td className="p-4">
                        {session.lastActive === "Current" ? (
                          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded">
                            Current
                          </span>
                        ) : (
                          <span className="text-zinc-500">
                            {session.lastActive}
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        {session.lastActive !== "Current" && (
                          <button
                            onClick={() => handleRevokeSession(session.id)}
                            className="text-red-500 hover:underline text-xs font-bold"
                          >
                            Revoke
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* GDPR Tools */}
            <section className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl p-6">
              <h3 className="font-bold text-lg text-red-900 dark:text-red-100 mb-4 flex items-center gap-2">
                <FileWarning size={18} /> GDPR & Compliance
              </h3>
              <div className="flex gap-4">
                <Button
                  variant="secondary"
                  onClick={() => alert("Downloading user data dump...")}
                  className="border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/20"
                >
                  Export All User Data
                </Button>
                <Button
                  variant="secondary"
                  onClick={() =>
                    alert("Processing pending deletion requests...")
                  }
                  className="border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/20"
                >
                  Process Deletion Requests (0)
                </Button>
              </div>
            </section>
          </div>
        )}

        {/* === COMMUNICATION TOOLS === */}
        {activeTab === "comms" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in">
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-4 h-fit">
              <h3 className="font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Megaphone size={18} className="text-rose-500" /> Announcements
              </h3>
              <div>
                <label className="block text-xs font-bold text-zinc-500 mb-1">
                  Target Audience
                </label>
                <select
                  value={announcementTarget}
                  onChange={(e) => setAnnouncementTarget(e.target.value)}
                  className="w-full bg-zinc-100 dark:bg-zinc-950 border-none rounded-lg px-3 py-2 text-sm mb-3"
                >
                  <option>All Users</option>
                  <option>All Artists</option>
                  <option>Listeners Only</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 mb-1">
                  Message
                </label>
                <textarea
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  className="w-full h-32 bg-zinc-100 dark:bg-zinc-950 border-none rounded-lg p-3 text-sm resize-none focus:ring-2 focus:ring-rose-500"
                  placeholder="Write your announcement here..."
                ></textarea>
              </div>
              <Button onClick={handleSendAnnouncement} className="w-full gap-2">
                <Send size={16} /> Send Broadcast
              </Button>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 h-fit">
              <h3 className="font-bold text-zinc-900 dark:text-white flex items-center gap-2 mb-4">
                <Mail size={18} className="text-blue-500" /> Support Tickets
              </h3>
              <div className="space-y-2">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="p-3 bg-zinc-50 dark:bg-zinc-950/50 rounded-lg border border-zinc-200 dark:border-zinc-800 flex justify-between items-center group cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <div>
                      <p className="font-bold text-zinc-900 dark:text-white text-sm">
                        {ticket.subject}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {ticket.user} • {ticket.date}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        ticket.status === "OPEN"
                          ? "bg-red-100 text-red-600"
                          : ticket.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-zinc-200 text-zinc-600"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                className="w-full mt-4 text-sm text-zinc-500"
              >
                View All Tickets
              </Button>
            </div>
          </div>
        )}

        {/* === ACTIVITY LOGS === */}
        {activeTab === "logs" && (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                Audit Logs
              </h2>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => downloadCSV(MOCK_LOGS, "logs_export.csv")}
              >
                <Download size={14} className="mr-2" /> Export CSV
              </Button>
            </div>
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-zinc-50 dark:bg-zinc-950 text-zinc-500 font-medium border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="p-4">Timestamp</th>
                    <th className="p-4">Admin</th>
                    <th className="p-4">Action</th>
                    <th className="p-4">Target</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {MOCK_LOGS.map((log) => (
                    <tr
                      key={log.id}
                      className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                    >
                      <td className="p-4 text-zinc-500 font-mono text-xs">
                        {log.date}
                      </td>
                      <td className="p-4 font-medium text-zinc-900 dark:text-white">
                        {log.admin}
                      </td>
                      <td className="p-4">
                        <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-xs font-bold">
                          {log.action}
                        </span>
                      </td>
                      <td className="p-4 text-zinc-600 dark:text-zinc-300">
                        {log.target}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* === REPORTED CONTENT === */}
        {activeTab === "reports" && (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              {["ALL", "OPEN", "RESOLVED", "INVESTIGATING"].map((status) => (
                <button
                  key={status}
                  onClick={() => setReportFilter(status)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                    reportFilter === status
                      ? "bg-zinc-900 dark:bg-white text-white dark:text-black border-zinc-900 dark:border-white"
                      : "border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-zinc-50 dark:bg-zinc-950 text-zinc-500 font-medium border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="p-4">Target</th>
                    <th className="p-4">Reason</th>
                    <th className="p-4 hidden sm:table-cell">Reporter</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {reports
                    .filter(
                      (r) => reportFilter === "ALL" || r.status === reportFilter
                    )
                    .map((report) => (
                      <tr
                        key={report.id}
                        className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                report.targetType === "User"
                                  ? "bg-purple-100 text-purple-600"
                                  : "bg-blue-100 text-blue-600"
                              }`}
                            >
                              {report.targetType}
                            </span>
                            <span className="font-medium text-zinc-900 dark:text-white">
                              {report.targetName}
                            </span>
                          </div>
                          <div className="text-xs text-zinc-500 mt-1">
                            ID: {report.targetId}
                          </div>
                        </td>
                        <td className="p-4 text-zinc-600 dark:text-zinc-300 font-medium">
                          {report.reason}
                        </td>
                        <td className="p-4 hidden sm:table-cell text-zinc-500">
                          {report.reporter}
                          <br />
                          <span className="text-[10px]">{report.date}</span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-bold ${
                              report.status === "OPEN"
                                ? "bg-red-100 text-red-600"
                                : report.status === "RESOLVED"
                                ? "bg-emerald-100 text-emerald-600"
                                : "bg-yellow-100 text-yellow-600"
                            }`}
                          >
                            {report.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            {report.status !== "RESOLVED" && (
                              <>
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  onClick={() =>
                                    handleReportAction(report.id, "dismiss")
                                  }
                                >
                                  Dismiss
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-red-600 hover:bg-red-700 border-none text-white"
                                  onClick={() =>
                                    handleReportAction(report.id, "takedown")
                                  }
                                >
                                  Takedown
                                </Button>
                              </>
                            )}
                            {report.status === "RESOLVED" && (
                              <span className="text-zinc-400 text-xs italic">
                                Archived
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* === FINANCE === */}
        {activeTab === "finance" && (
          <div className="space-y-8 animate-in fade-in">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-zinc-900 dark:text-white">
                  Revenue Split Configuration
                </h3>
                <span className="text-sm font-bold text-rose-500">
                  Auto-Save On
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>Platform Share</span>
                  <span>Artist Share</span>
                </div>
                <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden flex">
                  <div className="h-full bg-zinc-800 dark:bg-white w-[30%]"></div>
                  <div className="h-full bg-rose-500 w-[70%]"></div>
                </div>
                <div className="flex justify-between text-xs text-zinc-500">
                  <span>30%</span>
                  <span>70%</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
                <h3 className="font-bold text-zinc-900 dark:text-white">
                  Payout Requests
                </h3>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => downloadCSV(payouts, "payouts_export.csv")}
                >
                  Export CSV
                </Button>
              </div>
              <table className="w-full text-sm text-left">
                <thead className="bg-zinc-50 dark:bg-zinc-950 text-zinc-500 font-medium">
                  <tr>
                    <th className="p-4">Artist</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Method</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {payouts.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                    >
                      <td className="p-4 font-bold text-zinc-900 dark:text-white">
                        {p.artist}
                      </td>
                      <td className="p-4 font-mono">{p.amount}</td>
                      <td className="p-4 text-zinc-500">{p.method}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold ${
                            p.status === "APPROVED"
                              ? "bg-emerald-100 text-emerald-600"
                              : p.status === "REJECTED"
                              ? "bg-red-100 text-red-600"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {p.status === "PENDING" && (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handlePayout(p.id, "reject")}
                              className="text-red-500 hover:underline text-xs font-bold"
                            >
                              Reject
                            </button>
                            <button
                              onClick={() => handlePayout(p.id, "approve")}
                              className="text-emerald-500 hover:underline text-xs font-bold"
                            >
                              Approve
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* === LEGAL TOOLS === */}
        {activeTab === "legal" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Document Upload Widget */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="bg-zinc-100 dark:bg-zinc-900/50 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                <FileText size={32} className="text-zinc-400 mb-2" />
                <h3 className="font-bold text-zinc-700 dark:text-zinc-300">
                  Upload Legal Document
                </h3>
                <p className="text-xs text-zinc-500">
                  Drag & drop contracts or court orders here.
                </p>
                <input
                  type="file"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleLegalUpload}
                />
              </div>

              <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
                <h3 className="font-bold text-zinc-900 dark:text-white mb-2">
                  DMCA Summary
                </h3>
                <div className="flex gap-4 text-sm">
                  <div>
                    <p className="text-zinc-500">Active Claims</p>
                    <p className="text-2xl font-black text-zinc-900 dark:text-white">
                      1
                    </p>
                  </div>
                  <div>
                    <p className="text-zinc-500">Takedowns (30d)</p>
                    <p className="text-2xl font-black text-zinc-900 dark:text-white">
                      4
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50">
                <h3 className="font-bold text-zinc-900 dark:text-white">
                  Claims Management
                </h3>
              </div>
              <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {claims.map((claim) => (
                  <div
                    key={claim.id}
                    className="p-4 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-zinc-900 dark:text-white">
                          {claim.target}
                        </span>
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded font-bold">
                          {claim.type}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Claimant: {claim.claimant} • {claim.date}
                      </p>
                      <div className="flex gap-2 mt-2">
                        {claim.documents.map((doc, i) => (
                          <span
                            key={i}
                            onClick={() => handleOpenFile(doc)}
                            className="flex items-center gap-1 text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-blue-600 dark:text-blue-400 cursor-pointer hover:underline"
                          >
                            <File size={12} /> {doc}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {claim.status === "PENDING" ? (
                        <>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() =>
                              handleClaimAction(
                                claim.id,
                                "contact",
                                claim.claimant
                              )
                            }
                          >
                            Contact
                          </Button>
                          <Button
                            size="sm"
                            className="bg-red-600 hover:bg-red-700 text-white border-none"
                            onClick={() =>
                              handleClaimAction(claim.id, "resolve")
                            }
                          >
                            Resolve
                          </Button>
                        </>
                      ) : (
                        <span className="text-sm font-bold text-emerald-600 flex items-center gap-1">
                          <Check size={16} /> Resolved
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* === SYSTEM SETTINGS === */}
        {activeTab === "settings" && (
          <div className="animate-in fade-in">
            {/* Sub-Page Header */}
            {settingsSubTab !== "main" && (
              <div className="mb-6">
                <button
                  onClick={() => setSettingsSubTab("main")}
                  className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white mb-2 transition-colors"
                >
                  <ArrowLeft size={16} /> Back to Settings
                </button>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  {settingsSubTab === "genres" && "Genre Management"}
                  {settingsSubTab === "featured" && "Featured Playlists"}
                  {settingsSubTab === "sections" && "Homepage Sections"}
                </h2>
              </div>
            )}

            {/* Main Settings List */}
            {settingsSubTab === "main" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="font-bold text-zinc-900 dark:text-white">
                    Platform Features
                  </h3>
                  <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-800">
                    {Object.entries(featureToggles).map(([key, value]) => (
                      <div
                        key={key}
                        className="p-4 flex items-center justify-between"
                      >
                        <span className="text-sm font-medium capitalize text-zinc-900 dark:text-white">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                        <button
                          onClick={() => toggleFeature(key as any)}
                          className={`text-zinc-400 ${
                            value ? "text-emerald-500" : ""
                          }`}
                        >
                          {value ? (
                            <ToggleRight size={32} fill="currentColor" />
                          ) : (
                            <ToggleLeft size={32} />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-bold text-zinc-900 dark:text-white">
                    Content Management
                  </h3>
                  <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 space-y-4">
                    <Button
                      variant="secondary"
                      className="w-full justify-between"
                      onClick={() => setSettingsSubTab("genres")}
                    >
                      Manage Genres <SettingsIcon size={16} />
                    </Button>
                    <Button
                      variant="secondary"
                      className="w-full justify-between"
                      onClick={() => setSettingsSubTab("featured")}
                    >
                      Featured Playlists <SettingsIcon size={16} />
                    </Button>
                    <Button
                      variant="secondary"
                      className="w-full justify-between"
                      onClick={() => setSettingsSubTab("sections")}
                    >
                      Homepage Sections <SettingsIcon size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Genre Manager */}
            {settingsSubTab === "genres" && (
              <div className="max-w-2xl">
                <div className="flex gap-2 mb-6">
                  <input
                    type="text"
                    placeholder="Add new genre..."
                    value={newGenreInput}
                    onChange={(e) => setNewGenreInput(e.target.value)}
                    className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  <Button
                    onClick={handleAddGenre}
                    disabled={!newGenreInput.trim()}
                  >
                    <Plus size={16} className="mr-2" /> Add Genre
                  </Button>
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                  {adminGenres.map((genre, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border-b border-zinc-100 dark:border-zinc-800 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                    >
                      <span className="text-zinc-900 dark:text-white font-medium">
                        {genre}
                      </span>
                      <button
                        onClick={() => handleDeleteGenre(genre)}
                        className="text-zinc-400 hover:text-red-500 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Featured Playlists Manager */}
            {settingsSubTab === "featured" && (
              <div className="max-w-3xl">
                <div className="flex justify-end mb-6">
                  <Button onClick={handleAddFeatured}>
                    <Plus size={16} className="mr-2" /> Add Playlist
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {adminFeaturedPlaylists.map((playlist) => (
                    <div
                      key={playlist.id}
                      className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 flex gap-4 items-center group relative"
                    >
                      <img
                        src={playlist.coverUrl}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-zinc-900 dark:text-white truncate">
                          {playlist.title}
                        </h4>
                        <p className="text-xs text-zinc-500">
                          {playlist.songCount} Songs
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveFeatured(playlist.id)}
                        className="absolute top-2 right-2 p-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  {adminFeaturedPlaylists.length === 0 && (
                    <div className="col-span-full py-12 text-center text-zinc-500 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
                      No featured playlists.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Homepage Sections Manager */}
            {settingsSubTab === "sections" && (
              <div className="max-w-2xl bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                {homeSections.map((section, index) => (
                  <div
                    key={section.id}
                    className="flex items-center justify-between p-4 border-b border-zinc-100 dark:border-zinc-800 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-zinc-300 cursor-move">
                        <GripVertical size={20} />
                      </div>
                      <span
                        className={`font-medium ${
                          section.enabled
                            ? "text-zinc-900 dark:text-white"
                            : "text-zinc-400"
                        }`}
                      >
                        {section.label}
                      </span>
                    </div>
                    <button
                      onClick={() => handleToggleSection(section.id)}
                      className={`text-zinc-400 ${
                        section.enabled ? "text-emerald-500" : ""
                      }`}
                    >
                      {section.enabled ? (
                        <ToggleRight size={32} fill="currentColor" />
                      ) : (
                        <ToggleLeft size={32} />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Editor Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setEditingItem(null)}
          />
          <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                Moderation: {editingItem.title}
              </h3>
              <button onClick={() => setEditingItem(null)}>
                <X size={24} className="text-zinc-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Metadata Edit */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    defaultValue={editingItem.title}
                    className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-1">
                    Artist
                  </label>
                  <input
                    type="text"
                    defaultValue={editingItem.artist}
                    className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 text-sm"
                  />
                </div>
              </div>

              {/* Lyrics View */}
              <div className="bg-zinc-50 dark:bg-zinc-950/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <div className="flex justify-between mb-2">
                  <h4 className="font-bold text-sm">Lyrics & Sync</h4>
                  <span className="text-xs text-zinc-500">Read-Only View</span>
                </div>
                <div className="h-32 overflow-y-auto text-sm text-zinc-600 dark:text-zinc-400 font-mono space-y-1">
                  {editingItem.lyrics?.length ? (
                    editingItem.lyrics.map((l, i) => (
                      <div key={i} className="flex gap-4">
                        <span className="text-blue-500">
                          [{l.time.toFixed(2)}]
                        </span>
                        <span>{l.text}</span>
                      </div>
                    ))
                  ) : (
                    <p className="italic text-zinc-400">No lyrics submitted.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex justify-between items-center">
              <Button
                variant="secondary"
                onClick={() => setIsFeedbackOpen(true)}
              >
                Request Changes
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  className="text-red-500 hover:text-red-600"
                  onClick={() =>
                    handleSingleContentAction(editingItem.id, "reject")
                  }
                >
                  Reject
                </Button>
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white border-none"
                  onClick={() =>
                    handleSingleContentAction(editingItem.id, "approve")
                  }
                >
                  Approve & Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {isFeedbackOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-xl shadow-2xl p-6 animate-in zoom-in-95">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
              <MessageSquare className="text-blue-500" size={20} /> Request
              Changes
            </h3>
            <textarea
              value={feedbackNote}
              onChange={(e) => setFeedbackNote(e.target.value)}
              className="w-full h-32 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none mb-4"
              placeholder="e.g. Please upload a higher quality cover image..."
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="secondary"
                onClick={() => setIsFeedbackOpen(false)}
              >
                Back
              </Button>
              <Button
                onClick={() => {
                  alert("Sent!");
                  setIsFeedbackOpen(false);
                  setEditingItem(null);
                }}
              >
                Send Feedback
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
