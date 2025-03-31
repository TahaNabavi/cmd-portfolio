export default function getRandomDarkColor(): string {
  const darkColors = [
    "#8B0000", // Dark Red
    "#006400", // Dark Green
    "#00008B", // Dark Blue
    "#4B0082", // Indigo
    "#800000", // Maroon
    "#556B2F", // Dark Olive Green
    "#8B4513", // Saddle Brown
    "#2F4F4F", // Dark Slate Gray
    "#483D8B", // Dark Slate Blue
    "#191970", // Midnight Blue
    "#FF4500", // Dark Orange
    "#8B008B", // Dark Magenta
    "#DC143C", // Crimson
    "#B22222", // Firebrick
    "#A52A2A", // Brown
    "#228B22", // Forest Green
    "#6B8E23", // Olive Drab
    "#CD5C5C", // Indian Red
    "#D2691E", // Chocolate
    "#9932CC", // Dark Orchid
  ];

  return darkColors[Math.floor(Math.random() * darkColors.length)];
}
