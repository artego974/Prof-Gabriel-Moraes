<div align="center">
  <img src="./public/logo.png" alt="Ilustração do professor Gabriel Moraes" width="160" />
</div>

<h1 align="center">Prof. Gabriel Moraes — Mentoria de Programação</h1>

<p align="center">
  <strong>Landing page institucional para apresentar mentorias individuais de programação e conectar novos alunos aos professores Gabriel Moraes e Arthur.</strong>
</p>

<p align="center">
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19-20232a?logo=react&amp;logoColor=61dafb" alt="React 19" /></a>
  <a href="https://vite.dev/"><img src="https://img.shields.io/badge/Vite-8-646cff?logo=vite&amp;logoColor=white" alt="Vite 8" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?logo=tailwindcss&amp;logoColor=white" alt="Tailwind CSS 4" /></a>
  <a href="https://eslint.org/"><img src="https://img.shields.io/badge/ESLint-10-4b32c3?logo=eslint&amp;logoColor=white" alt="ESLint 10" /></a>
</p>

## Sobre o projeto

O **Prof. Gabriel Moraes** é um site responsivo voltado à divulgação de aulas e mentorias de programação no formato individual e 100% online. A página apresenta os professores, explica o método de ensino, organiza as áreas de aprendizagem e conduz o visitante para uma conversa personalizada pelo WhatsApp.

A proposta combina conteúdo comercial direto com uma identidade visual editorial inspirada em papel, marca-texto e fichas de estudo. Toda a experiência funciona no navegador, sem backend ou banco de dados.

## Principais funcionalidades

- Apresentação dos professores **Gabriel Moraes** e **Arthur**, com especialidades e formas de contato próprias;
- Conteúdo completo em **português, inglês e espanhol**;
- Preferência de idioma persistida no `localStorage`;
- Trilhas de aprendizagem em **Frontend, Backend, Mobile e Dados**;
- Explicação do método em três etapas: diagnóstico, plano sob medida e execução com feedback;
- Seções para perfil do aluno, perguntas frequentes e chamada final para contato;
- Links de WhatsApp com mensagens preenchidas conforme o professor ou a trilha escolhida;
- Navegação interna por âncoras e botão flutuante de contato;
- Animações de entrada acionadas conforme as seções aparecem na tela;
- Layout adaptado para computadores, tablets e celulares;
- Metadados básicos para mecanismos de busca e compartilhamento em redes sociais.

## Experiência da página

O visitante percorre uma jornada simples:

1. Conhece a proposta da mentoria e escolhe um professor;
2. Entende quem ensina e quais tecnologias são trabalhadas;
3. Descobre como funciona o acompanhamento individual;
4. Seleciona a trilha mais adequada ao seu objetivo;
5. Confere se o formato combina com seu momento;
6. Tira dúvidas no FAQ e inicia uma conversa pelo WhatsApp.

## Tecnologias utilizadas

| Tecnologia | Uso no projeto |
| --- | --- |
| [React](https://react.dev/) | Componentização, estado do idioma e renderização da interface |
| [Vite](https://vite.dev/) | Servidor de desenvolvimento e geração do bundle de produção |
| [Tailwind CSS](https://tailwindcss.com/) | Disponibilização de utilitários CSS no projeto |
| CSS | Identidade visual, responsividade, animações e estados de interação |
| ESLint | Análise estática e padronização do código JavaScript/JSX |
| Google Fonts | Famílias tipográficas Fraunces, Inter e Space Mono |

## Acessibilidade e qualidade de experiência

O projeto inclui alguns cuidados importantes de interface:

- HTML semântico com `header`, `nav`, `main`, `section`, `article` e `footer`;
- link de salto para o conteúdo principal;
- textos alternativos nas imagens dos professores;
- indicação visual para navegação por teclado com `:focus-visible`;
- atributos ARIA em menus, seletores de idioma e ícones decorativos;
- suporte a `prefers-reduced-motion` para pessoas que reduzem animações no sistema;
- atualização dinâmica do atributo `lang` do documento;
- links externos abertos com `noopener noreferrer`.

## Pré-requisitos

Antes de iniciar, tenha instalado:

- [Node.js](https://nodejs.org/) `20.19+` ou `22.12+`;
- npm, distribuído junto com o Node.js.

## Como executar localmente

No terminal, entre na pasta do projeto e instale as dependências:

```bash
cd prof_gabriel_moraes
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

O Vite mostrará no terminal o endereço local da aplicação, normalmente `http://localhost:5173`.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento com atualização automática |
| `npm run build` | Gera a versão otimizada para produção na pasta `dist/` |
| `npm run preview` | Executa localmente uma prévia do bundle de produção |
| `npm run lint` | Analisa os arquivos do projeto com o ESLint |

## Estrutura do projeto

```text
prof_gabriel_moraes/
├── public/
│   ├── favicon.svg          # Ícone alternativo do site
│   ├── ftArthur.png         # Imagem do professor Arthur
│   ├── hero img.png         # Imagem institucional disponível
│   ├── icons.svg            # Conjunto de ícones
│   └── logo.png             # Imagem do professor Gabriel e favicon atual
├── src/
│   ├── assets/              # Recursos mantidos no bundle da aplicação
│   ├── App.css              # Design visual, animações e responsividade
│   ├── App.jsx              # Conteúdo, idiomas e interface principal
│   ├── index.css            # Fontes globais e integração do Tailwind CSS
│   └── main.jsx             # Ponto de entrada do React
├── eslint.config.js         # Configuração do ESLint
├── index.html               # Documento base e metadados de SEO
├── package.json             # Dependências e scripts npm
├── tailwind.config.cjs      # Tokens e configuração do Tailwind CSS
└── vite.config.js           # Plugins e configuração do Vite
```

## Organização da aplicação

A aplicação é uma SPA estática. O `main.jsx` monta o componente `App`, que concentra:

- os dados compartilhados dos professores;
- os textos equivalentes em PT, EN e ES;
- a criação de links personalizados do WhatsApp;
- o controle e a persistência do idioma;
- a observação das seções para ativar animações de entrada;
- a composição de todas as seções da landing page.

O estilo visual fica centralizado no `App.css`, enquanto `index.css` carrega as fontes e os utilitários do Tailwind CSS.

## Personalização

Os principais pontos de edição estão em `src/App.jsx`:

- `MENTORS`: nomes, imagens, tecnologias e dados dos professores;
- `text`: títulos, descrições, FAQ e mensagens nos três idiomas;
- `MARQUEE`: tecnologias exibidas na faixa animada;
- `whatsappNumber`: número usado por todos os botões de contato.

Para modificar cores, tipografia, espaçamentos ou animações, edite as variáveis e classes em `src/App.css`. Metadados como título, descrição e imagem de compartilhamento ficam em `index.html`.

> Ao alterar os textos, mantenha as mesmas chaves nas versões `PT`, `EN` e `ES` para evitar conteúdo ausente durante a troca de idioma.

## Build e publicação

Gere os arquivos de produção com:

```bash
npm run build
```

O resultado será criado em `dist/` e pode ser publicado em qualquer hospedagem compatível com sites estáticos. Antes de publicar, valide o bundle localmente:

```bash
npm run preview
```

Como a aplicação não possui rotas de página nem serviços no backend, não são necessárias variáveis de ambiente para a execução atual.

## Verificações antes de contribuir

Após realizar alterações, execute:

```bash
npm run lint
npm run build
```

Também é recomendável conferir manualmente os três idiomas, os links do WhatsApp e o comportamento da página em diferentes larguras de tela.

---

<div align="center">
  Desenvolvido para aproximar estudantes de uma aprendizagem prática, individual e orientada a projetos.
</div>
