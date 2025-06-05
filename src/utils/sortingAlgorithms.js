// Helper function to delay execution
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Bubble Sort
export const bubbleSort = async (array, speed, onStep, onCompare, onSorted, control) => {
  const n = array.length;
  let sorted = [];
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (control && control.paused) await control.waitWhilePaused();
      if (onCompare) onCompare([j, j + 1]);
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        if (onStep) onStep(array);
        await delay(200 - speed);
      }
      await delay(200 - speed);
    }
    sorted.push(n - i - 1);
    if (onSorted) onSorted([...sorted]);
  }
  sorted = Array.from({ length: n }, (_, i) => i);
  if (onSorted) onSorted(sorted);
  if (onStep) onStep(array);
  if (onCompare) onCompare([]);
  return array;
};

// Selection Sort
export const selectionSort = async (array, speed, onStep, onCompare, onSorted, control) => {
  const n = array.length;
  let sorted = [];
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (control && control.paused) await control.waitWhilePaused();
      if (onCompare) onCompare([minIdx, j]);
      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
      await delay(200 - speed);
    }
    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
      if (onStep) onStep(array);
      await delay(200 - speed);
    }
    sorted.push(i);
    if (onSorted) onSorted([...sorted]);
  }
  sorted = Array.from({ length: n }, (_, i) => i);
  if (onSorted) onSorted(sorted);
  if (onStep) onStep(array);
  if (onCompare) onCompare([]);
  return array;
};

// Insertion Sort
export const insertionSort = async (array, speed, onStep, onCompare, onSorted, control) => {
  const n = array.length;
  let sorted = [];
  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      if (control && control.paused) await control.waitWhilePaused();
      if (onCompare) onCompare([j, j + 1]);
      array[j + 1] = array[j];
      j--;
      if (onStep) onStep(array);
      await delay(200 - speed);
    }
    array[j + 1] = key;
    sorted = Array.from({ length: i + 1 }, (_, idx) => idx);
    if (onSorted) onSorted([...sorted]);
    if (onStep) onStep(array);
    await delay(200 - speed);
  }
  sorted = Array.from({ length: n }, (_, i) => i);
  if (onSorted) onSorted(sorted);
  if (onStep) onStep(array);
  if (onCompare) onCompare([]);
  return array;
};

// Quick Sort
export const quickSort = async (array, speed, onStep, onCompare, onSorted, control) => {
  let sorted = [];
  const n = array.length;
  const quickSortHelper = async (arr, low, high) => {
    if (low < high) {
      let pi = await partition(arr, low, high);
      sorted.push(pi);
      if (onSorted) onSorted([...sorted]);
      await quickSortHelper(arr, low, pi - 1);
      await quickSortHelper(arr, pi + 1, high);
    }
  };
  const partition = async (arr, low, high) => {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (control && control.paused) await control.waitWhilePaused();
      if (onCompare) onCompare([j, high]);
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        if (onStep) onStep(arr);
        await delay(200 - speed);
      }
      await delay(200 - speed);
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    if (onStep) onStep(arr);
    if (onCompare) onCompare([i + 1, high]);
    await delay(200 - speed);
    return i + 1;
  };
  await quickSortHelper(array, 0, n - 1);
  const allSorted = Array.from({ length: n }, (_, i) => i);
  if (onSorted) onSorted(allSorted);
  if (onStep) onStep(array);
  if (onCompare) onCompare([]);
  return array;
};

// Merge Sort
export const mergeSort = async (array, speed, onStep, onCompare, onSorted, control) => {
  let sorted = [];
  const n = array.length;
  const mergeSortHelper = async (arr, left, right) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      await mergeSortHelper(arr, left, mid);
      await mergeSortHelper(arr, mid + 1, right);
      await merge(arr, left, mid, right);
    }
  };
  const merge = async (arr, left, mid, right) => {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    const L = arr.slice(left, mid + 1);
    const R = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
      if (control && control.paused) await control.waitWhilePaused();
      if (onCompare) onCompare([k, left + i, mid + 1 + j]);
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      k++;
      if (onStep) onStep(arr);
      await delay(200 - speed);
    }
    while (i < n1) {
      if (control && control.paused) await control.waitWhilePaused();
      arr[k] = L[i];
      if (onCompare) onCompare([k, left + i]);
      i++;
      k++;
      if (onStep) onStep(arr);
      await delay(200 - speed);
    }
    while (j < n2) {
      if (control && control.paused) await control.waitWhilePaused();
      arr[k] = R[j];
      if (onCompare) onCompare([k, mid + 1 + j]);
      j++;
      k++;
      if (onStep) onStep(arr);
      await delay(200 - speed);
    }
    for (let idx = left; idx <= right; idx++) sorted.push(idx);
    if (onSorted) onSorted([...sorted]);
  };
  await mergeSortHelper(array, 0, n - 1);
  const allSorted = Array.from({ length: n }, (_, i) => i);
  if (onSorted) onSorted(allSorted);
  if (onStep) onStep(array);
  if (onCompare) onCompare([]);
  return array;
}; 

// HEAP SORT
export const heapSort = async (array, speed, onStep, onCompare, onSorted, control) => {
  const n = array.length;
  let sorted = [];

  const heapify = async (arr, n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n) {
      if (onCompare) onCompare([i, left]);
      if (arr[left] > arr[largest]) largest = left;
      await delay(200 - speed);
    }

    if (right < n) {
      if (onCompare) onCompare([largest, right]);
      if (arr[right] > arr[largest]) largest = right;
      await delay(200 - speed);
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      if (onStep) onStep([...arr]);
      await delay(200 - speed);
      await heapify(arr, n, largest);
    }
  };

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    if (control && control.paused) await control.waitWhilePaused();
    await heapify(array, n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    if (control && control.paused) await control.waitWhilePaused();
    [array[0], array[i]] = [array[i], array[0]];
    if (onStep) onStep([...array]);
    sorted.push(i);
    if (onSorted) onSorted([...sorted]);
    await delay(200 - speed);
    await heapify(array, i, 0);
  }

  sorted = Array.from({ length: n }, (_, i) => i);
  if (onSorted) onSorted(sorted);
  if (onStep) onStep([...array]);
  if (onCompare) onCompare([]);
  return array;
};
