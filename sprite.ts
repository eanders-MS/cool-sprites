namespace cool {
    const bknd = scene.backgroundImage();

    export class Sprite extends sprites.BaseSprite {
        private xfrm_: Transform;

        public get xfrm() { return this.xfrm_; }

        constructor(private img: Image) {
            super(scene.SPRITE_Z);
            this.xfrm_ = new Transform();
        }

        __update(camera: scene.Camera, dt: number) { }

        __drawCore(camera: scene.Camera) {
        }
    }
}
