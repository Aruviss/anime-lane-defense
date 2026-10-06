// Standalone Game Bundle (LF2 Sprites Edition - Supports file:/// & http://)


// ==================== DATA ====================

// Game Data: LF2 Characters, Enemies, Worker Upgrades & Endless Progression

const BASE_PLAYER_UNITS = [
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

const UPGRADE_COSTS = [
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

function calculateUnitStats(baseUnit, level = 1) {
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

const PLAYER_UNITS = BASE_PLAYER_UNITS.map(u => calculateUnitStats(u, 1));

const FORTRESS_UPGRADES = {
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

const ENEMY_UNITS = {
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

const WORKER_UPGRADES = [
    { level: 1, cost: 80, maxMana: 300, rate: 25 },
    { level: 2, cost: 160, maxMana: 500, rate: 38 },
    { level: 3, cost: 320, maxMana: 800, rate: 55 },
    { level: 4, cost: 650, maxMana: 1300, rate: 80 },
    { level: 5, cost: 1200, maxMana: 2000, rate: 115 },
    { level: 6, cost: 2000, maxMana: 3000, rate: 160 },
    { level: 7, cost: 3500, maxMana: 4500, rate: 220 },
    { level: 8, cost: 0, maxMana: 6500, rate: 300 }
];


// ==================== AUDIO ====================

// Web Audio API Synthesizer for Anime Sound Effects & BGM

class SoundManager {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
        this.bgmPlaying = false;
        this.bgmTimer = null;
        this.masterGain = null;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            this.ctx = new AudioContext();
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.value = 0.25;
            this.masterGain.connect(this.ctx.destination);
        }
        this.ensureRunning();
        // Force unlock iOS / iPadOS WebKit audio engine with silent buffer
        try {
            const buffer = this.ctx.createBuffer(1, 1, 22050);
            const source = this.ctx.createBufferSource();
            source.buffer = buffer;
            source.connect(this.ctx.destination);
            source.start(0);
        } catch (e) {}
    }

    ensureRunning() {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume().catch(() => {});
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.masterGain) {
            this.masterGain.gain.value = this.isMuted ? 0 : 0.25;
        }
        if (!this.isMuted) {
            this.ensureRunning();
        }
        return this.isMuted;
    }

    // Play Summon sound (bright chime)
    playSummon() {
        if (this.isMuted) return;
        this.ensureRunning();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + idx * 0.04);
            gain.gain.setValueAtTime(0.3, now + idx * 0.04);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.2);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now + idx * 0.04);
            osc.stop(now + idx * 0.04 + 0.25);
        });
    }

    // Play Slash / Melee attack sound
    playSlash() {
        if (this.isMuted) return;
        this.ensureRunning();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.12);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.13);
    }

    // Play Magic Explosion / AoE sound
    playMagic() {
        if (this.isMuted) return;
        this.ensureRunning();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        // High sparkle
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.35);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.36);

        // Low boom
        const boom = this.ctx.createOscillator();
        const boomGain = this.ctx.createGain();
        boom.type = 'triangle';
        boom.frequency.setValueAtTime(180, now);
        boom.frequency.exponentialRampToValueAtTime(40, now + 0.4);
        boomGain.gain.setValueAtTime(0.4, now);
        boomGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        boom.connect(boomGain);
        boomGain.connect(this.masterGain);
        boom.start(now);
        boom.stop(now + 0.42);
    }

    // Play Valkyrie Ultimate Cleave / Beam sound
    playHeavyHit() {
        if (this.isMuted) return;
        this.ensureRunning();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(350, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.5);
        gain.gain.setValueAtTime(0.45, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.52);
    }

    // Play Cannon Laser blast
    playCannon() {
        if (this.isMuted) return;
        this.ensureRunning();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        // Charge whoosh
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.linearRampToValueAtTime(900, now + 0.3);
        osc.frequency.exponentialRampToValueAtTime(50, now + 1.2);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.5, now + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 1.25);
    }

    // Worker Level Up sound
    playUpgrade() {
        if (this.isMuted) return;
        this.ensureRunning();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.06);
            gain.gain.setValueAtTime(0.25, now + idx * 0.06);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.25);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now + idx * 0.06);
            osc.stop(now + idx * 0.06 + 0.28);
        });
    }

    // Play Buzz / Deny sound
    playDeny() {
        if (this.isMuted) return;
        this.ensureRunning();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.setValueAtTime(110, now + 0.08);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.19);
    }

    // Boss Warning Sound / Shockwave
    playBossAlarm() {
        if (this.isMuted) return;
        this.ensureRunning();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        for (let i = 0; i < 2; i++) {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(320, now + i * 0.25);
            osc.frequency.setValueAtTime(280, now + i * 0.25 + 0.12);
            gain.gain.setValueAtTime(0.4, now + i * 0.25);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.25 + 0.24);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now + i * 0.25);
            osc.stop(now + i * 0.25 + 0.25);
        }
    }

    // Victory Fanfare
    playVictory() {
        if (this.isMuted) return;
        this.ensureRunning();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const chords = [
            { f: 523.25, t: 0.0 }, // C5
            { f: 659.25, t: 0.15 }, // E5
            { f: 783.99, t: 0.30 }, // G5
            { f: 1046.50, t: 0.50 } // C6 (long)
        ];
        chords.forEach(c => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(c.f, now + c.t);
            gain.gain.setValueAtTime(0.35, now + c.t);
            gain.gain.exponentialRampToValueAtTime(0.001, now + c.t + 0.6);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now + c.t);
            osc.stop(now + c.t + 0.65);
        });
    }

    // Defeat sound
    playDefeat() {
        if (this.isMuted) return;
        this.ensureRunning();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const notes = [440, 415.3, 392, 349.2];
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, now + idx * 0.25);
            gain.gain.setValueAtTime(0.3, now + idx * 0.25);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.25 + 0.3);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now + idx * 0.25);
            osc.stop(now + idx * 0.25 + 0.32);
        });
    }

    // Background Music Synthesizer Loop (Anime style energetic arpeggios)
    startBGM() {
        if (this.bgmPlaying || this.isMuted) return;
        this.init();
        this.bgmPlaying = true;
        let step = 0;
        const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25]; // C major pentatonic
        const bassNotes = [130.81, 146.83, 164.81, 174.61]; // C3, D3, E3, F3

        const playTick = () => {
            if (!this.bgmPlaying || !this.ctx || this.isMuted) return;
            const now = this.ctx.currentTime;
            
            // Melody synth
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const noteIdx = (step * 3 + Math.floor(step / 4)) % scale.length;
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(scale[noteIdx], now);
            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now);
            osc.stop(now + 0.13);

            // Bass synth on downbeats
            if (step % 4 === 0) {
                const bassOsc = this.ctx.createOscillator();
                const bassGain = this.ctx.createGain();
                const bassIdx = Math.floor(step / 8) % bassNotes.length;
                bassOsc.type = 'sawtooth';
                bassOsc.frequency.setValueAtTime(bassNotes[bassIdx], now);
                bassGain.gain.setValueAtTime(0.05, now);
                bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
                bassOsc.connect(bassGain);
                bassGain.connect(this.masterGain);
                bassOsc.start(now);
                bassOsc.stop(now + 0.28);
            }

            step = (step + 1) % 32;
            this.bgmTimer = setTimeout(playTick, 140);
        };

        playTick();
    }

    stopBGM() {
        this.bgmPlaying = false;
        if (this.bgmTimer) {
            clearTimeout(this.bgmTimer);
            this.bgmTimer = null;
        }
    }
}

const sound = new SoundManager();


// ==================== ENTITIES ====================

// Game Entities: Unit, Base, Projectile, Particle, FloatingText

class Base {
    constructor({ x, y, hp, isPlayer, name }) {
        this.x = x;
        this.y = y;
        this.hp = hp;
        this.maxHp = hp;
        this.isPlayer = isPlayer;
        this.name = name;
        this.width = 160;
        this.height = 300;
        this.isDead = false;
        this.hitFlash = 0;
        this.bossSpawnTriggered = false;
    }

    takeDamage(amount) {
        this.hp = Math.max(0, this.hp - amount);
        this.hitFlash = 0.15;
        if (this.hp <= 0) {
            this.isDead = true;
        }
    }

    update(dt) {
        if (this.hitFlash > 0) {
            this.hitFlash -= dt;
        }
    }
}

class Unit {
    constructor(config, isPlayer, startX, groundY) {
        this.id = config.id;
        this.name = config.name;
        this.isPlayer = isPlayer;
        this.isBoss = config.isBoss || false;
        this.bodyType = config.bodyType || 'humanoid';

        this.x = startX;
        this.groundY = groundY;
        this.y = groundY;
        this.vx = 0;
        this.vy = 0;

        // Visual properties
        this.color = config.color || '#fff';
        this.hairColor = config.hairColor || '#ffe0bd';
        this.dressColor = config.dressColor || '#444';
        this.scale = config.scale || (config.isBoss ? 1.85 : 1.1);
        this.sprite = config.sprite || `${this.id}_0.png`;
        this.portrait = config.portrait || `${this.id}_f.png`;
        this.width = 50 * this.scale;
        const isTall = (this.id === 'knight' || this.id === 'julian');
        this.height = (isTall ? 92 : 70) * this.scale;

        // Combat Stats
        this.maxHp = config.hp;
        this.hp = config.hp;
        this.atk = config.atk;
        this.range = config.range;
        this.speed = config.speed;
        this.attackSpeed = config.attackSpeed;
        this.attackType = config.attackType; // 'single' or 'aoe'
        this.aoeRadius = config.aoeRadius || 0;
        this.cost = config.cost || 0;
        this.score = config.score || 10;

        // Knockback mechanics (Classic Battle Cats)
        this.knockbackCount = config.knockbackCount || 3;
        this.kbHpStep = this.maxHp / this.knockbackCount;
        this.nextKbThreshold = this.maxHp - this.kbHpStep;
        this.isKnockedBack = false;
        this.kbTimer = 0;

        // States: 'WALK', 'ATTACK_WINDUP', 'ATTACK_STRIKE', 'ATTACK_RECOVER', 'KNOCKBACK', 'DEAD'
        this.state = 'WALK';
        this.stateTimer = 0;
        this.walkCycle = Math.random() * Math.PI * 2;
        this.attackWindupDuration = 0.35;
        this.attackRecoverDuration = Math.max(0.2, this.attackSpeed - this.attackWindupDuration - 0.1);

        this.currentTarget = null;
        this.isDead = false;
        this.hitFlash = 0;
    }

    takeDamage(amount, soundManager, particles, floatingTexts) {
        this.hp -= amount;
        this.hitFlash = 0.12;

        floatingTexts.push(new FloatingText({
            x: this.x + (Math.random() - 0.5) * 20,
            y: this.y - this.height - 10,
            text: Math.round(amount),
            color: this.isPlayer ? '#ff5252' : '#ffeb3b',
            isCrit: amount > 500
        }));

        if (this.hp <= 0) {
            this.hp = 0;
            this.isDead = true;
            this.triggerKnockback(true);
            return;
        }

        // Check Battle Cats threshold knockback
        if (this.hp <= this.nextKbThreshold && !this.isKnockedBack) {
            this.nextKbThreshold -= this.kbHpStep;
            this.triggerKnockback(false);
        }
    }

    triggerKnockback(isFatal = false) {
        this.state = 'KNOCKBACK';
        this.isKnockedBack = true;
        this.kbTimer = 0.45;
        // Direction of knockback: player gets pushed left (-x), enemy gets pushed right (+x)
        const pushDir = this.isPlayer ? -1 : 1;
        this.vx = pushDir * (isFatal ? 320 : 220);
        this.vy = -180;
    }

    update(dt, targets, enemyBase, spawnProjectile, soundManager, particles) {
        if (this.hitFlash > 0) this.hitFlash -= dt;

        // Handle Knockback physics
        if (this.isKnockedBack) {
            this.x += this.vx * dt;
            this.y += this.vy * dt;
            this.vy += 700 * dt; // Gravity

            this.kbTimer -= dt;

            if (this.y >= this.groundY) {
                this.y = this.groundY;
                this.vy = 0;
                this.vx = 0;
                if (this.kbTimer <= 0) {
                    this.isKnockedBack = false;
                    this.state = this.isDead ? 'DEAD' : 'WALK';
                }
            }
            return;
        }

        // Always ensure unit is on ground when not in knockback
        this.y = this.groundY;

        if (this.isDead) return;

        // Check nearest target in range
        const frontX = this.x + (this.isPlayer ? this.width / 2 : -this.width / 2);
        let inRangeTarget = null;
        let minDistance = 999999;

        // Check opposing units
        for (const target of targets) {
            if (target.isDead) continue;
            const targetFront = target.x + (this.isPlayer ? -target.width / 2 : target.width / 2);
            const dist = this.isPlayer ? (targetFront - frontX) : (frontX - targetFront);

            if (dist >= -20 && dist <= this.range) {
                if (dist < minDistance) {
                    minDistance = dist;
                    inRangeTarget = target;
                }
            }
        }

        // If no unit in range, check opposing base
        if (!inRangeTarget && enemyBase && !enemyBase.isDead) {
            const baseFront = this.isPlayer ? (enemyBase.x - enemyBase.width / 2) : (enemyBase.x + enemyBase.width / 2);
            const dist = this.isPlayer ? (baseFront - frontX) : (frontX - baseFront);
            if (dist >= -40 && dist <= this.range) {
                inRangeTarget = enemyBase;
            }
        }

        this.currentTarget = inRangeTarget;

        // State Machine
        if (this.state === 'WALK') {
            if (inRangeTarget) {
                this.state = 'ATTACK_WINDUP';
                this.stateTimer = 0;
            } else {
                this.walkCycle += dt * 5.0;
                const dir = this.isPlayer ? 1 : -1;
                this.x += dir * this.speed * dt;
            }
        } else if (this.state === 'ATTACK_WINDUP') {
            this.stateTimer += dt;
            if (this.stateTimer >= this.attackWindupDuration) {
                this.state = 'ATTACK_STRIKE';
                this.executeAttack(spawnProjectile, soundManager, particles);
                this.stateTimer = 0;
            }
        } else if (this.state === 'ATTACK_STRIKE') {
            this.stateTimer += dt;
            if (this.stateTimer >= 0.22) {
                this.state = 'ATTACK_RECOVER';
                this.stateTimer = 0;
            }
        } else if (this.state === 'ATTACK_RECOVER') {
            this.stateTimer += dt;
            if (this.stateTimer >= this.attackRecoverDuration) {
                this.state = 'WALK';
                this.stateTimer = 0;
            }
        }
    }

    executeAttack(spawnProjectile, soundManager, particles) {
        const attackOriginX = this.x + (this.isPlayer ? 30 : -30);
        const attackTargetX = attackOriginX + (this.isPlayer ? this.range : -this.range);

        if (this.id === 'goku') {
            soundManager.playMagic();
            spawnProjectile(new SlashEffect({
                x: attackOriginX + (this.isPlayer ? 35 : -35),
                y: this.y - 30,
                radius: 52,
                color: '#ffd54f',
                isPlayer: this.isPlayer,
                owner: this,
                isKamehameha: true
            }));
        } else if (this.id === 'naruto') {
            soundManager.playMagic();
            spawnProjectile(new SlashEffect({
                x: attackOriginX + (this.isPlayer ? 42 : -42),
                y: this.y - 32,
                radius: 65,
                color: '#00e5ff',
                isPlayer: this.isPlayer,
                owner: this,
                isRasengan: true
            }));
        } else if (this.id === 'gon') {
            soundManager.playHeavyHit();
            spawnProjectile(new SlashEffect({
                x: attackOriginX + (this.isPlayer ? 45 : -45),
                y: this.y - 30,
                radius: 70,
                color: '#76ff03',
                isPlayer: this.isPlayer,
                owner: this,
                isJajanken: true
            }));
        } else if (this.id === 'killua') {
            soundManager.playMagic();
            spawnProjectile(new SlashEffect({
                x: attackOriginX + (this.isPlayer ? 40 : -40),
                y: this.y - 30,
                radius: 54,
                color: '#80d8ff',
                isPlayer: this.isPlayer,
                owner: this,
                isLightning: true
            }));
        } else if (this.id === 'zoro') {
            soundManager.playSlash();
            spawnProjectile(new SlashEffect({
                x: attackOriginX + (this.isPlayer ? 48 : -48),
                y: this.y - 32,
                radius: 75,
                color: '#69f0ae',
                isPlayer: this.isPlayer,
                owner: this,
                isSantoryu: true
            }));
        } else if (this.id === 'luffy') {
            soundManager.playHeavyHit();
            spawnProjectile(new SlashEffect({
                x: attackOriginX + (this.isPlayer ? 46 : -46),
                y: this.y - 30,
                radius: 58,
                color: '#ff5722',
                isPlayer: this.isPlayer,
                owner: this,
                isGomuGomu: true
            }));
        } else if (this.id === 'tanjiro') {
            soundManager.playSlash();
            spawnProjectile(new SlashEffect({
                x: attackOriginX + (this.isPlayer ? 38 : -38),
                y: this.y - 30,
                radius: 62,
                color: '#00b0ff',
                isPlayer: this.isPlayer,
                owner: this,
                isWaterBreathing: true
            }));
        } else if (this.id === 'killua') {
            soundManager.playMagic();
            spawnProjectile(new SlashEffect({
                x: attackOriginX + (this.isPlayer ? 40 : -40),
                y: this.y - 30,
                radius: 54,
                color: '#80d8ff',
                isPlayer: this.isPlayer,
                owner: this,
                isLightning: true
            }));
        } else if (this.id === 'ichigo') {
            soundManager.playHeavyHit();
            spawnProjectile(new SlashEffect({
                x: attackOriginX + (this.isPlayer ? 50 : -50),
                y: this.y - 35,
                radius: 88,
                color: '#d50000',
                isPlayer: this.isPlayer,
                owner: this,
                isGetsuga: true
            }));
        } else if (this.id === 'tsuna') {
            soundManager.playMagic();
            spawnProjectile(new SlashEffect({
                x: attackOriginX + (this.isPlayer ? 48 : -48),
                y: this.y - 32,
                radius: 85,
                color: '#ff6d00',
                isPlayer: this.isPlayer,
                owner: this,
                isXBurner: true
            }));
        } else if (this.id === 'jinwoo') {
            soundManager.playSlash();
            spawnProjectile(new SlashEffect({
                x: attackOriginX + (this.isPlayer ? 45 : -45),
                y: this.y - 32,
                radius: 80,
                color: '#b388ff',
                isPlayer: this.isPlayer,
                owner: this,
                isShadowStrike: true
            }));
        } else if (this.id === 'kenshin') {
            soundManager.playSlash();
            spawnProjectile(new SlashEffect({
                x: attackOriginX + (this.isPlayer ? 52 : -52),
                y: this.y - 32,
                radius: 95,
                color: '#ff5252',
                isPlayer: this.isPlayer,
                owner: this,
                isAmakakeru: true
            }));
        } else if (this.id === 'gintoki') {
            soundManager.playHeavyHit();
            spawnProjectile(new SlashEffect({
                x: attackOriginX + (this.isPlayer ? 58 : -58),
                y: this.y - 35,
                radius: 120,
                color: '#40c4ff',
                isPlayer: this.isPlayer,
                owner: this,
                isShiroyasha: true
            }));
        } else if (this.id === 'yo') {
            soundManager.playHeavyHit();
            spawnProjectile(new SlashEffect({
                x: attackOriginX + (this.isPlayer ? 55 : -55),
                y: this.y - 35,
                radius: 110,
                color: '#00e676',
                isPlayer: this.isPlayer,
                owner: this,
                isOverSoul: true
            }));
        } else if (this.id === 'knight') {
            soundManager.playSlash();
            spawnProjectile(new SlashEffect({
                x: attackOriginX + (this.isPlayer ? 25 : -25),
                y: this.y - 30,
                radius: 40,
                color: '#90caf9',
                isPlayer: this.isPlayer,
                owner: this
            }));
        } else if (this.id === 'deep') {
            soundManager.playSlash();
            spawnProjectile(new SlashEffect({
                x: attackOriginX + (this.isPlayer ? 40 : -40),
                y: this.y - 35,
                radius: 60,
                color: '#4fc3f7',
                isPlayer: this.isPlayer,
                owner: this
            }));
        } else if (this.id === 'firen') {
            soundManager.playMagic();
            spawnProjectile(new MagicOrb({
                startX: attackOriginX,
                startY: this.y - 45,
                targetX: attackTargetX,
                targetY: this.groundY - 20,
                radius: 95,
                color: '#ff5722',
                isPlayer: this.isPlayer,
                owner: this
            }));
        } else if (this.id === 'louisEX') {
            soundManager.playHeavyHit();
            spawnProjectile(new SpearBeam({
                x: attackOriginX,
                y: this.y - 45,
                targetX: attackOriginX + (this.isPlayer ? 250 : -250),
                isPlayer: this.isPlayer,
                owner: this
            }));
        } else if (this.isBoss || this.id === 'julian') {
            soundManager.playHeavyHit();
            spawnProjectile(new BossSlamEffect({
                x: attackOriginX + (this.isPlayer ? 60 : -60),
                y: this.groundY,
                radius: 140,
                isPlayer: this.isPlayer,
                owner: this
            }));
        } else {
            soundManager.playSlash();
            spawnProjectile(new SlashEffect({
                x: attackOriginX + (this.isPlayer ? 25 : -25),
                y: this.y - 25,
                radius: 40,
                color: this.color || '#ff5252',
                isPlayer: this.isPlayer,
                owner: this
            }));
        }
    }
}

// Visual Effects & Projectiles
class SlashEffect {
    constructor({ x, y, radius, color, isPlayer, owner, isRasengan = false, isKamehameha = false, isGomuGomu = false, isWaterBreathing = false, isLightning = false, isGetsuga = false, isShadowStrike = false, isOverSoul = false }) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.isPlayer = isPlayer;
        this.owner = owner;
        this.isRasengan = isRasengan;
        this.isKamehameha = isKamehameha;
        this.isGomuGomu = isGomuGomu;
        this.isWaterBreathing = isWaterBreathing;
        this.isLightning = isLightning;
        this.isGetsuga = isGetsuga;
        this.isShadowStrike = isShadowStrike;
        this.isOverSoul = isOverSoul;
        this.duration = (isRasengan || isGetsuga || isOverSoul) ? 0.25 : 0.18;
        this.timer = 0;
        this.hasHit = false;
    }

    update(dt, targets, enemyBase, floatingTexts, soundManager, particles) {
        this.timer += dt;
        if (!this.hasHit) {
            this.hasHit = true;
            this.applyDamage(targets, enemyBase, floatingTexts, soundManager, particles);
        }
        return this.timer >= this.duration;
    }

    applyDamage(targets, enemyBase, floatingTexts, soundManager, particles) {
        if (this.owner.attackType === 'aoe') {
            for (const t of targets) {
                if (!t.isDead && Math.abs(t.x - this.x) <= this.radius + t.width / 2) {
                    t.takeDamage(this.owner.atk, soundManager, particles, floatingTexts);
                    this.spawnSparks(t.x, t.y - 30, particles);
                }
            }
        } else {
            // Single target: hit closest
            let closest = null;
            let minDist = 9999;
            for (const t of targets) {
                if (!t.isDead) {
                    const d = Math.abs(t.x - this.x);
                    if (d <= this.radius + t.width / 2 && d < minDist) {
                        minDist = d;
                        closest = t;
                    }
                }
            }
            if (closest) {
                closest.takeDamage(this.owner.atk, soundManager, particles, floatingTexts);
                this.spawnSparks(closest.x, closest.y - 30, particles);
            } else if (enemyBase && !enemyBase.isDead && Math.abs(enemyBase.x - this.x) <= this.radius + enemyBase.width / 2) {
                enemyBase.takeDamage(this.owner.atk);
                this.spawnSparks(this.x, enemyBase.y - 50, particles);
                floatingTexts.push(new FloatingText({
                    x: enemyBase.x,
                    y: enemyBase.y - 120,
                    text: Math.round(this.owner.atk),
                    color: '#ff5252',
                    isCrit: true
                }));
            }
        }
    }

    spawnSparks(x, y, particles) {
        const count = this.isRasengan ? 14 : 8;
        for (let i = 0; i < count; i++) {
            const chakraColor = Math.random() > 0.4 ? '#00e5ff' : '#ffffff';
            particles.push(new Particle({
                x,
                y,
                vx: (Math.random() - 0.5) * (this.isRasengan ? 300 : 200),
                vy: (Math.random() - 0.7) * (this.isRasengan ? 240 : 180),
                color: this.isRasengan ? chakraColor : this.color,
                size: Math.random() * (this.isRasengan ? 5 : 4) + 2,
                life: 0.35
            }));
        }
    }
}

class MagicOrb {
    constructor({ startX, startY, targetX, targetY, radius, color, isPlayer, owner }) {
        this.x = startX;
        this.y = startY;
        this.startX = startX;
        this.startY = startY;
        this.targetX = targetX;
        this.targetY = targetY;
        this.radius = radius;
        this.color = color;
        this.isPlayer = isPlayer;
        this.owner = owner;
        this.speed = 420;
        this.dist = Math.abs(targetX - startX);
        this.hasExploded = false;
        this.explodeTimer = 0;
        this.explodeDuration = 0.35;
    }

    update(dt, targets, enemyBase, floatingTexts, soundManager, particles) {
        if (!this.hasExploded) {
            const dir = this.isPlayer ? 1 : -1;
            this.x += dir * this.speed * dt;
            // Arc trajectory
            const progress = Math.min(1, Math.abs(this.x - this.startX) / (this.dist || 1));
            this.y = this.startY + (this.targetY - this.startY) * progress - Math.sin(progress * Math.PI) * 50;

            const reached = this.isPlayer ? (this.x >= this.targetX) : (this.x <= this.targetX);
            if (reached) {
                this.hasExploded = true;
                soundManager.playMagic();
                this.explode(targets, enemyBase, floatingTexts, soundManager, particles);
            }
            return false;
        } else {
            this.explodeTimer += dt;
            return this.explodeTimer >= this.explodeDuration;
        }
    }

    explode(targets, enemyBase, floatingTexts, soundManager, particles) {
        for (const t of targets) {
            if (!t.isDead && Math.abs(t.x - this.x) <= this.radius + t.width / 2) {
                t.takeDamage(this.owner.atk, soundManager, particles, floatingTexts);
            }
        }
        if (enemyBase && !enemyBase.isDead && Math.abs(enemyBase.x - this.x) <= this.radius + enemyBase.width / 2) {
            enemyBase.takeDamage(this.owner.atk);
            floatingTexts.push(new FloatingText({
                x: enemyBase.x,
                y: enemyBase.y - 120,
                text: Math.round(this.owner.atk),
                color: '#ea80fc',
                isCrit: true
            }));
        }

        // Particle blast
        for (let i = 0; i < 20; i++) {
            const angle = Math.random() * Math.PI * 2;
            const spd = Math.random() * 220 + 60;
            particles.push(new Particle({
                x: this.x,
                y: this.y,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd,
                color: Math.random() > 0.4 ? '#e040fb' : '#ffd54f',
                size: Math.random() * 6 + 3,
                life: 0.45
            }));
        }
    }
}

class SpearBeam {
    constructor({ x, y, targetX, isPlayer, owner }) {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.isPlayer = isPlayer;
        this.owner = owner;
        this.duration = 0.35;
        this.timer = 0;
        this.hasHit = false;
    }

    update(dt, targets, enemyBase, floatingTexts, soundManager, particles) {
        this.timer += dt;
        if (!this.hasHit) {
            this.hasHit = true;
            const minX = Math.min(this.x, this.targetX);
            const maxX = Math.max(this.x, this.targetX);

            for (const t of targets) {
                if (!t.isDead && t.x >= minX - 40 && t.x <= maxX + 40) {
                    t.takeDamage(this.owner.atk, soundManager, particles, floatingTexts);
                    t.triggerKnockback(false);
                }
            }

            if (enemyBase && !enemyBase.isDead && enemyBase.x >= minX - 40 && enemyBase.x <= maxX + 40) {
                enemyBase.takeDamage(this.owner.atk);
                floatingTexts.push(new FloatingText({
                    x: enemyBase.x,
                    y: enemyBase.y - 140,
                    text: Math.round(this.owner.atk),
                    color: '#ffd54f',
                    isCrit: true
                }));
            }

            // Burst particles along the beam
            for (let i = 0; i < 24; i++) {
                const px = minX + Math.random() * (maxX - minX);
                particles.push(new Particle({
                    x: px,
                    y: this.y + (Math.random() - 0.5) * 40,
                    vx: (Math.random() - 0.5) * 120,
                    vy: (Math.random() - 0.5) * 120,
                    color: Math.random() > 0.5 ? '#fff59d' : '#ff4081',
                    size: Math.random() * 5 + 3,
                    life: 0.35
                }));
            }
        }
        return this.timer >= this.duration;
    }
}

class BossSlamEffect {
    constructor({ x, y, radius, isPlayer, owner }) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.isPlayer = isPlayer;
        this.owner = owner;
        this.duration = 0.4;
        this.timer = 0;
        this.hasHit = false;
    }

    update(dt, targets, enemyBase, floatingTexts, soundManager, particles) {
        this.timer += dt;
        if (!this.hasHit) {
            this.hasHit = true;
            for (const t of targets) {
                if (!t.isDead && Math.abs(t.x - this.x) <= this.radius + t.width / 2) {
                    t.takeDamage(this.owner.atk, soundManager, particles, floatingTexts);
                    t.triggerKnockback(false);
                }
            }
            if (enemyBase && !enemyBase.isDead && Math.abs(enemyBase.x - this.x) <= this.radius + enemyBase.width / 2) {
                enemyBase.takeDamage(this.owner.atk);
                floatingTexts.push(new FloatingText({
                    x: enemyBase.x,
                    y: enemyBase.y - 120,
                    text: Math.round(this.owner.atk),
                    color: '#d32f2f',
                    isCrit: true
                }));
            }

            for (let i = 0; i < 25; i++) {
                particles.push(new Particle({
                    x: this.x + (Math.random() - 0.5) * 60,
                    y: this.y - 10,
                    vx: (Math.random() - 0.5) * 350,
                    vy: (Math.random() - 1.2) * 260,
                    color: '#d32f2f',
                    size: Math.random() * 6 + 3,
                    life: 0.4
                }));
            }
        }
        return this.timer >= this.duration;
    }
}

// Particle & Floating Text
class Particle {
    constructor({ x, y, vx, vy, color, size, life }) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.size = size;
        this.maxLife = life;
        this.life = life;
    }

    update(dt) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.life -= dt;
        return this.life <= 0;
    }
}

class FloatingText {
    constructor({ x, y, text, color = '#fff', isCrit = false }) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.color = color;
        this.isCrit = isCrit;
        this.life = 0.8;
        this.maxLife = 0.8;
        this.vy = -75;
    }

    update(dt) {
        this.y += this.vy * dt;
        this.life -= dt;
        return this.life <= 0;
    }
}


// ==================== RENDERER ====================

// Canvas 2D Anime Renderer with Parallax, Chibi Sprites, VFX, and Screen Shake

class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.shakeTime = 0;
        this.shakeIntensity = 0;

        // Load LF2 Sprites & Anime Roster
        this.sprites = {};
        this.loadSprites([
            'goku', 'naruto', 'gon', 'killua', 'kirua', 'zoro', 'ichigo',
            'kenshin', 'gintoki', 'luffy', 'tanjiro', 'tsuna', 'yo', 'jinwoo',
            'firen', 'louisEX', 'knight', 'deep', 'bandit', 'hunter', 'monk', 'julian'
        ]);

        // Load Base & Background Artwork Assets
        this.playerBaseImg = new Image();
        this.playerBaseImg.src = './assets/bases/player_base.png';

        this.enemyBaseImg = new Image();
        this.enemyBaseImg.src = './assets/bases/enemy_base.png';

        this.bgImg = new Image();
        this.bgImg.src = './assets/bg/anime_bg.jpg';

        // Ambient Golden Desert Sand Motes & Wind Particles
        this.sandParticles = [];
        for (let i = 0; i < 45; i++) {
            this.sandParticles.push({
                x: Math.random() * 2400,
                y: Math.random() * 800,
                vx: Math.random() * 65 + 35,
                vy: (Math.random() - 0.25) * 16,
                size: Math.random() * 3 + 1.5,
                rot: Math.random() * Math.PI * 2,
                vRot: (Math.random() - 0.5) * 3,
                wobble: Math.random() * Math.PI * 2,
                opacity: Math.random() * 0.45 + 0.35,
                color: Math.random() > 0.4 ? '#ffd54f' : '#ffb74d'
            });
        }
    }

    loadSprites(charList) {
        charList.forEach(char => {
            const img = new Image();
            img.src = `./assets/sprites/${char}_0.png`;
            img.onload = () => {
                this.sprites[char] = img;
            };
        });
    }

    triggerShake(intensity = 8, duration = 0.3) {
        this.shakeIntensity = intensity;
        this.shakeTime = duration;
    }

    render(gameState, dt) {
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;

        // Update screen shake
        let offsetX = 0;
        let offsetY = 0;
        if (this.shakeTime > 0) {
            this.shakeTime -= dt;
            offsetX = (Math.random() - 0.5) * this.shakeIntensity;
            offsetY = (Math.random() - 0.5) * this.shakeIntensity;
        }

        ctx.save();
        ctx.clearRect(0, 0, width, height);
        ctx.translate(offsetX, offsetY);

        // 1. Draw Parallax Background
        this.drawBackground(gameState.cameraX, width, height, gameState.groundY);

        // 2. Apply Camera Translation for World Objects
        ctx.save();
        ctx.translate(-gameState.cameraX, 0);

        // Draw bases
        this.drawBase(gameState.playerBase, gameState.groundY);
        this.drawBase(gameState.enemyBase, gameState.groundY);

        // Draw units (sorted by Y/X for slight depth)
        const allUnits = [...gameState.playerUnits, ...gameState.enemyUnits];
        for (const unit of allUnits) {
            this.drawUnit(unit);
        }

        // Draw projectiles & VFX
        for (const proj of gameState.projectiles) {
            this.drawProjectile(proj);
        }

        // Draw Aether Cannon Laser
        if (gameState.cannonLaserActive) {
            this.drawAetherLaser(gameState.playerBase.x + 80, gameState.groundY - 140, gameState.cannonLaserTimer);
        }

        // Draw Particles
        for (const p of gameState.particles) {
            ctx.save();
            ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        // Draw Floating Damage Texts
        for (const ft of gameState.floatingTexts) {
            ctx.save();
            const alpha = Math.max(0, ft.life / ft.maxLife);
            ctx.globalAlpha = alpha;
            ctx.font = ft.isCrit ? 'bold 20px "Segoe UI", sans-serif' : 'bold 15px "Segoe UI", sans-serif';
            ctx.fillStyle = ft.color;
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 3;
            ctx.strokeText(ft.text, ft.x, ft.y);
            ctx.fillText(ft.text, ft.x, ft.y);
            ctx.restore();
        }

        // Draw Ambient Golden Desert Sand Motes in world space
        this.drawDesertSand(dt, gameState.worldWidth, gameState.groundY);

        ctx.restore(); // Restore world camera
        ctx.restore(); // Restore shake
    }

    drawDesertSand(dt, worldWidth, groundY) {
        const ctx = this.ctx;
        ctx.save();
        for (const p of this.sandParticles) {
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.rot += p.vRot * dt;
            p.wobble += dt * 2.5;

            if (p.x > worldWidth + 50) p.x = -50;
            if (p.y > groundY + 80) p.y = Math.random() * (groundY * 0.7);
            if (p.y < -20) p.y = groundY * 0.5;

            ctx.save();
            ctx.translate(p.x + Math.sin(p.wobble) * 6, p.y);
            ctx.rotate(p.rot);
            ctx.globalAlpha = p.opacity;

            // Sparkling golden sand grain
            ctx.fillStyle = p.color;
            ctx.shadowColor = '#ffe082';
            ctx.shadowBlur = 4;
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size * 1.5, p.size * 0.7, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }
        ctx.restore();
    }

    drawBackground(camX, width, height, groundY = height - 215) {
        const ctx = this.ctx;
        const groundTop = groundY - 14;

        // 1. Draw Desert & Mountain Artwork with Parallax
        if (this.bgImg && this.bgImg.complete && this.bgImg.naturalWidth > 0) {
            const scale = Math.max(height / this.bgImg.naturalHeight, width / this.bgImg.naturalWidth);
            const bgW = this.bgImg.naturalWidth * scale;
            const bgH = this.bgImg.naturalHeight * scale;
            const parallaxX = -(camX * 0.22) % bgW;
            let startX = parallaxX;
            if (startX > 0) startX -= bgW;
            while (startX < width) {
                ctx.drawImage(this.bgImg, Math.floor(startX), 0, Math.ceil(bgW) + 1, bgH);
                startX += bgW;
            }
        } else {
            // Fallback sunset gradient if loading
            const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
            skyGrad.addColorStop(0, '#f57c00');
            skyGrad.addColorStop(0.5, '#ffa726');
            skyGrad.addColorStop(0.8, '#ffcc80');
            skyGrad.addColorStop(1, '#ffe082');
            ctx.fillStyle = skyGrad;
            ctx.fillRect(0, 0, width, height);
        }

        // 2. Desert Sunset Atmospheric Horizon Glow
        ctx.save();
        const mistGrad = ctx.createLinearGradient(0, groundTop - 120, 0, groundTop);
        mistGrad.addColorStop(0, 'rgba(255, 160, 0, 0)');
        mistGrad.addColorStop(0.6, 'rgba(245, 124, 0, 0.22)');
        mistGrad.addColorStop(1, 'rgba(180, 80, 20, 0.55)');
        ctx.fillStyle = mistGrad;
        ctx.fillRect(0, groundTop - 120, width, 120);
        ctx.restore();

        // 3. Ground Lane (Desert Sandstone & Ancient Canyon Road extending to bottom)
        const groundGrad = ctx.createLinearGradient(0, groundTop, 0, height);
        groundGrad.addColorStop(0, '#3e2723');
        groundGrad.addColorStop(0.12, '#271714');
        groundGrad.addColorStop(0.5, '#1b0f0d');
        groundGrad.addColorStop(1, '#0e0706');
        ctx.fillStyle = groundGrad;
        ctx.fillRect(0, groundTop, width, height - groundTop);

        // 4. Luminous Golden Sun-Stone Edge along Ground
        ctx.save();
        const edgeGrad = ctx.createLinearGradient(0, 0, width, 0);
        edgeGrad.addColorStop(0, '#00e5ff');
        edgeGrad.addColorStop(0.3, '#ffd54f');
        edgeGrad.addColorStop(0.7, '#ff9100');
        edgeGrad.addColorStop(1, '#ff1744');
        ctx.strokeStyle = edgeGrad;
        ctx.lineWidth = 3.5;
        ctx.shadowColor = '#ffd54f';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(0, groundTop);
        ctx.lineTo(width, groundTop);
        ctx.stroke();
        ctx.restore();

        // 5. Glowing Solar Runic Dashed Lane Stripe
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 213, 79, 0.45)';
        ctx.shadowColor = '#ffd54f';
        ctx.shadowBlur = 8;
        ctx.lineWidth = 3;
        ctx.setLineDash([32, 24]);
        ctx.lineDashOffset = -camX * 0.5;
        ctx.beginPath();
        ctx.moveTo(0, groundY + 12);
        ctx.lineTo(width, groundY + 12);
        ctx.stroke();
        ctx.restore();
    }

    drawBase(base, groundY) {
        const ctx = this.ctx;
        ctx.save();
        ctx.translate(base.x, groundY);

        if (base.hitFlash > 0) {
            ctx.filter = 'brightness(2.2) drop-shadow(0 0 25px #ff1744)';
        }

        const now = Date.now();

        if (base.isPlayer) {
            // Sanctuary of Light (Celestial Crystal Pagoda)
            const targetH = 290;
            const targetW = 230; // matches 752x951 aspect ratio
            const drawX = -targetW / 2;
            const drawY = -targetH + 12;

            // Ground contact shadow
            ctx.save();
            ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
            ctx.beginPath();
            ctx.ellipse(0, 8, targetW * 0.42, 14, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Celestial Crystal Spire Pulsing Aura
            ctx.save();
            const pulse = (Math.sin(now * 0.0035) + 1) * 0.5;
            const aura = ctx.createRadialGradient(0, drawY + targetH * 0.28, 15, 0, drawY + targetH * 0.28, 120);
            aura.addColorStop(0, `rgba(64, 196, 255, ${0.45 + pulse * 0.25})`);
            aura.addColorStop(0.5, `rgba(0, 229, 255, ${0.18 + pulse * 0.12})`);
            aura.addColorStop(1, 'rgba(0, 229, 255, 0)');
            ctx.fillStyle = aura;
            ctx.beginPath();
            ctx.arc(0, drawY + targetH * 0.28, 120, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Render Base Image
            if (this.playerBaseImg && this.playerBaseImg.complete && this.playerBaseImg.naturalWidth > 0) {
                const hover = Math.sin(now * 0.003) * 3;
                ctx.drawImage(this.playerBaseImg, drawX, drawY + hover, targetW, targetH);
            } else {
                ctx.fillStyle = '#eceff1';
                ctx.fillRect(drawX + 40, drawY + 80, targetW - 80, targetH - 80);
            }
        } else {
            // Abyssal Gate (Demonic Obsidian Castle)
            const targetH = 290;
            const targetW = 268; // matches 910x987 aspect ratio
            const drawX = -targetW / 2;
            const drawY = -targetH + 12;

            // Ground contact shadow
            ctx.save();
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.beginPath();
            ctx.ellipse(0, 8, targetW * 0.45, 15, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Abyssal Demon Eye Pulsing Crimson Core
            ctx.save();
            const pulse = (Math.sin(now * 0.0045) + 1) * 0.5;
            const darkAura = ctx.createRadialGradient(0, drawY + targetH * 0.42, 15, 0, drawY + targetH * 0.42, 130);
            darkAura.addColorStop(0, `rgba(255, 23, 68, ${0.5 + pulse * 0.3})`);
            darkAura.addColorStop(0.6, `rgba(186, 104, 200, ${0.2 + pulse * 0.15})`);
            darkAura.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = darkAura;
            ctx.beginPath();
            ctx.arc(0, drawY + targetH * 0.42, 130, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Render Base Image
            if (this.enemyBaseImg && this.enemyBaseImg.complete && this.enemyBaseImg.naturalWidth > 0) {
                ctx.drawImage(this.enemyBaseImg, drawX, drawY, targetW, targetH);
            } else {
                ctx.fillStyle = '#1c1524';
                ctx.fillRect(drawX + 40, drawY + 80, targetW - 80, targetH - 80);
            }
        }

        ctx.restore();

        // Base HP Bar
        this.drawBaseHpBar(base, groundY);
    }

    drawBaseHpBar(base, groundY) {
        const ctx = this.ctx;
        ctx.save();

        const barWidth = 160;
        const barHeight = 14;
        const barX = base.x - barWidth / 2;
        const barY = groundY - 305;

        // Container Shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 3;

        // Dark background plate
        ctx.fillStyle = 'rgba(14, 11, 22, 0.9)';
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(barX - 2, barY - 2, barWidth + 4, barHeight + 4, 6);
        } else {
            ctx.rect(barX - 2, barY - 2, barWidth + 4, barHeight + 4);
        }
        ctx.fill();
        ctx.shadowColor = 'transparent';

        // Border with team accent
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = base.isPlayer ? '#00e5ff' : '#ff1744';
        ctx.stroke();

        // Inner health bar fill
        const pct = Math.max(0, Math.min(1, base.hp / base.maxHp));
        if (pct > 0) {
            const fillGrad = ctx.createLinearGradient(barX, 0, barX + barWidth, 0);
            if (base.isPlayer) {
                fillGrad.addColorStop(0, '#00b0ff');
                fillGrad.addColorStop(1, '#00e676');
            } else {
                fillGrad.addColorStop(0, '#aa00ff');
                fillGrad.addColorStop(1, '#ff1744');
            }
            ctx.fillStyle = fillGrad;
            ctx.beginPath();
            if (ctx.roundRect) {
                ctx.roundRect(barX, barY, barWidth * pct, barHeight, 4);
            } else {
                ctx.rect(barX, barY, barWidth * pct, barHeight);
            }
            ctx.fill();
        }

        // Header Title & Current HP text with glowing badge
        ctx.font = 'bold 12px "Segoe UI", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = base.isPlayer ? '#80d8ff' : '#ff8a80';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        const hpText = `${base.name} [${Math.round(base.hp)}/${base.maxHp}]`;
        ctx.strokeText(hpText, base.x, barY - 7);
        ctx.fillText(hpText, base.x, barY - 7);

        ctx.restore();
    }

    drawUnit(unit) {
        const ctx = this.ctx;
        ctx.save();
        ctx.translate(unit.x, unit.y);

        if (unit.hitFlash > 0) {
            ctx.filter = 'brightness(2.2)';
        }

        // Direction facing: player faces right (+1), enemy faces left (-1)
        const dir = unit.isPlayer ? 1 : -1;
        ctx.scale(dir * unit.scale, unit.scale);

        // Soft drop shadow under feet
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.beginPath();
        ctx.ellipse(0, 0, 20, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        const spriteImg = this.sprites[unit.id];
        if (spriteImg && spriteImg.complete && spriteImg.naturalWidth > 0) {
            const isAnimeHero = ['goku', 'naruto', 'gon', 'killua', 'kirua', 'zoro', 'ichigo', 'kenshin', 'gintoki', 'luffy', 'tanjiro', 'tsuna', 'yo', 'jinwoo'].includes(unit.id);

            if (isAnimeHero) {
                // High-Res 4-Row Raw Anime Hero Sprite (1200x1200, 300x300 per cell)
                // Row 0: ยืน (Idle 4 เฟรม)
                // Row 1: เดิน (Walk 4 เฟรม)
                // Row 2: โจมตีปกติ (Attack 4 เฟรม)
                // Row 3: โจมตีไม้ตายพร้อมเอฟเฟกต์ & กระเด็น (Special Attack with built-in VFX & Knockback)
                const cw = 300;
                const ch = 300;
                let row = 0;
                let col = 0;

                if (unit.state === 'WALK') {
                    row = 1;
                    // Natural 4-frame stride loop
                    col = Math.floor(unit.walkCycle) % 4;
                } else if (unit.state === 'ATTACK_WINDUP') {
                    // Multi-phase windup: ready stance -> energy charge
                    if (unit.stateTimer < 0.18) {
                        row = 2; col = 0; // Ready / windup stance
                    } else {
                        row = 3; col = 0; // Energy / aura charge stance
                    }
                } else if (unit.state === 'ATTACK_STRIKE') {
                    // Dynamic attack combo using ALL attack & special poses!
                    if (unit.stateTimer < 0.05) {
                        row = 2; col = 1; // Physical Strike 1 (punch/slash 1)
                    } else if (unit.stateTimer < 0.11) {
                        row = 2; col = 2; // Physical Strike 2 (punch/slash 2)
                    } else if (unit.stateTimer < 0.17) {
                        row = 3; col = 1; // Special Move Release (blast / dragon / flame launch!)
                    } else {
                        row = 3; col = 2; // Full Beam / Blast impact extension!
                    }
                } else if (unit.state === 'ATTACK_RECOVER') {
                    // Multi-phase recovery: impact finish -> stance return
                    if (unit.stateTimer < 0.14) {
                        row = 3; col = 3; // Impact finish / ground landing pose
                    } else {
                        row = 2; col = 3; // Stance recovery & return
                    }
                } else if (unit.state === 'KNOCKBACK') {
                    row = 3;
                    col = 0; // Airborne knockback pose
                } else {
                    // IDLE: 4-frame gentle breathing stance
                    row = 0;
                    col = Math.floor((Date.now() / 250) + unit.x * 0.05) % 4;
                }

                const sx = col * cw;
                const sy = row * ch;

                // Scale to match enemies: base height 68px scaled by unit.scale
                const baseH = 68;
                const drawScale = (baseH * unit.scale) / 240.0;
                const dw = cw * drawScale;
                const dh = ch * drawScale;
                const footOffset = 280 * drawScale;

                ctx.imageSmoothingEnabled = true; // High-res smooth filtering
                ctx.drawImage(spriteImg, sx, sy, cw, ch, -dw / 2, -footOffset, dw, dh);
            } else {
                // Classic Little Fighter 2 Sprite System (Enemies: Bandit, Monk, Julian, etc.)
                let frame = 0;
                const isTall = (unit.id === 'knight' || unit.id === 'julian');
                const fw = 80;
                const fh = isTall ? 100 : 80;
                const footOffsetY = isTall ? 99 : 79;

                if (unit.state === 'WALK') {
                    const walkFrames = [5, 6, 7, 6];
                    const walkIdx = Math.floor(unit.walkCycle) % walkFrames.length;
                    frame = walkFrames[walkIdx];
                } else if (unit.state === 'ATTACK_WINDUP') {
                    frame = 10;
                } else if (unit.state === 'ATTACK_STRIKE') {
                    frame = 11;
                } else if (unit.state === 'ATTACK_RECOVER') {
                    frame = 13;
                } else if (unit.state === 'KNOCKBACK') {
                    frame = unit.id === 'knight' ? 49 : (unit.id === 'julian' ? 24 : 60);
                } else {
                    frame = 0;
                }

                const col = frame % 10;
                const row = Math.floor(frame / 10);
                const sx = col * fw;
                const sy = row * fh;

                ctx.imageSmoothingEnabled = false; // crisp pixel art for LF2
                ctx.drawImage(spriteImg, sx, sy, fw, fh, -fw / 2, -footOffsetY, fw, fh);
            }
        } else {
            // Fallback drawing if image still loading
            ctx.fillStyle = unit.color || '#fff';
            ctx.fillRect(-15, -60, 30, 60);
        }

        ctx.restore();

        // Draw Unit HP Bar (small and clean)
        this.drawUnitHpBar(unit);
    }

    drawUnitHpBar(unit) {
        if (unit.isDead) return;
        const ctx = this.ctx;
        const width = 36 * unit.scale;
        const height = 4;
        const x = unit.x - width / 2;
        const y = unit.y - unit.height - 10;

        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(x, y, width, height);

        const pct = Math.max(0, unit.hp / unit.maxHp);
        ctx.fillStyle = unit.isPlayer ? '#4caf50' : '#e91e63';
        ctx.fillRect(x, y, width * pct, height);
    }

    // --- ANIME PLAYER CHARACTERS ---

    // 1. Neko Maid (Catgirl Meatshield)
    drawNekoMaid(ctx, unit, legAngle) {
        // Legs
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(-6, -15);
        ctx.lineTo(-6 - legAngle * 12, 0);
        ctx.moveTo(6, -15);
        ctx.lineTo(6 + legAngle * 12, 0);
        ctx.stroke();

        // Maid Dress / Apron
        ctx.fillStyle = '#26262b';
        ctx.beginPath();
        ctx.moveTo(-14, -20);
        ctx.lineTo(14, -20);
        ctx.lineTo(18, -4);
        ctx.lineTo(-18, -4);
        ctx.closePath();
        ctx.fill();

        // White Apron
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-8, -20, 16, 15);

        // Head
        ctx.fillStyle = '#ffe0bd';
        ctx.beginPath();
        ctx.arc(0, -32, 14, 0, Math.PI * 2);
        ctx.fill();

        // Hair (Short blonde/cream with twintails)
        ctx.fillStyle = unit.hairColor;
        ctx.beginPath();
        ctx.arc(0, -35, 15, Math.PI, 0);
        ctx.fill();
        // Twintails
        ctx.beginPath();
        ctx.ellipse(-14, -30, 4, 10, -0.2, 0, Math.PI * 2);
        ctx.ellipse(14, -30, 4, 10, 0.2, 0, Math.PI * 2);
        ctx.fill();

        // Cat Ears
        ctx.fillStyle = '#26262b';
        ctx.beginPath();
        ctx.moveTo(-12, -42);
        ctx.lineTo(-4, -54);
        ctx.lineTo(0, -42);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(0, -42);
        ctx.lineTo(6, -54);
        ctx.lineTo(14, -42);
        ctx.fill();
        // Inner ears pink
        ctx.fillStyle = '#ff80ab';
        ctx.beginPath();
        ctx.moveTo(-10, -43);
        ctx.lineTo(-5, -51);
        ctx.lineTo(-2, -43);
        ctx.fill();

        // Eyes (Anime cute anime cat eyes)
        ctx.fillStyle = '#ff4081';
        ctx.beginPath();
        ctx.ellipse(4, -32, 2.5, 3.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(4.5, -33.5, 1, 0, Math.PI * 2);
        ctx.fill();

        // Serving Tray Shield (Arm & Metal Tray)
        ctx.fillStyle = '#b0bec5';
        ctx.save();
        if (unit.state === 'ATTACK_STRIKE') {
            ctx.translate(16, -26);
            ctx.rotate(0.4);
            ctx.fillRect(-4, -20, 8, 40); // Slam tray!
        } else {
            ctx.fillRect(8, -40, 6, 32); // Defensive hold
        }
        ctx.restore();
    }

    // 2. Blade Maiden Aoi (Swordswoman DPS)
    drawBladeMaiden(ctx, unit, legAngle) {
        // Legs (Hakama boots)
        ctx.strokeStyle = '#1a237e';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(-6, -18);
        ctx.lineTo(-6 - legAngle * 14, 0);
        ctx.moveTo(6, -18);
        ctx.lineTo(6 + legAngle * 14, 0);
        ctx.stroke();

        // Kimono Robe
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(-12, -22);
        ctx.lineTo(12, -22);
        ctx.lineTo(15, -6);
        ctx.lineTo(-15, -6);
        ctx.closePath();
        ctx.fill();
        // Blue Obi sash
        ctx.fillStyle = '#0288d1';
        ctx.fillRect(-12, -23, 24, 7);

        // Head
        ctx.fillStyle = '#ffe0bd';
        ctx.beginPath();
        ctx.arc(0, -36, 14, 0, Math.PI * 2);
        ctx.fill();

        // Blue ponytail hair
        ctx.fillStyle = unit.hairColor;
        ctx.beginPath();
        ctx.arc(0, -38, 15, Math.PI, 0);
        ctx.fill();
        // High ponytail swooshing back
        ctx.beginPath();
        const swoosh = unit.state === 'WALK' ? Math.sin(unit.walkCycle) * 4 : 0;
        ctx.ellipse(-16 + swoosh, -44, 14, 6, 0.4, 0, Math.PI * 2);
        ctx.fill();

        // Cool eyes
        ctx.fillStyle = '#0288d1';
        ctx.beginPath();
        ctx.ellipse(4, -36, 2.5, 3.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Katana Sword
        ctx.save();
        if (unit.state === 'ATTACK_WINDUP') {
            ctx.translate(-10, -35);
            ctx.rotate(-1.2);
            ctx.fillStyle = '#cfd8dc';
            ctx.fillRect(0, -3, 38, 5);
        } else if (unit.state === 'ATTACK_STRIKE') {
            ctx.translate(14, -25);
            ctx.rotate(0.6);
            ctx.fillStyle = '#81d4fa';
            ctx.shadowColor = '#00e5ff';
            ctx.shadowBlur = 15;
            ctx.fillRect(0, -3, 48, 6);
        } else {
            // Idle / Sheathed carry
            ctx.translate(6, -24);
            ctx.rotate(0.3);
            ctx.fillStyle = '#cfd8dc';
            ctx.fillRect(0, -2, 34, 4);
        }
        ctx.restore();
    }

    // 3. Mage Lily (Ranged AoE)
    drawMageLily(ctx, unit, legAngle) {
        // Robe skirt
        ctx.fillStyle = '#4a148c';
        ctx.beginPath();
        ctx.moveTo(-16, -18);
        ctx.lineTo(16, -18);
        ctx.lineTo(20, 0);
        ctx.lineTo(-20, 0);
        ctx.closePath();
        ctx.fill();

        // Capelet
        ctx.fillStyle = '#7b1fa2';
        ctx.fillRect(-12, -32, 24, 15);

        // Head
        ctx.fillStyle = '#ffe0bd';
        ctx.beginPath();
        ctx.arc(0, -38, 13, 0, Math.PI * 2);
        ctx.fill();

        // Purple anime hair
        ctx.fillStyle = unit.hairColor;
        ctx.beginPath();
        ctx.arc(0, -40, 14, Math.PI, 0);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(-12, -32, 4, 12, 0, 0, Math.PI * 2);
        ctx.ellipse(12, -32, 4, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        // Witch Hat
        ctx.fillStyle = '#311b92';
        ctx.beginPath();
        ctx.ellipse(0, -46, 22, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(-14, -46);
        ctx.lineTo(0, -74);
        ctx.lineTo(14, -46);
        ctx.closePath();
        ctx.fill();
        // Gold star ribbon
        ctx.fillStyle = '#ffd54f';
        ctx.fillRect(-10, -50, 20, 4);

        // Staff with floating magical star
        ctx.save();
        ctx.strokeStyle = '#8d6e63';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(14, -4);
        ctx.lineTo(18, -60);
        ctx.stroke();

        // Glowing star on staff tip
        ctx.translate(18, -65);
        ctx.rotate(Date.now() * 0.003);
        ctx.fillStyle = '#ea80fc';
        ctx.shadowColor = '#e040fb';
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(0, 0, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    // 4. Valkyrie Freya (Uber Heavy Striker)
    drawValkyrieFreya(ctx, unit, legAngle) {
        // Angelic Feathered Wings (Flapping in wind)
        ctx.save();
        const wingFlap = Math.sin(Date.now() * 0.006) * 0.15;
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ffe082';
        ctx.shadowBlur = 16;
        // Left Wing
        ctx.save();
        ctx.translate(-15, -45);
        ctx.rotate(-0.4 + wingFlap);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(-45, -45, -60, -10);
        ctx.quadraticCurveTo(-30, 20, 0, 0);
        ctx.fill();
        ctx.restore();
        // Right Wing
        ctx.save();
        ctx.translate(15, -45);
        ctx.rotate(0.4 - wingFlap);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(45, -45, 60, -10);
        ctx.quadraticCurveTo(30, 20, 0, 0);
        ctx.fill();
        ctx.restore();
        ctx.restore();

        // Armored Skirt
        ctx.fillStyle = '#c2185b';
        ctx.beginPath();
        ctx.moveTo(-16, -25);
        ctx.lineTo(16, -25);
        ctx.lineTo(22, -4);
        ctx.lineTo(-22, -4);
        ctx.closePath();
        ctx.fill();

        // Golden Breastplate
        ctx.fillStyle = '#ffd54f';
        ctx.fillRect(-12, -40, 24, 18);

        // Head
        ctx.fillStyle = '#ffe0bd';
        ctx.beginPath();
        ctx.arc(0, -48, 14, 0, Math.PI * 2);
        ctx.fill();

        // Long Golden Hair
        ctx.fillStyle = '#fff59d';
        ctx.beginPath();
        ctx.arc(0, -50, 16, Math.PI, 0);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(-14, -36, 5, 18, 0.1, 0, Math.PI * 2);
        ctx.ellipse(14, -36, 5, 18, -0.1, 0, Math.PI * 2);
        ctx.fill();

        // Golden Winged Tiara / Halo
        ctx.strokeStyle = '#ffd54f';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(0, -68, 18, 5, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Light Spear of Destiny
        ctx.save();
        if (unit.state === 'ATTACK_STRIKE') {
            ctx.translate(30, -40);
            ctx.rotate(0.2);
            ctx.fillStyle = '#ffd54f';
            ctx.shadowColor = '#fff';
            ctx.shadowBlur = 20;
            ctx.fillRect(-10, -4, 90, 8);
        } else {
            ctx.translate(12, -40);
            ctx.rotate(-0.3);
            ctx.fillStyle = '#fff59d';
            ctx.fillRect(-8, -4, 75, 6);
        }
        ctx.restore();
    }

    // --- ENEMY MONSTERS & BOSS ---

    // Shadow Slime
    drawShadowSlime(ctx, unit) {
        ctx.save();
        const squish = Math.sin(Date.now() * 0.008) * 0.15;
        ctx.scale(1 + squish, 1 - squish);
        ctx.fillStyle = '#7e57c2';
        ctx.shadowColor = '#b388ff';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(0, -18, 20, 0, Math.PI * 2);
        ctx.fill();

        // Big Anime Demon Eye
        ctx.fillStyle = '#ff1744';
        ctx.beginPath();
        ctx.arc(4, -18, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(4, -18, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(2, -20, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    // Abyss Hound
    drawAbyssHound(ctx, unit, legAngle) {
        ctx.fillStyle = '#261729';
        // Body
        ctx.beginPath();
        ctx.ellipse(0, -16, 24, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        // Glowing red spikes
        ctx.fillStyle = '#ff1744';
        ctx.beginPath();
        ctx.moveTo(-10, -26);
        ctx.lineTo(-4, -36);
        ctx.lineTo(2, -26);
        ctx.fill();

        // Head & Jaw
        ctx.fillStyle = '#1b101d';
        ctx.beginPath();
        ctx.arc(18, -22, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ff1744';
        ctx.beginPath();
        ctx.arc(22, -24, 3, 0, Math.PI * 2);
        ctx.fill();

        // Running Legs
        ctx.strokeStyle = '#261729';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(-12, -12);
        ctx.lineTo(-12 - legAngle * 18, 0);
        ctx.moveTo(12, -12);
        ctx.lineTo(12 + legAngle * 18, 0);
        ctx.stroke();
    }

    // Dark Sorceress
    drawDarkSorceress(ctx, unit, legAngle) {
        // Hood & Cloak
        ctx.fillStyle = '#311432';
        ctx.beginPath();
        ctx.moveTo(-14, -20);
        ctx.lineTo(14, -20);
        ctx.lineTo(18, 0);
        ctx.lineTo(-18, 0);
        ctx.closePath();
        ctx.fill();

        // Head & Horned Hood
        ctx.beginPath();
        ctx.arc(0, -36, 13, 0, Math.PI * 2);
        ctx.fill();

        // Glowing sinister red eyes
        ctx.fillStyle = '#ff1744';
        ctx.shadowColor = '#ff1744';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(4, -35, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Floating dark magic orb
        ctx.save();
        ctx.translate(18, -35 + Math.sin(Date.now() * 0.007) * 6);
        ctx.fillStyle = '#d500f9';
        ctx.shadowColor = '#d500f9';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    // Demon Overlord (Boss Titan)
    drawDemonOverlord(ctx, unit, legAngle) {
        // Giant Demonic Body
        ctx.fillStyle = '#1f0d1a';
        ctx.beginPath();
        ctx.ellipse(0, -45, 32, 45, 0, 0, Math.PI * 2);
        ctx.fill();

        // Lava Veins / Chest Core
        ctx.fillStyle = '#ff3d00';
        ctx.shadowColor = '#ff3d00';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.ellipse(4, -48, 12, 16, 0, 0, Math.PI * 2);
        ctx.fill();

        // Giant Horns
        ctx.fillStyle = '#3e1b32';
        ctx.beginPath();
        ctx.moveTo(-16, -70);
        ctx.quadraticCurveTo(-45, -110, -65, -95);
        ctx.quadraticCurveTo(-40, -80, -10, -65);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(16, -70);
        ctx.quadraticCurveTo(45, -110, 65, -95);
        ctx.quadraticCurveTo(40, -80, 10, -65);
        ctx.fill();

        // Burning Shoulders
        ctx.fillStyle = '#d50000';
        ctx.fillRect(-35, -75, 20, 20);
        ctx.fillRect(15, -75, 20, 20);

        // Huge Cleaver Weapon
        ctx.save();
        ctx.translate(28, -50);
        if (unit.state === 'ATTACK_STRIKE') {
            ctx.rotate(0.9);
        } else {
            ctx.rotate(-0.2);
        }
        ctx.fillStyle = '#212121';
        ctx.fillRect(-6, -60, 12, 110);
        ctx.fillStyle = '#ff1744';
        ctx.fillRect(4, -55, 18, 90);
        ctx.restore();
    }

    // --- PROJECTILES & VFX ---

    drawProjectile(proj) {
        const ctx = this.ctx;
        ctx.save();

        if (proj.constructor.name === 'SlashEffect') {
            const isHeroOwner = proj.owner && ['goku', 'naruto', 'gon', 'killua', 'kirua', 'zoro', 'ichigo', 'kenshin', 'gintoki', 'luffy', 'tanjiro', 'tsuna', 'yo', 'jinwoo'].includes(proj.owner.id);
            if (isHeroOwner) {
                // High-Impact Hit Burst on Enemy (lets hero's raw sprite art shine without being covered)
                ctx.save();
                ctx.translate(proj.x, proj.y);
                const progress = 1 - (proj.life / proj.maxLife);
                const pulse = Math.sin(progress * Math.PI);
                const burstColor = proj.color || '#ffeb3b';

                // Expanding impact shockwave ring
                ctx.strokeStyle = burstColor;
                ctx.shadowColor = burstColor;
                ctx.shadowBlur = 25;
                ctx.lineWidth = Math.max(1, 4 * (1 - progress));
                ctx.beginPath();
                ctx.arc(0, 0, (proj.radius * 0.35) + progress * 28, 0, Math.PI * 2);
                ctx.stroke();

                // Bright center core impact flash
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(0, 0, Math.max(0, 10 * pulse), 0, Math.PI * 2);
                ctx.fill();

                // Impact sparks
                for (let i = 0; i < 5; i++) {
                    const ang = (i * Math.PI * 2 / 5) + progress * 4;
                    const dist = 14 + progress * 26;
                    ctx.fillStyle = burstColor;
                    ctx.beginPath();
                    ctx.arc(Math.cos(ang) * dist, Math.sin(ang) * dist, 3, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
                ctx.restore();
                return;
            }

            if (proj.isRasengan) {
                // Swirling Rasengan Chakra Sphere
                ctx.save();
                ctx.translate(proj.x, proj.y);
                const rot = Date.now() * 0.025;
                ctx.rotate(rot);

                // Cyan Chakra Aura Glow
                ctx.shadowColor = '#00e5ff';
                ctx.shadowBlur = 25;
                ctx.fillStyle = 'rgba(0, 229, 255, 0.4)';
                ctx.beginPath();
                ctx.arc(0, 0, 24 + Math.sin(rot * 2) * 3, 0, Math.PI * 2);
                ctx.fill();

                // Swirling Spiral Energy Arcs
                ctx.strokeStyle = '#e0f7fa';
                ctx.lineWidth = 3;
                for (let a = 0; a < 3; a++) {
                    ctx.beginPath();
                    ctx.arc(0, 0, 16, a * (Math.PI * 2 / 3), a * (Math.PI * 2 / 3) + 1.8);
                    ctx.stroke();
                }

                // White Chakra Core
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(0, 0, 10, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            } else if (proj.isKamehameha) {
                // Golden Dragon Ball Ki Blast / Kamehameha Energy Sphere
                ctx.save();
                ctx.translate(proj.x, proj.y);
                const rot = Date.now() * 0.03;

                // Golden Ki Aura Flare
                ctx.shadowColor = '#ffd54f';
                ctx.shadowBlur = 30;
                ctx.fillStyle = 'rgba(255, 215, 0, 0.45)';
                ctx.beginPath();
                ctx.arc(0, 0, 24 + Math.sin(rot * 2) * 3, 0, Math.PI * 2);
                ctx.fill();

                // Cyan / White Kamehameha Energy Core
                ctx.shadowColor = '#00e5ff';
                ctx.shadowBlur = 20;
                ctx.fillStyle = '#80d8ff';
                ctx.beginPath();
                ctx.arc(0, 0, 15, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(0, 0, 8, 0, Math.PI * 2);
                ctx.fill();

                // Sparking Ki arcs
                ctx.strokeStyle = '#fff59d';
                ctx.lineWidth = 2.5;
                for (let a = 0; a < 4; a++) {
                    ctx.beginPath();
                    ctx.arc(0, 0, 18, a * (Math.PI / 2) + rot, a * (Math.PI / 2) + rot + 0.8);
                    ctx.stroke();
                }
                ctx.restore();
            } else if (proj.isGomuGomu) {
                // Luffy: Gomu Gomu no Pistol Shockwave
                ctx.save();
                ctx.translate(proj.x, proj.y);
                ctx.shadowColor = '#ff5722';
                ctx.shadowBlur = 24;

                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.arc(0, 0, 22, 0, Math.PI * 2);
                ctx.stroke();

                ctx.strokeStyle = '#ff9800';
                ctx.lineWidth = 6;
                ctx.beginPath();
                ctx.arc(0, 0, 32, 0, Math.PI * 2);
                ctx.stroke();

                ctx.fillStyle = '#ffeb3b';
                for (let a = 0; a < 6; a++) {
                    const ang = a * (Math.PI / 3);
                    ctx.beginPath();
                    ctx.arc(Math.cos(ang) * 28, Math.sin(ang) * 28, 3.5, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            } else if (proj.isWaterBreathing) {
                // Tanjiro: Water Breathing Curved Wave Slash
                ctx.save();
                ctx.translate(proj.x, proj.y);
                const rot = Date.now() * 0.02;

                ctx.shadowColor = '#00e5ff';
                ctx.shadowBlur = 25;
                ctx.strokeStyle = '#00b0ff';
                ctx.lineWidth = 8;
                ctx.beginPath();
                ctx.arc(0, 0, 30, -1.2, 1.2);
                ctx.stroke();

                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.arc(0, 0, 26, -1.0, 1.0);
                ctx.stroke();

                ctx.fillStyle = '#e0f7fa';
                for (let a = 0; a < 5; a++) {
                    const ang = -1.0 + a * 0.5 + Math.sin(rot + a) * 0.2;
                    ctx.beginPath();
                    ctx.arc(Math.cos(ang) * 34, Math.sin(ang) * 34, 3, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            } else if (proj.isLightning) {
                // Killua: Godspeed Electric Lightning Sparks
                ctx.save();
                ctx.translate(proj.x, proj.y);
                ctx.shadowColor = '#00e5ff';
                ctx.shadowBlur = 30;

                ctx.fillStyle = 'rgba(0, 229, 255, 0.35)';
                ctx.beginPath();
                ctx.arc(0, 0, 26, 0, Math.PI * 2);
                ctx.fill();

                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 3;
                for (let a = 0; a < 4; a++) {
                    const baseAng = a * (Math.PI / 2) + (Math.random() - 0.5) * 0.4;
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(Math.cos(baseAng) * 15, Math.sin(baseAng) * 15 + (Math.random() - 0.5) * 6);
                    ctx.lineTo(Math.cos(baseAng) * 30, Math.sin(baseAng) * 30);
                    ctx.stroke();
                }
                ctx.restore();
            } else if (proj.isGetsuga) {
                // Ichigo: Getsuga Tensho (Black & Crimson Crescent Wave)
                ctx.save();
                ctx.translate(proj.x, proj.y);

                ctx.shadowColor = '#ff1744';
                ctx.shadowBlur = 35;
                ctx.strokeStyle = '#d50000';
                ctx.lineWidth = 14;
                ctx.beginPath();
                const dir = proj.isPlayer ? 1 : -1;
                ctx.arc(0, 0, 42, -1.1 * dir, 1.1 * dir);
                ctx.stroke();

                ctx.strokeStyle = '#111111';
                ctx.lineWidth = 8;
                ctx.beginPath();
                ctx.arc(0, 0, 40, -1.0 * dir, 1.0 * dir);
                ctx.stroke();

                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(0, 0, 38, -0.9 * dir, 0.9 * dir);
                ctx.stroke();
                ctx.restore();
            } else if (proj.isXBurner) {
                // Tsuna: Dying Will Flame / X-Burner Blast
                ctx.save();
                ctx.translate(proj.x, proj.y);
                const rot = Date.now() * 0.015;

                ctx.shadowColor = '#ff6d00';
                ctx.shadowBlur = 45;

                // 1. Blazing Orange Hyper Dying Will Outer Flame
                const flameGrad = ctx.createRadialGradient(0, 0, 5, 0, 0, 44);
                flameGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
                flameGrad.addColorStop(0.3, 'rgba(255, 214, 0, 0.85)');
                flameGrad.addColorStop(0.7, 'rgba(255, 109, 0, 0.6)');
                flameGrad.addColorStop(1, 'rgba(216, 27, 96, 0)');
                ctx.fillStyle = flameGrad;
                ctx.beginPath();
                ctx.arc(0, 0, 44, 0, Math.PI * 2);
                ctx.fill();

                // 2. White-hot Core Blast Beam / Sphere
                ctx.fillStyle = '#ffffff';
                ctx.shadowColor = '#ffe57f';
                ctx.shadowBlur = 20;
                ctx.beginPath();
                ctx.arc(0, 0, 18, 0, Math.PI * 2);
                ctx.fill();

                // 3. Swirling Flame Rings
                ctx.strokeStyle = '#ffd54f';
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.ellipse(0, 0, 34, 16, rot, 0, Math.PI * 2);
                ctx.stroke();

                ctx.strokeStyle = '#ff6d00';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.ellipse(0, 0, 36, 18, -rot * 1.3, 0, Math.PI * 2);
                ctx.stroke();

                // 4. Fiery Sparks
                ctx.fillStyle = '#ff9100';
                for (let a = 0; a < 6; a++) {
                    const ang = a * (Math.PI / 3) + rot * 2;
                    ctx.beginPath();
                    ctx.arc(Math.cos(ang) * 38, Math.sin(ang) * 38, 3, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            } else if (proj.isShadowStrike) {
                // Jinwoo: Shadow Monarch Dual Dagger Cross Slash
                ctx.save();
                ctx.translate(proj.x, proj.y);
                const rot = Date.now() * 0.02;

                ctx.shadowColor = '#b388ff';
                ctx.shadowBlur = 35;

                // Purple shadow aura burst
                ctx.fillStyle = 'rgba(124, 77, 255, 0.25)';
                ctx.beginPath();
                ctx.arc(0, 0, 36, 0, Math.PI * 2);
                ctx.fill();

                // Dagger Slash 1 (diagonal +)
                ctx.save();
                ctx.rotate(0.4);
                ctx.strokeStyle = '#651fff';
                ctx.lineWidth = 9;
                ctx.beginPath();
                ctx.arc(0, 0, 38, -1.0, 1.0);
                ctx.stroke();

                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(0, 0, 37, -0.9, 0.9);
                ctx.stroke();
                ctx.restore();

                // Dagger Slash 2 (diagonal - cross)
                ctx.save();
                ctx.rotate(-0.4);
                ctx.strokeStyle = '#7c4dff';
                ctx.lineWidth = 9;
                ctx.beginPath();
                ctx.arc(0, 0, 38, -1.0, 1.0);
                ctx.stroke();

                ctx.strokeStyle = '#ede7f6';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(0, 0, 37, -0.9, 0.9);
                ctx.stroke();
                ctx.restore();

                // Shadow wisps
                ctx.fillStyle = '#b388ff';
                for (let a = 0; a < 6; a++) {
                    const ang = a * (Math.PI / 3) + rot;
                    ctx.beginPath();
                    ctx.arc(Math.cos(ang) * 40, Math.sin(ang) * 40, 2.5, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            } else if (proj.isOverSoul) {
                // Yoh: Over Soul Harusame (Colossal Radiant Spirit Blade Cleave)
                ctx.save();
                ctx.translate(proj.x, proj.y);
                const dir = proj.isPlayer ? 1 : -1;

                ctx.shadowColor = '#00e676';
                ctx.shadowBlur = 40;

                // Spirit Flame Aura
                ctx.strokeStyle = '#00e676';
                ctx.lineWidth = 16;
                ctx.beginPath();
                ctx.arc(0, 0, 52, -1.15 * dir, 1.15 * dir);
                ctx.stroke();

                // Emerald Blade Energy
                ctx.strokeStyle = '#69f0ae';
                ctx.lineWidth = 8;
                ctx.beginPath();
                ctx.arc(0, 0, 50, -1.05 * dir, 1.05 * dir);
                ctx.stroke();

                // Core White Shaman Light
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(0, 0, 48, -0.95 * dir, 0.95 * dir);
                ctx.stroke();

                // Spirit Sparks
                ctx.fillStyle = '#b9f6ca';
                for (let a = 0; a < 6; a++) {
                    const ang = (-1.0 + a * 0.4) * dir;
                    ctx.beginPath();
                    ctx.arc(Math.cos(ang) * 58, Math.sin(ang) * 58, 3.5, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            } else {
                ctx.strokeStyle = proj.color;
                ctx.shadowColor = proj.color;
                ctx.shadowBlur = 14;
                ctx.lineWidth = 6;
                ctx.beginPath();
                const sweep = proj.isPlayer ? 0.8 : -0.8;
                ctx.arc(proj.x, proj.y, proj.radius, -sweep, sweep);
                ctx.stroke();
            }
        } else if (proj.constructor.name === 'MagicOrb') {
            ctx.fillStyle = proj.color;
            ctx.shadowColor = proj.color;
            ctx.shadowBlur = 20;
            ctx.beginPath();
            ctx.arc(proj.x, proj.y, 14, 0, Math.PI * 2);
            ctx.fill();
        } else if (proj.constructor.name === 'SpearBeam') {
            ctx.strokeStyle = '#fff59d';
            ctx.shadowColor = '#ffd54f';
            ctx.shadowBlur = 25;
            ctx.lineWidth = 14;
            ctx.beginPath();
            ctx.moveTo(proj.x, proj.y);
            ctx.lineTo(proj.targetX, proj.y);
            ctx.stroke();
        } else if (proj.constructor.name === 'BossSlamEffect') {
            ctx.strokeStyle = '#d50000';
            ctx.shadowColor = '#ff1744';
            ctx.shadowBlur = 30;
            ctx.lineWidth = 12;
            ctx.beginPath();
            ctx.arc(proj.x, proj.y, proj.radius, Math.PI, 0);
            ctx.stroke();
        }

        ctx.restore();
    }

    // Full-lane Aether Cannon Beam (Anime Hyper Beam)
    drawAetherLaser(startX, startY, timer) {
        const ctx = this.ctx;
        ctx.save();

        const beamThickness = Math.sin((timer / 0.8) * Math.PI) * 70 + 20;

        // Outer glow beam
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.7)';
        ctx.shadowColor = '#00e5ff';
        ctx.shadowBlur = 40;
        ctx.lineWidth = beamThickness + 30;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + 3000, startY);
        ctx.stroke();

        // Inner white core
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = beamThickness * 0.4;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + 3000, startY);
        ctx.stroke();

        ctx.restore();
    }
}


// ==================== GAME ====================

// Main Game Controller: State Machine, Wave Spawner, Economy, Endless Stages & Upgrade System


class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.renderer = new Renderer(this.canvas);

        // World parameters
        this.worldWidth = 2400;
        // Raise ground level so walking characters and bases are in full view above the enlarged unit deck
        const isShortScreen = window.innerHeight < 520;
        this.groundY = Math.max(isShortScreen ? 200 : 320, window.innerHeight - (isShortScreen ? 160 : 250));
        this.gameSpeed = 1.0;
        this.isPaused = false;
        this.isGameOver = false;

        // Stage & Endless Progression
        this.stage = 1;
        this.shards = 150; // Starter shards so player can immediately explore the upgrade system!
        this.stageClearPending = false;

        // Character Upgrades Tracker (Levels 1 to 10)
        this.characterLevels = {
            goku: 1,
            naruto: 1,
            gon: 1,
            killua: 1,
            zoro: 1,
            ichigo: 1,
            kenshin: 1,
            gintoki: 1
        };

        // Fortress & Weapon Upgrades Tracker
        this.fortressLevels = {
            sanctuary: 1,
            cannon: 1,
            reactor: 1
        };

        // Camera control
        this.cameraX = 0;
        this.targetCameraX = 0;
        this.isDragging = false;
        this.dragStartX = 0;
        this.dragCamStartX = 0;

        // Economy & Worker
        this.workerLevel = 1;
        this.mana = 100;
        this.maxMana = WORKER_UPGRADES[0].maxMana;
        this.manaRate = WORKER_UPGRADES[0].rate;

        // Cannon Ultimate
        this.cannonCharge = 0;
        this.cannonMax = 100;
        this.cannonLaserActive = false;
        this.cannonLaserTimer = 0;
        this.cannonPower = 900;

        // Entities
        this.playerBase = new Base({
            x: 180,
            y: this.groundY,
            hp: 4500,
            isPlayer: true,
            name: 'Sanctuary of Light'
        });

        this.enemyBase = new Base({
            x: this.worldWidth - 180,
            y: this.groundY,
            hp: 6000,
            isPlayer: false,
            name: 'Abyssal Gate'
        });

        this.playerUnits = [];
        this.enemyUnits = [];
        this.projectiles = [];
        this.particles = [];
        this.floatingTexts = [];

        // Cooldown trackers for player unit buttons
        this.unitCooldowns = {};
        PLAYER_UNITS.forEach(u => this.unitCooldowns[u.id] = 0);

        // Enemy wave progression
        this.waveTimer = 0;
        this.nextBanditTime = 3.0;
        this.nextHunterTime = 13.0;
        this.nextMonkTime = 25.0;

        // Apply any starting upgrades to player unit roster
        this.recalculateUpgradedUnits();

        this.lastTime = performance.now();
        this.initDOM();
        this.initEvents();
        this.resize();

        // Start animation loop
        requestAnimationFrame(this.loop.bind(this));
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // Raise ground level so walking characters and bases are in full view above the unit deck
        const isShortScreen = this.canvas.height < 520;
        this.groundY = Math.max(isShortScreen ? 190 : 320, this.canvas.height - (isShortScreen ? 130 : 250));
        this.playerBase.y = this.groundY;
        this.enemyBase.y = this.groundY;
    }

    // Update the active PLAYER_UNITS stats based on current level
    recalculateUpgradedUnits() {
        PLAYER_UNITS.forEach((unit, idx) => {
            const baseUnit = BASE_PLAYER_UNITS.find(b => b.id === unit.id) || unit;
            const lvl = this.characterLevels[unit.id] || 1;
            const updated = calculateUnitStats(baseUnit, lvl);
            Object.assign(unit, updated);
        });

        // Fortress bonuses
        this.playerBase.maxHp = 4500 + (this.fortressLevels.sanctuary - 1) * 1500;
        this.maxMana = WORKER_UPGRADES[this.workerLevel - 1].maxMana + (this.fortressLevels.reactor - 1) * 300;
        this.cannonPower = 900 + (this.fortressLevels.cannon - 1) * 400;
    }

    initDOM() {
        // Build unit cards in bottom deck UI
        this.renderUnitCards();

        // Worker upgrade button
        this.workerBtn = document.getElementById('worker-btn');
        this.workerLvlText = document.getElementById('worker-lvl-text');
        this.workerCostText = document.getElementById('worker-cost-text');
        this.workerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sound.init();
            this.upgradeWorker();
        });

        // Cannon button
        this.cannonBtn = document.getElementById('cannon-btn');
        this.cannonBtn.addEventListener('click', () => {
            sound.init();
            this.fireAetherCannon();
        });

        // Speed toggle
        const speedBtn = document.getElementById('speed-btn');
        speedBtn.addEventListener('click', () => {
            this.gameSpeed = this.gameSpeed === 1.0 ? 2.0 : 1.0;
            speedBtn.innerText = this.gameSpeed === 2.0 ? '⚡ 2.0x' : '1.0x';
            speedBtn.classList.toggle('active', this.gameSpeed === 2.0);
        });

        // Sound toggle
        const soundBtn = document.getElementById('sound-btn');
        soundBtn.addEventListener('click', () => {
            sound.init();
            const muted = sound.toggleMute();
            soundBtn.innerText = muted ? '🔇 OFF' : '🔊 ON';
            if (!muted && !sound.bgmPlaying) {
                sound.startBGM();
            }
        });

        // Dismiss rotate hint button (for mobile portrait override)
        const dismissRotateBtn = document.getElementById('dismiss-rotate-btn');
        if (dismissRotateBtn) {
            dismissRotateBtn.addEventListener('click', () => {
                document.getElementById('rotate-hint')?.classList.add('dismissed');
            });
        }

        // Open upgrade modal from top HUD button
        const openUpgradeBtn = document.getElementById('open-upgrade-btn');
        if (openUpgradeBtn) {
            openUpgradeBtn.addEventListener('click', () => {
                sound.init();
                this.openUpgradeModal(false);
            });
        }

        // Close upgrade modal button
        const closeUpgradeBtn = document.getElementById('close-upgrade-modal-btn');
        if (closeUpgradeBtn) {
            closeUpgradeBtn.addEventListener('click', () => {
                this.closeUpgradeModal();
            });
        }

        // Next stage button inside upgrade modal
        const nextStageBtn = document.getElementById('next-stage-btn');
        if (nextStageBtn) {
            nextStageBtn.addEventListener('click', () => {
                sound.init();
                this.advanceToNextStage();
            });
        }

        // Upgrade modal tab switching
        const tabBtns = document.querySelectorAll('.upgrade-tab');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const paneUnits = document.getElementById('tab-characters');
                const paneFortress = document.getElementById('tab-fortress');

                if (targetTab === 'characters') {
                    paneUnits?.classList.remove('hidden');
                    paneFortress?.classList.add('hidden');
                } else {
                    paneUnits?.classList.add('hidden');
                    paneFortress?.classList.remove('hidden');
                }
            });
        });

        // Restart button on game over
        document.getElementById('restart-btn')?.addEventListener('click', () => {
            window.location.reload();
        });
    }

    renderUnitCards() {
        const unitContainer = document.getElementById('unit-deck');
        if (!unitContainer) return;
        unitContainer.innerHTML = '';

        PLAYER_UNITS.forEach((unit, idx) => {
            const card = document.createElement('div');
            card.className = 'unit-card';
            card.id = `card-${unit.id}`;
            const thaiTitle = unit.title.includes('/') ? unit.title.split('/')[1].trim() : unit.title;
            const lvl = this.characterLevels[unit.id] || 1;

            card.innerHTML = `
                <div class="card-glow-edge"></div>
                <div class="card-icon">
                    <img src="./assets/portraits/${unit.portrait}" class="card-avatar" alt="${unit.name}">
                    <span class="card-num" title="Hotkey: ${idx + 1}">${idx + 1}</span>
                    <span class="card-level-badge" id="card-lvl-${unit.id}">Lv.${lvl}</span>
                    <span class="card-cost-tag">💎 ${unit.cost}</span>
                </div>
                <div class="card-info">
                    <div class="card-name">${unit.name}</div>
                    <div class="card-desc">${thaiTitle}</div>
                    <div class="card-stats-preview">
                        <span>⚔️ ${unit.atk}</span>
                        <span>❤️ ${unit.hp}</span>
                    </div>
                </div>
                <div class="cooldown-overlay" id="cd-${unit.id}"></div>
            `;
            card.addEventListener('click', () => {
                sound.init();
                this.spawnPlayerUnit(unit.id);
            });
            unitContainer.appendChild(card);
        });
    }

    initEvents() {
        window.addEventListener('resize', () => this.resize());

        // Global Unlock Audio on first touch/click (Essential for iOS / iPadOS Safari & Chrome)
        const unlockAudio = () => {
            sound.init();
            if (!sound.bgmPlaying && !sound.isMuted) {
                sound.startBGM();
            }
        };
        ['touchstart', 'touchend', 'pointerdown', 'click', 'keydown'].forEach(evt => {
            window.addEventListener(evt, unlockAudio, { passive: true, once: true });
        });

        // Keyboard hotkeys
        window.addEventListener('keydown', (e) => {
            sound.init();
            if (e.key >= '1' && e.key <= '8') {
                const idx = parseInt(e.key) - 1;
                if (PLAYER_UNITS[idx]) this.spawnPlayerUnit(PLAYER_UNITS[idx].id);
            } else if (e.key.toLowerCase() === 'e') {
                this.upgradeWorker();
            } else if (e.code === 'Space') {
                e.preventDefault();
                this.fireAetherCannon();
            } else if (e.key.toLowerCase() === 'u') {
                const modal = document.getElementById('upgrade-modal');
                if (modal && !modal.classList.contains('hidden')) {
                    this.closeUpgradeModal();
                } else {
                    this.openUpgradeModal(false);
                }
            } else if (e.key === 'Escape') {
                this.closeUpgradeModal();
            } else if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') {
                this.targetCameraX = Math.max(0, this.targetCameraX - 300);
            } else if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
                this.targetCameraX = Math.min(this.worldWidth - this.canvas.width, this.targetCameraX + 300);
            }
        });

        // Mouse Drag to pan camera
        this.canvas.addEventListener('mousedown', (e) => {
            sound.init();
            if (!sound.bgmPlaying && !sound.isMuted) sound.startBGM();
            this.isDragging = true;
            this.dragStartX = e.clientX;
            this.dragCamStartX = this.targetCameraX;
        });

        window.addEventListener('mousemove', (e) => {
            if (this.isDragging) {
                const deltaX = e.clientX - this.dragStartX;
                const maxCam = Math.max(0, this.worldWidth - this.canvas.width);
                this.targetCameraX = Math.max(0, Math.min(maxCam, this.dragCamStartX - deltaX));
            }
        });

        window.addEventListener('mouseup', () => {
            this.isDragging = false;
        });

        // Touch drag for mobile / touchpads
        this.canvas.addEventListener('touchstart', (e) => {
            sound.init();
            if (!sound.bgmPlaying && !sound.isMuted) sound.startBGM();
            this.isDragging = true;
            this.dragStartX = e.touches[0].clientX;
            this.dragCamStartX = this.targetCameraX;
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            if (this.isDragging && e.touches[0]) {
                const deltaX = e.touches[0].clientX - this.dragStartX;
                const maxCam = Math.max(0, this.worldWidth - this.canvas.width);
                this.targetCameraX = Math.max(0, Math.min(maxCam, this.dragCamStartX - deltaX));
            }
        }, { passive: true });

        window.addEventListener('touchend', () => {
            this.isDragging = false;
        });
    }

    openUpgradeModal(isStageClear = false) {
        this.isPaused = true;
        const modal = document.getElementById('upgrade-modal');
        const tag = document.getElementById('upgrade-modal-tag');
        const nextBtnText = document.getElementById('next-stage-num-text');

        if (tag) {
            if (isStageClear) {
                tag.innerText = `🎉 STAGE ${this.stage} CLEARED!`;
                tag.style.color = '#00e676';
            } else {
                tag.innerText = `⚡ BATTLE ARSENAL UPGRADES`;
                tag.style.color = '#00f0ff';
            }
        }

        if (nextBtnText) {
            if (isStageClear) {
                nextBtnText.innerText = `STAGE ${this.stage + 1}`;
            } else {
                nextBtnText.innerText = `กลับสู่สนามรบ`;
            }
        }

        this.renderUpgradeModal();
        if (modal) modal.classList.remove('hidden');
    }

    closeUpgradeModal() {
        const modal = document.getElementById('upgrade-modal');
        if (modal) modal.classList.add('hidden');
        this.isPaused = false;
    }

    renderUpgradeModal() {
        // Update Shards Display
        const modalShards = document.getElementById('modal-shard-count');
        if (modalShards) modalShards.innerText = this.shards;

        const hudShards = document.getElementById('shard-count');
        if (hudShards) hudShards.innerText = this.shards;

        // Render Characters Upgrade Grid
        const charGrid = document.getElementById('character-upgrade-grid');
        if (charGrid) {
            charGrid.innerHTML = '';
            BASE_PLAYER_UNITS.forEach(baseUnit => {
                const currentLvl = this.characterLevels[baseUnit.id] || 1;
                const currentStats = calculateUnitStats(baseUnit, currentLvl);
                const nextStats = currentLvl < 10 ? calculateUnitStats(baseUnit, currentLvl + 1) : null;
                const cost = currentLvl < 10 ? UPGRADE_COSTS[currentLvl] : 0;
                const canAfford = this.shards >= cost && currentLvl < 10;
                const thaiTitle = baseUnit.title.includes('/') ? baseUnit.title.split('/')[1].trim() : baseUnit.title;

                const card = document.createElement('div');
                card.className = 'upgrade-hero-card';
                card.innerHTML = `
                    <div class="hero-card-left">
                        <img src="./assets/portraits/${baseUnit.portrait}" alt="${baseUnit.name}">
                        <div class="hero-card-lvl-tag">Lv. ${currentLvl}</div>
                    </div>
                    <div class="hero-card-mid">
                        <div class="hero-title-row">
                            <span class="hero-name">${baseUnit.name}</span>
                            <span class="hero-sub">${thaiTitle}</span>
                        </div>
                        <div class="hero-stats-row">
                            <div class="stat-item">
                                <span>⚔️ พลังโจมตี:</span>
                                <b>${currentStats.atk}</b>
                                ${nextStats ? `<span class="stat-delta">➔ ${nextStats.atk}</span>` : ''}
                            </div>
                            <div class="stat-item">
                                <span>❤️ พลังชีวิต:</span>
                                <b>${currentStats.hp}</b>
                                ${nextStats ? `<span class="stat-delta">➔ ${nextStats.hp}</span>` : ''}
                            </div>
                        </div>
                        <div class="hero-stats-row">
                            <div class="stat-item">
                                <span>⏱️ คูลดาวน์:</span>
                                <b>${currentStats.cooldown}s</b>
                                ${nextStats ? `<span class="stat-delta">➔ ${nextStats.cooldown}s</span>` : ''}
                            </div>
                            <div class="stat-item">
                                <span>💎 ราคา:</span>
                                <b>${currentStats.cost}</b>
                            </div>
                        </div>
                    </div>
                    <div class="hero-card-right">
                        ${currentLvl >= 10 ? `
                            <button class="btn-hero-upgrade maxed">MAX LEVEL</button>
                        ` : `
                            <button class="btn-hero-upgrade ${canAfford ? '' : 'disabled'}" data-unit="${baseUnit.id}">
                                <span>อัปเกรด</span>
                                <b>💎 ${cost}</b>
                            </button>
                        `}
                    </div>
                `;

                const upgradeBtn = card.querySelector(`button[data-unit="${baseUnit.id}"]`);
                if (upgradeBtn) {
                    upgradeBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        sound.init();
                        this.upgradeCharacter(baseUnit.id);
                    });
                }

                charGrid.appendChild(card);
            });
        }

        // Render Fortress Upgrade Grid
        const fortressGrid = document.getElementById('fortress-upgrade-grid');
        if (fortressGrid) {
            fortressGrid.innerHTML = '';
            Object.values(FORTRESS_UPGRADES).forEach(f => {
                const currentLvl = this.fortressLevels[f.id] || 1;
                const cost = f.baseCost + (currentLvl - 1) * f.costStep;
                const canAfford = this.shards >= cost;

                const card = document.createElement('div');
                card.className = 'fortress-card';
                card.innerHTML = `
                    <div class="fortress-card-header">
                        <span class="fortress-icon">${f.icon}</span>
                        <div>
                            <div class="fortress-title">${f.name}</div>
                            <div class="fortress-lvl">ระดับปัจจุบัน: Lv. ${currentLvl}</div>
                        </div>
                    </div>
                    <div class="fortress-desc">${f.desc}</div>
                    <div style="display:flex; justify-content: flex-end;">
                        <button class="btn-hero-upgrade ${canAfford ? '' : 'disabled'}" data-fortress="${f.id}">
                            <span>อัปเกรด</span>
                            <b>💎 ${cost}</b>
                        </button>
                    </div>
                `;

                const btn = card.querySelector(`button[data-fortress="${f.id}"]`);
                if (btn) {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        sound.init();
                        this.upgradeFortress(f.id);
                    });
                }

                fortressGrid.appendChild(card);
            });
        }
    }

    upgradeCharacter(unitId) {
        const currentLvl = this.characterLevels[unitId] || 1;
        if (currentLvl >= 10) return;

        const cost = UPGRADE_COSTS[currentLvl];
        if (this.shards >= cost) {
            this.shards -= cost;
            this.characterLevels[unitId] = currentLvl + 1;
            this.recalculateUpgradedUnits();
            this.renderUnitCards();
            this.renderUpgradeModal();
            sound.playUpgrade();

            this.floatingTexts.push(new FloatingText({
                x: this.playerBase.x + 80,
                y: this.groundY - 180,
                text: `✨ ${unitId.toUpperCase()} อัปเกรดเป็น Lv. ${currentLvl + 1}!`,
                color: '#00e5ff',
                isCrit: true
            }));
        } else {
            sound.playDeny();
        }
    }

    upgradeFortress(fortressId) {
        const f = FORTRESS_UPGRADES[fortressId];
        if (!f) return;

        const currentLvl = this.fortressLevels[fortressId] || 1;
        const cost = f.baseCost + (currentLvl - 1) * f.costStep;

        if (this.shards >= cost) {
            this.shards -= cost;
            this.fortressLevels[fortressId] = currentLvl + 1;

            if (fortressId === 'sanctuary') {
                // Fully heal sanctuary
                this.playerBase.maxHp = 4500 + (this.fortressLevels.sanctuary - 1) * 1500;
                this.playerBase.hp = this.playerBase.maxHp;
            } else if (fortressId === 'reactor') {
                this.mana = Math.min(this.maxMana, this.mana + 150);
            }

            this.recalculateUpgradedUnits();
            this.renderUpgradeModal();
            sound.playUpgrade();
        } else {
            sound.playDeny();
        }
    }

    advanceToNextStage() {
        this.stage++;
        this.closeUpgradeModal();

        // 1. Reset Bases & Scale Enemy Base
        this.enemyBase.maxHp = Math.round(6000 + (this.stage - 1) * 4200);
        this.enemyBase.hp = this.enemyBase.maxHp;
        this.enemyBase.isDead = false;
        this.enemyBase.bossSpawnTriggered = false;
        this.enemyBase.secondBossSpawnTriggered = false;

        // Fully heal and reinforce player sanctuary
        this.playerBase.maxHp = 4500 + (this.fortressLevels.sanctuary - 1) * 1500;
        this.playerBase.hp = this.playerBase.maxHp;
        this.playerBase.isDead = false;

        // 2. Clear entities on field for a fresh wave
        this.playerUnits = [];
        this.enemyUnits = [];
        this.projectiles = [];
        this.particles = [];
        this.floatingTexts = [];

        // 3. Reset Wave Timers
        this.waveTimer = 0;
        this.nextBanditTime = 2.5;
        this.nextHunterTime = 10.0;
        this.nextMonkTime = 20.0;

        // 4. Reset camera to player base
        this.targetCameraX = 0;
        this.cameraX = 0;

        // 5. Update HUD stage info
        const stageText = document.getElementById('stage-text');
        const stageSub = document.getElementById('stage-subtext');
        if (stageText) stageText.innerText = `STAGE ${this.stage}`;
        if (stageSub) stageSub.innerText = `ประตูนรก Abyssal Gate (ระดับ ${this.stage})`;

        // Announce new stage
        this.showBossBanner(`⚔️ STAGE ${this.stage} : กองทัพแห่งความมืดเริ่มบุกแล้ว! ⚔️`);
        if (!sound.bgmPlaying && !sound.isMuted) sound.startBGM();
    }

    handleStageClear() {
        this.stageClearPending = true;
        sound.playVictory();
        this.renderer.triggerShake(16, 0.7);

        // Calculate stage reward
        const shardsReward = 250 + (this.stage - 1) * 120;
        this.shards += shardsReward;

        // Visual sparkles
        for (let i = 0; i < 40; i++) {
            this.particles.push(new Particle({
                x: this.enemyBase.x,
                y: this.groundY - 100,
                vx: (Math.random() - 0.5) * 350,
                vy: -Math.random() * 300 - 80,
                color: Math.random() > 0.5 ? '#00e5ff' : '#ffd54f',
                size: Math.random() * 5 + 3,
                life: 1.2
            }));
        }

        this.floatingTexts.push(new FloatingText({
            x: this.enemyBase.x,
            y: this.groundY - 180,
            text: `🎉 STAGE ${this.stage} CLEARED! +💎 ${shardsReward} SHARDS!`,
            color: '#00e676',
            isCrit: true
        }));

        // Open upgrade modal automatically after a brief celebratory moment
        setTimeout(() => {
            this.openUpgradeModal(true);
            this.stageClearPending = false;
        }, 1200);
    }

    spawnPlayerUnit(unitId) {
        if (this.isGameOver) return;
        const config = PLAYER_UNITS.find(u => u.id === unitId);
        if (!config) return;

        // Check cooldown and cost
        if (this.unitCooldowns[unitId] > 0) {
            sound.playDeny();
            return;
        }

        if (this.mana < config.cost) {
            sound.playDeny();
            const card = document.getElementById(`card-${unitId}`);
            if (card) {
                card.classList.remove('btn-shake');
                void card.offsetWidth;
                card.classList.add('btn-shake');
            }
            return;
        }

        // Deduct mana & start cooldown
        this.mana -= config.cost;
        this.unitCooldowns[unitId] = config.cooldown;

        // Spawn unit at player base
        const spawnX = this.playerBase.x + 50;
        const newUnit = new Unit(config, true, spawnX, this.groundY);
        this.playerUnits.push(newUnit);

        sound.playSummon();

        // Spawn particle sparkle at base
        for (let i = 0; i < 10; i++) {
            this.particles.push(new Particle({
                x: spawnX,
                y: this.groundY - 20,
                vx: (Math.random() - 0.5) * 100,
                vy: -Math.random() * 120 - 40,
                color: '#40c4ff',
                size: Math.random() * 4 + 2,
                life: 0.4
            }));
        }
    }

    spawnEnemyUnit(enemyId) {
        const baseConfig = ENEMY_UNITS[enemyId];
        if (!baseConfig) return;

        // Difficulty scaling per stage
        const hpMultiplier = 1 + (this.stage - 1) * 0.24;
        const atkMultiplier = 1 + (this.stage - 1) * 0.18;
        const bountyMultiplier = 1 + (this.stage - 1) * 0.15;

        const scaledConfig = {
            ...baseConfig,
            hp: Math.round(baseConfig.hp * hpMultiplier),
            atk: Math.round(baseConfig.atk * atkMultiplier),
            cost: Math.round(baseConfig.cost * bountyMultiplier),
            score: Math.round(baseConfig.score * (1 + (this.stage - 1) * 0.2))
        };

        if (baseConfig.isBoss) {
            scaledConfig.hp = Math.round(baseConfig.hp * Math.pow(1.28, this.stage - 1));
            scaledConfig.atk = Math.round(baseConfig.atk * Math.pow(1.18, this.stage - 1));
        }

        const spawnX = this.enemyBase.x - 50;
        const enemy = new Unit(scaledConfig, false, spawnX, this.groundY);
        this.enemyUnits.push(enemy);

        if (scaledConfig.isBoss) {
            sound.playBossAlarm();
            this.renderer.triggerShake(18, 0.7);

            // Battle Cats Boss Shockwave: Push back ALL player units!
            this.playerUnits.forEach(u => {
                u.triggerKnockback(false);
            });

            this.showBossBanner(`⚠️ STAGE ${this.stage} BOSS: ${scaledConfig.name} ปรากฏตัว! ⚠️`);
        }
    }

    upgradeWorker() {
        if (this.workerLevel >= WORKER_UPGRADES.length) {
            sound.playDeny();
            return;
        }

        const currentData = WORKER_UPGRADES[this.workerLevel - 1];
        if (this.mana >= currentData.cost) {
            this.mana -= currentData.cost;
            this.workerLevel++;
            const nextData = WORKER_UPGRADES[this.workerLevel - 1];
            this.maxMana = nextData.maxMana + (this.fortressLevels.reactor - 1) * 300;
            this.manaRate = nextData.rate;
            sound.playUpgrade();
        } else {
            sound.playDeny();
            if (this.workerBtn) {
                this.workerBtn.classList.remove('btn-shake');
                void this.workerBtn.offsetWidth;
                this.workerBtn.classList.add('btn-shake');
            }
            const diff = Math.ceil(currentData.cost - this.mana);
            this.floatingTexts.push(new FloatingText({
                x: this.playerBase.x,
                y: this.groundY - 180,
                text: `ต้องการอีก 💎 ${diff} มานา!`,
                color: '#ff5252',
                isCrit: true
            }));
        }
    }

    fireAetherCannon() {
        if (this.cannonCharge < this.cannonMax || this.cannonLaserActive) return;
        this.cannonCharge = 0;
        this.cannonLaserActive = true;
        this.cannonLaserTimer = 0.8;

        sound.playCannon();
        this.renderer.triggerShake(14, 0.8);

        // Cannon deals power damage and knocks back every enemy on field!
        this.enemyUnits.forEach(e => {
            if (!e.isDead) {
                e.takeDamage(this.cannonPower, sound, this.particles, this.floatingTexts);
                e.triggerKnockback(false);
            }
        });
    }

    showBossBanner(msg) {
        const banner = document.getElementById('boss-warning');
        if (banner) {
            banner.innerText = msg;
            banner.classList.remove('hidden');
            setTimeout(() => {
                banner.classList.add('hidden');
            }, 3500);
        }
    }

    update(dt) {
        if (this.isGameOver || this.isPaused) return;

        // Smooth camera lerp
        this.cameraX += (this.targetCameraX - this.cameraX) * 0.15;

        // Economy update
        this.mana = Math.min(this.maxMana, this.mana + this.manaRate * dt);

        // Cannon recharge
        this.cannonCharge = Math.min(this.cannonMax, this.cannonCharge + (this.cannonMax / 30) * dt);

        // Cannon laser beam active timer
        if (this.cannonLaserActive) {
            this.cannonLaserTimer -= dt;
            if (this.cannonLaserTimer <= 0) {
                this.cannonLaserActive = false;
            }
        }

        // Unit Cooldowns update
        PLAYER_UNITS.forEach(u => {
            if (this.unitCooldowns[u.id] > 0) {
                this.unitCooldowns[u.id] = Math.max(0, this.unitCooldowns[u.id] - dt);
            }
        });

        // Update Bases
        this.playerBase.update(dt);
        this.enemyBase.update(dt);

        // Check Boss Spawn trigger (Battle Cats Style: At 70% Base HP)
        if (!this.enemyBase.bossSpawnTriggered && this.enemyBase.hp <= this.enemyBase.maxHp * 0.7) {
            this.enemyBase.bossSpawnTriggered = true;
            this.spawnEnemyUnit('julian');
        }

        // Higher stages (Stage 3+): Reinforcement boss at 35% HP!
        if (this.stage >= 3 && !this.enemyBase.secondBossSpawnTriggered && this.enemyBase.hp <= this.enemyBase.maxHp * 0.35) {
            this.enemyBase.secondBossSpawnTriggered = true;
            this.spawnEnemyUnit('julian');
        }

        // Update Player Units
        for (let i = this.playerUnits.length - 1; i >= 0; i--) {
            const unit = this.playerUnits[i];
            unit.update(
                dt,
                this.enemyUnits,
                this.enemyBase,
                (proj) => this.projectiles.push(proj),
                sound,
                this.particles
            );

            if (unit.state === 'DEAD' && !unit.isKnockedBack) {
                this.playerUnits.splice(i, 1);
            }
        }

        // Update Enemy Units
        for (let i = this.enemyUnits.length - 1; i >= 0; i--) {
            const unit = this.enemyUnits[i];
            unit.update(
                dt,
                this.playerUnits,
                this.playerBase,
                (proj) => this.projectiles.push(proj),
                sound,
                this.particles
            );

            if (unit.state === 'DEAD' && !unit.isKnockedBack) {
                // Mana bounty reward
                this.mana = Math.min(this.maxMana, this.mana + unit.cost);

                // Shards drop reward (for upgrading characters!)
                const shardsEarned = Math.max(1, Math.round(unit.cost * 0.08));
                this.shards += shardsEarned;
                this.floatingTexts.push(new FloatingText({
                    x: unit.x,
                    y: unit.y - 30,
                    text: `+💎 ${shardsEarned}`,
                    color: '#00e5ff'
                }));

                this.enemyUnits.splice(i, 1);
            }
        }

        // Update Projectiles & VFX
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const proj = this.projectiles[i];
            const targets = proj.isPlayer ? this.enemyUnits : this.playerUnits;
            const enemyBase = proj.isPlayer ? this.enemyBase : this.playerBase;
            const isDone = proj.update(dt, targets, enemyBase, this.floatingTexts, sound, this.particles);
            if (isDone) {
                this.projectiles.splice(i, 1);
            }
        }

        // Update Particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            if (this.particles[i].update(dt)) {
                this.particles.splice(i, 1);
            }
        }

        // Update Floating Texts
        for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
            if (this.floatingTexts[i].update(dt)) {
                this.floatingTexts.splice(i, 1);
            }
        }

        // Enemy Wave Script Spawner
        this.updateEnemySpawns(dt);

        // Win / Loss Condition
        if (this.enemyBase.isDead && !this.stageClearPending) {
            this.handleStageClear();
        } else if (this.playerBase.isDead && !this.isGameOver) {
            this.handleGameOver(false);
        }

        // Update UI
        this.updateUI();
    }

    updateEnemySpawns(dt) {
        this.waveTimer += dt;

        // Bandits spawn periodically (Fodder)
        const banditInterval = Math.max(2.0, 5.0 - (this.stage - 1) * 0.35);
        if (this.waveTimer >= this.nextBanditTime) {
            this.spawnEnemyUnit('bandit');
            this.nextBanditTime = this.waveTimer + Math.random() * 3 + banditInterval;
        }

        // Hunters start shooting
        const hunterInterval = Math.max(5.0, 13.0 - (this.stage - 1) * 0.7);
        if (this.waveTimer >= this.nextHunterTime) {
            this.spawnEnemyUnit('hunter');
            this.nextHunterTime = this.waveTimer + Math.random() * 6 + hunterInterval;
        }

        // Monks rush
        const monkInterval = Math.max(8.0, 22.0 - (this.stage - 1) * 1.2);
        if (this.waveTimer >= this.nextMonkTime) {
            this.spawnEnemyUnit('monk');
            this.nextMonkTime = this.waveTimer + Math.random() * 10 + monkInterval;
        }
    }

    handleGameOver(isVictory) {
        this.isGameOver = true;
        sound.stopBGM();
        sound.playDefeat();

        const modal = document.getElementById('game-over-modal');
        const title = document.getElementById('game-over-title');
        const desc = document.getElementById('game-over-desc');
        const record = document.getElementById('game-over-stage-record');

        if (modal) {
            modal.classList.remove('hidden');
            title.innerText = 'DEFEAT! พ่ายแพ้แก่ความมืด!';
            title.style.color = '#ff1744';
            desc.innerText = 'ป้อม Sanctuary of Light ถูกทำลายแล้ว!';
            if (record) {
                record.innerText = `🏆 สถิติของคุณ: เอาชีวิตรอดมาได้ถึง STAGE ${this.stage} (Endless Mode)`;
            }
        }
    }

    updateUI() {
        // Mana Bar & Text
        const manaFill = document.getElementById('mana-bar-fill');
        const manaText = document.getElementById('mana-text');
        if (manaFill && manaText) {
            const manaPct = (this.mana / this.maxMana) * 100;
            manaFill.style.width = `${manaPct}%`;
            manaText.innerText = `${Math.floor(this.mana)} / ${this.maxMana}`;
        }

        // Shard count on Top HUD
        const hudShards = document.getElementById('shard-count');
        if (hudShards) hudShards.innerText = this.shards;

        // Worker Button
        if (this.workerBtn) {
            const currentData = WORKER_UPGRADES[this.workerLevel - 1];
            if (this.workerLevel >= WORKER_UPGRADES.length) {
                if (this.workerLvlText) this.workerLvlText.textContent = 'Lv. MAX';
                if (this.workerCostText) {
                    this.workerCostText.textContent = 'Aether Reactor';
                    this.workerCostText.style.color = '#b0bec5';
                }
                this.workerBtn.classList.add('disabled');
            } else {
                const canAfford = this.mana >= currentData.cost;
                const costColor = canAfford ? '#69f0ae' : '#ff8a80';
                if (this.workerLvlText) this.workerLvlText.textContent = `Lv. ${this.workerLevel} ⇡`;
                if (this.workerCostText) {
                    this.workerCostText.textContent = `💎 ${currentData.cost}`;
                    this.workerCostText.style.color = costColor;
                }
                this.workerBtn.classList.toggle('disabled', !canAfford);
            }
        }

        // Cannon Button
        if (this.cannonBtn) {
            const cannonFill = document.getElementById('cannon-fill');
            const pct = (this.cannonCharge / this.cannonMax) * 100;
            if (cannonFill) cannonFill.style.height = `${pct}%`;
            this.cannonBtn.classList.toggle('ready', this.cannonCharge >= this.cannonMax);
        }

        // Unit Cards Status & Cooldown overlays
        PLAYER_UNITS.forEach(u => {
            const card = document.getElementById(`card-${u.id}`);
            const cdOverlay = document.getElementById(`cd-${u.id}`);
            if (!card || !cdOverlay) return;

            const cd = this.unitCooldowns[u.id];
            const canAfford = this.mana >= u.cost;

            if (cd > 0) {
                const pct = (cd / u.cooldown) * 100;
                cdOverlay.style.height = `${pct}%`;
                cdOverlay.innerText = cd.toFixed(1) + 's';
                card.classList.add('on-cooldown');
            } else {
                cdOverlay.style.height = '0%';
                cdOverlay.innerText = '';
                card.classList.remove('on-cooldown');
            }

            card.classList.toggle('cant-afford', !canAfford);
        });

        // Minimap camera indicator
        const camIndicator = document.getElementById('minimap-cam');
        if (camIndicator) {
            const maxCam = Math.max(1, this.worldWidth - this.canvas.width);
            const camPct = (this.cameraX / maxCam) * 75; // percentage across minimap
            camIndicator.style.left = `${camPct}%`;
        }
    }

    loop(timestamp) {
        const rawDt = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;
        // Clamp dt to prevent massive jumps when switching tabs
        const dt = Math.min(rawDt, 0.1) * this.gameSpeed;

        this.update(dt);
        this.renderer.render(this, dt);

        requestAnimationFrame(this.loop.bind(this));
    }
}

// Start Game instance on load
window.addEventListener('DOMContentLoaded', () => {
    window.gameInstance = new Game();
});
