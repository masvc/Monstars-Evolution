$(document).ready(function () {
  let feedCount = localStorage.getItem("feedCount")
    ? parseInt(localStorage.getItem("feedCount"))
    : 0;

  function updateMonster() {
    if (feedCount >= 55) {
      $("#monster")
        .css({
          "background-image": "url('img/b.png')",
          width: "200px",
          height: "200px",
        })
        .attr("class", "stage-4");
    } else if (feedCount >= 30) {
      $("#monster")
        .css({
          "background-image": "url('img/s.png')",
          width: "120px",
          height: "120px",
        })
        .attr("class", "stage-3");
    } else if (feedCount >= 1) {
      $("#monster")
        .css({
          "background-image": "url('img/y.png')",
          width: "100px",
          height: "100px",
        })
        .attr("class", "stage-2");
    } else {
      $("#monster")
        .css({
          "background-image": "url('img/ball.png')",
          width: "80px",
          height: "80px",
        })
        .attr("class", "");
    }

    $("#counter").text("Lv. " + feedCount);
    localStorage.setItem("feedCount", feedCount);
  }

  $("#feedButton").click(function () {
    feedCount++;
    updateMonster();
  });

  $("#resetButton").click(function () {
    feedCount = 0;
    updateMonster();
  });

  updateMonster();
});
