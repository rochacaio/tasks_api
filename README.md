# TASKS API
## Sistema desenvolvido com a finalidade de gerenciar tarefas básicas
### API desenvolvida por Caio César da Rocha


# Passos Iniciais para uso
**Docker**  
- Garantir que o docker esteja instalado em seu computador.
- Garantir que o docker esteja rodando corretamente.
- Rodar o comando "docker compose up -d" para subir os containers
- Rodar o comando "docker ps" para garantir que os containers estejam ativos

**Instalação de pacotes**
- Garantir que o gerenciador de pacotes npm ou yarn estejam instalados em seu computador
- Rodar o comando "npm install" para instalar dependendencias
- Rodar o comando "npm start" para iniciar a aplicação
- Caso queira fazer uma alteração e não queira reestartar o servidor, use o comando "npm run dev" para iniciar a aplicação no lugar de "npm start"
- Caso queira rodar os casos de Teste, use o comando "npm run test" (os containers de banco de dados precisam estar ativos)

**Primeiros Acessos**  
- Garantir que o computador tenha uma ferramenta adequada para se comunicar com API's(postman ou insomnia)
- Acesse a rota http://localhost:3000/api-docs (essa rota pode ser acessada diretamente no navegador) para acessar a documentação das rotas
- Acesse a rota http://localhost:3000/tasks para gerar o token de acesso a API e armazene-o
- Logo após isso vá aos headers e adicione o header "Authorization" com o token de acesso que foi gerado anteriormente
- Com o header adicionado você já está pronto para manipular as tasks que desejar com base na documentação de rotas