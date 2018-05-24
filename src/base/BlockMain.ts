
interface Enity{
	limitMove:Object;
	gridPos:Object;
	name:string;
	TYPE:string;
	tweenActive:boolean;
	checkBlokPos():Object;

}
class BlockMain extends EntityBlock implements Enity{
	public limitMove = {
		left:0,
		right:256
	};
	public gridPos= {
		before:0,
		after:0
	};
	public tweenActive = false;
	public name = "BlockMain";
	public TYPE = configType.TYPE_H;
	public constructor() {
		super();
		this.initEvt();
	
	}
	private block:egret.Bitmap;
	private initEvt(){
		
		let block = Resouce.createBitmapByName('hrd_json.blok-main');
		let spriteSheet:egret.SpriteSheet = new egret.SpriteSheet(block.texture);
		block.texture = spriteSheet.createTexture("blue",0,0,128,64);
		this.block = block;
		this.addChild(this.block);
	}

	public onTouchBack(x:number,y:number){
		if(this.TYPE == configType.TYPE_H){
			if(x>=this.limitMove.left && x<=this.limitMove.right){
				this.x = x;
			}
		}
	}
	public onClicked(){
		 GameMap.getInstance().checkEveryBoardArray && GameMap.getInstance().checkEveryBoardArray();
        //  this.gridPos.before != this.gridPos.after //播放音效记录步数
		//   this.gridPos.before != this.gridPos.after && (this.board.movement++, ig.soundHandler.playSound(ig.soundHandler.SOUNDID.swipe))
	}

	public onMouseDownFun(){
		if (!this.tweenActive) {
                // this.firstThisX = this.x;
                this.gridPos.before = this.x / 64;
                // this.movementPosX = this.pointer.pos.x;
               
                for (var c = this.x, b = 0; 64 <= c;) b++, c -= 64;
                this.limitMove.left = 0;
                this.limitMove.right = 384;
				for (var map= GameMap.getInstance(),
                    d = b - 1; - 1 < d;) {
                    var f = map.arrayBoard[d][2];
                    if (1 == f) {
                        this.limitMove.left = 64 * (d + 1);
                        break
                    }
                    d--
                }
                for (b += 2; 6 > b;) {
                    f = map.arrayBoard[b][2];
                    if (1 == f) {
                        this.limitMove.right = 64 * (b - 2);
                        break
                    }
                    b++
                }
            }
	}


	checkBlokPos(){
		for (var c = this.x, b = 0; 64 < c;) b++, c -= 64;
            32 < c && b++;
            this.gridPos.after = b;
			egret.Tween.get(this).to(
				{
					 x: 64 * b
				},
				200,
				egret.Ease.sineIn
			).call(()=>{
				this.endTween();
			},this)
			4 < b && (b = 4,GameMap.getInstance().game_isWin = true);
            this.tweenActive = !0;
            return {
                posX: b,
                posY: 2,
                width: 2,
                height: 1
            }
	}
	endTween(){
		this.tweenActive = false;
	}
}
