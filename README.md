# calendar-widget

This is the widget used by Footlight CMS to display a list of events. The widget is designed to run in an iframe so it can be added to any website. The widget calls Footlight Open API and can can configured to have different appearences and events using [Footlight CMS](https://cms.footlight.io) by a user with an admin role.

### Params of the Lising Widget

The following attributes can be passed to the widget as a data attribute (div method) or search params (iframe method) to configure and customize Listing Widget

| Attribute                 | Description                                                                                       | Default Value       | Example Value                          |
|---------------------------|---------------------------------------------------------------------------------------------------|---------------------|----------------------------------
| `data-calendar`          | Unique slug of the calendar.                                                                      | N/A                 | `calendar-slug`                       |
| `data-calendar-name`     | Name of the calendar displayed in the widget.                                                    | N/A                 | `My Calendar`                         |
| `data-locale`            | Language code for the widget interface ( en, fr, ja).                        | `en`                | `en`                                  |
| `data-color`             | Primary color for the widget interface.                                                          | `#047857`           | `#00ADEF`                             |
| `data-limit`             | Maximum number of events displayed in the widget.                                                | `9`                 | `10`                                  |
| `data-height`            | Height of the widget. Accepts any valid CSS height value.                                        | `600px`             | `500px`                               |
| `data-font`              | Font family used in the widget.                                                                  | `Roboto`            | `'Helvetica'`             |
| `data-logo`              | URL of the logo to be displayed within the widget.                                               | N/A                 | `https://example.com/logo.png`        |
| `data-search-events-filter` | Search filter string to narrow down displayed events.                                         | N/A                 |`&place=6420c60f2831190064570c3a&region=63bc0b2d1c6b6c005aad5253`       |
| `data-redirection-mode`  | Specifies the event redirection behavior.                                                        | `EXTERNAL`              | `NONE`                            |

#### Notes on `data-redirection-mode`
- **`EXTERNAL`**: Redirects users to the calendar's associated website for event details.  
- **`NONE`**: Displays event details in a popup widget (default behavior).

### Available options for `data-search-events-filter`

- `place`
- `region`
- `person-organization`
- `performer`

## CMS Widget Integration Guide

* div integration example:
```
<head>
  <!-- Include the widget's JavaScript and CSS files -->
  <script defer="defer" src="https://listing-widget.footlight.io/v1/static/js/widget.js"></script>
  <link href="https://listing-widget.footlight.io/v0/static/css/widget.css" rel="stylesheet" />
</head>

<body>
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
    data-logo="https://example.com/logo.png"                      
    data-search-events-filter="filter-string"                     
    data-redirection-mode="EXTERNAL"                              
  ></div>
</body>
```

* Iframe integration example
```
<iframe
  src="https://listing-widget.footlight.io/v1/index.html"
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





