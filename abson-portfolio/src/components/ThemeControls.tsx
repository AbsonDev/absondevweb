'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Palette, Settings } from 'lucide-react';
import { useTheme, type PrimaryColor } from '@/contexts/ThemeContext';

const ThemeControls = () => {
  const { mode, primaryColor, toggleMode, setPrimaryColor } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const colors: { name: PrimaryColor; color: string; label: string }[] = [
    { name: 'orange', color: '#f97316', label: 'Laranja' },
    { name: 'blue', color: '#3b82f6', label: 'Azul' },
    { name: 'green', color: '#22c55e', label: 'Verde' },
    { name: 'purple', color: '#a855f7', label: 'Roxo' },
    { name: 'red', color: '#ef4444', label: 'Vermelho' },
    { name: 'pink', color: '#ec4899', label: 'Rosa' },
    { name: 'yellow', color: '#f59e0b', label: 'Amarelo' },
  ];

  return (
    <div className="fixed top-4 right-4 z-50">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="glass rounded-full p-3 hover:scale-110 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Settings className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-14 right-0 min-w-64 card"
          >
            {/* Theme Mode Toggle */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                Modo do Tema
              </h3>
              <div className="flex gap-2">
                <motion.button
                  onClick={toggleMode}
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg transition-all duration-300"
                  style={{
                    background: mode === 'light' 
                      ? 'linear-gradient(to right, #fbbf24, #f97316)'
                      : 'var(--bg-glass)',
                    color: mode === 'light' ? '#ffffff' : 'var(--text-secondary)',
                    border: mode === 'light' ? 'none' : `1px solid var(--border-light)`
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Sun className="w-4 h-4" />
                  <span className="text-sm font-medium">Claro</span>
                </motion.button>
                
                <motion.button
                  onClick={toggleMode}
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg transition-all duration-300"
                  style={{
                    background: mode === 'dark' 
                      ? 'linear-gradient(to right, #334155, #0f172a)'
                      : 'var(--bg-glass)',
                    color: mode === 'dark' ? '#ffffff' : 'var(--text-secondary)',
                    border: mode === 'dark' ? 'none' : `1px solid var(--border-light)`
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Moon className="w-4 h-4" />
                  <span className="text-sm font-medium">Escuro</span>
                </motion.button>
              </div>
            </div>

            {/* Primary Color Selector */}
            <div>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Palette className="w-4 h-4" />
                Cor Principal
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {colors.map(({ name, color, label }) => (
                  <motion.button
                    key={name}
                    onClick={() => setPrimaryColor(name)}
                    className={`relative w-12 h-12 rounded-lg transition-all duration-300 ${
                      primaryColor === name 
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent scale-110' 
                        : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                    whileHover={{ scale: primaryColor === name ? 1.1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={label}
                  >
                    {primaryColor === name && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Current Selection Display */}
            <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                <div className="flex justify-between">
                  <span>Tema:</span>
                  <span className="capitalize">{mode === 'light' ? 'Claro' : 'Escuro'}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Cor:</span>
                  <span className="capitalize">{colors.find(c => c.name === primaryColor)?.label}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[-1]" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ThemeControls;