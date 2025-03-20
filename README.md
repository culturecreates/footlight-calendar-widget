# Listing Widget

This is the widget used by Footlight CMS to display a list of events. The widget is designed to run in an iframe so it can be added to any website. The widget calls Footlight Open API and can can configured to have different appearences and events using [Footlight CMS](https://cms.footlight.io) by a user with an admin role.

## Params

The following attributes can be passed to the widget as a data attribute (div method) or search params (iframe method) to configure and customize Listing Widget

| Attribute   | Description | Required             |
|-------------|-------------|---------------------|
| data-calendar            | Unique slug of the calendar.   Example: `calendar-slug`             |  YES            |     
| data-locale          | Language code for the widget interface and content ( en, fr, ja). | YES               |
| data-color             | Primary color for the widget interface.         | YES   |                 
| data-limit             | Maximum number of events displayed in the widget.      | YES |    
| data-height            | ONLY FOR IFRAME. Height of the widget. Accepts any valid CSS height value. Default `1000px`     | NO |    
| data-font              | Font family used in the widget. | YES |   
| data-header-title      | Header of the widget.                               | NO |
| data-show-footer       | Specifies whether to display the footer or not. Values: `true`\|`false`.        | Yes|
| data-disable-grouping  | Specifies whether to display sub-events separately or not. Values: `true`\|`false`. | Yes | 
| data-filter-options | Defines the filters available in the widget, allowing users to customize which filtering options are displayed. The `DATES` filter is **mandatory** and must always be included. Additional filters can be added, such as `PLACE`, `Event Type` (filters by event type taxonomy), and `Audience` (filters by audience type taxonomy). <br><br> Multiple filters can be enabled by separating them with <code>\|</code>. <br><br> **Example:** <code>DATES\|PLACE\|ID_OF_EVENT_TYPE_TAXONOMY</code> | YES          |
| data-search-events-filter | Search filter string to narrow down displayed events. <br> Works for place, performer, region, preson-organization. <br> Example:  `&place=6420c60f2831190064570c3a&region=63bc0b2d1c6b6c005aad5253`      | NO                  |         
| data-redirection-mode  | Specifies the event redirection behavior. Default:  `NONE`  Values: `EXTERNAL`\|`NONE`. <br>  **`EXTERNAL`**: Redirects users to the calendar's associated website for event details. <br> **`NONE`**: Displays event details in a popup widget (default behavior).      |    NO                      |


## Integration Guide

The Footlight widget can be added to a webpage using an iFrame or div.  

### div integration example:

The Footlight widget can be added to a webpage using <div id="calendar-widget" ...> with  mandatory attributes.  

Note: ONLY one widget per webpage because the id must be unique in the webpage.

```
<head>
  <!-- Include the widget's JavaScript and CSS files -->
  <script defer="defer" src="https://listing-widget.footlight.io/v1/static/js/widget.js"></script>
  <link href="https://listing-widget.footlight.io/v0/static/css/widget.css" rel="stylesheet" />
</head>

<body>
  <div
    id="calendar-widget"                             
    data-calendar="calendar-slug"                                                           
    data-locale="en"                                              
    data-color="#fc6060"                                          
    data-limit="6"                                                                                           
    data-font="Roboto"
    data-disable-grouping="true"
    data-show-footer="true"
    data-filter-options="DATES"                                                            
    data-search-events-filter="filter-string"                     
    data-redirection-mode="EXTERNAL"                              
  ></div>
</body>
```

### Iframe integration example
```
<iframe
  src="https://listing-widget.footlight.io/v1/index.html"
  width="100%"
  height="1000px"
  frameborder="0">
</iframe>
```

## Updating Widget Versions

How to Update to a New Version

Each new major release of the widget will be available under a new version directory. For example, if you are currently using version v1 and a new version v2 is released, follow these steps:

### For div method
* Update the JavaScript and CSS file references to point to the new major version:
```
<head>
  <script defer="defer" src="https://listing-widget.footlight.io/v2/static/js/widget.js"></script>
  <link href="https://listing-widget.footlight.io/v2/static/css/widget.css" rel="stylesheet" />
</head>
```

### for iframe method
* Update the iframe src URL to reflect the new version:
```
src="https://listing-widget.footlight.io/v2/index.html"
```

### Versioning Format
* The widget follows semantic versioning. Only the major version (e.g., v1, v2) is relevant for embedding.
* Minor and patch versions do not require changes in the integration code, as updates will automatically be applied to the referenced major version.





