# ORENVY AI Support Security Spec

## Data Invariants
1. A store configuration can only be modified by an authenticated admin.
2. Orders can only be read by the customer who placed them (matched via email) or an admin.
3. Chat histories are private between the customer and the support staff/admin.
4. Product information is public but immutable by non-admins.
5. Analytics are strictly restricted to admins.

## The "Dirty Dozen" Payloads (Deny Cases)
1. **Identity Spoofing**: Attempt to update `customerEmail` on an existing order to hijack it.
2. **Privilege Escalation**: Non-admin attempting to write to the `stores` collection.
3. **Data Pollution**: Setting a `1MB` string as a `storeId`.
4. **State Bypass**: Directly changing `chatStatus` from 'closed' to 'open' without proper auth.
5. **Orphaned Write**: Creating a chat message without a valid store reference.
6. **Query Scraping**: Attempting to list all orders without an admin role.
7. **Cross-Tenant Leak**: Account A trying to read a chat from Store B.
8. **Shadow Field**: Inserting `isVerified: true` into a user profile.
9. **Timestamp Manipulation**: Manually setting `createdAt` to a past date.
10. **Type Mismatch**: Sending a string price for a product.
11. **Negative Inventory**: Setting product inventory to `-999`.
12. **Unverified Access**: Non-verified email trying to access sensitive order data.

## Test Scenarios (Manual/Simulated)
- `getDoc` on `/stores/store1/orders/order1` as `attacker@gmail.com` -> REJECT
- `updateDoc` on `/stores/store1` as normal user -> REJECT
- `listDocs` on `/stores/store1/chats` as normal user -> REJECT
