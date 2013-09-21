function GifCtrl($scope) {
  $scope.slides = [
    {text:'learn angular', duration:1, url: "someurl"},
    {text:'build an angular app', duration:2, url: "someurl"}
  ];

  $scope.slide_length = function() {
    return $scope.slides.length;
  };

  $scope.total_time = function() {
    var count = 0;
    angular.forEach($scope.slides, function(slide){
      count += slide.duration;
    })
    return count;
  };

  $scope.add_slide = function(form) {
    if (form.$valid) {
      $scope.slides.push({text: $scope.gif_text,
                          duration:to_time_code($scope.gif_duration),
                          url: $scope.gif_url});
      $scope.gif_text = $scope.gif_duration = $scope.gif_url = "";
    }
  };

  $scope.dragStart = function(e, ui) {
    ui.item.data('start', ui.item.index());
  }
  $scope.dragEnd = function(e, ui) {
    var start = ui.item.data('start'),
        end = ui.item.index();

    $scope.slides.splice(end, 0, 
    $scope.slides.splice(start, 1)[0]);

    $scope.$apply();
  }

  function to_time_code(timecode) {
    return parseInt(timecode);
  }

  sortableEle = $('#slides').sortable({
    start: $scope.dragStart,
    update: $scope.dragEnd
  });
}