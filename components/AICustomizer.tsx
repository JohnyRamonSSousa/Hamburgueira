
import React, { useState, useRef } from 'react';
import { editBurgerImage } from '../services/gemini';

const AICustomizer: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!image || !prompt) return;

    setIsLoading(true);
    setError(null);
    try {
      const editedImageUrl = await editBurgerImage(image, prompt);
      setResult(editedImageUrl);
    } catch (err: any) {
      setError(err.message || 'Falha ao editar imagem. Verifique sua conexão ou chave de API.');
    } finally {
      setIsLoading(false);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <section id="ai-stylist" className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1 bg-amber-500/10 text-amber-500 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-amber-500/20">
              Novo: Estilista IA Gemini 2.5
            </span>
            <h2 className="font-display text-5xl mb-4">RE-IMAGINE SEU HAMBÚRGUER</h2>
            <p className="text-stone-400">Envie uma foto do seu hambúrguer e diga ao nosso chef IA como melhorá-lo. "Adicione mais bacon", "Deixe com visual retrô dos anos 80", "Mude o fundo para uma lanchonete neon".</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Input Side */}
            <div className="space-y-6">
              {/* Fix: changed invalid 'flex-center' to 'items-center justify-center' */}
              <div 
                onClick={triggerUpload}
                className={`relative aspect-square rounded-2xl border-2 border-dashed transition-all cursor-pointer flex items-center justify-center overflow-hidden bg-stone-950/50 ${
                  image ? 'border-amber-500/50' : 'border-stone-700 hover:border-stone-500'
                }`}
              >
                {image ? (
                  <img src={image} className="w-full h-full object-cover" alt="Fonte" />
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-stone-500 font-semibold">Clique para enviar sua foto</p>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Como devemos estilizá-lo?</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder='Ex: "Deixe com muito queijo e adicione um filtro vintage"'
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl p-4 text-sm focus:outline-none focus:border-amber-500 transition-colors min-h-[100px] resize-none"
                />
              </div>

              <button 
                disabled={!image || !prompt || isLoading}
                onClick={handleEdit}
                className="w-full py-4 bg-amber-500 text-stone-950 font-bold uppercase tracking-widest rounded-xl hover:bg-amber-400 disabled:opacity-50 disabled:hover:bg-amber-500 transition-all flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-stone-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processando Imagem...</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Aplicar Estilo IA</span>
                  </>
                )}
              </button>
              {error && <p className="text-red-500 text-xs font-semibold">{error}</p>}
            </div>

            {/* Output Side */}
            <div className="aspect-square rounded-2xl border border-stone-800 bg-stone-950 relative overflow-hidden">
              {result ? (
                <img src={result} className="w-full h-full object-cover" alt="Resultado Estilista IA" />
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-4">
                  {isLoading ? (
                     <div className="space-y-4 text-center">
                        <div className="w-16 h-16 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mx-auto"></div>
                        <p className="text-stone-500 animate-pulse">Consultando o Chef IA...</p>
                     </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-stone-900 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <p className="text-stone-600 text-sm">Sua imagem estilizada aparecerá aqui</p>
                    </>
                  )}
                </div>
              )}
              {result && (
                 <div className="absolute top-4 right-4 bg-amber-500 text-stone-950 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                   Estilizado por IA
                 </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Visual background flairs */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"></div>
    </section>
  );
};

export default AICustomizer;
