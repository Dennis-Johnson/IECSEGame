function obs1(){
        this.xpos=0;
        this.ypos=0;
        this.x_axis;
        this.y_axis;
        this.color;
        this.sped=2.4;//you can modify this to change the speed of obstacle
        this.w=120;
        this.h=20;
        this.toright=false;
        this.switched=false;
        this.rot=0;
        this.next=0;
        //when this function called in obj the obj1 in given index in _obs array will be initialize in given value
        this.init=function(color,x_ax,y_ax){
            //axis is the distance in world point
            this.x_axis=x_ax;
            this.y_axis=y_ax*-1;
            this.color=color;
            this.xpos=20;
            this.next=y_ax+120; 
        }
        this.draw=function(){
            //this object movent will move to left and right
            if(this.toright==false){
                this.xpos-=this.sped;
                if(this.xpos<=0){
                    this.toright=true;
                }
            }else{
                this.xpos+=this.sped;
                if(this.xpos+120>=400){
                    this.toright=false;
                }
            }
            //draw enemy
            this.ypos=coords.y_axis(this.y_axis);
            game.draw.fillStyle=this.color;
            game.draw.fillRect(this.xpos,this.ypos,this.w,this.h);
            
            if(this.xpos<=player.xpos&&this.xpos+this.w>=player.xpos&&this.ypos<=player.ypos&&this.ypos+this.h>=player.ypos){
                  if(player.color!=this.color&&game.gameover==false){
                      game.gameover=true;
                      player_is_dead_();
                  }
            }
            if(this.xpos<=player.xpos+10&&this.xpos+this.w>=player.xpos+10&&this.ypos<=player.ypos+10&&this.ypos+this.h>=player.ypos+10){
                  if(player.color!=this.color&&game.gameover==false){
                      game.gameover=true;
                      player_is_dead_();
                  }
            }
            //get switcher
            if(this.switched==false){
                game.draw.save();
                    game.draw.translate(player.xpos+7,coords.y_axis(this.y_axis-50)+7);
                    game.draw.rotate(this.rot*(Math.PI/180.));
                    game.draw.fillStyle="#999999";
                    game.draw.fillRect(-7,-7,14,14);
                game.draw.restore();
                if(coords.y_axis(this.y_axis-50)+7>=player.ypos){
                   this.switched=true;
                    score++;
                    player.color=colorz[Math.floor(Math.random()*colorz.length)];
                }
                this.rot+=2;
                if(this.rot>=360){
                    this.rot=0;
                }
            } 
            
        }
        this.check=function(i){
            if(this.ypos-10>game.h){
                _obs.splice(i,1);
            }
        }
    }
    //this is a single circle obstacle
    function obs2(){
        this.xpos=0;
        this.ypos=0;
        this.x_axis;
        this.y_axis;
        this.rot=0;
        this.rotsped=0.05;
        this.next=0;
        this.switched=false;
        this.rott=0;
        this.init=function(color,x_ax,y_ax){
            //axis is the distance in world point
            this.x_axis=x_ax;
            this.y_axis=y_ax*-1;
            this.color=color;
            this.xpos=200-5;
            this.next=y_ax+180;
        }
        this.draw=function(i){
            //360 is angle of circle then we divide to 30 to make a 30 squares
            var rad=360/30;
            //rotation start in zero
            var rot=0;
            //initialize color as empty
            var color="";
            //here is where the magic happens XD
            for(var i=0;i<30;i++){
                //here we solve the the position of the sqaure
                /*
                    for example the position of the middle of the circle is 193 and 80 is the distance of square rotating  in the middle of the circle. don`t the right term its call a radius i guess XD
                */
                var xx=80*Math.cos(this.rot*(Math.PI/180))+this.xpos;
                var yy=80*Math.sin(this.rot*(Math.PI/180))+coords.y_axis(this.y_axis);
                //then the first 10 square color is yello and second 10ns is red then last is yellow 10ns
                //if i value is less than 10 the color of the sqaure is yellow then if its greater than 10 ang less than
                //20 the color of the sqaure is yellow
                //then else if i value is greater than or equal to 20 the color is deepsky blue
                if(i<10){
                    color="purple";
                }else if(i>=10 && i<20){
                    color="cyan";
                }else{
                    color="yellow";
                }
                //then we check the coordinates of player and squares rotation in the circle if meet this condition
                if(xx<=player.xpos&&xx+10>=player.xpos&&yy<=player.ypos&&yy+10>=player.ypos){
                    //then we check if the color is not equal to player then the player is dead. 
                    //i put &&game.over==false to make it call inside statement of that if statement once.
                  if(player.color!=color&&game.gameover==false){
                      game.gameover=true;
                      player_is_dead_();
                  }
                }
                //in the top of this we check the head of the square, here we check the lower square if it collide to obstacle
                if(xx<=player.xpos+player.h&&xx+10>=player.xpos+player.h&&yy<=player.ypos+player.h&&yy+10>=player.ypos+player.h){
                    if(player.color!=color&&game.gameover==false){
                        game.gameover=true;
                        player_is_dead_();
                  }
                }
                //draw the squares in circle
                game.draw.fillStyle=color;
                game.draw.fillRect(xx,yy,10,10);
                //increment the rot in the value of rad+this.rotsped to make the sqaure rotate, if you`re  curious you can remove the +this.rotspedd; then you will see the sqaure in the circle will not rotate 
                //or you remove this.rot+=rad+this+this.rotsped; and check what will happens
                this.rot+=rad+this.rotsped;
                
            }
             if(this.switched==false){
                game.draw.save();
                game.draw.translate(player.xpos+7,coords.y_axis(this.y_axis)+7);
                game.draw.rotate(this.rott*(Math.PI/180.));
                game.draw.fillStyle="#999999";
                game.draw.fillRect(-7,-7,14,14);
                game.draw.restore();
                if(coords.y_axis(this.y_axis)+7>=player.ypos){
                   this.switched=true;
                    score++;
                    player.color=colorz[Math.floor(Math.random()*colorz.length)];
                }
                this.rott+=2;
                if(this.rott>=360){
                    this.rott=0;
                }
            } 
        }
        this.check=function(i){
            if(coords.y_axis(this.y_axis)-90>game.h){
                _obs.splice(i,1);
                
            }
        }
    }
    //double circle
    function obs3(){
        this.xpos=0;
        this.ypos=0;
        this.x_axis;
        this.y_axis;
        this.rot=0;
        this.w=3;
        this.h=2;
        this.rotsped=0.01;
        this.next=0;
        this.switched=false;
        this.rott=0;
        this.init=function(color,x_ax,y_ax){
            //axis is the distance in world point
            this.x_axis=x_ax;
            this.y_axis=y_ax*-1;
            this.color=color;
            this.xpos=192-35;
            this.next=y_ax+160;
        }
        this.draw=function(){
            var rad=360/150;
            var color=0;
            this.ypos=coords.y_axis(this.y_axis);
            for(var i=0;i<150;i++){
                if(i<50){
                    color="purple";
                }else if(i>=50&&i<100){
                    color="cyan";
                }
                else{
                    color="yellow";
                }
                var xx=40*Math.cos(this.rot*(Math.PI/180))+this.xpos;
                var yy=40*Math.sin(this.rot*(Math.PI/180))+this.ypos;
                var rot=Math.atan2(yy-this.ypos,xx-this.xpos);
                game.draw.save();
                    game.draw.translate(xx+this.w,yy);
                    game.draw.rotate(rot);
                    game.draw.fillStyle=color;
                    game.draw.fillRect(this.w*-1,0,this.w,this.h);
                game.draw.restore();
                var tx= (player.xpos+(player.w/2))-xx+1.5;
                var ty=(player.ypos+(player.h/2))-yy;
                var d=Math.sqrt(tx*tx+ty*ty);
                 if(d<=10){
                  if(player.color!=color&&game.gameover==false){
                      game.gameover=true;
                      player_is_dead_();
                  }
                }

                var xx=40*Math.cos((180-this.rot)*(Math.PI/180))+this.xpos+83;
                var yy=40*Math.sin((180-this.rot)*(Math.PI/180))+this.ypos;
                var rot=Math.atan2(yy-this.ypos,xx-this.xpos);
                game.draw.save();
                    game.draw.translate(xx+this.w,yy);
                    game.draw.rotate(rot);
                    game.draw.fillStyle=color;
                    game.draw.fillRect(this.w*-1,0,this.w,this.h);
                game.draw.restore();
                this.rot+=rad+this.rotsped;
              
            }
             if(this.switched==false){
                game.draw.save();
                game.draw.translate(player.xpos+7,coords.y_axis(this.y_axis-80)+7);
                game.draw.rotate(this.rott*(Math.PI/180));
                game.draw.fillStyle="#999999";
                game.draw.fillRect(-7,-7,14,14);
                game.draw.restore();
                if(coords.y_axis(this.y_axis-80)+7>=player.ypos){
                   this.switched=true;
                    score++;
                    player.color=colorz[Math.floor(Math.random()*colorz.length)];
                }
                this.rott+=2;
                if(this.rott>=360){
                    this.rott=0;
                }
            } 
        }
        this.check=function(i){
            if(this.ypos-50>game.h){
                _obs.splice(i,1);
            }
        }
    }
    //lineobs
    function obs4(){
        this.xpos=0;
        this.ypos=0;
        this.x_axis;
        this.y_axis;
        this.rot=0;
        this.w=3;
        this.h=2;
        this.rotsped=0.005;
        this.child_obs=[];
        this.len_of_color=0;
        this.width_slice=0;
        this.next=0;
        this.switched=false;
        this.rott=0;
        this.init=function(color,x_ax,y_ax){
            //axis is the distance in world point
            this.x_axis=x_ax;
            this.y_axis=y_ax*-1;
            this.color=color;
            this.xpos=0;
            this.width_slice=game.w/5;
            var len_of_color=0;
            var xpos=game.w-this.width_slice;
            for(var i=0;i<6;i++){
                this.child_obs.push({color:colorz[this.len_of_color],xpos:xpos,w:this.width_slice,h:10});
                this.len_of_color++;
                if(this.len_of_color==3){
                    this.len_of_color=0;
                }
                xpos-=this.width_slice;
            }
            this.next=y_ax+140;
        }
        this.draw=function(){
            var e=0, ee=false;
            this.ypos=coords.y_axis(this.y_axis);
            for(var i=0;i<this.child_obs.length;i++){
                game.draw.fillStyle=this.child_obs[i].color;
                game.draw.fillRect(this.child_obs[i].xpos,this.ypos,this.child_obs[i].w,this.child_obs[i].h);
                this.child_obs[i].xpos+=2;
                if(this.child_obs[i].xpos<=player.xpos&&
                    this.child_obs[i].xpos+this.child_obs[i].w>=player.xpos&&
                    this.ypos<player.ypos&&
                    this.ypos+this.child_obs[i].h>=player.ypos
                  ){
                    if(player.color!=this.child_obs[i].color&&game.gameover==false){
                        game.gameover=true;
                        player_is_dead_();
                    }
                }
                if(this.child_obs[i].xpos<=player.xpos+player.w&&
                    this.child_obs[i].xpos+this.child_obs[i].w>=player.xpos+player.w&&
                    this.ypos<player.ypos+player.h&&
                    this.ypos+this.child_obs[i].h>=player.ypos+player.h
                  ){
                    if(player.color!=this.child_obs[i].color&&game.gameover==false){
                        game.gameover=true;
                        player_is_dead_();
                    }
                }
                if(this.child_obs[i].xpos>=game.w){
                    ee=true;
                    e=i;
                    this.len_of_color++;
                    if(this.len_of_color==3){
                        this.len_of_color=0;
                    }
                    this.child_obs.push({color:colorz[this.len_of_color],xpos:this.child_obs[this.child_obs.length-1].xpos-this.width_slice,w:this.width_slice,h:10});
                }
            }
            if(ee==true){
                this.child_obs.splice(e,1);
            }
            if(this.switched==false){
                game.draw.save();
                game.draw.translate(player.xpos+7,coords.y_axis(this.y_axis-65)+7);
                game.draw.rotate(this.rott*(Math.PI/180));
                game.draw.fillStyle="#999999";
                game.draw.fillRect(-7,-7,14,14);
                game.draw.restore();
                if(coords.y_axis(this.y_axis-65)+7>=player.ypos){
                   this.switched=true;
                    score++;
                    player.color=colorz[Math.floor(Math.random()*colorz.length)];
                }
                this.rott+=2;
                if(this.rott>=360){
                    this.rott=0;
                }
            } 
        }
        this.check=function(i){
            if(this.ypos-30>game.h){
                _obs.splice(i,1);
            }
        }
    }
    // //3 circle
    // function obs5(){
    //     this.xpos=0;
    //     this.ypos=0;
    //     this.x_axis;
    //     this.y_axis;
    //     this.rot=0;
    //     this.w=3;
    //     this.h=2;
    //     this.rotsped=0.01;
    //     this.next=0;
    //     this.switched=false;
    //     this.rott=0;
    //     this.init=function(color,x_ax,y_ax){
    //         //axis is the distance in world point
    //         this.x_axis=x_ax;
    //         this.y_axis=y_ax*-1;
    //         this.color=color;
    //         this.xpos=200;
    //         this.next=y_ax+280;
            
    //     }
    //     this.draw=function(){
    //         var rad=360/150;
    //         var color=0;
    //         this.ypos=coords.y_axis(this.y_axis);
    //         for(var i=0;i<150;i++){
    //             if(i<50){
    //                 color="purple";
    //             }else if(i>=50&&i<100){
    //                 color="cyan";
    //             }
    //             else{
    //                 color="yellow";
    //             }
    //             var xx=40*Math.cos((this.rot)*(Math.PI/180))+this.xpos;
    //             var yy=40*Math.sin((this.rot)*(Math.PI/180))+this.ypos;
    //             var rot=Math.atan2(yy-this.ypos,xx-this.xpos);
    //             var tx= (player.xpos+(player.w/2))-xx+1.5;
    //             var ty=(player.ypos+(player.h/2))-yy;
    //             var d=Math.sqrt(tx*tx+ty*ty);
    //              if(d<=10){
    //               if(player.color!=color&&game.gameover==false){
    //                   game.gameover=true;
    //                   player_is_dead_();
    //               }
    //             }
    //             game.draw.save();
    //                 game.draw.translate(xx+this.w,yy);
    //                 game.draw.rotate(rot);
    //                 game.draw.fillStyle=color;
    //                 game.draw.fillRect(this.w*-1,0,this.w,this.h);
    //             game.draw.restore();
    //             var xx=40*Math.cos((40-this.rot)*(Math.PI/180))+this.xpos;
    //             var yy=40*Math.sin((40-this.rot)*(Math.PI/180))+this.ypos;
    //             var rot=Math.atan2(yy-this.ypos,xx-this.xpos);
    //             //second circle
    //             var tx= (player.xpos+(player.w/2))-xx+1.5;
    //             var ty=(player.ypos+(player.h/2))-(yy-80);
    //             var d=Math.sqrt(tx*tx+ty*ty);
    //              if(d<=10){
    //               if(player.color!=color&&game.gameover==false){
    //                   game.gameover=true;
    //                   player_is_dead_();
    //               }
    //             }
    //              game.draw.save();
    //                 game.draw.translate(xx+this.w,yy-80);
    //                 game.draw.rotate(rot);
    //                 game.draw.fillStyle=color;
    //                 game.draw.fillRect(this.w*-1,0,this.w,this.h);
    //             game.draw.restore();
    //             var xx=40*Math.cos((180-this.rot)*(Math.PI/180))+this.xpos;
    //             var yy=40*Math.sin((180-this.rot)*(Math.PI/180))+this.ypos;
    //             var rot=Math.atan2(yy-this.ypos,xx-this.xpos);
    //             //third circle
    //             var tx= (player.xpos+(player.w/2))-xx+1.5;
    //             var ty=(player.ypos+(player.h/2))-(yy-160);
    //             var d=Math.sqrt(tx*tx+ty*ty);
    //              if(d<=10){
    //               if(player.color!=color&&game.gameover==false){
    //                   game.gameover=true;
    //                   player_is_dead_();
    //               }
    //             }
    //              game.draw.save();
    //                 game.draw.translate(xx+this.w,yy-160);
    //                 game.draw.rotate(rot);
    //                 game.draw.fillStyle=color;
    //                 game.draw.fillRect(this.w*-1,0,this.w,this.h);
    //             game.draw.restore();
    //             this.rot+=rad+this.rotsped;
                
    //         }
    //          if(this.switched==false){
    //             game.draw.save();
    //             game.draw.translate(player.xpos+10,coords.y_axis(this.y_axis-80));
    //             game.draw.rotate(this.rott*(Math.PI/180));
    //             game.draw.fillStyle="#999999";
    //             game.draw.fillRect(-7,-7,14,14);
    //             game.draw.restore();
    //             if(coords.y_axis(this.y_axis-80)>=player.ypos){
    //                this.switched=true;
    //                 player.color=colorz[Math.floor(Math.random()*colorz.length)];
    //                 score++;
    //             }
    //             this.rott+=2;
    //             if(this.rott>=360){
    //                 this.rott=0;
    //             }
    //         } 
    //     }
    //     this.check=function(i){
    //         if(this.ypos-160>game.h){
    //             _obs.splice(i,1);
    //         }
    //     }
    // }
    // //circle with inner circle
    // function obs6(){
    //     this.xpos=0;
    //     this.ypos=0;
    //     this.x_axis;
    //     this.y_axis;
    //     this.rot=0;
    //     this.rotsped=0.05;
    //     this.next=0;
    //     this.switched=false;
    //     this.rott=0;
    //     this.next=0;
    //     this.init=function(color,x_ax,y_ax){
    //         //axis is the distance in world point
    //         this.x_axis=x_ax;
    //         this.y_axis=y_ax*-1;
    //         this.color=color;
    //         this.xpos=200;
    //         this.next=y_ax+160;
    //     }
    //     this.draw=function(i){
    //         //360 is angle of circle then we divide to 30 to make a 30 squares
    //         var rad=360/30;
    //         //rotation start in zero
    //         var rot=0;
    //         //initialize color as empty
    //         var color="";
    //         //here is where the magic happens XD
    //         for(var i=0;i<30;i++){
    //             //here we solve the the position of the sqaure
    //             /*
    //                 for example the position of the middle of the circle is 193 and 80 is the distance of square rotating  in the middle of the circle. don`t the right term its call a radius i guess XD
    //             */
    //             var xx=80*Math.cos(this.rot*(Math.PI/180))+this.xpos;
    //             var yy=80*Math.sin(this.rot*(Math.PI/180))+coords.y_axis(this.y_axis);
    //             //then the first 10 square color is yello and second 10ns is red then last is yellow 10ns
    //             //if i value is less than 10 the color of the sqaure is yellow then if its greater than 10 ang less than
    //             //20 the color of the sqaure is yellow
    //             //then else if i value is greater than or equal to 20 the color is deepsky blue
    //             if(i<10){
    //                 color="purple";
    //             }else if(i>=10 && i<20){
    //                 color="cyan";
    //             }else{
    //                 color="yellow";
    //             }
    //             //then we check the coordinates of player and squares rotation in the circle if meet this condition
    //             if(xx<=player.xpos&&xx+10>=player.xpos&&yy<=player.ypos&&yy+10>=player.ypos){
    //                 //then we check if the color is not equal to player then the player is dead. 
    //                 //i put &&game.over==false to make it call inside statement of that if statement once.
    //               if(player.color!=color&&game.gameover==false){
    //                   game.gameover=true;
    //                   player_is_dead_();
    //               }
    //             }
    //             //in the top of this we check the head of the square, here we check the lower square if it collide to obstacle
    //             if(xx<=player.xpos+player.h&&xx+10>=player.xpos+player.h&&yy<=player.ypos+player.h&&yy+10>=player.ypos+player.h){
    //                 if(player.color!=color&&game.gameover==false){
    //                     game.gameover=true;
    //                     player_is_dead_();
    //               }
    //             }
    //             //draw the squares in circle
    //             game.draw.fillStyle=color;
    //             game.draw.fillRect(xx,yy,10,10);
    //             var xx=68*Math.cos((180-this.rot)*(Math.PI/180))+this.xpos;
    //             var yy=68*Math.sin((180-this.rot)*(Math.PI/180))+coords.y_axis(this.y_axis);
    //             game.draw.fillStyle=color;
    //             game.draw.fillRect(xx,yy,8,8);
    //             if(xx<=player.xpos&&xx+8>=player.xpos&&yy<=player.ypos&&yy+8>=player.ypos){
    //                 //then we check if the color is not equal to player then the player is dead. 
    //                 //i put &&game.over==false to make it call inside statement of that if statement once.
    //               if(player.color!=color&&game.gameover==false){
    //                   game.gameover=true;
    //                   player_is_dead_();
    //               }
    //             }
    //             //in the top of this we check the head of the square, here we check the lower square if it collide to obstacle
    //             if(xx<=player.xpos+player.h&&xx+8>=player.xpos+player.h&&yy<=player.ypos+player.h&&yy+8>=player.ypos+player.h){
    //                 if(player.color!=color&&game.gameover==false){
    //                     game.gameover=true;
    //                     player_is_dead_();
    //               }
    //             }
    //             //increment the rot in the value of rad+this.rotsped to make the sqaure rotate, if you`re  curious you can remove the +this.rotspedd; then you will see the sqaure in the circle will not rotate 
    //             //or you remove this.rot+=rad+this+this.rotsped; and check what will happens
    //             this.rot+=rad+this.rotsped;
                
    //         }
    //         if(this.switched==false){
    //             game.draw.save();
    //             game.draw.translate(player.xpos+10,coords.y_axis(this.y_axis));
    //             game.draw.rotate(this.rott*(Math.PI/180));
    //             game.draw.fillStyle="#999999";
    //             game.draw.fillRect(-7,-7,14,14);
    //             game.draw.restore();
    //             if(coords.y_axis(this.y_axis)>=player.ypos){
    //                this.switched=true;
    //                 player.color=colorz[Math.floor(Math.random()*colorz.length)];
    //                 score++;
    //             }
    //             this.rott+=2;
    //             if(this.rott>=360){
    //                 this.rott=0;
    //             }
    //         }
    //     }
    //     this.check=function(i){
    //         if(coords.y_axis(this.y_axis)-90>game.h){
    //             _obs.splice(i,1);   
    //         }
    //     }
    // }
    // function obs7(){
    //     this.xpos=0;
    //     this.xpos2=0;
    //     this.ypos=0;
    //     this.xpos3=0;
    //     this.ypos3=0;
    //     this.ypos2=0;
    //     this.x_axis;
    //     this.y_axis;
    //     this.color;
    //     this.sped=4.0;//you can modify this to change the speed of obstacle
    //     this.w=30;
    //     this.h=100;
    //     this.toright=false;
    //     this.toright2=false;
    //     this.toright3=false;
    //     this.wait=5;
    //     this.wait2=20;
    //     this.wait3=15;
    //     this.color2="orange";
    //     this.color3="deepskyblue";
    //     this.next=0;
    //     this.switched=false;
    //     this.rott=0;
    //     this.next=0;
    //     //when this function called in obj the obj1 in given index in _obs array will be initialize in given value
    //     this.init=function(color,x_ax,y_ax){
    //         //axis is the distance in world point
    //         this.x_axis=x_ax;
    //         this.y_axis=y_ax*-1;
    //         this.color="purple";
    //         this.xpos=0;
    //         this.next=y_ax+(110*2)+80;
    //         //_switch.push();
    //     }
    //     this.draw=function(){
    //         //this object movent will move to left and right
    //         if(this.toright==false){
    //             this.xpos-=this.sped;
    //             if(this.xpos<=0){
    //                 this.toright=true;
    //                 this.wait=5;
    //             }
    //         }else{
    //             if(this.wait>0&&this.xpos2<=0&&this.xpos3<=0){
    //                 this.wait-=0.2;
    //             }if(this.wait<=0){
    //                 this.xpos+=this.sped;
    //                 if(this.xpos+this.w>=400){
    //                     this.toright=false;
    //                 }  
    //             }
    //         }
    //         //draw enemy
    //         this.ypos=coords.y_axis(this.y_axis);
    //         game.draw.fillStyle=this.color;
    //         game.draw.fillRect(this.xpos,this.ypos,this.w,this.h); if(this.xpos<=player.xpos&&this.xpos+this.w>=player.xpos&&this.ypos<=player.ypos&&this.ypos+this.h>=player.ypos){
    //               if(player.color!=this.color&&game.gameover==false){
    //                   game.gameover=true;
    //                   player_is_dead_();
    //               }
    //         }
    //         if(this.xpos<=player.xpos+10&&this.xpos+this.w>=player.xpos+10&&this.ypos<=player.ypos+10&&this.ypos+this.h>=player.ypos+10){
    //               if(player.color!=this.color&&game.gameover==false){
    //                   game.gameover=true;
    //                   player_is_dead_();
    //               }
    //         }//
    //          //this object movent will move to left and right
    //         if( this.toright2==false){
    //             this.xpos2-=this.sped;
    //             if(this.xpos2<=0){
    //                 this.toright2=true;
    //                 this.wait2=25;
    //             }
    //         }else{
    //             if(this.wait2>0&&this.xpos3<=0){
    //                 this.wait2-=0.2;
    //             }if(this.wait2<=0){
    //                 this.xpos2+=this.sped;
    //                 if(this.xpos2+this.w>=400){
    //                     this.toright2=false;
    //                 }  
    //             }
    //         }
    //         //draw enemy
    //         this.ypos2=coords.y_axis(this.y_axis)-(110*1);
    //         game.draw.fillStyle=this.color2;
    //         game.draw.fillRect(this.xpos2,this.ypos2,this.w,this.h);
    //         if(this.xpos2<=player.xpos&&this.xpos2+this.w>=player.xpos&&
    //            this.ypos2<=player.ypos&&this.ypos2+this.h>=player.ypos
    //           ){
    //               if(player.color!=this.color2&&game.gameover==false){
    //                   game.gameover=true;
    //                   player_is_dead_();
    //               }
    //         }
    //         if(this.xpos2<=player.xpos+player.w&&this.xpos2+this.w>=player.xpos+player.w&&
    //            this.ypos2<=player.ypos+player.h&&this.ypos2+this.h>=player.ypos+player.h
    //           ){
    //               if(player.color!=this.color2&&game.gameover==false){
    //                   game.gameover=true;
    //                   player_is_dead_();
    //               }
    //         }
    //         if( this.toright3==false){
    //             this.xpos3-=this.sped;
    //             if(this.xpos3<=0){
    //                 this.toright3=true;
    //                 this.wait3=35;
    //             }
    //         }else{
    //             if(this.wait3>0){
    //                 this.wait3-=0.2;
    //             }else{
    //                 this.xpos3+=this.sped;
    //                 if(this.xpos3+this.w>=400){
    //                     this.toright3=false;
    //                 }  
    //             }
    //         }
    //         this.ypos3=coords.y_axis(this.y_axis)-(110*2);
    //         game.draw.fillStyle=this.color3;
    //         game.draw.fillRect(this.xpos3,this.ypos3,this.w,this.h);
    //         if(this.xpos3<=player.xpos&&this.xpos3+this.w>=player.xpos&&
    //            this.ypos3<=player.ypos&&this.ypos3+this.h>=player.ypos
    //           ){
    //               if(player.color!=this.color3&&game.gameover==false){
    //                   game.gameover=true;
    //                   player_is_dead_();
    //               }
    //         }
    //         if(this.xpos3<=player.xpos+player.w&&this.xpos3+this.w>=player.xpos+player.w&&
    //            this.ypos3<=player.ypos+player.h&&this.ypos3+this.h>=player.ypos+player.h
    //           ){
    //               if(player.color!=this.color3&&game.gameover==false){
    //                   game.gameover=true;
    //                   player_is_dead_();
    //               }
    //         }
    //         if(this.switched==false){
    //             game.draw.save();
    //             game.draw.translate(player.xpos+10,coords.y_axis(this.y_axis-60));
    //             game.draw.rotate(this.rott*(Math.PI/180));
    //             game.draw.fillStyle="#999999";
    //             game.draw.fillRect(-7,-7,14,14);
    //             game.draw.restore();
    //             if(coords.y_axis(this.y_axis-60)>=player.ypos){
    //                 this.switched=true;
    //                 player.color=colorz[Math.floor(Math.random()*colorz.length)];
    //                 score++;
    //             }
    //             this.rott+=2;
    //             if(this.rott>=360){
    //                 this.rott=0;
    //             }
    //         }
    //     }
    //     this.check=function(i){
    //         if(this.ypos-10>game.h){
    //             //_obs.splice(i,1);
    //         }
    //     }
    // }  