# Jesus, Maria e Você — Devocional Católico Diário

Site estático (sem build, sem dependências) do devocional diário **Jesus, Maria e Você**,
por Dr. Eduardo D'Angelo Mimessi — 366 meditações de espiritualidade católica, uma para
cada dia do ano. Cada dia traz um versículo, uma meditação, uma prática e uma oração.

## Arquivos
- `index.html` — a página (interface, estilos e lógica)
- `assets/dias.js` — os dados das 366 meditações (`window.MESES` e `window.DIAS`)

## Publicar no GitHub Pages
1. Suba estes arquivos mantendo a estrutura (`index.html` na raiz, `assets/dias.js`).
2. No GitHub, vá em **Settings → Pages → Source: `main` / `/root`** → Save.
3. O site fica em `https://edumimessi.github.io/jesusmariaevoce/`.

## Domínio próprio (opcional)
1. Crie um arquivo `CNAME` na raiz com o domínio, ex.: `jesusmariaevoce.com.br`
2. No painel do domínio (DNS), aponte para o GitHub Pages:
   - 4 registros **A** para `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - ou um **CNAME** `www` → `edumimessi.github.io`
3. Em Settings → Pages, marque **Enforce HTTPS**.

## Editar o conteúdo
Todo o texto está em `assets/dias.js`. Cada dia é um objeto:
`{ m:mês, d:dia, sem:semana, st:"título da semana", tipo, rot:"rótulo", tit:"título",
   ref:"versículo (referência)", txt:"texto do versículo", med:"meditação",
   pra:"prática de hoje", ora:"oração" }`
Cada mês tem tema e frase-âncora em `window.MESES`.

Os tipos (`tipo`) definem o rótulo e o símbolo de cada dia: `palavra`, `evangelho`,
`santo`, `maria`, `sacramento`, `oracao`, `reflexao`, `vivencia`, `descanso`, `sintese`,
`envio`, `bissexto`.
