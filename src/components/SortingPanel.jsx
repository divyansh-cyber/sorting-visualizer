import { useEffect, useState, useRef } from 'react';

const SortingPanel = ({
  algorithmName,
  sortFunction,
  array,
  speed,
  complexity,
}) => {
  const [visualArray, setVisualArray] = useState([]);
  const [comparedIndices, setComparedIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [resetFlag, setResetFlag] = useState(false);
  const originalArray = useRef([]);
  const controlRef = useRef({ paused: false, waitWhilePaused: null });

  // Helper for pausing
  const getPauseControl = () => {
    let resolver = null;
    const waitWhilePaused = () =>
      new Promise((resolve) => {
        resolver = resolve;
        const check = () => {
          if (!controlRef.current.paused) resolve();
          else setTimeout(check, 50);
        };
        check();
      });
    return { waitWhilePaused, resolver };
  };

  // Reset and start sorting on array or speed change
  useEffect(() => {
    setVisualArray([...array]);
    setComparedIndices([]);
    setSortedIndices([]);
    setIsSorting(false);
    setIsPaused(false);
    setResetFlag(false);
    originalArray.current = [...array];
    // Start sorting after a short delay
    const timeout = setTimeout(() => startSort([...array]), 300);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [array, speed, sortFunction, resetFlag]);

  // Start sorting
  const startSort = async (arr) => {
    setIsSorting(true);
    controlRef.current.paused = false;
    controlRef.current.waitWhilePaused = getPauseControl().waitWhilePaused;
    await sortFunction(
      arr,
      speed,
      (a) => setVisualArray([...a]),
      (indices) => setComparedIndices(indices),
      (indices) => setSortedIndices(indices),
      controlRef.current
    );
    setComparedIndices([]);
    setIsSorting(false);
  };

  // Pause/Resume handlers
  const handlePause = () => {
    controlRef.current.paused = true;
    setIsPaused(true);
  };
  const handleResume = () => {
    controlRef.current.paused = false;
    setIsPaused(false);
  };
  const handleReset = () => {
    setResetFlag((f) => !f);
  };

  // Bar color logic
  const getBarColor = (idx) => {
    if (sortedIndices.includes(idx)) return 'bg-emerald-400';
    if (comparedIndices.includes(idx)) return 'bg-pink-500';
    return 'bg-blue-500';
  };

  // Find max value for scaling
  const maxValue = Math.max(...visualArray, 1);

  return (
    <div className="bg-white/90 dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 flex flex-col items-center w-full max-w-md mx-auto transition-all duration-300">
      <div className="flex flex-col items-center justify-center gap-1 mb-4 w-full">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 dark:text-white tracking-wide text-center drop-shadow mb-1">
          {algorithmName}
        </h2>
        <div className="flex flex-col items-center">
          <span className="text-base sm:text-lg font-bold text-blue-700 dark:text-blue-300 mb-0.5">Time Complexity:</span>
          <span className="text-lg sm:text-xl font-extrabold text-blue-800 dark:text-blue-200 bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded">
            {complexity}
          </span>
        </div>
      </div>
      <div className="relative w-full flex flex-col justify-center border border-gray-200 dark:border-gray-700 rounded-lg bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-700 h-[340px] min-h-[340px] max-h-[340px] overflow-y-auto mb-4 transition-all duration-300 py-2">
        {visualArray.map((value, idx) => (
          <div
            key={idx}
            className={getBarColor(idx) + " flex items-center rounded-r-sm mb-1 last:mb-0 transition-all duration-100"}
            style={{
              width: `${(value / maxValue) * 95}%`,
              height: '18px',
              minWidth: '10px',
              background: comparedIndices.includes(idx)
                ? 'linear-gradient(90deg, #ec4899 60%, #f472b6 100%)'
                : sortedIndices.includes(idx)
                ? 'linear-gradient(90deg, #34d399 60%, #6ee7b7 100%)'
                : 'linear-gradient(90deg, #3b82f6 60%, #60a5fa 100%)',
            }}
          >
            <span className="ml-2 text-xs font-bold text-gray-900 dark:text-white select-none">
              {value}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-3 mt-2 w-full justify-center">
        <button
          onClick={handlePause}
          disabled={isPaused || !isSorting}
          className="px-3 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded shadow disabled:opacity-50 transition text-base sm:text-lg"
        >
          Pause
        </button>
        <button
          onClick={handleResume}
          disabled={!isPaused}
          className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded shadow disabled:opacity-50 transition text-base sm:text-lg"
        >
          Resume
        </button>
        <button
          onClick={handleReset}
          className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded shadow transition text-base sm:text-lg"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default SortingPanel;
