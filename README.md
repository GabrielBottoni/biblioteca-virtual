# 📚 Biblioteca Virtual

Uma aplicação web para gerenciamento de livros e usuários, onde estudantes podem alugar livros e administradores podem gerenciar o acervo e os usuários da plataforma.

---

## 📝 Descrição

A **Biblioteca Virtual** permite que usuários se cadastrem para acessar um catálogo de livros disponíveis para aluguel. Administradores têm acesso a um painel exclusivo onde podem cadastrar novos livros (com capa), editar ou deletar livros existentes, além de conceder permissões de administrador para outros usuários.

---

## 🚀 Tecnologias Utilizadas

- Node.js
- Express
- JWT (JSON Web Token)
- bcrypt / bcryptjs
- multer (para upload de imagens)
- uuid
- dotenv
- cors
- nodemon

---

## 💻 Como Rodar Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/GabrielBottoni/biblioteca-virtual
   cd biblioteca-virtual

2. Instale as dependências:

  npm install

3. Crie um arquivo .env com as variáveis de ambiente necessárias:

  JWT_SECRET=sua_chave_secreta
  PORT = 3000

4. Inicie o servidor:

  node index.js

## 🔐 Como funciona o login?

O sistema de login utiliza JWT (JSON Web Token). Após o login, o usuário recebe um token que deve ser enviado nos headers das requisições autenticadas para acessar rotas protegidas.

## ✨ Funcionalidades

✅ **Cadastro e login de usuários**

📚 **Listagem de livros disponíveis**

🔒 **Autenticação via JWT**

🛠 **Painel administrativo:**
- Cadastro de novos livros com imagem da capa
- Edição e exclusão de livros existentes
- Listagem e gerenciamento de usuários
- Concessão de privilégios administrativos


## 🌐 Link de Produção

Ainda não está disponível online.

## 👨‍💻 Autor

Gabriel Bottoni
LinkedIn: https://www.linkedin.com/in/gabrielbottoni/

## 📄 Licença

Este projeto está licenciado sob a MIT License.

## 🤝 Contribuições

Contribuições são bem-vindas!
Sinta-se à vontade para abrir uma issue ou pull request.



  
