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

export const sound = new SoundManager();
