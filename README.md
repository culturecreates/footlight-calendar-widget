# calendar-widget

This is the widget used by Footlight CMS to display a list of events. The widget is designed to run in an iframe so it can be added to any website. The widget calls Footlight Open API and can can configured to have different appearences and events using [Footlight CMS](https://cms.footlight.io) by a user with an admin role.

## CMS Widget Integration Guide

* div integration example:
```
<head>
  <script defer="defer" src="https://listing-widget.footlight.io/v0/static/js/widget.js"></script>
  <link href="https://listing-widget.footlight.io/v0/static/css/widget.css" rel="stylesheet" />
</head>

<body style="margin: 20px; font-family: 'Roboto', 'Helvetica', sans-serif">
  <div
    id="calendar-widget"
    data-api="api.footlight.io"
    data-calendar="calendar-slug"
    data-calendar-name="calendar-name"
    data-locale="en"
    data-color="#fc6060"
    data-limit="6"
    data-height="600px"
    data-font="Roboto"
  ></div>
</body>
```

* Iframe integration example
```
<iframe
  src="https://listing-widget.footlight.io/v0/index.html"
  width="100%"
  height="600px"
  frameborder="0">
</iframe>
```

## Updating Widget Versions

How to Update to a New Version

Each new major release of the widget will be available under a new version directory. For example, if you are currently using version v0 and a new version v1 is released, follow these steps:

### For div method
* Update the JavaScript and CSS file references to point to the new major version:
```
<head>
  <script defer="defer" src="https://listing-widget.footlight.io/v1/static/js/widget.js"></script>
  <link href="https://listing-widget.footlight.io/v1/static/css/widget.css" rel="stylesheet" />
</head>
```

### for iframe method
* Update the iframe src URL to reflect the new version:
```
src="https://listing-widget.footlight.io/v1/index.html"
```

### Versioning Format
* The widget follows semantic versioning. Only the major version (e.g., v1, v2) is relevant for embedding.
* Minor and patch versions do not require changes in the integration code, as updates will automatically be applied to the referenced major version.




