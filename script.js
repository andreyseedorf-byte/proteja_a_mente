const menuButton = document.querySelector('.menu-toggle');
const siteMenu = document.querySelector('#site-menu');

if (menuButton && siteMenu) {
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    siteMenu.classList.remove('is-open');
  };

  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    siteMenu.classList.toggle('is-open', !open);
  });

  siteMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      menuButton.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 768px)').matches) closeMenu();
  });
}

const supportForm = document.querySelector('#supportForm');
const message = document.querySelector('#message');
const messageCount = document.querySelector('#messageCount');
const supportFeedback = document.querySelector('#supportFeedback');

if (message && messageCount) {
  const updateCount = () => { messageCount.textContent = String(message.value.length); };
  message.addEventListener('input', updateCount);
  updateCount();
}

if (supportForm && supportFeedback) {
  supportForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const consent = document.querySelector('#consent');
    if (!message.value.trim() || !consent.checked) {
      supportFeedback.className = 'form-feedback error';
      supportFeedback.textContent = 'Preencha a descrição e confirme que compreendeu o funcionamento demonstrativo do formulário.';
      if (!message.value.trim()) message.focus();
      return;
    }
    supportFeedback.className = 'form-feedback success';
    supportFeedback.textContent = 'Pedido validado localmente. Para obter atendimento, use um canal oficial do Mural.';
    supportForm.reset();
    if (messageCount) messageCount.textContent = '0';
  });
}

const quizForm = document.querySelector('#quizForm');
const quizFeedback = document.querySelector('#quizFeedback');
if (quizForm && quizFeedback) {
  quizForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const score = quizForm.querySelectorAll('input[name="q"]:checked').length;
    let text = 'Poucos sinais identificados. Continue observando seus hábitos e mantendo pausas saudáveis.';
    if (score >= 3 && score <= 5) text = 'Alguns sinais merecem atenção. Converse com alguém de confiança e experimente mudanças pequenas na rotina.';
    if (score >= 6) text = 'Muitos sinais foram identificados. Procure apoio de uma pessoa de confiança ou de um profissional qualificado.';
    quizFeedback.className = 'form-feedback success';
    quizFeedback.innerHTML = `<strong>${score} de 8 itens</strong><br>${text}`;
  });
}

const mythWidget = document.querySelector('[data-myth-widget]');
if (mythWidget) {
  const mythItems = [
    { label: 'Mito', kind: 'myth', statement: '“É só uma brincadeira.”', explanation: 'Se alguém se sente humilhado, ameaçado ou excluído, a situação precisa ser levada a sério.', answer: 'mito' },
    { label: 'Verdade', kind: 'fact', statement: '“Pedir ajuda é uma atitude de coragem.”', explanation: 'Contar o que aconteceu permite interromper a violência e construir uma rede de proteção.', answer: 'verdade' },
    { label: 'Mito', kind: 'myth', statement: '“Compartilhar uma ofensa não causa dano.”', explanation: 'Cada compartilhamento amplia o alcance da violência e pode aumentar o sofrimento da pessoa atingida.', answer: 'mito' },
    { label: 'Verdade', kind: 'fact', statement: '“Guardar evidências pode ajudar no encaminhamento.”', explanation: 'Links, mensagens e registros podem ajudar um adulto ou serviço responsável a entender o que aconteceu.', answer: 'verdade' }
  ];
  let mythIndex = 0;
  const label = document.querySelector('#mythLabel');
  const counter = document.querySelector('#mythCounter');
  const statement = document.querySelector('#mythStatement');
  const explanation = document.querySelector('#mythExplanation');
  const feedback = document.querySelector('#mythFeedback');
  const renderMyth = () => {
    const item = mythItems[mythIndex];
    label.textContent = item.label;
    label.className = `myth-tag ${item.kind}`;
    counter.textContent = `${mythIndex + 1} de ${mythItems.length}`;
    statement.textContent = item.statement;
    explanation.textContent = item.explanation;
    feedback.textContent = '';
    feedback.className = 'form-feedback';
  };
  mythWidget.querySelectorAll('[data-myth-answer]').forEach((button) => {
    button.addEventListener('click', () => {
      const item = mythItems[mythIndex];
      const correct = button.dataset.mythAnswer === item.answer;
      feedback.className = `form-feedback ${correct ? 'success' : 'error'}`;
      feedback.textContent = correct ? 'Resposta correta. Muito bem!' : `A resposta é “${item.label.toLowerCase()}”. Leia a explicação e tente novamente.`;
      if (correct) window.setTimeout(() => { mythIndex = (mythIndex + 1) % mythItems.length; renderMyth(); }, 850);
    });
  });
}
