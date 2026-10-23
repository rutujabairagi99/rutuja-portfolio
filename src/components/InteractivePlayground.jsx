import React, { useState } from 'react';
import { Sparkles, Code2, Copy, Check, RotateCcw, Heart } from 'lucide-react';

export const InteractivePlayground = ({ profile }) => {
  const [activeTab, setActiveTab] = useState('react_state');

  // React State Explorer states
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(24);
  const [copiedReactCode, setCopiedReactCode] = useState(false);

  // Flexbox Explorer states
  const [justifyContent, setJustifyContent] = useState('justify-center');
  const [alignItems, setAlignItems] = useState('items-center');
  const [gapSize, setGapSize] = useState(16);
  const [copiedCssCode, setCopiedCssCode] = useState(false);

  const reactSnippet = `// React useState Counter & Like Toggle Demo
import React, { useState } from 'react';

export function CounterWidget() {
  const [count, setCount] = useState(${count});
  const [isLiked, setIsLiked] = useState(${isLiked});

  return (
    <div className="p-4 bg-slate-900 rounded-xl">
      <p>Count: {count}</p>
      <button onClick={() => setCount(prev => prev + ${step})}>+ Add</button>
      <button onClick={() => setIsLiked(!isLiked)}>
        {isLiked ? '❤️ Liked' : '🤍 Like'}
      </button>
    </div>
  );
}`;

  const flexboxClass = `flex flex-row ${justifyContent} ${alignItems} p-6 bg-slate-950 rounded-xl min-h-[160px]`;

  const flexboxSnippet = `<!-- Responsive Flexbox container with Tailwind CSS -->
<div className="${flexboxClass}" style={{ gap: '${gapSize}px' }}>
  <div className="p-4 bg-cyan-500 text-slate-950 rounded-lg font-bold">Item 1</div>
  <div className="p-4 bg-blue-500 text-white rounded-lg font-bold">Item 2</div>
  <div className="p-4 bg-indigo-500 text-white rounded-lg font-bold">Item 3</div>
</div>`;

  const copyCode = (code, isReact) => {
    navigator.clipboard.writeText(code);
    if (isReact) {
      setCopiedReactCode(true);
      setTimeout(() => setCopiedReactCode(false), 2000);
    } else {
      setCopiedCssCode(true);
      setTimeout(() => setCopiedCssCode(false), 2000);
    }
  };

  return (
    <section id="sandbox" className="py-24 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-cyan-400 mb-2">
              Frontend Fundamentals
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Interactive React & CSS Playground
            </h2>
            <p className="mt-3 text-slate-400 max-w-xl text-sm sm:text-base">
              Try out real-time interactive demos demonstrating my understanding of React component state, event handlers, and CSS Flexbox layout algorithms.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-900/80 border border-slate-800 rounded-xl w-fit">
            <button
              onClick={() => setActiveTab('react_state')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-2 ${
                activeTab === 'react_state'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>React State & Hooks</span>
            </button>
            <button
              onClick={() => setActiveTab('flexbox')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-2 ${
                activeTab === 'flexbox'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>CSS Flexbox Visualizer</span>
            </button>
          </div>
        </div>

        {/* Tab 1: React State Explorer */}
        {activeTab === 'react_state' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Interactive Controller */}
            <div className="lg:col-span-6 bg-[#0e1420] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Interactive React Component
                </span>
                <button
                  onClick={() => {
                    setCount(0);
                    setStep(1);
                    setIsLiked(false);
                    setLikeCount(24);
                  }}
                  className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              </div>

              {/* Counter Display & Controls */}
              <div className="p-6 bg-slate-950 rounded-xl border border-slate-800/80 text-center space-y-4">
                <div className="text-xs text-slate-400 font-mono">React State: count</div>
                <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono tabular-nums">
                  {count}
                </div>

                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => setCount((prev) => prev - step)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-bold font-mono transition-colors active:scale-95"
                  >
                    -{step}
                  </button>
                  <button
                    onClick={() => setCount(0)}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg text-xs font-mono transition-colors"
                  >
                    Zero
                  </button>
                  <button
                    onClick={() => setCount((prev) => prev + step)}
                    className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg text-sm font-bold font-mono transition-colors active:scale-95"
                  >
                    +{step}
                  </button>
                </div>

                {/* Step Selector */}
                <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-400">
                  <span>Step Size:</span>
                  {[1, 5, 10].map((s) => (
                    <button
                      key={s}
                      onClick={() => setStep(s)}
                      className={`px-2.5 py-1 rounded text-xs font-mono font-bold ${
                        step === s ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-900 text-slate-400'
                      }`}
                    >
                      +{s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Like Toggle Button */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white">Boolean State Toggle</div>
                  <div className="text-[11px] text-slate-400">Demonstrating conditional UI updates on click</div>
                </div>

                <button
                  onClick={() => {
                    setIsLiked(!isLiked);
                    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all active:scale-95 ${
                    isLiked
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm shadow-rose-500/10'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-400 text-rose-400' : ''}`} />
                  <span>{isLiked ? 'Liked' : 'Like'}</span>
                  <span className="font-mono tabular-nums opacity-75">({likeCount})</span>
                </button>
              </div>

              {/* Live JSON State Inspector */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs">
                <div className="text-[11px] text-slate-500 mb-1">State Inspector (Virtual DOM Memory):</div>
                <div className="text-cyan-300">
                  {`{ count: ${count}, step: ${step}, isLiked: ${isLiked}, likeCount: ${likeCount} }`}
                </div>
              </div>
            </div>

            {/* Code View */}
            <div className="lg:col-span-6 bg-[#0e1420] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-mono text-slate-400">
                  Clean Functional React Component
                </span>
                <button
                  onClick={() => copyCode(reactSnippet, true)}
                  className="px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded flex items-center gap-1.5 transition-colors"
                >
                  {copiedReactCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                {reactSnippet}
              </pre>

              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/80 text-xs text-slate-300 leading-relaxed space-y-1.5">
                <div className="font-semibold text-white">Why this matters:</div>
                <p>
                  Understanding state management and lifecycle hooks in React ensures components re-render predictably without infinite loops or unnecessary performance overhead.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Flexbox Explorer */}
        {activeTab === 'flexbox' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Flexbox Controls */}
            <div className="lg:col-span-5 bg-[#0e1420] border border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-300 pb-2 border-b border-slate-800">
                CSS Flexbox Controls
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-2">
                  justify-content (Main Axis)
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'justify-start', label: 'flex-start' },
                    { id: 'justify-center', label: 'center' },
                    { id: 'justify-end', label: 'flex-end' },
                    { id: 'justify-between', label: 'space-between' },
                    { id: 'justify-around', label: 'space-around' },
                  ].map((j) => (
                    <button
                      key={j.id}
                      onClick={() => setJustifyContent(j.id)}
                      className={`py-1.5 px-2 text-xs font-mono rounded border transition-colors ${
                        justifyContent === j.id
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {j.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-2">
                  align-items (Cross Axis)
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'items-start', label: 'flex-start' },
                    { id: 'items-center', label: 'center' },
                    { id: 'items-end', label: 'flex-end' },
                  ].map((a) => (
                    <button
                      key={a.id}
                      onClick={() => setAlignItems(a.id)}
                      className={`py-1.5 px-2 text-xs font-mono rounded border transition-colors ${
                        alignItems === a.id
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-slate-300 mb-2">
                  <span>gap spacing</span>
                  <span className="text-cyan-400 font-bold">{gapSize}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="48"
                  step="4"
                  value={gapSize}
                  onChange={(e) => setGapSize(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Live Visualizer & Generated Tailwind Code */}
            <div className="lg:col-span-7 space-y-6">
              {/* Visual Container */}
              <div className="p-4 bg-[#080c14] border border-slate-800 rounded-2xl">
                <div className="text-xs text-slate-400 font-mono mb-2">
                  Live Viewport Simulation:
                </div>
                <div
                  className={`w-full min-h-[220px] bg-slate-900/80 border border-dashed border-slate-700/80 rounded-xl transition-all duration-300 flex ${justifyContent} ${alignItems}`}
                  style={{ gap: `${gapSize}px` }}
                >
                  <div className="p-4 bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs font-mono shadow-md">
                    Box 01
                  </div>
                  <div className="p-4 bg-blue-500 text-white font-bold rounded-lg text-xs font-mono shadow-md">
                    Box 02 (taller)
                    <div className="text-[10px] opacity-75 font-normal">content</div>
                  </div>
                  <div className="p-4 bg-indigo-500 text-white font-bold rounded-lg text-xs font-mono shadow-md">
                    Box 03
                  </div>
                </div>
              </div>

              {/* Code Snippet */}
              <div className="bg-[#0e1420] border border-slate-800 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-slate-400">
                    Generated Tailwind CSS Markup
                  </span>
                  <button
                    onClick={() => copyCode(flexboxSnippet, false)}
                    className="px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded flex items-center gap-1.5 transition-colors"
                  >
                    {copiedCssCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy HTML</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3 bg-slate-950 rounded-xl text-xs font-mono text-cyan-200 overflow-x-auto">
                  {flexboxSnippet}
                </pre>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
