/*
  *  *  *
    A component for handling the autoplay issue on mobile devices for <a-video> elements in aframe-ar 
  *  *  *
*/
AFRAME.registerComponent('vidhandler',{
    schema: {
        src: {type: 'string', default: ''},
        markerId: {type: 'string', default: ''}
    },

    init: function() {
        // Get parameters passed in from DOM instance
        data = this.data;

        // Localize the parameters or pull from the DOM
        this.markerId = data.markerId || "#"+this.el.parentEl.id;
        this.videoSrc = data.src || this.el.attributes.src.nodeValue;

        this.playing = true;

        // Try to play the video, catch (mobile) and wait for touchstart event
        this.video = document.querySelector(this.videoSrc);
        this.video.play()
            .catch(function(error){
                window.addEventListener('touchstart',function(){
                    this.video.play();
                });
            });
    },

    tick: function() {
        // Control the playing of the video based on presence of marker
        var isMarkerVisible = document.querySelector(this.markerId).object3D.visible
        if(!isMarkerVisible && this.playing) {
            this.video.pause();
            this.playing = false;
        }
        else if (isMarkerVisible && !this.playing) {
            this.video.play();
            this.playing = true;
        }
    }


});