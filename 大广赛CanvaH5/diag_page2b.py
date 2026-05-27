from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 390, 'height': 844})
    page.goto('http://127.0.0.1:8899/')
    page.wait_for_load_state('networkidle')

    page.wait_for_timeout(500)

    # Get CSS rules for .page
    css_rules = page.evaluate("""() => {
        const sheets = document.styleSheets;
        let rules = [];
        for (const sheet of sheets) {
            try {
                for (const rule of sheet.cssRules) {
                    if (rule.selectorText && rule.selectorText.includes('.page')) {
                        rules.push(rule.selectorText + ' => ' + rule.cssText);
                    }
                }
            } catch(e) {}
        }
        return rules;
    }""")

    print("=== CSS rules containing .page ===")
    for r in css_rules:
        print(f"  {r}")

    # Check initial state
    print("\n=== Page 1 (initial active) ===")
    for prop in ['position', 'top', 'transform', 'opacity', 'z-index', 'pointer-events']:
        val = page.evaluate(f"(el) => getComputedStyle(el).{prop}", page.locator('#page-1').element_handle())
        print(f"  {prop}: {val}")

    print("\n=== Page 2 (initial) ===")
    for prop in ['position', 'top', 'transform', 'opacity', 'z-index', 'pointer-events', 'display', 'visibility']:
        val = page.evaluate(f"(el) => getComputedStyle(el).{prop}", page.locator('#page-2').element_handle())
        print(f"  {prop}: {val}")

    classes2 = page.evaluate("(el) => el.className", page.locator('#page-2').element_handle())
    print(f"  className: '{classes2}'")

    # Now navigate to page 2
    print("\n=== Calling goTo(2) ===")
    page.evaluate("goTo(2)")
    page.wait_for_timeout(800)

    print("\n=== Page 1 after goTo(2) ===")
    c1 = page.evaluate("(el) => el.className", page.locator('#page-1').element_handle())
    t1 = page.evaluate("(el) => getComputedStyle(el).transform", page.locator('#page-1').element_handle())
    print(f"  className: '{c1}'")
    print(f"  transform: {t1}")

    print("\n=== Page 2 after goTo(2) ===")
    for prop in ['position', 'top', 'transform', 'opacity', 'z-index', 'pointer-events', 'display', 'visibility']:
        val = page.evaluate(f"(el) => getComputedStyle(el).{prop}", page.locator('#page-2').element_handle())
        print(f"  {prop}: {val}")

    classes2a = page.evaluate("(el) => el.className", page.locator('#page-2').element_handle())
    print(f"  className: '{classes2a}'")

    # Bounding rects
    r2 = page.evaluate("(el) => el.getBoundingClientRect()", page.locator('#page-2').element_handle())
    print(f"\n  rect: top={r2['top']:.1f} bottom={r2['bottom']:.1f} height={r2['height']:.1f}")

    # Check app overflow
    app_overflow = page.evaluate("(el) => getComputedStyle(el).overflow", page.locator('#app').element_handle())
    html_overflow = page.evaluate("() => getComputedStyle(document.documentElement).overflow")
    body_overflow = page.evaluate("() => getComputedStyle(document.body).overflow")
    print(f"\n  #app overflow: {app_overflow}")
    print(f"  html overflow: {html_overflow}")
    print(f"  body overflow: {body_overflow}")

    page.screenshot(path='/tmp/diag_page2b.png')
    print("\nScreenshot saved to /tmp/diag_page2b.png")
    browser.close()
