namespace cool {
    const bknd = scene.backgroundImage();

    export class Sprite extends sprites.BaseSprite {
        private xfrm_: Transform;
        private src: Vec2[]; // const
        private verts: Vec2[];

        public get xfrm() { return this.xfrm_; }

        constructor(private img: Image) {
            super(scene.SPRITE_Z);
            this.xfrm_ = new Transform();
            const w2 = Fx8(img.width >> 1);
            const h2 = Fx8(img.height >> 1);
            // Vertices in clockwise order
            this.src = [
                new Vec2(Fx.neg(w2), Fx.neg(h2)),
                new Vec2(w2, Fx.neg(h2)),
                new Vec2(w2, h2),
                new Vec2(Fx.neg(w2), h2),
            ];
            this.verts = this.src.map(v => v.clone());
        }

        __update(camera: scene.Camera, dt: number) {
            // TODO: add camera offset
            for (let i = 0; i < this.src.length; ++i) {
                this.xfrm_.transformToRef(this.src[i], this.verts[i]);
            }
        }

        __drawCore(camera: scene.Camera) {
            bknd.drawQuad(
                this.img,
                Fx.toInt(this.verts[0].x),
                Fx.toInt(this.verts[0].y),
                Fx.toInt(this.verts[1].x),
                Fx.toInt(this.verts[1].y),
                Fx.toInt(this.verts[2].x),
                Fx.toInt(this.verts[2].y),
                Fx.toInt(this.verts[3].x),
                Fx.toInt(this.verts[3].y));
        }
    }
}
