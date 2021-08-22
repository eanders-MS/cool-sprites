namespace cool {
    export class Vec3 {
        public get x() { return this.x_; }
        public set x(v) { this.x_ = v; }
        public get y() { return this.y_; }
        public set y(v) { this.y_ = v; }
        public get z() { return this.z_; }
        public set z(v) { this.z_ = v; }
        constructor(
            public x_ = Fx.zeroFx8,
            public y_ = Fx.zeroFx8,
            public z_ = Fx.zeroFx8
        ) { }
        public set(x: Fx8, y: Fx8, z: Fx8): this {
            this.x = x;
            this.y = y;
            this.z = z;
            return this;
        }
        public static ZeroToRef(ref: Vec3): Vec3 {
            return ref.set(Fx.zeroFx8, Fx.zeroFx8, Fx.zeroFx8);
        }
    }
}
