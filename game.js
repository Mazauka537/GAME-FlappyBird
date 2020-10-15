class Game {
  constructor(layout) {
    this.layout = layout;
    this.scoreField = document.getElementById('scoreField');
    this.state = 'ready';
    this._score = 0;
    this.bestScore = 0;
    this.canGetPoint = true;
    this.timer = undefined;
    this.pipes = [new PairPipes(layout)];
    this.pipesSpeed = 1.5; //px
    this.horizontalPipeDispance = 160;
    this.bird = new Bird(layout);
    document.getElementById('screen').onclick = () => this.click();
    document.getElementById('death-dialog-btn').onclick = (e) => {
      e.stopPropagation();
      this.reload();
    } 
  }
  
  start() {
    this.state = 'play';
    document.getElementById('startDialog').style.display = 'none';
    this.timer = setInterval(() => {
      this.frame();
     }, 15);
  }
  
  stop() {
    this.state = 'death';
    document.getElementById('deathDialog').style.display = 'block';
    clearInterval(this.timer);
    this.showDeathDialog();
  }
  
  reload() {
    this.state = 'ready';
    for (var i = 0; i < this.pipes.length; i++) {
      this.pipes[i].destroy();
    }
    this.pipes = [new PairPipes(this.layout)];
    
    document.getElementById('deathDialog').style.display = 'none';
    document.getElementById('startDialog').style.display = 'block';
    
    this.bird.bottom = this.layout.offsetHeight / 2;
    this.score = 0;
  }
  
  showDeathDialog() {
    let deathDialog = document.getElementById('deathDialog');
    deathDialog.querySelector('#score-now').innerHTML = this.score;
    if (this.score > this.bestScore) {
      this.bestScore = this.score;
    }
    deathDialog.querySelector('#score-best').innerHTML = this.bestScore;
    deathDialog.style.display = 'block';
  }
  
  frame() {
    for (var i = 0; i < this.pipes.length; i++) {
      this.pipes[i].move(this.pipesSpeed);
    }
    
    if (this.pipes[this.pipes.length - 1].upPipe.right > this.horizontalPipeDispance) {
      this.createNewPipes();
    }
    
    if (this.pipes[0].upPipe.right > this.layout.offsetWidth) {
      this.pipes[0].destroy();
      this.pipes.shift();
    }
    
    this.bird.move();
    
    
    
    let left = this.layout.offsetWidth - this.pipes[0].upPipe.right - this.pipes[0].upPipe.width;
    
    if (left + this.pipes[0].upPipe.width > this.bird.left && left < this.bird.left + this.bird.width) {
      if (this.bird.bottom < this.pipes[0].downPipe.height || this.layout.offsetHeight - this.bird.bottom - this.bird.height < this.pipes[0].upPipe.height) {
        this.stop();
      }
    }
    
    
    if (this.pipes[0].upPipe.right >= this.layout.offsetWidth - this.bird.left) {
      if (this.canGetPoint) {
        this.score++;
      } 
      this.canGetPoint = false;
    } else {
      this.canGetPoint = true;
    }
  }
  
  click() {
    if (this.state == 'ready') {
      this.start();
    }
    if (this.state == 'play') {
      this.bird.speed = -this.bird.maxSpeed;
    } 
  }
  
  createNewPipes() {
    this.pipes.push(new PairPipes(this.layout));
  }
  
  get score() {
    return this._score;
  }
  
  set score(value) {
    this._score = value;
    this.scoreField.innerHTML = value;
  }
}