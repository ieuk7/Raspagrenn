export interface Prize {
  name: string;
  value: number;
  imageUrl: string;
  // For simplicity, I'm using a 'weight' for probability instead of tiers.
  // Higher weight = more common.
  weight: number; 
}

const especialRaspagreenPrizePool: Prize[] = [
    { name: 'Iphone 17 Pro Max', value: 16000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/Iphone%2017%20Pro%20Max%20-%2016.000.png', weight: 0.1 },
    { name: 'Moto honda pop 110i', value: 11500, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha%202/variant_pop_110i_branco.png?updatedAt=1764427459364', weight: 0.2 },
    { name: 'Mini Bolsa louis vuitton', value: 10000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/Mini%20Bolsa%20Louis%20Vuitton%20-%2010000.png', weight: 0.3 },
    { name: 'Secador Dayson', value: 5000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/Secador%20Dayson%20-%205000.png', weight: 0.5 },
    { name: 'PlayStation 5', value: 4500, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha%202/item_playstation_5.png?updatedAt=1764427459496', weight: 0.8 },
    { name: 'Perfume baccarat', value: 3000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/Perfume%20Baccarat%20-%203000.png', weight: 1 },
    { name: 'Caixa de som JBL', value: 2500, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha%202/variant_jbl_boombox_3_black.png', weight: 1.5 },
    { name: 'iPhone 12', value: 2500, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha%202/item_iphone_12.png?updatedAt=1764427459989', weight: 1.5 },
    { name: 'Air force 1 low retro', value: 1200, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/AIR+FORCE+1+LOW+RETRO+PRM.png?updatedAt=1764430365870', weight: 2 },
    { name: '1000 Reais', value: 1000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/1000%20reais.webp?updatedAt=1764425737618', weight: 3 },
    { name: '700 Reais', value: 700, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/700%20reais.webp?updatedAt=1764425737865', weight: 4 },
    { name: '500 Reais', value: 500, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/500%20reais.webp?updatedAt=1764425738118', weight: 5 },
    { name: '100 Reais', value: 100, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/100%20reais.webp?updatedAt=1764425737687', weight: 10 },
    { name: '50 Reais', value: 50, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/50%20reais.webp?updatedAt=1764425737226', weight: 15 },
    { name: '20 Reais', value: 20, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/50%20reais.webp?updatedAt=1764425737226', weight: 20 },
    { name: '15 Reais', value: 15, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/15%20reais.webp?updatedAt=1764425737367', weight: 25 },
    { name: '10 Reais', value: 10, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/10%20reais.webp?updatedAt=1764425737251', weight: 30 },
    { name: '5 Reais', value: 5, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/5%20reais.webp?updatedAt=1764425737766', weight: 40 },
    { name: '3 Reais', value: 3, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/3%20reais.webp?updatedAt=1764425737290', weight: 50 },
    { name: '2 Reais', value: 2, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/2%20reais.webp?updatedAt=1764425737700', weight: 60 },
    { name: '1 Real', value: 1, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/1%20real.webp?updatedAt=1764425737592', weight: 70 },
    { name: '0,50 centavos', value: 0.5, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/360_F_910248111_ln6nauokwOshM2slehpnWLG2y6UI5vNR-removebg-preview.png?updatedAt=1764430170299', weight: 80 },
];

const trocoPremiadoPrizePool: Prize[] = [
    { name: '1000 Reais', value: 1000.00, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/1000%20reais.webp?updatedAt=1764425737618', weight: 0.5 },
    { name: '700 Reais', value: 700.00, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/700%20reais.webp?updatedAt=1764425737865', weight: 1 },
    { name: '500 Reais', value: 500.00, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/500%20reais.webp?updatedAt=1764425738118', weight: 2 },
    { name: '200 Reais', value: 200.00, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/12519586-removebg-preview.png', weight: 4 },
    { name: '100 Reais', value: 100.00, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/100%20reais.webp?updatedAt=1764425737687', weight: 8 },
    { name: '50 Reais', value: 50.00, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/50%20reais.webp?updatedAt=1764425737226', weight: 10 },
    { name: '20 Reais', value: 20.00, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/50%20reais.webp?updatedAt=1764425737226', weight: 15 },
    { name: '15 Reais', value: 15.00, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/15%20reais.webp?updatedAt=1764425737367', weight: 20 },
    { name: '10 Reais', value: 10.00, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/10%20reais.webp?updatedAt=1764425737251', weight: 25 },
    { name: '5 Reais', value: 5.00, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/5%20reais.webp?updatedAt=1764425737766', weight: 40 },
    { name: '4 Reais', value: 4.00, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/4%20reais.webp?updatedAt=1764425737624', weight: 50 },
    { name: '3 Reais', value: 3.00, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/3%20reais.webp?updatedAt=1764425737290', weight: 60 },
    { name: '2 Reais', value: 2.00, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/2%20reais.webp?updatedAt=1764425737700', weight: 70 },
    { name: '1 Real', value: 1.00, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/1%20real.webp?updatedAt=1764425737592', weight: 80 },
    { name: '0,50 Centavos', value: 0.50, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/360_F_910248111_ln6nauokwOshM2slehpnWLG2y6UI5vNR-removebg-preview.png?updatedAt=1764430170299', weight: 100 },
];

const pool5Reais: Prize[] = [
    { name: '10.000 Reais', value: 10000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/10000%20reais.webp', weight: 0.1 },
    { name: '5.000 Reais', value: 5000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/5.000%20Reais%20(%205.000%20).webp', weight: 0.2 },
    { name: '1.000 Reais', value: 1000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/1000%20reais.webp', weight: 0.5 },
    { name: '500 Reais', value: 500, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/500%20reais.webp', weight: 1 },
    { name: '100 Reais', value: 100, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/100%20reais.webp', weight: 5 },
    { name: '50 Reais', value: 50, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/50%20reais.webp', weight: 10 },
    { name: '10 Reais', value: 10, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/10%20reais.webp', weight: 30 },
    { name: '5 Reais', value: 5, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/5%20reais.webp', weight: 50 },
];

const pool10Reais: Prize[] = [
    { name: '20.000 Reais', value: 20000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/20000%20reais.webp', weight: 0.1 },
    { name: '10.000 Reais', value: 10000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/10000%20reais.webp', weight: 0.2 },
    { name: '5.000 Reais', value: 5000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/5.000%20Reais%20(%205.000%20).webp', weight: 0.5 },
    { name: '1.000 Reais', value: 1000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/1000%20reais.webp', weight: 1 },
    { name: '200 Reais', value: 200, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/12519586-removebg-preview.png', weight: 5 },
    { name: '100 Reais', value: 100, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/100%20reais.webp', weight: 15 },
    { name: '20 Reais', value: 20, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/50%20reais.webp', weight: 40 },
    { name: '10 Reais', value: 10, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/10%20reais.webp', weight: 60 },
];

const pool25Reais: Prize[] = [
    { name: '50.000 Reais', value: 50000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/50000%20reais.webp', weight: 0.1 },
    { name: '25.000 Reais', value: 25000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/25000%20reais.webp', weight: 0.2 },
    { name: '10.000 Reais', value: 10000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/10000%20reais.webp', weight: 0.5 },
    { name: '5.000 Reais', value: 5000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/5.000%20Reais%20(%205.000%20).webp', weight: 1 },
    { name: '500 Reais', value: 500, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/500%20reais.webp', weight: 10 },
    { name: '250 Reais', value: 250, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/12519586-removebg-preview.png', weight: 20 },
    { name: '50 Reais', value: 50, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/50%20reais.webp', weight: 50 },
    { name: '25 Reais', value: 25, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/20%20reais.webp', weight: 70 },
];

const pool50Reais: Prize[] = [
    { name: '100.000 Reais', value: 100000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/100000%20reais.webp', weight: 0.05 },
    { name: '50.000 Reais', value: 50000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/50000%20reais.webp', weight: 0.1 },
    { name: '20.000 Reais', value: 20000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/20000%20reais.webp', weight: 0.3 },
    { name: '10.000 Reais', value: 10000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/10000%20reais.webp', weight: 0.8 },
    { name: '1.000 Reais', value: 1000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/1000%20reais.webp', weight: 5 },
    { name: '500 Reais', value: 500, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/500%20reais.webp', weight: 15 },
    { name: '100 Reais', value: 100, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/100%20reais.webp', weight: 40 },
    { name: '50 Reais', value: 50, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/50%20reais.webp', weight: 60 },
];

const pool100Reais: Prize[] = [
    { name: '250.000 Reais', value: 250000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/250000%20reais.webp', weight: 0.02 },
    { name: '100.000 Reais', value: 100000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/100000%20reais.webp', weight: 0.05 },
    { name: '50.000 Reais', value: 50000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/50000%20reais.webp', weight: 0.1 },
    { name: '25.000 Reais', value: 25000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/25000%20reais.webp', weight: 0.5 },
    { name: '5.000 Reais', value: 5000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/5.000%20Reais%20(%205.000%20).webp', weight: 2 },
    { name: '1.000 Reais', value: 1000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/1000%20reais.webp', weight: 10 },
    { name: '200 Reais', value: 200, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/12519586-removebg-preview.png', weight: 30 },
    { name: '100 Reais', value: 100, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/100%20reais.webp', weight: 50 },
];

export const prizePools: { [key: string]: Prize[] } = {
  'default': especialRaspagreenPrizePool,
  'troco-premiado': trocoPremiadoPrizePool,
  'especial-raspagreen': especialRaspagreenPrizePool,
  'raspadinha-5-reais': pool5Reais,
  'raspadinha-10-reais': pool10Reais,
  'raspadinha-25-reais': pool25Reais,
  'raspadinha-50-reais': pool50Reais,
  'raspadinha-100-reais': pool100Reais,
};

export const getPrizePoolBySlug = (slug: string): Prize[] => {
    return prizePools[slug] || prizePools.default;
};

// Helper function to pick a prize based on weight
export function selectRandomPrize(winPercentage: number, prizePool: Prize[]): Prize | null {
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
export function getDummyPrizes(count: number, excludePrize: Prize, prizePool: Prize[]): Prize[] {
    const dummies: Prize[] = [];
    const filteredPool = prizePool.filter(p => p.name !== excludePrize.name);
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * filteredPool.length);
        dummies.push(filteredPool[randomIndex]);
    }
    return dummies;
}
