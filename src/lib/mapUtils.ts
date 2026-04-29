export function getCurvedPoint(p1: [number, number], p2: [number, number], progress: number): [number, number] {
  // Interpolation linéaire classique
  const lat = p1[0] + (p2[0] - p1[0]) * progress;
  const lng = p1[1] + (p2[1] - p1[1]) * progress;
  
  // Vecteur de p1 à p2
  const dx = p2[0] - p1[0];
  const dy = p2[1] - p1[1];
  
  // Onde sinusoïdale douce (zig-zag)
  // 3 * Math.PI crée 1.5 vagues complètes (zig-zag-zig)
  const wave = Math.sin(progress * Math.PI * 3);
  
  // Amplitude de l'onde (très réduite pour des virages à peine perceptibles)
  const amplitude = 0.015;
  
  // Décalage perpendiculaire (-dy, dx)
  const offsetLat = -dy * wave * amplitude;
  const offsetLng = dx * wave * amplitude;
  
  return [lat + offsetLat, lng + offsetLng];
}

export function generateCurvedPath(p1: [number, number], p2: [number, number], steps: number = 30): [number, number][] {
  const path: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    path.push(getCurvedPoint(p1, p2, i / steps));
  }
  return path;
}
