from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 390, 'height': 844})
    page.goto('http://127.0.0.1:8899/')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(500)

    # Deep investigation: use Chrome DevTools Protocol to check position
    result = page.evaluate("""() => {
        const el = document.getElementById('page-2');

        // Get all CSS rules that match this element
        const matchingRules = [];
        for (const sheet of document.styleSheets) {
            try {
                for (const rule of sheet.cssRules) {
                    if (rule.type === CSSRule.STYLE_RULE && el.matches(rule.selectorText)) {
                        matchingRules.push({
                            selector: rule.selectorText,
                            position: rule.style.position,
                            cssText: rule.cssText.substring(0, 300)
                        });
                    }
                }
            } catch(e) {}
        }

        return {
            matches: matchingRules,
            // Also get the actual style object to see all properties
            style_declaration: el.style.cssText || 'empty',
        };
    }""")

    print("=== Matching CSS rules for #page-2 ===")
    for r in result['matches']:
        print(f"  [{r['position']}] {r['selector']}")
        print(f"    {r['cssText'][:200]}")

    print(f"\n=== el.style.cssText ===")
    print(f"  {result['style_declaration']}")

    # Try: add position: absolute directly in CSS rule and see if it overrides
    # Actually, let me try manually setting position absolute on all .page elements
    print("\n=== Testing position fix ===")
    page.evaluate("""() => {
        const pages = document.querySelectorAll('.page');
        pages.forEach(p => {
            console.log('page', p.id, 'position before:', getComputedStyle(p).position);
            p.style.setProperty('position', 'absolute', 'important');
            console.log('page', p.id, 'position after:', getComputedStyle(p).position);
        });
    }""")

    rect = page.evaluate("() => { const el = document.getElementById('page-2'); return { rect: el.getBoundingClientRect(), pos: getComputedStyle(el).position }; }")
    print(f"  page-2 after !important: position={rect['pos']}, rect.top={rect['rect']['top']:.1f}")

    # Navigate to page 2 and check
    page.evaluate("goTo(2)")
    page.wait_for_timeout(800)

    rect2 = page.evaluate("() => { const el = document.getElementById('page-2'); return { rect: el.getBoundingClientRect(), pos: getComputedStyle(el).position }; }")
    print(f"  page-2 after goTo(2): position={rect2['pos']}, rect.top={rect2['rect']['top']:.1f}")

    page.screenshot(path='/tmp/diag_cascade.png')
    print("\nScreenshot saved.")
    browser.close()
