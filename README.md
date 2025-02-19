# Tech Challenge - Academic Blog App

Antes de iniciar, certifique-se de ter as ferramentas instaladas:

- [Node.js](https://nodejs.org/)
- Gerenciador de pacotes (npm ou yarn)
- API e banco, siga as instruções do projeto: https://github.com/talinedacosta/academic-blog_api 
- API rodando no endereço: http://localhost:3000

Após rodar a API e banco através do projeto indicado, você terá um acesso de professor com as credenciais
- professor_luiza@fiap.com
- 123456

Acesse a rota de /login, depois a rota de /admin, através dessa página você poderá criar, editar e excluir postagens.

Documentação do Módulo App

1.	Visão Geral do Projeto
O projeto foi desenvolvido utilizando React Native com Expo, visando a criação de uma aplicação móvel multiplataforma. A escolha do Expo permitiu um desenvolvimento mais rápido e eficiente, eliminando a necessidade de configurações complexas do ambiente nativo.

2.	Arquitetura do Sistema
2.1	Tecnologias Utilizadas
React Native Framework para desenvolvimento mobile.
Expo Ferramenta para facilitar o desenvolvimento e build da aplicação.
React Navigation Utilizado para gerenciamento de navegação entre telas. Context API/Redux Gerenciamento de estado global da aplicação.
Node.js  Backend para gerenciamento da API e conexão com o banco de dados.
PostgreSQL Banco de dados relacional utilizado para armazenamento de dados.
Axios/Fetch API Consumo de APIs externas.
Estilização nativa do React Native Uso de StyleSheet.

3.	Setup Inicial
Para configurar o ambiente de desenvolvimento e rodar a aplicação, siga os seguintes passos:
3.1	Pré-requisitos
Antes de iniciar, certifique-se de ter instalado:
Node.js (versão recomendada LTS
Expo CLI ( npm install -g expo-cli )
Editor de código VS Code recomendado)
 	Emulador Android/iOS ou o aplicativo Expo Go no celular
3.2	Clonando o repositório
 
3.3	Instalando dependências
 
3.4	Executando a aplicação
Para rodar o projeto no ambiente de desenvolvimento, utilize:
 
Isso abrirá o Expo DevTools no navegador, permitindo rodar a aplicação em um emulador ou no aplicativo Expo Go escaneando o QR Code.

4.	Uso da Aplicação
4.1	Página principal (lista de posts)
Nesta página, o usuário poderá visualizar uma lista de postagens disponíveis. Cada item da lista exibe o título, o nome do autor e uma breve descrição do post. Além disso, há um campo de busca que permite filtrar os posts por palavras-chave inseridas pelo usuário.
4.2	Página de leitura de post
Ao selecionar um post da lista, o usuário será direcionado para esta página, onde poderá visualizar o conteúdo completo da postagem. Opcionalmente, a aplicação pode permitir que os usuários façam comentários nos posts.
4.3	Página de criação de postagens
Professores cadastrados podem acessar esta página para criar novas postagens. O formulário disponível contém campos para inserir um título, o conteúdo da postagem e o nome do autor. Após preencher os campos, o usuário pode enviar a postagem para o servidor clicando no botão de envio.
4.4	Página de edição de postagens
Esta página permite que os professores editem postagens já existentes. Ao acessar a edição de um post, os dados atuais são carregados automaticamente no formulário, permitindo que o usuário faça alterações antes de salvar as atualizações no servidor.
4.5	Página de criação de professores
Professores com permissão de administrador podem acessar esta página para cadastrar novos docentes no sistema. O formulário de cadastro permite inserir os dados do professor e, ao final, um botão de envio registra as informações no servidor.
4.6	Página de edição de professores
Nesta página, os administradores podem editar as informações de professores já cadastrados. Após carregar os dados do docente selecionado, as informações podem ser alteradas e salvas através do botão de atualização.
4.7	Página de listagem de professores
A aplicação exibe uma lista paginada de professores cadastrados. Para cada professor listado, há um botão de edição que direciona para a página de edição e um botão de exclusão que permite remover o docente do sistema.
4.8	Página de criação de estudantes
Professores com permissão de administrador podem acessar esta página para cadastrar novos estudantes no sistema. O formulário de cadastro permite inserir os dados do estudante e, ao final, um botão de envio registra as informações no servidor.
4.8.1	Página de edição de estudantes
Nesta página, os administradores podem editar as informações do estudante já cadastrados. Após carregar os dados do estudante selecionado, as informações podem ser alteradas e salvas através do botão de atualização.
4.8.2	Página de listagem de estudantes
A aplicação exibe uma lista paginada de estudantes cadastrados. Para cada estudantes listado, há um botão de edição que direciona para a página de edição e um botão de exclusão que permite remover o estudante do sistema.
4.9	Página administrativa
Nesta página, os professores administradores podem visualizar todas as postagens do sistema. Além de listar os posts, a página oferece botões para editar e excluir qualquer postagem conforme necessário.

5.	Desafios e Experiências da Equipe
Durante o desenvolvimento, a equipe enfrentou diversos desafios, incluindo:
 	Gerenciamento de estado Inicialmente, a escolha entre Context API e Redux gerou debates, mas optamos por Redux devido à complexidade do estado global.
 	Performance Ajustes no uso de listas grandes para evitar problemas de desempenho.
 	Integração com API Tratamento adequado de erros e otimização do tempo de resposta.

6.	Conclusão
O uso do Expo acelerou o desenvolvimento, tornando a implementação de funcionalidades mais fluida. Apesar dos desafios, a equipe adquiriu grande aprendizado, especialmente em otimização de performance e boas práticas no desenvolvimento mobile.

7.	Possíveis Melhorias Futuras
Melhorias na experiência do usuário UX/UI
Uso de Testes Automatizados para garantir maior estabilidade