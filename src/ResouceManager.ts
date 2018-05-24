// TypeScript file

class Resouce{
    static createBitmapByName(textureName:string){
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(textureName);
        result.texture = texture;
        return result;
    }
    static levelConfig = {};
}
