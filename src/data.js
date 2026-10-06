// Game Data: LF2 Characters, Enemies, Worker Upgrades & Endless Progression

export const BASE_PLAYER_UNITS = [
    {
        id: 'goku',
        name: 'Goku',
        title: 'Super Saiyan / โงกุน',
        sprite: 'goku_0.png',
        portrait: 'goku_f.png',
        level: 1,
        cost: 80,
        cooldown: 2.0,
        hp: 550,
        atk: 50,
        range: 72,
        speed: 85,
        attackSpeed: 1.0,
        attackType: 'single',
        aoeRadius: 0,
        knockbackCount: 3,
        scale: 1.08,
        color: '#ff9800',
        desc: 'ซง โงกุน ซูเปอร์ไซย่า รวดเร็ว ดุดัน ท่าคลื่นพลังเต่าสะท้านฟ้า (Kamehameha) ปะทะแนวหน้าอย่างแข็งแกร่ง'
    },
    {
        id: 'naruto',
        name: 'Naruto',
        title: 'Rasengan / นารูโตะ',
        sprite: 'naruto_0.png',
        portrait: 'naruto_f.png',
        cost: 160,
        cooldown: 3.2,
        hp: 750,
        atk: 90,
        range: 85,
        speed: 82,
        attackSpeed: 1.05,
        attackType: 'single',
        aoeRadius: 0,
        knockbackCount: 3,
        scale: 1.08,
        color: '#ff6d00',
        desc: 'อุซึมากิ นารูโตะ นินจาจอมพลัง ควงกระสุนวงจักร (Rasengan) พุ่งทะลวงแนวหน้าอย่างรวดเร็ว'
    },
    {
        id: 'gon',
        name: 'Gon',
        title: 'Jajanken / กอน ฟรีคส์',
        sprite: 'gon_0.png',
        portrait: 'gon_f.png',
        cost: 260,
        cooldown: 4.2,
        hp: 1100,
        atk: 145,
        range: 80,
        speed: 80,
        attackSpeed: 1.1,
        attackType: 'single',
        aoeRadius: 0,
        knockbackCount: 3,
        scale: 1.05,
        color: '#4caf50',
        desc: 'กอน ฟรีคส์ ฮันเตอร์หนุ่มพลังออร่า รวบรวมเน็นปล่อยหมัดเป่ายิ้งฉุบ (Jajanken Guu) ต่อยศัตรูกระเด็น'
    },
    {
        id: 'killua',
        name: 'Killua',
        title: 'Godspeed / คิรัวร์สายฟ้า',
        sprite: 'killua_0.png',
        portrait: 'killua_f.png',
        cost: 420,
        cooldown: 5.5,
        hp: 1050,
        atk: 210,
        range: 85,
        speed: 115,
        attackSpeed: 0.85,
        attackType: 'single',
        aoeRadius: 0,
        knockbackCount: 4,
        scale: 1.05,
        color: '#00e5ff',
        desc: 'คิรัวร์ โซลดิ๊กก์ ทายาทตระกูลนักฆ่า ก้าวพริบตาความเร็วเสียงและกรงเล็บสายฟ้าฟาด ลอบจู่โจมศัตรูฉับพลัน'
    },
    {
        id: 'zoro',
        name: 'Zoro',
        title: 'Santoryu / โซโล 3 ดาบ',
        sprite: 'zoro_0.png',
        portrait: 'zoro_f.png',
        cost: 650,
        cooldown: 7.0,
        hp: 1550,
        atk: 290,
        range: 95,
        speed: 75,
        attackSpeed: 1.0,
        attackType: 'single',
        aoeRadius: 0,
        knockbackCount: 3,
        scale: 1.08,
        color: '#2e7d32',
        desc: 'โรโรโนอา โซโล นักดาบแห่งกลุ่มโจรสลัดหมวกฟาง วิชาเพลงดาบ 3 เล่ม ท่าตัดปีศาจโอนิกิริฟันแหลก'
    },
    {
        id: 'ichigo',
        name: 'Ichigo',
        title: 'Bankai Getsuga / อิจิโกะบังไค',
        sprite: 'ichigo_0.png',
        portrait: 'ichigo_f.png',
        cost: 950,
        cooldown: 9.5,
        hp: 1850,
        atk: 420,
        range: 115,
        speed: 85,
        attackSpeed: 1.15,
        attackType: 'aoe',
        aoeRadius: 90,
        knockbackCount: 3,
        scale: 1.10,
        color: '#d32f2f',
        desc: 'คุโรซากิ อิจิโกะ ตัวแทนยมทูต ปลดปล่อยบังไค เทนสะ ซันเงสึ คลื่นจันทราเขี้ยวทมิฬ (Getsuga Tensho) ฟันกวาดล้างศัตรู'
    },
    {
        id: 'kenshin',
        name: 'Kenshin',
        title: 'Battousai / เคนชิน ซามูไรพเนจร',
        sprite: 'kenshin_0.png',
        portrait: 'kenshin_f.png',
        cost: 1400,
        cooldown: 12.5,
        hp: 2150,
        atk: 580,
        range: 125,
        speed: 92,
        attackSpeed: 0.95,
        attackType: 'aoe',
        aoeRadius: 110,
        knockbackCount: 4,
        scale: 1.08,
        color: '#e53935',
        desc: 'ฮิมุระ เคนชิน ซามูไรพเนจร เพลงดาบล่องนภา ท่าไม้ตายประกายแสงมังกรทะยานฟ้า (Amakakeru Ryu no Hirameki) กวาดล้างศัตรูพริบตา'
    },
    {
        id: 'gintoki',
        name: 'Gintoki',
        title: 'Shiroyasha / กินโทกิ ซามูไรสารพัดรับจ้าง',
        sprite: 'gintoki_0.png',
        portrait: 'gintoki_f.png',
        cost: 2500,
        cooldown: 16.0,
        hp: 3200,
        atk: 880,
        range: 140,
        speed: 88,
        attackSpeed: 1.0,
        attackType: 'aoe',
        aoeRadius: 135,
        knockbackCount: 4,
        scale: 1.12,
        color: '#03a9f4',
        desc: 'ซากาตะ กินโทกิ อดีตพญามารสีขาว (ชิโรยาฉะ) ควงดาบไม้โทยะโกะ พุ่งทะลวงกวาดล้างทั้งกองทัพด้วยจิตวิญญาณแห่งซามูไร'
    }
];

export const UPGRADE_COSTS = [
    0,    // Lv 1
    120,  // Lv 1 -> 2
    220,  // Lv 2 -> 3
    350,  // Lv 3 -> 4
    520,  // Lv 4 -> 5
    750,  // Lv 5 -> 6
    1050, // Lv 6 -> 7
    1450, // Lv 7 -> 8
    1950, // Lv 8 -> 9
    2600  // Lv 9 -> 10 (MAX)
];

export function calculateUnitStats(baseUnit, level = 1) {
    const hpMultiplier = 1 + (level - 1) * 0.25;
    const atkMultiplier = 1 + (level - 1) * 0.25;
    const cdReduction = Math.min(0.35, (level - 1) * 0.05);
    return {
        ...baseUnit,
        level: level,
        hp: Math.round(baseUnit.hp * hpMultiplier),
        atk: Math.round(baseUnit.atk * atkMultiplier),
        cooldown: Math.max(0.6, +(baseUnit.cooldown * (1 - cdReduction)).toFixed(2))
    };
}

export const PLAYER_UNITS = BASE_PLAYER_UNITS.map(u => calculateUnitStats(u, 1));

export const FORTRESS_UPGRADES = {
    sanctuary: {
        id: 'sanctuary',
        name: 'Sanctuary of Light (ซ่อมแซม & เสริมเกราะ)',
        icon: '🏰',
        desc: 'ฟื้นฟูเลือดป้อมปราการ 100% เต็มทันที และเพิ่มขีดจำกัด Max HP ป้อม +1,500',
        baseCost: 150,
        costStep: 100,
        hpBonus: 1500
    },
    cannon: {
        id: 'cannon',
        name: 'Aether Cannon (ซูเปอร์ชาร์จปืนใหญ่)',
        icon: '⚡',
        desc: 'ปืนใหญ่ Aether Cannon ชาร์จเร็วขึ้น 15% และเพิ่มพลังทำลายล้างกวาดล้างสนามรบ +400',
        baseCost: 180,
        costStep: 120,
        dmgBonus: 400
    },
    reactor: {
        id: 'reactor',
        name: 'Aether Core (แกนพลังงานเร่งอัตราผลิต)',
        icon: '💠',
        desc: 'เพิ่มความจุมานาสูงสุด +300 และเร่งความเร็วในการสร้างมานาพื้นฐาน +15%',
        baseCost: 140,
        costStep: 90
    }
};

export const ENEMY_UNITS = {
    bandit: {
        id: 'bandit',
        name: 'Bandit',
        sprite: 'bandit_0.png',
        portrait: 'bandit_f.png',
        cost: 35, // reward bounty
        hp: 260,
        atk: 35,
        range: 60,
        speed: 65,
        attackSpeed: 1.2,
        attackType: 'single',
        knockbackCount: 3,
        scale: 1.05,
        color: '#b0bec5',
        score: 10
    },
    hunter: {
        id: 'hunter',
        name: 'Hunter',
        sprite: 'hunter_0.png',
        portrait: 'hunter_f.png',
        cost: 70,
        hp: 440,
        atk: 80,
        range: 190,
        speed: 70,
        attackSpeed: 1.8,
        attackType: 'single',
        knockbackCount: 3,
        scale: 1.05,
        color: '#81c784',
        score: 30
    },
    monk: {
        id: 'monk',
        name: 'Monk',
        sprite: 'monk_0.png',
        portrait: 'monk_f.png',
        cost: 190,
        hp: 680,
        atk: 220,
        range: 75,
        speed: 85,
        attackSpeed: 1.3,
        attackType: 'single',
        knockbackCount: 3,
        scale: 1.15,
        color: '#ffb74d',
        score: 80
    },
    julian: {
        id: 'julian',
        name: 'Demon King Julian',
        sprite: 'julian_0.png',
        portrait: 'julian_f.png',
        isBoss: true,
        cost: 850,
        hp: 9800,
        atk: 650,
        range: 170,
        speed: 32,
        attackSpeed: 3.4,
        attackType: 'aoe',
        aoeRadius: 140,
        knockbackCount: 4,
        scale: 1.85, // Boss Size
        color: '#e53935',
        score: 500
    }
};

export const WORKER_UPGRADES = [
    { level: 1, cost: 80, maxMana: 300, rate: 25 },
    { level: 2, cost: 160, maxMana: 500, rate: 38 },
    { level: 3, cost: 320, maxMana: 800, rate: 55 },
    { level: 4, cost: 650, maxMana: 1300, rate: 80 },
    { level: 5, cost: 1200, maxMana: 2000, rate: 115 },
    { level: 6, cost: 2000, maxMana: 3000, rate: 160 },
    { level: 7, cost: 3500, maxMana: 4500, rate: 220 },
    { level: 8, cost: 0, maxMana: 6500, rate: 300 }
];
