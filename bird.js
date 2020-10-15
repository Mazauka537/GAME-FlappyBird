class Bird {
  constructor(layout) {
    this.layout = layout;
    this.height = 24;
    this.width = 34;
    this.left = 75;
    this._bottom = this.layout.offsetHeight / 2;
    
    this.speed = 0;
    this.a = 0.35;
    this.maxSpeed = 7;
    
    this.elem = this.createBird();
  }
  
  createBird() {
    let div = document.createElement('div');
    div.classList.add('bird');
    div.style.width = this.width + 'px';
    div.style.height = this.height + 'px';
    div.style.left = this.left + 'px';
    div.style.bottom = this.bottom + 'px';
    this.layout.append(div);
    return div;
  }
  
  move() {
    this.bottom -= this.speed;
    this.speed += this.a;
    if (this.speed > this.maxSpeed)
      this.speed = this.maxSpeed;
  }
  
  get bottom() {
    return this._bottom;
  }
  
  set bottom(value) {
    this._bottom = value;
    this.elem.style.bottom = value + 'px';
  }
}