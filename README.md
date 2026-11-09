# Ludoteca do Carlos

A prova de conceito usa React e D3.js para explorar o catálogo BoardGameGeek em `data/database.sqlite`.

## Executar localmente

É necessário Node.js 22.13 ou posterior e o ficheiro `data/database.sqlite` na raiz do projeto.

```sh
cd frontend
npm ci
npm run dev
```

O servidor Vite expõe `GET /api/catalog` e abre o SQLite em modo de leitura. Para testar a compilação localmente, usa `npm run build` seguido de `npm run preview`. O servidor de pré-visualização também disponibiliza a API.

As vistas de Halloween usam jogos da categoria Horror com pelo menos 30 avaliações e que aceitam algum tamanho de grupo entre 4 e 8 jogadores. A lista curta mostra até oito jogos que cabem nos limites de duração e complexidade, ordenados pela nota bayesiana. A comparação de jogos usa os 50 títulos com mais avaliações que têm os dados necessários para o radar.
