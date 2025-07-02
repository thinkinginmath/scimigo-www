# CSS Architecture Integration Guide


### 1.2 CSS Variables
The `variables.css` file defines global custom properties:

```css
:root {
  /* Colors */
  --scimigo-background-light: #ffffff;
  --scimigo-background-dark: #1a1a1a;
  --scimigo-text-primary: #333333;
  --scimigo-text-primary-dark: #ffffff;
  
  /* Spacing */
  --scimigo-spacing-sm: 8px;
  --scimigo-spacing-md: 16px;
  --scimigo-spacing-lg: 24px;
  
  /* Border Radius */
  --scimigo-border-radius-sm: 4px;
  --scimigo-border-radius-md: 8px;
  --scimigo-border-radius-lg: 12px;
  
  /* Shadows */
  --scimigo-shadow-sm: 0 2px 4px rgba(0,0,0,0.1);
  --scimigo-shadow-lg: 0 4px 12px rgba(0,0,0,0.15);
  
  /* Transitions */
  --scimigo-transition-base: all 0.3s ease;
}
```

## 2. CSS Injection Methods

### 2.1 Shadow DOM Injection
Components use Shadow DOM for style encapsulation. CSS is injected in two ways:

1. **Direct Style Injection**:
```javascript
const styleElement = document.createElement('style');
styleElement.textContent = cssContent;
containerInstance.shadowRoot.appendChild(styleElement);
```

2. **Dynamic Import with Shadow DOM**:
```javascript
import('../../styles/base.css').then(baseStyles => {
  import('./ComponentName.css').then(componentStyles => {
    const styleElement = document.createElement('style');
    styleElement.textContent = baseStyles + componentStyles;
    containerInstance.shadowRoot.appendChild(styleElement);
  });
});
```

### 2.2 Component Container Creation
```javascript
createComponentContainer('component-name', {
  width: '600px',
  height: '600px',
  position: { bottom: '20px', right: '20px' },
  styleUrls: ['src/styles/base.css', 'src/components/Component/Component.css']
});
```

## 3. Lazy Loading

### 3.1 Component Module Loading
The `ProgressiveLoader` class handles lazy loading of components and their styles:

```javascript
class ProgressiveLoader {
  async loadDomainSpecific(domain) {
    const component = await import(`../components/${domain}Renderer`);
    const styles = await import(`../components/${domain}Renderer/${domain}Renderer.css`);
    return { component, styles };
  }
}
```

### 3.2 Resource Loading
CSS resources are loaded progressively based on component requirements:
- Base styles are loaded first
- Component-specific styles are loaded when needed
- Font resources (like KaTeX) are loaded on demand

## 4. Webpack Configuration

### 4.1 CSS Processing
```javascript
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                'autoprefixer',
                'postcss-custom-properties'
              ]
            }
          }
        }
      ]
    }
  ]
}
```

### 4.2 Build Process
1. CSS files are processed by PostCSS
2. Variables are resolved and fallbacks added
3. Styles are bundled with their respective components
4. Shadow DOM encapsulation is preserved

## 5. New Component Checklist

### 5.1 CSS Setup
1. Create component-specific CSS file in the component directory
2. Import base styles and variables
3. Use scoped class names with `scimigo-` prefix
4. Use CSS custom properties for theming

### 5.2 Dark Mode Support
1. Add dark mode styles using the `.scimigo-dark-mode` class:
```css
.scimigo-component {
  background: var(--scimigo-background-light);
  color: var(--scimigo-text-primary);
}

.scimigo-dark-mode .scimigo-component {
  background: var(--scimigo-background-dark);
  color: var(--scimigo-text-primary-dark);
}
```

### 5.3 Component Integration
1. Create component directory with index.jsx and ComponentName.css
2. Add component styles to Shadow DOM
3. Use CSS variables for themeable properties
4. Test in both light and dark modes
5. Verify style encapsulation
6. Add to lazy loading system if needed

### 5.4 Best Practices
- Use CSS custom properties for themeable values
- Maintain consistent naming conventions
- Keep styles modular and scoped
- Test across different color schemes
- Ensure proper fallbacks for CSS variables
- Document component-specific style requirements

## 6. ChatBubble Layout & Best Practices

### 6.1 Layout Structure

The ChatBubble uses a classic header + scrollable content + footer layout:

```
<div class="scimigo-chat-bubble">
  <div class="scimigo-chat-header"> ... </div>
  <div class="scimigo-chat-content"> ... </div>
  <div class="scimigo-chat-input"> ... </div>
</div>
```

- **Header**: Always visible at the top (`flex-shrink: 0`)
- **Content**: Scrollable area for messages (`flex: 1 1 auto; overflow-y: auto; min-height: 0;`)
- **Input**: Always visible at the bottom (`flex-shrink: 0`)

### 6.2 Key CSS Rules

```css
.scimigo-chat-bubble {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.scimigo-chat-header {
  flex-shrink: 0;
  z-index: 1;
  background: var(--scimigo-header-bg, #f5f5f5);
  border-bottom: 1px solid var(--scimigo-border-color);
}

.scimigo-chat-content {
  flex: 1 1 auto;
  overflow-y: auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: var(--scimigo-spacing-md);
  padding: var(--scimigo-spacing-md);
}

.scimigo-chat-input {
  flex-shrink: 0;
  border-top: 1px solid var(--scimigo-border-color);
  background: var(--scimigo-background-light);
  padding: var(--scimigo-spacing-md);
}
```

### 6.3 Message List

- `.scimigo-chat-messages` should **not** control scrolling or flex growth. Let the parent `.scimigo-chat-content` handle scrolling.
- Each message should grow as needed. Use `display: flex; flex-direction: column; gap: ...` for vertical spacing.

### 6.4 Scrollbar Behavior

- The scrollbar appears on the entire chat content area, not just the message list.
- The header and input are always visible, even with long content.

### 6.5 Common Pitfalls

- **Do not** set `overflow` or `flex` on `.scimigo-chat-messages` that would interfere with the parent scroll.
- Always use `min-height: 0` on the scrollable flex child to prevent collapse.
- Avoid JS hacks to force layout recalculation; rely on CSS flexbox.

### 6.6 Example

```jsx
<div className="scimigo-chat-bubble">
  <div className="scimigo-chat-header">Title</div>
  <div className="scimigo-chat-content">
    <MessageList ... />
  </div>
  <InputArea ... />
</div>
```

## Overview

This guide outlines how to integrate the new CSS architecture into the SciMigo extension. The architecture consists of:

1. **Global Variables**: Centralized design tokens in `variables.css`
2. **Base Styles**: Reset and common components in `base.css`
3. **Utility Classes**: Reusable utility classes in `utils.css`
4. **Main Styles**: Entry point for global styles in `content.css`
5. **Component-Specific Styles**: Scoped styles in each component directory

## Step-by-Step Integration

### 1. Update Directory Structure

Ensure your styles are organized as follows:

```
src/
├── styles/
│   ├── variables.css
│   ├── base.css
│   ├── utils.css
│   └── content.css
├── components/
│   ├── ComponentName/
│   │   ├── ComponentName.css
│   │   └── [Component files]
```

### 2. Update Webpack Configuration

Make sure Webpack is configured to handle CSS imports properly:

```javascript
// In webpack.config.js
module.exports = {
  // ... other config
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // ... other rules
    ],
  },
};
```

### 3. Update Content Script Entry Point

Modify your `content.js` to import the main CSS file:

```javascript
// In content.js
import './styles/content.css';

// Rest of your content script
```

### 4. Component-Specific CSS Changes

Update each component to import the component-specific CSS:

```javascript
// In components/ContextMenu/index.jsx
import './ContextMenu.css';
```

### 5. Shadow DOM Integration (if used)

If using Shadow DOM for style isolation, import the variables:

```javascript
function createShadowContainer() {
  const container = document.createElement('div');
  const shadow = container.attachShadow({ mode: 'closed' });
  
  // Create style element
  const style = document.createElement('style');
  
  // Import variables directly
  style.textContent = `
    /* Define variables first */
    :host {
      --scimigo-primary-color: #2196F3;
      --scimigo-primary-dark: #1976D2;
      /* Copy other variables from variables.css */
    }
    
    /* Component styles */
    .scimigo-menu-content { /* ... */ }
  `;
  
  shadow.appendChild(style);
  return { container, shadow };
}
```

### 6. Converting Existing Component Styles

For each component, follow these steps:

1. Move component-specific CSS to `ComponentName.css` file
2. Update class names to use the `scimigo-` prefix
3. Replace hardcoded values with CSS variables
4. Import the CSS file in the component

Example:

```css
/* Before: Old CSS directly in component */
.menu-content {
  background: white;
  border: 1px solid #ccc;
}

/* After: In ComponentName.css */
.scimigo-menu-content {
  background: var(--scimigo-background);
  border: 1px solid var(--scimigo-border-color);
}
```

### 7. Building a Component with the New Architecture

Follow this process when building new components:

1. Create component folder: `src/components/NewComponent/`
2. Create component files:
   - `index.jsx`: Main component code
   - `NewComponent.css`: Component-specific styles
3. Use the proper class naming:
   - Always prefix with `scimigo-`
   - Use descriptive names: `scimigo-component-element-state`
4. Use CSS variables for all design tokens
5. Import the CSS in your component

### 8. Handling Dark Mode

For component-specific dark mode styles:

```css
/* In component CSS */
.scimigo-menu-content {
  background: var(--scimigo-background);
  color: var(--scimigo-text-primary);
}

/* Dark mode will be handled automatically by the CSS variables */
```

### 9. Using Utility Classes

When building components, use utility classes for common patterns:

```jsx
<div className="scimigo-flex scimigo-items-center scimigo-justify-between">
  <span className="scimigo-text-lg scimigo-text-bold">Title</span>
  <button className="scimigo-btn scimigo-btn-primary">Action</button>
</div>
```

## Troubleshooting Common Issues

### Issue: Styles Not Applying

1. Check if your content script is properly importing the CSS
2. Verify that component CSS is imported correctly
3. Check for CSS specificity issues
4. Ensure the class names match exactly

### Issue: CSS Variables Not Working

1. Verify that `variables.css` is imported
2. Check for typos in variable names
3. Ensure the variable is defined in the correct scope

### Issue: Dark Mode Not Working

1. Use neutral variable names in components (e.g., `--scimigo-background` instead of `--scimigo-background-light`)
2. Check that media queries are working correctly
3. Verify that dark mode variables are defined correctly

### Issue: Style Conflicts with Page

1. Use more specific selectors
2. Add !important to critical styles (sparingly)
3. Consider using Shadow DOM for complete isolation

## Best Practices

1. **Always use variables**: Never hardcode colors, spacing, etc.
2. **Follow the naming convention**: Always use the `scimigo-` prefix
3. **Component isolation**: Keep component styles in their own files
4. **Limited specificity**: Keep selectors as simple as possible
5. **Document complex styles**: Add comments for non-obvious code
6. **Use utility classes**: For common patterns to reduce repetition
7. **Avoid inline styles**: Use CSS variables and classes instead

## Final Testing Checklist

Before considering the CSS integration complete, check:

- [ ] All components render correctly in light mode
- [ ] All components render correctly in dark mode
- [ ] Components work correctly on different screen sizes
- [ ] No CSS conflicts with the page content
- [ ] Consistent styling across all components
- [ ] No hardcoded values in the CSS
- [ ] All animations and transitions work smoothly
