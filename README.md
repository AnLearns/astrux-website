# Astrux

Accurate Astrology. Clear Guidance.

## Project Structure

```
astrux/
├── apps/
│   ├── web/          # Next.js web application
│   ├── mobile/       # Flutter mobile application
│   └── archive/      # Archived static website
└── packages/
    └── api/          # Python FastAPI backend
```

## Getting Started

### Web App (Next.js)

```bash
cd apps/web
npm install
npm run dev
```

### Mobile App (Flutter)

```bash
cd apps/mobile
flutter pub get
flutter run
```

### API (Python FastAPI)

```bash
cd packages/api
pip install -r requirements.txt
python main.py
```

## Tech Stack

- **Web**: Next.js 16, React 19, Tailwind CSS 4, TypeScript
- **Mobile**: Flutter, Dart
- **API**: Python, FastAPI
