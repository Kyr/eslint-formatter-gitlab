// https://github.com/eslint/eslint/blob/master/tests/lib/formatters/junit.js
const test = require('tape');
const formatter = require('../index');

test('when there are no problems', noProblem);

test('when passed a single message', singleMessage);

test('when passed a fatal error message', fatalError);

test('when passed a fatal error message with no line or column', fatalErrorWithoutPosition);

test('when passed a fatal error message with no line, column, or message text',);

test('when passed multiple messages', multipleMessages);

test('when passed special characters', specialCharacters);

/*

describe("when passed multiple files with 1 message each", () => {
    const code = [{
        filePath: "foo.js",
        messages: [{
            message: "Unexpected foo.",
            severity: 1,
            line: 5,
            column: 10,
            ruleId: "foo"
        }]
    }, {
        filePath: "bar.js",
        messages: [{
            message: "Unexpected bar.",
            severity: 2,
            line: 6,
            column: 11,
            ruleId: "bar"
        }]
    }];

    it("should return 2 <testsuite>'s", () => {
        const result = formatter(code);

        assert.strictEqual(result.replace(/\n/gu, ""), "<?xml version=\"1.0\" encoding=\"utf-8\"?><testsuites><testsuite package=\"org.eslint\" time=\"0\" tests=\"1\" errors=\"1\" name=\"foo.js\"><testcase time=\"0\" name=\"org.eslint.foo\"><failure message=\"Unexpected foo.\"><![CDATA[line 5, col 10, Warning - Unexpected foo. (foo)]]></failure></testcase></testsuite><testsuite package=\"org.eslint\" time=\"0\" tests=\"1\" errors=\"1\" name=\"bar.js\"><testcase time=\"0\" name=\"org.eslint.bar\"><failure message=\"Unexpected bar.\"><![CDATA[line 6, col 11, Error - Unexpected bar. (bar)]]></failure></testcase></testsuite></testsuites>");
    });
});

describe("when passed multiple files should print even if no errors", () => {
    const code = [{
        filePath: "foo.js",
        messages: [{
            message: "Unexpected foo.",
            severity: 1,
            line: 5,
            column: 10,
            ruleId: "foo"
        }]
    }, {
        filePath: "bar.js",
        messages: []
    }];

    it("should return 2 <testsuite>", () => {
        const result = formatter(code);

        assert.strictEqual(result.replace(/\n/gu, ""), "<?xml version=\"1.0\" encoding=\"utf-8\"?><testsuites><testsuite package=\"org.eslint\" time=\"0\" tests=\"1\" errors=\"1\" name=\"foo.js\"><testcase time=\"0\" name=\"org.eslint.foo\"><failure message=\"Unexpected foo.\"><![CDATA[line 5, col 10, Warning - Unexpected foo. (foo)]]></failure></testcase></testsuite><testsuite package=\"org.eslint\" time=\"0\" tests=\"1\" errors=\"0\" name=\"bar.js\"><testcase time=\"0\" name=\"bar.js\" /></testsuite></testsuites>");
    });
});

describe("when passed a file with no errors", () => {
    const code = [{
        filePath: "foo.js",
        messages: []
    }];

    it("should print a passing <testcase>", () => {
        const result = formatter(code);

        assert.strictEqual(result.replace(/\n/gu, ""), "<?xml version=\"1.0\" encoding=\"utf-8\"?><testsuites><testsuite package=\"org.eslint\" time=\"0\" tests=\"1\" errors=\"0\" name=\"foo.js\"><testcase time=\"0\" name=\"foo.js\" /></testsuite></testsuites>");
    });
});
*/

function specialCharacters() {
    const code = [{
        filePath: "foo.js",
        messages: [{
            message:  "Unexpected <foo></foo>\b\t\n\f\r牛逼.",
            severity: 1,
            line:     5,
            column:   10,
            ruleId:   "foo"
        }]
    }];

    it("should make them go away", () => {
        const result = formatter(code);

        assert.strictEqual(result.replace(/\n/gu, ""), "<?xml version=\"1.0\" encoding=\"utf-8\"?><testsuites><testsuite package=\"org.eslint\" time=\"0\" tests=\"1\" errors=\"1\" name=\"foo.js\"><testcase time=\"0\" name=\"org.eslint.foo\"><failure message=\"Unexpected &lt;foo&gt;&lt;/foo&gt;&#8;&#9;&#10;&#12;&#13;&#29275;&#36924;.\"><![CDATA[line 5, col 10, Warning - Unexpected &lt;foo&gt;&lt;/foo&gt;&#8;&#9;&#10;&#12;&#13;&#29275;&#36924;. (foo)]]></failure></testcase></testsuite></testsuites>");
    });
}

function multipleMessages(t) {

    const code = [{
        filePath: "foo.js",
        messages: [{
            message:  "Unexpected foo.",
            severity: 2,
            line:     5,
            column:   10,
            ruleId:   "foo"
        }, {
            message:  "Unexpected bar.",
            severity: 1,
            line:     6,
            column:   11,
            ruleId:   "bar"
        }]
    }];
    it("should return a multiple <testcase>'s", () => {
        const result = formatter(code);

        assert.strictEqual(result.replace(/\n/gu, ""), "<?xml version=\"1.0\" encoding=\"utf-8\"?><testsuites><testsuite package=\"org.eslint\" time=\"0\" tests=\"2\" errors=\"2\" name=\"foo.js\"><testcase time=\"0\" name=\"org.eslint.foo\"><failure message=\"Unexpected foo.\"><![CDATA[line 5, col 10, Error - Unexpected foo. (foo)]]></failure></testcase><testcase time=\"0\" name=\"org.eslint.bar\"><failure message=\"Unexpected bar.\"><![CDATA[line 6, col 11, Warning - Unexpected bar. (bar)]]></failure></testcase></testsuite></testsuites>");
    });

}

function noProblem(t) {
    const code = [];

    const result = formatter(code);
    t.plan(1);
    t.equal(result.replace(/\n/gu, ""), '<?xml version="1.0" encoding="utf-8"?><testsuites></testsuites>');

}

function singleMessage(t) {
    const code = [{
        filePath: "foo.js",
        messages: [{
            message:  "Unexpected foo.",
            severity: 2,
            line:     5,
            column:   10,
            ruleId:   "foo"
        }]
    }];

    const result = formatter(code);

    t.plan(1);
    t.equal(result.replace(/\n/gu, ""), '<?xml version="1.0" encoding="utf-8"?><testsuites><testsuite package="org.eslint" time="0" tests="1" errors="1" name="foo.js"><testcase time="0" name="org.eslint.foo"><failure message="Unexpected foo."><![CDATA[line 5, col 10, Error - Unexpected foo. (foo)]]></failure></testcase></testsuite></testsuites>');

}

function fatalError(t) {
    const code = [{
        filePath: "foo.js",
        messages: [{
            fatal:   true,
            message: "Unexpected foo.",
            line:    5,
            column:  10,
            ruleId:  "foo"
        }]
    }];

    t.test('should return a single <testcase> and an <error>', (t) => {

        t.plan(1);

        const result = formatter(code);

        t.equal(result.replace(/\n/gu, ""), "<?xml version=\"1.0\" encoding=\"utf-8\"?><testsuites><testsuite package=\"org.eslint\" time=\"0\" tests=\"1\" errors=\"1\" name=\"foo.js\"><testcase time=\"0\" name=\"org.eslint.foo\"><error message=\"Unexpected foo.\"><![CDATA[line 5, col 10, Error - Unexpected foo. (foo)]]></error></testcase></testsuite></testsuites>");
    })

}

function fatalErrorWithoutPosition(t) {
    const code = [{
        filePath: "foo.js",
        messages: [{
            fatal:   true,
            message: "Unexpected foo."
        }]
    }];

    t.test("should return a single <testcase> and an <error>", (t) => {
        t.plan(1);
        const result = formatter(code);

        t.equal(result.replace(/\n/gu, ""), "<?xml version=\"1.0\" encoding=\"utf-8\"?><testsuites><testsuite package=\"org.eslint\" time=\"0\" tests=\"1\" errors=\"1\" name=\"foo.js\"><testcase time=\"0\" name=\"org.eslint.unknown\"><error message=\"Unexpected foo.\"><![CDATA[line 0, col 0, Error - Unexpected foo.]]></error></testcase></testsuite></testsuites>");
    });
}
