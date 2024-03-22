from jinja2 import Environment, FileSystemLoader, select_autoescape


env = Environment(
    loader=FileSystemLoader("templates"),
    autoescape=select_autoescape(),
    lstrip_blocks=True,
)


def render_template(template_name: str, *args, **kwargs) -> str:
    template = env.get_template(template_name)
    template_str = template.render(*args, **kwargs)
    return template_str
