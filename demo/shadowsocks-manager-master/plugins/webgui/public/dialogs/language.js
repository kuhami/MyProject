const app = angular.module('app');
const window = require('window');
const cdn = window.cdn || '';

app.factory('languageDialog' , [ '$mdDialog', $mdDialog => {
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
    templateUrl: `${ cdn }/public/views/dialog/language.html`,
    escapeToClose: false,
    locals: { bind: publicInfo },
    bindToController: true,
    controller: ['$scope', '$translate', '$localStorage', 'bind', function($scope, $translate, $localStorage, bind) {
      $scope.publicInfo = bind;
      $scope.publicInfo.myLanguage = $localStorage.language || navigator.language || 'zh-CN';
      $scope.chooseLanguage = () => {
        $translate.use($scope.publicInfo.myLanguage);
        $localStorage.language = $scope.publicInfo.myLanguage;
        $scope.publicInfo.hide();
      };
      $scope.languages = [
        { id: 'zh-CN', name: '中文' },
        { id: 'en-US', name: 'English' },
      ];
    }],
    clickOutsideToClose: true,
  };
  const show = (accountMethod, accountInfo) => {
    if(isDialogShow()) {
      return dialogPromise;
    }
    dialogPromise = $mdDialog.show(dialog);
    return dialogPromise;
  };
  return {
    show,
    hide,
  };
}]);