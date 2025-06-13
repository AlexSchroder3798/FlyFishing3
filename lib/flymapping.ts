export const insectToFlyTypeSize: Record<string, string> = {
  "Blue Wing Olive": "Mayfly #18-20",
  "Sulphur": "Mayfly #16-18",
  "March Brown": "Mayfly #10-12",
  "Caddis": "Caddis #14-18",
  "Little Black Stonefly": "Stonefly #12-16",
  // Add more insects as needed
  "default": "General Attractor #12-16",
};

export const formatRecommendedFliesFromInsect = (insectName: string): string => {
  return insectToFlyTypeSize[insectName] || insectToFlyTypeSize["default"];
};
