
const slugify = (text: string) => text.toLowerCase().replace(/\s/g, '-').replace(/[^\w-]+/g, '');

export const scratchCardsData = [
  {
    slug: slugify('Especial Raspagreen'),
    title: 'Especial Raspagreen',
    subtitle: 'PRÊMIOS DE ATÉ R$ 16.000,00',
    description: 'Raspe, jogue e transforme sorte em grana real',
    price: 'R$ 1,00',
    imageUrl: 'https://influ-danc.b-cdn.net/IMG_4632.PNG',
    bannerUrl: 'https://ik.imagekit.io/cd7ikp5fv/IMG_4617.PNG',
    gradientFrom: '#091f13',
    buttonColor: '#34d300',
    priceTagColor: '#0f391b',
  },
  {
    slug: slugify('Seu Iphone 17 chegou'),
    title: 'Seu Iphone 17 chegou',
    subtitle: 'PRÊMIOS DE ATÉ R$ 16.000,00',
    description:
      'Com apenas R$2, o iPhone lançamento pode ser seu! Ache 3 iguais e ganhe na hora. Simples...',
    price: 'R$ 2,00',
    imageUrl:
      'https://ik.imagekit.io/cd7ikp5fv/PNG%20-%20IPHONE%2017.1.png?updatedAt=1764426491233',
    bannerUrl: 'https://ik.imagekit.io/cd7ikp5fv/IMG_4614.PNG',
    gradientFrom: '#091f13',
    buttonColor: '#34d300',
    priceTagColor: '#0f391b',
  },
  {
    slug: slugify('Troco Premiado'),
    title: 'Troco Premiado',
    subtitle: 'PRÊMIOS DE ATÉ R$ 1.000,00',
    description: 'Uma moedinha pode valer mil no PIX. Vai ficar de fora?',
    price: 'R$ 0,50',
    imageUrl:
      'https://ik.imagekit.io/cd7ikp5fv/troco%20premiado.png?updatedAt=1764426715376',
    bannerUrl: 'https://ik.imagekit.io/cd7ikp5fv/troco%20premiado.png?updatedAt=1764426715376',
    gradientFrom: '#091f13',
    buttonColor: '#34d300',
    priceTagColor: '#0f391b',
  },
  {
    slug: slugify('Tech Mania'),
    title: 'Tech Mania',
    subtitle: 'PRÊMIOS DE ATÉ R$ 4.500,00',
    description: 'Raspou, ganhou, sacou!',
    price: 'R$ 1,00',
    imageUrl:
      'https://ik.imagekit.io/cd7ikp5fv/Tech%20Mania.png?updatedAt=1764426715331',
    bannerUrl: 'https://ik.imagekit.io/cd7ikp5fv/Tech%20Mania.png?updatedAt=1764426715331',
    gradientFrom: '#091f13',
    buttonColor: '#34d300',
    priceTagColor: '#0f391b',
  },
  {
    slug: slugify('Apple Mania'),
    title: 'Apple Mania',
    subtitle: 'PRÊMIOS DE ATÉ R$ 5.000,00',
    description: 'Seu bilhete para prêmios de verdade.',
    price: 'R$ 2,50',
    imageUrl:
      'https://ik.imagekit.io/cd7ikp5fv/apple%20mania.png?updatedAt=1764426715111',
    bannerUrl: 'https://ik.imagekit.io/cd7ikp5fv/apple%20mania.png?updatedAt=1764426715111',
    gradientFrom: '#091f13',
    buttonColor: '#34d300',
    priceTagColor: '#0f391b',
  },
  {
    slug: slugify('Beleza Premiada'),
    title: 'Beleza Premiada',
    subtitle: 'PRÊMIOS DE ATÉ R$ 5.000,00',
    description:
      'Apenas R$3 e você já pode conquistar perfumes, maquiagens e kits exclusivos. É só achar 3 iguais — rápido e fácil!',
    price: 'R$ 3,00',
    imageUrl:
      'https://ik.imagekit.io/cd7ikp5fv/beleza%20premiada.png?updatedAt=1764426715458',
    bannerUrl: 'https://ik.imagekit.io/cd7ikp5fv/beleza%20premiada.png?updatedAt=1764426715458',
    gradientFrom: '#091f13',
    buttonColor: '#34d300',
    priceTagColor: '#0f391b',
  },
];
