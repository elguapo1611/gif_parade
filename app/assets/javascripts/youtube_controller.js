function YoutubeCtrl($scope, $timeout) {
  $scope.youtube_url = "http://www.youtube.com/watch?v=kpy4xNAnWzM";
  $scope.youtube_start_time = 0;

  $scope.youtube_id = function() {
    return $scope.youtube_url.split('?v=')[1];
  };

  $scope.youtube_embeddable_url = function(code) {
    var youtubeBaseUrl = "http://www.youtube.com/embed/";
    var params = "?enablejsapi=1&controls=0&modestbranding=1&autoplay=1&start=0"
    return( youtubeBaseUrl + $scope.youtube_id() + params + "&origin=" + location.hostname);
  };

  $scope.youtube_embed = function() {
    var tag = document.createElement('script');
    tag.src = "http://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  };

  $scope.youtube_toggle = function () {
    if (window.player.getPlayerState() === 1) {
      window.player.pauseVideo();
    } else {
      window.player.playVideo();
    }
  };

  window.onYouTubeIframeAPIReady = function() {
    window.player = new YT.Player('player', {
      height: '390',
      width: '640',
      origin: location.origin,
      videoId: $scope.youtube_id(),
      playerVars: {
          'autoplay': 1,
          'controls': 0,
          'modestbranding': 1,
          'showinfo': 0,
          'loop': 1,
          'start': $scope.youtube_start_time
      }
    });
  };

  $scope.youtube_embed();
}