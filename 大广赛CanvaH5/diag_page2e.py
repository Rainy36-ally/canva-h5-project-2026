from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 390, 'height': 844})
    page.goto('http://127.0.0.1:8899/')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(500)

    # Use cssText to get the full computed style
    print("=== cssText for #page-1 and #page-2 ===")
    result = page.evaluate("""() => {
        const p1 = document.getElementById('page-1');
        const p2 = document.getElementById('page-2');
        return {
            page1_position: getComputedStyle(p1).position,
            page1_cssText: getComputedStyle(p1).cssText.substring(0, 500),
            page2_position: getComputedStyle(p2).position,
            page2_cssText: getComputedStyle(p2).cssText.substring(0, 500),
            // Try to find the origin of position property
            page2_matcher: (function() {
                const cs = getComputedStyle(p2);
                const sheets = document.styleSheets;
                for (const sheet of sheets) {
                    try {
                        for (const rule of sheet.cssRules) {
                            if (rule.selectorText && p2.matches(rule.selectorText)) {
                                if (rule.style.position) {
                                    return {sheet: sheet.href, rule: rule.cssText.substring(0, 200)};
                                }
                            }
                        }
                    } catch(e) {}
                }
                return 'not found via matches';
            })()
        };
    }""")
    print(f"  page1 position: {result['page1_position']}")
    print(f"  page1 cssText[:500]: {result['page1_cssText']}")
    print(f"  page2 position: {result['page2_position']}")
    print(f"  page2 cssText[:500]: {result['page2_cssText']}")
    print(f"  page2 matcher: {result['page2_matcher']}")

    browser.close()
