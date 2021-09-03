<?php
// Read package version so we can include built js and css
$pkg = json_decode(file_get_contents('package.json'));
$version = $pkg->version;
$items = [
    (object)[
        'thumbnail' => 'https://store.cloudycdn.services/tmsp00156/assets/media/314037/placeholder.jpg',
        'hls' => 'https://tv242156.cloudycdn.services/store/_definst_/tmsp00156/vod/00/06/314037/jou_1703_novad_513971.smil/playlist.m3u8',
    ],
    (object)[
        'thumbnail' => 'https://store.cloudycdn.services/tmsp00156/assets/media/314039/placeholder.jpg',
        'hls' => 'https://tv242156.cloudycdn.services/store/_definst_/tmsp00156/vod/00/06/314039/d4t_2203_velta_513995.smil/playlist.m3u8',
    ],
    (object)[
        'thumbnail' => 'https://store.cloudycdn.services/tmsp00156/assets/media/314090/placeholder.jpg',
        'hls' => 'https://tv242156.cloudycdn.services/store/_definst_/tmsp00156/vod/00/06/314090/x9k_2203_BZ_Pa_514076.smil/playlist.m3u8',
    ],
    (object)[
        'thumbnail' => 'https://store.cloudycdn.services/tmsp00156/assets/media/314115/placeholder.jpg',
        'hls' => 'https://tv242156.cloudycdn.services/store/_definst_/tmsp00156/vod/00/06/314115/7z2_2203_velta_514179.smil/playlist.m3u8',
    ],
    (object)[
        'thumbnail' => 'https://store.cloudycdn.services/tmsp00156/assets/media/314116/placeholder.jpg',
        'hls' => 'https://tv242156.cloudycdn.services/store/_definst_/tmsp00156/vod/00/06/314116/j99_2203_velta_514190.smil/playlist.m3u8',
    ],
    (object)[
        'thumbnail' => 'https://store.cloudycdn.services/tmsp00156/assets/media/314120/placeholder.jpg',
        'hls' => 'https://tv242156.cloudycdn.services/store/_definst_/tmsp00156/vod/00/06/314120/h2o_2403_novad_514196.smil/playlist.m3u8',
    ],
    (object)[
        'thumbnail' => 'https://store.cloudycdn.services/tmsp00156/assets/media/314121/placeholder.jpg',
        'hls' => 'https://tv242156.cloudycdn.services/store/_definst_/tmsp00156/vod/00/06/314121/8eh_2203_TOP5__514189.smil/playlist.m3u8',
    ],
    (object)[
        'thumbnail' => 'https://store.cloudycdn.services/tmsp00156/assets/media/314123/placeholder.jpg',
        'hls' => 'https://tv242156.cloudycdn.services/store/_definst_/tmsp00156/vod/00/06/314123/mcy_2403_novad.smil/playlist.m3u8',
    ],
    (object)[
        'thumbnail' => 'https://store.cloudycdn.services/tmsp00156/assets/media/314133/placeholder.jpg',
        'hls' => 'https://tv242156.cloudycdn.services/store/_definst_/tmsp00156/vod/00/06/314133/jm8_2203_speci_514238.smil/playlist.m3u8',
    ],
    (object)[
        'thumbnail' => 'https://store.cloudycdn.services/tmsp00156/assets/media/314141/placeholder.jpg',
        'hls' => 'https://tv242156.cloudycdn.services/store/_definst_/tmsp00156/vod/00/06/314141/5rt_2203_top5_514271.smil/playlist.m3u8',
    ],
    (object)[
        'thumbnail' => 'https://store.cloudycdn.services/tmsp00156/assets/media/314142/placeholder.jpg',
        'hls' => 'https://tv242156.cloudycdn.services/store/_definst_/tmsp00156/vod/00/06/314142/b8k_2203_strei_514269.smil/playlist.m3u8',
    ],
    (object)[
        'thumbnail' => 'https://store.cloudycdn.services/tmsp00156/assets/media/314146/placeholder.jpg',
        'hls' => 'https://tv242156.cloudycdn.services/store/_definst_/tmsp00156/vod/00/06/314146/dxy_2203_pk_1_514286.smil/playlist.m3u8',
    ],
    (object)[
        'thumbnail' => 'https://store.cloudycdn.services/tmsp00156/assets/media/314150/placeholder.jpg',
        'hls' => 'https://tv242156.cloudycdn.services/store/_definst_/tmsp00156/vod/00/06/314150/vsn_2203_pk_2_514297.smil/playlist.m3u8',
    ],
    (object)[
        'thumbnail' => 'https://store.cloudycdn.services/tmsp00156/assets/media/314157/placeholder.jpg',
        'hls' => 'https://tv242156.cloudycdn.services/store/_definst_/tmsp00156/vod/00/06/314157/3h8_2203_pk_3_514322.smil/playlist.m3u8',
    ],
    (object)[
        'thumbnail' => 'https://store.cloudycdn.services/tmsp00156/assets/media/314165/placeholder.jpg',
        'hls' => 'https://tv242156.cloudycdn.services/store/_definst_/tmsp00156/vod/00/06/314165/8pt_2203_uzlin_514382.smil/playlist.m3u8',
    ],
    (object)[
        'thumbnail' => 'https://store.cloudycdn.services/tmsp00156/assets/media/314176/placeholder.jpg',
        'hls' => 'https://tv242156.cloudycdn.services/store/_definst_/tmsp00156/vod/00/06/314176/7sb_2203_kr_1_514384.smil/playlist.m3u8',
    ],
    (object)[
        'thumbnail' => 'https://store.cloudycdn.services/tmsp00156/assets/media/314181/placeholder.jpg',
        'hls' => 'https://tv242156.cloudycdn.services/store/_definst_/tmsp00156/vod/00/06/314181/sh2_2203_kr_2_514383.smil/playlist.m3u8',
    ],
    (object)[
        'thumbnail' => 'https://store.cloudycdn.services/tmsp00156/assets/media/314192/placeholder.jpg',
        'hls' => 'https://tv242156.cloudycdn.services/store/_definst_/tmsp00156/vod/00/06/314192/3eh_2203_kr_3_514403.smil/playlist.m3u8',
    ],
    (object)[
        'thumbnail' => 'https://store.cloudycdn.services/tmsp00156/assets/media/314223/placeholder.jpg',
        'hls' => 'https://tv242156.cloudycdn.services/store/_definst_/tmsp00156/vod/00/06/314223/52o_2203_speci_514654.smil/playlist.m3u8',
    ],
    (object)[
        'thumbnail' => 'https://store.cloudycdn.services/tmsp00156/assets/media/314229/placeholder.jpg',
        'hls' => 'https://tv242156.cloudycdn.services/store/_definst_/tmsp00156/vod/00/06/314229/wiq_2303_FNL_B_514676.smil/playlist.m3u8',
    ],
];
?><!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0">
    <title>LA Video 24</title>
    <!--link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.0.0/video-js.css" type='text/css' media='all' /-->
    <link rel="stylesheet" href="build/app.min-<?php echo $version ?>.css" type='text/css' media='all' />
    <style>
    .app {
        max-width: 700px;
        margin: 40px auto 0;
    }
    .video {
        margin-top: 192px;
    }
    </style>
</head>
<body>

    <button name="destroy">Destroy</button>

    <div class="app">
        <?php
        $i = 0;
        foreach ($items as $item): ?>

        <div class="video is-placeholder" data-hls="<?php echo $item->hls ?>" data-index="<?php echo $i++ ?>">

            <div class="placeholder">
                <div class="image">
                    <img src="<?php echo $item->thumbnail ?>" />
                </div>
                <span class="play"></span>
            </div>

            <div class="video-w">

                <!--video controls preload="none" playsinline class="video-js vjs-default-skin"></video-->

            </div>

            <a href="" class="ad-click" target="_blank"></a>
            <div class="skip-ad">
                <a>Izlaist reklāmu</a>
            </div>
        </div>

        <?php
        if ($i > 0) {
            //break;
        }
        ?>
        <?php endforeach ?>

        <div style="background: silver;position:fixed;top:0;left:0;padding:4px">
            <button name="play">Play</button>
            <button name="pause">Pause</button>
            <button name="placeholder">Placeholder</button>
            <button name="ad">Ad</button>
        </div>
    </div>

    <script src="//imasdk.googleapis.com/js/sdkloader/ima3.js"></script>
    <script src="build/app.min-<?php echo $version ?>.js"></script>
</body>
</html>