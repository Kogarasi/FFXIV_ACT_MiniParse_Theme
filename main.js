var app = angular.module( 'miniparse', []);

app.controller( 'mainController', [ "$scope", function( $scope ){

  document.addEventListener("onOverlayDataUpdate", function(e){
    onOverlayDataUpdate(e.detail);
  });

  function onOverlayDataUpdate(data){
    $scope.$apply(function(){
      $scope.totalDPS = data.Encounter.encdps;
      $scope.duration = data.Encounter.duration;
      $scope.location = data.Encounter.CurrentZoneName;

      $scope.characters = [];
      angular.forEach(data.Combatant, function(value, key){
        $scope.characters.push({
          name: value.name,
          job: value.Job,
          dps: value.encdps,
          crit: value["crithit%"],
          directHit: value.DirectHitPct,
          critDirectHit: value.CritDirectHitPct,
          roll: checkRoll(value.Job),
          dpsrate: value.encdps/$scope.totalDPS*100*4
          //hit: value.tohit
        });
      });

    })
  }

  function checkRoll(job){
    var rollType = {
      Gla: "tank",
      Pld: "tank",
      Mrd: "tank",
      War: "tank",
      Drk: "tank",
      Gnb: "tank",

      Cnj: "healer",
      Whm: "healer",
      Sch: "healer",
      Ast: "healer",

      Pgl: "dps",
      Mnk: "dps",
      Lnc: "dps",
      Drg: "dps",
      Rog: "dps",
      Nin: "dps",
      Sam: "dps",

      Arc: "dps",
      Brd: "dps",
      Mch: "dps",
      Thm: "dps",
      Blm: "dps",
      Acn: "dps",
      Smn: "dps",
      Rdm: "dps",
      Dnc: "dps",
    };

    return rollType[job];
  }
}]);
