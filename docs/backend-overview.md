# Backend & Data Overview

This document explains how the frontend communicates with the backend and what data shapes / endpoints are expected by this project.

## Key points

- The frontend does not contain any database logic — DB and server-state live on the backend service.
- All backend calls go through `ApiService` (`src/app/core/services/api.service.ts`).
- The base API URL is configured in `src/environments/environment.ts` (`environment.apiBaseUrl`).
- Several services wrap backend endpoints and provide fallbacks (dummy data) for development or when the backend is unavailable.

## Important services and endpoints

### ApiService
- Location: `src/app/core/services/api.service.ts`
- Simple wrapper around Angular `HttpClient` providing `get`, `post`, `put`, `patch`, `delete` methods and a common `ApiRequestOptions` shape.
- Use this service for any HTTP interaction to keep requests consistent and centralised.

### MemberService
- Location: `src/app/core/services/member.service.ts`
- Base URL: `${environment.apiBaseUrl}`
- Endpoints used by the frontend:
  - `GET ${baseUrl}/members` -> expected `MemberResponse` (see types below)
  - `GET ${baseUrl}/members/stats` -> expected `MemberStatsResponse`
  - `GET ${baseUrl}/members/:id` -> `Member`
  - `GET ${baseUrl}/members?rank=:rank` -> `MemberResponse`
  - `PATCH ${baseUrl}/members/:id` -> `Member` (update)
  - `GET ${baseUrl}/medals` -> `Medal[]`
  - `GET ${baseUrl}/campaign-ribbons` -> `CampaignRibbon[]`
  - `GET ${baseUrl}/abteilungen` -> `Abteilung[]`

Notes:
- `getAllMembers()` applies a `timeout(2000)` and falls back to a built-in dummy member list if the backend call fails.
- `getMemberStats()` falls back to a fixed distribution when the backend is unavailable.
- The service uses the central `ApiService` and is the single place to change request behavior for member-related endpoints.

### MedienService
- Location: `src/app/core/services/medien.service.ts`
- Endpoint used:
  - `GET ${baseUrl}/twitch/streams` -> expected `TwitchStream[]`
- The current implementation attempts the backend and falls back to a small dummy array with a single stream.

### Security / HTTP middleware
- `securityInterceptor` (`src/app/core/interceptors/security.interceptor.ts`) runs for HTTP requests and enforces simple rules (e.g. block http requests in https context, add headers).
- `securityGuard` (`src/app/core/guards/security.guard.ts`) is used for route-level checks (parameter validation, simple rate limiting, allowed routes list).
- `SanitizationService` (`src/app/core/services/sanitization.service.ts`) provides `sanitizeHtml`, `stripHtml`, and `isSafeUrl` utilities used before injecting dynamic HTML or opening external links.

## Data types (shared)
See `src/app/shared/types/member.types.ts` for canonical TypeScript interfaces. Important shapes:

- Member
```ts
interface Member {
  id: string;
  name: string;
  rank: 'offizier' | 'unteroffizier' | 'veteran' | 'soldat' | 'rekrut' | 'gast';
  avatar: string;
  memberSince: string; // ISO date string
  medals: Medal[];
  campaignRibbons: CampaignRibbon[];
  abteilungen: Abteilung[];
}
```

- MemberResponse
```ts
interface MemberResponse {
  members: Member[];
  total: number;
  lastUpdated: string;
}
```

- MemberStatsResponse
```ts
interface MemberStatsResponse {
  stats: Record<string, number>; // rank -> count
  totalMembers: number;
  activeMembers: number;
}
```

## Where the database logic lives
- This repository is the frontend only; there is no database code here.
- Database implementation, migrations, models and server-side business logic belong to the backend service(s) the frontend calls via the endpoints listed above.
- The frontend relies on the backend to expose a JSON REST API under the configured `apiBaseUrl`.
