<<<<<<< HEAD
## Team Number : Team

## Description
<!-- Provide a brief description of what this PR does -->


## Related Issue
<!-- Link to the issue this PR addresses -->
Closes #(issue number)

## Type of Change
<!-- Please check the relevant option(s) -->
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Performance improvement
- [ ] Style/UI improvement

## Changes Made
<!-- List the specific changes you made -->
- 
- 
- 

## Screenshots (if applicable)
<!-- Add before/after screenshots for UI changes -->

**Before:**


**After:**


## Testing
<!-- Describe the tests you ran to verify your changes -->
- [ ] Tested on Desktop (Chrome/Firefox/Safari)
- [ ] Tested on Mobile (iOS/Android)
- [ ] Tested responsive design (different screen sizes)
- [ ] No console errors or warnings
- [ ] Code builds successfully (`npm run build`)

## Checklist
<!-- Mark completed items with [x] -->
- [ ] My code follows the project's code style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code where necessary
- [ ] My changes generate no new warnings
- [ ] I have tested my changes thoroughly
- [ ] All TypeScript types are properly defined
- [ ] Tailwind CSS classes are used appropriately (no inline styles)
- [ ] Component is responsive across different screen sizes
- [ ] I have read and followed the [CONTRIBUTING.md](CONTRIBUTING.md) guidelines

## Additional Notes
<!-- Any additional information, concerns, or context -->
=======
fix/refactor/standardize-type-safety-T132
## Team Number : Team 132

main

## Description
This PR focuses on a comprehensive type-safety overhaul and standardization of the core frontend architecture. 
It resolves over 100 ESLint errors and warnings, primarily targeting unsafe any usages and missing hook dependencies.
By introducing robust interfaces for Users and LeetCode profiles, the application now boasts reliable property access and improved maintainability.
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
>>>>>>> upstream/main
