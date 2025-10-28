// Simple test runner for checkout calculation
const calculateCartTotal = (items) => {
  return items.reduce((total, item) => total + (item.price * item.qty), 0);
};

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(`Test failed: ${message}`);
  }
};

const runTest = (testName, testFn) => {
  try {
    testFn();
    console.log(`✅ ${testName}`);
  } catch (error) {
    console.log(`❌ ${testName}: ${error.message}`);
    process.exit(1);
  }
};

console.log('Running checkout calculation tests...\n');

// Test 1: Single item
runTest('should calculate total for single item', () => {
  const items = [
    { name: 'Test Product', price: 10.00, qty: 1 }
  ];
  const total = calculateCartTotal(items);
  assert(total === 10.00, `Expected 10.00, got ${total}`);
});

// Test 2: Multiple items
runTest('should calculate total for multiple items', () => {
  const items = [
    { name: 'Product 1', price: 10.00, qty: 2 },
    { name: 'Product 2', price: 15.50, qty: 1 },
    { name: 'Product 3', price: 5.25, qty: 3 }
  ];
  const total = calculateCartTotal(items);
  const expected = (10.00 * 2) + (15.50 * 1) + (5.25 * 3);
  assert(total === expected, `Expected ${expected}, got ${total}`);
});

// Test 3: Zero quantity
runTest('should handle zero quantity', () => {
  const items = [
    { name: 'Product 1', price: 10.00, qty: 0 },
    { name: 'Product 2', price: 15.50, qty: 1 }
  ];
  const total = calculateCartTotal(items);
  assert(total === 15.50, `Expected 15.50, got ${total}`);
});

// Test 4: Empty cart
runTest('should handle empty cart', () => {
  const items = [];
  const total = calculateCartTotal(items);
  assert(total === 0, `Expected 0, got ${total}`);
});

// Test 5: Decimal prices
runTest('should handle decimal prices correctly', () => {
  const items = [
    { name: 'Product 1', price: 9.99, qty: 2 },
    { name: 'Product 2', price: 19.95, qty: 1 }
  ];
  const total = calculateCartTotal(items);
  const expected = (9.99 * 2) + (19.95 * 1);
  assert(Math.abs(total - expected) < 0.01, `Expected ${expected}, got ${total}`);
});

console.log('\n🎉 All checkout calculation tests passed!');
