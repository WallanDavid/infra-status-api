# 📊 Infra Status API + Dashboard

Painel de monitoramento em tempo real com dados do [UptimeRobot](https://uptimerobot.com/), construído com:

- 🐍 FastAPI (Backend)  
- ⚡ React + Vite + Tailwind (Frontend)  
- 🐳 Docker + Docker Compose  
- 📈 Chart.js via react-chartjs-2  

---

## 📸 Demonstração

![screenshot](./docs/screenshot.png)

---

## 🚀 Como rodar localmente

### 1. Clone o projeto

```bash
git clone https://github.com/seunome/infra-status-api.git
cd infra-status-api
```

### 2. Crie um arquivo `.env`

Crie o arquivo `.env` com sua API Key do UptimeRobot e os IDs dos monitores:

```env
UPTIMEROBOT_API_KEY=suachaveaqui
UPTIMEROBOT_MONITORS=12345678-87654321-98765432
```

Você pode listar vários monitores separados por hífen.

### 3. Execute com Docker

```bash
docker-compose up --build
```

- Frontend: http://localhost:5173  
- Backend API: http://localhost:8000/status

---

## 🧱 Estrutura do projeto

```bash
infra-status-api/
├── infra-dashboard/         # Frontend React
├── services/                # Lógica para integração com UptimeRobot
├── .env                     # Chaves secretas
├── main.py                  # FastAPI App
├── requirements.txt         # Dependências Python
├── Dockerfile.backend       # Container backend
├── Dockerfile.frontend      # Container frontend
└── docker-compose.yml       # Orquestração
```

---

## 🖼️ Interface

- Lista todos os monitores definidos no `.env`  
- Mostra o status e o gráfico de resposta (ms) de cada monitor  
- Atualização automática a cada 30 segundos  

---

## 🐳 Docker Compose

### Backend – `Dockerfile.backend`

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt && pip install --no-cache-dir uvicorn[standard]
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Frontend – `Dockerfile.frontend`

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY infra-dashboard/ .
RUN npm install && npm run build
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "5173"]
```

### Compose – `docker-compose.yml`

```yaml
services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile.backend
    ports:
      - "8000:8000"
    env_file:
      - .env

  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "5173:5173"
```

---

## 🛠 Tecnologias utilizadas

- FastAPI  
- UptimeRobot API v2  
- React + Vite  
- Tailwind CSS  
- Chart.js  
- Docker  

---

## 🧪 Futuras melhorias

- 📦 Deploy gratuito (Render, Railway ou Vercel)  
- 📧 Alerta por e-mail em caso de queda  
- 📥 Exportação de histórico  
- 🔐 Autenticação de painel  
- 🎨 Temas (dark/light)  

---

## 🧑‍💻 Autor

Desenvolvido por **Wallan**  
📧 bobwallan2@gmail.com  
🔗 [github.com/WallanDavid](https://github.com/WallanDavid)
