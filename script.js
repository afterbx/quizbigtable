   const perguntas = [
            {
                pergunta: "Qual é a principal função do atributo - alt - em uma tag <img> no HTML?",
                opcoes: ["Exibir legenda abaixo da imagem", "Substituir a imagem quando ela não pode ser carregada", "Alterar o tamanho da imagem","É falta neleeee!"],
                resposta: "Substituir a imagem quando ela não pode ser carregada"
            },
            {
                pergunta: "JavaScript é o que na programação?",
                opcoes: ["Linguagem de programação", "Linguagem de marcação", "Sistema operacional", "Banco de dados"],
                resposta: "Linguagem de programação"
            },
            {
                pergunta: "SQL é uma linguagem de programação predominante em qual área?",
                opcoes: ["Frontend", "Backend", "Mobile", "Design"],
                resposta: "Backend"
            },
            {
                pergunta: "O que é overfitting?",
                opcoes: ["Quando o modelo aprende demais os dados de treino e vai mal em novos dados.", "Um modelo de otimização em banco de dados.", "Frontend é legal.", "Backend faz parte do mundo da programação."],
                resposta: "Quando o modelo aprende demais os dados de treino e vai mal em novos dados."
            },
            {
                pergunta: "O que significa SPA no desenvolvimento web?",
                opcoes: ["Simple Page Access", "Single Page Application", "Static Page API", "Server Page Application"],
                resposta: "Single Page Application"
            },
            {
                pergunta: "Qual método HTTP é usado para enviar dados para o servidor (como em formulários)?",
                opcoes: ["GET", "PUT", "FETCH", "POST"],
                resposta: "POST"
            },
            {
                pergunta: "Qual banco de dados é baseado em documentos JSON?",
                opcoes: ["MySQL", "MongoDB", "PostgreSQL", "SQLite"],
                resposta: "MongoDB"   
            },
            {
                pergunta: "Qual comando é usado para instalar pacotes no Node.js?",
                opcoes: ["Node install", "Install node", "Npm run", "Npm install"],
                resposta: "Npm install"   
            },
            {
                pergunta: "O que é um 'endpoint' em uma API?",
                opcoes: ["Um botão no frontend", "Um método HTTP", "Uma URL que responde a uma requisição", "Uma variável global"],
                resposta: "Uma URL que responde a uma requisição"
            }
        ];

        let indiceAtual = 0;
        let pontuacao = 0;
        let cronometro;
        let tempoRestante = 15;
        let nomeUsuario = '';

        // Elementos do DOM
        const telaBoas = document.getElementById('tela-boas-vindas');
        const telaQuiz = document.getElementById('tela-quiz');
        const telaPontuacao = document.getElementById('tela-pontuacao');
        const entradaNome = document.getElementById('nome-usuario');
        const elementoPergunta = document.getElementById('pergunta');
        const elementoOpcoes = document.getElementById('opcoes');
        const elementoCronometro = document.getElementById('exibicao-tempo');
        const botaoProximo = document.getElementById('botao-proximo');
        const contadorPergunta = document.getElementById('contador-pergunta');
        const preenchimentoProgresso = document.getElementById('preenchimento-progresso');

        // Criar partículas flutuantes
        function criarParticulas() {
            const recipienteParticulas = document.querySelector('.particulas-flutuantes');
            for (let i = 0; i < 50; i++) {
                const particula = document.createElement('div');
                particula.classList.add('particula');
                particula.style.left = Math.random() * 100 + '%';
                particula.style.animationDelay = Math.random() * 8 + 's';
                particula.style.animationDuration = (Math.random() * 3 + 5) + 's';
                recipienteParticulas.appendChild(particula);
            }
        }

        // Alternar tema
        function alternarTema() {
            const corpo = document.body;
            const iconeTema = document.querySelector('.icone-tema');
            
            if (corpo.hasAttribute('data-tema')) {
                corpo.removeAttribute('data-tema');
                iconeTema.textContent = '🌙';
            } else {
                corpo.setAttribute('data-tema', 'claro');
                iconeTema.textContent = '☀️';
            }
        }

        function iniciarQuiz() {
            nomeUsuario = entradaNome.value.trim();
            if (!nomeUsuario) {
                alert('Por favor, digite seu nome!');
                return;
            }

            telaBoas.classList.add('oculta');
            telaQuiz.classList.remove('oculta');
            carregarPergunta();
        }

        function carregarPergunta() {
            const perguntaAtual = perguntas[indiceAtual];
            elementoPergunta.textContent = perguntaAtual.pergunta;
            elementoOpcoes.innerHTML = "";
            botaoProximo.style.display = "none";

            // Atualizar contador e barra de progresso
            contadorPergunta.textContent = `${indiceAtual + 1} / ${perguntas.length}`;
            const progresso = ((indiceAtual) / perguntas.length) * 100;
            preenchimentoProgresso.style.width = progresso + '%';

            perguntaAtual.opcoes.forEach(opcao => {
                const botao = document.createElement("button");
                botao.textContent = opcao;
                botao.classList.add("opcao");
                botao.addEventListener("click", () => selecionarResposta(botao, opcao));
                elementoOpcoes.appendChild(botao);
            });

            iniciarCronometro();
        }

        function selecionarResposta(botao, opcaoSelecionada) {
            clearInterval(cronometro);
            const respostaCorreta = perguntas[indiceAtual].resposta;
            const botoes = document.querySelectorAll(".opcao");

            botoes.forEach(btn => {
                btn.disabled = true;
                if (btn.textContent === respostaCorreta) {
                    btn.classList.add("correta");
                } else if (btn.textContent === opcaoSelecionada && opcaoSelecionada !== respostaCorreta) {
                    btn.classList.add("errada");
                }
            });

            if (opcaoSelecionada === respostaCorreta) {
                pontuacao++;
            }

            botaoProximo.style.display = "block";
        }

        function iniciarCronometro() {
            tempoRestante = 15;
            const recipienteCronometro = document.getElementById('cronometro');
            recipienteCronometro.classList.remove('urgente');
            elementoCronometro.textContent = `${tempoRestante}s`;

            cronometro = setInterval(() => {
                tempoRestante--;
                elementoCronometro.textContent = `${tempoRestante}s`;

                if (tempoRestante <= 5) {
                    recipienteCronometro.classList.add('urgente');
                }

                if (tempoRestante <= 0) {
                    clearInterval(cronometro);
                    selecionarResposta(null, ""); // tempo esgotado
                }
            }, 1000);
        }

        botaoProximo.addEventListener("click", () => {
            indiceAtual++;
            if (indiceAtual < perguntas.length) {
                carregarPergunta();
            } else {
                mostrarPontuacao();
            }
        });

        function mostrarPontuacao() {
            telaQuiz.classList.add('oculta');
            telaPontuacao.classList.remove('oculta');
            
            const porcentagem = Math.round((pontuacao / perguntas.length) * 100);
            
            document.getElementById('nome-usuario-final').textContent = `Parabéns, ${nomeUsuario}!`;
            document.getElementById('numero-pontuacao').textContent = pontuacao;
            document.getElementById('texto-pontuacao').textContent = `de ${perguntas.length} questões`;
            document.getElementById('porcentagem-pontuacao').textContent = `${porcentagem}%`;

            // Animação do score
            animarPontuacao();
        }

        function animarPontuacao() {
            const numeroPontuacao = document.getElementById('numero-pontuacao');
            const porcentagemPontuacao = document.getElementById('porcentagem-pontuacao');
            let pontuacaoAtual = 0;
            let porcentagemAtual = 0;
            const pontuacaoAlvo = pontuacao;
            const porcentagemAlvo = Math.round((pontuacao / perguntas.length) * 100);

            const intervalo = setInterval(() => {
                if (pontuacaoAtual < pontuacaoAlvo) {
                    pontuacaoAtual++;
                    numeroPontuacao.textContent = pontuacaoAtual;
                }
                
                if (porcentagemAtual < porcentagemAlvo) {
                    porcentagemAtual += Math.ceil(porcentagemAlvo / 20);
                    if (porcentagemAtual > porcentagemAlvo) porcentagemAtual = porcentagemAlvo;
                    porcentagemPontuacao.textContent = `${porcentagemAtual}%`;
                }

                if (pontuacaoAtual >= pontuacaoAlvo && porcentagemAtual >= porcentagemAlvo) {
                    clearInterval(intervalo);
                }
            }, 100);
        }

        // Inicializar partículas quando a página carregar
        window.addEventListener('load', () => {
            criarParticulas();
        });