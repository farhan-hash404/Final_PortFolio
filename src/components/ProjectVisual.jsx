
import './ProjectVisual.css'

/**
 * Each project gets a schematic of how it actually works rather than a
 * stock mockup — an agent graph, a debate loop, a CNN pipeline, a reward
 * curve, a churn split. Pure SVG, no assets to ship.
 */

/**
 * Stripped back to just the drawing. The old version wrapped every diagram
 * in faux window chrome, a tag footer and a background grid — all of it
 * noise that competed with the schematic itself, and none of it legible
 * now these render as strip frames rather than half a page.
 */
const Frame = ({ children, label, w = 520, h = 340 }) => {
  return (
    <div className="pv">
      <svg viewBox={`0 0 ${w} ${h}`} className="pv__svg" role="img" aria-label={label}>
        <defs>
          <linearGradient id="pvFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d9f227" stopOpacity=".24" />
            <stop offset="100%" stopColor="#d9f227" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="pvLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#b6cc16" />
            <stop offset="100%" stopColor="#d9f227" />
          </linearGradient>
        </defs>
        {children}
      </svg>
    </div>
  )
}

/**
 * Text is centred against the box height so nodes of any height read right.
 *
 * Coords are coerced with + because callers pass them as JSX string
 * attributes (x="22"). Without it, `x + w / 2` divides fine but then
 * *concatenates* — "22" + 66 = "2266" — parking every label far outside
 * the viewBox where it silently vanishes.
 */
const Node = ({ x, y, w = 108, h = 40, title, sub, hot }) => {
  const [X, Y, W, H] = [+x, +y, +w, +h]
  return (
    <g className={`pv__node ${hot ? 'is-hot' : ''}`}>
      <rect
        x={X}
        y={Y}
        width={W}
        height={H}
        rx="9"
        fill={hot ? 'rgba(217,242,39,.12)' : 'rgba(255,255,255,.045)'}
        stroke={hot ? 'rgba(217,242,39,.5)' : 'rgba(255,255,255,.14)'}
      />
      <text
        x={X + W / 2}
        y={Y + (sub ? H / 2 - 3 : H / 2 + 4)}
        className="pv__t"
        textAnchor="middle"
      >
        {title}
      </text>
      {sub && (
        <text x={X + W / 2} y={Y + H / 2 + 11} className="pv__s" textAnchor="middle">
          {sub}
        </text>
      )}
    </g>
  )
}

/* Small pill used for output formats and practice modes. */
const Chip = ({ x, y, w, h = 26, label, hot }) => {
  const [X, Y, W, H] = [+x, +y, +w, +h]
  return (
    <g>
      <rect
        x={X}
        y={Y}
        width={W}
        height={H}
        rx={H / 2}
        fill={hot ? 'rgba(217,242,39,.1)' : 'rgba(255,255,255,.04)'}
        stroke={hot ? 'rgba(217,242,39,.4)' : 'rgba(255,255,255,.12)'}
      />
      <text
        x={X + W / 2}
        y={Y + H / 2 + 3}
        className="pv__s"
        textAnchor="middle"
        style={hot ? { fill: '#d9f227' } : null}
      >
        {label}
      </text>
    </g>
  )
}

/* Static connector. Motion is carried by a Packet instead. */
const Wire = ({ d }) => (
  <path d={d} className="pv__wire" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="1.2" />
)

/* A dot that rides `track` end to end, showing the flow direction. */
const Packet = ({ track }) => (
  <>
    <circle className="pv__packetGlow" r="7" fill="#d9f227" style={{ '--track': `path("${track}")` }} />
    <circle className="pv__packet" r="3.2" fill="#d9f227" style={{ '--track': `path("${track}")` }} />
  </>
)

const Flow = ({ d, delay = 0 }) => (
  <path
    d={d}
    className="pv__flow"
    fill="none"
    stroke="url(#pvLine)"
    strokeWidth="1.4"
    style={{ animationDelay: `${delay}s` }}
  />
)

/* ------------------------------------------------------------------ */
/* 01 — AI Content Factory: research → generate → gate → repurpose      */
/* ------------------------------------------------------------------ */
function FactoryVisual() {
  const outputs = [
    'YouTube Short',
    'Podcast',
    'YouTube Script',
    'Twitter / X',
    'LinkedIn',
  ]

  return (
    <Frame
      w={560}
      h={400}
      label="AI Content Factory multi-agent pipeline: orchestrator research, blog generation, evaluation gate with regeneration loop, image generation, and content repurposing"
      caption="content-factory"
      foot={['2 agents + evaluator', 'quality gate', '5 output formats']}
    >
      <text x="22" y="26" className="pv__cap">
        MULTI-AGENT CONTENT PIPELINE
      </text>

      {/* Static rails; the packet below supplies the motion. */}
      <Wire d="M88 80 V 98" />
      <Wire d="M88 146 V 164" />
      <Wire d="M88 206 V 224" />
      <Wire d="M88 266 H 160 V 134 H 196" />
      <Wire d="M270 146 V 170" />
      <Wire d="M270 222 V 246" />
      <Wire d="M270 288 V 306" />
      <Wire d="M344 327 H 370 V 91" />

      {/* ---- column A: research ---- */}
      <Node x="22" y="46" w="132" h="34" title="User Topic" />
      <Node x="22" y="98" w="132" h="48" title="Orchestrator" sub="plans + researches" hot />
      <Node x="22" y="164" w="132" h="42" title="Trusted Web" sub="vetted sources" />
      <Node x="22" y="224" w="132" h="42" title="Outline" sub="structure" />

      {/* ---- column B: generate + gate ---- */}
      <Node x="196" y="98" w="148" h="48" title="Blog Agent" sub="drafts article" />
      <Node x="196" y="170" w="148" h="52" title="Evaluation Gate" sub="quality criteria" hot />

      {/* fail → regenerate, routed left of the column */}
      <path
        d="M196 200 H 178 V 110 H 196"
        fill="none"
        stroke="rgba(255,255,255,.22)"
        strokeWidth="1"
        strokeDasharray="3 4"
      />
      <text x="172" y="158" className="pv__s" textAnchor="end">
        FAIL
      </text>
      <text
        x="188"
        y="155"
        className="pv__s"
        textAnchor="middle"
        transform="rotate(-90 188 155)"
      >
        REGENERATE
      </text>

      <text x="278" y="238" className="pv__s" style={{ fill: '#d9f227' }}>
        PASS
      </text>

      <Node x="196" y="246" w="148" h="42" title="Image Gen" sub="visuals attached" />
      <Node x="196" y="306" w="148" h="42" title="Final Blog" hot />

      {/* ---- column C: repurposing fan-out ---- */}
      <text x="388" y="60" className="pv__cap">
        REPURPOSED INTO
      </text>

      {outputs.map((o, i) => {
        const y = 76 + i * 38
        return (
          <g key={o}>
            <Flow d={`M370 ${y + 15} H 388`} delay={i * 0.12} />
            <Chip x={388} y={y} w={150} h={30} label={o} hot={i === 0} />
          </g>
        )
      })}

      {/* The query itself, travelling the pipeline end to end. Drawn last
          so it rides over the nodes it passes through. */}
      <Packet track="M88 80 V 266 H 160 V 134 H 270 V 327 H 370 V 91" />
    </Frame>
  )
}

/* ------------------------------------------------------------------ */
/* 03 — Dev Signal: mine forums → 2-pass Gemini → scored ideas + PRDs   */
/* ------------------------------------------------------------------ */
function SignalVisual() {
  const outputs = ['Pain points', 'Product ideas', 'PRD docs', 'Trends']
  const scores = [
    { l: 'SEVERITY', v: 0.82 },
    { l: 'FREQUENCY', v: 0.66 },
    { l: 'MARKET OPPORTUNITY', v: 0.74 },
    { l: 'SENTIMENT', v: 0.58 },
  ]

  return (
    <Frame
      w={560}
      h={400}
      label="Dev Signal pipeline: async scrapers over developer forums feeding a two-pass Gemini synthesis that produces scored pain points, product ideas and PRDs"
      caption="discovery-pipeline"
      foot={['async scrapers', '2-pass Gemini', 'PRD per idea']}
    >
      <text x="22" y="26" className="pv__cap">
        MINE → SYNTHESISE → SPEC
      </text>

      {/* rails */}
      <Wire d="M154 67 H 176 V 100 H 196" />
      <Wire d="M154 125 H 176 V 100" />
      <Wire d="M272 124 V 146" />
      <Wire d="M272 194 V 216" />
      <Wire d="M348 237 H 372 V 91" />

      {/* sources */}
      <Node x="22" y="46" w="132" h="42" title="Reddit" sub="r/webdev · r/SaaS" />
      <Node x="22" y="104" w="132" h="42" title="Stack Overflow" sub="API search" />

      {/* two-pass synthesis */}
      <Node x="196" y="76" w="152" h="48" title="Gemini Pass 1" sub="extract pain points" hot />
      <Node x="196" y="146" w="152" h="48" title="Gemini Pass 2" sub="ideas + PRD" hot />
      <Node x="196" y="216" w="152" h="42" title="Postgres" sub="persisted" />

      {/* surfaced outputs */}
      <text x="392" y="60" className="pv__cap">
        SURFACED AS
      </text>
      {outputs.map((o, i) => {
        const y = 76 + i * 38
        return (
          <g key={o}>
            <Flow d={`M372 ${y + 15} H 392`} delay={i * 0.12} />
            <Chip x={392} y={y} w={146} h={30} label={o} hot={i === 0} />
          </g>
        )
      })}

      {/* scoring */}
      <text x="22" y="252" className="pv__cap">
        EVERY PAIN POINT SCORED
      </text>
      {scores.map((s, i) => (
        <g key={s.l} transform={`translate(22 ${264 + i * 22})`}>
          <text x="0" y="9" className="pv__s">
            {s.l}
          </text>
          <rect x="152" y="2" width="180" height="7" rx="3.5" fill="rgba(255,255,255,.07)" />
          <rect
            x="152"
            y="2"
            height="7"
            rx="3.5"
            fill="#d9f227"
            className="pv__bar"
            style={{ '--w': `${180 * s.v}px`, animationDelay: `${i * 0.16}s` }}
          />
          <text x="342" y="9" className="pv__s">
            {s.v.toFixed(2)}
          </text>
        </g>
      ))}

      <text x="392" y="272" className="pv__s">
        4–6 PAIN POINTS
      </text>
      <text x="392" y="290" className="pv__s">
        3–5 IDEAS PER RUN
      </text>
      <text x="392" y="316" className="pv__s">
        FULL PRD WRITTEN
      </text>
      <text x="392" y="334" className="pv__s">
        FOR EACH IDEA
      </text>

      <Packet track="M154 67 H 176 V 100 H 272 V 258 H 372 V 91" />
    </Frame>
  )
}

/* ------------------------------------------------------------------ */
/* 02 — AI court: debate loop + judge scoring                          */
/* ------------------------------------------------------------------ */
function CourtVisual() {
  const scores = [
    { label: 'LEGAL REASONING', v: 0.86 },
    { label: 'ARGUMENT STRENGTH', v: 0.74 },
    { label: 'EVIDENCE USE', v: 0.81 },
    { label: 'REBUTTAL HANDLING', v: 0.69 },
  ]
  const modes = ['Case brief', 'Oral args', 'Judicial Q', 'Rebuttal']
  return (
    <Frame
      w={560}
      h={400}
      label="MootCourtSimulator moot court simulation: lawyer debating an AI opposing counsel while an AI judge scores against evaluation criteria"
      caption="moot-court-sim"
      foot={['AI counsel + judge', 'live rebuttals', 'scored feedback']}
    >
      <text x="22" y="26" className="pv__cap">
        MOOT COURT SIMULATION
      </text>

      {/* ---- presiding judge ---- */}
      <Node x="200" y="46" w="160" h="48" title="AI Judge" sub="presides · scores" hot />

      {/* judge observes both benches */}
      <path
        d="M280 94 V 120 M104 120 H 456 M104 120 V 148 M456 120 V 148"
        fill="none"
        stroke="rgba(255,255,255,.16)"
        strokeWidth="1"
        strokeDasharray="3 4"
      />

      {/* ---- the two benches ---- */}
      <Node x="26" y="148" w="156" h="52" title="You — Advocate" sub="arguments + evidence" />
      <Node
        x="378"
        y="148"
        w="156"
        h="52"
        title="AI Opposing Counsel"
        sub="counters + challenges"
        hot
      />

      {/* turn-by-turn exchange */}
      <Flow d="M182 166 H 378" />
      <Flow d="M378 184 H 182" delay={1.1} />

      <text x="280" y="218" className="pv__s" textAnchor="middle">
        LIVE LEGAL DEBATE — TURN BY TURN
      </text>

      {/* ---- moot court practice modes ---- */}
      {modes.map((m, i) => (
        <Chip key={m} x={26 + i * 128} y={230} w={120} h={24} label={m} />
      ))}

      {/* ---- judge's scorecard ---- */}
      <text x="26" y="278" className="pv__cap">
        EVALUATION CRITERIA
      </text>
      {scores.map((s, i) => (
        <g key={s.label} transform={`translate(26 ${286 + i * 22})`}>
          <text x="0" y="9" className="pv__s">
            {s.label}
          </text>
          <rect x="132" y="2" width="200" height="7" rx="3.5" fill="rgba(255,255,255,.07)" />
          <rect
            x="132"
            y="2"
            height="7"
            rx="3.5"
            fill="#d9f227"
            className="pv__bar"
            style={{ '--w': `${200 * s.v}px`, animationDelay: `${i * 0.16}s` }}
          />
          <text x="342" y="9" className="pv__s">
            {s.v.toFixed(2)}
          </text>
        </g>
      ))}

      {/* headline score + feedback */}
      <rect
        x="416"
        y="272"
        width="118"
        height="96"
        rx="10"
        fill="rgba(217,242,39,.08)"
        stroke="rgba(217,242,39,.32)"
      />
      <text x="475" y="312" className="pv__big" textAnchor="middle">
        78
      </text>
      <text x="475" y="330" className="pv__s" textAnchor="middle">
        PERFORMANCE
      </text>
      <text x="475" y="346" className="pv__s" textAnchor="middle">
        + FEEDBACK
      </text>
    </Frame>
  )
}

/* ------------------------------------------------------------------ */
/* 03 — CNN pipeline + confusion matrix                                */
/* ------------------------------------------------------------------ */
function ScanVisual() {
  const tiles = Array.from({ length: 24 }, (_, i) => i)
  return (
    <Frame
      label="CNN classification pipeline with confusion matrix"
      caption="cnn-pipeline"
      foot={['augmented input', 'conv stack', 'low false negatives']}
    >
      <text x="26" y="34" className="pv__cap">
        SCAN → PREPROCESS → CNN → CLASS
      </text>

      {/* input scan grid */}
      <g transform="translate(26 54)">
        <rect width="130" height="130" rx="8" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.12)" />
        {tiles.map((i) => {
          const c = i % 6
          const r = Math.floor(i / 6)
          const heat = Math.max(0, 1 - Math.hypot(c - 2.6, r - 1.8) / 3.4)
          return (
            <rect
              key={i}
              x={10 + c * 19}
              y={12 + r * 19}
              width="16"
              height="16"
              rx="3"
              fill={`rgba(217,242,39,${(heat * 0.62).toFixed(3)})`}
              stroke="rgba(255,255,255,.05)"
              className="pv__tile"
              style={{ animationDelay: `${i * 0.03}s` }}
            />
          )
        })}
      </g>
      <text x="26" y="200" className="pv__s">
        AUGMENTED INPUT
      </text>

      {/* conv stack */}
      <g transform="translate(184 66)">
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={i * 22}
            y={i * 14}
            width="72"
            height="94"
            rx="7"
            fill="rgba(255,255,255,.04)"
            stroke="rgba(255,255,255,.14)"
          />
        ))}
        <text x="58" y="128" className="pv__s" textAnchor="middle">
          CONV BLOCKS
        </text>
      </g>

      <Flow d="M162 118 H 182" />
      <Flow d="M300 128 H 330" delay={0.5} />

      {/* output classes */}
      <g transform="translate(334 62)">
        <Node x={0} y={0} w="150" h="36" title="Normal" hot />
        <Node x={0} y={44} w="150" h="36" title="Cyst" />
        <Node x={0} y={88} w="150" h="36" title="Stone / Tumour" />
      </g>

      {/* confusion matrix */}
      <text x="184" y="222" className="pv__cap">
        CONFUSION MATRIX
      </text>
      <g transform="translate(184 232)">
        {[
          [0.9, 0.06],
          [0.05, 0.88],
        ].map((row, r) =>
          row.map((v, c) => (
            <g key={`${r}-${c}`}>
              <rect
                x={c * 52}
                y={r * 44}
                width="48"
                height="40"
                rx="6"
                fill={`rgba(217,242,39,${(v * 0.5).toFixed(2)})`}
                stroke="rgba(255,255,255,.1)"
              />
              <text x={c * 52 + 24} y={r * 44 + 25} className="pv__t" textAnchor="middle">
                {Math.round(v * 100)}
              </text>
            </g>
          ))
        )}
        <text x="118" y="24" className="pv__s">
          PRECISION · RECALL
        </text>
        <text x="118" y="42" className="pv__s">
          ROC-AUC TRACKED
        </text>
        <text x="118" y="70" className="pv__s">
          TUNED TO CUT
        </text>
        <text x="118" y="88" className="pv__s">
          FALSE NEGATIVES
        </text>
      </g>
    </Frame>
  )
}

/* ------------------------------------------------------------------ */
/* 04 — Stick Fighter: live in-browser PPO loop + measured results      */
/* ------------------------------------------------------------------ */
function PPOVisual() {
  const results = [
    { k: 'ROUNDS WON', before: '11/12', after: '12/12' },
    { k: 'FRAMES TO WIN', before: '619', after: '258' },
    { k: 'HP REMAINING', before: '43', after: '91' },
  ]
  const ppo = ['GAE(λ)', 'clipped surrogate', 'entropy bonus', 'target-KL stop']

  return (
    <Frame
      w={560}
      h={400}
      label="Stick Fighter live PPO training loop: game state to actor-critic network to action, with reward feeding updates, plus measured before and after results"
      caption="live-ppo-loop"
      foot={['hand-rolled backprop', '51 KB bundle', 'trains in-browser']}
    >
      <text x="22" y="26" className="pv__cap">
        LIVE IN-BROWSER TRAINING LOOP
      </text>

      {/* forward pass */}
      <Wire d="M154 66 H 186" />
      <Wire d="M318 66 H 334 V 52 H 350" />
      <Wire d="M318 66 H 334 V 96 H 350" />

      <Node x="22" y="44" w="132" h="44" title="Game State" sub="46-dim obs" />
      <Node x="186" y="44" w="132" h="44" title="MLP 2×64" sub="tanh trunk" />
      <Node x="350" y="30" w="152" h="44" title="Policy Head" sub="15 actions" hot />
      <Node x="350" y="88" w="152" h="44" title="Value Head" sub="V(s)" />

      {/* action leaves the policy head, loops back into the game */}
      <Wire d="M502 52 H 520 V 158 H 88 V 88" />
      <text x="300" y="150" className="pv__s" textAnchor="middle">
        ACTION → ENVIRONMENT → REWARD → PPO UPDATE EVERY 128 FRAMES
      </text>

      {/* One continuous circuit, so the motion reads as a single step
          travelling obs → trunk → policy → action → back into the game. */}
      <Packet track="M154 66 H 334 V 52 H 520 V 158 H 88 V 88" />

      {/* PPO configuration */}
      {ppo.map((p, i) => (
        <Chip key={p} x={22 + i * 130} y={178} w={122} h={24} label={p} />
      ))}

      {/* measured results */}
      <text x="22" y="230" className="pv__cap">
        MEASURED — LEARNED NET ONLY, SCRIPTED PRIOR STRIPPED
      </text>

      {results.map((r, i) => (
        <g key={r.k} transform={`translate(${22 + i * 180} 244)`}>
          <rect
            width="164"
            height="80"
            rx="10"
            fill="rgba(255,255,255,.035)"
            stroke="rgba(255,255,255,.12)"
          />
          <text x="16" y="24" className="pv__s">
            {r.k}
          </text>
          <text x="16" y="52" className="pv__big">
            {r.after}
          </text>
          <text x="16" y="68" className="pv__s">
            was {r.before}
          </text>
        </g>
      ))}

      <text x="22" y="350" className="pv__s">
        42-CHECK HEADLESS SUITE RUNS THE EXACT CODE THE BROWSER SHIPS
      </text>
      <text x="22" y="368" className="pv__s">
        25 ROUNDS WON AVERAGED +192 REWARD · 5 LOST AVERAGED −12
      </text>
    </Frame>
  )
}

/* ------------------------------------------------------------------ */
/* 05 — Churn split + metrics                                          */
/* ------------------------------------------------------------------ */
function ChurnVisual() {
  const feats = [
    { l: 'TENURE', v: 0.86 },
    { l: 'SUPPORT CALLS', v: 0.71 },
    { l: 'MONTHLY SPEND', v: 0.63 },
    { l: 'CONTRACT TYPE', v: 0.52 },
    { l: 'LAST LOGIN', v: 0.41 },
  ]
  return (
    <Frame
      label="Churn model feature importance and evaluation metrics"
      caption="model-report"
      foot={['engineered features', 'compared models', 'ROC-AUC scored']}
    >
      <text x="26" y="34" className="pv__cap">
        FEATURE IMPORTANCE
      </text>

      {feats.map((f, i) => (
        <g key={f.l} transform={`translate(26 ${52 + i * 30})`}>
          <text x="0" y="12" className="pv__s">
            {f.l}
          </text>
          <rect x="128" y="4" width="230" height="10" rx="5" fill="rgba(255,255,255,.06)" />
          <rect
            x="128"
            y="4"
            height="10"
            rx="5"
            fill="#d9f227"
            className="pv__bar"
            style={{ '--w': `${230 * f.v}px`, animationDelay: `${i * 0.12}s` }}
          />
          <text x="370" y="13" className="pv__s">
            {f.v.toFixed(2)}
          </text>
        </g>
      ))}

      <line x1="26" x2="494" y1="212" y2="212" stroke="rgba(255,255,255,.09)" />

      <text x="26" y="238" className="pv__cap">
        EVALUATION
      </text>
      {[
        { k: 'ACCURACY', v: '0.89' },
        { k: 'PRECISION', v: '0.85' },
        { k: 'RECALL', v: '0.81' },
        { k: 'ROC-AUC', v: '0.92' },
      ].map((m, i) => (
        <g key={m.k} transform={`translate(${26 + i * 120} 252)`}>
          <rect
            width="106"
            height="56"
            rx="9"
            fill="rgba(255,255,255,.035)"
            stroke="rgba(255,255,255,.12)"
          />
          <text x="14" y="24" className="pv__big">
            {m.v}
          </text>
          <text x="14" y="42" className="pv__s">
            {m.k}
          </text>
        </g>
      ))}
    </Frame>
  )
}

/* ------------------------------------------------------------------ */
/* 05 — KidneyVision: dual-engine CT classifier + radiomic density      */
/* ------------------------------------------------------------------ */
function KidneyVisual() {
  // Hounsfield density bands the radiomic scorer reads, per class. The bar
  // fill tracks the band — ascending density, not a probability — so the
  // panel teaches the actual rule rather than restating a 100/0/0/0 softmax.
  const bands = [
    { label: 'CYST', v: 0.15, hu: '15–60' },
    { label: 'NORMAL', v: 0.33, hu: '60–110' },
    { label: 'KIDNEY TUMOR', v: 0.6, hu: '110–195', hot: true },
    { label: 'KIDNEY STONE', v: 0.88, hu: '>210' },
  ]

  return (
    <Frame
      w={560}
      h={400}
      label="KidneyVision dual-engine CT classifier: a renal CT frame passes through a fine-tuned VGG16 CNN and an ROI-masked radiomic scorer, fused into a four-class finding, with Hounsfield density bands and a result persisted behind FastAPI for history and analytics"
    >
      <text x="22" y="26" className="pv__cap">
        DUAL-ENGINE CT CLASSIFICATION
      </text>

      {/* rails: CT frame fans into both engines, which fuse into the softmax */}
      <Wire d="M140 96 H 160 V 72 H 180" />
      <Wire d="M140 96 H 160 V 140 H 180" />
      <Wire d="M332 72 H 352 V 104 H 372" />
      <Wire d="M332 140 H 352 V 104" />

      <Node x="22" y="70" w="118" h="52" title="CT Scan" sub="renal CT frame" />
      <Node x="180" y="48" w="152" h="48" title="VGG16 CNN" sub="fine-tuned · deep" hot />
      <Node x="180" y="116" w="152" h="48" title="CT Radiomics" sub="ROI-masked" />
      <Node x="372" y="80" w="150" h="48" title="4-class Softmax" sub="fused finding" hot />

      {/* one frame travelling obs → engine → fused finding */}
      <Packet track="M140 96 H 160 V 72 H 352 V 104 H 372" />

      <line x1="22" x2="538" y1="190" y2="190" stroke="rgba(255,255,255,.08)" />

      {/* ---- radiomic density bands (left) ---- */}
      <text x="22" y="214" className="pv__cap">
        RADIOMIC DENSITY · HOUNSFIELD BANDS
      </text>
      {bands.map((b, i) => (
        <g key={b.label} transform={`translate(22 ${226 + i * 27})`}>
          <text x="0" y="9" className="pv__s">
            {b.label}
          </text>
          <rect x="128" y="2" width="160" height="7" rx="3.5" fill="rgba(255,255,255,.07)" />
          <rect
            x="128"
            y="2"
            height="7"
            rx="3.5"
            fill="#d9f227"
            className="pv__bar"
            style={{ '--w': `${160 * b.v}px`, animationDelay: `${i * 0.16}s`, opacity: b.hot ? 1 : 0.55 }}
          />
          <text x="298" y="9" className="pv__s" style={b.hot ? { fill: '#d9f227' } : null}>
            {b.hu}
          </text>
        </g>
      ))}

      {/* ---- the finding + persistence (right) ---- */}
      <rect
        x="416"
        y="212"
        width="118"
        height="118"
        rx="10"
        fill="rgba(217,242,39,.08)"
        stroke="rgba(217,242,39,.32)"
      />
      <text x="475" y="252" className="pv__big" textAnchor="middle">
        100%
      </text>
      <text x="475" y="270" className="pv__s" textAnchor="middle">
        CONFIDENCE
      </text>
      <text x="475" y="296" className="pv__s" textAnchor="middle" style={{ fill: '#d9f227' }}>
        KIDNEY TUMOR
      </text>
      <text x="475" y="314" className="pv__s" textAnchor="middle">
        LOGGED TO DB
      </text>

      <text x="22" y="356" className="pv__s">
        SERVED BEHIND FASTAPI · SQLALCHEMY 2.0 PERSISTENCE
      </text>
      <text x="22" y="374" className="pv__s">
        EVERY SCAN → SEARCHABLE HISTORY + ANALYTICS DASHBOARD
      </text>
    </Frame>
  )
}

/* ------------------------------------------------------------------ */
/* 01 — TrichoRAG: evidence-grounded RAG & deterministic auditor      */
/* ------------------------------------------------------------------ */
function TrichoVisual() {
  const metrics = [
    { label: 'HIT@1 (CROSS-ENCODER)', v: 0.915 },
    { label: 'HIT@3 (CLINICAL + LAY)', v: 1.0 },
    { label: 'MRR@10 (HYBRID RANK)', v: 0.957 },
    { label: 'ABSTAIN AUROC', v: 1.0 },
  ]

  return (
    <Frame
      w={560}
      h={400}
      label="TrichoRAG evidence-grounded hair & scalp assistant: deterministic guardrails, hybrid dense and BM25 retrieval, int8 cross-encoder re-ranking, and sentence-level citation auditor withholding unverified claims"
      caption="trichorag-pipeline"
      foot={['deterministic guardrails', 'hybrid + cross-encoder', 'citation auditor']}
    >
      <text x="22" y="26" className="pv__cap">
        EVIDENCE-GROUNDED RAG & DETERMINISTIC AUDITOR
      </text>

      {/* Static connector rails */}
      <Wire d="M92 88 V 104" />
      <Wire d="M162 128 H 178 V 66 H 196" />
      <Wire d="M162 190 H 178 V 66" />
      <Wire d="M274 88 V 104" />
      <Wire d="M274 152 V 168" />
      <Wire d="M352 190 H 368 V 66 H 386" />
      <Wire d="M462 88 V 104" />

      {/* Column 1: Input & Safety Guardrails */}
      <Node x="22" y="44" w="140" h="44" title="User Query" sub="clinical / lay" />
      <Node x="22" y="104" w="140" h="48" title="Guardrails" sub="injection · dosing · crisis" hot />
      <Node x="22" y="168" w="140" h="44" title="Medical Corpus" sub="NHS · Medline · OGL" />

      {/* Column 2: Hybrid Retrieval & Agent */}
      <Node x="196" y="44" w="156" h="44" title="Hybrid Retrieval" sub="BM25 + Chroma ONNX" />
      <Node x="196" y="104" w="156" h="48" title="Cross-Encoder" sub="Hit@1: 0.915 · int8 local" hot />
      <Node x="196" y="168" w="156" h="44" title="LangGraph Graph" sub="extractive fallback" />

      {/* Column 3: Citation Auditor & Gated Delivery */}
      <Node x="386" y="44" w="152" h="44" title="Citation Auditor" sub="sentence-by-sentence" hot />
      <Node x="386" y="104" w="152" h="48" title="Verified Output" sub="cited sources attached" hot />
      <Node x="386" y="168" w="152" h="44" title="Withhold / Abstain" sub="AUROC 1.000 gate" />

      {/* Unverified claims withheld */}
      <path
        d="M538 66 H 550 V 190 H 538"
        fill="none"
        stroke="rgba(255,255,255,.2)"
        strokeWidth="1"
        strokeDasharray="3 4"
      />
      <text x="470" y="98" className="pv__s" style={{ fill: '#d9f227' }}>
        PASS
      </text>
      <text
        x="546"
        y="128"
        className="pv__s"
        textAnchor="middle"
        transform="rotate(90 546 128)"
      >
        WITHHOLD
      </text>

      {/* Dynamic packet tracing the full retrieval-to-audit flow */}
      <Packet track="M92 44 V 128 H 178 V 66 H 274 V 190 H 368 V 66 H 462 V 152" />

      <line x1="22" x2="538" y1="228" y2="228" stroke="rgba(255,255,255,.08)" />

      {/* Benchmark metrics (Left) */}
      <text x="22" y="248" className="pv__cap">
        BENCHMARK (56-DOC / 1,077-CHUNK CORPUS)
      </text>
      {metrics.map((m, i) => (
        <g key={m.label} transform={`translate(22 ${260 + i * 22})`}>
          <text x="0" y="9" className="pv__s">
            {m.label}
          </text>
          <rect x="176" y="2" width="180" height="7" rx="3.5" fill="rgba(255,255,255,.07)" />
          <rect
            x="176"
            y="2"
            height="7"
            rx="3.5"
            fill="#d9f227"
            className="pv__bar"
            style={{ '--w': `${180 * m.v}px`, animationDelay: `${i * 0.14}s` }}
          />
          <text x="366" y="9" className="pv__s">
            {m.v.toFixed(3)}
          </text>
        </g>
      ))}

      {/* Clinical test suite card (Right) */}
      <rect
        x="416"
        y="242"
        width="122"
        height="102"
        rx="10"
        fill="rgba(217,242,39,.08)"
        stroke="rgba(217,242,39,.32)"
      />
      <text x="477" y="278" className="pv__big" textAnchor="middle">
        149
      </text>
      <text x="477" y="296" className="pv__s" textAnchor="middle">
        TESTS PASSING
      </text>
      <text x="477" y="318" className="pv__s" textAnchor="middle" style={{ fill: '#d9f227' }}>
        0 PRESCRIPTIONS
      </text>
      <text x="477" y="334" className="pv__s" textAnchor="middle">
        DETERMINISTIC
      </text>

      <text x="22" y="366" className="pv__s">
        HYBRID SEARCH (BM25 + CHROMADB ONNX) · RE-RANKED BY INT8 CROSS-ENCODER
      </text>
      <text x="22" y="382" className="pv__s">
        SAFETY RUNS BEFORE MODELS · DETERMINISTIC CITATION AUDITOR WITHHOLDS UNVERIFIED CLAIMS
      </text>
    </Frame>
  )
}

const registry = {
  trichorag: TrichoVisual,
  factory: FactoryVisual,
  court: CourtVisual,
  signal: SignalVisual,
  scan: ScanVisual,
  ppo: PPOVisual,
  churn: ChurnVisual,
  kidneyvision: KidneyVisual,
}

export default function ProjectVisual({ kind }) {
  const V = registry[kind] || FactoryVisual
  return <V />
}
