{
    class Const {
        static TOTAL_LANE_WIDTH = 400
        static LASER_LANE_WIDTH = Const.TOTAL_LANE_WIDTH / 8
        static LASER_WIDTH = Const.LASER_LANE_WIDTH
        static LASER_VERTICAL_HEIGHT = 36
        static LASER_END_HEIGHT = 64
        static LINE_WIDTH = 4
        static SINGLE_LANE_WIDTH = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH * 2) / 4
        static CHIP_BT_WIDTH = Const.SINGLE_LANE_WIDTH - 4
        static LONG_BT_WIDTH = Const.SINGLE_LANE_WIDTH - 16
        static CHIP_FX_WIDTH = Const.SINGLE_LANE_WIDTH * 2 - 4
        static LONG_FX_WIDTH = Const.SINGLE_LANE_WIDTH * 2 - 2
        static CHIP_BT_HEIGHT = 24
        static CHIP_FX_HEIGHT = 24
        static BAR_HEIGHT = 72 * 16
        static MARGIN_HEIGHT_UPPER = Const.BAR_HEIGHT * 1 / 16
        static MARGIN_HEIGHT_LOWER = Const.BAR_HEIGHT * 1 / 16
        static BPM_WIDTH = 80

        static LANE_BT_COLOR = "#000"
        static LANE_VOL_L_COLOR = "rgba(0,127,255,0.2)"
        static LANE_VOL_R_COLOR = "rgba(255,0,127,0.2)"
        static LANE_VOL_L_BORDER_COLOR = "rgb(0,127,255)"
        static LANE_VOL_R_BORDER_COLOR = "rgb(255, 127, 255)"
        static LANE_BT_BORDER_COLOR = "#888"
        static BAR_LINE_COLOR = "#888"
        static VOL_L_COLOR = "rgba(0, 127, 255, 0.6)"
        static VOL_L_BORDER_COLOR = "rgb(0, 255, 255)"
        static VOL_R_COLOR = "rgba(255, 0, 127, 0.6)"
        static VOL_R_BORDER_COLOR = "rgb(255, 127, 255)"
        static VOL_G_COLOR = "rgba(0, 255, 127, 0.6)"
        static VOL_G_BORDER_COLOR = "rgb(127, 255, 127)"
        static VOL_Y_COLOR = "rgba(255, 255, 0, 0.6)"
        static VOL_Y_BORDER_COLOR = "rgb(255, 255, 127)"
        static LONG_FX_COLOR = "rgba(255,102,0,0.8)"
        static LONG_BT_COLOR = "#fff"
        static CHIP_FX_SE_COLOR = "#fa0"
        static CHIP_FX_COLOR = "rgb(255,102,0)"
        static CHIP_BT_COLOR = "#fff"
        static BPM_NORMAL_COLOR = "#fff"
        static BPM_UPPER_COLOR = "#f88"
        static BPM_LOWER_COLOR = "#88f"
        static BPM_FONT = "48px system-ui"

    }

    let offScreenCanvas
    let offScreenHeight;
    let TotalHeight;
    let offScreenWidth;
    let TotalWidth;
    let LowerMargin;
    let StartTiming;
    let BarHeight;
    let VolColors;
    let VolBorderColors;
    let ButtonNames;
    let DeviceNames;

    let offScreenCanvasCache = {}

    class Fraction {
        constructor(...args) {
            this.numerator
            this.denominator
            if (args.length == 1 && typeof args[0] === "string" && /[+-]?\d+\/[+-]?\d+/.test(args[0])) {
                [this.numerator, this.denominator] = args[0].split("/").map((n) => Number(n))
            } else if (args.length == 2 && typeof args[0] === "number" && typeof args[1] === "number") {
                this.numerator = args[0]
                this.denominator = args[1]
            } else if (args.length == 0) {
                this.numerator = 0
                this.denominator = 1
            } else {
                console.error(`${args}は分数に変換できません`)
            }
        }
        toNumber() {
            return this.numerator / this.denominator
        }
        toString() {
            return `${this.numerator}/${this.denominator}`
        }
        static stringToNumber(string) {
            return new Fraction(string).toNumber()
        }
        static Equal(fraction1, fraction2) {
            return Math.round(fraction1.numerator * fraction2.denominator) == Math.round(fraction2.numerator * fraction1.denominator)
        }
        static Add(...fracs) {
            let res = new Fraction(0, fracs.map((f) => f.denominator).reduce((a, b) => Math.round(a * b)))
            fracs.map((f, i, arr) => {
                res.numerator = Math.round(res.numerator + f.numerator * res.denominator / f.denominator)
            })
            return res
        }
        static isFraction(target) {
            return typeof target === "string" && /[+-]?\d+\/[+-]?\d+/.test(target)
        }
        static Max(...fracs) {
            return fracs.reduce((fa, fb) => fa.numerator * fb.denominator > fb.numerator * fa.denominator ? fa : fb)
        }
        static Min(...fracs) {
            return fracs.reduce((fa, fb) => fa.numerator * fb.denominator < fb.numerator * fa.denominator ? fa : fb)
        }
    }

    const split = (array, n) => array.reduce((a, c, i) => i % n == 0 ? [...a, [c]] : [...a.slice(0, -1), [...a[a.length - 1], c]], [])


    const chartChangers = Array.from(document.querySelectorAll(".chartChanger"))
    const charts = document.querySelectorAll("canvas.chartImage")
    charts.forEach((c, i, nl) => {
        showChart(c)
        if ("songName" in c.dataset) {
            const chartChanger = chartChangers.find((cc) => "songName" in cc.dataset && cc.dataset.songName == c.dataset.songName)
            if (chartChanger && "changeEvent" in chartChanger.dataset) {
                chartChanger.addEventListener(chartChanger.dataset.changeEvent, function () {
                    if ("chartParamsRemoving" in c.dataset) {
                        c.dataset.chart = c.dataset.chart.replace(c.dataset.chartParamsRemoving, "")
                    }
                    if ("chartParams" in chartChanger.dataset) {
                        c.dataset.chart += chartChanger.dataset.chartParams
                        c.dataset.chartParamsRemoving = chartChanger.dataset.chartParams
                    }
                    if("chartReplacePattern" in chartChanger.dataset&&"chartReplacement"in chartChanger.dataset){
                        c.dataset.chart = c.dataset.chart.replace(new RegExp(chartChanger.dataset.chartReplacePattern,"g"), chartChanger.dataset.chartReplacement)
                    }
                    c.getContext("2d").clearRect(0, 0, c.width, c.height)
                    clearCache(c.dataset.songName)
                    showChart(c)
                    for (let j = i + 1; j < nl.length; j++) {
                        const afterCanvas = nl.item(j)
                        if (afterCanvas.dataset.chart.includes("PREVIOUS")) {
                            afterCanvas.getContext("2d").clearRect(0, 0, afterCanvas.width, afterCanvas.height)
                            showChart(afterCanvas)
                        } else {
                            break
                        }
                    }
                })
            }
        }
    })



    function showChart(chartCanvas) {
        chartCanvas.width = 0
        chartCanvas.height = 0
        if (chartCanvas.getContext) {
            const objects = chartCanvas.dataset.chart
                .split(";")
                .map((s) => s.trim())
                .filter((s) => s)
                .map((o) => o.split(",")
                    .map((st) => st.trim())
                    .filter((st) => st)
                )
            if (!objects.flatMap(d => d).includes("PREVIOUS")) {
                const random_data = objects.filter((d) => d[0] == "RANDOM").flatMap((d) => split(d.slice(1), 1))
                const speed_data = objects.filter((d) => d[0] == "SPEED").flatMap((d) => split(d.slice(1), 1))
                const color_data = objects.filter((d) => d[0] == "COLOR").flatMap((d) => split(d.slice(1), 2))
                const width_data = objects.filter((d) => d[0] == "WIDTH").flatMap((d) => split(d.slice(1), 1))
                const meter_data = objects.filter((d) => d[0] == "METER").flatMap((d) => split(d.slice(1), 2))
                const meter_pos_data = meter_data.map((d) => d.slice(1))
                const bpm_data = objects.filter((d) => d[0] == "BPM").flatMap((d) => split(d.slice(1), 2))
                const long_data = objects.filter((d) => d[0] == "LONG").flatMap((d) => split(d.slice(1), 3))
                const chip_data = objects.filter((d) => d[0] == "CHIP").flatMap((d) => split(d.slice(1), 2))
                const vol_point_data = objects.filter((d) => d[0] == "VOL").flatMap((d) => split(d.slice(1), 3))
                if (random_data.length > 0 && random_data[0][0].length >= 8) {
                    ButtonNames = {
                        A: random_data[0][0][0],
                        B: random_data[0][0][1],
                        C: random_data[0][0][2],
                        D: random_data[0][0][3],
                        L: random_data[0][0][4],
                        R: random_data[0][0][5],
                    }
                    DeviceNames = {
                        L: random_data[0][0][6],
                        R: random_data[0][0][7],
                    }
                } else {
                    ButtonNames = {
                        A: "A",
                        B: "B",
                        C: "C",
                        D: "D",
                        L: "L",
                        R: "R",
                    }
                    DeviceNames = {
                        L: "L",
                        R: "R",
                    }
                }
                if (speed_data.length > 0 && Number.isFinite(Number(speed_data[0][0]))) {
                    BarHeight = Const.BAR_HEIGHT * Number(speed_data[0][0])
                } else {
                    BarHeight = Const.BAR_HEIGHT
                }
                if (color_data.length > 0 && color_data[0].length >= 2) {
                    VolColors = {
                        L: color_data[0][0] == "B" ? Const.VOL_L_COLOR :
                            color_data[0][0] == "R" ? Const.VOL_R_COLOR :
                                color_data[0][0] == "G" ? Const.VOL_G_COLOR :
                                    color_data[0][0] == "Y" ? Const.VOL_Y_COLOR :
                                        Const.VOL_L_COLOR,
                        R: color_data[0][1] ==
                            "B" ? Const.VOL_L_COLOR :
                            color_data[0][1] == "R" ? Const.VOL_R_COLOR :
                                color_data[0][1] == "G" ? Const.VOL_G_COLOR :
                                    color_data[0][1] == "Y" ? Const.VOL_Y_COLOR :
                                        Const.VOL_R_COLOR,
                    }
                    VolBorderColors = {
                        L: color_data[0][0] ==
                            "B" ? Const.VOL_L_BORDER_COLOR :
                            color_data[0][0] == "R" ? Const.VOL_R_BORDER_COLOR :
                                color_data[0][0] == "G" ? Const.VOL_G_BORDER_COLOR :
                                    color_data[0][0] == "Y" ? Const.VOL_Y_BORDER_COLOR :
                                        Const.VOL_L_BORDER_COLOR,
                        R: color_data[0][1] ==
                            "B" ? Const.VOL_L_BORDER_COLOR :
                            color_data[0][1] == "R" ? Const.VOL_R_BORDER_COLOR :
                                color_data[0][1] == "G" ? Const.VOL_G_BORDER_COLOR :
                                    color_data[0][1] == "Y" ? Const.VOL_Y_BORDER_COLOR :
                                        Const.VOL_R_BORDER_COLOR,
                    }
                } else {
                    VolColors = {
                        L: Const.VOL_L_COLOR,
                        R: Const.VOL_R_COLOR,
                    }
                    VolBorderColors = {
                        L: Const.VOL_L_BORDER_COLOR,
                        R: Const.VOL_R_BORDER_COLOR,
                    }
                }
                let last_pos
                const all_data = [...meter_pos_data, ...bpm_data, ...long_data, ...chip_data, ...vol_point_data]
                last_pos =
                    Fraction.Max(...
                        all_data
                            .flatMap((ds) =>
                                ds.filter((s) => Fraction.isFraction(s))
                                    .map((s) => new Fraction(s))
                            ))
                        .toNumber()
                offScreenHeight = BarHeight * last_pos + Const.MARGIN_HEIGHT_UPPER + Const.MARGIN_HEIGHT_LOWER

                offScreenWidth = Const.TOTAL_LANE_WIDTH * 2
                if (width_data.length > 0) {
                    TotalWidth = Number(width_data[0][0]) * Const.TOTAL_LANE_WIDTH
                } else {
                    const vols_lanes = vol_point_data.map((ds) => Number(ds[2]))
                    const bpm_exists = bpm_data.length > 0
                    TotalWidth =
                        Math.max(
                            Math.max(
                                Math.abs(vols_lanes.reduce((a, b) => Math.max(a, b), 1) - 0.5),
                                Math.abs(vols_lanes.reduce((a, b) => Math.min(a, b), 0) - 0.5),
                                0.5) * 2 * Const.TOTAL_LANE_WIDTH,
                            Const.TOTAL_LANE_WIDTH + Const.BPM_WIDTH * 2 * Number(bpm_exists))
                }
                offScreenCanvas = document.createElement("canvas")
                offScreenCanvas.width = offScreenWidth
                offScreenCanvas.height = offScreenHeight
                if (chartCanvas.dataset.songName in offScreenCanvasCache) {
                    offScreenCanvasCache[chartCanvas.dataset.songName].push(offScreenCanvas)
                } else {
                    offScreenCanvasCache[chartCanvas.dataset.songName] = [offScreenCanvas]
                }
                const offScreenCtx = offScreenCanvas.getContext("2d")

                drawBackground(offScreenCtx, meter_data)

                placeLongs(offScreenCtx, long_data)
                const vol_data = objects.filter((d) => d[0] == "VOL").map((d) => split(d.slice(1), 3))
                placeVols(offScreenCtx, vol_data)
                placeChips(offScreenCtx, chip_data)
                placeBpm(offScreenCtx, bpm_data)

            }
            const range_data = objects.filter((d) => d[0] == "RANGE").flatMap((d) => split(d.slice(1), 2))
            if (range_data.length > 0) {
                StartTiming = Fraction.stringToNumber(range_data[0][0])
                TotalHeight = BarHeight * (Fraction.stringToNumber(range_data[0][1]) - Fraction.stringToNumber(range_data[0][0]))
                LowerMargin = 0
            }
            else {
                StartTiming = 0
                TotalHeight = offScreenHeight
                LowerMargin = Const.MARGIN_HEIGHT_LOWER
            }
            chartCanvas.setAttribute("width", `${TotalWidth}px`);
            chartCanvas.setAttribute("height", `${TotalHeight}px`);
            const ctx = chartCanvas.getContext('2d');
            ctx.drawImage(offScreenCanvas, (chartCanvas.width - offScreenCanvas.width) / 2, chartCanvas.height - offScreenCanvas.height + StartTiming * BarHeight + Const.MARGIN_HEIGHT_LOWER)
        } else {

        }
    }
    function clearCache(songName) {
        offScreenCanvasCache[songName].forEach((c) => {
            c.height = 0
            c.width = 0
            c.remove()
        })
        delete offScreenCanvasCache[songName]
    }

    function setTransform(ctx, forVolL, forVolR) {
        if (forVolL) {
            ctx.setTransform(1, 0, 0, -1, (ctx.canvas.width - Const.TOTAL_LANE_WIDTH) / 2, ctx.canvas.height - Const.MARGIN_HEIGHT_LOWER);
        } else if (forVolR) {
            ctx.setTransform(-1, 0, 0, -1, ctx.canvas.width - (ctx.canvas.width - Const.TOTAL_LANE_WIDTH) / 2, ctx.canvas.height - Const.MARGIN_HEIGHT_LOWER);
        } else {
            ctx.setTransform(1, 0, 0, -1, ctx.canvas.width / 2, ctx.canvas.height - Const.MARGIN_HEIGHT_LOWER);
        }
    }
    function drawBackground(ctx, data) {
        ctx.setTransform(1, 0, 0, -1, (ctx.canvas.width - Const.TOTAL_LANE_WIDTH) / 2, ctx.canvas.height);
        ctx.fillStyle = Const.LANE_BT_COLOR
        ctx.fillRect(0, 0, Const.TOTAL_LANE_WIDTH, ctx.canvas.height)
        ctx.fillStyle = Const.LANE_VOL_L_COLOR
        ctx.fillRect(0, 0, Const.LASER_LANE_WIDTH, ctx.canvas.height)
        ctx.fillStyle = Const.LANE_VOL_R_COLOR
        ctx.fillRect(Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH, 0, Const.LASER_LANE_WIDTH, ctx.canvas.height)
        ctx.lineWidth = Const.LINE_WIDTH
        ctx.strokeStyle = Const.LANE_VOL_L_BORDER_COLOR
        ctx.beginPath()
        ctx.moveTo(Const.LASER_LANE_WIDTH, 0)
        ctx.lineTo(Const.LASER_LANE_WIDTH, ctx.canvas.height)
        ctx.moveTo(0, 0)
        ctx.lineTo(0, ctx.canvas.height)
        ctx.stroke()
        ctx.strokeStyle = Const.LANE_VOL_R_BORDER_COLOR
        ctx.beginPath()
        ctx.moveTo(Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH, 0)
        ctx.lineTo(Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH, ctx.canvas.height)
        ctx.moveTo(Const.TOTAL_LANE_WIDTH, 0)
        ctx.lineTo(Const.TOTAL_LANE_WIDTH, ctx.canvas.height)
        ctx.stroke()
        ctx.strokeStyle = Const.LANE_BT_BORDER_COLOR
        ctx.beginPath()
        ctx.moveTo(Const.LASER_LANE_WIDTH + Const.SINGLE_LANE_WIDTH * 1, 0)
        ctx.lineTo(Const.LASER_LANE_WIDTH + Const.SINGLE_LANE_WIDTH * 1, ctx.canvas.height)
        ctx.moveTo(Const.LASER_LANE_WIDTH + Const.SINGLE_LANE_WIDTH * 2, 0)
        ctx.lineTo(Const.LASER_LANE_WIDTH + Const.SINGLE_LANE_WIDTH * 2, ctx.canvas.height)
        ctx.moveTo(Const.LASER_LANE_WIDTH + Const.SINGLE_LANE_WIDTH * 3, 0)
        ctx.lineTo(Const.LASER_LANE_WIDTH + Const.SINGLE_LANE_WIDTH * 3, ctx.canvas.height)
        ctx.stroke()
        ctx.strokeStyle = Const.BAR_LINE_COLOR
        ctx.setTransform(1, 0, 0, -1, (ctx.canvas.width - Const.TOTAL_LANE_WIDTH) / 2, ctx.canvas.height - Const.MARGIN_HEIGHT_LOWER);
        if (data.length > 0) {
            let currentBarHeight
            let currentPos = new Fraction()
            for (let barLineHeight = 0; barLineHeight < ctx.canvas.height; barLineHeight += currentBarHeight) {
                ctx.beginPath()
                ctx.moveTo(0, barLineHeight)
                ctx.lineTo(Const.TOTAL_LANE_WIDTH, barLineHeight)
                ctx.stroke()
                let targetIndex = data.findIndex(d =>
                    Fraction.Equal(
                        Fraction.Max(new Fraction(d[1]), currentPos),
                        new Fraction(d[1])
                    ) &&
                    !Fraction.Equal(new Fraction(d[1]), currentPos)
                )
                    - 1
                if (targetIndex < 0) {
                    targetIndex = data.length - 1
                }
                const targetData = data[targetIndex]
                const targetPos = new Fraction(targetData[0])


                currentBarHeight = targetPos.toNumber() * BarHeight
                currentPos = Fraction.Add(currentPos, targetPos)
            }

        } else {
            for (let barLineHeight = 0; barLineHeight < ctx.canvas.height; barLineHeight += BarHeight) {
                ctx.beginPath()
                ctx.moveTo(0, barLineHeight)
                ctx.lineTo(Const.TOTAL_LANE_WIDTH, barLineHeight)
                ctx.stroke()
            }

        }
    }
    function placeLongs(ctx, data) {
        data.forEach(d => {
            if (d[0].includes(ButtonNames["L"])) {
                placeLongFX(ctx, "L", Fraction.stringToNumber(d[1]), Fraction.stringToNumber(d[2]))
            }
            if (d[0].includes(ButtonNames["R"])) {
                placeLongFX(ctx, "R", Fraction.stringToNumber(d[1]), Fraction.stringToNumber(d[2]))
            }
        })
        data.forEach(d => {
            if (d[0].includes(ButtonNames["A"])) {
                placeLongBT(ctx, "A", Fraction.stringToNumber(d[1]), Fraction.stringToNumber(d[2]))
            }
            if (d[0].includes(ButtonNames["B"])) {
                placeLongBT(ctx, "B", Fraction.stringToNumber(d[1]), Fraction.stringToNumber(d[2]))
            }
            if (d[0].includes(ButtonNames["C"])) {
                placeLongBT(ctx, "C", Fraction.stringToNumber(d[1]), Fraction.stringToNumber(d[2]))
            }
            if (d[0].includes(ButtonNames["D"])) {
                placeLongBT(ctx, "D", Fraction.stringToNumber(d[1]), Fraction.stringToNumber(d[2]))
            }
        })
    }
    function placeVols(ctx, data) {
        const ctx_orig = ctx
        const osc = document.createElement("canvas")
        osc.width = ctx.canvas.width
        osc.height = ctx.canvas.height
        ctx = osc.getContext("2d")
        ctx.globalCompositeOperation = "lighter"
        ctx.lineWidth = Const.LINE_WIDTH
        data.forEach(point_data => {
            const strokePath = new Path2D()
            const fillPath = new Path2D()
            if (point_data[0][0] != DeviceNames["L"] && point_data[0][0] != DeviceNames["R"]) { console.error("レーザー開始点の情報がありません") }
            let previous
            let previousVerticalStartLane
            point_data.forEach((d => {

                if (d[0] == DeviceNames["L"] || d[0] == DeviceNames["R"]) {
                    const startPos = Fraction.stringToNumber(d[1])
                    const startLane = Number(d[2])

                    const markerStartX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * startLane
                    const markerTopX = markerStartX + Const.LASER_WIDTH / 2
                    const markerEndX = markerStartX + Const.LASER_WIDTH
                    const markerTopY = BarHeight * startPos
                    const markerStartY = markerTopY - 18

                    const startSmallerX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * startLane
                    const startLargerX = startSmallerX + Const.LASER_WIDTH
                    const startY = BarHeight * startPos
                    if (d[0] == DeviceNames["L"]) {
                        setTransform(ctx, true, false);
                        ctx.fillStyle = VolColors["L"]
                        ctx.strokeStyle = VolBorderColors["L"]
                    } else if (d[0] == DeviceNames["R"]) {
                        setTransform(ctx, false, true);
                        ctx.fillStyle = VolColors["R"]
                        ctx.strokeStyle = VolBorderColors["R"]
                    }
                    ctx.beginPath()
                    ctx.moveTo(markerStartX, markerStartY)
                    ctx.lineTo(markerTopX, markerTopY)
                    ctx.lineTo(markerEndX, markerStartY)
                    ctx.moveTo(markerStartX, markerStartY - 12)
                    ctx.lineTo(markerTopX, markerTopY - 12)
                    ctx.lineTo(markerEndX, markerStartY - 12)
                    ctx.moveTo(markerStartX, markerStartY - 24)
                    ctx.lineTo(markerTopX, markerTopY - 24)
                    ctx.lineTo(markerEndX, markerStartY - 24)
                    ctx.stroke()
                    strokePath.moveTo(startSmallerX, startY)
                    strokePath.lineTo(startLargerX, startY)
                }

                else if (d[0] == "VERTICAL") {
                    if (previous[0] == "VERTICAL") { console.error("直角同士が隣接しています") }
                    previousVerticalStartLane = Number(previous[2])
                }
                else if (d[0].slice(0,8) == "STRAIGHT") {
                    let startPosDelay = 0
                    if (previous[0] == "VERTICAL") {

                        const pos = Fraction.stringToNumber(previous[1])
                        const startLane = previousVerticalStartLane
                        const endLane = Number(previous[2])

                        const startX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * startLane + Const.LASER_WIDTH * Number(startLane > endLane)
                        const startLargerX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * startLane + Const.LASER_WIDTH * Number(startLane < endLane)
                        const parallelX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * endLane + Const.LASER_WIDTH * Number(startLane > endLane)
                        const endX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * endLane + Const.LASER_WIDTH * Number(startLane < endLane)
                        const startY = BarHeight * pos
                        const endY = startY + BarHeight / 32
                        const parallelY = startY + Const.LASER_VERTICAL_HEIGHT

                        const path = new Path2D()
                        path.moveTo(startX, startY)
                        path.lineTo(startX, parallelY)
                        path.lineTo(parallelX, parallelY)
                        path.lineTo(parallelX, endY)
                        path.lineTo(endX, endY)
                        path.lineTo(endX, startY)
                        path.closePath()
                        fillPath.addPath(path)
                        strokePath.moveTo(startX, startY)
                        strokePath.lineTo(startX, parallelY)
                        strokePath.lineTo(parallelX, parallelY)
                        strokePath.lineTo(parallelX, endY)
                        strokePath.moveTo(endX, endY)
                        strokePath.lineTo(endX, startY)
                        strokePath.lineTo(startLargerX, startY)
                        startPosDelay = 1 / 32
                    }

                    const startPos = Fraction.stringToNumber(previous[1]) + startPosDelay
                    const endPos = Fraction.stringToNumber(d[1])
                    const startLane = Number(previous[2])
                    const endLane = Number(d[2])

                    const startSmallerX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * startLane
                    const startLargerX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * startLane + Const.LASER_WIDTH
                    const startY = BarHeight * startPos
                    const endSmallerX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * endLane
                    const endLargerX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * endLane + Const.LASER_WIDTH
                    const endY = BarHeight * endPos
                    const path = new Path2D()
                    path.moveTo(startSmallerX, startY)
                    path.lineTo(endSmallerX, endY)
                    path.lineTo(endLargerX, endY)
                    path.lineTo(startLargerX, startY)
                    path.closePath()
                    fillPath.addPath(path)
                    strokePath.moveTo(startSmallerX, startY)
                    strokePath.lineTo(endSmallerX, endY)
                    strokePath.moveTo(endLargerX, endY)
                    strokePath.lineTo(startLargerX, startY)
                }
                else if (d[0].includes("CURVE")) {
                    if (previous[0] == "VERTICAL") {

                        const verticalPos = Fraction.stringToNumber(previous[1])
                        const verticalStartLane = previousVerticalStartLane
                        const verticalEndLane = Number(previous[2])

                        const verticalStartX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * verticalStartLane + Const.LASER_WIDTH * Number(verticalStartLane > verticalEndLane)
                        const verticalStartLargerX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * verticalStartLane + Const.LASER_WIDTH * Number(verticalStartLane < verticalEndLane)
                        const verticalParallelX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * verticalEndLane + Const.LASER_WIDTH * Number(verticalStartLane > verticalEndLane)
                        const verticalEndX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * verticalEndLane + Const.LASER_WIDTH * Number(verticalStartLane < verticalEndLane)
                        const verticalStartY = BarHeight * verticalPos
                        const verticalEndY = verticalStartY + BarHeight / 32
                        const verticalParallelY = verticalStartY + Const.LASER_VERTICAL_HEIGHT

                        const startPos = Fraction.stringToNumber(previous[1])
                        const endPos = Fraction.stringToNumber(d[1])
                        const startLane = Number(previous[2])
                        const endLane = Number(d[2])

                        const startSmallerX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * startLane
                        const startLargerX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * startLane + Const.LASER_WIDTH
                        const startY = BarHeight * startPos
                        const endSmallerX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * endLane
                        const endLargerX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * endLane + Const.LASER_WIDTH
                        const endY = BarHeight * endPos

                        let startCpSmallerX
                        let startCpLargerX
                        let startCpY
                        let endCpSmallerX
                        let endCpLargerX
                        let endCpY
                        if (d[0].includes("INOUT")) {
                            startCpSmallerX = startSmallerX
                            startCpLargerX = startLargerX
                            startCpY = (startY + endY) / 2
                            endCpSmallerX = endSmallerX
                            endCpLargerX = endLargerX
                            endCpY = (startY + endY) / 2
                        } else if (d[0].includes("IN")) {
                            startCpSmallerX = startSmallerX
                            startCpLargerX = startLargerX
                            startCpY = (startY + endY) / 2
                            endCpSmallerX = endSmallerX
                            endCpLargerX = endLargerX
                            endCpY = endY
                        } else if (d[0].includes("OUT")) {
                            startCpSmallerX = startSmallerX
                            startCpLargerX = startLargerX
                            startCpY = startY
                            endCpSmallerX = endSmallerX
                            endCpLargerX = endLargerX
                            endCpY = (startY + endY) / 2
                        } else if (d[0].includes("STRAIGHT")) {
                            startCpSmallerX = startSmallerX
                            startCpLargerX = startLargerX
                            startCpY = startY
                            endCpSmallerX = endSmallerX
                            endCpLargerX = endLargerX
                            endCpY = endY
                        } else {
                            console.error("カーブのタイプ指定が見つかりません")
                        }
                        const curveSmallerPoints = clipCurve([startSmallerX, startY, startCpSmallerX, startCpY, endCpSmallerX, endCpY, endSmallerX, endY], verticalParallelY)
                        const curveLargerPoints = clipCurve([startLargerX, startY, startCpLargerX, startCpY, endCpLargerX, endCpY, endLargerX, endY], verticalParallelY)

                        const path = new Path2D()
                        if (verticalStartLane < verticalEndLane) {
                            path.moveTo(verticalStartX, verticalStartY)
                            path.lineTo(verticalStartX, verticalParallelY)
                            path.lineTo(curveSmallerPoints[0], curveSmallerPoints[1])
                            path.bezierCurveTo(curveSmallerPoints[2], curveSmallerPoints[3], curveSmallerPoints[4], curveSmallerPoints[5], curveSmallerPoints[6], curveSmallerPoints[7])
                            path.lineTo(curveLargerPoints[6], curveLargerPoints[7])
                            path.bezierCurveTo(endCpLargerX, endCpY, startCpLargerX, startCpY, startLargerX, startY)
                            path.lineTo(verticalStartX, verticalStartY)
                        } else {
                            path.moveTo(verticalStartX, verticalStartY)
                            path.lineTo(verticalStartX, verticalParallelY)
                            path.lineTo(curveLargerPoints[0], curveLargerPoints[1])
                            path.bezierCurveTo(curveLargerPoints[2], curveLargerPoints[3], curveLargerPoints[4], curveLargerPoints[5], curveLargerPoints[6], curveLargerPoints[7])
                            path.lineTo(curveSmallerPoints[6], curveSmallerPoints[7])
                            path.bezierCurveTo(endCpSmallerX, endCpY, startCpSmallerX, startCpY, startSmallerX, startY)
                            path.lineTo(verticalStartX, verticalStartY)
                        }
                        path.closePath()
                        fillPath.addPath(path)
                        if (verticalStartLane < verticalEndLane) {
                            strokePath.moveTo(verticalStartX, verticalStartY)
                            strokePath.lineTo(verticalStartX, verticalParallelY)
                            strokePath.lineTo(curveSmallerPoints[0], curveSmallerPoints[1])
                            strokePath.bezierCurveTo(curveSmallerPoints[2], curveSmallerPoints[3], curveSmallerPoints[4], curveSmallerPoints[5], curveSmallerPoints[6], curveSmallerPoints[7])
                            strokePath.moveTo(curveLargerPoints[6], curveLargerPoints[7])
                            strokePath.bezierCurveTo(endCpLargerX, endCpY, startCpLargerX, startCpY, startLargerX, startY)
                            strokePath.lineTo(verticalStartLargerX, verticalStartY)
                        } else {
                            strokePath.moveTo(verticalStartX, verticalStartY)
                            strokePath.lineTo(verticalStartX, verticalParallelY)
                            strokePath.lineTo(curveLargerPoints[0], curveLargerPoints[1])
                            strokePath.bezierCurveTo(curveLargerPoints[2], curveLargerPoints[3], curveLargerPoints[4], curveLargerPoints[5], curveLargerPoints[6], curveLargerPoints[7])
                            strokePath.moveTo(curveSmallerPoints[6], curveSmallerPoints[7])
                            strokePath.bezierCurveTo(endCpSmallerX, endCpY, startCpSmallerX, startCpY, startSmallerX, startY)
                            strokePath.lineTo(verticalStartLargerX, verticalStartY)
                        }
                    } else {
                        const startPos = Fraction.stringToNumber(previous[1])
                        const endPos = Fraction.stringToNumber(d[1])
                        const startLane = Number(previous[2])
                        const endLane = Number(d[2])

                        const startSmallerX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * startLane
                        const startLargerX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * startLane + Const.LASER_WIDTH
                        const startY = BarHeight * startPos
                        const endSmallerX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * endLane
                        const endLargerX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * endLane + Const.LASER_WIDTH
                        const endY = BarHeight * endPos

                        let startCpSmallerX
                        let startCpLargerX
                        let startCpY
                        let endCpSmallerX
                        let endCpLargerX
                        let endCpY
                        if (d[0].includes("INOUT")) {
                            startCpSmallerX = startSmallerX
                            startCpLargerX = startLargerX
                            startCpY = (startY + endY) / 2
                            endCpSmallerX = endSmallerX
                            endCpLargerX = endLargerX
                            endCpY = (startY + endY) / 2
                        } else if (d[0].includes("IN")) {
                            startCpSmallerX = startSmallerX
                            startCpLargerX = startLargerX
                            startCpY = (startY + endY) / 2
                            endCpSmallerX = endSmallerX
                            endCpLargerX = endLargerX
                            endCpY = endY
                        } else if (d[0].includes("OUT")) {
                            startCpSmallerX = startSmallerX
                            startCpLargerX = startLargerX
                            startCpY = startY
                            endCpSmallerX = endSmallerX
                            endCpLargerX = endLargerX
                            endCpY = (startY + endY) / 2
                        } else if (d[0].includes("STRAIGHT")) {
                            startCpSmallerX = startSmallerX
                            startCpLargerX = startLargerX
                            startCpY = startY
                            endCpSmallerX = endSmallerX
                            endCpLargerX = endLargerX
                            endCpY = endY
                        } else {
                            console.error("カーブのタイプ指定が見つかりません")
                        }

                        const path = new Path2D()
                        path.moveTo(startSmallerX, startY)
                        path.bezierCurveTo(startCpSmallerX, startCpY, endCpSmallerX, endCpY, endSmallerX, endY)
                        path.lineTo(endLargerX, endY)
                        path.bezierCurveTo(endCpLargerX, endCpY, startCpLargerX, startCpY, startLargerX, startY)
                        path.closePath()
                        fillPath.addPath(path)
                        strokePath.moveTo(startSmallerX, startY)
                        strokePath.bezierCurveTo(startCpSmallerX, startCpY, endCpSmallerX, endCpY, endSmallerX, endY)
                        strokePath.moveTo(endLargerX, endY)
                        strokePath.bezierCurveTo(endCpLargerX, endCpY, startCpLargerX, startCpY, startLargerX, startY)

                    }
                } else {
                    console.error(`${d[0]}に対応する形状は実装されていません`)
                }
                previous = d
            }))


            if (previous[0] == "VERTICAL") {
                const pos = Fraction.stringToNumber(previous[1])
                const startLane = previousVerticalStartLane
                const endLane = Number(previous[2])

                const startX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * startLane + Const.LASER_WIDTH * Number(startLane > endLane)
                const startLargerX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * startLane + Const.LASER_WIDTH * Number(startLane < endLane)
                const parallelX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * endLane + Const.LASER_WIDTH * Number(startLane > endLane)
                const endX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * endLane + Const.LASER_WIDTH * Number(startLane < endLane)
                const startY = BarHeight * pos
                const endY = startY + Const.LASER_END_HEIGHT
                const parallelY = startY + Const.LASER_VERTICAL_HEIGHT
                const path = new Path2D()
                path.moveTo(startX, startY)
                path.lineTo(startX, parallelY)
                path.lineTo(parallelX, parallelY)
                path.lineTo(parallelX, endY)
                path.lineTo(endX, endY)
                path.lineTo(endX, startY)
                path.closePath()
                fillPath.addPath(path)
                strokePath.moveTo(startX, startY)
                strokePath.lineTo(startX, parallelY)
                strokePath.lineTo(parallelX, parallelY)
                strokePath.lineTo(parallelX, endY)
                strokePath.lineTo(endX, endY)
                strokePath.lineTo(endX, startY)
                strokePath.lineTo(startLargerX, startY)
            } else {
                const endPos = Fraction.stringToNumber(previous[1])
                const endLane = Number(previous[2])
                const endSmallerX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * endLane
                const endLargerX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * endLane + Const.LASER_WIDTH
                const endY = BarHeight * endPos
                strokePath.moveTo(endSmallerX, endY)
                strokePath.lineTo(endLargerX, endY)
            }

            ctx.fill(fillPath)
            ctx.stroke(strokePath)
        })
        ctx_orig.setTransform(1, 0, 0, 1, 0, 0)
        ctx_orig.drawImage(osc, 0, 0)
        ctx = ctx_orig
        osc.width = 0
        osc.height = 0
        osc.remove()
        //delete osc
    }
    function placeChips(ctx, data) {
        const hashOfChipFX = {}
        data.forEach(d => {
            if (d[0].includes(ButtonNames["L"]) && !d[0].includes(ButtonNames["L"] + "SE")) {
                placeChipFX(ctx, "L", Fraction.stringToNumber(d[1]), false)
                const posFraction = new Fraction(d[1])
                let keyExists = false

                Object.keys(hashOfChipFX).forEach(k => {
                    const keyFraction = new Fraction(k)
                    if (Fraction.Equal(keyFraction, posFraction)) {
                        hashOfChipFX[k].concat("L")
                        keyExists = true
                    }
                })
                if (!keyExists) {
                    hashOfChipFX[d[1]] = "L"
                }
            }
            if (d[0].includes(ButtonNames["R"]) && !d[0].includes(ButtonNames["R"] + "SE")) {
                placeChipFX(ctx, "R", Fraction.stringToNumber(d[1]), false)
                const posFraction = new Fraction(d[1])
                let keyExists = false
                Object.keys(hashOfChipFX).forEach(k => {
                    const keyFraction = new Fraction(k)
                    if (Fraction.Equal(keyFraction, posFraction)) {
                        hashOfChipFX[k].concat("R")
                        keyExists = true
                    }
                })
                if (!keyExists) {
                    hashOfChipFX[d[1]] = "R"
                }
            }
            if (d[0].includes(ButtonNames["L"] + "SE")) {
                placeChipFX(ctx, "L", Fraction.stringToNumber(d[1]), true)
                const posFraction = new Fraction(d[1])
                let keyExists = false
                Object.keys(hashOfChipFX).forEach(k => {
                    const keyFraction = new Fraction(k)
                    if (Fraction.Equal(keyFraction, posFraction)) {
                        hashOfChipFX[k].concat("L")
                        keyExists = true
                    }
                })
                if (!keyExists) {
                    hashOfChipFX[d[1]] = "L"
                }
            }
            if (d[0].includes(ButtonNames["R"] + "SE")) {
                placeChipFX(ctx, "R", Fraction.stringToNumber(d[1]), true)
                const posFraction = new Fraction(d[1])
                let keyExists = false
                Object.keys(hashOfChipFX).forEach(k => {
                    const keyFraction = new Fraction(k)
                    if (Fraction.Equal(keyFraction, posFraction)) {
                        hashOfChipFX[k].concat("R")
                        keyExists = true
                    }
                })
                if (!keyExists) {
                    hashOfChipFX[d[1]] = "R"
                }
            }
        })
        data.forEach(d => {
            if (d[0].includes(ButtonNames["A"])) {
                let fxExists = false
                const posFraction = new Fraction(d[1])

                Object.keys(hashOfChipFX).forEach(k => {
                    const keyFraction = new Fraction(k)
                    if (Fraction.Equal(keyFraction, posFraction)) {
                        fxExists = hashOfChipFX[k].includes("L")
                    }
                })
                placeChipBT(ctx, "A", Fraction.stringToNumber(d[1]), fxExists)
            }
            if (d[0].includes(ButtonNames["B"])) {
                let fxExists = false
                const posFraction = new Fraction(d[1])
                Object.keys(hashOfChipFX).forEach(k => {
                    const keyFraction = new Fraction(k)
                    if (Fraction.Equal(keyFraction, posFraction)) {
                        fxExists = hashOfChipFX[k].includes("L")
                    }
                })
                placeChipBT(ctx, "B", Fraction.stringToNumber(d[1]), fxExists)
            }
            if (d[0].includes(ButtonNames["C"])) {
                let fxExists = false
                const posFraction = new Fraction(d[1])
                Object.keys(hashOfChipFX).forEach(k => {
                    const keyFraction = new Fraction(k)
                    if (Fraction.Equal(keyFraction, posFraction)) {
                        fxExists = hashOfChipFX[k].includes("R")
                    }
                })
                placeChipBT(ctx, "C", Fraction.stringToNumber(d[1]), fxExists)
            }
            if (d[0].includes(ButtonNames["D"])) {
                let fxExists = false
                const posFraction = new Fraction(d[1])
                Object.keys(hashOfChipFX).forEach(k => {
                    const keyFraction = new Fraction(k)
                    if (Fraction.Equal(keyFraction, posFraction)) {
                        fxExists = hashOfChipFX[k].includes("R")
                    }
                })
                placeChipBT(ctx, "D", Fraction.stringToNumber(d[1]), fxExists)
            }
        })
    }
    function placeBpm(ctx, data) {

        ctx.font = Const.BPM_FONT
        ctx.textAlign = "right"
        ctx.setTransform(1, 0, 0, 1, (ctx.canvas.width - Const.TOTAL_LANE_WIDTH) / 2, ctx.canvas.height - Const.MARGIN_HEIGHT_LOWER)
        let previousBpm
        data.forEach(d => {
            ctx.fillStyle = previousBpm ? previousBpm > Number(d[0]) ? Const.BPM_LOWER_COLOR : previousBpm < Number(d[0]) ? Const.BPM_UPPER_COLOR : Const.BPM_NORMAL_COLOR : Const.BPM_NORMAL_COLOR
            previousBpm = Number(d[0])
            ctx.fillText(d[0], 0, -BarHeight * Fraction.stringToNumber(d[1]));
        })
    }

    function placeLongFX(ctx, buttonName, startPos, endPos) {
        let fillRect1;
        const fillRect2 = BarHeight * startPos;
        let fillRect3;
        const fillRect4 = BarHeight * (endPos - startPos);
        if (buttonName == "L") {
            fillRect1 = -0
            fillRect3 = -Const.LONG_FX_WIDTH
        } else if (buttonName == "R") {
            fillRect1 = 0
            fillRect3 = Const.LONG_FX_WIDTH
        } else {
            console.error(`FXButtonName "${buttonName}"は存在しません`)
        }
        setTransform(ctx, false, false);
        ctx.fillStyle = Const.LONG_FX_COLOR
        ctx.fillRect(fillRect1, fillRect2, fillRect3, fillRect4)

    }
    function placeLongBT(ctx, buttonName, startPos, endPos) {
        let fillRect1;
        const fillRect2 = BarHeight * startPos;
        let fillRect3;
        const fillRect4 = BarHeight * (endPos - startPos);
        if (buttonName == "A") {
            fillRect1 = -Const.SINGLE_LANE_WIDTH - (Const.SINGLE_LANE_WIDTH - Const.LONG_BT_WIDTH) / 2
            fillRect3 = -Const.LONG_BT_WIDTH
        } else if (buttonName == "B") {
            fillRect1 = -(Const.SINGLE_LANE_WIDTH - Const.LONG_BT_WIDTH) / 2
            fillRect3 = -Const.LONG_BT_WIDTH
        } else if (buttonName == "C") {
            fillRect1 = (Const.SINGLE_LANE_WIDTH - Const.LONG_BT_WIDTH) / 2
            fillRect3 = Const.LONG_BT_WIDTH
        } else if (buttonName == "D") {
            fillRect1 = Const.SINGLE_LANE_WIDTH + (Const.SINGLE_LANE_WIDTH - Const.LONG_BT_WIDTH) / 2
            fillRect3 = Const.LONG_BT_WIDTH
        } else {
            console.error(`BTButtonName "${buttonName}"は存在しません`)
        }
        setTransform(ctx, false, false);
        ctx.fillStyle = Const.LONG_BT_COLOR
        ctx.fillRect(fillRect1, fillRect2, fillRect3, fillRect4)

    }
    function placeChipFX(ctx, buttonName, pos, isSE) {
        setTransform(ctx, false, false);
        let fillRect1;
        const fillRect2 = BarHeight * pos
        let fillRect3;
        const fillRect4 = Const.CHIP_FX_HEIGHT;
        if (buttonName == "L") {
            fillRect1 = -(Const.SINGLE_LANE_WIDTH * 2 - Const.CHIP_FX_WIDTH) / 2
            fillRect3 = -Const.CHIP_FX_WIDTH
        } else if (buttonName == "R") {
            fillRect1 = (Const.SINGLE_LANE_WIDTH * 2 - Const.CHIP_FX_WIDTH) / 2
            fillRect3 = Const.CHIP_FX_WIDTH
        } else {

        }
        if (isSE) {
            ctx.fillStyle = Const.CHIP_FX_SE_COLOR
        } else {
            ctx.fillStyle = Const.CHIP_FX_COLOR
        }
        ctx.fillRect(fillRect1, fillRect2, fillRect3, fillRect4)

    }
    function placeChipBT(ctx, buttonName, pos, onChipFX) {
        setTransform(ctx, false, false);
        let fillRect1;
        const fillRect2 = BarHeight * pos
        let fillRect3;
        const fillRect4 = Const.CHIP_BT_HEIGHT;
        ctx.fillStyle = Const.CHIP_BT_COLOR
        if (buttonName == "A") {
            fillRect1 = -Const.SINGLE_LANE_WIDTH - (Const.SINGLE_LANE_WIDTH - (onChipFX ? Const.LONG_BT_WIDTH : Const.CHIP_BT_WIDTH)) / 2
            fillRect3 = onChipFX ? -Const.LONG_BT_WIDTH : -Const.CHIP_BT_WIDTH
        } else if (buttonName == "B") {
            fillRect1 = -(Const.SINGLE_LANE_WIDTH - (onChipFX ? Const.LONG_BT_WIDTH : Const.CHIP_BT_WIDTH)) / 2
            fillRect3 = onChipFX ? -Const.LONG_BT_WIDTH : -Const.CHIP_BT_WIDTH
        } else if (buttonName == "C") {
            fillRect1 = (Const.SINGLE_LANE_WIDTH - (onChipFX ? Const.LONG_BT_WIDTH : Const.CHIP_BT_WIDTH)) / 2
            fillRect3 = onChipFX ? Const.LONG_BT_WIDTH : Const.CHIP_BT_WIDTH

        } else if (buttonName == "D") {
            fillRect1 = Const.SINGLE_LANE_WIDTH + (Const.SINGLE_LANE_WIDTH - (onChipFX ? Const.LONG_BT_WIDTH : Const.CHIP_BT_WIDTH)) / 2
            fillRect3 = onChipFX ? Const.LONG_BT_WIDTH : Const.CHIP_BT_WIDTH
        }
        ctx.fillRect(fillRect1, fillRect2, fillRect3, fillRect4)

    }

    /**
     * 
     * @param {number[]} curvePoints 
     * @param {number} laserParallelHeight 
     * @returns {number[]}
     */
    function clipCurve(curvePoints, laserParallelHeight) {
        const [startX, startY, startCpX, startCpY, endCpX, endCpY, endX, endY] = curvePoints
        const t = solveEquationForBezierCurve(startY, startCpY, endCpY, endY, laserParallelHeight)
        if (t) {
            const newCurvePoints = clipNewBezierCurve(startX, startY, startCpX, startCpY, endCpX, endCpY, endX, endY, t, 1)
            return newCurvePoints
        }
    }
    function clipNewBezierCurve(x1, y1, x2, y2, x3, y3, x4, y4, t1, t2) {
        const t1p = 1 - t1;
        const t2p = 1 - t2;
        const nx1 = t1p * t1p * t1p * x1 + 3 * t1 * t1p * t1p * x2 + 3 * t1 * t1 * t1p * x3 + t1 * t1 * t1 * x4;
        const ny1 = t1p * t1p * t1p * y1 + 3 * t1 * t1p * t1p * y2 + 3 * t1 * t1 * t1p * y3 + t1 * t1 * t1 * y4;
        const nx2 = t1p * t1p * (t2p * x1 + t2 * x2) + 2 * t1p * t1 * (t2p * x2 + t2 * x3) + t1 * t1 * (t2p * x3 + t2 * x4);
        const ny2 = t1p * t1p * (t2p * y1 + t2 * y2) + 2 * t1p * t1 * (t2p * y2 + t2 * y3) + t1 * t1 * (t2p * y3 + t2 * y4);
        const nx3 = t2p * t2p * (t1p * x1 + t1 * x2) + 2 * t2p * t2 * (t1p * x2 + t1 * x3) + t2 * t2 * (t1p * x3 + t1 * x4);
        const ny3 = t2p * t2p * (t1p * y1 + t1 * y2) + 2 * t2p * t2 * (t1p * y2 + t1 * y3) + t2 * t2 * (t1p * y3 + t1 * y4);
        const nx4 = t2p * t2p * t2p * x1 + 3 * t2 * t2p * t2p * x2 + 3 * t2 * t2 * t2p * x3 + t2 * t2 * t2 * x4;
        const ny4 = t2p * t2p * t2p * y1 + 3 * t2 * t2p * t2p * y2 + 3 * t2 * t2 * t2p * y3 + t2 * t2 * t2 * y4;
        return [
            nx1,
            ny1,
            nx2,
            ny2,
            nx3,
            ny3,
            nx4,
            ny4,]
    }
    function solveEquationForBezierCurve(p1, p2, p3, p4, p) {
        const ap = -p1 + 3 * p2 - 3 * p3 + p4
        const bp = 3 * p1 - 6 * p2 + 3 * p3
        const cp = -3 * p1 + 3 * p2
        const dp = p1 - p
        const pt = solveCubicEquation(ap, bp, cp, dp)
        const targetP = pt.filter((v, i) => i % 2 === 0).map(v => round(v, 10)).sort((a, b) => a < b ? -1 : 1).find(v => 0 <= v && v <= 1)
        return targetP
    }
    function solveCubicEquation(a, b, c, d) {
        const p = c / a - b * b / 3 / a / a;
        const q = 2 * b * b * b / 27 / a / a / a - b * c / 3 / a / a + d / a;
        const d2 = 81 * q * q + 12 * p * p * p;
        let d_r = 0;
        let d_i = 0;
        let v3_r
        let v3_i

        if (d2 < 0) {
            d_i = Math.sqrt(-d2);
        } else {
            d_r = Math.sqrt(d2);
        }
        let u3_r;
        let u3_i
        if (d_i) {
            u3_r = -9 * q / 18;
            u3_i = d_i / 18;
            v3_r = -9 * q / 18;
            v3_i = -d_i / 18;
        } else {
            u3_r = (-9 * q + d_r) / 18;
            u3_i = 0 / 18;
            v3_r = (-9 * q - d_r) / 18;
            v3_i = 0 / 18;
        }
        let u_r;
        let u_i
        if (u3_i) {
            let z = Math.sqrt(u3_r * u3_r + u3_i * u3_i);
            let t = Math.atan2(u3_i, u3_r);
            z = Math.pow(z, 1 / 3);
            t = t / 3;
            u_r = z * Math.cos(t);
            u_i = z * Math.sin(t);
        } else {
            if (u3_r < 0)
                u_r = -Math.pow(-u3_r, 1 / 3);
            else
                u_r = Math.pow(u3_r, 1 / 3);
            u_i = 0;
        }
        let v_r;
        let v_i
        if (v3_i) {
            let z = Math.sqrt(v3_r * v3_r + v3_i * v3_i);
            let t = Math.atan2(v3_i, v3_r);
            z = Math.pow(z, 1 / 3);
            t = t / 3;
            v_r = z * Math.cos(t);
            v_i = z * Math.sin(t);
        } else {
            if (v3_r < 0)
                v_r = -Math.pow(-v3_r, 1 / 3);
            else
                v_r = Math.pow(v3_r, 1 / 3);
            v_i = 0;
        }
        const omega1_r = -0.5;
        const omega1_i = Math.sqrt(3) / 2;
        const omega2_r = -0.5;
        const omega2_i = -Math.sqrt(3) / 2;
        let y1_r, y1_i;
        let y2_r, y2_i;
        let y3_r, y3_i;
        y1_r = u_r + v_r;
        y1_i = u_i + v_i;
        y2_r = omega1_r * u_r - omega1_i * u_i + omega2_r * v_r - omega2_i * v_i;
        y2_i = omega1_i * u_r + omega1_r * u_i + omega2_i * v_r + omega1_r * v_i
        y3_r = omega2_r * u_r - omega2_i * u_i + omega1_r * v_r - omega1_i * v_i;
        y3_i = omega2_i * u_r + omega2_r * u_i + omega1_i * v_r + omega1_r * v_i

        let x1_r, x1_i;
        let x2_r, x2_i;
        let x3_r, x3_i;
        x1_r = y1_r - b / (3 * a);
        x1_i = y1_i;
        x2_r = y2_r - b / (3 * a);
        x2_i = y2_i;
        x3_r = y3_r - b / (3 * a);
        x3_i = y3_i;
        return [x1_r, x1_i, x2_r, x2_i, x3_r, x3_i]
    }
    function round(number, digits) {
        return Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits)
    }
}