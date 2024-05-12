(() => {
  document.querySelectorAll('.test-title').forEach((el) => {
    el.style.fontSize = '1rem';
  });
  const suites = document.querySelectorAll('.suite-container');
  suites.forEach((suite) => {
    const info = suite.querySelector('.suite-info');
    const tests = suite.querySelector('.suite-tests');

    const testsFail = tests.querySelectorAll('.failed').length;
    const testsPass = tests.querySelectorAll('.passed').length;
    const testsPending = tests.querySelectorAll('.pending').length;
    const testsTotal = testsFail + testsPass + testsPending;

    const suiteSummary = document.createElement('div');
    suiteSummary.classList.add('suite-summary');
    suiteSummary.style.fontFamily = 'monospace';
    suiteSummary.style.fontSize = '1rem';
    suiteSummary.style.wordBreak = 'break-all';
    suiteSummary.style.flexGrow = '1';
    suiteSummary.style.padding = '1rem';
    suiteSummary.style.fontWeight = 'bold';
    suiteSummary.innerHTML = `
<span class="summary-total">Tests (${testsTotal})</span>
<span class="summary-passed">${testsPass} passed</span>
<span class="summary-failed">${testsFail} failed</span>
<span class="summary-pending">${testsPending} pending</span>
`;
    info.insertAdjacentElement('afterend', suiteSummary);
  });
})();
