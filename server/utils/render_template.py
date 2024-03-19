from jinja2 import Environment, FileSystemLoader, select_autoescape


env = Environment(
    loader=FileSystemLoader("templates"),
    autoescape=select_autoescape(),
    lstrip_blocks=True,
)


def vtt_timestamp(time: float):
    hours = int(time // 3600)
    minutes = int(time // 60)
    seconds = int(time)
    ms = int(1000 * (time - int(time)))
    
    return f"{hours:02d}:{minutes:02d}:{seconds:02d}.{ms:03d}"

env.filters["vtt_timestamp"] = vtt_timestamp

def render_template(template_name: str, *args, **kwargs) -> str:
    template = env.get_template(template_name)
    template_str = template.render(*args, **kwargs)
    return template_str
