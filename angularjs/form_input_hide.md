#An invalid form control with name='' is not focusable on hidden element

Like this, using a boolean for both ng-show and ng-required:
```
<form>
  <input type="text" ng-show="displayCondition" ng-required="displayCondition"/>
</form>
```
Good question - a lot of people do not realize that passing false into ng-required disables the directive.
