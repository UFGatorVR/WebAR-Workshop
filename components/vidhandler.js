AFRAME.registerComponent('vidhandler',{
    schema: {
        src: {type: 'string', default: ''}
    },

    init: function() {
        data = this.data
        this.video_src = data.src
        this.playing = true;
        console.log("Debug: Init");
        this.video = document.querySelector(this.video_src);
        this.video.play()
            .catch(function(error){
                window.addEventListener('touchstart',function(){
                    this.video.play();
                });
            });
    },

    tick: function() {
        if(!document.querySelector('#marker').object3D.visible && this.playing) {
            this.video.pause();
            this.playing=false;
        }
        else if (document.querySelector('#marker').object3D.visible && !this.playing) {
            this.video.play();
            this.playing = true;
        }
    }


});