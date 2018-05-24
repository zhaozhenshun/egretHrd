class BlockHorizontalLong extends EntityBlock implements Enity{
	public limitMove = {
		left:0,
		right:256
	};
	public gridPos= {
		before:0,
		after:0
	};
	public tweenActive = false;
	public name = "BlockHorizontal";
	public TYPE = configType.TYPE_H;
	public constructor() {
		super();
		this.initEvt();
	}
	private block:egret.Bitmap;
	private initEvt(){
		
		let block = Resouce.createBitmapByName('hrd_json.blok-h-l');
		this.block = block;
		this.addChild(this.block);
		this.limitMove.right = 192;
	}

	public onTouchBack(x:number,y:number){
		if(this.TYPE == configType.TYPE_H){
			if(x>=this.limitMove.left && x<=this.limitMove.right){
				this.x = x;
			}else{
				this.x - this.limitMove.left>this.limitMove.right - this.x ? this.x = this.limitMove.right : this.x = this.limitMove.left;
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
               
                for (var c = this.x, b = this.y , d = 0, f = 0; 64 <= c;) d++, c -= 64;
                for (; 64 <= b;) f++, b -= 64;
                this.limitMove.left = 0;
                this.limitMove.right = 192;
				for (var map = GameMap.getInstance(), j = d - 1; - 1 < j;) {
                    b = map.arrayBoard[j][f];
                    if (1 == b) {
                        this.limitMove.left = 64 * (j + 1);
                        break
                    }
                    j--
                }
                for (d += 3; 6 > d;) {
                    b = map.arrayBoard[d][f];
                    if (1 == b) {
                        this.limitMove.right = 64 * (d - 3);
                        break
                    }
                    d++
                }
            }
	}


	checkBlokPos(){
 	for (var c = this.x, b = this.y, d = 0, f = 0; 64 < c;) d++, c -= 64;
            for (32 < c && d++; 64 < b;) f++, b -= 64;
            32 < b && f++;
            this.gridPos.after = d;
			egret.Tween.get(this).to(
				{
					 x: 64 * d,
                     y: 64 * f
				},
				200,
				egret.Ease.sineIn
			).call(()=>{
				this.endTween();
			},this)
			//  4 <= b && (b = 4, ig.game.winLevel = !0);
            this.tweenActive = !0;
            return {
                posX: d,
                posY: f,
                width: 3,
                height: 1
            }
	}
	endTween(){
		this.tweenActive = false;
	}
}