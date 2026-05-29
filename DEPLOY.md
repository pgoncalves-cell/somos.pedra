# Deploy no GitHub / GitHub Pages

Este projeto é estático: `index.html`, `styles.css`, `app.js` e `assets/`.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie todos os arquivos desta pasta para o repositório.
3. No GitHub, vá em **Settings > Pages**.
4. Em **Build and deployment**, escolha:
   - **Source:** GitHub Actions
5. Faça um push na branch `main`.
6. Aguarde a Action `Deploy static site to GitHub Pages` finalizar.
7. O link será exibido em **Settings > Pages**.

## Rodar localmente antes de subir

Com Node instalado:

```bash
npm install
npm run start
```

Ou abra diretamente o `index.html` no navegador.

## Publicar na Vercel

1. Suba o projeto no GitHub.
2. Importe o repositório na Vercel.
3. Framework: **Other** ou **Static**.
4. Build command: deixe vazio.
5. Output directory: `.`

## Observação importante

Esta versão usa `localStorage`.

Isso significa:
- Funciona para teste visual e fluxo local.
- Os dados ficam salvos no navegador de cada pessoa.
- Em GitHub Pages, cada usuário verá sua própria base local.
- Para multiusuário real, será necessário backend + banco de dados.


## Páginas principais

- Home: `index.html`
- LIDERE: `lidere.html`
- ECI 2026: `eci.html`
