import React, { useState } from 'react';
import { 
  Network, 
  Sparkles, 
  Layers, 
  HelpCircle, 
  ArrowRight, 
  Zap, 
  CheckCircle2,
  Info
} from 'lucide-react';
import { ConceptNode } from '../types';
import { MOCK_CONCEPT_NODES } from '../data/mockData';

interface ConceptMapPageProps {
  setActiveTab: (tab: string) => void;
}

export const ConceptMapPage: React.FC<ConceptMapPageProps> = ({ setActiveTab }) => {
  const [selectedNode, setSelectedNode] = useState<ConceptNode>(MOCK_CONCEPT_NODES[0]);

  // Coordinates for rendering SVG Mind Map layout
  const nodeCoords: Record<string, { x: number; y: number }> = {
    'node-1': { x: 200, y: 150 }, // Glucose Breakdown
    'node-2': { x: 450, y: 100 }, // Pyruvate Oxidation
    'node-3': { x: 200, y: 350 }, // PFK-1 Control
    'node-4': { x: 680, y: 150 }, // Krebs Cycle
    'node-5': { x: 680, y: 350 }, // Complex II (Weak Spot)
    'node-6': { x: 450, y: 350 }, // Proton Gradient & ATP Synthase
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 space-y-2 border border-white/15">
        <div className="flex items-center gap-2 text-xs font-bold text-[#4ECDC4] uppercase tracking-wider">
          <Network className="w-4 h-4" />
          <span>MindLoop Concept Connections™</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-[#Outfit]">
          Interactive Concept Knowledge Graph
        </h1>
        <p className="text-sm text-slate-300">
          Visualizes relationships between concepts extracted from your notes. Click any node to explore its mastery level and connected ideas.
        </p>
      </div>

      {/* TWO COLUMNS: INTERACTIVE GRAPH & DETAILS PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: SVG Mind Map Canvas (8 Cols) */}
        <div className="lg:col-span-8 glass-panel p-6 border border-white/15 min-h-[460px] relative overflow-hidden flex flex-col justify-between">
          
          <div className="flex items-center justify-between z-10">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Cellular Respiration Topology Map
            </span>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-[#4ECDC4]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#4ECDC4]" /> High Mastery
              </span>
              <span className="flex items-center gap-1 text-rose-400">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-pulse" /> Weak Spot
              </span>
            </div>
          </div>

          {/* SVG Map Area */}
          <div className="relative w-full h-80 sm:h-96 my-auto">
            <svg className="w-full h-full" viewBox="0 0 850 450">
              {/* Draw Connection Lines between nodes */}
              {MOCK_CONCEPT_NODES.map((node) => {
                const fromCoord = nodeCoords[node.id];
                if (!fromCoord) return null;

                return node.connections.map((targetId) => {
                  const toCoord = nodeCoords[targetId];
                  if (!toCoord) return null;

                  return (
                    <line
                      key={`${node.id}-${targetId}`}
                      x1={fromCoord.x}
                      y1={fromCoord.y}
                      x2={toCoord.x}
                      y2={toCoord.y}
                      stroke="rgba(108, 99, 255, 0.35)"
                      strokeWidth="2"
                      strokeDasharray="4,4"
                    />
                  );
                });
              })}

              {/* Draw Nodes */}
              {MOCK_CONCEPT_NODES.map((node) => {
                const coord = nodeCoords[node.id];
                if (!coord) return null;

                const isSelected = selectedNode.id === node.id;
                const isWeak = node.mastery < 60;

                return (
                  <g 
                    key={node.id} 
                    transform={`translate(${coord.x}, ${coord.y})`}
                    onClick={() => setSelectedNode(node)}
                    className="cursor-pointer group"
                  >
                    {/* Outer Pulse Halo */}
                    <circle
                      r={isSelected ? "38" : "32"}
                      fill={isWeak ? "rgba(255, 71, 87, 0.15)" : "rgba(108, 99, 255, 0.15)"}
                      stroke={isSelected ? "#4ECDC4" : isWeak ? "#FF4757" : "#6C63FF"}
                      strokeWidth={isSelected ? "3" : "1.5"}
                      className="transition-all duration-300 group-hover:scale-110"
                    />
                    
                    {/* Center Core */}
                    <circle
                      r="10"
                      fill={isWeak ? "#FF4757" : "#4ECDC4"}
                    />

                    {/* Node Text Label */}
                    <text
                      y="50"
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="12"
                      fontWeight="bold"
                      className="font-[#Outfit] select-none"
                    >
                      {node.label}
                    </text>

                    {/* Mastery % Badge */}
                    <text
                      y="-42"
                      textAnchor="middle"
                      fill={isWeak ? "#FF4757" : "#4ECDC4"}
                      fontSize="10"
                      fontWeight="bold"
                      className="select-none"
                    >
                      {node.mastery}%
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

        </div>

        {/* Right: Selected Node Details Drawer (4 Cols) */}
        <div className="lg:col-span-4 glass-panel p-6 border border-white/15 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#4ECDC4] uppercase tracking-wider">
                Concept Details
              </span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                selectedNode.mastery < 60
                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              }`}>
                {selectedNode.mastery}% Mastery
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white font-[#Outfit]">
                {selectedNode.label}
              </h2>
              <span className="text-xs text-slate-400">
                Category: {selectedNode.category}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed p-3 rounded-xl bg-white/[0.03] border border-white/10">
              {selectedNode.description}
            </p>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400">Connected Ideas:</span>
              <div className="flex flex-wrap gap-2">
                {selectedNode.connections.map((targetId) => {
                  const targetNode = MOCK_CONCEPT_NODES.find((n) => n.id === targetId);
                  return (
                    <button
                      key={targetId}
                      onClick={() => targetNode && setSelectedNode(targetNode)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-[#4ECDC4] border border-white/10 transition-colors cursor-pointer"
                    >
                      → {targetNode?.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('flashcards')}
            className="w-full btn-primary-glow py-3 text-xs font-bold text-white rounded-xl flex items-center justify-center gap-2 shadow-lg cursor-pointer"
          >
            <span>Practice Concept Flashcards</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
