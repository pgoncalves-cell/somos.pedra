
const STORAGE_KEY = "lidere_ecossistema_git_v32";

const profileLabels = {
  analitico: "Analítico",
  colaborativo: "Colaborativo",
  executor: "Executor",
  comunicador: "Comunicador"
};

const profileDescriptions = {
  analitico: "Perfil com foco em análise, organização, precisão e tomada de decisão baseada em dados.",
  colaborativo: "Perfil com foco em equipe, apoio, escuta e construção conjunta de soluções.",
  executor: "Perfil com foco em ação, decisão, entrega e responsabilidade por resultados.",
  comunicador: "Perfil com foco em influência, comunicação, energia e conexão com pessoas."
};

const defaultState = {
  currentUserId: null,
  page: "dashboard",
  answerSession: null,
  users: [
    { id: 1, nome: "Pedro Gonçalves", cpf: "11122233344", senha: "Adm@1234", perfil: "ADM", tipo: "ADMINISTRATIVO", area: "", classId: null, status: "Ativo", mustChange: false },
    { id: 2, nome: "Bruna Zandona", cpf: "22233344455", senha: "Ger@1234", perfil: "GERENCIA", tipo: "ADMINISTRATIVO", area: "", classId: null, status: "Ativo", mustChange: false },
    { id: 3, nome: "Livia Marques", cpf: "33344455566", senha: "Lid@1234", perfil: "USUARIO", tipo: "LIDERADO", area: "", classId: null, status: "Ativo", mustChange: false }
  ],
  relationships: [],
  classes: [],
  courses: [],
  assessments: [
    {
      id: 1,
      titulo: "Perfil Comportamental",
      descricao: "Avalia tendências comportamentais e preferências profissionais.",
      status: "Ativa",
      area: "Geral",
      modeDefault: "single-card",
      responseTimeDays: 7,
      startsAt: "2026-05-20",
      endsAt: "2026-05-27",
      targetAudience: "Usuários",
      createdBy: 1,
      questions: [
        {
          id: 101,
          text: "Qual palavra melhor te descreve?",
          subtitle: "Selecione a opção que mais combina com você.",
          type: "multipla",
          required: true,
          options: [
            { label: "Paciente", scores: { analitico: 2, colaborativo: 3, executor: 0, comunicador: 0 } },
            { label: "Preciso", scores: { analitico: 4, colaborativo: 0, executor: 1, comunicador: 0 } },
            { label: "Decidido", scores: { analitico: 0, colaborativo: 0, executor: 4, comunicador: 1 } },
            { label: "Entusiasta", scores: { analitico: 0, colaborativo: 1, executor: 1, comunicador: 4 } }
          ]
        },
        {
          id: 102,
          text: "Como você reage sob pressão?",
          subtitle: "Escolha a opção que mais combina com o seu comportamento.",
          type: "multipla",
          required: true,
          options: [
            { label: "Mantenho a calma e analiso", scores: { analitico: 4, colaborativo: 1, executor: 0, comunicador: 0 } },
            { label: "Busco apoio da equipe", scores: { analitico: 0, colaborativo: 4, executor: 0, comunicador: 2 } },
            { label: "Tomo decisões rapidamente", scores: { analitico: 0, colaborativo: 0, executor: 4, comunicador: 1 } },
            { label: "Prefiro mais tempo para pensar", scores: { analitico: 3, colaborativo: 1, executor: 0, comunicador: 0 } }
          ]
        }
      ]
    },
    {
      id: 2,
      titulo: "Autoavaliação de Desenvolvimento",
      descricao: "Avaliação rápida sobre organização, foco e comunicação.",
      status: "Encerrada",
      area: "Geral",
      modeDefault: "form",
      responseTimeDays: 5,
      startsAt: "2026-05-10",
      endsAt: "2026-05-15",
      targetAudience: "Usuários",
      createdBy: 2,
      questions: [
        {
          id: 201,
          text: "Como você avalia sua organização?",
          subtitle: "Selecione uma opção.",
          type: "escala",
          required: true,
          options: [
            { label: "1", scores: { comunicador: 1 } },
            { label: "2", scores: { comunicador: 1, colaborativo: 1 } },
            { label: "3", scores: { colaborativo: 2 } },
            { label: "4", scores: { analitico: 2, executor: 1 } },
            { label: "5", scores: { analitico: 3, executor: 2 } }
          ]
        }
      ]
    }
  ],
  assignments: [
    { id: 1, assessmentId: 1, userId: 3, status: "Pendente", assignedAt: "2026-05-20", dueDate: "2026-05-27", result: null, answers: [] },
    { id: 2, assessmentId: 2, userId: 3, status: "Concluída", assignedAt: "2026-05-10", dueDate: "2026-05-15", finishedAt: "2026-05-12", result: { profile: "Analítico", profileKey: "analitico", scores: { analitico: 8, colaborativo: 3, executor: 4, comunicador: 2 } }, answers: [] }
  ],
  files: [],
  auditLogs: [
    { id: 1, userId: 1, action: "Sistema inicializado", createdAt: "2026-05-20 09:00" }
  ]
};

let state = loadState();

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : structuredClone(defaultState);
  } catch {
    return JSON.parse(JSON.stringify(defaultState));
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function resetSystem() {
  if (!confirm("Isso vai apagar os dados locais e restaurar o exemplo inicial. Continuar?")) return;
  localStorage.removeItem(STORAGE_KEY);
  state = structuredClone(defaultState);
  render();
}

function nowId() { return Date.now() + Math.floor(Math.random() * 999); }
function todayISO() { return new Date().toISOString().slice(0, 10); }
function formatDateBR(date) {
  if (!date) return "-";
  const p = String(date).split("-");
  if (p.length !== 3) return date;
  return `${p[2]}/${p[1]}/${p[0]}`;
}
function cleanCpf(cpf) { return String(cpf || "").replace(/\D/g, ""); }
function maskCpf(cpf) {
  const c = cleanCpf(cpf);
  return c.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}
function randomPassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789@#$";
  return Array.from({length: 10}, () => chars[Math.floor(Math.random()*chars.length)]).join("");
}
function currentUser() { return state.users.find(u => u.id === state.currentUserId) || null; }
function isAdm() { return currentUser()?.perfil === "ADM"; }
function isGerencia() { return currentUser()?.perfil === "GERENCIA"; }
function canManage() { return isAdm() || isGerencia(); }
function canAnswer() { return currentUser()?.perfil === "USUARIO"; }
function canEditAssessment(a) {
  if (!canManage()) return false;
  if (isAdm()) return true;
  return a.area === currentUser().area || a.area === "Geral";
}
function visibleUsers() {
  const u = currentUser();
  if (!u) return [];
  const noAdmins = state.users.filter(x => x.perfil !== "ADM");
  if (u.perfil === "ADM") return state.users;
  if (u.perfil === "GERENCIA") return noAdmins.filter(x => x.classId === u.classId || x.id === u.id);
  if (u.tipo === "LIDER") {
    const ids = state.relationships.filter(r => r.leaderId === u.id).map(r => r.subordinateId);
    return noAdmins.filter(x => x.id === u.id || ids.includes(x.id));
  }
  return noAdmins.filter(x => x.id === u.id);
}
function respondentUsers() { return visibleUsers().filter(u => u.perfil === "USUARIO" && u.status === "Ativo"); }

function getClassName(classId) {
  const turma = state.classes.find(t => t.id === classId);
  return turma ? turma.name : "Sem turma";
}
function userClassIds(userId) {
  const ids = new Set();
  const u = state.users.find(x => x.id === userId);
  if (u?.classId) ids.add(u.classId);
  state.classes.forEach(t => {
    if ((t.userIds || []).includes(userId)) ids.add(t.id);
  });
  return [...ids];
}
function userClassNames(userId) {
  const names = userClassIds(userId).map(getClassName);
  return names.length ? names.join(", ") : "Sem turma";
}
function userLeaderNames(userId) {
  const leaders = state.relationships
    .filter(r => r.subordinateId === userId)
    .map(r => state.users.find(u => u.id === r.leaderId)?.nome)
    .filter(Boolean);
  return leaders.length ? leaders.join(", ") : "-";
}
function userSubordinateNames(userId) {
  const subs = state.relationships
    .filter(r => r.leaderId === userId)
    .map(r => state.users.find(u => u.id === r.subordinateId)?.nome)
    .filter(Boolean);
  return subs.length ? subs.join(", ") : "-";
}
function userAssessmentNames(userId) {
  const names = state.assignments
    .filter(a => a.userId === userId)
    .map(a => state.assessments.find(x => x.id === a.assessmentId)?.titulo)
    .filter(Boolean);
  return names.length ? names.join(", ") : "Nenhuma avaliação";
}

function userAssignments(userId){ return state.assignments.filter(a => a.userId === userId); }
function userPendingAssignments(userId){ return userAssignments(userId).filter(a => a.status === "Pendente"); }
function userDoneAssignments(userId){ return userAssignments(userId).filter(a => a.status === "Concluída"); }
function userClosedAssignments(userId){ return userAssignments(userId).filter(a => state.assessments.find(x => x.id === a.assessmentId)?.status === "Encerrada"); }
function userClassesList(userId){ return userClassIds(userId).map(id => state.classes.find(t => t.id === id)).filter(Boolean); }
function userCourses(userId){
  const classIds = userClassIds(userId);
  const courseIds = new Set();
  state.classes.forEach(t => {
    if (classIds.includes(t.id) || (t.userIds || []).includes(userId)) (t.courseIds || []).forEach(id => courseIds.add(id));
  });
  return [...courseIds].map(id => state.courses.find(c => c.id === id)).filter(Boolean);
}
function leaderSubordinates(userId){
  return state.relationships.filter(r => r.leaderId === userId).map(r => state.users.find(u => u.id === r.subordinateId)).filter(Boolean);
}
function activeItemsForUser(userId){
  return {
    classes: userClassesList(userId).filter(t => t.status === "Ativa").length,
    courses: userCourses(userId).filter(c => c.status !== "Arquivado").length,
    pending: userPendingAssignments(userId).length,
    done: userDoneAssignments(userId).length
  };
}


function visibleAssessments() {
  if (isAdm()) return state.assessments;
  if (isGerencia()) return state.assessments;
  return state.assessments.filter(a => state.assignments.some(x => x.userId === currentUser().id && x.assessmentId === a.id));
}
function modeLabel(mode) {
  return mode === "form" ? "Formulário" : mode === "single-list" ? "Pergunta única em lista" : "Pergunta única em cartões";
}
function statusBadge(status) {
  if (status === "Concluída" || status === "Respondida" || status === "Ativa") return "success";
  if (status === "Pendente" || status === "Rascunho") return "warning";
  if (status === "Encerrada" || status === "Bloqueado") return "danger";
  return "blue";
}
function assessmentStats(assessmentId) {
  const rows = state.assignments.filter(a => a.assessmentId === assessmentId && state.users.find(u => u.id === a.userId)?.perfil === "USUARIO");
  const total = rows.length;
  const answered = rows.filter(r => r.status === "Concluída").length;
  const pending = total - answered;
  const percent = total ? Math.round(answered / total * 100) : 0;
  return { total, answered, pending, percent };
}
function log(action) {
  state.auditLogs.unshift({ id: nowId(), userId: currentUser()?.id, action, createdAt: new Date().toLocaleString("pt-BR") });
  saveState();
}

function login(cpf, senha) {
  const user = state.users.find(u => cleanCpf(u.cpf) === cleanCpf(cpf) && u.senha === senha && u.status === "Ativo");
  if (!user) return alert("CPF ou senha inválidos, ou usuário inativo.");
  state.currentUserId = user.id;
  state.page = user.perfil === "USUARIO" ? "minhas" : "dashboard";
  log("Login realizado");
  saveState();
  render();
}
function logout() {
  log("Logout realizado");
  state.currentUserId = null;
  state.page = "login";
  saveState();
  render();
}
function setPage(page) {
  state.page = page;
  saveState();
  render();
}


function goPublicHome() {
  window.location.href = "index.html";
}

function goLogin() {
  window.location.href = "lidere.html";
}

function goEciComingSoon() {
  window.location.href = "eci.html";
}

function renderPublicHome() {
  document.getElementById("app").innerHTML = `
    <main class="portal-shell">
      <div class="portal-bg-mark">PEDRA</div>

      <section class="portal-card">
        <div class="portal-top">
          <img class="portal-pedra-logo" src="assets/logo_preto.png" alt="Pedra Mineração, Concreto e Pavimentação">
          <span class="portal-tag">Portal institucional</span>
        </div>

        <div class="portal-title">
          <h1>Escolha o ambiente</h1>
          <p>Central de acesso aos projetos de desenvolvimento, cultura, avaliações e encontros institucionais.</p>
        </div>

        <div class="portal-options">
          <button class="portal-option" onclick="goLogin()">
            <div class="portal-option-logo lidere-option-logo">
              <img class="lidere-card-logo" src="assets/lidere.png" alt="LIDERE">
              <img src="assets/logo.png" alt="Símbolo Pedra">
            </div>
            <div>
              <h2>LIDERE</h2>
              <p>Ambiente de avaliações, liderança, perfis e desenvolvimento.</p>
              <span class="portal-enter">Acessar sistema →</span>
            </div>
          </button>

          <button class="portal-option eci" onclick="goEciComingSoon()">
            <div class="portal-option-logo eci-logo">
              <strong>ECI</strong>
              <span>2026</span>
            </div>
            <div>
              <h2>ECI 2026</h2>
              <p>14° Encontro Construindo Ideias. Em breve, um novo ambiente para conteúdos, programação e participação.</p>
              <span class="portal-enter">Ver prévia →</span>
            </div>
          </button>

          <button class="portal-option somos-pedra" onclick="goPublicHome()">
            <div class="portal-option-logo">
              <img class="somos-pedra-logo" src="assets/logo_preto.png" alt="Somos Pedra">
            </div>
            <div>
              <h2>Somos Pedra</h2>
              <p>Voltar para a página inicial do portal institucional Pedra.</p>
              <span class="portal-enter">Voltar para home →</span>
            </div>
          </button>
        </div>

        <div class="portal-footer">
          <span>LIDERE • ECI 2026</span>
          <span>Pedra Mineração, Concreto e Pavimentação</span>
        </div>
      </section>
    </main>
  `;
}

function renderEciComingSoon() {
  document.getElementById("app").innerHTML = `
    <main class="eci-shell">
      <section class="eci-card">
        <div class="eci-header">
          <button class="btn secondary" onclick="goPublicHome()">← Somos Pedra</button>
          <img class="eci-pedra-logo" src="assets/logo_preto.png" alt="Pedra Mineração, Concreto e Pavimentação">
        </div>

        <div class="eci-content">
          <div class="eci-mark">
            <strong>ECI</strong>
            <span>2026</span>
          </div>

          <span class="portal-tag">Em breve</span>

          <h1>14° Encontro Construindo Ideias</h1>
          <p>
            Estamos preparando uma nova experiência para o ECI 2026,
            com acesso a informações, conteúdos, programação e futuras interações do encontro.
          </p>

          <div class="eci-preview-grid">
            <div>
              <b>Programação</b>
              <span>Agenda e momentos do evento.</span>
            </div>
            <div>
              <b>Conteúdos</b>
              <span>Materiais, comunicados e novidades.</span>
            </div>
            <div>
              <b>Participação</b>
              <span>Espaço futuro para atividades e interações.</span>
            </div>
          </div>

          <button class="btn gold" onclick="goPublicHome()">Voltar para tela principal</button>
        </div>
      </section>
    </main>
  `;
}

function renderLogin() {
  document.getElementById("app").innerHTML = `
    <div class="login-shell">
      <section class="login-brand ready-screen">
        <div class="login-brand-content">
          <div class="login-brand-top">
            <img class="login-lidere-logo" src="assets/lidere.png" alt="LIDERE">
          </div>

          <div class="login-brand-copy">
            <h1>Ecossistema de avaliações, perfis e desenvolvimento.</h1>
            <p>Ambiente digital para gestão de usuários, avaliações, perguntas, respostas, resultados e acompanhamento administrativo.</p>
          </div>

          <div class="login-brand-bottom">
            <img class="login-pedra-logo-bottom" src="assets/logo_preto.png" alt="Pedra Mineração, Concreto e Pavimentação">
          </div>
        </div>
      </section>
      <section class="login-panel">
        <div class="login-card card">
          <div class="login-mini-actions"><button type="button" class="btn gold small login-back-btn" onclick="goPublicHome()">← Somos Pedra</button></div><h2>Acessar sistema</h2>
                    <form onsubmit="event.preventDefault(); login(document.getElementById('cpf').value, document.getElementById('senha').value)">
            <div class="form-group"><label>CPF</label><input id="cpf" placeholder="000.000.000-00"></div>
            <div class="form-group"><label>Senha</label><input id="senha" type="password" placeholder="Digite a senha"></div>
            <button class="btn gold" type="submit" style="width:100%">Entrar</button>
          </form>
          <div class="quick compact-quick">
            <b>Acessos de demonstração</b>
            ${state.users.slice(0,3).map(u => `
              <button class="quick-access-item" onclick="document.getElementById('cpf').value='${u.cpf}';document.getElementById('senha').value='${u.senha}'">
                <span class="quick-access-top"><b>${u.perfil}</b><span>${u.nome}</span></span>
                <small>${maskCpf(u.cpf)} | ${u.senha}</small>
              </button>
            `).join("")}
          </div>
          <div class="login-mobile-footer-logo">
            <img src="assets/logo_preto.png" alt="Pedra Mineração, Concreto e Pavimentação">
          </div>
        </div>
      </section>
    </div>
  `;
}

function layout(title, subtitle, content) {
  const u = currentUser();
  const nav = (u.perfil === "USUARIO")
    ? [
        ["minhas","Minhas atividades"],
        ["realizadas","Atividades realizadas"]
      ]
    : [
        ["dashboard","Dashboard"],
        ["usuarios","Usuários"],
        ["avaliacoes","Atividades"],
        ["controle","Controle Geral"],
        ["resultados","Histórico"],
        ["logs","Logs"],
        ["config","Configurações"]
      ].filter(([key]) => {
        if (["avaliacoes","controle"].includes(key)) return canManage();
        if (["logs","config"].includes(key)) return isAdm();
        if (["usuarios","resultados"].includes(key)) return canManage() || u.tipo === "LIDER";
        return true;
      });

  document.getElementById("app").innerHTML = `
    <div class="layout">
      <aside class="sidebar">
        <div class="brand-row"><div class="brand-lidere">LIDERE</div></div>
        <div class="profile">
          <b>${u.nome}</b>
          <small>${u.perfil} ${u.tipo ? "• " + u.tipo : ""}</small><br>
          <small>${u.perfil} • ${u.tipo}</small>
        </div>
        <nav class="nav">
          ${nav.map(([key,label]) => `<button class="${state.page===key?'active':''}" onclick="setPage('${key}')">${label}</button>`).join("")}
        </nav>
        <div class="sidebar-logo-footer">
          <img src="assets/logo_preto.png" alt="Pedra Mineração, Concreto e Pavimentação">
        </div>
        <button class="btn secondary" onclick="logout()">Sair</button>
      </aside>
      <main class="main">
        <div class="topbar">
          <div><h1>${title}</h1>${subtitle ? `<p class="muted">${subtitle}</p>` : ""}</div>
          <span class="badge ${statusBadge(u.perfil)}">${u.perfil}</span>
        </div>
        ${content}
      </main>
    </div>
  `;
}


function renderQuestionMedia(q) {
  if (!q || !q.mediaType || !q.mediaUrl) return "";
  const title = q.mediaTitle ? `<p class="muted media-caption">${q.mediaTitle}</p>` : "";
  if (q.mediaType === "image-url" || q.mediaType === "image-upload") {
    return `<div class="question-media">${title}<img src="${q.mediaUrl}" alt="${q.mediaTitle || "Mídia da pergunta"}"></div>`;
  }
  if (q.mediaType === "video-url") {
    const url = q.mediaUrl.includes("youtube.com") || q.mediaUrl.includes("player.vimeo.com")
      ? q.mediaUrl
      : q.mediaUrl;
    return `<div class="question-media video">${title}<iframe src="${url}" title="${q.mediaTitle || "Vídeo da pergunta"}" allowfullscreen></iframe></div>`;
  }
  if (q.mediaType === "video-upload") {
    return `<div class="question-media video">${title}<video controls src="${q.mediaUrl}"></video></div>`;
  }
  return "";
}

function readFileAsDataUrl(file, callback) {
  const reader = new FileReader();
  reader.onload = () => callback(reader.result);
  reader.readAsDataURL(file);
}




function getDraftAnswers(assignmentId) {
  return state.drafts?.[assignmentId] || {};
}

function saveDraftAnswer(questionId, answer) {
  if (!state.answerSession || state.answerSession.preview) return;
  const assignmentId = state.answerSession.assignmentId;
  state.drafts = state.drafts || {};
  state.drafts[assignmentId] = state.drafts[assignmentId] || {};
  state.drafts[assignmentId][questionId] = answer;
  saveState();
}

function clearDraftAnswers(assignmentId) {
  if (!state.drafts) return;
  delete state.drafts[assignmentId];
  saveState();
}

function userAnswerLabel(assignment, questionId) {
  const ans = assignment.answers?.find(a => String(a.questionId) === String(questionId));
  if (!ans) return "-";
  return ans.valueLabel || ans.value || "-";
}

function renderCompletedAnswers(assignment) {
  const assessment = state.assessments.find(a => a.id === assignment.assessmentId);
  if (!assessment) return "";

  const result = assignment.result
    ? `<div class="result-chip"><span>Resultado</span><b>${assignment.result.profile}</b></div>`
    : `<div class="result-chip muted-chip"><span>Resultado</span><b>Não calculado</b></div>`;

  const answers = assessment.questions.map(q => `
    <div class="answer-review-row">
      <span>${q.text}</span>
      <b>${userAnswerLabel(assignment, q.id)}</b>
    </div>
  `).join("");

  return `
    <div class="answer-review">
      ${result}
      <div class="answer-review-list">${answers}</div>
    </div>
  `;
}

function renderDashboard() {
  const u = currentUser();
  if (u.perfil === "USUARIO" && u.tipo === "LIDERADO") return renderLideradoDashboard();
  if (u.perfil === "USUARIO" && u.tipo === "LIDER") return renderLiderDashboard();
  if (u.perfil === "GERENCIA") return renderGerenciaDashboard();
  return renderAdmDashboard();
}

function renderLideradoDashboard() {
  const u = currentUser();
  const leaders = state.relationships
    .filter(r => r.subordinateId === u.id)
    .map(r => state.users.find(x => x.id === r.leaderId))
    .filter(Boolean);

  const pending = userPendingAssignments(u.id);
  const done = userDoneAssignments(u.id);
  const closed = userClosedAssignments(u.id);
  const available = userAssignments(u.id).filter(a => {
    const assessment = state.assessments.find(x => x.id === a.assessmentId);
    return assessment?.status === "Ativa";
  });

  const content = `
    <div class="grid cols-4" style="margin-bottom:18px">
      <div class="stat card"><span>Disponíveis</span><strong>${available.length}</strong></div>
      <div class="stat card"><span>Pendentes</span><strong>${pending.length}</strong></div>
      <div class="stat card"><span>Realizadas</span><strong>${done.length}</strong></div>
      <div class="stat card"><span>Encerradas</span><strong>${closed.length}</strong></div>
    </div>

    <section class="section card clean-section">
      <div class="section-head">
        <div>
          <h3>Seu painel</h3>
          <p class="muted">Aqui aparecem apenas suas informações vinculadas e ativas.</p>
        </div>
      </div>
      <div class="organic-grid">
        <div class="organic-card">
          <h3>Seus líderes</h3>
          ${leaders.length ? leaders.map(l => `<p><b>${l.nome}</b><br><span class="muted">${l.perfil} • ${l.tipo}</span></p>`).join("") : `<p class="muted">Nenhum líder vinculado.</p>`}
        </div>
        <div class="organic-card">
          <h3>Avaliações disponíveis</h3>
          <p><b>${available.length}</b> atividade(s) ativa(s) vinculada(s).</p>
          <p class="muted">Use a área de pendentes para responder.</p>
        </div>
        <div class="organic-card">
          <h3>Histórico</h3>
          <p><b>${done.length}</b> avaliação(ões) realizadas.</p>
          <p><b>${closed.length}</b> avaliação(ões) encerradas.</p>
        </div>
      </div>
    </section>

    <br>

    <section class="section card">
      <div class="section-head"><div><h3>Avaliações disponíveis e pendentes</h3><p class="muted">Atividades liberadas para resposta.</p></div><span class="badge warning">${pending.length}</span></div>
      ${pending.length ? `<div class="user-assessment-grid">${pending.map(renderUserAssessmentCard).join("")}</div>` : `<div class="empty"><b>Nenhuma avaliação pendente.</b></div>`}
    </section>

    <br>

    <section class="section card">
      <div class="section-head"><div><h3>Avaliações realizadas</h3><p class="muted">Histórico das suas avaliações respondidas.</p></div><span class="badge success">${done.length}</span></div>
      ${done.length ? `<div class="user-assessment-grid">${done.map(renderUserAssessmentCard).join("")}</div>` : `<div class="empty"><b>Nenhuma avaliação realizada.</b></div>`}
    </section>

    <br>

    <section class="section card">
      <div class="section-head"><div><h3>Encerradas</h3><p class="muted">Avaliações que já foram encerradas.</p></div><span class="badge danger">${closed.length}</span></div>
      ${closed.length ? `<div class="simple-list">${closed.map(a => `<div><b>${state.assessments.find(x => x.id === a.assessmentId)?.titulo}</b><span class="badge danger">Encerrada</span></div>`).join("")}</div>` : `<div class="empty"><b>Nenhuma encerrada vinculada.</b></div>`}
    </section>
  `;
  layout("Dashboard", "Visão do liderado.", content);
}

function renderLiderDashboard() {
  const u = currentUser();
  const subs = leaderSubordinates(u.id);
  const pending = userPendingAssignments(u.id);
  const done = userDoneAssignments(u.id);
  const closed = userClosedAssignments(u.id);

  const content = `
    <div class="grid cols-4" style="margin-bottom:18px">
      <div class="stat card"><span>Meus liderados</span><strong>${subs.length}</strong></div>
      <div class="stat card"><span>Minhas pendências</span><strong>${pending.length}</strong></div>
      <div class="stat card"><span>Minhas realizadas</span><strong>${done.length}</strong></div>
      <div class="stat card"><span>Encerradas</span><strong>${closed.length}</strong></div>
    </div>

    <section class="section card">
      <div class="section-head">
        <div>
          <h3>Meus liderados</h3>
          <p class="muted">Acompanhamento simples: quem respondeu e quem está pendente.</p>
        </div>
        <button class="btn secondary" onclick="setPage('usuarios')">Ver detalhes</button>
      </div>

      <table class="table">
        <thead><tr><th>Liderado</th><th>Avaliações</th><th>Pendentes</th><th>Respondidas</th><th>Status</th><th>Ações</th></tr></thead>
        <tbody>
          ${subs.map(s => `<tr>
            <td><b>${s.nome}</b><br><small>${maskCpf(s.cpf)}</small></td>
            <td><small>${userAssessmentNames(s.id)}</small></td>
            <td><span class="badge warning">${userPendingAssignments(s.id).length}</span></td>
            <td><span class="badge success">${userDoneAssignments(s.id).length}</span></td>
            <td><span class="badge ${s.status === "Ativo" ? "success" : "danger"}">${s.status}</span></td>
            <td><button class="btn small outline" onclick="resetUserPassword(${s.id})">Trocar senha</button></td>
          </tr>`).join("") || `<tr><td colspan="6">Nenhum liderado vinculado.</td></tr>`}
        </tbody>
      </table>
    </section>

    <br>

    <section class="section card">
      <div class="section-head"><div><h3>Minhas avaliações pendentes</h3><p class="muted">Atividades que você precisa responder.</p></div><span class="badge warning">${pending.length}</span></div>
      ${pending.length ? `<div class="user-assessment-grid">${pending.map(renderUserAssessmentCard).join("")}</div>` : `<div class="empty"><b>Nenhuma pendente.</b></div>`}
    </section>

    <br>

    <section class="section card">
      <div class="section-head"><div><h3>Minhas avaliações realizadas</h3><p class="muted">Seu histórico de respostas.</p></div><span class="badge success">${done.length}</span></div>
      ${done.length ? `<div class="user-assessment-grid">${done.map(renderUserAssessmentCard).join("")}</div>` : `<div class="empty"><b>Nenhuma realizada.</b></div>`}
    </section>
  `;
  layout("Dashboard", "Visão do líder.", content);
}

function renderGerenciaDashboard() {
  const users = visibleUsers().filter(u => u.perfil === "USUARIO");
  const assessments = visibleAssessments();
  const active = assessments.filter(a => a.status === "Ativa").length;
  const pending = state.assignments.filter(a => users.some(u => u.id === a.userId) && a.status === "Pendente").length;
  const done = state.assignments.filter(a => users.some(u => u.id === a.userId) && a.status === "Concluída").length;

  const content = `
    <div class="grid cols-4" style="margin-bottom:18px">
      <div class="stat card"><span>Usuários</span><strong>${users.length}</strong></div>
      <div class="stat card"><span>Atividades ativas</span><strong>${active}</strong></div>
      <div class="stat card"><span>Pendentes</span><strong>${pending}</strong></div>
      <div class="stat card"><span>Respondidas</span><strong>${done}</strong></div>
    </div>

    <section class="section card">
      <div class="section-head">
        <div>
          <h3>Escopo geral da gerência</h3>
          <p class="muted">Criação de usuários, atividades e acompanhamento geral.</p>
        </div>
      </div>
      <div class="organic-grid">
        <button class="organic-action" onclick="setPage('usuarios')"><b>Usuários</b><span>Criar e editar usuários</span></button>
        <button class="organic-action" onclick="setPage('avaliacoes')"><b>Atividades</b><span>Criar avaliações e editar perguntas</span></button>
        <button class="organic-action" onclick="setPage('controle')"><b>Controle Geral</b><span>Acompanhar respostas e pendências</span></button>
      </div>
    </section>

    <br>

    <section class="section card">
      <div class="section-head"><div><h3>Atividades ativas</h3><p class="muted">Quem possui atividades e situação de resposta.</p></div><button class="btn secondary" onclick="setPage('controle')">Controle completo</button></div>
      <table class="table">
        <thead><tr><th>Atividade</th><th>Status</th><th>Enviadas</th><th>Respondidas</th><th>Pendentes</th></tr></thead>
        <tbody>
          ${assessments.filter(a => a.status === "Ativa").map(a => { const s = assessmentStats(a.id); return `<tr><td><b>${a.titulo}</b></td><td><span class="badge success">Ativa</span></td><td>${s.total}</td><td>${s.answered}</td><td>${s.pending}</td></tr>`; }).join("") || `<tr><td colspan="5">Nenhuma atividade ativa.</td></tr>`}
        </tbody>
      </table>
    </section>
  `;
  layout("Dashboard", "Visão da gerência.", content);
}

function renderAdmDashboard() {
  const content = `
    <div class="grid cols-4" style="margin-bottom:18px">
      <div class="stat card"><span>Usuários totais</span><strong>${state.users.length}</strong></div>
      <div class="stat card"><span>ADMs/Gerências</span><strong>${state.users.filter(u => u.perfil === "ADM" || u.perfil === "GERENCIA").length}</strong></div>
      <div class="stat card"><span>Atividades</span><strong>${state.assessments.length}</strong></div>
      <div class="stat card"><span>Ativas</span><strong>${state.assessments.filter(a => a.status === "Ativa").length}</strong></div>
    </div>

    <section class="section card">
      <div class="section-head">
        <div>
          <h3>Acesso total</h3>
          <p class="muted">Somente ADM adiciona outros ADMs/Gerências e acessa configurações.</p>
        </div>
      </div>
      <div class="organic-grid">
        <button class="organic-action" onclick="setPage('usuarios')"><b>Usuários</b><span>Adicionar ADM, Gerência e usuários</span></button>
        <button class="organic-action" onclick="setPage('avaliacoes')"><b>Atividades</b><span>Criar avaliações e perguntas</span></button>
        <button class="organic-action" onclick="setPage('controle')"><b>Controle Geral</b><span>Acompanhar respostas</span></button>
        <button class="organic-action" onclick="setPage('config')"><b>Configurações</b><span>Backup, restauração e reset local</span></button>
      </div>
    </section>
  `;
  layout("Dashboard", "Visão do administrador.", content);
}

function renderAssessmentCard(a) {
  const stats = assessmentStats(a.id);
  return `
    <div class="assessment-card">
      <div class="assessment-hero">
        <div class="brand-lidere">LIDERE</div>
        <div class="hero-brand-right">
          <img src="assets/logo.png" alt="Símbolo Pedra">
          <span class="badge ${statusBadge(a.status)}">${a.status}</span>
        </div>
      </div>
      <div class="assessment-content">
        <h3>${a.titulo}</h3>
        <p class="muted">${a.descricao || "Sem descrição."}</p>
        <div class="meta-pills">
          <span>${a.questions.length} pergunta(s)</span>
          <span>${modeLabel(a.modeDefault)}</span>
          <span>Prazo: ${formatDateBR(a.endsAt)}</span>
        </div>
        <div class="progress-row"><div class="track"><div class="fill" style="width:${stats.percent}%"></div></div><span>${stats.percent}%</span></div>
      </div>
    </div>
  `;
}





function openUserLinksModal(userId) {
  const u = state.users.find(x => x.id === userId);
  if (!u) return alert("Usuário não encontrado.");

  const leaderLinks = state.relationships
    .filter(r => r.subordinateId === userId)
    .map(r => state.users.find(x => x.id === r.leaderId))
    .filter(Boolean);

  const subordinateLinks = state.relationships
    .filter(r => r.leaderId === userId)
    .map(r => state.users.find(x => x.id === r.subordinateId))
    .filter(Boolean);

  document.body.insertAdjacentHTML("beforeend", `
    <div class="modal-backdrop" id="modal">
      <div class="modal user-detail-modal">
        <div class="modal-head">
          <div>
            <h3>Vínculos do usuário</h3>
            <p class="muted">${u.nome} • ${u.perfil} • ${u.tipo}</p>
          </div>
          <button class="close" onclick="closeModal()">×</button>
        </div>

        <div class="detail-summary">
          <div><span>Nome</span><b>${u.nome}</b></div>
          <div><span>CPF</span><b>${maskCpf(u.cpf)}</b></div>
          <div><span>Status</span><b>${u.status}</b></div>
          <div><span>Tipo</span><b>${u.tipo}</b></div>
        </div>

        <div class="detail-grid">
          <section class="detail-panel">
            <h3>Líder vinculado</h3>
            ${leaderLinks.length ? leaderLinks.map(l => `
              <div class="detail-person">
                <b>${l.nome}</b>
                <span>${maskCpf(l.cpf)}</span>
                <small>${l.perfil} • ${l.tipo} • ${l.status}</small>
              </div>
            `).join("") : `<p class="muted">Nenhum líder vinculado.</p>`}
          </section>

          <section class="detail-panel">
            <h3>Liderados vinculados</h3>
            ${subordinateLinks.length ? subordinateLinks.map(s => `
              <div class="detail-person">
                <b>${s.nome}</b>
                <span>${maskCpf(s.cpf)}</span>
                <small>${s.perfil} • ${s.tipo} • ${s.status}</small>
              </div>
            `).join("") : `<p class="muted">Nenhum liderado vinculado.</p>`}
          </section>
        </div>

        ${canManage() ? `
          <br>
          <div class="actions">
            <button class="btn secondary" onclick="closeModal(); openUserModal(${userId})">Editar vínculos</button>
            <button class="btn outline" onclick="resetUserPassword(${userId})">Trocar senha</button>
          </div>
        ` : ``}
      </div>
    </div>
  `);
}

function openUserAssessmentsModal(userId) {
  const u = state.users.find(x => x.id === userId);
  if (!u) return alert("Usuário não encontrado.");

  const rows = state.assignments
    .filter(a => a.userId === userId)
    .map(a => ({
      assignment: a,
      assessment: state.assessments.find(x => x.id === a.assessmentId)
    }))
    .filter(x => x.assessment);

  const pending = rows.filter(x => x.assignment.status === "Pendente");
  const done = rows.filter(x => x.assignment.status === "Concluída");
  const closed = rows.filter(x => x.assessment.status === "Encerrada");

  const renderAssessmentRows = (items, emptyText) => {
    if (!items.length) return `<div class="empty compact-empty">${emptyText}</div>`;
    return `<div class="detail-list">
      ${items.map(({ assignment, assessment }) => `
        <div class="detail-assessment-row">
          <div>
            <b>${assessment.titulo}</b>
            <span>${assessment.status} • ${modeLabel(assessment.modeDefault)}</span>
            <small>Prazo: ${formatDateBR(assignment.dueDate || assessment.endsAt)} ${assignment.finishedAt ? `• Respondida em ${formatDateBR(assignment.finishedAt)}` : ""}</small>
          </div>
          <div class="detail-row-actions">
            <span class="badge ${statusBadge(assignment.status)}">${assignment.status}</span>
            ${assignment.result ? `<button class="btn small secondary" onclick="closeModal(); openResultModal(${assignment.id})">Resultado</button>` : ``}
          </div>
        </div>
      `).join("")}
    </div>`;
  };

  document.body.insertAdjacentHTML("beforeend", `
    <div class="modal-backdrop" id="modal">
      <div class="modal user-detail-modal wide">
        <div class="modal-head">
          <div>
            <h3>Avaliações do usuário</h3>
            <p class="muted">${u.nome} • ${maskCpf(u.cpf)}</p>
          </div>
          <button class="close" onclick="closeModal()">×</button>
        </div>

        <div class="detail-summary">
          <div><span>Total</span><b>${rows.length}</b></div>
          <div><span>Pendentes</span><b>${pending.length}</b></div>
          <div><span>Respondidas</span><b>${done.length}</b></div>
          <div><span>Encerradas</span><b>${closed.length}</b></div>
        </div>

        <section class="detail-panel full">
          <div class="section-head compact-head">
            <h3>Pendentes de fazer</h3>
            <span class="badge warning">${pending.length}</span>
          </div>
          ${renderAssessmentRows(pending, "Nenhuma avaliação pendente.")}
        </section>

        <section class="detail-panel full">
          <div class="section-head compact-head">
            <h3>Avaliações realizadas</h3>
            <span class="badge success">${done.length}</span>
          </div>
          ${renderAssessmentRows(done, "Nenhuma avaliação respondida.")}
        </section>

        <section class="detail-panel full">
          <div class="section-head compact-head">
            <h3>Avaliações encerradas</h3>
            <span class="badge danger">${closed.length}</span>
          </div>
          ${renderAssessmentRows(closed, "Nenhuma avaliação encerrada.")}
        </section>

        ${canManage() ? `
          <br>
          <div class="actions">
            <button class="btn secondary" onclick="closeModal(); openUserModal(${userId})">Editar avaliações vinculadas</button>
            <button class="btn outline" onclick="alert('Lembrete simulado enviado para ${u.nome}.')">Enviar lembrete</button>
          </div>
        ` : ``}
      </div>
    </div>
  `);
}

function renderUsuarios() {
  if (!canManage() && currentUser().tipo === "LIDER") return renderLideradosUsuarios();

  const users = visibleUsers();
  const content = `
    <section class="section card">
      <div class="section-head">
        <div><h3>Usuários</h3><p class="muted">Gestão de perfil, tipo, vínculos, avaliações, status e acesso.</p></div>
        ${canManage() ? `<button class="btn gold" onclick="openUserModal()">Novo usuário</button>` : ""}
      </div>
      <table class="table user-table">
        <thead><tr><th>Nome</th><th>CPF</th><th>Perfil</th><th>Tipo</th><th>Vínculos</th><th>Avaliações</th><th>Status</th><th>Ações</th></tr></thead>
        <tbody>${users.map(u => `<tr>
          <td><b>${u.nome}</b></td><td>${maskCpf(u.cpf)}</td><td><span class="badge">${u.perfil}</span></td><td>${u.tipo}</td>
          <td>
            <div class="cell-with-action">
              <small>${u.tipo === "LIDER" ? `<b>Liderados:</b> ${userSubordinateNames(u.id)}` : ""}${u.tipo === "LIDERADO" ? `<b>Líder:</b> ${userLeaderNames(u.id)}` : ""}${u.tipo === "ADMINISTRATIVO" ? `Administrativo` : ""}</small>
              <button class="inline-view-btn" onclick="openUserLinksModal(${u.id})">Ver</button>
            </div>
          </td>
          <td>
            <div class="cell-with-action">
              <small>${userAssessmentNames(u.id)}</small>
              <button class="inline-view-btn" onclick="openUserAssessmentsModal(${u.id})">Ver</button>
            </div>
          </td>
          <td><button class="status-toggle ${u.status === "Ativo" ? "on" : "off"}" ${canManage() ? `onclick="toggleUserStatus(${u.id})"` : ""}>${u.status}</button></td>
          <td class="actions">${canManage() ? `<button class="btn small secondary" onclick="openUserModal(${u.id})">Editar</button><button class="btn small outline" onclick="resetUserPassword(${u.id})">Trocar senha</button>` : ""}</td>
        </tr>`).join("")}</tbody>
      </table>
    </section>`;
  layout("Usuários", "Cadastro, vínculos, avaliações e acesso.", content);
}

function renderLideradosUsuarios() {
  const subs = leaderSubordinates(currentUser().id);
  const content = `
    <section class="section card">
      <div class="section-head"><div><h3>Meus liderados</h3><p class="muted">Visualize vínculos e status das avaliações dos seus liderados.</p></div></div>
      <table class="table user-table">
        <thead><tr><th>Nome</th><th>CPF</th><th>Avaliações</th><th>Pendentes</th><th>Respondidas</th><th>Status</th><th>Ações</th></tr></thead>
        <tbody>${subs.map(u => `<tr><td><b>${u.nome}</b></td><td>${maskCpf(u.cpf)}</td><td>
            <div class="cell-with-action">
              <small>${userAssessmentNames(u.id)}</small>
              <button class="inline-view-btn" onclick="openUserAssessmentsModal(${u.id})">Ver</button>
            </div>
          </td><td><span class="badge warning">${userPendingAssignments(u.id).length}</span></td><td><span class="badge success">${userDoneAssignments(u.id).length}</span></td><td><span class="badge ${u.status === "Ativo" ? "success" : "danger"}">${u.status}</span></td><td><button class="btn small outline" onclick="resetUserPassword(${u.id})">Trocar senha</button></td></tr>`).join("") || `<tr><td colspan="7">Nenhum liderado vinculado.</td></tr>`}</tbody>
      </table>
    </section>`;
  layout("Meus liderados", "Equipe vinculada ao líder.", content);
}

function openUserModal(id=null) {
  if (!canManage()) return alert("Sem permissão.");
  const u = id ? state.users.find(x=>x.id===id) : null;
  const isEdit = !!u;
  const pwd = randomPassword();
  const classes = isAdm() ? state.classes : state.classes.filter(t => t.id === currentUser().classId || (t.userIds||[]).includes(currentUser().id));
  const leaders = state.users.filter(x => x.perfil === "USUARIO" && x.tipo === "LIDER" && x.id !== id);
  const assignedAssessmentIds = id ? state.assignments.filter(a => a.userId === id).map(a => a.assessmentId) : [];
  const currentLeaderId = id ? (state.relationships.find(r => r.subordinateId === id)?.leaderId || "") : "";

  document.body.insertAdjacentHTML("beforeend", `
    <div class="modal-backdrop" id="modal"><div class="modal">
      <div class="modal-head">
        <div>
          <h3>${isEdit?"Editar usuário":"Novo usuário"}</h3>
          <p class="muted">Defina perfil, tipo, turma, vínculos, avaliações e status de acesso.</p>
        </div>
        <button class="close" onclick="closeModal()">×</button>
      </div>
      <form onsubmit="event.preventDefault(); saveUser(${id || "null"}, '${pwd}')">
        <div class="form-row">
          <div class="form-group"><label>Nome</label><input id="userNome" value="${u?.nome || ""}" required></div>
          <div class="form-group"><label>CPF</label><input id="userCpf" value="${u?.cpf || ""}" required></div>
        </div>

        <div class="form-row">
          <div class="form-group"><label>Tipo do perfil</label><select id="userPerfil" onchange="syncUserType()">
            ${isAdm()?`<option ${u?.perfil==="USUARIO"?"selected":""}>USUARIO</option><option ${u?.perfil==="GERENCIA"?"selected":""}>GERENCIA</option><option ${u?.perfil==="ADM"?"selected":""}>ADM</option>`:`<option>USUARIO</option>`}
          </select></div>
          <div class="form-group"><label>Tipo</label><select id="userTipo" onchange="syncUserType()">
            <option ${u?.tipo==="ADMINISTRATIVO"?"selected":""}>ADMINISTRATIVO</option>
            <option ${u?.tipo==="LIDER"?"selected":""}>LIDER</option>
            <option ${u?.tipo==="LIDERADO"?"selected":""}>LIDERADO</option>
          </select></div>
        </div>

        <div class="form-row">
          <div class="form-group"><label>Status de acesso</label><select id="userStatus">
            <option ${u?.status==="Ativo"?"selected":""}>Ativo</option>
            <option ${u?.status==="Inativo"?"selected":""}>Inativo</option>
          </select></div>
          <div class="form-group"><label>Observação</label><input value="Turmas e cursos removidos temporariamente" disabled></div>
        </div>

        <div class="form-row">
          <div class="form-group"><label>Senha ${isEdit?"atual":"temporária"}</label><input id="userSenha" value="${isEdit ? u.senha : pwd}"></div>
          <div class="form-group"><label>Líder vinculado</label><select id="userLeader">
            <option value="">Sem líder</option>
            ${leaders.map(l => `<option value="${l.id}" ${Number(currentLeaderId)===l.id?"selected":""}>${l.nome}</option>`).join("")}
          </select></div>
        </div>

        <h3>Avaliações vinculadas</h3>
        <div class="grid user-assessment-checks">
          ${state.assessments.map(a => `<label class="permission-box"><input type="checkbox" class="userAssessmentCheck" value="${a.id}" ${assignedAssessmentIds.includes(a.id)?"checked":""} style="width:auto;margin-right:8px"> ${a.titulo}</label>`).join("")}
        </div>

        <br>
        <button class="btn gold">${isEdit?"Salvar usuário":"Criar usuário"}</button>
      </form>
    </div></div>
  `);
  syncUserType();
}

function syncUserType() {
  const perfil = document.getElementById("userPerfil")?.value;
  const tipo = document.getElementById("userTipo");
  const leader = document.getElementById("userLeader");
  if (!tipo) return;

  if (perfil === "ADM" || perfil === "GERENCIA") {
    tipo.value = "ADMINISTRATIVO";
    tipo.disabled = true;
    if (leader) leader.disabled = true;
  } else {
    tipo.disabled = false;
    if (leader) leader.disabled = tipo.value !== "LIDERADO";
  }
}

function saveUser(id, pwd) {
  const perfil = document.getElementById("userPerfil").value;
  const tipoValue = document.getElementById("userTipo").value;
  if (!isAdm() && perfil !== "USUARIO") return alert("Gerência só pode criar usuários respondentes.");

  const classId = null;
  const data = {
    nome: document.getElementById("userNome").value.trim(),
    cpf: cleanCpf(document.getElementById("userCpf").value),
    senha: document.getElementById("userSenha").value || pwd,
    perfil,
    tipo: perfil === "USUARIO" ? tipoValue : "ADMINISTRATIVO",
    area: "",
    classId: null,
    status: document.getElementById("userStatus").value,
    mustChange: false
  };

  if (!data.nome || !data.cpf) return alert("Preencha nome e CPF.");

  let userId = id;
  if (id) {
    const idx = state.users.findIndex(u=>u.id===id);
    state.users[idx] = { ...state.users[idx], ...data };
    log(`Usuário atualizado: ${data.nome}`);
  } else {
    if (state.users.some(u => cleanCpf(u.cpf) === data.cpf)) return alert("CPF já cadastrado.");
    userId = nowId();
    state.users.push({ id: userId, ...data });
    log(`Usuário criado: ${data.nome}`);
  }

  // Atualiza vínculo de liderança
  state.relationships = state.relationships.filter(r => r.subordinateId !== userId && r.leaderId !== userId);
  if (data.tipo === "LIDERADO") {
    const leaderId = Number(document.getElementById("userLeader").value) || null;
    if (leaderId) state.relationships.push({ id: nowId(), leaderId, subordinateId: userId });
  }

  // Atualiza avaliações vinculadas
  const selectedAssessments = [...document.querySelectorAll(".userAssessmentCheck:checked")].map(x => Number(x.value));
  state.assignments = state.assignments.filter(a => a.userId !== userId || a.status === "Concluída" || selectedAssessments.includes(a.assessmentId));
  selectedAssessments.forEach(assessmentId => {
    if (!state.assignments.some(a => a.userId === userId && a.assessmentId === assessmentId)) {
      const assessment = state.assessments.find(a => a.id === assessmentId);
      state.assignments.push({
        id: nowId(),
        assessmentId,
        userId,
        status: "Pendente",
        assignedAt: todayISO(),
        dueDate: assessment?.endsAt || "",
        result: null,
        answers: []
      });
    }
  });

  saveState(); closeModal(); renderUsuarios();
}

function resetUserPassword(id) {
  const u = state.users.find(x=>x.id===id);
  const pwd = randomPassword();
  u.senha = pwd;
  saveState(); renderUsuarios();
  alert(`Nova senha temporária de ${u.nome}: ${pwd}`);
}
function toggleUserStatus(id) {
  const u = state.users.find(x=>x.id===id);
  if (u.id === currentUser().id) return alert("Você não pode inativar seu próprio usuário.");
  u.status = u.status === "Ativo" ? "Inativo" : "Ativo";
  log(`Status do usuário alterado: ${u.nome}`);
  saveState(); renderUsuarios();
}

/* Vínculos agora ficam centralizados em Usuários. */

function renderAvaliacoes() {
  if (!canManage()) return layout("Avaliações", "", `<section class="section card"><h3>Acesso restrito</h3></section>`);
  const list = visibleAssessments();
  const active = list.filter(a=>a.status==="Ativa");
  const closed = list.filter(a=>a.status==="Encerrada");
  const draft = list.filter(a=>a.status==="Rascunho");
  const content = `
    <div class="grid cols-4" style="margin-bottom:18px">
      <div class="stat card"><span>Total</span><strong>${list.length}</strong></div>
      <div class="stat card"><span>Ativas</span><strong>${active.length}</strong></div>
      <div class="stat card"><span>Encerradas</span><strong>${closed.length}</strong></div>
      <div class="stat card"><span>Rascunhos</span><strong>${draft.length}</strong></div>
    </div>
    <section class="section card">
      <div class="section-head">
        <div><h3>Criar e gerenciar avaliações</h3><p class="muted">Monte perguntas, configure prazo, tela, usuários e status.</p></div>
        <div class="actions"><button class="btn secondary" onclick="setPage('controle')">Controle de respostas</button><button class="btn gold" onclick="openAssessmentModal()">Criar avaliação</button></div>
      </div>
      <div class="search-line"><input id="assessmentSearch" placeholder="Buscar avaliação..." oninput="renderAvaliacoesFiltered(this.value)"><button class="btn secondary" onclick="renderAvaliacoes()">Limpar</button></div>
      <div id="assessmentList">${renderAssessmentAdminSections(list)}</div>
    </section>
  `;
  layout("Avaliações", "Administração de questionários.", content);
}
function renderAvaliacoesFiltered(q) {
  const list = visibleAssessments().filter(a => a.titulo.toLowerCase().includes(q.toLowerCase()) || a.area.toLowerCase().includes(q.toLowerCase()));
  document.getElementById("assessmentList").innerHTML = renderAssessmentAdminSections(list);
}
function renderAssessmentAdminSections(list) {
  const active = list.filter(a=>a.status==="Ativa" || a.status==="Rascunho");
  const closed = list.filter(a=>a.status==="Encerrada");
  return `
    <div class="section-head"><h3>Ativas e rascunhos</h3><span class="badge success">${active.length}</span></div>
    ${active.length ? `<div class="assessment-grid">${active.map(renderAssessmentAdminCard).join("")}</div>` : `<div class="empty"><b>Nenhuma ativa.</b></div>`}
    <br>
    <div class="section-head"><h3>Encerradas</h3><span class="badge danger">${closed.length}</span></div>
    ${closed.length ? `<div class="assessment-grid">${closed.map(renderAssessmentAdminCard).join("")}</div>` : `<div class="empty"><b>Nenhuma encerrada.</b></div>`}
  `;
}
function renderAssessmentAdminCard(a) {
  const stats = assessmentStats(a.id);
  return `
    <div class="assessment-card">
      <div class="assessment-hero">
        <div class="brand-lidere">LIDERE</div>
        <div class="hero-brand-right">
          <img src="assets/logo.png" alt="Símbolo Pedra">
          <span class="badge ${statusBadge(a.status)}">${a.status}</span>
        </div>
      </div>
      <div class="assessment-content">
        <h3>${a.titulo}</h3>
        <p class="muted">${a.descricao || ""}</p>
        <div class="meta-pills"><span>${a.questions.length} pergunta(s)</span><span>${a.area}</span><span>${modeLabel(a.modeDefault)}</span><span>${formatDateBR(a.endsAt)}</span></div>
        <div class="progress-row"><div class="track"><div class="fill" style="width:${stats.percent}%"></div></div><span>${stats.percent}%</span></div>
        <div class="meta-pills"><span>${stats.total} enviados</span><span>${stats.answered} respondidos</span><span>${stats.pending} pendentes</span></div>
        <div class="actions">
          <button class="btn small secondary" onclick="previewAssessment(${a.id})">Prévia</button>
          <button class="btn small secondary" onclick="openAssessmentModal(${a.id})">Editar</button>
          <button class="btn small secondary" onclick="openQuestionBuilder(${a.id})">Perguntas</button>
          <button class="btn small secondary" onclick="openAssignModal(${a.id})">Liberar usuários</button>
          <button class="btn small outline" onclick="toggleAssessmentStatus(${a.id})">${a.status==="Encerrada"?"Reabrir":"Encerrar"}</button>
        </div>
      </div>
    </div>
  `;
}
function openAssessmentModal(id=null) {
  const a = id ? state.assessments.find(x=>x.id===id) : null;
  if (a && !canEditAssessment(a)) return alert("Sem permissão.");
  document.body.insertAdjacentHTML("beforeend", `
    <div class="modal-backdrop" id="modal"><div class="modal">
      <div class="modal-head"><div><h3>${a?"Editar avaliação":"Criar avaliação"}</h3><p class="muted">Defina dados gerais, prazo e tela do usuário.</p></div><button class="close" onclick="closeModal()">×</button></div>
      <form onsubmit="event.preventDefault(); saveAssessment(${id || "null"})">
        <div class="form-row">
          <div class="form-group"><label>Título</label><input id="assTitulo" value="${a?.titulo || ""}" required></div>
          <div class="form-group"><label>Área</label><input id="assArea" value="${a?.area || (isGerencia()?currentUser().area:"Geral")}" ${isGerencia() ? "readonly" : ""}></div>
        </div>
        <div class="form-group"><label>Descrição</label><textarea id="assDesc">${a?.descricao || ""}</textarea></div>
        <div class="form-row">
          <div class="form-group"><label>Status</label><select id="assStatus"><option ${a?.status==="Rascunho"?"selected":""}>Rascunho</option><option ${a?.status==="Ativa"?"selected":""}>Ativa</option><option ${a?.status==="Encerrada"?"selected":""}>Encerrada</option></select></div>
          <div class="form-group"><label>Tela do usuário</label><select id="assMode"><option value="single-card" ${a?.modeDefault==="single-card"?"selected":""}>Pergunta única - cartões</option><option value="single-list" ${a?.modeDefault==="single-list"?"selected":""}>Pergunta única - lista</option><option value="form" ${a?.modeDefault==="form"?"selected":""}>Formulário</option></select></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label>Dias para resposta</label><input type="number" min="1" id="assDays" value="${a?.responseTimeDays || 7}"></div>
          <div class="form-group"><label>Público-alvo</label><input id="assTarget" value="${a?.targetAudience || "Usuários"}"></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label>Início</label><input type="date" id="assStart" value="${a?.startsAt || todayISO()}"></div>
          <div class="form-group"><label>Limite</label><input type="date" id="assEnd" value="${a?.endsAt || todayISO()}"></div>
        </div>
        <button class="btn gold">Salvar avaliação</button>
      </form>
    </div></div>
  `);
}
function saveAssessment(id) {
  const data = {
    titulo: document.getElementById("assTitulo").value.trim(),
    descricao: document.getElementById("assDesc").value.trim(),
    area: isGerencia() ? currentUser().area : document.getElementById("assArea").value.trim(),
    status: document.getElementById("assStatus").value,
    modeDefault: document.getElementById("assMode").value,
    responseTimeDays: Number(document.getElementById("assDays").value || 7),
    targetAudience: document.getElementById("assTarget").value,
    startsAt: document.getElementById("assStart").value,
    endsAt: document.getElementById("assEnd").value
  };
  if (!data.titulo) return alert("Informe o título.");
  if (id) {
    const idx = state.assessments.findIndex(a=>a.id===id);
    state.assessments[idx] = { ...state.assessments[idx], ...data };
    log(`Avaliação editada: ${data.titulo}`);
  } else {
    state.assessments.push({ id: nowId(), ...data, createdBy: currentUser().id, questions: [] });
    log(`Avaliação criada: ${data.titulo}`);
  }
  saveState(); closeModal(); renderAvaliacoes();
}
function toggleAssessmentStatus(id) {
  const a = state.assessments.find(x=>x.id===id);
  if (!canEditAssessment(a)) return alert("Sem permissão.");
  a.status = a.status === "Encerrada" ? "Ativa" : "Encerrada";
  log(`Status da avaliação alterado: ${a.titulo}`);
  saveState(); renderAvaliacoes();
}
function openQuestionBuilder(assessmentId) {
  const a = state.assessments.find(x=>x.id===assessmentId);
  if (!canEditAssessment(a)) return alert("Sem permissão.");
  document.body.insertAdjacentHTML("beforeend", `
    <div class="modal-backdrop" id="modal"><div class="modal">
      <div class="modal-head"><div><h3>Perguntas</h3><p class="muted">${a.titulo}</p></div><button class="close" onclick="closeModal()">×</button></div>
      <div class="grid">
        ${a.questions.map(q => `
          <div class="permission-box">
            <div class="section-head" style="margin-bottom:8px">
              <div><b>${q.text}</b><br><small>${q.type} • ${q.required ? "Obrigatória" : "Opcional"}</small></div>
              <button class="btn small danger" onclick="deleteQuestion(${assessmentId}, ${q.id})">Remover</button>
            </div>
            ${q.options?.length ? `<small>${q.options.map(o=>o.label).join(" | ")}</small>` : `<small>Resposta aberta</small>`}
          </div>
        `).join("")}
      </div>
      <br>
      <h3>Adicionar pergunta</h3>
      <div class="form-group"><label>Texto</label><input id="qText" placeholder="Digite a pergunta"></div>
      <div class="form-row">
        <div class="form-group"><label>Tipo</label><select id="qType" onchange="toggleOptionFields()"><option value="multipla">Múltipla escolha</option><option value="escala">Escala 1 a 5</option><option value="texto">Texto</option></select></div>
        <div class="form-group"><label>Obrigatória</label><select id="qReq"><option value="true">Sim</option><option value="false">Não</option></select></div>
      </div>
      <h3>Mídia da pergunta</h3>
      <div class="form-row">
        <div class="form-group"><label>Tipo de mídia</label><select id="qMediaType">
          <option value="">Sem mídia</option>
          <option value="image-url">Imagem por link</option>
          <option value="image-upload">Upload de imagem</option>
          <option value="video-url">Vídeo por link/embed</option>
          <option value="video-upload">Upload de vídeo pequeno</option>
        </select></div>
        <div class="form-group"><label>Título/legenda da mídia</label><input id="qMediaTitle" placeholder="Ex: Assista antes de responder"></div>
      </div>
      <div class="form-group"><label>URL da mídia</label><input id="qMediaUrl" placeholder="https://... ou assets/logo_preto.png"></div>
      <div class="form-group"><label>Upload de mídia local</label><input type="file" id="qMediaFile" accept="image/*,video/*"><small class="muted">Para teste local, use arquivos pequenos.</small></div>

      <div id="optionFields">
        <p class="muted">Alternativas e perfil/pontos. Para múltipla escolha, edite os textos. Para escala, o sistema usa 1 a 5.</p>
        ${[1,2,3,4].map(i=>`
          <div class="option-editor">
            <input id="opLabel${i}" value="Opção ${i}">
            <select id="opProfile${i}"><option value="analitico">Analítico</option><option value="colaborativo">Colaborativo</option><option value="executor">Executor</option><option value="comunicador">Comunicador</option></select>
            <input id="opScore${i}" type="number" value="${i}">
          </div>`).join("")}
      </div>
      <button class="btn gold" onclick="saveQuestion(${assessmentId})">Adicionar pergunta</button>
    </div></div>
  `);
}
function toggleOptionFields() {
  const t = document.getElementById("qType").value;
  document.getElementById("optionFields").style.display = t === "texto" ? "none" : "block";
}
function saveQuestion(assessmentId) {
  const a = state.assessments.find(x=>x.id===assessmentId);
  const type = document.getElementById("qType").value;
  const text = document.getElementById("qText").value.trim();
  if (!text) return alert("Digite a pergunta.");

  let options = [];
  if (type === "escala") {
    const profile = document.getElementById("opProfile1").value;
    options = ["1","2","3","4","5"].map((label, idx) => ({ label, scores: { [profile]: idx + 1 } }));
  } else if (type === "multipla") {
    options = [1,2,3,4].map(i => {
      const profile = document.getElementById(`opProfile${i}`).value;
      return { label: document.getElementById(`opLabel${i}`).value, scores: { [profile]: Number(document.getElementById(`opScore${i}`).value || 0) } };
    });
  }

  const mediaType = document.getElementById("qMediaType").value;
  const mediaTitle = document.getElementById("qMediaTitle").value.trim();
  const mediaUrlInput = document.getElementById("qMediaUrl").value.trim();
  const mediaFile = document.getElementById("qMediaFile").files[0];

  const addQuestion = (mediaUrl = mediaUrlInput) => {
    a.questions.push({
      id: nowId(),
      text,
      subtitle: "Responda para continuar.",
      type,
      required: document.getElementById("qReq").value === "true",
      mediaType,
      mediaTitle,
      mediaUrl,
      options
    });
    log(`Pergunta adicionada em ${a.titulo}`);
    saveState();
    closeModal();
    openQuestionBuilder(assessmentId);
  };

  if ((mediaType === "image-upload" || mediaType === "video-upload") && mediaFile) {
    if (mediaFile.size > 2500000) return alert("Para teste local, use mídia menor que 2.5 MB.");
    readFileAsDataUrl(mediaFile, addQuestion);
  } else {
    addQuestion(mediaUrlInput);
  }
}
function deleteQuestion(assessmentId, qid) {
  const a = state.assessments.find(x=>x.id===assessmentId);
  if (!confirm("Remover pergunta?")) return;
  a.questions = a.questions.filter(q=>q.id!==qid);
  log(`Pergunta removida em ${a.titulo}`);
  saveState(); closeModal(); openQuestionBuilder(assessmentId);
}
function openAssignModal(assessmentId) {
  const a = state.assessments.find(x=>x.id===assessmentId);
  const users = respondentUsers();
  document.body.insertAdjacentHTML("beforeend", `
    <div class="modal-backdrop" id="modal"><div class="modal">
      <div class="modal-head"><div><h3>Liberar usuários</h3><p class="muted">${a.titulo}</p></div><button class="close" onclick="closeModal()">×</button></div>
      <div class="actions" style="margin-bottom:14px"><button class="btn secondary" onclick="toggleAllAssign(true)">Selecionar todos</button><button class="btn secondary" onclick="toggleAllAssign(false)">Limpar</button></div>
      <div class="grid">
        ${users.map(u => {
          const assigned = state.assignments.some(x=>x.assessmentId===assessmentId && x.userId===u.id);
          return `<label class="permission-box"><input type="checkbox" class="assignCheck" value="${u.id}" ${assigned?"checked":""} style="width:auto;margin-right:8px"> <b>${u.nome}</b> <small>${userClassNames(u.id)} • ${u.tipo}</small></label>`;
        }).join("")}
      </div>
      <br><button class="btn gold" onclick="saveAssignments(${assessmentId})">Salvar liberação</button>
    </div></div>
  `);
}
function toggleAllAssign(val) { document.querySelectorAll(".assignCheck").forEach(c=>c.checked=val); }
function saveAssignments(assessmentId) {
  const a = state.assessments.find(x=>x.id===assessmentId);
  const selected = [...document.querySelectorAll(".assignCheck:checked")].map(c=>Number(c.value));
  selected.forEach(uid => {
    if (!state.assignments.some(x=>x.assessmentId===assessmentId && x.userId===uid)) {
      state.assignments.push({ id: nowId(), assessmentId, userId: uid, status: "Pendente", assignedAt: todayISO(), dueDate: a.endsAt, result: null, answers: [] });
    }
  });
  state.assignments = state.assignments.filter(x => x.assessmentId !== assessmentId || selected.includes(x.userId) || x.status === "Concluída");
  log(`Liberação atualizada: ${a.titulo}`);
  saveState(); closeModal(); renderAvaliacoes();
}


function renderTurmas() {
  if (!canManage()) return layout("Turmas", "", `<section class="section card"><h3>Acesso restrito</h3></section>`);
  const classes = isAdm() ? state.classes : state.classes.filter(t => t.area === currentUser().area);
  const content = `
    <div class="grid cols-4" style="margin-bottom:18px">
      <div class="stat card"><span>Total de turmas</span><strong>${classes.length}</strong></div>
      <div class="stat card"><span>Ativas</span><strong>${classes.filter(t=>t.status==="Ativa").length}</strong></div>
      <div class="stat card"><span>Alunos vinculados</span><strong>${new Set(classes.flatMap(t=>t.userIds)).size}</strong></div>
      <div class="stat card"><span>Cursos vinculados</span><strong>${new Set(classes.flatMap(t=>t.courseIds||[])).size}</strong></div>
    </div>
    <section class="section card">
      <div class="section-head">
        <div><h3>Turmas</h3><p class="muted">Crie turmas para aplicar avaliações e, futuramente, cursos e trilhas.</p></div>
        <button class="btn gold" onclick="openClassModal()">Criar turma</button>
      </div>
      <div class="assessment-grid">
        ${classes.map(t => renderClassCard(t)).join("") || `<div class="empty"><b>Nenhuma turma criada.</b></div>`}
      </div>
    </section>
  `;
  layout("Turmas", "Gestão de grupos, alunos, avaliações e cursos.", content);
}

function renderClassCard(t) {
  const users = t.userIds.map(id => state.users.find(u=>u.id===id)).filter(Boolean);
  const assessments = (t.assessmentIds || []).map(id => state.assessments.find(a=>a.id===id)).filter(Boolean);
  const courses = (t.courseIds || []).map(id => state.courses.find(c=>c.id===id)).filter(Boolean);
  return `
    <div class="assessment-card">
      <div class="assessment-hero">
        <div class="brand-lidere">TURMA</div>
        <span class="badge ${statusBadge(t.status)}">${t.status}</span>
      </div>
      <div class="assessment-content">
        <h3>${t.name}</h3>
        <p class="muted">${t.description || ""}</p>
        <div class="meta-pills"><span>${users.length} participante(s)</span><span>${formatDateBR(t.startDate)} até ${formatDateBR(t.endDate)}</span></div>
        <div class="meta-pills"><span>${assessments.length} avaliação(ões)</span><span>${courses.length} curso(s)</span></div>
        <div class="actions">
          <button class="btn small secondary" onclick="openClassModal(${t.id})">Editar</button>
          <button class="btn small secondary" onclick="openClassMembers(${t.id})">Participantes</button>
          <button class="btn small outline" onclick="toggleClassStatus(${t.id})">${t.status==="Ativa"?"Encerrar":"Ativar"}</button>
        </div>
      </div>
    </div>
  `;
}

function openClassModal(id=null) {
  const t = id ? state.classes.find(x=>x.id===id) : null;
  const assessments = visibleAssessments();
  const courses = isAdm() ? state.courses : state.courses.filter(c => c.area === currentUser().area || c.area === "Geral");
  document.body.insertAdjacentHTML("beforeend", `
    <div class="modal-backdrop" id="modal"><div class="modal">
      <div class="modal-head"><div><h3>${t ? "Editar turma" : "Criar turma"}</h3><p class="muted">Turmas agrupam usuários, avaliações e cursos.</p></div><button class="close" onclick="closeModal()">×</button></div>
      <div class="form-row">
        <div class="form-group"><label>Nome</label><input id="className" value="${t?.name || ""}"></div>
        <div class="form-group"><label>Área</label><input id="classArea" value="${t?.area || (isGerencia()?currentUser().area:"Geral")}" ${isGerencia() ? "readonly" : ""}></div>
      </div>
      <div class="form-group"><label>Descrição</label><textarea id="classDesc">${t?.description || ""}</textarea></div>
      <div class="form-row">
        <div class="form-group"><label>Status</label><select id="classStatus"><option ${t?.status==="Ativa"?"selected":""}>Ativa</option><option ${t?.status==="Encerrada"?"selected":""}>Encerrada</option><option ${t?.status==="Rascunho"?"selected":""}>Rascunho</option></select></div>
        <div class="form-group"><label>Período</label><div class="form-row"><input type="date" id="classStart" value="${t?.startDate || todayISO()}"><input type="date" id="classEnd" value="${t?.endDate || todayISO()}"></div></div>
      </div>
      <h3>Avaliações vinculadas</h3>
      <div class="grid">${assessments.map(a => `<label class="permission-box"><input type="checkbox" class="classAss" value="${a.id}" ${(t?.assessmentIds||[]).includes(a.id)?"checked":""} style="width:auto;margin-right:8px">${a.titulo}</label>`).join("")}</div>
      <br><h3>Cursos vinculados</h3>
      <div class="grid">${courses.map(c => `<label class="permission-box"><input type="checkbox" class="classCourse" value="${c.id}" ${(t?.courseIds||[]).includes(c.id)?"checked":""} style="width:auto;margin-right:8px">${c.title}</label>`).join("") || `<p class="muted">Nenhum curso criado.</p>`}</div>
      <br><button class="btn gold" onclick="saveClass(${id || "null"})">Salvar turma</button>
    </div></div>
  `);
}

function saveClass(id) {
  const data = {
    name: document.getElementById("className").value.trim(),
    description: document.getElementById("classDesc").value.trim(),
    area: isGerencia() ? currentUser().area : document.getElementById("classArea").value.trim(),
    status: document.getElementById("classStatus").value,
    startDate: document.getElementById("classStart").value,
    endDate: document.getElementById("classEnd").value,
    assessmentIds: [...document.querySelectorAll(".classAss:checked")].map(x=>Number(x.value)),
    courseIds: [...document.querySelectorAll(".classCourse:checked")].map(x=>Number(x.value))
  };
  if (!data.name) return alert("Informe o nome da turma.");
  if (id) {
    const idx = state.classes.findIndex(t=>t.id===id);
    state.classes[idx] = { ...state.classes[idx], ...data };
    log(`Turma editada: ${data.name}`);
  } else {
    state.classes.push({ id: nowId(), ...data, userIds: [] });
    log(`Turma criada: ${data.name}`);
  }
  saveState(); closeModal(); renderTurmas();
}

function openClassMembers(id) {
  const t = state.classes.find(x=>x.id===id);
  const users = respondentUsers();
  document.body.insertAdjacentHTML("beforeend", `
    <div class="modal-backdrop" id="modal"><div class="modal">
      <div class="modal-head"><div><h3>Participantes da turma</h3><p class="muted">${t.name}</p></div><button class="close" onclick="closeModal()">×</button></div>
      <div class="actions" style="margin-bottom:14px"><button class="btn secondary" onclick="document.querySelectorAll('.classUser').forEach(c=>c.checked=true)">Selecionar todos</button><button class="btn secondary" onclick="document.querySelectorAll('.classUser').forEach(c=>c.checked=false)">Limpar</button></div>
      <div class="grid">${users.map(u => `<label class="permission-box"><input type="checkbox" class="classUser" value="${u.id}" ${(t.userIds||[]).includes(u.id)?"checked":""} style="width:auto;margin-right:8px"><b>${u.nome}</b> <small>${userClassNames(u.id)} • ${u.tipo}</small></label>`).join("")}</div>
      <br><button class="btn gold" onclick="saveClassMembers(${id})">Salvar participantes</button>
    </div></div>
  `);
}

function saveClassMembers(id) {
  const t = state.classes.find(x=>x.id===id);
  t.userIds = [...document.querySelectorAll(".classUser:checked")].map(x=>Number(x.value));
  log(`Participantes atualizados na turma: ${t.name}`);
  saveState(); closeModal(); renderTurmas();
}

function toggleClassStatus(id) {
  const t = state.classes.find(x=>x.id===id);
  t.status = t.status === "Ativa" ? "Encerrada" : "Ativa";
  log(`Status da turma alterado: ${t.name}`);
  saveState(); renderTurmas();
}

function renderCursos() {
  if (!canManage()) return layout("Cursos", "", `<section class="section card"><h3>Acesso restrito</h3></section>`);
  const courses = isAdm() ? state.courses : state.courses.filter(c => c.area === currentUser().area || c.area === "Geral");
  const content = `
    <div class="grid cols-4" style="margin-bottom:18px">
      <div class="stat card"><span>Total de cursos</span><strong>${courses.length}</strong></div>
      <div class="stat card"><span>Publicados</span><strong>${courses.filter(c=>c.status==="Publicado").length}</strong></div>
      <div class="stat card"><span>Rascunhos</span><strong>${courses.filter(c=>c.status==="Rascunho").length}</strong></div>
      <div class="stat card"><span>Módulos</span><strong>${courses.reduce((acc,c)=>acc+(c.modules?.length||0),0)}</strong></div>
    </div>
    <section class="section card">
      <div class="section-head">
        <div><h3>Cursos e trilhas</h3><p class="muted">Estrutura inicial para cursos, módulos, vídeos, imagens, materiais e atividades.</p></div>
        <button class="btn gold" onclick="openCourseModal()">Criar curso</button>
      </div>
      <div class="assessment-grid">${courses.map(renderCourseCard).join("") || `<div class="empty"><b>Nenhum curso criado.</b></div>`}</div>
    </section>
  `;
  layout("Cursos", "Base para trilhas de aprendizagem futuras.", content);
}

function renderCourseCard(c) {
  return `
    <div class="assessment-card">
      <div class="assessment-hero">
        <div class="brand-lidere">CURSO</div>
        <span class="badge ${statusBadge(c.status)}">${c.status}</span>
      </div>
      <div class="assessment-content">
        <h3>${c.title}</h3>
        <p class="muted">${c.description || ""}</p>
        <div class="meta-pills"><span>${c.area}</span><span>${c.workload || "Carga não definida"}</span><span>${c.modules?.length || 0} módulo(s)</span></div>
        <div class="actions">
          <button class="btn small secondary" onclick="openCourseModal(${c.id})">Editar</button>
          <button class="btn small secondary" onclick="openModuleBuilder(${c.id})">Módulos</button>
          <button class="btn small outline" onclick="toggleCourseStatus(${c.id})">${c.status==="Publicado"?"Despublicar":"Publicar"}</button>
        </div>
      </div>
    </div>
  `;
}

function openCourseModal(id=null) {
  const c = id ? state.courses.find(x=>x.id===id) : null;
  document.body.insertAdjacentHTML("beforeend", `
    <div class="modal-backdrop" id="modal"><div class="modal">
      <div class="modal-head"><div><h3>${c ? "Editar curso" : "Criar curso"}</h3><p class="muted">Prepare cursos para turmas e trilhas futuras.</p></div><button class="close" onclick="closeModal()">×</button></div>
      <div class="form-row">
        <div class="form-group"><label>Título</label><input id="courseTitle" value="${c?.title || ""}"></div>
        <div class="form-group"><label>Área</label><input id="courseArea" value="${c?.area || (isGerencia()?currentUser().area:"Geral")}" ${isGerencia() ? "readonly" : ""}></div>
      </div>
      <div class="form-group"><label>Descrição</label><textarea id="courseDesc">${c?.description || ""}</textarea></div>
      <div class="form-row">
        <div class="form-group"><label>Status</label><select id="courseStatus"><option ${c?.status==="Rascunho"?"selected":""}>Rascunho</option><option ${c?.status==="Publicado"?"selected":""}>Publicado</option><option ${c?.status==="Arquivado"?"selected":""}>Arquivado</option></select></div>
        <div class="form-group"><label>Carga horária</label><input id="courseWorkload" value="${c?.workload || ""}" placeholder="Ex: 4h"></div>
      </div>
      <button class="btn gold" onclick="saveCourse(${id || "null"})">Salvar curso</button>
    </div></div>
  `);
}

function saveCourse(id) {
  const data = {
    title: document.getElementById("courseTitle").value.trim(),
    description: document.getElementById("courseDesc").value.trim(),
    area: isGerencia() ? currentUser().area : document.getElementById("courseArea").value.trim(),
    status: document.getElementById("courseStatus").value,
    workload: document.getElementById("courseWorkload").value.trim()
  };
  if (!data.title) return alert("Informe o título do curso.");
  if (id) {
    const idx = state.courses.findIndex(c=>c.id===id);
    state.courses[idx] = { ...state.courses[idx], ...data };
    log(`Curso editado: ${data.title}`);
  } else {
    state.courses.push({ id: nowId(), ...data, modules: [] });
    log(`Curso criado: ${data.title}`);
  }
  saveState(); closeModal(); renderCursos();
}

function openModuleBuilder(courseId) {
  const c = state.courses.find(x=>x.id===courseId);
  document.body.insertAdjacentHTML("beforeend", `
    <div class="modal-backdrop" id="modal"><div class="modal">
      <div class="modal-head"><div><h3>Módulos do curso</h3><p class="muted">${c.title}</p></div><button class="close" onclick="closeModal()">×</button></div>
      <div class="grid">${(c.modules||[]).map(m => `
        <div class="permission-box">
          <div class="section-head" style="margin-bottom:8px">
            <div><b>${m.title}</b><br><small>${m.type}</small></div>
            <button class="btn small danger" onclick="deleteModule(${courseId}, ${m.id})">Remover</button>
          </div>
          ${m.mediaUrl ? renderCourseModuleMedia(m) : ""}
          <p class="muted">${m.content || ""}</p>
        </div>`).join("") || `<div class="empty">Nenhum módulo.</div>`}</div>
      <br>
      <h3>Adicionar módulo</h3>
      <div class="form-row">
        <div class="form-group"><label>Título</label><input id="moduleTitle"></div>
        <div class="form-group"><label>Tipo</label><select id="moduleType"><option value="text">Texto</option><option value="video">Vídeo</option><option value="image">Imagem</option><option value="activity">Atividade</option><option value="file">Material</option></select></div>
      </div>
      <div class="form-group"><label>Conteúdo/descrição</label><textarea id="moduleContent"></textarea></div>
      <div class="form-row">
        <div class="form-group"><label>Tipo de mídia</label><select id="moduleMediaType"><option value="">Sem mídia</option><option value="image-url">Imagem por link</option><option value="image-upload">Upload imagem</option><option value="video-url">Vídeo por link/embed</option><option value="video-upload">Upload vídeo pequeno</option></select></div>
        <div class="form-group"><label>URL da mídia</label><input id="moduleMediaUrl" placeholder="https://..."></div>
      </div>
      <div class="form-group"><label>Upload local</label><input type="file" id="moduleMediaFile" accept="image/*,video/*,.pdf"></div>
      <button class="btn gold" onclick="saveModule(${courseId})">Adicionar módulo</button>
    </div></div>
  `);
}

function renderCourseModuleMedia(m) {
  if (m.mediaType?.startsWith("image")) return `<div class="question-media"><img src="${m.mediaUrl}" alt="${m.title}"></div>`;
  if (m.mediaType === "video-url") return `<div class="question-media video"><iframe src="${m.mediaUrl}" allowfullscreen></iframe></div>`;
  if (m.mediaType === "video-upload") return `<div class="question-media video"><video controls src="${m.mediaUrl}"></video></div>`;
  return `<p><a href="${m.mediaUrl}" download>Baixar material</a></p>`;
}

function saveModule(courseId) {
  const c = state.courses.find(x=>x.id===courseId);
  const title = document.getElementById("moduleTitle").value.trim();
  if (!title) return alert("Informe o título do módulo.");
  const mediaType = document.getElementById("moduleMediaType").value;
  const mediaUrlInput = document.getElementById("moduleMediaUrl").value.trim();
  const file = document.getElementById("moduleMediaFile").files[0];
  const add = (mediaUrl = mediaUrlInput) => {
    c.modules.push({
      id: nowId(),
      title,
      type: document.getElementById("moduleType").value,
      content: document.getElementById("moduleContent").value.trim(),
      mediaType,
      mediaUrl
    });
    log(`Módulo adicionado no curso: ${c.title}`);
    saveState(); closeModal(); openModuleBuilder(courseId);
  };
  if ((mediaType === "image-upload" || mediaType === "video-upload") && file) {
    if (file.size > 2500000) return alert("Para teste local, use arquivo menor que 2.5 MB.");
    readFileAsDataUrl(file, add);
  } else {
    add(mediaUrlInput);
  }
}

function deleteModule(courseId, moduleId) {
  const c = state.courses.find(x=>x.id===courseId);
  c.modules = c.modules.filter(m=>m.id!==moduleId);
  log(`Módulo removido do curso: ${c.title}`);
  saveState(); closeModal(); openModuleBuilder(courseId);
}

function toggleCourseStatus(id) {
  const c = state.courses.find(x=>x.id===id);
  c.status = c.status === "Publicado" ? "Rascunho" : "Publicado";
  log(`Status do curso alterado: ${c.title}`);
  saveState(); renderCursos();
}

function renderControle() {
  if (!canManage()) return layout("Controle ADM", "", `<section class="section card"><h3>Acesso restrito</h3></section>`);
  const assessments = visibleAssessments();
  const assessmentIds = assessments.map(a=>a.id);
  const userIds = respondentUsers().map(u=>u.id);
  const rows = state.assignments.filter(x => assessmentIds.includes(x.assessmentId) && userIds.includes(x.userId));
  const total = rows.length;
  const answered = rows.filter(x=>x.status==="Concluída").length;
  const pending = total - answered;
  const percent = total ? Math.round(answered/total*100) : 0;
  const content = `
    <div class="grid cols-4" style="margin-bottom:18px">
      <div class="stat card"><span>Total enviado</span><strong>${total}</strong></div>
      <div class="stat card"><span>Respondidas</span><strong>${answered}</strong></div>
      <div class="stat card"><span>Pendentes</span><strong>${pending}</strong></div>
      <div class="stat card"><span>Conclusão</span><strong>${percent}%</strong></div>
    </div>
    <section class="section card">
      <div class="section-head"><div><h3>Controle geral</h3><p class="muted">Acompanhamento por avaliação.</p></div><button class="btn secondary" onclick="exportCSV()">Exportar CSV</button></div>
      <div class="assessment-grid">
        ${assessments.map(a => {
          const s = assessmentStats(a.id);
          return `<div class="permission-box">
            <div class="section-head"><div><h3>${a.titulo}</h3><p class="muted">${a.area} • ${formatDateBR(a.endsAt)}</p></div><span class="badge ${statusBadge(a.status)}">${a.status}</span></div>
            <div class="progress-row"><div class="track"><div class="fill" style="width:${s.percent}%"></div></div><span>${s.percent}%</span></div>
            <br><div class="meta-pills"><span>${s.total} enviados</span><span>${s.answered} respondidos</span><span>${s.pending} pendentes</span></div>
          </div>`;
        }).join("")}
      </div>
    </section>
    <br>
    <section class="section card">
      <div class="section-head"><div><h3>Controle específico por usuário</h3><p class="muted">Status, prazo, resultado e ações.</p></div></div>
      <table class="table">
        <thead><tr><th>Usuário</th><th>Avaliação</th><th>Status</th><th>Prazo</th><th>Resultado</th><th>Ações</th></tr></thead>
        <tbody>${rows.map(r => {
          const u = state.users.find(x=>x.id===r.userId);
          const a = state.assessments.find(x=>x.id===r.assessmentId);
          return `<tr><td><b>${u?.nome}</b><br><small>${userClassNames(u?.id)} • ${u?.tipo}</small></td><td>${a?.titulo}</td><td><span class="badge ${statusBadge(r.status)}">${r.status}</span></td><td>${formatDateBR(r.dueDate || a?.endsAt)}</td><td>${r.result?.profile || "-"}</td><td class="actions">${r.status==="Concluída"?`<button class="btn small secondary" onclick="openResultModal(${r.id})">Ver resposta</button>`:`<button class="btn small gold" onclick="alert('Lembrete simulado enviado para ${u?.nome}.')">Lembrar</button>`}</td></tr>`;
        }).join("")}</tbody>
      </table>
    </section>
  `;
  layout("Controle ADM", "Geral e específico por usuário.", content);
}
function openResultModal(assignmentId) {
  const r = state.assignments.find(x=>x.id===assignmentId);
  if (!r?.result) return alert("Sem resultado.");
  const u = state.users.find(x=>x.id===r.userId);
  const a = state.assessments.find(x=>x.id===r.assessmentId);
  document.body.insertAdjacentHTML("beforeend", `
    <div class="modal-backdrop" id="modal"><div class="modal">
      <div class="modal-head"><div><h3>Resposta do usuário</h3><p class="muted">${u.nome} • ${a.titulo}</p></div><button class="close" onclick="closeModal()">×</button></div>
      ${renderResultInner(r.result)}
      <h3>Respostas registradas</h3>
      <div class="grid">${(r.answers||[]).map(ans => {
        const q = a.questions.find(q=>q.id===ans.questionId);
        return `<div class="permission-box"><b>${q?.text}</b><br><span>${ans.valueLabel || ans.value || "-"}</span></div>`;
      }).join("") || `<p class="muted">Respostas detalhadas não disponíveis nos dados iniciais.</p>`}</div>
    </div></div>
  `);
}
function exportCSV() {
  const rows = [["Usuário","CPF","Avaliação","Status","Prazo","Resultado"]];
  state.assignments.forEach(r => {
    const u = state.users.find(x=>x.id===r.userId);
    const a = state.assessments.find(x=>x.id===r.assessmentId);
    if (!u || u.perfil !== "USUARIO") return;
    rows.push([u.nome, u.cpf, a?.titulo || "", r.status, r.dueDate || a?.endsAt || "", r.result?.profile || ""]);
  });
  const csv = rows.map(row => row.map(v => `"${String(v).replaceAll('"','""')}"`).join(";")).join("\n");
  downloadText("controle_respostas.csv", csv);
}


function renderMinhas() {
  if (!canAnswer()) return layout("Minhas atividades", "", `<section class="section card"><h3>Área exclusiva de usuários</h3></section>`);

  const pending = state.assignments
    .filter(a => a.userId === currentUser().id && a.status === "Pendente")
    .map(a => ({ assignment: a, assessment: state.assessments.find(x => x.id === a.assessmentId) }))
    .filter(x => x.assessment && x.assessment.status === "Ativa");

  const content = `
    <section class="section card">
      <div class="section-head">
        <div>
          <h3>Minhas atividades</h3>
          <p class="muted">Atividades disponíveis para resposta. Você pode voltar e continuar depois sem perder as respostas já marcadas.</p>
        </div>
        <span class="badge warning">${pending.length} pendente(s)</span>
      </div>

      ${pending.length ? `<div class="user-assessment-grid">
        ${pending.map(({assignment, assessment}) => {
          const draftCount = Object.keys(getDraftAnswers(assignment.id)).length;
          return `
            <div class="user-assessment-card">
              <div class="card-top"><div class="icon todo">!</div><span class="badge warning">Pendente</span></div>
              <h3>${assessment.titulo}</h3>
              <p>${assessment.descricao || "Atividade aguardando resposta."}</p>
              <div class="meta-pills">
                <span>${assessment.questions.length} pergunta(s)</span>
                <span>Prazo ${formatDateBR(assignment.dueDate || assessment.endsAt)}</span>
                ${draftCount ? `<span>Rascunho: ${draftCount} resposta(s)</span>` : ""}
              </div>
              <div class="card-footer">
                <span class="muted">${draftCount ? "Rascunho salvo" : "Liberada"}</span>
                <button class="btn small gold" onclick="startAssessment(${assignment.id})">${draftCount ? "Continuar" : "Responder"}</button>
              </div>
            </div>
          `;
        }).join("")}
      </div>` : `<div class="empty"><b>Nenhuma atividade pendente.</b><p class="muted">Quando houver uma nova atividade liberada, ela aparecerá aqui.</p></div>`}
    </section>
  `;
  layout("Minhas atividades", "Atividades pendentes e disponíveis para resposta.", content);
}

function renderAtividadesRealizadas() {
  if (!canAnswer()) return layout("Atividades realizadas", "", `<section class="section card"><h3>Área exclusiva de usuários</h3></section>`);

  const done = state.assignments
    .filter(a => a.userId === currentUser().id && a.status === "Concluída")
    .map(a => ({ assignment: a, assessment: state.assessments.find(x => x.id === a.assessmentId) }))
    .filter(x => x.assessment);

  const content = `
    <section class="section card">
      <div class="section-head">
        <div>
          <h3>Atividades realizadas</h3>
          <p class="muted">Histórico com as respostas enviadas e os resultados das avaliações anteriores.</p>
        </div>
        <span class="badge success">${done.length} realizada(s)</span>
      </div>

      ${done.length ? `<div class="completed-activities">
        ${done.map(({assignment, assessment}) => `
          <div class="completed-card">
            <div class="completed-head">
              <div>
                <h3>${assessment.titulo}</h3>
                <p class="muted">Respondida em ${formatDateBR(assignment.finishedAt || assignment.assignedAt)}</p>
              </div>
              <span class="badge success">Concluída</span>
            </div>
            ${renderCompletedAnswers(assignment)}
          </div>
        `).join("")}
      </div>` : `<div class="empty"><b>Nenhuma atividade realizada.</b><p class="muted">Depois que você finalizar uma atividade, o resultado aparecerá aqui.</p></div>`}
    </section>
  `;
  layout("Atividades realizadas", "Respostas enviadas e resultados anteriores.", content);
}

function renderUserAssessmentCard(r) {
  const a = state.assessments.find(x=>x.id===r.assessmentId);
  const done = r.status === "Concluída";
  return `
    <div class="user-assessment-card">
      <div class="card-top"><div class="icon ${done?"done":"todo"}">${done?"✓":"!"}</div><span class="badge ${statusBadge(r.status)}">${done?"Respondida":"Pendente"}</span></div>
      <h3>${a?.titulo}</h3>
      <p>${done ? "Você já respondeu esta avaliação." : "Esta avaliação está aguardando sua resposta."}</p>
      <div class="meta-pills"><span>${a?.questions.length} pergunta(s)</span><span>${modeLabel(a?.modeDefault)}</span><span>Prazo ${formatDateBR(r.dueDate || a?.endsAt)}</span></div>
      <div class="card-footer">
        ${done ? `<span><b>Perfil:</b> ${r.result?.profile || "-"}</span><button class="btn small secondary" onclick="openUserResult(${r.id})">Ver resultado</button>` : `<span class="muted">Liberada</span><button class="btn small gold" onclick="startAssessment(${r.id})">Responder</button>`}
      </div>
    </div>
  `;
}

function startAssessment(assignmentId) {
  if (!canAnswer()) return alert("ADM e Gerência não respondem questionários.");
  const ass = state.assignments.find(x=>x.id===assignmentId);
  const a = state.assessments.find(x=>x.id===ass.assessmentId);
  if (!ass || !a) return alert("Avaliação não encontrada.");
  if (a.status !== "Ativa") return alert("Esta avaliação não está ativa.");
  state.answerSession = { assignmentId, questionIndex: 0, answers: getDraftAnswers(assignmentId), preview: false };
  saveState(); renderAnswer();
}
function previewAssessment(assessmentId) {
  const a = state.assessments.find(x=>x.id===assessmentId);
  state.answerSession = { assessmentId, questionIndex: 0, answers: {}, preview: true, mode: a.modeDefault };
  renderAnswer();
}
function answerAssessment() {
  const s = state.answerSession;
  const assignment = s.assignmentId ? state.assignments.find(x=>x.id===s.assignmentId) : null;
  return state.assessments.find(a=>a.id === (s.assessmentId || assignment?.assessmentId));
}
function exitAnswerToActivities() {
  state.answerSession = null;
  state.page = "minhas";
  saveState();
  render();
}

function renderAnswer() {
  const s = state.answerSession;
  const a = answerAssessment();
  const mode = s.mode || a.modeDefault;
  const total = a.questions.length || 1;
  const idx = s.questionIndex || 0;
  const percent = mode === "form" ? 100 : Math.round(((idx+1)/total)*100);
  const q = a.questions[idx];

  document.getElementById("app").innerHTML = `
    <div class="assessment-shell"><div class="assessment-container">
      <div class="answer-brand"><div class="brand-lidere">LIDERE</div><img class="brand-pedra-img" src="assets/logo_preto.png" alt="Pedra Mineração, Concreto e Pavimentação"></div>
      <div class="progress-meta"><span>${mode==="form" ? "FORMULÁRIO" : `PERGUNTA ${idx+1} DE ${total}`}</span><span class="percent">${percent}%</span></div>
      <div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div>
      ${s.preview ? `<div class="actions" style="justify-content:center;margin-top:16px"><button class="btn small secondary" onclick="switchAnswerMode('single-card')">Cartões</button><button class="btn small secondary" onclick="switchAnswerMode('single-list')">Lista</button><button class="btn small secondary" onclick="switchAnswerMode('form')">Formulário</button><button class="btn small outline" onclick="exitAnswer()">Sair</button></div>` : ""}
      ${mode==="form" ? renderAnswerForm(a) : renderSingleQuestion(a, q, mode)}
      <div class="footer-mark"><img src="assets/logo.png" alt="Símbolo Pedra"></div>
    </div></div>
  `;
}
function switchAnswerMode(mode) { state.answerSession.mode = mode; renderAnswer(); }
function renderSingleQuestion(a, q, mode) {
  return `
    <div class="answer-title"><h1>${q?.text || "Sem perguntas"}</h1><p>${q?.subtitle || ""}</p></div>
    ${renderQuestionMedia(q)}
    ${renderQuestionInput(q, mode)}
    <div class="answer-actions">
      <button class="btn secondary" onclick="exitAnswerToActivities()">Sair sem perder respostas</button>
      <button class="btn outline" onclick="prevQuestion()">← Voltar</button>
      <button class="btn gold" onclick="nextQuestion()">${state.answerSession.questionIndex === a.questions.length-1 ? "Finalizar avaliação" : "Próxima pergunta"} →</button>
    </div>
  `;
}
function renderAnswerForm(a) {
  return `
    <div class="answer-title"><h1>Conte um pouco mais sobre você</h1><p>Responda as perguntas abaixo para finalizar.</p></div>
    <div class="form-panel">
      ${a.questions.map(q => `<div class="form-question"><h3>${q.text}</h3>${renderQuestionMedia(q)}${renderQuestionInput(q, "form")}</div>`).join("")}
      <div class="actions" style="justify-content:flex-end"><button class="btn secondary" onclick="exitAnswerToActivities()">Sair sem perder respostas</button><button class="btn outline" onclick="saveDraft()">Salvar rascunho</button><button class="btn gold" onclick="finishAnswer()">Finalizar avaliação</button></div>
    </div>
  `;
}
function renderQuestionInput(q, mode) {
  if (!q) return `<div class="empty">Esta avaliação ainda não possui perguntas.</div>`;
  const val = state.answerSession.answers[q.id];
  if (q.type === "texto") return `<textarea oninput="setAnswer(${q.id}, this.value, this.value)" placeholder="Escreva sua resposta aqui...">${val?.value || ""}</textarea>`;
  if (q.type === "escala" && mode === "form") {
    return `<div class="scale">${q.options.map((op,i)=>`<button class="${val?.index===i?"active":""}" onclick="setAnswer(${q.id}, ${i}, '${escapeAttr(op.label)}')">${op.label}</button>`).join("")}</div>`;
  }
  const cls = mode === "single-list" ? "list-option" : mode === "form" ? "form-choice" : "big-option";
  const wrapStart = mode === "single-list" ? `<div class="list-box">` : `<div class="${mode==="form" ? "form-options" : "answer-list"}">`;
  return wrapStart + q.options.map((op,i)=>`
    <button class="${cls} ${val?.index===i?"selected":""}" onclick="setAnswer(${q.id}, ${i}, '${escapeAttr(op.label)}')"><span class="radio"></span>${op.label}</button>
  `).join("") + `</div>`;
}
function escapeAttr(s) { return String(s).replaceAll("'","&#39;").replaceAll('"',"&quot;"); }
function setAnswer(questionId, value, label) {
  const a = answerAssessment();
  const q = a.questions.find(q=>q.id===questionId);
  const answer = { questionId, value, index: typeof value === "number" ? value : null, valueLabel: label };
  state.answerSession.answers[questionId] = answer;
  saveDraftAnswer(questionId, answer);
  saveState(); renderAnswer();
}
function validateCurrent(q) {
  if (!q?.required) return true;
  const ans = state.answerSession.answers[q.id];
  return ans && ans.value !== "" && ans.value !== undefined;
}
function prevQuestion() {
  if (state.answerSession.questionIndex > 0) {
    state.answerSession.questionIndex--;
    renderAnswer();
  }
}
function nextQuestion() {
  const a = answerAssessment();
  const q = a.questions[state.answerSession.questionIndex];
  if (!validateCurrent(q)) return alert("Responda a pergunta obrigatória.");
  if (state.answerSession.questionIndex < a.questions.length - 1) {
    state.answerSession.questionIndex++;
    renderAnswer();
  } else finishAnswer();
}
function saveDraft() {
  saveState();
  alert("Rascunho salvo localmente.");
}
function finishAnswer() {
  const s = state.answerSession;
  const a = answerAssessment();
  for (const q of a.questions) {
    if (q.required && !s.answers[q.id]) return alert(`Responda a pergunta obrigatória: ${q.text}`);
  }
  const result = calculateResult(a, s.answers);
  if (!s.preview) {
    const ass = state.assignments.find(x=>x.id===s.assignmentId);
    ass.status = "Concluída";
    ass.finishedAt = todayISO();
    ass.result = result;
    ass.answers = Object.values(s.answers);
    clearDraftAnswers(ass.id);
    log(`Avaliação respondida: ${a.titulo}`);
    saveState();
  }
  document.getElementById("app").innerHTML = `
    <div class="assessment-shell"><div class="assessment-container">
      <div class="answer-brand"><div class="brand-lidere">LIDERE</div><img class="brand-pedra-img" src="assets/logo_preto.png" alt="Pedra Mineração, Concreto e Pavimentação"></div>
      <div class="answer-title"><h1>Resultado da avaliação</h1><p>Perfil calculado com base nas respostas.</p></div>
      ${renderResultInner(result)}
      <div class="answer-actions" style="justify-content:center"><button class="btn gold" onclick="state.page='realizadas'; exitAnswer()">Ver atividades realizadas</button></div>
    </div></div>
  `;
}
function calculateResult(a, answers) {
  const scores = { analitico: 0, colaborativo: 0, executor: 0, comunicador: 0 };
  a.questions.forEach(q => {
    const ans = answers[q.id];
    if (!ans) return;
    if (q.type === "texto") {
      const t = String(ans.value || "").toLowerCase();
      if (t.includes("equipe") || t.includes("ajudar") || t.includes("escuta")) scores.colaborativo += 2;
      if (t.includes("organiza") || t.includes("detalhe") || t.includes("analis")) scores.analitico += 2;
      if (t.includes("decisão") || t.includes("resultado") || t.includes("rápido")) scores.executor += 2;
      if (t.includes("comunica") || t.includes("energia") || t.includes("pessoas")) scores.comunicador += 2;
      return;
    }
    const op = q.options[ans.index];
    if (!op) return;
    Object.entries(op.scores || {}).forEach(([k,v]) => scores[k] = (scores[k] || 0) + Number(v || 0));
  });
  const winner = Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][0];
  return { profile: profileLabels[winner], profileKey: winner, scores };
}
function renderResultInner(result) {
  return `
    <div class="result-box">
      <span class="badge success">Perfil principal</span><br>
      <strong class="result-profile">${result.profile}</strong>
      <p class="muted">${profileDescriptions[result.profileKey] || "Resultado gerado."}</p>
      <div class="result-bars">
        ${Object.entries(result.scores).map(([k,v]) => {
          const max = Math.max(...Object.values(result.scores), 1);
          const w = Math.round((v/max)*100);
          return `<div class="result-row"><b>${profileLabels[k]}</b><div class="track"><div class="fill" style="width:${w}%"></div></div><span>${v}</span></div>`;
        }).join("")}
      </div>
    </div>
  `;
}
function exitAnswer() {
  state.answerSession = null;
  saveState();
  setPage(canAnswer() ? (state.page || "minhas") : "avaliacoes");
}
function openUserResult(assignmentId) {
  const r = state.assignments.find(x=>x.id===assignmentId);
  if (!r?.result) return alert("Resultado indisponível.");
  document.body.insertAdjacentHTML("beforeend", `<div class="modal-backdrop" id="modal"><div class="modal"><div class="modal-head"><div><h3>Resultado</h3></div><button class="close" onclick="closeModal()">×</button></div>${renderResultInner(r.result)}</div></div>`);
}

function renderResultados() {
  const users = respondentUsers();
  const assignments = state.assignments.filter(r => users.some(u=>u.id===r.userId));
  const content = `
    <section class="section card">
      <div class="section-head"><div><h3>Resultados</h3><p class="muted">Apenas usuários respondentes entram nesta visão.</p></div><button class="btn secondary" onclick="exportCSV()">Exportar CSV</button></div>
      <table class="table">
        <thead><tr><th>Usuário</th><th>Avaliação</th><th>Status</th><th>Resultado</th><th>Data</th><th>Ações</th></tr></thead>
        <tbody>${assignments.map(r => {
          const u = state.users.find(x=>x.id===r.userId);
          const a = state.assessments.find(x=>x.id===r.assessmentId);
          return `<tr><td><b>${u?.nome}</b></td><td>${a?.titulo}</td><td><span class="badge ${statusBadge(r.status)}">${r.status}</span></td><td>${r.result?.profile || "-"}</td><td>${formatDateBR(r.finishedAt)}</td><td>${r.result?`<button class="btn small secondary" onclick="openResultModal(${r.id})">Ver</button>`:""}</td></tr>`;
        }).join("")}</tbody>
      </table>
    </section>
  `;
  layout("Resultados", "Resultados gerais e por usuário.", content);
}

/* Anexos/arquivos removidos da navegação e da experiência principal. */

function renderLogs() {
  if (!isAdm()) return;
  const content = `
    <section class="section card">
      <div class="section-head"><div><h3>Logs de auditoria</h3><p class="muted">Registro local de ações importantes.</p></div><button class="btn secondary" onclick="downloadText('logs.json', JSON.stringify(state.auditLogs,null,2))">Exportar JSON</button></div>
      <table class="table"><thead><tr><th>Data</th><th>Usuário</th><th>Ação</th></tr></thead><tbody>${state.auditLogs.map(l => {const u=state.users.find(x=>x.id===l.userId);return `<tr><td>${l.createdAt}</td><td>${u?.nome || "-"}</td><td>${l.action}</td></tr>`}).join("")}</tbody></table>
    </section>
  `;
  layout("Logs", "Auditoria local.", content);
}
function renderConfig() {
  if (!isAdm()) return;
  const content = `
    <section class="section card">
      <div class="section-head"><div><h3>Configurações locais</h3><p class="muted">Ferramentas para teste local.</p></div></div>
      <div class="grid cols-2">
        <div class="permission-box"><h3>Backup</h3><p class="muted">Exporta todos os dados locais em JSON.</p><button class="btn secondary" onclick="backupData()">Baixar backup</button></div>
        <div class="permission-box"><h3>Restaurar</h3><p class="muted">Importa um backup JSON salvo anteriormente.</p><input type="file" id="restoreInput" accept=".json"><br><br><button class="btn secondary" onclick="restoreData()">Restaurar backup</button></div>
        <div class="permission-box"><h3>Reset</h3><p class="muted">Apaga os dados locais e volta ao estado inicial.</p><button class="btn danger" onclick="resetSystem()">Resetar sistema local</button></div>
        <div class="permission-box"><h3>Produção</h3><p class="muted">Para funcionar online de verdade, precisa migrar estes dados para backend e banco.</p></div>
      </div>
    </section>
  `;
  layout("Configurações", "Backup, restauração e reset.", content);
}
function backupData() { downloadText("backup_lidere.json", JSON.stringify(state, null, 2)); }
function restoreData() {
  const file = document.getElementById("restoreInput").files[0];
  if (!file) return alert("Escolha um arquivo JSON.");
  const reader = new FileReader();
  reader.onload = () => {
    try {
      state = JSON.parse(reader.result);
      saveState();
      alert("Backup restaurado.");
      render();
    } catch { alert("Arquivo inválido."); }
  };
  reader.readAsText(file);
}
function downloadText(name, text) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = name; a.click();
  URL.revokeObjectURL(url);
}

function closeModal() { document.getElementById("modal")?.remove(); }

function render() {
  if (!currentUser()) {
    return renderLogin();
  }
  if (state.answerSession) return renderAnswer();

  const routes = {
    dashboard: renderDashboard,
    usuarios: renderUsuarios,
    avaliacoes: renderAvaliacoes,
    controle: renderControle,
    minhas: renderMinhas,
    realizadas: renderAtividadesRealizadas,
    resultados: renderResultados,
    logs: renderLogs,
    config: renderConfig
  };

  if (!routes[state.page]) {
    state.page = "dashboard";
    saveState();
  }

  if (currentUser()?.perfil === "USUARIO" && !["minhas","realizadas"].includes(state.page)) {
    state.page = "minhas";
    saveState();
  }
  routes[state.page]();
}

render();
