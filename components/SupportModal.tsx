import React, { useState } from 'react';
import { X, Send, AlertTriangle, MessageSquare, Bug, CheckCircle } from 'lucide-react';
import { Button } from './Button';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: 'bug' | 'content_report' | 'general';
  contextData?: string; // ID of song/artist being reported
}

export const SupportModal: React.FC<SupportModalProps> = ({ 
  isOpen, 
  onClose, 
  initialTopic = 'general',
  contextData
}) => {
  const [topic, setTopic] = useState(initialTopic);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  const handleClose = () => {
      setIsSubmitted(false);
      setMessage('');
      onClose();
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={handleClose} />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 animate-in zoom-in-95 duration-200">
        
        {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                        {topic === 'bug' && <Bug className="text-rose-500" />}
                        {topic === 'content_report' && <AlertTriangle className="text-yellow-500" />}
                        {topic === 'general' && <MessageSquare className="text-blue-500" />}
                        {topic === 'bug' ? 'Report a Bug' : topic === 'content_report' ? 'Report Content' : 'Contact Support'}
                    </h2>
                    <button type="button" onClick={handleClose} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                {contextData && topic === 'content_report' && (
                    <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg text-xs text-zinc-500 mb-4 font-mono truncate">
                        Reference ID: {contextData}
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Topic</label>
                        <select 
                            value={topic}
                            onChange={(e) => setTopic(e.target.value as any)}
                            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                        >
                            <option value="general">General Question</option>
                            <option value="bug">Report a Bug</option>
                            <option value="content_report">Report Content Issue</option>
                            <option value="billing">Billing & Subscription</option>
                            <option value="feature">Feature Request</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Details</label>
                        <textarea 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            className="w-full h-32 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none placeholder-zinc-400"
                            placeholder="Describe your issue or feedback here..."
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <Button type="button" variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button type="submit" disabled={!message.trim()}>
                        <Send size={16} className="mr-2" /> Submit
                    </Button>
                </div>
            </form>
        ) : (
            <div className="p-8 text-center">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Message Sent</h3>
                <p className="text-zinc-500 dark:text-zinc-400 mb-6">
                    Thanks for your feedback! Our team will review it shortly.
                </p>
                <Button onClick={handleClose} className="w-full">
                    Close
                </Button>
            </div>
        )}
      </div>
    </div>
  );
};