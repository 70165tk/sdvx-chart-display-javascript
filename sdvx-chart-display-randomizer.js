{
    const els = Array.from(document.querySelectorAll(".chartRandomizer ul li"))
    const bts = Array.from(document.querySelectorAll(".chartRandomizer .btRandomizer li[data-bt]"))
    bts.forEach((bt, i, arr) => {
        if (bt.dataset.bt == "A") {
            bt.style.order = 0
        } else if (bt.dataset.bt == "B") {
            bt.style.order = 1
        } else if (bt.dataset.bt == "C") {
            bt.style.order = 2
        } else if (bt.dataset.bt == "D") {
            bt.style.order = 3
        }
        addEventToSwapTwoElements(bt, arr, els)
    })
    const fxs = Array.from(document.querySelectorAll(".chartRandomizer .fxRandomizer li[data-fx]"))
    fxs.forEach((fx, i, arr) => {
        if (fx.dataset.fx == "L") {
            fx.style.order = 0
        } else if (fx.dataset.fx == "R") {
            fx.style.order = 1
        }
        addEventToSwapTwoElements(fx, arr, els)
    })
    const vols = Array.from(document.querySelectorAll(".chartRandomizer .volRandomizer li[data-vol]"))
    vols.forEach((vol, i, arr) => {
        if (vol.dataset.vol == "L") {
            vol.style.order = 0
        } else if (vol.dataset.vol == "R") {
            vol.style.order = 1
        }
        addEventToSwapTwoElements(vol, arr, els)
    })

    const chartMirror = document.querySelector(`.chartMirror`)
    if (chartMirror) {
        chartMirror.addEventListener(chartMirror.dataset.changeEvent,async function () {
            if(movingFlag)return;
            for(let el of els){
                delete el.dataset.selected
            }
            const [a, b, c, d, l, r, volL, volR] = [bts.find(b => b.style.order == 0), bts.find(b => b.style.order == 1), bts.find(b => b.style.order == 2), bts.find(b => b.style.order == 3), fxs.find(b => b.style.order == 0), fxs.find(b => b.style.order == 1), vols.find(b => b.style.order == 0), vols.find(b => b.style.order == 1)];
            
            await Promise.all([
                animate([a,b,c,d],[0, 1, 2, 3],[3,2,1,0]),
                animate([l,r],[0, 1],[1,0]),
                animate([volL,volR],[0, 1],[1,0])
            ])
            reflectOrderToChartChanger()
        })
    }
    const chartRandom = document.querySelector(`.chartRandom`)
    if (chartRandom) {
        chartRandom.addEventListener(chartRandom.dataset.changeEvent, async function () {
            if(movingFlag)return;
            for(let el of els){
                delete el.dataset.selected
            }
            const [a, b, c, d, l, r, volL, volR] = [bts.find(b => b.style.order == 0), bts.find(b => b.style.order == 1), bts.find(b => b.style.order == 2), bts.find(b => b.style.order == 3), fxs.find(b => b.style.order == 0), fxs.find(b => b.style.order == 1), vols.find(b => b.style.order == 0), vols.find(b => b.style.order == 1)];
            
            await Promise.all([
                animate([a,b,c,d],[0, 1, 2, 3],shuffle([0, 1, 2, 3])),
                animate([l,r],[0, 1],shuffle([0, 1])),
            ])
            reflectOrderToChartChanger()
        })
    }
    const chartDefault = document.querySelector(`.chartDefault`)
    if (chartDefault) {
        chartDefault.addEventListener(chartDefault.dataset.changeEvent,async function () {
            if(movingFlag)return;
            for(let el of els){
                delete el.dataset.selected
            }
            const [a, b, c, d, l, r, volL, volR] = [bts.find(b => b.style.order == 0), bts.find(b => b.style.order == 1), bts.find(b => b.style.order == 2), bts.find(b => b.style.order == 3), fxs.find(b => b.style.order == 0), fxs.find(b => b.style.order == 1), vols.find(b => b.style.order == 0), vols.find(b => b.style.order == 1)];
            
            await Promise.all([
                animate([a,b,c,d],[0, 1, 2, 3],[a,b,c,d].map(e=>"ABCD".indexOf(e.dataset.bt))),
                animate([l,r],[0, 1],[l,r].map(e=>"LR".indexOf(e.dataset.fx))),
                animate([volL,volR],[0, 1],[volL,volR].map(e=>"LR".indexOf(e.dataset.vol)))
            ])
            reflectOrderToChartChanger()
        })
    }
    const shuffle = ([...array]) => {
        for (let i = array.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    let movingFlag = false;
    function addEventToSwapTwoElements(el, arr, els) {
        el.addEventListener("click", async function () {
            if(movingFlag)return;
            const selectedEl = arr.find(e => "selected" in e.dataset)
            if (selectedEl) {
                if(selectedEl == el){
                    delete selectedEl.dataset.selected
                }else{
                    el.dataset.selected = "selected"
                    await animate([el, selectedEl],[el.style.order, selectedEl.style.order], [selectedEl.style.order, el.style.order]);
                    delete selectedEl.dataset.selected
                    delete el.dataset.selected
                    reflectOrderToChartChanger()
                }
            } else {
                const selectedOtherEl = els.find(e => "selected" in e.dataset)
                if (selectedOtherEl) {
                    delete selectedOtherEl.dataset.selected
                }
                el.dataset.selected = "selected"
            }
        })
    }
    function reflectOrderToChartChanger() {
        const chartChanger = document.querySelector(`.chartChanger`)
        if (chartChanger) {
            const bts = Array.from(document.querySelectorAll(".chartRandomizer .btRandomizer li[data-bt]"))
            const fxs = Array.from(document.querySelectorAll(".chartRandomizer .fxRandomizer li[data-fx]"))
            const vols = Array.from(document.querySelectorAll(".chartRandomizer .volRandomizer li[data-vol]"))
            chartChanger.dataset.chartParams = `RANDOM,` +
                bts.find(b => b.style.order == 0).dataset.bt +
                bts.find(b => b.style.order == 1).dataset.bt +
                bts.find(b => b.style.order == 2).dataset.bt +
                bts.find(b => b.style.order == 3).dataset.bt +
                fxs.find(b => b.style.order == 0).dataset.fx +
                fxs.find(b => b.style.order == 1).dataset.fx +
                vols.find(b => b.style.order == 0).dataset.vol +
                vols.find(b => b.style.order == 1).dataset.vol + `,;`
        }
    }
    async function animate(targets,previousOrder, nextOrder) {
        movingFlag = true;
        for (let [t, i, n] of zip(targets,previousOrder, nextOrder)) {
            if ("bt" in t.dataset || "fx" in t.dataset) {
                t.style.transform = `translate(${100 * (n - i)}%)`
            } else if ("vol" in t.dataset) {
                t.style.transform = `translate(${168 * (n - i)}%)`
            }
            t.style.transition = "transform 0.25s ease-in-out"
        }
        await delay(250);

        for (let [t,n] of zip(targets, nextOrder)) {
            t.style.transform = ""
            t.style.transition = ""
            t.style.order = n
        }
        movingFlag = false;
    }
    const zip = (...arrays) => {
        const length = Math.min(...(arrays.map(arr => arr.length)))
        return new Array(length).fill().map((_, i) => arrays.map(arr => arr[i]))
    }
    function delay(n) {
        return new Promise(function (resolve) {
            setTimeout(resolve, n);
        });
    }
}