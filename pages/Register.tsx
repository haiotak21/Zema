import React, { useState } from "react";
import { UserRole, User } from "../types";
import { Button } from "../components/Button";
import {
  Headphones,
  Mic2,
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  Sun,
  Moon,
} from "lucide-react";
import { Logo } from "../components/Logo";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

interface RegisterProps {
  onRegister: (user: User) => void;
  onSwitchToLogin: () => void;
}

const GENRES = [
  "Traditional",
  "Ethio-Jazz",
  "Tizita",
  "Afrobeats",
  "Hip Hop",
  "Reggae",
  "Gospel",
  "Instrumental",
];

export const Register: React.FC<RegisterProps> = ({
  onRegister,
  onSwitchToLogin,
}) => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole>(UserRole.LISTENER);

  // Unified form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    // Artist Fields
    stageName: "",
    bio: "",
    primaryGenre: "Traditional",
    // Listener Fields
    favoriteGenres: [] as string[],
  });

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleBasicInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.password) {
      setStep(3);
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // mark requested role in localStorage to help route immediately after signup
      if (role === UserRole.ARTIST) localStorage.setItem("requestedRole", "ARTIST");
      const payload: any = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        requestedRole: role,
      };
      if (role === UserRole.ARTIST) {
        payload.extra = {
          stageName: formData.stageName,
          bio: formData.bio,
          primaryGenre: formData.primaryGenre,
        };
      } else {
        payload.extra = { favoriteGenres: formData.favoriteGenres };
      }

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        // cleanup requestedRole marker on failure
        if (role === UserRole.ARTIST) localStorage.removeItem("requestedRole");
        alert(data.error || "Registration failed");
        return;
      }
      if (data.token) localStorage.setItem("token", data.token);
      // Ensure the app knows this user requested an artist account immediately
      try {
        if (role === UserRole.ARTIST) {
          data.user.requestedRole = "ARTIST";
          // remove the temporary localStorage marker now that we attached it to the user
          localStorage.removeItem("requestedRole");
        }
      } catch (err) {
        // ignore if data.user isn't shaped as expected
      }
      onRegister(data.user);
    } catch (err) {
      if (role === UserRole.ARTIST) localStorage.removeItem("requestedRole");
      console.error(err);
      alert("Network error during registration");
    }
  };

  const toggleGenre = (genre: string) => {
    setFormData((prev) => {
      const current = prev.favoriteGenres;
      if (current.includes(genre))
        return { ...prev, favoriteGenres: current.filter((g) => g !== genre) };
      return { ...prev, favoriteGenres: [...current, genre] };
    });
  };

  const goBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "am" : "en");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-black p-4 relative overflow-hidden transition-colors duration-300">
      {/* Top Right Toggles */}
      <div className="absolute top-4 right-4 flex gap-3 z-20">
        <button
          onClick={toggleLanguage}
          className="p-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors font-bold text-xs w-10 h-10 flex items-center justify-center"
          title="Switch Language"
        >
          {language === "en" ? "አማ" : "EN"}
        </button>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
          title="Toggle Theme"
        >
          {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-600/10 dark:from-rose-900/20 via-zinc-200/0 dark:via-zinc-900/0 to-zinc-200/0 dark:to-zinc-900/0 pointer-events-none"></div>

      <div className="w-full max-w-lg z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4 flex justify-center">
            <Logo className="h-12 w-auto" />
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            {step === 1 && "Choose Account Type"}
            {step === 2 && "Create Your Account"}
            {step === 3 &&
              (role === UserRole.LISTENER
                ? "Personalize Your Feed"
                : "Artist Profile")}
          </h1>

          {/* Step Indicators */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-300 ${
                  s === step
                    ? "w-8 bg-rose-600"
                    : s < step
                    ? "w-2 bg-rose-200 dark:bg-rose-900"
                    : "w-2 bg-zinc-200 dark:bg-zinc-800"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 shadow-xl dark:shadow-2xl overflow-hidden relative min-h-[400px]">
          {/* Direct to basic credential step — role selection removed for test/production parity */}

          {/* STEP 1: ROLE SELECTION */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
              <p className="text-center text-zinc-500 dark:text-zinc-400 mb-6">
                How do you want to use Zema?
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleRoleSelect(UserRole.LISTENER)}
                  className="relative p-6 rounded-2xl border-2 border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-500 hover:scale-[1.02] transition-all duration-300 flex flex-col items-center gap-4 group"
                >
                  <div className="p-4 bg-white dark:bg-zinc-900 rounded-full group-hover:bg-rose-500/20 group-hover:text-rose-600 dark:group-hover:text-rose-500 transition-colors shadow-sm">
                    <Headphones
                      size={32}
                      className="text-zinc-400 group-hover:text-rose-600 dark:group-hover:text-rose-500"
                    />
                  </div>
                  <div className="text-center">
                    <span className="font-bold text-lg block text-zinc-900 dark:text-white">
                      Listener
                    </span>
                    <span className="text-xs text-zinc-500 mt-2 block">
                      Discover music, create playlists, and support artists.
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleSelect(UserRole.ARTIST)}
                  className="relative p-6 rounded-2xl border-2 border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-500 hover:scale-[1.02] transition-all duration-300 flex flex-col items-center gap-4 group"
                >
                  <div className="p-4 bg-white dark:bg-zinc-900 rounded-full group-hover:bg-emerald-500/20 group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors shadow-sm">
                    <Mic2
                      size={32}
                      className="text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-500"
                    />
                  </div>
                  <div className="text-center">
                    <span className="font-bold text-lg block text-zinc-900 dark:text-white">
                      Artist
                    </span>
                    <span className="text-xs text-zinc-500 mt-2 block">
                      Upload tracks, manage your profile, and view analytics.
                    </span>
                  </div>
                </button>
              </div>
              <div className="text-center pt-4">
                <p className="text-zinc-500 text-sm">
                  Already have an account?{" "}
                  <span
                    onClick={onSwitchToLogin}
                    className="text-rose-600 dark:text-rose-500 hover:text-rose-500 dark:hover:text-rose-400 cursor-pointer font-medium"
                  >
                    Log In
                  </span>
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: BASIC CREDENTIALS */}
          {step === 2 && (
            <form
              onSubmit={handleBasicInfoSubmit}
              className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-300"
            >
              <div>
                <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-rose-500 transition-colors placeholder-zinc-400 dark:placeholder-zinc-600"
                  placeholder="e.g. Abebe Bikila"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-rose-500 transition-colors placeholder-zinc-400 dark:placeholder-zinc-600"
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">
                  Password
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-rose-500 transition-colors placeholder-zinc-400 dark:placeholder-zinc-600"
                  placeholder="••••••••"
                />
              </div>

              <div className="pt-6 flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setStep(1)}
                  className="w-1/3"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  Next Step <ArrowRight size={18} />
                </Button>
              </div>
            </form>
          )}

          {/* STEP 3: ROLE SPECIFIC DETAILS */}
          {step === 3 && (
            <form
              onSubmit={handleFinalSubmit}
              className="animate-in fade-in slide-in-from-right-8 duration-300"
            >
              {/* Role specific workflow */}
              {role === UserRole.ARTIST ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">
                      Stage Name
                    </label>
                    <input
                      type="text"
                      value={formData.stageName}
                      onChange={(e) =>
                        setFormData({ ...formData, stageName: e.target.value })
                      }
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-rose-500 transition-colors placeholder-zinc-400 dark:placeholder-zinc-600"
                      placeholder={formData.name || "Your Artist Name"}
                    />
                    <p className="text-[10px] text-zinc-500 mt-1">
                      Leave blank to use your full name.
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">
                      Primary Genre
                    </label>
                    <select
                      value={formData.primaryGenre}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          primaryGenre: e.target.value,
                        })
                      }
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-rose-500 transition-colors"
                    >
                      {GENRES.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">
                      Short Bio
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) =>
                        setFormData({ ...formData, bio: e.target.value })
                      }
                      className="w-full h-24 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-rose-500 transition-colors resize-none placeholder-zinc-400 dark:placeholder-zinc-600"
                      placeholder="Tell your fans a bit about yourself..."
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <p className="text-zinc-600 dark:text-zinc-300 mb-4 flex items-center gap-2 text-sm">
                      <Sparkles size={16} className="text-rose-500" /> Select
                      genres you love (pick at least 1)
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {GENRES.map((genre) => (
                        <button
                          type="button"
                          key={genre}
                          onClick={() => toggleGenre(genre)}
                          className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border text-left flex justify-between items-center ${
                            formData.favoriteGenres.includes(genre)
                              ? "bg-rose-600 border-rose-600 text-white shadow-lg shadow-rose-900/40"
                              : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600"
                          }`}
                        >
                          {genre}
                          {formData.favoriteGenres.includes(genre) && (
                            <Check size={16} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-8 flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setStep(2)}
                  className="w-1/3"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1 shadow-lg shadow-rose-600/20 dark:shadow-rose-900/20"
                >
                  Complete Setup
                </Button>
              </div>
            </form>
          )}
        </div>

        <div className="mt-8 text-center text-zinc-500 dark:text-zinc-600 text-xs">
          <p>© 2024 Zema Music Platform. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
