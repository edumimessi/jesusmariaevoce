/* Dados marianos, orações e devoções. Celebrações locais podem variar. */
(function(){'use strict';
const S=window.JMV_SANTOS||{cotidianos:{},oficiais:{}};
const DATAS_MARIANAS_FIXAS=[
{m:1,d:1,nome:'Santa Maria, Mãe de Deus',grau:'Solenidade'},
{m:2,d:2,nome:'Apresentação do Senhor',grau:'Festa com forte dimensão mariana'},
{m:2,d:11,nome:'Nossa Senhora de Lourdes',grau:'Memória facultativa'},
{m:3,d:25,nome:'Anunciação do Senhor',grau:'Solenidade'},
{m:5,d:13,nome:'Nossa Senhora de Fátima',grau:'Memória facultativa'},
{m:5,d:31,nome:'Visitação de Nossa Senhora',grau:'Festa'},
{m:7,d:16,nome:'Nossa Senhora do Carmo',grau:'Memória facultativa'},
{m:8,d:5,nome:'Dedicação da Basílica de Santa Maria Maior',grau:'Memória facultativa'},
{m:8,d:15,nome:'Assunção de Nossa Senhora',grau:'Solenidade'},
{m:8,d:22,nome:'Nossa Senhora Rainha',grau:'Memória'},
{m:9,d:8,nome:'Natividade de Nossa Senhora',grau:'Festa'},
{m:9,d:12,nome:'Santíssimo Nome de Maria',grau:'Memória facultativa'},
{m:9,d:15,nome:'Nossa Senhora das Dores',grau:'Memória'},
{m:10,d:7,nome:'Nossa Senhora do Rosário',grau:'Memória'},
{m:10,d:12,nome:'Nossa Senhora da Conceição Aparecida',grau:'Solenidade no Brasil'},
{m:11,d:21,nome:'Apresentação de Nossa Senhora',grau:'Memória'},
{m:12,d:8,nome:'Imaculada Conceição de Nossa Senhora',grau:'Solenidade'},
{m:12,d:10,nome:'Nossa Senhora de Loreto',grau:'Memória facultativa'},
{m:12,d:12,nome:'Nossa Senhora de Guadalupe',grau:'Festa nas Américas'}];
const DEVOCOES_MENSAIS={
1:{nome:'Santíssimo Nome de Jesus',simbolo:'IHS',pratica:'Invocar com reverência o Nome de Jesus e repetir: “Jesus, eu confio em Vós”.'},
2:{nome:'Sagrada Família',simbolo:'⌂',pratica:'Rezar pelas famílias e cultivar no lar a oração, o perdão e o serviço.'},
3:{nome:'São José',simbolo:'⚜',pratica:'Pedir a São José fidelidade, prudência no trabalho e proteção para a família.'},
4:{nome:'Santíssima Eucaristia',simbolo:'✚',pratica:'Valorizar a Santa Missa, a comunhão bem preparada e a adoração eucarística.'},
5:{nome:'Santíssima Virgem Maria',simbolo:'🌹',pratica:'Rezar o Rosário e imitar o “sim” de Maria à vontade de Deus.'},
6:{nome:'Sagrado Coração de Jesus',simbolo:'♥',pratica:'Reparar as ofensas, confiar na misericórdia e consagrar o coração a Cristo.'},
7:{nome:'Preciosíssimo Sangue de Jesus',simbolo:'✦',pratica:'Meditar o preço da Redenção e oferecer sacrifícios pela conversão dos pecadores.'},
8:{nome:'Imaculado Coração de Maria',simbolo:'♡',pratica:'Buscar pureza de intenção, reparação e união com o Coração de Jesus.'},
9:{nome:'Nossa Senhora das Dores',simbolo:'†',pratica:'Contemplar as sete dores de Maria e permanecer fiel nas provações.'},
10:{nome:'Santo Rosário',simbolo:'◉',pratica:'Rezar diariamente ao menos um mistério do Rosário com atenção e perseverança.'},
11:{nome:'Almas do Purgatório e fiéis defuntos',simbolo:'🕯',pratica:'Oferecer Missas, orações e obras de caridade pelos falecidos.'},
12:{nome:'Imaculada Conceição e Infância de Jesus',simbolo:'✧',pratica:'Viver o Advento com Maria e preparar o coração para acolher o Menino Jesus.'}};
const ORACOES=[
{id:'pai-nosso',titulo:'Pai-Nosso',subtitulo:'A oração ensinada por Jesus',texto:`Pai nosso que estais no céu, santificado seja o vosso nome; venha a nós o vosso Reino; seja feita a vossa vontade, assim na terra como no céu.

O pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.`},
{id:'ave-maria',titulo:'Ave-Maria',subtitulo:'Saudação e súplica à Mãe de Deus',texto:`Ave Maria, cheia de graça, o Senhor é convosco. Bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus.

Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora de nossa morte. Amém.`},
{id:'simbolo-apostolico',titulo:'Símbolo Apostólico',subtitulo:'Creio em Deus Pai',texto:`Creio em Deus Pai todo-poderoso, criador do céu e da terra; e em Jesus Cristo, seu único Filho, nosso Senhor; que foi concebido pelo poder do Espírito Santo; nasceu da Virgem Maria; padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado; desceu à mansão dos mortos; ressuscitou ao terceiro dia; subiu aos céus; está sentado à direita de Deus Pai todo-poderoso, donde há de vir a julgar os vivos e os mortos.

Creio no Espírito Santo; na Santa Igreja Católica; na comunhão dos santos; na remissão dos pecados; na ressurreição da carne; na vida eterna. Amém.`},
{id:'credo-niceno',titulo:'Credo Niceno-Constantinopolitano',subtitulo:'Profissão solene da fé da Igreja',texto:`Creio em um só Deus, Pai todo-poderoso, criador do céu e da terra, de todas as coisas visíveis e invisíveis.

Creio em um só Senhor, Jesus Cristo, Filho Unigênito de Deus, nascido do Pai antes de todos os séculos: Deus de Deus, luz da luz, Deus verdadeiro de Deus verdadeiro; gerado, não criado, consubstancial ao Pai. Por ele todas as coisas foram feitas. E por nós, homens, e para nossa salvação, desceu dos céus: e se encarnou pelo Espírito Santo, no seio da Virgem Maria, e se fez homem. Também por nós foi crucificado sob Pôncio Pilatos; padeceu e foi sepultado. Ressuscitou ao terceiro dia, conforme as Escrituras, e subiu aos céus, onde está sentado à direita do Pai. E de novo há de vir, em sua glória, para julgar os vivos e os mortos; e o seu reino não terá fim.

Creio no Espírito Santo, Senhor que dá a vida e procede do Pai e do Filho; e com o Pai e o Filho é adorado e glorificado: ele que falou pelos profetas. Creio na Igreja, una, santa, católica e apostólica. Professo um só batismo para remissão dos pecados. E espero a ressurreição dos mortos e a vida do mundo que há de vir. Amém.`}];
function pascoaGregoriana(ano){const a=ano%19,b=Math.floor(ano/100),c=ano%100,d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3),h=(19*a+b-d-g+15)%30,i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k)%7,m=Math.floor((a+11*h+22*l)/451),mes=Math.floor((h+l-7*m+114)/31),dia=(h+l-7*m+114)%31+1;return new Date(ano,mes-1,dia,12)}
function somarDias(data,dias){const r=new Date(data);r.setDate(r.getDate()+dias);return r}
function datasMarianas(ano){const p=pascoaGregoriana(ano),mae=somarDias(p,50),coracao=somarDias(p,69);return DATAS_MARIANAS_FIXAS.concat([{m:mae.getMonth()+1,d:mae.getDate(),nome:'Bem-aventurada Virgem Maria, Mãe da Igreja',grau:'Memória móvel'},{m:coracao.getMonth()+1,d:coracao.getDate(),nome:'Imaculado Coração de Maria',grau:'Memória móvel'}]).sort((a,b)=>a.m-b.m||a.d-b.d)}
function santoDoDia(m,d){return S.oficiais[m+'-'+d]||(S.cotidianos[m]&&S.cotidianos[m][d-1])||'Santos e bem-aventurados recordados neste dia'}
function dataMariana(m,d,ano){return datasMarianas(ano||new Date().getFullYear()).find(x=>x.m===m&&x.d===d)||null}
window.JMV_LITURGIA={SANTOS_COTIDIANOS:S.cotidianos,SANTOS_FIXOS:S.oficiais,DATAS_MARIANAS_FIXAS,DEVOCOES_MENSAIS,ORACOES,pascoaGregoriana,datasMarianas,santoDoDia,dataMariana};
})();
