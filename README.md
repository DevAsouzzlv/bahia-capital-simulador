# 📈 Bahia Capital Investment Simulator (Simulador Educacional)

Plataforma Web Full-Stack de **Simulação de Carteira de Investimentos (Ações da B3 e Criptomoedas)** desenvolvida sob medida para a **Bahia Capital Consultoria**.

O sistema foi concebido para resolver o maior obstáculo enfrentado por novos investidores: **o medo de perder dinheiro real no pregão**. Ao criar sua conta, todo aluno recebe **R$ 10.000,00 fictícios** em ambiente protegido (sandbox) para negociar ativos com cotações reais, calcular preço médio, analisar relatórios de rentabilidade e praticar com mentoria didática automatizada.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia | Descrição |
|---|---|---|
| **Framework** | Next.js 14 (App Router) | Renderização híbrida (SSR / Client Components), roteamento e SEO |
| **Linguagem** | TypeScript 5 (Strict) | Tipagem estrita de ativos, ordens, carteiras e suitability |
| **Estilização** | Tailwind CSS 3 | Design System responsivo, dark mode nativo e mobile-first |
| **Gráficos** | Recharts 2 | Curva de rentabilidade vs. IBOVESPA/CDI e Gráfico Donut de alocação |
| **Ícones** | Lucide-React | Iconografia vetorial leve e padronizada |
| **Gerenciamento de Estado** | React Context API + LocalStorage | Persistência local transparente e sincronização de saldo |
| **APIs de Mercado** | Brapi.dev / CoinGecko / HG Brasil | Feeds de cotações com fallback inteligente de alta resiliência |

---

## 🎨 Auditoria e Correção de Glitches do Protótipo (UI/UX & Acessibilidade WCAG 2.1 AA)

Durante a fase de prototipagem no Google Stitch, foram identificados e corrigidos defeitos comuns gerados por inteligência artificial visual. Todas as correções foram implementadas no código com padrões rigorosos de engenharia frontend:

### 1. Prevenção de Quebras de Linha Desastrosas em Badges e Chips
- **Problema no Protótipo:** Textos curtos de status quebravam em múltiplas linhas de forma deselegante (ex: "AMBIENTE SIMULADO • SEM RISCO" com "REAL" isolado na linha de baixo).
- **Correção Implementada:** Aplicação sistemática de classes Tailwind utilitárias:
  ```tsx
  className="inline-flex items-center gap-2 whitespace-nowrap px-3 py-1 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25"
  ```
  Isso garante que o badge mantenha sua integridade horizontal em qualquer resolução de tela (desktop, tablet e mobile).

### 2. Alinhamento Perfeito de Indicadores (Dots) e Ícones
- **Problema no Protótipo:** Pontos de status (pulsing dots) e escudos de segurança sofriam distorções de proporção devido ao encolhimento flex (`flex-shrink`).
- **Correção Implementada:** Inclusão de `flex-shrink-0` e alinhamento vertical com `items-center leading-none`, garantindo círculos perfeitamente redondos (`rounded-full h-2 w-2`) e centralizados.

### 3. Eliminação de Elementos Espremidos ou Deformados
- **Problema no Protótipo:** Textos de marca (como "Bahia Capital Edu") ficavam espremidos dentro de contêineres de tamanho fixo.
- **Correção Implementada:** Remoção de larguras fixas rígidas em elementos de texto, substituindo por contêineres dinâmicos com `min-w-fit px-2.5 py-1` e layouts flexíveis com espaçamentos proporcionais em escala de 8px.

### 4. Contraste e Legibilidade (WCAG 2.1 AA)
- **Problema no Protótipo:** Textos âmbar ou verdes apresentavam contraste insuficiente quando sobrepostos em fundos pretos chapados.
- **Correção Implementada:** Uso de superfícies escuras ricas em ardósia (`#0F172A` e `#1E293B`) combinadas com fundos semitransparentes sutis e bordas calibradas:
  - Alertas Positivos / Lucro: `bg-emerald-500/10 text-emerald-400 border border-emerald-500/20`
  - Alertas Pedagógicos / Atenção: `bg-amber-500/10 text-amber-400 border border-amber-500/20`
  - Contraste de texto corpo `text-slate-300` e títulos `text-white` atingindo taxa superior a 7:1 contra o fundo.

---

## 🗺️ Mapa das 10 Telas Implementadas

| Rota | Tela | Finalidade Pedagógica |
|---|---|---|
| `/` | **1. Landing Page Institucional** | Apresenta a metodologia da consultoria, benefícios do simulador e card com bônus de R$ 10.000. |
| `/login` e `/cadastro` | **2. Autenticação & Onboarding** | Split-screen com depoimentos de alunos, seleção de perfil de investidor e liberação imediata do capital fictício. |
| `/dashboard` | **3. Dashboard Principal** | 4 KPIs principais, gráfico de rentabilidade da carteira vs. IBOVESPA/CDI, gráfico Donut de alocação e Card "Dica do Mentor". |
| `/mercado` | **4. Explorar Mercado & Cotações** | Tabela em tempo real com busca universal (PETR4, VALE3, BTC, etc.), filtros, marquee de índices e botão direto para boleta. |
| `/ativo/[ticker]` | **5. Raio-X do Ativo** | Análise técnica e fundamentalista simplificada (P/L, DY, ROE, Cap) e explicação didática do modelo de negócios. |
| `/negociar` | **6. Boleta de Negociação** | Compra e venda com atalhos percentuais (25%, 50%, 75%, 100%), taxas isentas e simulador de risco de concentração. |
| `/custodia` | **7. Minha Custódia & Posições** | Controle dos ativos possuídos, cálculo de preço médio ponderado, P&L aberto (R$ e %) e barra de concentração. |
| `/historico` | **8. Extrato & Histórico de Ordens** | Registro completo de operações, exportação para planilha CSV e modal com Nota de Corretagem Simulada oficial. |
| `/aprender` | **9. Academia do Investidor** | Nível do investidor com pontuação XP, trilhas de aprendizado B3/Cripto, missões gamificadas e glossário interativo. |
| `/configuracoes` | **10. Perfil & Reset Educacional** | Ajuste do perfil de suitability, status das APIs ao vivo e o **Botão de Emergência Pedagógica (Reset R$ 10.000,00)**. |

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- **Node.js** v18.17+ ou v20+ instalado na máquina.
- **NPM** ou **Yarn** ou **PNPM**.

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/DevAsouzzlv/bahia-capital-simulador.git
   cd "Bahia Capital Consultoria"
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse no navegador:**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador preferido.

5. **Gere a build de produção:**
   ```bash
   npm run build
   npm run start
   ```

---

## 💡 Recursos Pedagógicos Exclusivos

1. **Botão de Reset Educacional (Emergency Sandbox Reset):**
   - Localizado nas configurações e na barra superior, permite ao aluno zerar todas as posições com 1 clique e retornar ao caixa de **R$ 10.000,00**, permitindo testar novas teses de mercado sem vício de decisões anteriores.
2. **Simulador de Risco na Boleta:**
   - Ao digitar uma quantidade para compra, a boleta calcula instantaneamente a representatividade daquela ordem na carteira total. Se ultrapassar 25%, um alerta educativo do mentor Bahia Capital é disparado para ensinar diversificação prudente.
3. **Nota de Corretagem Didática:**
   - O aluno pode visualizar uma nota de corretagem com layout idêntico ao emitido pelas corretoras credenciadas na B3, aprendendo sobre taxas de liquidação, emolumentos e retenção de IRRF antes de operar na vida real.

---

## 📄 Licença
Desenvolvido com excelência técnica para **Bahia Capital Consultoria Financeira**. Todos os direitos reservados.
