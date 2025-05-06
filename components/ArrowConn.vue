<template>
  <Teleport to="body">
    <svg :style="svgStyle" v-show="isActive || nav.isPrintMode.value">
      <defs>
        <marker :id="markerId" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto-start-reverse">
          <polygon points="0 0, 10 3.5, 0 7" :fill="color" />
        </marker>
      </defs>

      <line v-if="arrowData.isValid" :x1="arrowData.x1" :y1="arrowData.y1" :x2="arrowData.x2" :y2="arrowData.y2"
        :stroke="color" :stroke-width="strokeWidth" :marker-end="noArrow ? undefined : `url(#${markerId})`" />
    </svg>
  </Teleport>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed, watch } from 'vue';
import { debounce, transform } from 'lodash-es'; // Use lodash for debouncing
import { useIsSlideActive, useNav, useSlideContext } from '@slidev/client'

const isActive = useIsSlideActive()
const context = useSlideContext()
const nav = useNav()


// --- Props ---
const props = defineProps({
  // The ID used in data-arrow-from and data-arrow-to to link elements
  arrowId: {
    type: [String, Number],
    required: true,
  },
  // Color of the arrow
  color: {
    type: String,
    default: 'red',
  },
  // Thickness of the arrow line
  strokeWidth: {
    type: Number,
    default: 2,
  },
  // Debounce wait time in ms for resize/scroll updates
  updateDebounceMs: {
    type: Number,
    default: 50 // Update quickly, but not excessively
  },
  noArrow: {
    type: Boolean,
    default: false,
  },
});

// --- State ---
// Reactive object to hold calculated arrow coordinates
const arrowData = reactive({
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
  isValid: false, // Flag to indicate if elements were found and coords calculated
});

// Reference to the SVG element itself (needed for coordinate calculations)
const svgRef = ref(null); // Although template refs aren't explicitly used here, keep for potential future use

// --- Computed ---
// Generate a unique ID for the marker to avoid conflicts if multiple
// ArrowConnector components are used on the same page.
const markerId = computed(() => `arrowhead-${props.arrowId}`);

// Style for the SVG container
const svgStyle = computed(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%', // Make sure parent has relative positioning and size
  pointerEvents: 'none', // Allow clicks to pass through
  overflow: 'visible', // Ensure markers outside the line bounds are visible
  zIndex: 10, // Adjust as needed
  transform: `scale(var(--slidev-slide-scale, 1))`,
  transformOrigin: 'top left', // Ensure scaling is from the top-left corner
}));


// --- Methods ---

// Find elements based on data attributes and ID
const findElements = () => {
  // Important: Search the entire document, as the divs might be anywhere
  const fromEl = document.querySelector(`[data-arrow-from~="${props.arrowId}"]`);
  const toEl = document.querySelector(`[data-arrow-to~="${props.arrowId}"]`);
  return { fromEl, toEl };
};

// Calculate the center point of an element relative to the SVG container
const getElementCenter = (el) => {
  if (!el) return null;
  const elRect = el.getBoundingClientRect();
  // Assume SVG covers the viewport origin (top: 0, left: 0) relative to its offset parent
  // If SVG is positioned differently, you'll need its getBoundingClientRect() too
  // const svgRect = svgRef.value?.getBoundingClientRect() || { top: 0, left: 0 };
  // For simplicity, assume SVG starts at viewport origin or adjust as needed
  const x = elRect.left + elRect.width / 2; // + window.scrollX; (Not needed if SVG fixed/covers all)
  const y = elRect.top + elRect.height / 2; // + window.scrollY; (Not needed if SVG fixed/covers all)

  return { x, y };
};

// Main function to update arrow position
const updateArrowPosition = () => {
  const { fromEl, toEl } = findElements();

  if (fromEl && toEl) {
    const rectFrom = fromEl.getBoundingClientRect();
    const rectTo = toEl.getBoundingClientRect();

    // Determine which element is on the left and which is on the right
    // We compare the left edges for simplicity
    let leftRect, rightRect;
    // if (rectFrom.left < rectTo.left) {
      leftRect = rectFrom;
      rightRect = rectTo;
    // } else {
    //   leftRect = rectTo;
    //   rightRect = rectFrom;
    // }

    // Calculate coordinates relative to the viewport (assuming SVG at 0,0)
    // Start point: Middle of the right edge of the left element
    const x1 = leftRect.right; // Same as leftRect.left + leftRect.width
    const y1 = leftRect.top + leftRect.height / 2;

    // End point: Middle of the left edge of the right element
    const x2 = rightRect.left;
    const y2 = rightRect.top + rightRect.height / 2;

    // Update reactive state
    console.log(context.$scale.value)
    arrowData.x1 = (1 / context.$scale.value) * (x1 - 1);
    arrowData.y1 = (1 / context.$scale.value) * y1;
    arrowData.x2 = (1 / context.$scale.value) * (x2 - (props.noArrow ? 0 : 6));
    arrowData.y2 = (1 / context.$scale.value) * y2;
    arrowData.isValid = true;

  } else {
    // If elements are not found, invalidate the arrow
    arrowData.isValid = false;
    // console.warn(`ArrowConnector: Could not find elements for arrowId "${props.arrowId}"`);
  }
};

// Debounced version for frequent updates
const debouncedUpdate = debounce(updateArrowPosition, props.updateDebounceMs);

// --- Lifecycle Hooks ---
let observer = null;

onMounted(() => {
  // Initial drawing
  updateArrowPosition();

  // Add listeners for dynamic updates
  window.addEventListener('resize', debouncedUpdate);
  window.addEventListener('scroll', debouncedUpdate, true); // Use capture phase for scroll

  // More robust update: Observe changes to the target elements' position/size
  // This is more complex but handles JS animations or style changes better.
  const { fromEl, toEl } = findElements();
  if (typeof ResizeObserver !== 'undefined') {
    observer = new ResizeObserver(debouncedUpdate);
    if (fromEl) observer.observe(fromEl);
    if (toEl) observer.observe(toEl);
    // Consider MutationObserver for style/attribute changes if ResizeObserver isn't enough
  }

  // Fallback or additional trigger if elements are moved via JS without resizing
  // This might require a custom event system or polling if ResizeObserver isn't sufficient
});

onUnmounted(() => {
  // Cleanup listeners and observers
  window.removeEventListener('resize', debouncedUpdate);
  window.removeEventListener('scroll', debouncedUpdate, true);
  if (observer) {
    observer.disconnect();
  }
  // Cancel any pending debounced calls
  debouncedUpdate.cancel();
});

// Watch for changes in arrowId (if it can change dynamically)
watch(() => props.arrowId, () => {
  // Re-initialize observations if ID changes
  if (observer) observer.disconnect();
  updateArrowPosition(); // Update immediately
  // Re-observe new elements if needed (similar logic to onMounted)
  const { fromEl, toEl } = findElements();
  if (typeof ResizeObserver !== 'undefined') {
    observer = new ResizeObserver(debouncedUpdate);
    if (fromEl) observer.observe(fromEl);
    if (toEl) observer.observe(toEl);
  }
}, { immediate: false }); // Don't run immediately on initial mount

// Watch for external position changes (e.g., if parent forces redraw)
// This is less common, usually resize/scroll/observer covers it.

</script>

<style scoped>
/* Scoped styles if needed, though svgStyle computed prop handles most */
/* Ensure the component's root element doesn't interfere if it's not the SVG itself */
/* If <template> had a root div wrapper: */
/*
.arrow-connector-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
*/
</style>