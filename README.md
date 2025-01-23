# calendar-widget

This is the widget used by Footlight CMS to display a list of events. The widget is designed to run in an iframe so it can be added to any website. The widget calls Footlight Open API and can can configured to have different appearences and events using [Footlight CMS](https://cms.footlight.io) by a user with an admin role.

## CMS Widget Integration Guide

* div integration example:
```
<head>
  <!-- Include the widget's JavaScript and CSS files -->
  <script defer="defer" src="https://listing-widget.footlight.io/v0/static/js/widget.js"></script>
  <link href="https://listing-widget.footlight.io/v0/static/css/widget.css" rel="stylesheet" />
</head>

<body>
  <div
    id="calendar-widget"
    data-api="api.footlight.io"                                   <!-- Base API URL -->
    data-calendar="calendar-slug"                                 <!-- Unique slug of the calendar -->
    data-calendar-name="calendar-name"                            <!-- Name of the calendar -->
    data-locale="en"                                              <!-- interface language (en/fr/ja) -->
    data-color="#fc6060"                                          <!-- Primary color for the widget -->
    data-limit="6"                                                <!-- Maximum number of events displayed -->
    data-height="600px"                                           <!-- Widget height -->
    data-font="Roboto"                                            <!-- Font family for the widget -->
    data-logo="https://example.com/logo.png"                      <!-- Logo URL -->
    data-search-events-filter="filter-string"                     <!-- Search filters for events -->
    data-redirection-mode="EXTERNAL"                              <!-- Specifies the event redirection behavior. Accepted values are `EXTERNAL` and `NONE`.
                                                                            - `EXTERNAL`: Redirects users to the calendar's associated website for event details.
                                                                            - `NONE`: Displays event details in a popup widget. This is the default behavior. --> 
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





