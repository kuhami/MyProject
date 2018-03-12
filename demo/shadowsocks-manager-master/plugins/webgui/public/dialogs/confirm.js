const app = angular.module('app');
const window = require('window');
const cdn = window.cdn || '';

app.factory('confirmDialog' , [ '$mdDialog', ($mdDialog) => {
  const publicInfo = { status: 'show' };
  let dialogPromise = null;
  const isDialogShow = () => {
    if(dialogPromise && !dialogPromise.$$state.status) {
      return true;
    }
    return false;
  };
  const show = (options = {}) => {
    publicInfo.status = 'show';
    const { text, cancel, confirm, error, fn } = options;
    publicInfo.text = text;
    publicInfo.cancel = cancel;
    publicInfo.confirm = confirm;
    publicInfo.error = error;
    publicInfo.fn = fn;
    if(isDialogShow()) {
      return dialogPromise;
    }
    dialogPromise = $mdDialog.show(dialog);
    return dialogPromise;
  };
  const cancelFn = () => {
    return $mdDialog.cancel().then(success => {
      dialogPromise = null;
      return;
    }).catch(err => {
      dialogPromise = null;
      return;
    });
  };
  const hideFn = () => {
    return $mdDialog.hide().then(success => {
      dialogPromise = null;
      return;
    }).catch(err => {
      dialogPromise = null;
      return;
    });
  };
  publicInfo.cancelFn = cancelFn;
  const confirmFn = () => {
    publicInfo.status = 'loading';
    publicInfo.fn().then(success => {
      hideFn();
    }).catch(() => {
      publicInfo.status = 'error';
    });
  };
  publicInfo.confirmFn = confirmFn;
  const dialog = {
    templateUrl: `${ cdn }/public/views/dialog/confirm.html`,
    escapeToClose: false,
    locals: { bind: publicInfo },
    bindToController: true,
    controller: ['$scope', '$mdDialog', 'bind', function($scope, $mdDialog, bind) {
      $scope.publicInfo = bind;
    }],
    clickOutsideToClose: false,
  };
  return {
    show,
  };
}]);