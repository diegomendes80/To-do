const adcNovaTarefaInput = document.querySelector('#adc-nova-tarefa__input');
const sectionListaTarefas = document.querySelector('.menu__lista-de-tarefas');
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
const botaoRemoverCompletas = document.querySelector('.controls__botao-limpar-completas');
const botaoMostraTodas = document.querySelectorAll('.botoes__botao-mostra-todas');
const botaoMostraAtivas = document.querySelectorAll('.botoes__botao-mostra-ativas');
const botaoMostraCompletas = document.querySelectorAll('.botoes__botao-mostra-completas');

// Cria um novo elemento de tarefa
function criaElementoTarefa(tarefa) {
    const li = document.createElement('li');
    li.classList.add('lista-de-tarefas__tarefa');

    

    if (tarefa.completa) {
        li.classList.add('completed');
    }

     li.innerHTML = `
        <input type="radio" class="tarefa__input-radio" ${tarefa.completa ? 'checked' : ''}>
        <p class="tarefa__descricao">${tarefa.descricao}</p>
        <img src="images/icon-cross.svg" alt="clique para remover essa tarefa" class="tarefa__botao-remover-tarefa">
    `;

    const botaoConcluir = li.querySelector('.tarefa__input-radio');
    botaoConcluir.addEventListener('change', function() {
        concluirTarefa(li, tarefa);
    });

    const botaoRemover = li.querySelector('.tarefa__botao-remover-tarefa');
    botaoRemover.addEventListener('click', function() {
        removerTarefa(li, tarefa.descricao);
    });

    aplicarEstiloTarefa(li);

    return li;
}

// Marca uma tarefa como concluída
function concluirTarefa(li, tarefa) {
    // Marca a tarefa como concluída
    tarefa.completa = true;
    
    // Adiciona a classe de tarefa concluída no elemento da lista
    li.classList.add('completed');

    // Atualiza a lista de tarefas na localStorage sem remover a tarefa
    // Atualiza a tarefa específica na lista de tarefas
    tarefas = tarefas.map(tarefaAtual => {
        if (tarefaAtual.descricao === tarefa.descricao) {
            return { ...tarefaAtual, completa: true };
        }
        return tarefaAtual;
    });

    localStorage.setItem('tarefas', JSON.stringify(tarefas));

    atualizaQuantidade(); // Atualiza a quantidade após concluir a tarefa
}

// Remove uma tarefa
function removerTarefa(li, descricao) {

    tarefas = tarefas.filter(tarefa => tarefa.descricao !== descricao);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    li.remove();
    atualizaQuantidade(); // Atualiza a quantidade após remover a tarefa
}

// Adiciona uma nova tarefa
function adicionaTarefa(descricao_tarefa) {
    const tarefa = {
        descricao: descricao_tarefa,
        completa: false
    };

    tarefas.push(tarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    const elementoTarefa = criaElementoTarefa(tarefa);
    sectionListaTarefas.append(elementoTarefa);
    adcNovaTarefaInput.value = '';
    atualizaQuantidade(); // Atualiza a quantidade após adicionar a tarefa
}

// Carrega tarefas da localStorage ao iniciar a página
function carregarTarefas() {

    sectionListaTarefas.innerHTML = '';

    tarefas.forEach(tarefa => {
        const elementoTarefa = criaElementoTarefa(tarefa);
        sectionListaTarefas.append(elementoTarefa);
    });
    atualizaQuantidade(); // Atualiza a quantidade inicial ao carregar as tarefas
}

function aplicarEstiloTarefa(li) {
    const descricao = li.querySelector('.tarefa__descricao');
    const theme = document.documentElement.dataset.theme;

    descricao.style.color = theme === 'dark' ? "hsl(236, 33%, 92%)" : "hsl(235, 21%, 11%)";
}

// Atualiza a quantidade de tarefas restantes
function atualizaQuantidade() {
    const tarefasRestantes = tarefas.filter(tarefa => !tarefa.completa);
    document.querySelector('.items-left__qtd').textContent = tarefasRestantes.length;
}

// Adiciona evento ao input para adicionar tarefa ao pressionar Enter
adcNovaTarefaInput.addEventListener('keydown', function(event) {
    let descricao_tarefa = adcNovaTarefaInput.value.trim();
    if(event.key === 'Enter' && descricao_tarefa !== '') {
        adicionaTarefa(descricao_tarefa);
    }
});

botaoRemoverCompletas.onclick = () => {
    tarefas = tarefas.filter(tarefa => !tarefa.completa);
    carregarTarefas();
}

botaoMostraCompletas.forEach(botao => {
    botao.onclick = () => {
        sectionListaTarefas.innerHTML = '';
    
        tarefas.forEach(tarefa => {
            if(tarefa.completa){
                const elementoTarefa = criaElementoTarefa(tarefa);
                sectionListaTarefas.append(elementoTarefa);
            }
        })
    
    }
})

botaoMostraAtivas.forEach(botao => {
    botao.onclick = () => {
        sectionListaTarefas.innerHTML = '';
    
        tarefas.forEach(tarefa => {
            if(!tarefa.completa){
                const elementoTarefa = criaElementoTarefa(tarefa);
                sectionListaTarefas.append(elementoTarefa);
            }
        })
    
    }
    
})

botaoMostraTodas.forEach(botao => {
    botao.onclick = () => {
        carregarTarefas();
    }
})

// Carrega as tarefas ao iniciar a página
window.onload = carregarTarefas;
