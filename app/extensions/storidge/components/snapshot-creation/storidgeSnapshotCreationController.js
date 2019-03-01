angular.module('portainer.docker')
.controller('StoridgeSnapshotCreationController', ['StoridgeSnapshotService', 'Notifications',
function (StoridgeSnapshotService, Notifications) {
  var ctrl = this;

  this.formValues = {};
  this.state = {
    actionInProgress: false
  };

  this.createSnapshot = function () {
    ctrl.state.actionInProgress = true;
    StoridgeSnapshotService.create(ctrl.volumeId, ctrl.formValues.Comment)
      .then(function success() {
        Notifications.success('Success', 'Snapshot successfully created');
        $state.reload();
      })
      .catch(function error(err) {
        Notifications.error('Failure', err, 'Unable to create snapshot');
      })
      .finally(function final() {
        ctrl.state.actionInProgress = false;
      });
  };

}]);
