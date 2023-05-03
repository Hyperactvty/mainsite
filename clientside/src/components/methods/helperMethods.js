function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[0][1]}`,
    };
  }


  /**
    loadImg({ src : document.getElementById("braydenLogoToGoHome").src, maxSeconds : 10 }, function(status) {
        if(status.err) {
            // handle error
            console.log("Error",status.err);
            return;
        }
        console.log("Loaded", status.img);
        // you got the img within status.img
    }); 
   * 
   */
  function loadImg(options, callback) {
    var seconds = 0,
    maxSeconds = 10,
    complete = false,
    done = false;
  
    if (options.maxSeconds) {
      maxSeconds = options.maxSeconds;
    }
  
    function tryImage() {
      if (done) { return; }
      if (seconds >= maxSeconds) {
        callback({ err: 'timeout' });
        done = true;
        return;
      }
      if (complete && img.complete) {
        if (img.width && img.height) {
          callback({ img: img });
          done = true;
          return;
        }
        callback({ err: '404' });
        done = true;
        return;
      } else if (img.complete) {
        complete = true;
      }
      seconds++;
      callback.tryImage = setTimeout(tryImage, 1000);
    }
    var img = new Image();
    img.onload = tryImage();
    img.src = options.src;
    tryImage();
  }
class Str {
  // def IsAre(word):
  //   print(type(word))
  //   if(type(word)==list):
  //     if(len(word)>1): return 'are'
  //   return 'is'
}
export {stringToColor, stringAvatar, loadImg};