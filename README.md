# 🍜 Sistema de Gestão de Restaurante (PDV Sampaiollo)

![Status](https://img.shields.io/badge/status-em_desenvolvimento-yellowgreen)
![Java](https://img.shields.io/badge/Java-17-blue)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-brightgreen)
![Angular](https://img.shields.io/badge/Angular-18-red)
![Docker](https://img.shields.io/badge/Docker-gray?logo=docker)

Sistema PDV (Ponto de Venda) full-stack construído com Angular (Frontend), Spring Boot (Backend) e PostgreSQL, totalmente containerizado com Docker e Docker Compose.

## ✨ Funcionalidades

- **Autenticação & Autorização:** Sistema de login com JWT e controle de acesso por cargos (Admin/Funcionário).
- **Gestão de Pedidos:** Criação de pedidos para Mesas, Balcão e Entrega.
- **Cardápio Dinâmico:** Cadastro, edição, exclusão e visualização de produtos com imagens e descrições.
- **Controle de Caixa:**
    - **Fechamento de Caixa:** Rotina para zerar os pedidos do dia e reiniciar a contagem.
    - **Sangria:** Registro de retiradas de dinheiro do caixa.
- **Relatórios:**
    - Resumo diário de faturamento (vendas - sangrias).
    - Filtro por período de datas.
    - Visualização detalhada de todos os pedidos de um dia específico.
    - Histórico de sangrias.
- **Gestão Completa:** CRUDs para Funcionários e Clientes.

## 🚀 Como Executar o Projeto

Este projeto é totalmente containerizado, então a única dependência que você precisa ter instalada é o **Docker Desktop**.

### Pré-requisitos
- [Git](https://git-scm.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git](https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git)
    cd SEU_REPOSITORIO
    ```

2.  **Inicie a aplicação com Docker Compose:**
    Este comando irá construir as imagens do frontend e backend, e iniciar os três contêineres (banco de dados, backend e frontend).
    ```bash
    docker-compose up --build
    ```
    Aguarde até que os logs se estabilizem. Na primeira vez, pode levar alguns minutos para baixar e construir tudo.

3.  **Acesse a aplicação:**
    Abra seu navegador e acesse: `http://localhost:4200`

4.  **Credenciais Padrão:**
    - **Login:** `admin`
    - **Senha:** (a senha que você configurou para o admin padrão)

5.  **Para parar a aplicação:**
    No terminal onde o `docker-compose` está rodando, pressione `Ctrl + C` e depois execute:
    ```bash
    docker-compose down
    ```

## 🛠️ Tecnologias Utilizadas

### Backend
- **Java 17**
- **Spring Boot 3**
- **Spring Security** (com autenticação JWT)
- **Spring Data JPA (Hibernate)**
- **PostgreSQL**
- **Maven**

### Frontend
- **Angular 18**
- **TypeScript**
- **HTML / CSS**

### DevOps
- **Docker & Docker Compose**
- **Nginx** (como servidor web para o Angular)

## 👤 Autor

**Raí Tobias**
- [GitHub](https://github.com/Raishsh)
- [LinkedIn](https://www.linkedin.com/in/raitobias777/)