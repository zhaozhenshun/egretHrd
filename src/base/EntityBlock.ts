class EntityBlock extends egret.Sprite {

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
	}

	/**触摸点离远点的距离 */
	private _distance:egret.Point = new egret.Point();

	private moveEnabled:boolean = false;
	public init(e:egret.Event){
		this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.init,this)
		this.touchEnabled = true;
	
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onMouseDown,this);
		this.addEventListener(egret.TouchEvent.TOUCH_END,this.onMouseUp,this);
		this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onMouseUp,this);
		
	}
	private onMouseDown(evt:egret.TouchEvent){
		this.moveEnabled = true;
		this._distance.x =  evt.stageX-this.x ;
		this._distance.y = evt.stageY-this.y;
		this.onMouseDownFun();
		this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMouseMove,this);
	}

	private onMouseUp(evt:egret.TouchEvent){

		this.moveEnabled = false;
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMouseMove,this);
		this.onClicked();
		
	}

	private onMouseMove(evt:egret.TouchEvent){
		if(this.moveEnabled){
			this.onTouchBack(evt.stageX - this._distance.x,evt.stageY - this._distance.y)
		}
	}

	public onTouchBack(x:number,y:number){

	}
	public onClicked(){

	}
	public onMouseDownFun(){

	}
	
	/**
	 * 清除监听器
	 */
	public clearAll(){
		this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onMouseDown,this);
		this.removeEventListener(egret.TouchEvent.TOUCH_END,this.onMouseUp,this);
		this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onMouseUp,this);
		this.removeChildren();
	}

}