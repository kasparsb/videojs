import jsx from 'dom-helpers/src/jsx';
import q from 'dom-helpers/src/q';
import append from 'dom-helpers/src/append';
import addStyle from 'dom-helpers/src/addStyle';

import clickp from 'dom-helpers/src/event/clickp';
import toggleClass from 'dom-helpers/src/toggleClass';
import replaceContent from 'dom-helpers/src/replaceContent';

import runEverySecond from './runEverySecond';

import videojs from 'video.js';
import 'videojs-contrib-ads';
import 'videojs-ima';


function Player(videoEl, callbacks) {
    this.callbacks = callbacks;

    this.el = videoEl;

    this._player = null;

    this.isAdPlaying = false;

    this.resumeFromTime = 0;

    this.vastUrl = '';

    this.isImaContainerInitialized = false;

    this.isOriginalSourceSet = false;
    this.originalSource = {
        src: this.el.dataset.hls,
        type: 'application/x-mpegURL'
    }

    clickp(this.el, '.skip-ad', () => this.handleSkipAd())
}

Player.prototype = {

    handleSkipAd() {
        this.skipAd();
    },

    handleVideoPlay() {

        this.onPlayProgressInterval = setInterval(() => {
            if (this.callbacks.onAdPlayProgress && this.isAdPlaying) {
                this.callbacks.onAdPlayProgress(this._player.currentTime())
            }
        }, 1000)


        if (this.callbacks.onPlay && !this.isAdPlaying) {
            this.callbacks.onPlay();
        }
        if (this.callbacks.onAdPlay && this.isAdPlaying) {
            this.callbacks.onAdPlay()
        }
    },
    handleVideoPause() {
        if (this.callbacks.onPause) {
            this.callbacks.onPause()
        }
    },
    handleVideoEnded() {

        // Ima paziņojam, ka video beidzies
        if (this.adsLoader) {
            this.adsLoader.contentComplete();
        }

        clearTimeout(this.onPlayProgressInterval)
        if (this.isAdPlaying) {
            this.canSkipAd = true;
            this.skipAd();
        }
    },
    handleLoadMetaData() {
        this.setOriginalSourceResumeTime();
    },
    handleCanPlayThrough() {
        this.setOriginalSourceResumeTime();
    },
    handleVolumeChange() {
        if (this.callbacks.onVolumeChange) {
            this.callbacks.onVolumeChange(this._player.volume(), this._player.muted())
        }
    },

    /**
     * Oriģinālajam video (tas, kas nav reklāma) uzstādām sākuma laiku
     * no kura video tika pārtraukts. Pātraukšana notiek ieslēdzot reklāmu
     */
    setOriginalSourceResumeTime() {
        if (this.isAdPlaying) {
            return;
        }

        if (this.resumeFromTime > 0) {
            this._player.currentTime(this.resumeFromTime);
            this.resumeFromTime = 0;
        }
    },

    getPosterSrc() {
        let e = q(this.el, '.placeholder .image img');
        return e ? e.src : '';
    },

    setVastUrl(url) {
        this.vastUrl = url
    },

    player() {
        if (this._player) {
            return
        }

        toggleClass(this.el, 'is-video', true);
        toggleClass(this.el, 'is-ad', false);
        toggleClass(this.el, 'is-ad-playing', false);
        toggleClass(this.el, 'is-placeholder', false);

        this.videoEl = <video poster={this.getPosterSrc()} controls playsinline preload="none" class="video-js vjs-default-skin"></video>;
        replaceContent(q(this.el, '.video-w'), this.videoEl);


        // Ads container
        // this.adsContainer = <div class="ima-ads-container"></div>;
        // append(q(this.el, '.video-w'), this.adsContainer);





        this._player = videojs(q(this.el, 'video'), {
            fluid: true
            //aspectRatio: '16:9'
        }, () => {

        });


        if (this.vastUrl) {
            console.log('init ima immediately');
            this._player.ima({
                adTagUrl: this.vastUrl
            });


            if (!this.isImaContainerInitialized) {
                this.isImaContainerInitialized = true;

                console.log('initializeAdDisplayContainer immediately');
                this._player.ima.initializeAdDisplayContainer();
            }


        }


        this._player.on('play', () => this.handleVideoPlay())
        this._player.on('pause', () => this.handleVideoPause())
        this._player.on('ended', () => this.handleVideoEnded())
        this._player.on('loadedmetadata', () => this.handleLoadMetaData())
        /**
         * iPhone/iPad need to play first, then set the time
         * events: https://www.w3.org/TR/html5/embedded-content-0.html#mediaevents
         */
        this._player.on('canplaythrough', () => this.handleCanPlayThrough());

        this._player.on('volumechange', () => this.handleVolumeChange());
    },
    /**
     * Ja ir reklāma, tad pārslēdz uz originalSource
     */
    skipAd() {
        /**
         * @todo Ja skipTimeout ir tāds pats kā reklāmas garums, tad
         * gadās, ka this.canSkipAd netiek uzlikts uz true
         */
        if (!this.canSkipAd) {
            return;
        }

        if (!this.isAdPlaying) {
            return;
        }

        this.isAdPlaying = false;

        toggleClass(this.el, 'is-video', true);
        toggleClass(this.el, 'is-ad', false);
        toggleClass(this.el, 'is-ad-playing', false);
        toggleClass(this.el, 'is-placeholder', false);

        this.setOriginalSource();
        this._player.controlBar.progressControl.enable();
        this._play();
    },
    playAd(source, cb) {
        this.player();

        this.isAdPlaying = true;

        this.resumeFromTime = this._player.currentTime();

        this.isOriginalSourceSet = false;
        this._player.src(source);
        this._player.controlBar.progressControl.disable();


        this._play(cb);
    },
    /**
     * @param source Reklāmas video url
     * @param skipTimeout Pēc cik sekundēm varēs skipot reklāmu
     * @param noticeTimeout Pēc cik sekundēm reklāma sāks spēlēt
     */
    ad(source, clickUrl, noticeTimeout, skipTimeout) {
        this.canSkipAd = false;

        toggleClass(this.el, 'is-video', true);
        toggleClass(this.el, 'is-ad', noticeTimeout > 0);
        toggleClass(this.el, 'is-ad-playing', false);
        toggleClass(this.el, 'is-placeholder', false);

        this.setAdNoticeTimeout(noticeTimeout, () => {

            toggleClass(this.el, 'is-ad-playing', true);

            // Uzliekam video click url
            q(this.el, '.ad-click').href = clickUrl;

            this.playAd(source, () => {
                if (skipTimeout > 0) {
                    toggleClass(this.el, 'is-ad', true);
                    this.setAdSkipTimeout(skipTimeout, () => {
                        this.canSkipAd = true;
                    })
                }
                else {
                    toggleClass(this.el, 'is-ad', false);
                }
            });

        })

    },
    placholder() {
        this._player.pause();
        this.dispose();

        // Dzēšam player elementu
        replaceContent(q(this.el, '.video-w'), '');

        toggleClass(this.el, 'is-video', false);
        toggleClass(this.el, 'is-ad', false);
        toggleClass(this.el, 'is-ad-playing', false);
        toggleClass(this.el, 'is-placeholder', true);
    },

    setOriginalSource() {
        if (this.isOriginalSourceSet) {
            return;
        }
        this.isOriginalSourceSet = true;
        this._player.src(this.originalSource)
    },

    setAdNoticeTimeout(timeout, doneCb) {
        runEverySecond(timeout, remainingSeconds => this.refreshSkipAd(remainingSeconds, undefined), doneCb)
    },
    setAdSkipTimeout(timeout, doneCb) {
        runEverySecond(timeout, remainingSeconds => this.refreshSkipAd(undefined, remainingSeconds), doneCb)
    },

    refreshSkipAd(noticeSeconds, skipSeconds) {
        if (skipSeconds) {
            q(this.el, '.skip-ad a').innerHTML = 'Izlaist pēc ' + skipSeconds;
        }
        else if (noticeSeconds) {
            q(this.el, '.skip-ad a').innerHTML = 'Reklāma pēc ' + noticeSeconds;
        }
        else {
            q(this.el, '.skip-ad a').innerHTML = 'Izlaist reklāmu';
        }
    },

    paused() {
        return this._player ? this._player.paused() : true;
    },
    // initializeIma() {



    //     this.adDisplayContainer = new google.ima.AdDisplayContainer(this.adsContainer, <video controls></video>);
    //     this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer);

    //     this.adsLoader.addEventListener(
    //         google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
    //         ev => {

    //             let adsManager = ev.getAdsManager(this.videoEl);

    //             adsManager.addEventListener(
    //                 google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
    //                 () => {
    //                     this.pause();
    //                     addStyle(this.adsContainer, {display:'block'})
    //                     console.log('CONTENT_PAUSE_REQUESTED')
    //                 }
    //             );
    //             adsManager.addEventListener(
    //                 google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
    //                 () => {
    //                     this._play();
    //                     addStyle(this.adsContainer, {display:'none'})
    //                     console.log('CONTENT_RESUME_REQUESTED')
    //                 }
    //             );

    //             this.adDisplayContainer.initialize();

    //             var width = this.videoEl.clientWidth;
    //             var height = this.videoEl.clientHeight;
    //             try {
    //                 adsManager.init(width, height, google.ima.ViewMode.NORMAL);
    //                 adsManager.start();
    //             } catch (adError) {
    //                 // Play the video without ads, if an error occurs
    //                 console.log("AdsManager could not be started");
    //                 videoElement.play();
    //             }

    //         },
    //         false
    //     );
    //     this.adsLoader.addEventListener(
    //         google.ima.AdErrorEvent.Type.AD_ERROR,
    //         ev => {
    //             console.log('ads error');
    //         },
    //         false
    //     );


    //     var adsRequest = new google.ima.AdsRequest();
    //     adsRequest.adTagUrl = this.vastUrl;

    //     // Specify the linear and nonlinear slot sizes. This helps the SDK to
    //     // select the correct creative if multiple are returned.
    //     adsRequest.linearAdSlotWidth = this.videoEl.clientWidth;
    //     adsRequest.linearAdSlotHeight = this.videoEl.clientHeight;
    //     adsRequest.nonLinearAdSlotWidth = this.videoEl.clientWidth;
    //     adsRequest.nonLinearAdSlotHeight = this.videoEl.clientHeight / 3;

    //     // Pass the request to the adsLoader to request ads
    //     this.adsLoader.requestAds(adsRequest);




    // },
    play(ad, volumeLevel, isMuted) {
        this.player();

        this._player.volume(volumeLevel);
        this._player.muted(isMuted);


        //this.initializeIma();

        this.setOriginalSource();
        return this._play();

        // Ja ir padota preroll reklāma, tad tād ir pirmā jānospēlē
        if (ad) {
            // preroll gadījumā nav noticeTimeout
            return this.ad(ad.source, ad.clickUrl, 0, ad.skipTimeout);
        }
        else {
            this.setOriginalSource();
            return this._play()
        }

    },
    /**
     * Mēģinam play, ja nesanāk, tad mēģinām muted
     */
    _play(cb) {
        if (!cb) {
            cb = function(){}
        }

        /**
         * @todo Vajadzētu iekš reāla click vai kāda cita eventa šito palaits
         * bet tagad nebūs autoplay un viss notiek uz click, tāpēc laižam tā pat šeit
         */
        if (!this.isImaContainerInitialized) {
            this.isImaContainerInitialized = true;
            if (this.vastUrl) {
                // console.log('video init ima');
                // this._player.ima({
                //     adTagUrl: this.vastUrl
                // });
                console.log('video initializeAdDisplayContainer');
                this._player.ima.initializeAdDisplayContainer();
            }
        }

        this._player.play()
            .then(() => cb())
            .catch(() => {
                // Mēģinam muted
                if (!this._player.muted()) {
                    this._player.muted(true);
                    this._player.play().then(() => cb());
                }
            });
    },
    pause() {
        return this._player ? this._player.pause() : false
    },
    dispose() {
        this._player.dispose()
        this._player = null;
        this.isOriginalSourceSet = false;
    }
}

export default Player