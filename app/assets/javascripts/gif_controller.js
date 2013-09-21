function GifCtrl($scope, $timeout) {

  $scope.slides = [
    {text:'learn angular', duration:1, url: "http://media3.giphy.com/media/bTFKvbG4nDT5S/200.gif", selected:true},
    {text:'build an angular app', duration:2, url: "http://media.giphy.com/media/ubEPBAOWW3wA0/giphy.gif", selected:false},
    {text:'testing an angular app', duration:3, url: "http://media2.giphy.com/media/hb1W6zs55ZUIM/200.gif", selected:false}
  ];

  $scope.currentSlideIndex = 0;
  $scope.currentSlide = $scope.slides[0];
  $scope.previousSlide = $scope.slides[2];

  $scope.$watch('currentSlideIndex', function(newValue, oldValue) {
    $scope.previousSlide = $scope.slides[oldValue];
    $scope.currentSlide = $scope.slides[newValue];
    $scope.slides[newValue].selected = true;
    $scope.slides[oldValue].selected = false;
  });

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
                          duration:parseInt($scope.gif_duration),
                          url: $scope.gif_url});
      $scope.gif_text = $scope.gif_duration = $scope.gif_url = "";
    }
  };

  $scope.dragStart = function(e, ui) {
    ui.item.data('start', ui.item.index());
  };

  $scope.dragEnd = function(e, ui) {
    var start = ui.item.data('start'),
        end = ui.item.index();
    $scope.slides.splice(end, 0,
    $scope.slides.splice(start, 1)[0]);
  };

  sortableEle = $('#slides').sortable({
    start: $scope.dragStart,
    update: $scope.dragEnd
  });

  $scope.nextSlideIndex = function () {
    if ($scope.currentSlideIndex < $scope.slides.length - 1){
      return $scope.currentSlideIndex + 1;
    } else {
      return 0;
    }
  };

  $scope.rotateSlides = function() {
    $timeout($scope.rotateSlides, $scope.slides[$scope.nextSlideIndex()].duration * 1000);
    $scope.currentSlideIndex = $scope.nextSlideIndex();
  };
  $timeout($scope.rotateSlides, 1000);
}
