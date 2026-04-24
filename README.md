# 夢 Yumē Sushi & More — Site Web Premium

Site Next.js 14 pour le restaurant **Yumē Sushi & More** à Casablanca. Design dark luxury japonais avec animations 3D, parallax scrolling et effets premium.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3-cyan?logo=tailwindcss)
![Three.js](https://img.shields.io/badge/Three.js-r166-black?logo=three.js)

---

## ✨ Features

- 🎨 **Dark luxury japonais** — palette noir profond, or, rouge carmin
- 🌸 **Animations 3D** — Three.js + React Three Fiber (orbes avec distortion material)
- 📜 **Parallax scrolling** — effets scroll-driven sur chaque section (Framer Motion)
- 🎯 **Curseur custom** — curseur interactif avec mix-blend-mode + barre de progression
- 🌐 **Bilingue FR/EN** — switch instantané avec Context API
- 🍣 **Cards 3D tilt** — hover mouse-tracking sur menu et à propos
- 🎭 **Marquee galerie** — scroll-driven horizontal parallax + lightbox
- 🌺 **Sakura petals** — pétales animés en CSS pur
- 📝 **Formulaires** — réservation + contact avec API routes Next.js
- 🗺️ **Carte Google Maps** — intégrée avec filtre dark
- ⚡ **Performance** — Next.js 14 App Router, fonts optimisées, lazy loading
- 📱 **Responsive** — mobile-first, du téléphone au 4K

---

## 🚀 Installation rapide

```bash
# 1. Installer les dépendances
npm install

# 2. (Optionnel) Copier le fichier d'environnement
cp .env.example .env.local
# Puis remplir les variables SMTP si tu veux activer les emails

# 3. Lancer le serveur de développement
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000) dans ton navigateur.

---

## 📁 Structure

```
yume-sushi/
├── app/
│   ├── api/
│   │   ├── contact/route.ts       # Endpoint formulaire contact
│   │   └── reservation/route.ts   # Endpoint réservation
│   ├── globals.css                # Styles globaux + animations CSS
│   ├── layout.tsx                 # Root layout (fonts, metadata)
│   └── page.tsx                   # Homepage
├── components/
│   ├── Navigation.tsx             # Nav sticky + switch FR/EN
│   ├── Hero.tsx                   # Hero avec 3D + sakura + parallax
│   ├── About.tsx                  # Histoire + stats animés + tilt card
│   ├── Menu.tsx                   # Menu filtrable + cards 3D
│   ├── Gallery.tsx                # Marquee parallax + lightbox
│   ├── Reservation.tsx            # Formulaire réservation
│   ├── Order.tsx                  # Livraison / à emporter
│   ├── Contact.tsx                # Contact + Google Maps
│   ├── Footer.tsx                 # Footer complet
│   └── CursorAndProgress.tsx      # Curseur custom + scroll progress
├── lib/
│   ├── language-context.tsx       # Provider FR/EN
│   └── translations.ts            # Toutes les traductions
├── package.json
├── tailwind.config.js             # Thème custom (couleurs, animations)
├── tsconfig.json
└── next.config.js
```

---

## 🎨 Personnalisation

### Changer les textes
Tous les textes sont dans `lib/translations.ts` — structure séparée pour `fr` et `en`.

### Changer le menu
Éditer la section `menu.items` dans `lib/translations.ts` :
```ts
items: [
  { name: 'Saumon Royal', desc: '...', price: '95', category: 'sushi' },
  // ...
]
```

### Changer les images
- **Hero tilt card** : dans `components/About.tsx` — ligne `backgroundImage`
- **Galerie** : tableau `galleryImages` en haut de `components/Gallery.tsx`
- **Menu cards** : objet `menuImages` en haut de `components/Menu.tsx`

Remplace les URLs Unsplash par tes propres photos (mets-les dans `/public/images/` et utilise `/images/photo.jpg`).

### Changer les couleurs
Dans `tailwind.config.js` — les palettes `ink`, `gold`, `crimson`.

### Activer les emails de réservation
1. Installer Nodemailer : `npm install nodemailer @types/nodemailer`
2. Dans `.env.local`, remplir les variables SMTP
3. Décommenter le code dans `app/api/reservation/route.ts`

### Lien Glovo réel
Dans `components/Order.tsx`, remplace `https://glovoapp.com` par le vrai lien Glovo du restaurant.

### Téléphone réel
Dans `components/Order.tsx`, remplace `tel:+212000000000` par le vrai numéro.

---

## 🚢 Déploiement

### Vercel (recommandé)
```bash
npm i -g vercel
vercel
```
Ou connecte le repo sur [vercel.com](https://vercel.com).

### Build de production
```bash
npm run build
npm start
```

---

## 🛠️ Stack technique

| Tech | Usage |
|------|-------|
| **Next.js 14** | App Router, Server Components, API Routes |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling utility-first |
| **Framer Motion** | Animations, scroll-triggered, layout animations |
| **Three.js + R3F** | 3D orbes du hero |
| **@react-three/drei** | Helpers 3D (Float, Sphere, MeshDistortMaterial) |
| **Lucide React** | Icônes |
| **Google Fonts** | Cormorant Garamond + Outfit + Noto Serif JP |

---

## 📞 Infos restaurant

- **Nom** : Yumē Sushi & More
- **Adresse** : Boulevard Oued Melouiya, Hay Hassani, Casablanca
- **Note Google** : ⭐ 4.9/5 (299+ avis)
- **Horaires** : 7j/7 · 12h - 23h
- **Prix moyen** : 100-150 MAD / personne
- **Instagram** : [@yumesushis](https://www.instagram.com/yumesushis/)
- **Google Maps** : [Voir sur Maps](https://maps.app.goo.gl/qQcvTDfVPtHaxQWt7)

---

Crafted with 🍣 in Casablanca · 2026
