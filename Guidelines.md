# Strot Design System Guidelines

## General Guidelines

* Use light mode as the default appearance - the application should always start in light mode
* Only use absolute positioning when necessary. Opt for responsive and well structured layouts that use flexbox and grid by default
* Refactor code as you go to keep code clean
* Keep file sizes small and put helper functions and components in their own files
* Use a base font-size of 14px throughout the application
* Follow proper TypeScript practices with strict typing

## Design System Guidelines

### Theme & Appearance
* **Default Theme**: Always default to light mode on first load
* **Theme Options**: Support Light, Dark, and System preference themes
* **Theme Persistence**: Save user's theme preference to localStorage
* **Theme Switching**: Instant theme switching without page reload

### Typography
* **Base Font Size**: 14px (defined in CSS custom properties)
* **Font Weights**: Use medium (500) for headings, normal (400) for body text
* **Line Height**: 1.5 for all text elements
* **Hierarchy**: h1 (text-2xl), h2 (text-xl), h3 (text-lg), h4 (text-base)

### Layout & Spacing
* **Mobile-first**: Design for mobile first, then enhance for desktop
* **Responsive**: Use grid and flexbox for responsive layouts
* **Card-based**: Use card components for content organization
* **Consistent Spacing**: Use Tailwind spacing scale consistently

### Components & Interactions
* **Animation**: Use motion/react for smooth transitions and micro-interactions
* **Loading States**: Provide loading feedback for all async operations
* **Error Handling**: Graceful error states with user-friendly messages
* **Accessibility**: Follow WCAG guidelines for all components

### Navigation
* **Compact Bottom Navigation**: Use compact, space-efficient navigation that takes minimal screen space
* **Universal Collapse**: Provide a universal collapse button accessible on all pages for full navigation control
* **Profile-aware**: Navigation should adapt based on user profile type (Employer gets "Find Talent", others get "Jobs")
* **Auto-minimize**: Automatically minimize navigation in chat/messaging interfaces
* **Clear Labels**: Use clear, action-oriented labels with minimal text (10px font size for compact design)
* **Smart Positioning**: Position navigation appropriately based on interface type (chat vs regular pages)

### Forms & Inputs
* **Validation**: Real-time validation with clear error messages
* **Accessibility**: Proper labels and ARIA attributes
* **Consistent Styling**: Use design system input components
* **Loading States**: Show loading during form submission

### Colors & Branding
* **Primary**: #030213 (dark blue)
* **Light Mode**: Clean whites and light grays
* **Dark Mode**: Dark backgrounds with proper contrast
* **Semantic Colors**: Clear destructive (red) and success (green) colors
* **Brand Consistency**: Maintain consistent color usage

### Performance
* **Code Splitting**: Use dynamic imports for large components
* **Image Optimization**: Use proper image formats and fallbacks
* **Bundle Size**: Keep bundle sizes reasonable with proper chunking
* **Loading Performance**: Optimize for fast initial page load

### User Experience
* **Progressive Enhancement**: Core functionality should work without JavaScript
* **Feedback**: Provide immediate feedback for user actions
* **Clear CTAs**: Make primary actions obvious and accessible
* **Consistent Patterns**: Use consistent interaction patterns throughout

## Component-Specific Guidelines

### Buttons
* **Primary**: Used for main actions (one per section)
* **Secondary**: Used for alternative actions (outlined style)
* **Destructive**: Used for dangerous actions (red color)
* **Loading States**: Show spinner during async operations

### Cards
* **Content Organization**: Use cards to group related content
* **Hover States**: Subtle hover effects for interactive cards
* **Consistent Padding**: Use consistent internal spacing
* **Clear Hierarchy**: Maintain visual hierarchy within cards

### Navigation
* **Compact Design**: Maximum 5 items in main navigation with compact 48px collapsed width
* **Active States**: Clear indication of current page/section with subtle color coding
* **Profile Adaptation**: Show relevant nav items based on user type (Employer vs Candidate)
* **Universal Collapse**: Global collapse button (blue gradient) accessible from any page
* **Multi-level Access**: Quick access to all job types, AI tools, social features, and settings
* **Space Efficient**: Reduced padding, smaller icons (16px), and compact text (10px) for minimal footprint
* **Clean Design**: No logout button in bottom navigation - logout is handled through top navigation or settings

### Forms
* **Field Grouping**: Group related fields together
* **Clear Labels**: Use descriptive labels for all inputs
* **Error Handling**: Show errors inline with clear messaging
* **Success States**: Provide confirmation for successful actions

### Modals & Dialogs
* **Purpose-driven**: Use modals only when necessary
* **Clear Actions**: Make primary and secondary actions obvious
* **Escape Routes**: Always provide ways to dismiss modals
* **Responsive**: Ensure modals work well on all screen sizes

## Typography Rules

* **Never override font sizes**: Do not use Tailwind font size classes (text-sm, text-lg, etc.) unless specifically requested
* **Font Weight**: Only use font weight classes if specifically needed
* **Line Height**: Let the default line-height (1.5) handle text spacing
* **Hierarchy**: Use semantic HTML elements (h1, h2, h3, p) for proper typography

## Motion & Animation Guidelines

* **Import**: Always use `import { motion } from 'motion/react'` for animations
* **Subtle Animations**: Use gentle, purposeful animations that enhance UX
* **Performance**: Prefer transform and opacity changes for smooth animations
* **Accessibility**: Respect user preferences for reduced motion

## Code Quality

* **TypeScript**: Use strict typing, avoid `any` types
* **Error Boundaries**: Implement proper error handling
* **Loading States**: Always provide loading feedback
* **Accessibility**: Include proper ARIA labels and semantic HTML

---

**Remember**: These guidelines ensure consistency across the Strot platform and provide users with a familiar, intuitive experience regardless of which part of the application they're using.