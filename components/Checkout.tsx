import React, { useState } from 'react';

const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};
import { CartItem } from '../types';

interface CheckoutProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    onConfirmOrder: (orderData: OrderData) => void;
}

export interface OrderData {
    personalInfo: {
        name: string;
        email: string;
        phone: string;
    };
    paymentMethod: 'pix' | 'card' | 'cash';
    deliveryType: 'pickup' | 'delivery';
    address?: {
        street: string;
        number: string;
        complement?: string;
        neighborhood: string;
        city: string;
    };
    total: number;
}

const Checkout: React.FC<CheckoutProps> = ({ isOpen, onClose, items, onConfirmOrder }) => {
    const [personalInfo, setPersonalInfo] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card' | 'cash'>('pix');
    const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');
    const [address, setAddress] = useState({
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: ''
    });

    const DELIVERY_FEE = 8.00;

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const deliveryFee = deliveryType === 'delivery' ? DELIVERY_FEE : 0;
    const total = subtotal + deliveryFee;

    const handleConfirm = () => {
        const orderData: OrderData = {
            personalInfo,
            paymentMethod,
            deliveryType,
            address: deliveryType === 'delivery' ? address : undefined,
            total
        };
        onConfirmOrder(orderData);
    };

    const isFormValid = () => {
        // Validar dados pessoais obrigatórios
        if (!personalInfo.name || !personalInfo.email || !personalInfo.phone) {
            return false;
        }
        // Validar endereço se for delivery
        if (deliveryType === 'delivery') {
            return address.street && address.number && address.neighborhood && address.city;
        }
        return true;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-stone-900 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col border border-stone-800 shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 bg-stone-900 border-b border-stone-800 p-6 flex items-center justify-between z-10">
                    <div>
                        <h2 className="font-display text-3xl text-amber-500">Finalizar Pedido</h2>
                        <p className="text-stone-400 text-sm mt-1">Confirme os dados para concluir sua compra</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-stone-400 hover:text-white transition-colors p-2"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-y-auto flex-1 pb-24 lg:pb-6">
                    {/* Coluna Principal - Formulário */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Dados Pessoais */}
                        <div className="bg-stone-950 rounded-xl p-6 border border-stone-800">
                            <h3 className="font-display text-xl mb-4 text-white flex items-center gap-2">
                                <span className="text-amber-500">👤</span>
                                Seus Dados
                            </h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-stone-400 mb-2">Nome Completo *</label>
                                        <input
                                            type="text"
                                            value={personalInfo.name}
                                            onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                                            className="w-full bg-stone-900 border border-stone-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                                            placeholder="Seu nome completo"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-stone-400 mb-2">Celular *</label>
                                        <input
                                            type="tel"
                                            value={personalInfo.phone}
                                            onChange={(e) => setPersonalInfo({ ...personalInfo, phone: formatPhone(e.target.value) })}
                                            className="w-full bg-stone-900 border border-stone-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                                            placeholder="(11) 99999-9999"
                                            maxLength={15}
                                            inputMode="numeric"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-stone-400 mb-2">E-mail *</label>
                                    <input
                                        type="email"
                                        value={personalInfo.email}
                                        onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                                        placeholder="seu@email.com"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Tipo de Entrega */}
                        <div className="bg-stone-950 rounded-xl p-6 border border-stone-800">
                            <h3 className="font-display text-xl mb-4 text-white flex items-center gap-2">
                                <span className="text-amber-500">🚚</span>
                                Tipo de Entrega
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button
                                    onClick={() => setDeliveryType('pickup')}
                                    className={`p-4 rounded-lg border-2 transition-all ${deliveryType === 'pickup'
                                        ? 'border-amber-500 bg-amber-500/10'
                                        : 'border-stone-700 hover:border-stone-600'
                                        }`}
                                >
                                    <div className="text-2xl mb-2">🏪</div>
                                    <div className="font-semibold text-white">Retirar no Local</div>
                                    <div className="text-sm text-stone-400 mt-1">Grátis</div>
                                </button>
                                <button
                                    onClick={() => setDeliveryType('delivery')}
                                    className={`p-4 rounded-lg border-2 transition-all ${deliveryType === 'delivery'
                                        ? 'border-amber-500 bg-amber-500/10'
                                        : 'border-stone-700 hover:border-stone-600'
                                        }`}
                                >
                                    <div className="text-2xl mb-2">🏠</div>
                                    <div className="font-semibold text-white">Entrega em Casa</div>
                                    <div className="text-sm text-amber-500 mt-1">+ R$ {DELIVERY_FEE.toFixed(2)}</div>
                                </button>
                            </div>
                        </div>

                        {/* Endereço de Entrega */}
                        {deliveryType === 'delivery' && (
                            <div className="bg-stone-950 rounded-xl p-6 border border-stone-800">
                                <h3 className="font-display text-xl mb-4 text-white flex items-center gap-2">
                                    <span className="text-amber-500">📍</span>
                                    Endereço de Entrega
                                </h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="sm:col-span-2">
                                            <label className="block text-sm text-stone-400 mb-2">Rua *</label>
                                            <input
                                                type="text"
                                                value={address.street}
                                                onChange={(e) => setAddress({ ...address, street: e.target.value })}
                                                className="w-full bg-stone-900 border border-stone-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                                                placeholder="Nome da rua"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-stone-400 mb-2">Número *</label>
                                            <input
                                                type="text"
                                                value={address.number}
                                                onChange={(e) => setAddress({ ...address, number: e.target.value })}
                                                className="w-full bg-stone-900 border border-stone-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                                                placeholder="123"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-stone-400 mb-2">Complemento</label>
                                        <input
                                            type="text"
                                            value={address.complement}
                                            onChange={(e) => setAddress({ ...address, complement: e.target.value })}
                                            className="w-full bg-stone-900 border border-stone-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                                            placeholder="Apartamento, bloco..."
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-stone-400 mb-2">Bairro *</label>
                                            <input
                                                type="text"
                                                value={address.neighborhood}
                                                onChange={(e) => setAddress({ ...address, neighborhood: e.target.value })}
                                                className="w-full bg-stone-900 border border-stone-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                                                placeholder="Nome do bairro"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-stone-400 mb-2">Cidade *</label>
                                            <input
                                                type="text"
                                                value={address.city}
                                                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                                className="w-full bg-stone-900 border border-stone-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                                                placeholder="Nome da cidade"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Forma de Pagamento */}
                        <div className="bg-stone-950 rounded-xl p-6 border border-stone-800">
                            <h3 className="font-display text-xl mb-4 text-white flex items-center gap-2">
                                <span className="text-amber-500">💳</span>
                                Forma de Pagamento
                            </h3>
                            <div className="space-y-3">
                                <button
                                    onClick={() => setPaymentMethod('pix')}
                                    className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-4 ${paymentMethod === 'pix'
                                        ? 'border-amber-500 bg-amber-500/10'
                                        : 'border-stone-700 hover:border-stone-600'
                                        }`}
                                >
                                    <div className="text-2xl">📱</div>
                                    <div className="text-left flex-1">
                                        <div className="font-semibold text-white">PIX</div>
                                        <div className="text-sm text-stone-400">Pagamento instantâneo</div>
                                    </div>
                                    {paymentMethod === 'pix' && (
                                        <div className="text-amber-500">✓</div>
                                    )}
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('card')}
                                    className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-4 ${paymentMethod === 'card'
                                        ? 'border-amber-500 bg-amber-500/10'
                                        : 'border-stone-700 hover:border-stone-600'
                                        }`}
                                >
                                    <div className="text-2xl">💳</div>
                                    <div className="text-left flex-1">
                                        <div className="font-semibold text-white">Cartão</div>
                                        <div className="text-sm text-stone-400">Débito ou crédito</div>
                                    </div>
                                    {paymentMethod === 'card' && (
                                        <div className="text-amber-500">✓</div>
                                    )}
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('cash')}
                                    className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-4 ${paymentMethod === 'cash'
                                        ? 'border-amber-500 bg-amber-500/10'
                                        : 'border-stone-700 hover:border-stone-600'
                                        }`}
                                >
                                    <div className="text-2xl">💵</div>
                                    <div className="text-left flex-1">
                                        <div className="font-semibold text-white">Dinheiro</div>
                                        <div className="text-sm text-stone-400">Pagamento na entrega/retirada</div>
                                    </div>
                                    {paymentMethod === 'cash' && (
                                        <div className="text-amber-500">✓</div>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Coluna Lateral - Resumo do Pedido */}
                    <div className="lg:col-span-1">
                        <div className="bg-stone-950 rounded-xl p-6 border border-stone-800 sticky top-24">
                            <h3 className="font-display text-xl mb-4 text-white">Resumo do Pedido</h3>

                            {/* Itens */}
                            <div className="space-y-3 mb-6 max-h-48 overflow-y-auto">
                                {items.map((item, index) => (
                                    <div key={`${item.id}-${index}`} className="flex justify-between text-sm">
                                        <div className="flex-1">
                                            <div className="text-white">{item.name}</div>
                                            <div className="text-stone-500">Qtd: {item.quantity}</div>
                                        </div>
                                        <div className="text-amber-500 font-semibold">
                                            R$ {(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Totais */}
                            <div className="border-t border-stone-800 pt-4 space-y-2">
                                <div className="flex justify-between text-sm text-stone-400">
                                    <span>Subtotal</span>
                                    <span>R$ {subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-stone-400">
                                    <span>Taxa de Entrega</span>
                                    <span className={deliveryType === 'delivery' ? 'text-amber-500' : ''}>
                                        {deliveryType === 'delivery' ? `R$ ${DELIVERY_FEE.toFixed(2)}` : 'Grátis'}
                                    </span>
                                </div>
                                <div className="border-t border-stone-800 pt-2 flex justify-between font-display text-xl text-white">
                                    <span>Total</span>
                                    <span className="text-amber-500">R$ {total.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Botão Finalizar - desktop */}
                            <button
                                onClick={handleConfirm}
                                disabled={!isFormValid()}
                                className={`hidden lg:block w-full mt-6 py-4 rounded-lg font-semibold text-lg transition-all ${isFormValid()
                                    ? 'bg-amber-500 hover:bg-amber-600 text-stone-950'
                                    : 'bg-stone-800 text-stone-600 cursor-not-allowed'
                                    }`}
                            >
                                Finalizar Pedido
                            </button>

                            {deliveryType === 'delivery' && !isFormValid() && (
                                <p className="hidden lg:block text-xs text-stone-500 mt-2 text-center">
                                    Preencha o endereço de entrega
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Botão Finalizar - mobile fixo no rodapé */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-stone-900 border-t border-stone-800 z-50">
                {deliveryType === 'delivery' && !isFormValid() && (
                    <p className="text-xs text-stone-500 mb-2 text-center">
                        Preencha todos os campos obrigatórios
                    </p>
                )}
                <button
                    onClick={handleConfirm}
                    disabled={!isFormValid()}
                    className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${isFormValid()
                        ? 'bg-amber-500 hover:bg-amber-600 text-stone-950'
                        : 'bg-stone-800 text-stone-600 cursor-not-allowed'
                        }`}
                >
                    Finalizar Pedido
                </button>
            </div>
        </div>
    );
};

export default Checkout;
