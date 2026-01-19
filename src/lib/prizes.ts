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

const techManiaPrizePool: Prize[] = [
    { name: 'PlayStation 5', value: 4500.00, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha%202/item_playstation_5.png?updatedAt=1764427459496', weight: 0.1 },
    { name: 'Motorola Edge 40 Neo', value: 2800.00, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha%202/variant_edge_40_neo_256_gb_black_beauty.png?updatedAt=1764427459488', weight: 0.2 },
    { name: 'iPhone 12', value: 2500.00, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha%202/item_iphone_12.png?updatedAt=1764427459989', weight: 0.3 },
    { name: '1.000 Reais', value: 1000.00, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/1000%20reais.webp?updatedAt=1764425737618', weight: 0.5 },
    { name: 'Smartphone Motorola', value: 800.00, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha%202/item_c2_nk109.png?updatedAt=1764427458844', weight: 1 },
    { name: '700 Reais', value: 700.00, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/700%20reais.webp?updatedAt=1764425737865', weight: 1.5 },
    { name: 'Bola de futebol', value: 500.00, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha%202/item_ft_5_branca_e_preta.png?updatedAt=1764427459647', weight: 2 },
    { name: 'Perfume 212 VIP', value: 399.00, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha%202/item_212_vip_black.png?updatedAt=1764427460315', weight: 2.5 },
    { name: 'Camisa de time', value: 350.00, imageUrl: 'https://png.pngtree.com/png-vector/20220608/ourmid/pngtree-white-t-shirt-mockup-png-image_4894228.png', weight: 3 },
    { name: 'Fone de ouvido Lenovo', value: 220.00, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha%202/item_fone_de_ouvido_lenovo.png?updatedAt=1764427459941', weight: 4 },
    { name: '200 Reais', value: 200.00, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/12519586-removebg-preview.png?updatedAt=1764430065755', weight: 5 },
    { name: 'Copo Stanley preto', value: 165.00, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha%202/item_copo_t_rmico_stanley_preto.png?updatedAt=1764427459518', weight: 6 },
    { name: '100 Reais', value: 100.00, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/100%20reais.webp?updatedAt=1764425737687', weight: 8 },
    { name: 'PowerBank', value: 60.00, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/PowerBank%2050,00.webp?updatedAt=1764425737870', weight: 10 },
    { name: '50 Reais', value: 50.00, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/50%20reais.webp?updatedAt=1764425737226', weight: 15 },
    { name: 'Chinelo Havaianas', value: 35.00, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha%202/item_chinelo_havaianas_top_branco.png?updatedAt=1764427460142', weight: 20 },
    { name: '10 Reais', value: 10.00, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/10%20reais.webp?updatedAt=1764425737251', weight: 25 },
    { name: '5 Reais', value: 5.00, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/5%20reais.webp?updatedAt=1764425737766', weight: 30 },
    { name: '3 Reais', value: 3.00, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/3%20reais.webp?updatedAt=1764425737290', weight: 40 },
    { name: '2 Reais', value: 2.00, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/2%20reais.webp?updatedAt=1764425737700', weight: 50 },
    { name: '1 Real', value: 1.00, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/1%20real.webp?updatedAt=1764425737592', weight: 70 },
    { name: '0,50 Centavos', value: 0.50, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/360_F_910248111_ln6nauokwOshM2slehpnWLG2y6UI5vNR-removebg-preview.png?updatedAt=1764430170299', weight: 100 },
];

const seuIphone17ChegouPrizePool: Prize[] = [
    { name: 'Iphone 17 Pro Max', value: 16000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/Iphone%2017%20Pro%20Max%20-%2016.000.png', weight: 0.1 },
    { name: 'Ipad Pro', value: 15000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/Ipad%20Pro%20-%2015.000.png?updatedAt=1764428859458', weight: 0.2 },
    { name: 'Iphone Air', value: 11000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/Iphone%20Air%20-%2011.000.png?updatedAt=1764428858545', weight: 0.3 },
    { name: 'Iphone 17', value: 10000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/Iphone%2017%20-%2010.000.png?updatedAt=1764428859055', weight: 0.4 },
    { name: 'Apple Watch SE 3', value: 3000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/Apple%20Watch%20SE%203%20-%203.000.png?updatedAt=1764428858162', weight: 1 },
    { name: 'Air Pods Pro 3', value: 2500, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/Air%20pods%20Pro%203%20-%202.500.png?updatedAt=1764428857342', weight: 1.5 },
    { name: '1000 Reais', value: 1000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/1000%20reais.webp?updatedAt=1764425737618', weight: 3 },
    { name: '500 Reais', value: 500, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/500%20reais.webp?updatedAt=1764425738118', weight: 5 },
    { name: '100 Reais', value: 100, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/100%20reais.webp?updatedAt=1764425737687', weight: 10 },
    { name: '50 Reais', value: 50, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/50%20reais.webp?updatedAt=1764425737226', weight: 15 },
    { name: '20 Reais', value: 20, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/50%20reais.webp?updatedAt=1764425737226', weight: 20 },
    { name: '10 Reais', value: 10, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/10%20reais.webp?updatedAt=1764425737251', weight: 30 },
    { name: '5 Reais', value: 5, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/5%20reais.webp?updatedAt=1764425737766', weight: 40 },
    { name: '2 Reais', value: 2, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/2%20reais.webp?updatedAt=1764425737700', weight: 60 },
];

const appleManiaPrizePool: Prize[] = [
    { name: '5.000 Reais', value: 5000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/5.000%20Reais%20(%205.000%20).webp?updatedAt=1764425737726', weight: 0.1 },
    { name: 'iPhone 15', value: 5000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha%202/variant_iphone_15_azul.png?updatedAt=1764427460162', weight: 0.1 },
    { name: 'PlayStation 5', value: 4500, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha%202/item_playstation_5.png?updatedAt=1764427459496', weight: 0.2 },
    { name: 'Smart TV 4K de 55 pol', value: 3000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha%202/item_smart_tv_4k_55.png?updatedAt=1764427460018', weight: 0.3 },
    { name: 'Ipad 10\'', value: 2800, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/iPad%20(%202,500%20).webp?updatedAt=1764425736960', weight: 0.4 },
    { name: 'Caixa de som JBL Boombox 3', value: 2500, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha%202/variant_jbl_boombox_3_black.png?updatedAt=1764427459330', weight: 0.5 },
    { name: 'Apple AirPods 3ª geração', value: 1900, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha%202/item_airpods_3_gera_o.png?updatedAt=176442745960', weight: 0.8 },
    { name: '1.000 Reais', value: 1000, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/1000%20reais.webp?updatedAt=1764425737618', weight: 1 },
    { name: 'Air Fryer', value: 850, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha%202/item_air_fryer.png?updatedAt=1764427459632', weight: 1.5 },
    { name: '700 Reais', value: 700, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/700%20reais.webp?updatedAt=1764425737865', weight: 2 },
    { name: '500 Reais', value: 500, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/500%20reais.webp?updatedAt=1764425738118', weight: 3 },
    { name: 'Adaptador de energia USB tipo C', value: 220, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/Adaptador%20de%20energi%20(220.00%20).webp?updatedAt=1764425736598', weight: 5 },
    { name: '200 Reais', value: 200, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/12519586-removebg-preview.png', weight: 8 },
    { name: 'Fone de ouvido Bluetooth', value: 170, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha%202/item_fone_de_ouvido_bluetooth.png?updatedAt=1764427459406', weight: 10 },
    { name: 'Copo Stanley rosa', value: 165, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha%202/item_copo_t_rmico_stanley_rosa.png?updatedAt=1764427459933', weight: 12 },
    { name: 'Smartwatch D20 Shock', value: 150, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha%202/item_smartwatch_d20_shock.png?updatedAt=1764427459879', weight: 15 },
    { name: '100 Reais', value: 100, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/100%20reais.webp?updatedAt=1764425737687', weight: 20 },
    { name: 'PowerBank', value: 60, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/PowerBank%2050,00.webp?updatedAt=1764425737870', weight: 25 },
    { name: '50 Reais', value: 50, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/50%20reais.webp?updatedAt=1764425737226', weight: 30 },
    { name: '20 Reais', value: 20, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/20%20reais.webp?updatedAt=1764425736915', weight: 40 },
    { name: '5 Reais', value: 5, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/5%20reais.webp?updatedAt=1764425737766', weight: 50 },
    { name: '2 Reais', value: 2, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/2%20reais.webp?updatedAt=1764425737700', weight: 60 },
    { name: '1 Real', value: 1, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/1%20real.webp?updatedAt=1764425737592', weight: 70 },
];


const belezaPremiadaPrizePool: Prize[] = [
    { name: 'Kit Completo de Maquiagem', value: 1000, imageUrl: 'https://picsum.photos/seed/makeupkit/200/200', weight: 1 },
    { name: 'Vale-Presente de Spa', value: 500, imageUrl: 'https://picsum.photos/seed/spavoucher/200/200', weight: 2 },
    { name: 'Perfume Chanel No. 5', value: 800, imageUrl: 'https://picsum.photos/seed/chanel5/200/200', weight: 1.5 },
    { name: 'Kit de Skincare', value: 300, imageUrl: 'https://picsum.photos/seed/skincare/200/200', weight: 5 },
    { name: 'Batom MAC', value: 100, imageUrl: 'https://picsum.photos/seed/maclipstick/200/200', weight: 10 },
    { name: 'Paleta de Sombras', value: 150, imageUrl: 'https://picsum.photos/seed/eyeshadow/200/200', weight: 8 },
    { name: '50 Reais', value: 50, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/50%20reais.webp?updatedAt=1764425737226', weight: 20 },
    { name: '20 Reais', value: 20, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/50%20reais.webp?updatedAt=1764425737226', weight: 30 },
    { name: '10 Reais', value: 10, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/10%20reais.webp?updatedAt=1764425737251', weight: 40 },
    { name: '5 Reais', value: 5, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/5%20reais.webp?updatedAt=1764425737766', weight: 50 },
    { name: '3 Reais', value: 3, imageUrl: 'https://ik.imagekit.io/cd7ikp5fv/rewards%20raspadinha/3%20reais.webp?updatedAt=1764425737290', weight: 60 },
];


export const prizePools: { [key: string]: Prize[] } = {
  'default': especialRaspagreenPrizePool,
  'troco-premiado': trocoPremiadoPrizePool,
  'especial-raspagreen': especialRaspagreenPrizePool,
  'seu-iphone-17-chegou': seuIphone17ChegouPrizePool,
  'tech-mania': techManiaPrizePool,
  'apple-mania': appleManiaPrizePool,
  'beleza-premiada': belezaPremiadaPrizePool,
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
