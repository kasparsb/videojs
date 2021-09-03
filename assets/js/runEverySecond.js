export default function(timeoutSeconds, stepCb, doneCb) {
    if (timeoutSeconds > 0) {

        stepCb(timeoutSeconds);

        let t = setInterval(() => {
            stepCb(--timeoutSeconds);

            if (timeoutSeconds <= 0) {
                clearInterval(t);
                doneCb();
            }

        }, 1000)
    }
    else {
        setTimeout(() => doneCb(), 0);
    }
}