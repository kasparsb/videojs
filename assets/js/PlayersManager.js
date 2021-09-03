import Player from './Player';

function PlayersManager(callbacks, isMuted) {
    this.callbacks = callbacks;

    this.items = [];
    this.currentPlaying;

    this.volumeLevel = 1;
    this.isMuted = typeof isMuted == 'undefined' ? true : false;
}

PlayersManager.prototype = {

    setVastUrl(url) {
        // šo pados uz player, tas tālāk to padots uz google ima plugin
        this.vastUrl = url
    },

    getPlayer(el) {
        let player = this.items.find(item => item.el === el)

        if (!player) {
            let i = this.items.push({
                el: el,
                player: new Player(el, {
                    onPlay: () => this.handleVideoPlay(),
                    onPause: () => this.callbacks.onPause(),
                    onAdPlay: () => this.callbacks.onAdPlay(),
                    onAdPlayProgress: progress => this.callbacks.onAdPlayProgress(progress),
                    onVolumeChange: (volume, isMuted) => this.handleVolumeChange(volume, isMuted)
                })
            })

            player = this.items[i-1];
        }

        player.player.setVastUrl(this.vastUrl);

        return player.player;
    },

    handleVideoPlay() {
        this.callbacks.onPlay ? this.callbacks.onPlay() : null
    },

    handleVolumeChange(volume, isMuted) {
        /**
         * Pēc noklusējuma pirmo player laižam muted režīmā,
         * lai nostrādātu autoplay
         * Ja lietotājs pats uzlicis skaņu, tad nākošo player laižam unmuted
         * (vai arī jebkurā stāvoklī uzlicis)
         */
        this.volumeLevel = volume;
        this.isMuted = isMuted;
    },

    play(el, ad) {
        // Nav padots el, bet ir currentPlaying
        if (!el) {

            // Ja nopauzēts
            if (this.currentPlaying && this.getPlayer(this.currentPlaying).paused()) {
                this.getPlayer(this.currentPlaying).play(ad, this.volumeLevel, this.isMuted);
            }

            return;
        }

        if (this.currentPlaying) {
            if (el == this.currentPlaying) {
                return;
            }
            // Apstādinām currentPlaying
            this.getPlayer(this.currentPlaying).placholder();
        }

        if (el) {
            this.currentPlaying = el;
            this.getPlayer(this.currentPlaying).play(ad, this.volumeLevel, this.isMuted);
        }
    },

    pause(el) {
        // Ja nav padots el, tad pause current
        if (el || this.currentPlaying) {
            this.getPlayer(el ? el : this.currentPlaying).pause();
        }
    },

    placeholder(el) {
        if (el || this.currentPlaying) {
            this.getPlayer(el ? el : this.currentPlaying).placholder();
            this.currentPlaying = undefined;
        }
    },

    ad(el, source, noticeTimeout, skipTimeout) {
        if (el || this.currentPlaying) {
            this.getPlayer(el ? el : this.currentPlaying).ad(source, noticeTimeout, skipTimeout);
        }
    }
}

export default PlayersManager