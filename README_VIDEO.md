# 🎥 Configuration de la Vidéo de Fond

## Option 1 : Utiliser une vidéo locale

1. **Téléchargez une vidéo** d'étudiants ou d'apprentissage (format MP4, WebM)
2. **Placez-la** dans le dossier `public/videos/`
3. **Modifiez** `src/pages/Home.jsx` :

```jsx
<video
  autoPlay
  loop
  muted
  playsInline
  className="absolute inset-0 w-full h-full object-cover"
>
  <source src="/videos/hero-video.mp4" type="video/mp4" />
  <source src="/videos/hero-video.webm" type="video/webm" />
</video>
```

## Option 2 : Utiliser des vidéos gratuites en ligne

### Sites recommandés pour télécharger des vidéos gratuites :

1. **Pexels Videos** - https://www.pexels.com/videos/
   - Recherchez : "students studying", "online learning", "education"
   
2. **Coverr** - https://coverr.co/
   - Catégorie : Education, Technology
   
3. **Pixabay Videos** - https://pixabay.com/videos/
   - Recherchez : "classroom", "e-learning", "students"

4. **Videvo** - https://www.videvo.net/
   - Section : Education

### Vidéos suggérées (thème éducation) :

- Étudiants travaillant sur ordinateur
- Bibliothèque avec étudiants
- Cours en ligne / visioconférence
- Personnes prenant des notes
- Tablettes/ordinateurs avec contenu éducatif

## Option 3 : Vidéos CDN (actuellement utilisé)

Le code utilise actuellement des vidéos depuis Coverr CDN :
```jsx
<source src="https://cdn.coverr.co/videos/coverr-students-studying-in-library-6324/1080p.mp4" type="video/mp4" />
```

**Avantages** : Pas besoin de télécharger, chargement rapide
**Inconvénients** : Dépend d'un service externe

## 🎨 Personnalisation

### Changer l'overlay (couleur de fond)

Dans `src/pages/Home.jsx`, modifiez :

```jsx
{/* Gradient Overlay - Ajustez l'opacité et les couleurs */}
<div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/85 to-secondary-900/90"></div>
```

**Opacité** : `/90` = 90% opaque (ajustez entre `/70` et `/95`)

### Désactiver la vidéo (retour au gradient)

Commentez la balise `<video>` et ajustez l'overlay :

```jsx
{/* <video>...</video> */}
<div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-600"></div>
```

## 📱 Performance & Optimisation

### Taille de vidéo recommandée :
- **Résolution** : 1920x1080 (Full HD) ou 1280x720 (HD)
- **Durée** : 10-30 secondes (en boucle)
- **Poids** : < 5 MB (compressé)
- **Format** : MP4 (H.264) + WebM (VP9) pour compatibilité

### Compression vidéo :

Utilisez **HandBrake** ou **FFmpeg** :

```bash
# Avec FFmpeg
ffmpeg -i input.mp4 -vcodec libx264 -crf 28 -preset fast output.mp4
```

### Lazy Loading (optionnel)

Pour améliorer les performances sur mobile :

```jsx
<video
  autoPlay
  loop
  muted
  playsInline
  loading="lazy"
  className="absolute inset-0 w-full h-full object-cover"
>
```

## 🎬 Vidéos Alternatives Gratuites

### Liens directs (exemples) :

1. **Étudiants avec ordinateurs** :
   - https://cdn.coverr.co/videos/coverr-online-learning-on-laptop-5128/1080p.mp4

2. **Bibliothèque** :
   - https://cdn.coverr.co/videos/coverr-students-studying-in-library-6324/1080p.mp4

3. **Cours en ligne** :
   - https://cdn.coverr.co/videos/coverr-woman-attending-online-class-5127/1080p.mp4

## 🚀 Résultat

Avec la vidéo en fond, vous obtenez :
- ✅ Hero section dynamique et moderne
- ✅ Overlay sombre pour lisibilité du texte
- ✅ Lecture automatique en boucle
- ✅ Indicateur de scroll animé
- ✅ Responsive (adapté mobile)

---

**Astuce** : Testez plusieurs vidéos pour trouver celle qui correspond le mieux à l'identité de votre plateforme e-Hianatra ! 🎓
