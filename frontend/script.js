// Evento que garante que nosso código só vai rodar depois que a página HTML for carregada.
document.addEventListener('DOMContentLoaded', () => {
    //Variáveis para acessar os elementos HTML com os quais vamos interagir.
    const textToTranslateEl = document.getElementById('text-to-translate');
    const fromLanguageEl = document.getElementById('from-language');
    const toLanguageEl = document.getElementById('to-language');
    const translateBtn = document.getElementById('translate-btn');
    const translatedTextEl = document.getElementById('translated-text');
    const statusMessageEl = document.getElementById('status-message');

    //CONFIGURAÇÃO OBRIGATÓRIA
    const subscriptionKey = "1md70QE10o4HjYvGLT2LIhE7OLEhV7pySSel8WAHogLvrDxG3QfbJQQJ99BFACYeBjFXJ3w3AAAbACOGzEVi";
    const locationOrRegion = "eastus";
    const endpoint = "https://api.cognitive.microsofttranslator.com/";
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
        try{
            // A função 'fetch' faz a requisição para a API.
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Ocp-Apim-Subscription-Key': subscriptionKey,
                    'Ocp-Apim-Subscription-Region': locationOrRegion,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify([{ 'Text': textToTranslate }])
                });
            // A API respondeu. Agora, convertemos a resposta para um objeto JavaScript.
                const data = await response.json();
            // Se a resposta da API contém um erro (ex: chave inválida), nós o mostramos.
            if (data.error) {
                throw new Error(data.error.message);
            }

            // Extraímos o texto traduzido do objeto de resposta.
            const translation = data[0].translations[0].text;
                                        
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