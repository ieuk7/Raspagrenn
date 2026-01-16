export interface Prize {
  name: string;
  value: number;
  imageUrl: string;
  // For simplicity, I'm using a 'weight' for probability instead of tiers.
  // Higher weight = more common.
  weight: number; 
}

export const prizePool: Prize[] = [
    { name: '0,50 centavos', value: 0.5, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/360_F_910248111_ln6nauokwOshM2slehpnWLG2y6UI5vNR-removebg-preview.png?updatedAt=1764430170299', weight: 50 },
    { name: '1 Real', value: 1, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/1%20real.webp?updatedAt=1764425737592', weight: 40 },
    { name: '2 Reais', value: 2, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/2%20reais.webp?updatedAt=1764425737700', weight: 35 },
    { name: '3 Reais', value: 3, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/3%20reais.webp?updatedAt=1764425737290', weight: 30 },
    { name: '5 Reais', value: 5, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/5%20reais.webp?updatedAt=1764425737766', weight: 25 },
    { name: '10 Reais', value: 10, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/10%20reais.webp?updatedAt=1764425737251', weight: 20 },
    { name: '15 Reais', value: 15, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/15%20reais.webp?updatedAt=1764425737367', weight: 18 },
    { name: '20 Reais', value: 20, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/50%20reais.webp?updatedAt=1764425737226', weight: 15 }, // Re-using image
    { name: '50 Reais', value: 50, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/50%20reais.webp?updatedAt=1764425737226', weight: 10 },
    { name: '100 Reais', value: 100, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/100%20reais.webp?updatedAt=1764425737687', weight: 8 },
    { name: 'Adaptador de entrada', value: 220, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/Adaptador%20de%20energi%20(220.00%20).webp?updatedAt=1764425736598', weight: 5 },
    { name: 'Cabo USB tipo C', value: 360, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/Cabo%20de%20Carregador%20%205,00.webp?updatedAt=1764425737368', weight: 4 },
    { name: 'Air Pods Pro 3', value: 2500, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/Air%20pods%20Pro%203%20-%202.500.png?updatedAt=1764428857342', weight: 3 },
    { name: 'Apple Watch SE 3', value: 3000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/Apple%20Watch%20SE%203%20-%203.000.png?updatedAt=1764428858162', weight: 2 },
    { name: 'Iphone 17', value: 10000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/Iphone%2017%20-%2010.000.png?updatedAt=1764428859055', weight: 1 },
    { name: 'Iphone Air', value: 11000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/Iphone%20Air%20-%2011.000.png?updatedAt=1764428858545', weight: 0.5 },
    { name: 'Ipad Pro', value: 15000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/Ipad%20Pro%20-%2015.000.png?updatedAt=1764428859458', weight: 0.2 },
    { name: 'Iphone 17 Pro Max', value: 16000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/Iphone%2017%20Pro%20Max%20-%2016.000.png?updatedAt=1764428859705', weight: 0.1 },
];

// Helper function to pick a prize based on weight
export function selectRandomPrize(winPercentage: number): Prize | null {
  // First, determine if the user wins at all based on their win_percentage
  const didWin = Math.random() * 100 < winPercentage;
  if (!didWin) {
    return null;
  }

  // If they win, pick a prize from the pool based on weights
  const totalWeight = prizePool.reduce((sum, prize) => sum + prize.weight, 0);
  let random = Math.random() * totalWeight;

  for (const prize of prizePool) {
    if (random < prize.weight) {
      return prize;
    }
    random -= prize.weight;
  }
  
  // Fallback to the last prize, should be rare to hit this.
  return prizePool[prizePool.length - 1];
}

// Another helper to get "dummy" prizes to fill the grid
export function getDummyPrizes(count: number, excludePrize: Prize): Prize[] {
    const dummies: Prize[] = [];
    const filteredPool = prizePool.filter(p => p.name !== excludePrize.name);
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * filteredPool.length);
        dummies.push(filteredPool[randomIndex]);
    }
    return dummies;
}
