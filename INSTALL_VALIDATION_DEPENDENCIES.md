# 📦 Install Validation System Dependencies

## Required Package

The validation system requires one additional package:

```bash
npm install @radix-ui/react-radio-group
```

## What This Package Does

`@radix-ui/react-radio-group` provides accessible radio button components used in the validation modal for:
- Price opinion selection (Over Priced / Fair Price / Under Priced)
- Validation type selection (Location / Price / Property Exists / General)

## Installation Steps

1. Open your terminal in the project root
2. Run the installation command:
   ```bash
   npm install @radix-ui/react-radio-group
   ```
3. Wait for installation to complete
4. Restart your development server:
   ```bash
   npm run dev
   ```

## Verify Installation

After installation, check that the validation modal works:
1. Go to `/dashboard/notifications`
2. Click "Validate Property" on any notification
3. Modal should open without errors
4. Radio buttons should be clickable

## Alternative: Manual Installation

If npm install doesn't work, try:

```bash
# Using yarn
yarn add @radix-ui/react-radio-group

# Using pnpm
pnpm add @radix-ui/react-radio-group
```

## Troubleshooting

### Error: "Cannot find module '@radix-ui/react-radio-group'"
**Solution**: Run the installation command above

### Error: "Peer dependency warnings"
**Solution**: These are usually safe to ignore. The package will still work.

### Error: "Module not found after installation"
**Solution**: 
1. Delete `node_modules` folder
2. Delete `package-lock.json`
3. Run `npm install`
4. Restart dev server

## Package Information

- **Package**: @radix-ui/react-radio-group
- **Version**: Latest (will install automatically)
- **Size**: ~15KB
- **License**: MIT
- **Documentation**: https://www.radix-ui.com/docs/primitives/components/radio-group

## Already Installed Radix UI Packages

Your project already has these Radix UI packages (no additional installation needed):
- @radix-ui/react-avatar
- @radix-ui/react-checkbox
- @radix-ui/react-dialog
- @radix-ui/react-dropdown-menu
- @radix-ui/react-label
- @radix-ui/react-select
- @radix-ui/react-slider
- @radix-ui/react-tabs
- And more...

The radio-group package follows the same pattern and integrates seamlessly.

## After Installation

Once installed, all validation features will work:
- ✅ Property validation modal
- ✅ Price opinion selection
- ✅ Validation type selection
- ✅ Anonymous voting system
- ✅ Community feedback

**You're all set!** 🎉
