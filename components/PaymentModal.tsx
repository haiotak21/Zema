
import React, { useState } from 'react';
import { X, CheckCircle, Loader2, Smartphone, CreditCard, QrCode, Wallet } from 'lucide-react';
import { Button } from './Button';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount?: string;
  planName?: string;
}

type PaymentProvider = 'telebirr' | 'chapa' | 'santimpay';

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, amount, planName }) => {
  const [step, setStep] = useState<'select' | 'processing' | 'success'>('select');
  const [selectedProvider, setSelectedProvider] = useState<PaymentProvider | null>(null);

  if (!isOpen) return null;

  const handlePayment = (provider: PaymentProvider) => {
    setSelectedProvider(provider);
    setStep('processing');
    
    // Simulate API call
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  const reset = () => {
      setStep('select');
      setSelectedProvider(null);
      onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={reset} />
      
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 animate-in zoom-in-95 duration-200">
        
        {step === 'select' && (
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Checkout</h3>
                        {amount && <p className="text-sm text-zinc-500">Total: <span className="font-bold text-zinc-900 dark:text-white">{amount}</span></p>}
                    </div>
                    <button onClick={reset} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full text-zinc-500">
                        <X size={20} />
                    </button>
                </div>

                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-4">Select Payment Method</p>
                
                <div className="space-y-3">
                    <button 
                        onClick={() => handlePayment('telebirr')}
                        className="w-full flex items-center gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all group"
                    >
                        <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                            <Smartphone size={24} />
                        </div>
                        <div className="flex-1 text-left">
                            <h4 className="font-bold text-zinc-900 dark:text-white">Telebirr</h4>
                            <p className="text-xs text-zinc-500">Mobile Money</p>
                        </div>
                        <div className="w-4 h-4 rounded-full border-2 border-zinc-300 dark:border-zinc-700 group-hover:border-blue-500 group-hover:bg-blue-500 transition-colors"></div>
                    </button>

                    <button 
                        onClick={() => handlePayment('chapa')}
                        className="w-full flex items-center gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-all group"
                    >
                        <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                            <CreditCard size={24} />
                        </div>
                        <div className="flex-1 text-left">
                            <h4 className="font-bold text-zinc-900 dark:text-white">Chapa</h4>
                            <p className="text-xs text-zinc-500">Cards & Bank Transfer</p>
                        </div>
                        <div className="w-4 h-4 rounded-full border-2 border-zinc-300 dark:border-zinc-700 group-hover:border-emerald-500 group-hover:bg-emerald-500 transition-colors"></div>
                    </button>

                    <button 
                        onClick={() => handlePayment('santimpay')}
                        className="w-full flex items-center gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 hover:border-amber-500 dark:hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-all group"
                    >
                        <div className="w-12 h-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                            <QrCode size={24} />
                        </div>
                        <div className="flex-1 text-left">
                            <h4 className="font-bold text-zinc-900 dark:text-white">SantimPay</h4>
                            <p className="text-xs text-zinc-500">QR & Wallet</p>
                        </div>
                        <div className="w-4 h-4 rounded-full border-2 border-zinc-300 dark:border-zinc-700 group-hover:border-amber-500 group-hover:bg-amber-500 transition-colors"></div>
                    </button>
                </div>
            </div>
        )}

        {step === 'processing' && (
            <div className="p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-6 relative">
                    <div className="absolute inset-0 rounded-full border-4 border-zinc-100 dark:border-zinc-800"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-rose-500 border-t-transparent animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        {selectedProvider === 'telebirr' && <Smartphone className="text-blue-500" />}
                        {selectedProvider === 'chapa' && <CreditCard className="text-emerald-500" />}
                        {selectedProvider === 'santimpay' && <QrCode className="text-amber-500" />}
                    </div>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Processing Payment</h3>
                <p className="text-zinc-500">Please confirm on your device if prompted.</p>
            </div>
        )}

        {step === 'success' && (
            <div className="p-12 text-center animate-in zoom-in-95">
                <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 dark:text-emerald-500">
                    <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Payment Successful!</h3>
                <p className="text-zinc-500 mb-8">You are now subscribed to {planName || 'Premium'}.</p>
                <Button onClick={reset} className="w-full">Done</Button>
            </div>
        )}
      </div>
    </div>
  );
};
