const inputTarefa = document.getElementById('input-tarefas');
const botaoAdicionar = document.getElementById('botao-adicionar');
const listaTarefas = document.getElementById('tarefas');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function criarTarefaNaTela(tarefa) {
    const novaTarefa = document.createElement('li');
    novaTarefa.textContent = tarefa.texto;

    if (tarefa.concluida) {
        novaTarefa.classList.add('concluida');
    }

    const botaoExcluir = document.createElement('button');
    botaoExcluir.textContent = 'Excluir';
    novaTarefa.appendChild(botaoExcluir);

    novaTarefa.addEventListener('click', function() {
        tarefa.concluida = !tarefa.concluida;
        novaTarefa.classList.toggle('concluida');
        salvarTarefas();
    });

    botaoExcluir.addEventListener('click', function(event) {
        event.stopPropagation();
        listaTarefas.removeChild(novaTarefa);
        tarefas = tarefas.filter(function(t) { return t !== tarefa; });
        salvarTarefas();
    });

    listaTarefas.appendChild(novaTarefa);
}

botaoAdicionar.addEventListener('click', function() {
    const textoTarefa = inputTarefa.value;

    if (textoTarefa === '') {
        return;
    }

    const novaTarefaObj = { texto: textoTarefa, concluida: false };
    tarefas.push(novaTarefaObj);
    salvarTarefas();

    criarTarefaNaTela(novaTarefaObj);
    inputTarefa.value = '';
});

tarefas.forEach(criarTarefaNaTela);

inputTarefa.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        botaoAdicionar.click();
    }
});