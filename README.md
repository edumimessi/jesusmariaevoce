# Jesus, Maria e Você — Devocional Católico Diário

Site estático, sem build e sem dependências, do devocional **Jesus, Maria e Você**, por Dr. Eduardo D'Angelo Mimessi. Reúne 366 meditações de espiritualidade católica, uma para cada dia do ano.

## Conteúdo

Cada dia apresenta:

- versículo e meditação;
- prática espiritual e oração;
- santo ou celebração do dia;
- devoção própria do mês;
- destaque para festas, solenidades e memórias marianas.

O site também possui uma biblioteca permanente com:

- Pai-Nosso;
- Ave-Maria;
- Símbolo Apostólico;
- Credo Niceno-Constantinopolitano;
- devoções dos doze meses;
- calendário mariano com cálculo das memórias móveis da Bem-aventurada Virgem Maria, Mãe da Igreja, e do Imaculado Coração de Maria.

> O calendário é uma referência devocional. Celebrações próprias e transferências litúrgicas podem variar conforme o ano, a Igreja no Brasil, a diocese, a paróquia ou a família religiosa.

## Arquivos

- `index.html` — estrutura da página;
- `assets/style.css` — identidade visual responsiva e modo claro/escuro;
- `assets/app.js` — interface, navegação, progresso e renderização;
- `assets/dias.js` — dados das 366 meditações (`window.MESES` e `window.DIAS`);
- `assets/santos.js` — referência hagiográfica para os 366 dias e celebrações prioritárias;
- `assets/liturgia.js` — datas marianas, orações, devoções mensais e cálculo das memórias móveis;
- `sw.js` — funcionamento offline e atualização do cache;
- `manifest.webmanifest` — instalação como aplicativo.

## Publicar no GitHub Pages

1. Mantenha `index.html` na raiz e os arquivos JavaScript dentro de `assets/`.
2. No GitHub, acesse **Settings → Pages**.
3. Selecione a branch `main` e a pasta `/root`.
4. O site será publicado em `https://edumimessi.github.io/jesusmariaevoce/`.

## Editar as meditações

As meditações estão em `assets/dias.js`. Cada dia é um objeto com mês, dia, título, referência bíblica, meditação, prática e oração.

## Editar o calendário e as orações

O conteúdo está dividido entre `assets/santos.js` e `assets/liturgia.js`:

- em `assets/santos.js`, ficam a referência hagiográfica para os 366 dias e as celebrações que têm precedência na exibição;
- `DATAS_MARIANAS_FIXAS` reúne as celebrações marianas de data fixa;
- `DEVOCOES_MENSAIS` define a devoção e a prática de cada mês;
- `ORACOES` contém as orações fundamentais do cristão.
