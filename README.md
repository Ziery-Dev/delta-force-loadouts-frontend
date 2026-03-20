# Delta Force Loadouts - Frontend

## 📌 Sobre o projeto

Interface web desenvolvida em Vue 3 para consumo da API de builds de armas.

A aplicação permite visualizar, cadastrar e interagir com builds de forma dinâmica, com controle de autenticação e permissões.

---

## 🚀 Tecnologias utilizadas

- Vue 3
- Pinia (gerenciamento de estado)
- Vue Router
- Axios
- CSS / SCSS

---

## 🔐 Autenticação

- Login com JWT
- Persistência de sessão via localStorage
- Interceptor para tratamento automático de 401
- Redirecionamento automático em caso de sessão expirada

---

## ⚙️ Funcionalidades

- Listagem de builds com paginação
- Busca por arma ou criador
- Filtros por alcance
- Ordenação por data, likes e dislikes
- Cadastro e edição de builds
- Sistema de favoritos
- Sistema de avaliação (like/dislike)
- Área administrativa (armas, operadores, usuários)

---

## 🧠 Arquitetura

- views → páginas principais
- components → componentes reutilizáveis
- stores → estado global com Pinia
- router → controle de navegação e permissões
- utils → Axios, notificações e helpers

---

## 💬 Feedback de interface

- erros de formulário exibidos inline
- notificações globais para ações e erros
- indicadores de loading em listagens e ações
- feedback visual em botões (ex: removendo...)

---

## ▶️ Como rodar

1. Instalar dependências:
```bash
npm install
