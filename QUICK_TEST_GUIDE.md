# 🧪 QUICK TEST GUIDE - Platform Upgrade

## 🚀 Getting Started

```bash
# Install dependencies (if not already done)
npm install

# Generate Prisma client
npm run db:generate

# Start development server
npm run dev
```

Open: `http://localhost:3000`

---

## 👥 TEST USER ROLES

You'll need to test with 3 different user roles:

### 1. **OWNER/BROKER** (Property Creator)
- Can create properties
- Properties start in PENDING state
- Can view own properties

### 2. **PUBLIC** (Community Validator)
- Receives notifications for nearby properties
- Can submit anonymous opinions
- Can add validation comments

### 3. **ADMIN** (Platform Moderator)
- Can access admin dashboard
- Can approve/reject properties
- Can view all community signals

---

## 🧪 TEST SCENARIOS

### **Scenario 1: Create Property (OWNER/BROKER)**

1. Login as OWNER or BROKER
2. Navigate to: `/dashboard/properties/new`
3. Fill property form:
   - Title: "Spacious 3BHK in Salt Lake"
   - Price: 8500000
   - Area: 1200 sq ft
   - BHK: 3
   - Property Type: APARTMENT
   - Furnishing: SEMI_FURNISHED
   - Address: "Salt Lake, Sector V, Kolkata"
   - Click map to set location
   - Upload 2-5 images
4. Submit form
5. **Expected Result**:
   - Property created with status = PENDING
   - Redirected to "My Properties"
   - Property shows "PENDING" badge

---

### **Scenario 2: Receive Notification (PUBLIC)**

1. Login as PUBLIC user
2. **Important**: Set your location within 5km of the property
   - Go to `/dashboard/settings` (or profile)
   - Update your location coordinates
3. Navigate to: `/dashboard/notifications`
4. **Expected Result**:
   - See notification: "New property listed near you"
   - Property details visible (but NO owner name)
   - Button: "Review & Share Opinion"

---

### **Scenario 3: Submit Opinion (PUBLIC)**

1. From notification, click "Review & Share Opinion"
2. View property details page
3. Find "Community Price Discovery" section
4. Select opinion:
   - OVER_PRICED
   - FAIR_PRICE
   - UNDER_PRICED
5. Optionally add validation comment
6. Submit
7. **Expected Result**:
   - Success message
   - Opinion count increases
   - Cannot vote again (double-vote prevention)

---

### **Scenario 4: Admin Review (ADMIN)**

1. Login as ADMIN
2. Navigate to: `/dashboard/admin`
3. See pending properties count
4. Click "Verification Queue" or go to `/dashboard/admin/queue`
5. Click "Review" on a property
6. **Expected Result**:
   - See property details
   - See community opinions chart
   - See validation comments
   - See urban sprawl data (if available)
   - See owner information

---

### **Scenario 5: Approve Property (ADMIN)**

1. On property review page
2. Optionally add admin notes
3. Click "Approve Property"
4. **Expected Result**:
   - Property status → APPROVED, ACTIVE
   - Property now publicly searchable
   - Owner details now visible
   - Redirected to admin dashboard

---

### **Scenario 6: View Urban Sprawl Data**

1. View any property with urban sprawl data
2. Scroll to "Urban Growth Intelligence" section
3. **Expected Result**:
   - See 10-year growth chart
   - See CAGR percentage
   - See growth trend (Accelerating/Stable/Decelerating)
   - See investment score (0-100)
   - See market heat index chart
   - See AI recommendation

---

## 🔍 VERIFICATION CHECKLIST

### **Database Checks**:
```sql
-- Check property status
SELECT id, title, status, "verificationStatus", "isVerified" 
FROM "Property" 
WHERE id = 'your-property-id';

-- Check opinion group
SELECT * FROM "PropertyOpinionGroup" 
WHERE "propertyId" = 'your-property-id';

-- Check aggregated opinions
SELECT * FROM "OpinionAggregation" 
WHERE "opinionGroupId" = 'your-opinion-group-id';

-- Check notifications
SELECT * FROM "PropertyNotification" 
WHERE "propertyId" = 'your-property-id';
```

### **UI Checks**:
- [ ] Property card shows correct status badge
- [ ] Admin dashboard shows pending count
- [ ] Notifications page shows unread count
- [ ] Opinion charts display correctly
- [ ] Urban sprawl charts render
- [ ] Image gallery works (prev/next buttons)
- [ ] Mobile responsive design

---

## 🐛 COMMON ISSUES & FIXES

### **Issue 1: No notifications received**
**Cause**: User location not set or outside 5km radius
**Fix**: 
1. Update user location in database
2. Ensure coordinates are within 5km of property

### **Issue 2: Urban sprawl data not showing**
**Cause**: API not called or failed
**Fix**:
1. Check `.env` has correct API URL
2. Check network tab for API call
3. Verify property has `urbanSprawlData` records

### **Issue 3: Cannot vote twice (expected)**
**Cause**: Double-vote prevention working correctly
**Fix**: This is expected behavior. Use different browser/incognito to test

### **Issue 4: Admin routes not visible**
**Cause**: User role is not ADMIN
**Fix**: Update user role in database:
```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

---

## 📊 DEMO DATA SEEDING (OPTIONAL)

Create sample data for demo:

```typescript
// Run in Prisma Studio or create a seed script

// 1. Create test users at different locations
// 2. Create properties in PENDING state
// 3. Generate sample opinions
// 4. Add validation comments
```

---

## 🎬 DEMO FLOW (5 MINUTES)

1. **Show property creation** (1 min)
   - OWNER creates property
   - Show PENDING status

2. **Show community validation** (2 min)
   - PUBLIC user receives notification
   - Submits opinion
   - Show aggregated results

3. **Show geo-intelligence** (1 min)
   - Urban sprawl chart
   - CAGR calculation
   - Market insights

4. **Show admin approval** (1 min)
   - Admin reviews signals
   - Approves property
   - Property goes live

---

## ✅ SUCCESS CRITERIA

Your platform is working correctly if:
- [x] Properties start in PENDING state
- [x] Nearby users receive notifications
- [x] Opinions are anonymous and aggregated
- [x] Admin can approve/reject
- [x] Approved properties become publicly searchable
- [x] Urban sprawl data displays correctly
- [x] All roles have appropriate access

---

## 🆘 NEED HELP?

Check these files for implementation details:
- `src/actions/properties.ts` - Property creation & notifications
- `src/actions/opinions.ts` - Opinion system
- `src/actions/admin.ts` - Admin actions
- `src/lib/geo-intelligence.ts` - Data transformations
- `PLATFORM_UPGRADE_COMPLETE.md` - Full documentation

**Happy Testing!** 🎉
