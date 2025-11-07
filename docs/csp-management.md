# CSP Management

## Configuration

### Static Configuration

Edit `src/app/core/config/csp.config.ts`:

```typescript
export const TRUSTED_SOURCES = {
    discord: {
        main: "https://discord.com",
        cdn: "https://cdn.discordapp.com",
    },
    // Add new sources here
};
```

### Dynamic Management

Use `CSPService` for runtime changes:

```typescript
constructor(private cspService: CSPService) {}

addNewWidget() {
  this.cspService.addTrustedFrame('https://example.com');
}
```

## Service API

### Methods

- `addTrustedFrame(domain)` - Add frame source
- `addTrustedScript(domain)` - Add script source
- `addTrustedImage(domain)` - Add image source
- `removeTrustedDomain(domain)` - Remove from all directives
- `getCurrentConfig()` - Get current configuration
- `isDomainTrusted(domain)` - Check if domain is trusted

### Example: Add YouTube Widget

```typescript
this.cspService.addTrustedFrame("https://www.youtube.com");
this.cspService.addTrustedImage("https://i.ytimg.com");
```

### Example: Add Twitch Embed

```typescript
this.cspService.addTrustedFrame("https://player.twitch.tv");
this.cspService.addTrustedScript("https://embed.twitch.tv");
```

## Common Widget Configurations

### YouTube

- Frame: `https://www.youtube.com`, `https://www.youtube-nocookie.com`
- Images: `https://i.ytimg.com`

### Twitch

- Frame: `https://player.twitch.tv`, `https://embed.twitch.tv`
- Script: `https://embed.twitch.tv`

### Google Maps

- Frame: `https://www.google.com`
- Script: `https://maps.googleapis.com`
- Images: `https://maps.gstatic.com`

## Development vs Production

### Development

- Includes `unsafe-eval`, `unsafe-inline` for Angular
- Relaxed rules for debugging

### Production

Call `cspService.applyProductionCSP()` for stricter rules.
