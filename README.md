# LIDERE - Ecossistema de Avaliações

Protótipo estático para teste no GitHub, GitHub Pages ou Vercel.

## O que tem nesta versão

- Login por CPF e senha.
- Perfis: ADM, GERENCIA e USUARIO.
- Tipos: ADMINISTRATIVO, LIDER e LIDERADO.
- ADM com acesso total.
- Gerência com visão geral de gestão.
- Líder com visão dos liderados.
- Liderado com avaliações disponíveis, pendentes, realizadas e encerradas.
- Cadastro e edição de usuários.
- Status ativo/inativo controlando acesso.
- Troca de senha.
- Criação de atividades/avaliações.
- Perguntas com mídia opcional.
- Respostas salvas localmente.
- Resultado dinâmico.
- Histórico.
- Logos Pedra/LIDERE aplicados.

## Acessos de teste

### ADM
CPF: `11122233344`  
Senha: `Adm@1234`

### Gerência
CPF: `22233344455`  
Senha: `Ger@1234`

### Usuário Líder
CPF: `33344455566`  
Senha: `Lid@1234`

### Usuário Liderado
CPF: `44455566677`  
Senha: `User@1234`

## Rodar localmente

Você pode abrir o `index.html` diretamente no navegador.

Com Node:

```bash
npm install
npm run start
```

## Subir para o GitHub

```bash
git init
git add .
git commit -m "primeira versão do sistema LIDERE"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin main
```

Depois ative o GitHub Pages usando **GitHub Actions**.

Veja o arquivo `DEPLOY.md`.

## Limitação desta versão

Esta versão usa `localStorage`. Ela funciona para teste, mas não é multiusuário real.

Para produção será necessário:
- Backend/API
- Banco de dados
- Autenticação segura
- Senhas criptografadas
- Permissões no servidor
- Hospedagem com domínio


## Tipografia

A versão v16 está configurada com:

- Títulos: `LOUBAG`
- Textos gerais: `JetBrains Mono`

### Sobre a fonte LOUBAG

A fonte LOUBAG precisa estar instalada no computador ou adicionada ao projeto como arquivo licenciado.

Para usar no site publicado, adicione o arquivo:

```text
assets/fonts/loubag.woff2
```

O projeto já contém a pasta `assets/fonts/README.md` explicando isso.

### JetBrains Mono

A fonte JetBrains Mono é carregada pelo Google Fonts no `index.html`.


## Tela principal / Portal

A versão v17 adiciona uma tela anterior ao login com dois acessos:

- **LIDERE**: direciona para a tela de login do sistema atual.
- **ECI 2026 — 14° Encontro Construindo Ideias**: abre uma página profissional de “em breve”.

Essa tela usa a identidade Pedra/LIDERE e está preparada para futuramente receber uma área própria do ECI.


## Novidades da versão 18

- Botões da tela principal agora ficam um embaixo do outro.
- Adicionado botão `Somos Pedra`.
- Botão `Somos Pedra` funciona como retorno para a home/tela principal.
- Botões de voltar no login e no ECI também usam o nome `Somos Pedra`.


## Estrutura de páginas v19

A versão v19 separa o portal em páginas reais:

- `index.html` — Home principal **Somos Pedra**.
- `lidere.html` — Login e sistema completo do **LIDERE**.
- `eci.html` — Página **ECI 2026** com logo e mensagem de “em breve”.

No GitHub Pages, a página inicial será automaticamente o `index.html`.


## Ajuste v20 — Logos em PNG

A versão v20 usa os arquivos reais da pasta `assets`:

```text
assets/lidere.png
assets/eci.png
assets/logo.png
assets/logo_preto.png
```

O arquivo `eci-2026-logo.svg` foi removido para evitar confusão.

A home `index.html` usa:
- `assets/lidere.png` no card do LIDERE.
- `assets/eci.png` no card e na página do ECI.


## Ajuste v21

Na home `Somos Pedra`, os botões agora mostram apenas os logos:

- Logo LIDERE
- Logo ECI 2026

Foram removidos título, descrição e chamada de texto dos cards da home.


## Ajuste v22

A home `Somos Pedra` agora usa o logo:

```text
assets/somos.png
```

O texto principal `Somos Pedra` foi substituído pelo logo criado.


## Ajuste v23

- Cards/botões da home `Somos Pedra` ficaram menores.
- Logos da home agora aparecem coloridos.
- Removido efeito em tons de cinza do:
  - logo `somos.png`
  - logo `lidere.png`
  - logo `eci.png`


## Ajuste v24

- Fundo externo da home ficou mais escuro.
- A área interna dos cards/botões foi preservada clara.
- Botões/cards da home ficaram menores.
- Botões/cards ficaram mais centralizados.


## Ajuste v25

Cor amarela institucional atualizada para:

```text
#d8c713
```

A cor foi aplicada em botões, linhas de destaque, barras de progresso, hover, badges e acentos visuais.


## Ajuste v26

Removida a etiqueta/botão `SOMOS PEDRA` do canto superior da home.


## Ajuste v27 — LIDERE

- Logo `assets/lidere.png` no lugar do texto LIDERE.
- Botão `← Somos Pedra` em amarelo.
- Logo da Pedra reposicionado para baixo do texto principal.
- Tela do LIDERE refinada para aparência mais pronta/final.


## Ajuste v28 — LIDERE

Alterações aplicadas:
- Mantidos apenas 3 perfis:
  - ADM — Pedro Gonçalves
  - GERÊNCIA — Bruna Zandona
  - USUÁRIO — Livia Marques
- Inversão visual da tela do LIDERE:
  - esquerda clara
  - direita escura
- Remoção dos círculos do fundo
- Ajuste do texto para caber melhor em telefone


## Ajuste v29

Aplicado o padrão solicitado:

- somente amarelo `#d8c713`
- remoção do visual dourado
- remoção de degradês/gradientes nos principais elementos

Agora os botões e destaques usam amarelo sólido.


## Ajuste v30

- Removido o texto “Use CPF e senha. Os acessos de teste estão abaixo.”
- Tela do LIDERE compactada para reduzir necessidade de rolagem
- Logo da Pedra exibido no final da tela em visão de telefone


## Ajuste v31

- Bloco `Acessos de demonstração` ficou menor
- Cards dos acessos ficaram mais compactos
- Área de login ficou mais enxuta para caber melhor na tela


## Ajuste v32 — Visão do usuário

- Usuário vê apenas:
  - Minhas atividades
  - Atividades realizadas
- Minhas atividades mostra atividades pendentes/disponíveis.
- Atividades realizadas mostra respostas enviadas e resultados anteriores.
- Ao responder, o usuário pode sair sem perder respostas já marcadas.
- As respostas ficam salvas como rascunho local até finalizar.
