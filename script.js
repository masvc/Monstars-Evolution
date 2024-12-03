$(document).ready(function () {
  let feedCount = localStorage.getItem("feedCount")
    ? parseInt(localStorage.getItem("feedCount"))
    : 0;

  let stats = JSON.parse(localStorage.getItem("stats")) || {
    totalFeeds: 0,
    evolutionCount: 0,
    playTime: 0,
    lastPlayed: new Date().toISOString(),
  };

  function updateHappiness() {
    const currentTime = new Date();
    const lastPlayed = new Date(stats.lastPlayed);
    const timeDiff = (currentTime - lastPlayed) / (1000 * 60);
    const happiness = Math.max(0, Math.min(100, 100 - timeDiff));

    $(".happiness-meter").css("width", happiness + "%");
    $("#happiness-value").text(Math.round(happiness));
  }

  function updateStats() {
    $("#total-feeds").text(stats.totalFeeds);
    $("#evolution-count").text(stats.evolutionCount);
    const lastPlayed = new Date(stats.lastPlayed);
    const now = new Date();
    const playTimeInMinutes = Math.floor((now - lastPlayed) / (1000 * 60));
    stats.playTime = playTimeInMinutes;
    $("#play-time").text(playTimeInMinutes);
  }

  function updateMonster() {
    const previousStage = $("#monster").attr("class");

    if (feedCount >= 55) {
      if (previousStage !== "stage-4") {
        stats.evolutionCount = 3; // 全進化段階を達成
      }
      $("#monster")
        .css({
          "background-image": "url('img/b.png')",
          width: "200px",
          height: "200px",
        })
        .attr("class", "stage-4");
    } else if (feedCount >= 30) {
      if (previousStage !== "stage-3") {
        stats.evolutionCount = 2; // 2段階目まで進化
      }
      $("#monster")
        .css({
          "background-image": "url('img/s.png')",
          width: "120px",
          height: "120px",
        })
        .attr("class", "stage-3");
    } else if (feedCount >= 1) {
      if (previousStage !== "stage-2") {
        stats.evolutionCount = 1; // 1段階目まで進化
      }
      $("#monster")
        .css({
          "background-image": "url('img/y.png')",
          width: "100px",
          height: "100px",
        })
        .attr("class", "stage-2");
    } else {
      stats.evolutionCount = 0; // 初期状態
      $("#monster")
        .css({
          "background-image": "url('img/ball.png')",
          width: "80px",
          height: "80px",
        })
        .attr("class", "");
    }

    updateHappiness();
    updateStats();
    $("#counter").text("Lv. " + feedCount);
    localStorage.setItem("feedCount", feedCount);
    localStorage.setItem("stats", JSON.stringify(stats));
  }

  $("#feedButton").click(function () {
    feedCount++;
    stats.totalFeeds++;
    stats.lastPlayed = new Date().toISOString();
    $("#monster").addClass("feed-effect");
    setTimeout(() => $("#monster").removeClass("feed-effect"), 300);
    updateMonster();
  });

  $("#resetButton").click(function () {
    if (confirm("本当にリセットしますか？")) {
      feedCount = 0;
      stats = {
        totalFeeds: 0,
        evolutionCount: 0,
        playTime: 0,
        lastPlayed: new Date().toISOString(),
      };
      updateMonster();
    }
  });

  // 定期的な更新
  setInterval(updateHappiness, 60000);
  setInterval(updateStats, 60000);

  // 初期化
  updateMonster();
});
