// Evento que garante que nosso código só vai rodar depois que a página HTML for carregada.
document.addEventListener('DOMContentLoaded', () => {
    //Variáveis para acessar os elementos HTML com os quais vamos interagir.
    const textToTranslateEl = document.getElementById('text-to-translate');
    const fromLanguageEl = document.getElementById('from-language');
    const toLanguageEl = document.getElementById('to-language');
    const translateBtn = document.getElementById('translate-btn');
    const translatedTextEl = document.getElementById('translated-text');
    const statusMessageEl = document.getElementById('status-message');

    //CONFIGURAÇÃO OBRIGATÓRIA - Informações sensíveis foram removidas
    const backendApiUrl = 'http://127.0.0.1:5000/api/translate';
    //FUNÇÃO QUE TRADUZ O TEXTO 
    async function translateText() {
        // Pega o texto do <textarea> e o idioma selecionado no <select>.
        const textToTranslate = textToTranslateEl.value;
        const toLanguage = toLanguageEl.value;
        const fromLanguage = fromLanguageEl.value;

        // Verificação para garantir que o usuário digitou algo.
        if (!textToTranslate) {
            alert("Por favor, digite um texto para traduzir.");
            return; // Para a execução da função
        }

        // Informa ao usuário que a tradução está em andamento.
        statusMessageEl.textContent = 'Traduzindo...';
        translatedTextEl.value = ''; // Limpa o campo de resultado anterior.

        // Monta a URL da API da Azure que vamos chamar.
        let url = `${endpoint}translate?api-version=3.0&to=${toLanguage}`;
        if (fromLanguage) {
            url += `&from=${fromLanguage}`;
        }
        // O bloco try...catch é usado para lidar com possíveis erros.
        try {
            // A função 'fetch' faz a requisição para a API.
            const response = await fetch(backendApiUrl, { // <-- Usa a URL do nosso backend
                method: 'POST',
                headers: {
                    // <-- Cabeçalhos de autenticação REMOVIDOS
                    'Content-type': 'application/json'
                },
                // <-- O corpo agora usa o formato que NOSSA API espera
                body: JSON.stringify({
                    'text': textToTranslate,
                    'to': toLanguage,
                    'from': fromLanguage
                })
            });
            // A API respondeu. Agora, convertemos a resposta para um objeto JavaScript.
            const data = await response.json();

            // Verificamos o status da resposta diretamente
            if (!response.ok) {
                throw new Error(data.error || 'Ocorreu um erro no servidor.');
            }

            // Acessamos a tradução de forma muito mais direta
            const translation = data.translation;

            // Colocamos o texto traduzido no <textarea> de resultado.
            translatedTextEl.value = translation;
            statusMessageEl.textContent = 'Tradução concluída!'; // Sucesso!

        } catch (error) {
            console.error("Ocorreu um erro:", error);
            statusMessageEl.textContent = `Erro na tradução: ${error.message}`;
        }
    }
    //ADICIONAR UM "OUVINTE DE EVENTO" AO BOTÃO
    translateBtn.addEventListener('click', translateText);
}

)