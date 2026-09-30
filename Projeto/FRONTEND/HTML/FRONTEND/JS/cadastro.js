 // esconde as mensagens de erro assim que a página carrega
    document.querySelectorAll('.field-msg').forEach((el) => { el.style.display = 'none'; });

    // mostrar/ocultar senha
    const senhaInput = document.getElementById('senha');
    const togglePass = document.getElementById('toggle-pass');
    togglePass.addEventListener('click', () => {
      const isHidden = senhaInput.type === 'password';
      senhaInput.type = isHidden ? 'text' : 'password';
      togglePass.textContent = isHidden ? 'ocultar' : 'mostrar';
    });

    // toast
    const toast = document.getElementById('toast');
    let toastTimer;
    function showToast(msg) {
      toast.textContent = msg;
      toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
    }

    // ---------- "Banco de dados" no localStorage ----------
    // Guarda uma lista de usuários (e-mail + senha) direto no navegador.
    function getUsuarios() {
      const dados = localStorage.getItem('usuarios');
      return dados ? JSON.parse(dados) : [];
    }

    function salvarUsuarios(lista) {
      localStorage.setItem('usuarios', JSON.stringify(lista));
    }

    // validação
    const form = document.getElementById('cadastro-form');
    const emailField = document.getElementById('field-email');
    const emailInput = document.getElementById('email');
    const senhaField = document.getElementById('field-senha');
    const submitBtn = document.getElementById('submit-btn');

    function isValidEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function setError(fieldEl, hasError, mensagem) {
      fieldEl.classList.toggle('has-error', hasError);
      const msg = fieldEl.querySelector('.field-msg');
      if (msg) {
        if (mensagem) msg.textContent = mensagem;
        msg.style.display = hasError ? 'block' : 'none';
      }
      if (hasError) {
        fieldEl.classList.add('shake');
        setTimeout(() => fieldEl.classList.remove('shake'), 350);
      }
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const emailOk = isValidEmail(emailInput.value.trim());
      const senhaOk = senhaInput.value.length >= 6;

      setError(emailField, !emailOk);
      setError(senhaField, !senhaOk);

      if (!emailOk || !senhaOk) {
        showToast('Verifique os campos destacados.');
        return;
      }

      const email = emailInput.value.trim().toLowerCase();
      const usuarios = getUsuarios();
      const jaExiste = usuarios.some((u) => u.email === email);

      if (jaExiste) {
        setError(emailField, true, 'Esse e-mail já está cadastrado.');
        showToast('Esse e-mail já está cadastrado.');
        return;
      }

      // Sem backend: salva o usuário direto no localStorage do navegador.
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;

        usuarios.push({ email, senha: senhaInput.value });
        salvarUsuarios(usuarios);

        showToast('Conta criada! Redirecionando para o login...');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1200);
      }, 1000);
    });

    emailInput.addEventListener('input', () => setError(emailField, false));
    senhaInput.addEventListener('input', () => setError(senhaField, false));

    // brilho que segue o mouse
    const brand = document.querySelector('.brand');
    brand.addEventListener('mousemove', (e) => {
      const rect = brand.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      brand.style.setProperty('--mx', x + '%');
      brand.style.setProperty('--my', y + '%');
    });