 // ---------- "Banco de dados" no localStorage ----------
    // Sem backend: lê os usuários que foram salvos na tela de cadastro.
    function getUsuarios() {
      const dados = localStorage.getItem('usuarios');
      return dados ? JSON.parse(dados) : [];
    }

    document.querySelectorAll('.field-msg').forEach((el) => {// seleciona todas as mensagens de erro
        el.style.display = 'none';// esconde mensagens de erro inicialmente
    }); // esconde mensagens de erro inicialmente

    // ---------- Mostrar/ocultar senha ----------
    const senhaInput = document.getElementById('senha');// input de senha
    const togglePass = document.getElementById('toggle-pass');// botão para mostrar/ocultar senha
 
    togglePass.addEventListener('click', () => {// adiciona evento de clique no botão para mostrar/ocultar senha
      const isHidden = senhaInput.type === 'password';// verifica se a senha está oculta
      senhaInput.type = isHidden ? 'text' : 'password';// alterna entre mostrar e ocultar a senha
      togglePass.textContent = isHidden ? 'ocultar' : 'mostrar';// alterna o texto do botão entre "mostrar" e "ocultar"
    }); // alterna entre mostrar e ocultar a senha
 
    // ---------- Toast ----------
    const toast = document.getElementById('toast');// elemento de mensagem temporária
    let toastTimer; // timer para esconder o toast automaticamente
 
    function showToast(msg) {
      toast.textContent = msg;// define a mensagem do toast
      toast.classList.add('show');// adiciona a classe para mostrar o toast
      clearTimeout(toastTimer);// limpa o timer anterior, se houver
      toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);// remove a classe para esconder o toast após 3,2 segundos
    } // exibe uma mensagem temporária na tela
 
    // ---------- Validação ----------
    const form = document.getElementById('login-form'); // formulário de login
    const emailField = document.getElementById('field-email');// campo de e-mail
    const emailInput = document.getElementById('email');//  input de e-mail
    const senhaField = document.getElementById('field-senha');// campo de senha
    const submitBtn = document.getElementById('submit-btn');// botão de envio do formulário
 
    function isValidEmail(value) {// função para validar e-mail
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);// verifica se o e-mail é válido usando regex
    }// verifica se o e-mail é válido usando regex
 
    function setError(fieldEl, hasError) {
      fieldEl.classList.toggle('has-error', hasError);// adiciona ou remove a classe de erro no campo
      if (hasError) {// se houver erro, adiciona a classe de animação de shake
        fieldEl.classList.add('shake');// adiciona a classe de animação de shake
        setTimeout(() => fieldEl.classList.remove('shake'), 350);// adiciona a classe de animação de shake e remove após 350ms
      }// adiciona ou remove a classe de erro e animação de shake no campo
    }// adiciona ou remove a classe de erro e animação de shake no campo
 
    form.addEventListener('submit', (e) => {// adiciona evento de envio do formulário
      e.preventDefault();// impede o envio do formulário para validação
 
      const emailOk = isValidEmail(emailInput.value.trim());// valida se o e-mail é válido
      const senhaOk = senhaInput.value.length >= 6;// valida se a senha tem pelo menos 6 caracteres
 
      setError(emailField, !emailOk);// valida os campos e adiciona ou remove a classe de erro
      setError(senhaField, !senhaOk);// valida os campos e adiciona ou remove a classe de erro
 
      if (!emailOk || !senhaOk) {// se houver erros, exibe uma mensagem de aviso e não prossegue com o "login"
        showToast('Verifique os campos destacados.');// exibe uma mensagem de aviso se houver erros
        return;
      }// se houver erros, exibe uma mensagem de aviso e não prossegue com o "login"
 
      // Verifica as credenciais fixas (sem backend/banco de dados)
      submitBtn.classList.add('loading');// adiciona o estado de carregamento do botão
      submitBtn.disabled = true;// adiciona o estado de carregamento do botão
 
      setTimeout(() => {
        submitBtn.classList.remove('loading');// remove o estado de carregamento do botão
        submitBtn.disabled = false;// remove o estado de carregamento do botão

        const email = emailInput.value.trim().toLowerCase();
        const usuarios = getUsuarios();
        const usuario = usuarios.find((u) => u.email === email && u.senha === senhaInput.value);

        if (usuario) {
          // Guarda que o usuário está "logado" enquanto a aba estiver aberta
          sessionStorage.setItem('logado', 'true');
          sessionStorage.setItem('usuarioLogado', usuario.email);
          window.location.href = 'index.html';
        } else {
          setError(emailField, true);
          setError(senhaField, true);
          showToast('E-mail ou senha incorretos. Cadastre-se primeiro se ainda não tem conta.');
        }
      }, 1100);// simula um pequeno atraso, como se estivesse validando
    }); // valida os campos, checa as credenciais fixas e redireciona se estiver tudo certo
 
    // limpa erro ao digitar de novo
    emailInput.addEventListener('input', () => setError(emailField, false)); // remove a classe de erro do campo de e-mail ao digitar
    senhaInput.addEventListener('input', () => setError(senhaField, false));// remove a classe de erro do campo de senha ao digitar
 
    // ---------- Glow que segue o mouse no painel da marca ----------
    const brand = document.querySelector('.brand');// painel da marca
    brand.addEventListener('mousemove', (e) => {// adiciona evento de movimento do mouse no painel da marca
      const rect = brand.getBoundingClientRect();// obtém as dimensões e posição do painel da marca
      const x = ((e.clientX - rect.left) / rect.width) * 100;// calcula a posição do mouse em porcentagem relativa ao painel
      const y = ((e.clientY - rect.top) / rect.height) * 100;// calcula a posição do mouse em porcentagem relativa ao painel
      brand.style.setProperty('--mx', x + '%');// atualiza as variáveis CSS para criar o efeito de brilho que segue o mouse
      brand.style.setProperty('--my', y + '%');// atualiza as variáveis CSS para criar o efeito de brilho que segue o mouse
    });// cria um efeito de brilho que segue o mouse no painel da marca