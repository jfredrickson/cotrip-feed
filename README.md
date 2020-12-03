# cotrip-feed

This module provides a lightweight programmatic interface to the cotrip.org XML data feeds. It pulls the XML data and converts it into a JavaScript object.

## Usage

First, [sign up for an API key](https://manage-api.cotrip.org/) on the COtrip website.

```javascript
// Initialize the feed with your COtrip API key
const feed = require('cotrip-feed')({
  apiKey: 'YOUR_API_KEY'
});

// Print all alerts
feed.alerts(alerts => {
  console.log(alerts);
});
```

## Resources

* [XML Data Feeds specifications](https://www.cotrip.org/xmlFeed.htm)
* [API Access URLs](https://manage-api.cotrip.org/subscriber/apiDetails/xml) (requires registration)
