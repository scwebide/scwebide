ace.define("ace/theme/supercollider_dark",["require","exports","module","ace/lib/dom"], function(require, exports, module) {

exports.isDark = true;
exports.cssClass = "ace-supercollider-dark";
exports.cssText = `.ace-supercollider-dark .ace_gutter {
background: #25282c;
color: #C5C8C6
}
.ace-supercollider-dark .ace_print-margin {
width: 1px;
background: #25282c
}
.ace-supercollider-dark {
background-color: #1D1F21;
color: #C5C8C6
}
.ace-supercollider-dark .ace_cursor {
color: #AEAFAD
}
.ace-supercollider-dark .ace_marker-layer .ace_selection {
background: #373B41
}
.ace-supercollider-dark.ace_multiselect .ace_selection.ace_start {
box-shadow: 0 0 3px 0px #1D1F21;
}
.ace-supercollider-dark .ace_marker-layer .ace_step {
background: rgb(102, 82, 0)
}
.ace-supercollider-dark .ace_marker-layer .ace_bracket {
margin: -1px 0 0 -1px;
border: 1px solid #4B4E55
}
.ace-supercollider-dark .ace_marker-layer .ace_active-line {
background: #282A2E
}
.ace-supercollider-dark .ace_gutter-active-line {
background-color: #282A2E
}
.ace-supercollider-dark .ace_marker-layer .ace_selected-word {
border: 1px solid #373B41
}
.ace-supercollider-dark .ace_invisible {
color: #4B4E55
}
.ace-supercollider-dark .ace_keyword,
.ace-supercollider-dark .ace_meta,
.ace-supercollider-dark .ace_storage{
  color: #fbc138
}
.ace-supercollider-dark .ace_storage.ace_type,
.ace-supercollider-dark .ace_support.ace_type {
  color: #f66;
  font-weight: bold
}
.ace-supercollider-dark .ace_keyword.ace_operator {
color: #8ABEB7
}
.ace-supercollider-dark .ace_constant.ace_character,
.ace-supercollider-dark .ace_constant.ace_numeric{
color: #C391FF
}
.ace-supercollider-dark .ace_keyword.ace_other.ace_unit,
.ace-supercollider-dark .ace_support.ace_constant,
.ace-supercollider-dark .ace_constant.ace_language,
.ace-supercollider-dark .ace_variable.ace_parameter {
color: #00ff64
}
.ace-supercollider-dark .ace_constant.ace_other {
color: #CED1CF
}
.ace-supercollider-dark .ace_invalid {
color: #CED2CF;
background-color: #DF5F5F
}
.ace-supercollider-dark .ace_invalid.ace_deprecated {
color: #CED2CF;
background-color: #B798BF
}
.ace-supercollider-dark .ace_fold {
background-color: #81A2BE;
border-color: #C5C8C6
}
.ace-supercollider-dark .ace_entity.ace_name.ace_function,
.ace-supercollider-dark .ace_support.ace_function,
.ace-supercollider-dark .ace_variable {
color: #81A2BE
}
.ace-supercollider-dark .ace_support.ace_class,
.ace-supercollider-dark .ace_support.ace_type {
color: #2BDFFD;
font-weight: bold;
}
.ace-supercollider-dark .ace_heading,
.ace-supercollider-dark .ace_markup.ace_heading,
.ace-supercollider-dark .ace_string {
color: #FFC17F
}
.ace-supercollider-dark .ace_entity.ace_name.ace_tag,
.ace-supercollider-dark .ace_entity.ace_other.ace_attribute-name,
.ace-supercollider-dark .ace_meta.ace_tag,
.ace-supercollider-dark .ace_string.ace_regexp,
.ace-supercollider-dark .ace_variable {
color: #CC6666
}
.ace-supercollider-dark .ace_comment {
color: #969896
}
.ace-supercollider-dark .ace_indent-guide {
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNgYGBgYHB3d/8PAAOIAdULw8qMAAAAAElFTkSuQmCC) right repeat-y
}`;

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});                (function() {
                    ace.require(["ace/theme/supercollider_dark"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
