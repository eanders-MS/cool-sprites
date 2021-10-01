namespace cool {
    export class Vertex {
        private pos_: Vec2;
        private uv_: Vec2;

        public get pos() { return this.pos_; }
        public set pos(v) { this.pos_.copyFrom(v); }
        public get uv() { return this.uv_; }
        public set uv(v) { this.uv_.copyFrom(v); }

        constructor(pos: Vec2, uv: Vec2, dup = false) {
            this.pos_ = dup ? pos.clone() : pos;
            this.uv_ = dup ? uv.clone() : uv;
        }

        public clone(): Vertex {
            return new Vertex(this.pos, this.uv, true);
        }
    }
}
