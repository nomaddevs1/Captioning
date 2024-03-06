import re

from pdf_generator import render_html, generate_pdf
from common_fixtures import mock_client, transcript_dict


def test_render_html(transcript_dict):
    transcript_data = {
        "settings": {
            # add settings here like color, font size, font type, bg color, etc.
        },
        "transcript": transcript_dict,
    }


    html = render_html(transcript_data)

    transcript_block_regex = re.compile(r"<p><strong>(\d+):(\d+)<\/strong> - (.+)<\/p>")

    groups = re.findall(transcript_block_regex, html)
    assert len(groups) == len(transcript_dict)

    for i, captured_text in enumerate(groups):
        start = int(captured_text[0])
        end = int(captured_text[1])
        text = captured_text[2]
        assert start == transcript_dict[i]["start"]
        assert end == transcript_dict[i]["end"]
        assert text == transcript_dict[i]["text"]

    transcript_data = {
        "settings": {
            "bg_color": "#ddffff",
            "font_size": "20px",
            "font_color": "black",
            "font": "Arial",
        },
        "transcript": [],
    }

    result = render_html(transcript_data)
    expect_styles = [
        re.compile(r"background-color:\s*#ddffff"),
        re.compile(r"font-size:\s*20px"),
        re.compile(r"color:\s*black"),
        re.compile(r"font-family:\s*Arial"),
    ]

    for style in expect_styles:
        assert style.search(result) != None


def test_render_html_missing_data():
    transcript_data = {
        "settings": {
            # add settings here like color, font size, font type, bg color, etc.
        },
        "transcript": [],
    }


    html = render_html(transcript_data)
    assert len(html) > 0

    transcript_block_regex = re.compile(r"<p><strong>(\d+):(\d+)<\/strong> - (.+)<\/p>")

    groups = re.findall(transcript_block_regex, html)
    assert len(groups) == 0


def test_generate_pdf():
    html_data = """\
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body {
      margin: 20px;
    }
  </style>
</head>
<body>
</body>
</html>\
"""

    pdf_data = generate_pdf(html_data)

    assert len(pdf_data) > 0


def test_generate_pdf_route_valid_data(mock_client, transcript_dict):
    mock_html_text = "<h1>Title</h2>"

    response = mock_client.post("/generate-pdf/", json={"raw_html": mock_html_text})

    assert response.status_code == 200
    assert response.text

    response = mock_client.post("/generate-pdf/", json={"transcript": transcript_dict})

    assert response.status_code == 200
    assert response.text


def test_generate_pdf_route_invalid_data(mock_client, transcript_dict):
    mock_html_text = "<h1>Title</h2>"
    response = mock_client.post(
        "/generate-pdf/",
        json={"raw_html": mock_html_text, "transcript": transcript_dict},
    )

    assert response.status_code == 400
    assert response.text

    response = mock_client.post("/generate-pdf/", json={})

    assert response.status_code == 400
    assert response.text
