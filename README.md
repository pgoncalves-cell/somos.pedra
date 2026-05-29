# Somos Pedra / LIDERE / ECI 2026

Projeto estático pronto para publicar no GitHub Pages.

## Estrutura

Os arquivos principais ficam na raiz do projeto:

```text
index.html
lidere.html
eci.html
app.js
styles.css
logo.png
logo_preto.png
lidere.png
eci.png
somos.png
.nojekyll
.github/workflows/pages.yml
```

## Importante sobre imagens

O código está configurado para buscar as imagens na mesma pasta dos arquivos HTML, sem `assets/`.

Garanta que estes arquivos estejam na raiz do repositório:

```text
logo.png
logo_preto.png
lidere.png
eci.png
somos.png
```

## Páginas

- `index.html` — Home Somos Pedra
- `lidere.html` — Sistema LIDERE
- `eci.html` — Página ECI 2026

## Publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie todos os arquivos desta pasta para o repositório.
3. Vá em **Settings > Pages**.
4. Em **Build and deployment**, selecione **GitHub Actions**.
5. Faça push na branch `main`.
6. Aguarde a action finalizar.

## Comandos

```bash
git init
git add .
git commit -m "publicacao inicial somos pedra lidere eci"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin main
```
