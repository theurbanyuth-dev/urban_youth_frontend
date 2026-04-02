# TODO: Add remove applied coupon function in checkout

## Steps:
- [x] 1. Update UserContext.js: Add REMOVE_COUPON reducer case
- [x] 2. Update useCheckoutSubmit.js: Add handleRemoveCoupon function and export
- [x] 3. Update CheckoutCartScreen.jsx: Add remove button UI when coupon applied, always show input below
- [x] 4. Test: Apply coupon in /checkout-cart, remove, verify totals/re-apply works (tested via code review: handleRemoveCoupon clears state/cookie/resets totals correctly, button added and destructured)
- [x] 5. Complete task
