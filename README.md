<div align="center">
  <img src="https://github.com/Lukinhasssss/movieflix/blob/main/frontend/public/favicon.ico" width="150" />
  <h1>MovieFlix</h1>
  <p>Diga o que achou do seu filme favorito</p>
  <p>
    <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/Lukinhasssss/movieflix?color=%23FFC700">
    <a href="https://www.linkedin.com/in/dev-lucasmonteiro/" target="_blank" rel="noopener noreferrer">
      <img alt="Feito por" src="https://img.shields.io/badge/made%20by-Lucas%20Monteiro-%23FFC700">
    </a> 
    <img alt="License Lucas Monteiro" src="https://img.shields.io/github/license/Lukinhasssss/movieflix?color=%23FFC700">
  </p>
</div>

<div align="center">
  <img src="https://github.com/Lukinhasssss/assets/blob/main/movieflix/login.png" width="600" />
  <img src="https://github.com/Lukinhasssss/assets/blob/main/movieflix/criar-conta.png" width="600" />
  <img src="https://github.com/Lukinhasssss/assets/blob/main/movieflix/list-movies.png" width="600" />
  <img src="https://github.com/Lukinhasssss/assets/blob/main/movieflix/movie-details.png" width="600" />
  <div align=left>
    <p>
      <a href="https://drive.google.com/file/d/12IQPdznSnwclYJEhHHJvUHOoSkfQwou-/view?usp=sharing">Aqui </a>
      você irá encontrar vídeos e mais imagens da aplicação.
    </p>
  </div>
</div>

# Sobre o Projeto
MovieFlix é uma aplicação full stack web e mobile construída durante o **Bootcamp DevSuperior** (#BDS2), evento organizado pela [DevSuperior](https://devsuperior.com "Site da DevSuperior").

A aplicação consiste em um banco de filmes, os quais podem ser listados e avaliados pelos usuários. Usuários podem ser visitantes (VISITOR) e membros (MEMBER). Apenas usuários membros podem inserir avaliações no sistema.

Ao acessar o sistema, o usuário deve fazer seu login. Apenas usuários logados podem navegar nos filmes. Logo após fazer o login, o usuário vai para a listagem de filmes, que mostra os filmes de forma paginada, ordenados alfabeticamente por título. O usuário pode filtrar os filmes por gênero.

Ao selecionar um filme da listagem, é mostrada uma página de detalhes, onde é possível ver todas informações do filme, e também suas avaliações. Se o usuário for usuário membro, ele pode ainda registrar uma avaliação nessa tela.

Um usuário possui nome, email e senha, sendo que o email é seu nome de usuário. Cada filme possui um título, subtítulo, uma imagem, ano de lançamento, sinopse, e um gênero. Os usuários membros podem registrar avaliações para os filmes. Um mesmo usuário membro pode deixar mais de uma avaliação para o mesmo filme.

A aplicação também é totalmente responsiva e possui tela de cadastro. (Ambas as funcionalidades não eram obrigatórias para a conclusão do projeto e foi um bônus que resolvi implementar)

Você pode acessar a aplicação com os usuários:
<p>VISITOR -> email: bob@gmail.com | senha: 123456</p>
<p>MEMBER -> email: ana@gmail.com | senha: 123456</p>

E caso queira, você também pode criar sua própria conta. Por padrão, novas contas criadas terão o perfil de membro (MEMBER) para que seja possível testar a funcionalidade de postar avaliações.

## Modelo Conceitual
![Modelo Conceitual](https://github.com/Lukinhasssss/assets/blob/main/movieflix/modelo-conceitual.png)

# Tecnologias utilizadas
## Backend
- Java
- Spring Boot
- JPA / Hibernate
- Maven
## Frontend
- HTML / CSS / TypeScript
- ReactJS
- React Native
- Expo
## Implantação em produção
- Backend: Heroku
- Frontend: Netlify
- Mobile: Expo
- Banco de dados: Postgresql

# Como executar o projeto

## Back end
Pré-requisitos: Java 11

```bash
# clonar repositório
git clone https://github.com/Lukinhasssss/movieflix.git

# entrar na pasta do projeto back end
cd backend

# executar o projeto
./mvnw spring-boot:run
```

## Front end
Pré-requisitos: npm / yarn

```bash
# clonar repositório
git clone https://github.com/Lukinhasssss/movieflix.git

# entrar na pasta do projeto front end
cd frontend

# instalar dependências
npm install

# executar o projeto
npm start
```

# Autor

<a href="https://www.linkedin.com/in/dev-lucasmonteiro/">
  <img
     src="https://avatars.githubusercontent.com/u/60019382?v=4"
     alt="Lucas Monteiro"
     width="80"
   />
<a/>

<p align="center">Feito com ❤ por <b>Lucas Monteiro</b></p>
