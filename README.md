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
