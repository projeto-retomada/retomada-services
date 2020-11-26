# API do projeto Retomada !['Logo Retomada'](https://raw.githubusercontent.com/projetos-faculdade/retomada-app/master/assets/logo2.png)

O projeto Retomada foi criado com o intuito de auxiliar escolas que estão no momento retorno às aulas durante a pandemia, ajudando-as a acompanhar atividades, alunos e funcionários, a fim de que possam tomar decisões estratégicas.
Este repositório contém a API REST deste projeto.


## :rocket: Ferramentas
As tecnologias listadas abaixo foram utilizadas no projeto.
- [Node.js](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org)
- [Express](https://expressjs.com/pt-br/)
- [MySQL](https://www.mysql.com)
- [Moment.js](https://momentjs.com)
- [Knex](http://knexjs.org)
- [Postgresql](https://www.postgresql.org)

## :information_source: Instruções para clone
### Configuração da API
```git
$ git clone https://github.com/projeto-retomada/retomada-services.git

$ npm install

$ npm knex:migrate

$ npm knex:seed

$ npm start
```
### Rotas base
#### User
- (GET) /users | optional (query: size)
- (POST) /users 
- (PUT) /users/:id
- (DELETE) /users/:id
- (GET) /users/:username/activities | optional (query: size)
- (GET) /users/:username/last-places | optional (query: size)
 (JSON RETORNO) : {
    "id_user": 2,
    "username": "gonzalez",
    "email": "gonzalez@email.com",
    "picture": "",
    "password": "U2FsdGVkX19dE3+OlCeRKkBZvWJ/NnJR0u1IxtsWMb8=",
    "group_risk": "N",
    "metadata": "{}"
  }
- (JSON ENTRADA) : {
    "username" : "Luciana",
    "email" : "luciana@email.com",
    "picture" : "",
    "group_risk" : "S",
    "password" : "123",
    "metadata" : "{}",
    "organization_id" : 1
}

Made with :heart: by Luis, Miriéle and Guilherme
