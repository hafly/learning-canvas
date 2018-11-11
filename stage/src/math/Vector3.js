/**
 * 3D向量
 */
class Vector3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    clone() {
        return new this.constructor(this.x, this.y, this.z);
    }

    copy(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        return this;
    }

    set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }

    addVectors(a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;
        return this;
    }

    addScalar(s) {
        this.x += s;
        this.y += s;
        this.z += s;
        return this;
    }

    subVectors(a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;
        return this;
    }

    subScalar(s) {
        this.x -= s;
        this.y -= s;
        this.z -= s;
        return this;
    }

    multiplyVectors(a, b) {
        this.x = a.x * b.x;
        this.y = a.y * b.y;
        this.z = a.z * b.z;
        return this;
    }

    multiplyScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    }

    divideVector(v) {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
        return this;
    }

    divideScalar(scalar) {
        return this.multiplyScalar(1 / scalar);
    }

    applyMatrix3(m) {
        var x = this.x,
            y = this.y,
            z = this.z;
        var e = m.elements;
        this.x = e[0] * x + e[3] * y + e[6] * z;
        this.y = e[1] * x + e[4] * y + e[7] * z;
        this.z = e[2] * x + e[5] * y + e[8] * z;
        return this;
    }

    applyMatrix4(m) {
        var x = this.x,
            y = this.y,
            z = this.z;
        var e = m.elements;
        var w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
        this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
        this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
        this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;
        return this;
    }

    applyQuaternion(q) {
        var x = this.x,
            y = this.y,
            z = this.z;
        var qx = q.x,
            qy = q.y,
            qz = q.z,
            qw = q.w;
        // calculate quat * vector
        var ix = qw * x + qy * z - qz * y;
        var iy = qw * y + qz * x - qx * z;
        var iz = qw * z + qx * y - qy * x;
        var iw = -qx * x - qy * y - qz * z;
        // calculate result * inverse quat
        this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
        return this;
    }

    transformDirection(m) {
        // input: THREE.Matrix4 affine matrix
        // vector interpreted as a direction
        var x = this.x,
            y = this.y,
            z = this.z;
        var e = m.elements;
        this.x = e[0] * x + e[4] * y + e[8] * z;
        this.y = e[1] * x + e[5] * y + e[9] * z;
        this.z = e[2] * x + e[6] * y + e[10] * z;
        return this.normalize();
    }

    normalize() {
        return this.divideScalar(this.length() || 1);
    }

    negate() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    }

    lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }
}

function Vector3(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
}

Object.assign(Vector3.prototype, {


    manhattanLength: function () {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    },
    normalize: function () {
        return this.divideScalar(this.length() || 1);
    },
    setLength: function (length) {
        return this.normalize().multiplyScalar(length);
    },
    lerp: function (v, alpha) {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        this.z += (v.z - this.z) * alpha;
        return this;
    },
    lerpVectors: function (v1, v2, alpha) {
        return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
    },
    cross: function (v, w) {
        if (w !== undefined) {
            console.warn('THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.');
            return this.crossVectors(v, w);
        }
        return this.crossVectors(this, v);
    },
    crossVectors: function (a, b) {
        var ax = a.x,
            ay = a.y,
            az = a.z;
        var bx = b.x,
            by = b.y,
            bz = b.z;
        this.x = ay * bz - az * by;
        this.y = az * bx - ax * bz;
        this.z = ax * by - ay * bx;
        return this;
    },
    projectOnVector: function (vector) {
        var scalar = vector.dot(this) / vector.lengthSq();
        return this.copy(vector).multiplyScalar(scalar);
    },
    projectOnPlane: function () {
        var v1 = new Vector3();
        return function projectOnPlane(planeNormal) {
            v1.copy(this).projectOnVector(planeNormal);
            return this.sub(v1);
        };
    }(),
    reflect: function () {
        // reflect incident vector off plane orthogonal to normal
        // normal is assumed to have unit length
        var v1 = new Vector3();
        return function reflect(normal) {
            return this.sub(v1.copy(normal).multiplyScalar(2 * this.dot(normal)));
        };
    }(),
    angleTo: function (v) {
        var theta = this.dot(v) / (Math.sqrt(this.lengthSq() * v.lengthSq()));
        // clamp, to handle numerical problems
        return Math.acos(_Math.clamp(theta, -1, 1));
    },
    distanceTo: function (v) {
        return Math.sqrt(this.distanceToSquared(v));
    },
    distanceToSquared: function (v) {
        var dx = this.x - v.x,
            dy = this.y - v.y,
            dz = this.z - v.z;
        return dx * dx + dy * dy + dz * dz;
    },
    manhattanDistanceTo: function (v) {
        return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
    },
    setFromSpherical: function (s) {
        var sinPhiRadius = Math.sin(s.phi) * s.radius;
        this.x = sinPhiRadius * Math.sin(s.theta);
        this.y = Math.cos(s.phi) * s.radius;
        this.z = sinPhiRadius * Math.cos(s.theta);
        return this;
    },
    setFromCylindrical: function (c) {
        this.x = c.radius * Math.sin(c.theta);
        this.y = c.y;
        this.z = c.radius * Math.cos(c.theta);
        return this;
    },
    setFromMatrixPosition: function (m) {
        var e = m.elements;
        this.x = e[12];
        this.y = e[13];
        this.z = e[14];
        return this;
    },
    setFromMatrixScale: function (m) {
        var sx = this.setFromMatrixColumn(m, 0).length();
        var sy = this.setFromMatrixColumn(m, 1).length();
        var sz = this.setFromMatrixColumn(m, 2).length();
        this.x = sx;
        this.y = sy;
        this.z = sz;
        return this;
    },
    setFromMatrixColumn: function (m, index) {
        return this.fromArray(m.elements, index * 4);
    },
    equals: function (v) {
        return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z));
    },
    fromArray: function (array, offset) {
        if (offset === undefined) offset = 0;
        this.x = array[offset];
        this.y = array[offset + 1];
        this.z = array[offset + 2];
        return this;
    },
    toArray: function (array, offset) {
        if (array === undefined) array = [];
        if (offset === undefined) offset = 0;
        array[offset] = this.x;
        array[offset + 1] = this.y;
        array[offset + 2] = this.z;
        return array;
    },
    fromBufferAttribute: function (attribute, index, offset) {
        if (offset !== undefined) {
            console.warn('THREE.Vector3: offset has been removed from .fromBufferAttribute().');
        }
        this.x = attribute.getX(index);
        this.y = attribute.getY(index);
        this.z = attribute.getZ(index);
        return this;
    }
});

export {Vector3};