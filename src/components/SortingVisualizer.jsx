import { useState } from 'react';
import SortingPanel from './SortingPanel';
import {
  bubbleSort,
  selectionSort,
  insertionSort,
  quickSort,
  mergeSort,
} from '../utils/sortingAlgorithms';

const ALGORITHMS = [
  { name: 'Bubble Sort', fn: bubbleSort, complexity: 'O(n²)' },
  { name: 'Selection Sort', fn: selectionSort, complexity: 'O(n²)' },
  { name: 'Insertion Sort', fn: insertionSort, complexity: 'O(n²)' },
  { name: 'Quick Sort', fn: quickSort, complexity: 'O(n log n)' },
  { name: 'Merge Sort', fn: mergeSort, complexity: 'O(n log n)' },
];

const SortingVisualizer = () => {
  const [array, setArray] = useState(() => generateArray(30));
  const [speed, setSpeed] = useState(50);
  const [size, setSize] = useState(30);

  function generateArray(len) {
    return Array.from({ length: len }, () => Math.floor(Math.random() * 90) + 10);
  }

  const handleGenerate = () => {
    setArray(generateArray(size));
  };

  const handleSizeChange = (e) => {
    const newSize = Number(e.target.value);
    setSize(newSize);
    setArray(generateArray(newSize));
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Blurred SVG background accent */}
      <svg
        className="absolute -z-10 left-1/2 top-0 -translate-x-1/2 blur-2xl opacity-60 select-none pointer-events-none"
        width="1200" height="700" viewBox="0 0 1200 700" fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'blur(80px)' }}
      >
        <ellipse cx="300" cy="200" rx="300" ry="200" fill="#60a5fa" />
        <ellipse cx="900" cy="500" rx="250" ry="180" fill="#a78bfa" />
        <ellipse cx="700" cy="100" rx="180" ry="120" fill="#f472b6" />
      </svg>
      {/* Main gradient background */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-300" />
      <div className="relative max-w-7xl mx-auto py-4 px-2 sm:px-4 md:px-8 flex flex-col items-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white text-center mb-8 drop-shadow-lg tracking-tight leading-tight">
          Sorting Visualizer
        </h1>
        <div className="flex flex-wrap gap-4 justify-center mb-8 items-center bg-white/80 dark:bg-gray-900 rounded-xl shadow p-4 w-full max-w-2xl mx-auto">
          <button
            onClick={handleGenerate}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded shadow transition text-base sm:text-lg"
          >
            Generate New Array
          </button>
          <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200 font-semibold text-base sm:text-lg">
            <label>Speed:</label>
            <input
              type="range"
              min="1"
              max="100"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-24 sm:w-32 accent-blue-600"
            />
            <span>{speed}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200 font-semibold text-base sm:text-lg">
            <label>Size:</label>
            <input
              type="range"
              min="10"
              max="60"
              value={size}
              onChange={handleSizeChange}
              className="w-24 sm:w-32 accent-blue-600"
            />
            <span>{size}</span>
          </div>
        </div>
        <div className="flex flex-row gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100 w-full justify-center">
          {ALGORITHMS.map(({ name, fn, complexity }) => (
            <div key={name} className="flex-1 min-w-[90vw] sm:min-w-[320px] max-w-xs flex justify-center">
              <SortingPanel
                algorithmName={name}
                sortFunction={fn}
                array={array}
                speed={speed}
                complexity={complexity}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer; 