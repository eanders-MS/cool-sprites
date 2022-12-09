namespace cool {
    const SCREEN_HALF_WIDTH = screen.width >> 1;
    const SCREEN_HALF_HEIGHT = screen.height >> 1;

    export class Sprite extends scene.Renderable {
        private xfrm_: Transform;
        private src_: Vertex[]; // const
        private verts_: Vertex[];

        public get xfrm() { return this.xfrm_; }
        public get verts() { return this.verts_; }

        constructor(private img: Image, z: number = scene.SPRITE_Z) {
            super(
                (_1, _2) => { },
                () => true,
                z);
            this.xfrm_ = new Transform();
            this.setImage(img);
        }

        public setImage(img: Image, u0: number = 0, u1: number = 1, v0: number = 0, v1: number = 1) {
            this.img = img;
            const w2 = Fx8(img.width / 2);
            const h2 = Fx8(img.height / 2);
            // Vertices in clockwise order
            this.src_ = [
                new Vertex(new Vec2(Fx.neg(w2), Fx.neg(h2)), new Vec2(Fx8(u0), Fx8(v0))),
                new Vertex(new Vec2(w2, Fx.neg(h2)), new Vec2(Fx8(u1), Fx8(v0))),
                new Vertex(new Vec2(w2, h2), new Vec2(Fx8(u1), Fx8(v1))),
                new Vertex(new Vec2(Fx.neg(w2), h2), new Vec2(Fx8(u0), Fx8(v1)))
            ];
            this.verts_ = this.src_.map(v => v.clone());
        }

        public setUV(u0: number, u1: number, v0: number, v1: number) {
            this.src_[0].uv = new Vec2(Fx8(u0), Fx8(v0));
            this.src_[1].uv = new Vec2(Fx8(u1), Fx8(v0));
            this.src_[2].uv = new Vec2(Fx8(u1), Fx8(v1));
            this.src_[3].uv = new Vec2(Fx8(u0), Fx8(v1));
            this.verts_ = this.src_.map(v => v.clone());
        }

        __update(camera: scene.Camera, _2: any) {
            for (let i = 0; i < this.src_.length; ++i) {
                this.xfrm_.transformToRef(this.src_[i].pos, this.verts_[i].pos);
                this.verts_[i].pos.x = Fx.iadd(camera.drawOffsetX + SCREEN_HALF_WIDTH, this.verts_[i].pos.x);
                this.verts_[i].pos.y = Fx.iadd(camera.drawOffsetY + SCREEN_HALF_HEIGHT, this.verts_[i].pos.y);
            }
        }

        __drawCore(_1: any) {
            gpu.drawTexturedQuad(
                screen,
                this.img,
                this.verts[0].pos.x as any as number,
                this.verts[0].pos.y as any as number,
                this.verts[0].uv.x as any as number,
                this.verts[0].uv.y as any as number,
                this.verts[1].pos.x as any as number,
                this.verts[1].pos.y as any as number,
                this.verts[1].uv.x as any as number,
                this.verts[1].uv.y as any as number,
                this.verts[2].pos.x as any as number,
                this.verts[2].pos.y as any as number,
                this.verts[2].uv.x as any as number,
                this.verts[2].uv.y as any as number,
                this.verts[3].pos.x as any as number,
                this.verts[3].pos.y as any as number,
                this.verts[3].uv.x as any as number,
                this.verts[3].uv.y as any as number);
        }
    }
}
