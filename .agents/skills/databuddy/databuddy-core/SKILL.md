---
name: databuddy-core
description: Use the core Databuddy SDK for browser-side tracking utilities, event tracking, and global tracker access. Use when implementing analytics in vanilla JavaScript or when you need direct access to the core tracking functions.
metadata:
  author: databuddy
  version: "2.3"
---

# Databuddy Core SDK

The core SDK (`@databuddy/sdk`) provides browser-side tracking utilities and types.

## External Documentation

For the most up-to-date documentation, fetch: **https://databuddy.cc/llms.txt**

## When to Use This Skill

Use this skill when:
- Implementing analytics in vanilla JavaScript applications
- Need direct access to core tracking functions
- Working with the global tracker (`window.databuddy`)
- Setting up declarative tracking with data attributes
- Configuring advanced tracking options and filters

## Installation

```bash
bun add @databuddy/sdk
```

## Exports

```typescript
import {
  detectClientId,
  createScript,
  isScriptInjected,
  // Tracker utilities
  track,
  trackError,
  flush,
  clear,
  getTracker,
  isTrackerAvailable,
  getAnonymousId,
  getSessionId,
  getTrackingIds,
  getTrackingParams,
} from "@databuddy/sdk";
```

## Configuration

### DatabuddyConfig

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `clientId` | `string` | Auto-detect | Project client ID (auto-detects from `NEXT_PUBLIC_DATABUDDY_CLIENT_ID`) |
| `clientSecret` | `string` | — | Server-side only secret |
| `apiUrl` | `string` | `https://basket.databuddy.cc` | Custom API endpoint |
| `scriptUrl` | `string` | `https://cdn.databuddy.cc/databuddy.js` | Custom script URL |
| `disabled` | `boolean` | `false` | Disable all tracking |
| `debug` | `boolean` | `false` | Enable debug logging |

### Tracking Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `trackHashChanges` | `boolean` | `false` | Track URL hash changes |
| `trackAttributes` | `boolean` | `false` | Track data-* attributes |
| `trackOutgoingLinks` | `boolean` | `false` | Track outgoing link clicks |
| `trackInteractions` | `boolean` | `false` | Track user interactions |
| `trackScrollDepth` | `boolean` | `false` | Track scroll depth |
| `trackPerformance` | `boolean` | `true` | Track performance metrics |
| `trackWebVitals` | `boolean` | `false` | Track Web Vitals |
| `trackErrors` | `boolean` | `false` | Track JavaScript errors |

### Optimization Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `samplingRate` | `number` | `1.0` | Sampling rate (0.0-1.0) |
| `enableRetries` | `boolean` | `false` | Retry failed requests |
| `maxRetries` | `number` | `3` | Max retry attempts |
| `initialRetryDelay` | `number` | `500` | Initial retry delay (ms) |
| `enableBatching` | `boolean` | `true` | Enable event batching |
| `batchSize` | `number` | `10` | Events per batch (1-50) |
| `batchTimeout` | `number` | `2000` | Batch timeout (ms) |
| `ignoreBotDetection` | `boolean` | `false` | Track bots |
| `usePixel` | `boolean` | `false` | Use pixel tracking |

### Filtering Options

| Option | Type | Description |
|--------|------|-------------|
| `filter` | `(event) => boolean` | Filter function to skip events |
| `skipPatterns` | `string[]` | Glob patterns to skip tracking |
| `maskPatterns` | `string[]` | Glob patterns to mask paths |

## Global Tracker

The tracker is available at `window.databuddy` or `window.db`:

```typescript
// Track custom event
window.databuddy.track("signup", { plan: "pro" });

// Manual page view
window.databuddy.screenView({ section: "pricing" });

// Set global properties
window.databuddy.setGlobalProperties({
  plan: "enterprise",
  abVariant: "checkout-v2",
});

// Clear session (call on logout)
window.databuddy.clear();

// Force flush queued events
window.databuddy.flush();
```

## Event Types

### Pre-defined Events

| Event | Properties |
|-------|------------|
| `screen_view` | `time_on_page`, `scroll_depth`, `interaction_count`, `is_bounce` |
| `page_exit` | `time_on_page`, `scroll_depth`, `interaction_count`, `page_count`, `is_bounce` |
| `button_click` | `button_text`, `button_type`, `button_id`, `element_class` |
| `link_out` | `href`, `text`, `target_domain` |
| `form_submit` | `form_id`, `form_name`, `form_type`, `success` |
| `web_vitals` | `fcp`, `lcp`, `cls`, `fid`, `ttfb`, `load_time` |
| `error` | `message`, `filename`, `lineno`, `colno`, `stack` |

### Base Event Properties

All events include these base properties:

- `__path` - Page URL
- `__title` - Page title
- `__referrer` - Referrer URL
- `__timestamp_ms` - Timestamp
- `sessionId` - Session ID
- `viewport_size` - Viewport dimensions
- `timezone` - User timezone
- `language` - User language
- UTM parameters (`utm_source`, `utm_medium`, etc.)

## Declarative Tracking

Use data attributes for click tracking without JavaScript:

```html
<button
  data-track="cta_clicked"
  data-button-text="Get Started"
  data-location="hero"
>
  Get Started
</button>
```

Properties are auto-converted from kebab-case to camelCase:
`{ buttonText: "Get Started", location: "hero" }`

## SDK Functions

### track

```typescript
import { track } from "@databuddy/sdk";

await track("purchase", {
  product_id: "sku-123",
  amount: 99.99,
});
```

### flush

Force send all queued events:

```typescript
import { flush } from "@databuddy/sdk";

await flush();
```

### clear

Reset the session (generates new IDs):

```typescript
import { clear } from "@databuddy/sdk";

clear();
```

### getTrackingIds

Get current anonymous and session IDs:

```typescript
import { getTrackingIds } from "@databuddy/sdk";

const { anonymousId, sessionId } = getTrackingIds();
```
