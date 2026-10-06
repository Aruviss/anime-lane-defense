// Game Entities: Unit, Base, Projectile, Particle, FloatingText

export class Base {
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

export class Unit {
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
export class SlashEffect {
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

export class MagicOrb {
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

export class SpearBeam {
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

export class BossSlamEffect {
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
export class Particle {
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

export class FloatingText {
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
