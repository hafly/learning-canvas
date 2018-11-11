/**
 * 2D向量
 */
class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    clone() {
        return new this.constructor(this.x, this.y);
    }

    copy(v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    }

    zero() {
        this.x = 0;
        this.y = 0;
        return this;
    }

    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    /**
     *
     * 加另一个向量
     * @param v
     * @returns {Vector2}
     */
    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    /**
     * 两个向量相加
     * @param a
     * @param b
     * @returns {Vector2}
     */
    addVectors(a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        return this;
    }

    /**
     * 加标量
     * @param s
     * @returns {Vector2}
     */
    addScalar(s) {
        this.x += s;
        this.y += s;
        return this;
    }

    sub(v) {
        this.x -= v.x;
        this.xy -= v.y;
        return this;
    }

    subVectors(a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        return this;
    }

    subScalar(s) {
        this.x -= s;
        this.y -= s;
        return this;
    }

    multiply(v) {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }

    multiplyScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    divideVector(v) {
        this.x /= v.x;
        this.y /= v.y;
        return this;
    }

    divideScalar(scalar) {
        return this.multiplyScalar(1 / scalar);
    }

    /**
     * 标准化向量，长度为1
     * @returns {*}
     */
    normalize() {
        return this.divideScalar(this.length() || 1);
    }

    /**
     * 反转向量
     * @returns {Vector2}
     */
    negate() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }

    lengthSq() {
        return this.x * this.x + this.y * this.y;
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    distanceTo(v) {
        let dx = this.x - v.x,
            dy = this.y - v.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    middle(v1, v2) {
        let v = new Vector2();
        v.x = (v1[0] + v2[0]) / 2;
        v.y = (v1[1] + v2[1]) / 2;
        return v;
    }

    /**
     * 点乘 返回结果为浮点数，
     * @param v 向量
     * @returns {number}
     */
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
}

export {Vector2};