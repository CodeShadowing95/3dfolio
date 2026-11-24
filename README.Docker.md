# Guide Docker (Développement et Exécution)

Ce projet est une application React (Next.js) livrée avec une configuration Docker prête pour le développement local.

## Prérequis
- Docker Desktop installé et en cours d’exécution.
- Ports `3000` disponibles sur la machine.

## Démarrage rapide (mode développement)
La configuration actuelle lance le serveur de développement Next.js dans un conteneur avec rechargement à chaud.

1) Construire et démarrer avec Compose:
   ```bash
   docker compose up --build
   ```
2) Ouvrir l’application:
   - http://localhost:3000

Grâce aux volumes déclarés dans `compose.yaml`, les modifications locales sont automatiquement reflétées dans le conteneur.

### Commandes utiles
- Rebuild après des changements d’images: `docker compose up --build`
- Voir les logs: `docker compose logs -f`
- Arrêter et nettoyer: `docker compose down`

## Exécution sans Compose
Vous pouvez aussi utiliser Docker directement:

```bash
# Construire l’image (dev)
docker build -t 3dfolio:dev .

# Lancer le conteneur
docker run --rm -p 3000:3000 3dfolio:dev
```

## Déploiement (production)
Le `Dockerfile` actuel lance Next.js en mode développement. Pour un déploiement de production, vous pouvez:

1) Construire les fichiers statiques dans une étape build (`npm run build`).
2) Les servir via un serveur statique (Nginx ou `serve`).

Exemple de build multi‑étapes (à adapter au besoin):
```Dockerfile
# Étape de build
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Étape de runtime (Nginx)
FROM nginx:alpine
COPY --from=build /app/out /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build et run:
```bash
docker build -t 3dfolio:prod .
docker run -p 8080:80 3dfolio:prod
```

## Plateformes et registre
Si la cible cloud utilise une autre architecture CPU (ex: vous êtes sur Mac M1, cible en `amd64`):
```bash
docker build --platform=linux/amd64 -t registry.example.com/3dfolio:prod .
docker push registry.example.com/3dfolio:prod
```

## Références
- Guide Docker pour Node.js: https://docs.docker.com/language/nodejs/
