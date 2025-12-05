import React, { useState } from "react";
import { Button } from "../components/Button";
import { UserRole, User } from "../types";
import { Logo } from "../components/Logo";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { Sun, Moon } from "lucide-react";

interface LoginProps {
  onLogin: (user: User) => void;
  onSwitchToRegister: () => void;
  onSwitchToForgotPassword: () => void;
}

export const Login: React.FC<LoginProps> = ({
  onLogin,
  onSwitchToRegister,
  onSwitchToForgotPassword,
}) => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    (async () => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          alert(data.error || "Login failed");
          return;
        }
        // Persist token then notify app
        if (data.token) localStorage.setItem("token", data.token);
        onLogin(data.user);
      } catch (err) {
        console.error(err);
        alert("Network error during login");
      }
    })();
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

      <div className="w-full max-w-md z-10 animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-10">
          <div className="mb-6 flex justify-center">
            <Logo className="h-16 w-auto" />
          </div>
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Continue your musical journey.
          </p>
        </div>

        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 shadow-xl dark:shadow-2xl">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
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
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors placeholder-zinc-400 dark:placeholder-zinc-600"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={onSwitchToForgotPassword}
                    className="text-xs text-rose-600 dark:text-rose-500 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                  >
                    Forgot?
                  </button>
                </div>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors placeholder-zinc-400 dark:placeholder-zinc-600"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button
              className="w-full mt-8 h-12 text-lg shadow-lg shadow-rose-600/20 dark:shadow-rose-900/20"
              type="submit"
            >
              Log In
            </Button>

            <p className="text-center text-zinc-500 text-sm mt-6">
              Don't have an account?{" "}
              <span
                onClick={onSwitchToRegister}
                className="text-rose-600 dark:text-rose-500 hover:text-rose-500 dark:hover:text-rose-400 cursor-pointer font-medium"
              >
                Sign Up
              </span>
            </p>
          </form>
        </div>

        <div className="mt-8 text-center text-zinc-500 dark:text-zinc-600 text-xs">
          <p>© 2024 Zema Music Platform. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
