namespace cool.fx {
    export const negOneFx8 = Fx8(-1);

    export function sign(v: Fx8): Fx8 {
        return v >= Fx.zeroFx8 ? Fx.oneFx8 : Fx8(-1);
    }
    export function signum(v: Fx8): Fx8 {
        if (v > Fx.zeroFx8) return Fx.oneFx8;
        if (v < Fx.zeroFx8) return fx.negOneFx8;
        return Fx.zeroFx8;
    }
    export function clamp(v: Fx8, min: Fx8, max: Fx8): Fx8 {
        return Fx.max(min, Fx.min(v, max));
    }
    export function xor(a: Fx8, b: Fx8): Fx8 {
        return ((a as any as number) ^ (b as any as number)) as any as Fx8;
    }
    export function floor(v: Fx8): Fx8 {
        return Fx.leftShift(Fx.rightShift(v, 8), 8);
    }
    export function round(v: Fx8): Fx8 {
        // lazy implementation
        return fx.floor(Fx.add(Fx.mul(fx.sign(v), Fx.oneHalfFx8), v));
    }
    export function mod(v: Fx8, q: Fx8): Fx8 {
        // lazy implementation
        return Fx8(Fx.toFloat(v) % Fx.toFloat(q));
    }
    export function sqrt(v: Fx8): Fx8 {
        // lazy implementation
        return Fx8(Math.sqrt(Fx.toFloat(v)));
    }
    export function random(): Fx8 {
        return Fx8(Math.random());
    }
    export function randomRange(min: Fx8, max: Fx8): Fx8 {
        return fx.irandomRange(Fx.toFloat(min), Fx.toFloat(max));
    }
    export function irandomRange(min: number, max: number): Fx8 {
        return Fx8(Math.randomRange(min, max));
    }
    export function sin(angle: number): Fx8 {
        // lazy implementation
        return Fx8(Math.sin(angle * Math.PI / 180));
    }
    export function cos(angle: number): Fx8 {
        // lazy implementation
        return Fx8(Math.cos(angle * Math.PI / 180));
    }
}
