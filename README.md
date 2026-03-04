<div align="center">

```
███████╗ █████╗ ████████╗██╗
██╔════╝██╔══██╗╚══██╔══╝██║
█████╗  ███████║   ██║   ██║
██╔══╝  ██╔══██║   ██║   ██║
██║     ██║  ██║   ██║   ██║
╚═╝     ╚═╝  ╚═╝   ╚═╝   ╚═╝

```

**Fake-site Analysis & Threat Intelligence**

*Extension anti-phishing avec IA pour Chrome & Firefox*

[![NestJS](https://img.shields.io/badge/Backend-NestJS-E0234E?style=flat-square&logo=nestjs)](https://nestjs.com)
[![ONNX](https://img.shields.io/badge/ML-ONNX%20Runtime-005CED?style=flat-square&logo=onnx)](https://onnxruntime.ai)
[![Chrome Extension](https://img.shields.io/badge/Extension-Chrome%20%2F%20Firefox-4285F4?style=flat-square&logo=googlechrome)](https://developer.chrome.com/docs/extensions/)
[![License](https://img.shields.io/badge/Licence-MIT-22c55e?style=flat-square)](LICENSE)

</div>


---

## Architecture

```
trust_scan/
├── backlink-checker/ # Module d'analyse des backlinks
│ ├── src/
│ └── package.json
│
├── internal-linking/ # Module d'analyse des liens internes
│ ├── src/
│ └── package.json
│
├── trust_scan/ # Module principal — orchestration & scoring
│ ├── src/
│ │ ├── trust_scan.controller.ts
│ │ ├── trust_scan.service.ts
│ │ └── scoring/
│ └── package.json
│
├── extension/ # Extension Chrome / Firefox (Manifest V3)
│ ├── manifest.json
│ ├── background.js
│ ├── content.js
│ └── popup/
│
├── trustscan.html # Interface web standalone (sans extension)
└── trust_scan_train_export_ONNX.ipynb # Notebook d'entraînement & export ONNX
```

---

## Installation

### Prérequis

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- Chrome ou Firefox (dernière version)

### 1. API Backend (NestJS)

```bash
# Cloner le dépôt
git clone https://github.com/Mouhammadou-DIA/trust_scan.git
cd trust_scan/trust_scan

# Installer les dépendances
npm install

# Démarrer en développement
npm run start

# Ou en mode watch
npm run start:dev
```

> L'API est disponible sur **http://localhost:3001**

### 2. Extension Chrome

```
1. Ouvrir Chrome → chrome://extensions/
2. Activer le "Mode développeur" (coin supérieur droit)
3. Cliquer "Charger l'extension non empaquetée"
4. Sélectionner le dossier extension/
5. L'extension analyse automatiquement chaque page visitée
```

### 3. Extension Firefox

```
1. Ouvrir Firefox → about:debugging
2. "Ce Firefox" → "Charger un module temporaire"
3. Sélectionner extension/manifest.json
```

---

## Endpoints API

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/trust_scan/analyze?url=<url>` | Analyse complète (score + détails) |
| `GET` | `/backlink-checker?url=<url>` | Analyse des backlinks uniquement |
| `GET` | `/internal-linking?url=<url>` | Analyse des liens internes uniquement |

### Exemple de réponse — `/trust_scan/analyze`

```json
{
"url": "https://exemple-suspect.com",
"score": 74,
"level": "DANGEROUS",
"details": {
"url_structure": { "score": 22, "weight": 0.30, "flags": ["typosquatting", "sous-domaine_suspect"] },
"backlinks": { "score": 16, "weight": 0.20, "count": 3 },
"internal_links":{ "score": 20, "weight": 0.25, "broken": 12 },
"nlp_content": { "score": 16, "weight": 0.25, "status": "pending_onnx" }
},
"recommendation": "Ne pas soumettre d'informations personnelles sur ce site."
}
```

---

## Système de scoring

Le score final (0–100) est calculé à partir de quatre signaux pondérés :

```
Score = (URL × 0.30) + (Backlinks × 0.20) + (Liens internes × 0.25) + (NLP × 0.25)
```

| Score | Niveau | Couleur | Action recommandée |
|-------|--------|---------|-------------------|
| 0 – 30 | **SAFE** | Vert | Aucune — site fiable |
| 31 – 60 | **SUSPICIOUS** | Jaune | Vigilance recommandée |
| 61 – 80 | **DANGEROUS** | Orange | Éviter de soumettre des données |
| 81 – 100 | **BLOCKED** | Rouge | Site bloqué automatiquement |

### Détail des signaux

| Signal | Poids | Ce qui est analysé |
|--------|-------|-------------------|
| **Structure URL** | 30% | Longueur, sous-domaines, typosquatting, mots-clés sensibles, TLD inhabituel |
| **Backlinks** | 20% | Nombre de domaines référents, autorité des sources, ancienneté |
| **Liens internes** | 25% | Liens brisés, ratio liens externes/internes, redirections suspectes |
| **NLP / Contenu** | 25% | Détection de contenu frauduleux via modèles ONNX *(en cours d'intégration)* |

---

## Modèles ML (ONNX)

Le notebook `trust_scan_train_export_ONNX.ipynb` contient :

- **Préparation des données** — dataset de sites phishing/légitimes labelisés
- **Entraînement** — modèle de classification texte (TF-IDF + RandomForest / DistilBERT)
- **Export ONNX** — conversion pour inférence embarquée dans l'API NestJS
- **Évaluation** — métriques F1, précision, rappel sur jeu de test

```bash
# Lancer le notebook
jupyter notebook trust_scan_train_export_ONNX.ipynb
```

---

## Variables d'environnement

Créer un fichier `.env` à la racine de `trust_scan/` :

```env
PORT=3001
API_KEY_MAJESTIC=your_key_here # Optionnel — backlinks enrichis
API_KEY_VIRUSTOTAL=your_key_here # Optionnel — réputation IP/domaine
ONNX_MODEL_PATH=./models/trust_scan.onnx
```

---

## Roadmap

- [x] Analyse structurelle des URLs
- [x] Module backlink checker
- [x] Module liens internes
- [x] Extension Chrome (Manifest V3)
- [x] Interface web standalone (`trustscan.html`)
- [ ] Intégration modèles ONNX (NLP)
- [ ] Support Firefox finalisé
- [ ] Dashboard SMSI centralisé
- [ ] Export rapports PDF
- [ ] Alertes Webhook / SIEM

---

## Contribution

Les contributions sont les bienvenues. Merci de suivre ce workflow :

```bash
git checkout -b feature/ma-fonctionnalite
# ... vos modifications ...
git commit -m "feat: description claire"
git push origin feature/ma-fonctionnalite
# Ouvrir une Pull Request
```

---

## Licence

Ce projet est distribué sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

<div align="center">
<sub>Développé dans le cadre d'un projet <strong>SMSI</strong> — Système de Management de la Sécurité de l'Information</sub>
</div>
