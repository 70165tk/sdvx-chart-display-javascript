//@ts-check
{  
    /**
     * @type {HTMLElement[]}
     */
    const els = Array.from(document.querySelectorAll(".chartRandomizer ul li"))
    /**
     * @type {HTMLElement[]}
     */
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
        addEventToSwapTwoElements(bt,arr, els)
    })
    const fxs = Array.from(document.querySelectorAll(".chartRandomizer .fxRandomizer li[data-fx]"))
    fxs.forEach((fx, i, arr) => {
        if (fx.dataset.fx == "L") {
            fx.style.order = 0
        } else if (fx.dataset.fx == "R") {
            fx.style.order = 1
        } 
        addEventToSwapTwoElements(fx,arr, els)
    })
    const vols = Array.from(document.querySelectorAll(".chartRandomizer .volRandomizer li[data-vol]"))
    vols.forEach((vol, i, arr) => {
        if (vol.dataset.vol == "L") {
            vol.style.order = 0
        } else if (vol.dataset.vol == "R") {
            vol.style.order = 1
        }
        addEventToSwapTwoElements(vol,arr, els)
    })
    /**
     * 
     * @param {HTMLElement} el 
     * @param {HTMLElement[]} arr 
     * @param {HTMLElement[]} els 
     */
    function addEventToSwapTwoElements(el, arr, els){
        el.addEventListener("click", function(){
            const selectedEl = arr.find(e => "selected" in e.dataset)
            if(selectedEl){
                [el.style.order, selectedEl.style.order] = [selectedEl.style.order,el.style.order]
                delete selectedEl.dataset.selected
                const chartChanger = document.querySelector(`.chartChanger`)
                if(chartChanger){
                    const bts = Array.from(document.querySelectorAll(".chartRandomizer .btRandomizer li[data-bt]"))
                    const fxs = Array.from(document.querySelectorAll(".chartRandomizer .fxRandomizer li[data-fx]"))
                    const vols = Array.from(document.querySelectorAll(".chartRandomizer .volRandomizer li[data-vol]"))
                    chartChanger.dataset.chartParams=`RANDOM,`+
                    bts.find(b=>b.style.order==0).dataset.bt+
                    bts.find(b=>b.style.order==1).dataset.bt+
                    bts.find(b=>b.style.order==2).dataset.bt+
                    bts.find(b=>b.style.order==3).dataset.bt+
                    fxs.find(b=>b.style.order==0).dataset.fx+
                    fxs.find(b=>b.style.order==1).dataset.fx+
                    vols.find(b=>b.style.order==0).dataset.vol+
                    vols.find(b=>b.style.order==1).dataset.vol+`,;`
                }
            }else{
                const selectedOtherEl = els.find(e => "selected" in e.dataset)
                if(selectedOtherEl){
                    delete selectedOtherEl.dataset.selected
                }
                el.dataset.selected = "selected"
            }
        })
    }
}