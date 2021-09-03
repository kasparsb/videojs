//import { VASTClient, VASTTracker } from 'vast-client';
import PlayersManager from './PlayersManager';
import VideoList from './VideoList';
import findCreative from './vast/findCreative';

function Video(callbacks, isMuted) {
    this.callbacks = callbacks;
    this.adsQueue = [];

    this.ads;
    this.tracker;
    this.client = null;//new VASTClient();


    this.list = new VideoList();
    this.players = new PlayersManager({
        onPlay: () => {
            this.callbacks.onPlay ? this.callbacks.onPlay() : null;
        },
        onPause: () => {
            this.callbacks.onPause ? this.callbacks.onPause() : null;
        },
        onAdPlay: () => {
            this.tracker.trackImpression();
        },
        onAdPlayProgress: (progress) => {
            this.tracker.setProgress(progress);
        }
    }, isMuted);
}

Video.prototype = {
    loadAds(url, cb) {
        this.players.setVastUrl(url);
        return;


        this.vastUrl = url;
        this.client
            .get(url, {
                resolveAll: false
            })
            .then(res => {
                this.ads = res.ads
                let ad = this.getAd();
                if (ad) {
                    this.adsQueue.push(ad)
                }
                if (cb) {
                    cb();
                }
            })
            .catch(err => {
                // Deal with the error
            });
    },
    loadAdsAndPlay(url, el) {
        this.loadAds(url, () => {
            this.play(el);
        })
    },
    getAd() {
        if (this.ads.length > 0) {

            let {creative, mediaFile} = findCreative(this.ads[0]);
            if (creative) {

                this.tracker = new VASTTracker(this.client, this.ads[0], creative);

                return {
                    source: mediaFile,
                    clickUrl: creative.videoClickThroughURLTemplate.url,
                    skipTimeout: creative.skipDelay > 0 ? creative.skipDelay : 0
                }
            }
        }
    },
    nextAd() {
        return this.adsQueue.length > 0 ? this.adsQueue.pop() : null
    },


    add(el) {
        this.list.add(el)
    },
    playFirst() {
        this.players.play(this.list.getFirstVisible(), this.nextAd())
    },
    play(el) {
        this.players.play(el, this.nextAd())
    },
    pause() {
        this.players.pause()
    },
    ad(noticeTimeout) {
        noticeTimeout = typeof noticeTimeout == 'undefined' ? 2 : noticeTimeout;
        let ad = this.getAd();
        if (ad) {
            this.players.ad(undefined, ad.source, ad.clickUrl, noticeTimeout, ad.skipTimeout)
        }
    },
    placeholder() {
        this.players.placeholder()
    }
}

export default Video