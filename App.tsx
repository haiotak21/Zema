import React, { useState, useEffect } from "react";
import {
  Home as HomeIcon,
  Search as SearchIcon,
  Library,
  User,
  Menu,
  Music2,
  LogOut,
  UserCircle,
  Podcast,
  Clock,
  Download,
  Sun,
  Moon,
  Heart,
  Settings as SettingsIcon,
  Bell,
  Crown,
  Sparkles,
  Users,
  ShieldCheck,
  ToggleLeft,
} from "lucide-react";
import {
  Song,
  UserRole,
  User as UserType,
  Playlist,
  Artist,
  Album,
  Podcast as PodcastType,
} from "./types";
import {
  MOCK_SONGS,
  MOCK_PLAYLISTS,
  MOCK_ARTISTS,
  MOCK_ALBUMS,
  MOCK_PODCASTS,
  MOCK_PODCAST_EPISODES,
} from "./constants";
import { Player } from "./components/Player";
import { ActionSheet } from "./components/ActionSheet";
import { AddToPlaylistModal } from "./components/AddToPlaylistModal";
import { SupportModal } from "./components/SupportModal";
import { ShareModal } from "./components/ShareModal";
import { Home } from "./pages/Home";
import { ArtistDashboard } from "./pages/ArtistDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";
import { ListenerProfile } from "./pages/ListenerProfile";
import { Library as LibraryPage } from "./pages/Library";
import { Search } from "./pages/Search";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { ForgotPassword } from "./pages/ForgotPassword";
import { LandingPage } from "./pages/LandingPage";
import { MusicDetail } from "./pages/MusicDetail";
import { PlaylistDetail } from "./pages/PlaylistDetail";
import { ArtistDetail } from "./pages/ArtistDetail";
import { AlbumDetail } from "./pages/AlbumDetail";
import { LikedSongs } from "./pages/LikedSongs";
import { Podcasts } from "./pages/Podcasts";
import { PodcastDetail } from "./pages/PodcastDetail";
import { MyPlaylists } from "./pages/MyPlaylists";
import { CreatePlaylist } from "./pages/CreatePlaylist";
import { UserPlaylistDetail } from "./pages/UserPlaylistDetail";
import { Settings } from "./pages/Settings";
import { Notifications } from "./pages/Notifications";
import { Radio } from "./pages/Radio";
import { CategoryDetail } from "./pages/CategoryDetail";
import { Premium } from "./pages/Premium";
import { Wrapped } from "./pages/Wrapped";
import { Billing } from "./pages/Billing";
import { Community } from "./pages/Community";
import { ViewAll } from "./pages/ViewAll";
import {
  AboutUs,
  ForArtists,
  PrivacyPolicy,
  TermsOfService,
  ContactUs,
  Careers,
} from "./pages/InfoPages";
import { Button } from "./components/Button";
import { SongCard } from "./components/SongCard";
import { Logo } from "./components/Logo";
import { useTheme } from "./context/ThemeContext";
import { useLanguage } from "./context/LanguageContext";

type PublicView =
  | "landing"
  | "login"
  | "register"
  | "forgot-password"
  | "about"
  | "artists"
  | "privacy"
  | "terms"
  | "contact"
  | "careers";

const App: React.FC = () => {
  // Authentication State
  const [user, setUser] = useState<UserType | null>(null);
  const [publicView, setPublicView] = useState<PublicView>("landing");

  // Routing State
  const [currentPage, setCurrentPage] = useState<
    | "home"
    | "artist"
    | "admin"
    | "profile"
    | "search"
    | "library"
    | "podcasts"
    | "podcast-detail"
    | "listen-later"
    | "downloads"
    | "music-detail"
    | "playlist-detail"
    | "my-playlists"
    | "create-playlist"
    | "user-playlist-detail"
    | "artist-detail"
    | "album-detail"
    | "liked-songs"
    | "settings"
    | "notifications"
    | "radio"
    | "category-detail"
    | "premium"
    | "wrapped"
    | "billing"
    | "community"
    | "view-all"
    | "about"
    | "artists"
    | "privacy"
    | "terms"
    | "contact"
    | "careers"
  >("home");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [previousPage, setPreviousPage] = useState<
    "home" | "search" | "library" | "downloads"
  >("home");

  const [viewingSong, setViewingSong] = useState<Song | null>(null);
  const [viewingPlaylist, setViewingPlaylist] = useState<Playlist | null>(null);
  const [viewingArtist, setViewingArtist] = useState<Artist | null>(null);
  const [viewingAlbum, setViewingAlbum] = useState<Album | null>(null);
  const [viewingPodcast, setViewingPodcast] = useState<PodcastType | null>(
    null
  );
  const [radioSeed, setRadioSeed] = useState<{
    type: "artist" | "song";
    name: string;
    cover: string;
  } | null>(null);
  const [viewingCategory, setViewingCategory] = useState<string | null>(null);

  // Search State
  const [searchSeedCategory, setSearchSeedCategory] = useState<string>("all");

  // View All State
  const [viewAllState, setViewAllState] = useState<{
    title: string;
    type: "song" | "playlist";
    data: any[];
  } | null>(null);

  // Theme & Language Context
  const { theme, toggleTheme } = useTheme();
  const { t, dir, language, setLanguage } = useLanguage();

  // Try to hydrate user from token on mount
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await fetch("/api/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          localStorage.removeItem("token");
          return;
        }
        const data = await res.json();
        if (data && data.user) setUser(data.user);
      } catch (err) {
        console.warn("Failed to hydrate user:", err);
      }
    })();
  }, []);

  // Player State
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDataSaver, setIsDataSaver] = useState(false);
  const [isLyricsOpen, setIsLyricsOpen] = useState(false);
  const [recentlyPlayed, setRecentlyPlayed] = useState<Song[]>([]);

  // User Library State
  const [downloadedSongs, setDownloadedSongs] = useState<Set<string>>(
    new Set()
  );
  const [activeDownloads, setActiveDownloads] = useState<
    Record<string, number>
  >({});
  const [likedSongs, setLikedSongs] = useState<Set<string>>(new Set());
  const [listenLater, setListenLater] = useState<Set<string>>(new Set());

  // Custom Playlists State
  const [myPlaylists, setMyPlaylists] = useState<Playlist[]>([
    ...MOCK_PLAYLISTS,
  ]); // Initialize with mocks for demo
  const [myPlaylistSongs, setMyPlaylistSongs] = useState<
    Record<string, Song[]>
  >({
    "1": MOCK_SONGS,
    "2": MOCK_SONGS.slice(0, 2),
    "3": MOCK_SONGS.slice(2),
  });

  // Action Sheet State
  const [actionSheetOpen, setActionSheetOpen] = useState(false);
  const [actionItem, setActionItem] = useState<Song | Album | Playlist | null>(
    null
  );
  const [actionType, setActionType] = useState<"song" | "album" | "playlist">(
    "song"
  );

  // Add to Playlist Modal State
  const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);

  // Share Modal State
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareItem, setShareItem] = useState<Song | Album | Playlist | null>(
    null
  );

  // Support Modal State
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [supportContext, setSupportContext] = useState<
    { topic: "bug" | "content_report" | "general"; data?: string } | undefined
  >(undefined);

  // Simulate Audio Progress
  useEffect(() => {
    let interval: any;
    if (isPlaying && currentSong) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= currentSong.duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSong]);

  const handlePlay = (song: Song) => {
    setRecentlyPlayed((prev) => {
      const filtered = prev.filter((s) => s.id !== song.id);
      return [song, ...filtered].slice(0, 10);
    });

    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
      setProgress(0);
    }
  };

  const handleToggleDownload = (song: Song) => {
    if (downloadedSongs.has(song.id)) {
      setDownloadedSongs((prev) => {
        const next = new Set(prev);
        next.delete(song.id);
        return next;
      });
      return;
    }
    if (activeDownloads[song.id] !== undefined) return;
    setActiveDownloads((prev) => ({ ...prev, [song.id]: 0 }));

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress >= 100) {
        clearInterval(interval);
        setActiveDownloads((prev) => {
          const next = { ...prev };
          delete next[song.id];
          return next;
        });
        setDownloadedSongs((prev) => new Set(prev).add(song.id));
      } else {
        setActiveDownloads((prev) => ({ ...prev, [song.id]: progress }));
      }
    }, 300);
  };

  // --- ACTIONS LOGIC ---
  const handleOpenActionSheet = (
    item: Song | Album | Playlist,
    type: "song" | "album" | "playlist",
    e?: React.MouseEvent
  ) => {
    if (e) e.stopPropagation();
    setActionItem(item);
    setActionType(type);
    setActionSheetOpen(true);
  };

  const handleSongMoreOptions = (song: Song, e: React.MouseEvent) => {
    handleOpenActionSheet(song, "song", e);
  };

  const handleToggleLike = () => {
    if (!actionItem) return;
    setLikedSongs((prev) => {
      const next = new Set(prev);
      if (next.has(actionItem.id)) next.delete(actionItem.id);
      else next.add(actionItem.id);
      return next;
    });
  };

  const getSongsFromActionItem = (item: any, type: string): Song[] => {
    if (type === "song") return [item as Song];

    if (type === "album") {
      // Find songs for this album
      return MOCK_SONGS.filter((s) => s.album === item.title);
    }

    if ((item as any).host) {
      // It's a Podcast
      return MOCK_PODCAST_EPISODES[item.id] || [];
    }

    if (type === "playlist") {
      // For demo, if generic playlist return mock songs, if user playlist return stored songs
      if (myPlaylistSongs[item.id]) return myPlaylistSongs[item.id];
      return MOCK_SONGS.slice(0, 5); // Fallback for mock playlists
    }

    return [];
  };

  const handleToggleListenLater = () => {
    if (!actionItem) return;
    const songsToAdd = getSongsFromActionItem(actionItem, actionType);

    if (songsToAdd.length === 0) return;

    setListenLater((prev) => {
      const next = new Set(prev);
      // If singular song, toggle it
      if (actionType === "song") {
        if (next.has(actionItem.id)) next.delete(actionItem.id);
        else next.add(actionItem.id);
      } else {
        // For collections, add all songs (don't toggle off to avoid confusion)
        songsToAdd.forEach((s) => next.add(s.id));
        alert(`Added ${songsToAdd.length} items to Listen Later.`);
      }
      return next;
    });
  };

  const handleAddToPlaylist = () => {
    setActionSheetOpen(false);
    setAddToPlaylistModalOpen(true);
  };

  const handleConfirmAddToPlaylist = (playlistId: string) => {
    if (!actionItem) return;

    const songsToAdd = getSongsFromActionItem(actionItem, actionType);

    if (songsToAdd.length === 0) {
      alert("No songs found to add.");
      return;
    }

    setMyPlaylistSongs((prev) => {
      const currentSongs = prev[playlistId] || [];
      // Avoid duplicates
      const newSongs = [...currentSongs];
      let addedCount = 0;
      songsToAdd.forEach((song) => {
        if (!newSongs.find((s) => s.id === song.id)) {
          newSongs.push(song);
          addedCount++;
        }
      });

      if (addedCount > 0) {
        // Update playlist count in myPlaylists array
        setMyPlaylists((pList) =>
          pList.map((p) =>
            p.id === playlistId ? { ...p, songCount: newSongs.length } : p
          )
        );

        alert(`Added ${addedCount} songs to playlist.`);
        return { ...prev, [playlistId]: newSongs };
      } else {
        alert("Songs already in playlist.");
        return prev;
      }
    });

    setAddToPlaylistModalOpen(false);
  };

  const handleShare = (item?: any) => {
    // Use Custom Share Modal instead of Navigator API
    setShareItem(item || null); // null indicates general app share
    setShareModalOpen(true);
  };

  const handleReport = () => {
    if (!actionItem) return;
    setSupportContext({
      topic: "content_report",
      data: `${actionType.toUpperCase()}_${actionItem.id}`,
    });
    setSupportModalOpen(true);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    setCurrentSong(null);
    setIsPlaying(false);
    setPublicView("login");
  };

  // --- VIEW ALL / NAVIGATION LOGIC ---
  const handleViewAll = (section: string) => {
    updateNavigationHistory();

    if (section === "trending") {
      // Flatten mock songs to create a longer list for demo purposes
      const extendedSongs = [...MOCK_SONGS, ...MOCK_SONGS, ...MOCK_SONGS].map(
        (s, i) => ({ ...s, id: `${s.id}-va-${i}` })
      );
      setViewAllState({
        title: "Trending in Ethiopia",
        type: "song",
        data: extendedSongs,
      });
    } else if (section === "mixes") {
      const mixes = Array.from({ length: 20 }).map((_, i) => ({
        id: `daily-mix-${i}`,
        title: `Daily Mix ${i + 1}`,
        coverUrl: `https://picsum.photos/seed/daily${i}/300/300`,
        songCount: 20,
        description: "Made for you based on your recent listening",
      }));
      setViewAllState({
        title: "Your Daily Mixes",
        type: "playlist",
        data: mixes,
      });
    } else if (section === "made_for_you") {
      // Flatten existing playlists
      const extendedPlaylists = [
        ...MOCK_PLAYLISTS,
        ...MOCK_PLAYLISTS,
        ...MOCK_PLAYLISTS,
      ].map((p, i) => ({ ...p, id: `${p.id}-va-${i}` }));
      setViewAllState({
        title: "Made For You",
        type: "playlist",
        data: extendedPlaylists,
      });
    }

    setCurrentPage("view-all");
    window.scrollTo(0, 0);
  };

  // --- PLAYLIST MANAGEMENT ---
  const handleCreatePlaylist = (
    title: string,
    description: string,
    coverUrl: string | undefined,
    selectedSongs: Song[]
  ) => {
    const newPlaylist: Playlist = {
      id: `pl-${Date.now()}`,
      title: title,
      coverUrl:
        coverUrl ||
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
      songCount: selectedSongs.length,
    };

    setMyPlaylists((prev) => [newPlaylist, ...prev]);
    setMyPlaylistSongs((prev) => ({
      ...prev,
      [newPlaylist.id]: selectedSongs,
    }));

    handlePlaylistClick(newPlaylist);
  };

  const handleDeletePlaylist = (playlistId: string) => {
    if (confirm("Are you sure you want to delete this playlist?")) {
      setMyPlaylists((prev) => prev.filter((p) => p.id !== playlistId));
      setMyPlaylistSongs((prev) => {
        const newState = { ...prev };
        delete newState[playlistId];
        return newState;
      });
      handleBackFromDetail();
    }
  };

  const handleRemoveSongFromPlaylist = (playlistId: string, songId: string) => {
    setMyPlaylistSongs((prev) => ({
      ...prev,
      [playlistId]: prev[playlistId].filter((s) => s.id !== songId),
    }));
    setMyPlaylists((prev) =>
      prev.map((p) =>
        p.id === playlistId ? { ...p, songCount: p.songCount - 1 } : p
      )
    );
  };

  const updateNavigationHistory = () => {
    const validReturnPages = [
      "home",
      "search",
      "library",
      "downloads",
      "profile",
    ];
    if (validReturnPages.includes(currentPage)) {
      setPreviousPage(currentPage as any);
    }
  };

  const handleSongClick = (song: Song) => {
    setViewingSong(song);
    updateNavigationHistory();
    setCurrentPage("music-detail");
    window.scrollTo(0, 0);
  };

  const handlePlaylistClick = (playlist: Playlist) => {
    setViewingPlaylist(playlist);
    updateNavigationHistory();
    if (myPlaylistSongs[playlist.id]) {
      setCurrentPage("user-playlist-detail");
    } else {
      setCurrentPage("playlist-detail");
    }
    window.scrollTo(0, 0);
  };

  const handleArtistClick = (artist: Artist) => {
    setViewingArtist(artist);
    updateNavigationHistory();
    setCurrentPage("artist-detail");
    window.scrollTo(0, 0);
  };

  const handleAlbumClick = (album: Album) => {
    setViewingAlbum(album);
    updateNavigationHistory();
    setCurrentPage("album-detail");
    window.scrollTo(0, 0);
  };

  const handlePodcastClick = (podcast: PodcastType) => {
    setViewingPodcast(podcast);
    updateNavigationHistory();
    setCurrentPage("podcast-detail");
    window.scrollTo(0, 0);
  };

  const handleCategoryClick = (category: string) => {
    setViewingCategory(category);
    updateNavigationHistory();
    setCurrentPage("category-detail");
    window.scrollTo(0, 0);
  };

  const handleDailyMixClick = (title: string) => {
    const mixPlaylist: Playlist = {
      id: "daily-mix-" + title,
      title: title,
      coverUrl: "https://picsum.photos/300?random=" + Math.random(),
      songCount: 20,
    };
    const mixSongs = [...MOCK_SONGS, ...MOCK_SONGS, ...MOCK_SONGS]
      .sort(() => Math.random() - 0.5)
      .slice(0, 20);
    setViewingPlaylist(mixPlaylist);
    setMyPlaylistSongs((prev) => ({ ...prev, [mixPlaylist.id]: mixSongs }));
    handlePlaylistClick(mixPlaylist);
  };

  const handleStartRadio = (
    type: "artist" | "song",
    name: string,
    cover: string
  ) => {
    setRadioSeed({ type, name, cover });
    updateNavigationHistory();
    setCurrentPage("radio");
    window.scrollTo(0, 0);
  };

  const handleBackFromDetail = () => {
    setCurrentPage(previousPage);
    setViewingSong(null);
    setViewingPlaylist(null);
    setViewingArtist(null);
    setViewingAlbum(null);
    setViewingPodcast(null);
    setRadioSeed(null);
    setViewingCategory(null);
    setViewAllState(null);
  };

  const handleAuthSuccess = (newUser: UserType) => {
    setUser(newUser);
    // If user is an artist or has a pending artist request (or recently requested), send them to the artist view
    const asAny: any = newUser as any;
    const requestedRole =
      asAny.requestedRole || localStorage.getItem("requestedRole");
    console.log(
      "[AuthSuccess] user:",
      newUser,
      "requestedRole(local/user):",
      requestedRole
    );
    if (
      newUser.role === UserRole.ARTIST ||
      asAny.pendingArtist ||
      requestedRole === "ARTIST"
    ) {
      // clear the temporary requestedRole marker after routing
      localStorage.removeItem("requestedRole");
      setCurrentPage("artist");
    } else if (newUser.role === UserRole.ADMIN) {
      setCurrentPage("admin");
    } else {
      setCurrentPage("home");
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "am" : "en");
  };

  const NavItem = ({ icon: Icon, label, page, onClick }: any) => (
    <button
      onClick={() => {
        if (onClick) onClick();
        else {
          setCurrentPage(page);
          setSidebarOpen(false);
        }
      }}
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors ${
        currentPage === page
          ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white"
          : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900"
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  // === PUBLIC VIEW HANDLING ===
  if (!user) {
    if (publicView === "landing")
      return (
        <LandingPage
          onGetStarted={() => setPublicView("register")}
          onLogin={() => setPublicView("login")}
          onNavigate={(page) => setPublicView(page as PublicView)}
        />
      );
    if (publicView === "login")
      return (
        <Login
          onLogin={handleAuthSuccess}
          onSwitchToRegister={() => setPublicView("register")}
          onSwitchToForgotPassword={() => setPublicView("forgot-password")}
        />
      );
    if (publicView === "forgot-password")
      return <ForgotPassword onSwitchToLogin={() => setPublicView("login")} />;
    if (publicView === "register")
      return (
        <Register
          onRegister={handleAuthSuccess}
          onSwitchToLogin={() => setPublicView("login")}
        />
      );

    // Info Pages
    if (publicView === "about")
      return (
        <AboutUs
          onBack={() => setPublicView("landing")}
          onSeeCareers={() => setPublicView("careers")}
        />
      );
    if (publicView === "careers")
      return <Careers onBack={() => setPublicView("about")} />;
    if (publicView === "artists")
      return (
        <ForArtists
          onBack={() => setPublicView("landing")}
          onSignUp={() => setPublicView("register")}
        />
      );
    if (publicView === "privacy")
      return <PrivacyPolicy onBack={() => setPublicView("landing")} />;
    if (publicView === "terms")
      return <TermsOfService onBack={() => setPublicView("landing")} />;
    if (publicView === "contact")
      return <ContactUs onBack={() => setPublicView("landing")} />;

    return (
      <LandingPage
        onGetStarted={() => setPublicView("register")}
        onLogin={() => setPublicView("login")}
        onNavigate={(page) => setPublicView(page as PublicView)}
      />
    );
  }

  const downloadedSongsList = MOCK_SONGS.filter((s) =>
    downloadedSongs.has(s.id)
  );
  const likedSongsList = MOCK_SONGS.filter((s) => likedSongs.has(s.id));

  // Combine songs and podcast episodes for Listen Later
  const allPlayableItems = [
    ...MOCK_SONGS,
    ...Object.values(MOCK_PODCAST_EPISODES).flat(),
  ];
  const listenLaterList = allPlayableItems.filter((s) => listenLater.has(s.id));

  return (
    <div
      className={`flex h-[100dvh] overflow-hidden transition-colors duration-200 bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white ${
        dir === "rtl" ? "flex-row-reverse" : "flex-row"
      }`}
      dir={dir}
    >
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-white/90 dark:bg-zinc-950/90 backdrop-blur z-30 p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center transition-colors">
        <div className="flex items-center gap-2">
          <Logo className="h-8" />
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="p-2 text-zinc-600 dark:text-zinc-400 font-bold text-xs"
          >
            {language === "en" ? "አማ" : "EN"}
          </button>
          <button
            onClick={toggleTheme}
            className="text-zinc-600 dark:text-zinc-400"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="text-zinc-900 dark:text-white"
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:relative z-40 inset-y-0 left-0 w-64 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-900 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 flex flex-col`}
      >
        <div className="p-6 flex items-center justify-between mb-4">
          <Logo className="h-10 w-auto" />
        </div>

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          <NavItem icon={HomeIcon} label={t("home")} page="home" />
          <NavItem
            icon={SearchIcon}
            label={t("search")}
            page="search"
            onClick={() => {
              setSearchSeedCategory("all");
              setCurrentPage("search");
              setSidebarOpen(false);
            }}
          />
          <NavItem icon={Library} label={t("library")} page="library" />
          <NavItem icon={Users} label="Community" page="community" />
          <NavItem
            icon={Bell}
            label={t("notifications")}
            page="notifications"
          />
          <div className="pt-4 pb-2 px-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Playlists
          </div>
          <NavItem icon={Heart} label="Liked Songs" page="liked-songs" />
          <NavItem icon={Clock} label="Listen Later" page="listen-later" />
          <NavItem icon={Download} label="Downloads" page="downloads" />
          {user.role === UserRole.LISTENER && (
            <div className="mt-4 space-y-1 border-t border-zinc-100 dark:border-zinc-900 pt-4">
              <NavItem icon={Podcast} label="Podcasts" page="podcasts" />
            </div>
          )}
          {user.role === UserRole.LISTENER && (
            <div className="mt-6 mx-3">
              <button
                onClick={() => {
                  setCurrentPage("premium");
                  setSidebarOpen(false);
                }}
                className={`w-full p-4 rounded-xl bg-gradient-to-br from-rose-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all group flex flex-col items-center text-center ${
                  currentPage === "premium" ? "ring-2 ring-white" : ""
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Crown
                    size={20}
                    className="fill-yellow-300 text-yellow-300 animate-pulse"
                  />
                  <span className="font-bold">{t("get_premium")}</span>
                </div>
                <p className="text-xs text-white/90">Ads-free & Offline Mode</p>
              </button>
            </div>
          )}
          <div className="pt-6 pb-2 px-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Dashboards
          </div>
          {user.role === UserRole.ARTIST && (
            <NavItem icon={Music2} label="Artist Studio" page="artist" />
          )}
          {user.role === UserRole.ADMIN && (
            <NavItem icon={User} label="Admin Panel" page="admin" />
          )}
          <div className="h-20"></div> {/* Spacer for bottom player */}
        </nav>
      </aside>

      {/* Main Content Area - Flex Column */}
      <main className="flex-1 flex flex-col relative bg-zinc-50 dark:bg-black transition-colors overflow-hidden">
        {/* ... Rest of the main content ... */}

        {/* Desktop Header - Top Right Controls */}
        <header className="hidden md:flex items-center justify-end gap-3 p-4 px-8 w-full z-30 pointer-events-none sticky top-0">
          <div className="pointer-events-auto flex items-center gap-3 bg-white/80 dark:bg-black/50 backdrop-blur-md p-1.5 rounded-full border border-zinc-200 dark:border-white/10 shadow-sm transition-all hover:bg-white dark:hover:bg-black/80">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-bold text-xs w-8 h-8 flex items-center justify-center"
              title="Switch Language"
            >
              {language === "en" ? "አማ" : "EN"}
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setCurrentPage("settings")}
              className={`p-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors ${
                currentPage === "settings"
                  ? "text-rose-600 dark:text-rose-500 bg-zinc-100 dark:bg-zinc-800"
                  : ""
              }`}
              title="Settings"
            >
              <SettingsIcon size={20} />
            </button>
            <div
              onClick={() => setCurrentPage("profile")}
              className="flex items-center gap-3 pl-2 border-l border-zinc-200 dark:border-zinc-700 ml-1 cursor-pointer hover:opacity-80 transition-opacity pr-1 group"
              title="Profile"
            >
              <div className="text-right hidden lg:block">
                <p className="text-xs font-bold text-zinc-900 dark:text-white leading-none">
                  {user.name}
                </p>
                <p className="text-left text-[10px] text-zinc-500 uppercase tracking-wider">
                  {user.role}
                </p>
              </div>
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-rose-500 to-purple-600 p-[2px] shadow-sm group-hover:shadow-md transition-shadow">
                <div className="h-full w-full rounded-full bg-white dark:bg-black overflow-hidden flex items-center justify-center">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="font-bold text-xs">{user.name[0]}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Container */}
        <div
          className="flex-1 overflow-y-auto scroll-smooth relative"
          id="main-scroll"
        >
          {/* Overlays/Detail Pages - Rendered inside scroll container for proper z-indexing context if needed, but handled by absolute positioning */}
          {currentPage === "music-detail" && viewingSong && (
            <MusicDetail
              song={viewingSong}
              onBack={handleBackFromDetail}
              onPlay={handlePlay}
              isPlaying={isPlaying}
              isCurrent={currentSong?.id === viewingSong.id}
              isDownloaded={downloadedSongs.has(viewingSong.id)}
              downloadProgress={activeDownloads[viewingSong.id]}
              onToggleDownload={handleToggleDownload}
              similarSongs={MOCK_SONGS.filter((s) => s.id !== viewingSong.id)}
              onSongClick={handleSongClick}
              onShare={() => handleShare(viewingSong)}
            />
          )}

          {/* Generic Playlist Detail (Read Only / Global) */}
          {currentPage === "playlist-detail" && viewingPlaylist && (
            <PlaylistDetail
              playlist={viewingPlaylist}
              songs={myPlaylistSongs[viewingPlaylist.id] || MOCK_SONGS}
              onBack={handleBackFromDetail}
              onPlaySong={handlePlay}
              onPlayPlaylist={() => {
                const songs = myPlaylistSongs[viewingPlaylist.id] || MOCK_SONGS;
                if (songs && songs.length > 0) handlePlay(songs[0]);
              }}
              currentSong={currentSong}
              isPlaying={isPlaying}
              onMoreOptions={(e) =>
                handleOpenActionSheet(viewingPlaylist, "playlist", e)
              }
              onSongMoreOptions={handleSongMoreOptions}
              onShare={() => handleShare(viewingPlaylist)}
            />
          )}

          {/* User Playlist Detail (Editable) */}
          {currentPage === "user-playlist-detail" && viewingPlaylist && (
            <UserPlaylistDetail
              playlist={viewingPlaylist}
              songs={myPlaylistSongs[viewingPlaylist.id] || []}
              onBack={handleBackFromDetail}
              onPlaySong={handlePlay}
              onPlayPlaylist={() => {
                const songs = myPlaylistSongs[viewingPlaylist.id];
                if (songs && songs.length > 0) handlePlay(songs[0]);
              }}
              currentSong={currentSong}
              isPlaying={isPlaying}
              onRemoveSong={(songId) =>
                handleRemoveSongFromPlaylist(viewingPlaylist.id, songId)
              }
              onDeletePlaylist={() => handleDeletePlaylist(viewingPlaylist.id)}
              onShare={() => handleShare(viewingPlaylist)}
            />
          )}

          {currentPage === "artist-detail" && viewingArtist && (
            <ArtistDetail
              artist={viewingArtist}
              topSongs={MOCK_SONGS}
              albums={MOCK_ALBUMS}
              similarArtists={MOCK_ARTISTS.filter(
                (a) => a.id !== viewingArtist.id
              )}
              onBack={handleBackFromDetail}
              onPlaySong={handlePlay}
              currentSong={currentSong}
              isPlaying={isPlaying}
              onAlbumClick={handleAlbumClick}
              onArtistClick={handleArtistClick}
              onMoreOptions={handleSongMoreOptions}
            />
          )}
          {currentPage === "album-detail" && viewingAlbum && (
            <AlbumDetail
              album={viewingAlbum}
              songs={MOCK_SONGS} // In real app, filter songs by album
              onBack={handleBackFromDetail}
              onPlaySong={handlePlay}
              onPlayAlbum={() => handlePlay(MOCK_SONGS[0])}
              currentSong={currentSong}
              isPlaying={isPlaying}
              onShare={() => handleShare(viewingAlbum)}
              onMoreOptions={handleSongMoreOptions}
            />
          )}
          {currentPage === "liked-songs" && (
            <LikedSongs
              songs={likedSongsList}
              onBack={handleBackFromDetail}
              onPlaySong={handlePlay}
              onPlayAll={() =>
                likedSongsList.length > 0 && handlePlay(likedSongsList[0])
              }
              currentSong={currentSong}
              isPlaying={isPlaying}
              onMoreOptions={handleSongMoreOptions}
            />
          )}
          {currentPage === "podcast-detail" && viewingPodcast && (
            <PodcastDetail
              podcast={viewingPodcast}
              episodes={MOCK_PODCAST_EPISODES[viewingPodcast.id] || []}
              onBack={handleBackFromDetail}
              onPlayEpisode={handlePlay}
              currentSong={currentSong}
              isPlaying={isPlaying}
              onShare={() => handleShare(viewingPodcast)}
            />
          )}
          {currentPage === "my-playlists" && (
            <MyPlaylists
              playlists={myPlaylists}
              onPlaylistClick={handlePlaylistClick}
              onCreateClick={() => {
                updateNavigationHistory();
                setCurrentPage("create-playlist");
              }}
            />
          )}
          {currentPage === "create-playlist" && (
            <CreatePlaylist
              allSongs={MOCK_SONGS}
              onSave={handleCreatePlaylist}
              onCancel={() => {
                setCurrentPage("my-playlists");
              }}
            />
          )}

          {/* New Pages */}
          {currentPage === "radio" && radioSeed && (
            <Radio
              seedType={radioSeed.type}
              seedName={radioSeed.name}
              seedCover={radioSeed.cover}
              songs={MOCK_SONGS}
              onBack={handleBackFromDetail}
              onPlay={handlePlay}
              currentSong={currentSong}
              isPlaying={isPlaying}
              downloadedSongs={downloadedSongs}
              activeDownloads={activeDownloads}
              onToggleDownload={handleToggleDownload}
              onSongClick={handleSongClick}
              onMoreOptions={handleSongMoreOptions}
            />
          )}

          {currentPage === "category-detail" && viewingCategory && (
            <CategoryDetail
              category={viewingCategory}
              songs={MOCK_SONGS}
              playlists={MOCK_PLAYLISTS}
              onBack={handleBackFromDetail}
              onPlay={handlePlay}
              currentSong={currentSong}
              isPlaying={isPlaying}
              downloadedSongs={downloadedSongs}
              activeDownloads={activeDownloads}
              onToggleDownload={handleToggleDownload}
              onSongClick={handleSongClick}
              onPlaylistClick={handlePlaylistClick}
              onMoreOptions={handleSongMoreOptions}
            />
          )}

          {currentPage === "wrapped" && (
            <Wrapped
              onBack={() => {
                setCurrentPage("home");
                window.scrollTo(0, 0);
              }}
            />
          )}

          {currentPage === "billing" && (
            <Billing
              onBack={() => {
                setCurrentPage("settings");
                window.scrollTo(0, 0);
              }}
            />
          )}

          {currentPage === "community" && <Community />}

          {/* View All Page */}
          {currentPage === "view-all" && viewAllState && (
            <ViewAll
              title={viewAllState.title}
              type={viewAllState.type}
              items={viewAllState.data}
              onBack={handleBackFromDetail}
              onPlay={handlePlay}
              currentSong={currentSong}
              isPlaying={isPlaying}
              downloadedSongs={downloadedSongs}
              activeDownloads={activeDownloads}
              onToggleDownload={handleToggleDownload}
              onSongClick={handleSongClick}
              onPlaylistClick={handlePlaylistClick}
              onMoreOptions={handleSongMoreOptions}
            />
          )}

          {/* Info Pages (Logged In) */}
          {currentPage === "about" && (
            <AboutUs
              onBack={handleBackFromDetail}
              onSeeCareers={() => {
                updateNavigationHistory();
                setCurrentPage("careers");
                window.scrollTo(0, 0);
              }}
            />
          )}
          {currentPage === "careers" && (
            <Careers
              onBack={() => {
                updateNavigationHistory();
                setCurrentPage("about");
                window.scrollTo(0, 0);
              }}
            />
          )}
          {currentPage === "artists" && (
            <ForArtists onBack={handleBackFromDetail} onSignUp={() => {}} />
          )}
          {currentPage === "privacy" && (
            <PrivacyPolicy onBack={handleBackFromDetail} />
          )}
          {currentPage === "terms" && (
            <TermsOfService onBack={handleBackFromDetail} />
          )}
          {currentPage === "contact" && (
            <ContactUs onBack={handleBackFromDetail} />
          )}

          {/* Standard Layout Pages */}
          <div
            className={`p-4 md:p-8 pb-40 max-w-7xl mx-auto min-h-screen ${
              [
                "music-detail",
                "playlist-detail",
                "user-playlist-detail",
                "artist-detail",
                "album-detail",
                "liked-songs",
                "podcast-detail",
                "create-playlist",
                "radio",
                "category-detail",
                "wrapped",
                "billing",
                "community",
                "view-all",
                "about",
                "artists",
                "privacy",
                "terms",
                "contact",
                "careers",
              ].includes(currentPage)
                ? "hidden"
                : ""
            }`}
          >
            {currentPage === "home" && (
              <Home
                songs={MOCK_SONGS}
                playlists={MOCK_PLAYLISTS}
                onPlay={handlePlay}
                currentSong={currentSong}
                isPlaying={isPlaying}
                downloadedSongs={downloadedSongs}
                activeDownloads={activeDownloads}
                onToggleDownload={handleToggleDownload}
                onSongClick={handleSongClick}
                onPlaylistClick={handlePlaylistClick}
                onCategoryClick={handleCategoryClick}
                onDailyMixClick={handleDailyMixClick}
                onWrappedClick={() => {
                  updateNavigationHistory();
                  setCurrentPage("wrapped");
                }}
                onMoreOptions={handleSongMoreOptions}
                onViewAll={handleViewAll}
              />
            )}

            {currentPage === "podcasts" && (
              <Podcasts
                podcasts={MOCK_PODCASTS}
                onPodcastClick={handlePodcastClick}
                onCategoryClick={handleCategoryClick}
              />
            )}

            {currentPage === "premium" && <Premium />}

            {currentPage === "profile" && (
              <ListenerProfile
                user={user}
                onUpdateProfile={(updatedUser) => setUser(updatedUser)}
              />
            )}

            {currentPage === "settings" && (
              <Settings
                user={user}
                onLogout={handleLogout}
                onDeleteAccount={handleLogout}
                onNavigateToBilling={() => {
                  updateNavigationHistory();
                  setCurrentPage("billing");
                }}
                onContactSupport={() => {
                  setSupportContext({ topic: "general" });
                  setSupportModalOpen(true);
                }}
                onNavigate={(page) => {
                  updateNavigationHistory();
                  setCurrentPage(page as any);
                }}
              />
            )}

            {currentPage === "notifications" && (
              <Notifications
                onViewAlbum={handleAlbumClick}
                onViewPlaylist={handlePlaylistClick}
                onViewArtist={handleArtistClick}
                onViewPodcast={handlePodcastClick}
              />
            )}

            {currentPage === "library" && (
              <LibraryPage
                recentlyPlayed={recentlyPlayed}
                downloadedSongs={downloadedSongsList}
                activeDownloads={activeDownloads}
                onPlay={handlePlay}
                currentSong={currentSong}
                isPlaying={isPlaying}
                onToggleDownload={handleToggleDownload}
                onSongClick={handleSongClick}
                onLikedSongsClick={() => {
                  updateNavigationHistory();
                  setCurrentPage("liked-songs");
                  window.scrollTo(0, 0);
                }}
                onPlaylistsClick={() => {
                  updateNavigationHistory();
                  setCurrentPage("my-playlists");
                  window.scrollTo(0, 0);
                }}
                onMoreOptions={handleSongMoreOptions}
              />
            )}

            {currentPage === "downloads" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                <header className="flex items-center gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
                      Downloads
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
                      {downloadedSongsList.length} songs available offline
                    </p>
                  </div>
                </header>
                {downloadedSongsList.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {downloadedSongsList.map((song) => (
                      <SongCard
                        key={song.id}
                        song={song}
                        onPlay={handlePlay}
                        isPlaying={isPlaying}
                        isCurrent={currentSong?.id === song.id}
                        isDownloaded={true}
                        onToggleDownload={handleToggleDownload}
                        onClick={handleSongClick}
                        onMoreOptions={handleSongMoreOptions}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <div className="bg-zinc-100 dark:bg-zinc-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Download
                        size={32}
                        className="text-zinc-500 dark:text-zinc-600"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                      No downloads yet
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      Download songs to listen to them offline.
                    </p>
                  </div>
                )}
              </div>
            )}

            {currentPage === "listen-later" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                <header className="flex items-center gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
                  <div className="h-16 w-16 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                    <Clock size={32} />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
                      Listen Later
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
                      {listenLaterList.length} episodes/songs saved
                    </p>
                  </div>
                </header>
                {listenLaterList.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {listenLaterList.map((song) => (
                      <SongCard
                        key={song.id}
                        song={song}
                        onPlay={handlePlay}
                        isPlaying={isPlaying}
                        isCurrent={currentSong?.id === song.id}
                        isDownloaded={downloadedSongs.has(song.id)}
                        onToggleDownload={handleToggleDownload}
                        onClick={handleSongClick}
                        onMoreOptions={handleSongMoreOptions}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <p className="text-zinc-500">
                      Save items here to listen when you have time.
                    </p>
                  </div>
                )}
              </div>
            )}

            {currentPage === "search" && (
              <Search
                songs={MOCK_SONGS}
                playlists={MOCK_PLAYLISTS}
                artists={MOCK_ARTISTS}
                albums={MOCK_ALBUMS}
                onPlay={handlePlay}
                currentSong={currentSong}
                isPlaying={isPlaying}
                downloadedSongs={downloadedSongs}
                activeDownloads={activeDownloads}
                onToggleDownload={handleToggleDownload}
                onPlaylistClick={handlePlaylistClick}
                onSongClick={handleSongClick}
                onArtistClick={handleArtistClick}
                onAlbumClick={handleAlbumClick}
                onMoreOptions={handleSongMoreOptions}
                initialCategory={searchSeedCategory}
              />
            )}

            {currentPage === "artist" &&
              (user.role === UserRole.ARTIST ||
                (user as any).pendingArtist ||
                (user as any).requestedRole === "ARTIST") && (
                <ArtistDashboard user={user} />
              )}
            {currentPage === "admin" && user.role === UserRole.ADMIN && (
              <AdminDashboard />
            )}
          </div>
        </div>
      </main>

      {/* Persistent Player */}
      {currentSong && (
        <Player
          currentSong={currentSong}
          isPlaying={isPlaying}
          progress={progress}
          isDataSaver={isDataSaver}
          isLyricsOpen={isLyricsOpen}
          queue={MOCK_SONGS}
          togglePlay={() => setIsPlaying(!isPlaying)}
          toggleDataSaver={() => setIsDataSaver(!isDataSaver)}
          toggleLyrics={() => setIsLyricsOpen(!isLyricsOpen)}
          onSeek={(time) => setProgress(time)}
          onNext={() =>
            handlePlay(
              MOCK_SONGS[
                (MOCK_SONGS.findIndex((s) => s.id === currentSong?.id) + 1) %
                  MOCK_SONGS.length
              ]
            )
          }
          onPrev={() =>
            handlePlay(
              MOCK_SONGS[
                (MOCK_SONGS.findIndex((s) => s.id === currentSong?.id) -
                  1 +
                  MOCK_SONGS.length) %
                  MOCK_SONGS.length
              ]
            )
          }
          onPlaySong={handlePlay}
          onShare={() => handleShare(actionItem)} // Share current song action
        />
      )}

      {/* Action Sheet Modal */}
      <ActionSheet
        isOpen={actionSheetOpen}
        onClose={() => setActionSheetOpen(false)}
        item={actionItem}
        type={actionType}
        isLiked={actionItem ? likedSongs.has(actionItem.id) : false}
        isListenLater={actionItem ? listenLater.has(actionItem.id) : false}
        onToggleLike={handleToggleLike}
        onToggleListenLater={handleToggleListenLater}
        onAddToPlaylist={handleAddToPlaylist}
        onShare={() => handleShare(actionItem)}
        onReport={handleReport}
      />

      {/* Add To Playlist Modal */}
      <AddToPlaylistModal
        isOpen={addToPlaylistModalOpen}
        onClose={() => setAddToPlaylistModalOpen(false)}
        playlists={myPlaylists}
        onSelectPlaylist={handleConfirmAddToPlaylist}
        onCreateNew={() => {
          setAddToPlaylistModalOpen(false);
          setCurrentPage("create-playlist");
        }}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        item={shareItem}
      />

      {/* Support Modal */}
      <SupportModal
        isOpen={supportModalOpen}
        onClose={() => setSupportModalOpen(false)}
        initialTopic={supportContext?.topic}
        contextData={supportContext?.data}
      />
    </div>
  );
};

export default App;
