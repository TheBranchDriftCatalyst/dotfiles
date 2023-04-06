var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function($array$$) {
  var $index$$ = 0;
  return function() {
    return $index$$ < $array$$.length ? {done:!1, value:$array$$[$index$$++]} : {done:!0};
  };
};
$jscomp.arrayIterator = function($array$$) {
  return {next:$jscomp.arrayIteratorImpl($array$$)};
};
$jscomp.makeIterator = function($iterable$$) {
  var $iteratorFunction$$ = "undefined" != typeof Symbol && Symbol.iterator && $iterable$$[Symbol.iterator];
  return $iteratorFunction$$ ? $iteratorFunction$$.call($iterable$$) : $jscomp.arrayIterator($iterable$$);
};
$jscomp.findInternal = function($array$$, $callback$$, $thisArg$$) {
  $array$$ instanceof String && ($array$$ = String($array$$));
  for (var $len$$ = $array$$.length, $i$$ = 0; $i$$ < $len$$; $i$$++) {
    var $value$$ = $array$$[$i$$];
    if ($callback$$.call($thisArg$$, $value$$, $i$$, $array$$)) {
      return {i:$i$$, v:$value$$};
    }
  }
  return {i:-1, v:void 0};
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function($target$$, $property$$, $descriptor$$) {
  $target$$ != Array.prototype && $target$$ != Object.prototype && ($target$$[$property$$] = $descriptor$$.value);
};
$jscomp.getGlobal = function($maybeGlobal$$) {
  return "undefined" != typeof window && window === $maybeGlobal$$ ? $maybeGlobal$$ : "undefined" != typeof global && null != global ? global : $maybeGlobal$$;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function($property$jscomp$5_split_target$$, $impl_polyfill$$) {
  if ($impl_polyfill$$) {
    var $obj$$ = $jscomp.global;
    $property$jscomp$5_split_target$$ = $property$jscomp$5_split_target$$.split(".");
    for (var $i$$ = 0; $i$$ < $property$jscomp$5_split_target$$.length - 1; $i$$++) {
      var $key$$ = $property$jscomp$5_split_target$$[$i$$];
      $key$$ in $obj$$ || ($obj$$[$key$$] = {});
      $obj$$ = $obj$$[$key$$];
    }
    $property$jscomp$5_split_target$$ = $property$jscomp$5_split_target$$[$property$jscomp$5_split_target$$.length - 1];
    $i$$ = $obj$$[$property$jscomp$5_split_target$$];
    $impl_polyfill$$ = $impl_polyfill$$($i$$);
    $impl_polyfill$$ != $i$$ && null != $impl_polyfill$$ && $jscomp.defineProperty($obj$$, $property$jscomp$5_split_target$$, {configurable:!0, writable:!0, value:$impl_polyfill$$});
  }
};
$jscomp.checkStringArgs = function($thisArg$$, $arg$$, $func$$) {
  if (null == $thisArg$$) {
    throw new TypeError("The 'this' value for String.prototype." + $func$$ + " must not be null or undefined");
  }
  if ($arg$$ instanceof RegExp) {
    throw new TypeError("First argument to String.prototype." + $func$$ + " must not be a regular expression");
  }
  return $thisArg$$ + "";
};
var goog = goog || {};
goog.global = this;
goog.isDef = function($val$$) {
  return void 0 !== $val$$;
};
goog.isString = function($val$$) {
  return "string" == typeof $val$$;
};
goog.isBoolean = function($val$$) {
  return "boolean" == typeof $val$$;
};
goog.isNumber = function($val$$) {
  return "number" == typeof $val$$;
};
goog.exportPath_ = function($name$$, $opt_object$$, $cur_opt_objectToExportTo$$) {
  $name$$ = $name$$.split(".");
  $cur_opt_objectToExportTo$$ = $cur_opt_objectToExportTo$$ || goog.global;
  $name$$[0] in $cur_opt_objectToExportTo$$ || "undefined" == typeof $cur_opt_objectToExportTo$$.execScript || $cur_opt_objectToExportTo$$.execScript("var " + $name$$[0]);
  for (var $part$$; $name$$.length && ($part$$ = $name$$.shift());) {
    !$name$$.length && goog.isDef($opt_object$$) ? $cur_opt_objectToExportTo$$[$part$$] = $opt_object$$ : $cur_opt_objectToExportTo$$ = $cur_opt_objectToExportTo$$[$part$$] && $cur_opt_objectToExportTo$$[$part$$] !== Object.prototype[$part$$] ? $cur_opt_objectToExportTo$$[$part$$] : $cur_opt_objectToExportTo$$[$part$$] = {};
  }
};
goog.define = function($name$$, $defaultValue$jscomp$2_value$$) {
  goog.exportPath_($name$$, $defaultValue$jscomp$2_value$$);
};
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.TRUSTED_SITE = !0;
goog.STRICT_MODE_COMPATIBLE = !1;
goog.DISALLOW_TEST_ONLY_CODE = !goog.DEBUG;
goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING = !1;
goog.provide = function($name$$) {
  if (goog.isInModuleLoader_()) {
    throw Error("goog.provide cannot be used within a module.");
  }
  goog.constructNamespace_($name$$);
};
goog.constructNamespace_ = function($name$$, $opt_obj$$) {
  goog.exportPath_($name$$, $opt_obj$$);
};
goog.getScriptNonce = function() {
  null === goog.cspNonce_ && (goog.cspNonce_ = goog.getScriptNonce_(goog.global.document) || "");
  return goog.cspNonce_;
};
goog.NONCE_PATTERN_ = /^[\w+/_-]+[=]{0,2}$/;
goog.cspNonce_ = null;
goog.getScriptNonce_ = function($doc_nonce_script$$) {
  return ($doc_nonce_script$$ = $doc_nonce_script$$.querySelector && $doc_nonce_script$$.querySelector("script[nonce]")) && ($doc_nonce_script$$ = $doc_nonce_script$$.nonce || $doc_nonce_script$$.getAttribute("nonce")) && goog.NONCE_PATTERN_.test($doc_nonce_script$$) ? $doc_nonce_script$$ : null;
};
goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
goog.module = function($name$$) {
  if (!goog.isString($name$$) || !$name$$ || -1 == $name$$.search(goog.VALID_MODULE_RE_)) {
    throw Error("Invalid module identifier");
  }
  if (!goog.isInGoogModuleLoader_()) {
    throw Error("Module " + $name$$ + " has been loaded incorrectly. Note, modules cannot be loaded as normal scripts. They require some kind of pre-processing step. You're likely trying to load a module via a script tag or as a part of a concatenated bundle without rewriting the module. For more info see: https://github.com/google/closure-library/wiki/goog.module:-an-ES6-module-like-alternative-to-goog.provide.");
  }
  if (goog.moduleLoaderState_.moduleName) {
    throw Error("goog.module may only be called once per module.");
  }
  goog.moduleLoaderState_.moduleName = $name$$;
};
goog.module.get = function($name$$) {
  return null;
};
goog.module.getInternal_ = function() {
  return null;
};
goog.ModuleType = {ES6:"es6", GOOG:"goog"};
goog.moduleLoaderState_ = null;
goog.isInModuleLoader_ = function() {
  return goog.isInGoogModuleLoader_() || goog.isInEs6ModuleLoader_();
};
goog.isInGoogModuleLoader_ = function() {
  return !!goog.moduleLoaderState_ && goog.moduleLoaderState_.type == goog.ModuleType.GOOG;
};
goog.isInEs6ModuleLoader_ = function() {
  var $inLoader_jscomp$$ = !!goog.moduleLoaderState_ && goog.moduleLoaderState_.type == goog.ModuleType.ES6;
  return $inLoader_jscomp$$ ? !0 : ($inLoader_jscomp$$ = goog.global.$jscomp) ? "function" != typeof $inLoader_jscomp$$.getCurrentModulePath ? !1 : !!$inLoader_jscomp$$.getCurrentModulePath() : !1;
};
goog.module.declareLegacyNamespace = function() {
  goog.moduleLoaderState_.declareLegacyNamespace = !0;
};
goog.declareModuleId = function($namespace$$) {
  if (goog.moduleLoaderState_) {
    goog.moduleLoaderState_.moduleName = $namespace$$;
  } else {
    var $exports_jscomp$$ = goog.global.$jscomp;
    if (!$exports_jscomp$$ || "function" != typeof $exports_jscomp$$.getCurrentModulePath) {
      throw Error('Module with namespace "' + $namespace$$ + '" has been loaded incorrectly.');
    }
    $exports_jscomp$$ = $exports_jscomp$$.require($exports_jscomp$$.getCurrentModulePath());
    goog.loadedModules_[$namespace$$] = {exports:$exports_jscomp$$, type:goog.ModuleType.ES6, moduleId:$namespace$$};
  }
};
goog.module.declareNamespace = goog.declareModuleId;
goog.setTestOnly = function($opt_message$$) {
  if (goog.DISALLOW_TEST_ONLY_CODE) {
    throw $opt_message$$ = $opt_message$$ || "", Error("Importing test-only code into non-debug environment" + ($opt_message$$ ? ": " + $opt_message$$ : "."));
  }
};
goog.forwardDeclare = function() {
};
goog.getObjectByName = function($name$jscomp$75_parts$$, $cur$jscomp$1_opt_obj$$) {
  $name$jscomp$75_parts$$ = $name$jscomp$75_parts$$.split(".");
  $cur$jscomp$1_opt_obj$$ = $cur$jscomp$1_opt_obj$$ || goog.global;
  for (var $i$$ = 0; $i$$ < $name$jscomp$75_parts$$.length; $i$$++) {
    if ($cur$jscomp$1_opt_obj$$ = $cur$jscomp$1_opt_obj$$[$name$jscomp$75_parts$$[$i$$]], !goog.isDefAndNotNull($cur$jscomp$1_opt_obj$$)) {
      return null;
    }
  }
  return $cur$jscomp$1_opt_obj$$;
};
goog.globalize = function($obj$$, $global$$) {
  $global$$ = $global$$ || goog.global;
  for (var $x$$ in $obj$$) {
    $global$$[$x$$] = $obj$$[$x$$];
  }
};
goog.addDependency = function() {
};
goog.useStrictRequires = !1;
goog.ENABLE_DEBUG_LOADER = !0;
goog.logToConsole_ = function($msg$$) {
  goog.global.console && goog.global.console.error($msg$$);
};
goog.require = function() {
};
goog.requireType = function() {
  return {};
};
goog.basePath = "";
goog.nullFunction = function() {
};
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function($ctor$$) {
  $ctor$$.instance_ = void 0;
  $ctor$$.getInstance = function() {
    if ($ctor$$.instance_) {
      return $ctor$$.instance_;
    }
    goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = $ctor$$);
    return $ctor$$.instance_ = new $ctor$$;
  };
};
goog.instantiatedSingletons_ = [];
goog.LOAD_MODULE_USING_EVAL = !0;
goog.SEAL_MODULE_EXPORTS = goog.DEBUG;
goog.loadedModules_ = {};
goog.DEPENDENCIES_ENABLED = !1;
goog.TRANSPILE = "detect";
goog.TRANSPILE_TO_LANGUAGE = "";
goog.TRANSPILER = "transpile.js";
goog.hasBadLetScoping = null;
goog.useSafari10Workaround = function() {
  if (null == goog.hasBadLetScoping) {
    try {
      var $hasBadLetScoping$$ = !eval('"use strict";let x = 1; function f() { return typeof x; };f() == "number";');
    } catch ($e$$) {
      $hasBadLetScoping$$ = !1;
    }
    goog.hasBadLetScoping = $hasBadLetScoping$$;
  }
  return goog.hasBadLetScoping;
};
goog.workaroundSafari10EvalBug = function($moduleDef$$) {
  return "(function(){" + $moduleDef$$ + "\n;})();\n";
};
goog.loadModule = function($moduleDef$$) {
  var $previousState$$ = goog.moduleLoaderState_;
  try {
    goog.moduleLoaderState_ = {moduleName:"", declareLegacyNamespace:!1, type:goog.ModuleType.GOOG};
    if (goog.isFunction($moduleDef$$)) {
      var $exports$$ = $moduleDef$$.call(void 0, {});
    } else {
      if (goog.isString($moduleDef$$)) {
        goog.useSafari10Workaround() && ($moduleDef$$ = goog.workaroundSafari10EvalBug($moduleDef$$)), $exports$$ = goog.loadModuleFromSource_.call(void 0, $moduleDef$$);
      } else {
        throw Error("Invalid module definition");
      }
    }
    var $moduleName$$ = goog.moduleLoaderState_.moduleName;
    if (goog.isString($moduleName$$) && $moduleName$$) {
      goog.moduleLoaderState_.declareLegacyNamespace ? goog.constructNamespace_($moduleName$$, $exports$$) : goog.SEAL_MODULE_EXPORTS && Object.seal && "object" == typeof $exports$$ && null != $exports$$ && Object.seal($exports$$);
      var $data$$ = {exports:$exports$$, type:goog.ModuleType.GOOG, moduleId:goog.moduleLoaderState_.moduleName};
      goog.loadedModules_[$moduleName$$] = $data$$;
    } else {
      throw Error('Invalid module name "' + $moduleName$$ + '"');
    }
  } finally {
    goog.moduleLoaderState_ = $previousState$$;
  }
};
goog.loadModuleFromSource_ = function($JSCompiler_OptimizeArgumentsArray_p0$$) {
  var $exports$$ = {};
  eval($JSCompiler_OptimizeArgumentsArray_p0$$);
  return $exports$$;
};
goog.normalizePath_ = function($components_path$$) {
  $components_path$$ = $components_path$$.split("/");
  for (var $i$$ = 0; $i$$ < $components_path$$.length;) {
    "." == $components_path$$[$i$$] ? $components_path$$.splice($i$$, 1) : $i$$ && ".." == $components_path$$[$i$$] && $components_path$$[$i$$ - 1] && ".." != $components_path$$[$i$$ - 1] ? $components_path$$.splice(--$i$$, 2) : $i$$++;
  }
  return $components_path$$.join("/");
};
goog.loadFileSync_ = function($src$$) {
  if (goog.global.CLOSURE_LOAD_FILE_SYNC) {
    return goog.global.CLOSURE_LOAD_FILE_SYNC($src$$);
  }
  try {
    var $xhr$$ = new goog.global.XMLHttpRequest;
    $xhr$$.open("get", $src$$, !1);
    $xhr$$.send();
    return 0 == $xhr$$.status || 200 == $xhr$$.status ? $xhr$$.responseText : null;
  } catch ($err$$) {
    return null;
  }
};
goog.transpile_ = function($code$jscomp$0$$, $path$jscomp$0$$, $target$$) {
  var $jscomp$$ = goog.global.$jscomp;
  $jscomp$$ || (goog.global.$jscomp = $jscomp$$ = {});
  var $transpile$$ = $jscomp$$.transpile;
  if (!$transpile$$) {
    var $transpilerPath$$ = goog.basePath + goog.TRANSPILER, $transpilerCode$$ = goog.loadFileSync_($transpilerPath$$);
    if ($transpilerCode$$) {
      (function() {
        eval($transpilerCode$$ + "\n//# sourceURL=" + $transpilerPath$$);
      }).call(goog.global);
      if (goog.global.$gwtExport && goog.global.$gwtExport.$jscomp && !goog.global.$gwtExport.$jscomp.transpile) {
        throw Error('The transpiler did not properly export the "transpile" method. $gwtExport: ' + JSON.stringify(goog.global.$gwtExport));
      }
      goog.global.$jscomp.transpile = goog.global.$gwtExport.$jscomp.transpile;
      $jscomp$$ = goog.global.$jscomp;
      $transpile$$ = $jscomp$$.transpile;
    }
  }
  if (!$transpile$$) {
    var $suffix$$ = " requires transpilation but no transpiler was found.";
    $suffix$$ += ' Please add "//javascript/closure:transpiler" as a data dependency to ensure it is included.';
    $transpile$$ = $jscomp$$.transpile = function($code$jscomp$0$$, $path$jscomp$0$$) {
      goog.logToConsole_($path$jscomp$0$$ + $suffix$$);
      return $code$jscomp$0$$;
    };
  }
  return $transpile$$($code$jscomp$0$$, $path$jscomp$0$$, $target$$);
};
goog.typeOf = function($value$$) {
  var $s$$ = typeof $value$$;
  if ("object" == $s$$) {
    if ($value$$) {
      if ($value$$ instanceof Array) {
        return "array";
      }
      if ($value$$ instanceof Object) {
        return $s$$;
      }
      var $className$$ = Object.prototype.toString.call($value$$);
      if ("[object Window]" == $className$$) {
        return "object";
      }
      if ("[object Array]" == $className$$ || "number" == typeof $value$$.length && "undefined" != typeof $value$$.splice && "undefined" != typeof $value$$.propertyIsEnumerable && !$value$$.propertyIsEnumerable("splice")) {
        return "array";
      }
      if ("[object Function]" == $className$$ || "undefined" != typeof $value$$.call && "undefined" != typeof $value$$.propertyIsEnumerable && !$value$$.propertyIsEnumerable("call")) {
        return "function";
      }
    } else {
      return "null";
    }
  } else {
    if ("function" == $s$$ && "undefined" == typeof $value$$.call) {
      return "object";
    }
  }
  return $s$$;
};
goog.isNull = function($val$$) {
  return null === $val$$;
};
goog.isDefAndNotNull = function($val$$) {
  return null != $val$$;
};
goog.isArray = function($val$$) {
  return "array" == goog.typeOf($val$$);
};
goog.isArrayLike = function($val$$) {
  var $type$$ = goog.typeOf($val$$);
  return "array" == $type$$ || "object" == $type$$ && "number" == typeof $val$$.length;
};
goog.isDateLike = function($val$$) {
  return goog.isObject($val$$) && "function" == typeof $val$$.getFullYear;
};
goog.isFunction = function($val$$) {
  return "function" == goog.typeOf($val$$);
};
goog.isObject = function($val$$) {
  var $type$$ = typeof $val$$;
  return "object" == $type$$ && null != $val$$ || "function" == $type$$;
};
goog.getUid = function($obj$$) {
  return $obj$$[goog.UID_PROPERTY_] || ($obj$$[goog.UID_PROPERTY_] = ++goog.uidCounter_);
};
goog.hasUid = function($obj$$) {
  return !!$obj$$[goog.UID_PROPERTY_];
};
goog.removeUid = function($obj$$) {
  null !== $obj$$ && "removeAttribute" in $obj$$ && $obj$$.removeAttribute(goog.UID_PROPERTY_);
  try {
    delete $obj$$[goog.UID_PROPERTY_];
  } catch ($ex$$) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + (1e9 * Math.random() >>> 0);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function($obj$$) {
  var $clone_type$$ = goog.typeOf($obj$$);
  if ("object" == $clone_type$$ || "array" == $clone_type$$) {
    if ("function" === typeof $obj$$.clone) {
      return $obj$$.clone();
    }
    $clone_type$$ = "array" == $clone_type$$ ? [] : {};
    for (var $key$$ in $obj$$) {
      $clone_type$$[$key$$] = goog.cloneObject($obj$$[$key$$]);
    }
    return $clone_type$$;
  }
  return $obj$$;
};
goog.bindNative_ = function($fn$$, $selfObj$$, $var_args$$) {
  return $fn$$.call.apply($fn$$.bind, arguments);
};
goog.bindJs_ = function($fn$$, $selfObj$$, $var_args$$) {
  if (!$fn$$) {
    throw Error();
  }
  if (2 < arguments.length) {
    var $boundArgs$$ = Array.prototype.slice.call(arguments, 2);
    return function() {
      var $var_args$$ = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply($var_args$$, $boundArgs$$);
      return $fn$$.apply($selfObj$$, $var_args$$);
    };
  }
  return function() {
    return $fn$$.apply($selfObj$$, arguments);
  };
};
goog.bind = function($fn$$, $selfObj$$, $var_args$$) {
  Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bind = goog.bindNative_ : goog.bind = goog.bindJs_;
  return goog.bind.apply(null, arguments);
};
goog.partial = function($fn$$, $var_args$$) {
  var $args$$ = Array.prototype.slice.call(arguments, 1);
  return function() {
    var $var_args$$ = $args$$.slice();
    $var_args$$.push.apply($var_args$$, arguments);
    return $fn$$.apply(this, $var_args$$);
  };
};
goog.mixin = function($target$$, $source$$) {
  for (var $x$$ in $source$$) {
    $target$$[$x$$] = $source$$[$x$$];
  }
};
goog.now = goog.TRUSTED_SITE && Date.now || function() {
  return +new Date;
};
goog.globalEval = function($script$$) {
  if (goog.global.execScript) {
    goog.global.execScript($script$$, "JavaScript");
  } else {
    if (goog.global.eval) {
      if (null == goog.evalWorksForGlobals_) {
        try {
          goog.global.eval("var _evalTest_ = 1;");
        } catch ($ignore$$) {
        }
        if ("undefined" != typeof goog.global._evalTest_) {
          try {
            delete goog.global._evalTest_;
          } catch ($ignore$2$$) {
          }
          goog.evalWorksForGlobals_ = !0;
        } else {
          goog.evalWorksForGlobals_ = !1;
        }
      }
      if (goog.evalWorksForGlobals_) {
        goog.global.eval($script$$);
      } else {
        var $doc$$ = goog.global.document, $scriptElt$$ = $doc$$.createElement("SCRIPT");
        $scriptElt$$.type = "text/javascript";
        $scriptElt$$.defer = !1;
        $scriptElt$$.appendChild($doc$$.createTextNode($script$$));
        $doc$$.head.appendChild($scriptElt$$);
        $doc$$.head.removeChild($scriptElt$$);
      }
    } else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function($className$jscomp$2_result$$, $opt_modifier$$) {
  if ("." == String($className$jscomp$2_result$$).charAt(0)) {
    throw Error('className passed in goog.getCssName must not start with ".". You passed: ' + $className$jscomp$2_result$$);
  }
  var $getMapping$$ = function($className$jscomp$2_result$$) {
    return goog.cssNameMapping_[$className$jscomp$2_result$$] || $className$jscomp$2_result$$;
  }, $rename_renameByParts$$ = function($className$jscomp$2_result$$) {
    $className$jscomp$2_result$$ = $className$jscomp$2_result$$.split("-");
    for (var $opt_modifier$$ = [], $rename_renameByParts$$ = 0; $rename_renameByParts$$ < $className$jscomp$2_result$$.length; $rename_renameByParts$$++) {
      $opt_modifier$$.push($getMapping$$($className$jscomp$2_result$$[$rename_renameByParts$$]));
    }
    return $opt_modifier$$.join("-");
  };
  $rename_renameByParts$$ = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? $getMapping$$ : $rename_renameByParts$$ : function($className$jscomp$2_result$$) {
    return $className$jscomp$2_result$$;
  };
  $className$jscomp$2_result$$ = $opt_modifier$$ ? $className$jscomp$2_result$$ + "-" + $rename_renameByParts$$($opt_modifier$$) : $rename_renameByParts$$($className$jscomp$2_result$$);
  return goog.global.CLOSURE_CSS_NAME_MAP_FN ? goog.global.CLOSURE_CSS_NAME_MAP_FN($className$jscomp$2_result$$) : $className$jscomp$2_result$$;
};
goog.setCssNameMapping = function($mapping$$, $opt_style$$) {
  goog.cssNameMapping_ = $mapping$$;
  goog.cssNameMappingStyle_ = $opt_style$$;
};
goog.getMsg = function($str$$, $opt_values$$) {
  $opt_values$$ && ($str$$ = $str$$.replace(/\{\$([^}]+)}/g, function($str$$, $key$$) {
    return null != $opt_values$$ && $key$$ in $opt_values$$ ? $opt_values$$[$key$$] : $str$$;
  }));
  return $str$$;
};
goog.getMsgWithFallback = function($a$$) {
  return $a$$;
};
goog.exportSymbol = function($publicPath$$, $object$$, $opt_objectToExportTo$$) {
  goog.exportPath_($publicPath$$, $object$$, $opt_objectToExportTo$$);
};
goog.exportProperty = function($object$$, $publicName$$, $symbol$$) {
  $object$$[$publicName$$] = $symbol$$;
};
goog.inherits = function($childCtor$$, $parentCtor$$) {
  function $tempCtor$$() {
  }
  $tempCtor$$.prototype = $parentCtor$$.prototype;
  $childCtor$$.superClass_ = $parentCtor$$.prototype;
  $childCtor$$.prototype = new $tempCtor$$;
  $childCtor$$.prototype.constructor = $childCtor$$;
  $childCtor$$.base = function($childCtor$$, $tempCtor$$, $var_args$$) {
    for (var $me$$ = Array(arguments.length - 2), $methodName$$ = 2; $methodName$$ < arguments.length; $methodName$$++) {
      $me$$[$methodName$$ - 2] = arguments[$methodName$$];
    }
    return $parentCtor$$.prototype[$tempCtor$$].apply($childCtor$$, $me$$);
  };
};
goog.base = function($me$$, $opt_methodName$$, $var_args$$) {
  var $caller$$ = arguments.callee.caller;
  if (goog.STRICT_MODE_COMPATIBLE || goog.DEBUG && !$caller$$) {
    throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");
  }
  if ("undefined" !== typeof $caller$$.superClass_) {
    for (var $args$$ = Array(arguments.length - 1), $foundCaller_i$$ = 1; $foundCaller_i$$ < arguments.length; $foundCaller_i$$++) {
      $args$$[$foundCaller_i$$ - 1] = arguments[$foundCaller_i$$];
    }
    return $caller$$.superClass_.constructor.apply($me$$, $args$$);
  }
  if ("string" != typeof $opt_methodName$$ && "symbol" != typeof $opt_methodName$$) {
    throw Error("method names provided to goog.base must be a string or a symbol");
  }
  $args$$ = Array(arguments.length - 2);
  for ($foundCaller_i$$ = 2; $foundCaller_i$$ < arguments.length; $foundCaller_i$$++) {
    $args$$[$foundCaller_i$$ - 2] = arguments[$foundCaller_i$$];
  }
  $foundCaller_i$$ = !1;
  for (var $ctor$$ = $me$$.constructor; $ctor$$; $ctor$$ = $ctor$$.superClass_ && $ctor$$.superClass_.constructor) {
    if ($ctor$$.prototype[$opt_methodName$$] === $caller$$) {
      $foundCaller_i$$ = !0;
    } else {
      if ($foundCaller_i$$) {
        return $ctor$$.prototype[$opt_methodName$$].apply($me$$, $args$$);
      }
    }
  }
  if ($me$$[$opt_methodName$$] === $caller$$) {
    return $me$$.constructor.prototype[$opt_methodName$$].apply($me$$, $args$$);
  }
  throw Error("goog.base called from a method of one name to a method of a different name");
};
goog.scope = function($fn$$) {
  if (goog.isInModuleLoader_()) {
    throw Error("goog.scope is not supported within a module.");
  }
  $fn$$.call(goog.global);
};
goog.defineClass = function($superClass$$, $def$$) {
  var $cls_constructor$$ = $def$$.constructor, $statics$$ = $def$$.statics;
  $cls_constructor$$ && $cls_constructor$$ != Object.prototype.constructor || ($cls_constructor$$ = function() {
    throw Error("cannot instantiate an interface (no constructor defined).");
  });
  $cls_constructor$$ = goog.defineClass.createSealingConstructor_($cls_constructor$$, $superClass$$);
  $superClass$$ && goog.inherits($cls_constructor$$, $superClass$$);
  delete $def$$.constructor;
  delete $def$$.statics;
  goog.defineClass.applyProperties_($cls_constructor$$.prototype, $def$$);
  null != $statics$$ && ($statics$$ instanceof Function ? $statics$$($cls_constructor$$) : goog.defineClass.applyProperties_($cls_constructor$$, $statics$$));
  return $cls_constructor$$;
};
goog.defineClass.SEAL_CLASS_INSTANCES = goog.DEBUG;
goog.defineClass.createSealingConstructor_ = function($ctr$$, $superClass$$) {
  if (!goog.defineClass.SEAL_CLASS_INSTANCES) {
    return $ctr$$;
  }
  var $superclassSealable$$ = !goog.defineClass.isUnsealable_($superClass$$), $wrappedCtr$$ = function() {
    var $superClass$$ = $ctr$$.apply(this, arguments) || this;
    $superClass$$[goog.UID_PROPERTY_] = $superClass$$[goog.UID_PROPERTY_];
    this.constructor === $wrappedCtr$$ && $superclassSealable$$ && Object.seal instanceof Function && Object.seal($superClass$$);
    return $superClass$$;
  };
  return $wrappedCtr$$;
};
goog.defineClass.isUnsealable_ = function($ctr$$) {
  return $ctr$$ && $ctr$$.prototype && $ctr$$.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_];
};
goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.defineClass.applyProperties_ = function($target$$, $source$$) {
  for (var $key$$ in $source$$) {
    Object.prototype.hasOwnProperty.call($source$$, $key$$) && ($target$$[$key$$] = $source$$[$key$$]);
  }
  for (var $i$$ = 0; $i$$ < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length; $i$$++) {
    $key$$ = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[$i$$], Object.prototype.hasOwnProperty.call($source$$, $key$$) && ($target$$[$key$$] = $source$$[$key$$]);
  }
};
goog.tagUnsealableClass = function() {
};
goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_ = "goog_defineClass_legacy_unsealable";
var jspb = {BinaryConstants:{}, ConstBinaryMessage:function() {
}, BinaryMessage:function() {
}};
jspb.BinaryConstants.FieldType = {INVALID:-1, DOUBLE:1, FLOAT:2, INT64:3, UINT64:4, INT32:5, FIXED64:6, FIXED32:7, BOOL:8, STRING:9, GROUP:10, MESSAGE:11, BYTES:12, UINT32:13, ENUM:14, SFIXED32:15, SFIXED64:16, SINT32:17, SINT64:18, FHASH64:30, VHASH64:31};
jspb.BinaryConstants.WireType = {INVALID:-1, VARINT:0, FIXED64:1, DELIMITED:2, START_GROUP:3, END_GROUP:4, FIXED32:5};
jspb.BinaryConstants.FieldTypeToWireType = function($fieldType$$) {
  var $fieldTypes$$ = jspb.BinaryConstants.FieldType, $wireTypes$$ = jspb.BinaryConstants.WireType;
  switch($fieldType$$) {
    case $fieldTypes$$.INT32:
    case $fieldTypes$$.INT64:
    case $fieldTypes$$.UINT32:
    case $fieldTypes$$.UINT64:
    case $fieldTypes$$.SINT32:
    case $fieldTypes$$.SINT64:
    case $fieldTypes$$.BOOL:
    case $fieldTypes$$.ENUM:
    case $fieldTypes$$.VHASH64:
      return $wireTypes$$.VARINT;
    case $fieldTypes$$.DOUBLE:
    case $fieldTypes$$.FIXED64:
    case $fieldTypes$$.SFIXED64:
    case $fieldTypes$$.FHASH64:
      return $wireTypes$$.FIXED64;
    case $fieldTypes$$.STRING:
    case $fieldTypes$$.MESSAGE:
    case $fieldTypes$$.BYTES:
      return $wireTypes$$.DELIMITED;
    case $fieldTypes$$.FLOAT:
    case $fieldTypes$$.FIXED32:
    case $fieldTypes$$.SFIXED32:
      return $wireTypes$$.FIXED32;
    default:
      return $wireTypes$$.INVALID;
  }
};
jspb.BinaryConstants.INVALID_FIELD_NUMBER = -1;
jspb.BinaryConstants.FLOAT32_EPS = 1.401298464324817e-45;
jspb.BinaryConstants.FLOAT32_MIN = 1.1754943508222875e-38;
jspb.BinaryConstants.FLOAT32_MAX = 3.4028234663852886e+38;
jspb.BinaryConstants.FLOAT64_EPS = 5e-324;
jspb.BinaryConstants.FLOAT64_MIN = 2.2250738585072014e-308;
jspb.BinaryConstants.FLOAT64_MAX = 1.7976931348623157e+308;
jspb.BinaryConstants.TWO_TO_20 = 1048576;
jspb.BinaryConstants.TWO_TO_23 = 8388608;
jspb.BinaryConstants.TWO_TO_31 = 2147483648;
jspb.BinaryConstants.TWO_TO_32 = 4294967296;
jspb.BinaryConstants.TWO_TO_52 = 4503599627370496;
jspb.BinaryConstants.TWO_TO_63 = 9223372036854775808;
jspb.BinaryConstants.TWO_TO_64 = 18446744073709551616;
jspb.BinaryConstants.ZERO_HASH = "\x00\x00\x00\x00\x00\x00\x00\x00";
goog.debug = {};
goog.debug.Error = function($opt_msg$$) {
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, goog.debug.Error);
  } else {
    var $stack$$ = Error().stack;
    $stack$$ && (this.stack = $stack$$);
  }
  $opt_msg$$ && (this.message = String($opt_msg$$));
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.dom = {};
goog.dom.NodeType = {ELEMENT:1, ATTRIBUTE:2, TEXT:3, CDATA_SECTION:4, ENTITY_REFERENCE:5, ENTITY:6, PROCESSING_INSTRUCTION:7, COMMENT:8, DOCUMENT:9, DOCUMENT_TYPE:10, DOCUMENT_FRAGMENT:11, NOTATION:12};
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function($messagePattern$$, $messageArgs$$) {
  goog.debug.Error.call(this, goog.asserts.subs_($messagePattern$$, $messageArgs$$));
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.DEFAULT_ERROR_HANDLER = function($e$$) {
  throw $e$$;
};
goog.asserts.errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER;
goog.asserts.subs_ = function($pattern$$, $subs$$) {
  $pattern$$ = $pattern$$.split("%s");
  for (var $returnString$$ = "", $subLast$$ = $pattern$$.length - 1, $i$$ = 0; $i$$ < $subLast$$; $i$$++) {
    var $sub$$ = $i$$ < $subs$$.length ? $subs$$[$i$$] : "%s";
    $returnString$$ += $pattern$$[$i$$] + $sub$$;
  }
  return $returnString$$ + $pattern$$[$subLast$$];
};
goog.asserts.doAssertFailure_ = function($defaultMessage_e$$, $defaultArgs$$, $givenMessage$$, $givenArgs$$) {
  var $message$$ = "Assertion failed";
  if ($givenMessage$$) {
    $message$$ += ": " + $givenMessage$$;
    var $args$$ = $givenArgs$$;
  } else {
    $defaultMessage_e$$ && ($message$$ += ": " + $defaultMessage_e$$, $args$$ = $defaultArgs$$);
  }
  $defaultMessage_e$$ = new goog.asserts.AssertionError("" + $message$$, $args$$ || []);
  goog.asserts.errorHandler_($defaultMessage_e$$);
};
goog.asserts.setErrorHandler = function($errorHandler$$) {
  goog.asserts.ENABLE_ASSERTS && (goog.asserts.errorHandler_ = $errorHandler$$);
};
goog.asserts.assert = function($condition$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && !$condition$$ && goog.asserts.doAssertFailure_("", null, $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $condition$$;
};
goog.asserts.fail = function($opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && goog.asserts.errorHandler_(new goog.asserts.AssertionError("Failure" + ($opt_message$$ ? ": " + $opt_message$$ : ""), Array.prototype.slice.call(arguments, 1)));
};
goog.asserts.assertNumber = function($value$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && !goog.isNumber($value$$) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf($value$$), $value$$], $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $value$$;
};
goog.asserts.assertString = function($value$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && !goog.isString($value$$) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf($value$$), $value$$], $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $value$$;
};
goog.asserts.assertFunction = function($value$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && !goog.isFunction($value$$) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf($value$$), $value$$], $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $value$$;
};
goog.asserts.assertObject = function($value$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && !goog.isObject($value$$) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf($value$$), $value$$], $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $value$$;
};
goog.asserts.assertArray = function($value$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && !goog.isArray($value$$) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf($value$$), $value$$], $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $value$$;
};
goog.asserts.assertBoolean = function($value$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && !goog.isBoolean($value$$) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf($value$$), $value$$], $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $value$$;
};
goog.asserts.assertElement = function($value$$, $opt_message$$, $var_args$$) {
  !goog.asserts.ENABLE_ASSERTS || goog.isObject($value$$) && $value$$.nodeType == goog.dom.NodeType.ELEMENT || goog.asserts.doAssertFailure_("Expected Element but got %s: %s.", [goog.typeOf($value$$), $value$$], $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $value$$;
};
goog.asserts.assertInstanceof = function($value$$, $type$$, $opt_message$$, $var_args$$) {
  !goog.asserts.ENABLE_ASSERTS || $value$$ instanceof $type$$ || goog.asserts.doAssertFailure_("Expected instanceof %s but got %s.", [goog.asserts.getType_($type$$), goog.asserts.getType_($value$$)], $opt_message$$, Array.prototype.slice.call(arguments, 3));
  return $value$$;
};
goog.asserts.assertFinite = function($value$$, $opt_message$$, $var_args$$) {
  !goog.asserts.ENABLE_ASSERTS || "number" == typeof $value$$ && isFinite($value$$) || goog.asserts.doAssertFailure_("Expected %s to be a finite number but it is not.", [$value$$], $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $value$$;
};
goog.asserts.assertObjectPrototypeIsIntact = function() {
  for (var $key$$ in Object.prototype) {
    goog.asserts.fail($key$$ + " should not be enumerable in Object.prototype.");
  }
};
goog.asserts.getType_ = function($value$$) {
  return $value$$ instanceof Function ? $value$$.displayName || $value$$.name || "unknown type name" : $value$$ instanceof Object ? $value$$.constructor.displayName || $value$$.constructor.name || Object.prototype.toString.call($value$$) : null === $value$$ ? "null" : typeof $value$$;
};
goog.array = {};
goog.NATIVE_ARRAY_PROTOTYPES = goog.TRUSTED_SITE;
goog.array.ASSUME_NATIVE_FUNCTIONS = !1;
goog.array.peek = function($array$$) {
  return $array$$[$array$$.length - 1];
};
goog.array.last = goog.array.peek;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.indexOf) ? function($arr$$, $obj$$, $opt_fromIndex$$) {
  goog.asserts.assert(null != $arr$$.length);
  return Array.prototype.indexOf.call($arr$$, $obj$$, $opt_fromIndex$$);
} : function($arr$$, $obj$$, $fromIndex_i$jscomp$22_opt_fromIndex$$) {
  $fromIndex_i$jscomp$22_opt_fromIndex$$ = null == $fromIndex_i$jscomp$22_opt_fromIndex$$ ? 0 : 0 > $fromIndex_i$jscomp$22_opt_fromIndex$$ ? Math.max(0, $arr$$.length + $fromIndex_i$jscomp$22_opt_fromIndex$$) : $fromIndex_i$jscomp$22_opt_fromIndex$$;
  if (goog.isString($arr$$)) {
    return goog.isString($obj$$) && 1 == $obj$$.length ? $arr$$.indexOf($obj$$, $fromIndex_i$jscomp$22_opt_fromIndex$$) : -1;
  }
  for (; $fromIndex_i$jscomp$22_opt_fromIndex$$ < $arr$$.length; $fromIndex_i$jscomp$22_opt_fromIndex$$++) {
    if ($fromIndex_i$jscomp$22_opt_fromIndex$$ in $arr$$ && $arr$$[$fromIndex_i$jscomp$22_opt_fromIndex$$] === $obj$$) {
      return $fromIndex_i$jscomp$22_opt_fromIndex$$;
    }
  }
  return -1;
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.lastIndexOf) ? function($arr$$, $obj$$, $fromIndex$jscomp$1_opt_fromIndex$$) {
  goog.asserts.assert(null != $arr$$.length);
  $fromIndex$jscomp$1_opt_fromIndex$$ = null == $fromIndex$jscomp$1_opt_fromIndex$$ ? $arr$$.length - 1 : $fromIndex$jscomp$1_opt_fromIndex$$;
  return Array.prototype.lastIndexOf.call($arr$$, $obj$$, $fromIndex$jscomp$1_opt_fromIndex$$);
} : function($arr$$, $obj$$, $fromIndex$jscomp$2_i$jscomp$23_opt_fromIndex$$) {
  $fromIndex$jscomp$2_i$jscomp$23_opt_fromIndex$$ = null == $fromIndex$jscomp$2_i$jscomp$23_opt_fromIndex$$ ? $arr$$.length - 1 : $fromIndex$jscomp$2_i$jscomp$23_opt_fromIndex$$;
  0 > $fromIndex$jscomp$2_i$jscomp$23_opt_fromIndex$$ && ($fromIndex$jscomp$2_i$jscomp$23_opt_fromIndex$$ = Math.max(0, $arr$$.length + $fromIndex$jscomp$2_i$jscomp$23_opt_fromIndex$$));
  if (goog.isString($arr$$)) {
    return goog.isString($obj$$) && 1 == $obj$$.length ? $arr$$.lastIndexOf($obj$$, $fromIndex$jscomp$2_i$jscomp$23_opt_fromIndex$$) : -1;
  }
  for (; 0 <= $fromIndex$jscomp$2_i$jscomp$23_opt_fromIndex$$; $fromIndex$jscomp$2_i$jscomp$23_opt_fromIndex$$--) {
    if ($fromIndex$jscomp$2_i$jscomp$23_opt_fromIndex$$ in $arr$$ && $arr$$[$fromIndex$jscomp$2_i$jscomp$23_opt_fromIndex$$] === $obj$$) {
      return $fromIndex$jscomp$2_i$jscomp$23_opt_fromIndex$$;
    }
  }
  return -1;
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.forEach) ? function($arr$$, $f$$, $opt_obj$$) {
  goog.asserts.assert(null != $arr$$.length);
  Array.prototype.forEach.call($arr$$, $f$$, $opt_obj$$);
} : function($arr$$, $f$$, $opt_obj$$) {
  for (var $l$$ = $arr$$.length, $arr2$$ = goog.isString($arr$$) ? $arr$$.split("") : $arr$$, $i$$ = 0; $i$$ < $l$$; $i$$++) {
    $i$$ in $arr2$$ && $f$$.call($opt_obj$$, $arr2$$[$i$$], $i$$, $arr$$);
  }
};
goog.array.forEachRight = function($arr$$, $f$$, $opt_obj$$) {
  var $i$jscomp$25_l$$ = $arr$$.length, $arr2$$ = goog.isString($arr$$) ? $arr$$.split("") : $arr$$;
  for (--$i$jscomp$25_l$$; 0 <= $i$jscomp$25_l$$; --$i$jscomp$25_l$$) {
    $i$jscomp$25_l$$ in $arr2$$ && $f$$.call($opt_obj$$, $arr2$$[$i$jscomp$25_l$$], $i$jscomp$25_l$$, $arr$$);
  }
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.filter) ? function($arr$$, $f$$, $opt_obj$$) {
  goog.asserts.assert(null != $arr$$.length);
  return Array.prototype.filter.call($arr$$, $f$$, $opt_obj$$);
} : function($arr$$, $f$$, $opt_obj$$) {
  for (var $l$$ = $arr$$.length, $res$$ = [], $resLength$$ = 0, $arr2$$ = goog.isString($arr$$) ? $arr$$.split("") : $arr$$, $i$$ = 0; $i$$ < $l$$; $i$$++) {
    if ($i$$ in $arr2$$) {
      var $val$$ = $arr2$$[$i$$];
      $f$$.call($opt_obj$$, $val$$, $i$$, $arr$$) && ($res$$[$resLength$$++] = $val$$);
    }
  }
  return $res$$;
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.map) ? function($arr$$, $f$$, $opt_obj$$) {
  goog.asserts.assert(null != $arr$$.length);
  return Array.prototype.map.call($arr$$, $f$$, $opt_obj$$);
} : function($arr$$, $f$$, $opt_obj$$) {
  for (var $l$$ = $arr$$.length, $res$$ = Array($l$$), $arr2$$ = goog.isString($arr$$) ? $arr$$.split("") : $arr$$, $i$$ = 0; $i$$ < $l$$; $i$$++) {
    $i$$ in $arr2$$ && ($res$$[$i$$] = $f$$.call($opt_obj$$, $arr2$$[$i$$], $i$$, $arr$$));
  }
  return $res$$;
};
goog.array.reduce = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduce) ? function($arr$$, $f$$, $val$$, $opt_obj$$) {
  goog.asserts.assert(null != $arr$$.length);
  $opt_obj$$ && ($f$$ = goog.bind($f$$, $opt_obj$$));
  return Array.prototype.reduce.call($arr$$, $f$$, $val$$);
} : function($arr$$, $f$$, $val$jscomp$0$$, $opt_obj$$) {
  var $rval$$ = $val$jscomp$0$$;
  goog.array.forEach($arr$$, function($val$jscomp$0$$, $index$$) {
    $rval$$ = $f$$.call($opt_obj$$, $rval$$, $val$jscomp$0$$, $index$$, $arr$$);
  });
  return $rval$$;
};
goog.array.reduceRight = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduceRight) ? function($arr$$, $f$$, $val$$, $opt_obj$$) {
  goog.asserts.assert(null != $arr$$.length);
  goog.asserts.assert(null != $f$$);
  $opt_obj$$ && ($f$$ = goog.bind($f$$, $opt_obj$$));
  return Array.prototype.reduceRight.call($arr$$, $f$$, $val$$);
} : function($arr$$, $f$$, $val$jscomp$0$$, $opt_obj$$) {
  var $rval$$ = $val$jscomp$0$$;
  goog.array.forEachRight($arr$$, function($val$jscomp$0$$, $index$$) {
    $rval$$ = $f$$.call($opt_obj$$, $rval$$, $val$jscomp$0$$, $index$$, $arr$$);
  });
  return $rval$$;
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.some) ? function($arr$$, $f$$, $opt_obj$$) {
  goog.asserts.assert(null != $arr$$.length);
  return Array.prototype.some.call($arr$$, $f$$, $opt_obj$$);
} : function($arr$$, $f$$, $opt_obj$$) {
  for (var $l$$ = $arr$$.length, $arr2$$ = goog.isString($arr$$) ? $arr$$.split("") : $arr$$, $i$$ = 0; $i$$ < $l$$; $i$$++) {
    if ($i$$ in $arr2$$ && $f$$.call($opt_obj$$, $arr2$$[$i$$], $i$$, $arr$$)) {
      return !0;
    }
  }
  return !1;
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.every) ? function($arr$$, $f$$, $opt_obj$$) {
  goog.asserts.assert(null != $arr$$.length);
  return Array.prototype.every.call($arr$$, $f$$, $opt_obj$$);
} : function($arr$$, $f$$, $opt_obj$$) {
  for (var $l$$ = $arr$$.length, $arr2$$ = goog.isString($arr$$) ? $arr$$.split("") : $arr$$, $i$$ = 0; $i$$ < $l$$; $i$$++) {
    if ($i$$ in $arr2$$ && !$f$$.call($opt_obj$$, $arr2$$[$i$$], $i$$, $arr$$)) {
      return !1;
    }
  }
  return !0;
};
goog.array.count = function($arr$jscomp$0$$, $f$$, $opt_obj$$) {
  var $count$$ = 0;
  goog.array.forEach($arr$jscomp$0$$, function($arr$jscomp$0$$, $index$$, $arr$$) {
    $f$$.call($opt_obj$$, $arr$jscomp$0$$, $index$$, $arr$$) && ++$count$$;
  }, $opt_obj$$);
  return $count$$;
};
goog.array.find = function($arr$$, $f$jscomp$17_i$$, $opt_obj$$) {
  $f$jscomp$17_i$$ = goog.array.findIndex($arr$$, $f$jscomp$17_i$$, $opt_obj$$);
  return 0 > $f$jscomp$17_i$$ ? null : goog.isString($arr$$) ? $arr$$.charAt($f$jscomp$17_i$$) : $arr$$[$f$jscomp$17_i$$];
};
goog.array.findIndex = function($arr$$, $f$$, $opt_obj$$) {
  for (var $l$$ = $arr$$.length, $arr2$$ = goog.isString($arr$$) ? $arr$$.split("") : $arr$$, $i$$ = 0; $i$$ < $l$$; $i$$++) {
    if ($i$$ in $arr2$$ && $f$$.call($opt_obj$$, $arr2$$[$i$$], $i$$, $arr$$)) {
      return $i$$;
    }
  }
  return -1;
};
goog.array.findRight = function($arr$$, $f$jscomp$19_i$$, $opt_obj$$) {
  $f$jscomp$19_i$$ = goog.array.findIndexRight($arr$$, $f$jscomp$19_i$$, $opt_obj$$);
  return 0 > $f$jscomp$19_i$$ ? null : goog.isString($arr$$) ? $arr$$.charAt($f$jscomp$19_i$$) : $arr$$[$f$jscomp$19_i$$];
};
goog.array.findIndexRight = function($arr$$, $f$$, $opt_obj$$) {
  var $i$jscomp$33_l$$ = $arr$$.length, $arr2$$ = goog.isString($arr$$) ? $arr$$.split("") : $arr$$;
  for (--$i$jscomp$33_l$$; 0 <= $i$jscomp$33_l$$; $i$jscomp$33_l$$--) {
    if ($i$jscomp$33_l$$ in $arr2$$ && $f$$.call($opt_obj$$, $arr2$$[$i$jscomp$33_l$$], $i$jscomp$33_l$$, $arr$$)) {
      return $i$jscomp$33_l$$;
    }
  }
  return -1;
};
goog.array.contains = function($arr$$, $obj$$) {
  return 0 <= goog.array.indexOf($arr$$, $obj$$);
};
goog.array.isEmpty = function($arr$$) {
  return 0 == $arr$$.length;
};
goog.array.clear = function($arr$$) {
  if (!goog.isArray($arr$$)) {
    for (var $i$$ = $arr$$.length - 1; 0 <= $i$$; $i$$--) {
      delete $arr$$[$i$$];
    }
  }
  $arr$$.length = 0;
};
goog.array.insert = function($arr$$, $obj$$) {
  goog.array.contains($arr$$, $obj$$) || $arr$$.push($obj$$);
};
goog.array.insertAt = function($arr$$, $obj$$, $opt_i$$) {
  goog.array.splice($arr$$, $opt_i$$, 0, $obj$$);
};
goog.array.insertArrayAt = function($arr$$, $elementsToAdd$$, $opt_i$$) {
  goog.partial(goog.array.splice, $arr$$, $opt_i$$, 0).apply(null, $elementsToAdd$$);
};
goog.array.insertBefore = function($arr$$, $obj$$, $opt_obj2$$) {
  var $i$$;
  2 == arguments.length || 0 > ($i$$ = goog.array.indexOf($arr$$, $opt_obj2$$)) ? $arr$$.push($obj$$) : goog.array.insertAt($arr$$, $obj$$, $i$$);
};
goog.array.remove = function($arr$$, $i$jscomp$36_obj$$) {
  $i$jscomp$36_obj$$ = goog.array.indexOf($arr$$, $i$jscomp$36_obj$$);
  var $rv$$;
  ($rv$$ = 0 <= $i$jscomp$36_obj$$) && goog.array.removeAt($arr$$, $i$jscomp$36_obj$$);
  return $rv$$;
};
goog.array.removeLast = function($arr$$, $i$jscomp$37_obj$$) {
  $i$jscomp$37_obj$$ = goog.array.lastIndexOf($arr$$, $i$jscomp$37_obj$$);
  return 0 <= $i$jscomp$37_obj$$ ? (goog.array.removeAt($arr$$, $i$jscomp$37_obj$$), !0) : !1;
};
goog.array.removeAt = function($arr$$, $i$$) {
  goog.asserts.assert(null != $arr$$.length);
  return 1 == Array.prototype.splice.call($arr$$, $i$$, 1).length;
};
goog.array.removeIf = function($arr$$, $f$jscomp$21_i$$, $opt_obj$$) {
  $f$jscomp$21_i$$ = goog.array.findIndex($arr$$, $f$jscomp$21_i$$, $opt_obj$$);
  return 0 <= $f$jscomp$21_i$$ ? (goog.array.removeAt($arr$$, $f$jscomp$21_i$$), !0) : !1;
};
goog.array.removeAllIf = function($arr$$, $f$$, $opt_obj$$) {
  var $removedCount$$ = 0;
  goog.array.forEachRight($arr$$, function($val$$, $index$$) {
    $f$$.call($opt_obj$$, $val$$, $index$$, $arr$$) && goog.array.removeAt($arr$$, $index$$) && $removedCount$$++;
  });
  return $removedCount$$;
};
goog.array.concat = function($var_args$$) {
  return Array.prototype.concat.apply([], arguments);
};
goog.array.join = function($var_args$$) {
  return Array.prototype.concat.apply([], arguments);
};
goog.array.toArray = function($object$$) {
  var $length$$ = $object$$.length;
  if (0 < $length$$) {
    for (var $rv$$ = Array($length$$), $i$$ = 0; $i$$ < $length$$; $i$$++) {
      $rv$$[$i$$] = $object$$[$i$$];
    }
    return $rv$$;
  }
  return [];
};
goog.array.clone = goog.array.toArray;
goog.array.extend = function($arr1$$, $var_args$$) {
  for (var $i$$ = 1; $i$$ < arguments.length; $i$$++) {
    var $arr2$$ = arguments[$i$$];
    if (goog.isArrayLike($arr2$$)) {
      var $len1$$ = $arr1$$.length || 0, $len2$$ = $arr2$$.length || 0;
      $arr1$$.length = $len1$$ + $len2$$;
      for (var $j$$ = 0; $j$$ < $len2$$; $j$$++) {
        $arr1$$[$len1$$ + $j$$] = $arr2$$[$j$$];
      }
    } else {
      $arr1$$.push($arr2$$);
    }
  }
};
goog.array.splice = function($arr$$, $index$$, $howMany$$, $var_args$$) {
  goog.asserts.assert(null != $arr$$.length);
  return Array.prototype.splice.apply($arr$$, goog.array.slice(arguments, 1));
};
goog.array.slice = function($arr$$, $start$$, $opt_end$$) {
  goog.asserts.assert(null != $arr$$.length);
  return 2 >= arguments.length ? Array.prototype.slice.call($arr$$, $start$$) : Array.prototype.slice.call($arr$$, $start$$, $opt_end$$);
};
goog.array.removeDuplicates = function($arr$$, $opt_rv_returnArray$$, $hashFn_opt_hashFn$$) {
  $opt_rv_returnArray$$ = $opt_rv_returnArray$$ || $arr$$;
  var $defaultHashFn_seen$$ = function($arr$$) {
    return goog.isObject($arr$$) ? "o" + goog.getUid($arr$$) : (typeof $arr$$).charAt(0) + $arr$$;
  };
  $hashFn_opt_hashFn$$ = $hashFn_opt_hashFn$$ || $defaultHashFn_seen$$;
  $defaultHashFn_seen$$ = {};
  for (var $cursorInsert$$ = 0, $cursorRead$$ = 0; $cursorRead$$ < $arr$$.length;) {
    var $current$$ = $arr$$[$cursorRead$$++], $key$$ = $hashFn_opt_hashFn$$($current$$);
    Object.prototype.hasOwnProperty.call($defaultHashFn_seen$$, $key$$) || ($defaultHashFn_seen$$[$key$$] = !0, $opt_rv_returnArray$$[$cursorInsert$$++] = $current$$);
  }
  $opt_rv_returnArray$$.length = $cursorInsert$$;
};
goog.array.binarySearch = function($arr$$, $target$$, $opt_compareFn$$) {
  return goog.array.binarySearch_($arr$$, $opt_compareFn$$ || goog.array.defaultCompare, !1, $target$$);
};
goog.array.binarySelect = function($arr$$, $evaluator$$, $opt_obj$$) {
  return goog.array.binarySearch_($arr$$, $evaluator$$, !0, void 0, $opt_obj$$);
};
goog.array.binarySearch_ = function($arr$$, $compareFn$$, $isEvaluator$$, $opt_target$$, $opt_selfObj$$) {
  for (var $left$$ = 0, $right$$ = $arr$$.length, $found$$; $left$$ < $right$$;) {
    var $middle$$ = $left$$ + $right$$ >> 1;
    var $compareResult$$ = $isEvaluator$$ ? $compareFn$$.call($opt_selfObj$$, $arr$$[$middle$$], $middle$$, $arr$$) : $compareFn$$($opt_target$$, $arr$$[$middle$$]);
    0 < $compareResult$$ ? $left$$ = $middle$$ + 1 : ($right$$ = $middle$$, $found$$ = !$compareResult$$);
  }
  return $found$$ ? $left$$ : ~$left$$;
};
goog.array.sort = function($arr$$, $opt_compareFn$$) {
  $arr$$.sort($opt_compareFn$$ || goog.array.defaultCompare);
};
goog.array.stableSort = function($arr$$, $opt_compareFn$$) {
  function $stableCompareFn$$($arr$$, $opt_compareFn$$) {
    return $valueCompareFn$$($arr$$.value, $opt_compareFn$$.value) || $arr$$.index - $opt_compareFn$$.index;
  }
  for (var $compArr$$ = Array($arr$$.length), $i$$ = 0; $i$$ < $arr$$.length; $i$$++) {
    $compArr$$[$i$$] = {index:$i$$, value:$arr$$[$i$$]};
  }
  var $valueCompareFn$$ = $opt_compareFn$$ || goog.array.defaultCompare;
  goog.array.sort($compArr$$, $stableCompareFn$$);
  for ($i$$ = 0; $i$$ < $arr$$.length; $i$$++) {
    $arr$$[$i$$] = $compArr$$[$i$$].value;
  }
};
goog.array.sortByKey = function($arr$$, $keyFn$$, $opt_compareFn$$) {
  var $keyCompareFn$$ = $opt_compareFn$$ || goog.array.defaultCompare;
  goog.array.sort($arr$$, function($arr$$, $opt_compareFn$$) {
    return $keyCompareFn$$($keyFn$$($arr$$), $keyFn$$($opt_compareFn$$));
  });
};
goog.array.sortObjectsByKey = function($arr$$, $key$$, $opt_compareFn$$) {
  goog.array.sortByKey($arr$$, function($arr$$) {
    return $arr$$[$key$$];
  }, $opt_compareFn$$);
};
goog.array.isSorted = function($arr$$, $compare_opt_compareFn$$, $opt_strict$$) {
  $compare_opt_compareFn$$ = $compare_opt_compareFn$$ || goog.array.defaultCompare;
  for (var $i$$ = 1; $i$$ < $arr$$.length; $i$$++) {
    var $compareResult$$ = $compare_opt_compareFn$$($arr$$[$i$$ - 1], $arr$$[$i$$]);
    if (0 < $compareResult$$ || 0 == $compareResult$$ && $opt_strict$$) {
      return !1;
    }
  }
  return !0;
};
goog.array.equals = function($arr1$$, $arr2$$, $equalsFn_opt_equalsFn$$) {
  if (!goog.isArrayLike($arr1$$) || !goog.isArrayLike($arr2$$) || $arr1$$.length != $arr2$$.length) {
    return !1;
  }
  var $l$$ = $arr1$$.length;
  $equalsFn_opt_equalsFn$$ = $equalsFn_opt_equalsFn$$ || goog.array.defaultCompareEquality;
  for (var $i$$ = 0; $i$$ < $l$$; $i$$++) {
    if (!$equalsFn_opt_equalsFn$$($arr1$$[$i$$], $arr2$$[$i$$])) {
      return !1;
    }
  }
  return !0;
};
goog.array.compare3 = function($arr1$$, $arr2$$, $compare$jscomp$1_opt_compareFn$$) {
  $compare$jscomp$1_opt_compareFn$$ = $compare$jscomp$1_opt_compareFn$$ || goog.array.defaultCompare;
  for (var $l$$ = Math.min($arr1$$.length, $arr2$$.length), $i$$ = 0; $i$$ < $l$$; $i$$++) {
    var $result$$ = $compare$jscomp$1_opt_compareFn$$($arr1$$[$i$$], $arr2$$[$i$$]);
    if (0 != $result$$) {
      return $result$$;
    }
  }
  return goog.array.defaultCompare($arr1$$.length, $arr2$$.length);
};
goog.array.defaultCompare = function($a$$, $b$$) {
  return $a$$ > $b$$ ? 1 : $a$$ < $b$$ ? -1 : 0;
};
goog.array.inverseDefaultCompare = function($a$$, $b$$) {
  return -goog.array.defaultCompare($a$$, $b$$);
};
goog.array.defaultCompareEquality = function($a$$, $b$$) {
  return $a$$ === $b$$;
};
goog.array.binaryInsert = function($array$$, $value$$, $index$jscomp$74_opt_compareFn$$) {
  $index$jscomp$74_opt_compareFn$$ = goog.array.binarySearch($array$$, $value$$, $index$jscomp$74_opt_compareFn$$);
  return 0 > $index$jscomp$74_opt_compareFn$$ ? (goog.array.insertAt($array$$, $value$$, -($index$jscomp$74_opt_compareFn$$ + 1)), !0) : !1;
};
goog.array.binaryRemove = function($array$$, $index$jscomp$75_value$$, $opt_compareFn$$) {
  $index$jscomp$75_value$$ = goog.array.binarySearch($array$$, $index$jscomp$75_value$$, $opt_compareFn$$);
  return 0 <= $index$jscomp$75_value$$ ? goog.array.removeAt($array$$, $index$jscomp$75_value$$) : !1;
};
goog.array.bucket = function($array$$, $sorter$$, $opt_obj$$) {
  for (var $buckets$$ = {}, $i$$ = 0; $i$$ < $array$$.length; $i$$++) {
    var $value$$ = $array$$[$i$$], $bucket_key$$ = $sorter$$.call($opt_obj$$, $value$$, $i$$, $array$$);
    goog.isDef($bucket_key$$) && ($bucket_key$$ = $buckets$$[$bucket_key$$] || ($buckets$$[$bucket_key$$] = []), $bucket_key$$.push($value$$));
  }
  return $buckets$$;
};
goog.array.toObject = function($arr$$, $keyFunc$$, $opt_obj$$) {
  var $ret$$ = {};
  goog.array.forEach($arr$$, function($element$$, $index$$) {
    $ret$$[$keyFunc$$.call($opt_obj$$, $element$$, $index$$, $arr$$)] = $element$$;
  });
  return $ret$$;
};
goog.array.range = function($i$$, $opt_end$$, $opt_step_step$$) {
  var $array$$ = [], $start$$ = 0, $end$$ = $i$$;
  $opt_step_step$$ = $opt_step_step$$ || 1;
  void 0 !== $opt_end$$ && ($start$$ = $i$$, $end$$ = $opt_end$$);
  if (0 > $opt_step_step$$ * ($end$$ - $start$$)) {
    return [];
  }
  if (0 < $opt_step_step$$) {
    for ($i$$ = $start$$; $i$$ < $end$$; $i$$ += $opt_step_step$$) {
      $array$$.push($i$$);
    }
  } else {
    for ($i$$ = $start$$; $i$$ > $end$$; $i$$ += $opt_step_step$$) {
      $array$$.push($i$$);
    }
  }
  return $array$$;
};
goog.array.repeat = function($value$$, $n$$) {
  for (var $array$$ = [], $i$$ = 0; $i$$ < $n$$; $i$$++) {
    $array$$[$i$$] = $value$$;
  }
  return $array$$;
};
goog.array.flatten = function($var_args$$) {
  for (var $result$$ = [], $i$$ = 0; $i$$ < arguments.length; $i$$++) {
    var $element$$ = arguments[$i$$];
    if (goog.isArray($element$$)) {
      for (var $c$$ = 0; $c$$ < $element$$.length; $c$$ += 8192) {
        var $chunk$$ = goog.array.slice($element$$, $c$$, $c$$ + 8192);
        $chunk$$ = goog.array.flatten.apply(null, $chunk$$);
        for (var $r$$ = 0; $r$$ < $chunk$$.length; $r$$++) {
          $result$$.push($chunk$$[$r$$]);
        }
      }
    } else {
      $result$$.push($element$$);
    }
  }
  return $result$$;
};
goog.array.rotate = function($array$$, $n$$) {
  goog.asserts.assert(null != $array$$.length);
  $array$$.length && ($n$$ %= $array$$.length, 0 < $n$$ ? Array.prototype.unshift.apply($array$$, $array$$.splice(-$n$$, $n$$)) : 0 > $n$$ && Array.prototype.push.apply($array$$, $array$$.splice(0, -$n$$)));
  return $array$$;
};
goog.array.moveItem = function($arr$$, $fromIndex$$, $toIndex$$) {
  goog.asserts.assert(0 <= $fromIndex$$ && $fromIndex$$ < $arr$$.length);
  goog.asserts.assert(0 <= $toIndex$$ && $toIndex$$ < $arr$$.length);
  $fromIndex$$ = Array.prototype.splice.call($arr$$, $fromIndex$$, 1);
  Array.prototype.splice.call($arr$$, $toIndex$$, 0, $fromIndex$$[0]);
};
goog.array.zip = function($var_args$$) {
  if (!arguments.length) {
    return [];
  }
  for (var $result$$ = [], $minLen$$ = arguments[0].length, $i$$ = 1; $i$$ < arguments.length; $i$$++) {
    arguments[$i$$].length < $minLen$$ && ($minLen$$ = arguments[$i$$].length);
  }
  for ($i$$ = 0; $i$$ < $minLen$$; $i$$++) {
    for (var $value$$ = [], $j$$ = 0; $j$$ < arguments.length; $j$$++) {
      $value$$.push(arguments[$j$$][$i$$]);
    }
    $result$$.push($value$$);
  }
  return $result$$;
};
goog.array.shuffle = function($arr$$, $opt_randFn_randFn$$) {
  $opt_randFn_randFn$$ = $opt_randFn_randFn$$ || Math.random;
  for (var $i$$ = $arr$$.length - 1; 0 < $i$$; $i$$--) {
    var $j$$ = Math.floor($opt_randFn_randFn$$() * ($i$$ + 1)), $tmp$$ = $arr$$[$i$$];
    $arr$$[$i$$] = $arr$$[$j$$];
    $arr$$[$j$$] = $tmp$$;
  }
};
goog.array.copyByIndex = function($arr$$, $index_arr$$) {
  var $result$$ = [];
  goog.array.forEach($index_arr$$, function($index_arr$$) {
    $result$$.push($arr$$[$index_arr$$]);
  });
  return $result$$;
};
goog.array.concatMap = function($arr$$, $f$$, $opt_obj$$) {
  return goog.array.concat.apply([], goog.array.map($arr$$, $f$$, $opt_obj$$));
};
goog.crypt = {};
goog.crypt.stringToByteArray = function($str$$) {
  for (var $output$$ = [], $p$$ = 0, $i$$ = 0; $i$$ < $str$$.length; $i$$++) {
    var $c$$ = $str$$.charCodeAt($i$$);
    255 < $c$$ && ($output$$[$p$$++] = $c$$ & 255, $c$$ >>= 8);
    $output$$[$p$$++] = $c$$;
  }
  return $output$$;
};
goog.crypt.byteArrayToString = function($bytes$$) {
  if (8192 >= $bytes$$.length) {
    return String.fromCharCode.apply(null, $bytes$$);
  }
  for (var $str$$ = "", $i$$ = 0; $i$$ < $bytes$$.length; $i$$ += 8192) {
    var $chunk$$ = goog.array.slice($bytes$$, $i$$, $i$$ + 8192);
    $str$$ += String.fromCharCode.apply(null, $chunk$$);
  }
  return $str$$;
};
goog.crypt.byteArrayToHex = function($array$$, $opt_separator$$) {
  return goog.array.map($array$$, function($array$$) {
    $array$$ = $array$$.toString(16);
    return 1 < $array$$.length ? $array$$ : "0" + $array$$;
  }).join($opt_separator$$ || "");
};
goog.crypt.hexToByteArray = function($hexString$$) {
  goog.asserts.assert(0 == $hexString$$.length % 2, "Key string length must be multiple of 2");
  for (var $arr$$ = [], $i$$ = 0; $i$$ < $hexString$$.length; $i$$ += 2) {
    $arr$$.push(parseInt($hexString$$.substring($i$$, $i$$ + 2), 16));
  }
  return $arr$$;
};
goog.crypt.stringToUtf8ByteArray = function($str$$) {
  for (var $out$$ = [], $p$$ = 0, $i$$ = 0; $i$$ < $str$$.length; $i$$++) {
    var $c$$ = $str$$.charCodeAt($i$$);
    128 > $c$$ ? $out$$[$p$$++] = $c$$ : (2048 > $c$$ ? $out$$[$p$$++] = $c$$ >> 6 | 192 : (55296 == ($c$$ & 64512) && $i$$ + 1 < $str$$.length && 56320 == ($str$$.charCodeAt($i$$ + 1) & 64512) ? ($c$$ = 65536 + (($c$$ & 1023) << 10) + ($str$$.charCodeAt(++$i$$) & 1023), $out$$[$p$$++] = $c$$ >> 18 | 240, $out$$[$p$$++] = $c$$ >> 12 & 63 | 128) : $out$$[$p$$++] = $c$$ >> 12 | 224, $out$$[$p$$++] = $c$$ >> 6 & 63 | 128), $out$$[$p$$++] = $c$$ & 63 | 128);
  }
  return $out$$;
};
goog.crypt.utf8ByteArrayToString = function($bytes$$) {
  for (var $out$$ = [], $pos$$ = 0, $c$$ = 0; $pos$$ < $bytes$$.length;) {
    var $c1_u$$ = $bytes$$[$pos$$++];
    if (128 > $c1_u$$) {
      $out$$[$c$$++] = String.fromCharCode($c1_u$$);
    } else {
      if (191 < $c1_u$$ && 224 > $c1_u$$) {
        var $c2$$ = $bytes$$[$pos$$++];
        $out$$[$c$$++] = String.fromCharCode(($c1_u$$ & 31) << 6 | $c2$$ & 63);
      } else {
        if (239 < $c1_u$$ && 365 > $c1_u$$) {
          $c2$$ = $bytes$$[$pos$$++];
          var $c3$$ = $bytes$$[$pos$$++], $c4$$ = $bytes$$[$pos$$++];
          $c1_u$$ = (($c1_u$$ & 7) << 18 | ($c2$$ & 63) << 12 | ($c3$$ & 63) << 6 | $c4$$ & 63) - 65536;
          $out$$[$c$$++] = String.fromCharCode(55296 + ($c1_u$$ >> 10));
          $out$$[$c$$++] = String.fromCharCode(56320 + ($c1_u$$ & 1023));
        } else {
          $c2$$ = $bytes$$[$pos$$++], $c3$$ = $bytes$$[$pos$$++], $out$$[$c$$++] = String.fromCharCode(($c1_u$$ & 15) << 12 | ($c2$$ & 63) << 6 | $c3$$ & 63);
        }
      }
    }
  }
  return $out$$.join("");
};
goog.crypt.xorByteArray = function($bytes1$$, $bytes2$$) {
  goog.asserts.assert($bytes1$$.length == $bytes2$$.length, "XOR array lengths must match");
  for (var $result$$ = [], $i$$ = 0; $i$$ < $bytes1$$.length; $i$$++) {
    $result$$.push($bytes1$$[$i$$] ^ $bytes2$$[$i$$]);
  }
  return $result$$;
};
goog.string = {};
goog.string.DETECT_DOUBLE_ESCAPING = !1;
goog.string.FORCE_NON_DOM_HTML_UNESCAPING = !1;
goog.string.Unicode = {NBSP:"\u00a0"};
goog.string.startsWith = function($str$$, $prefix$$) {
  return 0 == $str$$.lastIndexOf($prefix$$, 0);
};
goog.string.endsWith = function($str$$, $suffix$$) {
  var $l$$ = $str$$.length - $suffix$$.length;
  return 0 <= $l$$ && $str$$.indexOf($suffix$$, $l$$) == $l$$;
};
goog.string.caseInsensitiveStartsWith = function($str$$, $prefix$$) {
  return 0 == goog.string.caseInsensitiveCompare($prefix$$, $str$$.substr(0, $prefix$$.length));
};
goog.string.caseInsensitiveEndsWith = function($str$$, $suffix$$) {
  return 0 == goog.string.caseInsensitiveCompare($suffix$$, $str$$.substr($str$$.length - $suffix$$.length, $suffix$$.length));
};
goog.string.caseInsensitiveEquals = function($str1$$, $str2$$) {
  return $str1$$.toLowerCase() == $str2$$.toLowerCase();
};
goog.string.subs = function($str$$, $var_args$$) {
  for (var $splitParts$$ = $str$$.split("%s"), $returnString$$ = "", $subsArguments$$ = Array.prototype.slice.call(arguments, 1); $subsArguments$$.length && 1 < $splitParts$$.length;) {
    $returnString$$ += $splitParts$$.shift() + $subsArguments$$.shift();
  }
  return $returnString$$ + $splitParts$$.join("%s");
};
goog.string.collapseWhitespace = function($str$$) {
  return $str$$.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "");
};
goog.string.isEmptyOrWhitespace = function($str$$) {
  return /^[\s\xa0]*$/.test($str$$);
};
goog.string.isEmptyString = function($str$$) {
  return 0 == $str$$.length;
};
goog.string.isEmpty = goog.string.isEmptyOrWhitespace;
goog.string.isEmptyOrWhitespaceSafe = function($str$$) {
  return goog.string.isEmptyOrWhitespace(goog.string.makeSafe($str$$));
};
goog.string.isEmptySafe = goog.string.isEmptyOrWhitespaceSafe;
goog.string.isBreakingWhitespace = function($str$$) {
  return !/[^\t\n\r ]/.test($str$$);
};
goog.string.isAlpha = function($str$$) {
  return !/[^a-zA-Z]/.test($str$$);
};
goog.string.isNumeric = function($str$$) {
  return !/[^0-9]/.test($str$$);
};
goog.string.isAlphaNumeric = function($str$$) {
  return !/[^a-zA-Z0-9]/.test($str$$);
};
goog.string.isSpace = function($ch$$) {
  return " " == $ch$$;
};
goog.string.isUnicodeChar = function($ch$$) {
  return 1 == $ch$$.length && " " <= $ch$$ && "~" >= $ch$$ || "\u0080" <= $ch$$ && "\ufffd" >= $ch$$;
};
goog.string.stripNewlines = function($str$$) {
  return $str$$.replace(/(\r\n|\r|\n)+/g, " ");
};
goog.string.canonicalizeNewlines = function($str$$) {
  return $str$$.replace(/(\r\n|\r|\n)/g, "\n");
};
goog.string.normalizeWhitespace = function($str$$) {
  return $str$$.replace(/\xa0|\s/g, " ");
};
goog.string.normalizeSpaces = function($str$$) {
  return $str$$.replace(/\xa0|[ \t]+/g, " ");
};
goog.string.collapseBreakingSpaces = function($str$$) {
  return $str$$.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "");
};
goog.string.trim = goog.TRUSTED_SITE && String.prototype.trim ? function($str$$) {
  return $str$$.trim();
} : function($str$$) {
  return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec($str$$)[1];
};
goog.string.trimLeft = function($str$$) {
  return $str$$.replace(/^[\s\xa0]+/, "");
};
goog.string.trimRight = function($str$$) {
  return $str$$.replace(/[\s\xa0]+$/, "");
};
goog.string.caseInsensitiveCompare = function($str1$$, $str2$$) {
  $str1$$ = String($str1$$).toLowerCase();
  $str2$$ = String($str2$$).toLowerCase();
  return $str1$$ < $str2$$ ? -1 : $str1$$ == $str2$$ ? 0 : 1;
};
goog.string.numberAwareCompare_ = function($num1_str1$$, $num2_str2$$, $a$$) {
  if ($num1_str1$$ == $num2_str2$$) {
    return 0;
  }
  if (!$num1_str1$$) {
    return -1;
  }
  if (!$num2_str2$$) {
    return 1;
  }
  for (var $tokens1$$ = $num1_str1$$.toLowerCase().match($a$$), $tokens2$$ = $num2_str2$$.toLowerCase().match($a$$), $count$$ = Math.min($tokens1$$.length, $tokens2$$.length), $i$$ = 0; $i$$ < $count$$; $i$$++) {
    $a$$ = $tokens1$$[$i$$];
    var $b$$ = $tokens2$$[$i$$];
    if ($a$$ != $b$$) {
      return $num1_str1$$ = parseInt($a$$, 10), !isNaN($num1_str1$$) && ($num2_str2$$ = parseInt($b$$, 10), !isNaN($num2_str2$$) && $num1_str1$$ - $num2_str2$$) ? $num1_str1$$ - $num2_str2$$ : $a$$ < $b$$ ? -1 : 1;
    }
  }
  return $tokens1$$.length != $tokens2$$.length ? $tokens1$$.length - $tokens2$$.length : $num1_str1$$ < $num2_str2$$ ? -1 : 1;
};
goog.string.intAwareCompare = function($str1$$, $str2$$) {
  return goog.string.numberAwareCompare_($str1$$, $str2$$, /\d+|\D+/g);
};
goog.string.floatAwareCompare = function($str1$$, $str2$$) {
  return goog.string.numberAwareCompare_($str1$$, $str2$$, /\d+|\.\d+|\D+/g);
};
goog.string.numerateCompare = goog.string.floatAwareCompare;
goog.string.urlEncode = function($str$$) {
  return encodeURIComponent(String($str$$));
};
goog.string.urlDecode = function($str$$) {
  return decodeURIComponent($str$$.replace(/\+/g, " "));
};
goog.string.newLineToBr = function($str$$, $opt_xml$$) {
  return $str$$.replace(/(\r\n|\r|\n)/g, $opt_xml$$ ? "<br />" : "<br>");
};
goog.string.htmlEscape = function($str$$, $opt_isLikelyToContainHtmlChars$$) {
  if ($opt_isLikelyToContainHtmlChars$$) {
    $str$$ = $str$$.replace(goog.string.AMP_RE_, "&amp;").replace(goog.string.LT_RE_, "&lt;").replace(goog.string.GT_RE_, "&gt;").replace(goog.string.QUOT_RE_, "&quot;").replace(goog.string.SINGLE_QUOTE_RE_, "&#39;").replace(goog.string.NULL_RE_, "&#0;"), goog.string.DETECT_DOUBLE_ESCAPING && ($str$$ = $str$$.replace(goog.string.E_RE_, "&#101;"));
  } else {
    if (!goog.string.ALL_RE_.test($str$$)) {
      return $str$$;
    }
    -1 != $str$$.indexOf("&") && ($str$$ = $str$$.replace(goog.string.AMP_RE_, "&amp;"));
    -1 != $str$$.indexOf("<") && ($str$$ = $str$$.replace(goog.string.LT_RE_, "&lt;"));
    -1 != $str$$.indexOf(">") && ($str$$ = $str$$.replace(goog.string.GT_RE_, "&gt;"));
    -1 != $str$$.indexOf('"') && ($str$$ = $str$$.replace(goog.string.QUOT_RE_, "&quot;"));
    -1 != $str$$.indexOf("'") && ($str$$ = $str$$.replace(goog.string.SINGLE_QUOTE_RE_, "&#39;"));
    -1 != $str$$.indexOf("\x00") && ($str$$ = $str$$.replace(goog.string.NULL_RE_, "&#0;"));
    goog.string.DETECT_DOUBLE_ESCAPING && -1 != $str$$.indexOf("e") && ($str$$ = $str$$.replace(goog.string.E_RE_, "&#101;"));
  }
  return $str$$;
};
goog.string.AMP_RE_ = /&/g;
goog.string.LT_RE_ = /</g;
goog.string.GT_RE_ = />/g;
goog.string.QUOT_RE_ = /"/g;
goog.string.SINGLE_QUOTE_RE_ = /'/g;
goog.string.NULL_RE_ = /\x00/g;
goog.string.E_RE_ = /e/g;
goog.string.ALL_RE_ = goog.string.DETECT_DOUBLE_ESCAPING ? /[\x00&<>"'e]/ : /[\x00&<>"']/;
goog.string.unescapeEntities = function($str$$) {
  return goog.string.contains($str$$, "&") ? !goog.string.FORCE_NON_DOM_HTML_UNESCAPING && "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_($str$$) : goog.string.unescapePureXmlEntities_($str$$) : $str$$;
};
goog.string.unescapeEntitiesWithDocument = function($str$$, $document$$) {
  return goog.string.contains($str$$, "&") ? goog.string.unescapeEntitiesUsingDom_($str$$, $document$$) : $str$$;
};
goog.string.unescapeEntitiesUsingDom_ = function($str$$, $opt_document$$) {
  var $seen$$ = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&quot;":'"'};
  var $div$$ = $opt_document$$ ? $opt_document$$.createElement("div") : goog.global.document.createElement("div");
  return $str$$.replace(goog.string.HTML_ENTITY_PATTERN_, function($str$$, $opt_document$$) {
    var $s$$ = $seen$$[$str$$];
    if ($s$$) {
      return $s$$;
    }
    "#" == $opt_document$$.charAt(0) && ($opt_document$$ = Number("0" + $opt_document$$.substr(1)), isNaN($opt_document$$) || ($s$$ = String.fromCharCode($opt_document$$)));
    $s$$ || ($div$$.innerHTML = $str$$ + " ", $s$$ = $div$$.firstChild.nodeValue.slice(0, -1));
    return $seen$$[$str$$] = $s$$;
  });
};
goog.string.unescapePureXmlEntities_ = function($str$$) {
  return $str$$.replace(/&([^;]+);/g, function($str$$, $entity$jscomp$1_n$$) {
    switch($entity$jscomp$1_n$$) {
      case "amp":
        return "&";
      case "lt":
        return "<";
      case "gt":
        return ">";
      case "quot":
        return '"';
      default:
        return "#" != $entity$jscomp$1_n$$.charAt(0) || ($entity$jscomp$1_n$$ = Number("0" + $entity$jscomp$1_n$$.substr(1)), isNaN($entity$jscomp$1_n$$)) ? $str$$ : String.fromCharCode($entity$jscomp$1_n$$);
    }
  });
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function($str$$, $opt_xml$$) {
  return goog.string.newLineToBr($str$$.replace(/  /g, " &#160;"), $opt_xml$$);
};
goog.string.preserveSpaces = function($str$$) {
  return $str$$.replace(/(^|[\n ]) /g, "$1" + goog.string.Unicode.NBSP);
};
goog.string.stripQuotes = function($str$$, $quoteChars$$) {
  for (var $length$$ = $quoteChars$$.length, $i$$ = 0; $i$$ < $length$$; $i$$++) {
    var $quoteChar$$ = 1 == $length$$ ? $quoteChars$$ : $quoteChars$$.charAt($i$$);
    if ($str$$.charAt(0) == $quoteChar$$ && $str$$.charAt($str$$.length - 1) == $quoteChar$$) {
      return $str$$.substring(1, $str$$.length - 1);
    }
  }
  return $str$$;
};
goog.string.truncate = function($str$$, $chars$$, $opt_protectEscapedCharacters$$) {
  $opt_protectEscapedCharacters$$ && ($str$$ = goog.string.unescapeEntities($str$$));
  $str$$.length > $chars$$ && ($str$$ = $str$$.substring(0, $chars$$ - 3) + "...");
  $opt_protectEscapedCharacters$$ && ($str$$ = goog.string.htmlEscape($str$$));
  return $str$$;
};
goog.string.truncateMiddle = function($str$$, $chars$$, $opt_protectEscapedCharacters$$, $endPos_opt_trailingChars$$) {
  $opt_protectEscapedCharacters$$ && ($str$$ = goog.string.unescapeEntities($str$$));
  if ($endPos_opt_trailingChars$$ && $str$$.length > $chars$$) {
    $endPos_opt_trailingChars$$ > $chars$$ && ($endPos_opt_trailingChars$$ = $chars$$);
    var $endPoint_half$$ = $str$$.length - $endPos_opt_trailingChars$$;
    $chars$$ -= $endPos_opt_trailingChars$$;
    $str$$ = $str$$.substring(0, $chars$$) + "..." + $str$$.substring($endPoint_half$$);
  } else {
    $str$$.length > $chars$$ && ($endPoint_half$$ = Math.floor($chars$$ / 2), $endPos_opt_trailingChars$$ = $str$$.length - $endPoint_half$$, $endPoint_half$$ += $chars$$ % 2, $str$$ = $str$$.substring(0, $endPoint_half$$) + "..." + $str$$.substring($endPos_opt_trailingChars$$));
  }
  $opt_protectEscapedCharacters$$ && ($str$$ = goog.string.htmlEscape($str$$));
  return $str$$;
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\x0B", '"':'\\"', "\\":"\\\\", "<":"<"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function($s$$) {
  $s$$ = String($s$$);
  for (var $sb$$ = ['"'], $i$$ = 0; $i$$ < $s$$.length; $i$$++) {
    var $ch$$ = $s$$.charAt($i$$), $cc$$ = $ch$$.charCodeAt(0);
    $sb$$[$i$$ + 1] = goog.string.specialEscapeChars_[$ch$$] || (31 < $cc$$ && 127 > $cc$$ ? $ch$$ : goog.string.escapeChar($ch$$));
  }
  $sb$$.push('"');
  return $sb$$.join("");
};
goog.string.escapeString = function($str$$) {
  for (var $sb$$ = [], $i$$ = 0; $i$$ < $str$$.length; $i$$++) {
    $sb$$[$i$$] = goog.string.escapeChar($str$$.charAt($i$$));
  }
  return $sb$$.join("");
};
goog.string.escapeChar = function($c$$) {
  if ($c$$ in goog.string.jsEscapeCache_) {
    return goog.string.jsEscapeCache_[$c$$];
  }
  if ($c$$ in goog.string.specialEscapeChars_) {
    return goog.string.jsEscapeCache_[$c$$] = goog.string.specialEscapeChars_[$c$$];
  }
  var $cc$$ = $c$$.charCodeAt(0);
  if (31 < $cc$$ && 127 > $cc$$) {
    var $rv$$ = $c$$;
  } else {
    if (256 > $cc$$) {
      if ($rv$$ = "\\x", 16 > $cc$$ || 256 < $cc$$) {
        $rv$$ += "0";
      }
    } else {
      $rv$$ = "\\u", 4096 > $cc$$ && ($rv$$ += "0");
    }
    $rv$$ += $cc$$.toString(16).toUpperCase();
  }
  return goog.string.jsEscapeCache_[$c$$] = $rv$$;
};
goog.string.contains = function($str$$, $subString$$) {
  return -1 != $str$$.indexOf($subString$$);
};
goog.string.caseInsensitiveContains = function($str$$, $subString$$) {
  return goog.string.contains($str$$.toLowerCase(), $subString$$.toLowerCase());
};
goog.string.countOf = function($s$$, $ss$$) {
  return $s$$ && $ss$$ ? $s$$.split($ss$$).length - 1 : 0;
};
goog.string.removeAt = function($s$$, $index$$, $stringLength$$) {
  var $resultStr$$ = $s$$;
  0 <= $index$$ && $index$$ < $s$$.length && 0 < $stringLength$$ && ($resultStr$$ = $s$$.substr(0, $index$$) + $s$$.substr($index$$ + $stringLength$$, $s$$.length - $index$$ - $stringLength$$));
  return $resultStr$$;
};
goog.string.remove = function($str$$, $substr$$) {
  return $str$$.replace($substr$$, "");
};
goog.string.removeAll = function($s$$, $re$jscomp$1_ss$$) {
  $re$jscomp$1_ss$$ = new RegExp(goog.string.regExpEscape($re$jscomp$1_ss$$), "g");
  return $s$$.replace($re$jscomp$1_ss$$, "");
};
goog.string.replaceAll = function($s$$, $re$jscomp$2_ss$$, $replacement$$) {
  $re$jscomp$2_ss$$ = new RegExp(goog.string.regExpEscape($re$jscomp$2_ss$$), "g");
  return $s$$.replace($re$jscomp$2_ss$$, $replacement$$.replace(/\$/g, "$$$$"));
};
goog.string.regExpEscape = function($s$$) {
  return String($s$$).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
};
goog.string.repeat = String.prototype.repeat ? function($string$$, $length$$) {
  return $string$$.repeat($length$$);
} : function($string$$, $length$$) {
  return Array($length$$ + 1).join($string$$);
};
goog.string.padNumber = function($num$jscomp$5_s$$, $length$$, $index$jscomp$79_opt_precision$$) {
  $num$jscomp$5_s$$ = goog.isDef($index$jscomp$79_opt_precision$$) ? $num$jscomp$5_s$$.toFixed($index$jscomp$79_opt_precision$$) : String($num$jscomp$5_s$$);
  $index$jscomp$79_opt_precision$$ = $num$jscomp$5_s$$.indexOf(".");
  -1 == $index$jscomp$79_opt_precision$$ && ($index$jscomp$79_opt_precision$$ = $num$jscomp$5_s$$.length);
  return goog.string.repeat("0", Math.max(0, $length$$ - $index$jscomp$79_opt_precision$$)) + $num$jscomp$5_s$$;
};
goog.string.makeSafe = function($obj$$) {
  return null == $obj$$ ? "" : String($obj$$);
};
goog.string.buildString = function($var_args$$) {
  return Array.prototype.join.call(arguments, "");
};
goog.string.getRandomString = function() {
  return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36);
};
goog.string.compareVersions = function($v1Subs_version1$$, $v2Subs_version2$$) {
  var $order_v1CompNum$$ = 0;
  $v1Subs_version1$$ = goog.string.trim(String($v1Subs_version1$$)).split(".");
  $v2Subs_version2$$ = goog.string.trim(String($v2Subs_version2$$)).split(".");
  for (var $subCount$$ = Math.max($v1Subs_version1$$.length, $v2Subs_version2$$.length), $subIdx$$ = 0; 0 == $order_v1CompNum$$ && $subIdx$$ < $subCount$$; $subIdx$$++) {
    var $v1Comp_v1Sub$$ = $v1Subs_version1$$[$subIdx$$] || "", $v2Comp_v2Sub$$ = $v2Subs_version2$$[$subIdx$$] || "";
    do {
      $v1Comp_v1Sub$$ = /(\d*)(\D*)(.*)/.exec($v1Comp_v1Sub$$) || ["", "", "", ""];
      $v2Comp_v2Sub$$ = /(\d*)(\D*)(.*)/.exec($v2Comp_v2Sub$$) || ["", "", "", ""];
      if (0 == $v1Comp_v1Sub$$[0].length && 0 == $v2Comp_v2Sub$$[0].length) {
        break;
      }
      $order_v1CompNum$$ = 0 == $v1Comp_v1Sub$$[1].length ? 0 : parseInt($v1Comp_v1Sub$$[1], 10);
      var $v2CompNum$$ = 0 == $v2Comp_v2Sub$$[1].length ? 0 : parseInt($v2Comp_v2Sub$$[1], 10);
      $order_v1CompNum$$ = goog.string.compareElements_($order_v1CompNum$$, $v2CompNum$$) || goog.string.compareElements_(0 == $v1Comp_v1Sub$$[2].length, 0 == $v2Comp_v2Sub$$[2].length) || goog.string.compareElements_($v1Comp_v1Sub$$[2], $v2Comp_v2Sub$$[2]);
      $v1Comp_v1Sub$$ = $v1Comp_v1Sub$$[3];
      $v2Comp_v2Sub$$ = $v2Comp_v2Sub$$[3];
    } while (0 == $order_v1CompNum$$);
  }
  return $order_v1CompNum$$;
};
goog.string.compareElements_ = function($left$$, $right$$) {
  return $left$$ < $right$$ ? -1 : $left$$ > $right$$ ? 1 : 0;
};
goog.string.hashCode = function($str$$) {
  for (var $result$$ = 0, $i$$ = 0; $i$$ < $str$$.length; ++$i$$) {
    $result$$ = 31 * $result$$ + $str$$.charCodeAt($i$$) >>> 0;
  }
  return $result$$;
};
goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
goog.string.createUniqueString = function() {
  return "goog_" + goog.string.uniqueStringCounter_++;
};
goog.string.toNumber = function($str$$) {
  var $num$$ = Number($str$$);
  return 0 == $num$$ && goog.string.isEmptyOrWhitespace($str$$) ? NaN : $num$$;
};
goog.string.isLowerCamelCase = function($str$$) {
  return /^[a-z]+([A-Z][a-z]*)*$/.test($str$$);
};
goog.string.isUpperCamelCase = function($str$$) {
  return /^([A-Z][a-z]*)+$/.test($str$$);
};
goog.string.toCamelCase = function($str$$) {
  return String($str$$).replace(/\-([a-z])/g, function($str$$, $match$$) {
    return $match$$.toUpperCase();
  });
};
goog.string.toSelectorCase = function($str$$) {
  return String($str$$).replace(/([A-Z])/g, "-$1").toLowerCase();
};
goog.string.toTitleCase = function($str$$, $delimiters_opt_delimiters_regexp$$) {
  $delimiters_opt_delimiters_regexp$$ = ($delimiters_opt_delimiters_regexp$$ = goog.isString($delimiters_opt_delimiters_regexp$$) ? goog.string.regExpEscape($delimiters_opt_delimiters_regexp$$) : "\\s") ? "|[" + $delimiters_opt_delimiters_regexp$$ + "]+" : "";
  $delimiters_opt_delimiters_regexp$$ = new RegExp("(^" + $delimiters_opt_delimiters_regexp$$ + ")([a-z])", "g");
  return $str$$.replace($delimiters_opt_delimiters_regexp$$, function($str$$, $delimiters_opt_delimiters_regexp$$, $p2$$) {
    return $delimiters_opt_delimiters_regexp$$ + $p2$$.toUpperCase();
  });
};
goog.string.capitalize = function($str$$) {
  return String($str$$.charAt(0)).toUpperCase() + String($str$$.substr(1)).toLowerCase();
};
goog.string.parseInt = function($value$$) {
  isFinite($value$$) && ($value$$ = String($value$$));
  return goog.isString($value$$) ? /^\s*-?0x/i.test($value$$) ? parseInt($value$$, 16) : parseInt($value$$, 10) : NaN;
};
goog.string.splitLimit = function($parts$jscomp$3_str$$, $separator$$, $limit$$) {
  $parts$jscomp$3_str$$ = $parts$jscomp$3_str$$.split($separator$$);
  for (var $returnVal$$ = []; 0 < $limit$$ && $parts$jscomp$3_str$$.length;) {
    $returnVal$$.push($parts$jscomp$3_str$$.shift()), $limit$$--;
  }
  $parts$jscomp$3_str$$.length && $returnVal$$.push($parts$jscomp$3_str$$.join($separator$$));
  return $returnVal$$;
};
goog.string.lastComponent = function($str$$, $separators$$) {
  if ($separators$$) {
    "string" == typeof $separators$$ && ($separators$$ = [$separators$$]);
  } else {
    return $str$$;
  }
  for (var $lastSeparatorIndex$$ = -1, $i$$ = 0; $i$$ < $separators$$.length; $i$$++) {
    if ("" != $separators$$[$i$$]) {
      var $currentSeparatorIndex$$ = $str$$.lastIndexOf($separators$$[$i$$]);
      $currentSeparatorIndex$$ > $lastSeparatorIndex$$ && ($lastSeparatorIndex$$ = $currentSeparatorIndex$$);
    }
  }
  return -1 == $lastSeparatorIndex$$ ? $str$$ : $str$$.slice($lastSeparatorIndex$$ + 1);
};
goog.string.editDistance = function($a$$, $b$$) {
  var $v0$$ = [], $v1$$ = [];
  if ($a$$ == $b$$) {
    return 0;
  }
  if (!$a$$.length || !$b$$.length) {
    return Math.max($a$$.length, $b$$.length);
  }
  for (var $i$$ = 0; $i$$ < $b$$.length + 1; $i$$++) {
    $v0$$[$i$$] = $i$$;
  }
  for ($i$$ = 0; $i$$ < $a$$.length; $i$$++) {
    $v1$$[0] = $i$$ + 1;
    for (var $j$$ = 0; $j$$ < $b$$.length; $j$$++) {
      var $cost$$ = Number($a$$[$i$$] != $b$$[$j$$]);
      $v1$$[$j$$ + 1] = Math.min($v1$$[$j$$] + 1, $v0$$[$j$$ + 1] + 1, $v0$$[$j$$] + $cost$$);
    }
    for ($j$$ = 0; $j$$ < $v0$$.length; $j$$++) {
      $v0$$[$j$$] = $v1$$[$j$$];
    }
  }
  return $v1$$[$b$$.length];
};
goog.labs = {};
goog.labs.userAgent = {};
goog.labs.userAgent.util = {};
goog.labs.userAgent.util.getNativeUserAgentString_ = function() {
  var $navigator$jscomp$1_userAgent$$ = goog.labs.userAgent.util.getNavigator_();
  return $navigator$jscomp$1_userAgent$$ && ($navigator$jscomp$1_userAgent$$ = $navigator$jscomp$1_userAgent$$.userAgent) ? $navigator$jscomp$1_userAgent$$ : "";
};
goog.labs.userAgent.util.getNavigator_ = function() {
  return goog.global.navigator;
};
goog.labs.userAgent.util.userAgent_ = goog.labs.userAgent.util.getNativeUserAgentString_();
goog.labs.userAgent.util.setUserAgent = function($opt_userAgent$$) {
  goog.labs.userAgent.util.userAgent_ = $opt_userAgent$$ || goog.labs.userAgent.util.getNativeUserAgentString_();
};
goog.labs.userAgent.util.getUserAgent = function() {
  return goog.labs.userAgent.util.userAgent_;
};
goog.labs.userAgent.util.matchUserAgent = function($str$$) {
  var $userAgent$$ = goog.labs.userAgent.util.getUserAgent();
  return goog.string.contains($userAgent$$, $str$$);
};
goog.labs.userAgent.util.matchUserAgentIgnoreCase = function($str$$) {
  var $userAgent$$ = goog.labs.userAgent.util.getUserAgent();
  return goog.string.caseInsensitiveContains($userAgent$$, $str$$);
};
goog.labs.userAgent.util.extractVersionTuples = function($userAgent$$) {
  for (var $versionRegExp$$ = /(\w[\w ]+)\/([^\s]+)\s*(?:\((.*?)\))?/g, $data$$ = [], $match$$; $match$$ = $versionRegExp$$.exec($userAgent$$);) {
    $data$$.push([$match$$[1], $match$$[2], $match$$[3] || void 0]);
  }
  return $data$$;
};
goog.object = {};
goog.object.is = function($v$$, $v2$$) {
  return $v$$ === $v2$$ ? 0 !== $v$$ || 1 / $v$$ === 1 / $v2$$ : $v$$ !== $v$$ && $v2$$ !== $v2$$;
};
goog.object.forEach = function($obj$$, $f$$, $opt_obj$$) {
  for (var $key$$ in $obj$$) {
    $f$$.call($opt_obj$$, $obj$$[$key$$], $key$$, $obj$$);
  }
};
goog.object.filter = function($obj$$, $f$$, $opt_obj$$) {
  var $res$$ = {}, $key$$;
  for ($key$$ in $obj$$) {
    $f$$.call($opt_obj$$, $obj$$[$key$$], $key$$, $obj$$) && ($res$$[$key$$] = $obj$$[$key$$]);
  }
  return $res$$;
};
goog.object.map = function($obj$$, $f$$, $opt_obj$$) {
  var $res$$ = {}, $key$$;
  for ($key$$ in $obj$$) {
    $res$$[$key$$] = $f$$.call($opt_obj$$, $obj$$[$key$$], $key$$, $obj$$);
  }
  return $res$$;
};
goog.object.some = function($obj$$, $f$$, $opt_obj$$) {
  for (var $key$$ in $obj$$) {
    if ($f$$.call($opt_obj$$, $obj$$[$key$$], $key$$, $obj$$)) {
      return !0;
    }
  }
  return !1;
};
goog.object.every = function($obj$$, $f$$, $opt_obj$$) {
  for (var $key$$ in $obj$$) {
    if (!$f$$.call($opt_obj$$, $obj$$[$key$$], $key$$, $obj$$)) {
      return !1;
    }
  }
  return !0;
};
goog.object.getCount = function($obj$$) {
  var $rv$$ = 0, $key$$;
  for ($key$$ in $obj$$) {
    $rv$$++;
  }
  return $rv$$;
};
goog.object.getAnyKey = function($obj$$) {
  for (var $key$$ in $obj$$) {
    return $key$$;
  }
};
goog.object.getAnyValue = function($obj$$) {
  for (var $key$$ in $obj$$) {
    return $obj$$[$key$$];
  }
};
goog.object.contains = function($obj$$, $val$$) {
  return goog.object.containsValue($obj$$, $val$$);
};
goog.object.getValues = function($obj$$) {
  var $res$$ = [], $i$$ = 0, $key$$;
  for ($key$$ in $obj$$) {
    $res$$[$i$$++] = $obj$$[$key$$];
  }
  return $res$$;
};
goog.object.getKeys = function($obj$$) {
  var $res$$ = [], $i$$ = 0, $key$$;
  for ($key$$ in $obj$$) {
    $res$$[$i$$++] = $key$$;
  }
  return $res$$;
};
goog.object.getValueByKeys = function($obj$$, $var_args$$) {
  var $i$$ = goog.isArrayLike($var_args$$), $keys$$ = $i$$ ? $var_args$$ : arguments;
  for ($i$$ = $i$$ ? 0 : 1; $i$$ < $keys$$.length; $i$$++) {
    if (null == $obj$$) {
      return;
    }
    $obj$$ = $obj$$[$keys$$[$i$$]];
  }
  return $obj$$;
};
goog.object.containsKey = function($obj$$, $key$$) {
  return null !== $obj$$ && $key$$ in $obj$$;
};
goog.object.containsValue = function($obj$$, $val$$) {
  for (var $key$$ in $obj$$) {
    if ($obj$$[$key$$] == $val$$) {
      return !0;
    }
  }
  return !1;
};
goog.object.findKey = function($obj$$, $f$$, $opt_this$$) {
  for (var $key$$ in $obj$$) {
    if ($f$$.call($opt_this$$, $obj$$[$key$$], $key$$, $obj$$)) {
      return $key$$;
    }
  }
};
goog.object.findValue = function($obj$$, $f$jscomp$30_key$$, $opt_this$$) {
  return ($f$jscomp$30_key$$ = goog.object.findKey($obj$$, $f$jscomp$30_key$$, $opt_this$$)) && $obj$$[$f$jscomp$30_key$$];
};
goog.object.isEmpty = function($obj$$) {
  for (var $key$$ in $obj$$) {
    return !1;
  }
  return !0;
};
goog.object.clear = function($obj$$) {
  for (var $i$$ in $obj$$) {
    delete $obj$$[$i$$];
  }
};
goog.object.remove = function($obj$$, $key$$) {
  var $rv$$;
  ($rv$$ = $key$$ in $obj$$) && delete $obj$$[$key$$];
  return $rv$$;
};
goog.object.add = function($obj$$, $key$$, $val$$) {
  if (null !== $obj$$ && $key$$ in $obj$$) {
    throw Error('The object already contains the key "' + $key$$ + '"');
  }
  goog.object.set($obj$$, $key$$, $val$$);
};
goog.object.get = function($obj$$, $key$$, $opt_val$$) {
  return null !== $obj$$ && $key$$ in $obj$$ ? $obj$$[$key$$] : $opt_val$$;
};
goog.object.set = function($obj$$, $key$$, $value$$) {
  $obj$$[$key$$] = $value$$;
};
goog.object.setIfUndefined = function($obj$$, $key$$, $value$$) {
  return $key$$ in $obj$$ ? $obj$$[$key$$] : $obj$$[$key$$] = $value$$;
};
goog.object.setWithReturnValueIfNotSet = function($obj$$, $key$$, $f$jscomp$31_val$$) {
  if ($key$$ in $obj$$) {
    return $obj$$[$key$$];
  }
  $f$jscomp$31_val$$ = $f$jscomp$31_val$$();
  return $obj$$[$key$$] = $f$jscomp$31_val$$;
};
goog.object.equals = function($a$$, $b$$) {
  for (var $k$$ in $a$$) {
    if (!($k$$ in $b$$) || $a$$[$k$$] !== $b$$[$k$$]) {
      return !1;
    }
  }
  for ($k$$ in $b$$) {
    if (!($k$$ in $a$$)) {
      return !1;
    }
  }
  return !0;
};
goog.object.clone = function($obj$$) {
  var $res$$ = {}, $key$$;
  for ($key$$ in $obj$$) {
    $res$$[$key$$] = $obj$$[$key$$];
  }
  return $res$$;
};
goog.object.unsafeClone = function($obj$$) {
  var $clone$jscomp$1_type$$ = goog.typeOf($obj$$);
  if ("object" == $clone$jscomp$1_type$$ || "array" == $clone$jscomp$1_type$$) {
    if (goog.isFunction($obj$$.clone)) {
      return $obj$$.clone();
    }
    $clone$jscomp$1_type$$ = "array" == $clone$jscomp$1_type$$ ? [] : {};
    for (var $key$$ in $obj$$) {
      $clone$jscomp$1_type$$[$key$$] = goog.object.unsafeClone($obj$$[$key$$]);
    }
    return $clone$jscomp$1_type$$;
  }
  return $obj$$;
};
goog.object.transpose = function($obj$$) {
  var $transposed$$ = {}, $key$$;
  for ($key$$ in $obj$$) {
    $transposed$$[$obj$$[$key$$]] = $key$$;
  }
  return $transposed$$;
};
goog.object.PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.object.extend = function($target$$, $var_args$$) {
  for (var $key$$, $source$$, $i$$ = 1; $i$$ < arguments.length; $i$$++) {
    $source$$ = arguments[$i$$];
    for ($key$$ in $source$$) {
      $target$$[$key$$] = $source$$[$key$$];
    }
    for (var $j$$ = 0; $j$$ < goog.object.PROTOTYPE_FIELDS_.length; $j$$++) {
      $key$$ = goog.object.PROTOTYPE_FIELDS_[$j$$], Object.prototype.hasOwnProperty.call($source$$, $key$$) && ($target$$[$key$$] = $source$$[$key$$]);
    }
  }
};
goog.object.create = function($var_args$$) {
  var $argLength$$ = arguments.length;
  if (1 == $argLength$$ && goog.isArray(arguments[0])) {
    return goog.object.create.apply(null, arguments[0]);
  }
  if ($argLength$$ % 2) {
    throw Error("Uneven number of arguments");
  }
  for (var $rv$$ = {}, $i$$ = 0; $i$$ < $argLength$$; $i$$ += 2) {
    $rv$$[arguments[$i$$]] = arguments[$i$$ + 1];
  }
  return $rv$$;
};
goog.object.createSet = function($var_args$$) {
  var $argLength$$ = arguments.length;
  if (1 == $argLength$$ && goog.isArray(arguments[0])) {
    return goog.object.createSet.apply(null, arguments[0]);
  }
  for (var $rv$$ = {}, $i$$ = 0; $i$$ < $argLength$$; $i$$++) {
    $rv$$[arguments[$i$$]] = !0;
  }
  return $rv$$;
};
goog.object.createImmutableView = function($obj$$) {
  var $result$$ = $obj$$;
  Object.isFrozen && !Object.isFrozen($obj$$) && ($result$$ = Object.create($obj$$), Object.freeze($result$$));
  return $result$$;
};
goog.object.isImmutableView = function($obj$$) {
  return !!Object.isFrozen && Object.isFrozen($obj$$);
};
goog.object.getAllPropertyNames = function($obj$jscomp$74_proto$$, $opt_includeObjectPrototype$$, $opt_includeFunctionPrototype$$) {
  if (!$obj$jscomp$74_proto$$) {
    return [];
  }
  if (!Object.getOwnPropertyNames || !Object.getPrototypeOf) {
    return goog.object.getKeys($obj$jscomp$74_proto$$);
  }
  for (var $visitedSet$$ = {}; $obj$jscomp$74_proto$$ && ($obj$jscomp$74_proto$$ !== Object.prototype || $opt_includeObjectPrototype$$) && ($obj$jscomp$74_proto$$ !== Function.prototype || $opt_includeFunctionPrototype$$);) {
    for (var $names$$ = Object.getOwnPropertyNames($obj$jscomp$74_proto$$), $i$$ = 0; $i$$ < $names$$.length; $i$$++) {
      $visitedSet$$[$names$$[$i$$]] = !0;
    }
    $obj$jscomp$74_proto$$ = Object.getPrototypeOf($obj$jscomp$74_proto$$);
  }
  return goog.object.getKeys($visitedSet$$);
};
goog.labs.userAgent.browser = {};
goog.labs.userAgent.browser.matchOpera_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Opera");
};
goog.labs.userAgent.browser.matchIE_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE");
};
goog.labs.userAgent.browser.matchEdge_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Edge");
};
goog.labs.userAgent.browser.matchFirefox_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Firefox");
};
goog.labs.userAgent.browser.matchSafari_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Safari") && !(goog.labs.userAgent.browser.matchChrome_() || goog.labs.userAgent.browser.matchCoast_() || goog.labs.userAgent.browser.matchOpera_() || goog.labs.userAgent.browser.matchEdge_() || goog.labs.userAgent.browser.isSilk() || goog.labs.userAgent.util.matchUserAgent("Android"));
};
goog.labs.userAgent.browser.matchCoast_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Coast");
};
goog.labs.userAgent.browser.matchIosWebview_ = function() {
  return (goog.labs.userAgent.util.matchUserAgent("iPad") || goog.labs.userAgent.util.matchUserAgent("iPhone")) && !goog.labs.userAgent.browser.matchSafari_() && !goog.labs.userAgent.browser.matchChrome_() && !goog.labs.userAgent.browser.matchCoast_() && goog.labs.userAgent.util.matchUserAgent("AppleWebKit");
};
goog.labs.userAgent.browser.matchChrome_ = function() {
  return (goog.labs.userAgent.util.matchUserAgent("Chrome") || goog.labs.userAgent.util.matchUserAgent("CriOS")) && !goog.labs.userAgent.browser.matchEdge_();
};
goog.labs.userAgent.browser.matchAndroidBrowser_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Android") && !(goog.labs.userAgent.browser.isChrome() || goog.labs.userAgent.browser.isFirefox() || goog.labs.userAgent.browser.isOpera() || goog.labs.userAgent.browser.isSilk());
};
goog.labs.userAgent.browser.isOpera = goog.labs.userAgent.browser.matchOpera_;
goog.labs.userAgent.browser.isIE = goog.labs.userAgent.browser.matchIE_;
goog.labs.userAgent.browser.isEdge = goog.labs.userAgent.browser.matchEdge_;
goog.labs.userAgent.browser.isFirefox = goog.labs.userAgent.browser.matchFirefox_;
goog.labs.userAgent.browser.isSafari = goog.labs.userAgent.browser.matchSafari_;
goog.labs.userAgent.browser.isCoast = goog.labs.userAgent.browser.matchCoast_;
goog.labs.userAgent.browser.isIosWebview = goog.labs.userAgent.browser.matchIosWebview_;
goog.labs.userAgent.browser.isChrome = goog.labs.userAgent.browser.matchChrome_;
goog.labs.userAgent.browser.isAndroidBrowser = goog.labs.userAgent.browser.matchAndroidBrowser_;
goog.labs.userAgent.browser.isSilk = function() {
  return goog.labs.userAgent.util.matchUserAgent("Silk");
};
goog.labs.userAgent.browser.getVersion = function() {
  function $lookUpValueWithKeys$$($lookUpValueWithKeys$$) {
    $lookUpValueWithKeys$$ = goog.array.find($lookUpValueWithKeys$$, $versionMapHasKey$$);
    return $versionMap$$[$lookUpValueWithKeys$$] || "";
  }
  var $tuple_userAgentString_versionTuples$$ = goog.labs.userAgent.util.getUserAgent();
  if (goog.labs.userAgent.browser.isIE()) {
    return goog.labs.userAgent.browser.getIEVersion_($tuple_userAgentString_versionTuples$$);
  }
  $tuple_userAgentString_versionTuples$$ = goog.labs.userAgent.util.extractVersionTuples($tuple_userAgentString_versionTuples$$);
  var $versionMap$$ = {};
  goog.array.forEach($tuple_userAgentString_versionTuples$$, function($lookUpValueWithKeys$$) {
    var $tuple_userAgentString_versionTuples$$ = $lookUpValueWithKeys$$[0];
    $lookUpValueWithKeys$$ = $lookUpValueWithKeys$$[1];
    $versionMap$$[$tuple_userAgentString_versionTuples$$] = $lookUpValueWithKeys$$;
  });
  var $versionMapHasKey$$ = goog.partial(goog.object.containsKey, $versionMap$$);
  return goog.labs.userAgent.browser.isOpera() ? $lookUpValueWithKeys$$(["Version", "Opera"]) : goog.labs.userAgent.browser.isEdge() ? $lookUpValueWithKeys$$(["Edge"]) : goog.labs.userAgent.browser.isChrome() ? $lookUpValueWithKeys$$(["Chrome", "CriOS"]) : ($tuple_userAgentString_versionTuples$$ = $tuple_userAgentString_versionTuples$$[2]) && $tuple_userAgentString_versionTuples$$[1] || "";
};
goog.labs.userAgent.browser.isVersionOrHigher = function($version$$) {
  return 0 <= goog.string.compareVersions(goog.labs.userAgent.browser.getVersion(), $version$$);
};
goog.labs.userAgent.browser.getIEVersion_ = function($tridentVersion_userAgent$$) {
  var $rv$jscomp$7_version$$ = /rv: *([\d\.]*)/.exec($tridentVersion_userAgent$$);
  if ($rv$jscomp$7_version$$ && $rv$jscomp$7_version$$[1]) {
    return $rv$jscomp$7_version$$[1];
  }
  $rv$jscomp$7_version$$ = "";
  var $msie$$ = /MSIE +([\d\.]+)/.exec($tridentVersion_userAgent$$);
  if ($msie$$ && $msie$$[1]) {
    if ($tridentVersion_userAgent$$ = /Trident\/(\d.\d)/.exec($tridentVersion_userAgent$$), "7.0" == $msie$$[1]) {
      if ($tridentVersion_userAgent$$ && $tridentVersion_userAgent$$[1]) {
        switch($tridentVersion_userAgent$$[1]) {
          case "4.0":
            $rv$jscomp$7_version$$ = "8.0";
            break;
          case "5.0":
            $rv$jscomp$7_version$$ = "9.0";
            break;
          case "6.0":
            $rv$jscomp$7_version$$ = "10.0";
            break;
          case "7.0":
            $rv$jscomp$7_version$$ = "11.0";
        }
      } else {
        $rv$jscomp$7_version$$ = "7.0";
      }
    } else {
      $rv$jscomp$7_version$$ = $msie$$[1];
    }
  }
  return $rv$jscomp$7_version$$;
};
goog.labs.userAgent.platform = {};
goog.labs.userAgent.platform.isAndroid = function() {
  return goog.labs.userAgent.util.matchUserAgent("Android");
};
goog.labs.userAgent.platform.isIpod = function() {
  return goog.labs.userAgent.util.matchUserAgent("iPod");
};
goog.labs.userAgent.platform.isIphone = function() {
  return goog.labs.userAgent.util.matchUserAgent("iPhone") && !goog.labs.userAgent.util.matchUserAgent("iPod") && !goog.labs.userAgent.util.matchUserAgent("iPad");
};
goog.labs.userAgent.platform.isIpad = function() {
  return goog.labs.userAgent.util.matchUserAgent("iPad");
};
goog.labs.userAgent.platform.isIos = function() {
  return goog.labs.userAgent.platform.isIphone() || goog.labs.userAgent.platform.isIpad() || goog.labs.userAgent.platform.isIpod();
};
goog.labs.userAgent.platform.isMacintosh = function() {
  return goog.labs.userAgent.util.matchUserAgent("Macintosh");
};
goog.labs.userAgent.platform.isLinux = function() {
  return goog.labs.userAgent.util.matchUserAgent("Linux");
};
goog.labs.userAgent.platform.isWindows = function() {
  return goog.labs.userAgent.util.matchUserAgent("Windows");
};
goog.labs.userAgent.platform.isChromeOS = function() {
  return goog.labs.userAgent.util.matchUserAgent("CrOS");
};
goog.labs.userAgent.platform.isChromecast = function() {
  return goog.labs.userAgent.util.matchUserAgent("CrKey");
};
goog.labs.userAgent.platform.isKaiOS = function() {
  return goog.labs.userAgent.util.matchUserAgentIgnoreCase("KaiOS");
};
goog.labs.userAgent.platform.getVersion = function() {
  var $match$jscomp$3_userAgentString$$ = goog.labs.userAgent.util.getUserAgent(), $re$jscomp$3_version$$ = "";
  goog.labs.userAgent.platform.isWindows() ? ($re$jscomp$3_version$$ = /Windows (?:NT|Phone) ([0-9.]+)/, $re$jscomp$3_version$$ = ($match$jscomp$3_userAgentString$$ = $re$jscomp$3_version$$.exec($match$jscomp$3_userAgentString$$)) ? $match$jscomp$3_userAgentString$$[1] : "0.0") : goog.labs.userAgent.platform.isIos() ? ($re$jscomp$3_version$$ = /(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/, $re$jscomp$3_version$$ = ($match$jscomp$3_userAgentString$$ = $re$jscomp$3_version$$.exec($match$jscomp$3_userAgentString$$)) && 
  $match$jscomp$3_userAgentString$$[1].replace(/_/g, ".")) : goog.labs.userAgent.platform.isMacintosh() ? ($re$jscomp$3_version$$ = /Mac OS X ([0-9_.]+)/, $re$jscomp$3_version$$ = ($match$jscomp$3_userAgentString$$ = $re$jscomp$3_version$$.exec($match$jscomp$3_userAgentString$$)) ? $match$jscomp$3_userAgentString$$[1].replace(/_/g, ".") : "10") : goog.labs.userAgent.platform.isAndroid() ? ($re$jscomp$3_version$$ = /Android\s+([^\);]+)(\)|;)/, $re$jscomp$3_version$$ = ($match$jscomp$3_userAgentString$$ = 
  $re$jscomp$3_version$$.exec($match$jscomp$3_userAgentString$$)) && $match$jscomp$3_userAgentString$$[1]) : goog.labs.userAgent.platform.isChromeOS() && ($re$jscomp$3_version$$ = /(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/, $re$jscomp$3_version$$ = ($match$jscomp$3_userAgentString$$ = $re$jscomp$3_version$$.exec($match$jscomp$3_userAgentString$$)) && $match$jscomp$3_userAgentString$$[1]);
  return $re$jscomp$3_version$$ || "";
};
goog.labs.userAgent.platform.isVersionOrHigher = function($version$$) {
  return 0 <= goog.string.compareVersions(goog.labs.userAgent.platform.getVersion(), $version$$);
};
goog.labs.userAgent.engine = {};
goog.labs.userAgent.engine.isPresto = function() {
  return goog.labs.userAgent.util.matchUserAgent("Presto");
};
goog.labs.userAgent.engine.isTrident = function() {
  return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE");
};
goog.labs.userAgent.engine.isEdge = function() {
  return goog.labs.userAgent.util.matchUserAgent("Edge");
};
goog.labs.userAgent.engine.isWebKit = function() {
  return goog.labs.userAgent.util.matchUserAgentIgnoreCase("WebKit") && !goog.labs.userAgent.engine.isEdge();
};
goog.labs.userAgent.engine.isGecko = function() {
  return goog.labs.userAgent.util.matchUserAgent("Gecko") && !goog.labs.userAgent.engine.isWebKit() && !goog.labs.userAgent.engine.isTrident() && !goog.labs.userAgent.engine.isEdge();
};
goog.labs.userAgent.engine.getVersion = function() {
  var $browserTuple_tuples_userAgentString$$ = goog.labs.userAgent.util.getUserAgent();
  if ($browserTuple_tuples_userAgentString$$) {
    $browserTuple_tuples_userAgentString$$ = goog.labs.userAgent.util.extractVersionTuples($browserTuple_tuples_userAgentString$$);
    var $engineTuple$$ = goog.labs.userAgent.engine.getEngineTuple_($browserTuple_tuples_userAgentString$$);
    if ($engineTuple$$) {
      return "Gecko" == $engineTuple$$[0] ? goog.labs.userAgent.engine.getVersionForKey_($browserTuple_tuples_userAgentString$$, "Firefox") : $engineTuple$$[1];
    }
    $browserTuple_tuples_userAgentString$$ = $browserTuple_tuples_userAgentString$$[0];
    var $info_match$$;
    if ($browserTuple_tuples_userAgentString$$ && ($info_match$$ = $browserTuple_tuples_userAgentString$$[2]) && ($info_match$$ = /Trident\/([^\s;]+)/.exec($info_match$$))) {
      return $info_match$$[1];
    }
  }
  return "";
};
goog.labs.userAgent.engine.getEngineTuple_ = function($tuples$$) {
  if (!goog.labs.userAgent.engine.isEdge()) {
    return $tuples$$[1];
  }
  for (var $i$$ = 0; $i$$ < $tuples$$.length; $i$$++) {
    var $tuple$$ = $tuples$$[$i$$];
    if ("Edge" == $tuple$$[0]) {
      return $tuple$$;
    }
  }
};
goog.labs.userAgent.engine.isVersionOrHigher = function($version$$) {
  return 0 <= goog.string.compareVersions(goog.labs.userAgent.engine.getVersion(), $version$$);
};
goog.labs.userAgent.engine.getVersionForKey_ = function($pair_tuples$$, $key$$) {
  return ($pair_tuples$$ = goog.array.find($pair_tuples$$, function($pair_tuples$$) {
    return $key$$ == $pair_tuples$$[0];
  })) && $pair_tuples$$[1] || "";
};
goog.reflect = {};
goog.reflect.object = function($type$$, $object$$) {
  return $object$$;
};
goog.reflect.objectProperty = function($prop$$) {
  return $prop$$;
};
goog.reflect.sinkValue = function($x$$) {
  goog.reflect.sinkValue[" "]($x$$);
  return $x$$;
};
goog.reflect.sinkValue[" "] = goog.nullFunction;
goog.reflect.canAccessProperty = function($obj$$, $prop$$) {
  try {
    return goog.reflect.sinkValue($obj$$[$prop$$]), !0;
  } catch ($e$$) {
  }
  return !1;
};
goog.reflect.cache = function($cacheObj$$, $key$$, $valueFn$$, $opt_keyFn_storedKey$$) {
  $opt_keyFn_storedKey$$ = $opt_keyFn_storedKey$$ ? $opt_keyFn_storedKey$$($key$$) : $key$$;
  return Object.prototype.hasOwnProperty.call($cacheObj$$, $opt_keyFn_storedKey$$) ? $cacheObj$$[$opt_keyFn_storedKey$$] : $cacheObj$$[$opt_keyFn_storedKey$$] = $valueFn$$($key$$);
};
goog.userAgent = {};
goog.userAgent.ASSUME_IE = !1;
goog.userAgent.ASSUME_EDGE = !1;
goog.userAgent.ASSUME_GECKO = !1;
goog.userAgent.ASSUME_WEBKIT = !1;
goog.userAgent.ASSUME_MOBILE_WEBKIT = !1;
goog.userAgent.ASSUME_OPERA = !1;
goog.userAgent.ASSUME_ANY_VERSION = !1;
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_EDGE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
goog.userAgent.getUserAgentString = function() {
  return goog.labs.userAgent.util.getUserAgent();
};
goog.userAgent.getNavigatorTyped = function() {
  return goog.global.navigator || null;
};
goog.userAgent.getNavigator = function() {
  return goog.userAgent.getNavigatorTyped();
};
goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.labs.userAgent.browser.isOpera();
goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.labs.userAgent.browser.isIE();
goog.userAgent.EDGE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_EDGE : goog.labs.userAgent.engine.isEdge();
goog.userAgent.EDGE_OR_IE = goog.userAgent.EDGE || goog.userAgent.IE;
goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.labs.userAgent.engine.isGecko();
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.labs.userAgent.engine.isWebKit();
goog.userAgent.isMobile_ = function() {
  return goog.userAgent.WEBKIT && goog.labs.userAgent.util.matchUserAgent("Mobile");
};
goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.isMobile_();
goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
goog.userAgent.determinePlatform_ = function() {
  var $navigator$$ = goog.userAgent.getNavigatorTyped();
  return $navigator$$ && $navigator$$.platform || "";
};
goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
goog.userAgent.ASSUME_MAC = !1;
goog.userAgent.ASSUME_WINDOWS = !1;
goog.userAgent.ASSUME_LINUX = !1;
goog.userAgent.ASSUME_X11 = !1;
goog.userAgent.ASSUME_ANDROID = !1;
goog.userAgent.ASSUME_IPHONE = !1;
goog.userAgent.ASSUME_IPAD = !1;
goog.userAgent.ASSUME_IPOD = !1;
goog.userAgent.ASSUME_KAIOS = !1;
goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11 || goog.userAgent.ASSUME_ANDROID || goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD || goog.userAgent.ASSUME_IPOD;
goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.labs.userAgent.platform.isMacintosh();
goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.labs.userAgent.platform.isWindows();
goog.userAgent.isLegacyLinux_ = function() {
  return goog.labs.userAgent.platform.isLinux() || goog.labs.userAgent.platform.isChromeOS();
};
goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.isLegacyLinux_();
goog.userAgent.isX11_ = function() {
  var $navigator$$ = goog.userAgent.getNavigatorTyped();
  return !!$navigator$$ && goog.string.contains($navigator$$.appVersion || "", "X11");
};
goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.isX11_();
goog.userAgent.ANDROID = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_ANDROID : goog.labs.userAgent.platform.isAndroid();
goog.userAgent.IPHONE = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE : goog.labs.userAgent.platform.isIphone();
goog.userAgent.IPAD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPAD : goog.labs.userAgent.platform.isIpad();
goog.userAgent.IPOD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPOD : goog.labs.userAgent.platform.isIpod();
goog.userAgent.IOS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD || goog.userAgent.ASSUME_IPOD : goog.labs.userAgent.platform.isIos();
goog.userAgent.KAIOS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_KAIOS : goog.labs.userAgent.platform.isKaiOS();
goog.userAgent.determineVersion_ = function() {
  var $version$$ = "", $arr$$ = goog.userAgent.getVersionRegexResult_();
  $arr$$ && ($version$$ = $arr$$ ? $arr$$[1] : "");
  return goog.userAgent.IE && ($arr$$ = goog.userAgent.getDocumentMode_(), null != $arr$$ && $arr$$ > parseFloat($version$$)) ? String($arr$$) : $version$$;
};
goog.userAgent.getVersionRegexResult_ = function() {
  var $userAgent$$ = goog.userAgent.getUserAgentString();
  if (goog.userAgent.GECKO) {
    return /rv:([^\);]+)(\)|;)/.exec($userAgent$$);
  }
  if (goog.userAgent.EDGE) {
    return /Edge\/([\d\.]+)/.exec($userAgent$$);
  }
  if (goog.userAgent.IE) {
    return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec($userAgent$$);
  }
  if (goog.userAgent.WEBKIT) {
    return /WebKit\/(\S+)/.exec($userAgent$$);
  }
  if (goog.userAgent.OPERA) {
    return /(?:Version)[ \/]?(\S+)/.exec($userAgent$$);
  }
};
goog.userAgent.getDocumentMode_ = function() {
  var $doc$$ = goog.global.document;
  return $doc$$ ? $doc$$.documentMode : void 0;
};
goog.userAgent.VERSION = goog.userAgent.determineVersion_();
goog.userAgent.compare = function($v1$$, $v2$$) {
  return goog.string.compareVersions($v1$$, $v2$$);
};
goog.userAgent.isVersionOrHigherCache_ = {};
goog.userAgent.isVersionOrHigher = function($version$$) {
  return goog.userAgent.ASSUME_ANY_VERSION || goog.reflect.cache(goog.userAgent.isVersionOrHigherCache_, $version$$, function() {
    return 0 <= goog.string.compareVersions(goog.userAgent.VERSION, $version$$);
  });
};
goog.userAgent.isVersion = goog.userAgent.isVersionOrHigher;
goog.userAgent.isDocumentModeOrHigher = function($documentMode$$) {
  return Number(goog.userAgent.DOCUMENT_MODE) >= $documentMode$$;
};
goog.userAgent.isDocumentMode = goog.userAgent.isDocumentModeOrHigher;
var JSCompiler_inline_result$jscomp$4;
var doc$jscomp$inline_5 = goog.global.document, mode$jscomp$inline_6 = goog.userAgent.getDocumentMode_();
JSCompiler_inline_result$jscomp$4 = doc$jscomp$inline_5 && goog.userAgent.IE ? mode$jscomp$inline_6 || ("CSS1Compat" == doc$jscomp$inline_5.compatMode ? parseInt(goog.userAgent.VERSION, 10) : 5) : void 0;
goog.userAgent.DOCUMENT_MODE = JSCompiler_inline_result$jscomp$4;
goog.userAgent.product = {};
goog.userAgent.product.ASSUME_FIREFOX = !1;
goog.userAgent.product.ASSUME_IPHONE = !1;
goog.userAgent.product.ASSUME_IPAD = !1;
goog.userAgent.product.ASSUME_ANDROID = !1;
goog.userAgent.product.ASSUME_CHROME = !1;
goog.userAgent.product.ASSUME_SAFARI = !1;
goog.userAgent.product.PRODUCT_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_EDGE || goog.userAgent.ASSUME_OPERA || goog.userAgent.product.ASSUME_FIREFOX || goog.userAgent.product.ASSUME_IPHONE || goog.userAgent.product.ASSUME_IPAD || goog.userAgent.product.ASSUME_ANDROID || goog.userAgent.product.ASSUME_CHROME || goog.userAgent.product.ASSUME_SAFARI;
goog.userAgent.product.OPERA = goog.userAgent.OPERA;
goog.userAgent.product.IE = goog.userAgent.IE;
goog.userAgent.product.EDGE = goog.userAgent.EDGE;
goog.userAgent.product.FIREFOX = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_FIREFOX : goog.labs.userAgent.browser.isFirefox();
goog.userAgent.product.isIphoneOrIpod_ = function() {
  return goog.labs.userAgent.platform.isIphone() || goog.labs.userAgent.platform.isIpod();
};
goog.userAgent.product.IPHONE = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPHONE : goog.userAgent.product.isIphoneOrIpod_();
goog.userAgent.product.IPAD = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPAD : goog.labs.userAgent.platform.isIpad();
goog.userAgent.product.ANDROID = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_ANDROID : goog.labs.userAgent.browser.isAndroidBrowser();
goog.userAgent.product.CHROME = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_CHROME : goog.labs.userAgent.browser.isChrome();
goog.userAgent.product.isSafariDesktop_ = function() {
  return goog.labs.userAgent.browser.isSafari() && !goog.labs.userAgent.platform.isIos();
};
goog.userAgent.product.SAFARI = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_SAFARI : goog.userAgent.product.isSafariDesktop_();
goog.crypt.base64 = {};
goog.crypt.base64.byteToCharMap_ = null;
goog.crypt.base64.charToByteMap_ = null;
goog.crypt.base64.byteToCharMapWebSafe_ = null;
goog.crypt.base64.ENCODED_VALS_BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
goog.crypt.base64.ENCODED_VALS = goog.crypt.base64.ENCODED_VALS_BASE + "+/=";
goog.crypt.base64.ENCODED_VALS_WEBSAFE = goog.crypt.base64.ENCODED_VALS_BASE + "-_.";
goog.crypt.base64.ASSUME_NATIVE_SUPPORT_ = goog.userAgent.GECKO || goog.userAgent.WEBKIT && !goog.userAgent.product.SAFARI || goog.userAgent.OPERA;
goog.crypt.base64.HAS_NATIVE_ENCODE_ = goog.crypt.base64.ASSUME_NATIVE_SUPPORT_ || "function" == typeof goog.global.btoa;
goog.crypt.base64.HAS_NATIVE_DECODE_ = goog.crypt.base64.ASSUME_NATIVE_SUPPORT_ || !goog.userAgent.product.SAFARI && !goog.userAgent.IE && "function" == typeof goog.global.atob;
goog.crypt.base64.encodeByteArray = function($input$$, $byteToCharMap_opt_webSafe$$) {
  goog.asserts.assert(goog.isArrayLike($input$$), "encodeByteArray takes an array as a parameter");
  goog.crypt.base64.init_();
  $byteToCharMap_opt_webSafe$$ = $byteToCharMap_opt_webSafe$$ ? goog.crypt.base64.byteToCharMapWebSafe_ : goog.crypt.base64.byteToCharMap_;
  for (var $output$$ = [], $i$$ = 0; $i$$ < $input$$.length; $i$$ += 3) {
    var $byte1_outByte2$$ = $input$$[$i$$], $haveByte2$$ = $i$$ + 1 < $input$$.length, $byte2_outByte3$$ = $haveByte2$$ ? $input$$[$i$$ + 1] : 0, $haveByte3$$ = $i$$ + 2 < $input$$.length, $byte3_outByte4$$ = $haveByte3$$ ? $input$$[$i$$ + 2] : 0, $outByte1$$ = $byte1_outByte2$$ >> 2;
    $byte1_outByte2$$ = ($byte1_outByte2$$ & 3) << 4 | $byte2_outByte3$$ >> 4;
    $byte2_outByte3$$ = ($byte2_outByte3$$ & 15) << 2 | $byte3_outByte4$$ >> 6;
    $byte3_outByte4$$ &= 63;
    $haveByte3$$ || ($byte3_outByte4$$ = 64, $haveByte2$$ || ($byte2_outByte3$$ = 64));
    $output$$.push($byteToCharMap_opt_webSafe$$[$outByte1$$], $byteToCharMap_opt_webSafe$$[$byte1_outByte2$$], $byteToCharMap_opt_webSafe$$[$byte2_outByte3$$], $byteToCharMap_opt_webSafe$$[$byte3_outByte4$$]);
  }
  return $output$$.join("");
};
goog.crypt.base64.encodeString = function($input$$, $opt_webSafe$$) {
  return goog.crypt.base64.HAS_NATIVE_ENCODE_ && !$opt_webSafe$$ ? goog.global.btoa($input$$) : goog.crypt.base64.encodeByteArray(goog.crypt.stringToByteArray($input$$), $opt_webSafe$$);
};
goog.crypt.base64.decodeString = function($input$$, $opt_webSafe$$) {
  function $pushByte$$($input$$) {
    $output$$ += String.fromCharCode($input$$);
  }
  if (goog.crypt.base64.HAS_NATIVE_DECODE_ && !$opt_webSafe$$) {
    return goog.global.atob($input$$);
  }
  var $output$$ = "";
  goog.crypt.base64.decodeStringInternal_($input$$, $pushByte$$);
  return $output$$;
};
goog.crypt.base64.decodeStringToByteArray = function($input$$) {
  function $pushByte$$($input$$) {
    $output$$.push($input$$);
  }
  var $output$$ = [];
  goog.crypt.base64.decodeStringInternal_($input$$, $pushByte$$);
  return $output$$;
};
goog.crypt.base64.decodeStringToUint8Array = function($input$$) {
  function $pushByte$$($input$$) {
    $output$$[$outLen$$++] = $input$$;
  }
  goog.asserts.assert(!goog.userAgent.IE || goog.userAgent.isVersionOrHigher("10"), "Browser does not support typed arrays");
  var $len$$ = $input$$.length, $placeholders$$ = 0;
  "=" === $input$$[$len$$ - 2] ? $placeholders$$ = 2 : "=" === $input$$[$len$$ - 1] && ($placeholders$$ = 1);
  var $output$$ = new Uint8Array(Math.ceil(3 * $len$$ / 4) - $placeholders$$), $outLen$$ = 0;
  goog.crypt.base64.decodeStringInternal_($input$$, $pushByte$$);
  return $output$$.subarray(0, $outLen$$);
};
goog.crypt.base64.decodeStringInternal_ = function($input$$, $pushByte$$) {
  function $getByte$$($pushByte$$) {
    for (; $nextCharIndex$$ < $input$$.length;) {
      var $getByte$$ = $input$$.charAt($nextCharIndex$$++), $byte1$jscomp$1_outByte1$$ = goog.crypt.base64.charToByteMap_[$getByte$$];
      if (null != $byte1$jscomp$1_outByte1$$) {
        return $byte1$jscomp$1_outByte1$$;
      }
      if (!goog.string.isEmptyOrWhitespace($getByte$$)) {
        throw Error("Unknown base64 encoding at char: " + $getByte$$);
      }
    }
    return $pushByte$$;
  }
  goog.crypt.base64.init_();
  for (var $nextCharIndex$$ = 0;;) {
    var $byte1$jscomp$1_outByte1$$ = $getByte$$(-1), $byte2$jscomp$1_outByte2$$ = $getByte$$(0), $byte3$jscomp$1_outByte3$$ = $getByte$$(64), $byte4$$ = $getByte$$(64);
    if (64 === $byte4$$ && -1 === $byte1$jscomp$1_outByte1$$) {
      break;
    }
    $byte1$jscomp$1_outByte1$$ = $byte1$jscomp$1_outByte1$$ << 2 | $byte2$jscomp$1_outByte2$$ >> 4;
    $pushByte$$($byte1$jscomp$1_outByte1$$);
    64 != $byte3$jscomp$1_outByte3$$ && ($byte2$jscomp$1_outByte2$$ = $byte2$jscomp$1_outByte2$$ << 4 & 240 | $byte3$jscomp$1_outByte3$$ >> 2, $pushByte$$($byte2$jscomp$1_outByte2$$), 64 != $byte4$$ && ($byte3$jscomp$1_outByte3$$ = $byte3$jscomp$1_outByte3$$ << 6 & 192 | $byte4$$, $pushByte$$($byte3$jscomp$1_outByte3$$)));
  }
};
goog.crypt.base64.init_ = function() {
  if (!goog.crypt.base64.byteToCharMap_) {
    goog.crypt.base64.byteToCharMap_ = {};
    goog.crypt.base64.charToByteMap_ = {};
    goog.crypt.base64.byteToCharMapWebSafe_ = {};
    for (var $i$$ = 0; $i$$ < goog.crypt.base64.ENCODED_VALS.length; $i$$++) {
      goog.crypt.base64.byteToCharMap_[$i$$] = goog.crypt.base64.ENCODED_VALS.charAt($i$$), goog.crypt.base64.charToByteMap_[goog.crypt.base64.byteToCharMap_[$i$$]] = $i$$, goog.crypt.base64.byteToCharMapWebSafe_[$i$$] = goog.crypt.base64.ENCODED_VALS_WEBSAFE.charAt($i$$), $i$$ >= goog.crypt.base64.ENCODED_VALS_BASE.length && (goog.crypt.base64.charToByteMap_[goog.crypt.base64.ENCODED_VALS_WEBSAFE.charAt($i$$)] = $i$$);
    }
  }
};
jspb.utils = {};
jspb.utils.split64Low = 0;
jspb.utils.split64High = 0;
jspb.utils.splitUint64 = function($highBits_value$$) {
  var $lowBits$$ = $highBits_value$$ >>> 0;
  $highBits_value$$ = Math.floor(($highBits_value$$ - $lowBits$$) / jspb.BinaryConstants.TWO_TO_32) >>> 0;
  jspb.utils.split64Low = $lowBits$$;
  jspb.utils.split64High = $highBits_value$$;
};
jspb.utils.splitInt64 = function($highBits$jscomp$1_value$$) {
  var $sign$$ = 0 > $highBits$jscomp$1_value$$;
  $highBits$jscomp$1_value$$ = Math.abs($highBits$jscomp$1_value$$);
  var $lowBits$$ = $highBits$jscomp$1_value$$ >>> 0;
  $highBits$jscomp$1_value$$ = Math.floor(($highBits$jscomp$1_value$$ - $lowBits$$) / jspb.BinaryConstants.TWO_TO_32);
  $highBits$jscomp$1_value$$ >>>= 0;
  $sign$$ && ($highBits$jscomp$1_value$$ = ~$highBits$jscomp$1_value$$ >>> 0, $lowBits$$ = ~$lowBits$$ >>> 0, $lowBits$$ += 1, 4294967295 < $lowBits$$ && ($lowBits$$ = 0, $highBits$jscomp$1_value$$++, 4294967295 < $highBits$jscomp$1_value$$ && ($highBits$jscomp$1_value$$ = 0)));
  jspb.utils.split64Low = $lowBits$$;
  jspb.utils.split64High = $highBits$jscomp$1_value$$;
};
jspb.utils.splitZigzag64 = function($lowBits$jscomp$2_value$$) {
  var $sign$$ = 0 > $lowBits$jscomp$2_value$$;
  $lowBits$jscomp$2_value$$ = 2 * Math.abs($lowBits$jscomp$2_value$$);
  jspb.utils.splitUint64($lowBits$jscomp$2_value$$);
  $lowBits$jscomp$2_value$$ = jspb.utils.split64Low;
  var $highBits$$ = jspb.utils.split64High;
  $sign$$ && (0 == $lowBits$jscomp$2_value$$ ? 0 == $highBits$$ ? $highBits$$ = $lowBits$jscomp$2_value$$ = 4294967295 : ($highBits$$--, $lowBits$jscomp$2_value$$ = 4294967295) : $lowBits$jscomp$2_value$$--);
  jspb.utils.split64Low = $lowBits$jscomp$2_value$$;
  jspb.utils.split64High = $highBits$$;
};
jspb.utils.splitFloat32 = function($mant_value$$) {
  var $sign$$ = 0 > $mant_value$$ ? 1 : 0;
  $mant_value$$ = $sign$$ ? -$mant_value$$ : $mant_value$$;
  if (0 === $mant_value$$) {
    0 < 1 / $mant_value$$ ? (jspb.utils.split64High = 0, jspb.utils.split64Low = 0) : (jspb.utils.split64High = 0, jspb.utils.split64Low = 2147483648);
  } else {
    if (isNaN($mant_value$$)) {
      jspb.utils.split64High = 0, jspb.utils.split64Low = 2147483647;
    } else {
      if ($mant_value$$ > jspb.BinaryConstants.FLOAT32_MAX) {
        jspb.utils.split64High = 0, jspb.utils.split64Low = ($sign$$ << 31 | 2139095040) >>> 0;
      } else {
        if ($mant_value$$ < jspb.BinaryConstants.FLOAT32_MIN) {
          $mant_value$$ = Math.round($mant_value$$ / Math.pow(2, -149)), jspb.utils.split64High = 0, jspb.utils.split64Low = ($sign$$ << 31 | $mant_value$$) >>> 0;
        } else {
          var $exp$$ = Math.floor(Math.log($mant_value$$) / Math.LN2);
          $mant_value$$ *= Math.pow(2, -$exp$$);
          $mant_value$$ = Math.round($mant_value$$ * jspb.BinaryConstants.TWO_TO_23) & 8388607;
          jspb.utils.split64High = 0;
          jspb.utils.split64Low = ($sign$$ << 31 | $exp$$ + 127 << 23 | $mant_value$$) >>> 0;
        }
      }
    }
  }
};
jspb.utils.splitFloat64 = function($mantHigh_value$$) {
  var $sign$$ = 0 > $mantHigh_value$$ ? 1 : 0;
  $mantHigh_value$$ = $sign$$ ? -$mantHigh_value$$ : $mantHigh_value$$;
  if (0 === $mantHigh_value$$) {
    jspb.utils.split64High = 0 < 1 / $mantHigh_value$$ ? 0 : 2147483648, jspb.utils.split64Low = 0;
  } else {
    if (isNaN($mantHigh_value$$)) {
      jspb.utils.split64High = 2147483647, jspb.utils.split64Low = 4294967295;
    } else {
      if ($mantHigh_value$$ > jspb.BinaryConstants.FLOAT64_MAX) {
        jspb.utils.split64High = ($sign$$ << 31 | 2146435072) >>> 0, jspb.utils.split64Low = 0;
      } else {
        if ($mantHigh_value$$ < jspb.BinaryConstants.FLOAT64_MIN) {
          var $mant$$ = $mantHigh_value$$ / Math.pow(2, -1074);
          $mantHigh_value$$ = $mant$$ / jspb.BinaryConstants.TWO_TO_32;
          jspb.utils.split64High = ($sign$$ << 31 | $mantHigh_value$$) >>> 0;
          jspb.utils.split64Low = $mant$$ >>> 0;
        } else {
          var $exp$$ = Math.floor(Math.log($mantHigh_value$$) / Math.LN2);
          1024 == $exp$$ && ($exp$$ = 1023);
          $mant$$ = $mantHigh_value$$ * Math.pow(2, -$exp$$);
          $mantHigh_value$$ = $mant$$ * jspb.BinaryConstants.TWO_TO_20 & 1048575;
          $mant$$ = $mant$$ * jspb.BinaryConstants.TWO_TO_52 >>> 0;
          jspb.utils.split64High = ($sign$$ << 31 | $exp$$ + 1023 << 20 | $mantHigh_value$$) >>> 0;
          jspb.utils.split64Low = $mant$$;
        }
      }
    }
  }
};
jspb.utils.splitHash64 = function($h$$) {
  var $a$$ = $h$$.charCodeAt(0), $b$$ = $h$$.charCodeAt(1), $c$$ = $h$$.charCodeAt(2), $d$$ = $h$$.charCodeAt(3), $e$$ = $h$$.charCodeAt(4), $f$$ = $h$$.charCodeAt(5), $g$$ = $h$$.charCodeAt(6);
  $h$$ = $h$$.charCodeAt(7);
  jspb.utils.split64Low = $a$$ + ($b$$ << 8) + ($c$$ << 16) + ($d$$ << 24) >>> 0;
  jspb.utils.split64High = $e$$ + ($f$$ << 8) + ($g$$ << 16) + ($h$$ << 24) >>> 0;
};
jspb.utils.joinUint64 = function($bitsLow$$, $bitsHigh$$) {
  return $bitsHigh$$ * jspb.BinaryConstants.TWO_TO_32 + $bitsLow$$;
};
jspb.utils.joinInt64 = function($bitsLow$jscomp$1_result$$, $bitsHigh$$) {
  var $sign$$ = $bitsHigh$$ & 2147483648;
  $sign$$ && ($bitsLow$jscomp$1_result$$ = ~$bitsLow$jscomp$1_result$$ + 1 >>> 0, $bitsHigh$$ = ~$bitsHigh$$ >>> 0, 0 == $bitsLow$jscomp$1_result$$ && ($bitsHigh$$ = $bitsHigh$$ + 1 >>> 0));
  $bitsLow$jscomp$1_result$$ = jspb.utils.joinUint64($bitsLow$jscomp$1_result$$, $bitsHigh$$);
  return $sign$$ ? -$bitsLow$jscomp$1_result$$ : $bitsLow$jscomp$1_result$$;
};
jspb.utils.joinZigzag64 = function($bitsLow$jscomp$2_result$$, $bitsHigh$$) {
  var $sign$$ = $bitsLow$jscomp$2_result$$ & 1;
  $bitsLow$jscomp$2_result$$ = ($bitsLow$jscomp$2_result$$ >>> 1 | $bitsHigh$$ << 31) >>> 0;
  $bitsHigh$$ >>>= 1;
  $sign$$ && ($bitsLow$jscomp$2_result$$ = $bitsLow$jscomp$2_result$$ + 1 >>> 0, 0 == $bitsLow$jscomp$2_result$$ && ($bitsHigh$$ = $bitsHigh$$ + 1 >>> 0));
  $bitsLow$jscomp$2_result$$ = jspb.utils.joinUint64($bitsLow$jscomp$2_result$$, $bitsHigh$$);
  return $sign$$ ? -$bitsLow$jscomp$2_result$$ : $bitsLow$jscomp$2_result$$;
};
jspb.utils.joinFloat32 = function($bitsLow$jscomp$3_mant$$) {
  var $sign$$ = 2 * ($bitsLow$jscomp$3_mant$$ >> 31) + 1, $exp$$ = $bitsLow$jscomp$3_mant$$ >>> 23 & 255;
  $bitsLow$jscomp$3_mant$$ &= 8388607;
  return 255 == $exp$$ ? $bitsLow$jscomp$3_mant$$ ? NaN : Infinity * $sign$$ : 0 == $exp$$ ? $sign$$ * Math.pow(2, -149) * $bitsLow$jscomp$3_mant$$ : $sign$$ * Math.pow(2, $exp$$ - 150) * ($bitsLow$jscomp$3_mant$$ + Math.pow(2, 23));
};
jspb.utils.joinFloat64 = function($bitsLow$jscomp$4_mant$$, $bitsHigh$$) {
  var $sign$$ = 2 * ($bitsHigh$$ >> 31) + 1, $exp$$ = $bitsHigh$$ >>> 20 & 2047;
  $bitsLow$jscomp$4_mant$$ = jspb.BinaryConstants.TWO_TO_32 * ($bitsHigh$$ & 1048575) + $bitsLow$jscomp$4_mant$$;
  return 2047 == $exp$$ ? $bitsLow$jscomp$4_mant$$ ? NaN : Infinity * $sign$$ : 0 == $exp$$ ? $sign$$ * Math.pow(2, -1074) * $bitsLow$jscomp$4_mant$$ : $sign$$ * Math.pow(2, $exp$$ - 1075) * ($bitsLow$jscomp$4_mant$$ + jspb.BinaryConstants.TWO_TO_52);
};
jspb.utils.joinHash64 = function($bitsLow$jscomp$5_d$$, $bitsHigh$jscomp$5_h$$) {
  var $a$$ = $bitsLow$jscomp$5_d$$ >>> 0 & 255, $b$$ = $bitsLow$jscomp$5_d$$ >>> 8 & 255, $c$$ = $bitsLow$jscomp$5_d$$ >>> 16 & 255;
  $bitsLow$jscomp$5_d$$ = $bitsLow$jscomp$5_d$$ >>> 24 & 255;
  var $e$$ = $bitsHigh$jscomp$5_h$$ >>> 0 & 255, $f$$ = $bitsHigh$jscomp$5_h$$ >>> 8 & 255, $g$$ = $bitsHigh$jscomp$5_h$$ >>> 16 & 255;
  $bitsHigh$jscomp$5_h$$ = $bitsHigh$jscomp$5_h$$ >>> 24 & 255;
  return String.fromCharCode($a$$, $b$$, $c$$, $bitsLow$jscomp$5_d$$, $e$$, $f$$, $g$$, $bitsHigh$jscomp$5_h$$);
};
jspb.utils.DIGITS = "0123456789abcdef".split("");
jspb.utils.joinUnsignedDecimalString = function($bitsLow$$, $bitsHigh$$) {
  function $emit$$($bitsLow$$) {
    for (var $bitsHigh$$ = 10000000, $emit$$ = 0; 7 > $emit$$; $emit$$++) {
      $bitsHigh$$ /= 10;
      var $digitA_low$$ = $bitsLow$$ / $bitsHigh$$ % 10 >>> 0;
      if (0 != $digitA_low$$ || $start$$) {
        $start$$ = !0, $result$$ += $table$$[$digitA_low$$];
      }
    }
  }
  if (2097151 >= $bitsHigh$$) {
    return "" + (jspb.BinaryConstants.TWO_TO_32 * $bitsHigh$$ + $bitsLow$$);
  }
  var $digitA_low$$ = $bitsLow$$ & 16777215;
  $bitsLow$$ = ($bitsLow$$ >>> 24 | $bitsHigh$$ << 8) >>> 0 & 16777215;
  $bitsHigh$$ = $bitsHigh$$ >> 16 & 65535;
  $digitA_low$$ = $digitA_low$$ + 6777216 * $bitsLow$$ + 6710656 * $bitsHigh$$;
  $bitsLow$$ += 8147497 * $bitsHigh$$;
  $bitsHigh$$ *= 2;
  10000000 <= $digitA_low$$ && ($bitsLow$$ += Math.floor($digitA_low$$ / 10000000), $digitA_low$$ %= 10000000);
  10000000 <= $bitsLow$$ && ($bitsHigh$$ += Math.floor($bitsLow$$ / 10000000), $bitsLow$$ %= 10000000);
  var $table$$ = jspb.utils.DIGITS, $start$$ = !1, $result$$ = "";
  ($bitsHigh$$ || $start$$) && $emit$$($bitsHigh$$);
  ($bitsLow$$ || $start$$) && $emit$$($bitsLow$$);
  ($digitA_low$$ || $start$$) && $emit$$($digitA_low$$);
  return $result$$;
};
jspb.utils.joinSignedDecimalString = function($bitsLow$jscomp$7_result$$, $bitsHigh$$) {
  var $negative$$ = $bitsHigh$$ & 2147483648;
  if ($negative$$) {
    $bitsLow$jscomp$7_result$$ = ~$bitsLow$jscomp$7_result$$ + 1 >>> 0;
    var $carry$$ = 0 == $bitsLow$jscomp$7_result$$ ? 1 : 0;
    $bitsHigh$$ = ~$bitsHigh$$ + $carry$$ >>> 0;
  }
  $bitsLow$jscomp$7_result$$ = jspb.utils.joinUnsignedDecimalString($bitsLow$jscomp$7_result$$, $bitsHigh$$);
  return $negative$$ ? "-" + $bitsLow$jscomp$7_result$$ : $bitsLow$jscomp$7_result$$;
};
jspb.utils.hash64ToDecimalString = function($bitsLow$jscomp$8_hash$$, $signed$$) {
  jspb.utils.splitHash64($bitsLow$jscomp$8_hash$$);
  $bitsLow$jscomp$8_hash$$ = jspb.utils.split64Low;
  var $bitsHigh$$ = jspb.utils.split64High;
  return $signed$$ ? jspb.utils.joinSignedDecimalString($bitsLow$jscomp$8_hash$$, $bitsHigh$$) : jspb.utils.joinUnsignedDecimalString($bitsLow$jscomp$8_hash$$, $bitsHigh$$);
};
jspb.utils.hash64ArrayToDecimalStrings = function($hashes$$, $signed$$) {
  for (var $result$$ = Array($hashes$$.length), $i$$ = 0; $i$$ < $hashes$$.length; $i$$++) {
    $result$$[$i$$] = jspb.utils.hash64ToDecimalString($hashes$$[$i$$], $signed$$);
  }
  return $result$$;
};
jspb.utils.decimalStringToHash64 = function($dec$$) {
  function $muladd$$($dec$$, $muladd$$) {
    for (var $neg$$ = 0; 8 > $neg$$ && (1 !== $dec$$ || 0 < $muladd$$); $neg$$++) {
      $muladd$$ = $dec$$ * $resultBytes$$[$neg$$] + $muladd$$, $resultBytes$$[$neg$$] = $muladd$$ & 255, $muladd$$ >>>= 8;
    }
  }
  function $neg$$() {
    for (var $dec$$ = 0; 8 > $dec$$; $dec$$++) {
      $resultBytes$$[$dec$$] = ~$resultBytes$$[$dec$$] & 255;
    }
  }
  goog.asserts.assert(0 < $dec$$.length);
  var $minus$$ = !1;
  "-" === $dec$$[0] && ($minus$$ = !0, $dec$$ = $dec$$.slice(1));
  for (var $resultBytes$$ = [0, 0, 0, 0, 0, 0, 0, 0], $i$jscomp$0$$ = 0; $i$jscomp$0$$ < $dec$$.length; $i$jscomp$0$$++) {
    $muladd$$(10, jspb.utils.DIGITS.indexOf($dec$$[$i$jscomp$0$$]));
  }
  $minus$$ && ($neg$$(), $muladd$$(1, 1));
  return goog.crypt.byteArrayToString($resultBytes$$);
};
jspb.utils.splitDecimalString = function($value$$) {
  jspb.utils.splitHash64(jspb.utils.decimalStringToHash64($value$$));
};
jspb.utils.hash64ToHexString = function($hash$jscomp$2_result$$) {
  var $temp$$ = Array(18);
  $temp$$[0] = "0";
  $temp$$[1] = "x";
  for (var $i$$ = 0; 8 > $i$$; $i$$++) {
    var $c$$ = $hash$jscomp$2_result$$.charCodeAt(7 - $i$$);
    $temp$$[2 * $i$$ + 2] = jspb.utils.DIGITS[$c$$ >> 4];
    $temp$$[2 * $i$$ + 3] = jspb.utils.DIGITS[$c$$ & 15];
  }
  return $hash$jscomp$2_result$$ = $temp$$.join("");
};
jspb.utils.hexStringToHash64 = function($hex$$) {
  $hex$$ = $hex$$.toLowerCase();
  goog.asserts.assert(18 == $hex$$.length);
  goog.asserts.assert("0" == $hex$$[0]);
  goog.asserts.assert("x" == $hex$$[1]);
  for (var $result$$ = "", $i$$ = 0; 8 > $i$$; $i$$++) {
    var $hi$$ = jspb.utils.DIGITS.indexOf($hex$$[2 * $i$$ + 2]), $lo$$ = jspb.utils.DIGITS.indexOf($hex$$[2 * $i$$ + 3]);
    $result$$ = String.fromCharCode(16 * $hi$$ + $lo$$) + $result$$;
  }
  return $result$$;
};
jspb.utils.hash64ToNumber = function($bitsLow$jscomp$9_hash$$, $signed$$) {
  jspb.utils.splitHash64($bitsLow$jscomp$9_hash$$);
  $bitsLow$jscomp$9_hash$$ = jspb.utils.split64Low;
  var $bitsHigh$$ = jspb.utils.split64High;
  return $signed$$ ? jspb.utils.joinInt64($bitsLow$jscomp$9_hash$$, $bitsHigh$$) : jspb.utils.joinUint64($bitsLow$jscomp$9_hash$$, $bitsHigh$$);
};
jspb.utils.numberToHash64 = function($value$$) {
  jspb.utils.splitInt64($value$$);
  return jspb.utils.joinHash64(jspb.utils.split64Low, jspb.utils.split64High);
};
jspb.utils.countVarints = function($buffer$$, $start$$, $end$$) {
  for (var $count$$ = 0, $i$$ = $start$$; $i$$ < $end$$; $i$$++) {
    $count$$ += $buffer$$[$i$$] >> 7;
  }
  return $end$$ - $start$$ - $count$$;
};
jspb.utils.countVarintFields = function($buffer$$, $cursor_start$$, $end$$, $field_tag$$) {
  var $count$$ = 0;
  $field_tag$$ = 8 * $field_tag$$ + jspb.BinaryConstants.WireType.VARINT;
  if (128 > $field_tag$$) {
    for (; $cursor_start$$ < $end$$ && $buffer$$[$cursor_start$$++] == $field_tag$$;) {
      for ($count$$++;;) {
        var $temp$jscomp$2_x$$ = $buffer$$[$cursor_start$$++];
        if (0 == ($temp$jscomp$2_x$$ & 128)) {
          break;
        }
      }
    }
  } else {
    for (; $cursor_start$$ < $end$$;) {
      for ($temp$jscomp$2_x$$ = $field_tag$$; 128 < $temp$jscomp$2_x$$;) {
        if ($buffer$$[$cursor_start$$] != ($temp$jscomp$2_x$$ & 127 | 128)) {
          return $count$$;
        }
        $cursor_start$$++;
        $temp$jscomp$2_x$$ >>= 7;
      }
      if ($buffer$$[$cursor_start$$++] != $temp$jscomp$2_x$$) {
        break;
      }
      for ($count$$++; $temp$jscomp$2_x$$ = $buffer$$[$cursor_start$$++], 0 != ($temp$jscomp$2_x$$ & 128);) {
      }
    }
  }
  return $count$$;
};
jspb.utils.countFixedFields_ = function($buffer$$, $cursor$jscomp$1_start$$, $end$$, $tag$$, $stride$$) {
  var $count$$ = 0;
  if (128 > $tag$$) {
    for (; $cursor$jscomp$1_start$$ < $end$$ && $buffer$$[$cursor$jscomp$1_start$$++] == $tag$$;) {
      $count$$++, $cursor$jscomp$1_start$$ += $stride$$;
    }
  } else {
    for (; $cursor$jscomp$1_start$$ < $end$$;) {
      for (var $temp$$ = $tag$$; 128 < $temp$$;) {
        if ($buffer$$[$cursor$jscomp$1_start$$++] != ($temp$$ & 127 | 128)) {
          return $count$$;
        }
        $temp$$ >>= 7;
      }
      if ($buffer$$[$cursor$jscomp$1_start$$++] != $temp$$) {
        break;
      }
      $count$$++;
      $cursor$jscomp$1_start$$ += $stride$$;
    }
  }
  return $count$$;
};
jspb.utils.countFixed32Fields = function($buffer$$, $start$$, $end$$, $field$jscomp$1_tag$$) {
  $field$jscomp$1_tag$$ = 8 * $field$jscomp$1_tag$$ + jspb.BinaryConstants.WireType.FIXED32;
  return jspb.utils.countFixedFields_($buffer$$, $start$$, $end$$, $field$jscomp$1_tag$$, 4);
};
jspb.utils.countFixed64Fields = function($buffer$$, $start$$, $end$$, $field$jscomp$2_tag$$) {
  $field$jscomp$2_tag$$ = 8 * $field$jscomp$2_tag$$ + jspb.BinaryConstants.WireType.FIXED64;
  return jspb.utils.countFixedFields_($buffer$$, $start$$, $end$$, $field$jscomp$2_tag$$, 8);
};
jspb.utils.countDelimitedFields = function($buffer$$, $cursor$jscomp$2_start$$, $end$$, $field$jscomp$3_tag$$) {
  var $count$$ = 0;
  for ($field$jscomp$3_tag$$ = 8 * $field$jscomp$3_tag$$ + jspb.BinaryConstants.WireType.DELIMITED; $cursor$jscomp$2_start$$ < $end$$;) {
    for (var $temp$$ = $field$jscomp$3_tag$$; 128 < $temp$$;) {
      if ($buffer$$[$cursor$jscomp$2_start$$++] != ($temp$$ & 127 | 128)) {
        return $count$$;
      }
      $temp$$ >>= 7;
    }
    if ($buffer$$[$cursor$jscomp$2_start$$++] != $temp$$) {
      break;
    }
    $count$$++;
    for (var $length$$ = 0, $shift$$ = 1; $temp$$ = $buffer$$[$cursor$jscomp$2_start$$++], $length$$ += ($temp$$ & 127) * $shift$$, $shift$$ *= 128, 0 != ($temp$$ & 128);) {
    }
    $cursor$jscomp$2_start$$ += $length$$;
  }
  return $count$$;
};
jspb.utils.debugBytesToTextFormat = function($byteSource_bytes$$) {
  var $s$$ = '"';
  if ($byteSource_bytes$$) {
    $byteSource_bytes$$ = jspb.utils.byteSourceToUint8Array($byteSource_bytes$$);
    for (var $i$$ = 0; $i$$ < $byteSource_bytes$$.length; $i$$++) {
      $s$$ += "\\x", 16 > $byteSource_bytes$$[$i$$] && ($s$$ += "0"), $s$$ += $byteSource_bytes$$[$i$$].toString(16);
    }
  }
  return $s$$ + '"';
};
jspb.utils.debugScalarToTextFormat = function($scalar$$) {
  return goog.isString($scalar$$) ? goog.string.quote($scalar$$) : $scalar$$.toString();
};
jspb.utils.stringToByteArray = function($str$$) {
  for (var $arr$$ = new Uint8Array($str$$.length), $i$$ = 0; $i$$ < $str$$.length; $i$$++) {
    var $codepoint$$ = $str$$.charCodeAt($i$$);
    if (255 < $codepoint$$) {
      throw Error("Conversion error: string contains codepoint outside of byte range");
    }
    $arr$$[$i$$] = $codepoint$$;
  }
  return $arr$$;
};
jspb.utils.byteSourceToUint8Array = function($data$$) {
  if ($data$$.constructor === Uint8Array) {
    return $data$$;
  }
  if ($data$$.constructor === ArrayBuffer) {
    return new Uint8Array($data$$);
  }
  if ($data$$.constructor === Array) {
    return new Uint8Array($data$$);
  }
  if ($data$$.constructor === String) {
    return goog.crypt.base64.decodeStringToUint8Array($data$$);
  }
  goog.asserts.fail("Type not convertible to Uint8Array.");
  return new Uint8Array(0);
};
jspb.BinaryIterator = function($opt_decoder$$, $opt_next$$, $opt_elements$$) {
  this.elements_ = this.nextMethod_ = this.decoder_ = null;
  this.cursor_ = 0;
  this.nextValue_ = null;
  this.atEnd_ = !0;
  this.init_($opt_decoder$$, $opt_next$$, $opt_elements$$);
};
jspb.BinaryIterator.prototype.init_ = function($opt_decoder$$, $opt_next$$, $opt_elements$$) {
  $opt_decoder$$ && $opt_next$$ && (this.decoder_ = $opt_decoder$$, this.nextMethod_ = $opt_next$$);
  this.elements_ = $opt_elements$$ || null;
  this.cursor_ = 0;
  this.nextValue_ = null;
  this.atEnd_ = !this.decoder_ && !this.elements_;
  this.next();
};
jspb.BinaryIterator.instanceCache_ = [];
jspb.BinaryIterator.alloc = function($opt_decoder$$, $opt_next$$, $opt_elements$$) {
  if (jspb.BinaryIterator.instanceCache_.length) {
    var $iterator$$ = jspb.BinaryIterator.instanceCache_.pop();
    $iterator$$.init_($opt_decoder$$, $opt_next$$, $opt_elements$$);
    return $iterator$$;
  }
  return new jspb.BinaryIterator($opt_decoder$$, $opt_next$$, $opt_elements$$);
};
jspb.BinaryIterator.prototype.free = function() {
  this.clear();
  100 > jspb.BinaryIterator.instanceCache_.length && jspb.BinaryIterator.instanceCache_.push(this);
};
jspb.BinaryIterator.prototype.clear = function() {
  this.decoder_ && this.decoder_.free();
  this.elements_ = this.nextMethod_ = this.decoder_ = null;
  this.cursor_ = 0;
  this.nextValue_ = null;
  this.atEnd_ = !0;
};
jspb.BinaryIterator.prototype.get = function() {
  return this.nextValue_;
};
jspb.BinaryIterator.prototype.atEnd = function() {
  return this.atEnd_;
};
jspb.BinaryIterator.prototype.next = function() {
  var $lastValue$$ = this.nextValue_;
  this.decoder_ ? this.decoder_.atEnd() ? (this.nextValue_ = null, this.atEnd_ = !0) : this.nextValue_ = this.nextMethod_.call(this.decoder_) : this.elements_ && (this.cursor_ == this.elements_.length ? (this.nextValue_ = null, this.atEnd_ = !0) : this.nextValue_ = this.elements_[this.cursor_++]);
  return $lastValue$$;
};
jspb.BinaryDecoder = function($opt_bytes$$, $opt_start$$, $opt_length$$) {
  this.bytes_ = null;
  this.tempHigh_ = this.tempLow_ = this.cursor_ = this.end_ = this.start_ = 0;
  this.error_ = !1;
  $opt_bytes$$ && this.setBlock($opt_bytes$$, $opt_start$$, $opt_length$$);
};
jspb.BinaryDecoder.instanceCache_ = [];
jspb.BinaryDecoder.alloc = function($opt_bytes$$, $opt_start$$, $opt_length$$) {
  if (jspb.BinaryDecoder.instanceCache_.length) {
    var $newDecoder$$ = jspb.BinaryDecoder.instanceCache_.pop();
    $opt_bytes$$ && $newDecoder$$.setBlock($opt_bytes$$, $opt_start$$, $opt_length$$);
    return $newDecoder$$;
  }
  return new jspb.BinaryDecoder($opt_bytes$$, $opt_start$$, $opt_length$$);
};
jspb.BinaryDecoder.prototype.free = function() {
  this.clear();
  100 > jspb.BinaryDecoder.instanceCache_.length && jspb.BinaryDecoder.instanceCache_.push(this);
};
jspb.BinaryDecoder.prototype.clone = function() {
  return jspb.BinaryDecoder.alloc(this.bytes_, this.start_, this.end_ - this.start_);
};
jspb.BinaryDecoder.prototype.clear = function() {
  this.bytes_ = null;
  this.cursor_ = this.end_ = this.start_ = 0;
  this.error_ = !1;
};
jspb.BinaryDecoder.prototype.setBlock = function($data$$, $opt_start$$, $opt_length$$) {
  this.bytes_ = jspb.utils.byteSourceToUint8Array($data$$);
  this.start_ = goog.isDef($opt_start$$) ? $opt_start$$ : 0;
  this.end_ = goog.isDef($opt_length$$) ? this.start_ + $opt_length$$ : this.bytes_.length;
  this.cursor_ = this.start_;
};
jspb.BinaryDecoder.prototype.setEnd = function($end$$) {
  this.end_ = $end$$;
};
jspb.BinaryDecoder.prototype.reset = function() {
  this.cursor_ = this.start_;
};
jspb.BinaryDecoder.prototype.getCursor = function() {
  return this.cursor_;
};
jspb.BinaryDecoder.prototype.setCursor = function($cursor$$) {
  this.cursor_ = $cursor$$;
};
jspb.BinaryDecoder.prototype.advance = function($count$$) {
  this.cursor_ += $count$$;
  goog.asserts.assert(this.cursor_ <= this.end_);
};
jspb.BinaryDecoder.prototype.atEnd = function() {
  return this.cursor_ == this.end_;
};
jspb.BinaryDecoder.prototype.getError = function() {
  return this.error_ || 0 > this.cursor_ || this.cursor_ > this.end_;
};
jspb.BinaryDecoder.prototype.readSplitVarint64_ = function() {
  for (var $temp$$, $lowBits$$ = 0, $highBits$$ = 0, $i$$ = 0; 4 > $i$$; $i$$++) {
    if ($temp$$ = this.bytes_[this.cursor_++], $lowBits$$ |= ($temp$$ & 127) << 7 * $i$$, 128 > $temp$$) {
      this.tempLow_ = $lowBits$$ >>> 0;
      this.tempHigh_ = 0;
      return;
    }
  }
  $temp$$ = this.bytes_[this.cursor_++];
  $lowBits$$ |= ($temp$$ & 127) << 28;
  $highBits$$ |= ($temp$$ & 127) >> 4;
  if (128 > $temp$$) {
    this.tempLow_ = $lowBits$$ >>> 0, this.tempHigh_ = $highBits$$ >>> 0;
  } else {
    for ($i$$ = 0; 5 > $i$$; $i$$++) {
      if ($temp$$ = this.bytes_[this.cursor_++], $highBits$$ |= ($temp$$ & 127) << 7 * $i$$ + 3, 128 > $temp$$) {
        this.tempLow_ = $lowBits$$ >>> 0;
        this.tempHigh_ = $highBits$$ >>> 0;
        return;
      }
    }
    goog.asserts.fail("Failed to read varint, encoding is invalid.");
    this.error_ = !0;
  }
};
jspb.BinaryDecoder.prototype.skipVarint = function() {
  for (; this.bytes_[this.cursor_] & 128;) {
    this.cursor_++;
  }
  this.cursor_++;
};
jspb.BinaryDecoder.prototype.readUnsignedVarint32 = function() {
  var $bytes$$ = this.bytes_;
  var $temp$$ = $bytes$$[this.cursor_ + 0];
  var $x$$ = $temp$$ & 127;
  if (128 > $temp$$) {
    return this.cursor_ += 1, goog.asserts.assert(this.cursor_ <= this.end_), $x$$;
  }
  $temp$$ = $bytes$$[this.cursor_ + 1];
  $x$$ |= ($temp$$ & 127) << 7;
  if (128 > $temp$$) {
    return this.cursor_ += 2, goog.asserts.assert(this.cursor_ <= this.end_), $x$$;
  }
  $temp$$ = $bytes$$[this.cursor_ + 2];
  $x$$ |= ($temp$$ & 127) << 14;
  if (128 > $temp$$) {
    return this.cursor_ += 3, goog.asserts.assert(this.cursor_ <= this.end_), $x$$;
  }
  $temp$$ = $bytes$$[this.cursor_ + 3];
  $x$$ |= ($temp$$ & 127) << 21;
  if (128 > $temp$$) {
    return this.cursor_ += 4, goog.asserts.assert(this.cursor_ <= this.end_), $x$$;
  }
  $temp$$ = $bytes$$[this.cursor_ + 4];
  $x$$ |= ($temp$$ & 15) << 28;
  if (128 > $temp$$) {
    return this.cursor_ += 5, goog.asserts.assert(this.cursor_ <= this.end_), $x$$ >>> 0;
  }
  this.cursor_ += 5;
  128 <= $bytes$$[this.cursor_++] && 128 <= $bytes$$[this.cursor_++] && 128 <= $bytes$$[this.cursor_++] && 128 <= $bytes$$[this.cursor_++] && 128 <= $bytes$$[this.cursor_++] && goog.asserts.assert(!1);
  goog.asserts.assert(this.cursor_ <= this.end_);
  return $x$$;
};
jspb.BinaryDecoder.prototype.readSignedVarint32 = jspb.BinaryDecoder.prototype.readUnsignedVarint32;
jspb.BinaryDecoder.prototype.readUnsignedVarint64 = function() {
  this.readSplitVarint64_();
  return jspb.utils.joinUint64(this.tempLow_, this.tempHigh_);
};
jspb.BinaryDecoder.prototype.readSignedVarint64 = function() {
  this.readSplitVarint64_();
  return jspb.utils.joinInt64(this.tempLow_, this.tempHigh_);
};
jspb.BinaryDecoder.prototype.readUint32 = function() {
  var $a$$ = this.bytes_[this.cursor_ + 0], $b$$ = this.bytes_[this.cursor_ + 1], $c$$ = this.bytes_[this.cursor_ + 2], $d$$ = this.bytes_[this.cursor_ + 3];
  this.cursor_ += 4;
  goog.asserts.assert(this.cursor_ <= this.end_);
  return ($a$$ << 0 | $b$$ << 8 | $c$$ << 16 | $d$$ << 24) >>> 0;
};
jspb.BinaryDecoder.prototype.readUint64 = function() {
  var $bitsLow$$ = this.readUint32(), $bitsHigh$$ = this.readUint32();
  return jspb.utils.joinUint64($bitsLow$$, $bitsHigh$$);
};
jspb.BinaryDecoder.prototype.readInt32 = function() {
  var $a$$ = this.bytes_[this.cursor_ + 0], $b$$ = this.bytes_[this.cursor_ + 1], $c$$ = this.bytes_[this.cursor_ + 2], $d$$ = this.bytes_[this.cursor_ + 3];
  this.cursor_ += 4;
  goog.asserts.assert(this.cursor_ <= this.end_);
  return $a$$ << 0 | $b$$ << 8 | $c$$ << 16 | $d$$ << 24;
};
jspb.BinaryDecoder.prototype.readInt64 = function() {
  var $bitsLow$$ = this.readUint32(), $bitsHigh$$ = this.readUint32();
  return jspb.utils.joinInt64($bitsLow$$, $bitsHigh$$);
};
jspb.BinaryDecoder.prototype.readFloat = function() {
  var $bitsLow$$ = this.readUint32();
  return jspb.utils.joinFloat32($bitsLow$$, 0);
};
jspb.BinaryDecoder.prototype.readDouble = function() {
  var $bitsLow$$ = this.readUint32(), $bitsHigh$$ = this.readUint32();
  return jspb.utils.joinFloat64($bitsLow$$, $bitsHigh$$);
};
jspb.BinaryDecoder.prototype.readBool = function() {
  return !!this.bytes_[this.cursor_++];
};
jspb.BinaryDecoder.prototype.readEnum = function() {
  return this.readSignedVarint32();
};
jspb.BinaryDecoder.prototype.readString = function($end$jscomp$13_length$$) {
  var $bytes$$ = this.bytes_, $cursor$$ = this.cursor_;
  $end$jscomp$13_length$$ = $cursor$$ + $end$jscomp$13_length$$;
  for (var $codeUnits$$ = [], $result$$ = ""; $cursor$$ < $end$jscomp$13_length$$;) {
    var $c$jscomp$11_low$$ = $bytes$$[$cursor$$++];
    if (128 > $c$jscomp$11_low$$) {
      $codeUnits$$.push($c$jscomp$11_low$$);
    } else {
      if (192 > $c$jscomp$11_low$$) {
        continue;
      } else {
        if (224 > $c$jscomp$11_low$$) {
          var $c2$jscomp$1_codepoint$jscomp$1_high$$ = $bytes$$[$cursor$$++];
          $codeUnits$$.push(($c$jscomp$11_low$$ & 31) << 6 | $c2$jscomp$1_codepoint$jscomp$1_high$$ & 63);
        } else {
          if (240 > $c$jscomp$11_low$$) {
            $c2$jscomp$1_codepoint$jscomp$1_high$$ = $bytes$$[$cursor$$++];
            var $c3$$ = $bytes$$[$cursor$$++];
            $codeUnits$$.push(($c$jscomp$11_low$$ & 15) << 12 | ($c2$jscomp$1_codepoint$jscomp$1_high$$ & 63) << 6 | $c3$$ & 63);
          } else {
            if (248 > $c$jscomp$11_low$$) {
              $c2$jscomp$1_codepoint$jscomp$1_high$$ = $bytes$$[$cursor$$++];
              $c3$$ = $bytes$$[$cursor$$++];
              var $c4$$ = $bytes$$[$cursor$$++];
              $c2$jscomp$1_codepoint$jscomp$1_high$$ = ($c$jscomp$11_low$$ & 7) << 18 | ($c2$jscomp$1_codepoint$jscomp$1_high$$ & 63) << 12 | ($c3$$ & 63) << 6 | $c4$$ & 63;
              $c2$jscomp$1_codepoint$jscomp$1_high$$ -= 65536;
              $c$jscomp$11_low$$ = ($c2$jscomp$1_codepoint$jscomp$1_high$$ & 1023) + 56320;
              $c2$jscomp$1_codepoint$jscomp$1_high$$ = ($c2$jscomp$1_codepoint$jscomp$1_high$$ >> 10 & 1023) + 55296;
              $codeUnits$$.push($c2$jscomp$1_codepoint$jscomp$1_high$$, $c$jscomp$11_low$$);
            }
          }
        }
      }
    }
    8192 <= $codeUnits$$.length && ($result$$ += String.fromCharCode.apply(null, $codeUnits$$), $codeUnits$$.length = 0);
  }
  $result$$ += goog.crypt.byteArrayToString($codeUnits$$);
  this.cursor_ = $cursor$$;
  return $result$$;
};
jspb.BinaryDecoder.prototype.readBytes = function($length$$) {
  if (0 > $length$$ || this.cursor_ + $length$$ > this.bytes_.length) {
    return this.error_ = !0, goog.asserts.fail("Invalid byte length!"), new Uint8Array(0);
  }
  var $result$$ = this.bytes_.subarray(this.cursor_, this.cursor_ + $length$$);
  this.cursor_ += $length$$;
  goog.asserts.assert(this.cursor_ <= this.end_);
  return $result$$;
};
jspb.BinaryReader = function($opt_bytes$$, $opt_start$$, $opt_length$$) {
  this.decoder_ = jspb.BinaryDecoder.alloc($opt_bytes$$, $opt_start$$, $opt_length$$);
  this.fieldCursor_ = this.decoder_.getCursor();
  this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER;
  this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
  this.error_ = !1;
};
jspb.BinaryReader.instanceCache_ = [];
jspb.BinaryReader.alloc = function($opt_bytes$$, $opt_start$$, $opt_length$$) {
  if (jspb.BinaryReader.instanceCache_.length) {
    var $newReader$$ = jspb.BinaryReader.instanceCache_.pop();
    $opt_bytes$$ && $newReader$$.decoder_.setBlock($opt_bytes$$, $opt_start$$, $opt_length$$);
    return $newReader$$;
  }
  return new jspb.BinaryReader($opt_bytes$$, $opt_start$$, $opt_length$$);
};
jspb.BinaryReader.prototype.alloc = jspb.BinaryReader.alloc;
jspb.BinaryReader.prototype.free = function() {
  this.decoder_.clear();
  this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER;
  this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
  this.error_ = !1;
  100 > jspb.BinaryReader.instanceCache_.length && jspb.BinaryReader.instanceCache_.push(this);
};
jspb.BinaryReader.prototype.getCursor = function() {
  return this.decoder_.getCursor();
};
jspb.BinaryReader.prototype.isEndGroup = function() {
  return this.nextWireType_ == jspb.BinaryConstants.WireType.END_GROUP;
};
jspb.BinaryReader.prototype.getError = function() {
  return this.error_ || this.decoder_.getError();
};
jspb.BinaryReader.prototype.setBlock = function($bytes$$, $start$$, $length$$) {
  this.decoder_.setBlock($bytes$$, $start$$, $length$$);
  this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER;
  this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
};
jspb.BinaryReader.prototype.reset = function() {
  this.decoder_.reset();
  this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER;
  this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
};
jspb.BinaryReader.prototype.advance = function($count$$) {
  this.decoder_.advance($count$$);
};
jspb.BinaryReader.prototype.nextField = function() {
  if (this.decoder_.atEnd()) {
    return !1;
  }
  if (this.getError()) {
    return goog.asserts.fail("Decoder hit an error"), !1;
  }
  this.fieldCursor_ = this.decoder_.getCursor();
  var $header$$ = this.decoder_.readUnsignedVarint32(), $nextField$$ = $header$$ >>> 3;
  $header$$ &= 7;
  if ($header$$ != jspb.BinaryConstants.WireType.VARINT && $header$$ != jspb.BinaryConstants.WireType.FIXED32 && $header$$ != jspb.BinaryConstants.WireType.FIXED64 && $header$$ != jspb.BinaryConstants.WireType.DELIMITED && $header$$ != jspb.BinaryConstants.WireType.START_GROUP && $header$$ != jspb.BinaryConstants.WireType.END_GROUP) {
    return goog.asserts.fail("Invalid wire type: %s (at position %s)", $header$$, this.fieldCursor_), this.error_ = !0, !1;
  }
  this.nextField_ = $nextField$$;
  this.nextWireType_ = $header$$;
  return !0;
};
jspb.BinaryReader.prototype.skipVarintField = function() {
  this.nextWireType_ != jspb.BinaryConstants.WireType.VARINT ? (goog.asserts.fail("Invalid wire type for skipVarintField"), this.skipField()) : this.decoder_.skipVarint();
};
jspb.BinaryReader.prototype.skipDelimitedField = function() {
  if (this.nextWireType_ != jspb.BinaryConstants.WireType.DELIMITED) {
    goog.asserts.fail("Invalid wire type for skipDelimitedField"), this.skipField();
  } else {
    var $length$$ = this.decoder_.readUnsignedVarint32();
    this.decoder_.advance($length$$);
  }
};
jspb.BinaryReader.prototype.skipFixed32Field = function() {
  this.nextWireType_ != jspb.BinaryConstants.WireType.FIXED32 ? (goog.asserts.fail("Invalid wire type for skipFixed32Field"), this.skipField()) : this.decoder_.advance(4);
};
jspb.BinaryReader.prototype.skipFixed64Field = function() {
  this.nextWireType_ != jspb.BinaryConstants.WireType.FIXED64 ? (goog.asserts.fail("Invalid wire type for skipFixed64Field"), this.skipField()) : this.decoder_.advance(8);
};
jspb.BinaryReader.prototype.skipGroup = function() {
  var $previousField$$ = this.nextField_;
  do {
    if (!this.nextField()) {
      goog.asserts.fail("Unmatched start-group tag: stream EOF");
      this.error_ = !0;
      break;
    }
    if (this.nextWireType_ == jspb.BinaryConstants.WireType.END_GROUP) {
      this.nextField_ != $previousField$$ && (goog.asserts.fail("Unmatched end-group tag"), this.error_ = !0);
      break;
    }
    this.skipField();
  } while (1);
};
jspb.BinaryReader.prototype.skipField = function() {
  switch(this.nextWireType_) {
    case jspb.BinaryConstants.WireType.VARINT:
      this.skipVarintField();
      break;
    case jspb.BinaryConstants.WireType.FIXED64:
      this.skipFixed64Field();
      break;
    case jspb.BinaryConstants.WireType.DELIMITED:
      this.skipDelimitedField();
      break;
    case jspb.BinaryConstants.WireType.FIXED32:
      this.skipFixed32Field();
      break;
    case jspb.BinaryConstants.WireType.START_GROUP:
      this.skipGroup();
      break;
    default:
      goog.asserts.fail("Invalid wire encoding for field.");
  }
};
jspb.BinaryReader.prototype.readMessage = function($message$$, $reader$$) {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
  var $oldEnd$$ = this.decoder_.end_, $length$$ = this.decoder_.readUnsignedVarint32();
  $length$$ = this.decoder_.getCursor() + $length$$;
  this.decoder_.setEnd($length$$);
  $reader$$($message$$, this);
  this.decoder_.setCursor($length$$);
  this.decoder_.setEnd($oldEnd$$);
};
jspb.BinaryReader.prototype.readInt32 = function() {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
  return this.decoder_.readSignedVarint32();
};
jspb.BinaryReader.prototype.readInt64 = function() {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
  return this.decoder_.readSignedVarint64();
};
jspb.BinaryReader.prototype.readUint32 = function() {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
  return this.decoder_.readUnsignedVarint32();
};
jspb.BinaryReader.prototype.readUint64 = function() {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
  return this.decoder_.readUnsignedVarint64();
};
jspb.BinaryReader.prototype.readFloat = function() {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32);
  return this.decoder_.readFloat();
};
jspb.BinaryReader.prototype.readDouble = function() {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
  return this.decoder_.readDouble();
};
jspb.BinaryReader.prototype.readBool = function() {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
  return !!this.decoder_.readUnsignedVarint32();
};
jspb.BinaryReader.prototype.readEnum = function() {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
  return this.decoder_.readSignedVarint64();
};
jspb.BinaryReader.prototype.readString = function() {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
  var $length$$ = this.decoder_.readUnsignedVarint32();
  return this.decoder_.readString($length$$);
};
jspb.BinaryReader.prototype.readBytes = function() {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
  var $length$$ = this.decoder_.readUnsignedVarint32();
  return this.decoder_.readBytes($length$$);
};
jspb.BinaryReader.prototype.readPackedField_ = function($decodeMethod$$) {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
  var $end$jscomp$15_length$$ = this.decoder_.readUnsignedVarint32();
  $end$jscomp$15_length$$ = this.decoder_.getCursor() + $end$jscomp$15_length$$;
  for (var $result$$ = []; this.decoder_.getCursor() < $end$jscomp$15_length$$;) {
    $result$$.push($decodeMethod$$.call(this.decoder_));
  }
  return $result$$;
};
jspb.BinaryReader.prototype.readPackedFloat = function() {
  return this.readPackedField_(this.decoder_.readFloat);
};
jspb.arith = {};
jspb.arith.UInt64 = function($lo$$, $hi$$) {
  this.lo = $lo$$;
  this.hi = $hi$$;
};
jspb.arith.UInt64.prototype.cmp = function($other$$) {
  return this.hi < $other$$.hi || this.hi == $other$$.hi && this.lo < $other$$.lo ? -1 : this.hi == $other$$.hi && this.lo == $other$$.lo ? 0 : 1;
};
jspb.arith.UInt64.prototype.rightShift = function() {
  var $hi$$ = this.hi >>> 1, $lo$$ = this.lo >>> 1 | (this.hi & 1) << 31;
  return new jspb.arith.UInt64($lo$$ >>> 0, $hi$$ >>> 0);
};
jspb.arith.UInt64.prototype.leftShift = function() {
  var $lo$$ = this.lo << 1, $hi$$ = this.hi << 1 | this.lo >>> 31;
  return new jspb.arith.UInt64($lo$$ >>> 0, $hi$$ >>> 0);
};
jspb.arith.UInt64.prototype.msb = function() {
  return !!(this.hi & 2147483648);
};
jspb.arith.UInt64.prototype.zero = function() {
  return 0 == this.lo && 0 == this.hi;
};
jspb.arith.UInt64.prototype.add = function($hi$jscomp$4_other$$) {
  var $lo$$ = (this.lo + $hi$jscomp$4_other$$.lo & 4294967295) >>> 0;
  $hi$jscomp$4_other$$ = ((this.hi + $hi$jscomp$4_other$$.hi & 4294967295) >>> 0) + (4294967296 <= this.lo + $hi$jscomp$4_other$$.lo ? 1 : 0);
  return new jspb.arith.UInt64($lo$$ >>> 0, $hi$jscomp$4_other$$ >>> 0);
};
jspb.arith.UInt64.prototype.sub = function($hi$jscomp$5_other$$) {
  var $lo$$ = (this.lo - $hi$jscomp$5_other$$.lo & 4294967295) >>> 0;
  $hi$jscomp$5_other$$ = ((this.hi - $hi$jscomp$5_other$$.hi & 4294967295) >>> 0) - (0 > this.lo - $hi$jscomp$5_other$$.lo ? 1 : 0);
  return new jspb.arith.UInt64($lo$$ >>> 0, $hi$jscomp$5_other$$ >>> 0);
};
jspb.arith.UInt64.mul32x32 = function($a$$, $b$$) {
  var $aLow_productHigh$$ = $a$$ & 65535;
  $a$$ >>>= 16;
  var $bLow$$ = $b$$ & 65535, $bHigh$$ = $b$$ >>> 16;
  $b$$ = $aLow_productHigh$$ * $bLow$$ + 65536 * ($aLow_productHigh$$ * $bHigh$$ & 65535) + 65536 * ($a$$ * $bLow$$ & 65535);
  for ($aLow_productHigh$$ = $a$$ * $bHigh$$ + ($aLow_productHigh$$ * $bHigh$$ >>> 16) + ($a$$ * $bLow$$ >>> 16); 4294967296 <= $b$$;) {
    $b$$ -= 4294967296, $aLow_productHigh$$ += 1;
  }
  return new jspb.arith.UInt64($b$$ >>> 0, $aLow_productHigh$$ >>> 0);
};
jspb.arith.UInt64.prototype.mul = function($a$jscomp$19_hi$$) {
  var $lo$$ = jspb.arith.UInt64.mul32x32(this.lo, $a$jscomp$19_hi$$);
  $a$jscomp$19_hi$$ = jspb.arith.UInt64.mul32x32(this.hi, $a$jscomp$19_hi$$);
  $a$jscomp$19_hi$$.hi = $a$jscomp$19_hi$$.lo;
  $a$jscomp$19_hi$$.lo = 0;
  return $lo$$.add($a$jscomp$19_hi$$);
};
jspb.arith.UInt64.prototype.div = function($_divisor$$) {
  if (0 == $_divisor$$) {
    return [];
  }
  for (var $quotient$$ = new jspb.arith.UInt64(0, 0), $remainder$$ = new jspb.arith.UInt64(this.lo, this.hi), $divisor$$ = new jspb.arith.UInt64($_divisor$$, 0), $unit$$ = new jspb.arith.UInt64(1, 0); !$divisor$$.msb();) {
    $divisor$$ = $divisor$$.leftShift(), $unit$$ = $unit$$.leftShift();
  }
  for (; !$unit$$.zero();) {
    0 >= $divisor$$.cmp($remainder$$) && ($quotient$$ = $quotient$$.add($unit$$), $remainder$$ = $remainder$$.sub($divisor$$)), $divisor$$ = $divisor$$.rightShift(), $unit$$ = $unit$$.rightShift();
  }
  return [$quotient$$, $remainder$$];
};
jspb.arith.UInt64.prototype.toString = function() {
  for (var $result$$ = "", $num$jscomp$7_quotient$$ = this; !$num$jscomp$7_quotient$$.zero();) {
    var $divResult_remainder$$ = $num$jscomp$7_quotient$$.div(10);
    $num$jscomp$7_quotient$$ = $divResult_remainder$$[0];
    $divResult_remainder$$ = $divResult_remainder$$[1];
    $result$$ = $divResult_remainder$$.lo + $result$$;
  }
  "" == $result$$ && ($result$$ = "0");
  return $result$$;
};
jspb.arith.UInt64.fromString = function($s$$) {
  for (var $result$$ = new jspb.arith.UInt64(0, 0), $digit64$$ = new jspb.arith.UInt64(0, 0), $i$$ = 0; $i$$ < $s$$.length; $i$$++) {
    if ("0" > $s$$[$i$$] || "9" < $s$$[$i$$]) {
      return null;
    }
    var $digit$$ = parseInt($s$$[$i$$], 10);
    $digit64$$.lo = $digit$$;
    $result$$ = $result$$.mul(10).add($digit64$$);
  }
  return $result$$;
};
jspb.arith.UInt64.prototype.clone = function() {
  return new jspb.arith.UInt64(this.lo, this.hi);
};
jspb.arith.Int64 = function($lo$$, $hi$$) {
  this.lo = $lo$$;
  this.hi = $hi$$;
};
jspb.arith.Int64.prototype.add = function($hi$jscomp$8_other$$) {
  var $lo$$ = (this.lo + $hi$jscomp$8_other$$.lo & 4294967295) >>> 0;
  $hi$jscomp$8_other$$ = ((this.hi + $hi$jscomp$8_other$$.hi & 4294967295) >>> 0) + (4294967296 <= this.lo + $hi$jscomp$8_other$$.lo ? 1 : 0);
  return new jspb.arith.Int64($lo$$ >>> 0, $hi$jscomp$8_other$$ >>> 0);
};
jspb.arith.Int64.prototype.sub = function($hi$jscomp$9_other$$) {
  var $lo$$ = (this.lo - $hi$jscomp$9_other$$.lo & 4294967295) >>> 0;
  $hi$jscomp$9_other$$ = ((this.hi - $hi$jscomp$9_other$$.hi & 4294967295) >>> 0) - (0 > this.lo - $hi$jscomp$9_other$$.lo ? 1 : 0);
  return new jspb.arith.Int64($lo$$ >>> 0, $hi$jscomp$9_other$$ >>> 0);
};
jspb.arith.Int64.prototype.clone = function() {
  return new jspb.arith.Int64(this.lo, this.hi);
};
jspb.arith.Int64.prototype.toString = function() {
  var $sign$$ = 0 != (this.hi & 2147483648), $num$$ = new jspb.arith.UInt64(this.lo, this.hi);
  $sign$$ && ($num$$ = (new jspb.arith.UInt64(0, 0)).sub($num$$));
  return ($sign$$ ? "-" : "") + $num$$.toString();
};
jspb.arith.Int64.fromString = function($num$jscomp$9_s$$) {
  var $hasNegative$$ = 0 < $num$jscomp$9_s$$.length && "-" == $num$jscomp$9_s$$[0];
  $hasNegative$$ && ($num$jscomp$9_s$$ = $num$jscomp$9_s$$.substring(1));
  $num$jscomp$9_s$$ = jspb.arith.UInt64.fromString($num$jscomp$9_s$$);
  if (null === $num$jscomp$9_s$$) {
    return null;
  }
  $hasNegative$$ && ($num$jscomp$9_s$$ = (new jspb.arith.UInt64(0, 0)).sub($num$jscomp$9_s$$));
  return new jspb.arith.Int64($num$jscomp$9_s$$.lo, $num$jscomp$9_s$$.hi);
};
jspb.BinaryEncoder = function() {
  this.buffer_ = [];
};
jspb.BinaryEncoder.prototype.length = function() {
  return this.buffer_.length;
};
jspb.BinaryEncoder.prototype.end = function() {
  var $buffer$$ = this.buffer_;
  this.buffer_ = [];
  return $buffer$$;
};
jspb.BinaryEncoder.prototype.writeSplitVarint64 = function($lowBits$$, $highBits$$) {
  goog.asserts.assert($lowBits$$ == Math.floor($lowBits$$));
  goog.asserts.assert($highBits$$ == Math.floor($highBits$$));
  goog.asserts.assert(0 <= $lowBits$$ && $lowBits$$ < jspb.BinaryConstants.TWO_TO_32);
  for (goog.asserts.assert(0 <= $highBits$$ && $highBits$$ < jspb.BinaryConstants.TWO_TO_32); 0 < $highBits$$ || 127 < $lowBits$$;) {
    this.buffer_.push($lowBits$$ & 127 | 128), $lowBits$$ = ($lowBits$$ >>> 7 | $highBits$$ << 25) >>> 0, $highBits$$ >>>= 7;
  }
  this.buffer_.push($lowBits$$);
};
jspb.BinaryEncoder.prototype.writeSplitFixed64 = function($lowBits$$, $highBits$$) {
  goog.asserts.assert($lowBits$$ == Math.floor($lowBits$$));
  goog.asserts.assert($highBits$$ == Math.floor($highBits$$));
  goog.asserts.assert(0 <= $lowBits$$ && $lowBits$$ < jspb.BinaryConstants.TWO_TO_32);
  goog.asserts.assert(0 <= $highBits$$ && $highBits$$ < jspb.BinaryConstants.TWO_TO_32);
  this.writeUint32($lowBits$$);
  this.writeUint32($highBits$$);
};
jspb.BinaryEncoder.prototype.writeUnsignedVarint32 = function($value$$) {
  goog.asserts.assert($value$$ == Math.floor($value$$));
  for (goog.asserts.assert(0 <= $value$$ && $value$$ < jspb.BinaryConstants.TWO_TO_32); 127 < $value$$;) {
    this.buffer_.push($value$$ & 127 | 128), $value$$ >>>= 7;
  }
  this.buffer_.push($value$$);
};
jspb.BinaryEncoder.prototype.writeSignedVarint32 = function($value$$) {
  goog.asserts.assert($value$$ == Math.floor($value$$));
  goog.asserts.assert($value$$ >= -jspb.BinaryConstants.TWO_TO_31 && $value$$ < jspb.BinaryConstants.TWO_TO_31);
  if (0 <= $value$$) {
    this.writeUnsignedVarint32($value$$);
  } else {
    for (var $i$$ = 0; 9 > $i$$; $i$$++) {
      this.buffer_.push($value$$ & 127 | 128), $value$$ >>= 7;
    }
    this.buffer_.push(1);
  }
};
jspb.BinaryEncoder.prototype.writeUnsignedVarint64 = function($value$$) {
  goog.asserts.assert($value$$ == Math.floor($value$$));
  goog.asserts.assert(0 <= $value$$ && $value$$ < jspb.BinaryConstants.TWO_TO_64);
  jspb.utils.splitInt64($value$$);
  this.writeSplitVarint64(jspb.utils.split64Low, jspb.utils.split64High);
};
jspb.BinaryEncoder.prototype.writeSignedVarint64 = function($value$$) {
  goog.asserts.assert($value$$ == Math.floor($value$$));
  goog.asserts.assert($value$$ >= -jspb.BinaryConstants.TWO_TO_63 && $value$$ < jspb.BinaryConstants.TWO_TO_63);
  jspb.utils.splitInt64($value$$);
  this.writeSplitVarint64(jspb.utils.split64Low, jspb.utils.split64High);
};
jspb.BinaryEncoder.prototype.writeUint32 = function($value$$) {
  goog.asserts.assert($value$$ == Math.floor($value$$));
  goog.asserts.assert(0 <= $value$$ && $value$$ < jspb.BinaryConstants.TWO_TO_32);
  this.buffer_.push($value$$ >>> 0 & 255);
  this.buffer_.push($value$$ >>> 8 & 255);
  this.buffer_.push($value$$ >>> 16 & 255);
  this.buffer_.push($value$$ >>> 24 & 255);
};
jspb.BinaryEncoder.prototype.writeUint64 = function($value$$) {
  goog.asserts.assert($value$$ == Math.floor($value$$));
  goog.asserts.assert(0 <= $value$$ && $value$$ < jspb.BinaryConstants.TWO_TO_64);
  jspb.utils.splitUint64($value$$);
  this.writeUint32(jspb.utils.split64Low);
  this.writeUint32(jspb.utils.split64High);
};
jspb.BinaryEncoder.prototype.writeInt32 = function($value$$) {
  goog.asserts.assert($value$$ == Math.floor($value$$));
  goog.asserts.assert($value$$ >= -jspb.BinaryConstants.TWO_TO_31 && $value$$ < jspb.BinaryConstants.TWO_TO_31);
  this.buffer_.push($value$$ >>> 0 & 255);
  this.buffer_.push($value$$ >>> 8 & 255);
  this.buffer_.push($value$$ >>> 16 & 255);
  this.buffer_.push($value$$ >>> 24 & 255);
};
jspb.BinaryEncoder.prototype.writeInt64 = function($value$$) {
  goog.asserts.assert($value$$ == Math.floor($value$$));
  goog.asserts.assert($value$$ >= -jspb.BinaryConstants.TWO_TO_63 && $value$$ < jspb.BinaryConstants.TWO_TO_63);
  jspb.utils.splitInt64($value$$);
  this.writeSplitFixed64(jspb.utils.split64Low, jspb.utils.split64High);
};
jspb.BinaryEncoder.prototype.writeFloat = function($value$$) {
  goog.asserts.assert($value$$ >= -jspb.BinaryConstants.FLOAT32_MAX && $value$$ <= jspb.BinaryConstants.FLOAT32_MAX);
  jspb.utils.splitFloat32($value$$);
  this.writeUint32(jspb.utils.split64Low);
};
jspb.BinaryEncoder.prototype.writeDouble = function($value$$) {
  goog.asserts.assert($value$$ >= -jspb.BinaryConstants.FLOAT64_MAX && $value$$ <= jspb.BinaryConstants.FLOAT64_MAX);
  jspb.utils.splitFloat64($value$$);
  this.writeUint32(jspb.utils.split64Low);
  this.writeUint32(jspb.utils.split64High);
};
jspb.BinaryEncoder.prototype.writeBool = function($value$$) {
  goog.asserts.assert(goog.isBoolean($value$$) || goog.isNumber($value$$));
  this.buffer_.push($value$$ ? 1 : 0);
};
jspb.BinaryEncoder.prototype.writeEnum = function($value$$) {
  goog.asserts.assert($value$$ == Math.floor($value$$));
  goog.asserts.assert($value$$ >= -jspb.BinaryConstants.TWO_TO_31 && $value$$ < jspb.BinaryConstants.TWO_TO_31);
  this.writeSignedVarint32($value$$);
};
jspb.BinaryEncoder.prototype.writeBytes = function($bytes$$) {
  this.buffer_.push.apply(this.buffer_, $bytes$$);
};
jspb.BinaryEncoder.prototype.writeString = function($length$jscomp$32_value$$) {
  for (var $oldLength$$ = this.buffer_.length, $i$$ = 0; $i$$ < $length$jscomp$32_value$$.length; $i$$++) {
    var $c$$ = $length$jscomp$32_value$$.charCodeAt($i$$);
    if (128 > $c$$) {
      this.buffer_.push($c$$);
    } else {
      if (2048 > $c$$) {
        this.buffer_.push($c$$ >> 6 | 192), this.buffer_.push($c$$ & 63 | 128);
      } else {
        if (65536 > $c$$) {
          if (55296 <= $c$$ && 56319 >= $c$$ && $i$$ + 1 < $length$jscomp$32_value$$.length) {
            var $second$$ = $length$jscomp$32_value$$.charCodeAt($i$$ + 1);
            56320 <= $second$$ && 57343 >= $second$$ && ($c$$ = 1024 * ($c$$ - 55296) + $second$$ - 56320 + 65536, this.buffer_.push($c$$ >> 18 | 240), this.buffer_.push($c$$ >> 12 & 63 | 128), this.buffer_.push($c$$ >> 6 & 63 | 128), this.buffer_.push($c$$ & 63 | 128), $i$$++);
          } else {
            this.buffer_.push($c$$ >> 12 | 224), this.buffer_.push($c$$ >> 6 & 63 | 128), this.buffer_.push($c$$ & 63 | 128);
          }
        }
      }
    }
  }
  return $length$jscomp$32_value$$ = this.buffer_.length - $oldLength$$;
};
jspb.BinaryWriter = function() {
  this.blocks_ = [];
  this.totalLength_ = 0;
  this.encoder_ = new jspb.BinaryEncoder;
};
jspb.BinaryWriter.prototype.appendUint8Array_ = function($arr$$) {
  var $temp$$ = this.encoder_.end();
  this.blocks_.push($temp$$);
  this.blocks_.push($arr$$);
  this.totalLength_ += $temp$$.length + $arr$$.length;
};
jspb.BinaryWriter.prototype.beginDelimited_ = function($bookmark_field$$) {
  this.writeFieldHeader_($bookmark_field$$, jspb.BinaryConstants.WireType.DELIMITED);
  $bookmark_field$$ = this.encoder_.end();
  this.blocks_.push($bookmark_field$$);
  this.totalLength_ += $bookmark_field$$.length;
  $bookmark_field$$.push(this.totalLength_);
  return $bookmark_field$$;
};
jspb.BinaryWriter.prototype.endDelimited_ = function($bookmark$$) {
  var $messageLength_oldLength$$ = $bookmark$$.pop();
  $messageLength_oldLength$$ = this.totalLength_ + this.encoder_.length() - $messageLength_oldLength$$;
  for (goog.asserts.assert(0 <= $messageLength_oldLength$$); 127 < $messageLength_oldLength$$;) {
    $bookmark$$.push($messageLength_oldLength$$ & 127 | 128), $messageLength_oldLength$$ >>>= 7, this.totalLength_++;
  }
  $bookmark$$.push($messageLength_oldLength$$);
  this.totalLength_++;
};
jspb.BinaryWriter.prototype.reset = function() {
  this.blocks_ = [];
  this.encoder_.end();
  this.totalLength_ = 0;
};
jspb.BinaryWriter.prototype.writeFieldHeader_ = function($field$jscomp$8_x$$, $wireType$$) {
  goog.asserts.assert(1 <= $field$jscomp$8_x$$ && $field$jscomp$8_x$$ == Math.floor($field$jscomp$8_x$$));
  $field$jscomp$8_x$$ = 8 * $field$jscomp$8_x$$ + $wireType$$;
  this.encoder_.writeUnsignedVarint32($field$jscomp$8_x$$);
};
jspb.BinaryWriter.prototype.writeUnsignedVarint32_ = function($field$$, $value$$) {
  null != $value$$ && (this.writeFieldHeader_($field$$, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeUnsignedVarint32($value$$));
};
jspb.BinaryWriter.prototype.writeSignedVarint32_ = function($field$$, $value$$) {
  null != $value$$ && (this.writeFieldHeader_($field$$, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeSignedVarint32($value$$));
};
jspb.BinaryWriter.prototype.writeUnsignedVarint64_ = function($field$$, $value$$) {
  null != $value$$ && (this.writeFieldHeader_($field$$, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeUnsignedVarint64($value$$));
};
jspb.BinaryWriter.prototype.writeSignedVarint64_ = function($field$$, $value$$) {
  null != $value$$ && (this.writeFieldHeader_($field$$, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeSignedVarint64($value$$));
};
jspb.BinaryWriter.prototype.writeInt32 = function($field$$, $value$$) {
  null != $value$$ && (goog.asserts.assert($value$$ >= -jspb.BinaryConstants.TWO_TO_31 && $value$$ < jspb.BinaryConstants.TWO_TO_31), this.writeSignedVarint32_($field$$, $value$$));
};
jspb.BinaryWriter.prototype.writeInt64 = function($field$$, $value$$) {
  null != $value$$ && (goog.asserts.assert($value$$ >= -jspb.BinaryConstants.TWO_TO_63 && $value$$ < jspb.BinaryConstants.TWO_TO_63), this.writeSignedVarint64_($field$$, $value$$));
};
jspb.BinaryWriter.prototype.writeUint32 = function($field$$, $value$$) {
  null != $value$$ && (goog.asserts.assert(0 <= $value$$ && $value$$ < jspb.BinaryConstants.TWO_TO_32), this.writeUnsignedVarint32_($field$$, $value$$));
};
jspb.BinaryWriter.prototype.writeUint64 = function($field$$, $value$$) {
  null != $value$$ && (goog.asserts.assert(0 <= $value$$ && $value$$ < jspb.BinaryConstants.TWO_TO_64), this.writeUnsignedVarint64_($field$$, $value$$));
};
jspb.BinaryWriter.prototype.writeFloat = function($field$$, $value$$) {
  null != $value$$ && (this.writeFieldHeader_($field$$, jspb.BinaryConstants.WireType.FIXED32), this.encoder_.writeFloat($value$$));
};
jspb.BinaryWriter.prototype.writeDouble = function($field$$, $value$$) {
  null != $value$$ && (this.writeFieldHeader_($field$$, jspb.BinaryConstants.WireType.FIXED64), this.encoder_.writeDouble($value$$));
};
jspb.BinaryWriter.prototype.writeBool = function($field$$, $value$$) {
  null != $value$$ && (goog.asserts.assert(goog.isBoolean($value$$) || goog.isNumber($value$$)), this.writeFieldHeader_($field$$, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeBool($value$$));
};
jspb.BinaryWriter.prototype.writeEnum = function($field$$, $value$$) {
  null != $value$$ && (goog.asserts.assert($value$$ >= -jspb.BinaryConstants.TWO_TO_31 && $value$$ < jspb.BinaryConstants.TWO_TO_31), this.writeFieldHeader_($field$$, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeSignedVarint32($value$$));
};
jspb.BinaryWriter.prototype.writeString = function($bookmark$jscomp$2_field$$, $value$$) {
  null != $value$$ && ($bookmark$jscomp$2_field$$ = this.beginDelimited_($bookmark$jscomp$2_field$$), this.encoder_.writeString($value$$), this.endDelimited_($bookmark$jscomp$2_field$$));
};
jspb.BinaryWriter.prototype.writeBytes = function($field$$, $bytes$jscomp$10_value$$) {
  null != $bytes$jscomp$10_value$$ && ($bytes$jscomp$10_value$$ = jspb.utils.byteSourceToUint8Array($bytes$jscomp$10_value$$), this.writeFieldHeader_($field$$, jspb.BinaryConstants.WireType.DELIMITED), this.encoder_.writeUnsignedVarint32($bytes$jscomp$10_value$$.length), this.appendUint8Array_($bytes$jscomp$10_value$$));
};
jspb.BinaryWriter.prototype.writeMessage = function($bookmark$jscomp$3_field$$, $value$$, $writerCallback$$) {
  null != $value$$ && ($bookmark$jscomp$3_field$$ = this.beginDelimited_($bookmark$jscomp$3_field$$), $writerCallback$$($value$$, this), this.endDelimited_($bookmark$jscomp$3_field$$));
};
jspb.BinaryWriter.prototype.writeRepeatedMessage = function($field$$, $value$$, $writerCallback$$) {
  if (null != $value$$) {
    for (var $i$$ = 0; $i$$ < $value$$.length; $i$$++) {
      var $bookmark$$ = this.beginDelimited_($field$$);
      $writerCallback$$($value$$[$i$$], this);
      this.endDelimited_($bookmark$$);
    }
  }
};
jspb.BinaryWriter.prototype.writePackedFloat = function($field$jscomp$88_i$$, $value$$) {
  if (null != $value$$ && $value$$.length) {
    for (this.writeFieldHeader_($field$jscomp$88_i$$, jspb.BinaryConstants.WireType.DELIMITED), this.encoder_.writeUnsignedVarint32(4 * $value$$.length), $field$jscomp$88_i$$ = 0; $field$jscomp$88_i$$ < $value$$.length; $field$jscomp$88_i$$++) {
      this.encoder_.writeFloat($value$$[$field$jscomp$88_i$$]);
    }
  }
};
jspb.Map = function($arr$$, $opt_valueCtor$$) {
  this.arr_ = $arr$$;
  this.valueCtor_ = $opt_valueCtor$$;
  this.map_ = {};
  this.arrClean = !0;
  0 < this.arr_.length && this.loadFromArray_();
};
jspb.Map.prototype.loadFromArray_ = function() {
  for (var $i$$ = 0; $i$$ < this.arr_.length; $i$$++) {
    var $record_value$$ = this.arr_[$i$$], $key$$ = $record_value$$[0];
    $record_value$$ = $record_value$$[1];
    this.map_[$key$$.toString()] = new jspb.Map.Entry_($key$$, $record_value$$);
  }
  this.arrClean = !0;
};
jspb.Map.prototype.toArray = function() {
  if (this.arrClean) {
    if (this.valueCtor_) {
      var $m$$ = this.map_, $i$jscomp$141_p$$;
      for ($i$jscomp$141_p$$ in $m$$) {
        if (Object.prototype.hasOwnProperty.call($m$$, $i$jscomp$141_p$$)) {
          var $valueWrapper$$ = $m$$[$i$jscomp$141_p$$].valueWrapper;
          $valueWrapper$$ && $valueWrapper$$.toArray();
        }
      }
    }
  } else {
    this.arr_.length = 0;
    $m$$ = this.stringKeys_();
    $m$$.sort();
    for ($i$jscomp$141_p$$ = 0; $i$jscomp$141_p$$ < $m$$.length; $i$jscomp$141_p$$++) {
      var $entry$$ = this.map_[$m$$[$i$jscomp$141_p$$]];
      ($valueWrapper$$ = $entry$$.valueWrapper) && $valueWrapper$$.toArray();
      this.arr_.push([$entry$$.key, $entry$$.value]);
    }
    this.arrClean = !0;
  }
  return this.arr_;
};
jspb.Map.prototype.toObject = function($includeInstance$$, $valueToObject$$) {
  for (var $rawArray$$ = this.toArray(), $entries$$ = [], $i$$ = 0; $i$$ < $rawArray$$.length; $i$$++) {
    var $entry$$ = this.map_[$rawArray$$[$i$$][0].toString()];
    this.wrapEntry_($entry$$);
    var $valueWrapper$$ = $entry$$.valueWrapper;
    $valueWrapper$$ ? (goog.asserts.assert($valueToObject$$), $entries$$.push([$entry$$.key, $valueToObject$$($includeInstance$$, $valueWrapper$$)])) : $entries$$.push([$entry$$.key, $entry$$.value]);
  }
  return $entries$$;
};
jspb.Map.fromObject = function($entries$$, $result$$, $valueFromObject$$) {
  $result$$ = new jspb.Map([], $result$$);
  for (var $i$$ = 0; $i$$ < $entries$$.length; $i$$++) {
    var $key$$ = $entries$$[$i$$][0], $value$$ = $valueFromObject$$($entries$$[$i$$][1]);
    $result$$.set($key$$, $value$$);
  }
  return $result$$;
};
jspb.Map.ArrayIteratorIterable_ = function($arr$$) {
  this.idx_ = 0;
  this.arr_ = $arr$$;
};
jspb.Map.ArrayIteratorIterable_.prototype.next = function() {
  return this.idx_ < this.arr_.length ? {done:!1, value:this.arr_[this.idx_++]} : {done:!0, value:void 0};
};
"undefined" != typeof Symbol && (jspb.Map.ArrayIteratorIterable_.prototype[Symbol.iterator] = function() {
  return this;
});
jspb.Map.prototype.clear = function() {
  this.map_ = {};
  this.arrClean = !1;
};
jspb.Map.prototype.entries = function() {
  var $entries$$ = [], $strKeys$$ = this.stringKeys_();
  $strKeys$$.sort();
  for (var $i$$ = 0; $i$$ < $strKeys$$.length; $i$$++) {
    var $entry$$ = this.map_[$strKeys$$[$i$$]];
    $entries$$.push([$entry$$.key, this.wrapEntry_($entry$$)]);
  }
  return new jspb.Map.ArrayIteratorIterable_($entries$$);
};
jspb.Map.prototype.keys = function() {
  var $keys$$ = [], $strKeys$$ = this.stringKeys_();
  $strKeys$$.sort();
  for (var $i$$ = 0; $i$$ < $strKeys$$.length; $i$$++) {
    var $entry$$ = this.map_[$strKeys$$[$i$$]];
    $keys$$.push($entry$$.key);
  }
  return new jspb.Map.ArrayIteratorIterable_($keys$$);
};
jspb.Map.prototype.values = function() {
  var $values$$ = [], $strKeys$$ = this.stringKeys_();
  $strKeys$$.sort();
  for (var $i$$ = 0; $i$$ < $strKeys$$.length; $i$$++) {
    var $entry$$ = this.map_[$strKeys$$[$i$$]];
    $values$$.push(this.wrapEntry_($entry$$));
  }
  return new jspb.Map.ArrayIteratorIterable_($values$$);
};
jspb.Map.prototype.forEach = function($cb$$, $opt_thisArg$$) {
  var $strKeys$$ = this.stringKeys_();
  $strKeys$$.sort();
  for (var $i$$ = 0; $i$$ < $strKeys$$.length; $i$$++) {
    var $entry$$ = this.map_[$strKeys$$[$i$$]];
    $cb$$.call($opt_thisArg$$, this.wrapEntry_($entry$$), $entry$$.key, this);
  }
};
jspb.Map.prototype.set = function($key$$, $value$$) {
  var $entry$$ = new jspb.Map.Entry_($key$$);
  this.valueCtor_ ? ($entry$$.valueWrapper = $value$$, $entry$$.value = $value$$.toArray()) : $entry$$.value = $value$$;
  this.map_[$key$$.toString()] = $entry$$;
  this.arrClean = !1;
  return this;
};
jspb.Map.prototype.wrapEntry_ = function($entry$$) {
  return this.valueCtor_ ? ($entry$$.valueWrapper || ($entry$$.valueWrapper = new this.valueCtor_($entry$$.value)), $entry$$.valueWrapper) : $entry$$.value;
};
jspb.Map.prototype.get = function($entry$jscomp$9_key$jscomp$83_keyValue$$) {
  $entry$jscomp$9_key$jscomp$83_keyValue$$ = $entry$jscomp$9_key$jscomp$83_keyValue$$.toString();
  if ($entry$jscomp$9_key$jscomp$83_keyValue$$ = this.map_[$entry$jscomp$9_key$jscomp$83_keyValue$$]) {
    return this.wrapEntry_($entry$jscomp$9_key$jscomp$83_keyValue$$);
  }
};
jspb.Map.prototype.has = function($key$jscomp$84_keyValue$$) {
  $key$jscomp$84_keyValue$$ = $key$jscomp$84_keyValue$$.toString();
  return $key$jscomp$84_keyValue$$ in this.map_;
};
jspb.Map.deserializeBinary = function($map$$, $reader$$, $keyReaderFn$$, $valueReaderFn$$, $opt_valueReaderCallback$$, $key$$) {
  for (var $value$$ = void 0; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$$ = $reader$$.nextField_;
    1 == $field$$ ? $key$$ = $keyReaderFn$$.call($reader$$) : 2 == $field$$ && ($map$$.valueCtor_ ? (goog.asserts.assert($opt_valueReaderCallback$$), $value$$ = new $map$$.valueCtor_, $valueReaderFn$$.call($reader$$, $value$$, $opt_valueReaderCallback$$)) : $value$$ = $valueReaderFn$$.call($reader$$));
  }
  goog.asserts.assert(void 0 != $key$$);
  goog.asserts.assert(void 0 != $value$$);
  $map$$.set($key$$, $value$$);
};
jspb.Map.prototype.stringKeys_ = function() {
  var $m$$ = this.map_, $ret$$ = [], $p$$;
  for ($p$$ in $m$$) {
    Object.prototype.hasOwnProperty.call($m$$, $p$$) && $ret$$.push($p$$);
  }
  return $ret$$;
};
jspb.Map.Entry_ = function($key$$, $opt_value$$) {
  this.key = $key$$;
  this.value = $opt_value$$;
  this.valueWrapper = void 0;
};
jspb.ExtensionFieldInfo = function($fieldNumber$$, $fieldName$$, $ctor$$, $toObjectFn$$, $isRepeated$$) {
  this.fieldIndex = $fieldNumber$$;
  this.fieldName = $fieldName$$;
  this.ctor = $ctor$$;
  this.toObjectFn = $toObjectFn$$;
  this.isRepeated = $isRepeated$$;
};
jspb.ExtensionFieldBinaryInfo = function($fieldInfo$$, $binaryReaderFn$$, $binaryWriterFn$$, $opt_binaryMessageSerializeFn$$, $opt_binaryMessageDeserializeFn$$, $opt_isPacked$$) {
  this.fieldInfo = $fieldInfo$$;
  this.binaryReaderFn = $binaryReaderFn$$;
  this.binaryWriterFn = $binaryWriterFn$$;
  this.binaryMessageSerializeFn = $opt_binaryMessageSerializeFn$$;
  this.binaryMessageDeserializeFn = $opt_binaryMessageDeserializeFn$$;
  this.isPacked = $opt_isPacked$$;
};
jspb.ExtensionFieldInfo.prototype.isMessageType = function() {
  return !!this.ctor;
};
jspb.Message = function() {
};
jspb.Message.GENERATE_TO_OBJECT = !0;
jspb.Message.GENERATE_FROM_OBJECT = !goog.DISALLOW_TEST_ONLY_CODE;
jspb.Message.GENERATE_TO_STRING = !0;
jspb.Message.ASSUME_LOCAL_ARRAYS = !1;
jspb.Message.SERIALIZE_EMPTY_TRAILING_FIELDS = !0;
jspb.Message.SUPPORTS_UINT8ARRAY_ = "function" == typeof Uint8Array;
jspb.Message.getIndex_ = function($msg$$, $fieldNumber$$) {
  return $fieldNumber$$ + $msg$$.arrayIndexOffset_;
};
jspb.Message.getFieldNumber_ = function($msg$$, $index$$) {
  return $index$$ - $msg$$.arrayIndexOffset_;
};
jspb.Message.initialize = function($msg$$, $data$jscomp$60_i$$, $fieldNumber$jscomp$3_index$$, $suggestedPivot$$, $repeatedFields$$, $opt_oneofFields$$) {
  $msg$$.wrappers_ = null;
  $data$jscomp$60_i$$ || ($data$jscomp$60_i$$ = $fieldNumber$jscomp$3_index$$ ? [$fieldNumber$jscomp$3_index$$] : []);
  $msg$$.messageId_ = $fieldNumber$jscomp$3_index$$ ? String($fieldNumber$jscomp$3_index$$) : void 0;
  $msg$$.arrayIndexOffset_ = 0 === $fieldNumber$jscomp$3_index$$ ? -1 : 0;
  $msg$$.array = $data$jscomp$60_i$$;
  jspb.Message.initPivotAndExtensionObject_($msg$$, $suggestedPivot$$);
  $msg$$.convertedFloatingPointFields_ = {};
  jspb.Message.SERIALIZE_EMPTY_TRAILING_FIELDS || ($msg$$.repeatedFields = $repeatedFields$$);
  if ($repeatedFields$$) {
    for ($data$jscomp$60_i$$ = 0; $data$jscomp$60_i$$ < $repeatedFields$$.length; $data$jscomp$60_i$$++) {
      $fieldNumber$jscomp$3_index$$ = $repeatedFields$$[$data$jscomp$60_i$$], $fieldNumber$jscomp$3_index$$ < $msg$$.pivot_ ? ($fieldNumber$jscomp$3_index$$ = jspb.Message.getIndex_($msg$$, $fieldNumber$jscomp$3_index$$), $msg$$.array[$fieldNumber$jscomp$3_index$$] = $msg$$.array[$fieldNumber$jscomp$3_index$$] || jspb.Message.EMPTY_LIST_SENTINEL_) : (jspb.Message.maybeInitEmptyExtensionObject_($msg$$), $msg$$.extensionObject_[$fieldNumber$jscomp$3_index$$] = $msg$$.extensionObject_[$fieldNumber$jscomp$3_index$$] || 
      jspb.Message.EMPTY_LIST_SENTINEL_);
    }
  }
  if ($opt_oneofFields$$ && $opt_oneofFields$$.length) {
    for ($data$jscomp$60_i$$ = 0; $data$jscomp$60_i$$ < $opt_oneofFields$$.length; $data$jscomp$60_i$$++) {
      jspb.Message.computeOneofCase($msg$$, $opt_oneofFields$$[$data$jscomp$60_i$$]);
    }
  }
};
jspb.Message.EMPTY_LIST_SENTINEL_ = goog.DEBUG && Object.freeze ? Object.freeze([]) : [];
jspb.Message.isArray_ = function($o$$) {
  return jspb.Message.ASSUME_LOCAL_ARRAYS ? $o$$ instanceof Array : goog.isArray($o$$);
};
jspb.Message.initPivotAndExtensionObject_ = function($msg$$, $suggestedPivot$$) {
  var $msgLength_obj$$ = $msg$$.array.length, $lastIndex$$ = -1;
  if ($msgLength_obj$$ && ($lastIndex$$ = $msgLength_obj$$ - 1, ($msgLength_obj$$ = $msg$$.array[$lastIndex$$]) && "object" == typeof $msgLength_obj$$ && !jspb.Message.isArray_($msgLength_obj$$) && !(jspb.Message.SUPPORTS_UINT8ARRAY_ && $msgLength_obj$$ instanceof Uint8Array))) {
    $msg$$.pivot_ = jspb.Message.getFieldNumber_($msg$$, $lastIndex$$);
    $msg$$.extensionObject_ = $msgLength_obj$$;
    return;
  }
  -1 < $suggestedPivot$$ ? ($msg$$.pivot_ = Math.max($suggestedPivot$$, jspb.Message.getFieldNumber_($msg$$, $lastIndex$$ + 1)), $msg$$.extensionObject_ = null) : $msg$$.pivot_ = Number.MAX_VALUE;
};
jspb.Message.maybeInitEmptyExtensionObject_ = function($msg$$) {
  var $pivotIndex$$ = jspb.Message.getIndex_($msg$$, $msg$$.pivot_);
  $msg$$.array[$pivotIndex$$] || ($msg$$.extensionObject_ = $msg$$.array[$pivotIndex$$] = {});
};
jspb.Message.toObjectList = function($field$$, $toObjectFn$$, $opt_includeInstance$$) {
  for (var $result$$ = [], $i$$ = 0; $i$$ < $field$$.length; $i$$++) {
    $result$$[$i$$] = $toObjectFn$$.call($field$$[$i$$], $opt_includeInstance$$, $field$$[$i$$]);
  }
  return $result$$;
};
jspb.Message.toObjectExtension = function($proto$$, $obj$$, $extensions$$, $getExtensionFn$$, $opt_includeInstance$$) {
  for (var $fieldNumber$$ in $extensions$$) {
    var $fieldInfo$$ = $extensions$$[$fieldNumber$$], $value$$ = $getExtensionFn$$.call($proto$$, $fieldInfo$$);
    if (null != $value$$) {
      for (var $name$$ in $fieldInfo$$.fieldName) {
        if ($fieldInfo$$.fieldName.hasOwnProperty($name$$)) {
          break;
        }
      }
      $obj$$[$name$$] = $fieldInfo$$.toObjectFn ? $fieldInfo$$.isRepeated ? jspb.Message.toObjectList($value$$, $fieldInfo$$.toObjectFn, $opt_includeInstance$$) : $fieldInfo$$.toObjectFn($opt_includeInstance$$, $value$$) : $value$$;
    }
  }
};
jspb.Message.serializeBinaryExtensions = function($proto$$, $writer$$, $extensions$$, $getExtensionFn$$) {
  for (var $fieldNumber$$ in $extensions$$) {
    var $binaryFieldInfo$$ = $extensions$$[$fieldNumber$$], $fieldInfo$$ = $binaryFieldInfo$$.fieldInfo;
    if (!$binaryFieldInfo$$.binaryWriterFn) {
      throw Error("Message extension present that was generated without binary serialization support");
    }
    var $value$$ = $getExtensionFn$$.call($proto$$, $fieldInfo$$);
    if (null != $value$$) {
      if ($fieldInfo$$.isMessageType()) {
        if ($binaryFieldInfo$$.binaryMessageSerializeFn) {
          $binaryFieldInfo$$.binaryWriterFn.call($writer$$, $fieldInfo$$.fieldIndex, $value$$, $binaryFieldInfo$$.binaryMessageSerializeFn);
        } else {
          throw Error("Message extension present holding submessage without binary support enabled, and message is being serialized to binary format");
        }
      } else {
        $binaryFieldInfo$$.binaryWriterFn.call($writer$$, $fieldInfo$$.fieldIndex, $value$$);
      }
    }
  }
};
jspb.Message.readBinaryExtension = function($msg$$, $currentList_reader$$, $extensions$jscomp$2_fieldInfo$$, $getExtensionFn$$, $setExtensionFn$$) {
  var $binaryFieldInfo$$ = $extensions$jscomp$2_fieldInfo$$[$currentList_reader$$.nextField_];
  if ($binaryFieldInfo$$) {
    $extensions$jscomp$2_fieldInfo$$ = $binaryFieldInfo$$.fieldInfo;
    if (!$binaryFieldInfo$$.binaryReaderFn) {
      throw Error("Deserializing extension whose generated code does not support binary format");
    }
    if ($extensions$jscomp$2_fieldInfo$$.isMessageType()) {
      var $value$$ = new $extensions$jscomp$2_fieldInfo$$.ctor;
      $binaryFieldInfo$$.binaryReaderFn.call($currentList_reader$$, $value$$, $binaryFieldInfo$$.binaryMessageDeserializeFn);
    } else {
      $value$$ = $binaryFieldInfo$$.binaryReaderFn.call($currentList_reader$$);
    }
    $extensions$jscomp$2_fieldInfo$$.isRepeated && !$binaryFieldInfo$$.isPacked ? ($currentList_reader$$ = $getExtensionFn$$.call($msg$$, $extensions$jscomp$2_fieldInfo$$)) ? $currentList_reader$$.push($value$$) : $setExtensionFn$$.call($msg$$, $extensions$jscomp$2_fieldInfo$$, [$value$$]) : $setExtensionFn$$.call($msg$$, $extensions$jscomp$2_fieldInfo$$, $value$$);
  } else {
    $currentList_reader$$.skipField();
  }
};
jspb.Message.getField = function($msg$$, $fieldNumber$jscomp$6_index$$) {
  if ($fieldNumber$jscomp$6_index$$ < $msg$$.pivot_) {
    $fieldNumber$jscomp$6_index$$ = jspb.Message.getIndex_($msg$$, $fieldNumber$jscomp$6_index$$);
    var $val$$ = $msg$$.array[$fieldNumber$jscomp$6_index$$];
    return $val$$ === jspb.Message.EMPTY_LIST_SENTINEL_ ? $msg$$.array[$fieldNumber$jscomp$6_index$$] = [] : $val$$;
  }
  if ($msg$$.extensionObject_) {
    return $val$$ = $msg$$.extensionObject_[$fieldNumber$jscomp$6_index$$], $val$$ === jspb.Message.EMPTY_LIST_SENTINEL_ ? $msg$$.extensionObject_[$fieldNumber$jscomp$6_index$$] = [] : $val$$;
  }
};
jspb.Message.getRepeatedField = function($msg$$, $fieldNumber$jscomp$7_index$$) {
  if ($fieldNumber$jscomp$7_index$$ < $msg$$.pivot_) {
    $fieldNumber$jscomp$7_index$$ = jspb.Message.getIndex_($msg$$, $fieldNumber$jscomp$7_index$$);
    var $val$$ = $msg$$.array[$fieldNumber$jscomp$7_index$$];
    return $val$$ === jspb.Message.EMPTY_LIST_SENTINEL_ ? $msg$$.array[$fieldNumber$jscomp$7_index$$] = [] : $val$$;
  }
  $val$$ = $msg$$.extensionObject_[$fieldNumber$jscomp$7_index$$];
  return $val$$ === jspb.Message.EMPTY_LIST_SENTINEL_ ? $msg$$.extensionObject_[$fieldNumber$jscomp$7_index$$] = [] : $val$$;
};
jspb.Message.getOptionalFloatingPointField = function($msg$jscomp$9_value$$, $fieldNumber$$) {
  $msg$jscomp$9_value$$ = jspb.Message.getField($msg$jscomp$9_value$$, $fieldNumber$$);
  return null == $msg$jscomp$9_value$$ ? $msg$jscomp$9_value$$ : +$msg$jscomp$9_value$$;
};
jspb.Message.getRepeatedFloatingPointField = function($msg$$, $fieldNumber$$) {
  var $values$$ = jspb.Message.getRepeatedField($msg$$, $fieldNumber$$);
  $msg$$.convertedFloatingPointFields_ || ($msg$$.convertedFloatingPointFields_ = {});
  if (!$msg$$.convertedFloatingPointFields_[$fieldNumber$$]) {
    for (var $i$$ = 0; $i$$ < $values$$.length; $i$$++) {
      $values$$[$i$$] = +$values$$[$i$$];
    }
    $msg$$.convertedFloatingPointFields_[$fieldNumber$$] = !0;
  }
  return $values$$;
};
jspb.Message.bytesAsB64 = function($value$$) {
  if (null == $value$$ || goog.isString($value$$)) {
    return $value$$;
  }
  if (jspb.Message.SUPPORTS_UINT8ARRAY_ && $value$$ instanceof Uint8Array) {
    return goog.crypt.base64.encodeByteArray($value$$);
  }
  goog.asserts.fail("Cannot coerce to b64 string: " + goog.typeOf($value$$));
  return null;
};
jspb.Message.bytesAsU8 = function($value$$) {
  if (null == $value$$ || $value$$ instanceof Uint8Array) {
    return $value$$;
  }
  if (goog.isString($value$$)) {
    return goog.crypt.base64.decodeStringToUint8Array($value$$);
  }
  goog.asserts.fail("Cannot coerce to Uint8Array: " + goog.typeOf($value$$));
  return null;
};
jspb.Message.bytesListAsB64 = function($value$$) {
  jspb.Message.assertConsistentTypes_($value$$);
  return !$value$$.length || goog.isString($value$$[0]) ? $value$$ : goog.array.map($value$$, jspb.Message.bytesAsB64);
};
jspb.Message.bytesListAsU8 = function($value$$) {
  jspb.Message.assertConsistentTypes_($value$$);
  return !$value$$.length || $value$$[0] instanceof Uint8Array ? $value$$ : goog.array.map($value$$, jspb.Message.bytesAsU8);
};
jspb.Message.assertConsistentTypes_ = function($array$$) {
  if (goog.DEBUG && $array$$ && 1 < $array$$.length) {
    var $expected$$ = goog.typeOf($array$$[0]);
    goog.array.forEach($array$$, function($array$$) {
      goog.typeOf($array$$) != $expected$$ && goog.asserts.fail("Inconsistent type in JSPB repeated field array. Got " + goog.typeOf($array$$) + " expected " + $expected$$);
    });
  }
};
jspb.Message.getFieldWithDefault = function($msg$jscomp$11_value$$, $fieldNumber$$, $defaultValue$$) {
  $msg$jscomp$11_value$$ = jspb.Message.getField($msg$jscomp$11_value$$, $fieldNumber$$);
  return null == $msg$jscomp$11_value$$ ? $defaultValue$$ : $msg$jscomp$11_value$$;
};
jspb.Message.getFieldProto3 = jspb.Message.getFieldWithDefault;
jspb.Message.getMapField = function($msg$$, $fieldNumber$$, $arr$$, $opt_valueCtor$$) {
  $msg$$.wrappers_ || ($msg$$.wrappers_ = {});
  if ($fieldNumber$$ in $msg$$.wrappers_) {
    return $msg$$.wrappers_[$fieldNumber$$];
  }
  if (!$arr$$) {
    return $arr$$ = jspb.Message.getField($msg$$, $fieldNumber$$), $arr$$ || ($arr$$ = [], jspb.Message.setField($msg$$, $fieldNumber$$, $arr$$)), $msg$$.wrappers_[$fieldNumber$$] = new jspb.Map($arr$$, $opt_valueCtor$$);
  }
};
jspb.Message.setField = function($msg$$, $fieldNumber$$, $value$$) {
  $fieldNumber$$ < $msg$$.pivot_ ? $msg$$.array[jspb.Message.getIndex_($msg$$, $fieldNumber$$)] = $value$$ : (jspb.Message.maybeInitEmptyExtensionObject_($msg$$), $msg$$.extensionObject_[$fieldNumber$$] = $value$$);
};
jspb.Message.setProto3IntField = function($msg$$, $fieldNumber$$, $value$$) {
  jspb.Message.setFieldIgnoringDefault_($msg$$, $fieldNumber$$, $value$$, 0);
};
jspb.Message.setProto3FloatField = function($msg$$, $fieldNumber$$, $value$$) {
  jspb.Message.setFieldIgnoringDefault_($msg$$, $fieldNumber$$, $value$$, 0.0);
};
jspb.Message.setProto3BooleanField = function($msg$$, $fieldNumber$$, $value$$) {
  jspb.Message.setFieldIgnoringDefault_($msg$$, $fieldNumber$$, $value$$, !1);
};
jspb.Message.setProto3StringField = function($msg$$, $fieldNumber$$, $value$$) {
  jspb.Message.setFieldIgnoringDefault_($msg$$, $fieldNumber$$, $value$$, "");
};
jspb.Message.setProto3BytesField = function($msg$$, $fieldNumber$$, $value$$) {
  jspb.Message.setFieldIgnoringDefault_($msg$$, $fieldNumber$$, $value$$, "");
};
jspb.Message.setProto3EnumField = function($msg$$, $fieldNumber$$, $value$$) {
  jspb.Message.setFieldIgnoringDefault_($msg$$, $fieldNumber$$, $value$$, 0);
};
jspb.Message.setProto3StringIntField = function($msg$$, $fieldNumber$$, $value$$) {
  jspb.Message.setFieldIgnoringDefault_($msg$$, $fieldNumber$$, $value$$, "0");
};
jspb.Message.setFieldIgnoringDefault_ = function($msg$$, $fieldNumber$$, $value$$, $defaultValue$$) {
  $value$$ !== $defaultValue$$ ? jspb.Message.setField($msg$$, $fieldNumber$$, $value$$) : $msg$$.array[jspb.Message.getIndex_($msg$$, $fieldNumber$$)] = null;
};
jspb.Message.addToRepeatedField = function($arr$jscomp$68_msg$$, $fieldNumber$$, $value$$, $opt_index$$) {
  $arr$jscomp$68_msg$$ = jspb.Message.getRepeatedField($arr$jscomp$68_msg$$, $fieldNumber$$);
  void 0 != $opt_index$$ ? $arr$jscomp$68_msg$$.splice($opt_index$$, 0, $value$$) : $arr$jscomp$68_msg$$.push($value$$);
};
jspb.Message.setOneofField = function($msg$$, $fieldNumber$$, $currentCase_oneof$$, $value$$) {
  ($currentCase_oneof$$ = jspb.Message.computeOneofCase($msg$$, $currentCase_oneof$$)) && $currentCase_oneof$$ !== $fieldNumber$$ && void 0 !== $value$$ && ($msg$$.wrappers_ && $currentCase_oneof$$ in $msg$$.wrappers_ && ($msg$$.wrappers_[$currentCase_oneof$$] = void 0), jspb.Message.setField($msg$$, $currentCase_oneof$$, void 0));
  jspb.Message.setField($msg$$, $fieldNumber$$, $value$$);
};
jspb.Message.computeOneofCase = function($msg$$, $oneof$$) {
  for (var $oneofField$$, $oneofValue$$, $i$$ = 0; $i$$ < $oneof$$.length; $i$$++) {
    var $fieldNumber$$ = $oneof$$[$i$$], $value$$ = jspb.Message.getField($msg$$, $fieldNumber$$);
    null != $value$$ && ($oneofField$$ = $fieldNumber$$, $oneofValue$$ = $value$$, jspb.Message.setField($msg$$, $fieldNumber$$, void 0));
  }
  return $oneofField$$ ? (jspb.Message.setField($msg$$, $oneofField$$, $oneofValue$$), $oneofField$$) : 0;
};
jspb.Message.getWrapperField = function($msg$$, $ctor$$, $fieldNumber$$, $opt_required$$) {
  $msg$$.wrappers_ || ($msg$$.wrappers_ = {});
  if (!$msg$$.wrappers_[$fieldNumber$$]) {
    var $data$$ = jspb.Message.getField($msg$$, $fieldNumber$$);
    if ($opt_required$$ || $data$$) {
      $msg$$.wrappers_[$fieldNumber$$] = new $ctor$$($data$$);
    }
  }
  return $msg$$.wrappers_[$fieldNumber$$];
};
jspb.Message.getRepeatedWrapperField = function($msg$$, $ctor$jscomp$4_val$$, $fieldNumber$$) {
  jspb.Message.wrapRepeatedField_($msg$$, $ctor$jscomp$4_val$$, $fieldNumber$$);
  $ctor$jscomp$4_val$$ = $msg$$.wrappers_[$fieldNumber$$];
  $ctor$jscomp$4_val$$ == jspb.Message.EMPTY_LIST_SENTINEL_ && ($ctor$jscomp$4_val$$ = $msg$$.wrappers_[$fieldNumber$$] = []);
  return $ctor$jscomp$4_val$$;
};
jspb.Message.wrapRepeatedField_ = function($msg$$, $ctor$$, $fieldNumber$$) {
  $msg$$.wrappers_ || ($msg$$.wrappers_ = {});
  if (!$msg$$.wrappers_[$fieldNumber$$]) {
    for (var $data$$ = jspb.Message.getRepeatedField($msg$$, $fieldNumber$$), $wrappers$$ = [], $i$$ = 0; $i$$ < $data$$.length; $i$$++) {
      $wrappers$$[$i$$] = new $ctor$$($data$$[$i$$]);
    }
    $msg$$.wrappers_[$fieldNumber$$] = $wrappers$$;
  }
};
jspb.Message.setWrapperField = function($msg$$, $fieldNumber$$, $value$$) {
  $msg$$.wrappers_ || ($msg$$.wrappers_ = {});
  var $data$$ = $value$$ ? $value$$.toArray() : $value$$;
  $msg$$.wrappers_[$fieldNumber$$] = $value$$;
  jspb.Message.setField($msg$$, $fieldNumber$$, $data$$);
};
jspb.Message.setOneofWrapperField = function($msg$$, $fieldNumber$$, $oneof$$, $value$$) {
  $msg$$.wrappers_ || ($msg$$.wrappers_ = {});
  var $data$$ = $value$$ ? $value$$.toArray() : $value$$;
  $msg$$.wrappers_[$fieldNumber$$] = $value$$;
  jspb.Message.setOneofField($msg$$, $fieldNumber$$, $oneof$$, $data$$);
};
jspb.Message.setRepeatedWrapperField = function($msg$$, $fieldNumber$$, $value$$) {
  $msg$$.wrappers_ || ($msg$$.wrappers_ = {});
  $value$$ = $value$$ || [];
  for (var $data$$ = [], $i$$ = 0; $i$$ < $value$$.length; $i$$++) {
    $data$$[$i$$] = $value$$[$i$$].toArray();
  }
  $msg$$.wrappers_[$fieldNumber$$] = $value$$;
  jspb.Message.setField($msg$$, $fieldNumber$$, $data$$);
};
jspb.Message.addToRepeatedWrapperField = function($array$jscomp$18_msg$$, $fieldNumber$$, $insertedValue_value$$, $ctor$$, $index$$) {
  jspb.Message.wrapRepeatedField_($array$jscomp$18_msg$$, $ctor$$, $fieldNumber$$);
  var $wrapperArray$$ = $array$jscomp$18_msg$$.wrappers_[$fieldNumber$$];
  $wrapperArray$$ || ($wrapperArray$$ = $array$jscomp$18_msg$$.wrappers_[$fieldNumber$$] = []);
  $insertedValue_value$$ = $insertedValue_value$$ ? $insertedValue_value$$ : new $ctor$$;
  $array$jscomp$18_msg$$ = jspb.Message.getRepeatedField($array$jscomp$18_msg$$, $fieldNumber$$);
  void 0 != $index$$ ? ($wrapperArray$$.splice($index$$, 0, $insertedValue_value$$), $array$jscomp$18_msg$$.splice($index$$, 0, $insertedValue_value$$.toArray())) : ($wrapperArray$$.push($insertedValue_value$$), $array$jscomp$18_msg$$.push($insertedValue_value$$.toArray()));
  return $insertedValue_value$$;
};
jspb.Message.toMap = function($field$$, $mapKeyGetterFn$$, $opt_toObjectFn$$, $opt_includeInstance$$) {
  for (var $result$$ = {}, $i$$ = 0; $i$$ < $field$$.length; $i$$++) {
    $result$$[$mapKeyGetterFn$$.call($field$$[$i$$])] = $opt_toObjectFn$$ ? $opt_toObjectFn$$.call($field$$[$i$$], $opt_includeInstance$$, $field$$[$i$$]) : $field$$[$i$$];
  }
  return $result$$;
};
jspb.Message.prototype.syncMapFields_ = function() {
  if (this.wrappers_) {
    for (var $fieldNumber$$ in this.wrappers_) {
      var $val$$ = this.wrappers_[$fieldNumber$$];
      if (goog.isArray($val$$)) {
        for (var $i$$ = 0; $i$$ < $val$$.length; $i$$++) {
          $val$$[$i$$] && $val$$[$i$$].toArray();
        }
      } else {
        $val$$ && $val$$.toArray();
      }
    }
  }
};
jspb.Message.prototype.toArray = function() {
  this.syncMapFields_();
  return this.array;
};
jspb.Message.prototype.serialize = jspb.Message.SUPPORTS_UINT8ARRAY_ ? function() {
  var $old_toJSON$$ = Uint8Array.prototype.toJSON;
  Uint8Array.prototype.toJSON = function() {
    return goog.crypt.base64.encodeByteArray(this);
  };
  try {
    return JSON.stringify(this.array && jspb.Message.prepareForSerialize_(this.toArray(), this), jspb.Message.serializeSpecialNumbers_);
  } finally {
    Uint8Array.prototype.toJSON = $old_toJSON$$;
  }
} : function() {
  return JSON.stringify(this.array && jspb.Message.prepareForSerialize_(this.toArray(), this), jspb.Message.serializeSpecialNumbers_);
};
jspb.Message.prepareForSerialize_ = function($array$$, $msg$$) {
  if (jspb.Message.SERIALIZE_EMPTY_TRAILING_FIELDS) {
    return $array$$;
  }
  for (var $result$$, $length$$ = $array$$.length, $needsCopy$$ = !1, $extension$$, $i$$ = $array$$.length; $i$$--;) {
    var $value$$ = $array$$[$i$$];
    if (jspb.Message.isArray_($value$$)) {
      var $fieldNumber$$ = goog.isArray($msg$$) ? $msg$$[$i$$] : $msg$$ && $msg$$.wrappers_ ? $msg$$.wrappers_[jspb.Message.getFieldNumber_($msg$$, $i$$)] : void 0;
      $value$$ = jspb.Message.prepareForSerialize_($value$$, $fieldNumber$$);
      !$value$$.length && $msg$$ && !goog.isArray($msg$$) && $msg$$.repeatedFields && ($fieldNumber$$ = jspb.Message.getFieldNumber_($msg$$, $i$$), -1 != $msg$$.repeatedFields.indexOf($fieldNumber$$) && ($value$$ = null));
      $value$$ != $array$$[$i$$] && ($needsCopy$$ = !0);
    } else {
      if (goog.isObject($value$$)) {
        $extension$$ = jspb.Message.prepareExtensionForSerialize_($value$$, $msg$$ && goog.asserts.assertInstanceof($msg$$, jspb.Message));
        $extension$$ != $value$$ && ($needsCopy$$ = !0);
        $length$$--;
        continue;
      }
    }
    null == $value$$ && $length$$ == $i$$ + 1 ? ($needsCopy$$ = !0, $length$$--) : $needsCopy$$ && ($result$$ || ($result$$ = $array$$.slice(0, $length$$)), $result$$[$i$$] = $value$$);
  }
  if (!$needsCopy$$) {
    return $array$$;
  }
  $result$$ || ($result$$ = $array$$.slice(0, $length$$));
  $extension$$ && $result$$.push($extension$$);
  return $result$$;
};
jspb.Message.prepareExtensionForSerialize_ = function($extension$$, $msg$$) {
  var $result$$ = {}, $changed$$ = !1, $key$$;
  for ($key$$ in $extension$$) {
    var $value$$ = $extension$$[$key$$];
    if (jspb.Message.isArray_($value$$)) {
      var $prepared$$ = jspb.Message.prepareForSerialize_($value$$, $msg$$ && $msg$$.wrappers_ && $msg$$.wrappers_[$key$$]);
      !$prepared$$.length && $msg$$ && $msg$$.repeatedFields && -1 != $msg$$.repeatedFields.indexOf(+$key$$) || ($result$$[$key$$] = $prepared$$);
      $result$$[$key$$] != $value$$ && ($changed$$ = !0);
    } else {
      null != $value$$ ? $result$$[$key$$] = $value$$ : $changed$$ = !0;
    }
  }
  if (!$changed$$) {
    return $extension$$;
  }
  for ($key$$ in $result$$) {
    return $result$$;
  }
  return null;
};
jspb.Message.serializeSpecialNumbers_ = function($key$$, $value$$) {
  return goog.isNumber($value$$) && (isNaN($value$$) || Infinity === $value$$ || -Infinity === $value$$) ? String($value$$) : $value$$;
};
jspb.Message.deserialize = function($ctor$jscomp$7_msg$$, $data$$) {
  $ctor$jscomp$7_msg$$ = new $ctor$jscomp$7_msg$$($data$$ ? JSON.parse($data$$) : null);
  goog.asserts.assertInstanceof($ctor$jscomp$7_msg$$, jspb.Message);
  return $ctor$jscomp$7_msg$$;
};
jspb.Message.buildMessageFromArray = function($data$$) {
  var $messageCtor$$ = jspb.Message.registry_[$data$$[0]];
  if (!$messageCtor$$) {
    throw Error("Unknown JsPb message type: " + $data$$[0]);
  }
  return new $messageCtor$$($data$$);
};
jspb.Message.GENERATE_TO_STRING && (jspb.Message.prototype.toString = function() {
  this.syncMapFields_();
  return this.array.toString();
});
jspb.Message.prototype.getExtension = function($fieldInfo$$) {
  if (this.extensionObject_) {
    this.wrappers_ || (this.wrappers_ = {});
    var $fieldNumber$$ = $fieldInfo$$.fieldIndex;
    if ($fieldInfo$$.isRepeated) {
      if ($fieldInfo$$.isMessageType()) {
        return this.wrappers_[$fieldNumber$$] || (this.wrappers_[$fieldNumber$$] = goog.array.map(this.extensionObject_[$fieldNumber$$] || [], function($fieldNumber$$) {
          return new $fieldInfo$$.ctor($fieldNumber$$);
        })), this.wrappers_[$fieldNumber$$];
      }
    } else {
      if ($fieldInfo$$.isMessageType()) {
        return !this.wrappers_[$fieldNumber$$] && this.extensionObject_[$fieldNumber$$] && (this.wrappers_[$fieldNumber$$] = new $fieldInfo$$.ctor(this.extensionObject_[$fieldNumber$$])), this.wrappers_[$fieldNumber$$];
      }
    }
    return this.extensionObject_[$fieldNumber$$];
  }
};
jspb.Message.difference = function($m1$$, $arr2$$) {
  if (!($m1$$ instanceof $arr2$$.constructor)) {
    throw Error("Messages have different types.");
  }
  var $arr1$$ = $m1$$.toArray();
  $arr2$$ = $arr2$$.toArray();
  var $res$$ = [], $i$jscomp$159_start$$ = 0, $length$$ = $arr1$$.length > $arr2$$.length ? $arr1$$.length : $arr2$$.length;
  $m1$$.messageId_ && ($res$$[0] = $m1$$.messageId_, $i$jscomp$159_start$$ = 1);
  for (; $i$jscomp$159_start$$ < $length$$; $i$jscomp$159_start$$++) {
    jspb.Message.compareFields($arr1$$[$i$jscomp$159_start$$], $arr2$$[$i$jscomp$159_start$$]) || ($res$$[$i$jscomp$159_start$$] = $arr2$$[$i$jscomp$159_start$$]);
  }
  return new $m1$$.constructor($res$$);
};
jspb.Message.equals = function($m1$$, $m2$$) {
  return $m1$$ == $m2$$ || !(!$m1$$ || !$m2$$) && $m1$$ instanceof $m2$$.constructor && jspb.Message.compareFields($m1$$.toArray(), $m2$$.toArray());
};
jspb.Message.compareExtensions = function($extension1$$, $extension2$$) {
  $extension1$$ = $extension1$$ || {};
  $extension2$$ = $extension2$$ || {};
  var $keys$$ = {}, $name$$;
  for ($name$$ in $extension1$$) {
    $keys$$[$name$$] = 0;
  }
  for ($name$$ in $extension2$$) {
    $keys$$[$name$$] = 0;
  }
  for ($name$$ in $keys$$) {
    if (!jspb.Message.compareFields($extension1$$[$name$$], $extension2$$[$name$$])) {
      return !1;
    }
  }
  return !0;
};
jspb.Message.compareFields = function($bytes1$$, $field2_i$$) {
  if ($bytes1$$ == $field2_i$$) {
    return !0;
  }
  if (!goog.isObject($bytes1$$) || !goog.isObject($field2_i$$)) {
    return goog.isNumber($bytes1$$) && isNaN($bytes1$$) || goog.isNumber($field2_i$$) && isNaN($field2_i$$) ? String($bytes1$$) == String($field2_i$$) : !1;
  }
  if ($bytes1$$.constructor != $field2_i$$.constructor) {
    return !1;
  }
  if (jspb.Message.SUPPORTS_UINT8ARRAY_ && $bytes1$$.constructor === Uint8Array) {
    var $bytes2$$ = $field2_i$$;
    if ($bytes1$$.length != $bytes2$$.length) {
      return !1;
    }
    for ($field2_i$$ = 0; $field2_i$$ < $bytes1$$.length; $field2_i$$++) {
      if ($bytes1$$[$field2_i$$] != $bytes2$$[$field2_i$$]) {
        return !1;
      }
    }
    return !0;
  }
  if ($bytes1$$.constructor === Array) {
    $bytes2$$ = $field2_i$$;
    var $extension1$$ = void 0, $extension2$$ = void 0, $length$$ = Math.max($bytes1$$.length, $bytes2$$.length);
    for ($field2_i$$ = 0; $field2_i$$ < $length$$; $field2_i$$++) {
      var $val1$$ = $bytes1$$[$field2_i$$], $val2$$ = $bytes2$$[$field2_i$$];
      $val1$$ && $val1$$.constructor == Object && (goog.asserts.assert(void 0 === $extension1$$), goog.asserts.assert($field2_i$$ === $bytes1$$.length - 1), $extension1$$ = $val1$$, $val1$$ = void 0);
      $val2$$ && $val2$$.constructor == Object && (goog.asserts.assert(void 0 === $extension2$$), goog.asserts.assert($field2_i$$ === $bytes2$$.length - 1), $extension2$$ = $val2$$, $val2$$ = void 0);
      if (!jspb.Message.compareFields($val1$$, $val2$$)) {
        return !1;
      }
    }
    return $extension1$$ || $extension2$$ ? ($extension1$$ = $extension1$$ || {}, $extension2$$ = $extension2$$ || {}, jspb.Message.compareExtensions($extension1$$, $extension2$$)) : !0;
  }
  if ($bytes1$$.constructor === Object) {
    return jspb.Message.compareExtensions($bytes1$$, $field2_i$$);
  }
  throw Error("Invalid type in JSPB array");
};
jspb.Message.prototype.cloneMessage = function() {
  return jspb.Message.cloneMessage(this);
};
jspb.Message.prototype.clone = function() {
  return jspb.Message.cloneMessage(this);
};
jspb.Message.clone = function($msg$$) {
  return jspb.Message.cloneMessage($msg$$);
};
jspb.Message.cloneMessage = function($msg$$) {
  return new $msg$$.constructor(jspb.Message.clone_($msg$$.toArray()));
};
jspb.Message.copyInto = function($copyOfFrom_fromMessage$$, $toMessage$$) {
  goog.asserts.assertInstanceof($copyOfFrom_fromMessage$$, jspb.Message);
  goog.asserts.assertInstanceof($toMessage$$, jspb.Message);
  goog.asserts.assert($copyOfFrom_fromMessage$$.constructor == $toMessage$$.constructor, "Copy source and target message should have the same type.");
  $copyOfFrom_fromMessage$$ = jspb.Message.clone($copyOfFrom_fromMessage$$);
  for (var $to$$ = $toMessage$$.toArray(), $from$$ = $copyOfFrom_fromMessage$$.toArray(), $i$$ = $to$$.length = 0; $i$$ < $from$$.length; $i$$++) {
    $to$$[$i$$] = $from$$[$i$$];
  }
  $toMessage$$.wrappers_ = $copyOfFrom_fromMessage$$.wrappers_;
  $toMessage$$.extensionObject_ = $copyOfFrom_fromMessage$$.extensionObject_;
};
jspb.Message.clone_ = function($obj$$) {
  if (goog.isArray($obj$$)) {
    for (var $clone$$ = Array($obj$$.length), $i$jscomp$162_key$$ = 0; $i$jscomp$162_key$$ < $obj$$.length; $i$jscomp$162_key$$++) {
      var $o$$ = $obj$$[$i$jscomp$162_key$$];
      null != $o$$ && ($clone$$[$i$jscomp$162_key$$] = "object" == typeof $o$$ ? jspb.Message.clone_(goog.asserts.assert($o$$)) : $o$$);
    }
    return $clone$$;
  }
  if (jspb.Message.SUPPORTS_UINT8ARRAY_ && $obj$$ instanceof Uint8Array) {
    return new Uint8Array($obj$$);
  }
  $clone$$ = {};
  for ($i$jscomp$162_key$$ in $obj$$) {
    $o$$ = $obj$$[$i$jscomp$162_key$$], null != $o$$ && ($clone$$[$i$jscomp$162_key$$] = "object" == typeof $o$$ ? jspb.Message.clone_(goog.asserts.assert($o$$)) : $o$$);
  }
  return $clone$$;
};
jspb.Message.registerMessageType = function($id$$, $constructor$$) {
  jspb.Message.registry_[$id$$] = $constructor$$;
  $constructor$$.messageId = $id$$;
};
jspb.Message.registry_ = {};
jspb.Message.messageSetExtensions = {};
jspb.Message.messageSetExtensionsBinary = {};
var proto = {google:{}};
proto.google.protobuf = {};
proto.google.protobuf.Timestamp = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, null, null);
};
goog.inherits(proto.google.protobuf.Timestamp, jspb.Message);
jspb.Message.GENERATE_TO_OBJECT && (proto.google.protobuf.Timestamp.prototype.toObject = function($opt_includeInstance$$) {
  return proto.google.protobuf.Timestamp.toObject($opt_includeInstance$$, this);
}, proto.google.protobuf.Timestamp.toObject = function($includeInstance$$, $msg$$) {
  var $obj$$ = {seconds:jspb.Message.getFieldWithDefault($msg$$, 1, 0), nanos:jspb.Message.getFieldWithDefault($msg$$, 2, 0)};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.google.protobuf.Timestamp.deserializeBinary = function($bytes$jscomp$11_reader$$) {
  $bytes$jscomp$11_reader$$ = new jspb.BinaryReader($bytes$jscomp$11_reader$$);
  var $msg$$ = new proto.google.protobuf.Timestamp;
  return proto.google.protobuf.Timestamp.deserializeBinaryFromReader($msg$$, $bytes$jscomp$11_reader$$);
};
proto.google.protobuf.Timestamp.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$97_value$$ = $reader$$.nextField_;
    switch($field$jscomp$97_value$$) {
      case 1:
        $field$jscomp$97_value$$ = $reader$$.readInt64();
        $msg$$.setSeconds($field$jscomp$97_value$$);
        break;
      case 2:
        $field$jscomp$97_value$$ = $reader$$.readInt32();
        $msg$$.setNanos($field$jscomp$97_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.google.protobuf.Timestamp.serializeBinaryToWriter = function($message$$, $writer$$) {
  var $f$$ = $message$$.getSeconds();
  0 !== $f$$ && $writer$$.writeInt64(1, $f$$);
  $f$$ = $message$$.getNanos();
  0 !== $f$$ && $writer$$.writeInt32(2, $f$$);
};
proto.google.protobuf.Timestamp.prototype.getSeconds = function() {
  return jspb.Message.getFieldWithDefault(this, 1, 0);
};
proto.google.protobuf.Timestamp.prototype.setSeconds = function($value$$) {
  jspb.Message.setProto3IntField(this, 1, $value$$);
};
proto.google.protobuf.Timestamp.prototype.getNanos = function() {
  return jspb.Message.getFieldWithDefault(this, 2, 0);
};
proto.google.protobuf.Timestamp.prototype.setNanos = function($value$$) {
  jspb.Message.setProto3IntField(this, 2, $value$$);
};
proto.google.protobuf.Timestamp.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.google.protobuf.Timestamp, $data$$);
};
proto.google.protobuf.DoubleValue = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, null, null);
};
goog.inherits(proto.google.protobuf.DoubleValue, jspb.Message);
proto.google.protobuf.FloatValue = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, null, null);
};
goog.inherits(proto.google.protobuf.FloatValue, jspb.Message);
proto.google.protobuf.Int64Value = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, null, null);
};
goog.inherits(proto.google.protobuf.Int64Value, jspb.Message);
proto.google.protobuf.UInt64Value = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, null, null);
};
goog.inherits(proto.google.protobuf.UInt64Value, jspb.Message);
proto.google.protobuf.Int32Value = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, null, null);
};
goog.inherits(proto.google.protobuf.Int32Value, jspb.Message);
proto.google.protobuf.UInt32Value = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, null, null);
};
goog.inherits(proto.google.protobuf.UInt32Value, jspb.Message);
proto.google.protobuf.BoolValue = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, null, null);
};
goog.inherits(proto.google.protobuf.BoolValue, jspb.Message);
proto.google.protobuf.StringValue = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, null, null);
};
goog.inherits(proto.google.protobuf.StringValue, jspb.Message);
proto.google.protobuf.BytesValue = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, null, null);
};
goog.inherits(proto.google.protobuf.BytesValue, jspb.Message);
jspb.Message.GENERATE_TO_OBJECT && (proto.google.protobuf.DoubleValue.prototype.toObject = function($opt_includeInstance$$) {
  return proto.google.protobuf.DoubleValue.toObject($opt_includeInstance$$, this);
}, proto.google.protobuf.DoubleValue.toObject = function($includeInstance$$, $msg$$) {
  var $obj$$ = {value:+jspb.Message.getFieldWithDefault($msg$$, 1, 0.0)};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.google.protobuf.DoubleValue.deserializeBinary = function($bytes$jscomp$12_reader$$) {
  $bytes$jscomp$12_reader$$ = new jspb.BinaryReader($bytes$jscomp$12_reader$$);
  var $msg$$ = new proto.google.protobuf.DoubleValue;
  return proto.google.protobuf.DoubleValue.deserializeBinaryFromReader($msg$$, $bytes$jscomp$12_reader$$);
};
proto.google.protobuf.DoubleValue.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$98_value$$ = $reader$$.nextField_;
    switch($field$jscomp$98_value$$) {
      case 1:
        $field$jscomp$98_value$$ = $reader$$.readDouble();
        $msg$$.setValue($field$jscomp$98_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.google.protobuf.DoubleValue.serializeBinaryToWriter = function($f$jscomp$38_message$$, $writer$$) {
  $f$jscomp$38_message$$ = $f$jscomp$38_message$$.getValue();
  0.0 !== $f$jscomp$38_message$$ && $writer$$.writeDouble(1, $f$jscomp$38_message$$);
};
proto.google.protobuf.DoubleValue.prototype.getValue = function() {
  return +jspb.Message.getFieldWithDefault(this, 1, 0.0);
};
proto.google.protobuf.DoubleValue.prototype.setValue = function($value$$) {
  jspb.Message.setProto3FloatField(this, 1, $value$$);
};
proto.google.protobuf.DoubleValue.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.google.protobuf.DoubleValue, $data$$);
};
jspb.Message.GENERATE_TO_OBJECT && (proto.google.protobuf.FloatValue.prototype.toObject = function($opt_includeInstance$$) {
  return proto.google.protobuf.FloatValue.toObject($opt_includeInstance$$, this);
}, proto.google.protobuf.FloatValue.toObject = function($includeInstance$$, $msg$$) {
  var $obj$$ = {value:+jspb.Message.getFieldWithDefault($msg$$, 1, 0.0)};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.google.protobuf.FloatValue.deserializeBinary = function($bytes$jscomp$13_reader$$) {
  $bytes$jscomp$13_reader$$ = new jspb.BinaryReader($bytes$jscomp$13_reader$$);
  var $msg$$ = new proto.google.protobuf.FloatValue;
  return proto.google.protobuf.FloatValue.deserializeBinaryFromReader($msg$$, $bytes$jscomp$13_reader$$);
};
proto.google.protobuf.FloatValue.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$99_value$$ = $reader$$.nextField_;
    switch($field$jscomp$99_value$$) {
      case 1:
        $field$jscomp$99_value$$ = $reader$$.readFloat();
        $msg$$.setValue($field$jscomp$99_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.google.protobuf.FloatValue.serializeBinaryToWriter = function($f$jscomp$40_message$$, $writer$$) {
  $f$jscomp$40_message$$ = $f$jscomp$40_message$$.getValue();
  0.0 !== $f$jscomp$40_message$$ && $writer$$.writeFloat(1, $f$jscomp$40_message$$);
};
proto.google.protobuf.FloatValue.prototype.getValue = function() {
  return +jspb.Message.getFieldWithDefault(this, 1, 0.0);
};
proto.google.protobuf.FloatValue.prototype.setValue = function($value$$) {
  jspb.Message.setProto3FloatField(this, 1, $value$$);
};
proto.google.protobuf.FloatValue.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.google.protobuf.FloatValue, $data$$);
};
jspb.Message.GENERATE_TO_OBJECT && (proto.google.protobuf.Int64Value.prototype.toObject = function($opt_includeInstance$$) {
  return proto.google.protobuf.Int64Value.toObject($opt_includeInstance$$, this);
}, proto.google.protobuf.Int64Value.toObject = function($includeInstance$$, $msg$$) {
  var $obj$$ = {value:jspb.Message.getFieldWithDefault($msg$$, 1, 0)};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.google.protobuf.Int64Value.deserializeBinary = function($bytes$jscomp$14_reader$$) {
  $bytes$jscomp$14_reader$$ = new jspb.BinaryReader($bytes$jscomp$14_reader$$);
  var $msg$$ = new proto.google.protobuf.Int64Value;
  return proto.google.protobuf.Int64Value.deserializeBinaryFromReader($msg$$, $bytes$jscomp$14_reader$$);
};
proto.google.protobuf.Int64Value.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$100_value$$ = $reader$$.nextField_;
    switch($field$jscomp$100_value$$) {
      case 1:
        $field$jscomp$100_value$$ = $reader$$.readInt64();
        $msg$$.setValue($field$jscomp$100_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.google.protobuf.Int64Value.serializeBinaryToWriter = function($f$jscomp$42_message$$, $writer$$) {
  $f$jscomp$42_message$$ = $f$jscomp$42_message$$.getValue();
  0 !== $f$jscomp$42_message$$ && $writer$$.writeInt64(1, $f$jscomp$42_message$$);
};
proto.google.protobuf.Int64Value.prototype.getValue = function() {
  return jspb.Message.getFieldWithDefault(this, 1, 0);
};
proto.google.protobuf.Int64Value.prototype.setValue = function($value$$) {
  jspb.Message.setProto3IntField(this, 1, $value$$);
};
proto.google.protobuf.Int64Value.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.google.protobuf.Int64Value, $data$$);
};
jspb.Message.GENERATE_TO_OBJECT && (proto.google.protobuf.UInt64Value.prototype.toObject = function($opt_includeInstance$$) {
  return proto.google.protobuf.UInt64Value.toObject($opt_includeInstance$$, this);
}, proto.google.protobuf.UInt64Value.toObject = function($includeInstance$$, $msg$$) {
  var $obj$$ = {value:jspb.Message.getFieldWithDefault($msg$$, 1, 0)};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.google.protobuf.UInt64Value.deserializeBinary = function($bytes$jscomp$15_reader$$) {
  $bytes$jscomp$15_reader$$ = new jspb.BinaryReader($bytes$jscomp$15_reader$$);
  var $msg$$ = new proto.google.protobuf.UInt64Value;
  return proto.google.protobuf.UInt64Value.deserializeBinaryFromReader($msg$$, $bytes$jscomp$15_reader$$);
};
proto.google.protobuf.UInt64Value.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$101_value$$ = $reader$$.nextField_;
    switch($field$jscomp$101_value$$) {
      case 1:
        $field$jscomp$101_value$$ = $reader$$.readUint64();
        $msg$$.setValue($field$jscomp$101_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.google.protobuf.UInt64Value.serializeBinaryToWriter = function($f$jscomp$44_message$$, $writer$$) {
  $f$jscomp$44_message$$ = $f$jscomp$44_message$$.getValue();
  0 !== $f$jscomp$44_message$$ && $writer$$.writeUint64(1, $f$jscomp$44_message$$);
};
proto.google.protobuf.UInt64Value.prototype.getValue = function() {
  return jspb.Message.getFieldWithDefault(this, 1, 0);
};
proto.google.protobuf.UInt64Value.prototype.setValue = function($value$$) {
  jspb.Message.setProto3IntField(this, 1, $value$$);
};
proto.google.protobuf.UInt64Value.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.google.protobuf.UInt64Value, $data$$);
};
jspb.Message.GENERATE_TO_OBJECT && (proto.google.protobuf.Int32Value.prototype.toObject = function($opt_includeInstance$$) {
  return proto.google.protobuf.Int32Value.toObject($opt_includeInstance$$, this);
}, proto.google.protobuf.Int32Value.toObject = function($includeInstance$$, $msg$$) {
  var $obj$$ = {value:jspb.Message.getFieldWithDefault($msg$$, 1, 0)};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.google.protobuf.Int32Value.deserializeBinary = function($bytes$jscomp$16_reader$$) {
  $bytes$jscomp$16_reader$$ = new jspb.BinaryReader($bytes$jscomp$16_reader$$);
  var $msg$$ = new proto.google.protobuf.Int32Value;
  return proto.google.protobuf.Int32Value.deserializeBinaryFromReader($msg$$, $bytes$jscomp$16_reader$$);
};
proto.google.protobuf.Int32Value.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$102_value$$ = $reader$$.nextField_;
    switch($field$jscomp$102_value$$) {
      case 1:
        $field$jscomp$102_value$$ = $reader$$.readInt32();
        $msg$$.setValue($field$jscomp$102_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.google.protobuf.Int32Value.serializeBinaryToWriter = function($f$jscomp$46_message$$, $writer$$) {
  $f$jscomp$46_message$$ = $f$jscomp$46_message$$.getValue();
  0 !== $f$jscomp$46_message$$ && $writer$$.writeInt32(1, $f$jscomp$46_message$$);
};
proto.google.protobuf.Int32Value.prototype.getValue = function() {
  return jspb.Message.getFieldWithDefault(this, 1, 0);
};
proto.google.protobuf.Int32Value.prototype.setValue = function($value$$) {
  jspb.Message.setProto3IntField(this, 1, $value$$);
};
proto.google.protobuf.Int32Value.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.google.protobuf.Int32Value, $data$$);
};
jspb.Message.GENERATE_TO_OBJECT && (proto.google.protobuf.UInt32Value.prototype.toObject = function($opt_includeInstance$$) {
  return proto.google.protobuf.UInt32Value.toObject($opt_includeInstance$$, this);
}, proto.google.protobuf.UInt32Value.toObject = function($includeInstance$$, $msg$$) {
  var $obj$$ = {value:jspb.Message.getFieldWithDefault($msg$$, 1, 0)};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.google.protobuf.UInt32Value.deserializeBinary = function($bytes$jscomp$17_reader$$) {
  $bytes$jscomp$17_reader$$ = new jspb.BinaryReader($bytes$jscomp$17_reader$$);
  var $msg$$ = new proto.google.protobuf.UInt32Value;
  return proto.google.protobuf.UInt32Value.deserializeBinaryFromReader($msg$$, $bytes$jscomp$17_reader$$);
};
proto.google.protobuf.UInt32Value.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$103_value$$ = $reader$$.nextField_;
    switch($field$jscomp$103_value$$) {
      case 1:
        $field$jscomp$103_value$$ = $reader$$.readUint32();
        $msg$$.setValue($field$jscomp$103_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.google.protobuf.UInt32Value.serializeBinaryToWriter = function($f$jscomp$48_message$$, $writer$$) {
  $f$jscomp$48_message$$ = $f$jscomp$48_message$$.getValue();
  0 !== $f$jscomp$48_message$$ && $writer$$.writeUint32(1, $f$jscomp$48_message$$);
};
proto.google.protobuf.UInt32Value.prototype.getValue = function() {
  return jspb.Message.getFieldWithDefault(this, 1, 0);
};
proto.google.protobuf.UInt32Value.prototype.setValue = function($value$$) {
  jspb.Message.setProto3IntField(this, 1, $value$$);
};
proto.google.protobuf.UInt32Value.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.google.protobuf.UInt32Value, $data$$);
};
jspb.Message.GENERATE_TO_OBJECT && (proto.google.protobuf.BoolValue.prototype.toObject = function($opt_includeInstance$$) {
  return proto.google.protobuf.BoolValue.toObject($opt_includeInstance$$, this);
}, proto.google.protobuf.BoolValue.toObject = function($includeInstance$$, $msg$$) {
  var $obj$$ = {value:jspb.Message.getFieldWithDefault($msg$$, 1, !1)};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.google.protobuf.BoolValue.deserializeBinary = function($bytes$jscomp$18_reader$$) {
  $bytes$jscomp$18_reader$$ = new jspb.BinaryReader($bytes$jscomp$18_reader$$);
  var $msg$$ = new proto.google.protobuf.BoolValue;
  return proto.google.protobuf.BoolValue.deserializeBinaryFromReader($msg$$, $bytes$jscomp$18_reader$$);
};
proto.google.protobuf.BoolValue.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$104_value$$ = $reader$$.nextField_;
    switch($field$jscomp$104_value$$) {
      case 1:
        $field$jscomp$104_value$$ = $reader$$.readBool();
        $msg$$.setValue($field$jscomp$104_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.google.protobuf.BoolValue.serializeBinaryToWriter = function($f$jscomp$50_message$$, $writer$$) {
  ($f$jscomp$50_message$$ = $f$jscomp$50_message$$.getValue()) && $writer$$.writeBool(1, $f$jscomp$50_message$$);
};
proto.google.protobuf.BoolValue.prototype.getValue = function() {
  return jspb.Message.getFieldWithDefault(this, 1, !1);
};
proto.google.protobuf.BoolValue.prototype.setValue = function($value$$) {
  jspb.Message.setProto3BooleanField(this, 1, $value$$);
};
proto.google.protobuf.BoolValue.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.google.protobuf.BoolValue, $data$$);
};
jspb.Message.GENERATE_TO_OBJECT && (proto.google.protobuf.StringValue.prototype.toObject = function($opt_includeInstance$$) {
  return proto.google.protobuf.StringValue.toObject($opt_includeInstance$$, this);
}, proto.google.protobuf.StringValue.toObject = function($includeInstance$$, $msg$$) {
  var $obj$$ = {value:jspb.Message.getFieldWithDefault($msg$$, 1, "")};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.google.protobuf.StringValue.deserializeBinary = function($bytes$jscomp$19_reader$$) {
  $bytes$jscomp$19_reader$$ = new jspb.BinaryReader($bytes$jscomp$19_reader$$);
  var $msg$$ = new proto.google.protobuf.StringValue;
  return proto.google.protobuf.StringValue.deserializeBinaryFromReader($msg$$, $bytes$jscomp$19_reader$$);
};
proto.google.protobuf.StringValue.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$105_value$$ = $reader$$.nextField_;
    switch($field$jscomp$105_value$$) {
      case 1:
        $field$jscomp$105_value$$ = $reader$$.readString();
        $msg$$.setValue($field$jscomp$105_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.google.protobuf.StringValue.serializeBinaryToWriter = function($f$jscomp$52_message$$, $writer$$) {
  $f$jscomp$52_message$$ = $f$jscomp$52_message$$.getValue();
  0 < $f$jscomp$52_message$$.length && $writer$$.writeString(1, $f$jscomp$52_message$$);
};
proto.google.protobuf.StringValue.prototype.getValue = function() {
  return jspb.Message.getFieldWithDefault(this, 1, "");
};
proto.google.protobuf.StringValue.prototype.setValue = function($value$$) {
  jspb.Message.setProto3StringField(this, 1, $value$$);
};
proto.google.protobuf.StringValue.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.google.protobuf.StringValue, $data$$);
};
jspb.Message.GENERATE_TO_OBJECT && (proto.google.protobuf.BytesValue.prototype.toObject = function($opt_includeInstance$$) {
  return proto.google.protobuf.BytesValue.toObject($opt_includeInstance$$, this);
}, proto.google.protobuf.BytesValue.toObject = function($includeInstance$$, $msg$$) {
  var $obj$$ = {value:$msg$$.getValue_asB64()};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.google.protobuf.BytesValue.deserializeBinary = function($bytes$jscomp$20_reader$$) {
  $bytes$jscomp$20_reader$$ = new jspb.BinaryReader($bytes$jscomp$20_reader$$);
  var $msg$$ = new proto.google.protobuf.BytesValue;
  return proto.google.protobuf.BytesValue.deserializeBinaryFromReader($msg$$, $bytes$jscomp$20_reader$$);
};
proto.google.protobuf.BytesValue.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$106_value$$ = $reader$$.nextField_;
    switch($field$jscomp$106_value$$) {
      case 1:
        $field$jscomp$106_value$$ = $reader$$.readBytes();
        $msg$$.setValue($field$jscomp$106_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.google.protobuf.BytesValue.serializeBinaryToWriter = function($f$jscomp$54_message$$, $writer$$) {
  $f$jscomp$54_message$$ = $f$jscomp$54_message$$.getValue_asU8();
  0 < $f$jscomp$54_message$$.length && $writer$$.writeBytes(1, $f$jscomp$54_message$$);
};
proto.google.protobuf.BytesValue.prototype.getValue = function() {
  return jspb.Message.getFieldWithDefault(this, 1, "");
};
proto.google.protobuf.BytesValue.prototype.getValue_asB64 = function() {
  return jspb.Message.bytesAsB64(this.getValue());
};
proto.google.protobuf.BytesValue.prototype.getValue_asU8 = function() {
  return jspb.Message.bytesAsU8(this.getValue());
};
proto.google.protobuf.BytesValue.prototype.setValue = function($value$$) {
  jspb.Message.setProto3BytesField(this, 1, $value$$);
};
proto.google.protobuf.BytesValue.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.google.protobuf.BytesValue, $data$$);
};
proto.google.type = {};
proto.google.type.Color = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, null, null);
};
goog.inherits(proto.google.type.Color, jspb.Message);
jspb.Message.GENERATE_TO_OBJECT && (proto.google.type.Color.prototype.toObject = function($opt_includeInstance$$) {
  return proto.google.type.Color.toObject($opt_includeInstance$$, this);
}, proto.google.type.Color.toObject = function($includeInstance$$, $msg$$) {
  var $f$$, $obj$$ = {red:+jspb.Message.getFieldWithDefault($msg$$, 1, 0.0), green:+jspb.Message.getFieldWithDefault($msg$$, 2, 0.0), blue:+jspb.Message.getFieldWithDefault($msg$$, 3, 0.0), alpha:($f$$ = $msg$$.getAlpha()) && proto.google.protobuf.FloatValue.toObject($includeInstance$$, $f$$)};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.google.type.Color.deserializeBinary = function($bytes$jscomp$21_reader$$) {
  $bytes$jscomp$21_reader$$ = new jspb.BinaryReader($bytes$jscomp$21_reader$$);
  var $msg$$ = new proto.google.type.Color;
  return proto.google.type.Color.deserializeBinaryFromReader($msg$$, $bytes$jscomp$21_reader$$);
};
proto.google.type.Color.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$107_value$$ = $reader$$.nextField_;
    switch($field$jscomp$107_value$$) {
      case 1:
        $field$jscomp$107_value$$ = $reader$$.readFloat();
        $msg$$.setRed($field$jscomp$107_value$$);
        break;
      case 2:
        $field$jscomp$107_value$$ = $reader$$.readFloat();
        $msg$$.setGreen($field$jscomp$107_value$$);
        break;
      case 3:
        $field$jscomp$107_value$$ = $reader$$.readFloat();
        $msg$$.setBlue($field$jscomp$107_value$$);
        break;
      case 4:
        $field$jscomp$107_value$$ = new proto.google.protobuf.FloatValue;
        $reader$$.readMessage($field$jscomp$107_value$$, proto.google.protobuf.FloatValue.deserializeBinaryFromReader);
        $msg$$.setAlpha($field$jscomp$107_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.google.type.Color.serializeBinaryToWriter = function($message$$, $writer$$) {
  var $f$$ = $message$$.getRed();
  0.0 !== $f$$ && $writer$$.writeFloat(1, $f$$);
  $f$$ = $message$$.getGreen();
  0.0 !== $f$$ && $writer$$.writeFloat(2, $f$$);
  $f$$ = $message$$.getBlue();
  0.0 !== $f$$ && $writer$$.writeFloat(3, $f$$);
  $f$$ = $message$$.getAlpha();
  null != $f$$ && $writer$$.writeMessage(4, $f$$, proto.google.protobuf.FloatValue.serializeBinaryToWriter);
};
proto.google.type.Color.prototype.getRed = function() {
  return +jspb.Message.getFieldWithDefault(this, 1, 0.0);
};
proto.google.type.Color.prototype.setRed = function($value$$) {
  jspb.Message.setProto3FloatField(this, 1, $value$$);
};
proto.google.type.Color.prototype.getGreen = function() {
  return +jspb.Message.getFieldWithDefault(this, 2, 0.0);
};
proto.google.type.Color.prototype.setGreen = function($value$$) {
  jspb.Message.setProto3FloatField(this, 2, $value$$);
};
proto.google.type.Color.prototype.getBlue = function() {
  return +jspb.Message.getFieldWithDefault(this, 3, 0.0);
};
proto.google.type.Color.prototype.setBlue = function($value$$) {
  jspb.Message.setProto3FloatField(this, 3, $value$$);
};
proto.google.type.Color.prototype.getAlpha = function() {
  return jspb.Message.getWrapperField(this, proto.google.protobuf.FloatValue, 4);
};
proto.google.type.Color.prototype.setAlpha = function($value$$) {
  jspb.Message.setWrapperField(this, 4, $value$$);
};
proto.google.type.Color.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.google.type.Color, $data$$);
};
proto.ux = {};
proto.ux.improv = {};
proto.ux.improv.Theme = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, proto.ux.improv.Theme.repeatedFields_, null);
};
goog.inherits(proto.ux.improv.Theme, jspb.Message);
proto.ux.improv.Theme.PaletteColor = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, null, null);
};
goog.inherits(proto.ux.improv.Theme.PaletteColor, jspb.Message);
proto.ux.improv.Theme.TypographyInformation = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, null, null);
};
goog.inherits(proto.ux.improv.Theme.TypographyInformation, jspb.Message);
proto.ux.improv.Theme.CornerRadii = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, proto.ux.improv.Theme.CornerRadii.repeatedFields_, null);
};
goog.inherits(proto.ux.improv.Theme.CornerRadii, jspb.Message);
proto.ux.improv.Theme.repeatedFields_ = [5, 6];
jspb.Message.GENERATE_TO_OBJECT && (proto.ux.improv.Theme.prototype.toObject = function($opt_includeInstance$$) {
  return proto.ux.improv.Theme.toObject($opt_includeInstance$$, this);
}, proto.ux.improv.Theme.toObject = function($includeInstance$$, $msg$$) {
  var $f$$, $obj$$ = {name:jspb.Message.getFieldWithDefault($msg$$, 1, ""), displayName:jspb.Message.getFieldWithDefault($msg$$, 2, ""), themeId:jspb.Message.getFieldWithDefault($msg$$, 3, ""), lastUpdatedTime:($f$$ = $msg$$.getLastUpdatedTime()) && proto.google.protobuf.Timestamp.toObject($includeInstance$$, $f$$), paletteColorsList:jspb.Message.toObjectList($msg$$.getPaletteColorsList(), proto.ux.improv.Theme.PaletteColor.toObject, $includeInstance$$), textOptionsList:jspb.Message.toObjectList($msg$$.getTextOptionsList(), 
  proto.ux.improv.Theme.TypographyInformation.toObject, $includeInstance$$), cornerType:jspb.Message.getFieldWithDefault($msg$$, 7, 0), cornerRadii:($f$$ = $msg$$.getCornerRadii()) && proto.ux.improv.Theme.CornerRadii.toObject($includeInstance$$, $f$$)};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.ux.improv.Theme.deserializeBinary = function($bytes$jscomp$22_reader$$) {
  $bytes$jscomp$22_reader$$ = new jspb.BinaryReader($bytes$jscomp$22_reader$$);
  var $msg$$ = new proto.ux.improv.Theme;
  return proto.ux.improv.Theme.deserializeBinaryFromReader($msg$$, $bytes$jscomp$22_reader$$);
};
proto.ux.improv.Theme.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$108_value$$ = $reader$$.nextField_;
    switch($field$jscomp$108_value$$) {
      case 1:
        $field$jscomp$108_value$$ = $reader$$.readString();
        $msg$$.setName($field$jscomp$108_value$$);
        break;
      case 2:
        $field$jscomp$108_value$$ = $reader$$.readString();
        $msg$$.setDisplayName($field$jscomp$108_value$$);
        break;
      case 3:
        $field$jscomp$108_value$$ = $reader$$.readString();
        $msg$$.setThemeId($field$jscomp$108_value$$);
        break;
      case 4:
        $field$jscomp$108_value$$ = new proto.google.protobuf.Timestamp;
        $reader$$.readMessage($field$jscomp$108_value$$, proto.google.protobuf.Timestamp.deserializeBinaryFromReader);
        $msg$$.setLastUpdatedTime($field$jscomp$108_value$$);
        break;
      case 5:
        $field$jscomp$108_value$$ = new proto.ux.improv.Theme.PaletteColor;
        $reader$$.readMessage($field$jscomp$108_value$$, proto.ux.improv.Theme.PaletteColor.deserializeBinaryFromReader);
        $msg$$.addPaletteColors($field$jscomp$108_value$$);
        break;
      case 6:
        $field$jscomp$108_value$$ = new proto.ux.improv.Theme.TypographyInformation;
        $reader$$.readMessage($field$jscomp$108_value$$, proto.ux.improv.Theme.TypographyInformation.deserializeBinaryFromReader);
        $msg$$.addTextOptions($field$jscomp$108_value$$);
        break;
      case 7:
        $field$jscomp$108_value$$ = $reader$$.readEnum();
        $msg$$.setCornerType($field$jscomp$108_value$$);
        break;
      case 8:
        $field$jscomp$108_value$$ = new proto.ux.improv.Theme.CornerRadii;
        $reader$$.readMessage($field$jscomp$108_value$$, proto.ux.improv.Theme.CornerRadii.deserializeBinaryFromReader);
        $msg$$.setCornerRadii($field$jscomp$108_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.ux.improv.Theme.serializeBinaryToWriter = function($message$$, $writer$$) {
  var $f$$ = $message$$.getName();
  0 < $f$$.length && $writer$$.writeString(1, $f$$);
  $f$$ = $message$$.getDisplayName();
  0 < $f$$.length && $writer$$.writeString(2, $f$$);
  $f$$ = $message$$.getThemeId();
  0 < $f$$.length && $writer$$.writeString(3, $f$$);
  $f$$ = $message$$.getLastUpdatedTime();
  null != $f$$ && $writer$$.writeMessage(4, $f$$, proto.google.protobuf.Timestamp.serializeBinaryToWriter);
  $f$$ = $message$$.getPaletteColorsList();
  0 < $f$$.length && $writer$$.writeRepeatedMessage(5, $f$$, proto.ux.improv.Theme.PaletteColor.serializeBinaryToWriter);
  $f$$ = $message$$.getTextOptionsList();
  0 < $f$$.length && $writer$$.writeRepeatedMessage(6, $f$$, proto.ux.improv.Theme.TypographyInformation.serializeBinaryToWriter);
  $f$$ = $message$$.getCornerType();
  0.0 !== $f$$ && $writer$$.writeEnum(7, $f$$);
  $f$$ = $message$$.getCornerRadii();
  null != $f$$ && $writer$$.writeMessage(8, $f$$, proto.ux.improv.Theme.CornerRadii.serializeBinaryToWriter);
};
proto.ux.improv.Theme.CornerType = {CORNER_TYPE_UNSPECIFIED:0, ROUNDED:1, CUT:2};
jspb.Message.GENERATE_TO_OBJECT && (proto.ux.improv.Theme.PaletteColor.prototype.toObject = function($opt_includeInstance$$) {
  return proto.ux.improv.Theme.PaletteColor.toObject($opt_includeInstance$$, this);
}, proto.ux.improv.Theme.PaletteColor.toObject = function($includeInstance$$, $msg$$) {
  var $f$$, $obj$$ = {label:jspb.Message.getFieldWithDefault($msg$$, 1, ""), type:jspb.Message.getFieldWithDefault($msg$$, 2, 0), color:($f$$ = $msg$$.getColor()) && proto.google.type.Color.toObject($includeInstance$$, $f$$)};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.ux.improv.Theme.PaletteColor.deserializeBinary = function($bytes$jscomp$23_reader$$) {
  $bytes$jscomp$23_reader$$ = new jspb.BinaryReader($bytes$jscomp$23_reader$$);
  var $msg$$ = new proto.ux.improv.Theme.PaletteColor;
  return proto.ux.improv.Theme.PaletteColor.deserializeBinaryFromReader($msg$$, $bytes$jscomp$23_reader$$);
};
proto.ux.improv.Theme.PaletteColor.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$109_value$$ = $reader$$.nextField_;
    switch($field$jscomp$109_value$$) {
      case 1:
        $field$jscomp$109_value$$ = $reader$$.readString();
        $msg$$.setLabel($field$jscomp$109_value$$);
        break;
      case 2:
        $field$jscomp$109_value$$ = $reader$$.readEnum();
        $msg$$.setType($field$jscomp$109_value$$);
        break;
      case 3:
        $field$jscomp$109_value$$ = new proto.google.type.Color;
        $reader$$.readMessage($field$jscomp$109_value$$, proto.google.type.Color.deserializeBinaryFromReader);
        $msg$$.setColor($field$jscomp$109_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.ux.improv.Theme.PaletteColor.serializeBinaryToWriter = function($message$$, $writer$$) {
  var $f$$ = $message$$.getLabel();
  0 < $f$$.length && $writer$$.writeString(1, $f$$);
  $f$$ = $message$$.getType();
  0.0 !== $f$$ && $writer$$.writeEnum(2, $f$$);
  $f$$ = $message$$.getColor();
  null != $f$$ && $writer$$.writeMessage(3, $f$$, proto.google.type.Color.serializeBinaryToWriter);
};
proto.ux.improv.Theme.PaletteColor.PaletteColorType = {COLOR_TYPE_UNSET:0, BACKGROUND:1, PRIMARY:2, PRIMARY_VARIANT:3, ON_PRIMARY:4, SECONDARY:5, SECONDARY_VARIANT:6, ON_SECONDARY:7, SURFACE:8, ON_SURFACE:9, ERROR:10};
proto.ux.improv.Theme.PaletteColor.prototype.getLabel = function() {
  return jspb.Message.getFieldWithDefault(this, 1, "");
};
proto.ux.improv.Theme.PaletteColor.prototype.setLabel = function($value$$) {
  jspb.Message.setProto3StringField(this, 1, $value$$);
};
proto.ux.improv.Theme.PaletteColor.prototype.getType = function() {
  return jspb.Message.getFieldWithDefault(this, 2, 0);
};
proto.ux.improv.Theme.PaletteColor.prototype.setType = function($value$$) {
  jspb.Message.setProto3EnumField(this, 2, $value$$);
};
proto.ux.improv.Theme.PaletteColor.prototype.getColor = function() {
  return jspb.Message.getWrapperField(this, proto.google.type.Color, 3);
};
proto.ux.improv.Theme.PaletteColor.prototype.setColor = function($value$$) {
  jspb.Message.setWrapperField(this, 3, $value$$);
};
proto.ux.improv.Theme.PaletteColor.prototype.clearColor = function() {
  this.setColor(void 0);
};
proto.ux.improv.Theme.PaletteColor.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.ux.improv.Theme.PaletteColor, $data$$);
};
jspb.Message.GENERATE_TO_OBJECT && (proto.ux.improv.Theme.TypographyInformation.prototype.toObject = function($opt_includeInstance$$) {
  return proto.ux.improv.Theme.TypographyInformation.toObject($opt_includeInstance$$, this);
}, proto.ux.improv.Theme.TypographyInformation.toObject = function($includeInstance$$, $msg$$) {
  var $obj$$ = {type:jspb.Message.getFieldWithDefault($msg$$, 1, 0), fontFamilyName:jspb.Message.getFieldWithDefault($msg$$, 2, ""), fontName:jspb.Message.getFieldWithDefault($msg$$, 3, ""), fontWeight:jspb.Message.getFieldWithDefault($msg$$, 4, ""), fontSize:+jspb.Message.getFieldWithDefault($msg$$, 5, 0.0)};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.ux.improv.Theme.TypographyInformation.deserializeBinary = function($bytes$jscomp$24_reader$$) {
  $bytes$jscomp$24_reader$$ = new jspb.BinaryReader($bytes$jscomp$24_reader$$);
  var $msg$$ = new proto.ux.improv.Theme.TypographyInformation;
  return proto.ux.improv.Theme.TypographyInformation.deserializeBinaryFromReader($msg$$, $bytes$jscomp$24_reader$$);
};
proto.ux.improv.Theme.TypographyInformation.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$110_value$$ = $reader$$.nextField_;
    switch($field$jscomp$110_value$$) {
      case 1:
        $field$jscomp$110_value$$ = $reader$$.readEnum();
        $msg$$.setType($field$jscomp$110_value$$);
        break;
      case 2:
        $field$jscomp$110_value$$ = $reader$$.readString();
        $msg$$.setFontFamilyName($field$jscomp$110_value$$);
        break;
      case 3:
        $field$jscomp$110_value$$ = $reader$$.readString();
        $msg$$.setFontName($field$jscomp$110_value$$);
        break;
      case 4:
        $field$jscomp$110_value$$ = $reader$$.readString();
        $msg$$.setFontWeight($field$jscomp$110_value$$);
        break;
      case 5:
        $field$jscomp$110_value$$ = $reader$$.readFloat();
        $msg$$.setFontSize($field$jscomp$110_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.ux.improv.Theme.TypographyInformation.serializeBinaryToWriter = function($message$$, $writer$$) {
  var $f$$ = $message$$.getType();
  0.0 !== $f$$ && $writer$$.writeEnum(1, $f$$);
  $f$$ = $message$$.getFontFamilyName();
  0 < $f$$.length && $writer$$.writeString(2, $f$$);
  $f$$ = $message$$.getFontName();
  0 < $f$$.length && $writer$$.writeString(3, $f$$);
  $f$$ = $message$$.getFontWeight();
  0 < $f$$.length && $writer$$.writeString(4, $f$$);
  $f$$ = $message$$.getFontSize();
  0.0 !== $f$$ && $writer$$.writeFloat(5, $f$$);
};
proto.ux.improv.Theme.TypographyInformation.TextOptionsType = {TEXT_TYPE_UNSET:0, HEADLINE_ONE:1, HEADLINE_TWO:2, HEADLINE_THREE:3, HEADLINE_FOUR:4, HEADLINE_FIVE:5, HEADLINE_SIX:6, BODY_ONE:7, BODY_TWO:8, BUTTON:9, CAPTION:10, OVERLINE:11, SUBTITLE_ONE:12, SUBTITLE_TWO:13};
proto.ux.improv.Theme.TypographyInformation.prototype.getType = function() {
  return jspb.Message.getFieldWithDefault(this, 1, 0);
};
proto.ux.improv.Theme.TypographyInformation.prototype.setType = function($value$$) {
  jspb.Message.setProto3EnumField(this, 1, $value$$);
};
proto.ux.improv.Theme.TypographyInformation.prototype.getFontFamilyName = function() {
  return jspb.Message.getFieldWithDefault(this, 2, "");
};
proto.ux.improv.Theme.TypographyInformation.prototype.setFontFamilyName = function($value$$) {
  jspb.Message.setProto3StringField(this, 2, $value$$);
};
proto.ux.improv.Theme.TypographyInformation.prototype.getFontName = function() {
  return jspb.Message.getFieldWithDefault(this, 3, "");
};
proto.ux.improv.Theme.TypographyInformation.prototype.setFontName = function($value$$) {
  jspb.Message.setProto3StringField(this, 3, $value$$);
};
proto.ux.improv.Theme.TypographyInformation.prototype.getFontWeight = function() {
  return jspb.Message.getFieldWithDefault(this, 4, "");
};
proto.ux.improv.Theme.TypographyInformation.prototype.setFontWeight = function($value$$) {
  jspb.Message.setProto3StringField(this, 4, $value$$);
};
proto.ux.improv.Theme.TypographyInformation.prototype.getFontSize = function() {
  return +jspb.Message.getFieldWithDefault(this, 5, 0.0);
};
proto.ux.improv.Theme.TypographyInformation.prototype.setFontSize = function($value$$) {
  jspb.Message.setProto3FloatField(this, 5, $value$$);
};
proto.ux.improv.Theme.TypographyInformation.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.ux.improv.Theme.TypographyInformation, $data$$);
};
proto.ux.improv.Theme.CornerRadii.repeatedFields_ = [1];
jspb.Message.GENERATE_TO_OBJECT && (proto.ux.improv.Theme.CornerRadii.prototype.toObject = function($opt_includeInstance$$) {
  return proto.ux.improv.Theme.CornerRadii.toObject($opt_includeInstance$$, this);
}, proto.ux.improv.Theme.CornerRadii.toObject = function($includeInstance$$, $msg$$) {
  var $obj$$ = {radiiList:jspb.Message.getRepeatedFloatingPointField($msg$$, 1)};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.ux.improv.Theme.CornerRadii.deserializeBinary = function($bytes$jscomp$25_reader$$) {
  $bytes$jscomp$25_reader$$ = new jspb.BinaryReader($bytes$jscomp$25_reader$$);
  var $msg$$ = new proto.ux.improv.Theme.CornerRadii;
  return proto.ux.improv.Theme.CornerRadii.deserializeBinaryFromReader($msg$$, $bytes$jscomp$25_reader$$);
};
proto.ux.improv.Theme.CornerRadii.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$111_value$$ = $reader$$.nextField_;
    switch($field$jscomp$111_value$$) {
      case 1:
        $field$jscomp$111_value$$ = $reader$$.readPackedFloat();
        $msg$$.setRadiiList($field$jscomp$111_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.ux.improv.Theme.CornerRadii.serializeBinaryToWriter = function($f$jscomp$64_message$$, $writer$$) {
  $f$jscomp$64_message$$ = $f$jscomp$64_message$$.getRadiiList();
  0 < $f$jscomp$64_message$$.length && $writer$$.writePackedFloat(1, $f$jscomp$64_message$$);
};
proto.ux.improv.Theme.CornerRadii.prototype.getRadiiList = function() {
  return jspb.Message.getRepeatedFloatingPointField(this, 1);
};
proto.ux.improv.Theme.CornerRadii.prototype.setRadiiList = function($value$$) {
  jspb.Message.setField(this, 1, $value$$ || []);
};
proto.ux.improv.Theme.CornerRadii.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.ux.improv.Theme.CornerRadii, $data$$);
};
proto.ux.improv.Theme.prototype.getName = function() {
  return jspb.Message.getFieldWithDefault(this, 1, "");
};
proto.ux.improv.Theme.prototype.setName = function($value$$) {
  jspb.Message.setProto3StringField(this, 1, $value$$);
};
proto.ux.improv.Theme.prototype.getDisplayName = function() {
  return jspb.Message.getFieldWithDefault(this, 2, "");
};
proto.ux.improv.Theme.prototype.setDisplayName = function($value$$) {
  jspb.Message.setProto3StringField(this, 2, $value$$);
};
proto.ux.improv.Theme.prototype.getThemeId = function() {
  return jspb.Message.getFieldWithDefault(this, 3, "");
};
proto.ux.improv.Theme.prototype.setThemeId = function($value$$) {
  jspb.Message.setProto3StringField(this, 3, $value$$);
};
proto.ux.improv.Theme.prototype.getLastUpdatedTime = function() {
  return jspb.Message.getWrapperField(this, proto.google.protobuf.Timestamp, 4);
};
proto.ux.improv.Theme.prototype.setLastUpdatedTime = function($value$$) {
  jspb.Message.setWrapperField(this, 4, $value$$);
};
proto.ux.improv.Theme.prototype.getPaletteColorsList = function() {
  return jspb.Message.getRepeatedWrapperField(this, proto.ux.improv.Theme.PaletteColor, 5);
};
proto.ux.improv.Theme.prototype.addPaletteColors = function($opt_value$$, $opt_index$$) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, $opt_value$$, proto.ux.improv.Theme.PaletteColor, $opt_index$$);
};
proto.ux.improv.Theme.prototype.getTextOptionsList = function() {
  return jspb.Message.getRepeatedWrapperField(this, proto.ux.improv.Theme.TypographyInformation, 6);
};
proto.ux.improv.Theme.prototype.addTextOptions = function($opt_value$$, $opt_index$$) {
  return jspb.Message.addToRepeatedWrapperField(this, 6, $opt_value$$, proto.ux.improv.Theme.TypographyInformation, $opt_index$$);
};
proto.ux.improv.Theme.prototype.getCornerType = function() {
  return jspb.Message.getFieldWithDefault(this, 7, 0);
};
proto.ux.improv.Theme.prototype.setCornerType = function($value$$) {
  jspb.Message.setProto3EnumField(this, 7, $value$$);
};
proto.ux.improv.Theme.prototype.getCornerRadii = function() {
  return jspb.Message.getWrapperField(this, proto.ux.improv.Theme.CornerRadii, 8);
};
proto.ux.improv.Theme.prototype.setCornerRadii = function($value$$) {
  jspb.Message.setWrapperField(this, 8, $value$$);
};
proto.ux.improv.Theme.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.ux.improv.Theme, $data$$);
};
proto.ux.improv.ListLayersResponse = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, proto.ux.improv.ListLayersResponse.repeatedFields_, null);
};
goog.inherits(proto.ux.improv.ListLayersResponse, jspb.Message);
proto.ux.improv.Layer = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, proto.ux.improv.Layer.repeatedFields_, null);
};
goog.inherits(proto.ux.improv.Layer, jspb.Message);
proto.ux.improv.Layer.SourceInfo = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, null, null);
};
goog.inherits(proto.ux.improv.Layer.SourceInfo, jspb.Message);
proto.ux.improv.Layer.BoundingBox = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, null, null);
};
goog.inherits(proto.ux.improv.Layer.BoundingBox, jspb.Message);
proto.ux.improv.Property = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, null, proto.ux.improv.Property.oneofGroups_);
};
goog.inherits(proto.ux.improv.Property, jspb.Message);
proto.ux.improv.Property.Aspect = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, null, null);
};
goog.inherits(proto.ux.improv.Property.Aspect, jspb.Message);
proto.ux.improv.Property.Transformations = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, null, null);
};
goog.inherits(proto.ux.improv.Property.Transformations, jspb.Message);
proto.ux.improv.Property.Fill = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, null, null);
};
goog.inherits(proto.ux.improv.Property.Fill, jspb.Message);
proto.ux.improv.Property.Gradient = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, proto.ux.improv.Property.Gradient.repeatedFields_, null);
};
goog.inherits(proto.ux.improv.Property.Gradient, jspb.Message);
proto.ux.improv.Property.Gradient.Stop = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, null, null);
};
goog.inherits(proto.ux.improv.Property.Gradient.Stop, jspb.Message);
proto.ux.improv.Property.Border = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, proto.ux.improv.Property.Border.repeatedFields_, null);
};
goog.inherits(proto.ux.improv.Property.Border, jspb.Message);
proto.ux.improv.Property.Blend = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, null, null);
};
goog.inherits(proto.ux.improv.Property.Blend, jspb.Message);
proto.ux.improv.Property.Blur = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, null, null);
};
goog.inherits(proto.ux.improv.Property.Blur, jspb.Message);
proto.ux.improv.Property.Shadow = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, null, null);
};
goog.inherits(proto.ux.improv.Property.Shadow, jspb.Message);
proto.ux.improv.Property.ColorAdjustment = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, null, null);
};
goog.inherits(proto.ux.improv.Property.ColorAdjustment, jspb.Message);
proto.ux.improv.Property.Text = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, null, null);
};
goog.inherits(proto.ux.improv.Property.Text, jspb.Message);
proto.ux.improv.Property.MaterialData = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, proto.ux.improv.Property.MaterialData.repeatedFields_, null);
};
goog.inherits(proto.ux.improv.Property.MaterialData, jspb.Message);
proto.ux.improv.Property.MaterialData.ThemeColor = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, null, null);
};
goog.inherits(proto.ux.improv.Property.MaterialData.ThemeColor, jspb.Message);
proto.ux.improv.Property.MaterialData.TextArea = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, null, null);
};
goog.inherits(proto.ux.improv.Property.MaterialData.TextArea, jspb.Message);
proto.ux.improv.Property.ArtBoard = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, null, null);
};
goog.inherits(proto.ux.improv.Property.ArtBoard, jspb.Message);
proto.ux.improv.Property.ComponentModifier = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, null, null);
};
goog.inherits(proto.ux.improv.Property.ComponentModifier, jspb.Message);
proto.ux.improv.Property.CornerRadii = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, proto.ux.improv.Property.CornerRadii.repeatedFields_, null);
};
goog.inherits(proto.ux.improv.Property.CornerRadii, jspb.Message);
proto.ux.improv.Property.Position = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, null, null);
};
goog.inherits(proto.ux.improv.Property.Position, jspb.Message);
proto.ux.improv.Property.Icon = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, null, null);
};
goog.inherits(proto.ux.improv.Property.Icon, jspb.Message);
proto.ux.improv.Property.Icon.IconSize = function($opt_data$$) {
  jspb.Message.initialize(this, $opt_data$$, 0, -1, null, null);
};
goog.inherits(proto.ux.improv.Property.Icon.IconSize, jspb.Message);
proto.ux.improv.ListLayersResponse.repeatedFields_ = [1];
jspb.Message.GENERATE_TO_OBJECT && (proto.ux.improv.ListLayersResponse.prototype.toObject = function($opt_includeInstance$$) {
  return proto.ux.improv.ListLayersResponse.toObject($opt_includeInstance$$, this);
}, proto.ux.improv.ListLayersResponse.toObject = function($includeInstance$$, $msg$$) {
  var $obj$$ = {layersList:jspb.Message.toObjectList($msg$$.getLayersList(), proto.ux.improv.Layer.toObject, $includeInstance$$), nextPageToken:jspb.Message.getFieldWithDefault($msg$$, 2, "")};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.ux.improv.ListLayersResponse.deserializeBinary = function($bytes$jscomp$26_reader$$) {
  $bytes$jscomp$26_reader$$ = new jspb.BinaryReader($bytes$jscomp$26_reader$$);
  var $msg$$ = new proto.ux.improv.ListLayersResponse;
  return proto.ux.improv.ListLayersResponse.deserializeBinaryFromReader($msg$$, $bytes$jscomp$26_reader$$);
};
proto.ux.improv.ListLayersResponse.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$112_value$$ = $reader$$.nextField_;
    switch($field$jscomp$112_value$$) {
      case 1:
        $field$jscomp$112_value$$ = new proto.ux.improv.Layer;
        $reader$$.readMessage($field$jscomp$112_value$$, proto.ux.improv.Layer.deserializeBinaryFromReader);
        $msg$$.addLayers($field$jscomp$112_value$$);
        break;
      case 2:
        $field$jscomp$112_value$$ = $reader$$.readString();
        $msg$$.setNextPageToken($field$jscomp$112_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.ux.improv.ListLayersResponse.serializeBinaryToWriter = function($message$$, $writer$$) {
  var $f$$ = $message$$.getLayersList();
  0 < $f$$.length && $writer$$.writeRepeatedMessage(1, $f$$, proto.ux.improv.Layer.serializeBinaryToWriter);
  $f$$ = $message$$.getNextPageToken();
  0 < $f$$.length && $writer$$.writeString(2, $f$$);
};
proto.ux.improv.ListLayersResponse.prototype.getLayersList = function() {
  return jspb.Message.getRepeatedWrapperField(this, proto.ux.improv.Layer, 1);
};
proto.ux.improv.ListLayersResponse.prototype.addLayers = function($opt_value$$, $opt_index$$) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, $opt_value$$, proto.ux.improv.Layer, $opt_index$$);
};
proto.ux.improv.ListLayersResponse.prototype.getNextPageToken = function() {
  return jspb.Message.getFieldWithDefault(this, 2, "");
};
proto.ux.improv.ListLayersResponse.prototype.setNextPageToken = function($value$$) {
  jspb.Message.setProto3StringField(this, 2, $value$$);
};
proto.ux.improv.ListLayersResponse.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.ux.improv.ListLayersResponse, $data$$);
};
proto.ux.improv.Layer.repeatedFields_ = [7];
jspb.Message.GENERATE_TO_OBJECT && (proto.ux.improv.Layer.prototype.toObject = function($opt_includeInstance$$) {
  return proto.ux.improv.Layer.toObject($opt_includeInstance$$, this);
}, proto.ux.improv.Layer.toObject = function($includeInstance$$, $msg$$) {
  var $f$$, $obj$$ = {name:jspb.Message.getFieldWithDefault($msg$$, 1, ""), displayName:jspb.Message.getFieldWithDefault($msg$$, 2, ""), parentName:jspb.Message.getFieldWithDefault($msg$$, 3, ""), sourceInfo:($f$$ = $msg$$.getSourceInfo()) && proto.ux.improv.Layer.SourceInfo.toObject($includeInstance$$, $f$$), type:jspb.Message.getFieldWithDefault($msg$$, 5, 0), boundingBox:($f$$ = $msg$$.getBoundingBox()) && proto.ux.improv.Layer.BoundingBox.toObject($includeInstance$$, $f$$), propertiesList:jspb.Message.toObjectList($msg$$.getPropertiesList(), 
  proto.ux.improv.Property.toObject, $includeInstance$$), lastUpdatedTime:($f$$ = $msg$$.getLastUpdatedTime()) && proto.google.protobuf.Timestamp.toObject($includeInstance$$, $f$$), theme:($f$$ = $msg$$.getTheme()) && proto.ux.improv.Theme.toObject($includeInstance$$, $f$$)};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.ux.improv.Layer.deserializeBinary = function($bytes$jscomp$27_reader$$) {
  $bytes$jscomp$27_reader$$ = new jspb.BinaryReader($bytes$jscomp$27_reader$$);
  var $msg$$ = new proto.ux.improv.Layer;
  return proto.ux.improv.Layer.deserializeBinaryFromReader($msg$$, $bytes$jscomp$27_reader$$);
};
proto.ux.improv.Layer.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$113_value$$ = $reader$$.nextField_;
    switch($field$jscomp$113_value$$) {
      case 1:
        $field$jscomp$113_value$$ = $reader$$.readString();
        $msg$$.setName($field$jscomp$113_value$$);
        break;
      case 2:
        $field$jscomp$113_value$$ = $reader$$.readString();
        $msg$$.setDisplayName($field$jscomp$113_value$$);
        break;
      case 3:
        $field$jscomp$113_value$$ = $reader$$.readString();
        $msg$$.setParentName($field$jscomp$113_value$$);
        break;
      case 4:
        $field$jscomp$113_value$$ = new proto.ux.improv.Layer.SourceInfo;
        $reader$$.readMessage($field$jscomp$113_value$$, proto.ux.improv.Layer.SourceInfo.deserializeBinaryFromReader);
        $msg$$.setSourceInfo($field$jscomp$113_value$$);
        break;
      case 5:
        $field$jscomp$113_value$$ = $reader$$.readEnum();
        $msg$$.setType($field$jscomp$113_value$$);
        break;
      case 6:
        $field$jscomp$113_value$$ = new proto.ux.improv.Layer.BoundingBox;
        $reader$$.readMessage($field$jscomp$113_value$$, proto.ux.improv.Layer.BoundingBox.deserializeBinaryFromReader);
        $msg$$.setBoundingBox($field$jscomp$113_value$$);
        break;
      case 7:
        $field$jscomp$113_value$$ = new proto.ux.improv.Property;
        $reader$$.readMessage($field$jscomp$113_value$$, proto.ux.improv.Property.deserializeBinaryFromReader);
        $msg$$.addProperties($field$jscomp$113_value$$);
        break;
      case 8:
        $field$jscomp$113_value$$ = new proto.google.protobuf.Timestamp;
        $reader$$.readMessage($field$jscomp$113_value$$, proto.google.protobuf.Timestamp.deserializeBinaryFromReader);
        $msg$$.setLastUpdatedTime($field$jscomp$113_value$$);
        break;
      case 9:
        $field$jscomp$113_value$$ = new proto.ux.improv.Theme;
        $reader$$.readMessage($field$jscomp$113_value$$, proto.ux.improv.Theme.deserializeBinaryFromReader);
        $msg$$.setTheme($field$jscomp$113_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.ux.improv.Layer.serializeBinaryToWriter = function($message$$, $writer$$) {
  var $f$$ = $message$$.getName();
  0 < $f$$.length && $writer$$.writeString(1, $f$$);
  $f$$ = $message$$.getDisplayName();
  0 < $f$$.length && $writer$$.writeString(2, $f$$);
  $f$$ = $message$$.getParentName();
  0 < $f$$.length && $writer$$.writeString(3, $f$$);
  $f$$ = $message$$.getSourceInfo();
  null != $f$$ && $writer$$.writeMessage(4, $f$$, proto.ux.improv.Layer.SourceInfo.serializeBinaryToWriter);
  $f$$ = $message$$.getType();
  0.0 !== $f$$ && $writer$$.writeEnum(5, $f$$);
  $f$$ = $message$$.getBoundingBox();
  null != $f$$ && $writer$$.writeMessage(6, $f$$, proto.ux.improv.Layer.BoundingBox.serializeBinaryToWriter);
  $f$$ = $message$$.getPropertiesList();
  0 < $f$$.length && $writer$$.writeRepeatedMessage(7, $f$$, proto.ux.improv.Property.serializeBinaryToWriter);
  $f$$ = $message$$.getLastUpdatedTime();
  null != $f$$ && $writer$$.writeMessage(8, $f$$, proto.google.protobuf.Timestamp.serializeBinaryToWriter);
  $f$$ = $message$$.getTheme();
  null != $f$$ && $writer$$.writeMessage(9, $f$$, proto.ux.improv.Theme.serializeBinaryToWriter);
};
proto.ux.improv.Layer.LayerType = {LAYER_TYPE_UNSPECIFIED:0, ART_BOARD:1, GM_COMPONENT:2, MATERIAL_COMPONENT:3, BASIC_COMPONENT:4, GROUP:5, SHAPE:6, TEXT:7, BITMAP:8, MATERIAL_ICON:9};
jspb.Message.GENERATE_TO_OBJECT && (proto.ux.improv.Layer.SourceInfo.prototype.toObject = function($opt_includeInstance$$) {
  return proto.ux.improv.Layer.SourceInfo.toObject($opt_includeInstance$$, this);
}, proto.ux.improv.Layer.SourceInfo.toObject = function($includeInstance$$, $msg$$) {
  var $obj$$ = {id:jspb.Message.getFieldWithDefault($msg$$, 1, ""), parentId:jspb.Message.getFieldWithDefault($msg$$, 2, ""), isLocked:jspb.Message.getFieldWithDefault($msg$$, 3, !1), sourceApplication:jspb.Message.getFieldWithDefault($msg$$, 4, 0)};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.ux.improv.Layer.SourceInfo.deserializeBinary = function($bytes$jscomp$28_reader$$) {
  $bytes$jscomp$28_reader$$ = new jspb.BinaryReader($bytes$jscomp$28_reader$$);
  var $msg$$ = new proto.ux.improv.Layer.SourceInfo;
  return proto.ux.improv.Layer.SourceInfo.deserializeBinaryFromReader($msg$$, $bytes$jscomp$28_reader$$);
};
proto.ux.improv.Layer.SourceInfo.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$114_value$$ = $reader$$.nextField_;
    switch($field$jscomp$114_value$$) {
      case 1:
        $field$jscomp$114_value$$ = $reader$$.readString();
        $msg$$.setId($field$jscomp$114_value$$);
        break;
      case 2:
        $field$jscomp$114_value$$ = $reader$$.readString();
        $msg$$.setParentId($field$jscomp$114_value$$);
        break;
      case 3:
        $field$jscomp$114_value$$ = $reader$$.readBool();
        $msg$$.setIsLocked($field$jscomp$114_value$$);
        break;
      case 4:
        $field$jscomp$114_value$$ = $reader$$.readEnum();
        $msg$$.setSourceApplication($field$jscomp$114_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.ux.improv.Layer.SourceInfo.serializeBinaryToWriter = function($message$$, $writer$$) {
  var $f$$ = $message$$.getId();
  0 < $f$$.length && $writer$$.writeString(1, $f$$);
  $f$$ = $message$$.getParentId();
  0 < $f$$.length && $writer$$.writeString(2, $f$$);
  ($f$$ = $message$$.getIsLocked()) && $writer$$.writeBool(3, $f$$);
  $f$$ = $message$$.getSourceApplication();
  0.0 !== $f$$ && $writer$$.writeEnum(4, $f$$);
};
proto.ux.improv.Layer.SourceInfo.SourceApplication = {SOURCE_APPLICATION_UNSPECIFIED:0, SKETCH:1};
proto.ux.improv.Layer.SourceInfo.prototype.getId = function() {
  return jspb.Message.getFieldWithDefault(this, 1, "");
};
proto.ux.improv.Layer.SourceInfo.prototype.setId = function($value$$) {
  jspb.Message.setProto3StringField(this, 1, $value$$);
};
proto.ux.improv.Layer.SourceInfo.prototype.getParentId = function() {
  return jspb.Message.getFieldWithDefault(this, 2, "");
};
proto.ux.improv.Layer.SourceInfo.prototype.setParentId = function($value$$) {
  jspb.Message.setProto3StringField(this, 2, $value$$);
};
proto.ux.improv.Layer.SourceInfo.prototype.getIsLocked = function() {
  return jspb.Message.getFieldWithDefault(this, 3, !1);
};
proto.ux.improv.Layer.SourceInfo.prototype.setIsLocked = function($value$$) {
  jspb.Message.setProto3BooleanField(this, 3, $value$$);
};
proto.ux.improv.Layer.SourceInfo.prototype.getSourceApplication = function() {
  return jspb.Message.getFieldWithDefault(this, 4, 0);
};
proto.ux.improv.Layer.SourceInfo.prototype.setSourceApplication = function($value$$) {
  jspb.Message.setProto3EnumField(this, 4, $value$$);
};
proto.ux.improv.Layer.SourceInfo.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.ux.improv.Layer.SourceInfo, $data$$);
};
jspb.Message.GENERATE_TO_OBJECT && (proto.ux.improv.Layer.BoundingBox.prototype.toObject = function($opt_includeInstance$$) {
  return proto.ux.improv.Layer.BoundingBox.toObject($opt_includeInstance$$, this);
}, proto.ux.improv.Layer.BoundingBox.toObject = function($includeInstance$$, $msg$$) {
  var $obj$$ = {minX:jspb.Message.getFieldWithDefault($msg$$, 1, 0), minY:jspb.Message.getFieldWithDefault($msg$$, 2, 0), maxX:jspb.Message.getFieldWithDefault($msg$$, 3, 0), maxY:jspb.Message.getFieldWithDefault($msg$$, 4, 0)};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.ux.improv.Layer.BoundingBox.deserializeBinary = function($bytes$jscomp$29_reader$$) {
  $bytes$jscomp$29_reader$$ = new jspb.BinaryReader($bytes$jscomp$29_reader$$);
  var $msg$$ = new proto.ux.improv.Layer.BoundingBox;
  return proto.ux.improv.Layer.BoundingBox.deserializeBinaryFromReader($msg$$, $bytes$jscomp$29_reader$$);
};
proto.ux.improv.Layer.BoundingBox.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$115_value$$ = $reader$$.nextField_;
    switch($field$jscomp$115_value$$) {
      case 1:
        $field$jscomp$115_value$$ = $reader$$.readInt32();
        $msg$$.setMinX($field$jscomp$115_value$$);
        break;
      case 2:
        $field$jscomp$115_value$$ = $reader$$.readInt32();
        $msg$$.setMinY($field$jscomp$115_value$$);
        break;
      case 3:
        $field$jscomp$115_value$$ = $reader$$.readInt32();
        $msg$$.setMaxX($field$jscomp$115_value$$);
        break;
      case 4:
        $field$jscomp$115_value$$ = $reader$$.readInt32();
        $msg$$.setMaxY($field$jscomp$115_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.ux.improv.Layer.BoundingBox.serializeBinaryToWriter = function($message$$, $writer$$) {
  var $f$$ = $message$$.getMinX();
  0 !== $f$$ && $writer$$.writeInt32(1, $f$$);
  $f$$ = $message$$.getMinY();
  0 !== $f$$ && $writer$$.writeInt32(2, $f$$);
  $f$$ = $message$$.getMaxX();
  0 !== $f$$ && $writer$$.writeInt32(3, $f$$);
  $f$$ = $message$$.getMaxY();
  0 !== $f$$ && $writer$$.writeInt32(4, $f$$);
};
proto.ux.improv.Layer.BoundingBox.prototype.getMinX = function() {
  return jspb.Message.getFieldWithDefault(this, 1, 0);
};
proto.ux.improv.Layer.BoundingBox.prototype.setMinX = function($value$$) {
  jspb.Message.setProto3IntField(this, 1, $value$$);
};
proto.ux.improv.Layer.BoundingBox.prototype.getMinY = function() {
  return jspb.Message.getFieldWithDefault(this, 2, 0);
};
proto.ux.improv.Layer.BoundingBox.prototype.setMinY = function($value$$) {
  jspb.Message.setProto3IntField(this, 2, $value$$);
};
proto.ux.improv.Layer.BoundingBox.prototype.getMaxX = function() {
  return jspb.Message.getFieldWithDefault(this, 3, 0);
};
proto.ux.improv.Layer.BoundingBox.prototype.setMaxX = function($value$$) {
  jspb.Message.setProto3IntField(this, 3, $value$$);
};
proto.ux.improv.Layer.BoundingBox.prototype.getMaxY = function() {
  return jspb.Message.getFieldWithDefault(this, 4, 0);
};
proto.ux.improv.Layer.BoundingBox.prototype.setMaxY = function($value$$) {
  jspb.Message.setProto3IntField(this, 4, $value$$);
};
proto.ux.improv.Layer.BoundingBox.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.ux.improv.Layer.BoundingBox, $data$$);
};
proto.ux.improv.Layer.prototype.getName = function() {
  return jspb.Message.getFieldWithDefault(this, 1, "");
};
proto.ux.improv.Layer.prototype.setName = function($value$$) {
  jspb.Message.setProto3StringField(this, 1, $value$$);
};
proto.ux.improv.Layer.prototype.getDisplayName = function() {
  return jspb.Message.getFieldWithDefault(this, 2, "");
};
proto.ux.improv.Layer.prototype.setDisplayName = function($value$$) {
  jspb.Message.setProto3StringField(this, 2, $value$$);
};
proto.ux.improv.Layer.prototype.getParentName = function() {
  return jspb.Message.getFieldWithDefault(this, 3, "");
};
proto.ux.improv.Layer.prototype.setParentName = function($value$$) {
  jspb.Message.setProto3StringField(this, 3, $value$$);
};
proto.ux.improv.Layer.prototype.getSourceInfo = function() {
  return jspb.Message.getWrapperField(this, proto.ux.improv.Layer.SourceInfo, 4);
};
proto.ux.improv.Layer.prototype.setSourceInfo = function($value$$) {
  jspb.Message.setWrapperField(this, 4, $value$$);
};
proto.ux.improv.Layer.prototype.getType = function() {
  return jspb.Message.getFieldWithDefault(this, 5, 0);
};
proto.ux.improv.Layer.prototype.setType = function($value$$) {
  jspb.Message.setProto3EnumField(this, 5, $value$$);
};
proto.ux.improv.Layer.prototype.getBoundingBox = function() {
  return jspb.Message.getWrapperField(this, proto.ux.improv.Layer.BoundingBox, 6);
};
proto.ux.improv.Layer.prototype.setBoundingBox = function($value$$) {
  jspb.Message.setWrapperField(this, 6, $value$$);
};
proto.ux.improv.Layer.prototype.getPropertiesList = function() {
  return jspb.Message.getRepeatedWrapperField(this, proto.ux.improv.Property, 7);
};
proto.ux.improv.Layer.prototype.addProperties = function($opt_value$$, $opt_index$$) {
  return jspb.Message.addToRepeatedWrapperField(this, 7, $opt_value$$, proto.ux.improv.Property, $opt_index$$);
};
proto.ux.improv.Layer.prototype.getLastUpdatedTime = function() {
  return jspb.Message.getWrapperField(this, proto.google.protobuf.Timestamp, 8);
};
proto.ux.improv.Layer.prototype.setLastUpdatedTime = function($value$$) {
  jspb.Message.setWrapperField(this, 8, $value$$);
};
proto.ux.improv.Layer.prototype.getTheme = function() {
  return jspb.Message.getWrapperField(this, proto.ux.improv.Theme, 9);
};
proto.ux.improv.Layer.prototype.setTheme = function($value$$) {
  jspb.Message.setWrapperField(this, 9, $value$$);
};
proto.ux.improv.Layer.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.ux.improv.Layer, $data$$);
};
proto.ux.improv.Property.oneofGroups_ = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]];
proto.ux.improv.Property.PropertyTypeCase = {PROPERTY_TYPE_NOT_SET:0, ASPECT:1, TRANSFORMATIONS:2, FILL:3, BORDER:4, BLEND:5, BLUR:6, SHADOW:7, COLOR_ADJUSTMENT:8, TEXT:9, MATERIAL_DATA:10, ART_BOARD:11, COMPONENT_MODIFIER:12, CORNER_RADII:13, ICON:14};
jspb.Message.GENERATE_TO_OBJECT && (proto.ux.improv.Property.prototype.toObject = function($opt_includeInstance$$) {
  return proto.ux.improv.Property.toObject($opt_includeInstance$$, this);
}, proto.ux.improv.Property.toObject = function($includeInstance$$, $msg$$) {
  var $f$$, $obj$$ = {aspect:($f$$ = $msg$$.getAspect()) && proto.ux.improv.Property.Aspect.toObject($includeInstance$$, $f$$), transformations:($f$$ = $msg$$.getTransformations()) && proto.ux.improv.Property.Transformations.toObject($includeInstance$$, $f$$), fill:($f$$ = $msg$$.getFill()) && proto.ux.improv.Property.Fill.toObject($includeInstance$$, $f$$), border:($f$$ = $msg$$.getBorder()) && proto.ux.improv.Property.Border.toObject($includeInstance$$, $f$$), blend:($f$$ = $msg$$.getBlend()) && 
  proto.ux.improv.Property.Blend.toObject($includeInstance$$, $f$$), blur:($f$$ = $msg$$.getBlur()) && proto.ux.improv.Property.Blur.toObject($includeInstance$$, $f$$), shadow:($f$$ = $msg$$.getShadow()) && proto.ux.improv.Property.Shadow.toObject($includeInstance$$, $f$$), colorAdjustment:($f$$ = $msg$$.getColorAdjustment()) && proto.ux.improv.Property.ColorAdjustment.toObject($includeInstance$$, $f$$), text:($f$$ = $msg$$.getText()) && proto.ux.improv.Property.Text.toObject($includeInstance$$, 
  $f$$), materialData:($f$$ = $msg$$.getMaterialData()) && proto.ux.improv.Property.MaterialData.toObject($includeInstance$$, $f$$), artBoard:($f$$ = $msg$$.getArtBoard()) && proto.ux.improv.Property.ArtBoard.toObject($includeInstance$$, $f$$), componentModifier:($f$$ = $msg$$.getComponentModifier()) && proto.ux.improv.Property.ComponentModifier.toObject($includeInstance$$, $f$$), cornerRadii:($f$$ = $msg$$.getCornerRadii()) && proto.ux.improv.Property.CornerRadii.toObject($includeInstance$$, $f$$), 
  icon:($f$$ = $msg$$.getIcon()) && proto.ux.improv.Property.Icon.toObject($includeInstance$$, $f$$)};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.ux.improv.Property.deserializeBinary = function($bytes$jscomp$30_reader$$) {
  $bytes$jscomp$30_reader$$ = new jspb.BinaryReader($bytes$jscomp$30_reader$$);
  var $msg$$ = new proto.ux.improv.Property;
  return proto.ux.improv.Property.deserializeBinaryFromReader($msg$$, $bytes$jscomp$30_reader$$);
};
proto.ux.improv.Property.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$116_value$$ = $reader$$.nextField_;
    switch($field$jscomp$116_value$$) {
      case 1:
        $field$jscomp$116_value$$ = new proto.ux.improv.Property.Aspect;
        $reader$$.readMessage($field$jscomp$116_value$$, proto.ux.improv.Property.Aspect.deserializeBinaryFromReader);
        $msg$$.setAspect($field$jscomp$116_value$$);
        break;
      case 2:
        $field$jscomp$116_value$$ = new proto.ux.improv.Property.Transformations;
        $reader$$.readMessage($field$jscomp$116_value$$, proto.ux.improv.Property.Transformations.deserializeBinaryFromReader);
        $msg$$.setTransformations($field$jscomp$116_value$$);
        break;
      case 3:
        $field$jscomp$116_value$$ = new proto.ux.improv.Property.Fill;
        $reader$$.readMessage($field$jscomp$116_value$$, proto.ux.improv.Property.Fill.deserializeBinaryFromReader);
        $msg$$.setFill($field$jscomp$116_value$$);
        break;
      case 4:
        $field$jscomp$116_value$$ = new proto.ux.improv.Property.Border;
        $reader$$.readMessage($field$jscomp$116_value$$, proto.ux.improv.Property.Border.deserializeBinaryFromReader);
        $msg$$.setBorder($field$jscomp$116_value$$);
        break;
      case 5:
        $field$jscomp$116_value$$ = new proto.ux.improv.Property.Blend;
        $reader$$.readMessage($field$jscomp$116_value$$, proto.ux.improv.Property.Blend.deserializeBinaryFromReader);
        $msg$$.setBlend($field$jscomp$116_value$$);
        break;
      case 6:
        $field$jscomp$116_value$$ = new proto.ux.improv.Property.Blur;
        $reader$$.readMessage($field$jscomp$116_value$$, proto.ux.improv.Property.Blur.deserializeBinaryFromReader);
        $msg$$.setBlur($field$jscomp$116_value$$);
        break;
      case 7:
        $field$jscomp$116_value$$ = new proto.ux.improv.Property.Shadow;
        $reader$$.readMessage($field$jscomp$116_value$$, proto.ux.improv.Property.Shadow.deserializeBinaryFromReader);
        $msg$$.setShadow($field$jscomp$116_value$$);
        break;
      case 8:
        $field$jscomp$116_value$$ = new proto.ux.improv.Property.ColorAdjustment;
        $reader$$.readMessage($field$jscomp$116_value$$, proto.ux.improv.Property.ColorAdjustment.deserializeBinaryFromReader);
        $msg$$.setColorAdjustment($field$jscomp$116_value$$);
        break;
      case 9:
        $field$jscomp$116_value$$ = new proto.ux.improv.Property.Text;
        $reader$$.readMessage($field$jscomp$116_value$$, proto.ux.improv.Property.Text.deserializeBinaryFromReader);
        $msg$$.setText($field$jscomp$116_value$$);
        break;
      case 10:
        $field$jscomp$116_value$$ = new proto.ux.improv.Property.MaterialData;
        $reader$$.readMessage($field$jscomp$116_value$$, proto.ux.improv.Property.MaterialData.deserializeBinaryFromReader);
        $msg$$.setMaterialData($field$jscomp$116_value$$);
        break;
      case 11:
        $field$jscomp$116_value$$ = new proto.ux.improv.Property.ArtBoard;
        $reader$$.readMessage($field$jscomp$116_value$$, proto.ux.improv.Property.ArtBoard.deserializeBinaryFromReader);
        $msg$$.setArtBoard($field$jscomp$116_value$$);
        break;
      case 12:
        $field$jscomp$116_value$$ = new proto.ux.improv.Property.ComponentModifier;
        $reader$$.readMessage($field$jscomp$116_value$$, proto.ux.improv.Property.ComponentModifier.deserializeBinaryFromReader);
        $msg$$.setComponentModifier($field$jscomp$116_value$$);
        break;
      case 13:
        $field$jscomp$116_value$$ = new proto.ux.improv.Property.CornerRadii;
        $reader$$.readMessage($field$jscomp$116_value$$, proto.ux.improv.Property.CornerRadii.deserializeBinaryFromReader);
        $msg$$.setCornerRadii($field$jscomp$116_value$$);
        break;
      case 14:
        $field$jscomp$116_value$$ = new proto.ux.improv.Property.Icon;
        $reader$$.readMessage($field$jscomp$116_value$$, proto.ux.improv.Property.Icon.deserializeBinaryFromReader);
        $msg$$.setIcon($field$jscomp$116_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.ux.improv.Property.serializeBinaryToWriter = function($message$$, $writer$$) {
  var $f$$ = $message$$.getAspect();
  null != $f$$ && $writer$$.writeMessage(1, $f$$, proto.ux.improv.Property.Aspect.serializeBinaryToWriter);
  $f$$ = $message$$.getTransformations();
  null != $f$$ && $writer$$.writeMessage(2, $f$$, proto.ux.improv.Property.Transformations.serializeBinaryToWriter);
  $f$$ = $message$$.getFill();
  null != $f$$ && $writer$$.writeMessage(3, $f$$, proto.ux.improv.Property.Fill.serializeBinaryToWriter);
  $f$$ = $message$$.getBorder();
  null != $f$$ && $writer$$.writeMessage(4, $f$$, proto.ux.improv.Property.Border.serializeBinaryToWriter);
  $f$$ = $message$$.getBlend();
  null != $f$$ && $writer$$.writeMessage(5, $f$$, proto.ux.improv.Property.Blend.serializeBinaryToWriter);
  $f$$ = $message$$.getBlur();
  null != $f$$ && $writer$$.writeMessage(6, $f$$, proto.ux.improv.Property.Blur.serializeBinaryToWriter);
  $f$$ = $message$$.getShadow();
  null != $f$$ && $writer$$.writeMessage(7, $f$$, proto.ux.improv.Property.Shadow.serializeBinaryToWriter);
  $f$$ = $message$$.getColorAdjustment();
  null != $f$$ && $writer$$.writeMessage(8, $f$$, proto.ux.improv.Property.ColorAdjustment.serializeBinaryToWriter);
  $f$$ = $message$$.getText();
  null != $f$$ && $writer$$.writeMessage(9, $f$$, proto.ux.improv.Property.Text.serializeBinaryToWriter);
  $f$$ = $message$$.getMaterialData();
  null != $f$$ && $writer$$.writeMessage(10, $f$$, proto.ux.improv.Property.MaterialData.serializeBinaryToWriter);
  $f$$ = $message$$.getArtBoard();
  null != $f$$ && $writer$$.writeMessage(11, $f$$, proto.ux.improv.Property.ArtBoard.serializeBinaryToWriter);
  $f$$ = $message$$.getComponentModifier();
  null != $f$$ && $writer$$.writeMessage(12, $f$$, proto.ux.improv.Property.ComponentModifier.serializeBinaryToWriter);
  $f$$ = $message$$.getCornerRadii();
  null != $f$$ && $writer$$.writeMessage(13, $f$$, proto.ux.improv.Property.CornerRadii.serializeBinaryToWriter);
  $f$$ = $message$$.getIcon();
  null != $f$$ && $writer$$.writeMessage(14, $f$$, proto.ux.improv.Property.Icon.serializeBinaryToWriter);
};
jspb.Message.GENERATE_TO_OBJECT && (proto.ux.improv.Property.Aspect.prototype.toObject = function($opt_includeInstance$$) {
  return proto.ux.improv.Property.Aspect.toObject($opt_includeInstance$$, this);
}, proto.ux.improv.Property.Aspect.toObject = function($includeInstance$$, $msg$$) {
  var $obj$$ = {isFixedWidth:jspb.Message.getFieldWithDefault($msg$$, 1, !1), isFixedHeight:jspb.Message.getFieldWithDefault($msg$$, 2, !1)};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.ux.improv.Property.Aspect.deserializeBinary = function($bytes$jscomp$31_reader$$) {
  $bytes$jscomp$31_reader$$ = new jspb.BinaryReader($bytes$jscomp$31_reader$$);
  var $msg$$ = new proto.ux.improv.Property.Aspect;
  return proto.ux.improv.Property.Aspect.deserializeBinaryFromReader($msg$$, $bytes$jscomp$31_reader$$);
};
proto.ux.improv.Property.Aspect.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$117_value$$ = $reader$$.nextField_;
    switch($field$jscomp$117_value$$) {
      case 1:
        $field$jscomp$117_value$$ = $reader$$.readBool();
        $msg$$.setIsFixedWidth($field$jscomp$117_value$$);
        break;
      case 2:
        $field$jscomp$117_value$$ = $reader$$.readBool();
        $msg$$.setIsFixedHeight($field$jscomp$117_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.ux.improv.Property.Aspect.serializeBinaryToWriter = function($message$$, $writer$$) {
  var $f$$;
  ($f$$ = $message$$.getIsFixedWidth()) && $writer$$.writeBool(1, $f$$);
  ($f$$ = $message$$.getIsFixedHeight()) && $writer$$.writeBool(2, $f$$);
};
proto.ux.improv.Property.Aspect.prototype.getIsFixedWidth = function() {
  return jspb.Message.getFieldWithDefault(this, 1, !1);
};
proto.ux.improv.Property.Aspect.prototype.setIsFixedWidth = function($value$$) {
  jspb.Message.setProto3BooleanField(this, 1, $value$$);
};
proto.ux.improv.Property.Aspect.prototype.getIsFixedHeight = function() {
  return jspb.Message.getFieldWithDefault(this, 2, !1);
};
proto.ux.improv.Property.Aspect.prototype.setIsFixedHeight = function($value$$) {
  jspb.Message.setProto3BooleanField(this, 2, $value$$);
};
proto.ux.improv.Property.Aspect.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.ux.improv.Property.Aspect, $data$$);
};
jspb.Message.GENERATE_TO_OBJECT && (proto.ux.improv.Property.Transformations.prototype.toObject = function($opt_includeInstance$$) {
  return proto.ux.improv.Property.Transformations.toObject($opt_includeInstance$$, this);
}, proto.ux.improv.Property.Transformations.toObject = function($includeInstance$$, $msg$$) {
  var $obj$$ = {rotation:+jspb.Message.getFieldWithDefault($msg$$, 1, 0.0), isFlippedHorizontal:jspb.Message.getFieldWithDefault($msg$$, 2, !1), isFlippedVertical:jspb.Message.getFieldWithDefault($msg$$, 3, !1)};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.ux.improv.Property.Transformations.deserializeBinary = function($bytes$jscomp$32_reader$$) {
  $bytes$jscomp$32_reader$$ = new jspb.BinaryReader($bytes$jscomp$32_reader$$);
  var $msg$$ = new proto.ux.improv.Property.Transformations;
  return proto.ux.improv.Property.Transformations.deserializeBinaryFromReader($msg$$, $bytes$jscomp$32_reader$$);
};
proto.ux.improv.Property.Transformations.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$118_value$$ = $reader$$.nextField_;
    switch($field$jscomp$118_value$$) {
      case 1:
        $field$jscomp$118_value$$ = $reader$$.readFloat();
        $msg$$.setRotation($field$jscomp$118_value$$);
        break;
      case 2:
        $field$jscomp$118_value$$ = $reader$$.readBool();
        $msg$$.setIsFlippedHorizontal($field$jscomp$118_value$$);
        break;
      case 3:
        $field$jscomp$118_value$$ = $reader$$.readBool();
        $msg$$.setIsFlippedVertical($field$jscomp$118_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.ux.improv.Property.Transformations.serializeBinaryToWriter = function($message$$, $writer$$) {
  var $f$$ = $message$$.getRotation();
  0.0 !== $f$$ && $writer$$.writeFloat(1, $f$$);
  ($f$$ = $message$$.getIsFlippedHorizontal()) && $writer$$.writeBool(2, $f$$);
  ($f$$ = $message$$.getIsFlippedVertical()) && $writer$$.writeBool(3, $f$$);
};
proto.ux.improv.Property.Transformations.prototype.getRotation = function() {
  return +jspb.Message.getFieldWithDefault(this, 1, 0.0);
};
proto.ux.improv.Property.Transformations.prototype.setRotation = function($value$$) {
  jspb.Message.setProto3FloatField(this, 1, $value$$);
};
proto.ux.improv.Property.Transformations.prototype.getIsFlippedHorizontal = function() {
  return jspb.Message.getFieldWithDefault(this, 2, !1);
};
proto.ux.improv.Property.Transformations.prototype.setIsFlippedHorizontal = function($value$$) {
  jspb.Message.setProto3BooleanField(this, 2, $value$$);
};
proto.ux.improv.Property.Transformations.prototype.getIsFlippedVertical = function() {
  return jspb.Message.getFieldWithDefault(this, 3, !1);
};
proto.ux.improv.Property.Transformations.prototype.setIsFlippedVertical = function($value$$) {
  jspb.Message.setProto3BooleanField(this, 3, $value$$);
};
proto.ux.improv.Property.Transformations.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.ux.improv.Property.Transformations, $data$$);
};
jspb.Message.GENERATE_TO_OBJECT && (proto.ux.improv.Property.Fill.prototype.toObject = function($opt_includeInstance$$) {
  return proto.ux.improv.Property.Fill.toObject($opt_includeInstance$$, this);
}, proto.ux.improv.Property.Fill.toObject = function($includeInstance$$, $msg$$) {
  var $f$$, $obj$$ = {type:jspb.Message.getFieldWithDefault($msg$$, 1, 0), blend:($f$$ = $msg$$.getBlend()) && proto.ux.improv.Property.Blend.toObject($includeInstance$$, $f$$), color:($f$$ = $msg$$.getColor()) && proto.google.type.Color.toObject($includeInstance$$, $f$$), gradient:($f$$ = $msg$$.getGradient()) && proto.ux.improv.Property.Gradient.toObject($includeInstance$$, $f$$)};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.ux.improv.Property.Fill.deserializeBinary = function($bytes$jscomp$33_reader$$) {
  $bytes$jscomp$33_reader$$ = new jspb.BinaryReader($bytes$jscomp$33_reader$$);
  var $msg$$ = new proto.ux.improv.Property.Fill;
  return proto.ux.improv.Property.Fill.deserializeBinaryFromReader($msg$$, $bytes$jscomp$33_reader$$);
};
proto.ux.improv.Property.Fill.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$119_value$$ = $reader$$.nextField_;
    switch($field$jscomp$119_value$$) {
      case 1:
        $field$jscomp$119_value$$ = $reader$$.readEnum();
        $msg$$.setType($field$jscomp$119_value$$);
        break;
      case 2:
        $field$jscomp$119_value$$ = new proto.ux.improv.Property.Blend;
        $reader$$.readMessage($field$jscomp$119_value$$, proto.ux.improv.Property.Blend.deserializeBinaryFromReader);
        $msg$$.setBlend($field$jscomp$119_value$$);
        break;
      case 4:
        $field$jscomp$119_value$$ = new proto.google.type.Color;
        $reader$$.readMessage($field$jscomp$119_value$$, proto.google.type.Color.deserializeBinaryFromReader);
        $msg$$.setColor($field$jscomp$119_value$$);
        break;
      case 5:
        $field$jscomp$119_value$$ = new proto.ux.improv.Property.Gradient;
        $reader$$.readMessage($field$jscomp$119_value$$, proto.ux.improv.Property.Gradient.deserializeBinaryFromReader);
        $msg$$.setGradient($field$jscomp$119_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.ux.improv.Property.Fill.serializeBinaryToWriter = function($message$$, $writer$$) {
  var $f$$ = $message$$.getType();
  0.0 !== $f$$ && $writer$$.writeEnum(1, $f$$);
  $f$$ = $message$$.getBlend();
  null != $f$$ && $writer$$.writeMessage(2, $f$$, proto.ux.improv.Property.Blend.serializeBinaryToWriter);
  $f$$ = $message$$.getColor();
  null != $f$$ && $writer$$.writeMessage(4, $f$$, proto.google.type.Color.serializeBinaryToWriter);
  $f$$ = $message$$.getGradient();
  null != $f$$ && $writer$$.writeMessage(5, $f$$, proto.ux.improv.Property.Gradient.serializeBinaryToWriter);
};
proto.ux.improv.Property.Fill.FillType = {FILL_TYPE_UNSPECIFIED:0, FLAT_COLOR:1, GRADIENT:2, IMAGE:3, PATTERN:4, NOISE:5};
proto.ux.improv.Property.Fill.prototype.getType = function() {
  return jspb.Message.getFieldWithDefault(this, 1, 0);
};
proto.ux.improv.Property.Fill.prototype.setType = function($value$$) {
  jspb.Message.setProto3EnumField(this, 1, $value$$);
};
proto.ux.improv.Property.Fill.prototype.getBlend = function() {
  return jspb.Message.getWrapperField(this, proto.ux.improv.Property.Blend, 2);
};
proto.ux.improv.Property.Fill.prototype.setBlend = function($value$$) {
  jspb.Message.setWrapperField(this, 2, $value$$);
};
proto.ux.improv.Property.Fill.prototype.getColor = function() {
  return jspb.Message.getWrapperField(this, proto.google.type.Color, 4);
};
proto.ux.improv.Property.Fill.prototype.setColor = function($value$$) {
  jspb.Message.setWrapperField(this, 4, $value$$);
};
proto.ux.improv.Property.Fill.prototype.clearColor = function() {
  this.setColor(void 0);
};
proto.ux.improv.Property.Fill.prototype.getGradient = function() {
  return jspb.Message.getWrapperField(this, proto.ux.improv.Property.Gradient, 5);
};
proto.ux.improv.Property.Fill.prototype.setGradient = function($value$$) {
  jspb.Message.setWrapperField(this, 5, $value$$);
};
proto.ux.improv.Property.Fill.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.ux.improv.Property.Fill, $data$$);
};
proto.ux.improv.Property.Gradient.repeatedFields_ = [6];
jspb.Message.GENERATE_TO_OBJECT && (proto.ux.improv.Property.Gradient.prototype.toObject = function($opt_includeInstance$$) {
  return proto.ux.improv.Property.Gradient.toObject($opt_includeInstance$$, this);
}, proto.ux.improv.Property.Gradient.toObject = function($includeInstance$$, $msg$$) {
  var $f$$, $obj$$ = {type:jspb.Message.getFieldWithDefault($msg$$, 1, 0), from:($f$$ = $msg$$.getFrom()) && proto.ux.improv.Property.Position.toObject($includeInstance$$, $f$$), to:($f$$ = $msg$$.getTo()) && proto.ux.improv.Property.Position.toObject($includeInstance$$, $f$$), angle:+jspb.Message.getFieldWithDefault($msg$$, 4, 0.0), radius:+jspb.Message.getFieldWithDefault($msg$$, 5, 0.0), stopsList:jspb.Message.toObjectList($msg$$.getStopsList(), proto.ux.improv.Property.Gradient.Stop.toObject, 
  $includeInstance$$)};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.ux.improv.Property.Gradient.deserializeBinary = function($bytes$jscomp$34_reader$$) {
  $bytes$jscomp$34_reader$$ = new jspb.BinaryReader($bytes$jscomp$34_reader$$);
  var $msg$$ = new proto.ux.improv.Property.Gradient;
  return proto.ux.improv.Property.Gradient.deserializeBinaryFromReader($msg$$, $bytes$jscomp$34_reader$$);
};
proto.ux.improv.Property.Gradient.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$120_value$$ = $reader$$.nextField_;
    switch($field$jscomp$120_value$$) {
      case 1:
        $field$jscomp$120_value$$ = $reader$$.readEnum();
        $msg$$.setType($field$jscomp$120_value$$);
        break;
      case 2:
        $field$jscomp$120_value$$ = new proto.ux.improv.Property.Position;
        $reader$$.readMessage($field$jscomp$120_value$$, proto.ux.improv.Property.Position.deserializeBinaryFromReader);
        $msg$$.setFrom($field$jscomp$120_value$$);
        break;
      case 3:
        $field$jscomp$120_value$$ = new proto.ux.improv.Property.Position;
        $reader$$.readMessage($field$jscomp$120_value$$, proto.ux.improv.Property.Position.deserializeBinaryFromReader);
        $msg$$.setTo($field$jscomp$120_value$$);
        break;
      case 4:
        $field$jscomp$120_value$$ = $reader$$.readFloat();
        $msg$$.setAngle($field$jscomp$120_value$$);
        break;
      case 5:
        $field$jscomp$120_value$$ = $reader$$.readFloat();
        $msg$$.setRadius($field$jscomp$120_value$$);
        break;
      case 6:
        $field$jscomp$120_value$$ = new proto.ux.improv.Property.Gradient.Stop;
        $reader$$.readMessage($field$jscomp$120_value$$, proto.ux.improv.Property.Gradient.Stop.deserializeBinaryFromReader);
        $msg$$.addStops($field$jscomp$120_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.ux.improv.Property.Gradient.serializeBinaryToWriter = function($message$$, $writer$$) {
  var $f$$ = $message$$.getType();
  0.0 !== $f$$ && $writer$$.writeEnum(1, $f$$);
  $f$$ = $message$$.getFrom();
  null != $f$$ && $writer$$.writeMessage(2, $f$$, proto.ux.improv.Property.Position.serializeBinaryToWriter);
  $f$$ = $message$$.getTo();
  null != $f$$ && $writer$$.writeMessage(3, $f$$, proto.ux.improv.Property.Position.serializeBinaryToWriter);
  $f$$ = $message$$.getAngle();
  0.0 !== $f$$ && $writer$$.writeFloat(4, $f$$);
  $f$$ = $message$$.getRadius();
  0.0 !== $f$$ && $writer$$.writeFloat(5, $f$$);
  $f$$ = $message$$.getStopsList();
  0 < $f$$.length && $writer$$.writeRepeatedMessage(6, $f$$, proto.ux.improv.Property.Gradient.Stop.serializeBinaryToWriter);
};
proto.ux.improv.Property.Gradient.GradientType = {GRADIENT_TYPE_UNSPECIFIED:0, LINEAR:1, ANGULAR:2, RADIAL:3};
jspb.Message.GENERATE_TO_OBJECT && (proto.ux.improv.Property.Gradient.Stop.prototype.toObject = function($opt_includeInstance$$) {
  return proto.ux.improv.Property.Gradient.Stop.toObject($opt_includeInstance$$, this);
}, proto.ux.improv.Property.Gradient.Stop.toObject = function($includeInstance$$, $msg$$) {
  var $f$$, $obj$$ = {location:+jspb.Message.getFieldWithDefault($msg$$, 1, 0.0), color:($f$$ = $msg$$.getColor()) && proto.google.type.Color.toObject($includeInstance$$, $f$$)};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.ux.improv.Property.Gradient.Stop.deserializeBinary = function($bytes$jscomp$35_reader$$) {
  $bytes$jscomp$35_reader$$ = new jspb.BinaryReader($bytes$jscomp$35_reader$$);
  var $msg$$ = new proto.ux.improv.Property.Gradient.Stop;
  return proto.ux.improv.Property.Gradient.Stop.deserializeBinaryFromReader($msg$$, $bytes$jscomp$35_reader$$);
};
proto.ux.improv.Property.Gradient.Stop.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$121_value$$ = $reader$$.nextField_;
    switch($field$jscomp$121_value$$) {
      case 1:
        $field$jscomp$121_value$$ = $reader$$.readFloat();
        $msg$$.setLocation($field$jscomp$121_value$$);
        break;
      case 2:
        $field$jscomp$121_value$$ = new proto.google.type.Color;
        $reader$$.readMessage($field$jscomp$121_value$$, proto.google.type.Color.deserializeBinaryFromReader);
        $msg$$.setColor($field$jscomp$121_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.ux.improv.Property.Gradient.Stop.serializeBinaryToWriter = function($message$$, $writer$$) {
  var $f$$ = $message$$.getLocation();
  0.0 !== $f$$ && $writer$$.writeFloat(1, $f$$);
  $f$$ = $message$$.getColor();
  null != $f$$ && $writer$$.writeMessage(2, $f$$, proto.google.type.Color.serializeBinaryToWriter);
};
proto.ux.improv.Property.Gradient.Stop.prototype.getLocation = function() {
  return +jspb.Message.getFieldWithDefault(this, 1, 0.0);
};
proto.ux.improv.Property.Gradient.Stop.prototype.setLocation = function($value$$) {
  jspb.Message.setProto3FloatField(this, 1, $value$$);
};
proto.ux.improv.Property.Gradient.Stop.prototype.getColor = function() {
  return jspb.Message.getWrapperField(this, proto.google.type.Color, 2);
};
proto.ux.improv.Property.Gradient.Stop.prototype.setColor = function($value$$) {
  jspb.Message.setWrapperField(this, 2, $value$$);
};
proto.ux.improv.Property.Gradient.Stop.prototype.clearColor = function() {
  this.setColor(void 0);
};
proto.ux.improv.Property.Gradient.Stop.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.ux.improv.Property.Gradient.Stop, $data$$);
};
proto.ux.improv.Property.Gradient.prototype.getType = function() {
  return jspb.Message.getFieldWithDefault(this, 1, 0);
};
proto.ux.improv.Property.Gradient.prototype.setType = function($value$$) {
  jspb.Message.setProto3EnumField(this, 1, $value$$);
};
proto.ux.improv.Property.Gradient.prototype.getFrom = function() {
  return jspb.Message.getWrapperField(this, proto.ux.improv.Property.Position, 2);
};
proto.ux.improv.Property.Gradient.prototype.setFrom = function($value$$) {
  jspb.Message.setWrapperField(this, 2, $value$$);
};
proto.ux.improv.Property.Gradient.prototype.getTo = function() {
  return jspb.Message.getWrapperField(this, proto.ux.improv.Property.Position, 3);
};
proto.ux.improv.Property.Gradient.prototype.setTo = function($value$$) {
  jspb.Message.setWrapperField(this, 3, $value$$);
};
proto.ux.improv.Property.Gradient.prototype.getAngle = function() {
  return +jspb.Message.getFieldWithDefault(this, 4, 0.0);
};
proto.ux.improv.Property.Gradient.prototype.setAngle = function($value$$) {
  jspb.Message.setProto3FloatField(this, 4, $value$$);
};
proto.ux.improv.Property.Gradient.prototype.getRadius = function() {
  return +jspb.Message.getFieldWithDefault(this, 5, 0.0);
};
proto.ux.improv.Property.Gradient.prototype.setRadius = function($value$$) {
  jspb.Message.setProto3FloatField(this, 5, $value$$);
};
proto.ux.improv.Property.Gradient.prototype.getStopsList = function() {
  return jspb.Message.getRepeatedWrapperField(this, proto.ux.improv.Property.Gradient.Stop, 6);
};
proto.ux.improv.Property.Gradient.prototype.addStops = function($opt_value$$, $opt_index$$) {
  return jspb.Message.addToRepeatedWrapperField(this, 6, $opt_value$$, proto.ux.improv.Property.Gradient.Stop, $opt_index$$);
};
proto.ux.improv.Property.Gradient.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.ux.improv.Property.Gradient, $data$$);
};
proto.ux.improv.Property.Border.repeatedFields_ = [4];
jspb.Message.GENERATE_TO_OBJECT && (proto.ux.improv.Property.Border.prototype.toObject = function($opt_includeInstance$$) {
  return proto.ux.improv.Property.Border.toObject($opt_includeInstance$$, this);
}, proto.ux.improv.Property.Border.toObject = function($includeInstance$$, $msg$$) {
  var $f$$, $obj$$ = {positionType:jspb.Message.getFieldWithDefault($msg$$, 1, 0), color:($f$$ = $msg$$.getColor()) && proto.google.type.Color.toObject($includeInstance$$, $f$$), width:+jspb.Message.getFieldWithDefault($msg$$, 3, 0.0), dashesList:jspb.Message.getRepeatedFloatingPointField($msg$$, 4)};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.ux.improv.Property.Border.deserializeBinary = function($bytes$jscomp$36_reader$$) {
  $bytes$jscomp$36_reader$$ = new jspb.BinaryReader($bytes$jscomp$36_reader$$);
  var $msg$$ = new proto.ux.improv.Property.Border;
  return proto.ux.improv.Property.Border.deserializeBinaryFromReader($msg$$, $bytes$jscomp$36_reader$$);
};
proto.ux.improv.Property.Border.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$122_value$$ = $reader$$.nextField_;
    switch($field$jscomp$122_value$$) {
      case 1:
        $field$jscomp$122_value$$ = $reader$$.readEnum();
        $msg$$.setPositionType($field$jscomp$122_value$$);
        break;
      case 2:
        $field$jscomp$122_value$$ = new proto.google.type.Color;
        $reader$$.readMessage($field$jscomp$122_value$$, proto.google.type.Color.deserializeBinaryFromReader);
        $msg$$.setColor($field$jscomp$122_value$$);
        break;
      case 3:
        $field$jscomp$122_value$$ = $reader$$.readFloat();
        $msg$$.setWidth($field$jscomp$122_value$$);
        break;
      case 4:
        $field$jscomp$122_value$$ = $reader$$.readPackedFloat();
        $msg$$.setDashesList($field$jscomp$122_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.ux.improv.Property.Border.serializeBinaryToWriter = function($message$$, $writer$$) {
  var $f$$ = $message$$.getPositionType();
  0.0 !== $f$$ && $writer$$.writeEnum(1, $f$$);
  $f$$ = $message$$.getColor();
  null != $f$$ && $writer$$.writeMessage(2, $f$$, proto.google.type.Color.serializeBinaryToWriter);
  $f$$ = $message$$.getWidth();
  0.0 !== $f$$ && $writer$$.writeFloat(3, $f$$);
  $f$$ = $message$$.getDashesList();
  0 < $f$$.length && $writer$$.writePackedFloat(4, $f$$);
};
proto.ux.improv.Property.Border.PositionType = {BORDER_POSITION_TYPE_UNSPECIFIED:0, CENTER:1, INSIDE:2, OUTSIDE:3};
proto.ux.improv.Property.Border.prototype.getPositionType = function() {
  return jspb.Message.getFieldWithDefault(this, 1, 0);
};
proto.ux.improv.Property.Border.prototype.setPositionType = function($value$$) {
  jspb.Message.setProto3EnumField(this, 1, $value$$);
};
proto.ux.improv.Property.Border.prototype.getColor = function() {
  return jspb.Message.getWrapperField(this, proto.google.type.Color, 2);
};
proto.ux.improv.Property.Border.prototype.setColor = function($value$$) {
  jspb.Message.setWrapperField(this, 2, $value$$);
};
proto.ux.improv.Property.Border.prototype.clearColor = function() {
  this.setColor(void 0);
};
proto.ux.improv.Property.Border.prototype.getWidth = function() {
  return +jspb.Message.getFieldWithDefault(this, 3, 0.0);
};
proto.ux.improv.Property.Border.prototype.setWidth = function($value$$) {
  jspb.Message.setProto3FloatField(this, 3, $value$$);
};
proto.ux.improv.Property.Border.prototype.getDashesList = function() {
  return jspb.Message.getRepeatedFloatingPointField(this, 4);
};
proto.ux.improv.Property.Border.prototype.setDashesList = function($value$$) {
  jspb.Message.setField(this, 4, $value$$ || []);
};
proto.ux.improv.Property.Border.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.ux.improv.Property.Border, $data$$);
};
jspb.Message.GENERATE_TO_OBJECT && (proto.ux.improv.Property.Blend.prototype.toObject = function($opt_includeInstance$$) {
  return proto.ux.improv.Property.Blend.toObject($opt_includeInstance$$, this);
}, proto.ux.improv.Property.Blend.toObject = function($includeInstance$$, $msg$$) {
  var $obj$$ = {mode:jspb.Message.getFieldWithDefault($msg$$, 1, 0), opacity:+jspb.Message.getFieldWithDefault($msg$$, 2, 0.0)};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.ux.improv.Property.Blend.deserializeBinary = function($bytes$jscomp$37_reader$$) {
  $bytes$jscomp$37_reader$$ = new jspb.BinaryReader($bytes$jscomp$37_reader$$);
  var $msg$$ = new proto.ux.improv.Property.Blend;
  return proto.ux.improv.Property.Blend.deserializeBinaryFromReader($msg$$, $bytes$jscomp$37_reader$$);
};
proto.ux.improv.Property.Blend.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$123_value$$ = $reader$$.nextField_;
    switch($field$jscomp$123_value$$) {
      case 1:
        $field$jscomp$123_value$$ = $reader$$.readEnum();
        $msg$$.setMode($field$jscomp$123_value$$);
        break;
      case 2:
        $field$jscomp$123_value$$ = $reader$$.readFloat();
        $msg$$.setOpacity($field$jscomp$123_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.ux.improv.Property.Blend.serializeBinaryToWriter = function($message$$, $writer$$) {
  var $f$$ = $message$$.getMode();
  0.0 !== $f$$ && $writer$$.writeEnum(1, $f$$);
  $f$$ = $message$$.getOpacity();
  0.0 !== $f$$ && $writer$$.writeFloat(2, $f$$);
};
proto.ux.improv.Property.Blend.Mode = {BLEND_MODE_UNSPECIFIED:0, NORMAL:1, MULTIPLY:2, DARKEN:3, LIGHTEN:4, SCREEN:5, COLOR_DODGE:6, OVERLAY:7, SOFT_LIGHT:8, HARD_LIGHT:9, DIFFERENCE:10, EXCLUSION:11, HUE:12, SATURATION:13, COLOR:14, LUMINOSITY:15};
proto.ux.improv.Property.Blend.prototype.getMode = function() {
  return jspb.Message.getFieldWithDefault(this, 1, 0);
};
proto.ux.improv.Property.Blend.prototype.setMode = function($value$$) {
  jspb.Message.setProto3EnumField(this, 1, $value$$);
};
proto.ux.improv.Property.Blend.prototype.getOpacity = function() {
  return +jspb.Message.getFieldWithDefault(this, 2, 0.0);
};
proto.ux.improv.Property.Blend.prototype.setOpacity = function($value$$) {
  jspb.Message.setProto3FloatField(this, 2, $value$$);
};
proto.ux.improv.Property.Blend.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.ux.improv.Property.Blend, $data$$);
};
jspb.Message.GENERATE_TO_OBJECT && (proto.ux.improv.Property.Blur.prototype.toObject = function($opt_includeInstance$$) {
  return proto.ux.improv.Property.Blur.toObject($opt_includeInstance$$, this);
}, proto.ux.improv.Property.Blur.toObject = function($includeInstance$$, $msg$$) {
  var $obj$$ = {type:jspb.Message.getFieldWithDefault($msg$$, 1, 0), amount:+jspb.Message.getFieldWithDefault($msg$$, 2, 0.0), motionAngle:+jspb.Message.getFieldWithDefault($msg$$, 3, 0.0), zoomX:+jspb.Message.getFieldWithDefault($msg$$, 4, 0.0), zoomY:+jspb.Message.getFieldWithDefault($msg$$, 5, 0.0)};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.ux.improv.Property.Blur.deserializeBinary = function($bytes$jscomp$38_reader$$) {
  $bytes$jscomp$38_reader$$ = new jspb.BinaryReader($bytes$jscomp$38_reader$$);
  var $msg$$ = new proto.ux.improv.Property.Blur;
  return proto.ux.improv.Property.Blur.deserializeBinaryFromReader($msg$$, $bytes$jscomp$38_reader$$);
};
proto.ux.improv.Property.Blur.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$124_value$$ = $reader$$.nextField_;
    switch($field$jscomp$124_value$$) {
      case 1:
        $field$jscomp$124_value$$ = $reader$$.readEnum();
        $msg$$.setType($field$jscomp$124_value$$);
        break;
      case 2:
        $field$jscomp$124_value$$ = $reader$$.readFloat();
        $msg$$.setAmount($field$jscomp$124_value$$);
        break;
      case 3:
        $field$jscomp$124_value$$ = $reader$$.readFloat();
        $msg$$.setMotionAngle($field$jscomp$124_value$$);
        break;
      case 4:
        $field$jscomp$124_value$$ = $reader$$.readFloat();
        $msg$$.setZoomX($field$jscomp$124_value$$);
        break;
      case 5:
        $field$jscomp$124_value$$ = $reader$$.readFloat();
        $msg$$.setZoomY($field$jscomp$124_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.ux.improv.Property.Blur.serializeBinaryToWriter = function($message$$, $writer$$) {
  var $f$$ = $message$$.getType();
  0.0 !== $f$$ && $writer$$.writeEnum(1, $f$$);
  $f$$ = $message$$.getAmount();
  0.0 !== $f$$ && $writer$$.writeFloat(2, $f$$);
  $f$$ = $message$$.getMotionAngle();
  0.0 !== $f$$ && $writer$$.writeFloat(3, $f$$);
  $f$$ = $message$$.getZoomX();
  0.0 !== $f$$ && $writer$$.writeFloat(4, $f$$);
  $f$$ = $message$$.getZoomY();
  0.0 !== $f$$ && $writer$$.writeFloat(5, $f$$);
};
proto.ux.improv.Property.Blur.BlurType = {BLUR_TYPE_UNSPECIFIED:0, GAUSSIAN:1, MOTION:2, ZOOM:3, BACKGROUND:4};
proto.ux.improv.Property.Blur.prototype.getType = function() {
  return jspb.Message.getFieldWithDefault(this, 1, 0);
};
proto.ux.improv.Property.Blur.prototype.setType = function($value$$) {
  jspb.Message.setProto3EnumField(this, 1, $value$$);
};
proto.ux.improv.Property.Blur.prototype.getAmount = function() {
  return +jspb.Message.getFieldWithDefault(this, 2, 0.0);
};
proto.ux.improv.Property.Blur.prototype.setAmount = function($value$$) {
  jspb.Message.setProto3FloatField(this, 2, $value$$);
};
proto.ux.improv.Property.Blur.prototype.getMotionAngle = function() {
  return +jspb.Message.getFieldWithDefault(this, 3, 0.0);
};
proto.ux.improv.Property.Blur.prototype.setMotionAngle = function($value$$) {
  jspb.Message.setProto3FloatField(this, 3, $value$$);
};
proto.ux.improv.Property.Blur.prototype.getZoomX = function() {
  return +jspb.Message.getFieldWithDefault(this, 4, 0.0);
};
proto.ux.improv.Property.Blur.prototype.setZoomX = function($value$$) {
  jspb.Message.setProto3FloatField(this, 4, $value$$);
};
proto.ux.improv.Property.Blur.prototype.getZoomY = function() {
  return +jspb.Message.getFieldWithDefault(this, 5, 0.0);
};
proto.ux.improv.Property.Blur.prototype.setZoomY = function($value$$) {
  jspb.Message.setProto3FloatField(this, 5, $value$$);
};
proto.ux.improv.Property.Blur.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.ux.improv.Property.Blur, $data$$);
};
jspb.Message.GENERATE_TO_OBJECT && (proto.ux.improv.Property.Shadow.prototype.toObject = function($opt_includeInstance$$) {
  return proto.ux.improv.Property.Shadow.toObject($opt_includeInstance$$, this);
}, proto.ux.improv.Property.Shadow.toObject = function($includeInstance$$, $msg$$) {
  var $f$$, $obj$$ = {type:jspb.Message.getFieldWithDefault($msg$$, 1, 0), color:($f$$ = $msg$$.getColor()) && proto.google.type.Color.toObject($includeInstance$$, $f$$), offsetX:+jspb.Message.getFieldWithDefault($msg$$, 3, 0.0), offsetY:+jspb.Message.getFieldWithDefault($msg$$, 4, 0.0), blur:+jspb.Message.getFieldWithDefault($msg$$, 5, 0.0), spread:+jspb.Message.getFieldWithDefault($msg$$, 6, 0.0)};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.ux.improv.Property.Shadow.deserializeBinary = function($bytes$jscomp$39_reader$$) {
  $bytes$jscomp$39_reader$$ = new jspb.BinaryReader($bytes$jscomp$39_reader$$);
  var $msg$$ = new proto.ux.improv.Property.Shadow;
  return proto.ux.improv.Property.Shadow.deserializeBinaryFromReader($msg$$, $bytes$jscomp$39_reader$$);
};
proto.ux.improv.Property.Shadow.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$125_value$$ = $reader$$.nextField_;
    switch($field$jscomp$125_value$$) {
      case 1:
        $field$jscomp$125_value$$ = $reader$$.readEnum();
        $msg$$.setType($field$jscomp$125_value$$);
        break;
      case 2:
        $field$jscomp$125_value$$ = new proto.google.type.Color;
        $reader$$.readMessage($field$jscomp$125_value$$, proto.google.type.Color.deserializeBinaryFromReader);
        $msg$$.setColor($field$jscomp$125_value$$);
        break;
      case 3:
        $field$jscomp$125_value$$ = $reader$$.readFloat();
        $msg$$.setOffsetX($field$jscomp$125_value$$);
        break;
      case 4:
        $field$jscomp$125_value$$ = $reader$$.readFloat();
        $msg$$.setOffsetY($field$jscomp$125_value$$);
        break;
      case 5:
        $field$jscomp$125_value$$ = $reader$$.readFloat();
        $msg$$.setBlur($field$jscomp$125_value$$);
        break;
      case 6:
        $field$jscomp$125_value$$ = $reader$$.readFloat();
        $msg$$.setSpread($field$jscomp$125_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.ux.improv.Property.Shadow.serializeBinaryToWriter = function($message$$, $writer$$) {
  var $f$$ = $message$$.getType();
  0.0 !== $f$$ && $writer$$.writeEnum(1, $f$$);
  $f$$ = $message$$.getColor();
  null != $f$$ && $writer$$.writeMessage(2, $f$$, proto.google.type.Color.serializeBinaryToWriter);
  $f$$ = $message$$.getOffsetX();
  0.0 !== $f$$ && $writer$$.writeFloat(3, $f$$);
  $f$$ = $message$$.getOffsetY();
  0.0 !== $f$$ && $writer$$.writeFloat(4, $f$$);
  $f$$ = $message$$.getBlur();
  0.0 !== $f$$ && $writer$$.writeFloat(5, $f$$);
  $f$$ = $message$$.getSpread();
  0.0 !== $f$$ && $writer$$.writeFloat(6, $f$$);
};
proto.ux.improv.Property.Shadow.ShadowType = {SHADOW_TYPE_UNSPECIFIED:0, OUTER:1, INNER:2};
proto.ux.improv.Property.Shadow.prototype.getType = function() {
  return jspb.Message.getFieldWithDefault(this, 1, 0);
};
proto.ux.improv.Property.Shadow.prototype.setType = function($value$$) {
  jspb.Message.setProto3EnumField(this, 1, $value$$);
};
proto.ux.improv.Property.Shadow.prototype.getColor = function() {
  return jspb.Message.getWrapperField(this, proto.google.type.Color, 2);
};
proto.ux.improv.Property.Shadow.prototype.setColor = function($value$$) {
  jspb.Message.setWrapperField(this, 2, $value$$);
};
proto.ux.improv.Property.Shadow.prototype.clearColor = function() {
  this.setColor(void 0);
};
proto.ux.improv.Property.Shadow.prototype.getOffsetX = function() {
  return +jspb.Message.getFieldWithDefault(this, 3, 0.0);
};
proto.ux.improv.Property.Shadow.prototype.setOffsetX = function($value$$) {
  jspb.Message.setProto3FloatField(this, 3, $value$$);
};
proto.ux.improv.Property.Shadow.prototype.getOffsetY = function() {
  return +jspb.Message.getFieldWithDefault(this, 4, 0.0);
};
proto.ux.improv.Property.Shadow.prototype.setOffsetY = function($value$$) {
  jspb.Message.setProto3FloatField(this, 4, $value$$);
};
proto.ux.improv.Property.Shadow.prototype.getBlur = function() {
  return +jspb.Message.getFieldWithDefault(this, 5, 0.0);
};
proto.ux.improv.Property.Shadow.prototype.setBlur = function($value$$) {
  jspb.Message.setProto3FloatField(this, 5, $value$$);
};
proto.ux.improv.Property.Shadow.prototype.getSpread = function() {
  return +jspb.Message.getFieldWithDefault(this, 6, 0.0);
};
proto.ux.improv.Property.Shadow.prototype.setSpread = function($value$$) {
  jspb.Message.setProto3FloatField(this, 6, $value$$);
};
proto.ux.improv.Property.Shadow.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.ux.improv.Property.Shadow, $data$$);
};
jspb.Message.GENERATE_TO_OBJECT && (proto.ux.improv.Property.ColorAdjustment.prototype.toObject = function($opt_includeInstance$$) {
  return proto.ux.improv.Property.ColorAdjustment.toObject($opt_includeInstance$$, this);
}, proto.ux.improv.Property.ColorAdjustment.toObject = function($includeInstance$$, $msg$$) {
  var $obj$$ = {brightness:+jspb.Message.getFieldWithDefault($msg$$, 1, 0.0), contrast:+jspb.Message.getFieldWithDefault($msg$$, 2, 0.0), saturation:+jspb.Message.getFieldWithDefault($msg$$, 3, 0.0), hue:+jspb.Message.getFieldWithDefault($msg$$, 4, 0.0)};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.ux.improv.Property.ColorAdjustment.deserializeBinary = function($bytes$jscomp$40_reader$$) {
  $bytes$jscomp$40_reader$$ = new jspb.BinaryReader($bytes$jscomp$40_reader$$);
  var $msg$$ = new proto.ux.improv.Property.ColorAdjustment;
  return proto.ux.improv.Property.ColorAdjustment.deserializeBinaryFromReader($msg$$, $bytes$jscomp$40_reader$$);
};
proto.ux.improv.Property.ColorAdjustment.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$126_value$$ = $reader$$.nextField_;
    switch($field$jscomp$126_value$$) {
      case 1:
        $field$jscomp$126_value$$ = $reader$$.readFloat();
        $msg$$.setBrightness($field$jscomp$126_value$$);
        break;
      case 2:
        $field$jscomp$126_value$$ = $reader$$.readFloat();
        $msg$$.setContrast($field$jscomp$126_value$$);
        break;
      case 3:
        $field$jscomp$126_value$$ = $reader$$.readFloat();
        $msg$$.setSaturation($field$jscomp$126_value$$);
        break;
      case 4:
        $field$jscomp$126_value$$ = $reader$$.readFloat();
        $msg$$.setHue($field$jscomp$126_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.ux.improv.Property.ColorAdjustment.serializeBinaryToWriter = function($message$$, $writer$$) {
  var $f$$ = $message$$.getBrightness();
  0.0 !== $f$$ && $writer$$.writeFloat(1, $f$$);
  $f$$ = $message$$.getContrast();
  0.0 !== $f$$ && $writer$$.writeFloat(2, $f$$);
  $f$$ = $message$$.getSaturation();
  0.0 !== $f$$ && $writer$$.writeFloat(3, $f$$);
  $f$$ = $message$$.getHue();
  0.0 !== $f$$ && $writer$$.writeFloat(4, $f$$);
};
proto.ux.improv.Property.ColorAdjustment.prototype.getBrightness = function() {
  return +jspb.Message.getFieldWithDefault(this, 1, 0.0);
};
proto.ux.improv.Property.ColorAdjustment.prototype.setBrightness = function($value$$) {
  jspb.Message.setProto3FloatField(this, 1, $value$$);
};
proto.ux.improv.Property.ColorAdjustment.prototype.getContrast = function() {
  return +jspb.Message.getFieldWithDefault(this, 2, 0.0);
};
proto.ux.improv.Property.ColorAdjustment.prototype.setContrast = function($value$$) {
  jspb.Message.setProto3FloatField(this, 2, $value$$);
};
proto.ux.improv.Property.ColorAdjustment.prototype.getSaturation = function() {
  return +jspb.Message.getFieldWithDefault(this, 3, 0.0);
};
proto.ux.improv.Property.ColorAdjustment.prototype.setSaturation = function($value$$) {
  jspb.Message.setProto3FloatField(this, 3, $value$$);
};
proto.ux.improv.Property.ColorAdjustment.prototype.getHue = function() {
  return +jspb.Message.getFieldWithDefault(this, 4, 0.0);
};
proto.ux.improv.Property.ColorAdjustment.prototype.setHue = function($value$$) {
  jspb.Message.setProto3FloatField(this, 4, $value$$);
};
proto.ux.improv.Property.ColorAdjustment.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.ux.improv.Property.ColorAdjustment, $data$$);
};
jspb.Message.GENERATE_TO_OBJECT && (proto.ux.improv.Property.Text.prototype.toObject = function($opt_includeInstance$$) {
  return proto.ux.improv.Property.Text.toObject($opt_includeInstance$$, this);
}, proto.ux.improv.Property.Text.toObject = function($includeInstance$$, $msg$$) {
  var $f$$, $obj$$ = {content:jspb.Message.getFieldWithDefault($msg$$, 1, ""), fontDisplayName:jspb.Message.getFieldWithDefault($msg$$, 2, ""), fontSize:+jspb.Message.getFieldWithDefault($msg$$, 3, 0.0), color:($f$$ = $msg$$.getColor()) && proto.google.type.Color.toObject($includeInstance$$, $f$$), characterSpacing:+jspb.Message.getFieldWithDefault($msg$$, 5, 0.0), paragraphSpacing:+jspb.Message.getFieldWithDefault($msg$$, 6, 0.0), lineHeight:+jspb.Message.getFieldWithDefault($msg$$, 7, 0.0), horizontalAlignment:jspb.Message.getFieldWithDefault($msg$$, 
  8, 0), verticalAlignment:jspb.Message.getFieldWithDefault($msg$$, 9, 0), textTransform:jspb.Message.getFieldWithDefault($msg$$, 10, 0), textDecoration:jspb.Message.getFieldWithDefault($msg$$, 11, 0), textStyleName:jspb.Message.getFieldWithDefault($msg$$, 12, "")};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.ux.improv.Property.Text.deserializeBinary = function($bytes$jscomp$41_reader$$) {
  $bytes$jscomp$41_reader$$ = new jspb.BinaryReader($bytes$jscomp$41_reader$$);
  var $msg$$ = new proto.ux.improv.Property.Text;
  return proto.ux.improv.Property.Text.deserializeBinaryFromReader($msg$$, $bytes$jscomp$41_reader$$);
};
proto.ux.improv.Property.Text.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$127_value$$ = $reader$$.nextField_;
    switch($field$jscomp$127_value$$) {
      case 1:
        $field$jscomp$127_value$$ = $reader$$.readString();
        $msg$$.setContent($field$jscomp$127_value$$);
        break;
      case 2:
        $field$jscomp$127_value$$ = $reader$$.readString();
        $msg$$.setFontDisplayName($field$jscomp$127_value$$);
        break;
      case 3:
        $field$jscomp$127_value$$ = $reader$$.readFloat();
        $msg$$.setFontSize($field$jscomp$127_value$$);
        break;
      case 4:
        $field$jscomp$127_value$$ = new proto.google.type.Color;
        $reader$$.readMessage($field$jscomp$127_value$$, proto.google.type.Color.deserializeBinaryFromReader);
        $msg$$.setColor($field$jscomp$127_value$$);
        break;
      case 5:
        $field$jscomp$127_value$$ = $reader$$.readFloat();
        $msg$$.setCharacterSpacing($field$jscomp$127_value$$);
        break;
      case 6:
        $field$jscomp$127_value$$ = $reader$$.readFloat();
        $msg$$.setParagraphSpacing($field$jscomp$127_value$$);
        break;
      case 7:
        $field$jscomp$127_value$$ = $reader$$.readFloat();
        $msg$$.setLineHeight($field$jscomp$127_value$$);
        break;
      case 8:
        $field$jscomp$127_value$$ = $reader$$.readEnum();
        $msg$$.setHorizontalAlignment($field$jscomp$127_value$$);
        break;
      case 9:
        $field$jscomp$127_value$$ = $reader$$.readEnum();
        $msg$$.setVerticalAlignment($field$jscomp$127_value$$);
        break;
      case 10:
        $field$jscomp$127_value$$ = $reader$$.readEnum();
        $msg$$.setTextTransform($field$jscomp$127_value$$);
        break;
      case 11:
        $field$jscomp$127_value$$ = $reader$$.readEnum();
        $msg$$.setTextDecoration($field$jscomp$127_value$$);
        break;
      case 12:
        $field$jscomp$127_value$$ = $reader$$.readString();
        $msg$$.setTextStyleName($field$jscomp$127_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.ux.improv.Property.Text.serializeBinaryToWriter = function($message$$, $writer$$) {
  var $f$$ = $message$$.getContent();
  0 < $f$$.length && $writer$$.writeString(1, $f$$);
  $f$$ = $message$$.getFontDisplayName();
  0 < $f$$.length && $writer$$.writeString(2, $f$$);
  $f$$ = $message$$.getFontSize();
  0.0 !== $f$$ && $writer$$.writeFloat(3, $f$$);
  $f$$ = $message$$.getColor();
  null != $f$$ && $writer$$.writeMessage(4, $f$$, proto.google.type.Color.serializeBinaryToWriter);
  $f$$ = $message$$.getCharacterSpacing();
  0.0 !== $f$$ && $writer$$.writeFloat(5, $f$$);
  $f$$ = $message$$.getParagraphSpacing();
  0.0 !== $f$$ && $writer$$.writeFloat(6, $f$$);
  $f$$ = $message$$.getLineHeight();
  0.0 !== $f$$ && $writer$$.writeFloat(7, $f$$);
  $f$$ = $message$$.getHorizontalAlignment();
  0.0 !== $f$$ && $writer$$.writeEnum(8, $f$$);
  $f$$ = $message$$.getVerticalAlignment();
  0.0 !== $f$$ && $writer$$.writeEnum(9, $f$$);
  $f$$ = $message$$.getTextTransform();
  0.0 !== $f$$ && $writer$$.writeEnum(10, $f$$);
  $f$$ = $message$$.getTextDecoration();
  0.0 !== $f$$ && $writer$$.writeEnum(11, $f$$);
  $f$$ = $message$$.getTextStyleName();
  0 < $f$$.length && $writer$$.writeString(12, $f$$);
};
proto.ux.improv.Property.Text.HorizontalAlignmentType = {HORIZONTAL_ALIGNMENT_UNSPECIFIED:0, LEFT:1, RIGHT:2, CENTER:3, JUSTIFY:4};
proto.ux.improv.Property.Text.VerticalAlignmentType = {VERTICAL_ALIGNMENT_UNSPECIFIED:0, TOP:1, MIDDLE:2, BOTTOM:3};
proto.ux.improv.Property.Text.TextTransformType = {TRANSFORMATION_TYPE_UNSPECIFIED:0, UPPERCASE:1, LOWERCASE:2, CAPITALIZE:3};
proto.ux.improv.Property.Text.TextDecorationType = {DECORATION_TYPE_UNSPECIFIED:0, UNDER_LINE:1, OVER_LINE:2, LINE_THROUGH:3};
proto.ux.improv.Property.Text.prototype.getContent = function() {
  return jspb.Message.getFieldWithDefault(this, 1, "");
};
proto.ux.improv.Property.Text.prototype.setContent = function($value$$) {
  jspb.Message.setProto3StringField(this, 1, $value$$);
};
proto.ux.improv.Property.Text.prototype.getFontDisplayName = function() {
  return jspb.Message.getFieldWithDefault(this, 2, "");
};
proto.ux.improv.Property.Text.prototype.setFontDisplayName = function($value$$) {
  jspb.Message.setProto3StringField(this, 2, $value$$);
};
proto.ux.improv.Property.Text.prototype.getFontSize = function() {
  return +jspb.Message.getFieldWithDefault(this, 3, 0.0);
};
proto.ux.improv.Property.Text.prototype.setFontSize = function($value$$) {
  jspb.Message.setProto3FloatField(this, 3, $value$$);
};
proto.ux.improv.Property.Text.prototype.getColor = function() {
  return jspb.Message.getWrapperField(this, proto.google.type.Color, 4);
};
proto.ux.improv.Property.Text.prototype.setColor = function($value$$) {
  jspb.Message.setWrapperField(this, 4, $value$$);
};
proto.ux.improv.Property.Text.prototype.clearColor = function() {
  this.setColor(void 0);
};
proto.ux.improv.Property.Text.prototype.getCharacterSpacing = function() {
  return +jspb.Message.getFieldWithDefault(this, 5, 0.0);
};
proto.ux.improv.Property.Text.prototype.setCharacterSpacing = function($value$$) {
  jspb.Message.setProto3FloatField(this, 5, $value$$);
};
proto.ux.improv.Property.Text.prototype.getParagraphSpacing = function() {
  return +jspb.Message.getFieldWithDefault(this, 6, 0.0);
};
proto.ux.improv.Property.Text.prototype.setParagraphSpacing = function($value$$) {
  jspb.Message.setProto3FloatField(this, 6, $value$$);
};
proto.ux.improv.Property.Text.prototype.getLineHeight = function() {
  return +jspb.Message.getFieldWithDefault(this, 7, 0.0);
};
proto.ux.improv.Property.Text.prototype.setLineHeight = function($value$$) {
  jspb.Message.setProto3FloatField(this, 7, $value$$);
};
proto.ux.improv.Property.Text.prototype.getHorizontalAlignment = function() {
  return jspb.Message.getFieldWithDefault(this, 8, 0);
};
proto.ux.improv.Property.Text.prototype.setHorizontalAlignment = function($value$$) {
  jspb.Message.setProto3EnumField(this, 8, $value$$);
};
proto.ux.improv.Property.Text.prototype.getVerticalAlignment = function() {
  return jspb.Message.getFieldWithDefault(this, 9, 0);
};
proto.ux.improv.Property.Text.prototype.setVerticalAlignment = function($value$$) {
  jspb.Message.setProto3EnumField(this, 9, $value$$);
};
proto.ux.improv.Property.Text.prototype.getTextTransform = function() {
  return jspb.Message.getFieldWithDefault(this, 10, 0);
};
proto.ux.improv.Property.Text.prototype.setTextTransform = function($value$$) {
  jspb.Message.setProto3EnumField(this, 10, $value$$);
};
proto.ux.improv.Property.Text.prototype.getTextDecoration = function() {
  return jspb.Message.getFieldWithDefault(this, 11, 0);
};
proto.ux.improv.Property.Text.prototype.setTextDecoration = function($value$$) {
  jspb.Message.setProto3EnumField(this, 11, $value$$);
};
proto.ux.improv.Property.Text.prototype.getTextStyleName = function() {
  return jspb.Message.getFieldWithDefault(this, 12, "");
};
proto.ux.improv.Property.Text.prototype.setTextStyleName = function($value$$) {
  jspb.Message.setProto3StringField(this, 12, $value$$);
};
proto.ux.improv.Property.Text.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.ux.improv.Property.Text, $data$$);
};
proto.ux.improv.Property.MaterialData.repeatedFields_ = [2, 3];
jspb.Message.GENERATE_TO_OBJECT && (proto.ux.improv.Property.MaterialData.prototype.toObject = function($opt_includeInstance$$) {
  return proto.ux.improv.Property.MaterialData.toObject($opt_includeInstance$$, this);
}, proto.ux.improv.Property.MaterialData.toObject = function($includeInstance$$, $msg$$) {
  var $obj$$ = {componentName:jspb.Message.getFieldWithDefault($msg$$, 1, ""), themeColorsList:jspb.Message.toObjectList($msg$$.getThemeColorsList(), proto.ux.improv.Property.MaterialData.ThemeColor.toObject, $includeInstance$$), textAreasList:jspb.Message.toObjectList($msg$$.getTextAreasList(), proto.ux.improv.Property.MaterialData.TextArea.toObject, $includeInstance$$)};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.ux.improv.Property.MaterialData.deserializeBinary = function($bytes$jscomp$42_reader$$) {
  $bytes$jscomp$42_reader$$ = new jspb.BinaryReader($bytes$jscomp$42_reader$$);
  var $msg$$ = new proto.ux.improv.Property.MaterialData;
  return proto.ux.improv.Property.MaterialData.deserializeBinaryFromReader($msg$$, $bytes$jscomp$42_reader$$);
};
proto.ux.improv.Property.MaterialData.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$128_value$$ = $reader$$.nextField_;
    switch($field$jscomp$128_value$$) {
      case 1:
        $field$jscomp$128_value$$ = $reader$$.readString();
        $msg$$.setComponentName($field$jscomp$128_value$$);
        break;
      case 2:
        $field$jscomp$128_value$$ = new proto.ux.improv.Property.MaterialData.ThemeColor;
        $reader$$.readMessage($field$jscomp$128_value$$, proto.ux.improv.Property.MaterialData.ThemeColor.deserializeBinaryFromReader);
        $msg$$.addThemeColors($field$jscomp$128_value$$);
        break;
      case 3:
        $field$jscomp$128_value$$ = new proto.ux.improv.Property.MaterialData.TextArea;
        $reader$$.readMessage($field$jscomp$128_value$$, proto.ux.improv.Property.MaterialData.TextArea.deserializeBinaryFromReader);
        $msg$$.addTextAreas($field$jscomp$128_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.ux.improv.Property.MaterialData.serializeBinaryToWriter = function($message$$, $writer$$) {
  var $f$$ = $message$$.getComponentName();
  0 < $f$$.length && $writer$$.writeString(1, $f$$);
  $f$$ = $message$$.getThemeColorsList();
  0 < $f$$.length && $writer$$.writeRepeatedMessage(2, $f$$, proto.ux.improv.Property.MaterialData.ThemeColor.serializeBinaryToWriter);
  $f$$ = $message$$.getTextAreasList();
  0 < $f$$.length && $writer$$.writeRepeatedMessage(3, $f$$, proto.ux.improv.Property.MaterialData.TextArea.serializeBinaryToWriter);
};
jspb.Message.GENERATE_TO_OBJECT && (proto.ux.improv.Property.MaterialData.ThemeColor.prototype.toObject = function($opt_includeInstance$$) {
  return proto.ux.improv.Property.MaterialData.ThemeColor.toObject($opt_includeInstance$$, this);
}, proto.ux.improv.Property.MaterialData.ThemeColor.toObject = function($includeInstance$$, $msg$$) {
  var $obj$$ = {label:jspb.Message.getFieldWithDefault($msg$$, 1, ""), paletteColorLabel:jspb.Message.getFieldWithDefault($msg$$, 2, "")};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.ux.improv.Property.MaterialData.ThemeColor.deserializeBinary = function($bytes$jscomp$43_reader$$) {
  $bytes$jscomp$43_reader$$ = new jspb.BinaryReader($bytes$jscomp$43_reader$$);
  var $msg$$ = new proto.ux.improv.Property.MaterialData.ThemeColor;
  return proto.ux.improv.Property.MaterialData.ThemeColor.deserializeBinaryFromReader($msg$$, $bytes$jscomp$43_reader$$);
};
proto.ux.improv.Property.MaterialData.ThemeColor.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$129_value$$ = $reader$$.nextField_;
    switch($field$jscomp$129_value$$) {
      case 1:
        $field$jscomp$129_value$$ = $reader$$.readString();
        $msg$$.setLabel($field$jscomp$129_value$$);
        break;
      case 2:
        $field$jscomp$129_value$$ = $reader$$.readString();
        $msg$$.setPaletteColorLabel($field$jscomp$129_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.ux.improv.Property.MaterialData.ThemeColor.serializeBinaryToWriter = function($message$$, $writer$$) {
  var $f$$ = $message$$.getLabel();
  0 < $f$$.length && $writer$$.writeString(1, $f$$);
  $f$$ = $message$$.getPaletteColorLabel();
  0 < $f$$.length && $writer$$.writeString(2, $f$$);
};
proto.ux.improv.Property.MaterialData.ThemeColor.prototype.getLabel = function() {
  return jspb.Message.getFieldWithDefault(this, 1, "");
};
proto.ux.improv.Property.MaterialData.ThemeColor.prototype.setLabel = function($value$$) {
  jspb.Message.setProto3StringField(this, 1, $value$$);
};
proto.ux.improv.Property.MaterialData.ThemeColor.prototype.getPaletteColorLabel = function() {
  return jspb.Message.getFieldWithDefault(this, 2, "");
};
proto.ux.improv.Property.MaterialData.ThemeColor.prototype.setPaletteColorLabel = function($value$$) {
  jspb.Message.setProto3StringField(this, 2, $value$$);
};
proto.ux.improv.Property.MaterialData.ThemeColor.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.ux.improv.Property.MaterialData.ThemeColor, $data$$);
};
jspb.Message.GENERATE_TO_OBJECT && (proto.ux.improv.Property.MaterialData.TextArea.prototype.toObject = function($opt_includeInstance$$) {
  return proto.ux.improv.Property.MaterialData.TextArea.toObject($opt_includeInstance$$, this);
}, proto.ux.improv.Property.MaterialData.TextArea.toObject = function($includeInstance$$, $msg$$) {
  var $obj$$ = {label:jspb.Message.getFieldWithDefault($msg$$, 1, ""), content:jspb.Message.getFieldWithDefault($msg$$, 2, "")};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.ux.improv.Property.MaterialData.TextArea.deserializeBinary = function($bytes$jscomp$44_reader$$) {
  $bytes$jscomp$44_reader$$ = new jspb.BinaryReader($bytes$jscomp$44_reader$$);
  var $msg$$ = new proto.ux.improv.Property.MaterialData.TextArea;
  return proto.ux.improv.Property.MaterialData.TextArea.deserializeBinaryFromReader($msg$$, $bytes$jscomp$44_reader$$);
};
proto.ux.improv.Property.MaterialData.TextArea.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$130_value$$ = $reader$$.nextField_;
    switch($field$jscomp$130_value$$) {
      case 1:
        $field$jscomp$130_value$$ = $reader$$.readString();
        $msg$$.setLabel($field$jscomp$130_value$$);
        break;
      case 2:
        $field$jscomp$130_value$$ = $reader$$.readString();
        $msg$$.setContent($field$jscomp$130_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.ux.improv.Property.MaterialData.TextArea.serializeBinaryToWriter = function($message$$, $writer$$) {
  var $f$$ = $message$$.getLabel();
  0 < $f$$.length && $writer$$.writeString(1, $f$$);
  $f$$ = $message$$.getContent();
  0 < $f$$.length && $writer$$.writeString(2, $f$$);
};
proto.ux.improv.Property.MaterialData.TextArea.prototype.getLabel = function() {
  return jspb.Message.getFieldWithDefault(this, 1, "");
};
proto.ux.improv.Property.MaterialData.TextArea.prototype.setLabel = function($value$$) {
  jspb.Message.setProto3StringField(this, 1, $value$$);
};
proto.ux.improv.Property.MaterialData.TextArea.prototype.getContent = function() {
  return jspb.Message.getFieldWithDefault(this, 2, "");
};
proto.ux.improv.Property.MaterialData.TextArea.prototype.setContent = function($value$$) {
  jspb.Message.setProto3StringField(this, 2, $value$$);
};
proto.ux.improv.Property.MaterialData.TextArea.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.ux.improv.Property.MaterialData.TextArea, $data$$);
};
proto.ux.improv.Property.MaterialData.prototype.getComponentName = function() {
  return jspb.Message.getFieldWithDefault(this, 1, "");
};
proto.ux.improv.Property.MaterialData.prototype.setComponentName = function($value$$) {
  jspb.Message.setProto3StringField(this, 1, $value$$);
};
proto.ux.improv.Property.MaterialData.prototype.getThemeColorsList = function() {
  return jspb.Message.getRepeatedWrapperField(this, proto.ux.improv.Property.MaterialData.ThemeColor, 2);
};
proto.ux.improv.Property.MaterialData.prototype.addThemeColors = function($opt_value$$, $opt_index$$) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, $opt_value$$, proto.ux.improv.Property.MaterialData.ThemeColor, $opt_index$$);
};
proto.ux.improv.Property.MaterialData.prototype.getTextAreasList = function() {
  return jspb.Message.getRepeatedWrapperField(this, proto.ux.improv.Property.MaterialData.TextArea, 3);
};
proto.ux.improv.Property.MaterialData.prototype.addTextAreas = function($opt_value$$, $opt_index$$) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, $opt_value$$, proto.ux.improv.Property.MaterialData.TextArea, $opt_index$$);
};
proto.ux.improv.Property.MaterialData.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.ux.improv.Property.MaterialData, $data$$);
};
jspb.Message.GENERATE_TO_OBJECT && (proto.ux.improv.Property.ArtBoard.prototype.toObject = function($opt_includeInstance$$) {
  return proto.ux.improv.Property.ArtBoard.toObject($opt_includeInstance$$, this);
}, proto.ux.improv.Property.ArtBoard.toObject = function($includeInstance$$, $msg$$) {
  var $f$$, $obj$$ = {scale:+jspb.Message.getFieldWithDefault($msg$$, 1, 0.0), color:($f$$ = $msg$$.getColor()) && proto.google.type.Color.toObject($includeInstance$$, $f$$), origin:($f$$ = $msg$$.getOrigin()) && proto.ux.improv.Property.Position.toObject($includeInstance$$, $f$$)};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.ux.improv.Property.ArtBoard.deserializeBinary = function($bytes$jscomp$45_reader$$) {
  $bytes$jscomp$45_reader$$ = new jspb.BinaryReader($bytes$jscomp$45_reader$$);
  var $msg$$ = new proto.ux.improv.Property.ArtBoard;
  return proto.ux.improv.Property.ArtBoard.deserializeBinaryFromReader($msg$$, $bytes$jscomp$45_reader$$);
};
proto.ux.improv.Property.ArtBoard.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$131_value$$ = $reader$$.nextField_;
    switch($field$jscomp$131_value$$) {
      case 1:
        $field$jscomp$131_value$$ = $reader$$.readFloat();
        $msg$$.setScale($field$jscomp$131_value$$);
        break;
      case 2:
        $field$jscomp$131_value$$ = new proto.google.type.Color;
        $reader$$.readMessage($field$jscomp$131_value$$, proto.google.type.Color.deserializeBinaryFromReader);
        $msg$$.setColor($field$jscomp$131_value$$);
        break;
      case 3:
        $field$jscomp$131_value$$ = new proto.ux.improv.Property.Position;
        $reader$$.readMessage($field$jscomp$131_value$$, proto.ux.improv.Property.Position.deserializeBinaryFromReader);
        $msg$$.setOrigin($field$jscomp$131_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.ux.improv.Property.ArtBoard.serializeBinaryToWriter = function($message$$, $writer$$) {
  var $f$$ = $message$$.getScale();
  0.0 !== $f$$ && $writer$$.writeFloat(1, $f$$);
  $f$$ = $message$$.getColor();
  null != $f$$ && $writer$$.writeMessage(2, $f$$, proto.google.type.Color.serializeBinaryToWriter);
  $f$$ = $message$$.getOrigin();
  null != $f$$ && $writer$$.writeMessage(3, $f$$, proto.ux.improv.Property.Position.serializeBinaryToWriter);
};
proto.ux.improv.Property.ArtBoard.prototype.getScale = function() {
  return +jspb.Message.getFieldWithDefault(this, 1, 0.0);
};
proto.ux.improv.Property.ArtBoard.prototype.setScale = function($value$$) {
  jspb.Message.setProto3FloatField(this, 1, $value$$);
};
proto.ux.improv.Property.ArtBoard.prototype.getColor = function() {
  return jspb.Message.getWrapperField(this, proto.google.type.Color, 2);
};
proto.ux.improv.Property.ArtBoard.prototype.setColor = function($value$$) {
  jspb.Message.setWrapperField(this, 2, $value$$);
};
proto.ux.improv.Property.ArtBoard.prototype.clearColor = function() {
  this.setColor(void 0);
};
proto.ux.improv.Property.ArtBoard.prototype.getOrigin = function() {
  return jspb.Message.getWrapperField(this, proto.ux.improv.Property.Position, 3);
};
proto.ux.improv.Property.ArtBoard.prototype.setOrigin = function($value$$) {
  jspb.Message.setWrapperField(this, 3, $value$$);
};
proto.ux.improv.Property.ArtBoard.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.ux.improv.Property.ArtBoard, $data$$);
};
jspb.Message.GENERATE_TO_OBJECT && (proto.ux.improv.Property.ComponentModifier.prototype.toObject = function($opt_includeInstance$$) {
  return proto.ux.improv.Property.ComponentModifier.toObject($opt_includeInstance$$, this);
}, proto.ux.improv.Property.ComponentModifier.toObject = function($includeInstance$$, $msg$$) {
  var $obj$$ = {type:jspb.Message.getFieldWithDefault($msg$$, 1, 0), id:jspb.Message.getFieldWithDefault($msg$$, 2, ""), parentId:jspb.Message.getFieldWithDefault($msg$$, 3, ""), label:jspb.Message.getFieldWithDefault($msg$$, 4, ""), value:jspb.Message.getFieldWithDefault($msg$$, 5, "")};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.ux.improv.Property.ComponentModifier.deserializeBinary = function($bytes$jscomp$46_reader$$) {
  $bytes$jscomp$46_reader$$ = new jspb.BinaryReader($bytes$jscomp$46_reader$$);
  var $msg$$ = new proto.ux.improv.Property.ComponentModifier;
  return proto.ux.improv.Property.ComponentModifier.deserializeBinaryFromReader($msg$$, $bytes$jscomp$46_reader$$);
};
proto.ux.improv.Property.ComponentModifier.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$132_value$$ = $reader$$.nextField_;
    switch($field$jscomp$132_value$$) {
      case 1:
        $field$jscomp$132_value$$ = $reader$$.readEnum();
        $msg$$.setType($field$jscomp$132_value$$);
        break;
      case 2:
        $field$jscomp$132_value$$ = $reader$$.readString();
        $msg$$.setId($field$jscomp$132_value$$);
        break;
      case 3:
        $field$jscomp$132_value$$ = $reader$$.readString();
        $msg$$.setParentId($field$jscomp$132_value$$);
        break;
      case 4:
        $field$jscomp$132_value$$ = $reader$$.readString();
        $msg$$.setLabel($field$jscomp$132_value$$);
        break;
      case 5:
        $field$jscomp$132_value$$ = $reader$$.readString();
        $msg$$.setValue($field$jscomp$132_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.ux.improv.Property.ComponentModifier.serializeBinaryToWriter = function($message$$, $writer$$) {
  var $f$$ = $message$$.getType();
  0.0 !== $f$$ && $writer$$.writeEnum(1, $f$$);
  $f$$ = $message$$.getId();
  0 < $f$$.length && $writer$$.writeString(2, $f$$);
  $f$$ = $message$$.getParentId();
  0 < $f$$.length && $writer$$.writeString(3, $f$$);
  $f$$ = $message$$.getLabel();
  0 < $f$$.length && $writer$$.writeString(4, $f$$);
  $f$$ = $message$$.getValue();
  0 < $f$$.length && $writer$$.writeString(5, $f$$);
};
proto.ux.improv.Property.ComponentModifier.ComponentModifierType = {MODIFIER_TYPE_UNSPECIFIED:0, COMPONENT:1, TEXT:2};
proto.ux.improv.Property.ComponentModifier.prototype.getType = function() {
  return jspb.Message.getFieldWithDefault(this, 1, 0);
};
proto.ux.improv.Property.ComponentModifier.prototype.setType = function($value$$) {
  jspb.Message.setProto3EnumField(this, 1, $value$$);
};
proto.ux.improv.Property.ComponentModifier.prototype.getId = function() {
  return jspb.Message.getFieldWithDefault(this, 2, "");
};
proto.ux.improv.Property.ComponentModifier.prototype.setId = function($value$$) {
  jspb.Message.setProto3StringField(this, 2, $value$$);
};
proto.ux.improv.Property.ComponentModifier.prototype.getParentId = function() {
  return jspb.Message.getFieldWithDefault(this, 3, "");
};
proto.ux.improv.Property.ComponentModifier.prototype.setParentId = function($value$$) {
  jspb.Message.setProto3StringField(this, 3, $value$$);
};
proto.ux.improv.Property.ComponentModifier.prototype.getLabel = function() {
  return jspb.Message.getFieldWithDefault(this, 4, "");
};
proto.ux.improv.Property.ComponentModifier.prototype.setLabel = function($value$$) {
  jspb.Message.setProto3StringField(this, 4, $value$$);
};
proto.ux.improv.Property.ComponentModifier.prototype.getValue = function() {
  return jspb.Message.getFieldWithDefault(this, 5, "");
};
proto.ux.improv.Property.ComponentModifier.prototype.setValue = function($value$$) {
  jspb.Message.setProto3StringField(this, 5, $value$$);
};
proto.ux.improv.Property.ComponentModifier.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.ux.improv.Property.ComponentModifier, $data$$);
};
proto.ux.improv.Property.CornerRadii.repeatedFields_ = [1];
jspb.Message.GENERATE_TO_OBJECT && (proto.ux.improv.Property.CornerRadii.prototype.toObject = function($opt_includeInstance$$) {
  return proto.ux.improv.Property.CornerRadii.toObject($opt_includeInstance$$, this);
}, proto.ux.improv.Property.CornerRadii.toObject = function($includeInstance$$, $msg$$) {
  var $obj$$ = {radiiList:jspb.Message.getRepeatedFloatingPointField($msg$$, 1)};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.ux.improv.Property.CornerRadii.deserializeBinary = function($bytes$jscomp$47_reader$$) {
  $bytes$jscomp$47_reader$$ = new jspb.BinaryReader($bytes$jscomp$47_reader$$);
  var $msg$$ = new proto.ux.improv.Property.CornerRadii;
  return proto.ux.improv.Property.CornerRadii.deserializeBinaryFromReader($msg$$, $bytes$jscomp$47_reader$$);
};
proto.ux.improv.Property.CornerRadii.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$133_value$$ = $reader$$.nextField_;
    switch($field$jscomp$133_value$$) {
      case 1:
        $field$jscomp$133_value$$ = $reader$$.readPackedFloat();
        $msg$$.setRadiiList($field$jscomp$133_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.ux.improv.Property.CornerRadii.serializeBinaryToWriter = function($f$jscomp$108_message$$, $writer$$) {
  $f$jscomp$108_message$$ = $f$jscomp$108_message$$.getRadiiList();
  0 < $f$jscomp$108_message$$.length && $writer$$.writePackedFloat(1, $f$jscomp$108_message$$);
};
proto.ux.improv.Property.CornerRadii.prototype.getRadiiList = function() {
  return jspb.Message.getRepeatedFloatingPointField(this, 1);
};
proto.ux.improv.Property.CornerRadii.prototype.setRadiiList = function($value$$) {
  jspb.Message.setField(this, 1, $value$$ || []);
};
proto.ux.improv.Property.CornerRadii.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.ux.improv.Property.CornerRadii, $data$$);
};
jspb.Message.GENERATE_TO_OBJECT && (proto.ux.improv.Property.Position.prototype.toObject = function($opt_includeInstance$$) {
  return proto.ux.improv.Property.Position.toObject($opt_includeInstance$$, this);
}, proto.ux.improv.Property.Position.toObject = function($includeInstance$$, $msg$$) {
  var $obj$$ = {x:+jspb.Message.getFieldWithDefault($msg$$, 1, 0.0), y:+jspb.Message.getFieldWithDefault($msg$$, 2, 0.0)};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.ux.improv.Property.Position.deserializeBinary = function($bytes$jscomp$48_reader$$) {
  $bytes$jscomp$48_reader$$ = new jspb.BinaryReader($bytes$jscomp$48_reader$$);
  var $msg$$ = new proto.ux.improv.Property.Position;
  return proto.ux.improv.Property.Position.deserializeBinaryFromReader($msg$$, $bytes$jscomp$48_reader$$);
};
proto.ux.improv.Property.Position.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$134_value$$ = $reader$$.nextField_;
    switch($field$jscomp$134_value$$) {
      case 1:
        $field$jscomp$134_value$$ = $reader$$.readFloat();
        $msg$$.setX($field$jscomp$134_value$$);
        break;
      case 2:
        $field$jscomp$134_value$$ = $reader$$.readFloat();
        $msg$$.setY($field$jscomp$134_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.ux.improv.Property.Position.serializeBinaryToWriter = function($message$$, $writer$$) {
  var $f$$ = $message$$.getX();
  0.0 !== $f$$ && $writer$$.writeFloat(1, $f$$);
  $f$$ = $message$$.getY();
  0.0 !== $f$$ && $writer$$.writeFloat(2, $f$$);
};
proto.ux.improv.Property.Position.prototype.getX = function() {
  return +jspb.Message.getFieldWithDefault(this, 1, 0.0);
};
proto.ux.improv.Property.Position.prototype.setX = function($value$$) {
  jspb.Message.setProto3FloatField(this, 1, $value$$);
};
proto.ux.improv.Property.Position.prototype.getY = function() {
  return +jspb.Message.getFieldWithDefault(this, 2, 0.0);
};
proto.ux.improv.Property.Position.prototype.setY = function($value$$) {
  jspb.Message.setProto3FloatField(this, 2, $value$$);
};
proto.ux.improv.Property.Position.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.ux.improv.Property.Position, $data$$);
};
jspb.Message.GENERATE_TO_OBJECT && (proto.ux.improv.Property.Icon.prototype.toObject = function($opt_includeInstance$$) {
  return proto.ux.improv.Property.Icon.toObject($opt_includeInstance$$, this);
}, proto.ux.improv.Property.Icon.toObject = function($includeInstance$$, $msg$$) {
  var $f$$, $obj$$ = {iconName:jspb.Message.getFieldWithDefault($msg$$, 1, ""), category:jspb.Message.getFieldWithDefault($msg$$, 2, 0), style:jspb.Message.getFieldWithDefault($msg$$, 3, 0), size:($f$$ = $msg$$.getSize()) && proto.ux.improv.Property.Icon.IconSize.toObject($includeInstance$$, $f$$)};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.ux.improv.Property.Icon.deserializeBinary = function($bytes$jscomp$49_reader$$) {
  $bytes$jscomp$49_reader$$ = new jspb.BinaryReader($bytes$jscomp$49_reader$$);
  var $msg$$ = new proto.ux.improv.Property.Icon;
  return proto.ux.improv.Property.Icon.deserializeBinaryFromReader($msg$$, $bytes$jscomp$49_reader$$);
};
proto.ux.improv.Property.Icon.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$135_value$$ = $reader$$.nextField_;
    switch($field$jscomp$135_value$$) {
      case 1:
        $field$jscomp$135_value$$ = $reader$$.readString();
        $msg$$.setIconName($field$jscomp$135_value$$);
        break;
      case 2:
        $field$jscomp$135_value$$ = $reader$$.readEnum();
        $msg$$.setCategory($field$jscomp$135_value$$);
        break;
      case 3:
        $field$jscomp$135_value$$ = $reader$$.readEnum();
        $msg$$.setStyle($field$jscomp$135_value$$);
        break;
      case 4:
        $field$jscomp$135_value$$ = new proto.ux.improv.Property.Icon.IconSize;
        $reader$$.readMessage($field$jscomp$135_value$$, proto.ux.improv.Property.Icon.IconSize.deserializeBinaryFromReader);
        $msg$$.setSize($field$jscomp$135_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.ux.improv.Property.Icon.serializeBinaryToWriter = function($message$$, $writer$$) {
  var $f$$ = $message$$.getIconName();
  0 < $f$$.length && $writer$$.writeString(1, $f$$);
  $f$$ = $message$$.getCategory();
  0.0 !== $f$$ && $writer$$.writeEnum(2, $f$$);
  $f$$ = $message$$.getStyle();
  0.0 !== $f$$ && $writer$$.writeEnum(3, $f$$);
  $f$$ = $message$$.getSize();
  null != $f$$ && $writer$$.writeMessage(4, $f$$, proto.ux.improv.Property.Icon.IconSize.serializeBinaryToWriter);
};
proto.ux.improv.Property.Icon.IconCategory = {ICON_CATEGORY_UNSPECIFIED:0, ACTION:1, ALERT:2, AV:3, COMMUNICATION:4, CONTENT:5, DEVICE:6, EDITOR:7, FILE:8, HARDWARE:9, IMAGE:10, MAPS:11, NAVIGATION:12, NOTIFICATION:13, PLACES:14, SOCIAL:15, TOGGLE:16};
proto.ux.improv.Property.Icon.IconStyle = {ICON_STYLE_UNSPECIFIED:0, TWO_TONE:1, SHARP:2, ROUNDED:3, OUTLINED:4, FILLED:5};
jspb.Message.GENERATE_TO_OBJECT && (proto.ux.improv.Property.Icon.IconSize.prototype.toObject = function($opt_includeInstance$$) {
  return proto.ux.improv.Property.Icon.IconSize.toObject($opt_includeInstance$$, this);
}, proto.ux.improv.Property.Icon.IconSize.toObject = function($includeInstance$$, $msg$$) {
  var $obj$$ = {value:+jspb.Message.getFieldWithDefault($msg$$, 1, 0.0), unit:jspb.Message.getFieldWithDefault($msg$$, 2, 0)};
  $includeInstance$$ && ($obj$$.$jspbMessageInstance = $msg$$);
  return $obj$$;
});
proto.ux.improv.Property.Icon.IconSize.deserializeBinary = function($bytes$jscomp$50_reader$$) {
  $bytes$jscomp$50_reader$$ = new jspb.BinaryReader($bytes$jscomp$50_reader$$);
  var $msg$$ = new proto.ux.improv.Property.Icon.IconSize;
  return proto.ux.improv.Property.Icon.IconSize.deserializeBinaryFromReader($msg$$, $bytes$jscomp$50_reader$$);
};
proto.ux.improv.Property.Icon.IconSize.deserializeBinaryFromReader = function($msg$$, $reader$$) {
  for (; $reader$$.nextField() && !$reader$$.isEndGroup();) {
    var $field$jscomp$136_value$$ = $reader$$.nextField_;
    switch($field$jscomp$136_value$$) {
      case 1:
        $field$jscomp$136_value$$ = $reader$$.readFloat();
        $msg$$.setValue($field$jscomp$136_value$$);
        break;
      case 2:
        $field$jscomp$136_value$$ = $reader$$.readEnum();
        $msg$$.setUnit($field$jscomp$136_value$$);
        break;
      default:
        $reader$$.skipField();
    }
  }
  return $msg$$;
};
proto.ux.improv.Property.Icon.IconSize.serializeBinaryToWriter = function($message$$, $writer$$) {
  var $f$$ = $message$$.getValue();
  0.0 !== $f$$ && $writer$$.writeFloat(1, $f$$);
  $f$$ = $message$$.getUnit();
  0.0 !== $f$$ && $writer$$.writeEnum(2, $f$$);
};
proto.ux.improv.Property.Icon.IconSize.Unit = {UNIT_UNSPECIFIED:0, PX:1};
proto.ux.improv.Property.Icon.IconSize.prototype.getValue = function() {
  return +jspb.Message.getFieldWithDefault(this, 1, 0.0);
};
proto.ux.improv.Property.Icon.IconSize.prototype.setValue = function($value$$) {
  jspb.Message.setProto3FloatField(this, 1, $value$$);
};
proto.ux.improv.Property.Icon.IconSize.prototype.getUnit = function() {
  return jspb.Message.getFieldWithDefault(this, 2, 0);
};
proto.ux.improv.Property.Icon.IconSize.prototype.setUnit = function($value$$) {
  jspb.Message.setProto3EnumField(this, 2, $value$$);
};
proto.ux.improv.Property.Icon.IconSize.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.ux.improv.Property.Icon.IconSize, $data$$);
};
proto.ux.improv.Property.Icon.prototype.getIconName = function() {
  return jspb.Message.getFieldWithDefault(this, 1, "");
};
proto.ux.improv.Property.Icon.prototype.setIconName = function($value$$) {
  jspb.Message.setProto3StringField(this, 1, $value$$);
};
proto.ux.improv.Property.Icon.prototype.getCategory = function() {
  return jspb.Message.getFieldWithDefault(this, 2, 0);
};
proto.ux.improv.Property.Icon.prototype.setCategory = function($value$$) {
  jspb.Message.setProto3EnumField(this, 2, $value$$);
};
proto.ux.improv.Property.Icon.prototype.getStyle = function() {
  return jspb.Message.getFieldWithDefault(this, 3, 0);
};
proto.ux.improv.Property.Icon.prototype.setStyle = function($value$$) {
  jspb.Message.setProto3EnumField(this, 3, $value$$);
};
proto.ux.improv.Property.Icon.prototype.getSize = function() {
  return jspb.Message.getWrapperField(this, proto.ux.improv.Property.Icon.IconSize, 4);
};
proto.ux.improv.Property.Icon.prototype.setSize = function($value$$) {
  jspb.Message.setWrapperField(this, 4, $value$$);
};
proto.ux.improv.Property.Icon.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.ux.improv.Property.Icon, $data$$);
};
proto.ux.improv.Property.prototype.getAspect = function() {
  return jspb.Message.getWrapperField(this, proto.ux.improv.Property.Aspect, 1);
};
proto.ux.improv.Property.prototype.setAspect = function($value$$) {
  jspb.Message.setOneofWrapperField(this, 1, proto.ux.improv.Property.oneofGroups_[0], $value$$);
};
proto.ux.improv.Property.prototype.getTransformations = function() {
  return jspb.Message.getWrapperField(this, proto.ux.improv.Property.Transformations, 2);
};
proto.ux.improv.Property.prototype.setTransformations = function($value$$) {
  jspb.Message.setOneofWrapperField(this, 2, proto.ux.improv.Property.oneofGroups_[0], $value$$);
};
proto.ux.improv.Property.prototype.getFill = function() {
  return jspb.Message.getWrapperField(this, proto.ux.improv.Property.Fill, 3);
};
proto.ux.improv.Property.prototype.setFill = function($value$$) {
  jspb.Message.setOneofWrapperField(this, 3, proto.ux.improv.Property.oneofGroups_[0], $value$$);
};
proto.ux.improv.Property.prototype.getBorder = function() {
  return jspb.Message.getWrapperField(this, proto.ux.improv.Property.Border, 4);
};
proto.ux.improv.Property.prototype.setBorder = function($value$$) {
  jspb.Message.setOneofWrapperField(this, 4, proto.ux.improv.Property.oneofGroups_[0], $value$$);
};
proto.ux.improv.Property.prototype.getBlend = function() {
  return jspb.Message.getWrapperField(this, proto.ux.improv.Property.Blend, 5);
};
proto.ux.improv.Property.prototype.setBlend = function($value$$) {
  jspb.Message.setOneofWrapperField(this, 5, proto.ux.improv.Property.oneofGroups_[0], $value$$);
};
proto.ux.improv.Property.prototype.getBlur = function() {
  return jspb.Message.getWrapperField(this, proto.ux.improv.Property.Blur, 6);
};
proto.ux.improv.Property.prototype.setBlur = function($value$$) {
  jspb.Message.setOneofWrapperField(this, 6, proto.ux.improv.Property.oneofGroups_[0], $value$$);
};
proto.ux.improv.Property.prototype.getShadow = function() {
  return jspb.Message.getWrapperField(this, proto.ux.improv.Property.Shadow, 7);
};
proto.ux.improv.Property.prototype.setShadow = function($value$$) {
  jspb.Message.setOneofWrapperField(this, 7, proto.ux.improv.Property.oneofGroups_[0], $value$$);
};
proto.ux.improv.Property.prototype.getColorAdjustment = function() {
  return jspb.Message.getWrapperField(this, proto.ux.improv.Property.ColorAdjustment, 8);
};
proto.ux.improv.Property.prototype.setColorAdjustment = function($value$$) {
  jspb.Message.setOneofWrapperField(this, 8, proto.ux.improv.Property.oneofGroups_[0], $value$$);
};
proto.ux.improv.Property.prototype.getText = function() {
  return jspb.Message.getWrapperField(this, proto.ux.improv.Property.Text, 9);
};
proto.ux.improv.Property.prototype.setText = function($value$$) {
  jspb.Message.setOneofWrapperField(this, 9, proto.ux.improv.Property.oneofGroups_[0], $value$$);
};
proto.ux.improv.Property.prototype.getMaterialData = function() {
  return jspb.Message.getWrapperField(this, proto.ux.improv.Property.MaterialData, 10);
};
proto.ux.improv.Property.prototype.setMaterialData = function($value$$) {
  jspb.Message.setOneofWrapperField(this, 10, proto.ux.improv.Property.oneofGroups_[0], $value$$);
};
proto.ux.improv.Property.prototype.getArtBoard = function() {
  return jspb.Message.getWrapperField(this, proto.ux.improv.Property.ArtBoard, 11);
};
proto.ux.improv.Property.prototype.setArtBoard = function($value$$) {
  jspb.Message.setOneofWrapperField(this, 11, proto.ux.improv.Property.oneofGroups_[0], $value$$);
};
proto.ux.improv.Property.prototype.getComponentModifier = function() {
  return jspb.Message.getWrapperField(this, proto.ux.improv.Property.ComponentModifier, 12);
};
proto.ux.improv.Property.prototype.setComponentModifier = function($value$$) {
  jspb.Message.setOneofWrapperField(this, 12, proto.ux.improv.Property.oneofGroups_[0], $value$$);
};
proto.ux.improv.Property.prototype.getCornerRadii = function() {
  return jspb.Message.getWrapperField(this, proto.ux.improv.Property.CornerRadii, 13);
};
proto.ux.improv.Property.prototype.setCornerRadii = function($value$$) {
  jspb.Message.setOneofWrapperField(this, 13, proto.ux.improv.Property.oneofGroups_[0], $value$$);
};
proto.ux.improv.Property.prototype.getIcon = function() {
  return jspb.Message.getWrapperField(this, proto.ux.improv.Property.Icon, 14);
};
proto.ux.improv.Property.prototype.setIcon = function($value$$) {
  jspb.Message.setOneofWrapperField(this, 14, proto.ux.improv.Property.oneofGroups_[0], $value$$);
};
proto.ux.improv.Property.deserialize = function($data$$) {
  return jspb.Message.deserialize(proto.ux.improv.Property, $data$$);
};
var module$exports$improv$proto = {Version:{V0_1:"v0_1"}, Builders:function() {
}};
module$exports$improv$proto.Builders.prototype.conditionalSetField_ = function($protoObject$$, $$jscomp$iter$0_builtList_dataObject$$, $fieldName$$, $opt_subBuilder$$) {
  var $$jscomp$key$item_data$jscomp$108_item$3_item$$ = $$jscomp$iter$0_builtList_dataObject$$[$fieldName$$] || null;
  if ($$jscomp$key$item_data$jscomp$108_item$3_item$$) {
    if ($fieldName$$ = String($fieldName$$.charAt(0)).toUpperCase() + String($fieldName$$.substr(1)), goog.isArray($$jscomp$key$item_data$jscomp$108_item$3_item$$) && $$jscomp$key$item_data$jscomp$108_item$3_item$$.length) {
      if ($protoObject$$["add" + $fieldName$$]) {
        for ($$jscomp$iter$0_builtList_dataObject$$ = $jscomp.makeIterator($$jscomp$key$item_data$jscomp$108_item$3_item$$), $$jscomp$key$item_data$jscomp$108_item$3_item$$ = $$jscomp$iter$0_builtList_dataObject$$.next(); !$$jscomp$key$item_data$jscomp$108_item$3_item$$.done; $$jscomp$key$item_data$jscomp$108_item$3_item$$ = $$jscomp$iter$0_builtList_dataObject$$.next()) {
          if ($$jscomp$key$item_data$jscomp$108_item$3_item$$ = $$jscomp$key$item_data$jscomp$108_item$3_item$$.value, goog.isFunction($opt_subBuilder$$)) {
            $protoObject$$["add" + $fieldName$$]($opt_subBuilder$$($$jscomp$key$item_data$jscomp$108_item$3_item$$));
          } else {
            $protoObject$$["add" + $fieldName$$]($$jscomp$key$item_data$jscomp$108_item$3_item$$);
          }
        }
      } else {
        if ($protoObject$$["set" + $fieldName$$ + "List"]) {
          if (goog.isFunction($opt_subBuilder$$)) {
            $$jscomp$iter$0_builtList_dataObject$$ = [];
            var $$jscomp$iter$1$$ = $jscomp.makeIterator($$jscomp$key$item_data$jscomp$108_item$3_item$$);
            for ($$jscomp$key$item_data$jscomp$108_item$3_item$$ = $$jscomp$iter$1$$.next(); !$$jscomp$key$item_data$jscomp$108_item$3_item$$.done; $$jscomp$key$item_data$jscomp$108_item$3_item$$ = $$jscomp$iter$1$$.next()) {
              $$jscomp$key$item_data$jscomp$108_item$3_item$$ = $$jscomp$key$item_data$jscomp$108_item$3_item$$.value, $$jscomp$iter$0_builtList_dataObject$$.push($opt_subBuilder$$($$jscomp$key$item_data$jscomp$108_item$3_item$$));
            }
            $protoObject$$["set" + $fieldName$$ + "List"]($$jscomp$iter$0_builtList_dataObject$$);
          } else {
            $protoObject$$["set" + $fieldName$$ + "List"]($$jscomp$key$item_data$jscomp$108_item$3_item$$);
          }
        }
      }
    } else {
      if (!goog.isArray($$jscomp$key$item_data$jscomp$108_item$3_item$$)) {
        if (goog.isString($$jscomp$key$item_data$jscomp$108_item$3_item$$) && goog.isFunction($opt_subBuilder$$)) {
          $protoObject$$["set" + $fieldName$$]($opt_subBuilder$$($$jscomp$key$item_data$jscomp$108_item$3_item$$));
        } else {
          if (goog.isObject($$jscomp$key$item_data$jscomp$108_item$3_item$$) && !goog.object.isEmpty($$jscomp$key$item_data$jscomp$108_item$3_item$$) && goog.isFunction($opt_subBuilder$$)) {
            $protoObject$$["set" + $fieldName$$]($opt_subBuilder$$($$jscomp$key$item_data$jscomp$108_item$3_item$$));
          } else {
            $protoObject$$["set" + $fieldName$$]($$jscomp$key$item_data$jscomp$108_item$3_item$$);
          }
        }
      }
    }
  }
};
module$exports$improv$proto.Builders.prototype.listLayersResponseBuilder = function($data$$) {
  var $list$$ = new proto.ux.improv.ListLayersResponse;
  this.conditionalSetField_($list$$, $data$$, "layers", this.layerBuilder.bind(this));
  this.conditionalSetField_($list$$, $data$$, "nextPageToken");
  return $list$$;
};
module$exports$improv$proto.Builders.prototype.layerBuilder = function($data$$) {
  var $layer$$ = new proto.ux.improv.Layer;
  this.conditionalSetField_($layer$$, $data$$, "name");
  this.conditionalSetField_($layer$$, $data$$, "displayName");
  this.conditionalSetField_($layer$$, $data$$, "parentName");
  this.conditionalSetField_($layer$$, $data$$, "sourceInfo", this.sourceInfoBuilder.bind(this));
  this.conditionalSetField_($layer$$, $data$$, "type", this.layerTypeBuilder.bind(this));
  this.conditionalSetField_($layer$$, $data$$, "boundingBox", this.boundingBoxBuilder.bind(this));
  this.conditionalSetField_($layer$$, $data$$, "properties", this.propertyBuilder.bind(this));
  this.conditionalSetField_($layer$$, $data$$, "lastUpdatedTime", this.timestampBuilder.bind(this));
  this.conditionalSetField_($layer$$, $data$$, "theme", this.themeBuilder.bind(this));
  return $layer$$;
};
module$exports$improv$proto.Builders.prototype.sourceInfoBuilder = function($data$$) {
  var $sourceInfo$$ = new proto.ux.improv.Layer.SourceInfo;
  this.conditionalSetField_($sourceInfo$$, $data$$, "id");
  this.conditionalSetField_($sourceInfo$$, $data$$, "parentId");
  this.conditionalSetField_($sourceInfo$$, $data$$, "isLocked");
  this.conditionalSetField_($sourceInfo$$, $data$$, "sourceApplication", this.sourceApplicationBuilder.bind(this));
  return $sourceInfo$$;
};
module$exports$improv$proto.Builders.prototype.sourceApplicationBuilder = function($value$$) {
  return proto.ux.improv.Layer.SourceInfo.SourceApplication[$value$$ || "SOURCE_APPLICATION_UNSPECIFIED"];
};
module$exports$improv$proto.Builders.prototype.layerTypeBuilder = function($value$$) {
  return proto.ux.improv.Layer.LayerType[$value$$ || "LAYER_TYPE_UNSPECIFIED"];
};
module$exports$improv$proto.Builders.prototype.boundingBoxBuilder = function($data$$) {
  var $boundingBox$$ = new proto.ux.improv.Layer.BoundingBox;
  this.conditionalSetField_($boundingBox$$, $data$$, "minX");
  this.conditionalSetField_($boundingBox$$, $data$$, "minY");
  this.conditionalSetField_($boundingBox$$, $data$$, "maxX");
  this.conditionalSetField_($boundingBox$$, $data$$, "maxY");
  return $boundingBox$$;
};
module$exports$improv$proto.Builders.prototype.themeBuilder = function($data$$) {
  var $theme$$ = new proto.ux.improv.Theme;
  this.conditionalSetField_($theme$$, $data$$, "name");
  this.conditionalSetField_($theme$$, $data$$, "displayName");
  this.conditionalSetField_($theme$$, $data$$, "themeId");
  this.conditionalSetField_($theme$$, $data$$, "lastUpdatedTime", this.timestampBuilder.bind(this));
  this.conditionalSetField_($theme$$, $data$$, "paletteColors", this.paletteColorBuilder.bind(this));
  this.conditionalSetField_($theme$$, $data$$, "cornerType", this.cornerTypeBuilder.bind(this));
  this.conditionalSetField_($theme$$, $data$$, "cornerRadii", this.cornerRadiiBuilder.bind(this));
  this.conditionalSetField_($theme$$, $data$$, "textOptions", this.typographyInformationBuilder.bind(this));
  return $theme$$;
};
module$exports$improv$proto.Builders.prototype.paletteColorBuilder = function($data$$) {
  var $paletteColor$$ = new proto.ux.improv.Theme.PaletteColor;
  this.conditionalSetField_($paletteColor$$, $data$$, "label");
  this.conditionalSetField_($paletteColor$$, $data$$, "type", this.paletteColorTypeBuilder.bind(this));
  this.conditionalSetField_($paletteColor$$, $data$$, "color", this.colorBuilder.bind(this));
  return $paletteColor$$;
};
module$exports$improv$proto.Builders.prototype.paletteColorTypeBuilder = function($value$$) {
  return proto.ux.improv.Theme.PaletteColor.PaletteColorType[$value$$ || "COLOR_TYPE_UNSET"];
};
module$exports$improv$proto.Builders.prototype.typographyInformationBuilder = function($data$$) {
  var $typographyInformation$$ = new proto.ux.improv.Theme.TypographyInformation;
  this.conditionalSetField_($typographyInformation$$, $data$$, "type", this.textOptionsTypeBuilder.bind(this));
  this.conditionalSetField_($typographyInformation$$, $data$$, "fontFamilyName");
  this.conditionalSetField_($typographyInformation$$, $data$$, "fontName");
  this.conditionalSetField_($typographyInformation$$, $data$$, "fontWeight");
  this.conditionalSetField_($typographyInformation$$, $data$$, "fontSize");
  return $typographyInformation$$;
};
module$exports$improv$proto.Builders.prototype.textOptionsTypeBuilder = function($value$$) {
  return proto.ux.improv.Theme.TypographyInformation.TextOptionsType[$value$$ || "TEXT_TYPE_UNSET"];
};
module$exports$improv$proto.Builders.prototype.timestampBuilder = function($data$$) {
  var $timestamp$$ = new proto.google.protobuf.Timestamp;
  this.conditionalSetField_($timestamp$$, $data$$, "seconds");
  this.conditionalSetField_($timestamp$$, $data$$, "nanos");
  return $timestamp$$;
};
module$exports$improv$proto.Builders.prototype.propertyBuilder = function($data$$) {
  var $property$$ = new proto.ux.improv.Property;
  this.conditionalSetField_($property$$, $data$$, "aspect", this.aspectBuilder.bind(this));
  this.conditionalSetField_($property$$, $data$$, "transformations", this.transformationsBuilder.bind(this));
  this.conditionalSetField_($property$$, $data$$, "fill", this.fillBuilder.bind(this));
  this.conditionalSetField_($property$$, $data$$, "border", this.borderBuilder.bind(this));
  this.conditionalSetField_($property$$, $data$$, "blend", this.blendBuilder.bind(this));
  this.conditionalSetField_($property$$, $data$$, "blur", this.blurBuilder.bind(this));
  this.conditionalSetField_($property$$, $data$$, "shadow", this.shadowBuilder.bind(this));
  this.conditionalSetField_($property$$, $data$$, "colorAdjustment", this.colorAdjustmentBuilder.bind(this));
  this.conditionalSetField_($property$$, $data$$, "text", this.textBuilder.bind(this));
  this.conditionalSetField_($property$$, $data$$, "materialData", this.materialDataBuilder.bind(this));
  this.conditionalSetField_($property$$, $data$$, "artBoard", this.artBoardBuilder.bind(this));
  this.conditionalSetField_($property$$, $data$$, "componentModifier", this.componentModifierBuilder.bind(this));
  this.conditionalSetField_($property$$, $data$$, "cornerRadii", this.cornerRadiiBuilder.bind(this));
  this.conditionalSetField_($property$$, $data$$, "icon", this.iconBuilder.bind(this));
  return $property$$;
};
module$exports$improv$proto.Builders.prototype.colorBuilder = function($data$$) {
  var $color$$ = new proto.google.type.Color;
  this.conditionalSetField_($color$$, $data$$, "red");
  this.conditionalSetField_($color$$, $data$$, "green");
  this.conditionalSetField_($color$$, $data$$, "blue");
  this.conditionalSetField_($color$$, $data$$, "alpha", this.floatBuilder.bind(this));
  return $color$$;
};
module$exports$improv$proto.Builders.prototype.floatBuilder = function($data$$) {
  var $float$$ = new proto.google.protobuf.FloatValue;
  this.conditionalSetField_($float$$, $data$$, "value");
  return $float$$;
};
module$exports$improv$proto.Builders.prototype.aspectBuilder = function($data$$) {
  var $aspect$$ = new proto.ux.improv.Property.Aspect;
  this.conditionalSetField_($aspect$$, $data$$, "isFixedWidth");
  this.conditionalSetField_($aspect$$, $data$$, "isFixedHeight");
  return $aspect$$;
};
module$exports$improv$proto.Builders.prototype.transformationsBuilder = function($data$$) {
  var $transformations$$ = new proto.ux.improv.Property.Transformations;
  this.conditionalSetField_($transformations$$, $data$$, "rotation");
  this.conditionalSetField_($transformations$$, $data$$, "isFlippedHorizontal");
  this.conditionalSetField_($transformations$$, $data$$, "isFlippedVertical");
  return $transformations$$;
};
module$exports$improv$proto.Builders.prototype.fillBuilder = function($data$$) {
  var $fill$$ = new proto.ux.improv.Property.Fill;
  this.conditionalSetField_($fill$$, $data$$, "type", this.fillTypeBuilder.bind(this));
  this.conditionalSetField_($fill$$, $data$$, "blend", this.blendBuilder.bind(this));
  this.conditionalSetField_($fill$$, $data$$, "color", this.colorBuilder.bind(this));
  this.conditionalSetField_($fill$$, $data$$, "gradient", this.gradientBuilder.bind(this));
  return $fill$$;
};
module$exports$improv$proto.Builders.prototype.fillTypeBuilder = function($value$$) {
  return proto.ux.improv.Property.Fill.FillType[$value$$ || "FILL_TYPE_UNSPECIFIED"];
};
module$exports$improv$proto.Builders.prototype.gradientBuilder = function($data$$) {
  var $gradient$$ = new proto.ux.improv.Property.Gradient;
  this.conditionalSetField_($gradient$$, $data$$, "type", this.gradientTypeBuilder.bind(this));
  this.conditionalSetField_($gradient$$, $data$$, "from", this.positionBuilder.bind(this));
  this.conditionalSetField_($gradient$$, $data$$, "to", this.positionBuilder.bind(this));
  this.conditionalSetField_($gradient$$, $data$$, "angle");
  this.conditionalSetField_($gradient$$, $data$$, "radius");
  this.conditionalSetField_($gradient$$, $data$$, "stops", this.stopBuilder.bind(this));
  return $gradient$$;
};
module$exports$improv$proto.Builders.prototype.gradientTypeBuilder = function($value$$) {
  return proto.ux.improv.Property.Gradient.GradientType[$value$$ || "GRADIENT_TYPE_UNSPECIFIED"];
};
module$exports$improv$proto.Builders.prototype.positionBuilder = function($data$$) {
  var $position$$ = new proto.ux.improv.Property.Position;
  this.conditionalSetField_($position$$, $data$$, "x");
  this.conditionalSetField_($position$$, $data$$, "y");
  return $position$$;
};
module$exports$improv$proto.Builders.prototype.stopBuilder = function($data$$) {
  var $stop$$ = new proto.ux.improv.Property.Gradient.Stop;
  this.conditionalSetField_($stop$$, $data$$, "location");
  this.conditionalSetField_($stop$$, $data$$, "color", this.colorBuilder.bind(this));
  return $stop$$;
};
module$exports$improv$proto.Builders.prototype.borderBuilder = function($data$$) {
  var $border$$ = new proto.ux.improv.Property.Border;
  this.conditionalSetField_($border$$, $data$$, "positionType", this.positionTypeBuilder.bind(this));
  this.conditionalSetField_($border$$, $data$$, "color", this.colorBuilder.bind(this));
  this.conditionalSetField_($border$$, $data$$, "width");
  this.conditionalSetField_($border$$, $data$$, "dashes");
  return $border$$;
};
module$exports$improv$proto.Builders.prototype.positionTypeBuilder = function($value$$) {
  return proto.ux.improv.Property.Border.PositionType[$value$$ || "BORDER_POSITION_TYPE_UNSPECIFIED"];
};
module$exports$improv$proto.Builders.prototype.blendBuilder = function($data$$) {
  var $blend$$ = new proto.ux.improv.Property.Blend;
  this.conditionalSetField_($blend$$, $data$$, "mode", this.blendModeBuilder.bind(this));
  this.conditionalSetField_($blend$$, $data$$, "opacity");
  return $blend$$;
};
module$exports$improv$proto.Builders.prototype.blendModeBuilder = function($value$$) {
  return proto.ux.improv.Property.Blend.Mode[$value$$ || "BLEND_MODE_UNSPECIFIED"];
};
module$exports$improv$proto.Builders.prototype.blurBuilder = function($data$$) {
  var $blur$$ = new proto.ux.improv.Property.Blur;
  this.conditionalSetField_($blur$$, $data$$, "type", this.blurTypeBuilder.bind(this));
  this.conditionalSetField_($blur$$, $data$$, "amount");
  this.conditionalSetField_($blur$$, $data$$, "motionAngle");
  this.conditionalSetField_($blur$$, $data$$, "zoomX");
  this.conditionalSetField_($blur$$, $data$$, "zoomY");
  return $blur$$;
};
module$exports$improv$proto.Builders.prototype.blurTypeBuilder = function($value$$) {
  return proto.ux.improv.Property.Blur.BlurType[$value$$ || "BLUR_TYPE_UNSPECIFIED"];
};
module$exports$improv$proto.Builders.prototype.shadowBuilder = function($data$$) {
  var $shadow$$ = new proto.ux.improv.Property.Shadow;
  this.conditionalSetField_($shadow$$, $data$$, "type", this.shadowTypeBuilder.bind(this));
  this.conditionalSetField_($shadow$$, $data$$, "color", this.colorBuilder.bind(this));
  this.conditionalSetField_($shadow$$, $data$$, "offsetX");
  this.conditionalSetField_($shadow$$, $data$$, "offsetY");
  this.conditionalSetField_($shadow$$, $data$$, "blur");
  this.conditionalSetField_($shadow$$, $data$$, "spread");
  return $shadow$$;
};
module$exports$improv$proto.Builders.prototype.shadowTypeBuilder = function($value$$) {
  return proto.ux.improv.Property.Shadow.ShadowType[$value$$ || "SHADOW_TYPE_UNSPECIFIED"];
};
module$exports$improv$proto.Builders.prototype.colorAdjustmentBuilder = function($data$$) {
  var $colorAdjustment$$ = new proto.ux.improv.Property.ColorAdjustment;
  this.conditionalSetField_($colorAdjustment$$, $data$$, "brightness");
  this.conditionalSetField_($colorAdjustment$$, $data$$, "contrast");
  this.conditionalSetField_($colorAdjustment$$, $data$$, "saturation");
  this.conditionalSetField_($colorAdjustment$$, $data$$, "hue");
  return $colorAdjustment$$;
};
module$exports$improv$proto.Builders.prototype.textBuilder = function($data$$) {
  var $text$$ = new proto.ux.improv.Property.Text;
  this.conditionalSetField_($text$$, $data$$, "content");
  this.conditionalSetField_($text$$, $data$$, "fontDisplayName");
  this.conditionalSetField_($text$$, $data$$, "fontSize");
  this.conditionalSetField_($text$$, $data$$, "color", this.colorBuilder.bind(this));
  this.conditionalSetField_($text$$, $data$$, "characterSpacing");
  this.conditionalSetField_($text$$, $data$$, "paragraphSpacing");
  this.conditionalSetField_($text$$, $data$$, "lineHeight");
  this.conditionalSetField_($text$$, $data$$, "horizontalAlignment", this.horizontalAlignmentTypeBuilder.bind(this));
  this.conditionalSetField_($text$$, $data$$, "verticalAlignment", this.verticalAlignmentTypeBuilder.bind(this));
  this.conditionalSetField_($text$$, $data$$, "textTransform", this.textTransformTypeBuilder.bind(this));
  this.conditionalSetField_($text$$, $data$$, "textDecoration", this.textDecorationTypeBuilder.bind(this));
  this.conditionalSetField_($text$$, $data$$, "textStyleName");
  return $text$$;
};
module$exports$improv$proto.Builders.prototype.horizontalAlignmentTypeBuilder = function($value$$) {
  return proto.ux.improv.Property.Text.HorizontalAlignmentType[$value$$ || "HORIZONTAL_ALIGNMENT_UNSPECIFIED"];
};
module$exports$improv$proto.Builders.prototype.verticalAlignmentTypeBuilder = function($value$$) {
  return proto.ux.improv.Property.Text.VerticalAlignmentType[$value$$ || "VERTICAL_ALIGNMENT_UNSPECIFIED"];
};
module$exports$improv$proto.Builders.prototype.textTransformTypeBuilder = function($value$$) {
  return proto.ux.improv.Property.Text.TextTransformType[$value$$ || "TRANSFORMATION_TYPE_UNSPECIFIED"];
};
module$exports$improv$proto.Builders.prototype.textDecorationTypeBuilder = function($value$$) {
  return proto.ux.improv.Property.Text.TextDecorationType[$value$$ || "DECORATION_TYPE_UNSPECIFIED"];
};
module$exports$improv$proto.Builders.prototype.materialDataBuilder = function($data$$) {
  var $materialData$$ = new proto.ux.improv.Property.MaterialData;
  this.conditionalSetField_($materialData$$, $data$$, "componentName");
  this.conditionalSetField_($materialData$$, $data$$, "themeColors", this.themeColorBuilder.bind(this));
  this.conditionalSetField_($materialData$$, $data$$, "textAreas", this.textAreaBuilder.bind(this));
  return $materialData$$;
};
module$exports$improv$proto.Builders.prototype.themeColorBuilder = function($data$$) {
  var $themeColor$$ = new proto.ux.improv.Property.MaterialData.ThemeColor;
  this.conditionalSetField_($themeColor$$, $data$$, "label");
  this.conditionalSetField_($themeColor$$, $data$$, "paletteColorLabel");
  return $themeColor$$;
};
module$exports$improv$proto.Builders.prototype.textAreaBuilder = function($data$$) {
  var $textArea$$ = new proto.ux.improv.Property.MaterialData.TextArea;
  this.conditionalSetField_($textArea$$, $data$$, "label");
  this.conditionalSetField_($textArea$$, $data$$, "content");
  return $textArea$$;
};
module$exports$improv$proto.Builders.prototype.cornerTypeBuilder = function($value$$) {
  return proto.ux.improv.Theme.CornerType[$value$$ || "CORNER_TYPE_UNSPECIFIED"];
};
module$exports$improv$proto.Builders.prototype.artBoardBuilder = function($data$$) {
  var $artBoard$$ = new proto.ux.improv.Property.ArtBoard;
  this.conditionalSetField_($artBoard$$, $data$$, "scale");
  this.conditionalSetField_($artBoard$$, $data$$, "color", this.colorBuilder.bind(this));
  this.conditionalSetField_($artBoard$$, $data$$, "origin", this.positionBuilder.bind(this));
  return $artBoard$$;
};
module$exports$improv$proto.Builders.prototype.componentModifierBuilder = function($data$$) {
  var $componentModifier$$ = new proto.ux.improv.Property.ComponentModifier;
  this.conditionalSetField_($componentModifier$$, $data$$, "type", this.componentModifierTypeBuilder.bind(this));
  this.conditionalSetField_($componentModifier$$, $data$$, "id");
  this.conditionalSetField_($componentModifier$$, $data$$, "parentId");
  this.conditionalSetField_($componentModifier$$, $data$$, "label");
  this.conditionalSetField_($componentModifier$$, $data$$, "value");
  return $componentModifier$$;
};
module$exports$improv$proto.Builders.prototype.componentModifierTypeBuilder = function($value$$) {
  return proto.ux.improv.Property.ComponentModifier.ComponentModifierType[$value$$ || "MODIFIER_TYPE_UNSPECIFIED"];
};
module$exports$improv$proto.Builders.prototype.cornerRadiiBuilder = function($data$$) {
  var $cornerRadii$$ = new proto.ux.improv.Property.CornerRadii;
  this.conditionalSetField_($cornerRadii$$, $data$$, "radii");
  return $cornerRadii$$;
};
module$exports$improv$proto.Builders.prototype.iconBuilder = function($data$$) {
  var $icon$$ = new proto.ux.improv.Property.Icon;
  this.conditionalSetField_($icon$$, $data$$, "iconName");
  this.conditionalSetField_($icon$$, $data$$, "category", this.iconCategoryBuilder.bind(this));
  this.conditionalSetField_($icon$$, $data$$, "style", this.iconStyleBuilder.bind(this));
  this.conditionalSetField_($icon$$, $data$$, "size", this.iconSizeBuilder.bind(this));
  return $icon$$;
};
module$exports$improv$proto.Builders.prototype.iconCategoryBuilder = function($value$$) {
  return proto.ux.improv.Property.Icon.IconCategory[$value$$ || "ICON_CATEGORY_UNSPECIFIED"];
};
module$exports$improv$proto.Builders.prototype.iconStyleBuilder = function($value$$) {
  return proto.ux.improv.Property.Icon.IconStyle[$value$$ || "ICON_STYLE_UNSPECIFIED"];
};
module$exports$improv$proto.Builders.prototype.iconSizeBuilder = function($data$$) {
  var $iconSize$$ = new proto.ux.improv.Property.Icon.IconSize;
  this.conditionalSetField_($iconSize$$, $data$$, "value");
  this.conditionalSetField_($iconSize$$, $data$$, "unit", this.iconUnitBuilder.bind(this));
  return $iconSize$$;
};
module$exports$improv$proto.Builders.prototype.iconUnitBuilder = function($value$$) {
  return proto.ux.improv.Property.Icon.IconSize.Unit[$value$$ || "UNIT_UNSPECIFIED"];
};
goog.exportSymbol("improv.proto.Builders", module$exports$improv$proto.Builders);
goog.exportSymbol("improv.proto.Version", module$exports$improv$proto.Version);
var m2 = {
  /**
   * The list of Sketch objects taken into consideration when uploading data to
   * Gallery. Sketch objects which are not in the supported list below will be
   * ignored.
   * @const {!Array<string>}
   */
  SUPPORTED_SKETCH_OBJECTS: [
    'MSLayerGroup',
    'MSSymbolInstance',
    'MSTextLayer',
    'MSBitmapLayer',
    'MSRectangleShape',
    'MSOvalShape',
    'MSTriangleShape',
    'MSStarShape',
    'MSPolygonShape',
    'MSShapePathLayer', // Vectors
    'MSShapeGroup' // Combined shapes
  ],

  /**
   * Types of layers, keys are sketch names, values are proto enum values.
   * @const {!Object<string, string>}
   */
  LAYER_TYPES: {
    '': 'COMPONENT_TYPE_UNSPECIFIED',
    'ArtBoard': 'ART_BOARD',
    'GMComponent': 'GM_COMPONENT',
    'MaterialComponent': 'MATERIAL_COMPONENT',
    'MSSymbolInstance': 'BASIC_COMPONENT',
    'MSLayerGroup': 'GROUP',
    'MSTextLayer': 'TEXT',
    'MSBitmapLayer': 'BITMAP',
    'MaterialIcon': 'MATERIAL_ICON',
    'MSRectangleShape': 'SHAPE',
    'MSOvalShape': 'SHAPE',
    'MSTriangleShape': 'SHAPE',
    'MSStarShape': 'SHAPE',
    'MSPolygonShape': 'SHAPE',
    'MSShapePathLayer': 'SHAPE',
    'MSShapeGroup': 'SHAPE'
  },

  /**
   * The string used for art boards.
   * @const {string}
   */
  ART_BOARD_COMPONENT_TYPE: 'ArtBoard',

  /**
   * The string used for GM component types.
   * @const {string}
   */
  GM_COMPONENT_TYPE: 'GMComponent',

  /**
   * The string used for Material component types.
   * @const {string}
   */
  MATERIAL_COMPONENT_TYPE: 'MaterialComponent',

  /**
   * The key used on Sketch symbols to store Material metadata.
   * @const {string}
   */
  MATERIAL_METADATA_KEY: 'com.google.ux.material.spec_tools',

  /**
   * Types of border positions on layers.
   * @const {!Object<number, string>}
   */
  LAYER_BORDER_POSITIONS: {
    0: 'CENTER',
    1: 'INSIDE',
    2: 'OUTSIDE'
  },

  /**
   * Types of fills on layers.
   * @const {!Object<number, string>}
   */
  LAYER_FILL_TYPE: {
    0: 'FLAT_COLOR',
    1: 'GRADIENT',
    4: 'PATTERN',
    5: 'NOISE'
  },

 /**
  * Types of properties for layer and style data.
  * @const {!Object<string, string>}
  */
  PROPERTY_TYPES: {
    COLOR: 'color',
    FONT_SIZE: 'fontSize',
    STRING: 'string',
    MEASURE: 'measure'
  },

  /**
   * Types of blend modes on layers.
   * @const {!Object<number, string>}
   */
  BLEND_MODES: {
    0: 'NORMAL',
    1: 'DARKEN',
    2: 'MULTIPLY',
    3: 'DARKEN',
    4: 'LIGHTEN',
    5: 'SCREEN',
    6: 'COLOR_DODGE',
    7: 'OVERLAY',
    8: 'SOFT_LIGHT',
    9: 'HARD_LIGHT',
    10: 'DIFFERENCE',
    11: 'EXCLUSION',
    12: 'HUE',
    13: 'SATURATION',
    14: 'COLOR',
    15: 'LUMINOSITY'
  },

  /**
   * Types of blurs on layers.
   * @const {!Object<number, string>}
   */
  BLUR_TYPES: {
    0: 'GAUSSIAN',
    1: 'MOTION',
    2: 'ZOOM',
    3: 'BACKGROUND'
  },

  /**
   * Types of horizontal alignment used on text layers.
   * @const {!Object<number, string>}
   */
  TEXT_HORIZONTAL_ALIGNMENT: {
    0: 'LEFT',
    1: 'RIGHT',
    2: 'CENTER',
    3: 'JUSTIFY'
  },

  /**
   * Types of vertical alignment used on text layers.
   * @const {!Object<number, string>}
   */
  TEXT_VERTICAL_ALIGNMENT: {
    0: 'TOP',
    1: 'MIDDLE',
    2: 'BOTTOM'
  },

  /**
   * Types of text transforms.
   * @const {!Object<number, string>}
   */
  TEXT_TRANSFORMS: {
    0: '',
    1: 'UPPERCASE',
    2: 'LOWERCASE'
  },

  /**
   * Types of text decoration.
   * @const {!Object<number, string>}
   */
  TEXT_DECORATIONS: {
    0: '',
    1: 'UNDER_LINE',
    2: 'OVER_LINE',
    3: 'LINE_THROUGH'
  },

  /**
   * Number ranges that need to be normalized for the service.
   * @const {!Object}
   */
  RANGE_MAP: {
    contrast: {
      sketch: [0, 4],
      gallery: [-1, 1]
    },
    saturation: {
      sketch: [0, 2],
      gallery: [-1, 1]
    },
    hue: {
      sketch: [-3.141592653589793, 3.141592653589793],
      gallery: [-180, 180]
    },
    blur: {
      sketch: [0, 50],
      gallery: [0, 1]
    },
    shadow_blur: {
      sketch: [0, 999],
      gallery: [0, 1]
    }
  },

  /**
   * Parses an artboard and generates layer and theme data.
   * @param {!Object} exportableLayer
   * @param {!IMPArtboard} artboard
   * @param {!Object} context
   */
  parseArtboard: function(exportableLayer, artboard, context) {
    var scale = utils.getLargestExportRequest(exportableLayer).scale();
    var artboardData = this.generateArtboardData_(exportableLayer, scale);
    var builders = new improv.proto.Builders(improv.proto.Version.V0_1);

    // Temporary data generated and used while parsing this artboard.
    var parsedData = {
      // Text styles that are used on children of a symbol but are stored on the
      // symbol instead.
      symbolTextStyles: {}
    };

    var layers = this.parseChildren_(exportableLayer, null, scale, context,
        parsedData);

    // Add artboard data first to maintain the bottom-up order.
    layers.unshift(artboardData);

    var proto = builders.listLayersResponseBuilder({
      layers: layers,
      nextPageToken: ''
    });

    artboard.metadata = proto.serialize();
  },

  /**
   * Converts from a Sketch color to an RGBA proto ready object.
   * @private
   * @param {!Object} color
   * @return {!Object}
   */
  convertToRgbaProto_: function(color) {
    return {
      red: parseFloat(color.RGBADictionary().r),
      green: parseFloat(color.RGBADictionary().g),
      blue: parseFloat(color.RGBADictionary().b),
      alpha: {
        value: parseFloat(color.RGBADictionary().a)
      },
    };
  },

  /**
   * Gets the normalized value of a number within a range.
   * @param {number} value
   * @param {number} min
   * @param {number} max
   * @return {number}
   */
  normalizeByRange_: function(value, min, max) {
    return (value - min) / (max - min);
  },

  /**
   * Gets the de-normalized value of a number within a range.
   * @param {number} value
   * @param {number} min
   * @param {number} max
   * @return {number}
   */
  deNormalizeByRange_: function(value, min, max) {
    return (max - min) * value + min;
  },

  /**
   * Normalizes values from Sketch value range to Gallery value range.
   * @private
   * @param {string} type
   * @param {number} value
   * @return {number}
   */
  normalizeValue_: function(type, value) {
    var sketchMin = this.RANGE_MAP[type].sketch[0];
    var sketchMax = this.RANGE_MAP[type].sketch[1];
    var galleryMin = this.RANGE_MAP[type].gallery[0];
    var galleryMax = this.RANGE_MAP[type].gallery[1];
    var normalized = this.normalizeByRange_(
        parseFloat(value) || 0, sketchMin, sketchMax);
    return this.deNormalizeByRange_(normalized, galleryMin, galleryMax);
  },

  /**
   * Generates artboard data.
   * @private
   * @param {!Object} artboard
   * @param {number} scale
   * @return {!Object}
   */
  generateArtboardData_: function(artboard, scale) {
    var originX = parseInt(artboard.contentBounds().origin.x) * scale;
    var originY = parseInt(artboard.contentBounds().origin.y) * scale;
    var width = parseInt(artboard.contentBounds().size.width) * scale;
    var height = parseInt(artboard.contentBounds().size.height) * scale;

    var data = {
      name: '',
      displayName: utils.toString(artboard.name()),
      sourceInfo: {
        id: utils.toString(artboard.objectID()),
        sourceApplication: 'SKETCH'
      },
      type: 'ART_BOARD',
      boundingBox: {
        minX: 0,
        minY: 0,
        maxX: width,
        maxY: height,
      },
      properties: []
    };

    var prop = {
      artBoard: {
        scale: scale,
        origin: {
          x: originX,
          y: originY
        }
      }
    };

    // Even if the artboard has a background color, the user can opt to not
    // export the background color. This also generates a transparent
    // background in the exported image file. In this case, the color info
    // is not required.
    if (artboard.hasBackgroundColor() &&
        artboard.includeBackgroundColorInExport()) {
      prop.artBoard.color = this.convertToRgbaProto_(
          artboard.backgroundColor());
    }

    data.properties.push(prop);

    return data;
  },

  /**
   * Generates basic layer data as well as Material specific data.
   * @private
   * @param {!Object} layer
   * @param {!Object} parentLayer
   * @param {!Object} parentLayerData
   * @param {!Object} context
   * @param {number} scale
   * @param {!Object} parsedData
   * @return {?Object}
   */
  generateLayerData_: function(layer, parentLayer, parentLayerData, context,
      scale, parsedData) {
    if (!layer.isVisible()) {
      // Ignore hidden layers.
      return null;
    }

    var rect = layer.absoluteRect();
    var parentBounds = parentLayer.absoluteRect();

    var x = (rect.x() - parentBounds.x()) * scale;
    var y = (rect.y() - parentBounds.y()) * scale;

    // Offset origin if this layer is nested.
    if (parentLayerData) {
      x += parentLayerData.boundingBox.minX;
      y += parentLayerData.boundingBox.minY;
    }

    var isParentLocked = parentLayerData && parentLayerData.sourceInfo.isLocked;

    var data = {
      name: '',
      displayName: utils.toString(layer.name()),
      parentName: '',
      sourceInfo: {
        id: utils.toString(layer.objectID()),
        isLocked: isParentLocked || layer.isLocked(),
        sourceApplication: 'SKETCH'
      },
      type: this.LAYER_TYPES[utils.toString(layer.className())],
      boundingBox: {
        minX: parseInt(x),
        minY: parseInt(y),
        maxX: parseInt(x) + parseInt(rect.width() * scale),
        maxY: parseInt(y) + parseInt(rect.height() * scale)
      },
      properties: [],
      lastUpdateTime: {},
      theme: null,
    };

    if (layer.hasFixedWidth() || layer.hasFixedHeight()) {
      data.properties.push({
        aspect: {
          isFixedWidth: layer.hasFixedWidth(),
          isFixedHeight: layer.hasFixedHeight(),
        },
      });
    }

    if (layer.rotation() || layer.isFlippedHorizontal() ||
        layer.isFlippedVertical()) {
      data.properties.push({
        transformations: {
          rotation: layer.rotation() * -1,
          isFlippedHorizontal: layer.isFlippedHorizontal(),
          isFlippedVertical: layer.isFlippedVertical(),
        },
      });
    }

    data.properties.push({
      blend: {
        mode: this.BLEND_MODES[layer.style().contextSettings().blendMode()],
        opacity: layer.style().contextSettings().opacity(),
      },
    });

    if (parentLayerData) {
      data.sourceInfo.parentId = parentLayerData.sourceInfo.id;
    }

    this.generateStyleProperties_(layer, data, scale);

    if (data.type == 'TEXT') {
      this.generateTextProperties_(layer, data, scale, parsedData);
    } else if (data.type == 'BITMAP') {
      this.generateBitmapProperties_(layer, data);
    } else if (this.isSketchSymbol_(layer)) {
      // IMPORTANT: Generate material data first as overrides might require
      // Material Theme data.
      this.generateMaterialData_(layer, data);
      this.generateSymbolProperties_(layer, data, context, parsedData);
    }

    return data;
  },

 /**
  * Generates data for Material icons.
  * @private
  * @param {!Object} materialMetadata
  * @param {!Object} layer
  * @param {!Object} data
  */
  generateMaterialIconData_: function(materialMetadata, layer, data) {
    var iconParts = materialMetadata.symbolName.split('/');

    // Example: icon/action/alarm_on_24px
    if (iconParts.length == 3) {
      var id = iconParts[2];
      var idParts = id.split('_');
      var category = iconParts[1].toUpperCase();
      var size = idParts[idParts.length - 1];

      if (size != '24px') {
        return; // Currently unsupported or incorrect metadata.
      }

      // Remove size from name.
      idParts.splice(-1, 1);

      data.type = this.LAYER_TYPES.MaterialIcon;
      data.properties.push({
        icon: {
          iconName: utils.toString(idParts.join('_')),
          size: {
            value: 24,
            unit: 'PX'
          },
          category: utils.toString(category),
          style: utils.toString(materialMetadata.iconStyle)
        }
      });
    }
  },

 /**
  * Generates data for Material components.
  * @private
  * @param {!Object} materialMetadata
  * @param {!Object} layer
  * @param {!Object} data
  */
  generateMaterialComponentData_: function(materialMetadata, layer, data) {
    // Reset displayName as this is generated from static metadata.
    data.displayName = '';
    data.type = this.LAYER_TYPES[this.MATERIAL_COMPONENT_TYPE];

    var prop = {
      materialData: {
        componentName: utils.toString(materialMetadata.symbolName),
        themeColors: [],
        textAreas: []
      }
    };

    if (materialMetadata.theme) {
      // Use a try-catch block to ignore parsing errors.
      try {
        var json = JSON.parse(materialMetadata.theme);
        var theme = {
          displayName: utils.toString(this.getLibraryNameForSymbol_(layer)),
          paletteColors: [],
          textOptions: []
        };

        if (json.palettes) {
          this.parseColorPalettes_(json.palettes.PRIMARY, 'Primary',
              theme.paletteColors);
          this.parseColorPalettes_(json.palettes.SECONDARY, 'Secondary',
              theme.paletteColors);
        }

        if (json.textStyles) {
          this.parseMaterialTypography_(json.textStyles, theme.textOptions);
        }

        if (json.cornerType && json.cornerSizesDp) {
          theme.cornerType = json.cornerType;
          theme.cornerRadii = {
            radii: json.cornerSizesDp
          };
        }

        data.theme = theme;
        prop.materialData.componentName = utils.toString(materialMetadata.type);
      } catch (e) {}
    }

    data.properties.push(prop);
  },

 /**
  * Generates data for Material components and icons.
  * @private
  * @param {!Object} layer
  * @param {!Object} data Object to store generated information.
  * @return {!Object}
  */
  generateMaterialData_: function(layer, data) {
    var materialMetadata = this.getMaterialMetadataFromObject_(layer);

    if (!materialMetadata) {
      return;
    }

    if (materialMetadata.type == 'icon') {
      this.generateMaterialIconData_(materialMetadata, layer, data);
    } else {
      this.generateMaterialComponentData_(materialMetadata, layer, data);
    }
  },

  /**
   * Generates style information for a bitmap.
   * @private
   * @param {!Object} layer
   * @param {!Object} data
   */
  generateBitmapProperties_: function(layer, data) {
    var colorControls = layer.style().colorControls();

    if (!colorControls.isEnabled()) {
      return;
    }

    data.properties.push({
      colorAdjustment: {
        brightness: parseFloat(utils.toString(colorControls.brightness())),
        contrast: this.normalizeValue_('contrast',
            utils.toString(colorControls.contrast())),
        saturation: this.normalizeValue_('saturation',
            utils.toString(colorControls.saturation())),
        hue: this.normalizeValue_('hue', utils.toString(colorControls.hue()))
      }
    });
  },

  /**
   * Generates style information for a layer.
   * @private
   * @param {!Object} layer
   * @param {!Object} data
   * @param {number} scale
   */
  generateStyleProperties_: function(layer, data, scale) {
    this.generateFillProperties_(layer, data, scale);
    this.generateBorderProperties_(layer, data, scale);
    this.generateShadowData_(layer, data, true /* generateOuterShadow */,
        scale);
    this.generateShadowData_(layer, data, false /* generateOuterShadow */,
        scale);
    this.generateBlurData_(layer, data, scale);
    this.generateCornerRadiusData_(layer, data, scale);
  },

  /**
   * Generates corner radius information for a layer.
   * @private
   * @param {!Object} layer
   * @param {!Object} data
   * @param {number} scale
   */
  generateCornerRadiusData_: function(layer, data, scale) {
    if (layer.containsLayers()) {
      var path = layer.layers().firstObject();
      if (path && path.className() == 'MSRectangleShape') {
        if (path.cornerRadiusFloat()) {
          // TODO(gregmarshall): Support multiple corner radii.
          data.properties.push({
            cornerRadii: {
              radii: [path.cornerRadiusFloat() * scale]
            }
          });
        }
      }
    }
  },

  /**
   * Generates blur information for a layer.
   * @private
   * @param {!Object} layer
   * @param {!Object} data
   * @param {number} scale
   */
  generateBlurData_: function(layer, data, scale) {
    var blur = layer.style().blur();

    if (!blur.isEnabled()) {
      return;
    }

    var blurProp = {
      type: this.BLUR_TYPES[blur.type()],
      amount: this.normalizeValue_('blur', blur.radius())
    };

    switch(blur.type()) {
      case 1: // Motion Blur
        blurProp.motionAngle = parseFloat(blur.motionAngle());
        break;
      case 2: // Zoom Blur
        var center = blur.center();

        // Use `parseFloat` to convert to a JS float to use `toFixed`.
        blurProp.zoomX = parseFloat(center.x).toFixed(3);
        blurProp.zoomY = parseFloat(center.y).toFixed(3);
        break;
      default:
        // No additional data for Gaussian and Background blur.
        break;
    }

    data.properties.push({
      blur: blurProp
    });
  },

  /**
   * Generates border information for a layer.
   * @private
   * @param {!Object} layer
   * @param {!Object} data
   * @param {number} scale
   */
  generateBorderProperties_: function(layer, data, scale) {
    var firstEnabledBorder = layer.style().firstEnabledBorder();

    if (!firstEnabledBorder) {
      return;
    }

    data.properties.push({
      border: {
        positionType: this.LAYER_BORDER_POSITIONS[
            firstEnabledBorder.position()],
        color: this.convertToRgbaProto_(firstEnabledBorder.color()),
        width: firstEnabledBorder.thickness() * scale
      }
    });
  },

  /**
   * Generates fill information for a layer.
   * @private
   * @param {!Object} layer
   * @param {!Object} data
   * @param {number} scale
   */
  generateFillProperties_: function(layer, data, scale) {
    var firstEnabledFill = layer.style().firstEnabledFill();

    if (!firstEnabledFill) {
      return;
    }

    data.properties.push({
      fill: {
        type: this.LAYER_FILL_TYPE[firstEnabledFill.fillType()],
        blend: {
          mode: this.BLEND_MODES[
              firstEnabledFill.contextSettings().blendMode()],
          opacity: firstEnabledFill.contextSettings().opacity()
        },
        color: this.convertToRgbaProto_(firstEnabledFill.color())
      }
    });
  },

  /**
   * Generates shadow information for a layer.
   * @private
   * @param {!Object} layer
   * @param {!Object} data
   * @param {boolean} generateOuterShadow Generates outer shadow data when true,
   *     otherwise generates inner shadow data.
   * @param {number} scale
   */
  generateShadowData_: function(layer, data, generateOuterShadow, scale) {
    var enabledShadows = generateOuterShadow ? layer.style().enabledShadows() :
        layer.style().enabledInnerShadows();

    if (enabledShadows.length == 0) {
      return;
    }

    var firstEnabledShadow = enabledShadows[0];

    data.properties.push({
      shadow: {
        type: generateOuterShadow ? 'OUTER' : 'INNER',
        color: this.convertToRgbaProto_(firstEnabledShadow.color()),
        offsetX: firstEnabledShadow.offsetX() * scale,
        offsetY: firstEnabledShadow.offsetY() * scale,
        blur: this.normalizeValue_('shadow_blur',
            firstEnabledShadow.blurRadius()),
        spread: firstEnabledShadow.spread() * scale
      }
    });
  },

  /**
   * Generates typography information for a text layer.
   * @private
   * @param {!Object} layer
   * @param {!Object} data
   * @param {number} scale
   * @param {!Object} parsedData
   */
  generateTextProperties_: function(layer, data, scale, parsedData) {
    var style = layer.style && layer.style();
    var textStyle = style && style.textStyle && style.textStyle();
    var decodedAttributes = textStyle && textStyle.decodedAttributes();
    var encodedAttributes = textStyle && textStyle.encodedAttributes();

    var transformValue = decodedAttributes && utils.toString(
        decodedAttributes.MSAttributedStringTextTransformAttribute);
    var underlineValue = encodedAttributes && utils.toString(
        encodedAttributes.NSUnderline);
    var strikeThroughValue = encodedAttributes && utils.toString(
        encodedAttributes.NSStrikethrough);

    var transform = transformValue ?
        this.TEXT_TRANSFORMS[parseInt(transformValue) || 0] :
        this.TEXT_TRANSFORMS[0];
    var decoration = this.TEXT_DECORATIONS[0];

    if (encodedAttributes) {
      if (parseInt(underlineValue)) {
        decoration = this.TEXT_DECORATIONS[1];
      }
      if (parseInt(strikeThroughValue)) {
        decoration = this.TEXT_DECORATIONS[3];
      }
    }

    var property = {
      text: {
        content: utils.toString(layer.stringValue()),
        fontDisplayName: utils.toString(layer.font().displayName()),
        fontSize: layer.fontSize(),
        color: this.convertToRgbaProto_(layer.textColor()),
        characterSpacing: utils.toString(layer.characterSpacing()),
        paragraphSpacing: utils.toString(
            layer.paragraphStyle().paragraphSpacing()),
        lineHeight: layer.lineHeight() * scale,
        horizontalAlignment: utils.toString(
            this.TEXT_HORIZONTAL_ALIGNMENT[layer.textAlignment()]),
        verticalAlignment: utils.toString(
            this.TEXT_VERTICAL_ALIGNMENT[layer.verticalAlignment()]),
        textTransform: transform,
        textDecoration: decoration
      }
    };

    if (layer.sharedObject && layer.sharedObject()) {
      property.text.textStyleName = utils.toString(layer.sharedObject().name());
    } else if (layer.sharedStyle && layer.sharedStyle()) {
      property.text.textStyleName = utils.toString(layer.sharedStyle().name());
    } else if (parsedData.symbolTextStyles[layer.objectID()]) {
      property.text.textStyleName = utils.toString(
          parsedData.symbolTextStyles[layer.objectID()]);
    }

    data.properties.push(property);
  },

  /**
   * Generates override information for a symbol.
   * @private
   * @param {!Object} layer
   * @param {!Object} data
   * @param {!Object} context
   * @param {!Object} parsedData
   */
  generateSymbolProperties_: function(layer, data, context, parsedData) {
    var overrides = this.getOverrides_(layer, data, context, parsedData);

    if (overrides.length) {
      data.properties = data.properties.concat(overrides);
    }
  },

  /**
   * Checks for and returns Material metadata.
   * @private
   * @param {!Object} obj
   * @return {?Object}
   */
  getMaterialMetadataFromObject_: function(obj) {
    if (!this.isSketchSymbol_(obj)) {
      return null;
    }
    var master = obj.symbolMaster();
    var userInfo = master && master.userInfo();
    var metadata = userInfo && userInfo[this.MATERIAL_METADATA_KEY];
    return metadata;
  },

  /**
   * Extracts overrides from symbols.
   * @private
   * @param {!Object} symbol
   * @param {!Object} data
   * @param {!Object} context
   * @param {!Object} parsedData
   * @return {!Object}
   */
  getOverrides_: function(symbol, data, context, parsedData) {
    var output = [];
    var overrides = symbol.availableOverrides();

    if (!overrides) {
      return output;
    }

    utils.forEach(overrides, function(override) {
      this.parseOverride_(override, output, data, context, symbol, parsedData);

      if (override.internalChildren) {
        var children = override.internalChildren();
        if (children) {
           utils.forEach(children, function(child) {
             this.parseOverride_(child, output, data, context, symbol,
                 parsedData);
           }.bind(this));
        }
      }
    }.bind(this));

    return output;
  },

  /**
   * Checks if a palette/color combination exists within a palette of colors
   * and returns the color label if it is available.
   * @private
   * @param {string} paletteType
   * @param {string} colorName
   * @param {!Object} theme
   * @return {string}
   */
  getPaletteColorLabel_: function(paletteType, colorName, theme) {
    var result = '';

    if (!theme || !theme.paletteColors) {
      return result;
    }

    if (paletteType != 'primary' && paletteType != 'secondary') {
      return result;
    }

    utils.forEach(theme.paletteColors, function(color) {
      if (color.label.toLowerCase() == paletteType + ' ' + colorName) {
        result = color.label;
      }
    });

    return result;
  },

  /**
   * Returns the name of library that contains a given symbol.
   * @private
   * @param {!Object} symbol
   * @return {string}
   */
  getLibraryNameForSymbol_: function(symbol) {
    var master = symbol.symbolMaster && symbol.symbolMaster();
    var metadata = master && master.foreignObject && master.foreignObject();
    var libraryName = metadata && metadata.sourceLibraryName &&
        metadata.sourceLibraryName();
    return libraryName || '';
  },

 /**
  * Symbol instances return an empty list when querying for their children.
  * Converting instances to mutable objects fixes this.
  * @private
  * @param {!Object} symbol
  * @param {!Object} context
  * @return {!Object}
  */
  getMutableSymbol_: function(symbol, context) {
    var documentData = context.document.documentData();
    var master = documentData.symbolWithID(symbol.symbolID());

    if (master) {
      var immutableInstance = symbol.immutableModelObject();
      var immutableMaster = master.immutableModelObject();
      return immutableMaster.modifiedMasterByApplyingInstance_inDocument_(
          immutableInstance, null).newMutableCounterpart();
    } else {
      return symbol;
    }
  },

  /**
   * Checks if a layer is a direct child of a parent layer.
   * @param {!Object} child
   * @param {!Object} parent
   * @return {boolean}
   */
  isDirectChildOfParent_: function(child, parent) {
    if (child == parent) {
      return false;
    }

    var ancestors = child.ancestors();
    var directParent = null;

    if (ancestors.length > 0) {
      directParent = ancestors[ancestors.length - 1];
    }

    if (directParent && directParent == parent) {
      return true;
    } else {
      return false;
    }
  },

  /**
  * Checks if a given object is a Group.
  * @private
  * @param {!Object} obj
  * @return {boolean}
  */
  isGroup_: function(obj) {
   return obj.className() == 'MSLayerGroup';
  },

  /**
   * Checks if a given object is a Sketch symbol.
   * @private
   * @param {!Object} obj
   * @return {boolean}
   */
  isSketchSymbol_: function(obj) {
    return obj.className() == 'MSSymbolInstance';
  },

  /**
   * Parses children of a Sketch object and returns layer data.
   * @private
   * @param {!Object} parent
   * @param {?Object} parentData
   * @param {number} scale
   * @param {!Object} context
   * @param {!Object} parsedData
   * @return {!Array<!Object>}
   */
  parseChildren_: function(parent, parentData, scale, context, parsedData) {
    var layers = [];
    var source = parent;

    if (this.isSketchSymbol_(parent)) {
      source = this.getMutableSymbol_(parent, context);
    }

    var predicate = NSPredicate.predicateWithFormat('className IN %@',
        this.SUPPORTED_SKETCH_OBJECTS);
    var children = source.children().filteredArrayUsingPredicate(predicate);

    utils.forEach(children, function(child) {
      // `children()` returns all children under a layer, even layers deeply
      // nested inside child groups. Checking for direct children eliminates
      // duplicate layer data. This top-down parsing approach also excludes
      // children of hidden or locked groups.
      if (this.isDirectChildOfParent_(child, source)) {
        var data = this.generateLayerData_(child, source, parentData, context,
          scale, parsedData);

        if (data) {
          layers.push(data);
          if (this.isGroup_(child) || this.isSketchSymbol_(child)) {
            var innerLayers = this.parseChildren_(child, data, scale, context,
                parsedData);
            layers = layers.concat(innerLayers);
          }
        }
      }
    }.bind(this));

    return layers;
  },

  /**
   * Parses a Sketch override.
   * @param {!Object} override
   * @param {!Object} output
   * @param {!Object} data
   * @param {!Object} context
   * @param {!Object} symbol
   * @param {!Object} parsedData
   */
  parseOverride_: function(override, output, data, context, symbol,
      parsedData) {
    var type = override.affectedLayer().className();
    if (type != 'MSImmutableTextLayer' &&
        type != 'MSImmutableSymbolInstance') {
      return;
    }

    var label = override.overridePoint().layerName();
    var value = override.currentValue();

    // Encode the label to support special characters. Do not encode the value
    // yet as it might be upgraded to a Material property.
    label = utils.toString(label);

    if (!value) {
      return;
    }

    // Certain text styles are stored on a symbol even though they're being used
    // on one of their children. In this case, keep track of such text styles
    // when parsing the symbol so they can be referenced when parsing the
    // children.
    var documentData = context.document.documentData();
    var textStyle = documentData.textStyleWithID &&
        documentData.textStyleWithID(value);

    if (textStyle) {
      var affectedLayerId = override.affectedLayer().objectID();
      var textStyleName = textStyle.name();
      if (affectedLayerId && textStyleName) {
        parsedData.symbolTextStyles[affectedLayerId] = textStyleName;
      }
    }

    if (type == 'MSImmutableSymbolInstance') {
      var symbolMap = context.document.documentData().symbolMap();
      var overrideSymbol = symbolMap[value];

      if (!overrideSymbol) {
        return;
      }

      value = overrideSymbol.name();

      if (data.theme) {
        this.upgradeSymbolOverrideToMaterialProperty_(label, value, data);
      }
    }

    // Support special characters in values.
    value = utils.toString(value);

    if (data.theme && type == 'MSImmutableTextLayer') {
      utils.forEach(data.properties, function(prop) {
        if (prop.materialData) {
          prop.materialData.textAreas.push({
            label: label,
            content: value
          });
        }
      }.bind(this));
    }

    // Overrides for Material components are either upgraded if supported or
    // discarded if not supported.
    if (!data.theme) {
      output.push({
       componentModifier: {
         type: 'TEXT',
         id: '',
         parentId: '',
         label: label,
         value: utils.toString(value)
       }
     });
   }
  },

  /**
   * Generates color palette information
   * @private
   * @param {!Object} palette
   * @param {string} label
   * @param {!Array} colors
   */
  parseColorPalettes_: function(palette, label, colors) {
    if (!palette) {
      return;
    }

    var key = label.toUpperCase();
    var variantKey = key + '_VARIANT';

    utils.forEach(palette.colors, function(color, index) {
      colors.push({
        label: label + ' ' + (index == 0 ? 50 : index * 100),
        type: palette.mainColorIndex == index ? key : variantKey,
        color: {
          red: color.red,
          green: color.green,
          blue: color.blue,
          alpha: {
            value: color.alpha
          }
        }
      });
    });
  },

  /**
   * Generates text style information for Material components.
   * @private
   * @param {!Object} textStyles
   * @param {!Array} textOptions
   */
  parseMaterialTypography_: function(textStyles, textOptions) {
    if (!textStyles) {
      return;
    }

    var numbers = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX'];

    utils.forEach(Object.keys(textStyles), function(key) {
      var typographyInfo = textStyles[key].font;
      var metrics = textStyles[key].metrics;
      var parts = key.split('_');
      var title = parts[0];

      if (parts.length > 1) {
        title += '_' + numbers[parseInt(parts[1]) - 1];
      }

      var option = {
        type: title,
        fontFamilyName: typographyInfo.fontFamilyName,
        fontName: typographyInfo.fontName,
        fontWeight: typographyInfo.weight * 100
      };

      if (metrics && metrics.fontSize) {
        option.fontSize = parseFloat(metrics.fontSize);
      }

      textOptions.push(option);
    });
  },

  /**
   * Upgrades known symbol overrides to Material properties.
   * @private
   * @param {string} label
   * @param {string} value
   * @param {!Object} data
   */
  upgradeSymbolOverrideToMaterialProperty_: function(label, value, data) {
    var valueToUpgrade = value.replace(/ /g, '').toLowerCase();

    if (valueToUpgrade.indexOf('✱/color/') == 0) {
      var parts = valueToUpgrade.split('/');

      if (parts.length === 4) {
        var palette = parts[2];
        var colorName = parts[3];
        var colorLabel = this.getPaletteColorLabel_(palette, colorName,
            data.theme);

        if (colorLabel) {
          utils.forEach(data.properties, function(prop) {
            if (prop.materialData) {
              prop.materialData.themeColors.push({
                label: label,
                paletteColorLabel: colorLabel
              });
            }
          }.bind(this));
        }
      }
    }
  }
};
var utils = {
  /**
   * The name used when loading the plugin's OSX framework.
   * @const {string}
   */
  FRAMEWORK_NAME: 'GallerySketch',

  /**
   * The temporary folder under NSTemporaryDirectory used when generating PNG
   * previews for  the artboards to be uploaded.
   * @const {string}
   */
  TEMP_FOLDER: 'gallery-sketch-tmp/',

  /**
   * The file path to the logo's image file. This is generated at init time
   * using the plugin directory path.
   * @const {string}
   */
  PATH_TO_LOGO: '',

 /**
  * Converts a boolean value (0, 1) to a string (False, True).
  * @param {boolean} value
  * @return {string}
  */
  booleanToString: function(value) {
    return (value == 0) ? 'False' : 'True';
  },

  /**
   * Clones an object. Uses a fallback function if `Object.assign` is not
   * currently available.
   * @param {!Object} original
   * @return {!Object}
   */
  cloneObject: function(original) {
    if (Object.assign) {
      return Object.assign({}, original);
    } else {
      var fallback = function(objectToClone) {
        var newObject = {};
        for (var prop in objectToClone) {
          if (Object.prototype.hasOwnProperty.call(objectToClone, prop)) {
            newObject[prop] = objectToClone[prop];
          }
        }
        return newObject;
      };
      return fallback(original);
    }
  },

  /**
   * Loads the Gallery bundle.
   * @param {!Object} context The context for the current Sketch document.
   * @return {!Object} A new instance of IMPGallerySketchWindowController.
   */
  initBundle: function(context) {
    var scriptPath = context.scriptPath;
    var pluginRoot = scriptPath.stringByDeletingLastPathComponent();
    var bundlePath = pluginRoot + '/gallerysketchplugin.bundle';
    var bundle = NSBundle.bundleWithPath(bundlePath);
    var main = bundle.classNamed('IMPGallerySketchWindowController');

    if (!main) {
      NSLog('An error ocurred while loading GallerySketch.');
      return;
    }

    utils.PATH_TO_LOGO = pluginRoot + '/logo.png';

    var controller = IMPGallerySketchWindowController.new();
    controller.documentID = context.document.documentData().objectID();

    return controller;
  },

 /**
  * Generates a class that calls JS functions from the Obj-c layer.
  * @param {!Object<string, fn>} functionsToCall
  * @return {!Object}
  */
  createBridge: function(functionsToCall) {
    var className = 'GallerySketch_' + NSUUID.UUID().UUIDString();
    var delegateClassDesc = MOClassDescription
        .allocateDescriptionForClassWithName_superclass_(className, NSObject);

    delegateClassDesc.addInstanceMethodWithSelector_function_(
        'generateAllArtboards', functionsToCall.generateAllArtboards);

    delegateClassDesc.addInstanceMethodWithSelector_function_(
        'generateSelectedArtboards', functionsToCall.generateSelectedArtboards);

    delegateClassDesc.registerClass();

    return NSClassFromString(className).new();
  },

  /**
   * Loops through a list of items.
   * @param {!Array} list
   * @param {!Function} callback
   */
  forEach: function(list, callback) {
    if (!list || !callback) {
      return;
    }

    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  },

  /**
   * Returns all artboards.
   * @param {!Object} context The context for the current Sketch document.
   * @param {boolean} generateFile
   * @return {!Array<!IMPArtboard>}
   */
  getAllArtboards: function(context, generateFile) {
    var doc = context.document;
    var currentPage = doc.currentPage();
    var artboards = currentPage.artboards();
    var output = [];

    if (artboards.count() == 0) {
      return output;
    }

    this.forEach(artboards, function(artboard) {
      utils.generateArtboardData_(context, artboard, output, generateFile);
    }.bind(this));

    return output;
  },

  /**
   * Returns an export request for the largest scale.
   * @param {!Object} exportableLayer
   * @return {!Object}
   */
  getLargestExportRequest: function(exportableLayer) {
    var requests = MSExportRequest.exportRequestsFromExportableLayer(
        exportableLayer);
    var output = null;

    this.forEach(requests, function(request) {
      if (!output || request.scale() > output.scale()) {
        output = request;
      }
    }.bind(this));

    return output;
  },

  /**
   * Returns the selected artboards.
   * @param {!Object} context The context for the current Sketch document.
   * @param {boolean} generateFile
   * @return {!Array<!IMPArtboard>}
   */
  getSelectedArtboards: function(context, generateFile) {
    var doc = context.document;
    var currentPage = doc.currentPage();
    var selection = context.selection;
    var output = [];

    if (currentPage.artboards().count() == 0) {
      return output;
    }

    // The user can select multiple layers/groups on the same artboard.
    var uniqueArtboards = [];

    this.forEach(selection, function(selected) {
      var parentLayer = utils.getParentForSelection_(selected, currentPage);
      if (parentLayer.className() == 'MSArtboardGroup') {
        utils.addUniqueArtboard_(uniqueArtboards, parentLayer);
      }
    }.bind(this));

    this.forEach(uniqueArtboards, function(artboard) {
      utils.generateArtboardData_(context, artboard, output, generateFile);
    }.bind(this));

    return output;
  },

  /**
   * Checks if an object is empty.
   * @param {!Object} obj
   * @return {boolean}
   */
  isObjectEmpty: function(obj) {
    return Object.keys(obj).length == 0;
  },

 /**
  * Converts to a JS string.
  * @param {!Object} original
  * @return {string}
  */
  toString: function(original) {
    return (original == null) ? '' : '' + encodeURI(original);
  },

  /**
   * Adds an artboard to an array if it doesn't exist yet.
   * @private
   * @param {!Array<IMPArtboard>} artboards
   * @param {!IMPArtboard} artboard
   */
  addUniqueArtboard_: function(artboards, artboard) {
    var isAvailable = false;

    for (var a = 0; a < artboards.length; a++) {
      if (artboards[a] === artboard) {
        isAvailable = true;
      }
    }

    if (!isAvailable) {
      artboards.push(artboard);
    }
  },

  /**
   * Returns the parent object for a given selection.
   * @private
   * @param {!Object} selection
   * @param {!Object} currentPage
   * @return {!Object}
   */
  getParentForSelection_: function(selection, currentPage) {
    var parentGroup = selection.parentGroup();
    if (parentGroup === currentPage) {
      return selection;
    } else {
      // The user grouped the current selection. Ignore it and keep
      // looking for the parent artboard.
      return utils.getParentForSelection_(parentGroup, currentPage);
    }
  },

  /**
   * Parses an artboard and generates an image and layer data.
   * @private
   * @param {!Object} context
   * @param {!Object} exportableLayer
   * @param {!Array<!IMPArtboard>} artboards
   * @param {boolean} generateFile
   */
  generateArtboardData_: function(context, exportableLayer, artboards,
        generateFile) {
    var outputFolder = NSTemporaryDirectory() + utils.TEMP_FOLDER;
    var doc = context.document;
    var artboard = IMPArtboard.new();

    artboard.artboardID = exportableLayer.objectID();
    artboard.origin = exportableLayer.contentBounds().origin;
    artboard.size = exportableLayer.contentBounds().size;
    artboard.filePath = outputFolder + exportableLayer.objectID() + '.png';
    artboard.name = exportableLayer.name();

    if (generateFile) {
      m2.parseArtboard(exportableLayer, artboard, context);
    }

    artboards.push(artboard);

    // Same as:
    // [doc saveArtboardOrSlice:exportRequest toFile:filePath]
    if (generateFile) {
      var exportRequest = utils.getLargestExportRequest(exportableLayer);
      doc.saveArtboardOrSlice_toFile_(exportRequest, artboard.filePath());
    }
  }
};
/**
 * Main handler for the upload action.
 * @param {!Object} context
 */
var onUploadToGallery = function(context) {
  var gallerySketch = utils.initBundle(context);

  gallerySketch.artboardsCount = utils.getAllArtboards(context).length;
  gallerySketch.selectedArtboardsCount =
      utils.getSelectedArtboards(context).length;

  gallerySketch.bridge = utils.createBridge({
    generateAllArtboards: function() {
      gallerySketch.artboardsToUpload = utils.getAllArtboards(context, true);
    },
    generateSelectedArtboards: function() {
      gallerySketch.artboardsToUpload = utils.getSelectedArtboards(context,
          true);
    }
  });

  gallerySketch.loadWindow();
};
/**
 * Main handler for the sign out action.
 * @param {!Object} context
 */
var onSignOutFromGallery = function(context) {
  var gallerySketch = utils.initBundle(context);
  gallerySketch.signOut();
};
