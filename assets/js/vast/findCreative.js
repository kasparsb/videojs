
/**
 * Tikai šie formāti, jo ir tāds formāts 3gpp, bet tam nez kāpēc ir tika skaņa
 */
function isAllowedMimeType(type) {
    switch (type) {
        case 'video/mp4': return true;
        case 'video/webm': return true;
        case 'application/x-mpegURL': return true;
    }
    return false;
}

export default function(ad) {
    // Ņemam tikai linear. Pēc idejas tie ir video reklāmas, kuras ir jāspēlē pirms video
    let item = ad.creatives.find(c => c.type == 'linear');

    return {
        creative: item,
        mediaFile: item.mediaFiles
            .filter(file => isAllowedMimeType(file.mimeType))
            // Atgriežam tikai src un type priekš uzreiz lietošanas videojs.src
            .map(file => ({
                src: file.fileURL,
                type: file.mimeType
            }))
    }
}