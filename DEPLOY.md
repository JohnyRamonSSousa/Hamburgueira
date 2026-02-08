# 🚀 Guia de Deploy na Vercel

## Pré-requisitos

✅ Conta no GitHub  
✅ Conta na Vercel  
✅ Projeto Firebase configurado  

---

## Passo a Passo

### 1. Preparar o Repositório Git

```bash
# Se ainda não inicializou o git
git init

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Preparar projeto para deploy"

# Criar repositório no GitHub e conectar
git remote add origin https://github.com/seu-usuario/seu-repositorio.git
git branch -M main
git push -u origin main
```

### 2. Deploy na Vercel

#### Opção A: Via Vercel Dashboard (Recomendado)

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com sua conta GitHub
3. Clique em **"Add New Project"**
4. Selecione seu repositório do GitHub
5. Configure o projeto:
   - **Framework Preset:** Vite
   - **Root Directory:** ./
   - **Build Command:** `npm run build` (já configurado)
   - **Output Directory:** `dist` (já configurado)

#### Opção B: Via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer deploy
vercel

# Seguir prompts interativos
# Deploy de produção
vercel --prod
```

### 3. Configurar Variáveis de Ambiente na Vercel

> ⚠️ **IMPORTANTE:** Não commite suas credenciais do Firebase!

1. No dashboard da Vercel, vá em **Settings** → **Environment Variables**
2. Adicione as seguintes variáveis (do arquivo `.env.example`):

```
VITE_FIREBASE_API_KEY=AIzaSyAuaQ__9qXlxzMiabwXnVAjhXES5YnVOLc
VITE_FIREBASE_AUTH_DOMAIN=fiflow-353d6.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=fiflow-353d6
VITE_FIREBASE_STORAGE_BUCKET=fiflow-353d6.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=1030644570289
VITE_FIREBASE_APP_ID=1:1030644570289:web:6a9fac0a7d67e9a8d96a90
```

3. Clique em **"Save"**
4. **Redeploy** o projeto para aplicar as variáveis

---

## Verificações Pós-Deploy

### ✅ Checklist

- [ ] Site carrega corretamente
- [ ] Menu de hambúrgueres aparece
- [ ] Carrinho funciona
- [ ] Checkout abre e aceita dados
- [ ] Pedidos são salvos no Firebase
- [ ] Console do navegador não mostra erros

### 🔍 Testar Pedido Completo

1. Adicione itens ao carrinho
2. Vá ao checkout
3. Preencha todos os dados
4. Finalize o pedido
5. Verifique no Firebase Console se o pedido foi salvo

### 📊 Monitorar Firebase

Acesse: [Firebase Console](https://console.firebase.google.com/)
- Vá em **Firestore Database**
- Verifique a coleção `orders`
- Confirme que novos pedidos aparecem em tempo real

---

## URLs Importantes

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Firebase Console:** https://console.firebase.google.com/project/fiflow-353d6
- **Documentação Vercel:** https://vercel.com/docs

---

## Troubleshooting

### Erro: "Firebase not initialized"

**Solução:** Verifique se as variáveis de ambiente estão configuradas na Vercel

### Erro: "Build failed"

**Solução:** 
```bash
# Teste o build localmente primeiro
npm run build

# Se funcionar localmente, limpe cache na Vercel e redeploy
```

### Pedidos não salvam no Firebase

**Solução:** 
1. Verifique permissões do Firestore (Firebase Console → Firestore → Rules)
2. Regras devem permitir escrita:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /orders/{document=**} {
      allow read, write: if true; // Para desenvolvimento
      // Em produção, adicione autenticação adequada
    }
  }
}
```

---

## Atualizações Futuras

Quando fizer mudanças no código:

```bash
git add .
git commit -m "Descrição das mudanças"
git push
```

A Vercel fará **deploy automático** a cada push! 🎉

---

## Configurações Opcionais

### Domínio Personalizado

1. Na Vercel: **Settings** → **Domains**
2. Adicione seu domínio
3. Configure DNS conforme instruções

### Analytics

1. Na Vercel: **Analytics** → **Enable**
2. Monitore tráfego e performance

---

## Comandos Úteis

```bash
# Build local para teste
npm run build

# Preview do build
npm run preview

# Desenvolvimento local
npm run dev

# Deploy via CLI
vercel --prod
```

---

## 🎉 Projeto Pronto!

Seu projeto de hamburgueria está pronto para produção com:
- ✅ Firebase integrado
- ✅ Checkout sem login
- ✅ Persistência de pedidos
- ✅ Deploy automatizado
- ✅ Variáveis de ambiente seguras

**URL de Produção:** Será fornecida pela Vercel após o deploy

---

💡 **Dica:** Salve a URL de produção e compartilhe com seus clientes!
