from pydantic import BaseModel, field_validator
from typing import List, Literal, Dict
import re

# any integer or percentage between 0% and 100% inclusive:
line_regex = re.compile(r"^-?\d+$|^100%$|^[1-9]?[0-9]%$")
# any percentage between 0% and 100% inclusive:
clamped_percent_regex = re.compile(r"^100%$|^[1-9]?[0-9]%")
# reference: https://www.tutorialrepublic.com/css-reference/css3-properties.php
CSS_PROPERTIES = [
    "align_content",
    "align_items",
    "align_self",
    "animation",
    "animation_delay",
    "animation_direction",
    "animation_duration",
    "animation_fill_mode",
    "animation_iteration_count",
    "animation_name",
    "animation_play_state",
    "animation_timing_function",
    "backface_visibility",
    "background",
    "background_attachment",
    "background_clip",
    "background_color",
    "background_image",
    "background_origin",
    "background_position",
    "background_repeat",
    "background_size",
    "border",
    "border_bottom",
    "border_bottom_color",
    "border_bottom_left_radius",
    "border_bottom_right_radius",
    "border_bottom_style",
    "border_bottom_width",
    "border_collapse",
    "border_color",
    "border_image",
    "border_image_outset",
    "border_image_repeat",
    "border_image_slice",
    "border_image_source",
    "border_image_width",
    "border_left",
    "border_left_color",
    "border_left_style",
    "border_left_width",
    "border_radius",
    "border_right",
    "border_right_color",
    "border_right_style",
    "border_right_width",
    "border_spacing",
    "border_style",
    "border_top",
    "border_top_color",
    "border_top_left_radius",
    "border_top_right_radius",
    "border_top_style",
    "border_top_width",
    "border_width",
    "bottom",
    "box_shadow",
    "box_sizing",
    "caption_side",
    "clear",
    "clip",
    "color",
    "column_count",
    "column_fill",
    "column_gap",
    "column_rule",
    "column_rule_color",
    "column_rule_style",
    "column_rule_width",
    "column_span",
    "column_width",
    "columns",
    "content",
    "counter_increment",
    "counter_reset",
    "cursor",
    "direction",
    "display",
    "empty_cells",
    "flex",
    "flex_basis",
    "flex_direction",
    "flex_flow",
    "flex_grow",
    "flex_shrink",
    "flex_wrap",
    "float",
    "font",
    "font_family",
    "font_size",
    "font_size_adjust",
    "font_stretch",
    "font_style",
    "font_variant",
    "font_weight",
    "height",
    "justify",
    "justify_content",
    "left",
    "letter_spacing",
    "line_height",
    "list_style",
    "list_style_image",
    "list_style_position",
    "list_style_type",
    "margin",
    "margin_bottom",
    "margin_left",
    "margin_right",
    "margin_top",
    "max_height",
    "max_width",
    "min_height",
    "min_width",
    "opacity",
    "order",
    "outline",
    "outline_color",
    "outline_offset",
    "outline_style",
    "outline_width",
    "overflow",
    "overflow_x",
    "overflow_y",
    "padding",
    "padding_bottom",
    "padding_left",
    "padding_right",
    "padding_top",
    "page_break_after",
    "page_break_before",
    "page_break_inside",
    "perspective",
    "perspective_origin",
    "position",
    "quotes",
    "resize",
    "right",
    "tab_size",
    "table_layout",
    "text_align",
    "text_align_last",
    "text_decoration",
    "text_decoration_color",
    "text_decoration_line",
    "text_decoration_style",
    "text_indent",
    "text_justify",
    "text_overflow",
    "text_shadow",
    "text_transform",
    "top",
    "transform",
    "transform_origin",
    "transform_style",
    "transition",
    "transition_delay",
    "transition_duration",
    "transition_property",
    "transition_timing_function",
    "vertical_align",
    "visibility",
    "white_space",
    "width",
    "word_break",
    "word_spacing",
    "word_wrap",
    "z_index",
]


class WebVTTCueOptions(BaseModel):
    vertical: Literal["lr", "rl", None] = None
    line: str = None
    position: str = None
    size: str = None
    align: Literal["start", "center", "end", None] = None
    style: Dict[str, str] = None

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

    @field_validator("style")
    @classmethod
    def check_style(cls, value):
        for key in value.keys():
            assert key in CSS_PROPERTIES


class WebVTTCue(BaseModel):
    id: str = None
    start: float
    end: float
    payload: List[str]
    options: WebVTTCueOptions = None
    style: dict = None


class WebVTTData(BaseModel):
    cues: List[WebVTTCue]
    style: dict = None
