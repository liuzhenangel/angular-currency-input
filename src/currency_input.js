angular.directive('currencyInput', function() {
  return {
    restrict: 'E',
    scope: {
      field: '='
    },
    replace: true,
    template: '<input type="text"></input>',
    link: function(scope, element, attrs) {
      var doWithDecimal, input, updateInputValue;
      doWithDecimal = function(inputVal) {
        if (!inputVal) {
          return '0';
        }
        if (typeof inputVal === 'string') {
          inputVal = inputVal.replace(/[^\d.\',']/g, '');
          inputVal = inputVal.replace(/,/g, '');
          inputVal = inputVal.substring(0, 15);
        }
        return new BigNumber(inputVal).toFormat();
      };
      input = element;
      updateInputValue = function(inputVal) {
        var res;
        res = doWithDecimal(inputVal);
        input.val(res);
        return input.data('origin-val', res.replace(/,/g, ''));
      };
      scope.$watch('field', function() {
        var inputVal;
        inputVal = scope.field;
        updateInputValue(inputVal);
      });
      $(element).bind('keyup', (function(_this) {
        return function(e) {
          var inputVal;
          inputVal = input.val();
          updateInputValue(inputVal);
          scope.$apply(function() {
            scope.field = Number(input.data('origin-val'));
          });
        };
      })(this));
    }
  };
});
