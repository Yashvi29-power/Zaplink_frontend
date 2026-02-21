## Team Number : 150

## Description
This PR addresses internal data integrity issues in the "Create Challenge" form by restricting date selection. Users can no longer select past dates for a challenge, and the end date is strictly required to be at least one day after the start date.

## Related Issue
N/A

## Type of Change
- [x] New feature (non-breaking change which adds functionality)
- [x] Style/UI improvement

## Changes Made
-   **Date Restrictions**: Implemented `min` date validation on HTML date inputs using `date-fns`.
-   **Start Date**: Restricted to today or future dates.
-   **End Date**:
    -   Disabled until a Start Date is selected.
    -   Restricted to at least one day after the selected Start Date.
-   **Auto-Validation**: Added logic to automatically clear the End Date field if it becomes invalid (i.e., before or equal to the Start Date) when the Start Date is changed.

## Screenshots (if applicable)
Visual documentation is provided in the walkthrough.

## Testing
- [x] Tested on Desktop (Chrome)
- [x] Tested logic for Start Date and End Date dependencies
- [x] No console errors or warnings
- [x] Code builds successfully

## Checklist
- [x] My code follows the project's code style guidelines
- [x] I have performed a self-review of my code
- [x] I have commented my code where necessary
- [x] My changes generate no new warnings
- [x] I have tested my changes thoroughly
- [x] All TypeScript types are properly defined
- [x] Tailwind CSS classes are used appropriately
- [x] Component is responsive across different screen sizes
- [x] I have read and followed the CONTRIBUTING.md guidelines

## Additional Notes
The implementation uses `date-fns` which was already a project dependency.
