// JavaScript da Sprint 2 - Hub TdB
// Menu, formulário e exemplos dos portais.

// Abre e fecha o menu no celular.
const botaoMenu = document.getElementById('botao-menu');
const menu = document.getElementById('menu-principal');

if (botaoMenu && menu) {
    botaoMenu.addEventListener('click', function () {
        if (menu.classList.contains('aberto')) {
            menu.classList.remove('aberto');
            botaoMenu.textContent = '☰';
            botaoMenu.setAttribute('aria-expanded', 'false');
            botaoMenu.setAttribute('aria-label', 'Abrir menu');
        } else {
            menu.classList.add('aberto');
            botaoMenu.textContent = '✕';
            botaoMenu.setAttribute('aria-expanded', 'true');
            botaoMenu.setAttribute('aria-label', 'Fechar menu');
        }
    });
}

// Usa um avatar de reserva quando a foto do GitHub não carregar.
const fotosEquipe = document.querySelectorAll('.foto-equipe');
for (let i = 0; i < fotosEquipe.length; i++) {
    fotosEquipe[i].addEventListener('error', function () {
        const imagemReserva = this.getAttribute('data-fallback');
        if (imagemReserva && this.getAttribute('src') !== imagemReserva) {
            this.src = imagemReserva;
        }
    });
}

// Limpa os avisos dos campos e mostra uma mensagem se houver erro.
function mostrarErro(campo, mensagem) {
    const aviso = document.getElementById('erro-' + campo.id);
    if (aviso) {
        aviso.textContent = mensagem;
    }

    if (mensagem !== '') {
        campo.classList.add('campo-erro');
        campo.setAttribute('aria-invalid', 'true');
    } else {
        campo.classList.remove('campo-erro');
        campo.setAttribute('aria-invalid', 'false');
    }
}

// Contato: conferimos os dados, mas não enviamos a mensagem.
const formularioContato = document.getElementById('form-contato');

if (formularioContato) {
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const assunto = document.getElementById('assunto');
    const mensagem = document.getElementById('mensagem');
    const resposta = document.getElementById('mensagem-contato');

    formularioContato.addEventListener('submit', function (evento) {
        evento.preventDefault();

        let formularioValido = true;
        const enderecoEmail = email.value.trim();
        const posicaoArroba = enderecoEmail.indexOf('@');
        const posicaoPonto = enderecoEmail.lastIndexOf('.');

        mostrarErro(nome, '');
        mostrarErro(email, '');
        mostrarErro(assunto, '');
        mostrarErro(mensagem, '');

        if (nome.value.trim().length < 2) {
            mostrarErro(nome, 'Digite seu nome.');
            formularioValido = false;
        }

        if (posicaoArroba < 1 || posicaoPonto <= posicaoArroba + 1 || posicaoPonto >= enderecoEmail.length - 1 || enderecoEmail.indexOf(' ') !== -1) {
            mostrarErro(email, 'Digite um e-mail válido.');
            formularioValido = false;
        }

        if (assunto.value === '') {
            mostrarErro(assunto, 'Escolha um assunto.');
            formularioValido = false;
        }

        if (mensagem.value.trim().length < 10) {
            mostrarErro(mensagem, 'Escreva pelo menos 10 caracteres.');
            formularioValido = false;
        }

        if (formularioValido) {
            resposta.textContent = 'Campos conferidos! Este formulário é apenas uma demonstração e não envia e-mails.';
            formularioContato.reset();
        } else {
            resposta.textContent = 'Confira os campos destacados em vermelho.';
        }
    });

    // Ao corrigir um campo, o aviso anterior desaparece.
    const camposContato = formularioContato.querySelectorAll('input, select, textarea');
    for (let i = 0; i < camposContato.length; i++) {
        camposContato[i].addEventListener('input', function () {
            mostrarErro(this, '');
        });
        camposContato[i].addEventListener('change', function () {
            mostrarErro(this, '');
        });
    }
}

// Portal do Doador: filtra os beneficiários do exemplo.
const filtroStatus = document.getElementById('filtro-status');

if (filtroStatus) {
    filtroStatus.addEventListener('change', function () {
        const linhas = document.querySelectorAll('#tabela-pacientes tbody tr');
        let total = 0;

        for (let i = 0; i < linhas.length; i++) {
            const status = linhas[i].getAttribute('data-status');

            if (filtroStatus.value === 'todos' || filtroStatus.value === status) {
                linhas[i].hidden = false;
                total = total + 1;
            } else {
                linhas[i].hidden = true;
            }
        }

        const resultado = document.getElementById('resultado-filtro');
        if (total === 1) {
            resultado.textContent = '1 beneficiário encontrado.';
        } else {
            resultado.textContent = total + ' beneficiários encontrados.';
        }
    });
}

// Escolha do valor da doação (sem pagamento real).
const formularioDoacao = document.getElementById('form-doacao');

if (formularioDoacao) {
    const opcoes = formularioDoacao.querySelectorAll('input[name="valor"]');
    const valorEscolhido = document.getElementById('valor-escolhido');
    const mensagemDoacao = document.getElementById('mensagem-doacao');

    for (let i = 0; i < opcoes.length; i++) {
        opcoes[i].addEventListener('change', function () {
            valorEscolhido.textContent = 'R$ ' + this.value + ',00';
            mensagemDoacao.textContent = '';
        });
    }

    formularioDoacao.addEventListener('submit', function (evento) {
        evento.preventDefault();
        mensagemDoacao.textContent = 'Você escolheu ' + valorEscolhido.textContent + '. Nenhum pagamento foi realizado.';
    });
}

// Portal do Voluntário: verifica o exemplo de prontuário.
const formularioProntuario = document.getElementById('form-prontuario');

if (formularioProntuario) {
    formularioProntuario.addEventListener('submit', function (evento) {
        evento.preventDefault();

        const beneficiario = document.getElementById('beneficiario');
        const diagnostico = document.getElementById('diagnostico');
        const procedimentos = document.getElementById('procedimentos');
        const resposta = document.getElementById('mensagem-prontuario');
        let valido = true;

        mostrarErro(beneficiario, '');
        mostrarErro(diagnostico, '');
        mostrarErro(procedimentos, '');

        if (beneficiario.value.trim().length < 3) {
            mostrarErro(beneficiario, 'Preencha o nome do beneficiário.');
            valido = false;
        }
        if (diagnostico.value.trim().length < 3) {
            mostrarErro(diagnostico, 'Preencha o diagnóstico.');
            valido = false;
        }
        if (procedimentos.value.trim().length < 3) {
            mostrarErro(procedimentos, 'Descreva o procedimento realizado.');
            valido = false;
        }

        if (valido) {
            resposta.textContent = 'Exemplo validado! Nada foi salvo em um banco de dados.';
            formularioProntuario.reset();
        } else {
            resposta.textContent = 'Preencha os campos marcados em vermelho.';
        }
    });
}
