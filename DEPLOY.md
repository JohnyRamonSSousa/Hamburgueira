# 🚀 Guia de Deploy na Vercel

## Pré-requisitos

- Conta na [Vercel](https://vercel.com)
- Repositório Git (GitHub, GitLab ou Bitbucket)
- Chave da API do Google Gemini

## 📋 Passos para Deploy

### 1. Preparar o Repositório

Certifique-se de que seu código está em um repositório Git:

```bash
git add .
git commit -m "Preparar projeto para deploy na Vercel"
git push origin main
```

### 2. Importar Projeto na Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em **"Add New Project"**
3. Selecione seu repositório Git
4. A Vercel detectará automaticamente que é um projeto Vite

### 3. Configurar Variáveis de Ambiente

Na página de configuração do projeto, adicione as seguintes variáveis de ambiente:

| Nome | Valor |
|------|-------|
| `GEMINI_API_KEY` | Sua chave da API do Google Gemini |

> **Como obter a chave da API:**
> 1. Acesse [Google AI Studio](https://makersuite.google.com/app/apikey)
> 2. Faça login com sua conta Google
> 3. Crie ou copie sua API key
> 4. Cole a chave na Vercel

### 4. Deploy

1. Clique em **"Deploy"**
2. Aguarde o processo de build (1-3 minutos)
3. Seu site estará disponível em `https://seu-projeto.vercel.app`

## 🔧 Configurações do Projeto

O arquivo `vercel.json` já está configurado com:

- ✅ Build command: `npm run build`
- ✅ Output directory: `dist`
- ✅ Framework: Vite
- ✅ SPA routing (redirecionamento para index.html)

## 🔄 Deploy Automático

Após o deploy inicial, a Vercel automaticamente:

- Faz deploy a cada push na branch principal (main/master)
- Cria preview deployments para pull requests
- Disponibiliza logs de build e runtime

## 🛠️ Comandos Úteis

```bash
# Testar build localmente
npm run build

# Testar preview da build
npm run preview

# Desenvolvimento local
npm run dev
```

## 📱 Domínio Personalizado

Para adicionar um domínio personalizado:

1. Acesse as configurações do projeto na Vercel
2. Vá em **"Domains"**
3. Adicione seu domínio
4. Configure os registros DNS conforme instruções

## ⚠️ Troubleshooting

### Build falha com erro de API Key

- Verifique se a variável `GEMINI_API_KEY` está configurada
- Confirme que a chave é válida no Google AI Studio

### Página em branco após deploy

- Verifique o console do navegador para erros
- Confirme que as variáveis de ambiente estão corretas
- Verifique os logs de runtime na Vercel

### Erros 404 ao navegar

- O arquivo `vercel.json` já está configurado para resolver isso
- Se persistir, verifique se o arquivo está no repositório

## 📞 Suporte

- [Documentação Vercel](https://vercel.com/docs)
- [Discord da Vercel](https://vercel.com/discord)
- [Documentação Vite](https://vitejs.dev/)

---

**Projeto:** JE Burguês - O Futuro do Sabor  
**Stack:** React 19 + TypeScript + Vite + Google Gemini AI
