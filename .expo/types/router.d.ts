/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/events` | `/(tabs)/profile` | `/(tabs)/tickets` | `/_sitemap` | `/admin` | `/admin/audit` | `/admin/dashboard` | `/admin/dashboard.spec` | `/admin/events` | `/admin/reports` | `/admin/system-health` | `/admin/system-health.spec` | `/admin/users` | `/admin/users.spec` | `/auth` | `/auth/callback` | `/auth/forgot-password` | `/auth/login` | `/auth/login.spec` | `/auth/register` | `/auth/register.spec` | `/auth/reset-password` | `/events` | `/index.spec` | `/navigation-flow.e2e.spec` | `/organizer` | `/organizer/attendees` | `/organizer/dashboard` | `/organizer/dashboard/payment-settings` | `/organizer/discounts` | `/organizer/discounts.spec` | `/organizer/events` | `/organizer/events/create` | `/organizer/events/create.spec` | `/organizer/events/tickets` | `/organizer/events/tickets.spec` | `/organizer/invoices` | `/organizer/invoices.spec` | `/organizer/reports` | `/organizer/settings` | `/profile` | `/terms` | `/theme-demo` | `/tickets` | `/user/tickets`;
      DynamicRoutes: `/event/${Router.SingleRoutePart<T>}` | `/event/${Router.SingleRoutePart<T>}/index.spec` | `/event/${Router.SingleRoutePart<T>}/register` | `/event/${Router.SingleRoutePart<T>}/registration-flow.spec` | `/organizer/events/${Router.SingleRoutePart<T>}/attendees` | `/organizer/events/${Router.SingleRoutePart<T>}/checkin` | `/organizer/invoices/${Router.SingleRoutePart<T>}` | `/registration/confirmation/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/event/[id]` | `/event/[id]/index.spec` | `/event/[id]/register` | `/event/[id]/registration-flow.spec` | `/organizer/events/[eventId]/attendees` | `/organizer/events/[eventId]/checkin` | `/organizer/invoices/[id]` | `/registration/confirmation/[id]`;
    }
  }
}
