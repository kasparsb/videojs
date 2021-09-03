import q from 'dom-helpers/src/q';
import qa from 'dom-helpers/src/qa';
import clickp from 'dom-helpers/src/event/clickp';
import on from 'dom-helpers/src/event/on';

import Video from './Video';

export default Video;







//let vu = 'https://pubads.g.doubleclick.net/gampad/ads?iu=/22037990743/preroll_test&description_url=[placeholder]&tfcd=0&npa=0&sz=640x480&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=';
//let vu = 'https://videoapi.smartadserver.com/ac?siteid=284621&pgid=1414957&fmtid=73414&ab=1&tgt=&oc=1&out=vast3&ps=1&pb=0&visit=S&vcn=s&vph=480&vpw=640&vpmt=2&skip=&mabd=20&ctd=30&tmstp=';
// let vu = 'https://pubads.g.doubleclick.net/gampad/ads?' +
//       'sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&' +
//       'impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&' +
//       'cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator=';
let vu = 'https://pubads.g.doubleclick.net/gampad/ads?iu=/22037990743/preroll_video&description_url=[description_url]&url=[description_url]&tfcd=0&npa=0&sz=640x360&ciu_szs=728x90%2C480x320%2C468x60&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=';


function getVastUrl() {
    return vu.replace(/\[description_url\]/g, encodeURIComponent('https://www.la.lv/video24'))
}

//let played = 0;
let VideoManeger = new Video({
    // onPlay: () => {
    //     if (++played >= 2) {
    //         // Play ad
    //         played = 0;

    //         VideoManeger.loadAds(getVastUrl())
    //     }
    // }
});

VideoManeger.loadAds(getVastUrl())
clickp('.video.is-placeholder', (ev, el) => VideoManeger.play(el))


qa('.video').forEach(block => VideoManeger.add(block))


// let t = 0;
// on(window, 'scroll', ev => {
//     clearTimeout(t);
//     t = setTimeout(() => {

//         VideoManeger.playFirst()

//     }, 50)
// })

clickp('[name=play]', () => VideoManeger.play())
clickp('[name=pause]', () => VideoManeger.pause())
clickp('[name=placeholder]', () => VideoManeger.placeholder())
clickp('[name=ad]', () => VideoManeger.ad())