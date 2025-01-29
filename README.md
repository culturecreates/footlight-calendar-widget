# Listing Widget

This is the widget used by Footlight CMS to display a list of events. The widget is designed to run in an iframe so it can be added to any website. The widget calls Footlight Open API and can can configured to have different appearences and events using [Footlight CMS](https://cms.footlight.io) by a user with an admin role.

## Params

The following attributes can be passed to the widget as a data attribute (div method) or search params (iframe method) to configure and customize Listing Widget

| Attribute   | Description | Required             |
|-------------|-------------|---------------------|
| data-calendar            | Unique slug of the calendar.   Example: `calendar-slug`             |  YES            |     
| data-calendar-name     | Name of the calendar displayed in the widget.                       |  NO               |
| data-locale          | Language code for the widget interface and content ( en, fr, ja). Default `en`  | NO               |
| data-color             | Primary color for the widget interface. Default `#047857`.          | NO   |                 
| data-limit             | Maximum number of events displayed in the widget.  Default  `9`      | NO |    
| data-height            | ONLY FOR IFRAME. Height of the widget. Accepts any valid CSS height value. Default `600px`     | NO |    
| data-font              | Font family used in the widget.  Default  `Roboto` | NO |      
| data-logo              | URL of the logo to be displayed within the widget.   | NO                  | 
| data-search-events-filter | Search filter string to narrow down displayed events. <br> Works for place, preformer, region, preson-organization. <br> Example:  `&place=6420c60f2831190064570c3a&region=63bc0b2d1c6b6c005aad5253`      | NO                  |         
| data-redirection-mode  | Specifies the event redirection behavior. Default:  `NONE`  Values: `EXTERNAL`\|`NONE`. <br>  **`EXTERNAL`**: Redirects users to the calendar's associated website for event details. <br> **`NONE`**: Displays event details in a popup widget (default behavior).      |    NO                       |


## Integration Guide

The Footlight widget can be added to a webpage using an iFrame or div.  

Note: Deep linking (to a particular day of events or event details) requires that the web page pass the received url search parameters to the widget (to discuss).

### div integration example:

The Footlight widget can be added to a webpage using a <div id="calendar-widget" ...> with  mandatory attributes.  ONLY one integration of the widget per webpage due to the unique id.

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
    data-calendar-name="calendar-name"                            
    data-locale="en"                                              
    data-color="#fc6060"                                          
    data-limit="6"                                                                                           
    data-font="Roboto"                                            
    data-logo="https://example.com/logo.png"                      
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





