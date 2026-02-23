import React, { useState, useEffect } from 'react';
import { User, CartItem } from '../types';
import { db } from '../firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User | null;
}

interface OrderRecord {
    id: string;
    createdAt: Date;
    items: CartItem[];
    total: number;
    status: 'pending' | 'preparing' | 'delivered';
    deliveryType: 'pickup' | 'delivery';
    paymentMethod: 'pix' | 'card' | 'cash';
}

const statusLabel: Record<string, { label: string; color: string }> = {
    pending: { label: 'Pendente', color: 'text-amber-400 bg-amber-400/10 border-amber-400/30' },
    preparing: { label: 'Preparando', color: 'text-blue-400  bg-blue-400/10  border-blue-400/30' },
    delivered: { label: 'Entregue', color: 'text-green-400 bg-green-400/10 border-green-400/30' },
};

const paymentLabel: Record<string, string> = {
    pix: '📱 PIX',
    card: '💳 Cartão',
    cash: '💵 Dinheiro',
};

const deliveryLabel: Record<string, string> = {
    pickup: '🏪 Retirada',
    delivery: '🏠 Entrega',
};

const getUserInitials = (name: string) =>
    name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, user }) => {
    const [orders, setOrders] = useState<OrderRecord[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isOpen || !user) return;

        const fetchOrders = async () => {
            setLoading(true);
            try {
                const q = query(
                    collection(db, 'orders'),
                    where('userId', '==', user.uid),
                    orderBy('createdAt', 'desc')
                );
                const snapshot = await getDocs(q);
                const fetched: OrderRecord[] = snapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        createdAt: data.createdAt?.toDate?.() ?? new Date(),
                        items: data.items ?? [],
                        total: data.total ?? 0,
                        status: data.status ?? 'pending',
                        deliveryType: data.deliveryType ?? 'pickup',
                        paymentMethod: data.paymentMethod ?? 'pix',
                    };
                });
                setOrders(fetched);
            } catch (err) {
                console.error('Erro ao buscar pedidos:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [isOpen, user]);

    if (!isOpen || !user) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-stone-900 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-stone-800 shadow-2xl">

                {/* Header */}
                <div className="sticky top-0 bg-stone-900 border-b border-stone-800 p-6 flex items-center justify-between rounded-t-2xl z-10">
                    <h2 className="font-display text-3xl text-amber-500">Meu Perfil</h2>
                    <button
                        onClick={onClose}
                        className="text-stone-400 hover:text-white transition-colors p-2"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="overflow-y-auto flex-1">
                    {/* Dados do usuário */}
                    <div className="p-6 border-b border-stone-800">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-amber-500/10 border-2 border-amber-500 flex items-center justify-center text-2xl font-bold text-amber-500 flex-shrink-0">
                                {getUserInitials(user.name)}
                            </div>
                            <div>
                                <p className="text-white font-semibold text-lg">{user.name}</p>
                                <p className="text-stone-400 text-sm">{user.email}</p>
                                <p className="text-stone-600 text-xs mt-1">
                                    Membro desde {user.registeredAt.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Histórico de Pedidos */}
                    <div className="p-6">
                        <h3 className="font-display text-xl text-white mb-4 flex items-center gap-2">
                            <span className="text-amber-500">🧾</span>
                            Histórico de Pedidos
                        </h3>

                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="text-center py-12 bg-stone-950 rounded-xl border border-stone-800">
                                <div className="text-5xl mb-4">🍔</div>
                                <p className="text-stone-400 font-semibold">Nenhum pedido ainda</p>
                                <p className="text-stone-600 text-sm mt-1">Seu histórico aparecerá aqui após o primeiro pedido</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.map(order => {
                                    const st = statusLabel[order.status] ?? statusLabel.pending;
                                    return (
                                        <div key={order.id} className="bg-stone-950 rounded-xl border border-stone-800 overflow-hidden">
                                            {/* Card header */}
                                            <div className="flex items-center justify-between px-4 py-3 border-b border-stone-800">
                                                <div>
                                                    <p className="text-xs text-stone-500 font-mono">#{order.id.substring(0, 8).toUpperCase()}</p>
                                                    <p className="text-white text-sm font-semibold mt-0.5">
                                                        {order.createdAt.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${st.color}`}>
                                                    {st.label}
                                                </span>
                                            </div>

                                            {/* Itens */}
                                            <div className="px-4 py-3 space-y-1.5">
                                                {order.items.map((item, i) => (
                                                    <div key={i} className="flex justify-between text-sm">
                                                        <span className="text-stone-300">{item.quantity}x {item.name}</span>
                                                        <span className="text-amber-500 font-semibold">R$ {(item.price * item.quantity).toFixed(2)}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Footer */}
                                            <div className="flex items-center justify-between px-4 py-3 bg-stone-900 border-t border-stone-800">
                                                <div className="flex gap-3 text-xs text-stone-500">
                                                    <span>{deliveryLabel[order.deliveryType]}</span>
                                                    <span>·</span>
                                                    <span>{paymentLabel[order.paymentMethod]}</span>
                                                </div>
                                                <div className="text-white font-display text-base">
                                                    Total: <span className="text-amber-500">R$ {order.total.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;
