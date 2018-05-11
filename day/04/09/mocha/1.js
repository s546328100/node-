var assert = require('assert');

it('should return 3', () => {
    let sum = add(1, 2);
    assert.equal(sum, 3);
});

it('should return undefined', function() {
    var sum = add(1, '2');
    assert.equal(sum, undefined);
});

function add(a, b) {
    return a + b;
}
