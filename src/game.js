// Main Game Controller: State Machine, Wave Spawner, Economy, Endless Stages & Upgrade System

import { BASE_PLAYER_UNITS, PLAYER_UNITS, ENEMY_UNITS, WORKER_UPGRADES, UPGRADE_COSTS, calculateUnitStats, FORTRESS_UPGRADES } from './data.js';
import { Base, Unit, Particle, FloatingText } from './entities.js';
import { sound } from './audio.js';
import { Renderer } from './renderer.js';

export class Game {
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
        // Raise ground level so walking characters and bases are in full view above the enlarged unit deck
        const isShortScreen = this.canvas.height < 520;
        this.groundY = Math.max(isShortScreen ? 200 : 320, this.canvas.height - (isShortScreen ? 160 : 250));
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
            speedBtn.innerText = `${this.gameSpeed}x Speed`;
            speedBtn.classList.toggle('active', this.gameSpeed === 2.0);
        });

        // Sound toggle
        const soundBtn = document.getElementById('sound-btn');
        soundBtn.addEventListener('click', () => {
            sound.init();
            const muted = sound.toggleMute();
            soundBtn.innerText = muted ? '🔇 Muted' : '🔊 Sound: ON';
            if (!muted && !sound.bgmPlaying) {
                sound.startBGM();
            }
        });

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
