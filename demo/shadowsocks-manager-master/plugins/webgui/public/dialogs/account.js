const app = angular.module('app');
const window = require('window');
const cdn = window.cdn || '';

app.factory('accountSortTool', [ () => {
  const sort = (accountInfo, method) => {
    accountInfo.account = accountInfo.originalAccount.sort((a, b) => {
      if(method.sort === 'port_asc') {
        return a.port >= b.port ? 1 : -1;
      } else if (method.sort === 'port_desc') {
        return a.port <= b.port ? 1 : -1;
      } else if (method.sort === 'expire_desc') {
        if(!a.data) { return -1; }
        if(!b.data) { return 1; }
        return a.data.expire <= b.data.expire ? 1 : -1;
      } else if (method.sort === 'expire_asc') {
        if(!a.data) { return 1; }
        if(!b.data) { return -1; }
        return a.data.expire >= b.data.expire ? 1 : -1;
      }
    });
    accountInfo.account = accountInfo.account.filter(f => {
      let show = true;
      if(!method.filter.unlimit && f.type === 1) {
        show = false;
      }
      if(!method.filter.expired && f.data && f.data.expire >= Date.now()) {
        show = false;
      }
      if(!method.filter.unexpired && f.data && f.data.expire <= Date.now()) {
        show = false;
      }
      return show;
    });
  };
  return sort;
}]);

app.factory('accountSortDialog' , [ '$mdDialog', ($mdDialog) => {
  const publicInfo = {};
  const hide = () => {
    return $mdDialog.hide()
    .then(success => {
      dialogPromise = null;
      return;
    }).catch(err => {
      dialogPromise = null;
      return;
    });
  };
  publicInfo.hide = hide;
  let dialogPromise = null;
  const isDialogShow = () => {
    if(dialogPromise && !dialogPromise.$$state.status) {
      return true;
    }
    return false;
  };
  const dialog = {
    templateUrl: `${ cdn }/public/views/admin/accountSortAndFilterDialog.html`,
    escapeToClose: false,
    locals: { bind: publicInfo },
    bindToController: true,
    controller: ['$scope', '$mdDialog', '$sessionStorage', 'accountSortTool', 'bind', function($scope, $mdDialog, $sessionStorage, accountSortTool, bind) {
      $scope.publicInfo = bind;
      $scope.sortAndFilter = () => {
        accountSortTool($scope.publicInfo.accountInfo, $scope.publicInfo.accountMethod);
      };
    }],
    clickOutsideToClose: true,
  };
  const show = (accountMethod, accountInfo) => {
    if(isDialogShow()) {
      return dialogPromise;
    }
    publicInfo.accountMethod = accountMethod;
    publicInfo.accountInfo = accountInfo;
    dialogPromise = $mdDialog.show(dialog);
    return dialogPromise;
  };
  return {
    show,
    hide,
  };
}]);