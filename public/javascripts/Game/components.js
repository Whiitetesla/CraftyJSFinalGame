/**
 * Created by Niels Hviid Lund on 07-05-2017.
 */
var ball_vy = 2;
var ball_vx = (Math.floor(Math.random()*2));

Crafty.c('PongPlayer',{
    init: function (){
        this.requires('Canvas, Solid, Twoway, Gravity, Collision, paddle1')
            .attr({x: screenWidth/2, y: screenHeight/1.1, w: screenWidth/10, h: screenHeight/32})
            .twoway(400,1)
            .gravity('Floor')
            .gravityConst(250)
            .origin('center')
            .bind('Moved', function (evt) {
                if(this.hit('Wall'))
                    this[evt.axis] = evt.oldValue;
            });
    }
});

Crafty.c('Ball',{
    init: function () {
        this.requires('Canvas, Text, Solid, Collision, Tween, ballGrey_04')
            .attr({x: screenWidth/2, y: screenHeight/1.3,w: screenWidth/30, h: screenHeight/20})

            .onHit("PongPlayer", function (hitDatas) {
                ball_vy = -ball_vy;

                if(!!Crafty.keydown[Crafty.keys.LEFT_ARROW]){
                    ball_vx = -ball_vx;
                    ball_vx = -(Math.floor(Math.random()*5)+1);
                }
                else if(!!Crafty.keydown[Crafty.keys.RIGHT_ARROW]){
                    ball_vx = -ball_vx;
                    ball_vx = Math.floor(Math.random()*5)+1;
                }

                ball_vy = -(Math.floor(Math.random()*5)+2);

            })
            .onHit("Wall", function (hitDatas) {
                ball_vx = -ball_vx;
            })
            .onHit("Celling", function (hitDatas) {
                ball_vy = -ball_vy;
            })
            .onHit("Brick", function (hitDatas) {
                ball_vy = -ball_vy;
                for(i = 0; i< hitDatas.length; i++){
                    hitDatas[i].obj.destroy();
                    score++;
                    scoreText.text('Hit:' + score);
                    Crafty.trigger('BrickBroken', this);
                }

            })
            .bind("EnterFrame", function () {
                this.y += ball_vy;
                this.x += ball_vx;
                if (this.y > screenHeight){
                    this.destroy();
                    Crafty.trigger('LOSE', this);
                }
            });
    }
});