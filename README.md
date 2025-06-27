### 🚀 Como Executar o Projeto

Siga os passos abaixo para executar o projeto em sua máquina local.

1.  **Clone o repositório:**    ```bash
    git clone [https://github.com/giovanafrade/tradutorcomazure.git](https://github.com/giovanafrade/tradutorcomazure.git)
    cd tradutorcomazure
    ```

2.  **Configure o Backend:**    * Navegue até a pasta do backend: `cd backend`
    * Crie e ative um ambiente virtual:
        ```bash
        python -m venv venv
        # No Windows: .\venv\Scripts\activate
        # No macOS/Linux: source venv/bin/activate
        ```
    * Instale as dependências: `pip install -r requirements.txt`
    * Crie um arquivo `.env` e adicione suas chaves da Azure:
        ```env
        AZURE_SUBSCRIPTION_KEY="SUA_CHAVE_AQUI"
        AZURE_LOCATION="sua_regiao_aqui"
        ```
    * Inicie o servidor backend: `python app.py`

3.  **Execute o Frontend:**    * Abra o arquivo `frontend/index.html` diretamente no seu navegador.

---

### 👨‍💻 Autor

Feito com ❤️ por [Giovana Frade](https://github.com/giovanafrade).
