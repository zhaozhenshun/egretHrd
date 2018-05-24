class GameMap extends egret.Sprite{

	public static Instance:GameMap;
	public static getInstance(){
		if(!this.Instance){
			this.Instance = new GameMap();
		}
		return this.Instance;
	}
	public constructor() {
		super();
		this.init();
	}
	mainBlock:BlockMain;
	public arrayBoard=[
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0]
	];
	public arrayBlokInGame =[];
	private container:egret.Sprite;
	public game_Map:egret.Bitmap;
	public game_Level:number = 1;  //游戏关卡
	public game_isWin:boolean = false;  //游戏通关标记
	public game_offset_X:number = 1;
	public game_offset_Y:number = 1;
	private init(){
		this.touchEnabled  =true;
		let gamebg = Resouce.createBitmapByName('hrd_json.khung-go-main');
		this.addChild(gamebg);
		console.log(gamebg.width,gamebg.height)
		gamebg.x = 0;
		gamebg.y = 0;
		this.container = new egret.Sprite();
		this.container.width = 384;
		this.container.height = 384;
		this.addChild(this.container);
		this.container.x = (gamebg.width - this.container.width)*.5;
		this.container.y = (gamebg.height - this.container.height)*.5;
	
		this.levelCreator(1);
	}
    private levelConfigCreate(level:number){
		let result = [];
		var node = "level"+level;
		result = Resouce.levelConfig[node];
		console.log(result);
		return result
	}
	private parseLevelConfig(config){
		config.forEach((item,index)=>{
		
			var curblock:EntityBlock;
			switch(item.name){
				case "EntityBlokHorizontal":
				 curblock = new BlockHorizontal();
				break;
				case "EntityBlokVerticalLong":
				curblock = new BlockVerticalLong();
				break;
				case "EntityBlokMain":
				curblock = new BlockMain();
				break;
				case "EntityBlokHorizontalLong":
				curblock = new BlockHorizontalLong();
				break;
				case "EntityBlokVertical":
				curblock = new BlockVertical();
				break;
			}
			curblock.x = item.x-220;
			curblock.y = item.y-48;
			this.container.addChild(curblock);
			this.arrayBlokInGame.push(curblock);
		})
	}
	public levelCreator(level:number){
		this.clearBlok()
		let config = this.levelConfigCreate(level);
		this.parseLevelConfig(config);
		this.checkEveryBoardArray();

	}
	private  clearBlok() {
            for (var c = 0; c < this.arrayBlokInGame.length; c++) {
				this.arrayBlokInGame[c].clearAll();
				this.container.removeChild(this.arrayBlokInGame[c]);
				this.arrayBlokInGame[c] = null;
			}
            this.arrayBlokInGame = []
	}

	private clearBoardArray(){
		 for (var c = 0; 6 > c; c++)
                for (var b = 0; 6 > b; b++) this.arrayBoard[c][b] = 0
	}

	private addingBoardArray(){
		 for (var c = 0; c < this.arrayBlokInGame.length; c++) {
                var b = this.arrayBlokInGame[c];
                "function" == typeof b.checkBlokPos && (b = b.checkBlokPos(), this.addingGridBoard(b.posX, b.posY, b.width, b.height))
            }
			console.log(this.arrayBoard);
            this.checkWinCondition()
	}

	private checkWinCondition(){
		if(this.game_isWin){
			this.game_Level ++;
			this.game_isWin = false;
			this.levelCreator(this.game_Level);
		}
	}

	private addingGridBoard(c:number,b:number,d:number,f:number){
		for (; 1 <
                d;) this.arrayBoard[c + (d - 1)][b] = 1, d--;
            for (; 1 < f;) this.arrayBoard[c][b + (f - 1)] = 1, f--;
            this.arrayBoard[c][b] = 1
	}

	public checkEveryBoardArray(){
		 this.clearBoardArray();
		this.addingBoardArray()
	}


	
}