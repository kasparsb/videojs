function VideoList() {
    this.items = [];
    this.visible = [];

    // Izveidojam observer
    this.observer = this.createObserver();
}

VideoList.prototype = {
    createObserver() {
        return new IntersectionObserver(entries => this.observerCheck(entries), {
            root: null,
            rootMargin: '0px',
            threshold: 1
        })
    },
    observerCheck(entries) {
        entries.forEach(e => {
            if (e.isIntersecting) {
                this.addToVisible(e.target)
            }
            else {
                this.removeFromVisible(e.target)
            }
        })
    },
    addToVisible(el) {
        let i = this.visible.findIndex(item => item.el === el);
        if (i < 0) {
            this.visible.push({
                el: el
            });
        }
    },

    removeFromVisible(el) {
        let i = this.visible.findIndex(item => item.el === el);
        if (i >= 0) {
            this.visible.splice(i, 1)
        }
    },

    add(el) {
        this.observer.observe(el)
    },

    getFirstVisible() {
        if (this.visible.length > 0) {

            // this.visible.sort((a, b) => {
            //     if (a.index < b.index) {
            //         return -1;
            //     }
            //     if (a.index > b.index) {
            //         return 1;
            //     }
            //     return 0;
            // })

            return this.visible[0].el
        }

        return null
    }
}

export default VideoList