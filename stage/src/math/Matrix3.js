/**
 * 3x3矩阵操作类 对应context.transform(a,b,c,d,e,f);详细参考http://blog.vr-seesee.com/detail/173
 * a c e
 * b d f
 * 0 0 1
 * a水平缩放 c垂直倾斜 e水平移动
 * b水平倾斜 d垂直缩放 f垂直移动
 *
 * 注意：如果同缩放、旋转和位移，需要先缩放再旋转再位移
 */
class Matrix3 {
    constructor() {
        this.isMatrix3 = true;
        this.elements = [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
       ]
    }

    // 重置
    identity() {
        this.set(
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        );
        return this;
    }

    clone() {
        return new this.constructor(this.elements)
    }

    copy(m) {
        var te = this.elements;
        var me = m.elements;

        te[ 0 ] = me[ 0 ]; te[ 1 ] = me[ 1 ]; te[ 2 ] = me[ 2 ];
        te[ 3 ] = me[ 3 ]; te[ 4 ] = me[ 4 ]; te[ 5 ] = me[ 5 ];
        te[ 6 ] = me[ 6 ]; te[ 7 ] = me[ 7 ]; te[ 8 ] = me[ 8 ];

        return this;
    }

    set(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
        var te = this.elements;

        te[0] = n11; te[1] = n21; te[2] = n31;
        te[3] = n12; te[4] = n22; te[5] = n32;
        te[6] = n13; te[7] = n23; te[8] = n33;

        return this;
    }

    /**
     * 两矩阵相乘
     * @param a 矩阵a
     * @param b 矩阵b
     * @returns {Matrix3}
     */
    multiplyMatrices(a, b) {
        var ae = a.elements;
        var be = b.elements;
        var te = this.elements;

        var a11 = ae[0], a12 = ae[3], a13 = ae[6];
        var a21 = ae[1], a22 = ae[4], a23 = ae[7];
        var a31 = ae[2], a32 = ae[5], a33 = ae[8];

        var b11 = be[0], b12 = be[3], b13 = be[6];
        var b21 = be[1], b22 = be[4], b23 = be[7];
        var b31 = be[2], b32 = be[5], b33 = be[8];

        te[0] = a11 * b11 + a12 * b21 + a13 * b31;
        te[3] = a11 * b12 + a12 * b22 + a13 * b32;
        te[6] = a11 * b13 + a12 * b23 + a13 * b33;

        te[1] = a21 * b11 + a22 * b21 + a23 * b31;
        te[4] = a21 * b12 + a22 * b22 + a23 * b32;
        te[7] = a21 * b13 + a22 * b23 + a23 * b33;

        te[2] = a31 * b11 + a32 * b21 + a33 * b31;
        te[5] = a31 * b12 + a32 * b22 + a33 * b32;
        te[8] = a31 * b13 + a32 * b23 + a33 * b33;

        return this;
    }

    /**
     * 矩阵左乘向量
     * @param s 矩阵
     * @returns {Matrix3}
     */
    multiplyScalar(s) {
        var te = this.elements;

        te[0] *= s; te[3] *= s; te[6] *= s;
        te[1] *= s; te[4] *= s; te[7] *= s;
        te[2] *= s; te[5] *= s; te[8] *= s;

        return this;
    }

    /**
     * 缩放
     * @param sx 水平缩放
     * @param sy 垂直缩放
     * @returns {Matrix3}
     */
    scale(sx, sy) {
        var te = this.elements;

        te[0] *= sx; te[3] *= sx; te[6] *= sx;
        te[1] *= sy; te[4] *= sy; te[7] *= sy;

        return this;
    }

    /**
     * 旋转
     * @param theta 旋转弧度
     * @returns {Matrix3}
     */
    rotate(theta) {
        var c = Math.cos(theta);
        var s = Math.sin(theta);

        var te = this.elements;

        var a11 = te[0], a12 = te[3], a13 = te[6];
        var a21 = te[1], a22 = te[4], a23 = te[7];

        te[0] = c * a11 + s * a21;
        te[3] = c * a12 + s * a22;
        te[6] = c * a13 + s * a23;

        te[1] = -s * a11 + c * a21;
        te[4] = -s * a12 + c * a22;
        te[7] = -s * a13 + c * a23;

        return this;
    }

    /**
     * 移动
     * @param tx 水平移动
     * @param ty 垂直移动
     * @returns {Matrix3}
     */
    translate(tx, ty) {
        var te = this.elements;

        te[0] += tx * te[2]; te[3] += tx * te[5]; te[6] += tx * te[8];
        te[1] += ty * te[2]; te[4] += ty * te[5]; te[7] += ty * te[8];

        return this;
    }

    equals(matrix) {
        var te = this.elements;
        var me = matrix.elements;

        for (var i = 0; i < 9; i++) {
            if (te[i] !== me[i]) return false;
        }

        return true;
    }
}

export {Matrix3};