import React from 'react';
import { OrderData } from './Checkout';

interface OrderConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    orderData: OrderData | null;
}

const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({ isOpen, onClose, orderData }) => {
    if (!isOpen || !orderData) return null;

    const paymentMethodNames = {
        pix: 'PIX',
        card: 'Cartão de Crédito/Débito',
        cash: 'Dinheiro'
    };

    const deliveryTypeNames = {
        pickup: 'Retirada no Local',
        delivery: 'Entrega em Casa'
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="bg-stone-900 rounded-3xl max-w-2xl w-full border border-amber-500/30 shadow-2xl overflow-hidden animate-scale-in">
                {/* Header com animação */}
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+')] opacity-20"></div>

                    {/* Botão Fechar X - Melhorado para maior visibilidade */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full bg-white hover:bg-red-500 text-stone-950 hover:text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-lg border-2 border-stone-950/10"
                        aria-label="Fechar modal"
                        title="Fechar"
                    >
                        <svg className="w-6 h-6 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 animate-bounce-slow">
                            <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="font-display text-xl text-stone-950 mb-2">PEDIDO CONFIRMADO!</h2>
                        <p className="text-stone-800 font-medium text-sm">Seu pedido foi recebido com sucesso</p>
                    </div>
                </div>

                <div className="p-8 space-y-6">
                    {/* Informações do Pedido */}
                    <div className="bg-stone-950 rounded-xl p-6 border border-stone-800">
                        <h3 className="font-display text-xl text-amber-500 mb-4 flex items-center gap-2">
                            <span>📋</span>
                            Detalhes do Pedido
                        </h3>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b border-stone-800">
                                <span className="text-stone-400 text-sm">Forma de Pagamento</span>
                                <span className="text-white font-semibold">{paymentMethodNames[orderData.paymentMethod]}</span>
                            </div>

                            <div className="flex justify-between items-center py-2 border-b border-stone-800">
                                <span className="text-stone-400 text-sm">Tipo de Entrega</span>
                                <span className="text-white font-semibold">{deliveryTypeNames[orderData.deliveryType]}</span>
                            </div>

                            {orderData.deliveryType === 'delivery' && orderData.address && (
                                <div className="py-2 border-b border-stone-800">
                                    <span className="text-stone-400 text-sm block mb-2">Endereço de Entrega</span>
                                    <p className="text-white text-sm">
                                        {orderData.address.street}, {orderData.address.number}
                                        {orderData.address.complement && ` - ${orderData.address.complement}`}
                                        <br />
                                        {orderData.address.neighborhood}, {orderData.address.city}
                                    </p>
                                </div>
                            )}

                            <div className="flex justify-between items-center py-3 bg-amber-500/10 rounded-lg px-4 mt-4">
                                <span className="text-amber-400 font-semibold">Total</span>
                                <span className="text-amber-500 font-display text-2xl">R$ {orderData.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Informações de Contato */}
                    <div className="bg-gradient-to-br from-stone-950 to-stone-900 rounded-xl p-6 border border-stone-800">
                        <h3 className="font-display text-xl text-amber-500 mb-4 flex items-center gap-2">
                            <span>📞</span>
                            Contato e Suporte
                        </h3>

                        <p className="text-stone-300 text-sm mb-4">
                            Tem alguma dúvida sobre seu pedido? Entre em contato conosco:
                        </p>

                        <div className="space-y-3">
                            {/* WhatsApp */}
                            <a
                                href="https://wa.me/5511999999999"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3 bg-green-600/20 hover:bg-green-600/30 border border-green-600/30 rounded-lg transition-all group"
                            >
                                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <p className="text-green-400 font-semibold text-sm">WhatsApp</p>
                                    <p className="text-stone-300 text-xs">(11) 99999-9999</p>
                                </div>
                                <svg className="w-5 h-5 text-green-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </a>

                            {/* Telefone */}
                            <a
                                href="tel:+551133333333"
                                className="flex items-center gap-3 p-3 bg-amber-600/20 hover:bg-amber-600/30 border border-amber-600/30 rounded-lg transition-all group"
                            >
                                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-stone-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <p className="text-amber-400 font-semibold text-sm">Telefone</p>
                                    <p className="text-stone-300 text-xs">(11) 3333-3333</p>
                                </div>
                                <svg className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </a>

                            {/* Email */}
                            <a
                                href="mailto:contato@jeburgues.com.br"
                                className="flex items-center gap-3 p-3 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/30 rounded-lg transition-all group"
                            >
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <p className="text-blue-400 font-semibold text-sm">E-mail</p>
                                    <p className="text-stone-300 text-xs">contato@jeburgues.com.br</p>
                                </div>
                                <svg className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Mensagem de Agradecimento */}
                    <div className="text-center pt-4">
                        <p className="text-stone-400 text-sm mb-2">
                            🍔 Obrigado pela preferência!
                        </p>
                        <p className="text-stone-500 text-xs">
                            Seu hambúrguer está sendo preparado com muito carinho
                        </p>
                    </div>

                    {/* Botão Fechar */}
                    <button
                        onClick={onClose}
                        className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold uppercase tracking-widest rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Entendido
                    </button>
                </div>
            </div>

            <style>{`
        @keyframes scale-in {
          from { 
            transform: scale(0.9);
            opacity: 0;
          }
          to { 
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default OrderConfirmationModal;
