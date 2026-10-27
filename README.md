# Listing Widget

This is the widget used by Footlight CMS to display a list of events. It can be added to any website, either with a `<div>` or an `<iframe>`. The widget calls the Footlight Open API and can be configured to have different appearances and events using [Footlight CMS](https://cms.footlight.io) by a user with an admin role.

**Live demo:** https://culturecreates.github.io/footlight-widget-demo/

## Contents

- [Integration Guide](#integration-guide)
- [Params](#params)
- [Share Links (Deep Linking)](#share-links-deep-linking)
- [Google Analytics](#google-analytics)
- [Updating Widget Versions](#updating-widget-versions)
- [Performance](#performance)
- [Technical Support](#technical-support)

## Integration Guide

The widget can be added to a webpage using a div or an iframe.

| Method | Best for | Google Analytics |
|--------|----------|------------------|
| **div** | Most flexible and seamless integration. Parameters are configured manually. | ✅ Supported |
| **iframe** | Simplest integration. The code is generated in Footlight CMS. | ❌ Not supported |

### div integration example

Add a `<div id="calendar-widget" ...>` with the required attributes and include the widget's JavaScript and CSS files.

Note: ONLY one widget per webpage, because the id must be unique in the webpage.

```html
<head>
  <!-- Include the widget's JavaScript and CSS files -->
  <script defer="defer" src="https://listing-widget.footlight.io/v2/static/js/widget.js"></script>
  <link href="https://listing-widget.footlight.io/v2/static/css/widget.css" rel="stylesheet" />
</head>

<body>
  <div
    id="calendar-widget"
    data-calendar="calendar-slug"
    data-locale="en"
    data-color="#fc6060"
    data-limit="6"
    data-font="Roboto"
    data-redirection-mode="NONE"
    data-disable-grouping="true"
    data-filter-options="DATES|PLACE"
    data-show-footer-logo="true"
  ></div>
</body>
```

### iframe integration example

The iframe code is generated in Footlight CMS. Parameters are passed as search params using the camelCase attribute names (see [Params](#params)).

```html
<iframe
  src="https://listing-widget.footlight.io/v2/index.html?calendar=calendar-slug&locale=en&color=%23fc6060&limit=6&font=Roboto&redirectionMode=NONE&disableGrouping=true&filterOptions=DATES%7CPLACE"
  width="100%"
  height="1000px"
  frameborder="0">
</iframe>
```

## Params

The following attributes can be passed to the widget as a data attribute (div method) or as a search param (iframe method) to configure and customize the widget.

| Data attribute (div) | Search param (iframe) | Description | Required |
|----------------------|-----------------------|-------------|----------|
| `data-calendar` | `calendar` | Unique slug of the calendar. Example: `calendar-slug` | YES |
| `data-locale` | `locale` | Language code for the widget interface and content. Values: `en`, `fr`, `ja`. | YES |
| `data-color` | `color` | Primary color for the widget interface. Example: `#fc6060` (encode `#` as `%23` in a search param). | YES |
| `data-limit` | `limit` | Number of events loaded per page. | YES |
| `data-font` | `font` | Font family used in the widget. Example: `Roboto` | YES |
| `data-redirection-mode` | `redirectionMode` | Event redirection behavior. Values: `NONE`\|`EXTERNAL`. <br> **`NONE`**: displays event details in a popup inside the widget. <br> **`EXTERNAL`**: redirects users to the calendar's associated website for event details. | YES |
| `data-disable-grouping` | `disableGrouping` | Whether to display sub-events separately. Values: `true`\|`false`. | YES |
| `data-filter-options` | `filterOptions` | Filters available in the widget, separated by <code>\|</code>. `DATES` is **mandatory** and must always be included. Additional filters: `PLACE`, and taxonomy IDs for Event Type or Audience taxonomies. <br><br> **Example:** <code>DATES\|PLACE\|ID_OF_EVENT_TYPE_TAXONOMY</code> | YES |
| `data-height` | `height` | Height of the widget. Accepts any valid CSS height value; a plain number is treated as pixels. Default: `auto` (div), `1000px` (iframe). | NO |
| `data-header-title` | `headerTitle` | Title displayed above the widget. | NO |
| `data-show-footer-logo` | `showFooterLogo` | Whether to display the Footlight logo in the footer. Values: `true`\|`false`. | NO |
| `data-footer-text` | `footerText` | Text displayed in the footer. | NO |
| `data-search-events-filters` | `searchEventsFilters` | Pre-filter string to narrow down the displayed events. Works for place, performer, region and person-organization. <br> Example: `&place=6420c60f2831190064570c3a&region=63bc0b2d1c6b6c005aad5253` | NO |

Notes:
- Boolean values must be exactly `true` or `false`.
- If a required parameter is missing, the widget displays an error listing the missing parameters.
- Earlier versions of this README documented `data-show-footer` and `data-search-events-filter`. These names are not recognized; use `data-show-footer-logo` and `data-search-events-filters`.

## Share Links (Deep Linking)

The widget's share buttons generate links that reopen the widget in the same state, for example filtered by place, artist, or date range. These links can be shared on social media or encoded in a QR code.

The widget state is stored in search params prefixed with `footlight-`, appended to the parent page URL. Any existing parent page params are preserved. When the widget loads, it reads these params and then removes them from the address bar.

Example (events at a specific place):

```
https://example.com/events?footlight-place=6750c87caa8e940063f3d3af
```

| Search param | Description |
|--------------|-------------|
| `footlight-place` | Place ID(s), comma-separated. |
| `footlight-EventType` | Event Type concept ID(s), comma-separated. |
| `footlight-Audience` | Audience concept ID(s), comma-separated. |
| `footlight-startDateSpan` | Start of the date range (`YYYY-MM-DD`). |
| `footlight-endDateSpan` | End of the date range (`YYYY-MM-DD`). |
| `footlight-isDateRange` | `true` if a date range is selected. |
| `footlight-searchDate` | Selected date(s), comma-separated. |
| `footlight-searchKeyWord` | Search keyword. |
| `footlight-eventId` | Opens the details of a specific event. |
| `footlight-pageNumber` | Number of pages of results to load. |
| `footlight-initialLimit` | Number of events per page. |

Deep links work with the div method because the widget reads the parent page URL.

## Google Analytics

The widget does **no tracking on its own**. It sends events to the parent page's Google Analytics (GA4) property **only if the parent page has set up Google Analytics** (`gtag.js`).

### Requirements

- Use the **div method**. With the iframe method the widget runs in a separate page and cannot reach the parent page's `gtag`, so no events are sent.
- The parent page must load `gtag.js` with its Measurement ID, for example:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Events

All event names are prefixed with `footlight_`, and every event includes `event_category: "Footlight Widget"`.

| Event name | Triggered when | Parameters |
|------------|----------------|------------|
| `footlight_list_events` | The widget calls the calendar events API (initial load, filtering, pagination). | `calendar_slug`, `parent_url`, `query_string` |
| `footlight_list_share` | A user clicks the event list share button. | `calendar_slug`, `parent_url`, `query_string`, `social_media` |
| `footlight_event_click` | A user clicks an event in the list. | `calendar_slug`, `parent_url`, `event_uri` |
| `footlight_event_share` | A user clicks the event details share button. | `calendar_slug`, `parent_url`, `event_uri`, `social_media` |
| `footlight_artist_url` | A user clicks an artist's website or social media link. | `calendar_slug`, `parent_url`, `event_uri`, `artist_url` |

Parameter details:
- `calendar_slug`: slug of the calendar displayed by the widget.
- `parent_url`: full URL of the page hosting the widget.
- `query_string`: search params of the page or share link.
- `event_uri`: Footlight URI of the event, e.g. `http://lod.footlight.io/resource/<eventId>`.
- `social_media`: the share target selected by the user.
- `artist_url`: the artist link that was clicked.

### Viewing the events in GA4

- Use **Reports → Realtime** or **Admin → DebugView** to confirm that events are arriving.
- To use the event parameters in standard reports and explorations, register them as event-scoped custom dimensions in **Admin → Custom definitions** (e.g. `calendar_slug`, `event_uri`).

## Updating Widget Versions

Each new major release of the widget is available under a new version directory. For example, if you are currently using version v1 and v2 is released, follow these steps:

### For div method

Update the JavaScript and CSS file references to point to the new major version:

```html
<head>
  <script defer="defer" src="https://listing-widget.footlight.io/v2/static/js/widget.js"></script>
  <link href="https://listing-widget.footlight.io/v2/static/css/widget.css" rel="stylesheet" />
</head>
```

### For iframe method

Update the iframe src URL to reflect the new version:

```
src="https://listing-widget.footlight.io/v2/index.html?..."
```

### Versioning format

- The widget follows semantic versioning. Only the major version (e.g., v1, v2) is relevant for embedding.
- Minor and patch versions do not require changes in the integration code, as updates are automatically applied to the referenced major version.

## Performance

The widget is built with React and loads asynchronously, so it does not block the parent page. It is designed for mobile devices with limited bandwidth. Assets are served from Amazon S3 through CloudFront, with edge locations worldwide.

## Technical Support

Support requests for all Culture Creates products are handled in a central GitHub repository: https://github.com/culturecreates/tech-support-tickets
