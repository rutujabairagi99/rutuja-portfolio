import React, { useState, useEffect } from 'react';
import {
  X,
  Github,
  Copy,
  Check,
  Plus,
  Trash2,
  MapPin,
  CheckCircle2,
  Lightbulb,
  Sparkles
} from 'lucide-react';

export const ProjectDetailModal = ({ project, onClose }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState('simulator');

  // Kumbhmela E-commerce & Admin Panel Simulator
  const [adminView, setAdminView] = useState('store');
  const [kumbhProducts, setKumbhProducts] = useState([
    { id: 1, name: 'Handcrafted Brass Diya Set', price: 450, stock: 45, category: 'Puja Essentials' },
    { id: 2, name: 'Traditional Handloom Shawl', price: 1200, stock: 28, category: 'Apparel' },
    { id: 3, name: 'Organic Sandalwood Incense', price: 180, stock: 120, category: 'Fragrance' }
  ]);
  const [kumbhCart, setKumbhCart] = useState([
    { id: 1, name: 'Handcrafted Brass Diya Set', price: 450, qty: 1 }
  ]);
  const [newAdminProduct, setNewAdminProduct] = useState({ name: '', price: '', category: 'Puja Essentials' });

  // Location Geofence Simulator
  const [selectedZone, setSelectedZone] = useState('Nashik Central');
  const geofenceZones = {
    'Nashik Central': {
      lat: 19.9975,
      lng: 73.7898,
      radius: '350m',
      dealTitle: 'Artisan Handicrafts - 20% Off Festive Gift Hampers',
      discount: '20% OFF',
      apiCallsSaved: '42%'
    },
    'College Road': {
      lat: 20.0051,
      lng: 73.7645,
      radius: '400m',
      dealTitle: 'Café & Books - Buy 1 Get 1 Filter Coffee',
      discount: 'BOGO',
      apiCallsSaved: '38%'
    },
    'Panchavati Ghat': {
      lat: 20.0123,
      lng: 73.7915,
      radius: '500m',
      dealTitle: 'Heritage Walking Tour & Puja Souvenir Gift',
      discount: '15% OFF',
      apiCallsSaved: '45%'
    },
    'Dwarka Circle': {
      lat: 19.9870,
      lng: 73.8012,
      radius: '300m',
      dealTitle: 'Express Local Sweets & Delicacies Sampler',
      discount: '₹100 OFF',
      apiCallsSaved: '40%'
    }
  };

  // Task simulator state
  const [tasks] = useState([
    { id: '1', title: 'Connect Axios interceptor for JWT auth token', completed: true, priority: 'High' },
    { id: '2', title: 'Implement debounced search on Kumbhmela product list', completed: true, priority: 'Medium' },
    { id: '3', title: 'Optimize mobile responsiveness with Tailwind breakpoints', completed: false, priority: 'Low' }
  ]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const handleCopyCode = () => {
    if (project.caseStudy.codeSnippet) {
      navigator.clipboard.writeText(project.caseStudy.codeSnippet.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleAddKumbhToCart = (prod) => {
    setKumbhCart((prev) => {
      const exists = prev.find((item) => item.id === prod.id);
      if (exists) {
        return prev.map((item) =>
          item.id === prod.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...prod, qty: 1 }];
    });
  };

  const handleAddAdminProduct = (e) => {
    e.preventDefault();
    if (!newAdminProduct.name.trim() || !newAdminProduct.price) return;
    setKumbhProducts([
      ...kumbhProducts,
      {
        id: Date.now(),
        name: newAdminProduct.name.trim(),
        price: Number(newAdminProduct.price),
        stock: 50,
        category: newAdminProduct.category
      }
    ]);
    setNewAdminProduct({ name: '', price: '', category: 'Puja Essentials' });
  };

  const handleDeleteAdminProduct = (id) => {
    setKumbhProducts(kumbhProducts.filter((p) => p.id !== id));
  };

  const kumbhTotal = kumbhCart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
    >
      <div
        className="relative w-full max-w-4xl bg-[#0e1420] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800/80 flex items-center justify-between gap-4 bg-slate-900/60">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="text-cyan-400 font-medium">{project.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{project.year}</span>
              <span aria-hidden="true">·</span>
              <span>Interactive Demonstration</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display mt-1">
              {project.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {project.repoUrl && project.repoUrl !== '#' && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                title="View Code on GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Tabs */}
        <div className="px-6 py-2 border-b border-slate-800 flex items-center gap-2 bg-[#0b0f17]">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'simulator'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Live Simulation</span>
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'details'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Features & What I Learned</span>
          </button>
          {project.caseStudy.codeSnippet && (
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'code'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Axios / Code Architecture</span>
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'simulator' && (
            <div className="space-y-6">
              
              {/* Kumbhmela E-Commerce + Admin Panel Simulator */}
              {project.caseStudy.liveSimulatorType === 'ecommerce_kumbh' && (
                <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white uppercase tracking-wider">
                        Platform Mode:
                      </span>
                      <div className="flex gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                        <button
                          onClick={() => setAdminView('store')}
                          className={`px-2.5 py-1 text-xs font-medium rounded ${
                            adminView === 'store' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'
                          }`}
                        >
                          Customer Storefront
                        </button>
                        <button
                          onClick={() => setAdminView('admin')}
                          className={`px-2.5 py-1 text-xs font-medium rounded ${
                            adminView === 'admin' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'
                          }`}
                        >
                          Admin CRUD Panel
                        </button>
                      </div>
                    </div>

                    <span className="text-xs text-cyan-400 font-mono">
                      {adminView === 'store' ? `Cart: ₹${kumbhTotal}` : `${kumbhProducts.length} Listed Items`}
                    </span>
                  </div>

                  {/* Storefront View */}
                  {adminView === 'store' ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {kumbhProducts.map((prod) => (
                          <div
                            key={prod.id}
                            className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex flex-col justify-between text-xs space-y-2"
                          >
                            <div>
                              <div className="text-[10px] text-cyan-400 font-mono">{prod.category}</div>
                              <div className="font-semibold text-white mt-0.5">{prod.name}</div>
                              <div className="text-slate-300 font-mono font-bold mt-1">₹{prod.price}</div>
                            </div>
                            <button
                              onClick={() => handleAddKumbhToCart(prod)}
                              className="w-full py-1.5 text-xs font-medium bg-slate-800 hover:bg-cyan-400 hover:text-slate-950 text-slate-200 rounded transition-colors"
                            >
                              + Add to Cart
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Cart Drawer Output */}
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                        <div className="font-semibold text-white mb-1.5 flex items-center justify-between">
                          <span>Active Cart Items ({kumbhCart.length})</span>
                          <span className="font-mono text-cyan-400">Total: ₹{kumbhTotal}</span>
                        </div>
                        {kumbhCart.map((item) => (
                          <div key={item.id} className="flex justify-between py-1 text-slate-300 border-b border-slate-900 last:border-0">
                            <span>{item.name} (x{item.qty})</span>
                            <span className="font-mono">₹{item.price * item.qty}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Admin CRUD View */
                    <div className="space-y-4">
                      <form onSubmit={handleAddAdminProduct} className="flex flex-wrap items-center gap-2">
                        <input
                          type="text"
                          required
                          placeholder="Product Name"
                          value={newAdminProduct.name}
                          onChange={(e) => setNewAdminProduct({ ...newAdminProduct, name: e.target.value })}
                          className="bg-slate-950 border border-slate-800 px-3 py-1.5 text-xs text-white rounded-lg flex-1 min-w-[150px]"
                        />
                        <input
                          type="number"
                          required
                          placeholder="Price (₹)"
                          value={newAdminProduct.price}
                          onChange={(e) => setNewAdminProduct({ ...newAdminProduct, price: e.target.value })}
                          className="bg-slate-950 border border-slate-800 px-3 py-1.5 text-xs text-white rounded-lg w-24"
                        />
                        <button
                          type="submit"
                          className="px-3.5 py-1.5 text-xs font-semibold bg-cyan-400 text-slate-950 rounded-lg hover:bg-cyan-300 transition-colors flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Listing</span>
                        </button>
                      </form>

                      {/* Product listings table */}
                      <div className="space-y-1.5">
                        {kumbhProducts.map((p) => (
                          <div key={p.id} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
                            <span className="text-white font-medium">{p.name}</span>
                            <div className="flex items-center gap-4">
                              <span className="font-mono text-cyan-400">₹{p.price}</span>
                              <span className="text-slate-400 text-[11px] font-mono">Stock: {p.stock}</span>
                              <button
                                onClick={() => handleDeleteAdminProduct(p.id)}
                                className="text-slate-500 hover:text-rose-400"
                                title="Delete listing"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Location Geofence Simulator */}
              {project.caseStudy.liveSimulatorType === 'geofence' && (
                <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs font-semibold text-white uppercase tracking-wider">
                      Interactive Geofence Zone Detector
                    </span>
                    <span className="text-xs font-mono text-emerald-400">
                      Debounce: Active (40% API calls saved)
                    </span>
                  </div>

                  {/* Zone buttons */}
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(geofenceZones).map((zoneName) => (
                      <button
                        key={zoneName}
                        onClick={() => setSelectedZone(zoneName)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 ${
                          selectedZone === zoneName
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <MapPin className="w-3 h-3 text-cyan-400" />
                        <span>{zoneName}</span>
                      </button>
                    ))}
                  </div>

                  {/* Live targeted advertisement card */}
                  {(() => {
                    const zone = geofenceZones[selectedZone];
                    return (
                      <div className="p-5 bg-gradient-to-br from-slate-950 to-slate-900 rounded-xl border border-slate-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-slate-400">
                            Simulated GPS: {zone.lat}° N, {zone.lng}° E · Radius {zone.radius}
                          </span>
                          <span className="px-2 py-0.5 text-xs font-bold font-mono bg-cyan-400 text-slate-950 rounded">
                            {zone.discount}
                          </span>
                        </div>

                        <div className="text-base font-bold text-white font-display">
                          {zone.dealTitle}
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800 font-mono">
                          <div className="text-slate-400">
                            API Requests Saved: <span className="text-emerald-400 font-bold">{zone.apiCallsSaved}</span>
                          </div>
                          <div className="text-slate-400 text-right">
                            Page Render Latency: <span className="text-cyan-300 font-bold">&lt; 1.6s</span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* TaskFlow Simulator fallback */}
              {project.caseStudy.liveSimulatorType === 'task' && (
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                  <div className="text-xs font-semibold text-white">Interactive Task Checklist:</div>
                  {tasks.map((t) => (
                    <div key={t.id} className="flex items-center gap-3 p-2 bg-slate-950 rounded text-xs text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      <span>{t.title}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Weather Simulator fallback */}
              {project.caseStudy.liveSimulatorType === 'weather' && (
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                  <div className="text-xs font-semibold text-white">Nashik Live Weather Forecast:</div>
                  <div className="p-3 bg-slate-950 rounded text-xs font-mono text-cyan-300">
                    Nashik, Maharashtra: 28°C · Pleasant & Sunny · Humidity: 48%
                  </div>
                </div>
              )}

              {/* Project Purpose */}
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800/80">
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                  Project Purpose & Architecture
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.summary}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* What I Learned */}
              <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
                  <Lightbulb className="w-4 h-4" />
                  <span>Key Learnings & Growth</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.caseStudy.whatILearned}
                </p>
              </div>

              {/* Features List */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">
                  Key Implemented Features
                </h4>
                <div className="space-y-2">
                  {project.caseStudy.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 bg-slate-900/40 border border-slate-800/80 rounded-xl text-xs text-slate-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && project.caseStudy.codeSnippet && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  {project.caseStudy.codeSnippet.title}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded flex items-center gap-1.5 transition-colors"
                >
                  {copiedCode ? (
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

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto text-xs font-mono text-cyan-200 leading-relaxed max-h-[380px]">
                <pre>{project.caseStudy.codeSnippet.code}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-slate-800 bg-[#0b0f17] flex items-center justify-between">
          <div className="text-xs text-slate-400">
            {project.tags.join(' · ')}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Close View
          </button>
        </div>
      </div>
    </div>
  );
};
