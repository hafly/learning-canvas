/**
 * canvas线条
 */
function Line(lineWidth, color, lineCap) {
    this.lineWidth = lineWidth;
    this.color = color || '#000';
    this.lineCap = lineCap || 'butt';   //butt,round,square
}

Object.assign(Line.prototype, {
    setColor: function (color) {
        this.color = color;
    },
    draw: function (p1, p2, ctx) {
        ctx.beginPath();
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color;
        ctx.lineCap = this.lineCap;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
    }
});

export {Line};