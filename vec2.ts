namespace cool {
    export class Vec2 {
        public dirty: boolean;
        public readonly: boolean;

        public get x() { return this.x_; }
        public set x(v: Fx8) {
            if (this.readonly) throw "hey";
            this.x_ = v;
            this.dirty = true;
        }
        public get y() { return this.y_; }
        public set y(v: Fx8) {
            if (this.readonly) throw "hey";
            this.y_ = v;
            this.dirty = true;
        }

        public get u() { return this.x_; }
        public set u(n) { this.x = n; }
        public get v() { return this.y_; }
        public set v(n) { this.y = n; }

        constructor(public x_ = Fx.zeroFx8, public y_ = Fx.zeroFx8) {
        }

        public clone(): Vec2 {
            return new Vec2(this.x, this.y);
        }

        public copyFrom(v: Vec2): this {
            this.x = v.x;
            this.y = v.y;
            return this;
        }

        public set(x: Fx8, y: Fx8): this {
            this.x = x;
            this.y = y;
            return this;
        }

        public setF(x: number, y: number): this {
            this.x = Fx8(x);
            this.y = Fx8(y);
            return this;
        }

        public magSq(): Fx8 {
            return Fx.add(Fx.mul(this.x, this.x), Fx.mul(this.y, this.y));
        }

        public magSqF(): number {
            return Fx.toFloat(this.magSq());
        }

        public mag(): Fx8 {
            return Fx8(Math.sqrt(this.magSqF()));
        }

        public floor(): this {
            this.x = fx.floor(this.x);
            this.y = fx.floor(this.y);
            return this;
        }

        public add(v: Vec2): this {
            this.x = Fx.add(this.x, v.x);
            this.y = Fx.add(this.y, v.y);
            return this;
        }

        public invSlope(): Fx8 {
            if (this.y === Fx.zeroFx8) { return Fx.mul(Fx.oneFx8, fx.sign(this.y)); }
            if (this.x === Fx.zeroFx8) { return Fx.zeroFx8; }
            return Fx.div(this.x, this.y);
        }

        public static ZeroToRef(ref: Vec2): Vec2 {
            return ref.set(Fx.zeroFx8, Fx.zeroFx8);
        }

        public static N(x: number, y: number): Vec2 {
            return new Vec2(Fx8(x), Fx8(y));
        }

        public static RotateToRef(v: Vec2, angle: number, ref: Vec2): Vec2 {
            const s = fx.sin(angle);
            const c = fx.cos(angle);
            const xp = Fx.sub(Fx.mul(v.x, c), Fx.mul(v.y, s));
            const yp = Fx.add(Fx.mul(v.x, s), Fx.mul(v.y, c));
            ref.x = xp;
            ref.y = yp;
            return ref;
        }

        public static TranslateToRef(v: Vec2, p: Vec2, ref: Vec2): Vec2 {
            ref.x = Fx.add(v.x, p.x);
            ref.y = Fx.add(v.y, p.y);
            return ref;
        }

        public static ScaleToRef(v: Vec2, scale: Fx8, ref: Vec2): Vec2 {
            ref.x = Fx.mul(v.x, scale);
            ref.y = Fx.mul(v.y, scale);
            return ref;
        }

        public static FloorToRef(v: Vec2, ref: Vec2): Vec2 {
            ref.x = fx.floor(v.x);
            ref.y = fx.floor(v.y);
            return ref;
        }

        public static SetLengthToRef(v: Vec2, len: Fx8, ref: Vec2): Vec2 {
            Vec2.NormalizeToRef(v, ref);
            Vec2.ScaleToRef(ref, len, ref);
            return ref;
        }

        public static NormalizeToRef(v: Vec2, ref: Vec2): Vec2 {
            const lenSq = v.magSqF();
            if (lenSq !== 0) {
                const len = Fx8(Math.sqrt(lenSq));
                ref.x = Fx.div(v.x, len);
                ref.y = Fx.div(v.y, len);
            }
            return ref;
        }

        public static MaxToRef(a: Vec2, b: Vec2, ref: Vec2): Vec2 {
            ref.x = Fx.max(a.x, b.x);
            ref.y = Fx.max(a.y, b.y);
            return ref;
        }

        public static MinToRef(a: Vec2, b: Vec2, ref: Vec2): Vec2 {
            ref.x = Fx.min(a.x, b.x);
            ref.y = Fx.min(a.y, b.y);
            return ref;
        }

        public static SubToRef(a: Vec2, b: Vec2, ref: Vec2): Vec2 {
            ref.x = Fx.sub(a.x, b.x);
            ref.y = Fx.sub(a.y, b.y);
            return ref;
        }

        public static AddToRef(a: Vec2, b: Vec2, ref: Vec2): Vec2 {
            ref.x = Fx.add(a.x, b.x);
            ref.y = Fx.add(a.y, b.y);
            return ref;
        }

        public static MulToRef(a: Vec2, b: Vec2, ref: Vec2): Vec2 {
            ref.x = Fx.mul(a.x, b.x);
            ref.y = Fx.mul(a.y, b.y);
            return ref;
        }

        public static DivToRef(a: Vec2, b: Vec2, ref: Vec2): Vec2 {
            ref.x = b.x !== Fx.zeroFx8 ? Fx.div(a.x, b.x) : Fx.zeroFx8;
            ref.y = b.y !== Fx.zeroFx8 ? Fx.div(a.y, b.y) : Fx.zeroFx8;
            return ref;
        }

        public static AbsToRef(v: Vec2, ref: Vec2): Vec2 {
            ref.x = Fx.abs(v.x);
            ref.y = Fx.abs(v.y);
            return ref;
        }

        public static InvToRef(s: Fx8, v: Vec2, ref: Vec2): Vec2 {
            ref.x = v.x !== Fx.zeroFx8 ? Fx.div(s, v.x) : Fx.zeroFx8;
            ref.y = v.y !== Fx.zeroFx8 ? Fx.div(s, v.y) : Fx.zeroFx8;
            return ref;
        }

        public static SignToRef(v: Vec2, ref: Vec2): Vec2 {
            ref.x = fx.sign(v.x);
            ref.y = fx.sign(v.y);
            return ref;
        }

        public static SignumToRef(v: Vec2, ref: Vec2): Vec2 {
            ref.x = fx.signum(v.x);
            ref.y = fx.signum(v.y);
            return ref;
        }

        public static RandomRangeToRef(xmin: Fx8, xmax: Fx8, ymin: Fx8, ymax: Fx8, ref: Vec2): Vec2 {
            ref.x = fx.randomRange(xmin, xmax);
            ref.y = fx.randomRange(ymin, ymax);
            return ref;
        }

        public static Dot(a: Vec2, b: Vec2): Fx8 {
            return Fx.add(
                Fx.mul(a.x, b.y),
                Fx.mul(a.y, b.x));
        }

        public static Edge(a: Vec2, b: Vec2, c: Vec2): Fx8 {
            // ((c.x - a.x) * (b.y - a.y) - (c.y - a.y) * (b.x - a.x)
            return Fx.sub(
                Fx.mul(
                    Fx.sub(c.x, a.x),
                    Fx.sub(b.y, a.y)),
                Fx.mul(
                    Fx.sub(c.y, a.y),
                    Fx.sub(b.x, a.x)));
        }

        public static MinOfToRef(arr: Vec2[], ref: Vec2): Vec2 {
            ref.x = Fx8(10000);
            ref.y = Fx8(10000);
            for (const v of arr) {
                if (v.x < ref.x) { ref.x = v.x; }
                if (v.y < ref.y) { ref.y = v.y; }
            }
            return ref;
        }

        public static MaxOfToRef(arr: Vec2[], ref: Vec2): Vec2 {
            ref.x = Fx8(-10000);
            ref.y = Fx8(-10000);
            for (const v of arr) {
                if (v.x > ref.x) { ref.x = v.x; }
                if (v.y > ref.y) { ref.y = v.y; }
            }
            return ref;
        }
    }
}
