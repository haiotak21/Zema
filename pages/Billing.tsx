
import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Clock, CheckCircle, AlertCircle, Download, MoreHorizontal, Plus } from 'lucide-react';
import { Button } from '../components/Button';
import { PaymentModal } from '../components/PaymentModal';

interface BillingProps {
    onBack: () => void;
}

export const Billing: React.FC<BillingProps> = ({ onBack }) => {
    const [isAddMethodOpen, setIsAddMethodOpen] = useState(false);
    
    // Mock History Data
    const history = [
        { id: 'inv_001', date: 'Oct 24, 2024', amount: '199 ETB', plan: 'Premium Monthly', status: 'Paid', method: 'Telebirr' },
        { id: 'inv_002', date: 'Sep 24, 2024', amount: '199 ETB', plan: 'Premium Monthly', status: 'Paid', method: 'Chapa (Visa)' },
        { id: 'inv_003', date: 'Aug 24, 2024', amount: '199 ETB', plan: 'Premium Monthly', status: 'Paid', method: 'SantimPay' },
        { id: 'inv_004', date: 'Jul 24, 2024', amount: '199 ETB', plan: 'Premium Monthly', status: 'Failed', method: 'Telebirr' },
    ];

    return (
        <div className="max-w-4xl mx-auto pb-12 animate-in fade-in slide-in-from-right-4">
            <PaymentModal 
                isOpen={isAddMethodOpen} 
                onClose={() => setIsAddMethodOpen(false)} 
            />

            <header className="flex items-center gap-4 mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-6">
                <button onClick={onBack} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-600 dark:text-zinc-400">
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Billing & History</h1>
                    <p className="text-sm text-zinc-500 mt-0.5">Manage your payment methods and view order history.</p>
                </div>
            </header>

            <div className="space-y-8">
                
                {/* Current Plan & Payment Method */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Plan */}
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Current Plan</p>
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Zema Premium</h3>
                                <p className="text-sm text-zinc-500">Renews on Nov 24, 2024</p>
                            </div>
                            <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded">Active</span>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <Button variant="secondary" size="sm">Change Plan</Button>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">Cancel</Button>
                        </div>
                    </div>

                    {/* Card */}
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Payment Method</p>
                                <div className="flex items-center gap-3">
                                    <div className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded text-blue-600">
                                        <CreditCard size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-zinc-900 dark:text-white text-sm">Telebirr •••• 9201</p>
                                        <p className="text-xs text-zinc-500">Default</p>
                                    </div>
                                </div>
                            </div>
                            <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>
                        <div className="mt-6">
                            <Button variant="secondary" size="sm" className="w-full" onClick={() => setIsAddMethodOpen(true)}>
                                <Plus size={16} className="mr-2" /> Add Payment Method
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Order History */}
                <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                    <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50">
                        <h3 className="font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                            <Clock size={18} /> Order History
                        </h3>
                    </div>
                    <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {history.map((item) => (
                            <div key={item.id} className="p-4 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-full ${item.status === 'Paid' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-500' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-500'}`}>
                                        {item.status === 'Paid' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                                    </div>
                                    <div>
                                        <p className="font-medium text-zinc-900 dark:text-white text-sm">{item.date}</p>
                                        <p className="text-xs text-zinc-500">{item.plan} • {item.method}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <span className="font-mono text-sm text-zinc-700 dark:text-zinc-300">{item.amount}</span>
                                    <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors" title="Download Invoice">
                                        <Download size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};
