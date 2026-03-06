# ESPN Fantasy Hockey Analyzer

A fullstack web application that analyzes your ESPN Fantasy Hockey league. It identifies recommended free agent pickups on NHL power play 1 units and flags drop candidates on your roster who are not on PP1.

## How It Works

1. The app connects to your ESPN Fantasy Hockey league using credentials stored as environment variables
2. On load, it fetches all teams in your league and displays them with their records
3. Select your team to run an analysis that:
   - Scrapes all 32 NHL team pages for current PP1 line data
   - Cross-references free agents in your league who are on PP1 units
   - Identifies players on your roster who are **not** on a PP1 unit as drop candidates

## Tech Stack

**Frontend:**

- React 19 with TypeScript
- Vite (build tool / dev server)
- Tailwind CSS
- Nginx (production serving)

**Backend:**

- Python 3.13 with FastAPI

- espn-api (ESPN Fantasy league integration)
- BeautifulSoup4 + lxml (web scraping)
- httpx (async HTTP client)
- python-dotenv (environment variable loading)

**Infrastructure:**

- Docker + Docker Compose
- Railway (production deployment)

## Environment Variables

| Variable | Description |
|----------|-------------|
| `ESPN_SWID` | Your ESPN SWID cookie (format: `{XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX}`) |
| `ESPN_S2` | Your ESPN S2 authentication cookie |
| `LEAGUE_ID` | Your ESPN Fantasy Hockey league ID |

To find your ESPN credentials, log into ESPN Fantasy in your browser, open DevTools > Application > Cookies, and copy the `SWID` and `espn_s2` values.

## Running Locally

### Prerequisites

- Python 3.13+
- Node.js 20+

### Setup

1. Clone the repo and create a `.env` file in the `backend/` directory:

   ```txt
   ESPN_SWID={YOUR-SWID-HERE}
   ESPN_S2=YOUR_ESPN_S2_TOKEN_HERE
   LEAGUE_ID=YOUR_LEAGUE_ID_HERE
   ```

2. Install dependencies:

   ```bash
   # Backend
   cd backend
   pip install -r requirements.txt

   # Frontend
   cd frontend
   npm install
   ```

3. Start the backend:

   ```bash
   cd backend
   uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
   ```

4. Start the frontend (separate terminal):

   ```bash
   cd frontend
   npx vite
   ```

5. Open http://localhost:5173

The Vite dev server proxies `/api` requests to the backend on port 8000.

## Docker

### Docker Compose (development)

1. Create a `.env` file at the project root with the environment variables listed above.

2. Run:

   ```bash
   docker compose up --build
   ```

   - Frontend: http://localhost:5173
   - Backend: http://localhost:8000

### Production Build

The frontend Dockerfile uses a multi-stage build (Node build step, then Nginx to serve static files). The backend runs uvicorn directly. Set `VITE_API_URL` as a build arg for the frontend if the backend is hosted at a different URL.
