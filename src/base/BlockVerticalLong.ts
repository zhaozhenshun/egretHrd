class BlockVerticalLong extends EntityBlock implements Enity{
	public limitMove = {
		up:0,
		down:192
	};
	public gridPos= {
		before:0,
		after:0
	};
	public tweenActive = false;
	public name = "BlokVertical";
	public TYPE = configType.TYPE_V;
	public constructor() {
		super();
		this.initUI();
	}
	private initUI(){
		let block = Resouce.createBitmapByName('hrd_json.blok-v-l');
		this.addChild(block);
		this.limitMove.down = 192;
	}
	public onTouchBack(x:number,y:number){
		if(this.TYPE == configType.TYPE_V){
			if(y>=this.limitMove.up && y<=this.limitMove.down){
				this.y = y;
			}else{
				this.y = this.y -this.limitMove.up > this.limitMove.down - this.y ? this.y = this.limitMove.down : this.y = this.limitMove.up;
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
				console.log('onMouseDownFun-----------------')
                // this.movementPosX = this.pointer.pos.x;
                this.gridPos.before = this.y / 64;
                 for (var c = this.x, b = this.y, d = 0, f = 0; 64 <= c;) d++, c -= 64;
                for (; 64 <= b;) f++, b -= 64;
				
                this.limitMove.up = 0;
                this.limitMove.down = 192;
				for (var map = GameMap.getInstance(), j = f - 1; - 1 < j;) {
                    b = map.arrayBoard[d][j];
                    if (1 == b) {
                        this.limitMove.up = 64 * (j + 1);
                        break
                    }
                    j--
                }
                for (f +=
                    3; 6 > f;) {
                    b = map.arrayBoard[d][f];
                    if (1 == b) {
                        this.limitMove.down = 64 * (f - 3);
                        break
                    }
                    f++
                }
            }
	}
	checkBlokPos(){
		  for (var c = this.x, b = this.y, d = 0, f = 0; 64 < c;) d++, c -= 64;
            for (32 < c && d++; 64 < b;) f++, b -= 64;
            32 < b && f++;
            this.gridPos.after = f;
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
                width: 1,
                height: 3
            }
	}
	endTween(){
		this.tweenActive = false;
	}
}