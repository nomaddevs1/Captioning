from pydantic import BaseModel, field_validator
from typing import List, Literal, Dict, Optional
import re

# any integer or percentage between 0% and 100% inclusive:
line_regex = re.compile(r"^-?\d+$|^100%$|^[1-9]?[0-9]%$")
# any percentage between 0% and 100% inclusive:
clamped_percent_regex = re.compile(r"^100%$|^[1-9]?[0-9]%")
# css class / id name
css_class_id_regex = re.compile(r"^[A-Za-z_].*$")

# reference: https://www.tutorialrepublic.com/css-reference/css3-properties.php
CSS_PROPERTIES = [
    "align-content",
    "align-items",
    "align-self",
    "animation",
    "animation-delay",
    "animation-direction",
    "animation-duration",
    "animation-fill-mode",
    "animation-iteration-count",
    "animation-name",
    "animation-play-state",
    "animation-timing-function",
    "backface-visibility",
    "background",
    "background-attachment",
    "background-clip",
    "background-color",
    "background-image",
    "background-origin",
    "background-position",
    "background-repeat",
    "background-size",
    "border",
    "border-bottom",
    "border-bottom-color",
    "border-bottom-left-radius",
    "border-bottom-right-radius",
    "border-bottom-style",
    "border-bottom-width",
    "border-collapse",
    "border-color",
    "border-image",
    "border-image-outset",
    "border-image-repeat",
    "border-image-slice",
    "border-image-source",
    "border-image-width",
    "border-left",
    "border-left-color",
    "border-left-style",
    "border-left-width",
    "border-radius",
    "border-right",
    "border-right-color",
    "border-right-style",
    "border-right-width",
    "border-spacing",
    "border-style",
    "border-top",
    "border-top-color",
    "border-top-left-radius",
    "border-top-right-radius",
    "border-top-style",
    "border-top-width",
    "border-width",
    "bottom",
    "box-shadow",
    "box-sizing",
    "caption-side",
    "clear",
    "clip",
    "color",
    "column-count",
    "column-fill",
    "column-gap",
    "column-rule",
    "column-rule-color",
    "column-rule-style",
    "column-rule-width",
    "column-span",
    "column-width",
    "columns",
    "content",
    "counter-increment",
    "counter-reset",
    "cursor",
    "direction",
    "display",
    "empty-cells",
    "flex",
    "flex-basis",
    "flex-direction",
    "flex-flow",
    "flex-grow",
    "flex-shrink",
    "flex-wrap",
    "float",
    "font",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "height",
    "justify",
    "justify-content",
    "left",
    "letter-spacing",
    "line-height",
    "list-style",
    "list-style-image",
    "list-style-position",
    "list-style-type",
    "margin",
    "margin-bottom",
    "margin-left",
    "margin-right",
    "margin-top",
    "max-height",
    "max-width",
    "min-height",
    "min-width",
    "opacity",
    "order",
    "outline",
    "outline-color",
    "outline-offset",
    "outline-style",
    "outline-width",
    "overflow",
    "overflow-x",
    "overflow-y",
    "padding",
    "padding-bottom",
    "padding-left",
    "padding-right",
    "padding-top",
    "page-break-after",
    "page-break-before",
    "page-break-inside",
    "perspective",
    "perspective-origin",
    "position",
    "quotes",
    "resize",
    "right",
    "tab-size",
    "table-layout",
    "text-align",
    "text-align-last",
    "text-decoration",
    "text-decoration-color",
    "text-decoration-line",
    "text-decoration-style",
    "text-indent",
    "text-justify",
    "text-overflow",
    "text-shadow",
    "text-transform",
    "top",
    "transform",
    "transform-origin",
    "transform-style",
    "transition",
    "transition-delay",
    "transition-duration",
    "transition-property",
    "transition-timing-function",
    "vertical-align",
    "visibility",
    "white-space",
    "width",
    "word-break",
    "word-spacing",
    "word-wrap",
    "z-index",
]


class WebVTTCueOptions(BaseModel):
    vertical: Optional[Literal["lr", "rl", None]] = None
    line: Optional[str] = None
    position: Optional[str] = None
    size: Optional[str] = None
    align: Optional[Literal["start", "center", "end", None]] = None
    style: Optional[Dict[str, str]] = None

    @field_validator("line")
    @classmethod
    def check_line(cls, value):
        assert re.search(line_regex, value) != None
        return value

    @field_validator("position", "size")
    @classmethod
    def check_position(cls, value):
        assert re.search(clamped_percent_regex, value)
        return value


class WebVTTCue(BaseModel):
    id: Optional[str] = None
    start: float
    end: float
    payload: List[str]
    options: Optional[WebVTTCueOptions] = None
    style: Optional[dict] = None

    @field_validator("id")
    @classmethod
    def check_id(cls, value):       
        assert re.search(css_class_id_regex, value) 
        return value

    @field_validator("style")
    @classmethod
    def check_style(cls, value):
        for key in value.keys():
            assert key in CSS_PROPERTIES

        return value


class WebVTTData(BaseModel):
    cues: List[WebVTTCue]
    style: Optional[dict] = None

    @field_validator("style")
    @classmethod
    def check_style(cls, value):
        for key in value.keys():
            assert key in CSS_PROPERTIES

        return value
