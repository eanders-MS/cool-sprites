namespace cool {
    const SCREEN_HALF_WIDTH = screen.width >> 1;
    const SCREEN_HALF_HEIGHT = screen.height >> 1;

    export class Sprite extends scene.Renderable {
        private xfrm_: Transform;
        private src: Vec2[]; // const
        private verts: Vec2[];

        public get xfrm() { return this.xfrm_; }

        constructor(private img: Image, z: number = scene.SPRITE_Z) {
            super(
                (_1, _2) => { },
                () => true,
                z);
            this.xfrm_ = new Transform();
            this.setImage(img);
        }

        public setImage(img: Image) {
            this.img = img;
            const w2 = Fx8(img.width / 2);
            const h2 = Fx8(img.height / 2);
            // Vertices in clockwise order
            this.src = [
                new Vec2(Fx.neg(w2), Fx.neg(h2)),
                new Vec2(w2, Fx.neg(h2)),
                new Vec2(w2, h2),
                new Vec2(Fx.neg(w2), h2),
            ];
            this.verts = this.src.map(v => v.clone());
        }

        __update(camera: scene.Camera, _2: any) {
            for (let i = 0; i < this.src.length; ++i) {
                this.xfrm_.transformToRef(this.src[i], this.verts[i]);
                this.verts[i].x = Fx.iadd(camera.drawOffsetX + SCREEN_HALF_WIDTH, this.verts[i].x);
                this.verts[i].y = Fx.iadd(camera.drawOffsetY + SCREEN_HALF_HEIGHT, this.verts[i].y);
            }
        }

        __drawCore(_1: any) {
            gpu.drawTexturedQuad(
                screen,
                this.img,
                this.verts[0].x as any as number,
                this.verts[0].y as any as number,
                this.verts[1].x as any as number,
                this.verts[1].y as any as number,
                this.verts[2].x as any as number,
                this.verts[2].y as any as number,
                this.verts[3].x as any as number,
                this.verts[3].y as any as number);
        }
    }
}
